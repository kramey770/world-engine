"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Lightbulb, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { CanonImageField } from "@/components/world/canon-image-field"
import {
  CONCEPT_QUESTIONS,
  getConceptFieldDefinitionsForSelections,
  getConceptOptionLabel,
  useConceptCanon,
  type ConceptClassifications,
  type ConceptQuestionId,
} from "@/lib/concept-canon"

type Draft = {
  name: string
  image: string
  summary: string
  definition: string
  additionalInfo: string
  classifications: ConceptClassifications
  fieldValues: Record<string, string>
}

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

function toDraft(concept: ReturnType<ReturnType<typeof useConceptCanon>["getConcept"]> extends infer T ? NonNullable<T> : never): Draft {
  return {
    name: concept.name ?? "",
    image: concept.image ?? "",
    summary: concept.summary ?? "",
    definition: concept.definition ?? "",
    additionalInfo: concept.additionalInfo ?? "",
    classifications: concept.classifications ?? {},
    fieldValues: concept.fieldValues ?? {},
  }
}

function draftToPatch(draft: Draft) {
  return {
    name: draft.name.trim() || "Unnamed Concept",
    image: draft.image || undefined,
    summary: draft.summary.trim() || undefined,
    definition: draft.definition.trim() || undefined,
    additionalInfo: draft.additionalInfo.trim() || undefined,
    classifications: draft.classifications,
    fieldValues: draft.fieldValues,
  }
}

