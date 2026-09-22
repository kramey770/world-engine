"use strict";
// Azgaar and contributors, 2017-2026. MIT License
// https://github.com/Azgaar/Fantasy-Map-Generator

// set debug options
const PRODUCTION = location.hostname && location.hostname !== "localhost" && location.hostname !== "127.0.0.1";
const DEBUG = JSON.safeParse(localStorage.getItem("debug")) || {};
const INFO = true;
const TIME = true;
const WARN = true;
const ERROR = true;

// detect device
const MOBILE = window.innerWidth < 600 || navigator.userAgentData?.mobile;

// the desktop app ships its own copy of the assets, so it has nothing to cache offline
if (PRODUCTION && !window.electron && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => {
      console.error("ServiceWorker registration failed: ", err);
    });
  });
}

Layers.init(); // create the svg layer groups

const WORLD_ENGINE_MESSAGE_SOURCE = "world-engine-azgaar";
const WORLD_ENGINE_LAYER_PRESETS = new Set([
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
  "landmass"
]);
const WORLD_ENGINE_QUICK_LAYERS = new Set([
  "states", "provinces", "cultures", "religions", "biomes", "heightmap", "rivers", "lakes",
  "routes", "goods", "trade", "military", "emblems", "labels", "burgIcons", "markers", "characters",
  "ocean", "compass", "landmass", "texture", "cells", "grid", "coordinates", "relief", "zones",
  "borders", "temperature", "coastline", "ice", "markets", "precipitation", "population",
  "fogging", "rulers", "debug", "scaleBar", "vignette", "legend"
]);
const WORLD_ENGINE_STYLE_PRESETS = new Set([
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
  "ink",
  "frostbite",
  "cinderwood"
]);

const WORLD_ENGINE_SURFACE_OPEN_CONTROLS = new Set([
  "editBiomesButton", "overviewBurgsButton", "editCoastlineSettings", "editCulturesButton", "editDiplomacyButton",
  "editEmblemButton", "editGoods", "editHeightmapButton", "overviewMarkersButton", "overviewCharactersButton", "overviewMarketsButton",
  "editMeasurersButton", "overviewLabelsButton", "overviewMilitaryButton", "editNamesBaseButton", "editNotesButton",
  "editProvincesButton", "editReligions", "overviewRiversButton", "overviewRoutesButton", "editStatesButton",
  "editTradeAnimationButton", "editUnitsButton", "editZonesButton", "addBurgTool", "addLabel", "addMarker", "addRiver",
  "addRoute", "openSubmapTool", "openTransformTool", "overviewCellsButton", "overviewChartsButton", "openMinimapButton",
  "paintBrushes", "applyTemplate", "convertImage", "heightmapPreview", "heightmap3DView", "configureWorld", "optionsTab"
]);
const WORLD_ENGINE_SURFACE_CATEGORY_BY_ID = {
  minimap: "preview", preview3d: "preview", options3d: "preview", chartsOverview: "preview", cellInfo: "overview",
  burgsOverview: "overview", markersOverview: "overview", marketsOverview: "overview", labelsOverview: "overview",
  militaryOverview: "overview", riversOverview: "overview", routesOverview: "overview", regimentsOverview: "overview",
  marketOverview: "overview", marketDealsOverview: "overview", comparePrices: "overview", productionOverview: "overview",
  productionChainsDialog: "overview", tradeDetails: "overview", battleScreen: "preview", regimentSelectorScreen: "utility",
  worldConfigurator: "configuration", labelGroupsConfigurator: "configuration", markersSettings: "configuration",
  routeGroupsEditor: "configuration", styleSaver: "configuration", optionsContainer: "configuration",
  burgCreator: "creation", labelCreator: "creation", markerCreator: "creation", riverCreator: "creation", routeCreator: "creation",
  submapTool: "utility", transformTool: "utility", paintEditor: "utility", brushesPanel: "utility", templateEditor: "editor",
  imageConverter: "utility", heightmapSelection: "utility", elevationProfile: "preview", hierarchyTree: "utility", iconSelector: "utility",
  alert: "feedback"
};
const WORLD_ENGINE_SURFACE_MAP_INTERACTION = new Set([
  "burgCreator", "labelCreator", "markerCreator", "riverCreator", "routeCreator", "cellInfo", "submapTool", "transformTool",
  "heightmapEditor", "heightmapSelection", "paintEditor", "reliefEditor", "lakesEditor", "coastlineEditor", "coastlineVertexEditor",
  "riverEditor", "routeEditor", "markerEditor", "burgEditor", "measurersEditor"
]);
let worldEngineSurfaceStack = [];
let worldEngineSurfaceObserver = null;

function getWorldEngineSurfaceElement(id) {
  return document.getElementById(id);
}

function isWorldEngineSurfaceVisible(element) {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden" && !element.hasAttribute("hidden");
}

function getWorldEngineSurfaceCategory(id) {
  if (id in WORLD_ENGINE_SURFACE_CATEGORY_BY_ID) return WORLD_ENGINE_SURFACE_CATEGORY_BY_ID[id];
  if (id.endsWith("Editor") || id === "notesEditor" || id === "namesbaseEditor") return "editor";
  return "utility";
}

function getWorldEngineSurfaceState(element, parentId, depth) {
  const id = element.id;
  const title = element.closest(".ui-dialog")?.querySelector(".ui-dialog-title")?.textContent?.trim() ||
    element.dataset.title || id;
  const category = getWorldEngineSurfaceCategory(id);
  const feedback = category === "feedback";
  const minimap = id === "minimap";
  element.dataset.worldEngineMobileMode = minimap ? "unavailable" : feedback ? "compact" : "full-screen";
  element.dataset.worldEngineDesktopMode = minimap ? "small-adjustable" : feedback ? "compact" : "large-centered";
  element.dataset.worldEngineSurfaceCategory = category;
  return {
    id,
    title,
    category,
    parentId,
    mapInteraction: WORLD_ENGINE_SURFACE_MAP_INTERACTION.has(id) ? "required" : "none",
    desktopMode: minimap ? "small-adjustable" : feedback ? "compact" : "large-centered",
    mobileMode: minimap ? "unavailable" : feedback ? "compact" : "full-screen",
    depth
  };
}

