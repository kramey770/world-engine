"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Feather, FileText } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function WritingSpotlight({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const [index, setIndex] = useState(0)
  const item = items[index % Math.max(items.length, 1)]

  useEffect(() => {
    if (items.length < 2) return
    const timer = window.setInterval(() => setIndex((current) => current + 1), 10000)
    return () => window.clearInterval(timer)
  }, [items.length])

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative flex min-h-52 flex-1 flex-col justify-end overflow-hidden">
        <div className="absolute -right-10 top-2 size-48 rounded-full border border-sky-200/15" /><div className="absolute right-10 top-14 size-28 rounded-full border border-sky-200/10" />
        <div className="absolute right-16 top-20 text-sky-100/20"><Feather className="size-20 rotate-[-18deg]" /></div>
        <div className="relative z-[1] max-w-[78%]"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-200"><FileText className="size-3.5" /> {item?.eyebrow ?? definition.eyebrow}</div><h2 className="mt-3 font-serif text-4xl leading-[.92] tracking-tight text-white">{item?.title ?? definition.title}</h2><p className="mt-3 max-w-sm font-serif text-base leading-relaxed text-white/65">{item?.summary ?? "The sentence currently asking to be written."}</p><span className="mt-5 inline-flex items-center gap-2 text-xs text-white/65">Open manuscript <ArrowUpRight className="size-3.5" /></span></div>
        <div className="absolute right-1 top-1 flex gap-1.5">{items.map((entry, itemIndex) => <span key={entry.id} className={`h-1 w-7 rounded-full ${itemIndex === index % items.length ? "bg-sky-200" : "bg-white/20"}`} />)}</div>
      </div>
    </HubBox>
  )
}