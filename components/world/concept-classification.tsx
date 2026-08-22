"use client"

/**
 * Concept Classification — the first step of the future Concept Creator.
 *
 * FOUNDATION pass only: instead of a large form, the writer answers three
 * broad classification questions. These selections will eventually determine
 * which information fields are relevant to a given Concept, so the full editor
 * can stay small and contextual rather than showing every possible field.
 *
 * No Concept record is created or persisted yet — this screen only establishes
 * the classification interface and the pathway into it.
 */

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Question = {
  id: "nature" | "affects" | "function"
  label: string
  /** Explains how these selections will be used later. */
  help: string
  options: string[]
}

const QUESTIONS: Question[] = [
  {
    id: "nature",
    label: "What is this?",
    help: "Your answers here will eventually determine which information fields are relevant to this Concept, so you only fill in what actually applies.",
    options: [
      "Phenomenon",
      "System",
      "Mechanism",
      "Principle",
      "Rule",
      "Practice",
      "Condition",
      "Belief / Idea",
      "Other",
    ],
  },
  {
    id: "affects",
    label: "What does it affect?",
    help: "Scope selections will eventually determine which relationships and impact fields appear on this Concept's record.",
    options: [
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
  {
    id: "function",
    label: "How does it exist or function?",
    help: "How a Concept comes to be will eventually determine which origin, cost, and requirement fields are relevant.",
    options: [
      "Naturally occurring",
      "Created",
      "Discovered",
      "Learned",
      "Practiced",
      "Believed",
      "Imposed",
      "Inherent",
      "Requires specific conditions",
      "Other",
    ],
  },
]

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

export function ConceptClassification() {
  const [answers, setAnswers] = useState<Record<string, string[]>>({
    nature: [],
    affects: [],
    function: [],
  })

  function toggle(qid: string, option: string) {
    setAnswers((prev) => {
      const current = prev[qid] ?? []
      return {
        ...prev,
        [qid]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
      }
    })
  }

  const totalSelected = Object.values(answers).reduce((n, arr) => n + arr.length, 0)

  return (
    <div className="mt-6">
      <section>
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore &middot; Concepts</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Create Concept</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          Start by classifying what this Concept is. These answers shape which details matter later, so you never have
          to work through fields that don&apos;t apply. Select as many options as fit &mdash; most Concepts touch more
          than one.
        </p>
      </section>

      <div className="mt-6 flex flex-col gap-4">
        {QUESTIONS.map((q, qi) => {
          const selected = answers[q.id] ?? []
          return (
            <section key={q.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/12 text-[11px] font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {qi + 1}
                </span>
                <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">{q.label}</h2>
                <HelpTip text={q.help} />
                <span className="ml-auto text-xs text-muted-foreground">
                  {selected.length > 0 ? `${selected.length} selected` : "Select all that apply"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {q.options.map((opt) => {
                  const active = selected.includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggle(q.id, opt)}
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
            </section>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground text-pretty">
          {totalSelected > 0
            ? `${totalSelected} classification ${totalSelected === 1 ? "selection" : "selections"} made. `
            : ""}
          The Concept editor is not built yet &mdash; these answers will carry into it and decide which fields it shows.
        </p>
        <button
          disabled
          title="The Concept editor is coming soon"
          className="inline-flex h-9 shrink-0 cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground opacity-70"
        >
          Continue
          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">Soon</span>
        </button>
      </div>
    </div>
  )
}
