import { Compass, Crown, Link2, PenLine, ScrollText, Sparkles } from "lucide-react"
import type { HubBoxDefinition } from "../hub-types"
import { HubBox } from "../hub-box"
import { HubRadialNavigation, type HubAnchorDestination } from "../hub-radial-navigation"
import type { ProjectSection } from "@/components/project-home"

export function WorldNavigationAnchor({ definition, onOpen }: { definition: HubBoxDefinition; onOpen?: (section: ProjectSection) => void }) {
  const destinations: HubAnchorDestination[] = [
    { label: "Canon Lore", section: "Canon Lore" },
    { label: "Brainstorming", section: "Brainstorming" },
    { label: "Timeline", section: "Canon Lore" },
    { label: "Relationships", section: "Canon Lore" },
    { label: "Future Tools", section: "Canon Lore", available: false },
  ]

  const studioOptions = [
    { id: "creation", label: "Creation Studio", title: "Creation Studio", summary: "Character creation, heraldry, map tools, and visual worldbuilding essentials.", section: "Character" as ProjectSection, icon: Crown, accent: "emerald" as const },
    { id: "world", label: "World Building", title: "World Building", summary: "Canon, places, factions, cultures, and historical threads for the setting.", section: "Canon Lore" as ProjectSection, icon: Compass, accent: "sky" as const },
    { id: "writing", label: "Writing Studio", title: "Writing Studio", summary: "Writing profile, scene beats, draft flow, and manuscript structure.", section: "Writing Studio" as ProjectSection, icon: PenLine, accent: "amber" as const },
  ]

  return (
    <HubBox definition={definition}>
      <div className="relative flex h-full min-h-24 flex-col justify-between">
        <div className="absolute -right-10 -top-12 size-36 rounded-full border border-sky-200/20" />
        <div className="flex items-start justify-between">
          <span className="flex size-11 items-center justify-center rounded-full border border-sky-200/40 bg-sky-200/10 text-sky-100 shadow-[0_0_28px_rgba(125,211,252,.14)]"><Compass className="size-5" /></span>
          <div className="flex gap-1.5 text-sky-200/45"><Link2 className="size-4" /><ScrollText className="size-4" /></div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-200">World Building Studio</p>
          <h2 className="mt-1 font-serif text-2xl leading-none">Give the world weight</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/55">Open the Studio selector to move through the setting’s living systems.</p>
        </div>
      </div>
      <HubRadialNavigation destinations={destinations} studio="world" options={studioOptions} onSelect={(destination) => destination.available !== false && onOpen?.(destination.section)} />
      <Sparkles className="absolute bottom-5 right-12 size-3.5 text-sky-200/30" />
    </HubBox>
  )
}