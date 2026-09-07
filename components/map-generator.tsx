"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  Flag,
  Globe2,
  Grid3X3,
  Layers3,
  LoaderCircle,
  MapPin,
  Mountain,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  Plus,
  RefreshCw,
  Route,
  Sparkles,
  Swords,
  Waves,
} from "lucide-react"
import type { Project } from "@/lib/mock-data"
import { UserMenu } from "@/components/user-menu"
import { Logo } from "@/components/logo"
import {
  isMapEngineCommand,
  isMapEngineMessage,
  type CreationState,
  type CreationTool,
  type MapLayerState,
  type MapSettlementSummary,
  type MapStylePreset,
  MAP_QUICK_LAYERS,
  type MapQuickLayerId,
} from "@/lib/map-creator-bridge"

const navigation = [
  { label: "World", icon: Globe2, description: "Explore the systems and places in this world." },
  { label: "Create", icon: Plus, description: "Add places, routes, labels, and other map entities." },
  { label: "Style", icon: Palette, description: "Shape the visual language of the map." },
  { label: "View", icon: Eye, description: "Control how you move through and inspect the map." },
  { label: "Tools", icon: Swords, description: "Open the original Azgaar editors and map tools." },
  { label: "File", icon: Globe2, description: "Create, save, load, export, and reset the map." },
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
      ["regenerate", "New map"],
    ],
  },
  {
    label: "Map tools",
    controls: [
      ["overviewCellsButton", "Cells"], ["overviewChartsButton", "Charts"], ["openMinimapButton", "Minimap"],
      ["openSubmapTool", "Submap"], ["openTransformTool", "Transform"], ["addBurgTool", "Burg"],
      ["addLabel", "Label"], ["addMarker", "Marker"], ["addRiver", "River"], ["addRoute", "Route"],
      ["heightmapPreview", "Heightmap preview"], ["heightmap3DView", "Heightmap 3D"], ["finalizeHeightmap", "Finish heightmap"],
    ],
  },
  {
    label: "Settings",
    controls: [["configureWorld", "Configure world"], ["restoreDefaultCanvasSize", "Default canvas"], ["optionsReset", "Reset options"]],
  },
] as const

const nativeFileControls = [["newMapButton", "New map"], ["exportButton", "Export"], ["saveButton", "Save"], ["loadButton", "Load"], ["zoomReset", "Reset zoom"]] as const

type MapCreatorStatus = "loading" | "ready" | "error"

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
  cultures: Grid3X3,
  religions: Waves,
  provinces: Layers3,
  biomes: Mountain,
  heightmap: Mountain,
  lakes: Waves,
  rivers: Waves,
  routes: Route,
  goods: Grid3X3,
  trade: Route,
  military: Swords,
  emblems: Flag,
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

