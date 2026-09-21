# Map Editor Surface Inventory

Phase 1 artifact for the five-phase map surface conversion.

## Scope

This inventory covers the map surfaces that will eventually use the shared World Engine presentation:

- Editors and overviews opened from the map tools menu.
- Creation and transformation tools that currently open dialogs or dedicated editor screens.
- World configuration, options, 3D preview, and nested utility tools.
- Nested editors opened from rows, actions, or controls inside another surface.

The following are deliberately separate:

- **Minimap:** desktop only, small and adjustable. It must not be forced into the large editor surface.
- **Mobile Minimap:** excluded from the mobile map UI. It must not have a mobile open path.
- **Alerts and confirmations:** remain compact feedback surfaces.
- **Main mobile map toolbar:** uses a scrollable choosing-panel design after the five-phase conversion.

## Runtime Provenance

| Field | Current value |
| --- | --- |
| Runtime | Fantasy Map Generator `1.149.2` |
| Runtime entry | `public/fantasy-map-generator/index.html` |
| Runtime bridge entry | `public/fantasy-map-generator/main.js` |
| Runtime styling | `public/fantasy-map-generator/index.css`, `world-engine.css` |
| Host wrapper | `components/map-generator.tsx` |
| Host bridge contract | `lib/map-creator-bridge.ts` |
| Generated output | `public/fantasy-map-generator/*.js` and related assets |
| Upstream project | `https://github.com/Azgaar/Fantasy-Map-Generator` |
| Upstream source status | Vendored under `map-generator-source/` at commit `b86434aa193c85b176d23fb1fd4ed62664af86d3` |
| Upstream build | Node `>=24`; `pnpm run build` runs `tsc && vite build` and writes upstream output to `dist/` |
| Local build status | Root `pnpm validate:map-source` runs the vendored source `pnpm run build` command |

The generated runtime identifies itself as version `1.149.2` in `index-D3JPylQY.js`. The upstream repository has no `v1.149.2` release tag, but commit `b86434aa193c85b176d23fb1fd4ed62664af86d3` is the upstream `1.149.2` merge and contains the maintainable Vite/TypeScript source tree. That source and build configuration are now vendored under `map-generator-source/`. Generated runtime files remain deployment artifacts; bridge-specific runtime edits are mirrored in the vendored public runtime copy.

## Surface Contract

Every converted surface needs a stable record with these fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable surface identifier, normally the existing controller or DOM id |
| `title` | User-facing title shown in the surface header |
| `category` | `editor`, `overview`, `configuration`, `creation`, `preview`, `utility`, or `feedback` |
| `parentId` | Parent surface when opened from another editor; otherwise `null` |
| `mapInteraction` | `none`, `required`, or `optional` while the surface is open |
| `desktopMode` | `large-centered`, `small-adjustable`, or `compact` |
| `mobileMode` | `full-screen`, `unavailable`, or `compact` |
| `cleanup` | Existing close callback and resources that must be released |
| `entryPoints` | Top-level control, map click, keyboard shortcut, or nested action that opens it |

The shared lifecycle planned for Phase 2 will report `open`, `replace`/`push`, `back`, and `close`. Phase 1 only records the contract; it does not add lifecycle messages or change runtime behavior.

## Top-Level Controls

### Tools: Edit

