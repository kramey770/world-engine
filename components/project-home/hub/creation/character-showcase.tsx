"use client"

import Image from "next/image"
import { useState } from "react"
import { CircleDot, Crosshair, Scan } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function CharacterShowcase({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="relative flex min-h-[370px] flex-1 flex-col" onMouseEnter={() => setIsFocused(true)} onMouseLeave={() => setIsFocused(false)}>
        <div className="absolute inset-x-0 top-16 bottom-0 overflow-hidden rounded-t-[45%] border-x border-t border-white/10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(229,177,139,.28),transparent_25%),linear-gradient(180deg,rgba(31,55,68,.2),rgba(8,14,20,.8))]">
          {item.image && <Image src={item.image} alt="" fill sizes="300px" className={`object-cover object-top mix-blend-screen opacity-75 transition-transform duration-[1800ms] ${isFocused ? "scale-105" : "scale-100"}`} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f15] via-transparent to-transparent" />
        </div>
        <div className="relative z-[1] flex items-start justify-between">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl leading-none text-white">{item.title}</h2></div>
          <Scan className="size-5 text-sky-200/60" />
        </div>
        <div className="relative z-[1] mt-auto flex items-end justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
          <span className="flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> Live portrait study</span>
          <span className="flex items-center gap-1.5"><Crosshair className="size-3" /> {isFocused ? "Inspecting" : "Ready"}</span>
        </div>
      </div>
    </HubBox>
  )
}