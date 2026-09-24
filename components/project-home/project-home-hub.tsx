"use client"

import { useState } from "react"
import { GitBranch, Map, ScrollText, Sparkles } from "lucide-react"
import type { ProjectSection } from "@/components/project-home"
import { projectHubData } from "@/lib/project-hub-data"
import { HubBox } from "./hub/hub-box"
import { HubFocusControl } from "./hub/hub-focus-control"
import { HubNavigationAnchor } from "./hub/hub-navigation-anchor"
import { HubPulse } from "./hub/hub-pulse"
import type { HubBoxDefinition, HubMockRecord } from "./hub/hub-types"
import { CharacterShowcase } from "./hub/creation/character-showcase"
import { CreationCollection } from "./hub/creation/creation-collection"
import { CreationNavigationAnchor } from "./hub/creation/creation-navigation-anchor"
import { CreationPulse } from "./hub/creation/creation-pulse"
import { CreationSpotlight } from "./hub/creation/creation-spotlight"
import { HeraldryShowcase } from "./hub/creation/heraldry-showcase"
import { MapShowcase } from "./hub/creation/map-showcase"
import { LocationWindow } from "./hub/world/location-window"
import { RelationshipsConnections } from "./hub/world/relationships-connections"
import { TimelineWindow } from "./hub/world/timeline-window"
import { WorldEntityWindow } from "./hub/world/world-entity-window"
import { WorldNavigationAnchor } from "./hub/world/world-navigation-anchor"
import { WorldPulse } from "./hub/world/world-pulse"
import { WorldSpotlight } from "./hub/world/world-spotlight"
import { ChapterReader } from "./hub/writing/chapter-reader"
import { DraftPipeline } from "./hub/writing/draft-pipeline"
import { SceneBeats } from "./hub/writing/scene-beats"
import { WritingNavigationAnchor } from "./hub/writing/writing-navigation-anchor"
import { WritingProfile } from "./hub/writing/writing-profile"
import { WritingPulse } from "./hub/writing/writing-pulse"
import { WritingSpotlight } from "./hub/writing/writing-spotlight"
import "./project-home-hub.css"

export function ProjectHomeHub({ onOpenSection }: { onOpenSection: (section: ProjectSection) => void }) {
  const boxes = projectHubData.boxes
  const [focusId, setFocusId] = useState("recent")

  function open(definition: HubBoxDefinition, section?: ProjectSection) {
    const target = section ?? definition.destination?.section
    if (target) onOpenSection(target)
  }

  return (
    <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#080d11] px-3 py-3 shadow-2xl shadow-black/30 sm:px-5 sm:py-5 lg:px-7 lg:py-7" aria-label="Project Hub">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(110,231,183,.1),transparent_23%),radial-gradient(circle_at_83%_40%,rgba(125,211,252,.09),transparent_28%),linear-gradient(135deg,#0a1015,#10181d_52%,#0a1013)]" />
      <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:px-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-200/70">Living project wall</p>
          <h2 className="mt-1 font-serif text-3xl tracking-tight text-white sm:text-4xl">Everything taking shape</h2>
        </div>
        <HubFocusControl options={projectHubData.focusOptions} value={focusId} onChange={setFocusId} />
      </div>

      <div className="project-hub-canvas" data-focus-id={focusId}>
        {boxes.map((definition) => (
          <HubGridItem key={definition.id} definition={definition} focusId={focusId} onOpen={(section) => open(definition, section)} />
        ))}
      </div>
    </section>
  )
}

function HubGridItem({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const placement = gridPlacementFor(definition.id)
  return (
    <div className="project-hub-grid-item" style={{ gridColumn: placement.column, gridRow: placement.row }}>
      <HubDisplay definition={definition} focusId={focusId} onOpen={onOpen} />
    </div>
  )
}

function gridPlacementFor(id: string): { column: string; row: string } {
  const placements: Record<string, { column: string; row: string }> = {
    "creation-anchor": { column: "1 / span 1", row: "1 / span 1" },
    "creation-spotlight": { column: "2 / span 2", row: "1 / span 2" },
    "character-showcase": { column: "4 / span 2", row: "1 / span 2" },
    "heraldry-showcase": { column: "1 / span 1", row: "2 / span 1" },
    "map-showcase": { column: "2 / span 2", row: "3 / span 1" },
    "creation-collection": { column: "4 / span 2", row: "3 / span 1" },
    "creation-pulse": { column: "1 / span 1", row: "3 / span 1" },
    "world-anchor": { column: "1 / span 1", row: "4 / span 1" },
    "world-spotlight": { column: "2 / span 2", row: "4 / span 2" },
    "relationships": { column: "4 / span 2", row: "4 / span 1" },
    "location-window": { column: "1 / span 2", row: "5 / span 1" },
    "world-entity-window": { column: "3 / span 1", row: "5 / span 1" },
    "timeline-window": { column: "4 / span 2", row: "5 / span 1" },
    "world-pulse": { column: "5 / span 1", row: "4 / span 2" },
    "writing-anchor": { column: "1 / span 1", row: "6 / span 1" },
    "writing-spotlight": { column: "2 / span 2", row: "6 / span 2" },
    "chapter-reader": { column: "4 / span 2", row: "6 / span 2" },
    "scene-beats": { column: "5 / span 1", row: "6 / span 1" },
    "draft-pipeline": { column: "1 / span 2", row: "7 / span 1" },
    "writing-profile": { column: "3 / span 1", row: "7 / span 1" },
    "writing-pulse": { column: "4 / span 2", row: "8 / span 1" },
  }

  return placements[id] ?? { column: "auto", row: "auto" }
}

function HubDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  if (definition.studio === "creation") return <CreationDisplay definition={definition} focusId={focusId} onOpen={onOpen} />
  if (definition.studio === "world") return <WorldDisplay definition={definition} focusId={focusId} onOpen={onOpen} />
  if (definition.studio === "writing") return <WritingDisplay definition={definition} focusId={focusId} onOpen={onOpen} />
  if (definition.id.endsWith("anchor")) return <HubNavigationAnchor definition={definition} onOpen={definition.destination ? onOpen : undefined} />
  if (definition.id.endsWith("pulse")) return <HubPulse definition={definition} studio={definition.studio} modes={projectHubData.pulses[definition.studio]} />

  const content = contentFor(definition)
  return <HubBox definition={definition} onOpen={definition.destination ? onOpen : undefined}>{content}</HubBox>
}

function WritingDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const writing = projectHubData.writing
  const spotlightItems = focusRecords([...writing.chapters, ...writing.sceneBeats.slice(1, 3), ...writing.drafts.slice(2, 3)], focusId)
  const chapter = focusRecords(writing.chapters, focusId)[0] ?? writing.chapters[0]
  const beats = focusRecords(writing.sceneBeats, focusId)

  if (definition.id === "writing-anchor") return <WritingNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "writing-spotlight") return <WritingSpotlight definition={definition} items={spotlightItems} onOpen={() => onOpen()} />
  if (definition.id === "chapter-reader") return <ChapterReader definition={definition} chapter={chapter} onOpen={() => onOpen()} />
  if (definition.id === "scene-beats") return <SceneBeats definition={definition} beats={beats} onOpen={() => onOpen()} />
  if (definition.id === "draft-pipeline") return <DraftPipeline definition={definition} drafts={writing.drafts} onOpen={() => onOpen()} />
  if (definition.id === "writing-profile") return <WritingProfile definition={definition} profile={writing.profile} onOpen={() => onOpen()} />
  return <WritingPulse definition={definition} modes={projectHubData.pulses.writing} />
}

function WorldDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const world = projectHubData.world
  const spotlightItems = focusRecords([...world.entities, ...world.locations], focusId)
  const locations = focusRecords(world.locations, focusId)
  const entities = focusRecords(world.entities, focusId)
  const timeline = focusRecords(world.timeline, focusId)

  if (definition.id === "world-anchor") return <WorldNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "world-spotlight") return <WorldSpotlight definition={definition} items={spotlightItems} onOpen={() => onOpen()} />
  if (definition.id === "relationships") return <RelationshipsConnections definition={definition} item={world.relationships[0]} onOpen={() => onOpen()} />
  if (definition.id === "location-window") return <LocationWindow definition={definition} item={locations[0] ?? world.locations[0]} onOpen={() => onOpen()} />
  if (definition.id === "world-entity-window") return <WorldEntityWindow definition={definition} items={entities} onOpen={() => onOpen()} />
  if (definition.id === "timeline-window") return <TimelineWindow definition={definition} items={timeline} onOpen={() => onOpen()} />
  return <WorldPulse definition={definition} modes={projectHubData.pulses.world} />
}

function CreationDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const characters = focusRecords(projectHubData.creation.characters, focusId)
  const spotlightItems = focusRecords([...projectHubData.creation.characters, ...projectHubData.creation.heraldry, ...projectHubData.creation.maps], focusId)
  const collectionItems = focusRecords([...projectHubData.creation.collections, ...projectHubData.creation.characters], focusId)

  if (definition.id === "creation-anchor") return <CreationNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "creation-spotlight") return <CreationSpotlight definition={definition} items={spotlightItems} onOpen={() => onOpen()} />
  if (definition.id === "character-showcase") return <CharacterShowcase definition={definition} item={characters[0] ?? projectHubData.creation.characters[0]} onOpen={() => onOpen()} />
  if (definition.id === "heraldry-showcase") return <HeraldryShowcase definition={definition} item={focusRecords(projectHubData.creation.heraldry, focusId)[0] ?? projectHubData.creation.heraldry[0]} onOpen={() => onOpen()} />
  if (definition.id === "map-showcase") return <MapShowcase definition={definition} item={focusRecords(projectHubData.creation.maps, focusId)[0] ?? projectHubData.creation.maps[0]} onOpen={() => onOpen()} />
  if (definition.id === "creation-collection") return <CreationCollection definition={definition} items={collectionItems} onOpen={() => onOpen()} />
  return <CreationPulse definition={definition} modes={projectHubData.pulses.creation} />
}

function focusRecords(records: HubMockRecord[], focusId: string) {
  if (focusId === "recent") return records
  const focused = records.filter((record) => record.focus?.includes(focusId))
  return focused.length > 0 ? focused : records
}

function contentFor(definition: HubBoxDefinition) {
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
    </div>
  )
}

function recordFor(id: string): HubMockRecord | undefined {
  const records = [...projectHubData.creation.characters, ...projectHubData.creation.heraldry, ...projectHubData.creation.maps, ...projectHubData.creation.collections, ...projectHubData.world.locations, ...projectHubData.world.entities, ...projectHubData.world.relationships, ...projectHubData.world.timeline, ...projectHubData.writing.chapters, ...projectHubData.writing.sceneBeats, ...projectHubData.writing.drafts, projectHubData.writing.profile]
  const aliases: Record<string, string> = { "world-spotlight": "society", relationships: "darrow-sevro", "location-window": "luna", "world-entity-window": "sons", "timeline-window": "rising", "writing-spotlight": "beat-02", "chapter-reader": "chapter-one", "scene-beats": "beat-01", "draft-pipeline": "draft-2", "writing-profile": "profile" }
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