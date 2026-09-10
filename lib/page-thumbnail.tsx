"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { icons } from "@/world-engine-icons/src/App"
import type { FantasyIconName } from "@/lib/fantasy-icons"

export type ThumbnailSource = "none" | "uploaded" | "builtin"

export type PageThumbnail = {
  source: ThumbnailSource
  value?: string
}

export type BuiltInThumbnail = {
  id: string
  label: string
  src: string
  iconName?: FantasyIconName
}

export const BUILT_IN_ICON_IMAGES: BuiltInThumbnail[] = [
  { id: "family-alden", label: "Alden", src: "/families/alden.png" },
  { id: "family-aldric", label: "Aldric", src: "/families/aldric.png" },
  { id: "family-corwin", label: "Corwin", src: "/families/corwin.png" },
  { id: "family-elira", label: "Elira", src: "/families/elira.png" },
  { id: "family-mirena", label: "Mirena", src: "/families/mirena.png" },
  { id: "family-nyla", label: "Nyla", src: "/families/nyla.png" },
  { id: "family-rowan", label: "Rowan", src: "/families/rowan.png" },
  { id: "family-seraphine", label: "Seraphine", src: "/families/seraphine.png" },
  { id: "location-ashen-marches", label: "Ashen Marches", src: "/locations/ashen-marches.png" },
  { id: "location-corvath-keep", label: "Corvath Keep", src: "/locations/corvath-keep.png" },
  { id: "location-duskwater-hollow", label: "Duskwater Hollow", src: "/locations/duskwater-hollow.png" },
  { id: "portrait-adrius", label: "Adrius au Augustus", src: "/red-rising/Adrius%20au%20Augustus.PNG" },
  { id: "portrait-cassius", label: "Cassius au Bellona", src: "/red-rising/Cassius%20au%20Bellona.PNG" },
  { id: "portrait-darrow", label: "Darrow o' Lykos", src: "/red-rising/Darrow%20o%27%20Lykos.png" },
  { id: "portrait-eo", label: "Eo of Lykos", src: "/red-rising/Eo%20of%20Lykos.PNG" },
  { id: "portrait-ragnar", label: "Ragnar Volarus", src: "/red-rising/Ragnar%20Volarus.PNG" },
  { id: "portrait-sevro", label: "Sevro", src: "/red-rising/Sevro.PNG" },
  { id: "portrait-virginia", label: "Virginia au Augustus", src: "/red-rising/Virginia%20au%20Augustus.PNG" },
  ...icons.map((icon) => ({
    id: `fantasy-icon-${icon.id}`,
    label: icon.label,
    src: "",
    iconName: icon.id as FantasyIconName,
  })),
]

