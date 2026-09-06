"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { CONCEPT_QUESTIONS, type ConceptClassifications, type ConceptQuestionId, useConceptCanon } from "@/lib/concept-canon"
import { cn } from "@/lib/utils"

function HelpTip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="What are these selections used for?"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <HelpCircle className="size-4" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-8 z-20 w-64 rounded-lg border border-border bg-popover p-3 text-xs leading-relaxed text-muted-foreground shadow-lg"
        >
          {text}
        </span>
      )}
    </span>
  )
}

export function ConceptClassification({
  onCancel,
  onCreated,
}: {
  onCancel?: () => void
  onCreated?: (id: string) => void
}) {
  const { addConcept } = useConceptCanon()
  const [answers, setAnswers] = useState<ConceptClassifications>({})

  function toggle(questionId: ConceptQuestionId, optionId: string) {
    setAnswers((prev) => {
      const current = prev[questionId] ?? []
      const next = current.includes(optionId) ? current.filter((option) => option !== optionId) : [...current, optionId]
      return { ...prev, [questionId]: next }
    })
  }

  const totalSelected = Object.values(answers).reduce((n, arr) => n + (arr?.length ?? 0), 0)

  function handleContinue() {
    const conceptId = addConcept({
      name: "Unnamed Concept",
      summary: "",
      definition: "",
      classifications: answers,
      fieldValues: {},
    })
    onCreated?.(conceptId)
  }

  return (
    <div className="mt-6">
      <section>
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore &middot; Concepts</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Create Concept</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          Start by classifying what this Concept is. These answers determine which details matter later, so you only
          fill in information that actually applies. Select as many options as fit &mdash; most Concepts touch more than
          one dimension.
        </p>
      </section>

      <div className="mt-6 flex flex-col gap-4">
        {CONCEPT_QUESTIONS.map((question, questionIndex) => {
          const selected = answers[question.id] ?? []
          return (
            <section key={question.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/12 text-[11px] font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {questionIndex + 1}
                </span>
                <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">{question.label}</h2>
                <HelpTip text={question.help} />
                <span className="ml-auto text-xs text-muted-foreground">
                  {selected.length > 0 ? `${selected.length} selected` : "Select all that apply"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {question.options.map((option) => {
                  const active = selected.includes(option.id)
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(question.id, option.id)}
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
                      <span className="text-pretty">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground text-pretty">
          {totalSelected > 0 ? `${totalSelected} classification ${totalSelected === 1 ? "selection" : "selections"} made. ` : ""}
          These selections determine which Concept fields become relevant in the record editor.
        </p>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleContinue}
            disabled={totalSelected === 0}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium shadow-sm transition-colors",
              totalSelected === 0
                ? "cursor-not-allowed border border-border bg-background text-muted-foreground opacity-60"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99]",
            )}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
