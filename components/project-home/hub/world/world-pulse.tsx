import { Activity, Network, Sparkles } from "lucide-react"
import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WorldPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(modes.length, 10500)
  const mode = modes[index % Math.max(modes.length, 1)]
  return (
    <HubBox definition={definition}>
      <div className="flex h-full min-h-44 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{mode.label}</p><h2 className="mt-1 font-serif text-2xl">World pulse</h2></div><Network className="size-4 text-sky-200/70" /></div>
        <div className="relative mt-5 flex h-16 items-end gap-1 border-l border-b border-sky-200/25 px-2 pb-1">{mode.items.map((item, index) => <span key={item.label} className="flex-1 bg-sky-200/55" style={{ height: `${28 + index * 12}px` }} title={`${item.label}: ${item.value}`} />)}<span className="absolute inset-x-1 top-2 h-px bg-emerald-200/40" /></div>
        <div className="mt-4 space-y-2">{mode.items.slice(0, 3).map((item) => <div key={item.label} className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.13em] text-white/45"><span className="flex items-center gap-1.5"><Sparkles className="size-3 text-emerald-200/70" />{item.label}</span><span className="font-serif text-sm normal-case tracking-normal text-white/80">{item.value}</span></div>)}</div>
        <div className="mt-auto flex items-center gap-1.5 pt-3 text-[9px] uppercase tracking-[0.15em] text-white/35"><Activity className="size-3" /> Archive signal</div>
      </div>
    </HubBox>
  )
}