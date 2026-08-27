"use client"

/**
 * Character Canon — the first foundational data layer for World Engine.
 *
 * This is the authoritative, reusable source of truth for character records.
 * Views (Family Tree, Character Profile, and future Relationship Web / Story
 * Scenes / Content Builder) READ from this layer and never own duplicate
 * character information. Editing a record here propagates to every consumer.
 *
 * Foundation pass only: client-side, in-memory, seeded from the existing
 * Ravenshollow family data. No database/API/persistence yet — the goal is to
 * establish the shared data contract and application pathway.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { members as seedMembers, type FamilyMember } from "@/lib/family-data"

/**
 * The canonical Character record. For this foundation pass it intentionally
 * reuses the fields already represented by the Family Tree data rather than
 * inventing a larger final schema.
 */
export type Character = FamilyMember

/** Fields a user may edit from the character's Canon editing home. */
export type CharacterEdit = Partial<
  Pick<
    Character,
    | "name"
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
  >
>

type CanonContextValue = {
  /** All canon records, keyed by stable id. */
  characters: Record<string, Character>
  /** Read a single record (null-safe). */
  getCharacter: (id: string | null | undefined) => Character | null
  /** Apply a partial update to a record; reflected immediately in all views. */
  updateCharacter: (id: string, patch: CharacterEdit) => void
}

const CanonContext = createContext<CanonContextValue | null>(null)

export function CharacterCanonProvider({ children }: { children: ReactNode }) {
  // Seed from the existing family data. We shallow-clone so the seed module
  // object is never mutated; updates always produce fresh record objects.
  const [characters, setCharacters] = useState<Record<string, Character>>(() => ({ ...seedMembers }))

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

  const value = useMemo<CanonContextValue>(
    () => ({ characters, getCharacter, updateCharacter }),
    [characters, getCharacter, updateCharacter],
  )

  return <CanonContext.Provider value={value}>{children}</CanonContext.Provider>
}

export function useCharacterCanon(): CanonContextValue {
  const ctx = useContext(CanonContext)
  if (!ctx) throw new Error("useCharacterCanon must be used within a CharacterCanonProvider")
  return ctx
}
