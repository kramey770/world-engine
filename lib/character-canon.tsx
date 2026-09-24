"use client"

/**
 * Character Canon — the first foundational data layer for World Engine.
 *
 * This is the authoritative, reusable source of truth for character records.
 * Views (Family Tree, Character Profile, and future Relationship Web / Story
 * Scenes / Content Builder) READ from this layer and never own duplicate
 * character information. Editing a record here propagates to every consumer.
 *
 * Character records are project-scoped and persisted by the shared local
 * project repository. Views read from this layer and never own duplicate data.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { readProjectData, useProjectStore, writeProjectData } from "@/lib/project-store"
import type { FamilyMember } from "@/lib/family-data"
import type { CanonEntityReference } from "@/lib/relationships-canon"

export type CharacterVersionAnchor = {
  kind?: "date" | "era" | "chapter" | "scene" | "event" | "other"
  value?: string
  entityRef?: CanonEntityReference
  note?: string
}

export type CharacterVersionPhysicalState = {
  portrait?: string
  age?: number | string
  height?: string
  weight?: string
  build?: string
  skin?: string
  hair?: string
  eyes?: string
  face?: string
  body?: string
  distinguishingFeatures?: string[]
  scars?: string[]
  tattoos?: string[]
  birthmarks?: string[]
  injuries?: string[]
  abnormalities?: string[]
  posture?: string
  voice?: string
  notes?: string
}

export type CharacterVersionPersonalityState = {
  temperament?: string
  traits?: string[]
  strengths?: string[]
  flaws?: string[]
  socialDisposition?: string
  emotionalDisposition?: string
  communicationStyle?: string
  values?: string[]
  beliefs?: string[]
  fears?: string[]
  desires?: string[]
  motivations?: string[]
  ambitions?: string[]
  insecurities?: string[]
  vulnerabilities?: string[]
  moralBoundaries?: string[]
  worldview?: string
  contradictions?: string[]
  internalConflicts?: string[]
  notes?: string
}

export type CharacterVersionLifeState = {
  role?: string
  occupation?: string
  rank?: string
  residence?: string
  status?: string
  goals?: string[]
  abilities?: string[]
  possessions?: string[]
  affiliations?: string[]
  relationshipState?: string
  notes?: string
}

export type CharacterVersion = {
  id: string
  characterId: string
  label: string
  age?: number | string
  activeFrom?: string
  activeUntil?: string
  timelineAnchor?: CharacterVersionAnchor
  summary?: string
  physical?: CharacterVersionPhysicalState
  personality?: CharacterVersionPersonalityState
  currentState?: CharacterVersionLifeState
  portrait?: string
  createdAt?: number
  updatedAt?: number
}

export type CharacterVersionEdit = Partial<Omit<CharacterVersion, "id" | "createdAt" | "updatedAt">>

export type CharacterInfluenceDirection = "positive" | "negative" | "mixed" | "formative"

export type CharacterInfluence = {
  id: string
  characterId: string
  versionId?: string
  entity: CanonEntityReference
  influenceType?: string
  direction?: CharacterInfluenceDirection
  importance?: "minor" | "moderate" | "major" | "foundational" | "unknown"
  explanation?: string
  timeExpression?: string
  sourceIds?: string[]
  createdAt?: number
  updatedAt?: number
}

export type CharacterInfluenceEdit = Partial<Omit<CharacterInfluence, "id" | "createdAt" | "updatedAt">>

export type Character = FamilyMember & {
  currentVersionId?: string
}

/** Fields a user may edit from the character's Canon editing home. */
export type CharacterEdit = Partial<Pick<Character,
    | "aliases"
    | "pronouns"
    | "classification"
    | "culture"
    | "origin"
    | "currentLocation"
    | "affiliations"
    | "languages"
    | "possessions"
    | "physicalDescription"
    | "voiceAndMannerisms"
    | "distinguishingTraits"
    | "canonSummary"
    | "desire"
    | "need"
    | "fear"
    | "coreValues"
    | "falseBelief"
    | "contradiction"
    | "moralBoundary"
    | "formativePressure"
    | "misunderstanding"
    | "changeTrigger"
    | "refusal"
    | "narrativeFunction"
    | "canonConfidence"
    | "openQuestions"
    | "researchNotes"
    | "authorNotes"
    | "name"
    | "portrait"
    | "title"
    | "role"
    | "house"
    | "birthHouse"
    | "born"
    | "died"
    | "bio"
    | "parents"
    | "spouseId"
    | "childrenIds"
    | "currentVersionId"
  >>