function sendWorldEngineSurfaceMessage(message) {
  window.parent.postMessage({source: WORLD_ENGINE_MESSAGE_SOURCE, ...message}, window.location.origin);
}

function openWorldEngineSurface(element) {
  if (!element?.id || !isWorldEngineSurfaceVisible(element) || (MOBILE && element.id === "minimap")) return;
  const active = worldEngineSurfaceStack.at(-1);
  if (worldEngineSurfaceStack.some(surface => surface.id === element.id)) return;

  const surface = getWorldEngineSurfaceState(element, active?.id || null, worldEngineSurfaceStack.length);
  worldEngineSurfaceStack = worldEngineSurfaceStack.filter(item => item.id !== surface.id);
  worldEngineSurfaceStack.push(surface);
  sendWorldEngineSurfaceMessage(
    active ? {type: "surface:changed", surface, reason: "push"} : {type: "surface:opened", surface}
  );
}

function closeWorldEngineSurface(id, reason = "close") {
  const index = worldEngineSurfaceStack.findIndex(surface => surface.id === id);
  if (index < 0) return;
  const [closed] = worldEngineSurfaceStack.splice(index, 1);
  const parent = worldEngineSurfaceStack.at(-1) || null;
  sendWorldEngineSurfaceMessage({type: "surface:closed", surfaceId: closed.id, parentId: parent?.id || closed.parentId, reason});
  if (parent) sendWorldEngineSurfaceMessage({type: "surface:changed", surface: {...parent, depth: worldEngineSurfaceStack.length - 1}, reason: reason === "back" ? "back" : "replace"});
}

function syncWorldEngineSurfaces() {
  const visible = Array.from(document.querySelectorAll("#dialogs .ui-dialog-content, #dialogs > .dialog, #options3d"))
    .filter(element => isWorldEngineSurfaceVisible(element));
  visible.forEach(element => {
    if (element.id === "minimap" && MOBILE) {
      window.$?.(element).dialog?.("close");
      return;
    }
    openWorldEngineSurface(element);
  });
  const visibleIds = new Set(visible.map(element => element.id));
  [...worldEngineSurfaceStack].filter(surface => !visibleIds.has(surface.id)).forEach(surface => closeWorldEngineSurface(surface.id, "destroy"));
}

function closeActiveWorldEngineSurface(reason = "close") {
  const active = worldEngineSurfaceStack.at(-1);
  if (!active) return;
  const element = getWorldEngineSurfaceElement(active.id);
  if (element && window.$?.fn?.dialog) window.$(element).dialog("close");
  else closeWorldEngineSurface(active.id, reason);
}

function installWorldEngineSurfaceBridge() {
  if (!window.$?.fn?.dialog || window.$.fn.dialog.__worldEngineWrapped) return;
  const originalDialog = window.$.fn.dialog;
  const wrappedDialog = function (...args) {
    const result = originalDialog.apply(this, args);
    this.each(function () {
      const content = this;
      content.classList.add("world-engine-dialog-content");
      content.closest(".ui-dialog")?.classList.add("world-engine-dialog");
    });
    document.querySelectorAll(".ui-widget-overlay").forEach(overlay => {
      overlay.classList.add("world-engine-dialog-overlay");
    });
    const method = typeof args[0] === "string" ? args[0] : null;
    window.setTimeout(() => {
      if (method === "close" || method === "destroy") this.toArray().forEach(element => closeWorldEngineSurface(element.id, method === "destroy" ? "destroy" : "close"));
      syncWorldEngineSurfaces();
    }, 0);
    return result;
  };
  wrappedDialog.__worldEngineWrapped = true;
  window.$.fn.dialog = wrappedDialog;
  worldEngineSurfaceObserver = new MutationObserver(() => window.setTimeout(syncWorldEngineSurfaces, 0));
  worldEngineSurfaceObserver.observe(document.getElementById("dialogs") || document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "hidden"]});
}

installWorldEngineSurfaceBridge();
document.addEventListener("DOMContentLoaded", installWorldEngineSurfaceBridge);
document.addEventListener("click", event => {
  if (!MOBILE) return;
  const target = event.target instanceof Element ? event.target.closest("#openMinimapButton") : null;
  if (!target) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

document.addEventListener("pointerdown", () => {
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "interaction"},
    window.location.origin
  );
});
let worldEngineCreationPoll = null;
let worldEngineViewport = null;
let worldEngineViewportFit = null;

function getWorldEngineViewportCenter() {
  const safeWidth = Number.isFinite(svgWidth) && svgWidth > 0 ? svgWidth : graphWidth || 1;
  const safeHeight = Number.isFinite(svgHeight) && svgHeight > 0 ? svgHeight : graphHeight || 1;
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const centerX = (safeWidth / 2 - (Number.isFinite(viewX) ? viewX : 0)) / safeScale;
  const centerY = (safeHeight / 2 - (Number.isFinite(viewY) ? viewY : 0)) / safeScale;

  if (!Number.isFinite(centerX) || !Number.isFinite(centerY)) return null;
  return { x: centerX, y: centerY, scale: safeScale };
}

function applyWorldEngineViewport(mode, width, height) {
  const viewportCenter = getWorldEngineViewportCenter();
  const currentScale = Number.isFinite(scale) && scale > 0 ? scale : viewportCenter?.scale || 1;

  worldEngineViewport = {mode, width, height};
  fitMapToScreen(width, height);
  const map = document.getElementById("map");
  if (map) {
    map.setAttribute("width", String(Math.max(1, width)));
    map.setAttribute("height", String(Math.max(1, height)));
  }

  if (worldEngineViewportFit !== null) window.clearTimeout(worldEngineViewportFit);
  worldEngineViewportFit = window.setTimeout(() => {
    worldEngineViewportFit = null;
    if (!worldEngineViewport) return;

    if (viewportCenter) {
      const minScale = Number.isFinite(zoomExtentMin.value) ? +zoomExtentMin.value : 1;
      const maxScale = Number.isFinite(zoomExtentMax.value) ? +zoomExtentMax.value : currentScale;
      const clampedScale = Math.min(Math.max(currentScale, minScale), maxScale);
      setTranslateExtent(0, 0, graphWidth, graphHeight);
      zoomTo(viewportCenter.x, viewportCenter.y, clampedScale, 0);
      return;
    }

    fitMapToScreen(worldEngineViewport.width, worldEngineViewport.height, true);
  }, 120);
}

