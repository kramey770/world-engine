import { Activity, BarChart3, TrendingUp } from "lucide-react"
import type { HubBoxDefinition, HubPulseMode, HubStudio } from "./hub-types"
import { HubBox } from "./hub-box"

const icons: Record<HubStudio, typeof Activity> = { creation: BarChart3, world: Activity, writing: TrendingUp }

export function HubPulse({ definition, studio, modes }: { definition: HubBoxDefinition; studio: HubStudio; modes: HubPulseMode[] }) {
  const mode = modes[0]
  const Icon = icons[studio]

  return (
    <HubBox definition={definition}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-1 font-serif text-2xl leading-none">{definition.title}</h2></div>
          <Icon className="size-4 text-sky-200/70" />
        </div>
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{mode.label}</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {mode.items.slice(0, 4).map((item) => <div key={item.label} className="border-l border-sky-200/25 pl-2"><p className="text-[10px] text-white/45">{item.label}</p><p className="font-serif text-lg leading-tight text-white/90">{item.value}</p></div>)}
        </div>
        {modes.length > 1 && <div className="mt-auto flex gap-1 pt-4">{modes.map((item, index) => <span key={item.label} className={`h-1 flex-1 rounded-full ${index === 0 ? "bg-sky-200/80" : "bg-white/15"}`} />)}</div>}
      </div>
    </HubBox>
  )
}