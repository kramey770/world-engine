"use client"

import { useEffect, useState } from "react"
import { ArrowRight, GitBranch } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function DraftPipeline({ definition, drafts, onOpen }: { definition: HubBoxDefinition; drafts: HubMockRecord[]; onOpen?: () => void }) {
  const [active, setActive] = useState(2)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % drafts.length), 4800)
    return () => window.clearInterval(timer)
  }, [drafts.length])

  return (
    <HubBox definition={definition} onOpen={onOpen}><div className="flex h-full min-h-28 flex-col"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl">The manuscript moves</h2></div><GitBranch className="size-5 text-sky-200/60" /></div><div className="mt-6 flex items-center gap-1 overflow-hidden">{drafts.map((draft, index) => <span key={draft.id} className="flex min-w-0 flex-1 items-center gap-1"><span className={`flex size-10 shrink-0 items-center justify-center rounded-sm border text-[10px] font-semibold tracking-[0.08em] transition-all duration-700 ${index === active ? "border-amber-200 bg-amber-200/20 text-amber-100 shadow-[0_0_18px_rgba(253,230,138,.15)]" : index < active ? "border-emerald-200/40 text-emerald-100/80" : "border-white/15 text-white/45"}`}>{draft.title}</span>{index < drafts.length - 1 && <ArrowRight className={`size-3 shrink-0 ${index < active ? "text-emerald-200/70" : "text-white/20"}`} />}</span>)}</div><p className="mt-auto pt-4 text-[10px] uppercase tracking-[0.15em] text-white/40">{drafts[active]?.eyebrow} · {drafts[active]?.summary}</p></div></HubBox>
  )
}