function isWorldEngineCreationActive(tool) {
  if (tool === "route") return Boolean(document.querySelector("#routeCreator"));
  const controlId = tool === "settlement" ? "addBurgTool" : tool === "marker" ? "addMarker" : "addRiver";
  return document.querySelector(`#${controlId}`)?.classList.contains("pressed") || false;
}

function sendWorldEngineCreationMode(tool) {
  const active = isWorldEngineCreationActive(tool);
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "creation:mode", tool, active},
    window.location.origin
  );
  return active;
}

function getWorldEngineCreationRecords(tool) {
  if (tool === "settlement") return pack.burgs;
  if (tool === "marker") return pack.markers;
  if (tool === "river") return pack.rivers;
  return pack.routes;
}

function getWorldEngineRoutePointCount() {
  return document.querySelectorAll("#routeCreatorBody .editorLine").length;
}

function cancelWorldEngineCreation(tool) {
  if (!isWorldEngineCreationActive(tool)) return;
  if (tool === "route") {
    document.querySelector("#routeCreatorCancel")?.click();
    return;
  }
  window.Controllers[tool === "settlement" ? "BurgCreator" : tool === "marker" ? "MarkerCreator" : "RiverAutoCreator"].toggle();
}

function watchWorldEngineCreation(tool) {
  if (worldEngineCreationPoll) clearInterval(worldEngineCreationPoll);
  const knownIds = new Set(
    getWorldEngineCreationRecords(tool).filter(item => item?.i && !item.removed).map(item => item.i)
  );
  let knownPointCount = tool === "route" ? getWorldEngineRoutePointCount() : null;
  if (knownPointCount !== null) {
    window.parent.postMessage(
      {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "creation:progress", tool, points: knownPointCount},
      window.location.origin
    );
  }
  worldEngineCreationPoll = setInterval(() => {
    const active = isWorldEngineCreationActive(tool);
    const pointCount = tool === "route" ? getWorldEngineRoutePointCount() : null;
    if (pointCount !== null && pointCount !== knownPointCount) {
      knownPointCount = pointCount;
      window.parent.postMessage(
        {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "creation:progress", tool, points: pointCount},
        window.location.origin
      );
    }
    const created = getWorldEngineCreationRecords(tool).find(
      item => item?.i && !item.removed && !knownIds.has(item.i)
    );
    if (created) {
      window.parent.postMessage(
        {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "creation:completed", tool, id: created.i, name: created.name},
        window.location.origin
      );
      clearInterval(worldEngineCreationPoll);
      worldEngineCreationPoll = null;
      if (tool === "route") cancelWorldEngineCreation(tool);
    }
    if (!active && !created) {
      clearInterval(worldEngineCreationPoll);
      worldEngineCreationPoll = null;
      sendWorldEngineCreationMode(tool);
    }
  }, 100);
}

function setupWorldEngineCreationBridge() {
  ["addBurgTool", "addMarker", "addRoute", "addRiver"].forEach(controlId => {
    const tool = controlId === "addBurgTool" ? "settlement" : controlId === "addMarker" ? "marker" : controlId === "addRoute" ? "route" : "river";
    document.querySelector(`#${controlId}`)?.addEventListener("click", () => {
    window.setTimeout(() => {
      const active = sendWorldEngineCreationMode(tool);
      if (active) watchWorldEngineCreation(tool);
    }, 0);
    });
  });
}

function getWorldEngineLayerState() {
  const preset = document.querySelector("#layersPreset")?.value;
  const active = Array.from(Layers.active);
  ["legend", "debug"].forEach(layerId => {
    const element = document.querySelector(`#${layerId}`);
    if (element && getComputedStyle(element).display !== "none" && !active.includes(layerId)) active.push(layerId);
  });
  return {
    active,
    order: Layers.layers.map(layer => layer.id),
    preset: WORLD_ENGINE_LAYER_PRESETS.has(preset) ? preset : null
  };
}

function sendWorldEngineLayerState() {
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "layers:changed", state: getWorldEngineLayerState()},
    window.location.origin
  );
}

function setWorldEngineLayerVisibility(layerId, visible) {
  if (layerId === "legend" || layerId === "debug") {
    const element = document.querySelector(`#${layerId}`);
    if (!element) return false;
    element.style.display = visible ? null : "none";
    sendWorldEngineLayerState();
    return true;
  }

  const layer = Layers.get(layerId);
  if (!layer) return false;
  if (visible) {
    Layers.show(layerId);
    return true;
  }

  if (layer.params.permanent) {
    layer.params.permanent = false;
    Layers.hide(layerId);
    layer.params.permanent = true;
    return true;
  }

  Layers.hide(layerId);
  return true;
}

function getWorldEngineStylePreset() {
  const preset = document.querySelector("#stylePreset")?.value;
  return WORLD_ENGINE_STYLE_PRESETS.has(preset) ? preset : null;
}

function sendWorldEngineStyleState() {
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "style:changed", preset: getWorldEngineStylePreset()},
    window.location.origin
  );
}

function getWorldEngineFilter() {
  const active = document.querySelector("#mapFilters .pressed")?.id;
  return ["grayscale", "sepia", "dingy", "tint"].includes(active) ? active : null;
}

function sendWorldEngineFilterState() {
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "filter:changed", filter: getWorldEngineFilter()},
    window.location.origin
  );
}

