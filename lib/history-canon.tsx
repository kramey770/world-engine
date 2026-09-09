"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type HistoryType =
  | "event"
  | "period"
  | "era"
  | "development"
  | "conflict"
  | "disaster"
  | "turning-point"
  | "founding"
  | "collapse"
  | "other"

export type DurationType = "moment" | "short-period" | "extended-period" | "ongoing" | "unknown" | "other"
export type ChronologicalPrecision = "exact" | "approximate" | "range" | "unknown"
export type Importance = "foundational" | "major" | "significant" | "moderate" | "minor" | "unknown"
export type Relevance = "world-wide" | "multi-region" | "regional" | "local" | "personal" | "unknown"
export type DiscoveryAwareness = "immediate" | "later" | "rediscovered" | "disputed" | "unknown" | "other"

export type HistoryEntityType = "character" | "location" | "religion" | "organization" | "culture" | "concept"

export type HistoryEntityReference = {
  entityType: HistoryEntityType
  entityId: string
}

export const HISTORY_TYPES: { id: HistoryType; label: string }[] = [
  { id: "event", label: "Event" },
  { id: "period", label: "Period" },
  { id: "era", label: "Era" },
  { id: "development", label: "Development" },
  { id: "conflict", label: "Conflict" },
  { id: "disaster", label: "Disaster" },
  { id: "turning-point", label: "Turning Point" },
  { id: "founding", label: "Founding / Establishment" },
  { id: "collapse", label: "Collapse / Destruction" },
  { id: "other", label: "Other" },
]

export const DURATION_TYPES: { id: DurationType; label: string }[] = [
  { id: "moment", label: "Moment / Point" },
  { id: "short-period", label: "Short Period" },
  { id: "extended-period", label: "Extended Period" },
  { id: "ongoing", label: "Ongoing" },
  { id: "unknown", label: "Unknown / Uncertain" },
  { id: "other", label: "Other" },
]

export const CHRONOLOGICAL_PRECISIONS: { id: ChronologicalPrecision; label: string }[] = [
  { id: "exact", label: "Exact" },
  { id: "approximate", label: "Approximate" },
  { id: "range", label: "Range" },
  { id: "unknown", label: "Unknown" },
]

export const IMPORTANCE_LEVELS: { id: Importance; label: string }[] = [
  { id: "foundational", label: "Foundational" },
  { id: "major", label: "Major" },
  { id: "significant", label: "Significant" },
  { id: "moderate", label: "Moderate" },
  { id: "minor", label: "Minor" },
  { id: "unknown", label: "Unknown / Unclear" },
]

export const RELEVANCE_LEVELS: { id: Relevance; label: string }[] = [
  { id: "world-wide", label: "World-Wide" },
  { id: "multi-region", label: "Multi-Region" },
  { id: "regional", label: "Regional" },
  { id: "local", label: "Local" },
  { id: "personal", label: "Personal" },
  { id: "unknown", label: "Unknown / Unclear" },
]

export const DISCOVERY_AWARENESS: { id: DiscoveryAwareness; label: string }[] = [
  { id: "immediate", label: "Known Immediately" },
  { id: "later", label: "Discovered Later" },
  { id: "rediscovered", label: "Rediscovered" },
  { id: "disputed", label: "Disputed" },
  { id: "unknown", label: "Unknown" },
  { id: "other", label: "Other" },
]

export type CanonHistory = {
  id: string
  name: string
  chronology: number
  type: HistoryType
  typeOther?: string
  era?: string
  eraId?: string
  occurrence?: string
  end?: string
  duration?: string
  durationType?: DurationType
  durationTypeOther?: string
  chronologicalPrecision?: ChronologicalPrecision
  narrativeOrder?: number
  discoveryTime?: string
  discoveryAwareness?: DiscoveryAwareness
  discoveryAwarenessOther?: string
  historicalContext?: string
  causes?: string
  preconditions?: string
  development?: string
  turningPoint?: string
  participants?: HistoryEntityReference[]
  primaryParticipants?: HistoryEntityReference[]
  outcome?: string
  immediateConsequences?: string
  longTermConsequences?: string
  relevance?: number
  importance?: number
  importanceLevel?: Importance
  relevanceLevel?: Relevance
  historicalEvidence?: string
  additionalInformation?: string
  image?: string
  summary?: string
}

