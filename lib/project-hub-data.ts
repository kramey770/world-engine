import type { ProjectSection } from "@/components/project-home"
import type { ProjectHubData } from "@/components/project-home/hub/hub-types"

const destination = (label: string, section: ProjectSection) => ({ label, section })
const comingSoon = (id: string, title: string, eyebrow: string, section?: ProjectSection) => ({
  id,
  title,
  eyebrow,
  summary: `${title} coming soon`,
  destination: section ? destination(`Open ${title}`, section) : undefined,
})

export const projectHubData: ProjectHubData = {
  focusOptions: [
    { id: "recent", label: "Recent", mode: "recent" },
    { id: "ray", label: "Storyline A", mode: "storyline" },
    { id: "orion", label: "Storyline B", mode: "storyline" },
    { id: "storyline-c", label: "Storyline C", mode: "storyline" },
    { id: "storyline-d", label: "Storyline D", mode: "storyline" },
  ],
  boxes: [
    { id: "creation-anchor", title: "Creation Studio", eyebrow: "Make the visible world", studio: "creation", geometry: { desktop: "left-[1%] top-[4%] w-[17%] min-h-36", mobile: "left-0 top-0 w-full min-h-28", size: "medium", layer: 8 }, variant: "crest", destination: destination("Open Creation", "Book Cover") },
    { id: "creation-spotlight", title: "Creation spotlight", eyebrow: "Creation spotlight", studio: "creation", geometry: { desktop: "left-[18%] top-[1%] w-[40%] min-h-[330px]", mobile: "left-0 top-[8rem] w-full min-h-[300px]", size: "hero", layer: 3 }, variant: "ink", destination: destination("Open creation", "Character") },
    { id: "character-showcase", title: "Character data coming soon", eyebrow: "Character showcase", studio: "creation", geometry: { desktop: "left-[60%] top-[5%] w-[20%] min-h-[430px]", mobile: "left-0 top-[28rem] w-[58%] min-h-[350px]", size: "tall", layer: 5 }, variant: "paper", destination: destination("Open character", "Character") },
    { id: "heraldry-showcase", title: "Heraldry coming soon", eyebrow: "Heraldry", studio: "creation", geometry: { desktop: "left-[81%] top-[4%] w-[18%] min-h-52", mobile: "right-0 top-[28rem] w-[39%] min-h-52", size: "medium", layer: 6 }, variant: "crest", destination: destination("Open heraldry", "Heraldry") },
    { id: "map-showcase", title: "Map coming soon", eyebrow: "Map fragment", studio: "creation", geometry: { desktop: "left-[2%] top-[27%] w-[29%] min-h-56", mobile: "left-0 top-[50rem] w-full min-h-56", size: "wide", layer: 4 }, variant: "map", destination: destination("Open map", "Map") },
    { id: "creation-collection", title: "Creation collection", eyebrow: "Creation collection", studio: "creation", geometry: { desktop: "left-[32%] top-[34%] w-[25%] min-h-44", mobile: "left-0 top-[66rem] w-[58%] min-h-44", size: "medium", layer: 7 }, variant: "signal", destination: destination("Browse creations", "Family Tree") },
    { id: "creation-pulse", title: "Creation pulse", eyebrow: "Inventory / activity", studio: "creation", geometry: { desktop: "left-[79%] top-[34%] w-[20%] min-h-32", mobile: "right-0 top-[66rem] w-[39%] min-h-44", size: "compact", layer: 9 }, variant: "type" },
    { id: "world-anchor", title: "World Building Studio", eyebrow: "Give the world weight", studio: "world", geometry: { desktop: "left-[1%] top-[54%] w-[19%] min-h-36", mobile: "left-0 top-[82rem] w-full min-h-28", size: "medium", layer: 10 }, variant: "signal", destination: destination("Open canon", "Canon Lore") },
    { id: "world-spotlight", title: "World spotlight", eyebrow: "World spotlight", studio: "world", geometry: { desktop: "left-[20%] top-[53%] w-[35%] min-h-[300px]", mobile: "left-0 top-[91rem] w-full min-h-64", size: "hero", layer: 2 }, variant: "ink", destination: destination("Open canon", "Canon Lore") },
    { id: "relationships", title: "Relationships coming soon", eyebrow: "Relationships & connections", studio: "world", geometry: { desktop: "left-[56%] top-[52%] w-[43%] min-h-52", mobile: "left-0 top-[110rem] w-full min-h-52", size: "wide", layer: 8 }, variant: "paper", destination: destination("Open relationships", "Canon Lore") },
    { id: "location-window", title: "Location coming soon", eyebrow: "Location window", studio: "world", geometry: { desktop: "left-[3%] top-[76%] w-[24%] min-h-48", mobile: "left-0 top-[128rem] w-[48%] min-h-48", size: "medium", layer: 5 }, variant: "map", destination: destination("Open location", "Map") },
    { id: "world-entity-window", title: "World entities coming soon", eyebrow: "World entity", studio: "world", geometry: { desktop: "left-[28%] top-[78%] w-[22%] min-h-40", mobile: "right-0 top-[128rem] w-[48%] min-h-48", size: "medium", layer: 6 }, variant: "signal", destination: destination("Open canon", "Canon Lore") },
    { id: "timeline-window", title: "Timeline coming soon", eyebrow: "History in motion", studio: "world", geometry: { desktop: "left-[51%] top-[75%] w-[31%] min-h-36", mobile: "left-0 top-[140rem] w-full min-h-40", size: "wide", layer: 4 }, variant: "type", destination: destination("Open history", "Canon Lore") },
    { id: "world-pulse", title: "World pulse", eyebrow: "Inventory / structure", studio: "world", geometry: { desktop: "left-[83%] top-[76%] w-[16%] min-h-56", mobile: "left-0 top-[151rem] w-full min-h-32", size: "tall", layer: 9 }, variant: "type" },
    { id: "writing-anchor", title: "Writing Studio", eyebrow: "Turn the world into story", studio: "writing", geometry: { desktop: "left-[1%] top-[91%] w-[18%] min-h-36", mobile: "left-0 top-[161rem] w-full min-h-28", size: "medium", layer: 10 }, variant: "type", destination: destination("Open writing", "Writing Studio") },
    { id: "writing-spotlight", title: "Writing spotlight", eyebrow: "Writing spotlight", studio: "writing", geometry: { desktop: "left-[19%] top-[91%] w-[30%] min-h-64", mobile: "left-0 top-[170rem] w-full min-h-64", size: "large", layer: 3 }, variant: "paper", destination: destination("Open writing", "Writing Studio") },
    { id: "chapter-reader", title: "Chapter reader coming soon", eyebrow: "Chapter reader", studio: "writing", geometry: { desktop: "left-[50%] top-[89%] w-[32%] min-h-[330px]", mobile: "left-0 top-[188rem] w-full min-h-[330px]", size: "wide", layer: 5 }, variant: "paper", destination: destination("Open writing", "Writing Studio") },
    { id: "scene-beats", title: "Scene Beats coming soon", eyebrow: "Beat sheet", studio: "writing", geometry: { desktop: "left-[83%] top-[90%] w-[16%] min-h-52", mobile: "left-0 top-[211rem] w-[48%] min-h-52", size: "tall", layer: 7 }, variant: "signal", destination: destination("Open scene beats", "Writing Studio") },
    { id: "draft-pipeline", title: "Draft pipeline coming soon", eyebrow: "Draft pipeline", studio: "writing", geometry: { desktop: "left-[3%] top-[110%] w-[28%] min-h-36", mobile: "right-0 top-[211rem] w-[48%] min-h-52", size: "wide", layer: 6 }, variant: "type", destination: destination("Open drafts", "Writing Studio") },
    { id: "writing-profile", title: "Writing Profile coming soon", eyebrow: "Writing profile", studio: "writing", geometry: { desktop: "left-[32%] top-[111%] w-[25%] min-h-40", mobile: "left-0 top-[225rem] w-[48%] min-h-40", size: "medium", layer: 8 }, variant: "type", destination: destination("Open profile", "Writing Profile") },
    { id: "writing-pulse", title: "Writing pulse", eyebrow: "Output / progress", studio: "writing", geometry: { desktop: "left-[59%] top-[111%] w-[40%] min-h-32", mobile: "right-0 top-[225rem] w-[48%] min-h-40", size: "compact", layer: 9 }, variant: "signal" },
  ],
  creation: {
    characters: [comingSoon("character", "Character data", "Character showcase", "Character")],
    heraldry: [comingSoon("heraldry", "Heraldry", "Completed crest", "Heraldry")],
    maps: [comingSoon("map", "Map", "Living map fragment", "Map")],
    collections: [comingSoon("collection", "Creation collection", "Creation work", "Family Tree")],
  },
  world: {
    locations: [comingSoon("location", "Location", "Location window", "Map")],
    entities: [comingSoon("entity", "World entities", "Canon entity", "Canon Lore")],
    relationships: [comingSoon("relationship", "Relationships & Connections", "Connection study", "Canon Lore")],
    timeline: [comingSoon("timeline", "Timeline", "History in motion", "Canon Lore")],
  },
  writing: {
    chapters: [{ ...comingSoon("chapter", "Chapter reader", "Chapter reader", "Writing Studio"), body: "Chapter text will appear here when this project has writing data.", metadata: ["Chapter context pending"] }],
    sceneBeats: [comingSoon("scene-beats", "Scene Beats", "Beat sheet", "Writing Studio")],
    drafts: [
      comingSoon("beats", "BEATS", "Scene Beats", "Writing Studio"),
      comingSoon("draft-1", "1ST", "1st Draft", "Writing Studio"),
      comingSoon("draft-2", "2ND", "2nd Draft", "Writing Studio"),
      comingSoon("draft-3", "3RD", "3rd Draft", "Writing Studio"),
      comingSoon("final", "FINAL", "Final Draft", "Writing Studio"),
    ],
    profile: comingSoon("profile", "Writing Profile", "Writing profile", "Writing Profile"),
  },
  pulses: {
    creation: [{ label: "Awaiting project data", items: [{ label: "Characters", value: "Coming soon" }, { label: "Heraldry", value: "Coming soon" }] }],
    world: [{ label: "Awaiting project data", items: [{ label: "Canon", value: "Coming soon" }, { label: "Relationships", value: "Coming soon" }] }],
    writing: [{ label: "Awaiting project data", items: [{ label: "Chapters", value: "Coming soon" }, { label: "Scenes", value: "Coming soon" }] }],
  },
}
