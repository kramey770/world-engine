export const MAP_ENGINE_MESSAGE_SOURCE = "world-engine-azgaar"

export const MAP_LAYER_PRESETS = [
  "political",
  "cultural",
  "religions",
  "provinces",
  "biomes",
  "heightmap",
  "physical",
  "poi",
  "goods",
  "trade",
  "military",
  "emblems",
  "landmass",
] as const

export type MapLayerPreset = (typeof MAP_LAYER_PRESETS)[number]

export type MapLayerState = {
  active: string[]
  order: string[]
  preset: MapLayerPreset | null
}

export const MAP_QUICK_LAYERS = [
  { id: "states", label: "States", description: "Realm and political boundaries." },
  { id: "provinces", label: "Provinces", description: "Provincial boundaries and domains." },
  { id: "cultures", label: "Cultures", description: "Cultural regions and identity." },
  { id: "religions", label: "Religions", description: "Religious regions and places." },
  { id: "biomes", label: "Biomes", description: "Ecological regions across the land." },
  { id: "heightmap", label: "Heightmap", description: "Elevation and terrain." },
  { id: "rivers", label: "Rivers", description: "Rivers and waterways." },
  { id: "lakes", label: "Lakes", description: "Lakes and inland water." },
  { id: "routes", label: "Routes", description: "Routes and infrastructure." },
  { id: "goods", label: "Goods", description: "Goods and resources." },
  { id: "trade", label: "Trade", description: "Trade activity." },
  { id: "military", label: "Military", description: "Military forces." },
  { id: "emblems", label: "Emblems", description: "Realm and settlement emblems." },
  { id: "labels", label: "Labels", description: "Map labels and names." },
  { id: "burgIcons", label: "Burg icons", description: "Settlement symbols." },
  { id: "markers", label: "Markers", description: "Custom map markers." },
  { id: "ocean", label: "Ocean", description: "Ocean water and fill." },
  { id: "compass", label: "Compass", description: "Map compass." },
  { id: "landmass", label: "Landmass", description: "Landmass fill." },
  { id: "texture", label: "Texture", description: "Map texture." },
  { id: "cells", label: "Cells", description: "Voronoi cell boundaries." },
  { id: "grid", label: "Grid", description: "Map coordinate grid." },
  { id: "coordinates", label: "Coordinates", description: "Coordinate readouts." },
  { id: "relief", label: "Relief", description: "Relief and terrain icons." },
  { id: "zones", label: "Zones", description: "Map zones." },
  { id: "borders", label: "Borders", description: "Political borders." },
  { id: "temperature", label: "Temperature", description: "Temperature overlay." },
  { id: "coastline", label: "Coastline", description: "Coastline features." },
  { id: "ice", label: "Ice", description: "Ice and frozen features." },
  { id: "markets", label: "Markets", description: "Market locations." },
  { id: "precipitation", label: "Precipitation", description: "Precipitation overlay." },
  { id: "population", label: "Population", description: "Population overlay." },
  { id: "fogging", label: "Fogging", description: "Toggle the map fog overlay." },
  { id: "rulers", label: "Rulers", description: "Map rulers." },
  { id: "debug", label: "Debug", description: "Toggle debug guides and highlights." },
  { id: "scaleBar", label: "Scale bar", description: "Map scale bar." },
  { id: "vignette", label: "Vignette", description: "Map vignette." },
  { id: "legend", label: "Legend", description: "Toggle the map legend." },
] as const

export type MapQuickLayerId = (typeof MAP_QUICK_LAYERS)[number]["id"]

export const MAP_STYLE_PRESETS = [
  "default",
  "ancient",
  "gloom",
  "pale",
  "light",
  "watercolor",
  "clean",
  "atlas",
  "darkSeas",
  "cyberpunk",
  "night",
  "monochrome",
] as const

export type MapStylePreset = (typeof MAP_STYLE_PRESETS)[number]

export const MAP_GLOBAL_FILTERS = ["grayscale", "sepia", "dingy", "tint"] as const
export type MapGlobalFilter = (typeof MAP_GLOBAL_FILTERS)[number]

export const MAP_VIEW_MODES = ["viewStandard", "viewMesh", "viewGlobe"] as const
export type MapViewMode = (typeof MAP_VIEW_MODES)[number]

export type CreationTool = "settlement" | "marker" | "route" | "river"

export type CreationState = {
  tool: CreationTool
  active: boolean
  points?: number
}

export type MapSettlementSummary = {
  id: number
  name: string
  population: number
  realm?: string
  province?: string
  culture?: string
  group?: string
  capital: boolean
  port: boolean
  citadel: boolean
}

