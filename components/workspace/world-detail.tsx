"use client"

import { ChevronDown, Flag, Link2, MapPin, Sparkles, Users } from "lucide-react"
import { affectedEntities, timelineMarkers, type Entity } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function WorldDetail({
  selected,
  open,
  onToggle,
}: {
  selected: Entity | null
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="shrink-0 border-t border-border bg-card/40">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      >
        <Sparkles className="size-3.5 text-primary" />
        World Detail
        <ChevronDown className={cn("ml-auto size-4 transition-transform", !open && "-rotate-90")} />
      </button>

      {open && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 lg:grid-cols-3">
          <TimelineBar />
          <DetailCard selected={selected} />
          <AffectedEntities />
        </div>
      )}
    </div>
  )
}

function TimelineBar() {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="mb-3 text-xs font-medium text-muted-foreground">Timeline</p>
      <div className="relative mt-6 h-1.5 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 w-[71%] rounded-full bg-primary/40" />
        {timelineMarkers.map((m) => (
          <div key={m.id} className="absolute -top-1 -translate-x-1/2" style={{ left: `${m.position}%` }}>
            <span
              className={cn(
                "block size-3.5 rounded-full border-2 border-card",
                m.active ? "bg-primary ring-2 ring-primary/30" : "bg-muted-foreground/60",
              )}
              title={m.label}
            />
            {m.active && (
              <span className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-primary">
                {m.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-7 flex justify-between text-[10px] text-muted-foreground">
        <span>Year 0</span>
        <span>Year 180</span>
      </div>
    </div>
  )
}

function DetailCard({ selected }: { selected: Entity | null }) {
  if (selected?.kind === "location") return <LocationView name={selected.name} subtitle={selected.subtitle} />
  return <CharacterProfileCard selected={selected} />
}

function CharacterProfileCard({ selected }: { selected: Entity | null }) {
  const name = selected?.kind === "character" ? selected.name : "Sera Vane"
  const role = selected?.kind === "character" ? selected.subtitle : "Ash-warden, protagonist"
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="mb-3 text-xs font-medium text-muted-foreground">Character Profile</p>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
          <Users className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Resolute", "Haunted", "Loyal", "Ash-touched"].map((t) => (
          <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 border-t border-border pt-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Flag className="size-3.5" /> Allied with the Ash Wardens
        </span>
      </div>
    </div>
  )
}

function LocationView({ name, subtitle }: { name: string; subtitle: string }) {
  const pins = [
    { x: "32%", y: "40%" },
    { x: "58%", y: "62%" },
    { x: "72%", y: "30%" },
  ]
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <MapPin className="size-3.5" /> {name} — {subtitle}
      </p>
      <div className="relative h-28 overflow-hidden rounded-lg border border-border bg-[repeating-linear-gradient(45deg,transparent,transparent_11px,rgba(255,255,255,0.03)_11px,rgba(255,255,255,0.03)_12px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(255,255,255,0.05),transparent_60%)]" />
        {pins.map((p, i) => (
          <span
            key={i}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: p.x, top: p.y }}
          >
            <MapPin className={cn("size-4", i === 0 ? "text-primary" : "text-muted-foreground")} fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  )
}

function AffectedEntities() {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Link2 className="size-3.5" /> Affected Entities
      </p>
      <ul className="flex flex-col gap-1.5">
        {affectedEntities.map((e) => (
          <li key={e.id} className="flex items-start gap-2 rounded-lg bg-muted/50 px-2.5 py-1.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-medium text-foreground">{e.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{e.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
