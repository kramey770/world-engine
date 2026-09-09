"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export type CombatDoctrineType =
  | "military"
  | "martial-school"
  | "dueling"
  | "formation"
  | "insurgency"
  | "hunting"
  | "self-defense"
  | "ritual"
  | "supernatural"
  | "naval"
  | "mounted"
  | "siege"
  | "improvised"
  | "other"

export const COMBAT_DOCTRINE_TYPES: { id: CombatDoctrineType; label: string }[] = [
  { id: "military", label: "Military Doctrine" },
  { id: "martial-school", label: "Martial Art / Fighting School" },
  { id: "dueling", label: "Dueling Tradition" },
  { id: "formation", label: "Battlefield Formation" },
  { id: "insurgency", label: "Insurgency / Resistance" },
  { id: "hunting", label: "Hunting / Survival" },
  { id: "self-defense", label: "Civilian Self-Defense" },
  { id: "ritual", label: "Ritual / Ceremonial Combat" },
  { id: "supernatural", label: "Supernatural Combat" },
  { id: "naval", label: "Naval" },
  { id: "mounted", label: "Mounted" },
  { id: "siege", label: "Siege" },
  { id: "improvised", label: "Improvised / Criminal" },
  { id: "other", label: "Other" },
]

export function combatDoctrineTypeLabel(type: CombatDoctrineType): string {
  return COMBAT_DOCTRINE_TYPES.find((entry) => entry.id === type)?.label ?? type
}

export type CombatDoctrineStatus = "draft" | "active" | "deprecated" | "forgotten" | "contested"
export const COMBAT_DOCTRINE_STATUSES: { id: CombatDoctrineStatus; label: string }[] = [
  { id: "draft", label: "Draft" },
  { id: "active", label: "Active" },
  { id: "deprecated", label: "Deprecated" },
  { id: "forgotten", label: "Forgotten" },
  { id: "contested", label: "Contested" },
]

export type CombatDoctrineEntry = {
  id: string
  name: string
  description?: string
  trigger?: string
  sequence?: string
  consequence?: string
  counter?: string
  notes?: string
}

export type CombatDoctrineExample = {
  id: string
  name: string
  situation?: string
  application?: string
  outcome?: string
}

export type CanonCombatDoctrine = {
  id: string
  createdAt: number
  name: string
  image?: string
  type: CombatDoctrineType
  status?: CombatDoctrineStatus
  summary?: string
  alternateNames?: string
  origin?: string
  scope?: string
  era?: string
  currentState?: string
  predecessorTraditions?: string
  successorTraditions?: string
  thesis?: string
  purpose?: string
  victoryCondition?: string
  threatModel?: string
  rulesOfEngagement?: string
  valuesAndConstraints?: string
  attitudeTowardViolence?: string
  forbiddenBehavior?: string
  preferredRange?: string
  tempo?: string
  mobility?: string
  initiative?: string
  riskTolerance?: string
  formationDensity?: string
  balance?: string
  conflictScale?: string
  terrain?: string
  weatherAndVisibility?: string
  adaptability?: string
  principles?: CombatDoctrineEntry[]
  tacticalBehavior?: string
  openings?: string
  positioning?: string
  movement?: string
  attacksAndDefense?: string
  feintsAndDeception?: string
  retreatAndPursuit?: string
  escalationAndDisengagement?: string
  communication?: string
  commandDecisions?: string
  behaviorUnderPressure?: string
  maneuvers?: CombatDoctrineEntry[]
  practitioners?: string
  eligibility?: string
  requirements?: string
  trainingStages?: string
  teachingMethods?: string
  drillsAndTests?: string
  masteryLevels?: CombatDoctrineEntry[]
  commonMistakes?: string
  equipment?: string
  weaponsAndArmor?: string
  supplies?: string
  dependencies?: string
  maintenance?: string
  scarcityAdaptation?: string
  unitStructure?: string
  rolesAndFormations?: string
  commandStructure?: string
  disciplineAndMorale?: string
  strengths?: string
  weaknesses?: string
  counters?: CombatDoctrineEntry[]
  hiddenAssumptions?: string
  psychologicalVulnerabilities?: string
  environmentalVulnerabilities?: string
  expertObservations?: string
  postureAndMovement?: string
  rhythmAndBreathing?: string
  soundsAndCommands?: string
  clothingAndInsignia?: string
  rituals?: string
  insiderDescription?: string
  outsiderDescription?: string
  socialMeaning?: string
  history?: string
  foundingConditions?: string
  influentialFigures?: string
  adaptations?: string
  victoriesAndDefeats?: string
  schismsAndRivals?: string
  forbiddenTechniques?: string
  examples?: CombatDoctrineExample[]
  terminology?: string
  researchNotes?: string
  unresolvedQuestions?: string
  tags?: string
}

export type CombatDoctrineEdit = Partial<Omit<CanonCombatDoctrine, "id" | "createdAt">>

type CombatDoctrineContextValue = {
  doctrines: Record<string, CanonCombatDoctrine>
  getCombatDoctrine: (id: string | null) => CanonCombatDoctrine | null
  updateCombatDoctrine: (id: string, patch: CombatDoctrineEdit) => void
  addCombatDoctrine: (draft: CombatDoctrineEdit) => string
}

const CombatDoctrineContext = createContext<CombatDoctrineContextValue | null>(null)

function makeId() {
  return `combat-doctrine-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function CombatDoctrineProvider({ children }: { children: ReactNode }) {
  const [doctrines, setDoctrines] = useState<Record<string, CanonCombatDoctrine>>({})

  const getCombatDoctrine = useCallback((id: string | null) => (id ? doctrines[id] ?? null : null), [doctrines])
  const updateCombatDoctrine = useCallback((id: string, patch: CombatDoctrineEdit) => {
    setDoctrines((current) => current[id] ? { ...current, [id]: { ...current[id], ...patch } } : current)
  }, [])
  const addCombatDoctrine = useCallback((draft: CombatDoctrineEdit) => {
    const id = makeId()
    setDoctrines((current) => ({
      ...current,
      [id]: { id, createdAt: Date.now(), name: "Unnamed Combat Doctrine", type: "other", ...draft },
    }))
    return id
  }, [])

  const value = useMemo(() => ({ doctrines, getCombatDoctrine, updateCombatDoctrine, addCombatDoctrine }), [doctrines, getCombatDoctrine, updateCombatDoctrine, addCombatDoctrine])
  return <CombatDoctrineContext.Provider value={value}>{children}</CombatDoctrineContext.Provider>
}

export function useCombatDoctrine() {
  const context = useContext(CombatDoctrineContext)
  if (!context) throw new Error("useCombatDoctrine must be used inside CombatDoctrineProvider")
  return context
}
