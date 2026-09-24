"use client"

import { useEffect, useMemo, useState } from "react"
import { GitBranch, Map, ScrollText, Sparkles } from "lucide-react"
import type { ProjectSection } from "@/components/project-home"
import { useCharacterCanon } from "@/lib/character-canon"
import { useConceptCanon } from "@/lib/concept-canon"
import { useCultureCanon } from "@/lib/culture-canon"
import { useHistoryCanon } from "@/lib/history-canon"
import { useLocationCanon } from "@/lib/location-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { useProjectCollection, readProjectData, useProjectStore } from "@/lib/project-store"
import { useReligionCanon } from "@/lib/religion-canon"
import { useRelationshipsCanon } from "@/lib/relationships-canon"
import { useSpeciesCanon } from "@/lib/species-canon"
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
  const [writingProfile] = useProjectCollection("writing-profile", { choices: { perspective: "", tense: "", distance: "", interiority: "", rhythm: "", description: "", dialogue: "" }, characteristics: [], notes: "" })
  const { activeProject } = useProjectStore()
  const [pipeline, setPipeline] = useState<{ chapters: Array<{ id: string; title: string; stage?: string; finalized?: boolean; content?: Record<string, string> }>; scenes: Array<{ id: string; title: string; content?: string; status?: string }> }>({ chapters: [], scenes: [] })

  useEffect(() => {
    if (!activeProject) return
    void readProjectData<{ chapters?: Array<{ id: string; title: string; stage?: string; finalized?: boolean; content?: Record<string, string> }>; scenes?: Array<{ id: string; title: string; content?: string; status?: string }> }>(activeProject.id, "pipeline")
      .then((saved) => {
        if (saved) setPipeline({ chapters: saved.chapters ?? [], scenes: saved.scenes ?? [] })
      })
      .catch(() => setPipeline({ chapters: [], scenes: [] }))
  }, [activeProject])

  const chapterRecords = useMemo(() => {
    if (pipeline.chapters.length === 0) return []
    return pipeline.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      eyebrow: "Chapter",
      summary: chapter.finalized ? "Finalized chapter in the project" : `Draft stage: ${chapter.stage ?? "draft"}`,
      detail: chapter.content?.final ? "Project writing data" : "Draft in progress",
    }))
  }, [pipeline.chapters])

  const sceneRecords = useMemo(() => {
    if (pipeline.scenes.length === 0) return []
    return pipeline.scenes.map((scene) => ({
      id: scene.id,
      title: scene.title,
      eyebrow: "Scene beat",
      summary: scene.content?.trim() ? "Scene has written material in the project" : "Scene beat is present but not drafted yet",
      detail: scene.status === "finalized" ? "Finalized" : "In progress",
    }))
  }, [pipeline.scenes])

  const profileSummary = (() => {
    const choices = (writingProfile as { choices?: Record<string, string> } | undefined)?.choices ?? {}
    const selected = Object.values(choices).filter(Boolean)
    if (selected.length > 0) return selected.slice(0, 2).join(" • ")
    return "No writing profile has been saved for this project yet."
  })()

  const profileItem = { id: "writing-profile", title: "Writing Profile", eyebrow: "Writing profile", summary: profileSummary, detail: "Project voice" }
  const pulseMode = [{ label: "Project data", items: [
    { label: "CHAPTERS", value: String(chapterRecords.length || "—") },
    { label: "SCENES", value: String(sceneRecords.length || "—") },
    { label: "DRAFTS", value: String(Math.max(pipeline.chapters.length, 0) || "—") },
    { label: "WORDS", value: String(pipeline.chapters.reduce((total, chapter) => total + Object.values(chapter.content ?? {}).join(" ").split(/\s+/).filter(Boolean).length, 0) || "—") },
  ] }]

  const spotlightItems = focusRecords([...chapterRecords, ...sceneRecords], focusId)
  const chapter = focusRecords(chapterRecords, focusId)[0] ?? chapterRecords[0] ?? { id: "chapter-reader", title: "Chapter Reader", eyebrow: "Chapter reader", summary: "No chapter is currently available for this project." }
  const beats = focusRecords(sceneRecords, focusId)
  const draftStages = pipeline.chapters.length > 0 ? [
    { id: "beats", title: "BEATS", eyebrow: "Scene Beats", summary: "Scene beats are the writing foundation." },
    { id: "draft1", title: "1ST", eyebrow: "1st Draft", summary: "First pass of the manuscript." },
    { id: "draft2", title: "2ND", eyebrow: "2nd Draft", summary: "Revision phase for structure and rhythm." },
    { id: "draft3", title: "3RD", eyebrow: "3rd Draft", summary: "Line-level refinement and polish." },
    { id: "final", title: "FINAL", eyebrow: "Final Draft", summary: "Finalized draft stage." },
  ] : [
    { id: "beats", title: "BEATS", eyebrow: "Scene Beats", summary: "Scene beats are the writing foundation." },
    { id: "draft1", title: "1ST", eyebrow: "1st Draft", summary: "First pass of the manuscript." },
    { id: "draft2", title: "2ND", eyebrow: "2nd Draft", summary: "Revision phase for structure and rhythm." },
    { id: "draft3", title: "3RD", eyebrow: "3rd Draft", summary: "Line-level refinement and polish." },
    { id: "final", title: "FINAL", eyebrow: "Final Draft", summary: "Finalized draft stage." },
  ]

  if (definition.id === "writing-anchor") return <WritingNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "writing-spotlight") return <WritingSpotlight definition={definition} items={spotlightItems.length > 0 ? spotlightItems : [{ id: "writing-empty", title: "Writing Studio", eyebrow: "Writing", summary: "No writing content exists for this project yet." }]} onOpen={() => onOpen()} />
  if (definition.id === "chapter-reader") return <ChapterReader definition={definition} chapter={chapter} onOpen={() => onOpen()} />
  if (definition.id === "scene-beats") return <SceneBeats definition={definition} beats={beats.length > 0 ? beats : [{ id: "placeholder-beat", title: "SCENE BEATS", eyebrow: "Scene beats", summary: "No scene beats have been recorded yet." }]} onOpen={() => onOpen()} />
  if (definition.id === "draft-pipeline") return <DraftPipeline definition={definition} drafts={draftStages} onOpen={() => onOpen()} />
  if (definition.id === "writing-profile") return <WritingProfile definition={definition} profile={profileItem} onOpen={() => onOpen()} />
  return <WritingPulse definition={definition} modes={pulseMode} />
}

function WorldDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const { locations } = useLocationCanon()
  const { relationships } = useRelationshipsCanon()
  const { histories } = useHistoryCanon()
  const { organizations } = useOrganizationCanon()
  const { species } = useSpeciesCanon()
  const { religions } = useReligionCanon()
  const { concepts } = useConceptCanon()
  const { cultures } = useCultureCanon()

  const locationItems = useMemo(() => Object.values(locations).map((location) => ({
    id: location.id,
    title: location.name,
    eyebrow: "Location",
    summary: location.summary ?? "Project location",
    detail: location.region ?? "World space",
    image: location.image,
  })), [locations])

  const relationshipItems = useMemo(() => Object.values(relationships).map((relationship) => ({
    id: relationship.id,
    title: relationship.label || "Relationship",
    eyebrow: "Relationship",
    summary: relationship.summary ?? "A recorded connection between canon entities.",
    detail: `${relationship.subject.entityType} → ${relationship.object.entityType}`,
  })), [relationships])

  const timelineItems = useMemo(() => Object.values(histories).map((history) => ({
    id: history.id,
    title: history.name,
    eyebrow: history.type,
    summary: history.summary ?? "Project history entry",
    detail: history.era ?? history.occurrence ?? "Timeline record",
  })), [histories])

  const worldEntityItems = useMemo(() => {
    const values = [...Object.values(organizations), ...Object.values(species), ...Object.values(religions), ...Object.values(concepts), ...Object.values(cultures)] as any[]
    return values.map((item) => ({
      id: item.id,
      title: item.name,
      eyebrow: "World entity",
      summary: item.summary ?? item.description ?? "Canon record",
      detail: [item.type ?? item.kind ?? "", item.region ?? item.location ?? ""].filter(Boolean).join(" • ") || "Recorded entity",
    }))
  }, [concepts, cultures, organizations, religions, species])

  const entityStats = [`${Object.keys(species).length} species`, `${Object.keys(religions).length} religions`, `${Object.keys(organizations).length} factions`].join(" • ")
  const worldPulseMode = [{ label: "Project data", items: [
    { label: "ENTITIES", value: String(worldEntityItems.length || "—") },
    { label: "LOCATIONS", value: String(locationItems.length || "—") },
    { label: "TIMELINE", value: String(timelineItems.length || "—") },
    { label: "CONCEPTS", value: String(Object.keys(concepts).length || "—") },
  ] }]

  const spotlightItems = focusRecords([...worldEntityItems, ...locationItems], focusId)

  if (definition.id === "world-anchor") return <WorldNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "world-spotlight") return <WorldSpotlight definition={definition} items={spotlightItems.length > 0 ? spotlightItems : [{ id: "world-empty", title: "World Building", eyebrow: "World", summary: "No canon records have been created in this project yet." }]} onOpen={() => onOpen()} />
  if (definition.id === "relationships") return <RelationshipsConnections definition={definition} item={relationshipItems[0] ?? { id: "relationship-empty", title: "Relationships & Connections", eyebrow: "Relationships", summary: "No relationships are recorded yet.", detail: "Neutral connection" }} onOpen={() => onOpen()} />
  if (definition.id === "location-window") return <LocationWindow definition={definition} item={locationItems[0] ?? { id: "location-empty", title: "Location Window", eyebrow: "Location", summary: "No locations are recorded yet for this project.", detail: "World space" }} onOpen={() => onOpen()} />
  if (definition.id === "world-entity-window") return <WorldEntityWindow definition={definition} items={worldEntityItems.length > 0 ? worldEntityItems : [{ id: "world-entity-empty", title: "World entities", eyebrow: "Entities", summary: "No world entities exist yet.", detail: entityStats }]} onOpen={() => onOpen()} />
  if (definition.id === "timeline-window") return <TimelineWindow definition={definition} items={timelineItems.length > 0 ? timelineItems : [{ id: "timeline-empty", title: "Timeline", eyebrow: "History", summary: "No timeline entries have been recorded yet.", detail: "History remains empty" }]} onOpen={() => onOpen()} />
  return <WorldPulse definition={definition} modes={worldPulseMode} />
}

