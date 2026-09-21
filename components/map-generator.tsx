"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import {
  AlertCircle,
  ArrowLeft,
  Crosshair,
  ChevronDown,
  ChevronUp,
  Database,
  Globe2,
  Hammer,
  LoaderCircle,
  Maximize2,
  Map,
  MapPin,
  Minimize2,
  PanelTop,
  Plus,
  RefreshCw,
  SlidersHorizontal,
  Swords,
  X,
} from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { UserMenu } from "@/components/user-menu"
import { Logo } from "@/components/logo"
import * as WorldEngineIcons from "@/components/world-engine-map-icons"
import { useLocationCanon } from "@/lib/location-canon"
import type { CanonLocation } from "@/lib/location-canon"
import {
  isMapEngineCommand,
  isMapEngineMessage,
  type CreationState,
  type CreationTool,
  type MapLayerState,
  type MapSettlementSummary,
  type MapSurfaceState,
  MAP_LAYER_PRESETS,
  MAP_QUICK_LAYERS,
  MAP_SURFACE_OPEN_IDS,
  type MapQuickLayerId,
} from "@/lib/map-creator-bridge"

const navigation = [
  { label: "Edit", icon: Hammer, description: "Open map editors and overviews." },
  { label: "Regenerate", icon: RefreshCw, description: "Rebuild selected map features." },
  { label: "Settings", icon: Swords, description: "Configure world and application settings." },
] as const

const nativeToolGroups = [
  {
    label: "Edit",
    controls: [
      ["editBiomesButton", "Biomes"], ["overviewBurgsButton", "Burgs"], ["editCoastlineSettings", "Coastlines"],
      ["editCulturesButton", "Cultures"], ["editDiplomacyButton", "Diplomacy"], ["editEmblemButton", "Emblems"],
      ["editGoods", "Goods"], ["editHeightmapButton", "Heightmap"], ["overviewMarkersButton", "Markers"], ["overviewCharactersButton", "Characters"],
      ["overviewMarketsButton", "Markets"], ["editMeasurersButton", "Measurers"], ["overviewLabelsButton", "Labels"],
      ["overviewMilitaryButton", "Military"], ["editNamesBaseButton", "Names"], ["editNotesButton", "Notes"],
      ["editProvincesButton", "Provinces"], ["editReligions", "Religions"], ["overviewRiversButton", "Rivers"],
      ["overviewRoutesButton", "Routes"], ["editStatesButton", "States"], ["editTradeAnimationButton", "Trade"],
      ["editUnitsButton", "Units"], ["editZonesButton", "Zones"],
    ],
  },
  {
    label: "Regenerate",
    controls: [
      ["regenerateBurgs", "Burgs"], ["regenerateCultures", "Cultures"], ["regenerateEconomy", "Economy"],
      ["regenerateEmblems", "Emblems"], ["regenerateGoods", "Goods"], ["regenerateIce", "Ice"],
      ["regenerateStateLabels", "State labels"], ["regenerateMarkers", "Markers"], ["regenerateMarkets", "Markets"],
      ["regenerateMilitary", "Military"], ["regeneratePopulation", "Population"], ["regenerateProduction", "Production"],
      ["regenerateProvinces", "Provinces"], ["regenerateReliefIcons", "Relief"], ["regenerateReligions", "Religions"],
      ["regenerateRivers", "Rivers"], ["regenerateRoutes", "Routes"], ["regenerateStates", "States"], ["regenerateZones", "Zones"],
    ],
  },
  {
    label: "Add",
    controls: [
      ["addBurgTool", "Burg"], ["addLabel", "Label"], ["addMarker", "Point of Interest"], ["addCharacterTool", "Character"], ["addRiver", "River"], ["addRoute", "Route"],
    ],
  },
  {
    label: "Show",
    controls: [
      ["overviewCellsButton", "Cells"], ["overviewChartsButton", "Charts"], ["openMinimapButton", "Minimap"],
    ],
  },
  {
    label: "Create",
    controls: [
      ["openSubmapTool", "Submap"], ["openTransformTool", "Transform"],
    ],
  },
  {
    label: "Heightmap",
    controls: [
      ["heightmapPreview", "Heightmap preview"], ["heightmap3DView", "Heightmap 3D"], ["finalizeHeightmap", "Finish heightmap"],
    ],
  },
  {
    label: "Settings",
    controls: [["configureWorld", "Configure world"], ["restoreDefaultCanvasSize", "Default canvas"], ["optionsReset", "Reset options"]],
  },
] as const

const nativeFileControls = [["newMapButton", "New map"], ["exportButton", "Export"], ["saveButton", "Save"], ["loadButton", "Load"]] as const

const layerPresetButtons = [
  ["create", "+"],
  ["political", "Political Map"], ["religions", "Religious Map"], ["cultural", "Cultural Map"], ["provinces", "Provinces Map"],
  ["heightmap", "Heightmap"], ["biomes", "Biomes Map"], ["logo", ""], ["physical", "Physical Map"], ["goods", "Goods Map"],
  ["military", "Military Map"], ["poi", "Places of Interest"], ["trade", "Trade Animation"], ["emblems", "Emblems"], ["landmass", "Pure Landmass"],
] as const

type MapCreatorStatus = "loading" | "ready" | "error"
type ToolbarControl = readonly [string, string]

type CreationCategory = "places" | "geography" | "infrastructure"

const POINTS_CELL_COUNTS = [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 150000, 200000, 250000, 300000, 400000, 500000]

function formatCellCount(points: number) {
  return `${(POINTS_CELL_COUNTS[points - 1] ?? POINTS_CELL_COUNTS[3]) / 1000}K`
}

const creationTools: Array<{
  id: CreationTool
  label: string
  category: CreationCategory
  description: string
  instruction: string
}> = [
  {
    id: "settlement",
    label: "Settlement",
    category: "places",
    description: "Place a new settlement on the map.",
    instruction: "Click suitable land on the map to place a settlement.",
  },
  {
    id: "marker",
    label: "Point of Interest",
    category: "places",
    description: "Place a custom point on the map.",
    instruction: "Click the map to place a point of interest.",
  },
  {
    id: "river",
    label: "River",
    category: "geography",
    description: "Generate a river through suitable terrain.",
    instruction: "Click suitable land to generate a river using the map's natural downhill terrain rules.",
  },
  {
    id: "route",
    label: "Route",
    category: "infrastructure",
    description: "Draw a route between map locations.",
    instruction: "Click the map to begin, then keep clicking to shape the route.",
  },
]

const layerColors: Record<MapQuickLayerId, string> = {
  states: "text-rose-300", provinces: "text-orange-300", cultures: "text-amber-300", religions: "text-violet-300",
  biomes: "text-emerald-300", heightmap: "text-lime-300", rivers: "text-cyan-300", lakes: "text-sky-300",
  routes: "text-yellow-300", goods: "text-teal-300", trade: "text-pink-300", military: "text-red-300",
  emblems: "text-fuchsia-300", labels: "text-white", burgIcons: "text-amber-200", markers: "text-red-200", characters: "text-cyan-200",
  ocean: "text-blue-300", compass: "text-indigo-300", landmass: "text-green-300", texture: "text-purple-300",
  cells: "text-slate-300", grid: "text-zinc-300", coordinates: "text-blue-200", relief: "text-stone-300",
  zones: "text-yellow-200", borders: "text-orange-200", temperature: "text-orange-300", coastline: "text-cyan-200",
  ice: "text-white", markets: "text-pink-200", precipitation: "text-blue-200", population: "text-emerald-200",
  fogging: "text-slate-200", rulers: "text-lime-200", debug: "text-red-200", scaleBar: "text-teal-200",
  vignette: "text-purple-200", legend: "text-amber-200",
}

