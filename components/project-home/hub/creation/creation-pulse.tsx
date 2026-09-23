import { Activity, BarChart3 } from "lucide-react"
import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"

export function CreationPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const mode = modes[0]
  return (
    <HubBox definition={definition}>
      <div className="flex h-full min-h-24 flex-col">
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/75">{mode.label}</p><h2 className="mt-1 font-serif text-2xl">Creation pulse</h2></div><BarChart3 className="size-4 text-emerald-200/70" /></div>
        <div className="mt-5 flex items-end gap-1.5 border-b border-emerald-200/20 pb-2">{mode.items.map((item, index) => <span key={item.label} className="flex-1 rounded-t-sm bg-emerald-200/55" style={{ height: `${Math.max(20, 26 + index * 10)}px` }} title={`${item.label}: ${item.value}`} />)}</div>
        <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/45"><Activity className="size-3" /> {mode.items[0]?.value} {mode.items[0]?.label}</div>
      </div>
    </HubBox>
  )
}