| Control id | Label | Current controller | Category | Desktop target | Mobile target |
| --- | --- | --- | --- | --- | --- |
| `editBiomesButton` | Biomes | `BiomesEditor` | editor | large-centered | full-screen |
| `overviewBurgsButton` | Burgs | `BurgsOverview` | overview | large-centered | full-screen |
| `editCoastlineSettings` | Coastlines | `CoastlineEditor` | editor | large-centered | full-screen |
| `editCulturesButton` | Cultures | `CulturesEditor` | editor | large-centered | full-screen |
| `editDiplomacyButton` | Diplomacy | `DiplomacyEditor` | editor | large-centered | full-screen |
| `editEmblemButton` | Emblems | `EmblemsEditor.openDefault` | editor | large-centered | full-screen |
| `editGoods` | Goods | `GoodsEditor` | editor | large-centered | full-screen |
| `editHeightmapButton` | Heightmap | `HeightmapEditor` | editor | large-centered | full-screen |
| `overviewMarkersButton` | Markers | `MarkersOverview` | overview | large-centered | full-screen |
| `overviewMarketsButton` | Markets | `MarketsOverview` | overview | large-centered | full-screen |
| `editMeasurersButton` | Measurers | `MeasurersEditor` | editor | large-centered | full-screen |
| `overviewLabelsButton` | Labels | `LabelsOverview` | overview | large-centered | full-screen |
| `overviewMilitaryButton` | Military | `MilitaryOverview` | overview | large-centered | full-screen |
| `editNamesBaseButton` | Namesbase | `NamesbaseEditor` | editor | large-centered | full-screen |
| `editNotesButton` | Notes | `NotesEditor` | editor | large-centered | full-screen |
| `editProvincesButton` | Provinces | `ProvincesEditor` | editor | large-centered | full-screen |
| `editReligions` | Religions | `ReligionsEditor` | editor | large-centered | full-screen |
| `overviewRiversButton` | Rivers | `RiversOverview` | overview | large-centered | full-screen |
| `overviewRoutesButton` | Routes | `RoutesOverview` | overview | large-centered | full-screen |
| `editStatesButton` | States | `StatesEditor` | editor | large-centered | full-screen |
| `editTradeAnimationButton` | Trade | `TradeAnimationEditor` | editor | large-centered | full-screen |
| `editUnitsButton` | Units | `UnitsEditor` | editor | large-centered | full-screen |
| `editZonesButton` | Zones | `ZonesEditor` | editor | large-centered | full-screen |

### Tools: Regenerate

These actions currently run a regeneration operation and may show a compact confirmation dialog. They are not editor surfaces themselves, but their confirmation behavior must remain lightweight:

`regenerateBurgs`, `regenerateCultures`, `regenerateEconomy`, `regenerateEmblems`, `regenerateGoods`, `regenerateIce`, `regenerateStateLabels`, `regenerateMarkers`, `regenerateMarkets`, `regenerateMilitary`, `regeneratePopulation`, `regenerateProduction`, `regenerateProvinces`, `regenerateReliefIcons`, `regenerateReligions`, `regenerateRivers`, `regenerateRoutes`, `regenerateStates`, and `regenerateZones`.

### Tools: Add and Create

| Control id | Label | Current controller | Category | Desktop target | Mobile target |
| --- | --- | --- | --- | --- | --- |
| `addBurgTool` | Burg | `BurgCreator` | creation | large-centered | full-screen |
| `addLabel` | Label | `LabelCreator` | creation | large-centered | full-screen |
| `addMarker` | Point of Interest | `MarkerCreator` | creation | large-centered | full-screen |
| `addRiver` | River | `RiverAutoCreator` | creation | large-centered | full-screen |
| `addRoute` | Route | `RouteCreator` | creation | large-centered | full-screen |
| `openSubmapTool` | Submap | `SubmapTool` | utility | large-centered | full-screen |
| `openTransformTool` | Transform | `TransformTool` | utility | large-centered | full-screen |

### Tools: Show

| Control id | Label | Current controller | Category | Desktop target | Mobile target |
| --- | --- | --- | --- | --- | --- |
| `overviewCellsButton` | Cells | `CellInfo` | overview | large-centered | full-screen |
| `overviewChartsButton` | Charts | `ChartsOverview` | overview | large-centered | full-screen |
| `openMinimapButton` | Minimap | `Minimap` | preview | small-adjustable | unavailable |

### Tools: Heightmap

