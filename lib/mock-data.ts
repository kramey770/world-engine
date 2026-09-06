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
    name: "Red Rising Trilogy Study",
    description: "A worldbuilding study of Pierce Brown's Red Rising trilogy: caste, rebellion, loyalty, and the cost of remaking a civilization.",
    lastEdited: "2 hours ago",
    wordCount: 128640,
    accent: "chart-1",
  },
  {
    id: "tidewalkers",
    name: "The Expanse of Mars",
    description: "A reference project for the first trilogy's political factions, planetary settings, and escalating war.",
    lastEdited: "Yesterday",
    wordCount: 76320,
    accent: "chart-2",
  },
  {
    id: "hollow-signal",
    name: "Society and Color",
    description: "Notes on the social engineering, rituals, and visual language behind the Society.",
    lastEdited: "3 days ago",
    wordCount: 31480,
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
      { id: "sera", name: "Darrow of Lykos", kind: "character", subtitle: "Helldiver, Red Reaper" },
      { id: "corin", name: "Virginia au Augustus", kind: "character", subtitle: "Sovereign, strategist" },
      { id: "the-oracle", name: "Sevro au Barca", kind: "character", subtitle: "Howler, insurgent commander" },
    ],
  },
  {
    id: "location",
    label: "Locations",
    items: [
      { id: "emberhold", name: "Luna", kind: "location", subtitle: "The Society's glittering capital" },
      { id: "grey-reach", name: "The Institute", kind: "location", subtitle: "A brutal proving ground for Golds" },
    ],
  },
  {
    id: "faction",
    label: "Factions",
    items: [
      { id: "wardens", name: "The Sons of Ares", kind: "faction", subtitle: "Underground revolutionary network" },
      { id: "cinder-court", name: "The Society", kind: "faction", subtitle: "Color-coded solar empire" },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    items: [
      { id: "the-fall", name: "The Institute", kind: "timeline", subtitle: "Darrow enters the Gold world" },
      { id: "long-winter", name: "The Rising", kind: "timeline", subtitle: "The oppressed Colors begin to unite" },
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
      "I've loaded the Red Rising study project and its current scene context. Ask me to develop a beat, compare factions, or expand a character relationship.",
  },
  {
    id: "m2",
    role: "user",
    content: "Develop the moment Darrow realizes the Institute is designed to turn friendship into a weapon.",
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "Track the scene's tension without imitating the novel's prose: Darrow reads the landscape as a military problem, notices the other students measuring one another, and understands that survival will require both force and chosen allegiance.",
  },
]

export const timelineMarkers = [
  { id: "t1", label: "Life in the mines", position: 8 },
  { id: "t2", label: "The Institute", position: 26 },
  { id: "t3", label: "The Jackal's coup", position: 52 },
  { id: "t4", label: "The Rising", position: 71, active: true },
  { id: "t5", label: "Morning Star", position: 92 },
]

export const affectedEntities = [
  { id: "a1", name: "The Institute", detail: "Location referenced in current scene" },
  { id: "a2", name: "The Sons of Ares", detail: "Faction — Darrow's hidden allegiance" },
  { id: "a3", name: "Sevro au Barca", detail: "Character — uneasy ally" },
]