export function ConceptCanonRecord({ conceptId, className }: { conceptId: string | null; className?: string }) {
  const { getConcept, updateConcept } = useConceptCanon()
  const concept = getConcept(conceptId)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMode("view")
    contentRef.current?.scrollTo({ top: 0 })
  }, [conceptId])

  useEffect(() => {
    if (mode === "edit" && concept) setDraft(toDraft(concept))
  }, [mode, concept])

  const save = useCallback(() => {
    if (concept && draft) updateConcept(concept.id, draftToPatch(draft))
    setMode("view")
  }, [concept, draft, updateConcept])

  if (!concept) return null

  const selectedFieldDefinitions = useMemo(() => getConceptFieldDefinitionsForSelections(draft?.classifications ?? concept.classifications ?? {}), [draft, concept])

  const visibleFields = selectedFieldDefinitions.filter((field) => {
    const value = (draft ?? concept).fieldValues[field.id]
    return value !== undefined && value !== ""
  })

  function toggleSelection(questionId: ConceptQuestionId, optionId: string) {
    if (!draft) return
    setDraft((current) => {
      if (!current) return current
      const existing = current.classifications[questionId] ?? []
      const next = existing.includes(optionId)
        ? existing.filter((value) => value !== optionId)
        : [...existing, optionId]
      return { ...current, classifications: { ...current.classifications, [questionId]: next } }
    })
  }

  function updateFieldValue(fieldId: string, value: string) {
    if (!draft) return
    setDraft((current) => {
      if (!current) return current
      return {
        ...current,
        fieldValues: { ...current.fieldValues, [fieldId]: value },
      }
    })
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="group relative aspect-[3/2] w-full overflow-hidden bg-muted">
          {concept.image ? (
            <img src={concept.image} alt={`View of ${concept.name}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
              <Lightbulb className="size-10" />
            </div>
          )}
          <CanonImageField value={draft?.image ?? concept.image ?? ""} onChange={(image) => {
            if (mode === "edit" && draft) setDraft({ ...draft, image: image || "" })
            else if (image) updateConcept(concept.id, { image: image || undefined })
          }} />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
              {concept.name}
            </h2>
            {concept.summary && <p className="mt-0.5 text-sm text-muted-foreground">{concept.summary}</p>}
          </div>
        </div>

        {mode === "view" ? (
          <div className="flex flex-col gap-6 p-4">
            <button
              onClick={() => setMode("edit")}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <Pencil className="size-3.5" />
              Edit Concept
            </button>

            <Section title="Identity">
              <div className="space-y-3">
                {concept.name && <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">{concept.name}</div>}
                {concept.summary && <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">{concept.summary}</div>}
                {concept.definition && <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm leading-relaxed text-foreground">{concept.definition}</div>}
              </div>
            </Section>

            {Object.keys(concept.classifications ?? {}).length > 0 && (
              <Section title="Classifications">
                <div className="space-y-3">
                  {CONCEPT_QUESTIONS.map((question) => {
                    const values = concept.classifications?.[question.id] ?? []
                    if (!values.length) return null
                    return (
                      <div key={question.id} className="rounded-lg border border-border bg-card p-3">
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{question.label}</p>
                        <div className="flex flex-wrap gap-2">
                          {values.map((value) => (
                            <span key={value} className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-foreground">
                              {getConceptOptionLabel(question.id, value)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Section>
            )}

            {visibleFields.length > 0 && (
              <Section title="Relevant details">
                <div className="space-y-4">
                  {visibleFields.map((field) => (
                    <div key={field.id} className="rounded-lg border border-border bg-card p-3">
                      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{field.label}</p>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                        {concept.fieldValues[field.id] || ""}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {concept.additionalInfo && (
              <Section title="Additional Information">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{concept.additionalInfo}</p>
              </Section>
            )}
          </div>
        ) : (
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <Section title="Identity">
                <div className="flex flex-col gap-3">
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={draft.name}
                      onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                    />
                  </Field>
                  <Field label="Summary">
                    <input
                      className={inputClass}
                      value={draft.summary}
                      onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                    />
                  </Field>
                  <Field label="Definition">
                    <textarea
                      className={cn(inputClass, "min-h-28 resize-y py-2 leading-relaxed")}
                      value={draft.definition}
                      onChange={(event) => setDraft({ ...draft, definition: event.target.value })}
                    />
                  </Field>
                </div>
              </Section>

              <Section title="Classifications">
                <div className="space-y-4">
                  {CONCEPT_QUESTIONS.map((question) => {
                    const selected = draft.classifications[question.id] ?? []
                    return (
                      <div key={question.id} className="rounded-lg border border-border bg-card p-3">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{question.label}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {question.options.map((option) => {
                            const active = selected.includes(option.id)
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => toggleSelection(question.id, option.id)}
                                className={cn(
                                  "rounded-lg border px-2 py-2 text-left text-xs transition-colors",
                                  active ? "border-primary/50 bg-primary/12 text-foreground" : "border-border bg-background text-muted-foreground",
                                )}
                              >
                                {option.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Section>

              {selectedFieldDefinitions.length > 0 && (
                <Section title="Relevant details">
                  <div className="space-y-4">
                    {selectedFieldDefinitions.map((field) => {
                      const isRelevant = (draft.classifications["kind"] ?? []).length > 0 || (draft.classifications["domain"] ?? []).length > 0 || (draft.classifications["origin"] ?? []).length > 0 || (draft.classifications["operation"] ?? []).length > 0
                      const currentValue = draft.fieldValues[field.id] ?? ""
                      if (!isRelevant && !currentValue) return null
                      return (
                        <Field key={field.id} label={field.label}>
                          <textarea
                            className={cn(inputClass, "min-h-24 resize-y py-2 leading-relaxed")}
                            placeholder={field.placeholder}
                            value={currentValue}
                            onChange={(event) => updateFieldValue(field.id, event.target.value)}
                          />
                        </Field>
                      )
                    })}
                  </div>
                </Section>
              )}

              <Section title="Additional Information">
                <textarea
                  className={cn(inputClass, "min-h-28 resize-y py-2 leading-relaxed")}
                  value={draft.additionalInfo}
                  onChange={(event) => setDraft({ ...draft, additionalInfo: event.target.value })}
                />
              </Section>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMode("view")}
                  className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
