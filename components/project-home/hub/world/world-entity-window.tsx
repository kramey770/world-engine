"use client"

import { Building2, ChevronRight, CircleDot } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WorldEntityWindow({ definition, items, onOpen }: { definition: HubBoxDefinition; items: HubMockRecord[]; onOpen?: () => void }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(items.length, 7800)
  const item = items[index % Math.max(items.length, 1)]

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-32 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{item?.eyebrow ?? definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">{item?.title ?? definition.title}</h2>
          </div>
          <Building2 className="size-5 text-sky-200/65" />
        </div>

        <div className="mt-5 grid gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
          {((item?.detail ?? "").split(" • ") || []).length > 0 ? (
            (item?.detail ?? "").split(" • ").map((slot) => {
              const [label, value] = slot.split(" ")
              return (
                <div key={slot} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5">
                  <span className="inline-flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> {label}</span>
                  <span>{value ?? "—"}</span>
                </div>
              )
            })
          ) : (
            <>
              <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5"><span className="inline-flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> Species</span><span>—</span></div>
              <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5"><span className="inline-flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> Religions</span><span>—</span></div>
              <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5"><span className="inline-flex items-center gap-1.5"><CircleDot className="size-3 text-emerald-200" /> Factions</span><span>—</span></div>
            </>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-sky-100/60">
          <span>World entities</span>
          <ChevronRight className="size-3" />
        </div>
      </div>
    </HubBox>
  )
}