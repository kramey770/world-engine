export type HouseId = "ravenshollow" | "vale" | "duskwater"

export type House = {
  id: HouseId
  name: string
  motto: string
  colorClass: string // tailwind text/border tint token for accents
  seat: string
}

export type CanonConfidence = "confirmed" | "provisional" | "disputed" | "unknown"

export type CharacterCanonFields = {
  aliases?: string[]
  pronouns?: string
  classification?: string
  culture?: string
  origin?: string
  currentLocation?: string
  affiliations?: string[]
  languages?: string[]
  possessions?: string[]
  physicalDescription?: string
  voiceAndMannerisms?: string
  distinguishingTraits?: string[]
  canonSummary?: string
  desire?: string
  need?: string
  fear?: string
  coreValues?: string[]
  falseBelief?: string
  contradiction?: string
  moralBoundary?: string
  formativePressure?: string
  misunderstanding?: string
  changeTrigger?: string
  refusal?: string
  narrativeFunction?: string
  canonConfidence?: CanonConfidence
  openQuestions?: string[]
  researchNotes?: string
  authorNotes?: string
}

export type FamilyMember = CharacterCanonFields & {
  id: string
  name: string
  portrait: string
  birthHouse: HouseId
  /** House the member currently belongs to (birth house, unless married into another). */
  house: HouseId
  title: string
  role?: string
  born?: string
  died?: string
  bio: string
  parents?: string[] // member ids
  spouseId?: string
  childrenIds?: string[]
  /** Houses this member links the dynasty to, for the future interconnected-houses system. */
  connectedHouses?: { houseId: HouseId; relation: string }[]
}

export const houses: Record<HouseId, House> = {
  ravenshollow: {
    id: "ravenshollow",
    name: "House au Augustus",
    motto: "Order Through Excellence",
    colorClass: "text-primary",
    seat: "Luna",
  },
  vale: {
    id: "vale",
    name: "House au Bellona",
    motto: "Honor Before Victory",
    colorClass: "text-chart-2",
    seat: "Mars",
  },
  duskwater: {
    id: "duskwater",
    name: "House Barca",
    motto: "Fear Is a Choice",
    colorClass: "text-chart-3",
    seat: "The Rim",
  },
}

export const focusHouse: House = houses.ravenshollow

export const houseInfo = {
  founded: "312 AR",
  currentHead: "Virginia au Augustus",
  seat: "Luna, the Society's political center",
  description:
    "A study family for the Gold dynasties: House Augustus represents political legitimacy and reform from within, while its relationships with Bellona and Barca expose the costs of loyalty, rivalry, and revolution.",
}

