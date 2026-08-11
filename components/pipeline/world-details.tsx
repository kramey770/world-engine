"use client"

import { Clock, Layers, MapPin, Users } from "lucide-react"
import { aggregateWorldDetails, type SceneBeat } from "@/lib/pipeline-store"

/**
 * Aggregates world metadata across one or more scene beats.
 * In Scene Beats a single scene is passed; in 1st Draft the chapter's
 * whole set of beats is passed so the details roll up automatically.
 */
export function WorldDetails({
  scenes,
  title = "World Details",
  emptyLabel = "Add setting, tone, POV, and characters to build world context.",
}: {
  scenes: SceneBeat[]
  title?: string
  emptyLabel?: string
}) {
  const { settings, tones, povs, characters } = aggregateWorldDetails(scenes)
  const groups = [
    { icon: MapPin, label: "Settings", values: settings },
    { icon: Users, label: "Characters", values: characters },
    { icon: Layers, label: "Tone", values: tones },
    { icon: Clock, label: "POV", values: povs },
  ]
  const empty = settings.length + tones.length + povs.length + characters.length === 0

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <Layers className="size-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
        {scenes.length > 1 && (
          <span className="ml-auto text-[11px] text-muted-foreground">from {scenes.length} beats</span>
        )}
      </div>

      {empty ? (
        <p className="px-3 py-3 text-xs leading-relaxed text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="flex flex-col gap-3 p-3">
          {groups.map((g) => (
            <div key={g.label} className="flex gap-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <g.icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">{g.label}</p>
                {g.values.length ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {g.values.map((v) => (
                      <span
                        key={v}
                        className="rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-xs font-medium text-foreground"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/70">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
