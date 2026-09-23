"use client"

import Image from "next/image"
import { ArrowUpRight, Sparkles } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function CreationSpotlight({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(items.length, 8500)
  const item = items[index % Math.max(items.length, 1)]

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative flex min-h-[270px] flex-1 flex-col justify-end overflow-hidden" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {item?.image && <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover object-top opacity-70 transition-opacity duration-700" />}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_38%,rgba(239,68,68,.35),transparent_24%),linear-gradient(90deg,rgba(7,14,19,.98),rgba(7,14,19,.2)_72%),linear-gradient(0deg,rgba(7,14,19,.96),transparent_70%)]" />
        <div className="relative z-[1] max-w-sm">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-200"><Sparkles className="size-3.5" /> {item?.eyebrow ?? definition.eyebrow}</div>
          <h2 className="mt-3 font-serif text-4xl leading-[.92] tracking-tight text-white sm:text-5xl">{item?.title ?? "The work in motion"}</h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{item?.summary ?? "A rotating view of the project&apos;s most important creations."}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/75">Explore creation <ArrowUpRight className="size-3.5" /></span>
        </div>
        <div className="absolute right-1 top-1 flex gap-1.5">{items.map((entry, itemIndex) => <span key={entry.id} className={`h-1 w-8 rounded-full ${itemIndex === index % items.length ? "bg-emerald-200" : "bg-white/20"}`} />)}</div>
      </div>
    </HubBox>
  )
}