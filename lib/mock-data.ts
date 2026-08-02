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
    name: "The Ashfall Chronicles",
    description: "A slow-burning epic about a kingdom slowly buried under falling ash and forgotten gods.",
    lastEdited: "2 hours ago",
    wordCount: 84210,
    accent: "chart-1",
  },
  {
    id: "tidewalkers",
    name: "Tidewalkers",
    description: "Coastal cities float on the backs of ancient leviathans. One is beginning to wake.",
    lastEdited: "Yesterday",
    wordCount: 41980,
    accent: "chart-2",
  },
  {
    id: "hollow-signal",
    name: "The Hollow Signal",
    description: "A near-future thriller where an AI broadcasts memories that never happened.",
    lastEdited: "3 days ago",
    wordCount: 12750,
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
    items: [
      { id: "sera", name: "Sera Vane", kind: "character", subtitle: "Ash-warden, protagonist" },
      { id: "corin", name: "Corin Ashe", kind: "character", subtitle: "Exiled cartographer" },
      { id: "the-oracle", name: "The Pale Oracle", kind: "character", subtitle: "Keeper of the buried gods" },
    ],
  },
  {
    id: "location",
    label: "Locations",
    items: [
      { id: "emberhold", name: "Emberhold", kind: "location", subtitle: "Capital beneath the ash" },
      { id: "grey-reach", name: "The Grey Reach", kind: "location", subtitle: "Borderland wastes" },
    ],
  },
  {
    id: "faction",
    label: "Factions",
    items: [
      { id: "wardens", name: "The Ash Wardens", kind: "faction", subtitle: "Order of protectors" },
      { id: "cinder-court", name: "The Cinder Court", kind: "faction", subtitle: "Fallen nobility" },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    items: [
      { id: "the-fall", name: "The First Fall", kind: "timeline", subtitle: "Year 0 — the sky darkens" },
      { id: "long-winter", name: "The Long Winter", kind: "timeline", subtitle: "Year 112 — famine spreads" },
    ],
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
      "I've loaded the current chapter and your world context. Ask me to continue the scene, rewrite a passage, or expand a description whenever you're ready.",
  },
  {
    id: "m2",
    role: "user",
    content: "Continue the scene where Sera reaches the gates of Emberhold.",
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "The gates of Emberhold rose out of the grey like the ribs of some long-dead beast. Sera pulled her scarf tighter against the drifting ash and pressed a gloved hand to the cold iron. Somewhere beyond the wall, a bell began to toll — slow, uneven, as if the city itself were struggling to breathe.",
  },
]

export const timelineMarkers = [
  { id: "t1", label: "The First Fall", position: 8 },
  { id: "t2", label: "Founding of Emberhold", position: 26 },
  { id: "t3", label: "The Long Winter", position: 52 },
  { id: "t4", label: "Sera's Oath", position: 71, active: true },
  { id: "t5", label: "The Waking", position: 92 },
]

export const affectedEntities = [
  { id: "a1", name: "Emberhold", detail: "Location referenced in current scene" },
  { id: "a2", name: "The Ash Wardens", detail: "Faction — Sera's allegiance" },
  { id: "a3", name: "Corin Ashe", detail: "Character — awaiting introduction" },
]
