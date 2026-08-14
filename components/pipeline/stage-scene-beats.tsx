"use client"

import { useMemo, useRef, useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  Lock,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Wand2,
  GripVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { explorerSections } from "@/lib/mock-data"
import { POV_OPTIONS, TONE_OPTIONS, usePipeline } from "@/lib/pipeline-store"
import { StageShell } from "@/components/pipeline/stage-shell"
// (WorldDetails is aggregated later in the pipeline; the Scene Beat page stays writing-first.)
import { cn } from "@/lib/utils"

const WORLD_CHARACTERS =
  explorerSections.find((s) => s.id === "character")?.items.map((i) => i.name) ?? []
const WORLD_LOCATIONS =
  explorerSections.find((s) => s.id === "location")?.items.map((i) => i.name) ?? []
const WORLD_LORE = ["Founding of Emberhold", "The Ashfall", "The Iron Accord", "Bloodlines of the Reach"]

const TENSE_OPTIONS = ["Past", "Present", "Future"]

const GENERATED_PROSE =
  "The gates of Emberhold rose out of the grey like the ribs of some long-dead beast. Sera had walked three days through the ash to reach them, and now, standing in their shadow, she felt smaller than she had expected.\n\nSomewhere beyond the wall a bell began to toll, slow and uneven, as if the city itself were struggling to breathe. She pressed a gloved hand to the cold iron and waited for the city to notice her."

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
        <SceneEditor
          key={active.id}
          scene={active}
          scenes={scenes}
          updateScene={updateScene}
          toggleSceneCharacter={toggleSceneCharacter}
          finalizeScene={finalizeScene}
          reopenScene={reopenScene}
          deleteScene={deleteScene}
        />
      )}
    </StageShell>
  )
}

/* ------------------------------------------------------------------ *
 * Scene editor — a writing-first workspace
 * ------------------------------------------------------------------ */

type SceneEditorProps = {
  scene: ReturnType<typeof usePipeline>["scenes"][number]
  scenes: ReturnType<typeof usePipeline>["scenes"]
  updateScene: ReturnType<typeof usePipeline>["updateScene"]
  toggleSceneCharacter: ReturnType<typeof usePipeline>["toggleSceneCharacter"]
  finalizeScene: ReturnType<typeof usePipeline>["finalizeScene"]
  reopenScene: ReturnType<typeof usePipeline>["reopenScene"]
  deleteScene: ReturnType<typeof usePipeline>["deleteScene"]
}

