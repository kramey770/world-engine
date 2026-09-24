"use client"

import { useEffect, useMemo, type ComponentType } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Compass, Crown, PenLine } from "lucide-react"
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
  isOpen = false,
  onOpenChange,
}: {
  destinations: HubAnchorDestination[]
  onSelect?: (destination: HubAnchorDestination) => void
  studio?: "creation" | "world" | "writing"
  options?: HubStudioOption[]
  isOpen?: boolean
  onOpenChange?: (nextOpen: boolean) => void
}) {
  const studioOptions = useMemo(() => {
    if (options && options.length > 0) return options
    return [
      { id: "creation", label: "Creation Studio", title: "Creation Studio", summary: "Character creation, heraldry, maps, and world visuals.", section: "Character", icon: Crown, accent: "emerald" },
      { id: "world", label: "World Building", title: "World Building", summary: "Canon, timelines, relationships, cultures, and living world systems.", section: "Canon Lore", icon: Compass, accent: "sky" },
      { id: "writing", label: "Writing Studio", title: "Writing Studio", summary: "Writing profile, drafts, scene beats, and manuscript flow.", section: "Writing Studio", icon: PenLine, accent: "amber" },
    ] satisfies HubStudioOption[]
  }, [options])

  const activeStudio = studioOptions.find((option) => option.id === studio) ?? studioOptions[0]
  const activeIcon = activeStudio.icon
  const ActiveIcon = activeIcon

  function handleSelection(destination: HubAnchorDestination) {
    onOpenChange?.(false)
    onSelect?.(destination)
  }

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const overlay = isOpen
    ? createPortal(
        <div className="hub-studio-overlay" onClick={() => onOpenChange?.(false)}>
          <div className="hub-studio-overlay__backdrop" aria-hidden="true" />
          <div className="hub-studio-wheel-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="hub-studio-close hub-studio-close--floating" onClick={() => onOpenChange?.(false)} aria-label="Close studio navigation">
              Close
            </button>

            <div className="hub-studio-wheel-shell">
              <div className={`hub-studio-wheel hub-studio-wheel--${activeStudio.accent}`}>
                <div className="hub-studio-wheel__ring" />
                <div className="hub-studio-wheel__core">
                  <span className="hub-studio-wheel__icon"><ActiveIcon className="size-7" /></span>
                  <p className="hub-studio-wheel__kicker">Studio</p>
                  <h3 className="hub-studio-wheel__title">{activeStudio.title}</h3>
                </div>
              </div>

              <div className="hub-studio-rail">
                <div className="hub-studio-rail__header">
                  <p className="hub-studio-rail__eyebrow">Within this studio</p>
                  <span className="hub-studio-rail__count">{destinations.filter((destination) => destination.available !== false).length} tools</span>
                </div>

                <div className="hub-studio-option-list">
                  {destinations.map((destination) => {
                    const isDisabled = destination.available === false
                    return (
                      <button
                        key={`${destination.label}-${destination.section}`}
                        type="button"
                        className={cn("hub-studio-option", isDisabled && "hub-studio-option--disabled")}
                        onClick={() => !isDisabled && handleSelection(destination)}
                        disabled={isDisabled}
                      >
                        <span className="hub-studio-option__label">{destination.label}</span>
                        <ArrowRight className="size-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return overlay
}