| Control id | Label | Current owner | Category | Desktop target | Mobile target |
| --- | --- | --- | --- | --- | --- |
| `paintBrushes` | Paint Brushes | `PaintEditor`/heightmap editor | utility | large-centered | full-screen |
| `applyTemplate` | Template Editor | `HeightmapEditor` | editor | large-centered | full-screen |
| `convertImage` | Image Converter | `HeightmapEditor` | utility | large-centered | full-screen |
| `heightmapPreview` | Preview | heightmap preview flow | preview | large-centered | full-screen |
| `heightmap3DView` | 3D scene | `View3d` | preview | large-centered | full-screen |
| `finalizeHeightmap` | Finish heightmap | heightmap mode | utility | compact | compact |

Some Heightmap controls are conditionally hidden until Heightmap mode is active. They remain in the inventory because they can open additional surfaces.

### Settings and Configuration

| Control id | Label | Current owner | Category | Desktop target | Mobile target |
| --- | --- | --- | --- | --- | --- |
| `configureWorld` | Configure World | `WorldConfigurator` | configuration | large-centered | full-screen |
| `optionsTrigger` / `optionsTab` | Map options | options container | configuration | large-centered | full-screen |
| `restoreDefaultCanvasSize` | Default canvas | map options | utility | compact | compact |
| `optionsReset` | Reset to defaults | `cleanupData` | utility | compact | compact |
| `styleTab` | Style | options container | configuration | large-centered | full-screen |
| `layersTab` | Layers | options container | configuration | large-centered | full-screen |

The World Engine host toolbar also dispatches `native:click` for these controls. Surface-opening actions use typed lifecycle commands alongside native activation; non-surface actions continue to use native clicks.

## Nested and Utility Surface Registry

The following controllers and runtime modules are known from the current controller registry or dialog construction scan. Parent relationships are representative entry paths and must be confirmed against source after restoration.

### Primary editors and overviews

| Surface/controller | Runtime module | Likely parent or entry path | Category |
| --- | --- | --- | --- |
| `BiomesEditor` | `biomes-editor-*.js` | Tools > Edit > Biomes | editor |
| `BurgsOverview` | `burgs-overview-*.js` | Tools > Edit > Burgs | overview |
| `BurgEditor` | `burg-editor-*.js` | Burgs overview or map settlement click | editor |
| `BurgGroupEditor` | `burg-group-editor-*.js` | Burgs overview or Burg editor | editor |
| `CoastlineEditor` | `coastline-editor-*.js` | Tools > Edit > Coastlines | editor |
| `CoastlineVertexEditor` | `coastline-vertex-editor-*.js` | Coastline editor or map feature click | editor |
| `CulturesEditor` | `cultures-editor-*.js` | Tools > Edit > Cultures | editor |
| `DiplomacyEditor` | `diplomacy-editor-*.js` | Tools > Edit > Diplomacy | editor |
| `EmblemsEditor` | `emblems-editor-*.js` | Tools > Edit > Emblems or state/province/burg row | editor |
| `GoodsEditor` | `goods-editor-*.js` | Tools > Edit > Goods | editor |
| `GoodEditor` | `good-editor-*.js` | Goods editor row/action | editor |
| `DistributionEditor` | `goods-distribution-editor-*.js` | Good editor or goods distribution action | editor |
| `HeightmapEditor` | `heightmap-editor-*.js` | Tools > Edit > Heightmap | editor |
| `IceEditor` | `ice-editor-*.js` | Map ice feature click or related editor | editor |
| `LabelsEditor` | `labels-editor-*.js` | Labels overview or map label click | editor |
| `LabelGroupsConfigurator` | `labels-group-editor-*.js` | Labels overview/group action | configuration |
| `LabelsOverview` | `labels-overview-*.js` | Tools > Edit > Labels | overview |
| `MarketsOverview` | `markets-overview-*.js` | Tools > Edit > Markets | overview |
| `MarketOverview` | `market-overview-*.js` | Markets overview row/map market click | overview |
| `MarketDealsOverview` | `market-deals-overview-*.js` | Market overview | overview |
| `ComparePrices` | `compare-prices-*.js` | Market overview | overview |
| `MeasurersEditor` | `measurers-editor-*.js` | Tools > Edit > Measurers or map ruler | editor |
| `MilitaryOverview` | `military-overview-*.js` | Tools > Edit > Military | overview |
| `RegimentsOverview` | `regiments-overview-*.js` | Military overview | overview |
| `RegimentEditor` | `regiment-editor-*.js` | Regiments overview or map army click | editor |
| `NamesbaseEditor` | `namesbase-editor-*.js` | Tools > Edit > Namesbase or culture action | editor |
| `NotesEditor` | `notes-editor-*.js` | Tools > Edit > Notes or map note action | editor |
| `ProvincesEditor` | `provinces-editor-*.js` | Tools > Edit > Provinces | editor |
| `ReligionsEditor` | `religions-editor-*.js` | Tools > Edit > Religions | editor |
| `RiversOverview` | `rivers-overview-*.js` | Tools > Edit > Rivers | overview |
| `RiverEditor` | `river-editor-*.js` | Rivers overview or map river click | editor |
| `RoutesOverview` | `routes-overview-*.js` | Tools > Edit > Routes | overview |
| `RouteEditor` | `route-editor-*.js` | Routes overview or map route click | editor |
| `RouteGroupsEditor` | `route-groups-editor-*.js` | Routes overview or route settings | configuration |
| `StatesEditor` | `states-editor-*.js` | Tools > Edit > States | editor |
| `TradeAnimationEditor` | `trade-animation-editor-*.js` | Tools > Edit > Trade | editor |
| `UnitsEditor` | `units-editor-*.js` | Tools > Edit > Units or scale bar | editor |
| `ZonesEditor` | `zones-editor-*.js` | Tools > Edit > Zones | editor |

