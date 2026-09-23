"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowUpRight, BookImage, GitBranch, TreePine } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

const icons = [BookImage, TreePine, GitBranch]

export function CreationCollection({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const [index, setIndex] = useState(0)
  const item = items[index % Math.max(items.length, 1)]
  const Icon = icons[index % icons.length]

  useEffect(() => {
    if (items.length < 2) return
    const timer = window.setInterval(() => setIndex((current) => current + 1), 7000)
    return () => window.clearInterval(timer)
  }, [items.length])

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-32 flex-col">
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl">{item?.title ?? definition.title}</h2></div><Icon className="size-5 text-amber-200/70" /></div>
        <div className="relative mt-5 flex min-h-20 flex-1 items-end overflow-hidden border-l border-amber-200/30 pl-4">
          {item?.image && <Image src={item.image} alt="" fill sizes="240px" className="object-cover object-center opacity-20" />}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,transparent_48%,rgba(253,230,138,.14)_49%,transparent_51%)]" />
          <p className="relative max-w-[14rem] font-serif text-lg leading-tight text-white/85">{item?.summary}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/40"><span>{index + 1} / {items.length} fragments</span><ArrowUpRight className="size-3.5" /></div>
      </div>
    </HubBox>
  )
}