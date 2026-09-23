import { BookOpen, PenLine, Sparkles } from "lucide-react"
import type { HubBoxDefinition } from "../hub-types"
import { HubBox } from "../hub-box"
import { HubRadialNavigation, type HubAnchorDestination } from "../hub-radial-navigation"

export function WritingNavigationAnchor({ definition, onOpen }: { definition: HubBoxDefinition; onOpen?: () => void }) {
  const destinations: HubAnchorDestination[] = [
    { label: "Writing Profile", section: "Writing Profile" },
    { label: "Scene Beats", section: "Writing Studio" },
    { label: "1st Draft", section: "Writing Studio" },
    { label: "2nd Draft", section: "Writing Studio" },
    { label: "3rd Draft", section: "Writing Studio" },
    { label: "Final Draft", section: "Writing Studio" },
  ]

  return (
    <HubBox definition={definition}>
      <div className="relative flex h-full min-h-24 flex-col justify-between">
        <div className="absolute -right-8 -top-10 size-32 rounded-full border border-amber-100/15" />
        <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-full border border-amber-100/35 bg-amber-100/10 text-amber-100"><PenLine className="size-5" /></span><BookOpen className="size-5 text-amber-100/45" /></div>
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100">Writing Studio</p><h2 className="mt-1 font-serif text-2xl leading-none">Turn the world into story</h2><p className="mt-2 text-xs leading-relaxed text-white/55">Profile, beats, drafts, and the manuscript in motion.</p></div>
      </div>
      <HubRadialNavigation destinations={destinations} onSelect={() => onOpen?.()} />
      <Sparkles className="absolute bottom-5 right-12 size-3.5 text-amber-100/25" />
    </HubBox>
  )
}