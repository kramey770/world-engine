"use client"

import { ArrowLeft, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import type { Project } from "@/lib/mock-data"

export function SectionPlaceholder({
  project,
  section,
  onBack,
  onSignOut,
}: {
  project: Project
  section: string
  onBack: () => void
  onSignOut: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Project Home
        </button>

        <div className="mt-5">
          <p className="text-xs text-muted-foreground">{project.name}</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">{section}</h1>
        </div>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-inset ring-border">
            <Hammer className="size-6" />
          </span>
          <h2 className="mt-4 text-lg font-medium tracking-tight text-foreground">{section} is coming soon</h2>
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            This workspace is a placeholder for now. Head to the Writing Studio to start drafting, or return to the
            Project Home.
          </p>
          <Button onClick={onBack} variant="secondary" className="mt-5 active:scale-[0.98]">
            Back to Project Home
          </Button>
        </div>
      </div>
    </div>
  )
}
