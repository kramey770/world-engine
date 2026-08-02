"use client"

import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import { projects, type Project } from "@/lib/mock-data"

export function ProjectDashboard({
  onOpenProject,
  onSignOut,
}: {
  onOpenProject: (project: Project) => void
  onSignOut: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-medium tracking-tight text-balance">Your Projects</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pick up where you left off, or start building a new world.
            </p>
          </div>
          <Button className="h-9 self-start active:scale-[0.99] sm:self-auto">
            <Plus className="size-4" />
            Create New Project
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => onOpenProject(project)} />
          ))}

          <button
            onClick={() => onOpenProject(projects[projects.length - 1])}
            className="group flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/30 p-5 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card/60 hover:text-foreground"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-muted ring-1 ring-inset ring-border transition-colors group-hover:bg-primary/15 group-hover:text-primary">
              <Plus className="size-5" />
            </span>
            <span className="text-sm font-medium">Create New Project</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="group flex min-h-[168px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-border/80 hover:shadow-md hover:shadow-black/20">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
          <FileText className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-medium tracking-tight text-foreground">{project.name}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {project.wordCount > 0 ? `${project.wordCount.toLocaleString()} words` : "Empty draft"}
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-muted-foreground">Edited {project.lastEdited}</span>
        <Button size="sm" variant="secondary" onClick={onOpen} className="active:scale-[0.98]">
          Open Project
        </Button>
      </div>
    </div>
  )
}
