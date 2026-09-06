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

export type CreationTool = "settlement" | "marker"

export type CreationState = {
  tool: CreationTool
  active: boolean
}

export type MapEngineMessage =
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "ready"; state?: MapLayerState }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "error"; message?: string }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "layers:changed"; state: MapLayerState }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:mode"; tool: CreationTool; active: boolean }
  | { source: typeof MAP_ENGINE_MESSAGE_SOURCE; type: "creation:completed"; tool: CreationTool; id: number; name?: string }

export type MapEngineCommand = {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "setLayerPreset"
  preset: MapLayerPreset
} | {
  source: typeof MAP_ENGINE_MESSAGE_SOURCE
  type: "creation:mode"
  tool: CreationTool
  active: boolean
}

export function isMapLayerPreset(value: unknown): value is MapLayerPreset {
  return typeof value === "string" && MAP_LAYER_PRESETS.includes(value as MapLayerPreset)
}

export function isMapEngineMessage(value: unknown): value is MapEngineMessage {
  if (!value || typeof value !== "object") return false

  const message = value as Partial<MapEngineMessage>
  return (
    message.source === MAP_ENGINE_MESSAGE_SOURCE &&
    (message.type === "ready" ||
      message.type === "error" ||
      message.type === "layers:changed" ||
      message.type === "creation:mode" ||
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

  return (
    command.type === "creation:mode" &&
    (command.tool === "settlement" || command.tool === "marker") &&
    typeof command.active === "boolean"
  )
}