const TOOLBAR_QUICK_BAR_HEIGHT = 26
const TOOLBAR_PANEL_HEIGHT = 30
const TOOLBAR_EXTRA_ROW_HEIGHT = 28
const TOOLBAR_PANEL_CLASS = "absolute inset-x-0 top-0 z-10 bg-slate-950 px-1 text-slate-100"
const TOOLBAR_OPTION_CLASS = "flex min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-1.5 py-1.5 text-center text-[9px] font-semibold leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60"
const TOOLBAR_OPTION_TEXT_CLASS = "max-w-full truncate text-[9px] font-semibold leading-none"
const TOOLBAR_OPTION_ICON_CLASS = "size-3.5 shrink-0 sm:size-4"
const TOOLBAR_BUTTON_CLASS = `${TOOLBAR_OPTION_CLASS} text-slate-400 hover:bg-slate-800 hover:text-white`
const LAYER_RAIL_COMPACT_BUTTON_CLASS = "flex h-6 min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-0.5 text-center text-[7px] font-semibold leading-none text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300"
const LAYER_RAIL_EXPANDED_BUTTON_CLASS = "flex h-7 min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-0.5 text-center text-[8px] font-semibold leading-none text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300"
const LAYER_RAIL_COMPACT_ICON_CLASS = "size-2.5 shrink-0"
const LAYER_RAIL_EXPANDED_ICON_CLASS = "size-3 shrink-0"
const LAYER_RAIL_TEXT_CLASS = "max-w-full truncate text-[6px] font-medium leading-none"
const TOOLBAR_USAGE_KEY = "world-engine:map-toolbar-usage:v1"
const MAP_CONFIGURATION_STYLE_ID = "world-engine-map-configuration-style"
const MAP_MODERN_OPTIONS_STYLE_ID = "world-engine-modern-options-style"
const MAP_CONFIGURATION_HEADER_HEIGHT = 56
const MAP_CONFIGURATION_SIDEBAR_WIDTH = 224
const TOOLBAR_DEFAULT_PRIORITY: Record<string, number> = {
  settlements: 0,
  overviewBurgsButton: 1,
  overviewLabelsButton: 2,
  overviewMarkersButton: 3,
  overviewMarketsButton: 4,
  regenerate: 5,
  overviewCellsButton: 6,
  overviewChartsButton: 7,
  openMinimapButton: 8,
  openSubmapTool: 9,
  openTransformTool: 10,
  heightmapPreview: 11,
  settlement: 0,
  marker: 1,
  river: 2,
  route: 3,
}

const toolActionButtonClass = (active: boolean) => `${TOOLBAR_OPTION_CLASS} ${active ? "bg-sky-400/15 text-sky-100" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`

const isAddControl = (id: string) => id.startsWith("add")

const worldEngineIconNames: Record<string, keyof typeof WorldEngineIcons> = {
  Edit: "WEEdit", Regenerate: "WERegenerate", Style: "WEStyle", Settings: "WESettings",
  editBiomesButton: "WEEditBiomes", overviewBurgsButton: "WEEditBurgs", editCoastlineSettings: "WEEditCoastlines",
  editCulturesButton: "WEEditCultures", editDiplomacyButton: "WEEditDiplomacy", editEmblemButton: "WEEditEmblems",
  editGoods: "WEEditGoods", editHeightmapButton: "WEEditHeightmap", overviewMarkersButton: "WEEditMarkers",
  overviewMarketsButton: "WEEditMarkets", editMeasurersButton: "WEEditMeasurers", overviewLabelsButton: "WEEditLabels",
  overviewMilitaryButton: "WEEditMilitary", editNamesBaseButton: "WEEditNames", editNotesButton: "WEEditNotes",
  editProvincesButton: "WEEditProvinces", editReligions: "WEEditReligions", overviewRiversButton: "WEEditRivers",
  overviewRoutesButton: "WEEditRoutes", editStatesButton: "WEEditStates", editTradeAnimationButton: "WEEditTrade",
  editUnitsButton: "WEEditUnits", editZonesButton: "WEEditZones",
  regenerateBurgs: "WERegenBurgs", regenerateCultures: "WERegenCultures", regenerateEconomy: "WERegenEconomy",
  regenerateEmblems: "WERegenEmblems", regenerateGoods: "WERegenGoods", regenerateIce: "WERegenIce",
  regenerateStateLabels: "WERegenStateLabels", regenerateMarkers: "WERegenMarkers", regenerateMarkets: "WERegenMarkets",
  regenerateMilitary: "WERegenMilitary", regeneratePopulation: "WERegenPopulation", regenerateProduction: "WERegenProduction",
  regenerateProvinces: "WERegenProvinces", regenerateReliefIcons: "WERegenRelief", regenerateReligions: "WERegenReligions",
  regenerateRivers: "WERegenRivers", regenerateRoutes: "WERegenRoutes", regenerateStates: "WERegenStates", regenerateZones: "WERegenZones",
  addBurgTool: "WEAddBurg", addLabel: "WEAddLabel", addMarker: "WEAddPOI", addCharacterTool: "WELayerCharacters", addRiver: "WEAddRiver", addRoute: "WEAddRoute",
  overviewCellsButton: "WEShowCells", overviewChartsButton: "WEShowCharts", overviewCharactersButton: "WELayerCharacters", openMinimapButton: "WEShowMinimap",
  openSubmapTool: "WECreateSubmap", openTransformTool: "WECreateTransform", heightmapPreview: "WEHeightmapPreview",
  heightmap3DView: "WEHeightmap3D", finalizeHeightmap: "WEHeightmapFinish", configureWorld: "WEConfigureWorld",
  restoreDefaultCanvasSize: "WEDefaultCanvas", optionsReset: "WEResetOptions", newMapButton: "WENewMap", exportButton: "WEExport",
  saveButton: "WESave", loadButton: "WELoad", zoomReset: "WEResetZoom",
  states: "WELayerStates", provinces: "WELayerProvinces", cultures: "WELayerCultures", religions: "WELayerReligions",
  biomes: "WELayerBiomes", heightmap: "WELayerHeightmap", rivers: "WELayerRivers", lakes: "WELayerLakes", routes: "WELayerRoutes",
  goods: "WELayerGoods", trade: "WELayerTrade", military: "WELayerMilitary", emblems: "WELayerEmblems", labels: "WELayerLabels",
  burgIcons: "WELayerBurgIcons", markers: "WELayerMarkers", characters: "WELayerCharacters", ocean: "WELayerOcean", compass: "WELayerCompass", landmass: "WELayerLandmass",
  texture: "WELayerTexture", cells: "WELayerCells", grid: "WELayerGrid", coordinates: "WELayerCoordinates", relief: "WELayerRelief",
  zones: "WELayerZones", borders: "WELayerBorders", temperature: "WELayerTemperature", coastline: "WELayerCoastline", ice: "WELayerIce",
  markets: "WELayerMarkets", precipitation: "WELayerPrecipitation", population: "WELayerPopulation", fogging: "WELayerFogging",
  rulers: "WELayerRulers", debug: "WELayerDebug", scaleBar: "WELayerScaleBar", vignette: "WELayerVignette", legend: "WELayerLegend",
}

const worldEngineIcon = (id: string): ComponentType<WorldEngineIcons.WEIconProps> =>
  WorldEngineIcons[worldEngineIconNames[id] ?? "WESettings"] as ComponentType<WorldEngineIcons.WEIconProps>

