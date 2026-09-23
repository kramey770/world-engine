import { Compass, Crown, PenLine, Sparkles } from "lucide-react"
import type { HubBoxDefinition, HubStudio } from "./hub-types"
import { HubBox } from "./hub-box"

const anchorContent: Record<HubStudio, { icon: typeof Compass; mark: string; accent: string }> = {
  creation: { icon: Crown, mark: "C", accent: "text-emerald-200" },
  world: { icon: Compass, mark: "W", accent: "text-sky-200" },
  writing: { icon: PenLine, mark: "R", accent: "text-amber-200" },
}

export function HubNavigationAnchor({ definition, onOpen }: { definition: HubBoxDefinition; onOpen?: () => void }) {
  const content = anchorContent[definition.studio]
  const Icon = content.icon

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-24 flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className={`flex size-10 items-center justify-center rounded-full border border-current/30 bg-black/20 ${content.accent}`}>
            <Icon className="size-5" />
          </span>
          <span className={`font-serif text-6xl leading-none opacity-20 ${content.accent}`}>{content.mark}</span>
        </div>
        <div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${content.accent}`}>Studio anchor</p>
          <h2 className="mt-1 max-w-[13rem] font-serif text-2xl leading-none tracking-tight">{definition.title}</h2>
          <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-white/55">{definition.eyebrow}. Hover to open the tool wheel.</p>
        </div>
      </div>
      <Sparkles className="absolute bottom-5 right-12 size-3.5 text-white/25" />
    </HubBox>
  )
}