const TOOLBAR_PANEL_HEIGHT = 88

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
  const [status, setStatus] = useState<MapCreatorStatus>("loading")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [layerState, setLayerState] = useState<MapLayerState | null>(null)
  const [creationState, setCreationState] = useState<CreationState | null>(null)
  const [creationNotice, setCreationNotice] = useState<string | null>(null)
  const [selectedSettlement, setSelectedSettlement] = useState<MapSettlementSummary | null>(null)
  const [stylePreset, setStylePreset] = useState<MapStylePreset | null>(null)
  const [isLayerRailCollapsed, setIsLayerRailCollapsed] = useState(true)
  const [frameKey, setFrameKey] = useState(0)

  useEffect(() => {
    function handleEngineMessage(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        !isMapEngineMessage(event.data)
      ) return

      if (event.data.type === "ready") setStatus("ready")
      if (event.data.type === "error") setStatus("error")
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
        const tool = creationTools.find(item => item.id === event.data.tool)
        setCreationNotice(event.data.name ? `${event.data.name} created` : `${tool?.label ?? "Item"} created`)
      }
      if (event.data.type === "world:settlementSelected") setSelectedSettlement(event.data.settlement)
      if (event.data.type === "style:changed") setStylePreset(event.data.preset)
    }

    window.addEventListener("message", handleEngineMessage)
    return () => window.removeEventListener("message", handleEngineMessage)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "error" : current))
    }, 20000)

    return () => window.clearTimeout(timeout)
  }, [frameKey])

  useEffect(() => {
    if (activeCategory !== "Create" && creationState) setCreationMode(creationState.tool, false)
  }, [activeCategory, creationState])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && activeCategory === "Create" && creationState) {
        event.preventDefault()
        setCreationMode(creationState.tool, false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeCategory, creationState])

  function retry() {
    setStatus("loading")
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

    setCreationNotice(null)
    const command = { source: "world-engine-azgaar", type: "creation:mode", tool, active }
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  function completeRoute() {
    const frame = iframeRef.current?.contentWindow
    if (!frame || status !== "ready") return

    const command = { source: "world-engine-azgaar", type: "creation:complete", tool: "route" } as const
    if (isMapEngineCommand(command)) frame.postMessage(command, window.location.origin)
  }

  const mapViewportStyle = activeCategory
    ? { top: TOOLBAR_PANEL_HEIGHT, height: `calc(100% - ${TOOLBAR_PANEL_HEIGHT}px)` }
    : { top: 0, height: "100%" }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="relative z-20 flex min-h-16 shrink-0 items-center gap-3 border-b border-border/70 bg-card/95 px-3 shadow-sm backdrop-blur-xl sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Logo className="size-8" />
          <div className="min-w-0 leading-none">
            <span className="block truncate text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
              World Engine
            </span>
            <span className="mt-1 block truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Map Creator
            </span>
          </div>
        </div>

        <nav aria-label="Map Creator tools" className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto">
          {navigation.map(({ label, icon: Icon }) => {
            const isActive = activeCategory === label
            return (
              <button
                key={label}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveCategory(isActive ? null : label)}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1.5 py-1.5 text-[10px] font-medium transition-colors sm:max-w-24 sm:px-2 ${
                  isActive
                    ? "bg-primary/12 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-3" />
                <span>{label}</span>
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
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border/70 px-2 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-3.5" />
          <span className="hidden lg:inline">Back</span>
        </button>
      </header>

      <main className="relative min-h-0 flex-1 overflow-hidden bg-slate-950">
        <div
          ref={mapViewportRef}
          style={mapViewportStyle}
          className={`absolute inset-x-0 min-h-0 ${isLayerRailCollapsed ? "pl-7" : "pl-24"} transition-[padding,top,height] duration-200`}
        >
          <iframe
            key={frameKey}
            ref={iframeRef}
            src="/fantasy-map-generator/index.html"
            className="block h-full w-full border-0"
            title="World Engine Map Creator map"
            onError={() => setStatus("error")}
          />
        </div>

        <aside className={`absolute bottom-0 left-0 top-0 z-20 flex flex-col border-r border-slate-700/80 bg-slate-950/95 py-1 shadow-xl transition-[width] duration-200 ${isLayerRailCollapsed ? "w-7" : "w-24"}`} aria-label="Layer quick rail">
          <button
            type="button"
            aria-label={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            title={isLayerRailCollapsed ? "Expand layer quick rail" : "Collapse layer quick rail"}
            onClick={() => setIsLayerRailCollapsed((collapsed) => !collapsed)}
            className="mx-auto flex size-5 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            {isLayerRailCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
          <div className="my-1 border-t border-slate-800" />
          <div className="flex flex-col gap-px px-1">
            {MAP_QUICK_LAYERS.map((layer) => {
              const Icon = layerIcons[layer.id]
              const isSelected = layerState?.active.includes(layer.id) ?? false
              return (
                <button
                  key={layer.id}
                  type="button"
                  aria-label={layer.label}
                  aria-pressed={isSelected}
                  title={isLayerRailCollapsed ? layer.label : layer.description}
                  disabled={status !== "ready"}
                  onClick={() => toggleLayer(layer.id)}
                  className={`flex h-6 shrink-0 items-center gap-1 rounded-md text-left text-[9px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-wait disabled:opacity-60 ${
                      isLayerRailCollapsed ? "justify-center px-0" : "px-1"
                  } ${
                    isSelected
                      ? "bg-sky-400/15 text-sky-100"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="size-3 shrink-0" />
                  {!isLayerRailCollapsed && <span className="truncate">{layer.label}</span>}
                </button>
              )
            })}
          </div>
        </aside>

        {activeCategory === "Create" ? (
          <section className="absolute inset-x-2 top-2 z-10 max-h-[82px] overflow-y-auto rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="flex items-start gap-3">
              <Plus className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Create</h2>
                <p className="hidden">
                  Choose a tool, then work directly on the map using Azgaar's native controls.
                </p>
              </div>
            </div>

            {creationState && (() => {
              const activeTool = creationTools.find(item => item.id === creationState.tool)
              return (
                <div className="mt-2 rounded-lg border border-primary/40 bg-primary/10 px-2 py-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-primary">{activeTool?.label} active</span>
                    <button
                      type="button"
                      onClick={() => setCreationMode(creationState.tool, false)}
                      className="rounded-md px-2 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="hidden">
                    {creationState.tool === "route"
                      ? creationState.points === 0
                        ? "Click the map to begin your route."
                        : creationState.points === 1
                          ? "Add one more point to make a route."
                          : `${creationState.points} points added. Finish when the route is ready.`
                      : activeTool?.instruction}
                  </p>
                  {creationState.tool === "route" && creationState.points !== undefined && creationState.points >= 2 && (
                    <button
                      type="button"
                      onClick={completeRoute}
                      className="mt-1 rounded-md bg-primary px-2 py-1 text-[11px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Finish route
                    </button>
                  )}
                </div>
              )
            })()}

            {creationNotice && (
              <p role="status" className="mt-3 rounded-md bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
                {creationNotice}
              </p>
            )}

            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {creationCategories.map((category) => {
                const tools = creationTools.filter(tool => tool.category === category.id)
                if (!tools.length) return null
                const CategoryIcon = category.icon
                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      <CategoryIcon className="size-3" />
                      <span>{category.label}</span>
                    </div>
                    <div className="mt-1.5 space-y-1.5">
                      {tools.map((tool) => {
                        const isActive = creationState?.tool === tool.id && creationState.active
                        return (
                          <button
                            key={tool.id}
                            type="button"
                            aria-pressed={isActive}
                            disabled={status !== "ready"}
                            onClick={() => setCreationMode(tool.id, !isActive)}
                              className={`flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60 ${
                              isActive
                                ? "border-primary/50 bg-primary/10"
                                : "border-border/70 bg-background/60 hover:border-primary/30 hover:bg-muted"
                            }`}
                          >
                            <span>
                              <span className="block text-xs font-semibold text-foreground">{tool.label}</span>
                              <span className="hidden">{tool.description}</span>
                            </span>
                            {isActive && (
                              <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                                Active
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="hidden">
              {creationState
                ? "Press Escape, choose Cancel, or pick another tool to stop."
                : "Existing Azgaar creation tools remain available on the map."}
            </p>
          </section>
        ) : activeCategory === "World" ? (

          <section className="absolute inset-x-2 top-2 z-10 max-h-[82px] overflow-y-auto rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="flex items-start gap-3">
              <Globe2 className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">World entities</h2>
                <p className="hidden">
                  Explore the places that make up this world, starting with its settlements.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={status !== "ready"}
              onClick={openSettlementDirectory}
              className="mt-2 rounded-md border border-border/70 bg-background/60 px-2 py-1.5 text-left transition-colors hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
            >
              <span className="block text-xs font-semibold text-foreground">Settlement directory</span>
                <span className="hidden">
                Search settlements, identify them on the map, and open their full details.
              </span>
            </button>
            {selectedSettlement && (
              <div className="mt-3 border-t border-border/70 pt-3">
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
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={status !== "ready"}
                    onClick={locateSettlement}
                    className="rounded-md border border-primary/35 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
                  >
                    Locate on map
                  </button>
                  <button
                    type="button"
                    disabled={status !== "ready"}
                    onClick={openSettlementEditor}
                    className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
                  >
                    Open full editor
                  </button>
                </div>
              </div>
            )}
            <p className="hidden">
              The directory uses Azgaar's live settlement data and editor. More world systems will join this workspace as they are migrated.
            </p>
          </section>
        ) : activeCategory === "Tools" ? (
          <section className="absolute inset-x-2 top-2 z-10 max-h-[82px] overflow-y-auto rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="grid gap-1.5 sm:grid-cols-3">
              {nativeToolGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{group.label}</p>
                  <div className="flex flex-wrap gap-1">
                    {group.controls.map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        disabled={status !== "ready"}
                        onClick={() => clickNativeControl(id)}
                        className="rounded border border-border/70 bg-background/60 px-1.5 py-0.5 text-[9px] font-medium text-foreground hover:bg-muted disabled:cursor-wait disabled:opacity-60"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : activeCategory === "File" ? (
          <section className="absolute inset-x-2 top-2 z-10 rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="flex flex-wrap gap-1">
              {nativeFileControls.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  disabled={status !== "ready"}
                  onClick={() => clickNativeControl(id)}
                  className="rounded border border-border/70 bg-background/60 px-2 py-1 text-[10px] font-semibold text-foreground hover:bg-muted disabled:cursor-wait disabled:opacity-60"
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        ) : activeCategory === "View" ? (
          <section className="absolute inset-x-2 top-2 z-10 max-h-[82px] overflow-y-auto rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="flex items-start gap-3">
              <Eye className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Map view</h2>
                <p className="hidden">
                  Reorient yourself without leaving the map workspace.
                </p>
              </div>
            </div>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
              <button
                type="button"
                disabled={status !== "ready"}
                onClick={() => sendViewCommand("view:resetZoom")}
                className="rounded-md border border-border/70 bg-background/60 px-2 py-1.5 text-left transition-colors hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
              >
                <span className="block text-xs font-semibold text-foreground">Reset zoom</span>
                <span className="hidden">Return to the map's default view.</span>
              </button>
              <button
                type="button"
                disabled={status !== "ready"}
                onClick={() => sendViewCommand("view:openMinimap")}
                className="rounded-md border border-border/70 bg-background/60 px-2 py-1.5 text-left transition-colors hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
              >
                <span className="block text-xs font-semibold text-foreground">Minimap</span>
                <span className="hidden">Open Azgaar's map overview to navigate.</span>
              </button>
              <button
                type="button"
                disabled={status !== "ready"}
                onClick={() => sendViewCommand("view:openMeasurers")}
                className="rounded-md border border-border/70 bg-background/60 px-2 py-1.5 text-left transition-colors hover:border-primary/30 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60"
              >
                <span className="block text-xs font-semibold text-foreground">Measure distance</span>
                <span className="hidden">Place rulers and measurers on the map.</span>
              </button>
            </div>
            <p className="hidden">
              More detailed view and inspection controls remain available in Azgaar while they are brought into Map Creator.
            </p>
          </section>
        ) : activeCategory === "Style" ? (
          <section className="absolute inset-x-2 top-2 z-10 max-h-[82px] overflow-y-auto rounded-lg border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-xl sm:inset-x-3">
            <div className="flex items-start gap-3">
              <Palette className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-foreground">Map style</h2>
                <p className="hidden">
                  Choose a color and rendering style for the whole map.
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1" role="radiogroup" aria-label="Map style">
              {stylePresets.map((preset) => {
                const isSelected = stylePreset === preset.id
                return (
                  <button
                    key={preset.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={status !== "ready"}
                    onClick={() => selectStylePreset(preset.id)}
                    className={`rounded-md border px-2 py-1.5 text-left text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-60 ${
                      isSelected
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/70 bg-background/60 text-foreground hover:border-primary/30 hover:bg-muted"
                    }`}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
            <p className="hidden">
              Azgaar may ask you to confirm the first style change in a session. Detailed color, border, and label controls remain available in the native style editor.
            </p>
          </section>
        ) : activeCategory ? (
          <section className="absolute inset-x-2 top-2 z-10 h-24 overflow-hidden rounded-lg border border-border/80 bg-card/95 p-2 shadow-xl backdrop-blur-xl sm:inset-x-3">
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
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/90 px-4 py-8">
            {status === "loading" ? (
              <section role="status" aria-live="polite" className="w-full max-w-sm text-center text-white">
                <Logo className="mx-auto size-12 bg-white/10 text-white ring-white/20" />
                <p className="mt-5 text-xl font-semibold tracking-tight">World Engine</p>
                <p className="mt-1 text-sm text-white/70">Map Creator</p>
                <LoaderCircle className="mx-auto mt-7 size-5 animate-spin text-sky-300" />
                <p className="mt-3 text-xs text-white/65">Preparing your map workspace</p>
                <p className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/45">
                  <img
                    src="/fantasy-map-generator/images/icons/favicon-32x32.png"
                    alt="Azgaar"
                    className="size-4 rounded-sm opacity-70"
                  />
                  <span>Powered by Azgaar Fantasy Map Generator</span>
                </p>
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
                <p className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/45">
                  <img
                    src="/fantasy-map-generator/images/icons/favicon-32x32.png"
                    alt="Azgaar"
                    className="size-4 rounded-sm opacity-70"
                  />
                  <span>Powered by Azgaar Fantasy Map Generator</span>
                </p>
              </section>
            )}
          </div>
        )}
      </main>

    </div>
  )
}