export function MapGenerator({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const { syncLocationFromMapSettlement, getLocationByMapEntity } = useLocationCanon()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const mapViewportRef = useRef<HTMLDivElement>(null)
  const layerRailRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<MapCreatorStatus>("loading")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [layerState, setLayerState] = useState<MapLayerState | null>(null)
  const [creationState, setCreationState] = useState<CreationState | null>(null)
  const [generationSettings, setGenerationSettings] = useState({
    mapWidth: 960,
    mapHeight: 540,
    seed: 1,
    points: 4,
    template: "world",
    cultureCount: 12,
    cultureSet: "world",
    statesNumber: 18,
    provincesRatio: 20,
    sizeVariety: 4,
    growthRate: 1.1,
    burgsNumber: 1000,
    religionsNumber: 6,
  })
  const [selectedSettlement, setSelectedSettlement] = useState<MapSettlementSummary | null>(null)
  const [activeSurface, setActiveSurface] = useState<MapSurfaceState | null>(null)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [isLayerPresetOpen, setIsLayerPresetOpen] = useState(false)
  const [isLayerRailCollapsed, setIsLayerRailCollapsed] = useState(true)
  const [isHomeOpen, setIsHomeOpen] = useState(true)
  const [isMapConfigurationOpen, setIsMapConfigurationOpen] = useState(false)
  const [isMapConfigurationMaximized, setIsMapConfigurationMaximized] = useState(false)
  const [isMapConfigurationMinimized, setIsMapConfigurationMinimized] = useState(false)
  const [isTopQuickCollapsed, setIsTopQuickCollapsed] = useState(true)
  const [isTopExtendedOpen, setIsTopExtendedOpen] = useState(false)
  const [toolbarUsage, setToolbarUsage] = useState<Record<string, number>>({})
  const [frameKey, setFrameKey] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState(0)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TOOLBAR_USAGE_KEY)
      if (!stored) return
      const parsed: unknown = JSON.parse(stored)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return
      const validUsage = Object.fromEntries(
        Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[1] === "number" && Number.isFinite(entry[1]) && entry[1] >= 0),
      )
      setToolbarUsage(validUsage)
    } catch {
      window.localStorage.removeItem(TOOLBAR_USAGE_KEY)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)")
    const updateViewportMode = () => setIsMobileViewport(mediaQuery.matches)
    updateViewportMode()
    mediaQuery.addEventListener("change", updateViewportMode)
    return () => mediaQuery.removeEventListener("change", updateViewportMode)
  }, [])

  useEffect(() => {
    function handleEngineMessage(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        !isMapEngineMessage(event.data)
      ) return

      if (event.data.type === "ready") {
        setStatus("ready")
        sendViewportSize()
      }
      if (event.data.type === "error") setStatus("error")
      if (event.data.type === "interaction") setIsLayerRailCollapsed(true)
      if (event.data.type === "ready" && event.data.state) setLayerState(event.data.state)
      if (event.data.type === "layers:changed") setLayerState(event.data.state)
      if (event.data.type === "creation:mode") {
        setCreationState(event.data.active ? { tool: event.data.tool, active: true, points: event.data.tool === "route" ? 0 : undefined } : null)
      }
      if (event.data.type === "creation:progress") {
        setCreationState({ tool: event.data.tool, active: true, points: event.data.points })
      }
      if (event.data.type === "creation:completed") {
        setCreationState(null)
      }
      if (event.data.type === "world:settlementSelected") {
        setSelectedSettlement(event.data.settlement)
        syncLocationFromMapSettlement(event.data.settlement)
        window.dispatchEvent(
          new CustomEvent("world-engine:map-settlement-selected", {
            detail: { mapEntityId: event.data.settlement.id, settlement: event.data.settlement },
          }),
        )
      }
      if (event.data.type === "surface:opened" || event.data.type === "surface:changed") setActiveSurface(event.data.surface)
      if (event.data.type === "surface:closed") setActiveSurface(null)
    }

    window.addEventListener("message", handleEngineMessage)
    return () => window.removeEventListener("message", handleEngineMessage)
  }, [])

  useEffect(() => {
    function handleLocationBridge(event: Event) {
      const customEvent = event as CustomEvent<{ mapEntityId?: number; mapEntityType?: string; location?: CanonLocation }>
      const detail = customEvent.detail ?? {}
      const mapEntityId = detail.mapEntityId
      const mapEntityType = detail.mapEntityType ?? "settlement"
      if (mapEntityId == null || !Number.isInteger(mapEntityId) || mapEntityId <= 0) return

      const frame = iframeRef.current?.contentWindow
      if (!frame || status !== "ready") return

      if (event.type === "world-engine:open-location-editor") {
        const command = { source: "world-engine-azgaar", type: "world:openSettlementEditor", id: mapEntityId } as const
        if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
        return
      }

      if (event.type === "world-engine:sync-location-to-map") {
        const location = detail.location ?? getLocationByMapEntity(mapEntityType, mapEntityId)
        if (!location) return

        const command = {
          source: "world-engine-azgaar",
          type: "world:updateSettlement",
          settlement: {
            id: mapEntityId,
            name: location.name || undefined,
            population: location.population ?? undefined,
            x: location.coordinates?.x ?? undefined,
            y: location.coordinates?.y ?? undefined,
            region: location.region || undefined,
            province: location.region || undefined,
            biome: location.biome || undefined,
            elevation: location.elevation ?? undefined,
            currentState: location.currentState || undefined,
            capital: location.currentState?.toLowerCase().includes("capital") || undefined,
            port: location.currentState?.toLowerCase().includes("port") || undefined,
            citadel: location.currentState?.toLowerCase().includes("citadel") || undefined,
            group: undefined,
          },
        } as const

        if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
        return
      }

      const command = { source: "world-engine-azgaar", type: "world:locateSettlement", id: mapEntityId } as const
      if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
    }

    window.addEventListener("world-engine:locate-location", handleLocationBridge)
    window.addEventListener("world-engine:open-location-editor", handleLocationBridge)
    window.addEventListener("world-engine:sync-location-to-map", handleLocationBridge)
    return () => {
      window.removeEventListener("world-engine:locate-location", handleLocationBridge)
      window.removeEventListener("world-engine:open-location-editor", handleLocationBridge)
      window.removeEventListener("world-engine:sync-location-to-map", handleLocationBridge)
    }
  }, [getLocationByMapEntity, status])

  useEffect(() => {
    function handlePageInteraction(event: PointerEvent) {
      if (!isLayerRailCollapsed && !layerRailRef.current?.contains(event.target as Node)) {
        setIsLayerRailCollapsed(true)
      }
    }

    document.addEventListener("pointerdown", handlePageInteraction)
    return () => document.removeEventListener("pointerdown", handlePageInteraction)
  }, [isLayerRailCollapsed])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current))
    }, 20000)

    return () => window.clearTimeout(timeout)
  }, [frameKey])

  useEffect(() => {
    if (status !== "loading") return
    setLoadingPhase(0)
    const interval = window.setInterval(() => setLoadingPhase((phase) => (phase + 1) % 4), 850)
    return () => window.clearInterval(interval)
  }, [status, frameKey])

  useEffect(() => {
    if (activeCategory !== "Edit" && creationState) setCreationMode(creationState.tool, false)
  }, [activeCategory, creationState])

  useEffect(() => {
    const documentInFrame = iframeRef.current?.contentDocument
    if (!documentInFrame) return

    const existingStyle = documentInFrame.getElementById(MAP_CONFIGURATION_STYLE_ID)
    if (!isMapConfigurationOpen || status !== "ready") {
      existingStyle?.remove()
      return
    }

    const style = existingStyle ?? documentInFrame.createElement("style")
    style.id = MAP_CONFIGURATION_STYLE_ID
    style.textContent = `
      body > #map, body > #loading, body > #tooltip { visibility: hidden !important; }
      #optionsContainer { inset: 0 !important; opacity: 1 !important; pointer-events: auto !important; position: fixed !important; }
      #collapsible, #options > .tab, #options > .tabcontent:not(#optionsContent) { display: none !important; }
      #options { background: #0a1b31 !important; border: 0 !important; display: block !important; inset: 0 !important; margin: 0 !important; overflow: auto !important; padding: 0 1.25rem 2rem !important; position: absolute !important; }
      #optionsContent { display: block !important; max-width: 70rem !important; margin: 0 auto !important; opacity: 1 !important; padding: 1.25rem 0 2rem !important; }
      #optionsContent table { width: 100% !important; }
      #optionsContent p, #optionsContent td, #optionsContent label { color: #dbeafe !important; }
      #optionsContent i { color: #93c5fd !important; }
      #optionsContent input, #optionsContent select, #optionsContent slider-input { color: #e0f2fe !important; }
      #optionsContent input[type="text"], #optionsContent input[type="number"], #optionsContent select { background: #102b4a !important; border: 1px solid rgba(147, 197, 253, 0.28) !important; }
      #optionsContent button { background: #123454 !important; color: #dbeafe !important; }
      #optionsContent button:hover { background: #1d4f78 !important; color: #f0f9ff !important; }
      @media (max-width: 700px) {
        #options { padding: 0 0.75rem 1.5rem !important; }
        #optionsContent { padding-top: 0.75rem !important; }
        #optionsContent table { font-size: 0.85em !important; }
      }
    `
    if (!existingStyle) documentInFrame.head.appendChild(style)

    const optionsContainer = documentInFrame.getElementById("optionsContainer")
    const options = documentInFrame.getElementById("options")
    const optionsContent = documentInFrame.getElementById("optionsContent")
    if (!optionsContainer || !options || !optionsContent) return

    const originalContainerOpacity = optionsContainer.style.opacity
    const originalOptionsDisplay = options.style.display
    const originalContentDisplay = optionsContent.style.display
    optionsContainer.style.setProperty("opacity", "1", "important")
    options.style.setProperty("display", "block", "important")
    optionsContent.style.setProperty("display", "block", "important")

    return () => {
      style.remove()
      optionsContainer.style.opacity = originalContainerOpacity
      options.style.display = originalOptionsDisplay
      optionsContent.style.display = originalContentDisplay
    }
  }, [isMapConfigurationOpen, status, frameKey])

  useEffect(() => {
    const documentInFrame = iframeRef.current?.contentDocument
    if (!documentInFrame || status !== "ready") return
    const style = documentInFrame.getElementById(MAP_MODERN_OPTIONS_STYLE_ID) ?? documentInFrame.createElement("style")
    style.id = MAP_MODERN_OPTIONS_STYLE_ID
    style.textContent = `
      #optionsContainer { display: none !important; visibility: hidden !important; pointer-events: none !important; }
      #optionsContainer #options { border: 1px solid rgba(125, 211, 252, .22) !important; border-radius: 16px !important; background: #08182d !important; box-shadow: 0 20px 60px rgba(2, 12, 27, .55) !important; color: #dbeafe !important; overflow: hidden !important; }
      #optionsContainer #options .tab { display: flex !important; gap: 4px !important; padding: 8px !important; border-bottom: 1px solid rgba(125, 211, 252, .16) !important; background: #102b4a !important; }
      #optionsContainer #options .tab button { border: 0 !important; border-radius: 9px !important; background: transparent !important; color: #a9c4df !important; font: 600 11px/1.1 ui-sans-serif, sans-serif !important; padding: 8px 10px !important; }
      #optionsContainer #options .tab button.active { background: rgba(56, 189, 248, .18) !important; color: #f0f9ff !important; }
      #optionsContainer #options .tabcontent { background: #08182d !important; color: #dbeafe !important; padding: 12px !important; }
      #optionsContainer #options select, #optionsContainer #options input, #optionsContainer #options textarea { border: 1px solid rgba(147, 197, 253, .24) !important; border-radius: 8px !important; background: #102b4a !important; color: #e0f2fe !important; }
      #optionsContainer #options button { border-radius: 8px !important; }
      #optionsContainer #options #mapLayers li { border-radius: 8px !important; border-color: rgba(125, 211, 252, .14) !important; background: rgba(18, 52, 84, .75) !important; color: #dbeafe !important; }
      #stylePanel { font-family: ui-sans-serif, system-ui, sans-serif !important; }
      #stylePanelTrigger { border: 1px solid rgba(125, 211, 252, .25) !important; border-radius: 0 10px 10px 0 !important; background: #102b4a !important; color: #bae6fd !important; box-shadow: 0 12px 30px rgba(2, 12, 27, .4) !important; }
      #stylePanelTrigger:hover, #stylePanelTrigger:focus-visible { background: #1d4f78 !important; color: #f0f9ff !important; }
      #stylePanelContent { width: min(292px, calc(100vw - 3rem)) !important; max-height: min(80vh, 42rem) !important; overflow-y: auto !important; padding: 12px !important; border: 1px solid rgba(125, 211, 252, .2) !important; border-radius: 0 16px 16px 0 !important; background: rgba(8, 24, 45, .97) !important; box-shadow: 0 20px 60px rgba(2, 12, 27, .55) !important; color: #dbeafe !important; }
      .style-panel-heading { margin: 4px 0 8px !important; color: #bae6fd !important; font: 600 10px/1.1 ui-sans-serif, system-ui, sans-serif !important; letter-spacing: .18em !important; }
      .style-panel-presets { gap: 8px !important; }
      .style-panel-presets button { overflow: hidden !important; border: 1px solid rgba(125, 211, 252, .15) !important; border-radius: 9px !important; background: #102b4a !important; color: #dbeafe !important; }
      .style-panel-presets button:hover, .style-panel-presets button:focus-visible, .style-panel-presets button.pressed { border-color: rgba(125, 211, 252, .7) !important; outline: none !important; }
      .style-panel-presets button.pressed span { background: rgba(56, 189, 248, .2) !important; color: #f0f9ff !important; }
      .style-panel-filters { gap: 6px !important; }
      .style-panel-filters button { border: 1px solid rgba(125, 211, 252, .18) !important; border-radius: 8px !important; background: #102b4a !important; color: #bfdbfe !important; }
      .style-panel-filters button:hover, .style-panel-filters button:focus-visible, .style-panel-filters button.pressed { border-color: rgba(125, 211, 252, .7) !important; background: #1d4f78 !important; color: #f0f9ff !important; }
    `
    if (!style.parentElement) documentInFrame.head.appendChild(style)
    return () => style.remove()
  }, [status, frameKey])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMapConfigurationOpen) {
        event.preventDefault()
        closeMapConfiguration()
        return
      }
      if (event.key === "Escape" && activeCategory === "Edit" && creationState) {
        event.preventDefault()
        setCreationMode(creationState.tool, false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeCategory, creationState, isMapConfigurationOpen])

  function retry() {
    setStatus("loading")
    setIsHomeOpen(true)
    setIsMapConfigurationOpen(false)
    setFrameKey((key) => key + 1)
  }

  function sendViewportSize() {
    const frame = iframeRef.current?.contentWindow
    const viewport = iframeRef.current
    if (!frame || !viewport || status !== "ready") return

    const bounds = viewport.getBoundingClientRect()
    const command = {
      source: "world-engine-azgaar",
      type: "viewport:resize",
      mode: activeCategory ? "small" : "large",
      width: Math.max(1, Math.round(bounds.width)),
      height: Math.max(1, Math.round(bounds.height)),
    } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  useEffect(() => {
    const viewport = mapViewportRef.current
    if (!viewport) return

    let frame = 0
    const scheduleViewportSync = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(sendViewportSize)
    }
    const observer = new ResizeObserver(scheduleViewportSync)
    observer.observe(viewport)
    window.addEventListener("resize", scheduleViewportSync)
    scheduleViewportSync()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("resize", scheduleViewportSync)
    }
  }, [activeCategory, isLayerRailCollapsed, status])

  function toggleLayer(layer: MapQuickLayerId) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    recordToolbarUse(layer)
    const visible = !layerState?.active.includes(layer)
    const command = { source: "world-engine-azgaar", type: "toggleLayer", layer, visible }
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function selectLayerPreset(preset: (typeof MAP_LAYER_PRESETS)[number]) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return
    const command = { source: "world-engine-azgaar", type: "setLayerPreset", preset } as const
    if (isMapEngineCommand(command)) {
      frame.postMessage(command, window.location.origin)
      setIsLayerPresetOpen(false)
    }
  }

  function activateLayerPresetButton(id: string) {
    recordToolbarUse(id)
    if (id === "create") {
      clickNativeControl("savePresetButton")
      return
    }
    if (MAP_LAYER_PRESETS.includes(id as (typeof MAP_LAYER_PRESETS)[number])) {
      selectLayerPreset(id as (typeof MAP_LAYER_PRESETS)[number])
    }
  }

  function clickNativeControl(id: string) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    if (MAP_SURFACE_OPEN_IDS.includes(id as (typeof MAP_SURFACE_OPEN_IDS)[number])) {
      sendSurfaceCommand("surface:open", id)
      return
    }

    const command = { source: "world-engine-azgaar", type: "native:click", id } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function openSettlementDirectory() {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "world:openSettlements" } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function openSettlementEditor() {
    if (!selectedSettlement) return

    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "world:openSettlementEditor", id: selectedSettlement.id } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function openMapConfiguration() {
    setIsHomeOpen(false)
    setActiveCategory(null)
    setIsTopQuickCollapsed(true)
    setIsMapConfigurationMaximized(false)
    setIsMapConfigurationMinimized(false)
    setIsMapConfigurationOpen(true)
  }

  function closeMapConfiguration() {
    setIsMapConfigurationOpen(false)
    setIsMapConfigurationMinimized(false)
  }

  function submitGenerationSettings() {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = {
      source: "world-engine-azgaar",
      type: "world:setGenerationSettings",
      settings: {
        mapWidth: Number(generationSettings.mapWidth),
        mapHeight: Number(generationSettings.mapHeight),
        seed: Number(generationSettings.seed),
        points: Number(generationSettings.points),
        template: generationSettings.template,
        cultureCount: Number(generationSettings.cultureCount),
        cultureSet: generationSettings.cultureSet,
        statesNumber: Number(generationSettings.statesNumber),
        provincesRatio: Number(generationSettings.provincesRatio),
        sizeVariety: Number(generationSettings.sizeVariety),
        growthRate: Number(generationSettings.growthRate),
        burgsNumber: Number(generationSettings.burgsNumber),
        religionsNumber: Number(generationSettings.religionsNumber),
      },
    } as const

    if (isMapEngineCommand(command)) {
      frame.postMessage(command, window.location.origin)
    }
  }

  function locateSettlement() {
    if (!selectedSettlement) return

    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "world:locateSettlement", id: selectedSettlement.id } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function setCreationMode(tool: CreationTool, active: boolean) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "creation:mode", tool, active }
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function recordToolbarUse(actionId: string) {
    setToolbarUsage((current) => {
      const next = { ...current, [actionId]: (current[actionId] ?? 0) + 1 }
      try {
        window.localStorage.setItem(TOOLBAR_USAGE_KEY, JSON.stringify(next))
      } catch {
        return current
      }
      return next
    })
  }

  const getUsagePriorityControls = (controls: readonly ToolbarControl[]) =>
    [...controls].sort(([leftId], [rightId]) => {
      const leftScore = toolbarUsage[leftId] ?? 0
      const rightScore = toolbarUsage[rightId] ?? 0
      if (rightScore !== leftScore) return rightScore - leftScore
      return (TOOLBAR_DEFAULT_PRIORITY[leftId] ?? 99) - (TOOLBAR_DEFAULT_PRIORITY[rightId] ?? 99)
    })

  const prioritizedQuickLayers = getUsagePriorityControls(
    MAP_QUICK_LAYERS.map((layer) => [layer.id, layer.label] as const),
  ).map(([id]) => MAP_QUICK_LAYERS.find((layer) => layer.id === id)!)
  const prioritizedLayerPresetButtons = getUsagePriorityControls(
    layerPresetButtons.filter(([id]) => id !== "logo") as readonly ToolbarControl[],
  )
  const layerPresetGridButtons = [
    ...prioritizedLayerPresetButtons.slice(0, 7),
    ["logo", ""] as const,
    ...prioritizedLayerPresetButtons.slice(7),
  ]

  const mapConfigurationHeaderHeight = isMobileViewport ? 48 : MAP_CONFIGURATION_HEADER_HEIGHT
  const mapConfigurationSidebarWidth = isMobileViewport ? 160 : MAP_CONFIGURATION_SIDEBAR_WIDTH
  const mapViewportStyle = {
    top: isMapConfigurationOpen
      ? mapConfigurationHeaderHeight
      : activeCategory && !isTopQuickCollapsed
      ? TOOLBAR_PANEL_HEIGHT + (isTopExtendedOpen ? TOOLBAR_EXTRA_ROW_HEIGHT : 0)
      : isTopQuickCollapsed ? TOOLBAR_QUICK_BAR_HEIGHT : 0,
    height: isMapConfigurationOpen
      ? `calc(100% - ${mapConfigurationHeaderHeight}px)`
      : activeCategory && !isTopQuickCollapsed
      ? `calc(100% - ${TOOLBAR_PANEL_HEIGHT + (isTopExtendedOpen ? TOOLBAR_EXTRA_ROW_HEIGHT : 0)}px)`
      : isTopQuickCollapsed ? `calc(100% - ${TOOLBAR_QUICK_BAR_HEIGHT}px)` : "100%",
    left: isMapConfigurationOpen ? mapConfigurationSidebarWidth : 0,
    width: isMapConfigurationOpen ? `calc(100% - ${mapConfigurationSidebarWidth}px)` : "100%",
    zIndex: isMapConfigurationOpen ? 20 : undefined,
  }

  function sendSurfaceCommand(type: "surface:open" | "surface:back" | "surface:close", surfaceId?: string) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = surfaceId
      ? { source: "world-engine-azgaar", type, surfaceId }
      : { source: "world-engine-azgaar", type }

    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  const renderLayerButton = (layer: (typeof MAP_QUICK_LAYERS)[number], showLabel: boolean, expanded: boolean) => {
    const buttonClass = expanded ? LAYER_RAIL_EXPANDED_BUTTON_CLASS : LAYER_RAIL_COMPACT_BUTTON_CLASS
    const iconClass = expanded ? LAYER_RAIL_EXPANDED_ICON_CLASS : LAYER_RAIL_COMPACT_ICON_CLASS
    if (layer.id === "fogging") {
      return (
        <button
          key={layer.id}
          type="button"
          aria-label="Layers Preset"
          aria-expanded={isLayerPresetOpen}
          title="Layers Preset"
          disabled={status !== "ready"}
          onClick={() => {
            recordToolbarUse(layer.id)
            setIsLayerPresetOpen((open) => !open)
          }}
          className={`${buttonClass} ${isLayerPresetOpen ? "bg-sky-400/15 text-sky-100" : ""}`}
        >
          {(() => { const Icon = worldEngineIcon("fogging"); return <Icon className={`${iconClass} text-sky-300`} /> })()}
          {showLabel && <span className={LAYER_RAIL_TEXT_CLASS}>Layers Preset</span>}
        </button>
      )
    }
    const Icon = worldEngineIcon(layer.id)
    const isSelected = layerState?.active.includes(layer.id) ?? false
    return (
      <button
        key={layer.id}
        type="button"
        aria-label={layer.label}
        aria-pressed={isSelected}
        title={`${layer.label}: ${layer.description}`}
        disabled={status !== "ready"}
        onClick={() => toggleLayer(layer.id)}
        className={`${buttonClass} focus-visible:ring-2 disabled:cursor-wait disabled:opacity-60 ${
          isSelected
            ? "bg-sky-400/15 text-sky-100"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Icon className={`${iconClass} ${layerColors[layer.id]}`} />
        {showLabel && <span className={LAYER_RAIL_TEXT_CLASS}>{layer.label}</span>}
      </button>
    )
  }

  const getNativeControlsForGroups = (labels: string[]) => nativeToolGroups
    .filter((group) => labels.includes(group.label))
    .flatMap((group) => group.controls as readonly ToolbarControl[])

  const settlementCreationControl = ["settlement", "Settlement"] as const
  const editControls: ToolbarControl[] = [
    ["settlements", "Settlements"],
    ...getNativeControlsForGroups(["Edit", "Show", "Create"]),
  ]
  const regenerateControls: ToolbarControl[] = getNativeControlsForGroups(["Regenerate", "Add"])
  const settingsControls: ToolbarControl[] = [...getNativeControlsForGroups(["Settings"]), ...nativeFileControls]
  const topQuickControls = [
    ...getUsagePriorityControls(editControls).slice(0, 8).map((control) => ({ category: "edit" as const, control })),
    ...getUsagePriorityControls(regenerateControls).slice(0, 8).map((control) => ({ category: "regenerate" as const, control })),
    ...getUsagePriorityControls(settingsControls).slice(0, 8).map((control) => ({ category: "settings" as const, control })),
  ]

  const renderTopQuickControl = ({ category, control: [id, label] }: (typeof topQuickControls)[number]) => {
    const Icon = worldEngineIcon(id)
    return (
      <button
        key={`${category}-${id}`}
        type="button"
        disabled={status !== "ready"}
        onClick={() => {
          recordToolbarUse(id)
          if (category === "edit" && id === "settlements") {
            openSettlementDirectory()
          } else {
            clickNativeControl(id)
          }
        }}
        className="flex h-6 min-w-0 flex-col items-center justify-center gap-0 rounded-md bg-slate-900 px-0.5 text-slate-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        title={`${label} (${category})`}
        aria-label={label}
      >
        <Icon className={`size-3 shrink-0 ${isAddControl(id) ? "text-emerald-300" : category === "regenerate" ? "text-orange-300" : category === "settings" ? "text-violet-300" : "text-sky-300"}`} />
        <span className="max-w-full truncate text-[6px] font-semibold leading-none">{label}</span>
      </button>
    )
  }

  const renderTopQuickControls = () => (
    <div className="grid w-full grid-cols-[repeat(24,minmax(0,1fr))] gap-px">
      {topQuickControls.map(renderTopQuickControl)}
    </div>
  )

  const renderTopTabControl = (category: string, [id, label]: ToolbarControl) => {
    const isCreationTool = category === "Edit" && creationTools.some((tool) => tool.id === id)
    const Icon = category === "Edit" && id === "settlements" ? Globe2 : isCreationTool ? MapPin : worldEngineIcon(id)
    return (
      <button
        key={`${category}-${id}`}
        type="button"
        disabled={status !== "ready"}
        onClick={() => {
          recordToolbarUse(id)
          if (isCreationTool) setCreationMode(id as CreationTool, true)
          else if (category === "Edit" && id === "settlements") openSettlementDirectory()
          else clickNativeControl(id)
        }}
        className={`flex h-7 min-w-0 flex-col items-center justify-center gap-0 rounded-md bg-slate-900 px-0.5 py-0.5 text-slate-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${category === "Settings" ? "w-14 justify-self-center" : "w-full"}`}
        title={label}
        aria-label={label}
      >
        <Icon className={`size-3 shrink-0 ${isAddControl(id) ? "text-emerald-300" : category === "Regenerate" ? "text-orange-300" : category === "Settings" ? "text-violet-300" : "text-sky-300"}`} />
        <span className="max-w-full truncate text-[7px] font-semibold leading-none">{label}</span>
      </button>
    )
  }

  const expandedTabControls = {
    Edit: [...editControls, settlementCreationControl],
    Regenerate: regenerateControls,
    Settings: [...getNativeControlsForGroups(["Settings"]), ...nativeFileControls],
  } as const

  const getPrioritizedTabControls = (category: keyof typeof expandedTabControls) =>
    getUsagePriorityControls(expandedTabControls[category] as readonly ToolbarControl[])

  const renderTopTabRows = (category: keyof typeof expandedTabControls) => {
    const controls = getPrioritizedTabControls(category)
    const primaryControls = controls.slice(0, 20)
    const extraControls = controls.slice(20)
    return (
      <div className="relative">
        <div className={category === "Settings" ? "flex flex-wrap justify-center gap-px" : "grid w-full grid-cols-[repeat(20,minmax(0,1fr))] gap-px"}>
          {primaryControls.map((control) => renderTopTabControl(category, control))}
        </div>
        {extraControls.length > 0 && (
          <>
            {isTopExtendedOpen && (
              <div className={category === "Settings" ? "flex flex-wrap justify-center gap-px" : "grid w-full grid-cols-[repeat(20,minmax(0,1fr))] gap-px"}>
                {extraControls.map((control) => renderTopTabControl(category, control))}
              </div>
            )}
            <button
              type="button"
              aria-expanded={isTopExtendedOpen}
              aria-label={isTopExtendedOpen ? "Collapse toolbar" : "Show remaining toolbar tools"}
              title={isTopExtendedOpen ? "Collapse toolbar" : "Show remaining toolbar tools"}
              onClick={() => {
                if (isTopExtendedOpen) {
                  setIsTopExtendedOpen(false)
                } else {
                  setIsTopExtendedOpen(true)
                }
              }}
              style={{ top: "100%" }}
              className="absolute right-1 z-10 flex h-4 w-9 items-center justify-center rounded-b-sm bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {isTopExtendedOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="relative z-20 flex min-h-10 shrink-0 items-center gap-1.5 bg-slate-950 px-1 py-0.5 backdrop-blur-xl sm:px-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <Logo className="size-7" />
          <div className="min-w-0 leading-none">
            <span className="block truncate text-[11px] font-semibold tracking-tight text-slate-100 sm:text-[12px]">
              World Engine
            </span>
            <span className="mt-0.5 block truncate text-[7px] font-medium uppercase tracking-[0.14em] text-sky-200/60">
              Map Creator
            </span>
          </div>
        </div>

        <nav aria-label="Map Creator tools" className="flex min-w-0 flex-1 snap-x snap-mandatory items-center justify-start gap-0.5 overflow-x-auto overscroll-x-contain">
          {navigation.map(({ label }) => {
            const isActive = activeCategory === label
            const Icon = worldEngineIcon(label)
            return (
              <button
                key={label}
                type="button"
                aria-expanded={isActive}
                onClick={() => {
                  setActiveCategory(isActive ? null : label)
                  if (isActive) {
                    setIsTopQuickCollapsed(true)
                    setIsTopExtendedOpen(false)
                  } else {
                    setIsTopQuickCollapsed(false)
                    setIsTopExtendedOpen(false)
                  }
                }}
                className={`flex min-w-[4.25rem] shrink-0 snap-start flex-1 flex-col items-center justify-center gap-0 rounded-md px-0.5 py-0.5 text-center text-[7px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60 sm:min-w-0 ${
                  isActive
                    ? "bg-sky-400/15 text-emerald-300"
                    : "text-emerald-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="size-3 shrink-0 text-emerald-300 sm:size-3.5" />
                <span className="max-w-full truncate text-[7px] font-medium leading-none">{label}</span>
              </button>
            )
          })}
        </nav>
        <div className="shrink-0">
          <UserMenu onSignOut={onSignOut} />
        </div>
        <button
          type="button"
          onClick={onBack}
          aria-label={`Back to ${project.name}`}
          title={`Back to ${project.name}`}
          className="flex shrink-0 items-center gap-1 rounded-sm border border-sky-900/80 px-1.5 py-1.5 text-[10px] font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden lg:inline">Back</span>
        </button>
      </header>

      <main className="relative min-h-0 flex-1 overflow-hidden bg-slate-950">
        <div
          ref={mapViewportRef}
          style={mapViewportStyle}
          className="absolute left-0 top-0 min-h-0 transition-[top,height,width] duration-200"
        >
          <iframe
            key={frameKey}
            ref={iframeRef}
            src="/fantasy-map-generator/index.html"
            data-surface-id={activeSurface?.id}
            className="pointer-events-auto block h-full w-full border-0"
            title="World Engine Map Creator map"
            onError={() => setStatus("error")}
          />
        </div>

        {isMobileViewport && activeSurface?.mobileMode === "unavailable" && (
          <section className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/95 px-5 py-8 text-center" role="alert">
            <div className="max-w-xs">
              <Map className="mx-auto size-8 text-sky-300" />
              <h2 className="mt-4 text-base font-semibold text-white">This surface is desktop-only</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/75">
                Minimap needs a larger map viewport and is unavailable on mobile.
              </p>
              <button
                type="button"
                onClick={() => sendSurfaceCommand("surface:close")}
                className="mt-5 rounded-md bg-sky-300 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-200"
              >
                Return to map
              </button>
            </div>
          </section>
        )}

        {isLayerPresetOpen && status === "ready" && (
          <div className="pointer-events-auto absolute inset-0 z-25 flex items-center justify-center bg-slate-950/20 px-4" role="dialog" aria-label="Layers Preset">
            <div className="grid aspect-[5/3] w-[min(88vw,32rem)] grid-cols-5 grid-rows-3 gap-1.5 rounded-2xl border border-sky-200/20 bg-slate-950/95 p-2.5 shadow-2xl backdrop-blur-xl sm:gap-2 sm:p-3">
              {layerPresetGridButtons.map(([id, label], index) => {
                if (index === 7) {
                  return <div key="preset-logo" className="flex items-center justify-center rounded-xl bg-sky-300/[0.04]" aria-hidden="true"><Logo className="size-7 opacity-60 sm:size-9" /></div>
                }
                const preset = id !== "create" && MAP_LAYER_PRESETS.includes(id as (typeof MAP_LAYER_PRESETS)[number]) ? id as (typeof MAP_LAYER_PRESETS)[number] : null
                return (
                  <button key={id} type="button" aria-label={label} aria-pressed={preset ? layerState?.preset === preset : undefined} onClick={() => activateLayerPresetButton(id)} className={toolActionButtonClass(Boolean(preset && layerState?.preset === preset)) + " min-h-0 rounded-xl border border-sky-200/10 px-1.5 text-[9px] leading-tight sm:text-[10px]"}>
                    {id === "create" ? <Plus className="size-4" /> : label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {isHomeOpen && status === "ready" && (
          <section className="absolute inset-x-0 bottom-0 top-0 z-15 overflow-y-auto bg-slate-950/75 px-3 py-4 backdrop-blur-[2px] sm:px-6 sm:py-8" aria-label="Map home">
            <div className="mx-auto flex min-h-full w-full max-w-3xl items-center justify-center">
              <div className="w-full border border-sky-200/15 bg-slate-950/90 p-4 shadow-2xl sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-sky-200/65">Map workspace</p>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Shape a world</h1>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300/75">Continue with the map beneath this panel, or choose a map action to begin.</p>
                  </div>
                  <button type="button" onClick={() => setIsHomeOpen(false)} className="flex shrink-0 items-center justify-center gap-2 border border-sky-300/30 px-3 py-2 text-xs font-semibold text-sky-100 transition-colors hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                    <Map className="size-3.5" />
                    Continue to map
                  </button>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {nativeFileControls.map(([id, label]) => (
                    <button key={id} type="button" onClick={() => { setIsHomeOpen(false); clickNativeControl(id) }} className="flex min-h-16 flex-col items-center justify-center gap-1 border border-sky-200/15 bg-slate-900/80 px-2 py-2 text-center text-xs text-slate-200 transition-colors hover:border-sky-300/40 hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300">
                      <Database className="size-4 text-cyan-300" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={openMapConfiguration} className="mt-3 flex min-h-16 w-full items-center justify-center gap-2 border border-emerald-300/35 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                  <SlidersHorizontal className="size-4" />
                  Configure New World
                </button>
              </div>
            </div>
          </section>
        )}

        {isMapConfigurationOpen && status === "ready" && (
          <section className="pointer-events-none absolute inset-0 z-30 bg-[#07111f]" role="dialog" aria-modal="true" aria-label="Map configuration">
            <div className={`flex h-full flex-col overflow-hidden border border-sky-300/20 bg-[#0a1b31] shadow-2xl shadow-black/40 ${isMapConfigurationMaximized ? "" : "rounded-lg"}`}>
              <header className="pointer-events-auto relative z-40 flex h-12 shrink-0 items-center justify-between border-b border-sky-300/20 bg-[#102b4a] px-3 sm:h-14 sm:px-4">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="size-2 rounded-full bg-sky-300 shadow-[0_0_12px_rgb(125_211_252_/_70%)]" aria-hidden="true" />
                  <h2 className="truncate text-xs font-semibold tracking-wide text-sky-50 sm:text-sm">Map configuration</h2>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setIsMapConfigurationMinimized((minimized) => !minimized)}
                    aria-label={isMapConfigurationMinimized ? "Restore map configuration" : "Minimize map configuration"}
                    title={isMapConfigurationMinimized ? "Restore" : "Minimize"}
                    className="flex size-8 items-center justify-center text-sky-200/75 transition-colors hover:bg-sky-200/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Minimize2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsMapConfigurationMaximized((maximized) => !maximized); setIsMapConfigurationMinimized(false) }}
                    aria-label={isMapConfigurationMaximized ? "Restore map configuration" : "Maximize map configuration"}
                    title={isMapConfigurationMaximized ? "Restore" : "Maximize"}
                    className="flex size-8 items-center justify-center text-sky-200/75 transition-colors hover:bg-sky-200/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <Maximize2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={closeMapConfiguration}
                    aria-label="Close map configuration"
                    title="Close map configuration"
                    className="flex size-8 items-center justify-center text-sky-200/75 transition-colors hover:bg-rose-500/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </header>
              {!isMapConfigurationMinimized && (
                <div className="pointer-events-auto relative z-40 min-h-0 flex-1 overflow-y-auto">
                  <aside className="pointer-events-auto absolute inset-y-0 left-0 w-40 border-r border-sky-300/15 bg-[#08182d] p-3 sm:w-56 sm:p-4" aria-label="Configuration sections">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-sky-300/60">Configure New World</p>
                    <div className="mt-4 rounded-md border border-sky-300/20 bg-[#123454] px-3 py-2 text-xs font-semibold text-sky-50">Generation options</div>
                  </aside>

                  <div className="absolute inset-y-0 left-40 right-0 overflow-y-auto bg-[#0a1b31] p-4 sm:left-56 sm:p-5">
                    <div className="mx-auto max-w-3xl space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1 text-xs text-sky-100">
                          <span>Canvas width</span>
                          <input
                            type="number"
                            min={240}
                            value={generationSettings.mapWidth}
                            onChange={(event) => setGenerationSettings((current) => ({ ...current, mapWidth: Number(event.target.value) }))}
                            className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                          />
                        </label>
                        <label className="space-y-1 text-xs text-sky-100">
                          <span>Canvas height</span>
                          <input
                            type="number"
                            min={135}
                            value={generationSettings.mapHeight}
                            onChange={(event) => setGenerationSettings((current) => ({ ...current, mapHeight: Number(event.target.value) }))}
                            className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                          />
                        </label>
                      </div>

                      <label className="block space-y-1 text-xs text-sky-100">
                        <span>Map seed</span>
                        <input
                          type="number"
                          min={1}
                          max={999999999}
                          value={generationSettings.seed}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, seed: Number(event.target.value) }))}
                          className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Points number</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{formatCellCount(generationSettings.points)} cells</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Sets the number of points used for graph generation. Higher values affect performance; 10K is the recommended value.</span>
                        <input
                          type="range"
                          min={1}
                          max={19}
                          value={generationSettings.points}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, points: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-1 text-xs text-sky-100">
                        <span>Heightmap</span>
                        <select
                          value={generationSettings.template}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, template: event.target.value }))}
                          className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                        >
                          <option value="world">World</option>
                          <option value="island">Island</option>
                          <option value="archipelago">Archipelago</option>
                          <option value="continent">Continent</option>
                          <option value="peninsula">Peninsula</option>
                        </select>
                      </label>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="space-y-1 text-xs text-sky-100">
                          <span className="flex items-center justify-between gap-3"><span>Cultures number</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.cultureCount}</output></span>
                          <span className="block text-[11px] leading-relaxed text-slate-300/75">Defines how many cultures are generated.</span>
                          <input
                            type="number"
                            min={1}
                            value={generationSettings.cultureCount}
                            onChange={(event) => setGenerationSettings((current) => ({ ...current, cultureCount: Number(event.target.value) }))}
                            className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                          />
                        </label>
                        <label className="space-y-1 text-xs text-sky-100">
                          <span>Culture set</span>
                          <select
                            value={generationSettings.cultureSet}
                            onChange={(event) => setGenerationSettings((current) => ({ ...current, cultureSet: event.target.value }))}
                            className="w-full rounded-md border border-sky-300/20 bg-[#102b4a] px-2.5 py-2 text-sky-50 outline-none ring-0"
                          >
                            <option value="world">All-world</option>
                            <option value="european">European</option>
                            <option value="oriental">Oriental</option>
                            <option value="english">English</option>
                            <option value="antique">Antique</option>
                            <option value="highFantasy">High Fantasy</option>
                            <option value="darkFantasy">Dark Fantasy</option>
                            <option value="random">Random</option>
                          </select>
                        </label>
                      </div>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>States number</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.statesNumber}</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Defines how many states and capitals are generated.</span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={generationSettings.statesNumber}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, statesNumber: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Provinces ratio</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.provincesRatio}%</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Sets what share of eligible burgs in each state become province centers. Higher values create more provinces.</span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={generationSettings.provincesRatio}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, provincesRatio: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Size variety</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.sizeVariety.toFixed(1)}</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Controls how much states and cultures vary in size, which defines expansionism.</span>
                        <input
                          type="range"
                          min={0}
                          max={10}
                          step={0.1}
                          value={generationSettings.sizeVariety}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, sizeVariety: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Growth rate</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.growthRate.toFixed(1)}</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Sets state and culture growth rate, defining how much land remains neutral.</span>
                        <input
                          type="range"
                          min={0.1}
                          max={2}
                          step={0.1}
                          value={generationSettings.growthRate}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, growthRate: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Burgs number</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.burgsNumber}</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Defines how many non-capital settlements are placed, if enough suitable land exists.</span>
                        <input
                          type="range"
                          min={0}
                          max={1000}
                          value={generationSettings.burgsNumber}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, burgsNumber: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <label className="block space-y-2 text-xs text-sky-100">
                        <span className="flex items-center justify-between gap-3"><span>Religions number</span><output className="rounded-full border border-sky-300/20 bg-[#102b4a] px-2 py-1 font-medium text-sky-100">{generationSettings.religionsNumber}</output></span>
                        <span className="block text-[11px] leading-relaxed text-slate-300/75">Defines how many organized religions and cults are generated. Cultures still have folk religions.</span>
                        <input
                          type="range"
                          min={0}
                          max={50}
                          value={generationSettings.religionsNumber}
                          onChange={(event) => setGenerationSettings((current) => ({ ...current, religionsNumber: Number(event.target.value) }))}
                          className="w-full accent-sky-400"
                        />
                      </label>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={closeMapConfiguration}
                          className="rounded-md border border-sky-300/25 bg-[#102b4a] px-3 py-2 text-xs font-semibold text-sky-100 transition-colors hover:bg-[#123454]"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            submitGenerationSettings()
                            closeMapConfiguration()
                          }}
                          className="rounded-md bg-emerald-300 px-3 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-200"
                        >
                          Generate new world
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <aside ref={layerRailRef} className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 overflow-visible bg-slate-950 px-1.5 pb-1 pt-[3px]" aria-label="Map layers">
          <button
            type="button"
            aria-label={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            title={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            onClick={() => setIsLayerRailCollapsed((collapsed) => !collapsed)}
            className={`pointer-events-auto absolute right-2 z-10 h-4 w-10 rounded-t-md rounded-b-none bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isLayerRailCollapsed ? "top-[6px] -translate-y-[calc(100%+6px)]" : "top-0 -translate-y-full"}`}
          >
            <span className="flex size-full items-center justify-center">
              {isLayerRailCollapsed ? <ChevronUp className="size-3" aria-hidden="true" /> : <ChevronDown className="size-3" aria-hidden="true" />}
            </span>
          </button>
          <div className="relative z-10 grid w-full items-center grid-cols-10 gap-0.5 sm:grid-cols-[repeat(20,minmax(0,1fr))]">
            {prioritizedQuickLayers.slice(0, isLayerRailCollapsed ? 20 : 39).map((layer) => renderLayerButton(layer, true, !isLayerRailCollapsed))}
          </div>
        </aside>

        {isTopQuickCollapsed && (
          <section className="absolute inset-x-0 top-0 z-10 h-6 bg-slate-950 px-1 text-slate-100" aria-label="Map quick tools">
            {renderTopQuickControls()}
          </section>
        )}

        {activeCategory === "Edit" && !isTopQuickCollapsed ? (

          <section className={TOOLBAR_PANEL_CLASS} aria-label="Edit tools">
            <div>
              {renderTopTabRows("Edit")}
              {selectedSettlement && (
                <div className="border-t border-sky-900/80 pt-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-primary">Selected settlement</p>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">{selectedSettlement.name}</h3>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] leading-snug">
                    <div>
                      <dt className="text-muted-foreground">Population</dt>
                      <dd className="font-medium text-foreground">{selectedSettlement.population.toLocaleString()}</dd>
                    </div>
                    {selectedSettlement.group && (
                      <div>
                        <dt className="text-muted-foreground">Group</dt>
                        <dd className="font-medium text-foreground">{selectedSettlement.group}</dd>
                      </div>
                    )}
                    {selectedSettlement.realm && (
                      <div>
                        <dt className="text-muted-foreground">Realm</dt>
                        <dd className="font-medium text-foreground">{selectedSettlement.realm}</dd>
                      </div>
                    )}
                    {selectedSettlement.province && (
                      <div>
                        <dt className="text-muted-foreground">Province</dt>
                        <dd className="font-medium text-foreground">{selectedSettlement.province}</dd>
                      </div>
                    )}
                    {selectedSettlement.culture && (
                      <div>
                        <dt className="text-muted-foreground">Culture</dt>
                        <dd className="font-medium text-foreground">{selectedSettlement.culture}</dd>
                      </div>
                    )}
                  </dl>
                  {(selectedSettlement.capital || selectedSettlement.port || selectedSettlement.citadel) && (
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {[selectedSettlement.capital && "Capital", selectedSettlement.port && "Port", selectedSettlement.citadel && "Citadel"].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <div className="mt-1 grid min-w-0 grid-cols-2 gap-px">
                    <button
                      type="button"
                      disabled={status !== "ready"}
                      onClick={locateSettlement}
                      className={TOOLBAR_BUTTON_CLASS}
                    >
                      <Crosshair className={TOOLBAR_OPTION_ICON_CLASS + " text-sky-300"} />
                      <span className={TOOLBAR_OPTION_TEXT_CLASS}>Locate on map</span>
                    </button>
                    <button
                      type="button"
                      disabled={status !== "ready"}
                      onClick={openSettlementEditor}
                      className={TOOLBAR_BUTTON_CLASS}
                    >
                      <PanelTop className={TOOLBAR_OPTION_ICON_CLASS + " text-sky-300"} />
                      <span className={TOOLBAR_OPTION_TEXT_CLASS}>Open full editor</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : activeCategory === "Regenerate" ? (
          <section className={TOOLBAR_PANEL_CLASS} aria-label={`${activeCategory} tools`}>
            {renderTopTabRows("Regenerate")}
          </section>
        ) : activeCategory === "Settings" ? (
          <section className={TOOLBAR_PANEL_CLASS} aria-label="Map settings">
            {renderTopTabRows("Settings")}
          </section>
        ) : null}

        {status !== "ready" && (
          <div className="absolute inset-0 z-30 overflow-hidden bg-[#07111f] px-4 py-8 text-white">
            {status === "loading" ? (
              <section role="status" aria-live="polite" className="relative mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center text-center">
                <div className="we-launch-grid absolute inset-[-20%] opacity-45" aria-hidden="true" />
                <div className="relative flex size-52 items-center justify-center sm:size-64" aria-hidden="true">
                  <div className="absolute inset-0 rounded-full border border-sky-300/15" />
                  <div className="absolute inset-5 rounded-full border border-sky-300/20" />
                  <div className="absolute inset-12 rounded-full border border-sky-300/25" />
                  <div className="we-launch-orbit absolute inset-2 rounded-full border border-dashed border-sky-300/35" />
                  <div className="we-launch-orbit-reverse absolute inset-8 rounded-full border border-dashed border-cyan-200/25" />
                  <div className="relative flex size-24 items-center justify-center rounded-2xl border border-sky-200/30 bg-sky-300/10 shadow-[0_0_70px_rgb(56_189_248_/_22%)] sm:size-28">
                    <Globe2 className="size-12 text-sky-200 sm:size-14" strokeWidth={1.2} />
                    <span className="absolute inset-3 rounded-xl border border-sky-200/20" />
                  </div>
                  <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgb(165_243_252)]" />
                </div>
                <p className="relative mt-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-sky-200/70 sm:mt-7">Worldbuilding cartography</p>
                <h1 className="relative mt-2 text-5xl font-black tracking-[-0.05em] text-white drop-shadow-[0_0_28px_rgb(56_189_248_/_25%)] sm:text-7xl lg:text-8xl">World Engine</h1>
                <div className="relative mt-5 flex items-center gap-2 text-xs text-slate-300/80 sm:text-sm">
                  <LoaderCircle className="size-4 animate-spin text-cyan-300" />
                  <span>{["Mapping the unknown", "Waking the atlas", "Aligning the realms", "Opening your world"][loadingPhase]}</span>
                </div>
                <div className="relative mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
                  <div className="we-launch-progress h-full rounded-full bg-sky-300" />
                </div>
                <p className="relative mt-3 text-[10px] uppercase tracking-[0.24em] text-slate-500">Initializing map workspace</p>
              </section>
            ) : (
              <section role="alert" className="w-full max-w-sm rounded-xl border border-white/15 bg-black/20 p-6 text-center text-white shadow-2xl backdrop-blur-md">
                <AlertCircle className="mx-auto size-7 text-rose-300" />
                <h1 className="mt-4 text-base font-semibold">Map Creator could not load</h1>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  The map workspace did not finish starting. Your project is unchanged.
                </p>
                <button
                  type="button"
                  onClick={retry}
                  className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  <RefreshCw className="size-3.5" />
                  Try again
                </button>
              </section>
            )}
          </div>
        )}
      </main>

    </div>
  )
}