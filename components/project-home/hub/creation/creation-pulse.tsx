import { Activity, BarChart3 } from "lucide-react"
import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function CreationPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(modes.length, 9000)
  const mode = modes[index % Math.max(modes.length, 1)]
  return (
    <HubBox definition={definition}>
      <div className="flex h-full min-h-24 flex-col" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-emerald-200/75">{mode.label}</p>
            <h2 className="mt-1 font-serif text-2xl text-white">Creation pulse</h2>
          </div>
          <BarChart3 className="size-4 text-emerald-200/70" />
        </div>

        <div className="mt-5 flex items-end gap-1.5 border-b border-emerald-200/20 pb-2">
          {mode.items.map((item, index) => <span key={item.label} className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-200/70 to-emerald-200/25" style={{ height: `${Math.max(18, 26 + index * 10)}px` }} title={`${item.label}: ${item.value}`} />)}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.15em] text-white/45">
          <span className="inline-flex items-center gap-1.5"><Activity className="size-3" /> {mode.items[0]?.label}</span>
          <strong className="font-serif text-sm normal-case tracking-normal text-white/80">{mode.items[0]?.value ?? "—"}</strong>
        </div>
      </div>
    </HubBox>
  )
}