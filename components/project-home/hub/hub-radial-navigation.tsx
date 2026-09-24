"use client"

import { useMemo, useState, type ComponentType } from "react"
import { ArrowRight, CircleDot, Compass, Crown, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectSection } from "@/components/project-home"
import type { HubDestination } from "./hub-types"

export type HubAnchorDestination = HubDestination & { available?: boolean }

type HubStudioOption = {
  id: string
  label: string
  title: string
  summary: string
  section: ProjectSection
  icon: ComponentType<{ className?: string }>
  accent: string
}

export function HubRadialNavigation({
  destinations,
  onSelect,
  studio = "creation",
  options,
}: {
  destinations: HubAnchorDestination[]
  onSelect?: (destination: HubAnchorDestination) => void
  studio?: "creation" | "world" | "writing"
  options?: HubStudioOption[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const destinationCount = destinations.length

  const studioOptions = useMemo(() => {
    if (options && options.length > 0) return options
    return [
      { id: "creation", label: "Creation Studio", title: "Creation Studio", summary: "Character creation, heraldry, maps, and world visuals.", section: "Character", icon: Crown, accent: "emerald" },
      { id: "world", label: "World Building", title: "World Building", summary: "Canon, timelines, relationships, cultures, and living world systems.", section: "Canon Lore", icon: Compass, accent: "sky" },
      { id: "writing", label: "Writing Studio", title: "Writing Studio", summary: "Writing profile, drafts, scene beats, and manuscript flow.", section: "Writing Studio", icon: PenLine, accent: "amber" },
    ] satisfies HubStudioOption[]
  }, [options])

  function handleSelection(option: HubStudioOption) {
    setIsOpen(false)
    const destination = { label: option.label, section: option.section }
    onSelect?.(destination)
  }

  return (
    <>
      <div className={cn("hub-radial-navigation pointer-events-none absolute right-2 top-2 z-20 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100", isOpen && "hub-radial-open")} aria-label="Studio destinations">
        <button
          type="button"
          className="hub-radial-trigger pointer-events-auto absolute right-0 top-0 flex size-7 items-center justify-center rounded-full border border-white/20 bg-[#0d171d]/90 text-white/65 shadow-[0_0_20px_rgba(56,189,248,0.14)] transition-colors hover:border-sky-200/60 hover:text-white"
          aria-label={isOpen ? "Close studio destinations" : `Open studio destinations (${destinationCount} available)`}
          aria-expanded={isOpen}
          onClick={(event) => {
            event.stopPropagation()
            setIsOpen((current) => !current)
          }}
        >
          <CircleDot className="size-3.5" />
        </button>
      </div>

      {isOpen && (
        <div className="hub-studio-overlay" onClick={() => setIsOpen(false)}>
          <div className="hub-studio-overlay__backdrop" aria-hidden="true" />
          <div className="hub-studio-overlay__panel" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-200/70">World Engine</p>
                <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">Studio navigation</h3>
              </div>
              <button type="button" className="hub-studio-close" onClick={() => setIsOpen(false)} aria-label="Close studio navigation">
                Close
              </button>
            </div>

            <div className="hub-studio-grid">
              {studioOptions.map((option) => {
                const Icon = option.icon
                const active = option.id === studio
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={cn("hub-studio-card", active && "hub-studio-card--active", `hub-studio-card--${option.accent}`)}
                    onClick={() => handleSelection(option)}
                    aria-pressed={active}
                  >
                    <div className="hub-studio-card__header">
                      <span className="hub-studio-card__icon"><Icon className="size-5" /></span>
                      <span className="hub-studio-card__status">{active ? "Active" : "Open"}</span>
                    </div>
                    <p className="hub-studio-card__eyebrow">{option.label}</p>
                    <h4 className="hub-studio-card__title">{option.title}</h4>
                    <p className="hub-studio-card__summary">{option.summary}</p>
                    <span className="hub-studio-card__action">
                      Go to studio
                      <ArrowRight className="size-4" />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}