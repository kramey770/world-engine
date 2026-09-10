import {
  cloneElement,
  type ComponentType,
  type ReactElement,
  type SVGProps,
} from "react"

import { icons } from "@/world-engine-icons/src/App"

export type FantasyIconName =
  | "quill"
  | "tome"
  | "scroll"
  | "inkwell"
  | "manuscript"
  | "feather"
  | "edit"
  | "typewriter"
  | "map"
  | "castle"
  | "compass"
  | "mountain"
  | "dungeon"
  | "tavern"
  | "forest"
  | "ruins"
  | "lighthouse"
  | "bridge"
  | "character"
  | "crown"
  | "mask"
  | "knight"
  | "mage"
  | "bard"
  | "rogue"
  | "wand"
  | "crystal-ball"
  | "rune"
  | "potion"
  | "cauldron"
  | "amulet"
  | "spellbook"
  | "hourglass"
  | "crystal"
  | "eye"
  | "sword"
  | "shield"
  | "lantern"
  | "moon-stars"
  | "portal"
  | "dragon"
  | "dagger"
  | "arrow"
  | "skull"
  | "key"
  | "torch"
  | "ship"
  | "chapter"
  | "timeline"
  | "prophecy"
  | "artifact"
  | "plotthread"
  | "conflict"
  | "bookmark"
  | "lore-tag"
  | "notes"
  | "search"
  | "settings"
  | "export"
  | "home"
  | "lock"
  | "star"
  | "folder"
  | "notification"
  | "share"

export type FantasyIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  size?: number | string
}

const definitions = Object.fromEntries(icons.map((icon) => [icon.id, icon])) as Record<
  FantasyIconName,
  (typeof icons)[number]
>

export function FantasyIcon({ name, size = "1em", ...props }: FantasyIconProps & { name: FantasyIconName }) {
  const definition = definitions[name]

  if (!definition || !definition.svg) return null

  const artwork = definition.svg
  if (!isSvgElement(artwork)) return null

  return cloneElement(artwork, {
    ...props,
    width: props.width ?? size,
    height: props.height ?? size,
    "aria-hidden": props["aria-label"] ? undefined : true,
    focusable: "false",
  })
}

function isSvgElement(value: unknown): value is ReactElement<SVGProps<SVGSVGElement>> {
  return typeof value === "object" && value !== null && "type" in value && value.type === "svg"
}

function createIcon(name: FantasyIconName): ComponentType<FantasyIconProps> {
  const Icon = (props: FantasyIconProps) => <FantasyIcon name={name} {...props} />
  Icon.displayName = `Fantasy${name.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())}Icon`
  return Icon
}

export const Quill = createIcon("quill")
export const Tome = createIcon("tome")
export const Scroll = createIcon("scroll")
export const Inkwell = createIcon("inkwell")
export const Manuscript = createIcon("manuscript")
export const Feather = createIcon("feather")
export const Edit = createIcon("edit")
export const Typewriter = createIcon("typewriter")
export const Map = createIcon("map")
export const Castle = createIcon("castle")
export const Compass = createIcon("compass")
export const Mountain = createIcon("mountain")
export const Dungeon = createIcon("dungeon")
export const Tavern = createIcon("tavern")
export const Forest = createIcon("forest")
export const Ruins = createIcon("ruins")
export const Lighthouse = createIcon("lighthouse")
export const Bridge = createIcon("bridge")
export const Character = createIcon("character")
export const Crown = createIcon("crown")
export const Mask = createIcon("mask")
export const Knight = createIcon("knight")
export const Mage = createIcon("mage")
export const Bard = createIcon("bard")
export const Rogue = createIcon("rogue")
export const Wand = createIcon("wand")
export const CrystalBall = createIcon("crystal-ball")
export const Rune = createIcon("rune")
export const Potion = createIcon("potion")
export const Cauldron = createIcon("cauldron")
export const Amulet = createIcon("amulet")
export const Spellbook = createIcon("spellbook")
export const Hourglass = createIcon("hourglass")
export const Crystal = createIcon("crystal")
export const Eye = createIcon("eye")
export const Sword = createIcon("sword")
export const Shield = createIcon("shield")
export const Lantern = createIcon("lantern")
export const MoonStars = createIcon("moon-stars")
export const Portal = createIcon("portal")
export const Dragon = createIcon("dragon")
export const Dagger = createIcon("dagger")
export const Arrow = createIcon("arrow")
export const Skull = createIcon("skull")
export const Key = createIcon("key")
export const Torch = createIcon("torch")
export const Ship = createIcon("ship")
export const Chapter = createIcon("chapter")
export const Timeline = createIcon("timeline")
export const Prophecy = createIcon("prophecy")
export const Artifact = createIcon("artifact")
export const Plotthread = createIcon("plotthread")
export const Conflict = createIcon("conflict")
export const Bookmark = createIcon("bookmark")
export const LoreTag = createIcon("lore-tag")
export const Notes = createIcon("notes")
export const Search = createIcon("search")
export const Settings = createIcon("settings")
export const Export = createIcon("export")
export const Home = createIcon("home")
export const Lock = createIcon("lock")
export const Star = createIcon("star")
export const Folder = createIcon("folder")
export const Notification = createIcon("notification")
export const Share = createIcon("share")

export const FantasyIcons = {
  Quill,
  Tome,
  Scroll,
  Inkwell,
  Manuscript,
  Feather,
  Edit,
  Typewriter,
  Map,
  Castle,
  Compass,
  Mountain,
  Dungeon,
  Tavern,
  Forest,
  Ruins,
  Lighthouse,
  Bridge,
  Character,
  Crown,
  Mask,
  Knight,
  Mage,
  Bard,
  Rogue,
  Wand,
  CrystalBall,
  Rune,
  Potion,
  Cauldron,
  Amulet,
  Spellbook,
  Hourglass,
  Crystal,
  Eye,
  Sword,
  Shield,
  Lantern,
  MoonStars,
  Portal,
  Dragon,
  Dagger,
  Arrow,
  Skull,
  Key,
  Torch,
  Ship,
  Chapter,
  Timeline,
  Prophecy,
  Artifact,
  Plotthread,
  Conflict,
  Bookmark,
  LoreTag,
  Notes,
  Search,
  Settings,
  Export,
  Home,
  Lock,
  Star,
  Folder,
  Notification,
  Share,
} as const
