"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type LanguageType =
  | "natural"
  | "constructed"
  | "fictional"
  | "planned"
  | "sign"
  | "pidgin"
  | "creole"
  | "liturgical"
  | "secret"
  | "historical"
  | "other"

export type LanguageStatus = "active" | "endangered" | "dormant" | "extinct" | "revived" | "evolving" | "unknown"

export const LANGUAGE_TYPES: { id: LanguageType; label: string }[] = [
  { id: "natural", label: "Natural Language" },
  { id: "constructed", label: "Constructed Language" },
  { id: "fictional", label: "Fictional Language" },
  { id: "planned", label: "Planned Language" },
  { id: "sign", label: "Sign Language" },
  { id: "pidgin", label: "Pidgin" },
  { id: "creole", label: "Creole" },
  { id: "liturgical", label: "Liturgical Language" },
  { id: "secret", label: "Secret or Coded Language" },
  { id: "historical", label: "Historical or Reconstructed" },
  { id: "other", label: "Other" },
]

export const LANGUAGE_STATUSES: { id: LanguageStatus; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "endangered", label: "Endangered" },
  { id: "dormant", label: "Dormant" },
  { id: "extinct", label: "Extinct" },
  { id: "revived", label: "Revived" },
  { id: "evolving", label: "Evolving" },
  { id: "unknown", label: "Unknown" },
]

export function languageTypeLabel(type: LanguageType): string {
  return LANGUAGE_TYPES.find((option) => option.id === type)?.label ?? type
}

export function languageStatusLabel(status: LanguageStatus): string {
  return LANGUAGE_STATUSES.find((option) => option.id === status)?.label ?? status
}

export type CanonLanguage = {
  id: string
  name: string
  type: LanguageType
  status: LanguageStatus
  image?: string
  summary?: string
  description?: string
  endonym?: string
  alternateNames?: string
  pronunciation?: string
  family?: string
  relatedLanguages?: string
  homeland?: string
  currentDistribution?: string
  speakerCommunities?: string
  speakerScale?: string
  domainsOfUse?: string
  socialStatus?: string
  history?: string
  developmentStages?: string
  languageChange?: string
  script?: string
  writingSystem?: string
  writingDirection?: string
  orthography?: string
  sampleWriting?: string
  phonology?: string
  pronunciationGuide?: string
  phonotactics?: string
  stressToneProsody?: string
  grammar?: string
  wordOrder?: string
  morphology?: string
  vocabularyWordFormation?: string
  loanwords?: string
  namingConventions?: string
  dialectsRegisters?: string
  cultureAndMeaning?: string
  politenessTaboo?: string
  literatureOralTradition?: string
  examplesAndPhrases?: string
  translationNotes?: string
  sources?: string
  openQuestions?: string
  additionalInfo?: string
}

export type LanguageEdit = Partial<Omit<CanonLanguage, "id">>

type LanguageCanonContextValue = {
  languages: Record<string, CanonLanguage>
  getLanguage: (id: string | null | undefined) => CanonLanguage | null
  updateLanguage: (id: string, patch: LanguageEdit) => void
  addLanguage: (patch: LanguageEdit) => string
}

const LanguageCanonContext = createContext<LanguageCanonContextValue | null>(null)

