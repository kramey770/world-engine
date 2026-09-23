"use client"

import { useMemo } from "react"
import { BookOpen, Crown, GitBranch, Map, Network, ScrollText, Sparkles, Users, Waypoints } from "lucide-react"
import type { ProjectSection } from "@/components/project-home"
import { projectHubData } from "@/lib/project-hub-data"
import { cn } from "@/lib/utils"
import { HubBox } from "./hub/hub-box"
import { HubFocusControl } from "./hub/hub-focus-control"
import { HubNavigationAnchor } from "./hub/hub-navigation-anchor"
import { HubPulse } from "./hub/hub-pulse"
import type { HubBoxDefinition, HubMockRecord } from "./hub/hub-types"
import "./project-home-hub.css"

export function ProjectHomeHub({ onOpenSection }: { onOpenSection: (section: ProjectSection) => void }) {
  const boxes = projectHubData.boxes
  const boxById = useMemo(() => new globalThis.Map(boxes.map((box) => [box.id, box])), [boxes])

  function open(definition: HubBoxDefinition) {
    if (definition.destination) onOpenSection(definition.destination.section)
  }

  return (
    <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#080d11] px-3 py-3 shadow-2xl shadow-black/30 sm:px-5 sm:py-5 lg:px-7 lg:py-7" aria-label="Project Hub">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(110,231,183,.1),transparent_23%),radial-gradient(circle_at_83%_40%,rgba(125,211,252,.09),transparent_28%),linear-gradient(135deg,#0a1015,#10181d_52%,#0a1013)]" />
      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:px-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-200/70">Living project wall</p>
          <h2 className="mt-1 font-serif text-3xl tracking-tight text-white sm:text-4xl">Everything taking shape</h2>
        </div>
        <HubFocusControl options={projectHubData.focusOptions} />
      </div>

      <div className="project-hub-canvas">
        {boxes.map((definition) => (
          <HubDisplay key={definition.id} definition={definition} boxById={boxById} onOpen={() => open(definition)} />
        ))}
      </div>
    </section>
  )
}

function HubDisplay({ definition, boxById, onOpen }: { definition: HubBoxDefinition; boxById: Map<string, HubBoxDefinition>; onOpen: () => void }) {
  if (definition.id.endsWith("anchor")) return <HubNavigationAnchor definition={definition} onOpen={definition.destination ? onOpen : undefined} />
  if (definition.id.endsWith("pulse")) return <HubPulse definition={definition} studio={definition.studio} modes={projectHubData.pulses[definition.studio]} />

  const content = contentFor(definition, boxById)
  return <HubBox definition={definition} onOpen={definition.destination ? onOpen : undefined}>{content}</HubBox>
}

