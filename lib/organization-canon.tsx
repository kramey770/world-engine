"use client"

/**
 * Organization Canon — the organization counterpart to Character, Location, and
 * Religion Canon.
 *
 * This is the authoritative, reusable source of truth for organization records.
 * Future views (hierarchy, memberships, timelines, relationships) will READ from
 * this layer and never own duplicate organization information, exactly as the
 * Character/Location/Religion Canon layers do.
 *
 * FIRST-LAYER pass only: client-side, in-memory, seeded with a small amount of
 * mock data. No database/API/persistence. The schema is intentionally minimal
 * (name, type, summary, description, notes) — the comprehensive Organization
 * information model (relationships, hierarchy, memberships, etc.) is deliberately
 * deferred and will be designed separately.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/** The broad category a canon organization belongs to. Intentionally short for now. */
export type OrganizationType =
  | "government"
  | "military"
  | "religious"
  | "noble-house"
  | "corporation"
  | "guild"
  | "faction"
  | "secret-society"
  | "other"

export const ORGANIZATION_TYPES: { id: OrganizationType; label: string }[] = [
  { id: "government", label: "Government" },
  { id: "military", label: "Military" },
  { id: "religious", label: "Religious" },
  { id: "noble-house", label: "Noble House" },
  { id: "corporation", label: "Corporation" },
  { id: "guild", label: "Guild" },
  { id: "faction", label: "Faction" },
  { id: "secret-society", label: "Secret Society" },
  { id: "other", label: "Other" },
]

export function organizationTypeLabel(type: OrganizationType): string {
  return ORGANIZATION_TYPES.find((t) => t.id === type)?.label ?? type
}

/** How the organization is internally organized. */
export type OrganizationStructure =
  | "unspecified"
  | "hierarchical"
  | "council"
  | "decentralized"
  | "cellular"
  | "egalitarian"
  | "other"

export const ORGANIZATION_STRUCTURES: { id: OrganizationStructure; label: string }[] = [
  { id: "unspecified", label: "Unspecified" },
  { id: "hierarchical", label: "Hierarchical" },
  { id: "council", label: "Council-led" },
  { id: "decentralized", label: "Decentralized" },
  { id: "cellular", label: "Cellular" },
  { id: "egalitarian", label: "Egalitarian" },
  { id: "other", label: "Other" },
]

export function organizationStructureLabel(v: OrganizationStructure): string {
  return ORGANIZATION_STRUCTURES.find((s) => s.id === v)?.label ?? v
}

/** Rough head-count / footprint of the organization. */
export type OrganizationSize = "unspecified" | "tiny" | "small" | "modest" | "large" | "vast"

export const ORGANIZATION_SIZES: { id: OrganizationSize; label: string }[] = [
  { id: "unspecified", label: "Unspecified" },
  { id: "tiny", label: "Tiny (a handful)" },
  { id: "small", label: "Small (dozens)" },
  { id: "modest", label: "Modest (hundreds)" },
  { id: "large", label: "Large (thousands)" },
  { id: "vast", label: "Vast (tens of thousands+)" },
]

export function organizationSizeLabel(v: OrganizationSize): string {
  return ORGANIZATION_SIZES.find((s) => s.id === v)?.label ?? v
}

/** Geographic / political reach of the organization. */
export type OrganizationReach =
  | "unspecified"
  | "local"
  | "regional"
  | "national"
  | "continental"
  | "global"

export const ORGANIZATION_REACHES: { id: OrganizationReach; label: string }[] = [
  { id: "unspecified", label: "Unspecified" },
  { id: "local", label: "Local" },
  { id: "regional", label: "Regional" },
  { id: "national", label: "National" },
  { id: "continental", label: "Continental" },
  { id: "global", label: "Global" },
]

export function organizationReachLabel(v: OrganizationReach): string {
  return ORGANIZATION_REACHES.find((r) => r.id === v)?.label ?? v
}

/**
 * The canonical Organization record. Intentionally minimal for this first layer —
 * just enough structure to prove the data flow. Consumers should treat any extra
 * fields added in future passes as optional.
 */
