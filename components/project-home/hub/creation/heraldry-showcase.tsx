import Image from "next/image"
import { Crown, Shield } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function HeraldryShowcase({ definition, item, onOpen }: { definition: HubBoxDefinition; item: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-40 flex-col items-center text-center">
        <div className="flex w-full items-start justify-between text-emerald-200/55">
          <span className="hub-kicker text-emerald-200">{definition.eyebrow}</span>
          <Crown className="size-4" />
        </div>

        <div className="relative mt-5 flex size-28 items-center justify-center overflow-hidden rounded-[1.25rem] border border-emerald-200/20 bg-[radial-gradient(circle_at_50%_28%,rgba(122,21,21,.22),transparent_20%),linear-gradient(180deg,#151517,#0b0b0c)] shadow-[0_0_35px_rgba(122,21,21,.18)]">
          <div className="hub-crest-breathe absolute inset-5 [clip-path:polygon(50%_0,88%_18%,82%_72%,50%_100%,18%_72%,12%_18%)] bg-gradient-to-br from-emerald-100/75 via-emerald-600/80 to-[#3d0b0b]" />
          {item.image && <Image src={item.image} alt="" fill sizes="112px" className="object-cover opacity-25 mix-blend-screen" />}
          <Shield className="relative size-12 text-inverse-text" />
        </div>

        <h2 className="mt-5 font-serif text-xl leading-none text-white">{item.title}</h2>
        <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/50">No heraldry created yet</p>
      </div>
    </HubBox>
  )
}