export type NewCharacter = Pick<Character, "name" | "house" | "birthHouse"> &
  Partial<Omit<Character, "id" | "name" | "house" | "birthHouse">>

type CanonContextValue = {
  /** All canon records, keyed by stable id. */
  characters: Record<string, Character>
  /** Read a single record (null-safe). */
  getCharacter: (id: string | null | undefined) => Character | null
  /** Apply a partial update to a record; reflected immediately in all views. */
  updateCharacter: (id: string, patch: CharacterEdit) => void
  /** Add a generic authored record to the canonical character collection. */
  addCharacter: (character: NewCharacter) => Character

  /** Character Versions / Life States for a given permanent Character. */
  versions: Record<string, CharacterVersion>
  getVersion: (id: string | null | undefined) => CharacterVersion | null
  addVersion: (patch: CharacterVersionEdit & { characterId: string }) => CharacterVersion
  updateVersion: (id: string, patch: CharacterVersionEdit) => void
  deleteVersion: (id: string) => void

  /** Character-specific influences that reference other Canon entities. */
  influences: Record<string, CharacterInfluence>
  getInfluence: (id: string | null | undefined) => CharacterInfluence | null
  addInfluence: (patch: CharacterInfluenceEdit & { characterId: string }) => CharacterInfluence
  updateInfluence: (id: string, patch: CharacterInfluenceEdit) => void
  deleteInfluence: (id: string) => void
}

const CanonContext = createContext<CanonContextValue | null>(null)

function makeVersionId(label: string, existing: Record<string, CharacterVersion>) {
  const base = label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "version"
  let id = base
  let suffix = 2
  while (existing[id]) id = `${base}-${suffix++}`
  return id
}

function makeInfluenceId(label: string, existing: Record<string, CharacterInfluence>) {
  const base = label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "influence"
  let id = base
  let suffix = 2
  while (existing[id]) id = `${base}-${suffix++}`
  return id
}

