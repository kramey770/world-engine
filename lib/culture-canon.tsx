"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export type CultureType =
  | "ethnic"
  | "national"
  | "regional"
  | "tribal"
  | "religious"
  | "nomadic"
  | "urban"
  | "subcultural"
  | "other"

export const CULTURE_TYPES: { id: CultureType; label: string }[] = [
  { id: "ethnic", label: "Ethnic" },
  { id: "national", label: "National" },
  { id: "regional", label: "Regional" },
  { id: "tribal", label: "Tribal" },
  { id: "religious", label: "Religious" },
  { id: "nomadic", label: "Nomadic" },
  { id: "urban", label: "Urban" },
  { id: "subcultural", label: "Subcultural" },
  { id: "other", label: "Other" },
]

export function cultureTypeLabel(type: CultureType): string {
  return CULTURE_TYPES.find((option) => option.id === type)?.label ?? type
}

export type CanonCulture = {
  id: string
  name: string
  type: CultureType
  image?: string
  summary?: string
  description?: string
  geographicContext?: string
  coreValues?: string
  beliefsWorldview?: string
  socialStructure?: string
  primaryLanguage?: string
  languagesDialects?: string
  namingConventions?: string
  communicationCharacteristics?: string
  majorCustoms?: string
  traditions?: string
  ceremoniesRituals?: string
  holidaysCelebrations?: string
  familyHouseholdStructure?: string
  foodCuisine?: string
  clothingAppearance?: string
  housingSettlementPatterns?: string
  workOccupations?: string
  education?: string
  art?: string
  music?: string
  dance?: string
  literatureStorytelling?: string
  culturalSymbols?: string
  socialNorms?: string
  genderSocialRoles?: string
  statusClass?: string
  hospitality?: string
  taboos?: string
  honorShameConcepts?: string
  historicalInfluences?: string
  internalConflicts?: string
  externalInfluences?: string
  currentCulturalState?: string
  additionalInfo?: string
}

export type CultureEdit = Partial<
  Pick<
    CanonCulture,
    | "name"
    | "type"
    | "image"
    | "summary"
    | "description"
    | "geographicContext"
    | "coreValues"
    | "beliefsWorldview"
    | "socialStructure"
    | "primaryLanguage"
    | "languagesDialects"
    | "namingConventions"
    | "communicationCharacteristics"
    | "majorCustoms"
    | "traditions"
    | "ceremoniesRituals"
    | "holidaysCelebrations"
    | "familyHouseholdStructure"
    | "foodCuisine"
    | "clothingAppearance"
    | "housingSettlementPatterns"
    | "workOccupations"
    | "education"
    | "art"
    | "music"
    | "dance"
    | "literatureStorytelling"
    | "culturalSymbols"
    | "socialNorms"
    | "genderSocialRoles"
    | "statusClass"
    | "hospitality"
    | "taboos"
    | "honorShameConcepts"
    | "historicalInfluences"
    | "internalConflicts"
    | "externalInfluences"
    | "currentCulturalState"
    | "additionalInfo"
  >
>

type CultureCanonContextValue = {
  cultures: Record<string, CanonCulture>
  getCulture: (id: string | null | undefined) => CanonCulture | null
  updateCulture: (id: string, patch: CultureEdit) => void
  addCulture: (patch: CultureEdit) => string
}

const CultureCanonContext = createContext<CultureCanonContextValue | null>(null)

function makeId(name: string, existing: Record<string, CanonCulture>): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "culture"
  let id = base
  let suffix = 2
  while (existing[id]) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

export function CultureCanonProvider({ children }: { children: ReactNode }) {
  const [cultures, setCultures] = useState<Record<string, CanonCulture>>({})

  const getCulture = useCallback(
    (id: string | null | undefined): CanonCulture | null => (id ? (cultures[id] ?? null) : null),
    [cultures],
  )

  const updateCulture = useCallback((id: string, patch: CultureEdit) => {
    setCultures((previous) => {
      const existing = previous[id]
      if (!existing) return previous
      return { ...previous, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addCulture = useCallback((patch: CultureEdit): string => {
    const name = patch.name?.trim() || "Unnamed Culture"
    let newId = ""
    setCultures((previous) => {
      newId = makeId(name, previous)
      return {
        ...previous,
        [newId]: {
          id: newId,
          name,
          type: patch.type ?? "other",
          image: patch.image,
          summary: patch.summary,
          description: patch.description,
          geographicContext: patch.geographicContext,
          coreValues: patch.coreValues,
          beliefsWorldview: patch.beliefsWorldview,
          socialStructure: patch.socialStructure,
          primaryLanguage: patch.primaryLanguage,
          languagesDialects: patch.languagesDialects,
          namingConventions: patch.namingConventions,
          communicationCharacteristics: patch.communicationCharacteristics,
          majorCustoms: patch.majorCustoms,
          traditions: patch.traditions,
          ceremoniesRituals: patch.ceremoniesRituals,
          holidaysCelebrations: patch.holidaysCelebrations,
          familyHouseholdStructure: patch.familyHouseholdStructure,
          foodCuisine: patch.foodCuisine,
          clothingAppearance: patch.clothingAppearance,
          housingSettlementPatterns: patch.housingSettlementPatterns,
          workOccupations: patch.workOccupations,
          education: patch.education,
          art: patch.art,
          music: patch.music,
          dance: patch.dance,
          literatureStorytelling: patch.literatureStorytelling,
          culturalSymbols: patch.culturalSymbols,
          socialNorms: patch.socialNorms,
          genderSocialRoles: patch.genderSocialRoles,
          statusClass: patch.statusClass,
          hospitality: patch.hospitality,
          taboos: patch.taboos,
          honorShameConcepts: patch.honorShameConcepts,
          historicalInfluences: patch.historicalInfluences,
          internalConflicts: patch.internalConflicts,
          externalInfluences: patch.externalInfluences,
          currentCulturalState: patch.currentCulturalState,
          additionalInfo: patch.additionalInfo,
        },
      }
    })
    return newId
  }, [])

  const value = useMemo(
    () => ({ cultures, getCulture, updateCulture, addCulture }),
    [cultures, getCulture, updateCulture, addCulture],
  )

  return <CultureCanonContext.Provider value={value}>{children}</CultureCanonContext.Provider>
}

export function useCultureCanon(): CultureCanonContextValue {
  const context = useContext(CultureCanonContext)
  if (!context) throw new Error("useCultureCanon must be used within a CultureCanonProvider")
  return context
}