function SceneEditor({
  scene,
  scenes,
  updateScene,
  toggleSceneCharacter,
  finalizeScene,
  reopenScene,
  deleteScene,
}: SceneEditorProps) {
  const finalized = scene.status === "finalized"

  // Local, UI-only state (not part of the shared data model).
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)
  const [originalOpen, setOriginalOpen] = useState(false)
  const [tense, setTense] = useState("")
  const [time, setTime] = useState("")
  const [contextPicks, setContextPicks] = useState<Record<string, string[]>>({})
  const [input, setInput] = useState("")
  const [generatedInput, setGeneratedInput] = useState("") // snapshot of the input at generation time
  const [selection, setSelection] = useState("")

  const workspaceRef = useRef<HTMLTextAreaElement | null>(null)

  const hasProse = scene.content.trim().length > 0
  const wordCount = useMemo(
    () => (scene.content.trim() ? scene.content.trim().split(/\s+/).length : 0),
    [scene.content],
  )

  function toggleContext(category: string, value: string) {
    setContextPicks((prev) => {
      const current = prev[category] ?? []
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  function handleGenerate() {
    if (finalized) return
    setGeneratedInput(input)
    updateScene(scene.id, { content: GENERATED_PROSE })
    setOriginalOpen(false)
  }

  function captureSelection() {
    const el = workspaceRef.current
    if (!el) return
    const value = el.value.slice(el.selectionStart, el.selectionEnd).trim()
    setSelection(value)
  }

  const povIsRelevant = scene.pov === "First Person" || scene.pov === "Third Limited"

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
      {/* status + title */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            finalized
              ? "border border-primary/30 bg-primary/10 text-primary"
              : "border border-border bg-card text-muted-foreground",
          )}
        >
          {finalized ? <Lock className="size-3" /> : null}
          {finalized ? "Finalized" : "Draft"}
        </span>
        <button
          onClick={() => deleteScene(scene.id)}
          className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
          Delete
        </button>
      </div>

      <input
        value={scene.title}
        onChange={(e) => updateScene(scene.id, { title: e.target.value })}
        placeholder="Scene Title"
        className="mt-3 w-full bg-transparent font-serif text-3xl font-medium tracking-tight text-foreground placeholder:text-muted-foreground/40 outline-none"
      />

      {/* Collapsible: Scene Settings */}
      <Collapsible
        className="mt-4"
        open={settingsOpen}
        onToggle={() => setSettingsOpen((v) => !v)}
        title="Scene Settings"
        hint="Optional"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="POV">
            <SelectLike
              value={scene.pov}
              onChange={(v) => updateScene(scene.id, { pov: v })}
              options={POV_OPTIONS}
              placeholder="Point of view"
            />
          </Field>
          {povIsRelevant && (
            <Field label="Perspective Character">
              <SelectLike
                value={scene.characters[0] ?? ""}
                onChange={(v) => {
                  // keep it simple: ensure the chosen character is included first
                  if (v && !scene.characters.includes(v)) toggleSceneCharacter(scene.id, v)
                }}
                options={WORLD_CHARACTERS}
                placeholder="Whose eyes?"
              />
            </Field>
          )}
          <Field label="Tense">
            <SelectLike value={tense} onChange={setTense} options={TENSE_OPTIONS} placeholder="Narrative tense" />
          </Field>
          <Field label="Location">
            <SelectLike
              value={scene.setting}
              onChange={(v) => updateScene(scene.id, { setting: v })}
              options={WORLD_LOCATIONS}
              placeholder="Where does it happen?"
            />
          </Field>
          <Field label="Time">
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. Dusk, third day"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </Field>
          <Field label="Tone">
            <SelectLike
              value={scene.tone}
              onChange={(v) => updateScene(scene.id, { tone: v })}
              options={TONE_OPTIONS}
              placeholder="Emotional tone"
            />
          </Field>
          <Field label="Characters in Scene" className="sm:col-span-2">
            <div className="flex flex-wrap gap-1.5">
              {WORLD_CHARACTERS.map((name) => {
                const on = scene.characters.includes(name)
                return (
                  <button
                    key={name}
                    onClick={() => toggleSceneCharacter(scene.id, name)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                      on
                        ? "border-primary/40 bg-primary/15 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    {on && <CheckCircle2 className="size-3" />}
                    {name}
                  </button>
                )
              })}
            </div>
          </Field>
        </div>
      </Collapsible>

      {/* Collapsible: Relevant Context (placeholder selections only) */}
      <Collapsible
        className="mt-3"
        open={contextOpen}
        onToggle={() => setContextOpen((v) => !v)}
        title="Relevant Context"
        hint="Placeholder"
      >
        <p className="mb-3 text-xs text-muted-foreground">
          Select worldbuilding the scene should draw on. (Selections are illustrative for now.)
        </p>
        <div className="flex flex-col gap-3">
          <ContextGroup
            label="Characters"
            options={WORLD_CHARACTERS}
            selected={contextPicks.Characters ?? []}
            onToggle={(v) => toggleContext("Characters", v)}
          />
          <ContextGroup
            label="Locations"
            options={WORLD_LOCATIONS}
            selected={contextPicks.Locations ?? []}
            onToggle={(v) => toggleContext("Locations", v)}
          />
          <ContextGroup
            label="World / Lore"
            options={WORLD_LORE}
            selected={contextPicks.Lore ?? []}
            onToggle={(v) => toggleContext("Lore", v)}
          />
        </div>
      </Collapsible>

      {/* Scene Input — the main writing area */}
      <section className="mt-6">
        <h2 className="text-sm font-semibold text-foreground">Scene Input</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          readOnly={finalized}
          rows={7}
          placeholder="Write anything you want about the scene — an outline, sequence of events, rough prose, dialogue, ideas, thoughts, or any combination of them."
          className="mt-2 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-[0.95rem] leading-7 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 read-only:opacity-80"
        />
        <div className="mt-2 flex justify-end">
          <Button onClick={handleGenerate} disabled={finalized || !input.trim()}>
            <Sparkles className="size-4" />
            Generate Scene
          </Button>
        </div>
      </section>

      {/* Scene Workspace — the editable prose output */}
      <section className="mt-6">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-sm font-semibold text-foreground">Scene Workspace</h2>
          <span className="text-xs text-muted-foreground">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          {selection && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              Passage selected · Rewrite Selected
            </span>
          )}
        </div>

        {hasProse ? (
          <>
            <textarea
              ref={workspaceRef}
              value={scene.content}
              onChange={(e) => updateScene(scene.id, { content: e.target.value })}
              onSelect={captureSelection}
              onMouseUp={captureSelection}
              onKeyUp={captureSelection}
              readOnly={finalized}
              rows={12}
              className="w-full resize-y rounded-xl border border-border bg-card px-5 py-4 font-serif text-[1.05rem] leading-8 text-foreground/90 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 read-only:opacity-80"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={() => updateScene(scene.id, { content: GENERATED_PROSE })}
                disabled={finalized}
              >
                <Wand2 className="size-4" />
                Rewrite Scene
              </Button>
              <Button variant="outline" onClick={handleGenerate} disabled={finalized || !input.trim()}>
                <RotateCcw className="size-4" />
                Try Again
              </Button>
              <div className="ml-auto flex items-center gap-2">
                {finalized ? (
                  <Button variant="outline" onClick={() => reopenScene(scene.id)}>
                    Reopen for editing
                  </Button>
                ) : (
                  <Button onClick={() => finalizeScene(scene.id)} disabled={!scene.title.trim() || !hasProse}>
                    <CheckCircle2 className="size-4" />
                    Finalize Scene
                  </Button>
                )}
              </div>
            </div>

            {finalized && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary">
                <CheckCircle2 className="size-3.5" />
                Finalized — available in 1st Draft
              </p>
            )}

            {/* Original Input, kept accessible after generation */}
            {generatedInput.trim() && (
              <Collapsible
                className="mt-4"
                open={originalOpen}
                onToggle={() => setOriginalOpen((v) => !v)}
                title="Original Input"
                hint=""
              >
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{generatedInput}</p>
              </Collapsible>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card/40 px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Your generated prose will appear here as an editable draft.
            </p>
          </div>
        )}
      </section>

      {/* Chapter Builder — compact, collapsed scene cards */}
      <ChapterBuilder scenes={scenes} activeId={scene.id} onSelect={(id) => setActiveScene(id)} />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Chapter Builder (UI-only reorder affordance)
 * ------------------------------------------------------------------ */

function ChapterBuilder({
  scenes,
  activeId,
  onSelect,
}: {
  scenes: ReturnType<typeof usePipeline>["scenes"]
  activeId: string
  onSelect: (id: string) => void
}) {
  const { setActiveScene } = usePipeline()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="mt-8 border-t border-border pt-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chapter Builder</h2>
        <span className="text-xs text-muted-foreground">· {scenes.length} scenes</span>
      </div>
      <ul className="flex flex-col gap-2">
        {scenes.map((s) => {
          const words = s.content.trim() ? s.content.trim().split(/\s+/).length : 0
          const isOpen = expanded === s.id
          return (
            <li
              key={s.id}
              className={cn(
                "rounded-lg border bg-card transition-colors",
                s.id === activeId ? "border-primary/40" : "border-border",
              )}
            >
              <div className="flex items-center gap-2 px-2.5 py-2">
                <span
                  className="cursor-grab text-muted-foreground/60 hover:text-muted-foreground active:cursor-grabbing"
                  aria-label="Drag to reorder"
                  title="Drag to reorder"
                >
                  <GripVertical className="size-4" />
                </span>
                <button
                  onClick={() => onSelect(s.id)}
                  className="min-w-0 flex-1 truncate text-left text-sm font-medium text-foreground hover:text-primary"
                >
                  {s.title}
                </button>
                <span className="shrink-0 text-xs text-muted-foreground">{words} words</span>
                <button
                  onClick={() => setExpanded(isOpen ? null : s.id)}
                  aria-label={isOpen ? "Collapse scene" : "Expand scene"}
                  aria-expanded={isOpen}
                  className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                </button>
              </div>
              {isOpen && (
                <div className="border-t border-border px-3 py-2.5">
                  <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {s.content.trim() || "No prose yet for this scene."}
                  </p>
                  <button
                    onClick={() => setActiveScene(s.id)}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    Open scene
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Small shared building blocks
 * ------------------------------------------------------------------ */

function Collapsible({
  title,
  hint,
  open,
  onToggle,
  children,
  className,
}: {
  title: string
  hint?: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-card/50", className)}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left"
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        {hint ? <span className="text-[11px] text-muted-foreground">{hint}</span> : null}
        <ChevronDown className={cn("ml-auto size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="border-t border-border px-3.5 py-3.5">{children}</div>}
    </div>
  )
}

function ContextGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = selected.includes(o)
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                on
                  ? "border-primary/40 bg-primary/15 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {on && <CheckCircle2 className="size-3" />}
              {o}
            </button>
          )
        })}
      </div>
    </div>
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
