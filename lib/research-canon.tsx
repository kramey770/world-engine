"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { readProjectData, useProjectStore, writeProjectData } from "@/lib/project-store"

export type SourceType = "book" | "article" | "website" | "image" | "archive" | "interview" | "note" | "generated" | "other"
export type SourceStatus = "unreviewed" | "useful" | "questioned" | "rejected"
export type CanonSource = { id: string; title: string; type: SourceType; creator?: string; publicationDate?: string; url?: string; locator?: string; citation?: string; excerpt?: string; notes?: string; reliability?: string; status: SourceStatus; tags: string[]; createdAt: number; updatedAt: number }
export type SourceEdit = Partial<Pick<CanonSource, "title" | "type" | "creator" | "publicationDate" | "url" | "locator" | "citation" | "excerpt" | "notes" | "reliability" | "status" | "tags">>

type ResearchContextValue = { sources: Record<string, CanonSource>; getSource: (id: string | null | undefined) => CanonSource | null; addSource: (patch: SourceEdit) => string; updateSource: (id: string, patch: SourceEdit) => void; deleteSource: (id: string) => void }
const ResearchContext = createContext<ResearchContextValue | null>(null)
function makeId(title: string, existing: Record<string, CanonSource>) { const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "source"; let id = base; let suffix = 2; while (existing[id]) id = `${base}-${suffix++}`; return id }
export function ResearchCanonProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<Record<string, CanonSource>>({})
  const [hydratedProjectId, setHydratedProjectId] = useState<string | null>(null)
  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? null

  useEffect(() => {
    setHydratedProjectId(null)
    if (!projectId) {
      setSources({})
      return
    }

    let cancelled = false
    readProjectData<Record<string, CanonSource>>(projectId, "research")
      .then((saved) => {
        if (cancelled) return
        setSources(saved ?? {})
        setHydratedProjectId(projectId)
      })
      .catch(() => {
        if (!cancelled) setSources({})
      })

    return () => {
      cancelled = true
    }
  }, [projectId])

  useEffect(() => {
    if (!projectId || hydratedProjectId !== projectId) return
    void writeProjectData(projectId, "research", sources)
  }, [hydratedProjectId, projectId, sources])
  const getSource = useCallback((id: string | null | undefined) => id ? sources[id] ?? null : null, [sources])
  const addSource = useCallback((patch: SourceEdit) => { const id = makeId(patch.title?.trim() || "source", sources); const now = Date.now(); setSources((previous) => ({ ...previous, [id]: { id, title: patch.title?.trim() || "Untitled source", type: patch.type ?? "other", creator: patch.creator, publicationDate: patch.publicationDate, url: patch.url, locator: patch.locator, citation: patch.citation, excerpt: patch.excerpt, notes: patch.notes, reliability: patch.reliability, status: patch.status ?? "unreviewed", tags: patch.tags ?? [], createdAt: now, updatedAt: now } })); return id }, [sources])
  const updateSource = useCallback((id: string, patch: SourceEdit) => setSources((previous) => previous[id] ? { ...previous, [id]: { ...previous[id], ...patch, updatedAt: Date.now() } } : previous), [])
  const deleteSource = useCallback((id: string) => setSources((previous) => { const next = { ...previous }; delete next[id]; return next }), [])
  const value = useMemo(() => ({ sources, getSource, addSource, updateSource, deleteSource }), [sources, getSource, addSource, updateSource, deleteSource])
  return <ResearchContext.Provider value={value}>{children}</ResearchContext.Provider>
}
export function useResearchCanon() { const context = useContext(ResearchContext); if (!context) throw new Error("useResearchCanon must be used within ResearchCanonProvider"); return context }
