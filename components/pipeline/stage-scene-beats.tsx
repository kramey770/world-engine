"use client"

import { Check, CheckCircle2, Lock, Plus, Sparkles, Trash2, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { explorerSections } from "@/lib/mock-data"
import { POV_OPTIONS, TONE_OPTIONS, usePipeline } from "@/lib/pipeline-store"
import { WorldDetails } from "@/components/pipeline/world-details"
import { StageShell } from "@/components/pipeline/stage-shell"
import { cn } from "@/lib/utils"

const WORLD_CHARACTERS =
  explorerSections.find((s) => s.id === "character")?.items.map((i) => i.name) ?? []
const WORLD_LOCATIONS =
  explorerSections.find((s) => s.id === "location")?.items.map((i) => i.name) ?? []

const AI_DRAFT =
  "The air tasted of iron and old smoke. She moved through it the way one moves through water, each step deliberate, each breath measured, until the shape ahead resolved into something she had only ever seen in the maps Corin left behind."

export function StageSceneBeats() {
  const {
    scenes,
    activeSceneId,
    setActiveScene,
    createScene,
    updateScene,
    toggleSceneCharacter,
    finalizeScene,
    reopenScene,
    deleteScene,
  } = usePipeline()

  const active = scenes.find((s) => s.id === activeSceneId) ?? null

  return (
    <StageShell
      railLabel="Scenes"
      rail={
        <>
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Scenes · {scenes.length}
          </span>
          <button
            onClick={createScene}
            aria-label="Create scene"
            className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {scenes.length === 0 && (
            <p className="px-2 py-6 text-center text-xs text-muted-foreground">
              No scenes yet. Create your first scene beat.
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {scenes.map((s) => {
              const isActive = s.id === activeSceneId
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActiveScene(s.id)}
                    className={cn(
                      "flex w-full flex-col items-start gap-0.5 rounded-lg border px-2.5 py-2 text-left transition-colors",
                      isActive
                        ? "border-primary/40 bg-primary/10"
                        : "border-transparent hover:border-border hover:bg-accent",
                    )}
                  >
                    <span className="flex w-full items-center gap-1.5">
                      <span className="truncate text-sm font-medium text-foreground">{s.title}</span>
                      {s.status === "finalized" && (
                        <CheckCircle2 className="ml-auto size-3.5 shrink-0 text-primary" />
                      )}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {s.setting || "No setting"} · {s.status === "finalized" ? "Finalized" : "Draft"}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        </>
      }
    >
        {!active ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Select a scene or create a new one to begin.</p>
              <Button onClick={createScene} className="mt-4">
                <Plus className="size-4" />
                Create Scene
              </Button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  active.status === "finalized"
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "border border-border bg-card text-muted-foreground",
                )}
              >
                {active.status === "finalized" ? <Lock className="size-3" /> : null}
                {active.status === "finalized" ? "Finalized" : "Draft"}
              </span>
              <button
                onClick={() => deleteScene(active.id)}
                className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
                Delete
              </button>
            </div>

            <input
              value={active.title}
              onChange={(e) => updateScene(active.id, { title: e.target.value })}
              placeholder="Scene Title"
              className="mt-3 w-full bg-transparent font-serif text-3xl font-medium tracking-tight text-foreground placeholder:text-muted-foreground/40 outline-none"
            />

            {/* metadata grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Setting">
                <SelectLike
                  value={active.setting}
                  onChange={(v) => updateScene(active.id, { setting: v })}
                  options={WORLD_LOCATIONS}
                  placeholder="Choose a location"
                />
              </Field>
              <Field label="POV">
                <SelectLike
                  value={active.pov}
                  onChange={(v) => updateScene(active.id, { pov: v })}
                  options={POV_OPTIONS}
                  placeholder="Point of view"
                />
              </Field>
              <Field label="Tone">
                <SelectLike
                  value={active.tone}
                  onChange={(v) => updateScene(active.id, { tone: v })}
                  options={TONE_OPTIONS}
                  placeholder="Emotional tone"
                />
              </Field>
              <Field label="Characters">
                <div className="flex flex-wrap gap-1.5">
                  {WORLD_CHARACTERS.map((name) => {
                    const on = active.characters.includes(name)
                    return (
                      <button
                        key={name}
                        onClick={() => toggleSceneCharacter(active.id, name)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                          on
                            ? "border-primary/40 bg-primary/15 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                        )}
                      >
                        {on && <Check className="size-3" />}
                        {name}
                      </button>
                    )
                  })}
                </div>
              </Field>
            </div>

            {/* notes */}
            <Field label="Notes / Intent" className="mt-4">
              <textarea
                value={active.notes}
                onChange={(e) => updateScene(active.id, { notes: e.target.value })}
                rows={2}
                placeholder="What must this beat accomplish?"
                className="w-full resize-none rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </Field>

            {/* AI writing area */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Scene Prose
                </span>
                <button
                  onClick={() =>
                    updateScene(active.id, {
                      content: active.content ? `${active.content}\n\n${AI_DRAFT}` : AI_DRAFT,
                    })
                  }
                  disabled={active.status === "finalized"}
                  className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground active:scale-95 disabled:opacity-40"
                >
                  <Wand2 className="size-3.5" />
                  AI draft
                </button>
              </div>
              <textarea
                value={active.content}
                onChange={(e) => updateScene(active.id, { content: e.target.value })}
                readOnly={active.status === "finalized"}
                rows={9}
                placeholder="Write or generate the prose for this beat..."
                className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3 font-serif text-[1.02rem] leading-8 text-foreground/90 placeholder:font-sans placeholder:text-sm placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 read-only:opacity-80"
              />
            </div>

            <div className="mt-4">
              <WorldDetails scenes={[active]} title="World Details" />
            </div>

            {/* finalize */}
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
              {active.status === "finalized" ? (
                <>
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary">
                    <CheckCircle2 className="size-4" />
                    Finalized — available in 1st Draft
                  </span>
                  <Button variant="outline" onClick={() => reopenScene(active.id)} className="ml-auto">
                    Reopen for editing
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Finalizing sends this beat to the 1st Draft stage where it can be arranged into a chapter.
                  </p>
                  <Button
                    onClick={() => finalizeScene(active.id)}
                    disabled={!active.title.trim() || !active.content.trim()}
                    className="ml-auto shrink-0"
                  >
                    Finalize
                    <ArrowIcon />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
    </StageShell>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
      <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

/** A native <select> styled to match the app, with a placeholder option. */
function SelectLike({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30",
        value ? "text-foreground" : "text-muted-foreground/70",
      )}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-popover text-foreground">
          {o}
        </option>
      ))}
    </select>
  )
}
