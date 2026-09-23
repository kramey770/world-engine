export const redRisingImages = {
  default: "/default-canon-image.svg",
  mars: "/default-canon-image.svg",
  moon: "/default-canon-image.svg",
  earth: "/default-canon-image.svg",
  space: "/default-canon-image.svg",
  series: "/default-canon-image.svg",
  feature: "/default-canon-image.svg",
  cover: "/default-canon-image.svg",
  authorRedRising: "/default-canon-image.svg",
  authorSagaOne: "/default-canon-image.svg",
  authorSagaTwo: "/default-canon-image.svg",
  officialBanner: "/default-canon-image.svg",
  jackal: "/default-canon-image.svg",
  apollonius: "/default-canon-image.svg",
  ajax: "/default-canon-image.svg",
  alexandar: "/default-canon-image.svg",
} as const

const imageSets: Record<string, string[]> = Object.fromEntries(
  ["character", "location", "organization", "culture", "religion", "concept", "history", "calendar", "language", "government", "combat", "item", "species", "magic", "technology", "economics", "military"].map((category) => [category, [redRisingImages.default]]),
)

export function redRisingImage(category: string, _id: string): string {
  return imageSets[category]?.[0] ?? redRisingImages.default
}

export const redRisingDemo = {
  calendars: {},
  combat: {},
  concepts: {},
  cultures: {},
  governments: {},
  histories: {},
  items: {},
  knowledge: {},
  languages: {},
  locations: {},
  organizations: {},
  relationships: {},
  religions: {},
  research: {},
  species: {},
  systems: {},
} as const

export const redRisingSourceIds: string[] = []
