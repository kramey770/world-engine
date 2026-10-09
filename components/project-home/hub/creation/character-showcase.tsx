"use client"

import { useEffect, useMemo } from "react"
import { useCharacterCanon, type Character } from "@/lib/character-canon"
import { useProjectCollection } from "@/lib/project-store"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { CharacterShowcaseScene } from "./character-showcase-scene"

const defaultShowcaseCharacter: Character = {
  id: "character-showcase-seed",
  name: "Aster Vale",
  portrait: "",
  title: "Captain of the Dawn Guard",
  role: "Captain of the Dawn Guard",
  birthHouse: "vale",
  house: "vale",
  bio: "A field commander forged in the border wars and saved for the front line of the project.",
  currentLocation: "Amber Bastion",
  origin: "The western marches",
  culture: "Human",
  classification: "Human",
  currentLocationRef: undefined,
}

export function CharacterShowcase({ definition, item: _item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  const { characters } = useCharacterCanon()
  const [showcaseState, setShowcaseState] = useProjectCollection<{ featuredCharacterId: string | null }>("character-showcase", { featuredCharacterId: null })

  const availableCharacters = useMemo(() => Object.values(characters), [characters])

  useEffect(() => {
    if (availableCharacters.length === 0) {
      if (showcaseState.featuredCharacterId !== null) {
        setShowcaseState((current) => ({ ...current, featuredCharacterId: null }))
      }
      return
    }

    const isSelected = showcaseState.featuredCharacterId && availableCharacters.some((character) => character.id === showcaseState.featuredCharacterId)
    if (!showcaseState.featuredCharacterId || !isSelected) {
      setShowcaseState((current) => ({ ...current, featuredCharacterId: availableCharacters[0].id }))
    }
  }, [availableCharacters, setShowcaseState, showcaseState.featuredCharacterId])

  const featuredCharacter = useMemo(() => {
    const selectedCharacter = availableCharacters.find((character) => character.id === showcaseState.featuredCharacterId)
    return selectedCharacter ?? availableCharacters[0] ?? defaultShowcaseCharacter
  }, [availableCharacters, showcaseState.featuredCharacterId])

  const hasProjectCharacter = featuredCharacter.id !== "character-showcase-seed"

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative -m-2 flex min-h-[370px] flex-1 flex-col sm:-m-3">
        <header className="relative z-[1] flex shrink-0 items-center justify-between gap-2 py-1">
          <h2 className="max-w-full truncate font-serif text-lg leading-tight text-white">
            {featuredCharacter.name}
          </h2>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-500/10 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.18em] text-emerald-100">
            Featured
          </span>
        </header>

        <div className="relative mt-1 min-h-[240px] flex-1 overflow-hidden rounded-[1.25rem] border border-emerald-300/15 bg-background">
          <CharacterShowcaseScene />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/10" />
        </div>

        <div className="relative z-[1] mt-2 flex shrink-0 items-center justify-between gap-3 px-1 text-[9px] leading-tight text-white/55">
          <span className="min-w-0 truncate">{featuredCharacter.role || featuredCharacter.title || featuredCharacter.classification || "Human"}</span>
          <span className="min-w-0 truncate text-right">{featuredCharacter.currentLocation || featuredCharacter.origin || featuredCharacter.house || "Character"}</span>
        </div>

        {!hasProjectCharacter && (
          <div className="mt-2 rounded-lg border border-emerald-200/10 bg-emerald-500/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-emerald-100/90">
            Seeded showcase character
          </div>
        )}
      </div>
    </HubBox>
  )
}