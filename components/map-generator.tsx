"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
  AlertCircle,
  ArrowLeft,
  Badge,
  BookOpen,
  Building2,
  Box,
  CircleGauge,
  Cloud,
  CloudRain,
  Cone,
  Compass,
  Crosshair,
  ChevronDown,
  ChevronUp,
  Database,
  Droplets,
  Fish,
  Flower2,
  Flag,
  Footprints,
  Gem,
  Globe2,
  Grid3X3,
  HandCoins,
  Hammer,
  Languages,
  Landmark,
  Layers3,
  LoaderCircle,
  Map,
  MapPin,
  Mountain,
  PanelTop,
  Palette,
  Plus,
  RefreshCw,
  Route,
  Scan,
  Ship,
  Shield,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Swords,
  TentTree,
  Thermometer,
  TowerControl,
  Umbrella,
  Wheat,
  Waypoints,
} from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { UserMenu } from "@/components/user-menu"
import { Logo } from "@/components/logo"
import {
  isMapEngineCommand,
  isMapEngineMessage,
  type CreationState,
  type CreationTool,
  type MapGlobalFilter,
  type MapLayerState,
  type MapSettlementSummary,
  type MapStylePreset,
  MAP_GLOBAL_FILTERS,
  MAP_LAYER_PRESETS,
  MAP_QUICK_LAYERS,
  type MapQuickLayerId,
} from "@/lib/map-creator-bridge"

const navigation = [
  { label: "Edit", icon: Hammer, description: "Open map editors and overviews." },
  { label: "Regenerate", icon: RefreshCw, description: "Rebuild selected map features." },
  { label: "Style", icon: Palette, description: "Shape the visual language of the map." },
  { label: "Settings", icon: Swords, description: "Configure world and application settings." },
] as const

