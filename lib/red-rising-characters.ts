import type { FamilyMember } from "./family-data"

const portrait = (id: string) => {
  const sourcePortraits: Record<string, string> = {
    darrow: "/red-rising/Darrow o' Lykos.png",
    eo: "/red-rising/Eo of Lykos.PNG",
    virginia: "/red-rising/Virginia au Augustus.PNG",
    sevro: "/red-rising/Sevro.PNG",
    cassius: "/red-rising/Cassius au Bellona.PNG",
    adrius: "/red-rising/Adrius au Augustus.PNG",
    ragnar: "/red-rising/Ragnar Volarus.PNG",
  }
  return sourcePortraits[id] ?? ""
}

function person(
  id: string,
  name: string,
  title: string,
  role: string,
  bio: string,
  options: Partial<FamilyMember> = {},
): FamilyMember {
  return {
    id,
    name,
    portrait: portrait(id),
    birthHouse: options.birthHouse ?? "ravenshollow",
    house: options.house ?? "ravenshollow",
    title,
    role,
    bio,
    born: options.born,
    died: options.died,
    parents: options.parents,
    spouseId: options.spouseId,
    childrenIds: options.childrenIds,
    connectedHouses: options.connectedHouses,
  }
}

export const redRisingCharacters: Record<string, FamilyMember> = {
  darrow: person("darrow", "Darrow au Andromedus", "The Reaper", "Red revolutionary, Gold infiltrator, and leader", "Born a Helldiver in Lykos, Darrow is remade to pass as Gold after Eo's execution. His central conflict is whether liberation can be won through the command, violence, and myth-making of the ruling class without reproducing them.", { house: "ravenshollow", born: "Before the Rising" }),
  eo: person("eo", "Eo of Lykos", "Singer of the Mines", "Darrow's wife and revolutionary catalyst", "Eo refuses to accept the narrow life assigned to Mars's Reds. Her death and song become the emotional and political spark that sends Darrow into the Sons of Ares.", { house: "ravenshollow", died: "Before Darrow enters the Institute", spouseId: "darrow" }),
  virginia: person("virginia", "Virginia au Augustus", "Sovereign / Mustang", "Strategist, reformer, and republican leader", "Virginia combines elite education with an unusually wide moral and political imagination. She must govern people who distrust Gold power while confronting the costs of building a republic during permanent war.", { house: "ravenshollow", role: "Strategist, reformer, and republican leader", spouseId: "darrow" }),
  sevro: person("sevro", "Sevro au Barca", "Goblin / Howler commander", "Insurgent commander and Darrow's closest friend", "Sevro's ferocity, humor, and suspicion of polished authority keep the Rising connected to people who do not trust Gold manners. His loyalty is personal, political, and repeatedly tested by grief.", { birthHouse: "duskwater", house: "duskwater", connectedHouses: [{ houseId: "duskwater", relation: "Barca family" }] }),
  cassius: person("cassius", "Cassius au Bellona", "Morning Knight", "Duelist, rival, and reluctant ally", "Cassius begins as an heir shaped by honor and revenge. His relationship with Darrow moves through deception, grief, respect, and the possibility that personal virtue can survive a corrupt political inheritance.", { birthHouse: "vale", house: "vale" }),
  ragnar: person("ragnar", "Ragnar Volarus", "Storm Knight", "Obsidian warrior and rebel ally", "Ragnar is a formidable Obsidian warrior whose loyalty to the Rising grows beyond the role imposed on him by Gold command. His strength is paired with discipline, tenderness, and a clear moral judgment about freedom.", { birthHouse: "duskwater", house: "duskwater" }),
  nero: person("nero", "Nero au Augustus", "ArchGovernor of Mars", "Authoritarian Gold ruler", "Nero believes hierarchy is the only defense against chaos. His political power rests on Mars, family control, and the assumption that fear can substitute for legitimacy.", { house: "ravenshollow" }),
  adrius: person("adrius", "Adrius au Augustus", "The Jackal", "Strategist, torturer, and political enemy", "Adrius treats people and institutions as mechanisms to be broken and rebuilt under his control. His intelligence is inseparable from paranoia, cruelty, and the need to prove superiority over every rival.", { house: "ravenshollow", role: "Strategist and political enemy" }),
  lysander: person("lysander", "Lysander au Lune", "Heir of the Sovereignty", "Gold heir and contested political claimant", "Lysander carries the education and nostalgia of the old order into a world where it has been declared illegitimate. His narrative tests whether reform from inherited privilege can become restoration.", { house: "ravenshollow" }),
  ephraim: person("ephraim", "Ephraim ti Horn", "Former Howler", "Smuggler, survivor, and reluctant mentor", "Ephraim is shaped by trauma, addiction, and the moral debris of the Rising. His later choices show how revolutionary victory leaves ordinary survivors with private losses that political histories flatten.", { birthHouse: "duskwater", house: "duskwater" }),
  lyria: person("lyria", "Lyria of Lagalos", "Red refugee", "Worker, survivor, and political witness", "Lyria experiences the Republic from below rather than from command decks. Her anger exposes how liberation can fail to become safety, dignity, or agency for the people who paid for it.", { house: "duskwater" }),
  pax: person("pax", "Pax au Telemanus", "Telemanus heir", "Young Gold and later political heir", "Pax inherits the warmth and loyalty of House Telemanus while growing up inside the violence of the Republic's unfinished revolution. He represents the next generation's burden of inherited names.", { house: "ravenshollow" }),
  alexandar: person("alexandar", "Alexandar au Arcos", "Rim commander", "Rim Gold officer and ally", "Alexandar embodies the Rim's military tradition and its distance from Core politics. His loyalty is filtered through house, fleet, honor, and the question of whether Core liberation includes the frontier.", { house: "duskwater" }),
  diomedes: person("diomedes", "Diomedes au Raa", "Rim heir", "Rim warrior and political figure", "Diomedes is defined by discipline, family obligation, and the political weight of Rim history. His choices force the central powers to confront a society they cannot simply absorb into Core categories.", { house: "duskwater" }),
  atalantia: person("atalantia", "Atalantia au Grimmus", "Olympic Knight", "Hardline Gold commander", "Atalantia represents the strategic and ideological persistence of Gold supremacy after the Society's apparent defeat. She uses military order and fear to make restoration look like stability.", { house: "ravenshollow" }),
  ajax: person("ajax", "Ajax au Grimmus", "Olympic Knight", "Gold warrior and hardliner", "Ajax is a weaponized heir whose identity is bound to the Grimmus war machine. His record is useful for testing the relationship between personal combat skill, family command, and ideological violence.", { house: "ravenshollow" }),
  apollonius: person("apollonius", "Apollonius au Valii-Rath", "The Minotaur", "Independent Gold warlord", "Apollonius turns theatrical self-mythology into a form of power. He is dangerous because he is neither a simple loyalist nor a reformer: he treats politics as an arena for appetite, spectacle, and personal sovereignty.", { house: "vale" }),
  rhone: person("rhone", "Rhone ti Raa", "Howler and bodyguard", "Soldier caught between duty and conscience", "Rhone is a trained protector whose loyalty is shaped by orders, comradeship, and the human consequences of serving powerful people. He is useful for testing character knowledge under command pressure.", { house: "duskwater" }),
  kavax: person("kavax", "Kavax au Telemanus", "Lord of House Telemanus", "Gold ally and patriarch", "Kavax demonstrates a version of Gold authority that values loyalty and generosity while remaining entangled in privilege. His household becomes a bridge between elite power and the coalition against tyranny.", { house: "ravenshollow" }),
  holiday: person("holiday", "Holiday ti Nakamura", "Valkyrie", "Republican officer and soldier", "Holiday is a disciplined veteran whose service survives the transition from rebellion to state. Her record tests military loyalty, institutional change, and the cost of command for people without dynastic protection.", { house: "duskwater" }),
  trigg: person("trigg", "Trigg ti Nakamura", "Howler", "Soldier and brother", "Trigg's life is bound to the Howlers and to the losses that shape their family. He is important as a relationship node because his memory continues to influence later choices.", { house: "duskwater" }),
  teo: person("teo", "Theodora au Grimmus", "Political operative", "Spy, aide, and survivor", "Theodora works in the space between public power and clandestine action. Her record exposes the invisible labor that allows revolutionary leaders and ruling houses to function.", { house: "ravenshollow" }),
  harmony: person("harmony", "Harmony", "Sons of Ares operative", "Revolutionary organizer", "Harmony represents the harsher and more vengeful currents within the Sons of Ares. Her politics test whether shared oppression guarantees shared methods or shared ethics.", { house: "duskwater" }),
  ares: person("ares", "Ares", "Founder of the Sons of Ares", "Revolutionary symbol and network leader", "Ares is partly person, partly title, and partly constructed myth. The identity demonstrates how underground movements distribute agency between secret leaders, cells, and symbols.", { house: "duskwater" }),
  octavia: person("octavia", "Octavia au Lune", "Sovereign", "Last major ruler of the Society", "Octavia governs through dynastic legitimacy, military force, and political theater. Her rule illustrates both the reach of the old system and the fragility hidden beneath its ceremony.", { house: "ravenshollow" }),
  fitchner: person("fitchner", "Fitchner au Barca", "Ares", "Gold mentor and revolutionary leader", "Fitchner crosses the boundary between Gold institution and Red rebellion. His hidden identity and strategic patience make him a central test case for secrecy, parenthood, and revolutionary compromise.", { birthHouse: "duskwater", house: "duskwater", childrenIds: ["sevro"] }),
}
