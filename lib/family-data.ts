export type HouseId = "ravenshollow" | "vale" | "duskwater"

export type House = {
  id: HouseId
  name: string
  motto: string
  colorClass: string // tailwind text/border tint token for accents
  seat: string
}

export type FamilyMember = {
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
    name: "House Ravenshollow",
    motto: "We Watch, We Remember",
    colorClass: "text-primary",
    seat: "Corvath Keep",
  },
  vale: {
    id: "vale",
    name: "House Vale",
    motto: "Steadfast Through Storm",
    colorClass: "text-chart-2",
    seat: "Highmere",
  },
  duskwater: {
    id: "duskwater",
    name: "House Duskwater",
    motto: "The Tide Returns",
    colorClass: "text-chart-3",
    seat: "Saltreach",
  },
}

export const focusHouse: House = houses.ravenshollow

export const houseInfo = {
  founded: "312 AR",
  currentHead: "Lord Aldric Ravenshollow",
  seat: "Corvath Keep, the Ashen Marches",
  description:
    "An ancient northern house sworn to memory and vigilance, House Ravenshollow has warded the Ashen Marches for nine generations. Its lords are keepers of old oaths, and its ravens are said to carry the names of the dead so none are forgotten.",
}

// Members keyed by id. Generation is derived by tree position, not stored, so
// real lineage data can replace this without changing the layout contract.
export const members: Record<string, FamilyMember> = {
  aldric: {
    id: "aldric",
    name: "Lord Aldric Ravenshollow",
    portrait: "/families/aldric.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Lord of Corvath Keep",
    role: "Current Head",
    born: "270 AR",
    bio: "The ninth lord of his line, Aldric took the seat young after the Ashen Winter and has held it through three border wars. Stern and unbending in council, he is said to soften only before his grandchildren.",
    spouseId: "elira",
    childrenIds: ["corwin", "seraphine", "rowan"],
    connectedHouses: [{ houseId: "vale", relation: "by marriage to Lady Elira Vale" }],
  },
  elira: {
    id: "elira",
    name: "Lady Elira Vale",
    portrait: "/families/elira.png",
    birthHouse: "vale",
    house: "ravenshollow",
    title: "Lady of Corvath Keep",
    role: "Lady Consort",
    born: "274 AR",
    bio: "Born to House Vale of Highmere, Elira wed into Ravenshollow to seal a peace between the marches. She has since become its quiet strategist, keeping ledgers, alliances, and secrets in equal measure.",
    spouseId: "aldric",
    childrenIds: ["corwin", "seraphine", "rowan"],
    connectedHouses: [{ houseId: "vale", relation: "born of House Vale" }],
  },
  corwin: {
    id: "corwin",
    name: "Ser Corwin Ravenshollow",
    portrait: "/families/corwin.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Heir to Corvath Keep",
    role: "Heir Apparent",
    born: "296 AR",
    bio: "Eldest child and heir, Corwin earned his spurs on the Saltreach campaign. He carries the weight of the succession lightly in public and heavily in private.",
    parents: ["aldric", "elira"],
    spouseId: "mirena",
    childrenIds: ["alden", "nyla"],
    connectedHouses: [{ houseId: "duskwater", relation: "by marriage to Lady Mirena Duskwater" }],
  },
  mirena: {
    id: "mirena",
    name: "Lady Mirena Duskwater",
    portrait: "/families/mirena.png",
    birthHouse: "duskwater",
    house: "ravenshollow",
    title: "Lady of the Heir",
    role: "Married into House",
    born: "298 AR",
    bio: "A daughter of coastal House Duskwater, Mirena's marriage to Corwin bound the marches to the sea. Diplomatic and sharp-witted, she is a bridge between two very different courts.",
    spouseId: "corwin",
    childrenIds: ["alden", "nyla"],
    connectedHouses: [{ houseId: "duskwater", relation: "born of House Duskwater" }],
  },
  seraphine: {
    id: "seraphine",
    name: "Lady Seraphine Ravenshollow",
    portrait: "/families/seraphine.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Second Child",
    role: "Lady of Ravenshollow",
    born: "299 AR",
    bio: "Willful and clever, Seraphine has refused three betrothals and mastered the raven-tongue of the keep's oldest maesters. Where her path leads, no one at court can yet say.",
    parents: ["aldric", "elira"],
  },
  rowan: {
    id: "rowan",
    name: "Rowan Ravenshollow",
    portrait: "/families/rowan.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Youngest Child",
    role: "Scholar of the Keep",
    born: "303 AR",
    bio: "The youngest of Aldric's children, Rowan prefers the archives to the training yard. He is quietly assembling a history of the Ashen Marches that some fear will reveal too much.",
    parents: ["aldric", "elira"],
  },
  alden: {
    id: "alden",
    name: "Alden Ravenshollow",
    portrait: "/families/alden.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Grandson",
    role: "Second in Line",
    born: "318 AR",
    bio: "Named for his grandfather, young Alden is already fascinated by the ravens of Corvath Keep and the stories they are said to carry.",
    parents: ["corwin", "mirena"],
    connectedHouses: [{ houseId: "duskwater", relation: "through his mother, Lady Mirena" }],
  },
  nyla: {
    id: "nyla",
    name: "Nyla Ravenshollow",
    portrait: "/families/nyla.png",
    birthHouse: "ravenshollow",
    house: "ravenshollow",
    title: "Granddaughter",
    role: "Third in Line",
    born: "320 AR",
    bio: "Spirited and fearless, Nyla splits her time between the keep's battlements and her mother's tales of the tides at Saltreach.",
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
    couples: [{ id: "c-aldric-elira", members: ["aldric", "elira"] }],
  },
  {
    id: "gen-2",
    label: "Second Generation",
    couples: [
      { id: "c-corwin-mirena", members: ["corwin", "mirena"] },
      { id: "c-seraphine", members: ["seraphine"] },
      { id: "c-rowan", members: ["rowan"] },
    ],
  },
  {
    id: "gen-3",
    label: "Third Generation",
    couples: [
      { id: "c-alden", members: ["alden"] },
      { id: "c-nyla", members: ["nyla"] },
    ],
  },
]

export function memberHouse(m: FamilyMember): House {
  return houses[m.house]
}

export function birthHouseOf(m: FamilyMember): House {
  return houses[m.birthHouse]
}
