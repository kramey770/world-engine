import { Crown, Orbit } from "lucide-react"
import type { HubBoxDefinition } from "../hub-types"
import { HubBox } from "../hub-box"
import { HubRadialNavigation, type HubAnchorDestination } from "../hub-radial-navigation"
import type { ProjectSection } from "@/components/project-home"

export function CreationNavigationAnchor({ definition, onOpen }: { definition: HubBoxDefinition; onOpen?: (section: ProjectSection) => void }) {
  const destinations: HubAnchorDestination[] = [
    { label: "Character", section: "Character" },
    { label: "Heraldry", section: "Heraldry" },
    { label: "Map", section: "Map" },
    { label: "Family Tree", section: "Family Tree" },
    { label: "Book Cover", section: "Book Cover" },
  ]

  return (
    <HubBox definition={definition}>
      <div className="relative flex h-full min-h-24 flex-col justify-between">
        <div className="absolute -right-7 -top-9 size-28 rounded-full border border-emerald-200/20" />
        <div className="flex items-start justify-between">
          <span className="flex size-11 items-center justify-center rounded-full border border-emerald-200/40 bg-emerald-200/10 text-emerald-100 shadow-[0_0_25px_rgba(110,231,183,.15)]"><Crown className="size-5" /></span>
          <Orbit className="size-5 text-emerald-200/45" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200">Creation Studio</p>
          <h2 className="mt-1 font-serif text-2xl leading-none">Make the visible world</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/55">Hover to reveal the creation wheel.</p>
        </div>
      </div>
      <HubRadialNavigation destinations={destinations} onSelect={(destination) => onOpen?.(destination.section)} />
    </HubBox>
  )
}