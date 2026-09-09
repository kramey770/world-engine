"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

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

const seedCultures: Record<string, CanonCulture> = {
  "the-red-miners": {
    id: "the-red-miners",
    name: "The Red Miners",
    type: "subcultural",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    summary: "A labor culture shaped by dangerous extraction, inherited duty, and underground solidarity.",
    description: "The mining communities of Mars measure adulthood through contribution to the work and survival of the clan. Their songs, rituals, and family bonds preserve dignity inside a system designed to make them feel replaceable.",
    geographicContext: "The helium-3 mines beneath Mars",
    coreValues: "Family loyalty, practical courage, mutual aid, and hope for descendants.",
    beliefsWorldview: "The mine is dangerous, but the family is the true unit of survival. Society promises progress while asking the workers to accept permanent sacrifice.",
    socialStructure: "Extended families and work crews organized around experienced elders.",
    primaryLanguage: "Trade speech shared across the mines",
    languagesDialects: "A practical mine register carries technical vocabulary across settlements; formal Society language is used when dealing with overseers.",
    namingConventions: "Names carry family memory and occupational identity.",
    communicationCharacteristics: "Songs carry work instructions, warnings, and emotional memory; private conversations favor understatement because surveillance is ordinary.",
    majorCustoms: "Shared meals, work songs, and rites that mark dangerous assignments.",
    traditions: "Stories of ancestors and celebrations tied to the mining cycle.",
    ceremoniesRituals: "A worker's first descent is witnessed by family, and the dead are named before the next shift begins.",
    holidaysCelebrations: "Work-cycle milestones, family anniversaries, and rare rest days become communal festivals.",
    familyHouseholdStructure: "Large interdependent households with communal responsibility.",
    foodCuisine: "Dense, practical meals designed for shift work; preserved staples are improved by whatever hydroponic produce a settlement can spare.",
    clothingAppearance: "Protective work layers, patched utility garments, and small family tokens worn where supervisors cannot confiscate them.",
    housingSettlementPatterns: "Compact underground settlements cluster around shafts, water systems, communal kitchens, and emergency shelters.",
    workOccupations: "Helium-3 extraction, maintenance, engineering, and medical support.",
    education: "Skills are taught through apprenticeship, observation, and oral memory; formal Society education is narrow and politically controlled.",
    art: "Metalwork, carved tool handles, memorial marks, and improvised objects turn industrial materials into family history.",
    music: "Call-and-response work songs regulate dangerous labor and preserve names that official records erase.",
    dance: "Small-footed communal dances mirror the rhythm of machinery and are performed at family gatherings.",
    literatureStorytelling: "Oral histories connect present suffering to ancestral survival and quietly preserve forbidden interpretations of the hierarchy.",
    culturalSymbols: "The slingBlade, the mine, and the colors of the family crew.",
    socialNorms: "Never abandon a workmate; private grief becomes shared obligation.",
    genderSocialRoles: "Mining, caregiving, engineering, and organizing are distributed by skill and necessity more than formal gender rules, though the Society still imposes outside expectations.",
    statusClass: "Red, with internal status based on age, skill, family trust, and responsibility rather than wealth.",
    hospitality: "A guest is fed and given a safe place to sleep, because survival depends on reciprocal shelter.",
    taboos: "Endangering a work crew for personal gain, wasting shared resources, and abandoning the dead without witness.",
    honorShameConcepts: "Honor means carrying your share and protecting the vulnerable; shame is betrayal of the crew.",
    historicalInfluences: "Generations of mining, forced separation, Society propaganda, and the loss of family members to industrial accidents.",
    internalConflicts: "The need to preserve tradition can conflict with the need to organize change.",
    externalInfluences: "Society propaganda and centuries of enforced separation from other Colors.",
    currentCulturalState: "Awakening from isolated endurance into collective political action.",
    additionalInfo: "This record is deliberately broad so the editor can be tested with everyday culture and political pressure without collapsing the two into one description.",
  },
  "gold-house-culture": {
    id: "gold-house-culture",
    name: "The Gold Houses",
    type: "subcultural",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    summary: "Elite families who turn lineage, rivalry, and performance into a governing culture.",
    description: "Gold house culture trains its members to see command as birthright. Courtesy is strategic, weakness is publicly punished, and family honor can matter more than the survival of the wider Society.",
    geographicContext: "Luna, the Institute, and the Society's command fleets",
    coreValues: "Excellence, dominance, loyalty to house, and control of reputation.",
    beliefsWorldview: "Gold culture treats hierarchy as both natural and necessary, and interprets command as an obligation that proves superiority.",
    socialStructure: "Hereditary houses linked by marriage, patronage, and military alliances.",
    primaryLanguage: "Formal Society language",
    languagesDialects: "House slang, military registers, and coded etiquette distinguish insiders from outsiders.",
    namingConventions: "Names encode lineage, status, and affiliation through formal family markers.",
    communicationCharacteristics: "Indirect threats, ritual courtesy, strategic silence, and public debate used as tests of intelligence.",
    majorCustoms: "Duels, feasts, tests of wit, and public displays of restraint.",
    traditions: "House histories and military victories are treated as inherited property.",
    ceremoniesRituals: "Presentations, military graduations, funerals, and succession rites make hierarchy visible.",
    holidaysCelebrations: "Victory ceremonies and house anniversaries celebrate conquest while disguising the labor beneath it.",
    familyHouseholdStructure: "Large estates and command households organized around a ruling family, retainers, tutors, and servants.",
    foodCuisine: "Rare ingredients, elaborate presentation, and private dining rituals turn consumption into status display.",
    clothingAppearance: "Tailored formalwear, house colors, military armor, and carefully maintained physical enhancements.",
    housingSettlementPatterns: "Palaces, fleet flagships, academies, and private estates separate Gold life from the working Colors.",
    workOccupations: "Command, politics, military service, administration, ownership, and cultivation of reputation.",
    education: "Tutors, academies, combat training, rhetoric, history, and controlled exposure to violence prepare heirs to rule.",
    art: "Monumental sculpture, heraldry, architecture, and commissioned portraiture glorify lineage and victory.",
    music: "Formal orchestral music and martial ceremony accompany public power; private tastes distinguish rival houses.",
    dance: "Court dances rehearse hierarchy through proximity, invitation, and controlled spectacle.",
    literatureStorytelling: "Genealogies, military histories, and heroic epics teach that Gold rule is civilization's natural climax.",
    culturalSymbols: "Gold, laurel, fleet banners, and the language of civilization.",
    socialNorms: "Never reveal uncertainty in public; every relationship has political weight.",
    genderSocialRoles: "Official rhetoric allows exceptional women and men to command, but marriage and inheritance still make gender politically consequential.",
    statusClass: "The ruling Color, divided internally by house rank and faction.",
    hospitality: "Hospitality is lavish but conditional; a guest is welcomed as long as the visit strengthens the host's position.",
    taboos: "Public cowardice, uncontrolled emotion, disloyalty to house, and admitting that a lower Color may be an equal.",
    honorShameConcepts: "Honor is visible command; shame is dependence, defeat, or loss of control.",
    historicalInfluences: "The Conquering, the formation of the Society, generations of house rivalry, and the Institute's competitive traditions.",
    internalConflicts: "The culture rewards rivalry so strongly that it destabilizes collective rule.",
    externalInfluences: "Lower Colors, Rim traditions, rebellion, and exposure to people whose lives contradict Gold assumptions.",
    currentCulturalState: "Confident on the surface, increasingly fractured by rebellion and succession politics.",
    additionalInfo: "This record is intentionally dense enough to expose long-form field layout, empty-state behavior, and edit persistence across a complete culture entry.",
  },
}

export function CultureCanonProvider({ children }: { children: ReactNode }) {
  const [cultures, setCultures] = useState<Record<string, CanonCulture>>(() => {
    const records = { ...seedCultures, ...(redRisingDemo.cultures as unknown as Record<string, CanonCulture>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("culture", id) }]))
  })

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
