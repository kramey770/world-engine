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
}

/** Fields a user may edit from the record's Canon editing home. */
export type HistoryEdit = Partial<Omit<CanonHistory, "id">>

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
    setHistories((prev) => ({ ...prev, [id]: { id, name: "Untitled History Record" } }))
    return id
  }, [])

  const updateHistory = useCallback((id: string, patch: HistoryEdit) => {
    setHistories((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev))
  }, [])

  const value = useMemo<HistoryCanonContextValue>(
    () => ({ histories, getHistory, createHistory, updateHistory }),
    [histories, getHistory, createHistory, updateHistory],
  )

  return <HistoryCanonContext.Provider value={value}>{children}</HistoryCanonContext.Provider>
}

export function useHistoryCanon(): HistoryCanonContextValue {
  const ctx = useContext(HistoryCanonContext)
  if (!ctx) throw new Error("useHistoryCanon must be used within a HistoryCanonProvider")
  return ctx
}
