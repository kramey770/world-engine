"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type ThumbnailSource = "none" | "uploaded" | "builtin"

export type PageThumbnail = {
  source: ThumbnailSource
  value?: string
}

export type BuiltInThumbnail = {
  id: string
  label: string
  src: string
}

// Kept central and intentionally empty until original artwork is ready.
export const BUILT_IN_THUMBNAILS: BuiltInThumbnail[] = []

const STORAGE_KEY = "world-engine:page-thumbnails"

type PageThumbnailContextValue = {
  getPageThumbnail: (pageId: string) => PageThumbnail
  setPageThumbnail: (pageId: string, thumbnail: PageThumbnail) => void
  getRecordCover: (recordId: string) => string
  setRecordCover: (recordId: string, value: string) => void
  builtInThumbnails: BuiltInThumbnail[]
}

const PageThumbnailContext = createContext<PageThumbnailContextValue | null>(null)

export function PageThumbnailProvider({ children }: { children: ReactNode }) {
  const [thumbnails, setThumbnails] = useState<Record<string, PageThumbnail>>({})
  const [recordCovers, setRecordCovers] = useState<Record<string, string>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, unknown>
        if (parsed.pages && typeof parsed.pages === "object") {
          setThumbnails(parsed.pages as Record<string, PageThumbnail>)
          setRecordCovers((parsed.records ?? {}) as Record<string, string>)
        } else setThumbnails(parsed as Record<string, PageThumbnail>)
      }
    } catch {
      // Ignore malformed or unavailable browser storage.
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ pages: thumbnails, records: recordCovers }))
  }, [hydrated, recordCovers, thumbnails])

  const getPageThumbnail = useCallback(
    (pageId: string): PageThumbnail => thumbnails[pageId] ?? { source: "none" },
    [thumbnails],
  )
  const setPageThumbnail = useCallback((pageId: string, thumbnail: PageThumbnail) => {
    setThumbnails((previous) => ({ ...previous, [pageId]: thumbnail }))
  }, [])
  const getRecordCover = useCallback((recordId: string) => recordCovers[recordId] ?? "", [recordCovers])
  const setRecordCover = useCallback((recordId: string, value: string) => {
    setRecordCovers((previous) => ({ ...previous, [recordId]: value }))
  }, [])

  const value = useMemo(
    () => ({ getPageThumbnail, setPageThumbnail, getRecordCover, setRecordCover, builtInThumbnails: BUILT_IN_THUMBNAILS }),
    [getPageThumbnail, getRecordCover, setPageThumbnail, setRecordCover],
  )

  return <PageThumbnailContext.Provider value={value}>{children}</PageThumbnailContext.Provider>
}

export function usePageThumbnail() {
  const context = useContext(PageThumbnailContext)
  if (!context) throw new Error("usePageThumbnail must be used within a PageThumbnailProvider")
  return context
}

export function resolvePageThumbnail(thumbnail: PageThumbnail): string {
  if (thumbnail.source === "uploaded") return thumbnail.value ?? ""
  if (thumbnail.source === "builtin") {
    return BUILT_IN_THUMBNAILS.find((asset) => asset.id === thumbnail.value)?.src ?? ""
  }
  return ""
}
