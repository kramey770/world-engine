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
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

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

/** How openly the organization pursues its methods / operations. */
export type OrganizationOperations =
  | "unspecified"
  | "overt"
  | "discreet"
  | "covert"
  | "clandestine"
  | "mixed"

export const ORGANIZATION_OPERATIONS: { id: OrganizationOperations; label: string }[] = [
  { id: "unspecified", label: "Unspecified" },
  { id: "overt", label: "Overt" },
  { id: "discreet", label: "Discreet" },
  { id: "covert", label: "Covert" },
  { id: "clandestine", label: "Clandestine" },
  { id: "mixed", label: "Mixed / Adaptive" },
]

export function organizationOperationsLabel(v: OrganizationOperations): string {
  return ORGANIZATION_OPERATIONS.find((o) => o.id === v)?.label ?? v
}

/** The organization's present standing in the world. */
export type OrganizationStatus =
  | "unspecified"
  | "active"
  | "ascendant"
  | "stable"
  | "declining"
  | "fractured"
  | "dormant"
  | "disbanded"
  | "destroyed"
  | "unknown"

export const ORGANIZATION_STATUSES: { id: OrganizationStatus; label: string }[] = [
  { id: "unspecified", label: "Unspecified" },
  { id: "active", label: "Active" },
  { id: "ascendant", label: "Ascendant" },
  { id: "stable", label: "Stable" },
  { id: "declining", label: "Declining" },
  { id: "fractured", label: "Fractured" },
  { id: "dormant", label: "Dormant" },
  { id: "disbanded", label: "Disbanded" },
  { id: "destroyed", label: "Destroyed" },
  { id: "unknown", label: "Unknown" },
]

export function organizationStatusLabel(v: OrganizationStatus): string {
  return ORGANIZATION_STATUSES.find((s) => s.id === v)?.label ?? v
}

/**
 * A lightweight structural entry used by list-style fields (internal divisions,
 * important events). It holds a label plus an optional note ONLY — it is a
 * placeholder for a future link to a full Canon record (a sub-organization, a
 * Character, or an entry in the History/Events Canon). Organizations must never
 * duplicate the authoritative content of those other Lore systems here.
 */
export type OrganizationEntry = {
  id: string
  label: string
  note?: string
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
  image?: string
  /** One-line identity shown beneath the name. */
  summary?: string
  /** Long-form canonical description (the "biography" of the organization). */
  description?: string
  /** Why the organization exists — its stated purpose or driving mission. */
  purpose?: string
  /** How and when it came to be — founding, origin story, founders. */
  founding?: string
  /** Who leads it — a ruler, council, office, or title (short freeform). */
  leadership?: string
  /** How it is internally organized. */
  structure?: OrganizationStructure
  /** Rough head-count / footprint. */
  size?: OrganizationSize
  /** Geographic / political reach. */
  reach?: OrganizationReach
  /** Internal culture, atmosphere, and sense of shared identity. */
  culture?: string
  /** Guiding values, beliefs, or ideals the organization professes. */
  values?: string
  /** How openly the organization operates. */
  operations?: OrganizationOperations
  /** Assets, strengths, and capabilities the organization can draw on. */
  resources?: string
  /** Internal rules, codes, taboos, or restrictions members must observe. */
  rules?: string
  /** Sigils, colors, mottos, regalia, or other identifying marks (short). */
  symbols?: string
  /** Narrative of the organization's history and major developments over time. */
  history?: string
  /** Notable internal divisions — chapters, branches, orders, cells (structural). */
  divisions?: OrganizationEntry[]
  /** Important events, as placeholders that will link to the History/Events Canon. */
  events?: OrganizationEntry[]
  /** What the organization does well — advantages and strengths. */
  strengths?: string
  /** Vulnerabilities, liabilities, and weaknesses. */
  weaknesses?: string
  /** The organization's present standing in the world. */
  status?: OrganizationStatus
  /** Any additional canon information that doesn't fit the fields above. */
  additionalInfo?: string
  /** Freeform further notes — loose canon details that don't fit elsewhere yet. */
  notes?: string
}

/** Fields a user may edit from the organization's Canon editing home. */
export type OrganizationEdit = Partial<
  Pick<
    CanonOrganization,
    | "name"
    | "type"
    | "image"
    | "summary"
    | "description"
    | "purpose"
    | "founding"
    | "leadership"
    | "structure"
    | "size"
    | "reach"
    | "culture"
    | "values"
    | "operations"
    | "resources"
    | "rules"
    | "symbols"
    | "history"
    | "divisions"
    | "events"
    | "strengths"
    | "weaknesses"
    | "status"
    | "additionalInfo"
    | "notes"
  >