### Creation, preview, and configuration surfaces

| Surface/controller | Runtime module | Category | Special handling |
| --- | --- | --- | --- |
| `BurgCreator` | `burg-creator-*.js` | creation | May require map placement mode |
| `LabelCreator` | `label-creator-*.js` | creation | May require map placement mode |
| `MarkerCreator` | `marker-creator-*.js` | creation | May require map placement mode |
| `RiverAutoCreator` | `river-auto-creator-*.js` | creation | May require map placement mode |
| `RouteCreator` | `route-creator-*.js` | creation | Multi-point map interaction |
| `MarkersOverview` | `markers-overview-*.js` | overview | Opens marker settings/editor children |
| `MarkersEditor` | `markers-editor-*.js` | editor | May open Notes editor |
| `MarkersSettings` | `markers-settings-*.js` | configuration | Rebuild/regeneration actions |
| `MarkersInRadius` | `markers-in-radius-*.js` | overview | Nested marker results |
| `CellInfo` | `cell-info-*.js` | overview | Map-dependent cell inspection |
| `ChartsOverview` | `charts-overview-*.js` | preview | Data visualization |
| `Minimap` | `minimap-*.js` | preview | Desktop small-adjustable only; unavailable on mobile |
| `SubmapTool` | `submap-tool-*.js` | utility | Uses current viewport/map context |
| `TransformTool` | `transform-tool-*.js` | utility | Uses map transform preview |
| `View3d` | `view-3d-*.js` | preview | Large desktop/mobile surface; may have `options3d` child |
| `WorldConfigurator` | `world-configurator-*.js` | configuration | Large desktop/mobile surface |
| `PaintEditor` | `paint-editor-*.js` | utility | Heightmap-dependent |
| `HeightmapSelection` | `heightmap-selection-*.js` | utility | Heightmap child surface |
| `ElevationProfile` | `elevation-profile-*.js` | preview | Heightmap/map-dependent |
| `ReliefEditor` | `relief-editor-*.js` | editor | Map feature editing |
| `LakesEditor` | `lakes-editor-*.js` | editor | Map feature editing |
| `IconSelector` | `icon-selector-*.js` | utility | Nested selection surface |
| `HierarchyTree` | `hierarchy-tree-*.js` | utility | Nested data visualization |
| `TemperatureGraph` | `temperature-graph-*.js` | preview | Data visualization |
| `ProductionOverview` | `production-overview-*.js` | overview | Goods/burg nested flow |
| `ProductionChains` | `production-chains-*.js` | overview | Goods nested flow |
| `TradeDetails` | `trade-details-*.js` | overview | Trade animation nested flow |
| `BattleScreen` | `battle-screen-*.js` | preview | May open `RegimentSelectorScreen` |
| `RegimentSelectorScreen` | `battle-screen-*.js` | utility | Child of battle screen |
| `AI Generator` | `ai-generator-*.js` | utility | Existing compact dialog; include only if opened from scoped map tools |
| `Style Saver` | `index.html`/runtime | configuration | Options/style child surface |
| `Image Converter` | `heightmap-editor-*.js` | utility | Conditional Heightmap child |
| `Template Editor` | `heightmap-editor-*.js` | editor | Conditional Heightmap child |
| `Brushes Panel` | `heightmap-editor-*.js` | utility | Conditional Heightmap child |