export const BUILT_IN_THUMBNAILS: BuiltInThumbnail[] = [
  ["BGI_Rain.JPG", "Rain Veil"], ["BGP_BlueWhite.JPG", "Blue Marble"], ["BGP_Brown.JPG", "Brown Wash"], ["BGP_GreenGold.JPG", "Gilded Moss"], ["BGP_GreenRedBlack.JPG", "Forest Ember"], ["BGP_PinkOrangeTan.JPG", "Sunset Blush"], ["BGP_PinkTanBrown.JPG", "Rose Earth"], ["BGP_TanOrangeBrown.JPG", "Autumn Clay"], ["BGP_TealOrange .JPG", "Teal Ember"], ["BGP_TealOrangeYellow.JPG", "Citrus Teal"],
  ["BG_ColorPallet.JPG", "Color Fields"], ["BG_ColorPallet2.JPG", "Prism Fields"], ["BG_ColorPallet3.JPG", "Muted Blocks"], ["BG_ColorPallet4.JPG", "Bright Blocks"], ["BG_ColorPallet5.JPG", "Jewel Blocks"], ["BG_Lava.JPG", "Molten Flow"], ["BG_OffWhite2.JPG", "Ivory Grain"], ["BG_Rainbow.JPG", "Rainbow Mist"], ["BG_YellowGold.JPG", "Golden Light"],
  ["BGT_Aqua.JPG", "Aqua Texture"], ["BGT_Black.JPG", "Black Grain"], ["BGT_Black2.JPG", "Black Slate"], ["BGT_Black3.JPG", "Black Veil"], ["BGT_Blue.JPG", "Blue Grain"], ["BGT_DarkPurple.JPG", "Violet Grain"], ["BGT_DarkRed.JPG", "Crimson Grain"], ["BGT_Demascus.JPG", "Damascus Steel"], ["BGT_Flames.JPG", "Flame Texture"], ["BGT_GrayBlack.JPG", "Ashen Grain"], ["BGT_Green.JPG", "Green Grain"], ["BGT_IceBlue.JPG", "Frozen Blue"], ["BGT_IceBlue2.JPG", "Glacier Grain"], ["BGT_IceBlue3.JPG", "Frosted Blue"], ["BGT_IceBlue4.JPG", "Polar Grain"], ["BGT_LeatherBlack.JPG", "Black Leather"], ["BGT_LeatherBrown.JPG", "Brown Leather"], ["BGT_LeatherGreen.JPG", "Green Leather"], ["BGT_LightEmerald.JPG", "Emerald Sheen"], ["BGT_Maroon.JPG", "Maroon Grain"], ["BGT_MetalBlack2.JPG", "Black Metal"], ["BGT_MetalCopper4.JPG", "Copper Patina"], ["BGT_MetalGold.JPG", "Gold Metal"], ["BGT_MetalGold2.JPG", "Antique Gold"], ["BGT_MetalGray.JPG", "Steel Grain"], ["BGT_MetalPurple.JPG", "Violet Metal"], ["BGT_MetalSilver.JPG", "Silver Metal"], ["BGT_OffWhite.JPG", "White Grain"], ["BGT_OffWhite3.JPG", "Chalk Grain"], ["BGT_OffWhite4.JPG", "Pearl Grain"], ["BGT_OffWhite5.JPG", "Parchment Grain"], ["BGT_OffWhite6.JPG", "Frost Grain"], ["BGT_OrangeYellow.JPG", "Amber Glow"], ["BGT_Red.JPG", "Red Grain"], ["BGT_Red2.JPG", "Scarlet Grain"], ["BGT_StoneBrickBlue.JPG", "Blue Brick"], ["BGT_StoneBrickLightBlue.JPG", "Frost Brick"], ["BGT_StoneEmerald.JPG", "Emerald Stone"], ["BGT_StoneGray.JPG", "Gray Stone"], ["BGT_StoneGray2.JPG", "Slate Stone"], ["BGT_StoneGray3.JPG", "Weathered Stone"], ["BGT_StoneGrayBlack.JPG", "Charcoal Stone"], ["BGT_StoneMarble.JPG", "Marble Stone"], ["BGT_TigerStripes.JPG", "Tiger Stripes"], ["BGT_TigerStripes2.JPG", "Bold Stripes"], ["BGT_White.JPG", "White Texture"], ["BGT_WoodDarkBrown.JPG", "Dark Wood"],
  ["CIT_Demascus.JPG", "Damascus Inlay"], ["CIT_MetalBlack.JPG", "Black Inlay"], ["CIT_MetalCopper.JPG", "Copper Inlay"], ["CIT_MetalCopper2.JPG", "Burnished Copper"], ["CIT_MetalCopper3.JPG", "Copper Swirl"], ["CIT_MetalGold3.JPG", "Gold Inlay"], ["CIT_MetalGray2.JPG", "Steel Inlay"], ["CIT_OffWhite6.JPG", "Ivory Inlay"], ["CIT_Orange.JPG", "Orange Inlay"], ["CIT_Orange2.JPG", "Amber Inlay"], ["CIT_Purple.JPG", "Violet Inlay"], ["CIT_WoodBrown.JPG", "Wood Inlay"],
].map(([filename, label]) => ({
  id: `cover-${filename}`,
  label,
  src: `/background%20%26%20cover%20assets/${encodeURIComponent(filename)}`,
}))

const STORAGE_KEY = "world-engine:page-thumbnails"
const FANTASY_ICON_PREFIX = "fantasy-icon:"

export function resolveBuiltInAsset(asset: BuiltInThumbnail): string {
  return asset.iconName ? `${FANTASY_ICON_PREFIX}${asset.iconName}` : asset.src
}

export function getFantasyIconName(value: string): FantasyIconName | null {
  if (!value.startsWith(FANTASY_ICON_PREFIX)) return null
  const name = value.slice(FANTASY_ICON_PREFIX.length)
  return icons.some((icon) => icon.id === name) ? (name as FantasyIconName) : null
}

type PageThumbnailContextValue = {
  getPageThumbnail: (pageId: string) => PageThumbnail
  setPageThumbnail: (pageId: string, thumbnail: PageThumbnail) => void
  getRecordCover: (recordId: string) => string
  setRecordCover: (recordId: string, value: string) => void
  applyCover: (sourceId: string, value: string, scope: "all" | "branch" | "current") => void
  removeCover: (sourceId: string, scope: "all" | "branch" | "current") => void
  builtInThumbnails: BuiltInThumbnail[]
}

const PageThumbnailContext = createContext<PageThumbnailContextValue | null>(null)

