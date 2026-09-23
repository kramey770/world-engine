"use client"

import { Building2, ChevronRight, CircleDot } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WorldEntityWindow({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(items.length, 7800)
  const item = items[index % Math.max(items.length, 1)]

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-32 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{item?.eyebrow ?? definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl">{item?.title ?? definition.title}</h2></div><Building2 className="size-5 text-sky-200/65" /></div>
        <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-sky-100/60"><CircleDot className="size-3 text-emerald-200" /> Populated canon <span className="ml-auto flex items-center gap-1">{index + 1} / {items.length}<ChevronRight className="size-3" /></span></div>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{item?.summary}</p>
      </div>
    </HubBox>
  )
}