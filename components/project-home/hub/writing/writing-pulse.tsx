import { Activity, PenLine, TrendingUp } from "lucide-react"
import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WritingPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(modes.length, 8000)
  const mode = modes[index % Math.max(modes.length, 1)]
  return (
    <HubBox definition={definition}>
      <div className="flex h-full min-h-24 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{mode.label}</p>
            <h2 className="mt-1 font-serif text-2xl text-white">Writing pulse</h2>
          </div>
          <TrendingUp className="size-4 text-sky-200/70" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {mode.items.slice(0, 3).map((item) => (
            <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-2">
              <p className="text-[9px] uppercase tracking-[0.12em] text-white/40">{item.label}</p>
              <p className="mt-1 font-serif text-lg text-white/85">—</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4 text-[9px] uppercase tracking-[0.14em] text-white/35">
          <Activity className="size-3 text-emerald-200/70" /> Writing in motion <PenLine className="ml-auto size-3" />
        </div>
      </div>
    </HubBox>
  )
}