"use client"

import { useState } from "react"
import { ChevronRight, Flag, MapPin, Plus, Search, Clock, Users } from "lucide-react"
import { explorerSections, type Entity, type EntityKind } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const icons: Record<EntityKind, typeof Users> = {
  character: Users,
  location: MapPin,
  faction: Flag,
  timeline: Clock,
}

export function WorldExplorer({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (entity: Entity) => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    character: true,
    location: true,
    faction: false,
    timeline: false,
  })

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-3 pb-2 pt-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">World Explorer</span>
        <button
          aria-label="Add entity"
          className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search world..."
            className="h-8 w-full rounded-lg border border-input bg-background/60 pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-3">
        {explorerSections.map((section) => {
          const Icon = icons[section.id]
          const isOpen = expanded[section.id]
          return (
            <div key={section.id} className="mb-0.5">
              <button
                onClick={() => setExpanded((e) => ({ ...e, [section.id]: !e[section.id] }))}
                className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
              >
                <ChevronRight className={cn("size-3.5 text-muted-foreground transition-transform", isOpen && "rotate-90")} />
                <Icon className="size-4 text-muted-foreground" />
                <span className="font-medium">{section.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{section.items.length}</span>
              </button>

              {isOpen && (
                <ul className="mb-1 ml-4 mt-0.5 border-l border-border pl-2">
                  {section.items.map((item) => {
                    const active = item.id === selectedId
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onSelect(item)}
                          className={cn(
                            "flex w-full flex-col items-start rounded-lg px-2.5 py-1.5 text-left transition-colors",
                            active
                              ? "bg-primary/12 text-foreground ring-1 ring-inset ring-primary/25"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground",
                          )}
                        >
                          <span className="text-sm font-medium leading-tight">{item.name}</span>
                          <span className="truncate text-xs text-muted-foreground">{item.subtitle}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