>

/* --------------------------------- Seed data -------------------------------- */

const seedOrganizations: Record<string, CanonOrganization> = {
  "the-ravenshollow-court": {
    id: "the-ravenshollow-court",
    name: "The Society",
    type: "government",
    summary: "A color-coded solar empire built on engineered hierarchy and inherited power.",
    description:
      "The Society organizes humanity by Color, assigning labor, education, privilege, and violence according to a rigid social design. Gold families govern through fleets, corporations, military academies, and rituals that make domination appear inevitable.",
    purpose:
      "To preserve order across the solar system by keeping each Color in its assigned role and preventing lower Colors from coordinating resistance.",
    founding:
      "Built through conquest, terraforming, genetic engineering, and the institutionalization of Color hierarchy.",
    leadership: "The Sovereign, supported by ruling Gold houses and the Senate",
    structure: "hierarchical",
    size: "vast",
    reach: "global",
    culture:
      "Ceremonial, competitive, and obsessed with lineage. Public elegance coexists with private brutality, while formal games and duels turn violence into social currency.",
    values:
      "Hierarchy, control, conquest, and the belief that unequal power prevents civilization from collapsing into chaos.",
    operations: "overt",
    resources:
      "Planetary fleets, monopolized infrastructure, military academies, genetic expertise, and control over communication and education.",
    rules:
      "Colors must perform their assigned labor; Golds must maintain the appearance of superiority; dissent is treated as treason and collective action as existential threat.",
    symbols: "Color hierarchy, laurel-and-sun imagery, gold armor, and the language of civilization versus chaos.",
    history:
      "The Society's apparent stability is challenged by the Sons of Ares, Darrow's infiltration, the collapse of old alliances, and the rise of a rebellion capable of fighting on equal strategic terms.",
    divisions: [
      { id: "div-senate", label: "The Senate", note: "Formal political body that gives Gold houses a venue for rivalry and legislation." },
      { id: "div-fleet", label: "The Fleet Hierarchy", note: "Military command structure that turns house power into interplanetary force." },
      { id: "div-color-administrations", label: "Color Administrations", note: "Civil institutions that assign labor, education, and movement by Color." },
    ],
    events: [
      { id: "evt-conquering", label: "The Conquering", note: "Expansion that established the Society's political and Color order." },
      { id: "evt-institute", label: "The Institute", note: "Elite training system that reproduces the ruling culture through engineered conflict." },
      { id: "evt-rising", label: "The Rising", note: "Rebellion that exposes the system's dependence on division and obedience." },
    ],
    strengths:
      "Resources, technology, military reach, and centuries of institutional knowledge.",
    weaknesses:
      "Arrogance, factional rivalry, dependence on obedience, and an inability to imagine that lower Colors can become political actors.",
    status: "fractured",
    additionalInfo:
      "Use this record as the parent context for the Gold houses, the military fleet, and the Color system.",
    notes: "The trilogy is especially useful for studying how a stable-looking regime can be weakened by internal competition.",
  },
  "the-emberguard": {
    id: "the-emberguard",
    name: "The Sons of Ares",
    type: "military",
    summary: "A covert revolutionary network that turns scattered resistance into coordinated rebellion.",
    description:
      "The Sons of Ares operate through cells, coded communications, and carefully selected alliances. Their greatest challenge is converting anger into a movement capable of governing after victory.",
    purpose:
      "To break the Society's hierarchy and create conditions in which the oppressed Colors can govern themselves.",
    leadership: "A hidden network of commanders behind Ares",
    structure: "hierarchical",
    size: "large",
    reach: "global",
    operations: "clandestine",
    status: "ascendant",
    culture: "Patient, suspicious, and intensely practical. Cells value results and secrecy over ceremony, while leaders debate how much transparency a future government can survive.",
    values: "Freedom, solidarity across Colors, strategic patience, and the refusal to treat oppression as permanent.",
    resources: "Hidden safehouses, informants, sympathetic workers, stolen intelligence, and cells embedded across Society infrastructure.",
    rules: "Compartmentalize knowledge, protect civilians, do not expose a cell for revenge, and never assume an ally shares the whole plan.",
    symbols: "The name Ares, coded messages, hidden marks, and the deliberate reuse of Society symbols against their original meaning.",
    history: "Resistance begins as scattered acts and becomes a network capable of coordinating military, political, and cultural pressure across worlds.",
    divisions: [
      { id: "div-cells", label: "Regional Cells", note: "Small groups that can survive the loss of a local leader." },
      { id: "div-intelligence", label: "Intelligence Network", note: "Workers, couriers, and defectors who map Society vulnerabilities." },
      { id: "div-liberation-army", label: "Liberation Forces", note: "Open military formations that emerge when secrecy becomes war." },
    ],
    events: [
      { id: "evt-arian-mine", label: "The Mars Mine Network", note: "Early resistance grows from communities that already share trust and communication routes." },
      { id: "evt-infiltration", label: "Darrow's Infiltration", note: "A single operative turns the Society's elite education system into an access point." },
      { id: "evt-open-war", label: "Open War", note: "The movement must become an army without reproducing the old hierarchy." },
    ],
    strengths: "Distributed organization, cross-Color recruitment, patience, and the ability to convert local knowledge into strategic advantage.",
    weaknesses: "Compartmentalization can produce distrust; revenge can fracture the coalition; victory creates a governance vacuum.",
    additionalInfo: "This record tests the organization editor's long text fields and repeatable division/event entries with a movement whose identity changes over the trilogy.",
    notes: "The trilogy provides useful material for separating a revolutionary network's mission, methods, and post-victory political problem.",
  },
  "the-still-circle": {
    id: "the-still-circle",
    name: "The Howlers",
    type: "secret-society",
    summary: "An unconventional strike force whose loyalty is built through shared danger rather than rank.",
    description:
      "The Howlers are feared for their improvisation, ferocity, and refusal to behave like a conventional unit. Under Sevro, their oddness becomes a tactical advantage and a model for a new kind of fellowship.",
    purpose: "To execute high-risk operations that conventional armies cannot attempt.",
    leadership: "Sevro au Barca",
    structure: "egalitarian",
    size: "small",
    reach: "continental",
    operations: "covert",
    status: "active",
    culture: "Loud, irreverent, and intensely loyal. The Howlers turn outsider status into identity and use humor to make fear survivable.",
    values: "Loyalty earned through action, protection of the vulnerable, tactical creativity, and contempt for inherited arrogance.",
    resources: "Veteran fighters, unconventional tactics, trusted bonds, and the ability to operate outside formal military expectations.",
    rules: "Do not abandon the pack; do not confuse cruelty with strength; settle disputes through loyalty and action rather than ceremony.",
    symbols: "Howling imagery, improvised armor, scars, private jokes, and marks of shared campaigns.",
    history: "The unit evolves from a feared band of specialists into a political and emotional center for the wider rebellion.",
    divisions: [
      { id: "div-howler-pack", label: "The Pack", note: "Core fighters whose loyalty is personal and tested in danger." },
      { id: "div-scouts", label: "Scouts and Saboteurs", note: "Small teams used for reconnaissance, disruption, and extraction." },
    ],
    events: [
      { id: "evt-institute-pack", label: "The Institute Pack", note: "Early bonds form under conditions designed to reward betrayal." },
      { id: "evt-war-campaigns", label: "The War Campaigns", note: "The Howlers become a mobile force with symbolic value beyond their size." },
    ],
    strengths: "Exceptional cohesion, adaptability, morale, and willingness to attempt plans that formal commanders reject.",
    weaknesses: "Small numbers, emotional overcommitment, dependence on key personalities, and difficulty translating pack loyalty into institutions.",
    additionalInfo: "This record intentionally distinguishes a military unit from the larger revolutionary organization that gives it purpose.",
    notes: "Useful for testing how organization records can hold culture and operational details without becoming character biographies.",
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
  const [organizations, setOrganizations] = useState<Record<string, CanonOrganization>>(() => {
    const records = { ...seedOrganizations, ...(redRisingDemo.organizations as unknown as Record<string, CanonOrganization>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("organization", id) }]))
  })

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
        image: patch.image,
        summary: patch.summary,
        description: patch.description,
        purpose: patch.purpose,
        founding: patch.founding,
        leadership: patch.leadership,
        structure: patch.structure,
        size: patch.size,
        reach: patch.reach,
        culture: patch.culture,
        values: patch.values,
        operations: patch.operations,
        resources: patch.resources,
        rules: patch.rules,
        symbols: patch.symbols,
        history: patch.history,
        divisions: patch.divisions,
        events: patch.events,
        strengths: patch.strengths,
        weaknesses: patch.weaknesses,
        status: patch.status,
        additionalInfo: patch.additionalInfo,
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