function getWorldEngineViewMode() {
  const pressed = document.querySelector("#viewMode button.pressed")?.id;
  return ["viewStandard", "viewMesh", "viewGlobe"].includes(pressed) ? pressed : "viewStandard";
}

function sendWorldEngineViewState() {
  window.parent.postMessage(
    {source: WORLD_ENGINE_MESSAGE_SOURCE, type: "view:changed", mode: getWorldEngineViewMode()},
    window.location.origin
  );
}

document.querySelector("#stylePreset")?.addEventListener("change", sendWorldEngineStyleState);
document.querySelector("#mapFilters")?.addEventListener("click", () => window.setTimeout(sendWorldEngineFilterState, 0));
document.querySelector("#viewMode")?.addEventListener("click", () => window.setTimeout(sendWorldEngineViewState, 0));

function sendWorldEngineSettlementSummary(id) {
  const settlement = pack.burgs[id];
  if (!settlement?.i || settlement.removed) return;

  const provinceId = pack.cells.province[settlement.cell];
  const biomeId = pack.cells.biome[settlement.cell];
  const population = Math.round(settlement.population * populationRate * urbanization);
  window.parent.postMessage(
    {
      source: WORLD_ENGINE_MESSAGE_SOURCE,
      type: "world:settlementSelected",
      settlement: {
        id: settlement.i,
        name: settlement.name,
        population,
        realm: pack.states[settlement.state]?.name,
        province: provinceId ? pack.provinces[provinceId]?.name : undefined,
        culture: pack.cultures[settlement.culture]?.name,
        group: settlement.group,
        capital: Boolean(settlement.capital),
        port: Boolean(settlement.port),
        citadel: Boolean(settlement.citadel),
        x: settlement.x,
        y: settlement.y,
        stateId: settlement.state,
        cultureId: settlement.culture,
        biome: pack.biomes[biomeId]?.name,
        elevation: pack.cells.h[settlement.cell]
      }
    },
    window.location.origin
  );
}

function applyWorldEngineSettlementUpdate(patch) {
  if (!patch || !Number.isInteger(patch.id) || patch.id <= 0) return;
  const settlement = pack.burgs[patch.id];
  if (!settlement || settlement.removed) return;

  if (typeof patch.name === "string" && patch.name.trim()) settlement.name = patch.name.trim();
  if (typeof patch.x === "number" && Number.isFinite(patch.x)) settlement.x = patch.x;
  if (typeof patch.y === "number" && Number.isFinite(patch.y)) settlement.y = patch.y;
  if (typeof patch.population === "number" && Number.isFinite(patch.population)) {
    const factor = Number.isFinite(populationRate) && populationRate > 0 && Number.isFinite(urbanization) && urbanization > 0
      ? populationRate * urbanization
      : 1;
    settlement.population = Number(Math.max(0, patch.population / factor).toFixed(4));
  }
  if (typeof patch.capital === "boolean") settlement.capital = patch.capital ? 1 : 0;
  if (typeof patch.port === "boolean") settlement.port = patch.port;
  if (typeof patch.citadel === "boolean") settlement.citadel = patch.citadel;
  if (typeof patch.stateId === "number" && Number.isInteger(patch.stateId)) settlement.state = patch.stateId;
  if (typeof patch.cultureId === "number" && Number.isInteger(patch.cultureId)) settlement.culture = patch.cultureId;
  if (typeof patch.group === "string") settlement.group = patch.group;
  if (typeof patch.region === "string" && patch.region.trim()) {
    const match = pack.states.find(state => !state.removed && (state.name === patch.region.trim() || state.fullName === patch.region.trim()));
    if (match) settlement.state = match.i;
  }
  if (typeof patch.province === "string" && patch.province.trim()) {
    const province = pack.provinces.find(item => !item.removed && (item.name === patch.province.trim() || item.fullName === patch.province.trim()));
    if (province && Number.isInteger(settlement.cell)) pack.cells.province[settlement.cell] = province.i;
  }
  if (typeof patch.biome === "string" && patch.biome.trim()) {
    const biome = pack.biomes.findIndex(biome => !biome.removed && biome.name === patch.biome.trim());
    if (biome >= 0 && Number.isInteger(settlement.cell)) pack.cells.biome[settlement.cell] = biome;
  }
  if (typeof patch.elevation === "number" && Number.isFinite(patch.elevation) && Number.isInteger(settlement.cell)) {
    pack.cells.h[settlement.cell] = Number(Math.max(0, Math.min(255, patch.elevation)));
  }
  if (typeof patch.currentState === "string") {
    const state = patch.currentState.toLowerCase();
    settlement.capital = state.includes("capital") ? 1 : Boolean(settlement.capital);
    settlement.port = state.includes("port") ? true : Boolean(settlement.port);
    settlement.citadel = state.includes("citadel") || state.includes("fort") || state.includes("castle") ? true : Boolean(settlement.citadel);
  }

  if (typeof draw === "function") draw("burgIcons", "labels", "population", "biomes", "heightmap");
}

Layers.subscribe(sendWorldEngineLayerState);

document.addEventListener("click", event => {
  const action = event.target.closest("#burgsOverview .icon-dot-circled, #burgsOverview .icon-pencil");
  const row = action?.closest(".states[data-id]");
  const id = Number(row?.dataset.id);
  if (Number.isInteger(id) && id > 0) sendWorldEngineSettlementSummary(id);
}, true);

