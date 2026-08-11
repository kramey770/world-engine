"use client"

import { useEffect } from "react"
import { ArrowRight, CheckCircle2, Inbox, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  STAGES,
  STAGE_ROLE,
  draftIndex,
  nextDraftStage,
  usePipeline,
  type DraftStage,
  type SceneBeat,
} from "@/lib/pipeline-store"
import { WorldDetails } from "@/components/pipeline/world-details"
import { cn } from "@/lib/utils"

function stageLabel(stage: DraftStage) {
  return STAGES.find((s) => s.id === stage)?.label ?? stage
}

const PREV_LABEL: Record<DraftStage, string> = {
  draft1: "the finalized beats",
  draft2: "the 1st Draft",
  draft3: "the 2nd Draft",
  final: "the 3rd Draft",
}

/** Generic editor stage for 2nd Draft, 3rd Draft, and Final Draft. */
export function StageDraft({ stage }: { stage: DraftStage }) {
  const {
    activeChapterId,
    setActiveChapter,
    chaptersAtStage,
    setDraftContent,
    advanceChapter,
    finalizeChapter,
    getScene,
  } = usePipeline()

  const available = chaptersAtStage(stage)
  const active = available.find((c) => c.id === activeChapterId) ?? available[0] ?? null
  const role = STAGE_ROLE[stage]
  const isFinal = stage === "final"
  const next = nextDraftStage(stage)
  const prevLabel = PREV_LABEL[stage]

  // Keep an in-range active chapter selected as chapters flow into this stage.
  useEffect(() => {
    if (available.length && (!activeChapterId || !available.some((c) => c.id === activeChapterId))) {
      setActiveChapter(available[0].id)
    }
  }, [available, activeChapterId, setActiveChapter])

  const includedScenes: SceneBeat[] = active
    ? (active.sceneIds.map((id) => getScene(id)).filter(Boolean) as SceneBeat[])
    : []
  // "Arrived but not yet moved on" means this stage is the chapter's current furthest point.
  const isHere = active ? active.stage === stage : false
  const sentOnward = active ? draftIndex(active.stage) > draftIndex(stage) : false

  return (
    <div className="flex min-h-0 flex-1">
      {/* Chapter inbox for this stage */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
          <Inbox className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {stageLabel(stage)} · {available.length}
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {available.length === 0 ? (
            <p className="px-2 py-6 text-center text-xs text-muted-foreground">
              Nothing here yet. Send a chapter from the previous stage to see it arrive.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {available.map((c) => {
                const isActive = active?.id === c.id
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
                      <span className="flex w-full items-center gap-1.5">
                        <span className="truncate text-sm font-medium text-foreground">{c.title}</span>
                        {c.finalized && <Lock className="ml-auto size-3 shrink-0 text-primary" />}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {c.stage === stage ? "Awaiting review" : "Reviewed · moved on"}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Editor */}
      <div className="min-w-0 flex-1 overflow-y-auto">
        {!active ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div className="max-w-sm">
              <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Inbox className="size-5" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">No chapters at this stage yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Chapters appear here once they are sent forward from the previous draft.
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {stageLabel(stage)} · {role}
              </p>
              {active.finalized && (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  <CheckCircle2 className="size-3" />
                  Finalized
                </span>
              )}
            </div>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-foreground text-balance">
              {active.title}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {includedScenes.length} beat{includedScenes.length === 1 ? "" : "s"} · carried forward from {prevLabel}
            </p>

            <textarea
              value={active.content[stage]}
              onChange={(e) => setDraftContent(active.id, stage, e.target.value)}
              readOnly={active.finalized}
              rows={16}
              placeholder="This draft carries forward from the previous stage. Edit it here..."
              className="mt-5 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 font-serif text-[1.02rem] leading-8 text-foreground/90 placeholder:font-sans placeholder:text-sm placeholder:text-muted-foreground/60 outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 read-only:opacity-80"
            />

            <div className="mt-4">
              <WorldDetails scenes={includedScenes} title="World Details — aggregated" />
            </div>

            {/* Send onward / finalize */}
            <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
              {isFinal ? (
                active.finalized ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary">
                    <CheckCircle2 className="size-4" />
                    Chapter finalized and locked as canon.
                  </span>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Finalizing locks the chapter after the Proofreader&apos;s pass.
                    </p>
                    <Button
                      onClick={() => finalizeChapter(active.id)}
                      disabled={!active.content.final.trim()}
                      className="ml-auto shrink-0"
                    >
                      Finalize Chapter
                      <CheckCircle2 className="size-4" />
                    </Button>
                  </>
                )
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    {sentOnward
                      ? `Already sent to ${next ? stageLabel(next) : "the next stage"}. Edits stay in this draft.`
                      : `Sending passes this chapter to the ${next ? STAGE_ROLE[next] : "next editor"} in ${
                          next ? stageLabel(next) : "the next stage"
                        }.`}
                  </p>
                  <Button
                    onClick={() => advanceChapter(active.id)}
                    disabled={!active.content[stage].trim() || !isHere}
                    className="ml-auto shrink-0"
                  >
                    {sentOnward ? "Sent onward" : `Send to ${next ? stageLabel(next) : "next"}`}
                    {!sentOnward && <ArrowRight className="size-4" />}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