export type HistoryEdit = Partial<Omit<CanonHistory, "id">>

type HistoryCanonContextValue = {
  histories: Record<string, CanonHistory>
  getHistory: (id: string | null | undefined) => CanonHistory | null
  updateHistory: (id: string, patch: HistoryEdit) => void
  addHistory: (patch: HistoryEdit) => string
  reorderHistory: (draggedId: string, targetId: string) => void
}

const HistoryCanonContext = createContext<HistoryCanonContextValue | null>(null)
const STORAGE_KEY = "world-engine-history-canon"

const seedHistories: Record<string, CanonHistory> = {
  "the-society-era": {
    id: "the-society-era",
    name: "The Society Era",
    chronology: 0,
    type: "era",
    occurrence: "After the Conquering",
    durationType: "ongoing",
    chronologicalPrecision: "approximate",
    importanceLevel: "foundational",
    relevanceLevel: "world-wide",
    summary: "The long age of Color hierarchy, Gold rule, and engineered order across the solar system.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    historicalContext: "The Society presents conquest, genetic engineering, and assigned labor as the natural foundations of civilization.",
    historicalEvidence: "Society archives, Color institutions, military records, family genealogies, and surviving infrastructure.",
  },
  "the-conquering": {
    id: "the-conquering",
    name: "The Conquering",
    chronology: 10,
    type: "founding",
    era: "The Society Era",
    eraId: "the-society-era",
    occurrence: "The early expansion of the Society",
    duration: "Generations of expansion and consolidation",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "foundational",
    relevanceLevel: "world-wide",
    summary: "The expansion that establishes the Society's political order and spreads Color hierarchy across humanity.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    historicalContext: "Humanity reaches beyond Earth while powerful Gold families turn expansion, terraforming, and genetic design into a system of inherited rule.",
    causes: "Resource pressure, technological ambition, and the desire of ruling families to control newly settled worlds.",
    preconditions: "Interplanetary travel, engineered Colors, military fleets, and institutions willing to equate hierarchy with stability.",
    development: "Conquest becomes administration; administration becomes ritual; ritual teaches each Color that its assigned place is permanent.",
    outcome: "The Society becomes the dominant political structure across the solar system.",
    immediateConsequences: "Worlds, occupations, education, and mobility are reorganized around the Color hierarchy.",
    longTermConsequences: "The system creates the conditions for centuries of exploitation and the rebellion that eventually challenges it.",
    participants: [{ entityType: "organization", entityId: "the-ravenshollow-court" }],
    primaryParticipants: [{ entityType: "organization", entityId: "the-ravenshollow-court" }],
    narrativeOrder: 1,
    historicalEvidence: "Society law, fleet histories, settlement records, and the surviving hierarchy of Colors.",
  },
  "the-color-hierarchy-established": {
    id: "the-color-hierarchy-established",
    name: "The Color Hierarchy Is Institutionalized",
    chronology: 20,
    type: "development",
    era: "The Society Era",
    eraId: "the-society-era",
    occurrence: "During the Society's consolidation",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "foundational",
    relevanceLevel: "world-wide",
    summary: "Engineered biology, assigned labor, and inherited status become the organizing logic of everyday life.",
    historicalContext: "The Society needs more than military victory; it needs ordinary institutions to reproduce obedience without constant visible force.",
    causes: "The ruling class's need to stabilize conquest and make unequal power appear natural.",
    preconditions: "Genetic engineering, separate Color cultures, controlled education, and an economy dependent on assigned labor.",
    development: "Color identity moves from a political arrangement into bodies, names, occupations, ceremonies, and expectations for the future.",
    turningPoint: "The hierarchy becomes difficult to imagine as a human-made system rather than an unavoidable law of nature.",
    outcome: "Every major institution begins reinforcing the same social order.",
    longTermConsequences: "Resistance must cross boundaries deliberately designed to prevent shared identity and trust.",
    participants: [{ entityType: "organization", entityId: "the-ravenshollow-court" }, { entityType: "concept", entityId: "the-color-hierarchy" }],
    primaryParticipants: [{ entityType: "concept", entityId: "the-color-hierarchy" }],
    historicalEvidence: "Color assignments, educational systems, occupational records, and the architecture of Society settlements.",
  },
  "the-mars-mines-resistance": {
    id: "the-mars-mines-resistance",
    name: "Resistance in the Mars Mines",
    chronology: 30,
    type: "conflict",
    era: "The Society Era",
    eraId: "the-society-era",
    occurrence: "The generations before the Rising",
    duration: "Repeated acts of refusal and mutual aid",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "significant",
    relevanceLevel: "multi-region",
    summary: "Mining communities preserve solidarity and begin turning survival into organized resistance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    historicalContext: "Red miners live beneath the surface of Mars, carrying the labor that makes Society expansion possible while remaining excluded from its rewards.",
    causes: "Dangerous labor, family separation, resource extraction, and the daily violence of assigned status.",
    preconditions: "Shared work crews, inherited memory, underground settlements, and communication routes outside Gold oversight.",
    development: "Small acts of sabotage, mutual protection, and forbidden stories form the social foundation later used by wider revolutionary networks.",
    outcome: "Mars becomes a source of both labor and revolutionary knowledge.",
    immediateConsequences: "Supervisors increase surveillance while miners deepen relationships that cannot be fully monitored.",
    longTermConsequences: "The mines become one of the places where the Society's claim of permanent obedience begins to fail.",
    participants: [{ entityType: "location", entityId: "ashen-marches" }, { entityType: "organization", entityId: "the-emberguard" }],
    historicalEvidence: "Worker songs, mine traditions, coded messages, accident records, and testimony from liberated miners.",
  },
  "the-rising-era": {
    id: "the-rising-era",
    name: "The Rising",
    chronology: 40,
    type: "era",
    occurrence: "The opening of the rebellion",
    duration: "From covert resistance into open war",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "foundational",
    relevanceLevel: "world-wide",
    summary: "An age in which scattered resistance becomes a coalition capable of contesting the Society.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/SpaceX_Crew-8_launch.jpg",
    historicalContext: "The hierarchy has become powerful enough to seem permanent, but its internal divisions create openings for people who learn to coordinate across Colors.",
    historicalEvidence: "Rebel communications, military campaigns, witness accounts, recovered archives, and the institutions formed after the old order fractures.",
  },
  "darrows-transformation": {
    id: "darrows-transformation",
    name: "Darrow's Transformation",
    chronology: 50,
    type: "turning-point",
    era: "The Rising",
    eraId: "the-rising-era",
    occurrence: "Before Darrow enters the Institute",
    durationType: "short-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "major",
    relevanceLevel: "world-wide",
    summary: "A Red miner is remade to pass as Gold and becomes an access point inside the Society's ruling class.",
    historicalContext: "The Sons of Ares need more than an uprising from below; they need someone who can expose the ruling system from within.",
    causes: "The murder of Eo, the conditions of the Mars mines, and the revolutionary strategy of reaching the Society's institutions.",
    preconditions: "Darrow's physical aptitude, mining knowledge, grief, and the existence of a clandestine network willing to attempt an impossible infiltration.",
    development: "Darrow undergoes surgical transformation, intensive education, and identity training before being placed among Gold heirs.",
    turningPoint: "Darrow accepts that survival as a symbol requires him to act inside the world he has been taught to hate.",
    outcome: "The rebellion gains an operative with access to the Institute and the future leadership of the Society.",
    immediateConsequences: "Darrow must conceal his origin while building alliances with people who may become enemies or partners.",
    longTermConsequences: "The distinction between infiltrator, leader, and symbol becomes one of the central tensions of the Rising.",
    participants: [{ entityType: "character", entityId: "alden" }, { entityType: "organization", entityId: "the-emberguard" }],
    primaryParticipants: [{ entityType: "character", entityId: "alden" }],
    narrativeOrder: 2,
    discoveryAwareness: "disputed",
    historicalEvidence: "Medical records, rebel testimony, Institute reports, and Darrow's later account.",
  },
  "the-institute-year": {
    id: "the-institute-year",
    name: "The Institute Year",
    chronology: 60,
    type: "period",
    era: "The Rising",
    eraId: "the-rising-era",
    occurrence: "Darrow's first year among Gold heirs",
    duration: "One competitive academic campaign",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "major",
    relevanceLevel: "multi-region",
    summary: "The Institute turns Gold education into engineered conflict and gives the rebellion access to its future commanders.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/SpaceX_Crew-8_launch.jpg",
    historicalContext: "Gold heirs are trained through scarcity, rivalry, loyalty tests, and controlled violence while the Society observes from above.",
    causes: "The Society's belief that command must be proven through competition and the rebellion's need to penetrate that system.",
    preconditions: "The Institute's enclosed war games, inherited house rivalries, and Darrow's manufactured identity.",
    development: "Students form packs, seize resources, betray allies, and gradually discover that the game rewards cooperation as much as domination.",
    outcome: "Darrow earns influence among future leaders while the Institute's culture becomes vulnerable from inside.",
    immediateConsequences: "New alliances form between Darrow, Sevro, and other students whose loyalties exceed house expectations.",
    longTermConsequences: "The Society's own training ground produces relationships and knowledge that later strengthen the rebellion.",
    participants: [{ entityType: "location", entityId: "duskwater-hollow" }, { entityType: "character", entityId: "alden" }, { entityType: "character", entityId: "nyla" }],
    primaryParticipants: [{ entityType: "character", entityId: "alden" }, { entityType: "location", entityId: "duskwater-hollow" }],
    narrativeOrder: 3,
    historicalEvidence: "Institute records, surviving student testimony, military reports, and the later campaigns of its graduates.",
  },
  "the-open-rising": {
    id: "the-open-rising",
    name: "The Rising Becomes Open War",
    chronology: 70,
    type: "conflict",
    era: "The Rising",
    eraId: "the-rising-era",
    occurrence: "After the Institute campaign",
    duration: "The rebellion's first sustained military phase",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "major",
    relevanceLevel: "world-wide",
    summary: "The revolutionary movement shifts from hidden cells and infiltration into campaigns that openly contest Society power.",
    historicalContext: "The rebellion can no longer remain only a secret network once its victories, symbols, and alliances begin spreading across worlds.",
    causes: "The collapse of secrecy, the growth of cross-Color alliances, and the Society's attempts to crush resistance through public force.",
    preconditions: "The Mars mine networks, the Sons of Ares, Darrow's infiltration, and fighters formed through the Institute and Howlers.",
    development: "Cells become armies, private grievances become public claims, and every victory forces the coalition to define what liberation should mean.",
    outcome: "The Society faces an organized enemy that can fight militarily and politically.",
    immediateConsequences: "Worlds choose sides, military houses fracture, and the language of citizenship begins replacing the language of Color.",
    longTermConsequences: "Victory becomes inseparable from the question of whether the rebellion can build institutions without reproducing domination.",
    participants: [{ entityType: "organization", entityId: "the-emberguard" }, { entityType: "organization", entityId: "the-still-circle" }, { entityType: "character", entityId: "alden" }],
    historicalEvidence: "Battle reports, rebel communications, liberated archives, and the testimony of participants across Colors.",
  },
  "the-society-fractures": {
    id: "the-society-fractures",
    name: "The Society Fractures",
    chronology: 80,
    type: "collapse",
    era: "The Rising",
    eraId: "the-rising-era",
    occurrence: "The later campaigns of the Rising",
    durationType: "extended-period",
    chronologicalPrecision: "approximate",
    importanceLevel: "foundational",
    relevanceLevel: "world-wide",
    summary: "Military defeat, factional rivalry, and rebellion break the appearance of permanent Gold unity.",
    historicalContext: "The Society's strength depends on obedience and coordinated hierarchy, but its ruling houses increasingly compete for survival and control.",
    causes: "Rebel victories, internal Gold rivalry, the cost of prolonged war, and the exposure of contradictions inside the Color system.",
    preconditions: "Centuries of factional competition hidden beneath ceremonial unity and a rebellion capable of exploiting those divisions.",
    development: "Houses defect, armies split, old institutions lose authority, and new leaders attempt to claim legitimacy while the old order collapses.",
    outcome: "The Society can no longer function as a single unquestioned political order.",
    immediateConsequences: "Power becomes contested across fleets, worlds, houses, and revolutionary councils.",
    longTermConsequences: "The post-Society future must solve governance, justice, and identity without simply repainting the old hierarchy.",
    participants: [{ entityType: "organization", entityId: "the-ravenshollow-court" }, { entityType: "organization", entityId: "the-emberguard" }, { entityType: "character", entityId: "corwin" }],
    primaryParticipants: [{ entityType: "organization", entityId: "the-ravenshollow-court" }, { entityType: "organization", entityId: "the-emberguard" }],
    discoveryAwareness: "immediate",
    historicalEvidence: "Fallen institutions, captured communications, defector testimony, and the political settlements that follow the war.",
  },
}

