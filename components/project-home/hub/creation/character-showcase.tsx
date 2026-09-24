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
        <div className="relative z-[1] flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl leading-none text-white">{item.title}</h2>
          </div>
          <Scan className="size-5 text-sky-200/60" />
        </div>

        <div className="relative mt-4 flex-1 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(125,211,252,.18),transparent_28%),linear-gradient(180deg,rgba(13,22,30,1),rgba(7,10,14,1))]">
          <div className="absolute inset-x-0 top-8 bottom-0 flex items-end justify-center">
            <div className="relative h-[78%] w-[52%]">
              <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full border border-sky-100/25 bg-sky-100/5" />
              <div className="absolute left-[18%] top-12 h-[52%] w-[28%] rounded-[40%] border border-sky-100/20 bg-sky-100/5" />
              <div className="absolute right-[18%] top-12 h-[52%] w-[28%] rounded-[40%] border border-sky-100/20 bg-sky-100/5" />
              <div className="absolute inset-x-[20%] bottom-0 h-[34%] rounded-t-[55%] border border-sky-100/20 bg-sky-100/5" />
            </div>
          </div>
          {item.image && <Image src={item.image} alt="" fill sizes="300px" className={`hub-character-float object-cover object-top mix-blend-screen opacity-75 transition-transform duration-[1800ms] ${isFocused ? "scale-105" : "scale-100"}`} />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f15] via-transparent to-transparent" />
        </div>

        <div className="relative z-[1] mt-4 flex items-end justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
          <span className="flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> No characters yet</span>
          <span className="flex items-center gap-1.5"><Crosshair className="size-3" /> {isFocused ? "Inspecting" : "Ready"}</span>
        </div>
      </div>
    </HubBox>
  )
}