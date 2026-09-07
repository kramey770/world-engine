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
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "layers:changed"; state: MapLayerState }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:mode"; tool: CreationTool; active: boolean }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:progress"; tool: "route"; points: number }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:completed"; tool: CreationTool; id: number; name?: string }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "world:settlementSelected"; settlement: MapSettlementSummary }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "style:changed"; preset: MapStylePreset | null }

export type MapEngineCommand = {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setLayerPreset"
  preset: MapLayerPreset
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
}

export function isMapLayerPreset(value: unknown): value is MapLayerPreset {
  return typeof value === "string" && MAP_LAYER_PRESETS.includes(value as MapLayerPreset)
}

export function isMapStylePreset(value: unknown): value is MapStylePreset {
  return typeof value === "string" && MAP_STYLE_PRESETS.includes(value as MapStylePreset)
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

  return (
    (message.type === "ready" ||
      message.type === "error" ||
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

  if (command.type === "setStylePreset") {
    return isMapStylePreset(command.preset)
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
  ) || (command.type === "creation:complete" && command.tool === "route")
}