window.addEventListener("message", event => {
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
  const command = event.data;
  if (
    !command ||
    command.source !== WORLD_ENGINE_MESSAGE_SOURCE ||
    (command.type === "setLayerPreset" && !WORLD_ENGINE_LAYER_PRESETS.has(command.preset)) ||
    (command.type === "setStylePreset" && !WORLD_ENGINE_STYLE_PRESETS.has(command.preset)) ||
    (command.type === "viewport:resize" && !["large", "small"].includes(command.mode)) ||
    (command.type === "toggleLayer" && (!WORLD_ENGINE_QUICK_LAYERS.has(command.layer) || typeof command.visible !== "boolean")) ||
    (command.type === "setViewMode" && !["viewStandard", "viewMesh", "viewGlobe"].includes(command.mode)) ||
    (command.type === "setGlobalFilter" && command.filter !== null && !["grayscale", "sepia", "dingy", "tint"].includes(command.filter)) ||
    (command.type === "world:setGenerationSettings" && (!command.settings || typeof command.settings !== "object" || !Number.isFinite(command.settings.mapWidth) || !Number.isFinite(command.settings.mapHeight) || !Number.isFinite(command.settings.seed) || !Number.isFinite(command.settings.points) || !command.settings.template || !Number.isFinite(command.settings.cultureCount) || !command.settings.cultureSet || !Number.isFinite(command.settings.statesNumber) || !Number.isFinite(command.settings.provincesRatio) || !Number.isFinite(command.settings.sizeVariety) || !Number.isFinite(command.settings.growthRate) || !Number.isFinite(command.settings.burgsNumber) || !Number.isFinite(command.settings.religionsNumber))) ||
    !["viewport:resize", "setLayerPreset", "setStylePreset", "toggleLayer", "setViewMode", "setGlobalFilter", "view:resetZoom", "view:openMinimap", "view:openMeasurers", "world:openSettlements", "world:openSettlementEditor", "world:locateSettlement", "world:updateSettlement", "world:setGenerationSettings", "creation:mode", "creation:complete", "native:click", "surface:open", "surface:back", "surface:close"].includes(command.type) ||
    ((command.type === "world:openSettlementEditor" || command.type === "world:locateSettlement") && (!Number.isInteger(command.id) || command.id <= 0)) ||
    (command.type === "world:updateSettlement" && (!command.settlement || !Number.isInteger(command.settlement.id) || command.settlement.id <= 0)) ||
    (command.type === "creation:mode" && (!["settlement", "marker", "route", "river"].includes(command.tool) || typeof command.active !== "boolean")) ||
    (command.type === "creation:complete" && command.tool !== "route")
  ) return;

  if (command.type === "setLayerPreset") {
    applyLayersPreset(command.preset);
  } else if (command.type === "viewport:resize") {
    applyWorldEngineViewport(command.mode, command.width, command.height);
  } else if (command.type === "toggleLayer") {
    setWorldEngineLayerVisibility(command.layer, command.visible);
  } else if (command.type === "setViewMode") {
    document.querySelector(`#${command.mode}`)?.click();
    sendWorldEngineViewState();
  } else if (command.type === "setGlobalFilter") {
    const current = getWorldEngineFilter();
    if (command.filter === null && current) {
      document.querySelector(`#${current}`)?.click();
    } else if (command.filter === current) {
      document.querySelector(`#${command.filter}`)?.click();
    } else if (command.filter) {
      document.querySelector(`#${command.filter}`)?.click();
    }
    sendWorldEngineFilterState();
  } else if (command.type === "setStylePreset") {
    const select = document.querySelector("#stylePreset");
    if (select) {
      select.value = command.preset;
      select.dispatchEvent(new Event("change", {bubbles: true}));
    }
  } else if (command.type === "view:resetZoom") {
    document.querySelector("#zoomReset")?.click();
  } else if (command.type === "view:openMinimap") {
    document.querySelector("#openMinimapButton")?.click();
  } else if (command.type === "view:openMeasurers") {
    document.querySelector("#editMeasurersButton")?.click();
  } else if (command.type === "world:setGenerationSettings") {
    const { mapWidth, mapHeight, seed, points, template, cultureCount, cultureSet, statesNumber, provincesRatio, sizeVariety, growthRate, burgsNumber, religionsNumber } = command.settings;

    if (mapWidth > 0) mapWidthInput.value = mapWidth;
    if (mapHeight > 0) mapHeightInput.value = mapHeight;
    if (seed > 0) optionsSeed.value = seed;
    if (points > 0) {
      pointsInput.value = points;
      changeCellsDensity(points);
    }
    if (template) {
      templateInput.value = template;
      const selected = template in heightmapTemplates ? template : Object.keys(heightmapTemplates).includes(template) ? template : template;
      if (selected && templateInput.value !== selected) templateInput.value = selected;
    }
    if (Number.isFinite(cultureCount) && cultureCount > 0) {
      culturesInput.value = culturesOutput.value = cultureCount;
    }
    if (cultureSet) {
      culturesSet.value = cultureSet;
      changeCultureSet();
    }
    if (Number.isFinite(statesNumber)) statesNumber.value = statesNumber;
    if (Number.isFinite(provincesRatio)) provincesRatio.value = provincesRatio;
    if (Number.isFinite(sizeVariety)) sizeVariety.value = sizeVariety;
    if (Number.isFinite(growthRate)) growthRate.value = growthRate;
    if (Number.isFinite(burgsNumber)) burgsNumber.value = burgsNumber;
    if (Number.isFinite(religionsNumber)) religionsNumber.value = religionsNumber;

    mapSizeInputChange();
    changeStatesNumber(statesNumber);
    setSeed(seed);
    regenerateMap({ seed });
  } else if (command.type === "world:openSettlements") {
    window.Controllers.BurgsOverview.open();
  } else if (command.type === "world:openSettlementEditor") {
    if (pack.burgs[command.id] && !pack.burgs[command.id].removed) window.Controllers.BurgEditor.open(command.id);
  } else if (command.type === "world:locateSettlement") {
    const settlement = pack.burgs[command.id];
    if (settlement && !settlement.removed) zoomTo(settlement.x, settlement.y, 8, 2000);
  } else if (command.type === "world:updateSettlement") {
    applyWorldEngineSettlementUpdate(command.settlement);
  } else if (command.type === "surface:open") {
    if (MOBILE && command.surfaceId === "openMinimapButton") return;
    document.getElementById(command.surfaceId)?.click();
  } else if (command.type === "surface:back") {
    closeActiveWorldEngineSurface("back");
  } else if (command.type === "surface:close") {
    closeActiveWorldEngineSurface("close");
  } else if (command.type === "creation:complete") {
    document.querySelector("#routeCreatorComplete")?.click();
  } else if (command.type === "native:click") {
    document.getElementById(command.id)?.click();
  } else if (command.active) {
    ["settlement", "marker", "route", "river"].filter(tool => tool !== command.tool).forEach(cancelWorldEngineCreation);
    if (!isWorldEngineCreationActive(command.tool)) {
      if (command.tool === "route") document.querySelector("#addRoute")?.click();
      else if (command.tool === "river") document.querySelector("#addRiver")?.click();
      else window.Controllers[command.tool === "settlement" ? "BurgCreator" : "MarkerCreator"].toggle();
    }
    sendWorldEngineCreationMode(command.tool);
    watchWorldEngineCreation(command.tool);
  } else if (isWorldEngineCreationActive(command.tool)) {
    cancelWorldEngineCreation(command.tool);
    sendWorldEngineCreationMode(command.tool);
  }
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  ["settlement", "marker", "route", "river"].forEach(cancelWorldEngineCreation);
});

