"use client"

/**
 * Location Canon — the location counterpart to Character Canon.
 *
 * This is the authoritative, reusable source of truth for location records.
 * Future views (Location View, Map, Timeline, Content Builder) READ from this
 * layer and never own duplicate location information. Editing a record here
 * propagates to every consumer, exactly as the Character Canon layer does.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import type { MapSettlementSummary } from "./map-creator-bridge"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type MapLinkedLocationEntity = "settlement" | "marker" | "poi" | "location"

export type LocationCoordinates = {
  latitude?: number
  longitude?: number
  x?: number
  y?: number
}

export type LocationType =
  | "settlement"
  | "village"
  | "town"
  | "city"
  | "capital"
  | "region"
  | "province"
  | "territory"
  | "state"
  | "kingdom"
  | "empire"
  | "country"
  | "island"
  | "lake"
  | "river"
  | "sea"
  | "ocean"
  | "mountain"
  | "mountain-range"
  | "forest"
  | "desert"
  | "landmark"
  | "geographic-feature"
  | "poi"
  | "keep"
  | "legacy"

export const LOCATION_TYPES: { id: LocationType; label: string }[] = [
  { id: "settlement", label: "Settlement" },
  { id: "village", label: "Village" },
  { id: "town", label: "Town" },
  { id: "city", label: "City" },
  { id: "capital", label: "Capital" },
  { id: "region", label: "Region" },
  { id: "province", label: "Province" },
  { id: "territory", label: "Territory" },
  { id: "state", label: "State" },
  { id: "kingdom", label: "Kingdom" },
  { id: "empire", label: "Empire" },
  { id: "country", label: "Country" },
  { id: "island", label: "Island" },
  { id: "lake", label: "Lake" },
  { id: "river", label: "River" },
  { id: "sea", label: "Sea" },
  { id: "ocean", label: "Ocean" },
  { id: "mountain", label: "Mountain" },
  { id: "mountain-range", label: "Mountain Range" },
  { id: "forest", label: "Forest" },
  { id: "desert", label: "Desert" },
  { id: "landmark", label: "Landmark" },
  { id: "geographic-feature", label: "Geographic Feature" },
  { id: "poi", label: "Point of Interest" },
  { id: "keep", label: "Keep / Castle" },
]

export function locationTypeLabel(type: LocationType): string {
  return LOCATION_TYPES.find((t) => t.id === type)?.label ?? type
}

export type CanonLocation = {
  id: string
  name: string
  type: LocationType
  region?: string
  image?: string
  summary?: string
  description?: string
  founded?: string
  history?: string
  currentState?: string
  atmosphere?: string
  notableFeatures?: string
  hazards?: string
  population?: number
  populationNote?: string
  coordinates?: LocationCoordinates
  elevation?: number
  terrain?: string
  biome?: string
  climate?: string
  area?: string
  mapEntityId?: number | null
  mapEntityType?: MapLinkedLocationEntity
}

export type LocationEdit = Partial<
  Pick<CanonLocation,
    | "name"
    | "type"
    | "region"
    | "image"
    | "summary"
    | "description"
    | "founded"
    | "history"
    | "currentState"
    | "atmosphere"
    | "notableFeatures"
    | "hazards"
    | "population"
    | "populationNote"
    | "coordinates"
    | "elevation"
    | "terrain"
    | "biome"
    | "climate"
    | "area"
    | "mapEntityId"
    | "mapEntityType"
  >
>

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
    currentState: "Capital and political center",
    atmosphere: "Opulent, ceremonial, and oppressive",
    notableFeatures: "Governance halls, elite estates, and visible displays of hereditary power",
    population: 24000000,
    climate: "Controlled artificial environment",
    terrain: "Urbanized lunar surface",
    biome: "Metropolitan capital",
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
    currentState: "Under active political and social upheaval",
    atmosphere: "Harsh, industrial, and mythic",
    notableFeatures: "Helium-3 strip mines, underground settlements, and red labor communities",
    population: 180000000,
    terrain: "Desert and mining basin",
    biome: "Terraforming frontier",
    climate: "Cold and arid with controlled settlements",
    elevation: 96,
  },
  "duskwater-hollow": {
    id: "duskwater-hollow",
    name: "The Institute",
    type: "keep",
    region: "A remote Society training ground",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/SpaceX_Crew-8_launch.jpg",
    summary: "An elite academy where Gold heirs are trained through engineered conflict.",
    description:
      "The Institute turns education into a miniature war. Students gather resources, command allies, and survive betrayal while the Society's future leaders watch from above.",
    founded: "A long-standing academy of the Society",
    currentState: "Active but politically unstable",
    atmosphere: "Tense, competitive, and militarized",
    notableFeatures: "The Passage, house compounds, and war-game terrain",
    terrain: "Fortified training landscape",
  },
}

function toSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "location"
}

type LocationCanonContextValue = {
  locations: Record<string, CanonLocation>
  getLocation: (id: string | null | undefined) => CanonLocation | null
  getLocationByMapEntity: (mapEntityType: MapLinkedLocationEntity | string | null | undefined, mapEntityId: number | null | undefined) => CanonLocation | null
  updateLocation: (id: string, patch: LocationEdit) => void
  addLocation: (patch: LocationEdit) => string
  syncLocationFromMapSettlement: (settlement: MapSettlementSummary) => CanonLocation | null
}

const LocationCanonContext = createContext<LocationCanonContextValue | null>(null)

export function LocationCanonProvider({ children }: { children: ReactNode }) {
  const [locations, setLocations] = useState<Record<string, CanonLocation>>(() => {
    const records = { ...seedLocations, ...(redRisingDemo.locations as unknown as Record<string, CanonLocation>) }
    return Object.fromEntries(
      Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("location", id) }]),
    )
  })

  const getLocation = useCallback(
    (id: string | null | undefined): CanonLocation | null => (id ? (locations[id] ?? null) : null),
    [locations],
  )

  const getLocationByMapEntity = useCallback(
    (mapEntityType: MapLinkedLocationEntity | string | null | undefined, mapEntityId: number | null | undefined) => {
      if (!mapEntityType || !mapEntityId) return null
      const normalizedType = mapEntityType === "poi" ? "poi" : mapEntityType
      return Object.values(locations).find(
        (location) => location.mapEntityType === normalizedType && location.mapEntityId === mapEntityId,
      ) ?? null
    },
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
    const base = toSlug(patch.name ?? "location")
    let newId = base
    let createdId = base

    setLocations((previous) => {
      let suffix = 2
      while (previous[newId]) newId = `${base}-${suffix++}`
      createdId = newId
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
          history: patch.history,
          currentState: patch.currentState,
          atmosphere: patch.atmosphere,
          notableFeatures: patch.notableFeatures,
          hazards: patch.hazards,
          population: patch.population,
          populationNote: patch.populationNote,
          coordinates: patch.coordinates,
          elevation: patch.elevation,
          terrain: patch.terrain,
          biome: patch.biome,
          climate: patch.climate,
          area: patch.area,
          mapEntityId: patch.mapEntityId ?? null,
          mapEntityType: patch.mapEntityType ?? "location",
        },
      }
    })

    return createdId
  }, [])

  const syncLocationFromMapSettlement = useCallback(
    (settlement: MapSettlementSummary): CanonLocation | null => {
      let synchronized: CanonLocation | null = null
      setLocations((prev) => {
        const match = Object.values(prev).find(
          (location) => location.mapEntityId === settlement.id && (location.mapEntityType ?? "settlement") === "settlement",
        ) ?? Object.values(prev).find(
          (location) => location.name.trim().toLowerCase() === settlement.name.trim().toLowerCase(),
        )

        if (!match) {
          const newId = toSlug(settlement.name)
          const id = `${newId}-${settlement.id}`
          const record: CanonLocation = {
            id,
            name: settlement.name,
            type: "settlement",
            region: settlement.realm ?? settlement.province,
            summary: settlement.realm ? `${settlement.name} is a settlement in ${settlement.realm}.` : settlement.name,
            description: `${settlement.name} is represented on the map and tracked as a canonical settlement record.`,
            image: undefined,
            population: settlement.population,
            currentState: settlement.capital ? "Regional capital" : settlement.citadel ? "Fortified settlement" : settlement.port ? "Port settlement" : "Active",
            coordinates: settlement.x != null || settlement.y != null ? { x: settlement.x, y: settlement.y } : undefined,
            elevation: settlement.elevation,
            biome: settlement.biome,
            mapEntityId: settlement.id,
            mapEntityType: "settlement",
          }
          synchronized = record
          return { ...prev, [id]: record }
        }

        const patch: LocationEdit = {
          name: settlement.name,
          region: settlement.realm ?? match.region ?? settlement.province,
          summary: match.summary || (settlement.realm ? `${settlement.name} is a settlement in ${settlement.realm}.` : settlement.name),
          population: settlement.population,
          currentState: settlement.capital ? "Capital" : settlement.citadel ? "Fortified" : settlement.port ? "Port" : "Active",
          coordinates: settlement.x != null || settlement.y != null
            ? { ...match.coordinates, ...(settlement.x != null ? { x: settlement.x } : {}), ...(settlement.y != null ? { y: settlement.y } : {}) }
            : match.coordinates,
          elevation: settlement.elevation ?? match.elevation,
          biome: settlement.biome ?? match.biome,
          mapEntityId: settlement.id,
          mapEntityType: "settlement",
        }

        const next = { ...match, ...patch }
        synchronized = next
        return { ...prev, [match.id]: next }
      })

      return synchronized
    },
    [],
  )

  const value = useMemo<LocationCanonContextValue>(
    () => ({
      locations,
      getLocation,
      getLocationByMapEntity,
      updateLocation,
      addLocation,
      syncLocationFromMapSettlement,
    }),
    [locations, getLocation, getLocationByMapEntity, updateLocation, addLocation, syncLocationFromMapSettlement],
  )

  return <LocationCanonContext.Provider value={value}>{children}</LocationCanonContext.Provider>
}

export function useLocationCanon(): LocationCanonContextValue {
  const ctx = useContext(LocationCanonContext)
  if (!ctx) throw new Error("useLocationCanon must be used within a LocationCanonProvider")
  return ctx
}
