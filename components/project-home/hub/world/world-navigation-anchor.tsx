import { Compass, Link2, ScrollText, Sparkles } from "lucide-react"
import type { HubBoxDefinition } from "../hub-types"
import { HubBox } from "../hub-box"

export function WorldNavigationAnchor({ definition, onOpen }: { definition: HubBoxDefinition; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative flex h-full min-h-24 flex-col justify-between">
        <div className="absolute -right-10 -top-12 size-36 rounded-full border border-sky-200/20" />
        <div className="flex items-start justify-between">
          <span className="flex size-11 items-center justify-center rounded-full border border-sky-200/40 bg-sky-200/10 text-sky-100 shadow-[0_0_28px_rgba(125,211,252,.14)]"><Compass className="size-5" /></span>
          <div className="flex gap-1.5 text-sky-200/45"><Link2 className="size-4" /><ScrollText className="size-4" /></div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-200">World Building Studio</p>
          <h2 className="mt-1 font-serif text-2xl leading-none">Give the world weight</h2>
          <p className="mt-2 text-xs leading-relaxed text-white/55">Canon, connections, history, and the next question.</p>
        </div>
      </div>
      <Sparkles className="absolute bottom-5 right-12 size-3.5 text-sky-200/30" />
    </HubBox>
  )
}