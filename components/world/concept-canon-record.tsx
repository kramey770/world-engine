"use client"

/**
 * ConceptCanonRecord — the basic Concept Canon record.
 *
 * Follows the same one-view / one-edit-form philosophy as the Character,
 * Location, and Religion records: all data lives in ConceptCanonProvider and
 * this component never holds duplicate state.
 *
 * The classifications chosen during the three initial inquiries carry over
 * here, stay editable, and drive the "Relevant Information" areas. Those areas
 * are deliberately placeholders in this pass — the point is to prove the
 * architecture (selections -> relevant areas -> part of the canon record).
 */

import { useCallback, useEffect, useState } from "react"
import { Check, Lightbulb, Pencil } from "lucide-react"
import { CONCEPT_QUESTIONS } from "@/components/world/concept-classification"
import {
  QUESTION_LABELS,
  relevantAreasFor,
  useConceptCanon,
  type CanonConcept,
  type ConceptSelections,
} from "@/lib/concept-canon"
import { cn } from "@/lib/utils"

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

/* ---------------------------------- Draft ---------------------------------- */

type Draft = {
  name: string
  summary: string
  notes: string
  selections: ConceptSelections
}

function toDraft(c: CanonConcept): Draft {
  return {
    name: c.name ?? "",
    summary: c.summary ?? "",
    notes: c.notes ?? "",
    selections: {
      nature: [...c.selections.nature],
      affects: [...c.selections.affects],
      function: [...c.selections.function],
    },
  }
}

/* ------------------------------- Canon record ------------------------------ */

export function ConceptCanonRecord({ conceptId, className }: { conceptId: string | null; className?: string }) {
  const { getConcept, updateConcept } = useConceptCanon()
  const concept = getConcept(conceptId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)

  // Always return to read-only when the selected concept changes.
  useEffect(() => {
    setMode("view")
  }, [conceptId])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && concept) setDraft(toDraft(concept))
  }, [mode, concept])

  const save = useCallback(() => {
    if (concept && draft) {
      const clean = (s: string) => {
        const t = s.trim()
        return t.length ? t : undefined
      }
      updateConcept(concept.id, {
        name: draft.name.trim() || "Untitled Concept",
        summary: clean(draft.summary),
        notes: clean(draft.notes),
        selections: draft.selections,
      })
    }
    setMode("view")
  }, [concept, draft, updateConcept])

  function toggleDraftSelection(qid: keyof ConceptSelections, option: string) {
    setDraft((prev) => {
      if (!prev) return prev
      const current = prev.selections[qid] ?? []
      return {
        ...prev,
        selections: {
          ...prev.selections,
          [qid]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
        },
      }
    })
  }

  if (!concept) return null

  // Relevant areas always reflect the record being shown — the live canon
  // selections in view mode, or the in-progress draft while editing.
  const activeSelections = mode === "edit" && draft ? draft.selections : concept.selections
  const areas = relevantAreasFor(activeSelections)
  const selectionKeys = Object.keys(QUESTION_LABELS) as (keyof ConceptSelections)[]
  const totalSelected = selectionKeys.reduce((n, k) => n + (activeSelections[k]?.length ?? 0), 0)

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Iconographic hero, matching the Religion record's non-image treatment */}
        <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
          <Lightbulb className="size-16 text-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
              {concept.name}
            </h2>
            {concept.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{concept.summary}</p>}
          </div>
        </div>

        {mode === "view" ? (
          /* ------------------------------ VIEW MODE ------------------------------ */
          <div className="flex flex-col gap-6 p-4">
            <button
              onClick={() => setMode("edit")}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <Pencil className="size-3.5" />
              Edit Concept
            </button>

            <Section title="Classifications">
              {totalSelected === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No classifications selected. Edit this Concept to add them.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {selectionKeys.map((key) => {
                    const chosen = activeSelections[key] ?? []
                    if (chosen.length === 0) return null
                    return (
                      <div key={key}>
                        <p className="text-[11px] text-muted-foreground">{QUESTION_LABELS[key]}</p>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {chosen.map((opt) => (
                            <span
                              key={opt}
                              className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Section>

            {concept.notes && (
              <Section title="Further Notes">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{concept.notes}</p>
              </Section>
            )}

            {/* ------------------------ RELEVANT INFORMATION ------------------------ */}
            <Section title="Relevant Information">
              <p className="mb-3 text-xs leading-relaxed text-muted-foreground text-pretty">
                Determined by this Concept&apos;s classifications. These areas are placeholders &mdash; their fields
                will be built in a later pass.
              </p>
              <div className="flex flex-col gap-2">
                {areas.map((area) => (
                  <div key={area.id} className="rounded-lg border border-dashed border-border bg-card/50 p-3">
                    <p className="text-sm font-medium text-foreground">{area.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        ) : (
          /* ------------------------------ EDIT MODE ------------------------------ */
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                This is the authoritative Canon record for this Concept. Changing the classifications below also changes
                which Relevant Information areas apply. More Concept fields will be added in a future pass.
              </p>

              <Section title="Identity">
                <div className="flex flex-col gap-3">
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    />
                  </Field>
                  <Field label="Summary">
                    <input
                      className={inputClass}
                      value={draft.summary}
                      placeholder="One-line identity shown beneath the name"
                      onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    />
                  </Field>
                </div>
              </Section>

              <Section title="Classifications">
                <div className="flex flex-col gap-4">
                  {CONCEPT_QUESTIONS.map((q) => {
                    const chosen = draft.selections[q.id] ?? []
                    return (
                      <div key={q.id}>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            {q.label}
                          </p>
                          <span className="text-[11px] text-muted-foreground">
                            {chosen.length > 0 ? `${chosen.length} selected` : "Select all that apply"}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {q.options.map((opt) => {
                            const active = chosen.includes(opt)
                            return (
                              <button
                                key={opt}
                                type="button"
                                aria-pressed={active}
                                onClick={() => toggleDraftSelection(q.id, opt)}
                                className={cn(
                                  "flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                                  active
                                    ? "border-primary/50 bg-primary/12 text-foreground"
                                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                                )}
                              >
                                <span
                                  className={cn(
                                    "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                                    active ? "border-primary bg-primary text-primary-foreground" : "border-border",
                                  )}
                                >
                                  {active && <Check className="size-3" />}
                                </span>
                                <span className="text-pretty">{opt}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Section>

              <Section title="Further Notes">
                <textarea
                  className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
                  value={draft.notes}
                  placeholder="Anything else worth recording about this Concept"
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                />
              </Section>

              <Section title="Relevant Information">
                <p className="mb-2 text-xs leading-relaxed text-muted-foreground text-pretty">
                  Updates live as you change the classifications above.
                </p>
                <div className="flex flex-wrap gap-2">
                  {areas.map((area) => (
                    <span
                      key={area.id}
                      className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                    >
                      {area.label}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )
        )}
      </div>

      {/* Edit-mode action bar */}
      {mode === "edit" && (
        <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3">
          <button
            onClick={() => setMode("view")}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}
