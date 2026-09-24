"use client"

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react"
import { useProjectCollection } from "@/lib/project-store"

export type FamilyKind = "family" | "house" | "clan" | "lineage" | "dynasty"
export type FamilyStatus = "draft" | "active" | "historical" | "contested"

export type CanonFamily = {
  id: string
  name: string
  kind: FamilyKind
  status: FamilyStatus
  motto?: string
  description?: string
  seat?: string
  founded?: string
  currentHeadId?: string
  image?: string
  notes?: string
  createdAt: number
  updatedAt: number
}

export type FamilyEdit = Partial<Omit<CanonFamily, "id" | "createdAt" | "updatedAt">>

type FamilyCanonContextValue = {
  families: Record<string, CanonFamily>
  getFamily: (id: string | null | undefined) => CanonFamily | null
  addFamily: (patch: FamilyEdit) => CanonFamily
  updateFamily: (id: string, patch: FamilyEdit) => void
  deleteFamily: (id: string) => void
}

const FamilyCanonContext = createContext<FamilyCanonContextValue | null>(null)

function makeId(name: string, existing: Record<string, CanonFamily>) {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "family"
  let id = base
  let suffix = 2
  while (existing[id]) id = `${base}-${suffix++}`
  return id
}

export function FamilyCanonProvider({ children }: { children: ReactNode }) {
  const [families, setFamilies] = useProjectCollection<Record<string, CanonFamily>>("families", {})
  const getFamily = useCallback((id: string | null | undefined) => (id ? families[id] ?? null : null), [families])
  const addFamily = useCallback((patch: FamilyEdit) => {
    let created: CanonFamily
    setFamilies((current) => {
      const id = makeId(patch.name ?? "Unnamed Family", current)
      const now = Date.now()
      created = { id, name: patch.name?.trim() || "Unnamed Family", kind: patch.kind ?? "family", status: patch.status ?? "draft", ...patch, createdAt: now, updatedAt: now }
      return { ...current, [id]: created }
    })
    return created!
  }, [setFamilies])
  const updateFamily = useCallback((id: string, patch: FamilyEdit) => {
    setFamilies((current) => current[id] ? { ...current, [id]: { ...current[id], ...patch, name: patch.name?.trim() || current[id].name, updatedAt: Date.now() } } : current)
  }, [setFamilies])
  const deleteFamily = useCallback((id: string) => {
    setFamilies((current) => { const next = { ...current }; delete next[id]; return next })
  }, [setFamilies])
  const value = useMemo(() => ({ families, getFamily, addFamily, updateFamily, deleteFamily }), [families, getFamily, addFamily, updateFamily, deleteFamily])
  return <FamilyCanonContext.Provider value={value}>{children}</FamilyCanonContext.Provider>
}

export function useFamilyCanon() {
  const context = useContext(FamilyCanonContext)
  if (!context) throw new Error("useFamilyCanon must be used within FamilyCanonProvider")
  return context
}