// assign events separately as not a viewbox child
d3.select("#scaleBar")
  .on("mousemove", () => tip("Click to open Units Editor"))
  .on("click", () => window.Controllers.UnitsEditor.open());
d3.select("#legend")
  .on("mousemove", () => tip("Drag to change the position. Click to hide the legend"))
  .on("click", () => clearLegend());

// main data variables
var grid = {}; // initial graph based on jittered square grid and data
var pack = {}; // packed graph and data
var seed;
let mapId;
let mapHistory = [];
let modules = {};
let notes = [];
let customization = 0;

// global options; in v2.0 to be used for all UI settings
let options = {
  pinNotes: false,
  winds: [225, 45, 225, 315, 135, 315],
  temperatureEquator: 27,
  temperatureNorthPole: -30,
  temperatureSouthPole: -15,
  mapSize: 100, // map size in % of the world
  latitude: 50, // North-South map shift in %, 50 is centered on equator
  longitude: 50, // West-East map shift in %, 50 is centered on prime meridian
  prec: 100, // precipitation modifier in %
  showBurgPreview: true,
  burgs: {
    groups: JSON.safeParse(localStorage.getItem("burg-groups")) || Burgs.getDefaultGroups()
  },
  labels: JSON.safeParse(localStorage.getItem("options-labels")) || Labels.getDefaultOptions(),
  emblems: { showAll: false },
  trade: {
    animation: JSON.safeParse(localStorage.getItem("trade-animation")) || TradeAnimation.getDefaultOptions()
  },
  threeD: { ...window.ThreeDOptions }
};

// global style object; in v2.0 to be used for all map styles and render settings
let style = { labels: { groups: {} }, burgIcons: {}, anchors: {}, relief: { set: "simple", size: 1, density: 0.4 } };

let color = d3.scaleSequential(d3.interpolateSpectral); // default color scheme
const lineGen = d3.line().curve(d3.curveBasis); // d3 line generator with default curve interpolation

// current map view transform, written by the zoom handlers in src/components/zoom.ts
let scale = 1;
let viewX = 0;
let viewY = 0;

var mapCoordinates = {}; // map coordinates on globe
let populationRate = +ensureEl("populationRateInput").value;
let distanceScale = +ensureEl("distanceScaleInput").value;
let urbanization = +ensureEl("urbanizationInput").value;
let urbanDensity = +ensureEl("urbanDensityInput").value;

applyStoredOptions();

// voronoi graph extension, cannot be changed after generation
var graphWidth = +mapWidthInput.value;
var graphHeight = +mapHeightInput.value;

// svg canvas resolution, can be changed
let svgWidth = graphWidth;
let svgHeight = graphHeight;

d3.select("#oceanPattern")
  .append("rect")
  .attr("fill", "url(#oceanic)")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", graphWidth)
  .attr("height", graphHeight);
d3.select("#oceanLayers")
  .append("rect")
  .attr("id", "oceanBase")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", graphWidth)
  .attr("height", graphHeight);

document.addEventListener("DOMContentLoaded", async () => {
  setupWorldEngineCreationBridge();
  // binds the zoom behaviour and its handlers (see src/components/viewbox-events.ts), so it has to
  // run before checkLoadParameters - deep links (MFCG, a stored view position) zoom the map on load
  applyDefaultViewboxEvents();

  if (!location.hostname) {
    const wiki = "https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Run-FMG-locally";
    alertMessage.innerHTML = /* html */ `Fantasy Map Generator cannot run serverless. Follow the <a href="${wiki}" target="_blank">instructions</a> on how you can easily run a local web-server`;

    $("#alert").dialog({
      resizable: false,
      title: "Loading error",
      width: "28em",
      position: { my: "center center-4em", at: "center", of: "svg" },
      buttons: {
        OK: function () {
          $(this).dialog("close");
        }
      }
    });
  } else {
    hideLoading();
    try {
      await checkLoadParameters();
      window.parent.postMessage(
        {source: "world-engine-azgaar", type: "ready", state: getWorldEngineLayerState()},
        window.location.origin
      );
      sendWorldEngineStyleState();
      sendWorldEngineFilterState();
      sendWorldEngineViewState();
    } catch (error) {
      window.parent.postMessage({source: "world-engine-azgaar", type: "error"}, window.location.origin);
      throw error;
    }
  }
  initiateAutosave();
  initTourPromptButton();
});

function hideLoading() {
  d3.select("#loading").transition().duration(3000).style("opacity", 0);
  d3.select("#optionsContainer").transition().duration(2000).style("opacity", 1);
  d3.select("#tooltip").transition().duration(3000).style("opacity", 1);
}

function showLoading() {
  d3.select("#loading").transition().duration(200).style("opacity", 1);
  d3.select("#optionsContainer").transition().duration(100).style("opacity", 0);
  d3.select("#tooltip").transition().duration(200).style("opacity", 0);
}

