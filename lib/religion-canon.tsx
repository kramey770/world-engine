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
  /** One-line identity shown beneath the name. */
  summary?: string
  /** Long-form canonical description (the "biography" of the faith). */
  description?: string
}

/** Fields a user may edit from the religion's Canon editing home. */
export type ReligionEdit = Partial<Pick<CanonReligion, "name" | "type" | "summary" | "description">>

/* --------------------------------- Seed data -------------------------------- */

const seedReligions: Record<string, CanonReligion> = {
  "the-raven-court": {
    id: "the-raven-court",
    name: "The Raven Court",
    type: "pantheon",
    summary: "The death-and-memory pantheon revered across the Ashen Marches.",
    description:
      "An old northern faith centered on a court of feathered psychopomps who carry the names of the dead into memory. House Ravenshollow traces its right to rule from a covenant with the Court, and every lord of the Marches is sworn before its black altars.",
  },
  "the-still-water": {
    id: "the-still-water",
    name: "The Still Water",
    type: "mystery",
    summary: "A secretive lakeside mystery cult of the Duskwater line.",
    description:
      "Practiced quietly along the shores of Duskwater Vale, the Still Water teaches that truth surfaces only in perfect stillness. Its initiates keep long silences and read meaning in undisturbed reflections, and outsiders are rarely permitted to witness its rites.",
  },
  "the-emberkeepers": {
    id: "the-emberkeepers",
    name: "The Emberkeepers",
    type: "philosophy",
    // summary intentionally omitted to demonstrate that view mode hides
    // empty/unused fields rather than showing blank rows.
    description:
      "A wandering order that tends sacred fires said to hold the first spark of the world. More a discipline than a worship, the Emberkeepers believe a civilization survives only as long as its flame is never allowed to die.",
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
  const [religions, setReligions] = useState<Record<string, CanonReligion>>(() => ({ ...seedReligions }))

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