## Lightweight Feedback Surfaces

These are not part of the large editor page shell:

- `#alert` and `#alertMessage` confirmation/error dialogs.
- Regeneration confirmation prompts.
- Save/load/export error feedback.
- Version/update notifications.
- Validation and warning messages shown through the map notification system.

They still need readable mobile sizing during later implementation, but their compact feedback behavior is intentional.

## Current Architecture Findings

1. The host iframe is mounted by `components/map-generator.tsx` and communicates through `lib/map-creator-bridge.ts`.
2. The current host can dispatch `native:click` with an arbitrary DOM id, but it receives no editor-open, editor-close, or nested-editor state.
3. The embedded runtime creates dialogs through both jQuery UI `.dialog(...)` calls and custom dialog markup inserted into `#dialogs`.
4. Many dialogs are created lazily by dynamically imported controller modules.
5. Existing runtime CSS already contains World Engine dialog overrides in `world-engine.css`, but those rules are theme/layout overrides rather than a shared lifecycle or presentation contract.
6. Some tools require map interaction while open, especially creation tools, Cell Info, Submap, Transform, Heightmap tools, and map-feature editors. Ordinary data editors should not require map zoom or pointer interaction.
7. The existing runtime has a `MOBILE` constant in `main.js`, while the host also controls iframe viewport sizing. Phase 4 now applies one host/runtime mobile mode policy.
8. The repository contains `armoria/src`, but Armoria is a separate heraldry project and is not the Fantasy Map Generator source tree. It must not be treated as the missing map source.

## Implementation Status

- **Phase 1:** inventory, provenance, and ownership boundaries documented.
- **Phase 2:** pinned source restored; typed lifecycle bridge and runtime dialog stack implemented.
- **Phase 3:** desktop surface dock and typed open/back/close actions implemented.
- **Phase 4:** mobile full-screen policy, compact feedback preservation, and Minimap exclusion implemented.
- **Phase 5:** mobile toolbar and layer controls are available as scrollable, collapsible choosing surfaces.

## Phase 1 Acceptance Checklist

- [x] Runtime version recorded as `1.149.2`.
- [x] Host, bridge, runtime entry, and styling ownership recorded.
- [x] Edit, Regenerate, Add/Create, Show, Heightmap, and Settings control families recorded.
- [x] Primary editor and overview controllers recorded.
- [x] Nested editor and utility candidates recorded.
- [x] Minimap is explicitly desktop-small and mobile-unavailable.
- [x] Alerts and confirmations are explicitly outside the large editor shell.
- [x] Main mobile map toolbar uses a scrollable choosing-panel design.
- [x] Matching upstream source commit and build contract pinned.
- [x] Matching upstream source/build pipeline restored or vendored.
- [x] Source build/check command added to repository validation.

All Phase 1 acceptance items are complete. Later phase behavior is implemented in the host wrapper and bridge runtime described above.
