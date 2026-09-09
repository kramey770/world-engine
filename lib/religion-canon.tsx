"use client"

/**
 * Religion Canon — the religion counterpart to Character and Location Canon.
 *
 * This is the authoritative, reusable source of truth for religion records.
 * Future views (Religion View, Visualization, Content Builder) READ from this
 * layer and never own duplicate religion information. Editing a record here
 * propagates to every consumer, exactly as the Character/Location Canon layers do.
 *
 * FIRST-LAYER pass only: client-side, in-memory, seeded with a small amount of
 * mock data. No database/API/persistence and no Religion Creator yet — the goal
 * is to establish the shared data contract and application pathway
 * (Religion → Canon Record → View) so the future Creator has a destination.
 *
 * The schema is intentionally minimal (name, type, summary, description). The
 * full sci-fi/fantasy religion information model will be designed separately.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

/** The broad tradition a canon religion belongs to. Intentionally short for now. */
export type ReligionType = "pantheon" | "monotheism" | "ancestral" | "mystery" | "philosophy" | "folk"

export const RELIGION_TYPES: { id: ReligionType; label: string }[] = [
  { id: "pantheon", label: "Pantheon" },
  { id: "monotheism", label: "Monotheistic Faith" },
  { id: "ancestral", label: "Ancestral Worship" },
  { id: "mystery", label: "Mystery Cult" },
  { id: "philosophy", label: "Philosophy / Order" },
  { id: "folk", label: "Folk Belief" },
]

export function religionTypeLabel(type: ReligionType): string {
  return RELIGION_TYPES.find((t) => t.id === type)?.label ?? type
}

/**
 * The canonical Religion record. Intentionally minimal for this first layer —
 * just enough structure to prove the data flow. The eventual Religion Creator
 * will expand this schema; consumers should treat extra fields as optional.
 */
export type CanonReligion = {
  id: string
  name: string
  type: ReligionType
  image?: string
  /** One-line identity shown beneath the name. */
  summary?: string
  /** Long-form canonical description (the "biography" of the faith). */
  description?: string
}

/** Fields a user may edit from the religion's Canon editing home. */
export type ReligionEdit = Partial<Pick<CanonReligion, "name" | "type" | "image" | "summary" | "description">>

/* --------------------------------- Seed data -------------------------------- */

const seedReligions: Record<string, CanonReligion> = {
  "the-raven-court": {
    id: "the-raven-court",
    name: "The Reaper Myth",
    type: "philosophy",
    summary: "The heroic identity Darrow constructs to give rebellion a symbol and a story.",
    description:
      "Darrow's public persona becomes more than a military title. It gathers grief, hope, and fear around the image of a figure who can cross the boundaries of Color and class, even as the person beneath the myth struggles with being made into a symbol.",
  },
  "the-still-water": {
    id: "the-still-water",
    name: "The Society's Order",
    type: "philosophy",
    summary: "The ideology that treats hierarchy as the natural shape of civilization.",
    description:
      "The Society frames domination as stewardship and inherited power as proof of fitness. Its ceremonies and institutions teach citizens to mistake obedience for stability and privilege for merit.",
  },
  "the-emberkeepers": {
    id: "the-emberkeepers",
    name: "The Free Peoples' Creed",
    type: "folk",
    // summary intentionally omitted to demonstrate that view mode hides
    // empty/unused fields rather than showing blank rows.
    summary: "The shared belief that people can choose solidarity over the hierarchy assigned to them.",
    description:
      "This is not a formal religion but a growing moral language among the oppressed: no Color is born to serve another, and freedom requires mutual risk. The creed changes as the Rising moves from secret resistance to open war.",
  },
}

/* --------------------------------- Context ---------------------------------- */

type ReligionCanonContextValue = {
  /** All canon religion records, keyed by stable id. */
  religions: Record<string, CanonReligion>
  /** Read a single record (null-safe). */
  getReligion: (id: string | null | undefined) => CanonReligion | null
  /** Apply a partial update to a record; reflected immediately in all views. */
  updateReligion: (id: string, patch: ReligionEdit) => void
}

const ReligionCanonContext = createContext<ReligionCanonContextValue | null>(null)

export function ReligionCanonProvider({ children }: { children: ReactNode }) {
  const [religions, setReligions] = useState<Record<string, CanonReligion>>(() => {
    const records = { ...seedReligions, ...(redRisingDemo.religions as unknown as Record<string, CanonReligion>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("religion", id) }]))
  })

  const getReligion = useCallback(
    (id: string | null | undefined): CanonReligion | null => (id ? (religions[id] ?? null) : null),
    [religions],
  )

  const updateReligion = useCallback((id: string, patch: ReligionEdit) => {
    setReligions((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }, [])

  const value = useMemo<ReligionCanonContextValue>(
    () => ({ religions, getReligion, updateReligion }),
    [religions, getReligion, updateReligion],
  )

  return <ReligionCanonContext.Provider value={value}>{children}</ReligionCanonContext.Provider>
}

export function useReligionCanon(): ReligionCanonContextValue {
  const ctx = useContext(ReligionCanonContext)
  if (!ctx) throw new Error("useReligionCanon must be used within a ReligionCanonProvider")
  return ctx
}
