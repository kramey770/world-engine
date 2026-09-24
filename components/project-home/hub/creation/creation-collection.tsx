"use client"

import Image from "next/image"
import { ArrowUpRight, BookImage, GitBranch, TreePine } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

const icons = [BookImage, TreePine, GitBranch]

export function CreationCollection({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(items.length, 7000)
  const item = items[index % Math.max(items.length, 1)]
  const Icon = icons[index % icons.length]

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-32 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-emerald-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">{item?.title ?? definition.title}</h2>
          </div>
          <Icon className="size-5 text-amber-200/70" />
        </div>

        <div className="relative mt-5 flex min-h-20 flex-1 items-end overflow-hidden rounded-[1rem] border border-amber-200/20 bg-[linear-gradient(135deg,rgba(253,230,138,.06),transparent_55%)] p-3">
          {item?.image && <Image src={item.image} alt="" fill sizes="240px" className="object-cover object-center opacity-20" />}
          <div className="hub-panel-grid w-full">
            <div className="hub-panel-grid--mini">
              <span className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/45">Characters</span>
              <span className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/45">Maps</span>
              <span className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/45">Heraldry</span>
              <span className="rounded-md border border-white/10 bg-white/3 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/45">Profiles</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40">
          <span>Collection</span>
          <ArrowUpRight className="size-3.5" />
        </div>
      </div>
    </HubBox>
  )
}