function makeId(name: string, existing: Record<string, CanonLanguage>): string {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "language"
  let id = base
  let suffix = 2
  while (existing[id]) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

const seedLanguages: Record<string, CanonLanguage> = {
  "trade-speech": {
    id: "trade-speech",
    name: "Trade Speech",
    type: "pidgin",
    status: "evolving",
    summary: "A practical bridge language carried between ports, markets, and border settlements.",
    description: "Trade Speech is less a single homeland language than a living agreement between people who need to understand one another. Its vocabulary changes quickly, while older speakers preserve regional grammar beneath the shared surface.",
    endonym: "Mara ven",
    alternateNames: "Market Tongue; the Common Road",
    pronunciation: "MAH-rah ven",
    family: "Contact language with roots in Old Coast, High March, and River Sign",
    relatedLanguages: "Old Coast; High March; River Sign",
    homeland: "The western ports and caravan roads",
    currentDistribution: "Major markets, river crossings, military camps, and mixed settlements",
    speakerCommunities: "Merchants, sailors, guides, diplomats, and multilingual households",
    speakerScale: "Widespread second language; native in some port neighborhoods",
    domainsOfUse: "Trade, travel, diplomacy, contracts, and public notices",
    socialStatus: "Useful and widely understood, but considered imprecise by court scholars",
    history: "The language formed through generations of trade and migration, with each powerful port adding terms that later became common currency.",
    languageChange: "New technical and political vocabulary spreads rapidly; pronunciation marks a speaker's home region.",
    script: "Coastal Hand",
    writingSystem: "Alphabetic script adapted for quick writing on ledgers, cargo seals, and road markers",
    writingDirection: "Left to right",
    orthography: "Spelling is practical rather than standardized; merchants often preserve local spellings in private records.",
    phonology: "Short syllables and a small consonant inventory make unfamiliar words easier to repeat across accents.",
    pronunciationGuide: "Stress usually falls on the first syllable of a root; borrowed names retain their original stress when possible.",
    grammar: "Meaning is carried by word order, particles, and context more often than inflection.",
    wordOrder: "Subject-object-verb in careful speech; subject-verb-object is common in hurried conversation",
    morphology: "Small particles mark time, uncertainty, and obligation. Plurality is often inferred or stated separately.",
    vocabularyWordFormation: "Compounds are productive, especially for tools, goods, and unfamiliar inventions.",
    loanwords: "Borrowed words retain prestige when they name an imported object or an institution.",
    namingConventions: "People commonly use a personal name followed by a place, trade, or parent marker when meeting strangers.",
    dialectsRegisters: "Port, caravan, military, and court registers differ in vocabulary and politeness.",
    cultureAndMeaning: "The language prizes clarity in bargains but allows deliberate ambiguity in diplomacy.",
    politenessTaboo: "Direct refusal is softened in public; naming a person's debt in front of strangers is insulting.",
    literatureOralTradition: "Market jokes, sailors' songs, and memorized contract formulas carry history between communities.",
    examplesAndPhrases: "Mara ven: 'We carry words across water.' Common greeting: 'What road brought you here?'",
    translationNotes: "The word for fair exchange also implies mutual obligation; translating it as simply 'trade' loses its social force.",
    sources: "In-world merchant ledgers and oral histories",
  },
}

export function LanguageCanonProvider({ children }: { children: ReactNode }) {
  const [languages, setLanguages] = useState<Record<string, CanonLanguage>>(() => {
    const records = { ...seedLanguages, ...(redRisingDemo.languages as unknown as Record<string, CanonLanguage>) }
    return Object.fromEntries(Object.entries(records).map(([id, record]) => [id, { ...record, image: redRisingImage("language", id) }]))
  })

  const getLanguage = useCallback(
    (id: string | null | undefined): CanonLanguage | null => (id ? languages[id] ?? null : null),
    [languages],
  )

  const updateLanguage = useCallback((id: string, patch: LanguageEdit) => {
    setLanguages((previous) => {
      const existing = previous[id]
      if (!existing) return previous
      return { ...previous, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addLanguage = useCallback((patch: LanguageEdit): string => {
    const name = patch.name?.trim() || "Unnamed Language"
    let newId = ""
    setLanguages((previous) => {
      newId = makeId(name, previous)
      return {
        ...previous,
        [newId]: {
          id: newId,
          ...patch,
          name,
          type: patch.type ?? "natural",
          status: patch.status ?? "unknown",
        },
      }
    })
    return newId
  }, [])

  const value = useMemo(() => ({ languages, getLanguage, updateLanguage, addLanguage }), [languages, getLanguage, updateLanguage, addLanguage])
  return <LanguageCanonContext.Provider value={value}>{children}</LanguageCanonContext.Provider>
}

export function useLanguageCanon(): LanguageCanonContextValue {
  const context = useContext(LanguageCanonContext)
  if (!context) throw new Error("useLanguageCanon must be used within a LanguageCanonProvider")
  return context
}
