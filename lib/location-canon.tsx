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
  Pick<CanonLocation, "name" | "type" | "region" | "image" | "summary" | "description" | "founded">
>

/* --------------------------------- Seed data -------------------------------- */

const seedLocations: Record<string, CanonLocation> = {
  "corvath-keep": {
    id: "corvath-keep",
    name: "Luna",
    type: "city",
    region: "The Society",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    summary: "The glittering political center of the Society and its ruling families.",
    description:
      "Luna concentrates the wealth, ceremony, and political theater of the Color hierarchy. Luxury disguises violence, and every public ritual reinforces the idea that the social order is permanent.",
    founded: "Established during the Society's expansion beyond Earth",
  },
  "ashen-marches": {
    id: "ashen-marches",
    name: "Mars",
    type: "region",
    region: "The Inner Planets",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    summary: "A terraformed world whose buried population becomes the spark of rebellion.",
    description:
      "Mars is presented to the ruling Colors as a prize of civilization, while its mines conceal generations of exploited Reds. For Darrow, it is both home and the first place where the scale of the lie becomes impossible to ignore.",
    founded: "Long settled before the trilogy's opening",
  },
  "duskwater-hollow": {
    id: "duskwater-hollow",
    name: "The Institute",
    type: "keep",
    region: "A remote Society training ground",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/SpaceX_Crew-8_launch.jpg",
    // summary intentionally omitted to demonstrate that view mode hides
    // empty/unused fields rather than showing blank rows.
    summary: "An elite academy where Gold heirs are trained through engineered conflict.",
    description:
      "The Institute turns education into a miniature war. Students gather resources, command allies, and survive betrayal while the Society's future leaders watch from above.",
    founded: "A long-standing academy of the Society",
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
  addLocation: (patch: LocationEdit) => string
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

  const addLocation = useCallback((patch: LocationEdit): string => {
    const base =
      (patch.name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "location")
    let newId = base
    setLocations((previous) => {
      let suffix = 2
      while (previous[newId]) newId = `${base}-${suffix++}`
      return {
        ...previous,
        [newId]: {
          id: newId,
          name: patch.name?.trim() || "Unnamed Location",
          type: patch.type ?? "landmark",
          region: patch.region,
          image: patch.image,
          summary: patch.summary,
          description: patch.description,
          founded: patch.founded,
        },
      }
    })
    return newId
  }, [])

  const value = useMemo<LocationCanonContextValue>(
    () => ({ locations, getLocation, updateLocation, addLocation }),
    [locations, getLocation, updateLocation, addLocation],
  )

  return <LocationCanonContext.Provider value={value}>{children}</LocationCanonContext.Provider>
}

export function useLocationCanon(): LocationCanonContextValue {
  const ctx = useContext(LocationCanonContext)
  if (!ctx) throw new Error("useLocationCanon must be used within a LocationCanonProvider")
  return ctx
}