const nativeToolGroups = [
  {
    label: "Edit",
    controls: [
      ["editBiomesButton", "Biomes"], ["overviewBurgsButton", "Burgs"], ["editCoastlineSettings", "Coastlines"],
      ["editCulturesButton", "Cultures"], ["editDiplomacyButton", "Diplomacy"], ["editEmblemButton", "Emblems"],
      ["editGoods", "Goods"], ["editHeightmapButton", "Heightmap"], ["overviewMarkersButton", "Markers"],
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
      ["addBurgTool", "Burg"], ["addLabel", "Label"], ["addMarker", "Point of Interest"], ["addRiver", "River"], ["addRoute", "Route"],
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
type ToolbarGroup = {
  label: string
  controls: readonly ToolbarControl[]
  firstCount: number
  columnStart: number
  colorClass: string
  usagePrefix?: string
}

type CreationCategory = "places" | "geography" | "infrastructure"

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

const creationCategories: Array<{ id: CreationCategory; label: string; icon: typeof MapPin }> = [
  { id: "places", label: "Places", icon: MapPin },
  { id: "geography", label: "Geography", icon: Mountain },
  { id: "infrastructure", label: "Infrastructure", icon: Route },
]

const layerIcons: Record<MapQuickLayerId, typeof Layers3> = {
  states: Flag,
  provinces: Landmark,
  cultures: Languages,
  religions: BookOpen,
  biomes: Flower2,
  heightmap: Mountain,
  rivers: Droplets,
  lakes: Fish,
  routes: Waypoints,
  goods: Database,
  trade: HandCoins,
  military: Swords,
  emblems: Shield,
  labels: MapPin,
  burgIcons: Building2,
  markers: Crosshair,
  ocean: Ship,
  compass: Compass,
  landmass: Map,
  texture: Palette,
  cells: Grid3X3,
  grid: PanelTop,
  coordinates: Scan,
  relief: TentTree,
  zones: Cone,
  borders: TowerControl,
  temperature: Thermometer,
  coastline: Umbrella,
  ice: Snowflake,
  markets: Gem,
  precipitation: CloudRain,
  population: Wheat,
  fogging: Cloud,
  rulers: Footprints,
  debug: Hammer,
  scaleBar: CircleGauge,
  vignette: Box,
  legend: Badge,
}

const layerColors: Record<MapQuickLayerId, string> = {
  states: "text-rose-300", provinces: "text-orange-300", cultures: "text-amber-300", religions: "text-violet-300",
  biomes: "text-emerald-300", heightmap: "text-lime-300", rivers: "text-cyan-300", lakes: "text-sky-300",
  routes: "text-yellow-300", goods: "text-teal-300", trade: "text-pink-300", military: "text-red-300",
  emblems: "text-fuchsia-300", labels: "text-white", burgIcons: "text-amber-200", markers: "text-red-200",
  ocean: "text-blue-300", compass: "text-indigo-300", landmass: "text-green-300", texture: "text-purple-300",
  cells: "text-slate-300", grid: "text-zinc-300", coordinates: "text-blue-200", relief: "text-stone-300",
  zones: "text-yellow-200", borders: "text-orange-200", temperature: "text-orange-300", coastline: "text-cyan-200",
  ice: "text-white", markets: "text-pink-200", precipitation: "text-blue-200", population: "text-emerald-200",
  fogging: "text-slate-200", rulers: "text-lime-200", debug: "text-red-200", scaleBar: "text-teal-200",
  vignette: "text-purple-200", legend: "text-amber-200",
}

const stylePresets: Array<{ id: MapStylePreset; label: string }> = [
  { id: "default", label: "Default" },
  { id: "ancient", label: "Ancient" },
  { id: "gloom", label: "Gloom" },
  { id: "pale", label: "Pale" },
  { id: "light", label: "Light" },
  { id: "watercolor", label: "Watercolor" },
  { id: "clean", label: "Clean" },
  { id: "atlas", label: "Atlas" },
  { id: "darkSeas", label: "Dark Seas" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "night", label: "Night" },
  { id: "monochrome", label: "Monochrome" },
]

const globalFilterLabels: Record<MapGlobalFilter, string> = {
  grayscale: "Grayscale",
  sepia: "Sepia",
  dingy: "Dingy",
  tint: "Tint",
}

const TOOLBAR_PANEL_HEIGHT = 76
const TOOLBAR_PANEL_CLASS = "absolute inset-x-0 top-0 z-10 max-h-[min(70vh,480px)] overflow-y-auto bg-slate-950 px-1.5 pb-1 pt-0 text-slate-100"
const TOOLBAR_OPTION_CLASS = "flex min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-0 py-0.5 text-center text-[6px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60"
const TOOLBAR_OPTION_TEXT_CLASS = "max-w-full truncate text-[6px] font-medium leading-none"
const TOOLBAR_OPTION_ICON_CLASS = "size-2.5 shrink-0 sm:size-3"
const TOOLBAR_BUTTON_CLASS = `${TOOLBAR_OPTION_CLASS} text-slate-400 hover:bg-slate-800 hover:text-white`
const TOOLBAR_GROUP_LABEL_CLASS = "mb-px border-b px-0.5 pb-px text-center text-[6px] font-semibold uppercase leading-none tracking-[0.12em]"
const TOOLBAR_USAGE_KEY = "world-engine:map-toolbar-usage:v1"
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

const nativeControlVisuals: Record<string, { icon: typeof Sparkles; color: string }> = {
  overviewBurgsButton: { icon: Building2, color: "text-amber-300" },
  overviewLabelsButton: { icon: MapPin, color: "text-white" },
  overviewMarkersButton: { icon: Crosshair, color: "text-red-200" },
  overviewMarketsButton: { icon: Gem, color: "text-pink-200" },
  overviewCellsButton: { icon: Grid3X3, color: "text-slate-300" },
  overviewChartsButton: { icon: CircleGauge, color: "text-cyan-300" },
  openMinimapButton: { icon: Map, color: "text-green-300" },
  openSubmapTool: { icon: Waypoints, color: "text-violet-300" },
  openTransformTool: { icon: Scan, color: "text-sky-300" },
  heightmapPreview: { icon: Mountain, color: "text-lime-300" },
  regenerate: { icon: RefreshCw, color: "text-orange-300" },
  exportButton: { icon: ArrowLeft, color: "text-cyan-300" },
  saveButton: { icon: Database, color: "text-emerald-300" },
  loadButton: { icon: Cloud, color: "text-sky-300" },
  zoomReset: { icon: Scan, color: "text-slate-300" },
}

export function MapGenerator({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const mapViewportRef = useRef<HTMLDivElement>(null)
  const layerRailRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<MapCreatorStatus>("loading")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [layerState, setLayerState] = useState<MapLayerState | null>(null)
  const [creationState, setCreationState] = useState<CreationState | null>(null)
  const [selectedSettlement, setSelectedSettlement] = useState<MapSettlementSummary | null>(null)
  const [stylePreset, setStylePreset] = useState<MapStylePreset | null>(null)
  const [globalFilter, setGlobalFilter] = useState<MapGlobalFilter | null>(null)
  const [isLayerPresetOpen, setIsLayerPresetOpen] = useState(false)
  const [isLayerRailCollapsed, setIsLayerRailCollapsed] = useState(true)
  const [isHomeOpen, setIsHomeOpen] = useState(true)
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
      if (event.data.type === "world:settlementSelected") setSelectedSettlement(event.data.settlement)
      if (event.data.type === "style:changed") setStylePreset(event.data.preset)
      if (event.data.type === "filter:changed") setGlobalFilter(event.data.filter)
    }

    window.addEventListener("message", handleEngineMessage)
    return () => window.removeEventListener("message", handleEngineMessage)
  }, [])

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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && activeCategory === "Edit" && creationState) {
        event.preventDefault()
        setCreationMode(creationState.tool, false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeCategory, creationState])

  function retry() {
    setStatus("loading")
    setIsHomeOpen(true)
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

    const visible = !layerState?.active.includes(layer)
    const command = { source: "world-engine-azgaar", type: "toggleLayer", layer, visible }
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function selectStylePreset(preset: MapStylePreset) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "setStylePreset", preset }
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
    if (id === "create") {
      clickNativeControl("savePresetButton")
      return
    }
    if (MAP_LAYER_PRESETS.includes(id as (typeof MAP_LAYER_PRESETS)[number])) {
      selectLayerPreset(id as (typeof MAP_LAYER_PRESETS)[number])
    }
  }

  function selectGlobalFilter(filter: MapGlobalFilter) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return
    const command = { source: "world-engine-azgaar", type: "setGlobalFilter", filter: globalFilter === filter ? null : filter } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function sendViewCommand(type: "view:resetZoom" | "view:openMinimap" | "view:openMeasurers") {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function clickNativeControl(id: string) {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

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

  const mapViewportStyle = activeCategory
    ? { top: TOOLBAR_PANEL_HEIGHT, height: `calc(100% - ${TOOLBAR_PANEL_HEIGHT}px)` }
    : { top: 0, height: "100%" }

  const renderLayerButton = (layer: (typeof MAP_QUICK_LAYERS)[number], showLabel: boolean) => {
    if (layer.id === "fogging") {
      return (
        <button
          key={layer.id}
          type="button"
          aria-label="Layers Preset"
          aria-expanded={isLayerPresetOpen}
          title="Layers Preset"
          disabled={status !== "ready"}
          onClick={() => setIsLayerPresetOpen((open) => !open)}
          className={`${TOOLBAR_BUTTON_CLASS} ${isLayerPresetOpen ? "bg-sky-400/15 text-sky-100" : ""}`}
        >
          <Layers3 className={`${TOOLBAR_OPTION_ICON_CLASS} text-sky-300`} />
          {showLabel && <span className={TOOLBAR_OPTION_TEXT_CLASS}>Layers Preset</span>}
        </button>
      )
    }
    const Icon = layerIcons[layer.id]
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
        className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-0.5 py-0.5 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60 sm:min-w-0 sm:px-0.5 ${
          isSelected
            ? "bg-sky-400/15 text-sky-100"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <Icon className={`size-3 shrink-0 sm:size-3.5 ${layerColors[layer.id]}`} />
        {showLabel && <span className="hidden max-w-full truncate text-[8px] font-medium sm:block">{layer.label}</span>}
      </button>
    )
  }

  const renderNativeControl = ([id, label]: readonly [string, string], colorClass = "text-slate-400") => {
    const visual = nativeControlVisuals[id] ?? { icon: Sparkles, color: "text-sky-300" }
    const Icon = visual.icon
    return (
      <button
        key={id}
        type="button"
        disabled={status !== "ready"}
        onClick={() => {
          recordToolbarUse(`native:${id}`)
          clickNativeControl(id)
        }}
        className={`${TOOLBAR_BUTTON_CLASS} ${colorClass}`}
      >
        <Icon className={`${TOOLBAR_OPTION_ICON_CLASS} ${colorClass}`} />
        <span className={TOOLBAR_OPTION_TEXT_CLASS}>{label}</span>
      </button>
    )
  }
  const getToolbarQuickControls = (controls: readonly ToolbarControl[], usagePrefix = "native") =>
    [...controls].sort(([leftId], [rightId]) => {
      const leftScore = toolbarUsage[`${usagePrefix}:${leftId}`] ?? 0
      const rightScore = toolbarUsage[`${usagePrefix}:${rightId}`] ?? 0
      if (rightScore !== leftScore) return rightScore - leftScore
      return (TOOLBAR_DEFAULT_PRIORITY[leftId] ?? 99) - (TOOLBAR_DEFAULT_PRIORITY[rightId] ?? 99)
    })

  const getNativeControlsForGroups = (labels: string[]) => nativeToolGroups
    .filter((group) => labels.includes(group.label))
    .flatMap((group) => group.controls as readonly ToolbarControl[])

  const renderToolbarGroups = (
    groups: readonly ToolbarGroup[],
    showAll: boolean,
    renderControl: (control: ToolbarControl, colorClass: string) => ReactNode,
  ) => (
    <div className="grid w-full min-w-0 gap-x-1" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
      {groups.map((group) => {
        const sortedControls = getToolbarQuickControls(group.controls, group.usagePrefix)
        const controls = showAll ? sortedControls : sortedControls.slice(0, group.firstCount)
        if (!controls.length) return null
        return (
          <div key={group.label} className="min-w-0" style={{ gridColumn: `${group.columnStart} / span ${controls.length}` }}>
            <p className={`${TOOLBAR_GROUP_LABEL_CLASS} ${group.colorClass} border-current`}>{group.label}</p>
            <div className="grid min-w-0 gap-px" style={{ gridTemplateColumns: `repeat(${controls.length}, minmax(0, 1fr))` }}>
              {controls.map((control) => renderControl(control, group.colorClass))}
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderCreationControl = ([id, label]: ToolbarControl, colorClass: string) => {
    const tool = creationTools.find((item) => item.id === id)
    if (!tool) return renderNativeControl([id, label], colorClass)
    const isActive = creationState?.tool === tool.id && creationState.active
    const CategoryIcon = creationCategories.find((category) => category.id === tool.category)?.icon ?? Sparkles
    return (
      <button
        key={id}
        type="button"
        aria-pressed={isActive}
        disabled={status !== "ready"}
        onClick={() => {
          recordToolbarUse(`create:${tool.id}`)
          setCreationMode(tool.id, !isActive)
        }}
        className={`${toolActionButtonClass(isActive)} ${colorClass}`}
      >
        <CategoryIcon className={TOOLBAR_OPTION_ICON_CLASS + " text-sky-300"} />
        <span className={TOOLBAR_OPTION_TEXT_CLASS}>{label}</span>
        <span className="hidden">{tool.description}</span>
      </button>
    )
  }

  const renderWorldControl = ([id, label]: ToolbarControl, colorClass: string) => {
    if (id === "settlements") {
      return (
        <button key={id} type="button" disabled={status !== "ready"} onClick={() => {
          recordToolbarUse("native:settlements")
          openSettlementDirectory()
        }} className={`${TOOLBAR_BUTTON_CLASS} ${colorClass}`}>
          <Globe2 className={TOOLBAR_OPTION_ICON_CLASS + " " + colorClass} />
          <span className={TOOLBAR_OPTION_TEXT_CLASS}>{label}</span>
        </button>
      )
    }
    return renderNativeControl([id, label], colorClass)
  }

  const renderStyleControl = ([id, label]: ToolbarControl, colorClass: string) => {
    if (["resetZoom", "openMinimap", "openMeasurers"].includes(id)) {
      const viewType = `view:${id}` as "view:resetZoom" | "view:openMinimap" | "view:openMeasurers"
      const Icon = id === "openMinimap" ? Map : id === "openMeasurers" ? Footprints : Scan
      return (
        <button key={id} type="button" disabled={status !== "ready"} onClick={() => {
          recordToolbarUse(`view:${id}`)
          sendViewCommand(viewType)
        }} className={`${TOOLBAR_BUTTON_CLASS} ${colorClass}`}>
          <Icon className={`${TOOLBAR_OPTION_ICON_CLASS} ${colorClass}`} />
          <span className={TOOLBAR_OPTION_TEXT_CLASS}>{label}</span>
        </button>
      )
    }
    const preset = stylePresets.find((item) => item.id === id)
    if (!preset) return null
    const isSelected = stylePreset === preset.id
    return (
      <button
        key={id}
        type="button"
        role="radio"
        aria-checked={isSelected}
        disabled={status !== "ready"}
        onClick={() => {
          recordToolbarUse(`style:${preset.id}`)
          selectStylePreset(preset.id)
        }}
        className={`${toolActionButtonClass(isSelected)} ${colorClass}`}
      >
        <Palette className={TOOLBAR_OPTION_ICON_CLASS + " " + colorClass} />
        <span className={TOOLBAR_OPTION_TEXT_CLASS}>{label}</span>
      </button>
    )
  }

  const settlementCreationControl = ["settlement", "Settlement"] as const
  const editControls: ToolbarControl[] = [
    ["settlements", "Settlements"],
    ...getNativeControlsForGroups(["Edit", "Show", "Create"]),
  ]
  const regenerateControls: ToolbarControl[] = getNativeControlsForGroups(["Regenerate", "Add"])
  const subgroup = (label: string, colorClass: string): ToolbarGroup[] => [
    { label, controls: getNativeControlsForGroups([label]), firstCount: 40, columnStart: 1, colorClass },
  ]
  const styleGroups: ToolbarGroup[] = [
    { label: "Presets", controls: stylePresets.map((preset) => [preset.id, preset.label] as const), firstCount: 12, columnStart: 1, colorClass: "text-sky-300", usagePrefix: "style" },
  ]

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="relative z-20 flex min-h-14 shrink-0 items-center gap-2 bg-slate-950 px-1.5 py-1 backdrop-blur-xl sm:px-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo className="size-8" />
          <div className="min-w-0 leading-none">
            <span className="block truncate text-sm font-semibold tracking-tight text-slate-100 sm:text-[15px]">
              World Engine
            </span>
            <span className="mt-1 block truncate text-[9px] font-medium uppercase tracking-[0.14em] text-sky-200/60">
              Map Creator
            </span>
          </div>
        </div>

        <nav aria-label="Map Creator tools" className="flex min-w-0 flex-1 items-center justify-start gap-0.5 overflow-x-auto">
          {navigation.map(({ label, icon: Icon }) => {
            const isActive = activeCategory === label
            return (
              <button
                key={label}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveCategory(isActive ? null : label)}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0 rounded-md px-0 py-0.5 text-center text-[6px] font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60 ${
                  isActive
                    ? "bg-sky-400/15 text-emerald-300"
                    : "text-emerald-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="size-2.5 shrink-0 text-emerald-300 sm:size-3" />
                <span className="max-w-full truncate text-[6px] font-medium leading-none">{label}</span>
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
          className={`absolute inset-0 min-h-0 transition-[padding,top,height] duration-200 ${!isLayerRailCollapsed ? "pb-12" : "pb-8"}`}
        >
          <iframe
            key={frameKey}
            ref={iframeRef}
            src="/fantasy-map-generator/index.html"
            className="pointer-events-auto block h-full w-full border-0"
            title="World Engine Map Creator map"
            onError={() => setStatus("error")}
          />
        </div>

        {isLayerPresetOpen && status === "ready" && (
          <div className="pointer-events-auto absolute inset-0 z-25 flex items-center justify-center bg-slate-950/20 px-4" role="dialog" aria-label="Layers Preset">
            <div className="grid aspect-[5/3] w-[min(88vw,32rem)] grid-cols-5 grid-rows-3 gap-1.5 rounded-2xl border border-sky-200/20 bg-slate-950/95 p-2.5 shadow-2xl backdrop-blur-xl sm:gap-2 sm:p-3">
              {layerPresetButtons.map(([id, label], index) => {
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
                <button type="button" onClick={() => { clickNativeControl("optionsTab"); setIsHomeOpen(false) }} className="mt-3 flex min-h-16 w-full items-center justify-center gap-2 border border-emerald-300/35 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                  <SlidersHorizontal className="size-4" />
                  Configure New Map
                </button>
              </div>
            </div>
          </section>
        )}

        <aside ref={layerRailRef} className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 overflow-visible bg-slate-950 px-1.5 py-1" aria-label="Map layers">
          <button
            type="button"
            aria-label={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            title={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            onClick={() => setIsLayerRailCollapsed((collapsed) => !collapsed)}
            className={`pointer-events-auto absolute right-2 top-0 z-10 h-4 w-10 rounded-t-md rounded-b-none bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isLayerRailCollapsed ? "-translate-y-[calc(100%+6px)]" : "-translate-y-full"}`}
          >
            <span className="flex size-full items-center justify-center">
              {isLayerRailCollapsed ? <ChevronUp className="size-3" aria-hidden="true" /> : <ChevronDown className="size-3" aria-hidden="true" />}
            </span>
          </button>
          <div className={`relative z-10 grid w-full grid-cols-10 gap-0.5 sm:grid-cols-19 ${isLayerRailCollapsed ? "-translate-y-[3px]" : ""}`}>
            {MAP_QUICK_LAYERS.slice(0, 19).map((layer) => renderLayerButton(layer, !isLayerRailCollapsed))}
          </div>
          {!isLayerRailCollapsed && (
            <div className="relative z-10 mt-0.5 grid w-full grid-cols-10 gap-0.5 pt-0.5 sm:grid-cols-19">
              {MAP_QUICK_LAYERS.slice(19).map((layer) => renderLayerButton(layer, true))}
            </div>
          )}
        </aside>

        {activeCategory === "Edit" ? (

          <section className={TOOLBAR_PANEL_CLASS} aria-label="Edit tools">
            <div className="space-y-1.5">
              <div className="grid w-full grid-cols-10 gap-px sm:grid-cols-19">
                {editControls.map((control) => control[0] === "settlements" ? renderWorldControl(control, "text-emerald-300") : renderNativeControl(control, "text-sky-300"))}
                {renderCreationControl(settlementCreationControl, "text-emerald-300")}
              </div>
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
            <div className="grid w-full grid-cols-10 gap-px sm:grid-cols-19">
              {regenerateControls.map((control) => renderNativeControl(control, control[0].startsWith("add") ? "text-emerald-300" : "text-orange-300"))}
            </div>
          </section>
        ) : activeCategory === "Style" ? (
          <section className={TOOLBAR_PANEL_CLASS} aria-label="Map style">
            <div className="space-y-1.5">
              {renderToolbarGroups(styleGroups, true, renderStyleControl)}
              {renderToolbarGroups(subgroup("Heightmap", "text-lime-300"), true, renderNativeControl)}
              <div className="border-t border-sky-900/80 pt-1">
                <p className="mb-1 text-center text-[7px] font-semibold uppercase tracking-[0.12em] text-fuchsia-300">Toggle global filters</p>
                <div className="grid grid-cols-4 gap-px">
                  {MAP_GLOBAL_FILTERS.map((filter) => (
                    <button key={filter} type="button" aria-pressed={globalFilter === filter} disabled={status !== "ready"} onClick={() => selectGlobalFilter(filter)} className={toolActionButtonClass(globalFilter === filter) + " min-h-8 px-1"}>
                      <span className="text-[8px]">{globalFilterLabels[filter]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : activeCategory === "Settings" ? (
          <section className={TOOLBAR_PANEL_CLASS} aria-label="Map settings">
            <div className="space-y-1.5">
              {renderToolbarGroups(subgroup("Settings", "text-violet-300"), true, renderNativeControl)}
              <div className="grid w-full grid-cols-4 gap-px border-t border-sky-900/80 pt-1">
                {nativeFileControls.map((control) => renderNativeControl(control, "text-cyan-300"))}
              </div>
            </div>
          </section>
        ) : activeCategory ? (
          <section className={TOOLBAR_PANEL_CLASS}>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">{activeCategory}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {navigation.find((item) => item.label === activeCategory)?.description}
                </p>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
                  Focused World Engine tools will appear here as they are migrated. Existing Azgaar controls remain available on the map.
                </p>
              </div>
            </div>
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