export function PageThumbnailProvider({ children }: { children: ReactNode }) {
  const [thumbnails, setThumbnails] = useState<Record<string, PageThumbnail>>({})
  const [recordCovers, setRecordCovers] = useState<Record<string, string>>({})
  const [coverDefaults, setCoverDefaults] = useState<{ all?: string; branches: Record<string, string> }>({ branches: {} })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, unknown>
        if (parsed.pages && typeof parsed.pages === "object") {
          setThumbnails(parsed.pages as Record<string, PageThumbnail>)
          setRecordCovers((parsed.records ?? {}) as Record<string, string>)
          setCoverDefaults((parsed.coverDefaults ?? { branches: {} }) as { all?: string; branches: Record<string, string> })
        } else setThumbnails(parsed as Record<string, PageThumbnail>)
      }
    } catch {
      // Ignore malformed or unavailable browser storage.
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ pages: thumbnails, records: recordCovers, coverDefaults }))
  }, [coverDefaults, hydrated, recordCovers, thumbnails])

  const getPageThumbnail = useCallback(
    (pageId: string): PageThumbnail => thumbnails[pageId] ?? (coverDefaults.branches[pageId] ? { source: "uploaded", value: coverDefaults.branches[pageId] } : coverDefaults.all ? { source: "uploaded", value: coverDefaults.all } : { source: "none" }),
    [coverDefaults, thumbnails],
  )
  const setPageThumbnail = useCallback((pageId: string, thumbnail: PageThumbnail) => {
    setThumbnails((previous) => ({ ...previous, [pageId]: thumbnail }))
  }, [])
  const getRecordCover = useCallback((recordId: string) => Object.prototype.hasOwnProperty.call(recordCovers, recordId) ? recordCovers[recordId] : coverDefaults.branches[recordId.split(":")[0]] ?? coverDefaults.all ?? "", [coverDefaults, recordCovers])
  const setRecordCover = useCallback((recordId: string, value: string) => {
    setRecordCovers((previous) => ({ ...previous, [recordId]: value }))
  }, [])
  const applyCover = useCallback((sourceId: string, value: string, scope: "all" | "branch" | "current") => {
    const [sourceType, sourceValue] = sourceId.split(":")
    const branch = sourceType === "page" ? sourceValue : sourceType
    if (scope === "current") {
      if (sourceType === "page") setThumbnails((previous) => ({ ...previous, [sourceValue]: { source: "uploaded", value } }))
      else setRecordCovers((previous) => ({ ...previous, [sourceId]: value }))
      return
    }
    if (scope === "branch") {
      setCoverDefaults((previous) => ({ ...previous, branches: { ...previous.branches, [branch]: value } }))
      setThumbnails((previous) => ({ ...previous, [branch]: { source: "uploaded", value } }))
      setRecordCovers((previous) => Object.fromEntries(Object.entries(previous).filter(([id]) => !id.startsWith(`${branch}:`))))
      return
    }
    if (scope === "all") {
      setCoverDefaults({ all: value, branches: {} })
      setThumbnails({})
      setRecordCovers({})
    }
  }, [])
  const removeCover = useCallback((sourceId: string, scope: "all" | "branch" | "current") => {
    const [sourceType, sourceValue] = sourceId.split(":")
    const branch = sourceType === "page" ? sourceValue : sourceType
    if (scope === "current") {
      if (sourceType === "page") setThumbnails((previous) => ({ ...previous, [sourceValue]: { source: "none" } }))
      else setRecordCovers((previous) => ({ ...previous, [sourceId]: "" }))
    } else if (scope === "branch") {
      setCoverDefaults((previous) => ({ ...previous, branches: Object.fromEntries(Object.entries(previous.branches).filter(([id]) => id !== branch)) }))
      setThumbnails((previous) => Object.fromEntries(Object.entries(previous).filter(([id]) => id !== branch)))
      setRecordCovers((previous) => Object.fromEntries(Object.entries(previous).filter(([id]) => !id.startsWith(`${branch}:`))))
    } else {
      setCoverDefaults({ branches: {} })
      setThumbnails({})
      setRecordCovers({})
    }
  }, [])

  const value = useMemo(
    () => ({ getPageThumbnail, setPageThumbnail, getRecordCover, setRecordCover, applyCover, removeCover, builtInThumbnails: BUILT_IN_THUMBNAILS }),
    [applyCover, getPageThumbnail, getRecordCover, removeCover, setPageThumbnail, setRecordCover],
  )

  return <PageThumbnailContext.Provider value={value}>{children}</PageThumbnailContext.Provider>
}

export function usePageThumbnail() {
  const context = useContext(PageThumbnailContext)
  if (!context) throw new Error("usePageThumbnail must be used within a PageThumbnailProvider")
  return context
}

export function resolvePageThumbnail(thumbnail: PageThumbnail): string {
  if (thumbnail.source === "uploaded") return thumbnail.value ?? ""
  if (thumbnail.source === "builtin") {
    const asset = [...BUILT_IN_ICON_IMAGES, ...BUILT_IN_THUMBNAILS].find((candidate) => candidate.id === thumbnail.value)
    return asset ? resolveBuiltInAsset(asset) : ""
  }
  return ""
}