export type MapEngineMessage =
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "ready"; state?: MapLayerState }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "error"; message?: string }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "interaction" }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "layers:changed"; state: MapLayerState }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:mode"; tool: CreationTool; active: boolean }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:progress"; tool: "route"; points: number }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:completed"; tool: CreationTool; id: number; name?: string }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "world:settlementSelected"; settlement: MapSettlementSummary }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "style:changed"; preset: MapStylePreset | null }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "filter:changed"; filter: MapGlobalFilter | null }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "view:changed"; mode: MapViewMode }

export type MapEngineCommand = {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "viewport:resize"
  mode: "large" | "small"
  width: number
  height: number
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setLayerPreset"
  preset: MapLayerPreset
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "toggleLayer"
  layer: MapQuickLayerId
  visible: boolean
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setStylePreset"
  preset: MapStylePreset
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "view:resetZoom"
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "view:openMinimap"
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "view:openMeasurers"
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setViewMode"
  mode: MapViewMode
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setGlobalFilter"
  filter: MapGlobalFilter | null
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "world:openSettlements"
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "world:openSettlementEditor"
  id: number
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "world:locateSettlement"
  id: number
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "creation:mode"
  tool: CreationTool
  active: boolean
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "creation:complete"
  tool: "route"
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "native:click"
  id: string
}

export function isMapLayerPreset(value: unknown): value is MapLayerPreset {
  return typeof value === "string" && MAP_LAYER_PRESETS.includes(value as MapLayerPreset)
}

export function isMapStylePreset(value: unknown): value is MapStylePreset {
  return typeof value === "string" && MAP_STYLE_PRESETS.includes(value as MapStylePreset)
}

export function isMapGlobalFilter(value: unknown): value is MapGlobalFilter {
  return typeof value === "string" && MAP_GLOBAL_FILTERS.includes(value as MapGlobalFilter)
}

export function isMapViewMode(value: unknown): value is MapViewMode {
  return typeof value === "string" && MAP_VIEW_MODES.includes(value as MapViewMode)
}

export function isMapEngineMessage(value: unknown): value is MapEngineMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Partial<MapEngineMessage>
  if (message.source !== MAP_ENGINE_MESSAGE_SOURCE) return false

  if (message.type === "world:settlementSelected") {
    const settlement = message.settlement
    return Boolean(
      settlement &&
      typeof settlement.id === "number" &&
      typeof settlement.name === "string" &&
      typeof settlement.population === "number" &&
      typeof settlement.capital === "boolean" &&
      typeof settlement.port === "boolean" &&
      typeof settlement.citadel === "boolean"
    )
  }

  if (message.type === "style:changed") {
    return message.preset === null || isMapStylePreset(message.preset)
  }

  if (message.type === "filter:changed") return message.filter === null || isMapGlobalFilter(message.filter)
  if (message.type === "view:changed") return isMapViewMode(message.mode)

  return (
    (message.type === "ready" ||
      message.type === "error" ||
      message.type === "interaction" ||
      message.type === "layers:changed" ||
      message.type === "creation:mode" ||
      message.type === "creation:progress" ||
      message.type === "creation:completed")
  )
}

export function isMapEngineCommand(value: unknown): value is MapEngineCommand {
  if (!value || typeof value !== "object") return false

  const command = value as Partial<MapEngineCommand>
  if (command.source !== MAP_ENGINE_MESSAGE_SOURCE) return false

  if (command.type === "setLayerPreset") {
    return isMapLayerPreset(command.preset)
  }

  if (command.type === "viewport:resize") {
    return (command.mode === "large" || command.mode === "small") &&
      typeof command.width === "number" && Number.isFinite(command.width) && command.width > 0 &&
      typeof command.height === "number" && Number.isFinite(command.height) && command.height > 0
  }

  if (command.type === "setStylePreset") {
    return isMapStylePreset(command.preset)
  }

  if (command.type === "setGlobalFilter") return command.filter === null || isMapGlobalFilter(command.filter)
  if (command.type === "setViewMode") return isMapViewMode(command.mode)

  if (command.type === "toggleLayer") {
    return MAP_QUICK_LAYERS.some(layer => layer.id === command.layer) && typeof command.visible === "boolean"
  }

  if (
    command.type === "view:resetZoom" ||
    command.type === "view:openMinimap" ||
    command.type === "view:openMeasurers" ||
    command.type === "world:openSettlements"
  ) {
    return true
  }

  if (command.type === "world:openSettlementEditor") {
    return typeof command.id === "number" && Number.isInteger(command.id) && command.id > 0
  }

  if (command.type === "world:locateSettlement") {
    return typeof command.id === "number" && Number.isInteger(command.id) && command.id > 0
  }

  return (
    command.type === "creation:mode" &&
    (command.tool === "settlement" || command.tool === "marker" || command.tool === "route" || command.tool === "river") &&
    typeof command.active === "boolean"
  ) || (command.type === "creation:complete" && command.tool === "route") ||
    (command.type === "native:click" && typeof command.id === "string" && command.id.length > 0)
}