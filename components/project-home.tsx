"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  BookImage,
  Brain,
  ClipboardList,
  Crown,
  FileText,
  GitBranch,
  Map,
  PenLine,
  ScrollText,
  Sparkles,
  TreePine,
  Users,
  type LucideIcon,
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { Wordmark } from "@/components/logo"
import { explorerSections, type Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export type ProjectSection =
  | "Writing Studio"
  | "Map"
  | "Heraldry"
  | "Character"
  | "Family Tree"
  | "Book Cover"
  | "Brainstorming"
  | "Canon Lore"

type StudioTab = "writing" | "creation" | "world"

type StudioItem = {
  section: ProjectSection
  title: string
  description: string
  icon: LucideIcon
  badge?: string
}

const writingItems: StudioItem[] = [
  {
    section: "Writing Studio",
    title: "Scene Beats",
    description: "Outline scenes with setting, tone, POV, and intent.",
    icon: ClipboardList,
    badge: "Stage 1",
  },
  {
    section: "Writing Studio",
    title: "1st Draft",
    description: "Assemble beats into chapters with a Developmental Editor.",
    icon: PenLine,
    badge: "Stage 2",
  },
  {
    section: "Writing Studio",
    title: "2nd Draft",
    description: "Tighten prose line by line with a Line Editor.",
    icon: FileText,
    badge: "Stage 3",
  },
  {
    section: "Writing Studio",
    title: "3rd Draft",
    description: "Polish grammar and mechanics with a Copy Editor.",
    icon: FileText,
    badge: "Stage 4",
  },
  {
    section: "Writing Studio",
    title: "Final Draft",
    description: "Proofread and lock the chapter as canon.",
    icon: ScrollText,
    badge: "Stage 5",
  },
]

const creationItems: StudioItem[] = [
  { section: "Map", title: "Map", description: "Chart regions, cities, and points of interest.", icon: Map },
  { section: "Heraldry", title: "Heraldry", description: "Design crests, sigils, and house banners.", icon: Crown },
  { section: "Character", title: "Character", description: "Portraits, traits, and relationships.", icon: Users },
  { section: "Family Tree", title: "Family Tree", description: "Bloodlines, houses, and lineage.", icon: TreePine },
  { section: "Book Cover", title: "Book Cover", description: "Design and iterate on your cover art.", icon: BookImage },
]

const worldItems: StudioItem[] = [
  {
    section: "Brainstorming",
    title: "Brainstorming",
    description: "A freeform space for ideas, what-ifs, and sparks.",
    icon: Brain,
  },
  {
    section: "Canon Lore",
    title: "Canon Lore",
    description: "The single source of truth for your established world.",
    icon: ScrollText,
  },
]

const tabs: { id: StudioTab; label: string; icon: LucideIcon; items: StudioItem[] }[] = [
  { id: "writing", label: "Writing Studio", icon: GitBranch, items: writingItems },
  { id: "creation", label: "Creation Studio", icon: Sparkles, items: creationItems },
  { id: "world", label: "World Building Studio", icon: Map, items: worldItems },
]

function countKind(kind: string) {
  return explorerSections.find((s) => s.id === kind)?.items.length ?? 0
}

const WORD_GOAL = 100000

function ProgressBar({ value, tint = "bg-primary" }: { value: number; tint?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-all", tint)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function ProjectHome({
  project,
  onOpenSection,
  onBack,
  onSignOut,
}: {
  project: Project
  onOpenSection: (section: ProjectSection) => void
  onBack: () => void
  onSignOut: () => void
}) {
  const [activeTab, setActiveTab] = useState<StudioTab>("writing")

  const wordProgress = Math.round((project.wordCount / WORD_GOAL) * 100)
  const draftProgress = 40 // manuscript sits around the 2nd draft stage

  const stats = [
    { label: "Words", value: project.wordCount.toLocaleString() },
    { label: "Chapters", value: "8" },
    { label: "Characters", value: String(countKind("character")) },
    { label: "Locations", value: String(countKind("location")) },
  ]

  const activeItems = tabs.find((t) => t.id === activeTab)?.items ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </button>

        {/* Book cover + title */}
        <section className="mt-6 flex flex-col items-center text-center">
          <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/40 sm:w-48">
            <Image
              src="/book-cover.png"
              alt={`Cover art for ${project.name}`}
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-wider text-primary">Project Home</p>
          <h1 className="mt-1.5 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {project.description}
          </p>
        </section>

        {/* Recently worked on */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium tracking-tight text-foreground">Recently worked on</h2>
          <button
            onClick={() => onOpenSection("Writing Studio")}
            className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.995]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
              <PenLine className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Pick up where you left off</p>
              <p className="mt-0.5 truncate font-medium tracking-tight text-foreground">
                Chapter One &middot; 2nd Draft
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                Writing Studio &middot; Line Editor &middot; edited {project.lastEdited}
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <span className="hidden sm:inline">Resume</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </section>

        {/* Statistics */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium tracking-tight text-foreground">Statistics</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <p className="font-serif text-2xl font-medium tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-foreground">Word goal</p>
                <p className="text-xs text-muted-foreground">
                  {project.wordCount.toLocaleString()} / {WORD_GOAL.toLocaleString()}
                </p>
              </div>
              <div className="mt-3">
                <ProgressBar value={wordProgress} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{wordProgress}% of target manuscript length</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-foreground">Draft progress</p>
                <p className="text-xs text-muted-foreground">2nd Draft</p>
              </div>
              <div className="mt-3">
                <ProgressBar value={draftProgress} tint="bg-chart-3" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Moving through the 5-stage pipeline</p>
            </div>
          </div>
        </section>

        {/* Studios */}
        <section className="mt-8">
          <div
            role="tablist"
            aria-label="Studios"
            className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeItems.map((item) => (
              <button
                key={item.title}
                onClick={() => onOpenSection(item.section)}
                className="group flex min-h-[136px] flex-col items-start rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <item.icon className="size-5" />
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-medium tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
