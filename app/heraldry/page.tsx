"use client"

import { useState } from "react"
import { ArrowLeft, BookmarkPlus, Crown } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { projects, type Project } from "@/lib/mock-data"

export default function HeraldryPage({
  project = projects[0],
  onBack,
  onSignOut,
}: {
  project?: Project
  onBack?: () => void
  onSignOut?: () => void
}) {
  // Future World Engine flow: saving heraldry to the project and assigning it
  // to houses/characters. The backend for this does not exist yet, so the
  // control is visually present but clearly marked as upcoming rather than faked.
  const [saveHint, setSaveHint] = useState(false)

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to {project.name}</span>
            <span className="sm:hidden">Back</span>
          </button>

          <span className="hidden h-6 w-px shrink-0 bg-border sm:block" aria-hidden="true" />

          <div className="flex min-w-0 items-center gap-2.5">
            <span className="hidden size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-inset ring-primary/25 sm:flex">
              <Crown className="size-4" />
            </span>
            <div className="min-w-0 leading-none">
              <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">Heraldry</h1>
              <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                Create and manage the heraldry of your world
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setSaveHint((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              title="Saving heraldry to your project is coming soon"
            >
              <BookmarkPlus className="size-4" />
              Save to Project
              <span className="rounded bg-primary-foreground/20 px-1 py-px text-[10px] font-semibold uppercase tracking-wide">
                Soon
              </span>
            </button>
            {saveHint && (
              <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-lg border border-border bg-popover p-3 text-xs leading-relaxed text-muted-foreground shadow-lg">
                Saving heraldry to your project and assigning it to Noble Houses, families, and characters is coming
                soon. For now, use the editor&apos;s Download options to export your crest.
              </div>
            )}
          </div>
          <UserMenu onSignOut={onSignOut ?? (() => {})} />
        </div>
      </header>

      <iframe
        src="/armoria/index.html"
        className="min-h-0 w-full flex-1 border-0"
        title="Armoria Heraldry Generator"
      />
    </div>
  )
}
