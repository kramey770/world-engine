"use client"

/**
 * Concept Canon — the shared store for Concept records.
 *
 * Mirrors the Character / Location / Religion canon stores: one provider owns
 * the records, and every view reads from it so there is a single source of
 * truth. Concepts start empty and are created through the classification flow.
 *
 * The distinguishing piece of this layer is `relevantAreasFor()`, which turns
 * the writer's three initial classification answers into the set of
 * information areas that actually matter for that Concept. This is the
 * architecture the future Concept schema will hang off of: selections decide
 * which areas appear, rather than showing every possible field to everyone.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/* ------------------------------- Classification ------------------------------ */

/** The three initial inquiries, keyed to match the classification screen. */
export type ConceptSelections = {
  nature: string[]
  affects: string[]
  function: string[]
}

export const EMPTY_SELECTIONS: ConceptSelections = { nature: [], affects: [], function: [] }

export const QUESTION_LABELS: Record<keyof ConceptSelections, string> = {
  nature: "What is this?",
  affects: "What does it affect?",
  function: "How does it exist or function?",
}

/* --------------------------------- Records --------------------------------- */

export type CanonConcept = {
  id: string
  name: string
  summary?: string
  notes?: string
  selections: ConceptSelections
}

export type ConceptEdit = Partial<Omit<CanonConcept, "id">>

/* --------------------------- Relevant information -------------------------- */

/**
 * An information area that may be relevant to a Concept. Areas are placeholders
 * in this pass — the fields inside them are intentionally not built yet.
 */
export type InfoArea = {
  id: string
  label: string
  description: string
}

type AreaRule = InfoArea & {
  /** Any one matching selection makes the area relevant. `true` = always. */
  match: true | Partial<Record<keyof ConceptSelections, string[]>>
}

const AREA_RULES: AreaRule[] = [
  {
    id: "nature-existence",
    label: "Nature & Existence",
    description: "What this fundamentally is, and the form it takes in the world.",
    match: true,
  },
  {
    id: "rules-mechanics",
    label: "Rules & Mechanics",
    description: "The governing logic — how it operates and what constrains it.",
    match: { nature: ["System", "Mechanism", "Rule", "Principle"], function: ["Requires specific conditions"] },
  },
  {
    id: "effects-consequences",
    label: "Effects & Consequences",
    description: "What changes because this exists, including costs and side effects.",
    match: {
      affects: [
        "Individuals",
        "Society",
        "Culture",
        "Physical World",
        "Supernatural",
        "Technology",
        "Environment",
        "Combat",
        "Other",
      ],
    },
  },
  {
    id: "requirements-conditions",
    label: "Requirements & Conditions",
    description: "What must be true for this to occur, function, or persist.",
    match: { function: ["Requires specific conditions", "Imposed"], nature: ["Condition"] },
  },
  {
    id: "origin-emergence",
    label: "Origin & Emergence",
    description: "Where this came from and how it entered the world.",
    match: { function: ["Naturally occurring", "Created", "Discovered", "Inherent"] },
  },
  {
    id: "practice-transmission",
    label: "Practice & Transmission",
    description: "How it is learned, taught, performed, or passed on.",
    match: { function: ["Learned", "Practiced"], nature: ["Practice"] },
  },
  {
    id: "supernatural-properties",
    label: "Supernatural Properties",
    description: "Metaphysical behavior and how it interacts with the unseen.",
    match: { affects: ["Supernatural"] },
  },
  {
    id: "physical-environmental",
    label: "Physical & Environmental",
    description: "Material presence and effects on the physical world.",
    match: { affects: ["Physical World", "Environment"] },
  },
  {
    id: "social-cultural",
    label: "Social & Cultural Role",
    description: "How societies and cultures regard, use, or regulate this.",
    match: { affects: ["Society", "Culture"] },
  },
  {
    id: "belief-interpretation",
    label: "Belief & Interpretation",
    description: "Competing understandings, doctrine, and disputed meaning.",
    match: { nature: ["Belief / Idea"], function: ["Believed"] },
  },
]

/** Derives the relevant information areas from a Concept's classifications. */
export function relevantAreasFor(sel: ConceptSelections): InfoArea[] {
  return AREA_RULES.filter((rule) => {
    if (rule.match === true) return true
    return (Object.keys(rule.match) as (keyof ConceptSelections)[]).some((key) => {
      const wanted = rule.match === true ? [] : (rule.match[key] ?? [])
      return (sel[key] ?? []).some((chosen) => wanted.includes(chosen))
    })
  }).map(({ match: _match, ...area }) => area)
}

/* --------------------------------- Provider -------------------------------- */

type ConceptCanonValue = {
  concepts: Record<string, CanonConcept>
  getConcept: (id: string | null) => CanonConcept | null
  createConcept: (selections: ConceptSelections) => string
  updateConcept: (id: string, patch: ConceptEdit) => void
}

const ConceptCanonContext = createContext<ConceptCanonValue | null>(null)

export function ConceptCanonProvider({ children }: { children: ReactNode }) {
  // Concepts are author-created; there is no seed data for this category.
  const [concepts, setConcepts] = useState<Record<string, CanonConcept>>({})

  const getConcept = useCallback((id: string | null) => (id ? (concepts[id] ?? null) : null), [concepts])

  const createConcept = useCallback((selections: ConceptSelections) => {
    const id = `concept-${Date.now().toString(36)}`
    setConcepts((prev) => ({
      ...prev,
      [id]: { id, name: "Untitled Concept", selections },
    }))
    return id
  }, [])

  const updateConcept = useCallback((id: string, patch: ConceptEdit) => {
    setConcepts((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev))
  }, [])

  const value = useMemo(
    () => ({ concepts, getConcept, createConcept, updateConcept }),
    [concepts, getConcept, createConcept, updateConcept],
  )

  return <ConceptCanonContext.Provider value={value}>{children}</ConceptCanonContext.Provider>
}

export function useConceptCanon() {
  const ctx = useContext(ConceptCanonContext)
  if (!ctx) throw new Error("useConceptCanon must be used within a ConceptCanonProvider")
  return ctx
}
