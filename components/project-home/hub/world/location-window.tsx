import { MapPin, Mountain, Waves } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function LocationWindow({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-40 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-emerald-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">{item.title}</h2>
          </div>
          <MapPin className="size-5 text-emerald-200/75" />
        </div>

        <div className="relative mt-4 flex min-h-20 flex-1 items-end overflow-hidden rounded-[1rem] border border-sky-200/15 bg-[#0b2028]">
          <div className="hub-location-drift absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(120deg,transparent 40%,rgba(125,211,252,.18) 41%,transparent 42%), linear-gradient(65deg,transparent 49%,rgba(110,231,183,.15) 50%,transparent 51%)", backgroundSize: "64px 42px" }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-300/20 to-transparent [clip-path:polygon(0_70%,18%_35%,30%_55%,48%_12%,64%_42%,78%_22%,100%_52%,100%_100%,0_100%)]" />
          <div className="relative flex w-full items-center justify-between px-3 pb-2 text-[9px] uppercase tracking-[0.15em] text-white/55"><span className="flex items-center gap-1"><Mountain className="size-3" /> No location yet</span><span className="flex items-center gap-1"><Waves className="size-3" /> Geography</span></div>
        </div>

        <div className="mt-3 hub-panel-meta">
          <span>Location window</span>
          <strong>Pending</strong>
        </div>
      </div>
    </HubBox>
  )
}