export function CharacterCanonProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Record<string, Character>>({})
  const [versions, setVersions] = useState<Record<string, CharacterVersion>>({})
  const [influences, setInfluences] = useState<Record<string, CharacterInfluence>>({})
  const [hydratedProjectId, setHydratedProjectId] = useState<string | null>(null)
  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? null

  useEffect(() => {
    setHydratedProjectId(null)
    if (!projectId) {
      setCharacters({})
      setVersions({})
      setInfluences({})
      setHydratedProjectId(null)
      return
    }

    let cancelled = false
    try {
      Promise.all([
        readProjectData<Record<string, Character>>(projectId, "characters"),
        readProjectData<Record<string, CharacterVersion>>(projectId, "character-versions"),
        readProjectData<Record<string, CharacterInfluence>>(projectId, "character-influences"),
      ])
        .then(([storedCharacters, storedVersions, storedInfluences]) => {
          if (cancelled) return
          setCharacters(storedCharacters ?? {})
          setVersions(storedVersions ?? {})
          setInfluences(storedInfluences ?? {})
          setHydratedProjectId(projectId)
        })
        .catch(() => {
          if (!cancelled) {
            setCharacters({})
            setVersions({})
            setInfluences({})
          }
        })
    } catch {
      setCharacters({})
      setVersions({})
      setInfluences({})
    }
    return () => {
      cancelled = true
    }
  }, [projectId])

  useEffect(() => {
    if (!projectId || hydratedProjectId !== projectId) return
    void writeProjectData(projectId, "characters", characters)
    void writeProjectData(projectId, "character-versions", versions)
    void writeProjectData(projectId, "character-influences", influences)
  }, [characters, hydratedProjectId, influences, projectId, versions])

  const getCharacter = useCallback(
    (id: string | null | undefined): Character | null => (id ? (characters[id] ?? null) : null),
    [characters],
  )

  const updateCharacter = useCallback((id: string, patch: CharacterEdit) => {
    setCharacters((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addCharacter = useCallback((character: NewCharacter) => {
    const id = crypto.randomUUID()
    const created: Character = {
      id,
      portrait: "",
      title: "",
      bio: "",
      ...character,
    }
    setCharacters((prev) => ({ ...prev, [id]: created }))
    return created
  }, [])

  const getVersion = useCallback(
    (id: string | null | undefined): CharacterVersion | null => (id ? (versions[id] ?? null) : null),
    [versions],
  )

  const addVersion = useCallback((patch: CharacterVersionEdit & { characterId: string }) => {
    const id = makeVersionId(patch.label?.trim() || "version", versions)
    const now = Date.now()
    const created: CharacterVersion = {
      id,
      characterId: patch.characterId,
      label: patch.label?.trim() || "Untitled version",
      age: patch.age,
      activeFrom: patch.activeFrom,
      activeUntil: patch.activeUntil,
      timelineAnchor: patch.timelineAnchor,
      summary: patch.summary,
      physical: patch.physical,
      personality: patch.personality,
      currentState: patch.currentState,
      portrait: patch.portrait,
      createdAt: now,
      updatedAt: now,
    }
    setVersions((prev) => ({ ...prev, [id]: created }))
    return created
  }, [versions])

  const updateVersion = useCallback((id: string, patch: CharacterVersionEdit) => {
    setVersions((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch, updatedAt: Date.now() } }
    })
  }, [])

  const deleteVersion = useCallback((id: string) => {
    setVersions((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const getInfluence = useCallback(
    (id: string | null | undefined): CharacterInfluence | null => (id ? (influences[id] ?? null) : null),
    [influences],
  )

  const addInfluence = useCallback((patch: CharacterInfluenceEdit & { characterId: string }) => {
    const id = makeInfluenceId(patch.influenceType?.trim() || patch.entity?.entityId || "influence", influences)
    const now = Date.now()
    const created: CharacterInfluence = {
      id,
      characterId: patch.characterId,
      versionId: patch.versionId,
      entity: patch.entity ?? { entityType: "character", entityId: "" },
      influenceType: patch.influenceType,
      direction: patch.direction,
      importance: patch.importance,
      explanation: patch.explanation,
      timeExpression: patch.timeExpression,
      sourceIds: patch.sourceIds ?? [],
      createdAt: now,
      updatedAt: now,
    }
    setInfluences((prev) => ({ ...prev, [id]: created }))
    return created
  }, [influences])

  const updateInfluence = useCallback((id: string, patch: CharacterInfluenceEdit) => {
    setInfluences((prev) => {
      const existing = prev[id]
      if (!existing) return prev
      return { ...prev, [id]: { ...existing, ...patch, updatedAt: Date.now() } }
    })
  }, [])

  const deleteInfluence = useCallback((id: string) => {
    setInfluences((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const value = useMemo<CanonContextValue>(
    () => ({
      characters,
      getCharacter,
      updateCharacter,
      addCharacter,
      versions,
      getVersion,
      addVersion,
      updateVersion,
      deleteVersion,
      influences,
      getInfluence,
      addInfluence,
      updateInfluence,
      deleteInfluence,
    }),
    [addCharacter, addInfluence, addVersion, characters, deleteInfluence, deleteVersion, getCharacter, getInfluence, getVersion, influences, updateCharacter, updateInfluence, updateVersion, versions],
  )

  return <CanonContext.Provider value={value}>{children}</CanonContext.Provider>
}

export function useCharacterCanon(): CanonContextValue {
  const ctx = useContext(CanonContext)
  if (!ctx) throw new Error("useCharacterCanon must be used within a CharacterCanonProvider")
  return ctx
}