// decide which map should be loaded or generated on page load
async function checkLoadParameters() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // of there is a valid maplink, try to load .map/.gz file from URL
  if (params.get("maplink")) {
    WARN && console.warn("Load map from URL");
    const maplink = params.get("maplink");
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const valid = pattern.test(maplink);
    if (valid) {
      setTimeout(() => {
        window.Services.Load.loadMapFromURL(maplink, 1);
      }, 1000);
      return;
    } else window.Services.Load.showUploadErrorMessage("Map link is not a valid URL", maplink);
  }

  // if there is a seed (user of MFCG provided), generate map for it
  if (params.get("seed")) {
    WARN && console.warn("Generate map for seed", params.get("seed"));
    await generateMapOnLoad();
    return;
  }

  // check if there is a map saved to indexedDB
  if (ensureEl("onloadBehavior").value === "lastSaved") {
    try {
      const blob = await ldb.get("lastMap");
      if (blob) {
        WARN && console.warn("Loading last stored map");
        window.Services.Load.uploadMap(blob);
        return;
      }
    } catch (error) {
      ERROR && console.error(error);
    }
  }

  // else generate random map
  WARN && console.warn("Generate random map");
  generateMapOnLoad();
}

async function generateMapOnLoad() {
  await applyStyleOnLoad(); // apply previously selected default or custom style
  await generate(); // generate map
  applyLayersPreset(); // apply saved layers preset and reder layers
  Layers.drawAll();
  fitMapToScreen();
  focusOn(); // based on searchParams focus on point, cell or burg from MFCG
  toggleAssistant();
}

// focus on coordinates, cell or burg provided in searchParams
function focusOn() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  applyURLLayers(params);

  const fromMGCG = params.get("from") === "MFCG" && document.referrer;
  if (fromMGCG) {
    if (params.get("seed").length === 13) {
      // show back burg from MFCG
      const burgSeed = params.get("seed").slice(-4);
      params.set("burg", burgSeed);
    } else {
      // select burg for MFCG
      findBurgForMFCG(params);
      return;
    }
  }

  const scaleParam = params.get("scale");
  const cellParam = params.get("cell");
  const burgParam = params.get("burg");

  if (scaleParam || cellParam || burgParam) {
    const scale = +scaleParam || 8;

    if (cellParam) {
      const cell = +params.get("cell");
      const [x, y] = pack.cells.p[cell];
      zoomTo(x, y, scale, 1600);
      return;
    }

    if (burgParam) {
      const burg = isNaN(+burgParam) ? pack.burgs.find(burg => burg.name === burgParam) : pack.burgs[+burgParam];
      if (!burg) return;

      const { x, y } = burg;
      zoomTo(x, y, scale, 1600);
      return;
    }

    const x = +params.get("x") || graphWidth / 2;
    const y = +params.get("y") || graphHeight / 2;
    zoomTo(x, y, scale, 1600);
  }
}

let isAssistantLoaded = false;
function toggleAssistant() {
  if (window.electron) return;

  const showAssistant = document.getElementById("azgaarAssistant")?.value === "show";
  if (showAssistant) {
    if (isAssistantLoaded) {
      const assistantContainer = document.getElementById("chat-widget-container");
      if (assistantContainer) assistantContainer.style.display = "block";
    } else {
      import("./libs/openwidget.min.js").then(() => {
        isAssistantLoaded = true;
        setTimeout(() => {
          const bubble = document.getElementById("chat-widget-minimized");
          if (bubble) {
            bubble.dataset.tip = "Click to open the Assistant";
            bubble.addEventListener("mouseover", showDataTip);
          }
        }, 5000);
      });
    }
  } else if (isAssistantLoaded) {
    const assistantContainer = document.getElementById("chat-widget-container");
    if (assistantContainer) assistantContainer.style.display = "none";
  }
}

function initTourPromptButton() {
  const MAX_SHOWS = 3;
  const STORAGE_KEY = "fmg-tour-prompt-count";

  const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  if (count >= MAX_SHOWS) return;

  const btn = document.getElementById("tourPromptButton");
  if (!btn) return;

  btn.style.display = "flex";
  btn.addEventListener("click", async () => {
    window.Services.UiTour.start();
    localStorage.setItem(STORAGE_KEY, MAX_SHOWS);
  });
  localStorage.setItem(STORAGE_KEY, count + 1);
}

// find burg for MFCG and focus on it
function findBurgForMFCG(params) {
  const cells = pack.cells,
    burgs = pack.burgs;
  if (pack.burgs.length < 2) {
    ERROR && console.error("Cannot select a burg for MFCG");
    return;
  }

  // used for selection
  const size = +params.get("size");
  const coast = +params.get("coast");
  const port = +params.get("port");
  const river = +params.get("river");

  let selection = defineSelection(coast, port, river);
  if (!selection.length) selection = defineSelection(coast, !port, !river);
  if (!selection.length) selection = defineSelection(!coast, 0, !river);
  if (!selection.length) selection = [burgs[1]]; // select first if nothing is found

  function defineSelection(coast, port, river) {
    if (port && river) return burgs.filter(b => b.port && cells.r[b.cell]);
    if (!port && coast && river) return burgs.filter(b => !b.port && cells.t[b.cell] === 1 && cells.r[b.cell]);
    if (!coast && !river) return burgs.filter(b => cells.t[b.cell] !== 1 && !cells.r[b.cell]);
    if (!coast && river) return burgs.filter(b => cells.t[b.cell] !== 1 && cells.r[b.cell]);
    if (coast && river) return burgs.filter(b => cells.t[b.cell] === 1 && cells.r[b.cell]);
    return [];
  }

  // select a burg with closest population from selection
  const selected = d3.scan(selection, (a, b) => Math.abs(a.population - size) - Math.abs(b.population - size));
  const burgId = selection[selected].i;
  if (!burgId) {
    ERROR && console.error("Cannot select a burg for MFCG");
    return;
  }

  const b = burgs[burgId];
  const referrer = new URL(document.referrer);
  for (let p of referrer.searchParams) {
    if (p[0] === "name") b.name = p[1];
    else if (p[0] === "size") b.population = +p[1];
    else if (p[0] === "seed") b.MFCG = +p[1];
    else if (p[0] === "shantytown") b.shanty = +p[1];
    else b[p[0]] = +p[1]; // other parameters
  }
  if (params.get("name") && params.get("name") != "null") b.name = params.get("name");

  const label = d3.select("#labels").select("[data-label-type='burg'][data-id='" + burgId + "']");
  if (label.size()) {
    label
      .text(b.name)
      .classed("drag", true)
      .on("mouseover", function () {
        d3.select(this).classed("drag", false);
        label.on("mouseover", null);
      });
  }

  zoomTo(b.x, b.y, 8, 1600);
  tip("Here stands the glorious city of " + b.name, true, "success", 15000);
}

