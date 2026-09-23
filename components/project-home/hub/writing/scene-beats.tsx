"use client"

import { useEffect, useState } from "react"
import { Check, Circle, ListOrdered } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function SceneBeats({ definition, beats, onOpen }: { definition: HubBoxDefinition; beats: HubMockRecord[]; onOpen?: () => void }) {
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (beats.length < 2) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % beats.length), 6500)
    return () => window.clearInterval(timer)
  }, [beats.length])

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-40 flex-col"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl">Scene beats</h2></div><ListOrdered className="size-5 text-sky-200/60" /></div><div className="mt-4 space-y-1.5">{beats.map((beat, index) => <div key={beat.id} className={`flex items-start gap-2 border-l-2 py-1.5 pl-2 transition-all duration-700 ${index === active ? "border-amber-200 bg-amber-200/10 text-amber-100" : "border-white/10 text-white/55"}`}><span className="mt-0.5 shrink-0 font-mono text-[10px] opacity-60">{beat.eyebrow}</span><span className="min-w-0 text-xs"><span className="block font-medium">{beat.title}</span><span className="mt-0.5 block text-[10px] opacity-65">{beat.summary}</span></span>{index < active && <Check className="ml-auto mt-0.5 size-3 shrink-0 text-emerald-200/70" />}{index === active && <Circle className="ml-auto mt-0.5 size-3 shrink-0 fill-current" />}</div>)}</div></div>
    </HubBox>
  )
}