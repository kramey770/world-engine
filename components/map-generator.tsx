"use client"

import { ArrowLeft } from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { UserMenu } from "@/components/user-menu"

export function MapGenerator({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute bottom-4 left-4 z-10 sm:bottom-5 sm:left-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          <span>Back to {project.name}</span>
        </button>
      </div>

      <div className="absolute right-3 top-3 z-10 sm:right-5 sm:top-4">
        <UserMenu onSignOut={onSignOut} />
      </div>

      <iframe
        src="/fantasy-map-generator/index.html"
        className="h-full w-full border-0"
        title="Fantasy Map Generator"
      />
    </div>
  )
}