function contentFor(definition: HubBoxDefinition, boxById: Map<string, HubBoxDefinition>) {
  const visual = visualFor(definition.id)
  const record = recordFor(definition.id)
  const icon = iconFor(definition.id)
  const Icon = icon

  return (
    <div className="flex h-full min-h-32 flex-col">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/75">{definition.eyebrow}</p><h2 className="mt-2 font-serif text-2xl leading-none tracking-tight sm:text-3xl">{record?.title ?? definition.title}</h2></div>
        {Icon && <Icon className="size-5 shrink-0 text-white/45" />}
      </div>
      {visual}
      <p className="mt-auto max-w-xl pt-4 text-sm leading-relaxed text-current/65">{record?.summary ?? summaryFor(definition.id)}</p>
      {record?.detail && <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-current/40">{record.detail}</p>}
      {definition.id === "chapter-reader" && <p className="mt-4 max-w-2xl border-l border-current/25 pl-4 font-serif text-base leading-relaxed text-current/80">The first lesson is not announced: every student is already deciding who can be used, who can be trusted, and who must be removed.</p>}
      {definition.id === "scene-beats" && <div className="mt-4 space-y-1 text-xs text-current/70">{projectHubData.writing.sceneBeats.slice(0, 4).map((beat, index) => <div key={beat.id} className={cn("flex gap-3 border-b border-current/10 py-1.5", index === 1 && "text-amber-200")}><span className="font-mono text-[10px] opacity-50">{beat.eyebrow}</span><span>{beat.title}</span></div>)}</div>}
      {definition.id === "draft-pipeline" && <div className="mt-5 flex items-center gap-1 text-[10px] font-semibold tracking-[0.12em] text-current/65">{projectHubData.writing.drafts.map((draft, index) => <span key={draft.id} className="flex items-center gap-1"><span className={cn("rounded-sm border px-1.5 py-1", index < 3 ? "border-amber-200/50 text-amber-100" : "border-current/15")}>{draft.title}</span>{index < 4 && <span className="opacity-30">→</span>}</span>)}</div>}
      {definition.id === "timeline-window" && <div className="relative mt-6 h-8 border-t border-sky-200/30">{projectHubData.world.timeline.map((event, index) => <span key={event.id} className="absolute top-[-5px]" style={{ left: `${index * 42}%` }}><span className="block size-2 rounded-full bg-sky-200 shadow-[0_0_14px_rgba(125,211,252,.7)]" /><span className="mt-2 block whitespace-nowrap text-[10px] text-current/55">{event.title}</span></span>)}</div>}
      {definition.id === "relationships" && <div className="mt-5 flex items-center justify-between gap-3 text-center"><div className="flex-1 border-r border-current/15 pr-3"><Users className="mx-auto mb-1 size-5 text-sky-200/70" /><p className="text-xs">Darrow</p><p className="text-[10px] text-current/45">92% weight</p></div><Network className="size-5 text-amber-200" /><div className="flex-1 border-l border-current/15 pl-3"><Users className="mx-auto mb-1 size-5 text-rose-200/70" /><p className="text-xs">Sevro</p><p className="text-[10px] text-current/45">active alliance</p></div></div>}
      {definition.id === "map-showcase" && <div className="relative mt-5 h-20 overflow-hidden border border-emerald-200/15 bg-[#0c2727]" style={{ backgroundImage: "linear-gradient(rgba(125,211,252,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.12) 1px, transparent 1px)", backgroundSize: "22px 22px" }}><span className="absolute left-[22%] top-[55%] size-2 rounded-full bg-emerald-200 shadow-[0_0_16px_6px_rgba(110,231,183,.35)]" /><span className="absolute left-[67%] top-[28%] size-2 rounded-full bg-sky-200 shadow-[0_0_16px_6px_rgba(125,211,252,.35)]" /></div>}
      {definition.id === "heraldry-showcase" && <div className="mx-auto mt-5 flex size-24 rotate-45 items-center justify-center border border-emerald-200/55 bg-emerald-200/10"><Crown className="size-10 -rotate-45 text-emerald-100/80" /></div>}
      {definition.id === "character-showcase" && <div className="relative mx-auto mt-4 flex min-h-40 flex-1 w-2/3 items-end justify-center"><div className="absolute bottom-0 size-36 rounded-[50%_50%_12%_12%] bg-gradient-to-t from-[#401b28] via-[#8c3945] to-[#e5b18b] opacity-80 blur-[1px]" /><span className="relative mb-3 font-serif text-xl text-white/80">The Reaper</span></div>}
      {definition.id === "writing-profile" && <div className="mt-5 font-mono text-[11px] leading-6 tracking-[0.16em] text-amber-100/80">PRESENT TENSE<br />ACTIVE POV: RAY<br />CURRENT ARC: THRONEWAR</div>}
      {definition.id === "creation-collection" && <div className="mt-5 flex gap-2">{projectHubData.creation.collections.map((item) => <div key={item.id} className="flex-1 border border-white/10 bg-white/5 p-3"><BookOpen className="size-4 text-amber-200/70" /><p className="mt-5 truncate font-serif text-sm">{item.title}</p></div>)}</div>}
      {definition.id === "world-entity-window" && <div className="mt-5 flex gap-2 text-[10px] uppercase tracking-[0.16em] text-sky-100/70"><span className="border border-sky-200/20 px-2 py-1">Faction</span><span className="border border-sky-200/20 px-2 py-1">Canon</span></div>}
      {definition.id === "writing-spotlight" && <div className="mt-5 border-l-2 border-amber-200/60 pl-4 font-serif text-lg leading-relaxed text-current/75">The alliance begins as a practical exchange, not a friendship. Each boy sees the other&apos;s usefulness, then the risk of depending on it.</div>}
      {definition.id === "world-spotlight" && <div className="mt-5 flex flex-1 items-end justify-between border-b border-sky-200/20 pb-3"><div className="h-24 w-2/5 bg-gradient-to-t from-sky-300/20 to-transparent" /><div className="h-32 w-1/4 bg-gradient-to-t from-emerald-300/25 to-transparent" /><div className="h-20 w-1/5 bg-gradient-to-t from-amber-200/20 to-transparent" /></div>}
      {definition.id === "creation-spotlight" && <div className="mt-5 flex flex-1 items-end justify-between"><div className="h-40 w-1/3 bg-gradient-to-t from-rose-950 via-rose-700/70 to-transparent" /><div className="h-52 w-1/4 rounded-t-full bg-gradient-to-t from-red-950 via-red-500/65 to-amber-100/20" /><div className="h-32 w-1/4 bg-gradient-to-t from-sky-950 to-transparent" /></div>}
      {definition.id === "location-window" && <div className="mt-4 flex items-center gap-3 text-xs text-current/60"><Map className="size-5 text-emerald-200/75" /><span>Capital district · Lunar sea · ceremonial routes</span></div>}
      {definition.id === "world-anchor" && <div className="mt-5 flex gap-2"><Waypoints className="size-5 text-sky-200/70" /><span className="text-xs text-current/60">Canon, connections, history</span></div>}
      {definition.id === "writing-anchor" && <div className="mt-5 flex gap-2"><ScrollText className="size-5 text-amber-200/70" /><span className="text-xs text-current/60">Beats, drafts, voice</span></div>}
      {definition.id === "world-pulse" && <div className="mt-4 h-12 border-l border-b border-sky-200/25 bg-[linear-gradient(155deg,transparent_45%,rgba(125,211,252,.4)_46%,transparent_48%)]" />}
      {definition.id === "writing-pulse" && <div className="mt-4 h-10 border-b border-amber-200/25 bg-[linear-gradient(165deg,transparent_48%,rgba(253,230,138,.55)_49%,transparent_51%)]" />}
      {definition.id === "creation-pulse" && <div className="mt-4 h-10 border-b border-emerald-200/25 bg-[linear-gradient(20deg,transparent_48%,rgba(110,231,183,.5)_49%,transparent_51%)]" />}
      {boxById.size > 0 && definition.id === "writing-spotlight" && <span className="sr-only">Writing Studio display</span>}
    </div>
  )
}

function recordFor(id: string): HubMockRecord | undefined {
  const records = [...projectHubData.creation.characters, ...projectHubData.creation.heraldry, ...projectHubData.creation.maps, ...projectHubData.creation.collections, ...projectHubData.world.locations, ...projectHubData.world.entities, ...projectHubData.world.relationships, ...projectHubData.world.timeline, ...projectHubData.writing.chapters, ...projectHubData.writing.sceneBeats, ...projectHubData.writing.drafts, projectHubData.writing.profile]
  const aliases: Record<string, string> = { "creation-spotlight": "darrow", "character-showcase": "darrow", "heraldry-showcase": "andromedus", "map-showcase": "institute", "creation-collection": "cover", "world-spotlight": "society", relationships: "darrow-sevro", "location-window": "luna", "world-entity-window": "sons", "timeline-window": "rising", "writing-spotlight": "beat-02", "chapter-reader": "chapter-one", "scene-beats": "beat-01", "draft-pipeline": "draft-2", "writing-profile": "profile" }
  return records.find((record) => record.id === (aliases[id] ?? id))
}

function visualFor(id: string) {
  if (id === "chapter-reader") return null
  return null
}

function iconFor(id: string) {
  if (id.includes("map") || id.includes("location")) return Map
  if (id.includes("timeline")) return GitBranch
  if (id.includes("spotlight")) return Sparkles
  if (id.includes("profile")) return ScrollText
  return undefined
}

function summaryFor(id: string) {
  const summaries: Record<string, string> = {
    "creation-spotlight": "A rotating view of the work currently shaping the project.",
    "character-showcase": "A permanent place for the people carrying the story.",
    "heraldry-showcase": "Symbols, houses, and visual language in progress.",
    "map-showcase": "Routes, territories, and places waiting to become scenes.",
    "creation-collection": "Covers, lineages, and alternate creations gather here.",
    "world-spotlight": "The forces and ideas that make this world feel inevitable.",
    relationships: "A living thread between two people and everything around them.",
    "location-window": "A place with geography, memory, and narrative pressure.",
    "world-entity-window": "Factions, species, religions, and concepts share one orbit.",
    "timeline-window": "History moves through eras instead of sitting in a list.",
    "writing-spotlight": "The current scene, chapter, or draft stage rises to the surface.",
    "chapter-reader": "Read the project as it takes shape, one passage at a time.",
    "scene-beats": "A sequence of decisions waiting to become prose.",
    "draft-pipeline": "The chapter moves from intention toward canon.",
    "writing-profile": "A compact compass for the voice of the work.",
  }
  return summaries[id] ?? "A living fragment of the project, ready for a future display."
}