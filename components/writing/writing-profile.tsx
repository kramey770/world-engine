"use client"

import { useState } from "react"
import { ArrowLeft, BookOpenText, Info, Layers, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

/**
 * Writing Profile — foundation pass.
 *
 * This page is the persistent home for the writer's AUTHOR STYLE: baseline
 * prose/voice preferences that stay consistent across the whole project.
 * It is intentionally UI-only for now. No AI, no resolver, no persistence,
 * no scene-level controls — just the correct place to build those later.
 */

type SingleField = {
  id: string
  label: string
  hint: string
  options: { value: string; caption?: string }[]
}

// Structured single-choice categories (1-7). Options are a sensible starting
// set, not an exhaustive taxonomy — this expands in future passes.
const SINGLE_FIELDS: SingleField[] = [
  {
    id: "perspective",
    label: "Narrative Perspective",
    hint: "The default vantage point your story is told from.",
    options: [
      { value: "First Person", caption: "I / we" },
      { value: "Second Person", caption: "you" },
      { value: "Third Limited", caption: "he / she / they, one mind" },
      { value: "Third Omniscient", caption: "he / she / they, all-seeing" },
    ],
  },
  {
    id: "tense",
    label: "Tense",
    hint: "The default grammatical tense of your narration.",
    options: [
      { value: "Past", caption: "walked, said" },
      { value: "Present", caption: "walks, says" },
    ],
  },
  {
    id: "distance",
    label: "Narrative Distance / POV Intimacy",
    hint: "How close the narration sits to the viewpoint character's mind.",
    options: [
      { value: "Deep / Intimate", caption: "inside their head" },
      { value: "Close", caption: "over the shoulder" },
      { value: "Balanced", caption: "a measured remove" },
      { value: "Distant", caption: "cinematic, observed" },
    ],
  },
  {
    id: "interiority",
    label: "Interior Thought / Internal Focus",
    hint: "How much weight the prose gives to a character's inner life.",
    options: [
      { value: "Minimal", caption: "action-forward" },
      { value: "Moderate", caption: "a natural balance" },
      { value: "Heavy", caption: "reflective, inward" },
    ],
  },
  {
    id: "rhythm",
    label: "Sentence Rhythm",
    hint: "The default cadence and length of your sentences.",
    options: [
      { value: "Short & Punchy", caption: "clipped, urgent" },
      { value: "Varied", caption: "mixed lengths" },
      { value: "Long & Flowing", caption: "winding, lyrical" },
    ],
  },
  {
    id: "description",
    label: "Description Level",
    hint: "How much sensory and environmental detail you favor.",
    options: [
      { value: "Sparse", caption: "lean, suggestive" },
      { value: "Moderate", caption: "grounded detail" },
      { value: "Lush", caption: "rich, immersive" },
    ],
  },
  {
    id: "dialogue",
    label: "Dialogue Style",
    hint: "The default texture of how your characters speak.",
    options: [
      { value: "Naturalistic", caption: "true to real speech" },
      { value: "Snappy", caption: "witty, quick" },
      { value: "Formal", caption: "measured, elevated" },
      { value: "Sparse", caption: "few words, much unsaid" },
    ],
  },
]

// Prose Characteristics (8) is multi-select — a writer's voice is usually a
// blend, not a single label.
const PROSE_CHARACTERISTICS = [
  "Lyrical",
  "Spare",
  "Vivid",
  "Atmospheric",
  "Direct",
  "Ornate",
  "Wry",
  "Poetic",
  "Grounded",
  "Cinematic",
  "Introspective",
  "Muscular",
]

const DEFAULTS: Record<string, string> = {
  perspective: "Third Limited",
  tense: "Past",
  distance: "Close",
  interiority: "Moderate",
  rhythm: "Varied",
  description: "Moderate",
  dialogue: "Naturalistic",
}

export function WritingProfile({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const [choices, setChoices] = useState<Record<string, string>>(DEFAULTS)
  const [characteristics, setCharacteristics] = useState<string[]>(["Atmospheric", "Grounded"])
  const [notes, setNotes] = useState("")

  function setChoice(field: string, value: string) {
    setChoices((prev) => ({ ...prev, [field]: value }))
  }

  function toggleCharacteristic(tag: string) {
    setCharacteristics((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  function resetAll() {
    setChoices(DEFAULTS)
    setCharacteristics(["Atmospheric", "Grounded"])
    setNotes("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Project Home
        </button>

        {/* Title */}
        <section className="mt-5">
          <p className="text-xs text-muted-foreground">{project.name} &middot; Writing Studio</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Writing Profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Establish your baseline prose and voice once, here — the preferences that stay consistent across the whole
            project — instead of repeating them for every AI writing request.
          </p>
        </section>

        {/* Persistent vs scene-specific distinction */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-border bg-card/60 px-4 py-3">
          <Layers className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
            <span className="font-medium text-foreground">This is your persistent Author Style.</span> Scene-specific
            settings — tone, pacing, mood, and moment-to-moment intensity — will live somewhere separate and layer on
            top of this baseline in a later pass.
          </p>
        </div>

        {/* Author Style */}
        <section className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpenText className="size-4 text-primary" />
              <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">Author Style</h2>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={resetAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Reset
            </Button>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            A starting set of controls. We&apos;ll expand these options as the writing-style system grows.
          </p>

          <div className="mt-4 space-y-3">
            {SINGLE_FIELDS.map((field) => (
              <div key={field.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-medium tracking-tight text-foreground">{field.label}</h3>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">{field.hint}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {field.options.map((opt) => {
                    const selected = choices[field.id] === opt.value
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setChoice(field.id, opt.value)}
                        aria-pressed={selected}
                        className={cn(
                          "flex min-h-[44px] flex-col items-start rounded-lg border px-3 py-2 text-left transition-colors",
                          selected
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-background hover:border-primary/30 hover:bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "text-sm font-medium leading-tight",
                            selected ? "text-foreground" : "text-foreground/90",
                          )}
                        >
                          {opt.value}
                        </span>
                        {opt.caption && (
                          <span className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{opt.caption}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Prose Characteristics — multi-select */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-medium tracking-tight text-foreground">Prose Characteristics</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground text-pretty">
                Select any qualities that describe your voice — a blend is expected.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PROSE_CHARACTERISTICS.map((tag) => {
                  const selected = characteristics.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleCharacteristic(tag)}
                      aria-pressed={selected}
                      className={cn(
                        "inline-flex min-h-[36px] items-center rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                        selected
                          ? "border-primary/50 bg-primary/12 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Style Notes */}
        <section className="mt-8">
          <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">Additional Style Notes</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
            Anything the controls above can&apos;t capture — quirks, influences, hard rules, or preferences in your own
            words.
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="e.g. Avoid em-dashes in dialogue. Lean into weather and light as mood. Never open a chapter with dialogue. Influences: Le Guin, McCarthy."
            className="mt-3 w-full resize-y rounded-xl border border-border bg-card px-3.5 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </section>

        {/* Foundation note + save affordance */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/70" />
            <p className="text-[11px] leading-relaxed text-muted-foreground/80">
              Foundation pass — these preferences aren&apos;t connected to AI generation yet. Saving and applying your
              Author Style comes in a later pass.
            </p>
          </div>
          <Button disabled className="shrink-0 self-start sm:self-auto">
            Save Author Style
          </Button>
        </div>
      </div>
    </div>
  )
}
