"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

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
  const [histories, setHistories] = useState<Record<string, CanonHistory>>({})
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setHistories(orderHistories(JSON.parse(saved) as Record<string, CanonHistory>))
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