// add drag to upload logic, pull request from @evyatron
void (function addDragToUpload() {
  document.addEventListener("dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();
    ensureEl("mapOverlay").style.display = null;
  });

  document.addEventListener("dragleave", function (e) {
    ensureEl("mapOverlay").style.display = "none";
  });

  document.addEventListener("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();

    const overlay = ensureEl("mapOverlay");
    overlay.style.display = "none";
    if (e.dataTransfer.items == null || e.dataTransfer.items.length !== 1) return; // no files or more than one
    const file = e.dataTransfer.items[0].getAsFile();

    if (!file.name.endsWith(".map") && !file.name.endsWith(".gz")) {
      alertMessage.innerHTML =
        "Please upload a map file (<i>.map</i> or <i>.gz</i> formats) you have previously downloaded";
      $("#alert").dialog({
        resizable: false,
        title: "Invalid file format",
        position: { my: "center", at: "center", of: "svg" },
        buttons: {
          Close: function () {
            $(this).dialog("close");
          }
        }
      });
      return;
    }

    // all good - show uploading text and load the map
    overlay.style.display = null;
    overlay.innerHTML = "Uploading<span>.</span><span>.</span><span>.</span>";
    if (closeDialogs) closeDialogs();
    window.Services.Load.uploadMap(file, () => {
      overlay.style.display = "none";
      overlay.innerHTML = "Drop a map file to open";
    });
  });
})();

async function generate(options) {
  try {
    const { seed: precreatedSeed, graph: precreatedGraph } = options || {};
    setSeed(precreatedSeed);
    applyGraphSize();
    randomizeOptions();

    await GenerationPipeline.run({ seed: precreatedSeed, graph: precreatedGraph });

    logStats();
    invokeActiveZooming();
  } catch (error) {
    ERROR && console.error(error);
    const parsedError = parseError(error);
    clearMainTip();

    alertMessage.innerHTML = /* html */ `An error has occurred on map generation. Please retry. <br />If error is critical, clear the stored data and try again.
      <p id="errorBox">${parsedError}</p>`;
    $("#alert").dialog({
      resizable: false,
      title: "Generation error",
      width: "32em",
      buttons: {
        "Cleanup data": () => cleanupData(),
        Regenerate: function () {
          regenerateMap("generation error");
          $(this).dialog("close");
        },
        Ignore: function () {
          $(this).dialog("close");
        }
      },
      position: { my: "center", at: "center", of: "svg" }
    });
  }
}

// set map seed (string!)
function setSeed(precreatedSeed) {
  if (!precreatedSeed) {
    const first = !mapHistory[0];
    const params = new URL(window.location.href).searchParams;
    const urlSeed = params.get("seed");
    if (first && params.get("from") === "MFCG" && urlSeed.length === 13) seed = urlSeed.slice(0, -4);
    else if (first && urlSeed) seed = urlSeed;
    else seed = generateSeed();
  } else {
    seed = precreatedSeed;
  }

  ensureEl("optionsSeed").value = seed;
  Math.random = aleaPRNG(seed);
}

function logStats() {
  const heightmap = ensureEl("templateInput").value;
  const isTemplate = heightmap in heightmapTemplates;
  const heightmapType = isTemplate ? "template" : "precreated";
  const isRandomTemplate = isTemplate && !stored("template") ? "random " : "";

  const stats = `  Seed: ${seed}
    Canvas size: ${graphWidth}x${graphHeight} px
    Heightmap: ${heightmap}
    Template: ${isRandomTemplate}${heightmapType}
    Points: ${grid.points.length}
    Cells: ${pack.cells.i.length}
    Map size: ${options.mapSize}%
    States: ${pack.states.length - 1}
    Provinces: ${pack.provinces.length - 1}
    Burgs: ${pack.burgs.length - 1}
    Religions: ${pack.religions.length - 1}
    Culture set: ${culturesSet.value}
    Cultures: ${pack.cultures.length - 1}`;

  mapId = Date.now(); // unique map id is it's creation date number
  window.mapId = mapId; // expose for test automation
  mapHistory.push({ seed, width: graphWidth, height: graphHeight, template: heightmap, created: mapId });
  INFO && console.info(stats);

  // Dispatch event for test automation and external integrations
  window.dispatchEvent(new CustomEvent("map:generated", { detail: { seed, mapId } }));
}

const regenerateMap = debounce(async function (config) {
  WARN && console.warn("Generate new random map");

  const cellsDesired = +ensureEl("pointsInput").dataset.cells;
  const shouldShowLoading = cellsDesired > 10000;
  shouldShowLoading && showLoading();

  closeDialogs("#worldConfigurator, #options3d");
  customization = 0;
  resetZoom(1000);
  undraw();
  await generate(config);
  Layers.drawAll();
  if (options.threeD.isOn) window.Controllers.View3d.redraw();
  if (findEl("worldConfigurator")?.offsetParent) window.Controllers.WorldConfigurator.open();

  fitMapToScreen();
  shouldShowLoading && hideLoading();
  clearMainTip();
}, 250);

// clear the map
function undraw() {
  Layers.eraseAll();
  ensureEl("deftemp")
    .querySelectorAll("path, clipPath, svg")
    .forEach(el => el.remove());
  ensureEl("coas").innerHTML = ""; // remove auto-generated emblems
  notes = [];
  unfog();
}
