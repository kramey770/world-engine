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

export type Character = FamilyMember

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
}

const CanonContext = createContext<CanonContextValue | null>(null)

export function CharacterCanonProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useState<Record<string, Character>>({})
  const [hydratedProjectId, setHydratedProjectId] = useState<string | null>(null)
  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? null

  useEffect(() => {
    setHydratedProjectId(null)
    if (!projectId) {
      setCharacters({})
      setHydratedProjectId(null)
      return
    }

    let cancelled = false
    try {
      readProjectData<Record<string, Character>>(projectId, "characters")
        .then((stored) => {
          if (cancelled) return
          setCharacters(stored ?? {})
          setHydratedProjectId(projectId)
        })
        .catch(() => {
          if (!cancelled) setCharacters({})
        })
    } catch {
      setCharacters({})
    }
    return () => {
      cancelled = true
    }
  }, [projectId])

  useEffect(() => {
    if (!projectId || hydratedProjectId !== projectId) return
    void writeProjectData(projectId, "characters", characters)
  }, [characters, hydratedProjectId, projectId])

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

  const value = useMemo<CanonContextValue>(
    () => ({ characters, getCharacter, updateCharacter, addCharacter }),
    [characters, getCharacter, updateCharacter, addCharacter],
  )

  return <CanonContext.Provider value={value}>{children}</CanonContext.Provider>
}

export function useCharacterCanon(): CanonContextValue {
  const ctx = useContext(CanonContext)
  if (!ctx) throw new Error("useCharacterCanon must be used within a CharacterCanonProvider")
  return ctx
}
