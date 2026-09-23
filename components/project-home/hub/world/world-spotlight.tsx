"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, Crown, Eye, Orbit, Shield, Sparkles } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

const sigils = [Crown, Shield, Eye, Orbit]

export function WorldSpotlight({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const [index, setIndex] = useState(0)
  const item = items[index % Math.max(items.length, 1)]
  const Sigil = sigils[index % sigils.length]

  useEffect(() => {
    if (items.length < 2) return
    const timer = window.setInterval(() => setIndex((current) => current + 1), 10500)
    return () => window.clearInterval(timer)
  }, [items.length])

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative flex min-h-[245px] flex-1 flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,rgba(125,211,252,.2),transparent_22%),radial-gradient(ellipse_at_55%_80%,rgba(110,231,183,.12),transparent_35%)]" />
        <div className="absolute right-[12%] top-[16%] flex size-36 items-center justify-center rounded-full border border-sky-200/20 opacity-70"><div className="flex size-24 items-center justify-center rounded-full border border-emerald-200/20"><Sigil className="size-11 text-sky-100/70" /></div></div>
        <div className="absolute right-[5%] top-[9%] size-48 rounded-full border border-dashed border-sky-200/15 motion-safe:animate-[spin_32s_linear_infinite]" />
        <div className="relative z-[1] max-w-[75%]">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-200"><Sparkles className="size-3.5" /> {item?.eyebrow ?? definition.eyebrow}</div>
          <h2 className="mt-3 font-serif text-4xl leading-[.92] tracking-tight text-white sm:text-5xl">{item?.title ?? definition.title}</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{item?.summary ?? "A force in the world waits to be understood."}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs text-white/70">Open canon <ArrowUpRight className="size-3.5" /></span>
        </div>
        <div className="absolute right-1 top-1 flex gap-1.5">{items.map((entry, itemIndex) => <span key={entry.id} className={`h-1 w-7 rounded-full ${itemIndex === index % items.length ? "bg-sky-200" : "bg-white/20"}`} />)}</div>
      </div>
    </HubBox>
  )
}