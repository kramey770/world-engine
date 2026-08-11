"use client"

import { ArrowRight, ChevronDown, ChevronUp, Plus, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { draftIndex, usePipeline, type SceneBeat } from "@/lib/pipeline-store"
import { WorldDetails } from "@/components/pipeline/world-details"
import { StageShell } from "@/components/pipeline/stage-shell"
import { cn } from "@/lib/utils"

export function StageFirstDraft() {
  const {
    chapters,
    activeChapterId,
    setActiveChapter,
    createChapter,
    updateChapter,
    finalizedScenes,
    toggleChapterScene,
    moveChapterScene,
    regenerateChapter,
    setDraftContent,
    advanceChapter,
    getScene,
  } = usePipeline()

  const active = chapters.find((c) => c.id === activeChapterId) ?? null
  const includedScenes: SceneBeat[] = active
    ? (active.sceneIds.map((id) => getScene(id)).filter(Boolean) as SceneBeat[])
    : []
  const sent = active ? draftIndex(active.stage) > 0 : false

  return (
    <StageShell
      railLabel="Chapters"
      rail={
        <>
          <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Chapters · {chapters.length}
          </span>
          <button
            onClick={() => createChapter()}
            aria-label="Create chapter"
            className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {chapters.length === 0 && (
            <p className="px-2 py-6 text-center text-xs text-muted-foreground">
              No chapters yet. Create one and pull in your finalized beats.
            </p>
          )}
          <ul className="flex flex-col gap-1">
            {chapters.map((c) => {
              const isActive = c.id === activeChapterId
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveChapter(c.id)}
                    className={cn(
                      "flex w-full flex-col items-start gap-0.5 rounded-lg border px-2.5 py-2 text-left transition-colors",
                      isActive
                        ? "border-primary/40 bg-primary/10"
                        : "border-transparent hover:border-border hover:bg-accent",
                    )}
                  >
                    <span className="truncate text-sm font-medium text-foreground">{c.title}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {c.sceneIds.length} beat{c.sceneIds.length === 1 ? "" : "s"}
                      {draftIndex(c.stage) > 0 ? " · sent onward" : ""}
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
              <p className="text-sm text-muted-foreground">Create a chapter to start assembling your first draft.</p>
              <Button onClick={() => createChapter()} className="mt-4">
                <Plus className="size-4" />
                Create Chapter
              </Button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">1st Draft · Developmental Editor</p>
            <input
              value={active.title}
              onChange={(e) => updateChapter(active.id, { title: e.target.value })}
              placeholder="Chapter Title"
              className="mt-2 w-full bg-transparent font-serif text-3xl font-medium tracking-tight text-foreground placeholder:text-muted-foreground/40 outline-none"
            />

            {/* Beat selection */}
            <section className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">Finalized Scene Beats</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Select which finalized beats belong in this chapter.
              </p>
              {finalizedScenes.length === 0 ? (
                <p className="mt-3 rounded-lg border border-dashed border-border px-3 py-4 text-xs text-muted-foreground">
                  No finalized beats yet. Finalize scenes in the Scene Beats stage to make them available here.
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {finalizedScenes.map((s) => {
                    const on = active.sceneIds.includes(s.id)
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleChapterScene(active.id, s.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                          on
                            ? "border-primary/40 bg-primary/15 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                        )}
                      >
                        {on ? <X className="size-3" /> : <Plus className="size-3" />}
                        {s.title}
                      </button>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Arrangement */}
            {includedScenes.length > 0 && (
              <section className="mt-5">
                <h3 className="text-sm font-semibold text-foreground">Chapter Arrangement</h3>
                <ol className="mt-2 flex flex-col gap-1.5">
                  {includedScenes.map((s, i) => (
                    <li
                      key={s.id}
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[11px] font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">{s.title}</span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">
                        {s.setting} · {s.tone}
                      </span>
                      <div className="flex shrink-0 items-center">
                        <button
                          onClick={() => moveChapterScene(active.id, s.id, -1)}
                          disabled={i === 0}
                          aria-label="Move up"
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30"
                        >
                          <ChevronUp className="size-4" />
                        </button>
                        <button
                          onClick={() => moveChapterScene(active.id, s.id, 1)}
                          disabled={i === includedScenes.length - 1}
                          aria-label="Move down"
                          className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30"
                        >
                          <ChevronDown className="size-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Generated / editable chapter */}
            <section className="mt-6">
              <div className="mb-1.5 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Chapter Draft</h3>
                <button
                  onClick={() => regenerateChapter(active.id)}
                  disabled={includedScenes.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground active:scale-95 disabled:opacity-40"
                >
                  <RefreshCw className="size-3.5" />
                  {active.content.draft1 ? "Regenerate from beats" : "Generate from beats"}
                </button>
              </div>
              <textarea
                value={active.content.draft1}
                onChange={(e) => setDraftContent(active.id, "draft1", e.target.value)}
                rows={12}
                placeholder="Generate the chapter from your arranged beats, then edit it here..."
                className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3 font-serif text-[1.02rem] leading-8 text-foreground/90 placeholder:font-sans placeholder:text-sm placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </section>

            <div className="mt-4">
              <WorldDetails
                scenes={includedScenes}
                title="World Details — aggregated"
                emptyLabel="Add beats to this chapter to roll up their world context."
              />
            </div>

            {/* Send onward */}
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground">
                {sent
                  ? "This chapter has been sent to the 2nd Draft stage. Edits here stay in the 1st draft."
                  : "Sending passes this chapter to the Line Editor in the 2nd Draft stage."}
              </p>
              <Button
                onClick={() => advanceChapter(active.id)}
                disabled={!active.content.draft1.trim() || sent}
                className="ml-auto shrink-0"
              >
                {sent ? "Sent to 2nd Draft" : "Send to 2nd Draft"}
                {!sent && <ArrowRight className="size-4" />}
              </Button>
            </div>
          </div>
        )}
    </StageShell>
  )
}
