"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type GovernmentForm = "monarchy" | "republic" | "council" | "theocracy" | "oligarchy" | "empire" | "federation" | "confederation" | "military" | "colonial" | "stateless" | "mixed" | "other"
export const GOVERNMENT_FORMS: { id: GovernmentForm; label: string }[] = [
  { id: "monarchy", label: "Monarchy" },
  { id: "republic", label: "Republic" },
  { id: "council", label: "Council rule" },
  { id: "theocracy", label: "Theocracy" },
  { id: "oligarchy", label: "Oligarchy" },
  { id: "empire", label: "Empire" },
  { id: "federation", label: "Federation" },
  { id: "confederation", label: "Confederation" },
  { id: "military", label: "Military regime" },
  { id: "colonial", label: "Colonial administration" },
  { id: "stateless", label: "Stateless or distributed" },
  { id: "mixed", label: "Mixed system" },
  { id: "other", label: "Other" },
]

export type GovernmentStatus = "draft" | "active" | "stable" | "contested" | "declining" | "collapsed" | "historical" | "unknown"
export const GOVERNMENT_STATUSES: { id: GovernmentStatus; label: string }[] = [
  { id: "draft", label: "Draft" },
  { id: "active", label: "Active" },
  { id: "stable", label: "Stable" },
  { id: "contested", label: "Contested" },
  { id: "declining", label: "Declining" },
  { id: "collapsed", label: "Collapsed" },
  { id: "historical", label: "Historical" },
  { id: "unknown", label: "Unknown" },
]

export type GovernmentReferenceType = "character" | "location" | "organization" | "culture" | "religion" | "concept" | "history"
export type GovernmentReference = { entityType: GovernmentReferenceType; entityId: string; label: string }

export type CanonGovernment = {
  id: string
  createdAt: number
  name: string
  image?: string
  form: GovernmentForm
  status: GovernmentStatus
  summary?: string
  description?: string
  scope?: string
  founding?: string
  headOfState?: string
  executiveStructure?: string
  legislativeStructure?: string
  judicialStructure?: string
  administrativeDivisions?: string
  succession?: string
  legitimacy?: string
  representation?: string
  laws?: string
  rightsAndDuties?: string
  enforcement?: string
  citizenship?: string
  factions?: string
  dissent?: string
  revenue?: string
  militaryRelationship?: string
  resources?: string
  currentConflicts?: string
  history?: string
  strengths?: string
  weaknesses?: string
  symbols?: string
  additionalInfo?: string
  notes?: string
  references?: GovernmentReference[]
}

export type GovernmentEdit = Partial<Omit<CanonGovernment, "id" | "createdAt">>

type GovernmentCanonContextValue = {
  governments: Record<string, CanonGovernment>
  getGovernment: (id: string | null) => CanonGovernment | null
  updateGovernment: (id: string, patch: GovernmentEdit) => void
  addGovernment: (draft: GovernmentEdit) => string
}

const GovernmentCanonContext = createContext<GovernmentCanonContextValue | null>(null)

const seedGovernments: Record<string, CanonGovernment> = {
  "the-society": {
    id: "the-society",
    createdAt: Date.now(),
    name: "The Society",
    form: "empire",
    status: "active",
    summary: "A color-coded solar empire built on engineered hierarchy and inherited power.",
    description: "The Society governs humanity through a rigid hierarchy of Colors, assigning labor, education, privilege, and violence according to a political order presented as inevitable.",
    scope: "The inhabited solar system",
    founding: "Established through conquest, terraforming, genetic engineering, and the institutionalization of Color hierarchy.",
    headOfState: "The Sovereign, supported by ruling Gold houses and the Senate",
    executiveStructure: "The Sovereign directs the central state through appointed governors, fleets, and Gold house authority.",
    legislativeStructure: "The Senate provides a formal venue for Gold houses to negotiate law and power.",
    judicialStructure: "Justice is administered through Color-bound institutions that protect hierarchy more reliably than equal law.",
    administrativeDivisions: "Territories and civil institutions are organized around planetary, fleet, and Color administrations.",
    succession: "Power passes through inherited Gold authority, political alliance, and control of the central institutions.",
    legitimacy: "Order, conquest, and the claim that hierarchy is necessary to prevent civilization from collapsing into chaos.",
    representation: "Political representation is restricted to ruling houses and institutions that preserve the Color order.",
    laws: "Colors must perform their assigned labor; collective resistance is treated as treason.",
    rightsAndDuties: "Privilege, education, mobility, and violence are distributed by Color and social rank.",
    enforcement: "Fleets, academies, surveillance, and control of communication enforce the hierarchy.",
    factions: "Gold houses, the Senate, the Sons of Ares, and reformist or rebellious coalitions compete for the future of the system.",
    dissent: "Dissent is criminalized and fragmented, but rebellion becomes increasingly coordinated and strategically capable.",
    revenue: "The Society draws power from monopolized infrastructure, labor assignment, trade, and control of planetary resources.",
    militaryRelationship: "Military fleets are both instruments of expansion and guarantors of domestic political order.",
    resources: "Planetary fleets, monopolized infrastructure, military academies, and control over communication and education.",
    currentConflicts: "The ruling order is challenged by rebellion, rival houses, and the exposure of its foundational lies.",
    history: "Its apparent stability has been repeatedly reshaped by conquest, rebellion, infiltration, and the collapse of old alliances.",
    strengths: "Scale, institutional control, military reach, and a deeply normalized political hierarchy.",
    weaknesses: "Reliance on coercion, factional rivalry, brittle legitimacy, and the exclusion of most people from power.",
    symbols: "Color hierarchy, laurel-and-sun imagery, gold armor, and the language of civilization versus chaos.",
    references: [
      { entityType: "organization", entityId: "the-ravenshollow-court", label: "The Society" },
    ],
  },
}

function makeId() {
  return `government-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function governmentFormLabel(form: GovernmentForm) {
  return GOVERNMENT_FORMS.find((entry) => entry.id === form)?.label ?? form
}

export function governmentStatusLabel(status: GovernmentStatus) {
  return GOVERNMENT_STATUSES.find((entry) => entry.id === status)?.label ?? status
}

export function GovernmentCanonProvider({ children }: { children: ReactNode }) {
  const [governments, setGovernments] = useState<Record<string, CanonGovernment>>(() => {
    const records = { ...seedGovernments, ...(redRisingDemo.governments as unknown as Record<string, CanonGovernment>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("government", id) }]))
  })
  const getGovernment = useCallback((id: string | null) => (id ? governments[id] ?? null : null), [governments])
  const updateGovernment = useCallback((id: string, patch: GovernmentEdit) => {
    setGovernments((current) => current[id] ? { ...current, [id]: { ...current[id], ...patch } } : current)
  }, [])
  const addGovernment = useCallback((draft: GovernmentEdit) => {
    const id = makeId()
    setGovernments((current) => ({ ...current, [id]: { id, createdAt: Date.now(), name: "Unnamed Government", form: "other", status: "draft", ...draft } }))
    return id
  }, [])
  const value = useMemo(() => ({ governments, getGovernment, updateGovernment, addGovernment }), [governments, getGovernment, updateGovernment, addGovernment])
  return <GovernmentCanonContext.Provider value={value}>{children}</GovernmentCanonContext.Provider>
}

export function useGovernmentCanon() {
  const context = useContext(GovernmentCanonContext)
  if (!context) throw new Error("useGovernmentCanon must be used inside GovernmentCanonProvider")
  return context
}
