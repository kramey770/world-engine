import { Quote } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"

export function WritingProfile({ definition, profile, onOpen }: { definition: HubBoxDefinition; profile: HubMockRecord; onOpen?: () => void }) {
  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="flex h-full min-h-32 flex-col justify-between">
        <div className="flex items-start justify-between">
          <p className="hub-kicker text-amber-100/70">{definition.eyebrow}</p>
          <Quote className="size-5 text-amber-100/45" />
        </div>

        <div className="hub-profile-emphasis rounded-[1rem] border border-amber-100/10 bg-[#0f171d]/60 p-3">
          <h2 className="font-serif text-4xl leading-[.86] tracking-tight text-amber-50">{profile.title}</h2>
          <p className="mt-4 max-w-[15rem] font-mono text-[10px] leading-5 tracking-[0.17em] text-white/65">{profile.summary?.replaceAll(" · ", "\n") ?? "Voice profile ready when the project has writer identity metadata."}</p>
        </div>

        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-white/35">
          <span>Voice study</span>
          <span>Project profile</span>
        </div>
      </div>
    </HubBox>
  )
}