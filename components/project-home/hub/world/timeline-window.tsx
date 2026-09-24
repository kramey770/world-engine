"use client"

import { Clock3, History, MoveRight } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function TimelineWindow({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const { index: offset, onMouseEnter, onMouseLeave } = useHubRotation(items.length, 9000)

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-28 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">History</h2>
          </div>
          <History className="size-5 text-sky-200/70" />
        </div>

        <div className="relative mt-6 min-h-14 flex-1 overflow-hidden rounded-[0.75rem] border border-sky-200/10 bg-white/[0.02] px-3 py-2">
          <div className="absolute left-3 right-3 top-6 h-px bg-sky-200/25" />
          <div className="flex h-full gap-8 transition-transform duration-1000" style={{ transform: `translateX(-${offset * 18}px)` }}>
            {items.map((event, index) => (
              <div key={event.id} className="relative min-w-24 pt-8">
                <span className={`absolute left-0 top-2 size-3 rounded-full border-2 ${index === offset ? "border-amber-200 bg-amber-200 shadow-[0_0_16px_rgba(253,230,138,.75)]" : "border-sky-200/60 bg-[#10252a]"}`} />
                <p className="whitespace-nowrap text-xs font-medium text-white/80">{event.title}</p>
                <p className="mt-1 whitespace-nowrap text-[10px] text-white/40">{event.eyebrow}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-white/40">
          <span className="flex items-center gap-1.5"><Clock3 className="size-3" /> Timeline</span>
          <span className="flex items-center gap-1.5">Threads <MoveRight className="size-3" /></span>
        </div>
      </div>
    </HubBox>
  )
}