function makeId(name: string, existing: Record<string, CanonHistory>): string {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "history"
  let id = base
  let suffix = 2
  while (existing[id]) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

function orderHistories(histories: Record<string, CanonHistory>): Record<string, CanonHistory> {
  return Object.fromEntries(
    Object.values(histories)
      .sort((left, right) => left.chronology - right.chronology)
      .map((history, index) => [history.id, { ...history, type: history.type ?? "event", chronology: index }]),
  )
}

export function HistoryCanonProvider({ children }: { children: ReactNode }) {
  const [histories, setHistories] = useState<Record<string, CanonHistory>>(() => {
    const records = { ...seedHistories, ...(redRisingDemo.histories as unknown as Record<string, CanonHistory>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("history", id) }]))
  })
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setHistories(orderHistories({ ...seedHistories, ...(JSON.parse(saved) as Record<string, CanonHistory>) }))
    } catch {
    } finally {
      hydrated.current = true
    }
  }, [])

  useEffect(() => {
    if (hydrated.current) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(histories))
  }, [histories])

  const getHistory = useCallback(
    (id: string | null | undefined): CanonHistory | null => (id ? (histories[id] ?? null) : null),
    [histories],
  )

  const updateHistory = useCallback((id: string, patch: HistoryEdit) => {
    setHistories((previous) => {
      const existing = previous[id]
      if (!existing) return previous
      return { ...previous, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addHistory = useCallback((patch: HistoryEdit): string => {
    const name = patch.name?.trim() || "Unnamed History"
    const newId = makeId(name, histories)
    const chronology = patch.chronology ?? Object.keys(histories).length
    setHistories((previous) => ({
      ...previous,
      [newId]: { ...patch, id: newId, name, chronology, type: patch.type ?? "event" },
    }))
    return newId
  }, [histories])

  const reorderHistory = useCallback((draggedId: string, targetId: string) => {
    setHistories((previous) => {
      if (draggedId === targetId || !previous[draggedId] || !previous[targetId]) return previous
      const ordered = Object.values(previous).sort((left, right) => left.chronology - right.chronology)
      const fromIndex = ordered.findIndex((history) => history.id === draggedId)
      const targetIndex = ordered.findIndex((history) => history.id === targetId)
      const [dragged] = ordered.splice(fromIndex, 1)
      ordered.splice(fromIndex < targetIndex ? targetIndex - 1 : targetIndex, 0, dragged)
      return Object.fromEntries(ordered.map((history, index) => [history.id, { ...history, chronology: index }]))
    })
  }, [])

  const value = useMemo(
    () => ({ histories, getHistory, updateHistory, addHistory, reorderHistory }),
    [histories, getHistory, updateHistory, addHistory, reorderHistory],
  )

  return <HistoryCanonContext.Provider value={value}>{children}</HistoryCanonContext.Provider>
}

export function useHistoryCanon(): HistoryCanonContextValue {
  const context = useContext(HistoryCanonContext)
  if (!context) throw new Error("useHistoryCanon must be used within a HistoryCanonProvider")
  return context
}