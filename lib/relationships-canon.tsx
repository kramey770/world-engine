"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo } from "./red-rising-demo-data"
import { redRisingAdditionalRelationships } from "./red-rising-graph"

export type CanonEntityType = "character" | "location" | "organization" | "culture" | "religion" | "language" | "concept" | "history" | "item" | "species" | "government" | "system"
export type CanonEntityReference = { entityType: CanonEntityType; entityId: string }
export type RelationshipDirection = "directed" | "mutual"
export type RelationshipStatus = "active" | "historical" | "broken" | "rumored" | "disputed"

export type CanonRelationship = {
  id: string
  subject: CanonEntityReference
  object: CanonEntityReference
  label: string
  direction: RelationshipDirection
  status: RelationshipStatus
  strength?: string
  summary?: string
  history?: string
  timeExpression?: string
  confidence?: string
  sourceIds: string[]
  createdAt: number
  updatedAt: number
}

export type RelationshipEdit = Partial<Pick<CanonRelationship, "subject" | "object" | "label" | "direction" | "status" | "strength" | "summary" | "history" | "timeExpression" | "confidence" | "sourceIds">>

type RelationshipContextValue = {
  relationships: Record<string, CanonRelationship>
  getRelationship: (id: string | null | undefined) => CanonRelationship | null
  addRelationship: (patch: RelationshipEdit) => string
  updateRelationship: (id: string, patch: RelationshipEdit) => void
  deleteRelationship: (id: string) => void
  forEntity: (entity: CanonEntityReference) => CanonRelationship[]
}

const STORAGE_KEY = "world-engine:canon-relationships"
const RelationshipContext = createContext<RelationshipContextValue | null>(null)

function makeId(label: string, existing: Record<string, CanonRelationship>) {
  const base = label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "relationship"
  let id = base
  let suffix = 2
  while (existing[id]) id = `${base}-${suffix++}`
  return id
}

function sameEntity(left: CanonEntityReference, right: CanonEntityReference) {
  return left.entityType === right.entityType && left.entityId === right.entityId
}

export function RelationshipsCanonProvider({ children }: { children: ReactNode }) {
  const [relationships, setRelationships] = useState<Record<string, CanonRelationship>>(
    {
      ...(redRisingDemo.relationships as unknown as Record<string, CanonRelationship>),
      ...redRisingAdditionalRelationships,
    },
  )
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setRelationships(JSON.parse(saved) as Record<string, CanonRelationship>)
    } catch {
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(relationships))
  }, [hydrated, relationships])

  const getRelationship = useCallback((id: string | null | undefined) => (id ? relationships[id] ?? null : null), [relationships])
  const addRelationship = useCallback((patch: RelationshipEdit) => {
    const id = makeId(patch.label?.trim() || "relationship", relationships)
    const now = Date.now()
    setRelationships((previous) => ({
      ...previous,
      [id]: {
        id,
        subject: patch.subject ?? { entityType: "character", entityId: "" },
        object: patch.object ?? { entityType: "character", entityId: "" },
        label: patch.label?.trim() || "Unnamed relationship",
        direction: patch.direction ?? "mutual",
        status: patch.status ?? "active",
        strength: patch.strength,
        summary: patch.summary,
        history: patch.history,
        timeExpression: patch.timeExpression,
        confidence: patch.confidence,
        sourceIds: patch.sourceIds ?? [],
        createdAt: now,
        updatedAt: now,
      },
    }))
    return id
  }, [relationships])
  const updateRelationship = useCallback((id: string, patch: RelationshipEdit) => {
    setRelationships((previous) => {
      const existing = previous[id]
      return existing ? { ...previous, [id]: { ...existing, ...patch, updatedAt: Date.now() } } : previous
    })
  }, [])
  const deleteRelationship = useCallback((id: string) => setRelationships((previous) => {
    const next = { ...previous }
    delete next[id]
    return next
  }), [])
  const forEntity = useCallback((entity: CanonEntityReference) => Object.values(relationships).filter((record) => sameEntity(record.subject, entity) || sameEntity(record.object, entity)), [relationships])
  const value = useMemo(() => ({ relationships, getRelationship, addRelationship, updateRelationship, deleteRelationship, forEntity }), [relationships, getRelationship, addRelationship, updateRelationship, deleteRelationship, forEntity])
  return <RelationshipContext.Provider value={value}>{children}</RelationshipContext.Provider>
}

export function useRelationshipsCanon() {
  const context = useContext(RelationshipContext)
  if (!context) throw new Error("useRelationshipsCanon must be used within RelationshipsCanonProvider")
  return context
}