function CreationDisplay({ definition, focusId, onOpen }: { definition: HubBoxDefinition; focusId: string; onOpen: (section?: ProjectSection) => void }) {
  const { characters } = useCharacterCanon()
  const [heraldryState] = useProjectCollection<{ status?: string; updatedAt?: number }>("heraldry", { status: "empty" })
  const [mapSettings] = useProjectCollection<{ [key: string]: unknown }>("map-settings", { mapWidth: 960, mapHeight: 540, seed: 1, template: "world" })
  const defaultMapKeys = new Set(["mapWidth", "mapHeight", "seed", "points", "template", "cultureCount", "cultureSet", "statesNumber", "provincesRatio", "sizeVariety", "growthRate", "burgsNumber", "religionsNumber"])

  const characterItems = useMemo(() => Object.values(characters).map((character) => ({
    id: character.id,
    title: character.name,
    eyebrow: "Character",
    summary: character.role || character.title || character.bio || "Character record",
    detail: character.currentLocation || "Character profile",
    image: character.portrait,
  })), [characters])

  const heraldryItem = useMemo(() => {
    if (!heraldryState || (heraldryState as { status?: string }).status === "empty" || (heraldryState as { status?: string }).status === "not-started") return null
    return { id: "heraldry", title: "Heraldry", eyebrow: "Heraldry", summary: "Heraldry workspace has been opened for this project.", detail: "Project heraldry exists" }
  }, [heraldryState])

  const mapItem = useMemo(() => {
    const keys = Object.keys(mapSettings ?? {})
    const hasCustomMapData = keys.some((key) => !defaultMapKeys.has(key))
    if (!hasCustomMapData && keys.length <= defaultMapKeys.size) return null
    return { id: "map", title: "Map", eyebrow: "Map creator", summary: "Map settings are active in this project.", detail: "Project map data exists" }
  }, [mapSettings])

  const collectionItems = useMemo(() => [
    ...characterItems,
    ...(heraldryItem ? [heraldryItem] : []),
    ...(mapItem ? [mapItem] : []),
  ], [characterItems, heraldryItem, mapItem])

  const creationPulseMode = [{ label: "Project data", items: [
    { label: "CHARACTERS", value: String(characterItems.length || "—") },
    { label: "HERALDRY", value: String(heraldryItem ? 1 : "—") },
    { label: "MAPS", value: String(mapItem ? 1 : "—") },
    { label: "ASSETS", value: String(collectionItems.length || "—") },
  ] }]

  const spotlightItems = focusRecords([...characterItems, ...(heraldryItem ? [heraldryItem] : []), ...(mapItem ? [mapItem] : [])], focusId)

  if (definition.id === "creation-anchor") return <CreationNavigationAnchor definition={definition} onOpen={onOpen} />
  if (definition.id === "creation-spotlight") return <CreationSpotlight definition={definition} items={spotlightItems.length > 0 ? spotlightItems : [{ id: "creation-empty", title: "Creation Studio", eyebrow: "Creation", summary: "No creation records exist for this project yet." }]} onOpen={() => onOpen()} />
  if (definition.id === "character-showcase") return <CharacterShowcase definition={definition} item={characterItems[0] ?? { id: "character-empty", title: "Characters", eyebrow: "Characters", summary: "No characters have been created in this project yet.", detail: "Character space" }} onOpen={() => onOpen()} />
  if (definition.id === "heraldry-showcase") return <HeraldryShowcase definition={definition} item={heraldryItem ?? { id: "heraldry-empty", title: "Heraldry", eyebrow: "Heraldry", summary: "No heraldry has been created for this project yet.", detail: "Ready for coat-of-arms design" }} onOpen={() => onOpen()} />
  if (definition.id === "map-showcase") return <MapShowcase definition={definition} item={mapItem ?? { id: "map-empty", title: "Map Creator", eyebrow: "Map", summary: "No map data exists for this project yet.", detail: "World map ready" }} onOpen={() => onOpen()} />
  if (definition.id === "creation-collection") return <CreationCollection definition={definition} items={collectionItems.length > 0 ? collectionItems : [{ id: "collection-empty", title: "Collection", eyebrow: "Collection", summary: "This project does not have any created assets yet." }]} onOpen={() => onOpen()} />
  return <CreationPulse definition={definition} modes={creationPulseMode} />
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