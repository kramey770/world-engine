"use client"

/**
 * History Canon — the history counterpart to the Character / Location /
 * Religion / Concept canon stores.
 *
 * One provider owns the records and every view reads from it, so there is a
 * single source of truth. Editing a record here propagates to every consumer,
 * exactly as the sibling Canon layers do.
 *
 * FIRST-LAYER pass only: client-side, in-memory, author-created (no seed data).
 * The schema is intentionally minimal — name, summary, era, description, notes.
 * The Timeline system, chronology tooling, and event sequencing are explicitly
 * NOT part of this layer and will be designed separately.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/**
 * The canonical History record. Deliberately small for this first layer — just
 * enough structure to prove the data flow. Consumers should treat any future
 * additions as optional.
 */
export type CanonHistory = {
  id: string
  name: string
  /** One-line identity shown beneath the title. */
  summary?: string
  /** Free-text era or period label (e.g. "Third Age", "After the Sundering"). */
  era?: string
  /** Long-form canonical description of what happened. */
  description?: string
  /** Loose supporting detail that doesn't belong in the description yet. */
  notes?: string
  /**
   * Deliberate author-defined sequence position. Not a date and not a
   * chronology engine — just a stable ordering hook that a future Timeline
   * system can build on. Lower values read as "earlier" within an era.
   */
  order: number
}

/**
 * Fields a user may edit from the record's Canon editing home. Ordering is
 * managed by the History index, not the record editor, so it is excluded here.
 */
export type HistoryEdit = Partial<Omit<CanonHistory, "id" | "order">>

/* ------------------------------ Era grouping -------------------------------- */

/** Label used for records that have no Era/Period filled in yet. */
export const UNPLACED_ERA = "Unplaced in Time"

export type HistoryEraGroup = {
  /** Display label for the era. */
  era: string
  /** True when this is the catch-all bucket for records with no era. */
  unplaced: boolean
  /** Records in deliberate author order. */
  records: CanonHistory[]
}

/**
 * Groups records under their Era/Period and sorts each group by the author's
 * deliberate order. Eras themselves are sequenced by their earliest record, so
 * moving a record also shapes the era sequence. Records with no era collect in
 * a trailing "Unplaced in Time" group so nothing is ever hidden.
 */
export function groupHistoriesByEra(records: CanonHistory[]): HistoryEraGroup[] {
  const groups = new Map<string, CanonHistory[]>()

  for (const record of records) {
    const era = record.era?.trim() || UNPLACED_ERA
    const existing = groups.get(era)
    if (existing) existing.push(record)
    else groups.set(era, [record])
  }

  return [...groups.entries()]
    .map(([era, group]) => ({
      era,
      unplaced: era === UNPLACED_ERA,
      records: [...group].sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => {
      // Unplaced records always trail the placed eras.
      if (a.unplaced !== b.unplaced) return a.unplaced ? 1 : -1
      return a.records[0].order - b.records[0].order
    })
}

/* --------------------------------- Context ---------------------------------- */

type HistoryCanonContextValue = {
  /** All canon history records, keyed by stable id. */
  histories: Record<string, CanonHistory>
  /** Read a single record (null-safe). */
  getHistory: (id: string | null | undefined) => CanonHistory | null
  /** Create a blank record and return its id so the caller can open it. */
  createHistory: () => string
  /** Apply a partial update; reflected immediately in all views. */
  updateHistory: (id: string, patch: HistoryEdit) => void
  /** Move a record earlier or later within its own era. */
  moveHistory: (id: string, direction: "up" | "down") => void
}

const HistoryCanonContext = createContext<HistoryCanonContextValue | null>(null)

export function HistoryCanonProvider({ children }: { children: ReactNode }) {
  // History records are author-created; there is no seed data for this category.
  const [histories, setHistories] = useState<Record<string, CanonHistory>>({})

  const getHistory = useCallback(
    (id: string | null | undefined): CanonHistory | null => (id ? (histories[id] ?? null) : null),
    [histories],
  )

  const createHistory = useCallback(() => {
    const id = `history-${Date.now().toString(36)}`
    setHistories((prev) => ({
      ...prev,
      // New records land at the end of the sequence.
      [id]: { id, name: "Untitled History Record", order: Object.keys(prev).length },
    }))
    return id
  }, [])

  const updateHistory = useCallback((id: string, patch: HistoryEdit) => {
    setHistories((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev))
  }, [])

  const moveHistory = useCallback((id: string, direction: "up" | "down") => {
    setHistories((prev) => {
      const record = prev[id]
      if (!record) return prev

      // Reordering is scoped to the record's own era so a move never silently
      // relocates a record into a different period.
      const era = record.era?.trim() || UNPLACED_ERA
      const siblings = Object.values(prev)
        .filter((r) => (r.era?.trim() || UNPLACED_ERA) === era)
        .sort((a, b) => a.order - b.order)

      const index = siblings.findIndex((r) => r.id === id)
      const swapWith = siblings[direction === "up" ? index - 1 : index + 1]
      if (!swapWith) return prev

      // Swap the two order values; every other record is untouched.
      return {
        ...prev,
        [record.id]: { ...record, order: swapWith.order },
        [swapWith.id]: { ...swapWith, order: record.order },
      }
    })
  }, [])

  const value = useMemo<HistoryCanonContextValue>(
    () => ({ histories, getHistory, createHistory, updateHistory, moveHistory }),
    [histories, getHistory, createHistory, updateHistory, moveHistory],
  )

  return <HistoryCanonContext.Provider value={value}>{children}</HistoryCanonContext.Provider>
}

export function useHistoryCanon(): HistoryCanonContextValue {
  const ctx = useContext(HistoryCanonContext)
  if (!ctx) throw new Error("useHistoryCanon must be used within a HistoryCanonProvider")
  return ctx
}