export type CanonOrganization = {
  id: string
  name: string
  type: OrganizationType
  /** One-line identity shown beneath the name. */
  summary?: string
  /** Long-form canonical description (the "biography" of the organization). */
  description?: string
  /** Freeform further notes — loose canon details that don't fit elsewhere yet. */
  notes?: string
}

/** Fields a user may edit from the organization's Canon editing home. */
export type OrganizationEdit = Partial<
  Pick<CanonOrganization, "name" | "type" | "summary" | "description" | "notes">
>

/* --------------------------------- Seed data -------------------------------- */

const seedOrganizations: Record<string, CanonOrganization> = {
  "the-ravenshollow-court": {
    id: "the-ravenshollow-court",
    name: "The Ravenshollow Court",
    type: "noble-house",
    summary: "The ruling noble house of the Ashen Marches.",
    description:
      "House Ravenshollow has held the black keeps of the northern Marches for nine generations, ruling by a covenant said to be sworn with the Raven Court. Its authority rests on old blood, colder winters, and a network of sworn lesser houses.",
    notes: "Sigil is a silver raven on sable. Traditionally feuds with the Duskwater line over the vale border.",
  },
  "the-emberguard": {
    id: "the-emberguard",
    name: "The Emberguard",
    type: "military",
    summary: "The standing order that keeps the sacred fires and the northern roads.",
    description:
      "Half military order, half road-wardens, the Emberguard patrol the mountain passes and escort the wandering Emberkeepers. They answer to the Court in name but operate with unusual independence in the field.",
  },
  "the-still-circle": {
    id: "the-still-circle",
    name: "The Still Circle",
    type: "secret-society",
    // summary intentionally omitted to show that view mode hides empty fields.
    description:
      "A quiet society drawn from the initiates of the Still Water, said to trade in secrets read from undisturbed reflections. Membership is never admitted and rarely proven.",
  },
}

/* --------------------------------- Context ---------------------------------- */

type OrganizationCanonContextValue = {
  /** All canon organization records, keyed by stable id. */
  organizations: Record<string, CanonOrganization>
  /** Read a single record (null-safe). */
  getOrganization: (id: string | null | undefined) => CanonOrganization | null
  /** Apply a partial update to a record; reflected immediately in all views. */
  updateOrganization: (id: string, patch: OrganizationEdit) => void
  /** Create a new record and return its generated id. */
  addOrganization: (patch: OrganizationEdit) => string
}

const OrganizationCanonContext = createContext<OrganizationCanonContextValue | null>(null)

/** Build a stable, url-safe id from a name, kept unique against existing keys. */
function makeId(name: string, existing: Record<string, CanonOrganization>): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "organization"
  let id = base
  let n = 2
  while (existing[id]) {
    id = `${base}-${n}`
    n += 1
  }
  return id
}

export function OrganizationCanonProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Record<string, CanonOrganization>>(() => ({
    ...seedOrganizations,
  }))

  const getOrganization = useCallback(
    (id: string | null | undefined): CanonOrganization | null => (id ? (organizations[id] ?? null) : null),
    [organizations],
  )

  const updateOrganization = useCallback((id: string, patch: OrganizationEdit) => {
    setOrganizations((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addOrganization = useCallback((patch: OrganizationEdit): string => {
    const name = patch.name?.trim() || "Unnamed Organization"
    let newId = ""
    setOrganizations((prev) => {
      newId = makeId(name, prev)
      const record: CanonOrganization = {
        id: newId,
        name,
        type: patch.type ?? "other",
        summary: patch.summary,
        description: patch.description,
        notes: patch.notes,
      }
      return { ...prev, [newId]: record }
    })
    return newId
  }, [])

  const value = useMemo<OrganizationCanonContextValue>(
    () => ({ organizations, getOrganization, updateOrganization, addOrganization }),
    [organizations, getOrganization, updateOrganization, addOrganization],
  )

  return <OrganizationCanonContext.Provider value={value}>{children}</OrganizationCanonContext.Provider>
}

export function useOrganizationCanon(): OrganizationCanonContextValue {
  const ctx = useContext(OrganizationCanonContext)
  if (!ctx) throw new Error("useOrganizationCanon must be used within an OrganizationCanonProvider")
  return ctx
}
