import Image from "next/image"
import { Crown, Shield } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function HeraldryShowcase({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-40 flex-col items-center text-center">
        <div className="flex w-full items-start justify-between text-emerald-200/55"><span className="text-[10px] font-semibold uppercase tracking-[0.22em]">{definition.eyebrow}</span><Crown className="size-4" /></div>
        <div className="hub-crest-breathe relative mt-5 flex size-28 items-center justify-center overflow-hidden [clip-path:polygon(50%_0,88%_18%,82%_72%,50%_100%,18%_72%,12%_18%)] bg-gradient-to-br from-emerald-100/80 via-emerald-700 to-[#09221f] shadow-[0_0_35px_rgba(110,231,183,.2)]">
          {item.image && <Image src={item.image} alt="" fill sizes="112px" className="object-cover opacity-25 mix-blend-screen" />}
          <Shield className="relative size-12 text-[#071713]" />
        </div>
        <h2 className="mt-5 font-serif text-xl leading-none">{item.title}</h2>
        <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-current/50">{item.summary}</p>
      </div>
    </HubBox>
  )
}