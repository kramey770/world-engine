import type { ProjectSection } from "@/components/project-home"

export type HubStudio = "creation" | "world" | "writing"
export type HubFocusMode = "recent" | "storyline"
export type HubBoxSize = "hero" | "large" | "medium" | "wide" | "tall" | "compact"
export type HubBoxVariant = "ink" | "paper" | "map" | "crest" | "signal" | "type"

export type HubGeometry = {
  desktop: string
  mobile?: string
  size: HubBoxSize
  layer: number
}

export type HubDestination = {
  label: string
  section: ProjectSection
}

export type HubMockRecord = {
  id: string
  title: string
  eyebrow: string
  summary: string
  detail?: string
  body?: string
  metadata?: string[]
  progress?: number
  image?: string
  destination?: HubDestination
  focus?: string[]
}

export type HubPulseMode = {
  label: string
  items: { label: string; value: string; detail?: string }[]
}

export type HubBoxDefinition = {
  id: string
  title: string
  eyebrow: string
  studio: HubStudio
  geometry: HubGeometry
  variant: HubBoxVariant
  destination?: HubDestination
}

export type ProjectHubData = {
  focusOptions: { id: string; label: string; mode: HubFocusMode }[]
  boxes: HubBoxDefinition[]
  creation: { characters: HubMockRecord[]; heraldry: HubMockRecord[]; maps: HubMockRecord[]; collections: HubMockRecord[] }
  world: { locations: HubMockRecord[]; entities: HubMockRecord[]; relationships: HubMockRecord[]; timeline: HubMockRecord[] }
  writing: { chapters: HubMockRecord[]; sceneBeats: HubMockRecord[]; drafts: HubMockRecord[]; profile: HubMockRecord }
  pulses: Record<HubStudio, HubPulseMode[]>
}