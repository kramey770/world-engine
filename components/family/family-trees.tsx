"use client"

import { useMemo, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Bird,
  ChevronDown,
  Crosshair,
  Eye,
  Maximize2,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import { CharacterNode } from "@/components/family/character-node"
import { CharacterDrawer } from "@/components/family/character-drawer"
import {
  focusHouse,
  generations,
  houseInfo,
  houses,
  members,
  type Generation,
} from "@/lib/family-data"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const ZOOM_MIN = 0.5
const ZOOM_MAX = 1.4
const ZOOM_STEP = 0.1

function MarriageLink() {
  return (
    <div className="flex flex-col items-center self-center px-1" aria-hidden="true">
      <div className="flex items-center">
        <span className="h-px w-4 bg-border sm:w-6" />
        <span className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
          <span className="size-2 rounded-full bg-muted-foreground/60" />
        </span>
        <span className="h-px w-4 bg-border sm:w-6" />
      </div>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">wed</span>
    </div>
  )
}

function GenerationConnector() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-6 w-px bg-border" />
      <span className="size-2 rotate-45 border border-border bg-card" />
      <span className="h-6 w-px bg-border" />
    </div>
  )
}

export function FamilyTrees({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [collapsed, setCollapsed] = useState(false)
  const [showDates, setShowDates] = useState(true)
  const [query, setQuery] = useState("")
  const [viewMenuOpen, setViewMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const selected = selectedId ? members[selectedId] : null

  const visibleGenerations: Generation[] = collapsed ? generations.slice(0, 2) : generations

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return new Set(
      Object.values(members)
        .filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.title.toLowerCase().includes(q) ||
            houses[m.house].name.toLowerCase().includes(q),
        )
        .map((m) => m.id),
    )
  }, [query])

  function zoomBy(delta: number) {
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 100) / 100)))
  }

  function fitToScreen() {
    setZoom(1)
    canvasRef.current?.scrollTo({ top: 0, left: canvasRef.current.scrollWidth / 2, behavior: "smooth" })
  }

  function selectAndCenter(id: string) {
    setSelectedId(id)
    requestAnimationFrame(() => {
      document.getElementById(`node-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    })
  }

  function centerOnSelected() {
    if (selectedId) {
      document
        .getElementById(`node-${selectedId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Global header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      {/* Feature header */}
      <div className="border-b border-border bg-background/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Project Home
          </button>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                Family Trees
              </h1>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                Chart the dynasties, noble houses, and bloodlines of {project.name}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64 sm:flex-none">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search people or houses"
                  className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button className="h-9 shrink-0 active:scale-[0.98]">
                <Plus className="size-4" />
                <span className="hidden sm:inline">New Family</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {/* House banner */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/30">
          <div className="relative h-52 w-full sm:h-64">
            <Image
              src="/families/ravenshollow-banner.png"
              alt={`${focusHouse.name} — atmospheric view of ${focusHouse.seat}`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-transparent to-transparent" />

            {/* Crest + name */}
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 p-5 sm:p-6">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/70 text-primary shadow-inner backdrop-blur-sm sm:size-20">
                <Bird className="size-8 sm:size-10" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">Noble House</p>
                <h2 className="mt-0.5 font-serif text-2xl font-medium tracking-tight text-foreground text-balance sm:text-4xl">
                  {focusHouse.name}
                </h2>
                <p className="mt-1 font-serif text-sm italic text-muted-foreground sm:text-base">
                  &ldquo;{focusHouse.motto}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* House info */}
          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-[1.5fr_1fr]">
            <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{houseInfo.description}</p>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: "Founded", value: houseInfo.founded },
                { label: "Current Head", value: houseInfo.currentHead },
                { label: "Seat", value: houseInfo.seat },
              ].map((row) => (
                <div key={row.label} className="rounded-lg border border-border bg-background/40 px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{row.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Tree section */}
        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-serif text-lg font-medium tracking-tight text-foreground">
              <Sparkles className="size-4 text-primary" />
              Dynasty Tree
            </h2>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {Object.keys(members).length} people &middot; 3 generations &middot; 2 allied houses
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-card px-3 py-2">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => zoomBy(-ZOOM_STEP)}
                className="flex size-8 items-center justify-center rounded-l-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Zoom out"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 select-none text-center text-xs tabular-nums text-muted-foreground">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => zoomBy(ZOOM_STEP)}
                className="flex size-8 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Zoom in"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              onClick={fitToScreen}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Maximize2 className="size-3.5" />
              <span className="hidden sm:inline">Fit</span>
            </button>

            <button
              onClick={centerOnSelected}
              disabled={!selectedId}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Crosshair className="size-3.5" />
              <span className="hidden sm:inline">Center</span>
            </button>

            <button
              onClick={() => setCollapsed((c) => !c)}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ChevronDown className={cn("size-3.5 transition-transform", collapsed && "-rotate-90")} />
              <span className="hidden sm:inline">{collapsed ? "Expand branches" : "Collapse branches"}</span>
            </button>

            <div className="relative ml-auto">
              <button
                onClick={() => setViewMenuOpen((o) => !o)}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <SlidersHorizontal className="size-3.5" />
                <span className="hidden sm:inline">View</span>
              </button>
              {viewMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setViewMenuOpen(false)} aria-hidden="true" />
                  <div className="absolute right-0 top-9 z-20 w-52 rounded-lg border border-border bg-popover p-1.5 shadow-xl shadow-black/40">
                    <button
                      onClick={() => setShowDates((s) => !s)}
                      className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <Eye className="size-4 text-muted-foreground" />
                        Birth / death dates
                      </span>
                      <span
                        className={cn(
                          "flex h-4 w-7 items-center rounded-full p-0.5 transition-colors",
                          showDates ? "bg-primary" : "bg-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "size-3 rounded-full bg-background transition-transform",
                            showDates && "translate-x-3",
                          )}
                        />
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="tree-canvas relative max-h-[70vh] overflow-auto rounded-b-xl border border-border bg-background/40"
          >
            <div
              className="mx-auto flex w-max min-w-full flex-col items-center px-8 py-10 transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
            >
              {visibleGenerations.map((gen, gi) => (
                <div key={gen.id} className="flex flex-col items-center">
                  {gi > 0 && <GenerationConnector />}
                  <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                    {gen.label}
                  </p>
                  <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10">
                    {gen.couples.map((couple) => (
                      <div key={couple.id} className="flex items-start">
                        {couple.members.map((mid, idx) => {
                          const m = members[mid]
                          const dim = matches ? !matches.has(mid) : false
                          return (
                            <div key={mid} className="flex items-start">
                              {idx > 0 && <MarriageLink />}
                              <div className={cn("transition-opacity", dim && "opacity-30")}>
                                <CharacterNode
                                  member={m}
                                  selected={selectedId === mid}
                                  showDates={showDates}
                                  onSelect={selectAndCenter}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {collapsed && (
                <div className="mt-6 flex flex-col items-center">
                  <GenerationConnector />
                  <button
                    onClick={() => setCollapsed(false)}
                    className="rounded-full border border-dashed border-border bg-card px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    + Show younger generation
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <CharacterDrawer member={selected} onClose={() => setSelectedId(null)} onSelect={selectAndCenter} />
    </div>
  )
}