// Members keyed by id. Generation is derived by tree position, not stored, so
// real lineage data can replace this without changing the layout contract.
export const members: Record<string, FamilyMember> = {
  aldric: {
    id: "aldric",
    name: "Nero au Augustus",
    portrait: "/families/aldric.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "ArchGovernor of Mars",
    role: "Rival Gold patriarch",
    born: "270 AR",
    bio: "A powerful Gold ruler whose political imagination is limited by his certainty that hierarchy is the only barrier against chaos. His ambition makes him formidable and his family relationships combustible.",
    spouseId: "elira",
    childrenIds: ["corwin", "seraphine", "rowan"],
    connectedHouses: [{ houseId: "vale", relation: "by marriage to Lady Elira Vale" }],
  },
  elira: {
    id: "elira",
    name: "Virginia au Augustus",
    portrait: "/families/elira.png",
    birthHouse: "vale",
    house: "ravenshollow",
    title: "Sovereign",
    role: "Strategist and reformer",
    born: "274 AR",
    bio: "A gifted strategist who must reconcile compassion, political responsibility, and the violence required to defeat the system that raised her. Her arc is useful for studying leadership after revolution.",
    spouseId: "aldric",
    childrenIds: ["corwin", "seraphine", "rowan"],
    connectedHouses: [{ houseId: "vale", relation: "born of House Vale" }],
  },
  corwin: {
    id: "corwin",
    name: "Cassius au Bellona",
    portrait: "/families/corwin.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Gold lancer and heir",
    role: "Rival turned ally",
    born: "296 AR",
    bio: "A brilliant warrior shaped by family honor and personal grief. Cassius begins as a rival, but his loyalties become more complicated as the cost of inherited conflict comes into view.",
    parents: ["aldric", "elira"],
    spouseId: "mirena",
    childrenIds: ["alden", "nyla"],
    connectedHouses: [{ houseId: "duskwater", relation: "by marriage to Lady Mirena Duskwater" }],
  },
  mirena: {
    id: "mirena",
    name: "Ephraim au Barca",
    portrait: "/families/mirena.png",
    birthHouse: "duskwater",
    house: "ravenshollow",
    title: "Howler veteran",
    role: "Barca family representative",
    born: "298 AR",
    bio: "A useful family-tree placeholder for the Barca line: a veteran whose cynicism and skill show how revolution leaves survivors carrying old grief into a new political order.",
    spouseId: "corwin",
    childrenIds: ["alden", "nyla"],
    connectedHouses: [{ houseId: "duskwater", relation: "born of House Duskwater" }],
  },
  seraphine: {
    id: "seraphine",
    name: "Atalantia au Grimmus",
    portrait: "/families/seraphine.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Fleet commander",
    role: "Ruling faction",
    born: "299 AR",
    bio: "A placeholder for the hardline Gold faction: disciplined, strategic, and committed to preserving the old hierarchy even as its foundations fail.",
    parents: ["aldric", "elira"],
  },
  rowan: {
    id: "rowan",
    name: "Daxo au Grimmus",
    portrait: "/families/rowan.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Gold heir",
    role: "Political wildcard",
    born: "303 AR",
    bio: "A placeholder for the younger generation of Gold leadership, useful for exploring whether privilege can be redirected toward reform or simply reproduces itself.",
    parents: ["aldric", "elira"],
  },
  alden: {
    id: "alden",
    name: "Darrow of Lykos",
    portrait: "/families/alden.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "The Reaper",
    role: "Red infiltrator and revolutionary leader",
    born: "318 AR",
    bio: "A Red miner transformed to pass as Gold and placed inside the Institute. Darrow's arc tests whether an infiltrator can defeat a system without becoming captive to its values.",
    parents: ["corwin", "mirena"],
    connectedHouses: [{ houseId: "duskwater", relation: "through his mother, Lady Mirena" }],
  },
  nyla: {
    id: "nyla",
    name: "Sevro au Barca",
    portrait: "/families/nyla.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Howler leader",
    role: "Insurgent commander",
    born: "320 AR",
    bio: "A sharp, feral, and fiercely loyal revolutionary whose outsider status becomes a source of tactical creativity. Sevro keeps the rebellion connected to people who distrust polished leadership.",
    parents: ["corwin", "mirena"],
    connectedHouses: [{ houseId: "duskwater", relation: "through her mother, Lady Mirena" }],
  },
}

// The tree is expressed as generations of "couples" (or single members), so the
// layout stays declarative and can later be generated from real relationship data.
export type TreeCouple = {
  id: string
  members: string[] // 1 or 2 member ids; 2 => a marriage
}

export type Generation = {
  id: string
  label: string
  couples: TreeCouple[]
}

export const generations: Generation[] = [
  {
    id: "gen-1",
    label: "First Generation",
    couples: [{ id: "c-nero-virginia", members: ["nero", "virginia"] }],
  },
  {
    id: "gen-2",
    label: "Second Generation",
    couples: [
      { id: "c-cassius-ephraim", members: ["cassius", "ephraim"] },
      { id: "c-atalantia", members: ["atalantia"] },
      { id: "c-rowan", members: ["rowan"] },
    ],
  },
  {
    id: "gen-3",
    label: "Third Generation",
    couples: [
      { id: "c-darrow", members: ["darrow"] },
      { id: "c-sevro", members: ["sevro"] },
    ],
  },
]

export function memberHouse(m: FamilyMember): House {
  return houses[m.house]
}

export function birthHouseOf(m: FamilyMember): House {
  return houses[m.birthHouse]
}
