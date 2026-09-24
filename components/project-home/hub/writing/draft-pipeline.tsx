"use client"

import { ArrowRight, GitBranch } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function DraftPipeline({ definition, drafts, onOpen }: { definition: HubBoxDefinition; drafts: HubMockRecord[]; onOpen?: () => void }) {
  const stageDrafts = drafts.length > 0 ? drafts : [
    { id: "beats", title: "BEATS", eyebrow: "Scene beats" },
    { id: "draft1", title: "1ST", eyebrow: "1st Draft" },
    { id: "draft2", title: "2ND", eyebrow: "2nd Draft" },
    { id: "draft3", title: "3RD", eyebrow: "3rd Draft" },
    { id: "final", title: "FINAL", eyebrow: "Final Draft" },
  ]
  const { index: active, onMouseEnter, onMouseLeave } = useHubRotation(stageDrafts.length, 4800, { initialIndex: 2 })

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-28 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">Draft pipeline</h2>
          </div>
          <GitBranch className="size-5 text-sky-200/60" />
        </div>

        <div className="mt-6 flex items-center gap-1 overflow-hidden">
          {stageDrafts.map((draft, index) => (
            <span key={draft.id} className="flex min-w-0 flex-1 items-center gap-1">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm border text-[10px] font-semibold tracking-[0.08em] transition-all duration-700 ${index === active ? "border-amber-200 bg-amber-200/20 text-amber-100 shadow-[0_0_18px_rgba(253,230,138,.15)]" : index < active ? "border-emerald-200/40 text-emerald-100/80" : "border-white/15 text-white/45"}`}>
                {draft.title}
              </span>
              {index < stageDrafts.length - 1 && <ArrowRight className={`size-3 shrink-0 ${index < active ? "text-emerald-200/70" : "text-white/20"}`} />}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-4 text-[10px] uppercase tracking-[0.15em] text-white/40">BEATS → 1ST → 2ND → 3RD → FINAL</p>
      </div>
    </HubBox>
  )
}