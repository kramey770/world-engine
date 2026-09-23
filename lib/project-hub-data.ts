import type { ProjectSection } from "@/components/project-home"
import type { ProjectHubData } from "@/components/project-home/hub/hub-types"

const destination = (label: string, section: ProjectSection) => ({ label, section })

export const projectHubData: ProjectHubData = {
  focusOptions: [
    { id: "recent", label: "Recent", mode: "recent" },
    { id: "ray", label: "Ray's Storyline", mode: "storyline" },
    { id: "orion", label: "Orion's Storyline", mode: "storyline" },
    { id: "storyline-c", label: "Storyline C", mode: "storyline" },
    { id: "storyline-d", label: "Storyline D", mode: "storyline" },
  ],
  boxes: [
    { id: "creation-anchor", title: "Creation Studio", eyebrow: "Make the visible world", studio: "creation", geometry: { desktop: "left-[1%] top-[4%] w-[17%] min-h-36", mobile: "left-0 top-0 w-full min-h-28", size: "medium", layer: 8 }, variant: "crest", destination: destination("Open Creation", "Book Cover") },
    { id: "creation-spotlight", title: "The Red Reaper", eyebrow: "Creation spotlight", studio: "creation", geometry: { desktop: "left-[18%] top-[1%] w-[40%] min-h-[330px]", mobile: "left-0 top-[8rem] w-full min-h-[300px]", size: "hero", layer: 3 }, variant: "ink", destination: destination("Open character", "Character") },
    { id: "character-showcase", title: "Darrow of Lykos", eyebrow: "Character showcase", studio: "creation", geometry: { desktop: "left-[60%] top-[5%] w-[20%] min-h-[430px]", mobile: "left-0 top-[28rem] w-[58%] min-h-[350px]", size: "tall", layer: 5 }, variant: "paper", destination: destination("Open character", "Character") },
    { id: "heraldry-showcase", title: "House au Andromedus", eyebrow: "Heraldry", studio: "creation", geometry: { desktop: "left-[81%] top-[4%] w-[18%] min-h-52", mobile: "right-0 top-[28rem] w-[39%] min-h-52", size: "medium", layer: 6 }, variant: "crest", destination: destination("Open heraldry", "Heraldry") },
    { id: "map-showcase", title: "The Institute Grounds", eyebrow: "Map fragment", studio: "creation", geometry: { desktop: "left-[2%] top-[27%] w-[29%] min-h-56", mobile: "left-0 top-[50rem] w-full min-h-56", size: "wide", layer: 4 }, variant: "map", destination: destination("Open map", "Map") },
    { id: "creation-collection", title: "Collected fragments", eyebrow: "Creation collection", studio: "creation", geometry: { desktop: "left-[32%] top-[34%] w-[25%] min-h-44", mobile: "left-0 top-[66rem] w-[58%] min-h-44", size: "medium", layer: 7 }, variant: "signal", destination: destination("Browse creations", "Family Tree") },
    { id: "creation-pulse", title: "Creation pulse", eyebrow: "Inventory / activity", studio: "creation", geometry: { desktop: "left-[79%] top-[34%] w-[20%] min-h-32", mobile: "right-0 top-[66rem] w-[39%] min-h-44", size: "compact", layer: 9 }, variant: "type" },
    { id: "world-anchor", title: "World Building Studio", eyebrow: "Give the world weight", studio: "world", geometry: { desktop: "left-[1%] top-[54%] w-[19%] min-h-36", mobile: "left-0 top-[82rem] w-full min-h-28", size: "medium", layer: 10 }, variant: "signal", destination: destination("Open canon", "Canon Lore") },
    { id: "world-spotlight", title: "The Society", eyebrow: "World spotlight", studio: "world", geometry: { desktop: "left-[20%] top-[53%] w-[35%] min-h-[300px]", mobile: "left-0 top-[91rem] w-full min-h-64", size: "hero", layer: 2 }, variant: "ink", destination: destination("Open canon", "Canon Lore") },
    { id: "relationships", title: "Darrow / Sevro", eyebrow: "Relationships & connections", studio: "world", geometry: { desktop: "left-[56%] top-[52%] w-[43%] min-h-52", mobile: "left-0 top-[110rem] w-full min-h-52", size: "wide", layer: 8 }, variant: "paper", destination: destination("Open relationships", "Canon Lore") },
    { id: "location-window", title: "Luna", eyebrow: "Location window", studio: "world", geometry: { desktop: "left-[3%] top-[76%] w-[24%] min-h-48", mobile: "left-0 top-[128rem] w-[48%] min-h-48", size: "medium", layer: 5 }, variant: "map", destination: destination("Open location", "Map") },
    { id: "world-entity-window", title: "Sons of Ares", eyebrow: "World entity", studio: "world", geometry: { desktop: "left-[28%] top-[78%] w-[22%] min-h-40", mobile: "right-0 top-[128rem] w-[48%] min-h-48", size: "medium", layer: 6 }, variant: "signal", destination: destination("Open canon", "Canon Lore") },
    { id: "timeline-window", title: "The Rising", eyebrow: "History in motion", studio: "world", geometry: { desktop: "left-[51%] top-[75%] w-[31%] min-h-36", mobile: "left-0 top-[140rem] w-full min-h-40", size: "wide", layer: 4 }, variant: "type", destination: destination("Open history", "Canon Lore") },
    { id: "world-pulse", title: "World pulse", eyebrow: "Inventory / structure", studio: "world", geometry: { desktop: "left-[83%] top-[76%] w-[16%] min-h-56", mobile: "left-0 top-[151rem] w-full min-h-32", size: "tall", layer: 9 }, variant: "type" },
    { id: "writing-anchor", title: "Writing Studio", eyebrow: "Turn the world into story", studio: "writing", geometry: { desktop: "left-[1%] top-[91%] w-[18%] min-h-36", mobile: "left-0 top-[161rem] w-full min-h-28", size: "medium", layer: 10 }, variant: "type", destination: destination("Open writing", "Writing Studio") },
    { id: "writing-spotlight", title: "A pact in the dark", eyebrow: "Writing spotlight", studio: "writing", geometry: { desktop: "left-[19%] top-[91%] w-[30%] min-h-64", mobile: "left-0 top-[170rem] w-full min-h-64", size: "large", layer: 3 }, variant: "paper", destination: destination("Open scene beats", "Writing Studio") },
    { id: "chapter-reader", title: "Chapter One", eyebrow: "Chapter reader", studio: "writing", geometry: { desktop: "left-[50%] top-[89%] w-[32%] min-h-[330px]", mobile: "left-0 top-[188rem] w-full min-h-[330px]", size: "wide", layer: 5 }, variant: "paper", destination: destination("Open writing", "Writing Studio") },
    { id: "scene-beats", title: "Scene beats", eyebrow: "Beat sheet", studio: "writing", geometry: { desktop: "left-[83%] top-[90%] w-[16%] min-h-52", mobile: "left-0 top-[211rem] w-[48%] min-h-52", size: "tall", layer: 7 }, variant: "signal", destination: destination("Open scene beats", "Writing Studio") },
    { id: "draft-pipeline", title: "Beats → Final", eyebrow: "Draft pipeline", studio: "writing", geometry: { desktop: "left-[3%] top-[110%] w-[28%] min-h-36", mobile: "right-0 top-[211rem] w-[48%] min-h-52", size: "wide", layer: 6 }, variant: "type", destination: destination("Open drafts", "Writing Studio") },
    { id: "writing-profile", title: "FIRST PERSON", eyebrow: "Writing profile", studio: "writing", geometry: { desktop: "left-[32%] top-[111%] w-[25%] min-h-40", mobile: "left-0 top-[225rem] w-[48%] min-h-40", size: "medium", layer: 8 }, variant: "type", destination: destination("Open profile", "Writing Profile") },
    { id: "writing-pulse", title: "Writing pulse", eyebrow: "Output / progress", studio: "writing", geometry: { desktop: "left-[59%] top-[111%] w-[40%] min-h-32", mobile: "right-0 top-[225rem] w-[48%] min-h-40", size: "compact", layer: 9 }, variant: "signal" },
  ],
  creation: {
    characters: [
      { id: "darrow", title: "Darrow of Lykos", eyebrow: "Gold infiltrator", summary: "The Red Reaper learns to lead a war he was never meant to survive.", detail: "Helldiver · insurgent · lancer", image: "/red-rising/Darrow%20o%27%20Lykos.png", destination: destination("Open character", "Character") },
      { id: "virginia", title: "Virginia au Augustus", eyebrow: "Sovereign strategist", summary: "A mind built for the long game, carrying the cost of every alliance.", image: "/red-rising/Virginia%20au%20Augustus.PNG", destination: destination("Open character", "Character") },
      { id: "sevro", title: "Sevro au Barca", eyebrow: "Howler commander", summary: "A feral loyalty that turns survival into chosen family.", image: "/red-rising/Sevro.PNG", destination: destination("Open character", "Character") },
    ],
    heraldry: [{ id: "andromedus", title: "House au Andromedus", eyebrow: "Completed crest", summary: "A split sun over a black field, marked by a silver thorn.", image: "/armoria/preview.png", destination: destination("Open heraldry", "Heraldry") }],
    maps: [{ id: "institute", title: "The Institute Grounds", eyebrow: "Living map fragment", summary: "Frozen valleys, contested gates, and the route toward Olympus.", destination: destination("Open map", "Map") }],
    collections: [
      { id: "cover", title: "Red Rising", eyebrow: "Book cover", summary: "Caste, rebellion, empire.", image: "/red-rising/Darrow%20o%27%20Lykos.png", destination: destination("Open book cover", "Book Cover") },
      { id: "lineage", title: "The Augustus Line", eyebrow: "Family tree", summary: "Power travels through blood, marriage, and memory.", image: "/families/ravenshollow-banner.png", destination: destination("Open family tree", "Family Tree") },
    ],
  },
  world: {
    locations: [{ id: "luna", title: "Luna", eyebrow: "Society capital", summary: "A glittering center where every celebration hides a negotiation.", destination: destination("Open location", "Map") }],
    entities: [
      { id: "sons", title: "Sons of Ares", eyebrow: "Revolutionary network", summary: "An underground constellation of cells, debts, and impossible hope.", destination: destination("Open canon", "Canon Lore") },
      { id: "society", title: "The Society", eyebrow: "Solar empire", summary: "A caste machine that turns hierarchy into daily ritual.", destination: destination("Open canon", "Canon Lore") },
      { id: "obsidian", title: "Obsidian", eyebrow: "Species / culture", summary: "A people shaped by cold, distance, and inherited duty.", destination: destination("Open canon", "Canon Lore") },
    ],
    relationships: [{ id: "darrow-sevro", title: "Darrow ↔ Sevro", eyebrow: "Uneasy alliance", summary: "Trust forged under pressure", detail: "Weight 92 · Active · Mutual", destination: destination("Open relationships", "Canon Lore") }],
    timeline: [
      { id: "mines", title: "Life in the mines", eyebrow: "Before the Rising", summary: "The old world teaches obedience before it teaches names." },
      { id: "institute-era", title: "The Institute", eyebrow: "The rising begins", summary: "A school becomes a battlefield, then a rehearsal for revolution." },
      { id: "rising", title: "The Rising", eyebrow: "The turning point", summary: "The oppressed Colors begin to move as one." },
    ],
  },
  writing: {
    chapters: [{ id: "chapter-one", title: "Chapter One — The Institute", eyebrow: "2nd Draft · 27% complete", summary: "Darrow enters a landscape built to reward speed, calculation, and the appearance of certainty.", detail: "The first lesson is not announced: every student is already deciding who can be used, who can be trusted, and who must be removed.", destination: destination("Open writing", "Writing Studio") }],
    sceneBeats: [
      { id: "beat-01", title: "Enter chamber", eyebrow: "01", summary: "The doors close behind him." },
      { id: "beat-02", title: "Discover the map", eyebrow: "02", summary: "Every route has already been claimed." },
      { id: "beat-03", title: "Darius arrives", eyebrow: "03", summary: "A rival offers the wrong kind of smile." },
      { id: "beat-04", title: "Confrontation", eyebrow: "04", summary: "The room chooses its side." },
      { id: "beat-05", title: "Escape", eyebrow: "05", summary: "The first alliance costs blood." },
    ],
    drafts: [
      { id: "beats", title: "BEATS", eyebrow: "Complete", summary: "5 scene beats shaped" },
      { id: "draft-1", title: "1ST", eyebrow: "Complete", summary: "Chapter assembled" },
      { id: "draft-2", title: "2ND", eyebrow: "Active", summary: "Line edit in progress" },
      { id: "draft-3", title: "3RD", eyebrow: "Queued", summary: "Copy pass follows" },
      { id: "final", title: "FINAL", eyebrow: "Queued", summary: "Canon lock awaits" },
    ],
    profile: { id: "profile", title: "FIRST PERSON", eyebrow: "Writing profile", summary: "PRESENT TENSE · ACTIVE POV: RAY · CURRENT ARC: THRONEWAR" },
  },
  pulses: {
    creation: [
      { label: "Inventory", items: [{ label: "Characters", value: "12" }, { label: "Heraldry", value: "8" }, { label: "Maps", value: "3" }, { label: "Covers", value: "6" }, { label: "Family trees", value: "4" }] },
      { label: "Activity", items: [{ label: "This week", value: "3 creations" }, { label: "This month", value: "8 updated" }, { label: "Sessions", value: "14" }] },
      { label: "Recent", items: [{ label: "Character", value: "Darrow" }, { label: "Heraldry", value: "Andromedus" }, { label: "Map", value: "Institute" }] },
    ],
    world: [
      { label: "Inventory", items: [{ label: "Characters", value: "47" }, { label: "Locations", value: "21" }, { label: "Organizations", value: "12" }, { label: "Species", value: "8" }] },
      { label: "Structure", items: [{ label: "Relationships", value: "82" }, { label: "Eras", value: "7" }, { label: "Major events", value: "23" }, { label: "Languages", value: "9" }] },
      { label: "Activity", items: [{ label: "Canon updates", value: "4" }, { label: "Locations", value: "2 created" }, { label: "Relationships", value: "6 modified" }] },
    ],
    writing: [
      { label: "Output", items: [{ label: "Words", value: "48,291" }, { label: "Chapters", value: "27" }, { label: "Scenes", value: "143" }] },
      { label: "Progress", items: [{ label: "Draft complete", value: "62%" }, { label: "Finished", value: "9 chapters" }, { label: "Revised", value: "4 chapters" }] },
      { label: "Activity", items: [{ label: "This week", value: "3,241 words" }, { label: "Scenes", value: "2 completed" }, { label: "Last session", value: "Tonight" }] },
    ],
  },
}