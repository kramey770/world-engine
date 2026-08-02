"use client"

import { Link2, MapPin, Sparkles, Users, Clock } from "lucide-react"
import type { Entity } from "@/lib/mock-data"

export function ContextPanel({ selected }: { selected: Entity | null }) {
  const character = selected?.kind === "character" ? selected.name : "Sera Vane"
  const location = selected?.kind === "location" ? selected.name : "Emberhold"
  const timeline = selected?.kind === "timeline" ? selected.name : "Sera's Oath — Year 118"
  const linked =
    selected?.kind === "faction" ? selected.name : "Ash Wardens, The Pale Oracle"

  const rows = [
    { icon: Users, label: "Current Character", value: character },
    { icon: MapPin, label: "Current Location", value: location },
    { icon: Clock, label: "Timeline Position", value: timeline },
    { icon: Link2, label: "Linked Entities", value: linked },
  ]

  return (
    <div className="border-t border-border p-3">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <Sparkles className="size-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Context</span>
      </div>
      <div className="flex flex-col gap-1">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <row.icon className="size-3.5" />
            </span>
            <div className="min-w-0 leading-tight">
              <p className="text-[11px] text-muted-foreground">{row.label}</p>
              <p className="truncate text-xs font-medium text-foreground">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
