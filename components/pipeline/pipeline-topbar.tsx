"use client"

import { ChevronLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import { STAGES, usePipeline, type Stage } from "@/lib/pipeline-store"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function PipelineTopBar({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const { activeStage, setActiveStage } = usePipeline()
  const activeIndex = STAGES.findIndex((s) => s.id === activeStage)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Project</span>
        </button>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <div className="hidden min-w-0 items-center gap-2 md:flex">
          <Logo className="size-6 rounded-md [&_svg]:size-4" />
          <span className="truncate text-sm font-medium text-foreground">{project.name}</span>
        </div>
      </div>

      {/* Stage stepper */}
      <nav aria-label="Writing pipeline stages" className="flex min-w-0 items-center">
        <ol className="flex items-center gap-0.5 sm:gap-1">
          {STAGES.map((s, i) => (
            <li key={s.id} className="flex items-center">
              <StageButton stage={s} index={i} activeIndex={activeIndex} onClick={() => setActiveStage(s.id)} />
              {i < STAGES.length - 1 && (
                <span
                  className={cn("mx-0.5 h-px w-3 sm:w-5", i < activeIndex ? "bg-primary/50" : "bg-border")}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <UserMenu onSignOut={onSignOut} />
    </header>
  )
}

function StageButton({
  stage,
  index,
  activeIndex,
  onClick,
}: {
  stage: { id: Stage; label: string; short: string }
  index: number
  activeIndex: number
  onClick: () => void
}) {
  const isActive = index === activeIndex
  const isDone = index < activeIndex
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "step" : undefined}
      title={stage.label}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors sm:px-2.5",
        isActive
          ? "bg-primary/15 text-primary ring-1 ring-inset ring-primary/30"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
          isActive
            ? "bg-primary text-primary-foreground"
            : isDone
              ? "bg-primary/30 text-primary"
              : "bg-muted text-muted-foreground",
        )}
      >
        {index + 1}
      </span>
      <span className="hidden lg:inline">{stage.label}</span>
      <span className="lg:hidden">{stage.short}</span>
    </button>
  )
}
