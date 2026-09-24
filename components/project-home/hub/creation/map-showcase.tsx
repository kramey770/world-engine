import { MapPinned, Navigation, Waves } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function MapShowcase({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-44 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <p className="hub-kicker text-sky-200/75">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white">{item.title}</h2>
          </div>
          <MapPinned className="size-5 text-emerald-200/75" />
        </div>

        <div className="relative mt-5 min-h-24 flex-1 overflow-hidden rounded-[1rem] border border-sky-200/15 bg-[#0c2228]" style={{ backgroundImage: "linear-gradient(rgba(125,211,252,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.13) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
          <div className="absolute inset-[12%_18%_16%_10%] rotate-[-7deg] border border-emerald-200/40 bg-emerald-200/10 [clip-path:polygon(12%_4%,70%_0,100%_28%,82%_86%,40%_100%,0_62%)]" />
          <div className="absolute inset-[25%_9%_12%_58%] rotate-[13deg] border border-sky-100/25 [clip-path:polygon(18%_0,100%_25%,75%_100%,0_73%)]" />
          <Navigation className="absolute left-[57%] top-[32%] size-4 rotate-45 text-white shadow-[0_0_14px_rgba(255,255,255,.8)]" />
          <Waves className="absolute bottom-2 left-3 size-4 text-sky-200/50" />
        </div>

        <div className="mt-3 hub-panel-meta">
          <span>No map yet</span>
          <strong>Atlas</strong>
        </div>
      </div>
    </HubBox>
  )
}