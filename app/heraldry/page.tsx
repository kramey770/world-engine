"use client"

import { useState } from "react"
import { ArrowLeft, BookmarkPlus, Crown } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { DEFAULT_PROJECT, type Project, writeProjectData } from "@/lib/project-store"

export default function HeraldryPage({
  project = {
    id: "local-preview",
    name: DEFAULT_PROJECT.name,
    description: DEFAULT_PROJECT.description,
    accent: DEFAULT_PROJECT.accent || "chart-1",
    lastEdited: "Just now",
    wordCount: 0,
    createdAt: 0,
    updatedAt: 0,
  },
  onBack,
  onSignOut,
}: {
  project?: Project
  onBack?: () => void
  onSignOut?: () => void
}) {
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")

  async function saveHeraldryPlaceholder() {
    try {
      await writeProjectData(project.id, "heraldry", { status: "ready-for-editor", updatedAt: Date.now() })
      setSaveState("saved")
    } catch {
      setSaveState("error")
    }
  }

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
              onClick={saveHeraldryPlaceholder}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              title="Save heraldry workspace state to this project"
            >
              <BookmarkPlus className="size-4" />
              {saveState === "saved" ? "Saved to Project" : saveState === "error" ? "Save failed" : "Save to Project"}
            </button>
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
