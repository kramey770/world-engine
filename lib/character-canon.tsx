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

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { members as seedMembers, type FamilyMember } from "@/lib/family-data"
import { redRisingCharacters } from "@/lib/red-rising-characters"

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

const legacyRedRisingIds = new Set([
  "aldric",
  "elira",
  "corwin",
  "mirena",
  "seraphine",
  "alden",
  "nyla",
])
const uploadedRedRisingIds = new Set(["darrow", "eo", "virginia", "sevro", "cassius", "adrius", "ragnar"])
const darrowFallbackPortrait = "/red-rising/Darrow o' Lykos.png"

const CHARACTER_STORAGE_KEY = "world-engine.character-canon"

export function CharacterCanonProvider({ children }: { children: ReactNode }) {
  // Seed from the existing family data. We shallow-clone so the seed module
  // object is never mutated; updates always produce fresh record objects.
  const [characters, setCharacters] = useState<Record<string, Character>>(() =>
    Object.fromEntries(
      Object.entries({ ...seedMembers, ...redRisingCharacters })
        .filter(([id]) => !legacyRedRisingIds.has(id))
        .filter(([id]) => id !== "mustang")
        .map(([id, character]) => [
        id,
        { ...character, portrait: redRisingCharacters[id] ? redRisingCharacters[id].portrait : character.portrait },
        ]),
    ),
  )
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CHARACTER_STORAGE_KEY)
      if (stored) {
        const savedCharacters = JSON.parse(stored) as Record<string, Character>
        const migratedCharacters = Object.fromEntries(Object.entries(savedCharacters).map(([id, character]) => [
          id,
          redRisingCharacters[id] && !uploadedRedRisingIds.has(id) && character.portrait === darrowFallbackPortrait
            ? { ...character, portrait: "" }
            : character,
        ]))
        setCharacters((prev) => ({ ...prev, ...migratedCharacters }))
      }
    } catch {
      // Invalid local data should never prevent the canon UI from opening.
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(CHARACTER_STORAGE_KEY, JSON.stringify(characters))
  }, [characters, hydrated])

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
