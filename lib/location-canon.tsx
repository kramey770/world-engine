"use client"

/**
 * Location Canon — the location counterpart to Character Canon.
 *
 * This is the authoritative, reusable source of truth for location records.
 * Future views (Location View, Map, Timeline, Content Builder) READ from this
 * layer and never own duplicate location information. Editing a record here
 * propagates to every consumer, exactly as the Character Canon layer does.
 *
 * Foundation pass only: client-side, in-memory, seeded with a small amount of
 * mock data. No database/API/persistence yet — the goal is to establish the
 * shared data contract and application pathway (Location → Canon Record → View).
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/** The kinds of place a canon location can be. Intentionally short for now. */
export type LocationType = "city" | "keep" | "region" | "landmark" | "settlement"

export const LOCATION_TYPES: { id: LocationType; label: string }[] = [
  { id: "region", label: "Region" },
  { id: "city", label: "City" },
  { id: "settlement", label: "Settlement" },
  { id: "keep", label: "Keep / Castle" },
  { id: "landmark", label: "Landmark" },
]

export function locationTypeLabel(type: LocationType): string {
  return LOCATION_TYPES.find((t) => t.id === type)?.label ?? type
}

/**
 * The canonical Location record. Intentionally minimal for this foundation
 * pass — just enough structure to prove the data flow. The eventual Location
 * Creator will expand this schema; consumers should treat extra fields as
 * optional.
 */
export type CanonLocation = {
  id: string
  name: string
  type: LocationType
  /** Where this place sits — a parent region, realm, or geographic anchor. */
  region?: string
  /** Optional atmospheric image, mirroring character portraits. */
  image?: string
  /** One-line identity shown beneath the name. */
  summary?: string
  /** Long-form canonical description (the "biography" of the place). */
  description?: string
  /** When the place was founded / first established. */
  founded?: string
}

/** Fields a user may edit from the location's Canon editing home. */
export type LocationEdit = Partial<
  Pick<CanonLocation, "name" | "type" | "region" | "summary" | "description" | "founded">
>

/* --------------------------------- Seed data -------------------------------- */

const seedLocations: Record<string, CanonLocation> = {
  "corvath-keep": {
    id: "corvath-keep",
    name: "Corvath Keep",
    type: "keep",
    region: "The Ashen Marches",
    image: "/locations/corvath-keep.png",
    summary: "Ancestral seat of House Ravenshollow.",
    description:
      "A grim clifftop fortress of black stone that has guarded the northern approach for eight generations. Its ravenwatch towers are said to have never fallen to a siege, and the great hall still bears the banners of every lord who has held the Marches.",
    founded: "Founded 118 AR",
  },
  "ashen-marches": {
    id: "ashen-marches",
    name: "The Ashen Marches",
    type: "region",
    region: "Northern Reach",
    image: "/locations/ashen-marches.png",
    summary: "The contested borderland the Ravenshollows are sworn to hold.",
    description:
      "A wide expanse of ash-grey plains and weathered ridges where little grows and fewer stay. The Marches have changed hands in war more than once, and the burnt watchtowers along its ridgelines still stand as a warning to any who would cross.",
    founded: "",
  },
  "duskwater-hollow": {
    id: "duskwater-hollow",
    name: "Duskwater Hollow",
    type: "settlement",
    region: "Duskwater Vale",
    image: "/locations/duskwater-hollow.png",
    // summary intentionally omitted to demonstrate that view mode hides
    // empty/unused fields rather than showing blank rows.
    description:
      "A quiet lakeside town of lantern-lit docks and stilted stone houses, home of the Duskwater line. Its still teal waters feed the trade that keeps the vale prosperous even through the hardest winters.",
    founded: "Founded 204 AR",
  },
}

/* --------------------------------- Context ---------------------------------- */

type LocationCanonContextValue = {
  /** All canon location records, keyed by stable id. */
  locations: Record<string, CanonLocation>
  /** Read a single record (null-safe). */
  getLocation: (id: string | null | undefined) => CanonLocation | null
  /** Apply a partial update to a record; reflected immediately in all views. */
  updateLocation: (id: string, patch: LocationEdit) => void
}

const LocationCanonContext = createContext<LocationCanonContextValue | null>(null)

export function LocationCanonProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<Record<string, CanonLocation>>(() => ({ ...seedLocations }))

  const getLocation = useCallback(
    (id: string | null | undefined): CanonLocation | null => (id ? (locations[id] ?? null) : null),
    [locations],
  )

  const updateLocation = useCallback((id: string, patch: LocationEdit) => {
    setLocations((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }, [])

  const value = useMemo<LocationCanonContextValue>(
    () => ({ locations, getLocation, updateLocation }),
    [locations, getLocation, updateLocation],
  )

  return <LocationCanonContext.Provider value={value}>{children}</LocationCanonContext.Provider>
}

export function useLocationCanon(): LocationCanonContextValue {
  const ctx = useContext(LocationCanonContext)
  if (!ctx) throw new Error("useLocationCanon must be used within a LocationCanonProvider")
  return ctx
}
