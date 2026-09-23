"use client"

import { HeartHandshake, Link2, ShieldAlert, Sparkles } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function RelationshipsConnections({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-40 flex-col">
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl">{item.title}</h2></div><HeartHandshake className="size-5 text-amber-200/75" /></div>
        <div className="relative mt-5 flex flex-1 items-center justify-between gap-3 text-center">
          <div className="relative flex-1"><div className="mx-auto flex size-14 items-center justify-center rounded-full border border-sky-200/40 bg-sky-200/10 font-serif text-lg text-sky-100">D</div><p className="mt-2 text-xs text-current/75">Darrow</p><p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-current/40">Subject</p></div>
          <div className="relative flex w-28 flex-col items-center"><div className="hub-connection-pulse absolute top-1/2 h-px w-full bg-gradient-to-r from-sky-200/20 via-amber-200 to-rose-200/20" /><span className="relative flex size-9 items-center justify-center rounded-full border border-amber-200/60 bg-[#d7d2c4] text-[#182127]"><Link2 className="size-4" /></span><span className="relative mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200">92 weight</span></div>
          <div className="relative flex-1"><div className="mx-auto flex size-14 items-center justify-center rounded-full border border-rose-200/40 bg-rose-200/10 font-serif text-lg text-rose-100">S</div><p className="mt-2 text-xs text-current/75">Sevro</p><p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-current/40">Object</p></div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-current/10 pt-3 text-[10px] uppercase tracking-[0.14em] text-current/45"><span className="flex items-center gap-1.5"><ShieldAlert className="size-3 text-amber-200" /> Active alliance</span><span className="flex items-center gap-1.5"><Sparkles className="size-3" /> Mutual</span></div>
        <p className="mt-2 text-xs leading-relaxed text-current/60">{item.summary}</p>
      </div>
    </HubBox>
  )
}