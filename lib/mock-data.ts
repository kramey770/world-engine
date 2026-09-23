export type Project = {
  id: string
  name: string
  description: string
  lastEdited: string
  wordCount: number
  accent: string
}

export const projects: Project[] = [
  {
    id: "ashfall",
    name: "Untitled Project",
    description: "A new space for your world, story, and ideas.",
    lastEdited: "Just now",
    wordCount: 0,
    accent: "chart-1",
  },
  {
    id: "tidewalkers",
    name: "New World",
    description: "A place to collect the foundations of a new world.",
    lastEdited: "Just now",
    wordCount: 0,
    accent: "chart-2",
  },
  {
    id: "hollow-signal",
    name: "Story Archive",
    description: "A workspace for stories, references, and unfinished threads.",
    lastEdited: "Just now",
    wordCount: 0,
    accent: "chart-4",
  },
  {
    id: "untitled",
    name: "Untitled Project",
    description: "A fresh world waiting to be built.",
    lastEdited: "Just now",
    wordCount: 0,
    accent: "chart-5",
  },
]

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
