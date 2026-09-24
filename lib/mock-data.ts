export type { Project } from "@/lib/project-store"

export type EntityKind = "character" | "location" | "faction" | "timeline"

export type Entity = {
  id: string
  name: string
  kind: EntityKind
  subtitle: string
}

export type ExplorerSection = {
  id: EntityKind
  label: string
  items: Entity[]
}

export const explorerSections: ExplorerSection[] = [
  {
    id: "character",
    label: "Characters",
    items: [],
  },
  {
    id: "location",
    label: "Locations",
    items: [],
  },
  {
    id: "faction",
    label: "Factions",
    items: [],
  },
  {
    id: "timeline",
    label: "Timeline",
    items: [],
  },
]

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

export const initialChat: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Your project workspace is ready. Add a scene, character, or world note to begin building context.",
  },
  {
    id: "m2",
    role: "user",
    content: "Help me develop the next scene.",
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "Start with the scene's intent, setting, point of view, and the choice that changes what happens next.",
  },
]

export const timelineMarkers: { id: string; label: string; position: number; active?: boolean }[] = []

export const affectedEntities: { id: string; name: string; detail: string }[] = []
