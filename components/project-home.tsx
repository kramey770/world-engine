"use client"

import {
  ArrowLeft,
  BookCheck,
  Clock,
  Map,
  PenLine,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import { explorerSections, type Project } from "@/lib/mock-data"

export type ProjectSection =
  | "Writing Studio"
  | "Characters"
  | "World Map"
  | "Timeline"
  | "Factions"
  | "Canon & Consistency"

type SectionCard = {
  label: ProjectSection
  description: string
  icon: LucideIcon
}

const sectionCards: SectionCard[] = [
  { label: "Writing Studio", description: "Draft chapters with your AI co-writer and world context.", icon: PenLine },
  { label: "Characters", description: "Profiles, traits, and relationships across your cast.", icon: Users },
  { label: "World Map", description: "Locations, regions, and points of interest.", icon: Map },
  { label: "Timeline", description: "Order events and track your story's chronology.", icon: Clock },
  { label: "Factions", description: "Organizations, allegiances, and rivalries.", icon: Shield },
  { label: "Canon & Consistency", description: "Keep facts aligned and your canon stable.", icon: BookCheck },
]

function countKind(kind: string) {
  return explorerSections.find((s) => s.id === kind)?.items.length ?? 0
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
  const stats = [
    { label: "Words", value: project.wordCount.toLocaleString() },
    { label: "Characters", value: String(countKind("character")) },
    { label: "Locations", value: String(countKind("location")) },
    { label: "Factions", value: String(countKind("faction")) },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </button>

        <div className="mt-5 flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Project Home</p>
            <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">{project.name}</h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <p className="font-serif text-2xl font-medium tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((card) => (
            <button
              key={card.label}
              onClick={() => onOpenSection(card.label)}
              className="group flex min-h-[148px] flex-col items-start rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary/20">
                <card.icon className="size-5" />
              </span>
              <h2 className="mt-3 font-medium tracking-tight text-foreground">{card.label}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
