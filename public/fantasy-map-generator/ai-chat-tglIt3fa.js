import{J as e,k as t}from"./utils-BIleyWmR.js";import{r as n}from"./tooltips-zkair8Am.js";import{t as r}from"./preload-helper-sj3Lqj-M.js";import{n as i,r as a}from"./dialog-helpers-50LJgx0U.js";var o=`fmg-ai-chat-conversations`,s=20,c=2e6,l=42,u=`New conversation`,d=ae(),f=d[0]?.id??``,ee=()=>d;function p(){return d.find(e=>e.id===f)??m()}function te(e){return d.some(t=>t.id===e)&&(f=e),p()}function m(){let e={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,title:u,mapId,updated:Date.now(),entries:[],messages:[],usage:{input:0,output:0,cached:0}};return d.unshift(e),f=e.id,_(),e}function ne(e){d=d.filter(t=>t.id!==e),f===e&&(f=d[0]?.id??``),_()}function h(e){let t=e.entries.find(e=>e.kind===`message`&&e.role===`user`);t?.kind===`message`&&(e.title=ie(t.text)),e.updated=Date.now(),d.sort((e,t)=>t.updated-e.updated),_()}function re(){let e=p();return e.mapId===mapId?e:e.entries.length?m():(e.mapId=mapId,e)}var g=e=>!e.entries.length,ie=e=>e.length>l?`${e.slice(0,l).trimEnd()}…`:e;function ae(){try{let e=JSON.parse(localStorage.getItem(o)??`[]`);return Array.isArray(e)?e.filter(e=>e?.id&&Array.isArray(e.entries)):[]}catch{return[]}}function _(){try{let e=d.slice(0,s),t=JSON.stringify(e);for(;t.length>c&&e.length>1;)e=e.slice(0,-1),t=JSON.stringify(e);localStorage.setItem(o,t)}catch(e){WARN&&console.warn(`AI Chat: conversations could not be stored`,e)}}var v=[{id:`anthropic`,label:`Anthropic`,models:[`claude-sonnet-5`,`claude-opus-4-8`,`claude-haiku-4-5`],keyLink:`https://console.anthropic.com/account/keys`},{id:`openai`,label:`OpenAI`,models:[`gpt-5.6-luna`,`gpt-5.6-terra`,`gpt-5-mini`],keyLink:`https://platform.openai.com/account/api-keys`,baseUrl:`https://api.openai.com/v1`},{id:`mistral`,label:`Mistral`,models:[`mistral-small-latest`,`mistral-medium-latest`],keyLink:`https://console.mistral.ai/api-keys`,baseUrl:`https://api.mistral.ai/v1`},{id:`qwen`,label:`Qwen`,models:[`qwen-flash`,`qwen-plus`],keyLink:`https://modelstudio.console.alibabacloud.com/?tab=playground#/api-key`,baseUrl:`https://dashscope-intl.aliyuncs.com/compatible-mode/v1`},{id:`deepseek`,label:`DeepSeek`,models:[`deepseek-chat`],keyLink:`https://platform.deepseek.com/api_keys`,baseUrl:`https://api.deepseek.com/v1`},{id:`local`,label:`Local`,models:[`local`],keyLink:`https://ollama.com`}],oe=`claude-sonnet-5`,se=`fmg-ai-local-url`,ce=`fmg-ai-local-model`,le=`http://localhost:11434/v1`,ue=new Map;function de(e,t){for(let n of t)ue.set(n,e)}function y(e){let t=v.find(t=>t.models.includes(e))??v.find(t=>t.id===ue.get(e));if(!t)throw Error(`Unknown model: ${e}`);return t}var b=e=>`fmg-ai-kl-${y(e).id}`;async function fe(e){let t=y(e.model);if(t.id===`local`){let t=(localStorage.getItem(`fmg-ai-local-url`)||`http://localhost:11434/v1`).replace(/\/+$/,``),n=e.model===`local`?localStorage.getItem(`fmg-ai-local-model`)??``:e.model;if(!n)throw Error(`Enter a local model name (e.g. llama3.2)`);let{completeOpenAI:i}=await r(async()=>{let{completeOpenAI:e}=await import(`./providers-openai-BLO5WFqe.js`);return{completeOpenAI:e}},[]);return i(t,{...e,model:n})}if(!t.baseUrl)return pe(e);let{completeOpenAI:n}=await r(async()=>{let{completeOpenAI:e}=await import(`./providers-openai-BLO5WFqe.js`);return{completeOpenAI:e}},[]);return n(t.baseUrl,e)}async function pe({key:e,model:t,system:n,messages:r,tools:i,signal:a}){let o=await fetch(`https://api.anthropic.com/v1/messages`,{method:`POST`,signal:a,headers:{"Content-Type":`application/json`,"x-api-key":e,"anthropic-version":`2023-06-01`,"anthropic-dangerous-direct-browser-access":`true`},body:JSON.stringify({model:t,system:n,messages:r,tools:i,max_tokens:4096})});if(!o.ok)throw Error(await me(o));let s=await o.json();return{content:s.content??[],stopReason:s.stop_reason??`end_turn`,usage:{input:(s.usage?.input_tokens??0)+(s.usage?.cache_creation_input_tokens??0),output:s.usage?.output_tokens??0,cached:s.usage?.cache_read_input_tokens??0}}}async function me(e){try{let t=await e.json();return t.error?.message||t.error||`${e.status} ${e.statusText}`}catch{return`${e.status} ${e.statusText}`}}var he=864e5,ge={anthropic:{include:/^claude/},openai:{include:/^(gpt|o\d)/,exclude:/audio|realtime|image|tts|embed|whisper|moderation|transcribe|dall/},mistral:{exclude:/embed|moderation|ocr|voxtral|transcribe/},qwen:{include:/^qwen/,exclude:/embed|ocr|audio|tts|asr|image|video|omni|vl|mt/},deepseek:{include:/^deepseek/}};function _e(e,t){let n=ge[e];return n?t.filter(e=>(!n.include||n.include.test(e))&&!n.exclude?.test(e)):t}async function ve(e,t){let n=_e(e,await ye(e,t));return Se(e,n),de(e,n),n}async function ye(e,t){let n=await fetch(be(e),{headers:xe(e,t)});if(!n.ok)throw Error(`${n.status} ${n.statusText}`);return((await n.json()).data??[]).map(e=>e.id)}function be(e){return e===`anthropic`?`https://api.anthropic.com/v1/models`:e===`local`?`${(localStorage.getItem(`fmg-ai-local-url`)||`http://localhost:11434/v1`).replace(/\/+$/,``)}/models`:`${v.find(t=>t.id===e)?.baseUrl}/models`}function xe(e,t){return e===`anthropic`?{"x-api-key":t,"anthropic-version":`2023-06-01`,"anthropic-dangerous-direct-browser-access":`true`}:t?{Authorization:`Bearer ${t}`}:{}}function Se(e,t){try{localStorage.setItem(`fmg-ai-models-${e}`,JSON.stringify({time:Date.now(),models:t}))}catch{}}function Ce(e){try{let t=JSON.parse(localStorage.getItem(`fmg-ai-models-${e}`)??`null`);return!t||!Array.isArray(t.models)||Date.now()-t.time>he?[]:t.models}catch{return[]}}function we(e,t){return[...e,...t.filter(t=>!e.includes(t))]}var Te=[`You are an assistant embedded in Azgaar's Fantasy Map Generator (FMG), a browser app for
procedurally generated fantasy maps. You answer questions about the map the user currently has open.

Your only tool is \`run\`, which executes JavaScript in the page itself. The map data is in the page's
global scope, so a script can read anything the app can. Everything you know about the map comes from
running scripts — never guess at numbers or names.`,'# Rules\n\n- **Read-only.** Do not assign to `pack`, `grid`, `options`, `style` or `notes`, do not call\n  generator methods that regenerate data, and do not call `draw*` or `toggle*` functions. If the\n  user asks to change the map, explain that editing is not supported yet in this build.\n- `return` the answer from the script. Only the returned value and console output come back to you,\n  so aggregate, count and slice before returning — never return a whole entity array.\n- Results are truncated at 8000 characters. If you hit that, return less.\n- When you are unsure of a shape, call `describe("pack.burgs[1]")` or `describe("Burgs")` inside a\n  script and return the result. Reflection beats assumption: this codebase is mid-migration.\n- Prefer one script that computes the final answer over several exploratory ones, but a quick\n  `describe` round first is fine when the shape is genuinely unknown.\n- If a script throws, read the stack, fix the script and retry.\n- When the user asks for a file (CSV, JSON, plain text), build the content in a script and call\n  `downloadFile(content, "name.csv", "text/csv")` — the browser saves it to the user\'s machine.\n  This does not count as changing the map. Tell the user the file name you produced.\n- Answer in prose. Do not paste raw JSON at the user unless they ask for it.\n- Your answers render as Markdown, so use it where it earns its place: a table for multi-column\n  results, a list for several findings, `code` for field and entity names, bold for a headline\n  number. Keep it light — a one-line answer needs no formatting at all.','# Gotchas that the type declarations do not tell you\n\n- **Index 0 is reserved** in `pack.states` (neutrals), `cultures` (wildlands), `religions` (no\n  religion) and `provinces`. In `pack.burgs` and `pack.features` element 0 is the *number* `0`, so\n  `pack.burgs[0].name` quietly returns `undefined` instead of throwing — a filtered-out entity is\n  easy to miss. Cell arrays are different: cell `0` is a real cell.\n- **Deleted entities keep their slot** with `removed: true`. The standard filter is\n  `array.filter(item => item.i && !item.removed)`.\n- **Land is `pack.cells.h[i] >= 20`.** Below 20 is water.\n- **Population is in points, not people.** Rural: `pack.cells.pop[i] * populationRate`. Urban:\n  `burg.population * populationRate * urbanization`. The same applies to `rural`/`urban` on states,\n  cultures, religions and provinces.\n- **Cell geometry:** `pack.cells.c[i]` are neighboring cell ids, `pack.cells.v[i]` are vertex ids,\n  `pack.cells.b[i]` marks a map-border cell. These voronoi arrays live in memory only and are\n  rebuilt on load, so they are absent from the .map file but always present at runtime.\n- **Water body of a cell:** `pack.features[pack.cells.f[i]]`, whose `type` is `ocean`, `lake` or\n  `island`.\n- **Coordinates** (`burg.x`, `state.pole`, …) are map units; the map spans `graphWidth` ×\n  `graphHeight`. The current view is `scale`, `viewX`, `viewY` — do not confuse it with map space.\n  `findCell(x, y)` returns the cell id at a point. `distanceScale` converts pixels to the map\'s\n  distance unit.\n- **Generator singletons are class instances** (`Burgs`, `States`, `Cultures`, …). Their methods are\n  not listed here on purpose — call `describe("States")` to see the current surface.\n- **The declarations can be wrong.** `PackedGraph` types `cells.b` as `boolean[]`, but at runtime it\n  is a plain array of `0`/`1`. When an assumption matters, `describe` it rather than trust it.\n- **Some globals appear only once their module has loaded.** Guard with\n  `typeof someGlobal === "function"` before calling anything outside the core data objects.',"# Rendering\n\nThe app redraws through global `draw*` functions, with `Layers.drawAll()` redrawing every visible layer.\nYou do not need them while you are read-only; they are listed for context only.",`# Global declarations

\`\`\`ts
var MOBILE: boolean;

  /**
   * Migrated helpers, reachable ONLY as \`window.X\` — deliberately not \`var\`, so that bare \`X\`
   * in a bundled module is a compile error. src/ imports what it calls; these entries exist so
   * the owning module can register the bridge and classic public/ code can keep calling it.
   * When the last classic caller of one is gone, delete the entry and its \`window.X =\` line.
   */
  interface Window {
    tip: typeof import("../components/tooltips").tip;
    drawBurgIcon: typeof import("../renderers/draw-burg-icons").drawBurgIcon;
    removeBurgIcon: typeof import("../renderers/draw-burg-icons").removeBurgIcon;
    clearMainTip: typeof import("../components/tooltips").clearMainTip;
    showDataTip: typeof import("../components/tooltips").showDataTip;
    showElementLockTip: typeof import("../components/tooltips").showElementLockTip;
    lock: typeof import("../utils/preferences").lock;
    unlock: typeof import("../utils/preferences").unlock;
    stored: typeof import("../utils/preferences").stored;
    applyDefaultViewboxEvents: typeof import("../components/viewbox-events").applyDefaultViewboxEvents;
    redrawLegend: typeof import("../renderers/draw-legend").redrawLegend;
    fitLegendBox: typeof import("../renderers/draw-legend").fitLegendBox;
    clearLegend: typeof import("../renderers/draw-legend").clearLegend;
    unfog: typeof import("../renderers/overlays/fogging").unfog;
    showInfo: typeof import("../components/app-info").showInfo;
    applyOption: typeof import("../utils").applyOption;
    closeDialogs: typeof import("../components/dialog/dialog-helpers").closeDialogs;
    confirmationDialog: typeof import("../components/dialog/dialog-helpers").confirmationDialog;
    downloadFile: typeof import("../utils").downloadFile;
    uploadFile: typeof import("../utils").uploadFile;
    panMap: typeof import("../components/zoom").panMap;
    setMapZoom: typeof import("../components/zoom").setMapZoom;
    changeMapZoom: typeof import("../components/zoom").changeMapZoom;
    setZoomExtent: typeof import("../components/zoom").setZoomExtent;
    setTranslateExtent: typeof import("../components/zoom").setTranslateExtent;
  }

  var mapId: number;
  var seed: string;
  var pack: PackedGraph;
  var grid: GridGraph;
  var graphHeight: number;
  var graphWidth: number;
  var TIME: boolean;
  var INFO: boolean;
  var WARN: boolean;
  var ERROR: boolean;
  var DEBUG: { stateLabels?: boolean; [key: string]: boolean | undefined };
  var options: Options;

  var Goods: GoodsModule;
  var Production: ProductionModule;
  var Markets: MarketsModule;
  var populationRate: number;
  var urbanDensity: number;
  var urbanization: number;
  var distanceScale: number;

  var pointsInput: HTMLInputElement;
  var culturesInput: HTMLInputElement;
  var culturesSet: HTMLSelectElement;
  var heightExponentInput: HTMLInputElement;
  var alertMessage: HTMLElement;
  var mapName: HTMLInputElement;
  var religionsNumber: HTMLInputElement;
  var distanceUnitInput: HTMLInputElement;
  var heightUnit: HTMLSelectElement;
  var areaUnit: HTMLInputElement;
  var stylePreset: HTMLSelectElement;
  var temperatureScale: HTMLSelectElement;
  var effectiveLabelPx: (scale: number, startPx: number, restPx: number) => number;
  var labelPxForGroup: (group: string, d: number, scale: number) => number;
  var svgLabelFontSize: (px: number, scale: number) => number;
  var labelTiers: {
    groupRank: (group: string) => number;
    groupMinZoom: (group: string) => number;
  };
  var selectNonOverlapping: (
    boxes: {
      id: string;
      left: number;
      top: number;
      right: number;
      bottom: number;
      weight: number;
    }[]
  ) => Set<string>;

  // Global variables defined in main.js
  var scale: number;
  var viewX: number;
  var viewY: number;

  var getColorScheme: (scheme: string | null) => (t: number) => string;
  var getColor: (height: number, scheme: (t: number) => string) => string;
  var svgWidth: number;
  var svgHeight: number;
  var statesBody: Selection<SVGGElement, unknown, null, undefined>;
  var statesHalo: Selection<SVGGElement, unknown, null, undefined>;
  var emblems: Selection<SVGElement, unknown, null, undefined>;
  var armies: Selection<SVGGElement, unknown, null, undefined>;
  var labels: Selection<SVGGElement, unknown, null, undefined>;
  var terrain: Selection<SVGGElement, unknown, null, undefined>;

  // Renderer bridges registered on window by their owning module (see draw-* renderers)
  var drawLabels: () => void;
  var drawRoutes: () => void;
  var drawRoute: (route: import("../generators/routes-generator").Route) => void;
  // Element globals bound by the compatibility shim in public/main.js (upstream migrated to
  // d3.select("#id") at the point of use). Delete alongside that shim.
  var viewbox: Selection<SVGElement, unknown, null, undefined>;
  var routes: Selection<SVGElement, unknown, null, undefined>;
  var routeTypeStyle: (
    type: string
  ) => { "stroke-width": number; "stroke-dasharray": string | null; "stroke-linecap": string } | undefined;
  var routeGroupStyle: (
    group: string
  ) => { "stroke-width": number; "stroke-dasharray": string | null; "stroke-linecap": string } | undefined;
  var applyRouteLineStyle: (el: Element, fallback: unknown, presetStyle: unknown) => void;
  var readPresetAttrs: (el: Element, attrs: string[]) => Record<string, string>;
  var debug: Selection<SVGElement, unknown, null, undefined>;
  // SVG layer selections reassigned on map load (main.js)
  var scaleBar: Selection<SVGGElement, unknown, null, undefined>;
  var ocean: Selection<SVGGElement, unknown, null, undefined>;
  var oceanPattern: Selection<SVGGElement, unknown, null, undefined>;
  var landmass: Selection<SVGGElement, unknown, null, undefined>;
  var texture: Selection<SVGGElement, unknown, null, undefined>;
  var biomes: Selection<SVGGElement, unknown, null, undefined>;
  var cells: Selection<SVGGElement, unknown, null, undefined>;
  var gridOverlay: Selection<SVGGElement, unknown, null, undefined>;
  var coordinates: Selection<SVGGElement, unknown, null, undefined>;
  var compass: Selection<SVGGElement, unknown, null, undefined>;
  var zones: Selection<SVGGElement, unknown, null, undefined>;
  var borders: Selection<SVGGElement, unknown, null, undefined>;
  var stateBorders: Selection<SVGGElement, unknown, null, undefined>;
  var provinceBorders: Selection<SVGGElement, unknown, null, undefined>;
  var roads: Selection<SVGGElement, unknown, null, undefined>;
  var trails: Selection<SVGGElement, unknown, null, undefined>;
  var searoutes: Selection<SVGGElement, unknown, null, undefined>;
  var airroutes: Selection<SVGGElement, unknown, null, undefined>;
  var prec: Selection<SVGGElement, unknown, null, undefined>;
  var population: Selection<SVGGElement, unknown, null, undefined>;
  var icons: Selection<SVGGElement, unknown, null, undefined>;
  var ruler: Selection<SVGGElement, unknown, null, undefined>;
  var fogging: Selection<SVGGElement, unknown, null, undefined>;
  var notes: any[]; // TODO: correct type
  var style: Style;

  var getArea: (rawArea: number) => number;

  // Dialog fit-content gutter fix, defined in src/components/dialog/fit-content.ts
  var fitContent: () => string;
  var getAreaUnit: (squareMark?: string) => string;
  var getPrecipitation: (prec: number) => string;

  // IO / loading helpers defined in classic public/ scripts
  var ldb: {
    get: (key: string) => Promise<Blob | undefined>;
    set: (key: string, value: Blob) => Promise<void>;
  };
  var Dropbox: any; // dropbox-sdk global, loaded on demand from libs/dropbox-sdk.min.js
  var mapHistory: { created: number; [key: string]: unknown }[];
  var customPresetPrefix: string;

  var focusOn: () => void;
  var fitMapToScreen: () => void;
  var regenerateMap: (reason?: string) => void;
  var generateMapOnLoad: () => void;
  var addCustomColorScheme: (scheme: string) => void;
  var updateTextureSelectValue: (href: string) => void;
  var calculateFriendlyGridSize: () => void;
  // heightmap editor globals
  var color: (value: number) => string;
  var edits: any; // heightmap edit history: Uint8Array[] with an extra .n cursor
  var undraw: () => void;
  var changeViewMode: (event?: Event) => void;
  var resetZoom: (duration?: number) => void;
  var RgbQuant: any; // external RgbQuant image-quantization lib

  var shiftCompass: () => void;

  var invokeActiveZooming: () => void;
  var FlatQueue: any;

  var THREE: any; // lazy-loaded

  var $: (selector: any) => any;
  var changeFont: () => void;
  var logStats: () => void;
  var applyGraphSize: () => void;
  var cellsDensityMap: Record<number, number>;
  var changeCellsDensity: (value: string) => void;
  var getCellsDensityColor: (cells: number) => string;
  var showExportPane: () => void;
  var customization: number;
  var zoomTo: (x: number, y: number, zoom?: number, duration?: number) => void;
  var modules: Record<string, boolean>;

  // Legacy UI globals
  var toggleOptions: (event?: Event) => void;
  var hideOptions: (event?: Event) => void;
  var isCtrlClick: (event: MouseEvent) => boolean;
  var editStyle: (layer: string, group?: string) => void;
  var capitalize: (str: string) => string;
  var rn: (value: number, decimals?: number) => number;
  var openURL: (url: string) => void;

  var tinymce:
    | {
        _setBaseUrl: (url: string) => void;
        init: (config: Record<string, unknown>) => void;
        remove: () => void;
        activeEditor?: { getContent: () => string; setContent: (content: string) => void };
      }
    | undefined;

  var aleaPRNG: (seed: string | number) => () => number;
  var heightmapColorSchemes: Record<string, unknown>;
  var regeneratePrompt: (options?: { seed?: string; graph?: any }) => void;

  type MilitaryUnit = {
    icon: string;
    name: string;
    rural: number;
    urban: number;
    crew: number;
    power: number;
    type: string;
    separate: number;
    biomes?: number[];
    states?: number[];
    cultures?: number[];
    religions?: number[];
  };
\`\`\``,`# Generator singletons

\`\`\`ts
var AddedLabels: AddedLabelsModule;
var Biomes: BiomesGenerator;
var Burgs: BurgModule;
var Coordinates: CoordinatesModule;
var Cultures: CulturesGenerator;
var Features: FeatureModule;
var GenerationPipeline: import("@/generators/pipeline").Pipeline<GenerationPipelineStepId, GenerationContext>;
var Goods: GoodsModule;
var Grid: GridModule;
var HeightmapGenerator: HeightmapModule;
var Ice: IceModule;
var Labels: LabelsModule;
var Lakes: LakesModule;
var Markers: MarkersModule;
var Markets: MarketsModule;
var Measurers: MeasurersModule;
var Military: MilitaryModule;
var Names: NamesGenerator;
var Pack: PackModule;
var Precipitation: PrecipitationModule;
var Production: ProductionModule;
var Provinces: ProvinceModule;
var Relief: ReliefModule;
var Religions: ReligionsModule;
var Rivers: RiverModule;
var Routes: RoutesModule;
var States: StatesModule;
var Temperature: TemperatureModule;
var Zones: ZonesModule;
var simplify: (points: Point[], tolerance: number, highestQuality?: boolean) => Point[];
\`\`\``,`# Lazy module registries

Callable as \`await Controllers.X.open()\` / \`await Services.X.method()\`:

\`\`\`
Controllers.AiChat
Controllers.AiGenerator
Controllers.BattleScreen
Controllers.BiomesEditor
Controllers.BurgCreator
Controllers.BurgEditor
Controllers.BurgGroupEditor
Controllers.BurgsOverview
Controllers.CellInfo
Controllers.ChartsOverview
Controllers.CoastlineEditor
Controllers.CoastlineVertexEditor
Controllers.ColorPicker
Controllers.ComparePrices
Controllers.CulturesEditor
Controllers.DiplomacyEditor
Controllers.DistributionEditor
Controllers.ElevationProfile
Controllers.EmblemsEditor
Controllers.GoodEditor
Controllers.GoodsEditor
Controllers.HeightmapEditor
Controllers.HeightmapSelection
Controllers.IconSelector
Controllers.HierarchyTree
Controllers.IceEditor
Controllers.LabelsEditor
Controllers.LabelGroupsConfigurator
Controllers.LabelCreator
Controllers.LabelsOverview
Controllers.LakesEditor
Controllers.MarkersEditor
Controllers.MarkersSettings
Controllers.MarkerCreator
Controllers.MarkersInRadius
Controllers.MarkersOverview
Controllers.MarketDealsOverview
Controllers.MarketOverview
Controllers.MarketsOverview
Controllers.MeasurersEditor
Controllers.MilitaryOverview
Controllers.Minimap
Controllers.NamesbaseEditor
Controllers.NotesEditor
Controllers.PaintEditor
Controllers.ProductionChains
Controllers.ProductionOverview
Controllers.ProvincesEditor
Controllers.RegimentEditor
Controllers.RegimentsOverview
Controllers.ReliefEditor
Controllers.ReligionsEditor
Controllers.RiverCreator
Controllers.RiverAutoCreator
Controllers.RiverEditor
Controllers.RiversOverview
Controllers.RouteCreator
Controllers.RouteEditor
Controllers.RouteGroupsEditor
Controllers.RoutesOverview
Controllers.StatesEditor
Controllers.SubmapTool
Controllers.TemperatureGraph
Controllers.TradeAnimationEditor
Controllers.TradeDetails
Controllers.TransformTool
Controllers.UnitsEditor
Controllers.View3d
Controllers.WorldConfigurator
Controllers.ZonesEditor
Services.AppOffer
Services.Cloud
Services.ExportJson
Services.ExportMap
Services.Load
Services.Save
Services.UiTour
\`\`\``,`# Core data types

\`\`\`ts
export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Float32Array | Float64Array;

export interface PackedGraph {
  cells: {
    i: number[]; // cell indices
    c: number[][]; // neighboring cells
    v: number[][]; // neighboring vertices
    p: [number, number][]; // cell polygon points
    b: boolean[]; // cell is on border
    h: TypedArray; // cell heights
    t: TypedArray; // cell terrain types
    r: TypedArray; // river id passing through cell
    f: TypedArray; // feature id occupying cell
    fl: TypedArray; // flux presence in cell
    s: TypedArray; // cell suitability
    pop: TypedArray; // cell population
    conf: TypedArray; // cell water confidence
    haven: TypedArray; // cell is a haven
    g: number[]; // cell ground type
    culture: TypedArray; // cell culture id
    biome: TypedArray; // cell biome id
    harbor: TypedArray; // cell harbour presence
    burg: TypedArray; // cell burg id
    religion: TypedArray; // cell religion id
    state: TypedArray; // cell state id
    area: TypedArray; // cell area
    province: TypedArray; // cell province id
    good: Uint16Array; // cell good id
    market: Uint16Array; // cell market id
    routes: Record<number, Record<number, number>>;
  };
  vertices: {
    i: number[]; // vertex indices
    c: [number, number, number][]; // neighboring cells
    v: number[][]; // neighboring vertices
    x: number[]; // x coordinates
    y: number[]; // y coordinates
    p: [number, number][]; // vertex points
  };
  rivers: River[];
  relief: ReliefIcon[];
  biomes: Biome[];
  features: Feature[];
  burgs: Burg[];
  states: State[];
  cultures: Culture[];
  routes: Route[];
  religions: Religion[];
  zones: Zone[];
  markers: Marker[];
  ice: Ice[];
  provinces: Province[];
  goods: Good[];
  markets: Market[];
  deals: Deal[];
  measurers: Measurer[];
  addedLabels: AddedLabel[];
}
\`\`\``,"# Data model reference\n\n**FMG data model** is poorly defined, inconsistent and not well-documented. This page is an attempt to document it. Once everything is documented, it can be used for building a new consistent model. Please note the current document reflect the object model **as is**, so with all its quirks. The model we want to get is covered in the [future_data_model.md](future_data_model.md) page.\n\nFMG exposes most of its data into the global namespace.\n\n# Basic objects\n\nFMG has two meta-objects storing most of the map data:\n\n- `grid` contains map data before _repacking_ ([`GridGraph`](../../src/types/GridGraph.ts), built and generated by the [`Grid` module](../../src/generators/grid-generator.ts))\n- `pack` contains map data after _repacking_ ([`PackedGraph`](../../src/types/PackedGraph.ts), derived from the grid by `Pack.generate()`)\n\nRepacking is a process of amending an initial [voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram), that is based on a jittered square grid of points, into a voronoi diagram optimized for the current landmass (see [my old blog post](https://azgaar.wordpress.com/2017/10/05/templates) for the details). So the `pack` object is used for most of the data, but data optimized for square grid is available only via the `grid` object.\n\n## Voronoi data\n\nBoth `grid` and `pack` objects include data representing voronoi diagrams and their inner connections. Both initial and repacked voronoi can be build from the initial set of points, so this data is stored in memory only. It does not included into the .map file and getting calculated on map load.\n\n### Grid object\n\n- `grid.cellsDesired`: `number` - initial count of cells/points requested for map creation. Used to define `spacing` and place points on a jittered square grid, hence the object name. Actual number of cells is defined by the number points able to place on a square grid. Default `cellsDesired` is 10 000, maximum - 100 000, minimal - 1 000\n- `grid.spacing`: `number` - spacing between points before jittering\n- `grid.cellsY`: `number` - number of cells in column\n- `grid.cellsX`: `number` - number of cells in row\n- `grid.points`: `number[][]` - coordinates `[x, y]` based on jittered square grid. Numbers rounded to 2 decimals\n- `grid.boundary`: `number[][]` - off-canvas points coordinates used to cut the diagram approximately by canvas edges. Integers\n- `grid.cells`: `{}` - cells data object, including voronoi data:\n- - `grid.cells.i`: `number[]` - cell indexes `Uint16Array` or `Uint32Array` (depending on cells number)\n- - `grid.cells.c`: `number[][]` - indexes of cells adjacent to each cell (neighboring cells)\n- - `grid.cells.v`: `number[][]` - indexes of vertices of each cell\n- - `grid.cells.b`: `number[]` - indicates if cell borders map edge, 1 if `true`, 0 if `false`. Integers, not Boolean\n\n- `grid.vertices`: `{}` - vertices data object, contains only voronoi data:\n- - `grid.vertices.p`: `number[][]` - vertices coordinates `[x, y]`, integers\n- - `grid.vertices.c`: `number[][]` - indexes of cells adjacent to each vertex, each vertex has 3 adjacent cells\n- - `grid.vertices.v`: `number[][]` - indexes of vertices adjacent to each vertex. Most vertices have 3 neighboring vertices, bordering vertices has only 2, while the third is still added to the data as `-1`\n\n### Pack object\n\n- `pack.cells`: `{}` - cells data object, including voronoi data:\n- - `pack.cells.i`: `number[]` - cell indexes `Uint16Array` or `Uint32Array` (depending on cells number)\n- - `pack.cells.p`: `number[][]` - cells coordinates `[x, y]` after repacking. Numbers rounded to 2 decimals\n- - `pack.cells.c`: `number[][]` - indexes of cells adjacent to each cell (neighboring cells)\n- - `pack.cells.v`: `number[][]` - indexes of vertices of each cell\n- - `pack.cells.b`: `number[]` - indicator whether the cell borders the map edge, 1 if `true`, 0 if `false`. Integers, not Boolean\n- - `pack.cells.g`: `number[]` - indexes of a source cell in `grid`. `Uint16Array` or `Uint32Array`. The only way to find correct `grid` cell parent for `pack` cells\n\n- `pack.vertices`: `{}` - vertices data object, contains only voronoi data:\n- - `pack.vertices.p`: `number[][]` - vertices coordinates `[x, y]`, integers\n- - `pack.vertices.c`: `number[][]` - indexes of cells adjacent to each vertex, each vertex has 3 adjacent cells\n- - `pack.vertices.v`: `number[][]` - indexes of vertices adjacent to each vertex. Most vertices have 3 neighboring vertices, bordering vertices has only 2, while the third is still added to the data as `-1`\n\n## Features data\n\nFeatures represent separate locked areas like islands, lakes and oceans.\n\n### Grid object\n\n- `grid.features`: `object[]` - array containing objects for all enclosed entities of original graph: islands, lakes and oceans. Feature object structure:\n- - `i`: `number` - feature id starting from `1`\n- - `land`: `boolean` - `true` if feature is land (height >= `20`)\n- - `border`: `boolean` - `true` if feature touches map border (used to separate lakes from oceans)\n- - `type`: `string` - feature type, can be `ocean`, `island` or `lake\n\n### Pack object\n\n- `pack.features`: `object[]` - array containing objects for all enclosed entities of repacked graph: islands, lakes and oceans. Note: element 0 has no data. Stored in .map file. Feature object structure:\n- - `i`: `number` - feature id starting from `1`\n- - `land`: `boolean` - `true` if feature is land (height >= `20`)\n- - `border`: `boolean` - `true` if feature touches map border (used to separate lakes from oceans)\n- - `type`: `string` - feature type, can be `ocean`, `island` or `lake`\n- - `subtype`: `string`: feature subtype, depends on type. Subtype for ocean is `ocean`; for land it is `continent`, `island`, `isle` or `lake_island`; for lake it is `freshwater`, `salt`, `dry`, `sinkhole` or `lava`\n- - `group`: `string`: rendering group, the id of the SVG group the feature is drawn in. Defaults to the subtype for lakes, `lake_island` for islands within lakes and `sea_island` for the rest of the land; users can move a feature into a group of their own in the Coastline and Lake editors\n- - `cells`: `number` - number of cells in feature\n- - `firstCell`: `number` - index of the first (top left) cell in feature\n- - `vertices`: `number[]` - indexes of vertices around the feature (perimetric vertices)\n    \\*\\* `name`: `string` - name, available for `lake` type only\n\n## Specific cells data\n\nWorld data is mainly stored in typed arrays within `cells` object in both `grid` and `pack`.\n\n### Grid object\n\n- `grid.cells.h`: `number[]` - cells elevation in `[0, 100]` range, where `20` is the minimal land elevation. `Uint8Array`\n- `grid.cells.f`: `number[]` - indexes of feature. `Uint16Array` or `Uint32Array` (depending on cells number)\n- `grid.cells.t`: `number[]` - [distance field](https://prideout.net/blog/distance_fields/) from water level. `1, 2, ...` - land cells, `-1, -2, ...` - water cells, `0` - unmarked cell. `Uint8Array`\n- `grid.cells.temp`: `number[]` - cells temperature in Celsius. `Uint8Array`\n- `grid.cells.prec`: `number[]` - cells precipitation in unspecified scale. `Uint8Array`\n\n### Pack object\n\n- `pack.cells.h`: `number[]` - cells elevation in `[0, 100]` range, where `20` is the minimal land elevation. `Uint8Array`\n- `pack.cells.f`: `number[]` - indexes of feature. `Uint16Array` or `Uint32Array` (depending on cells number)\n- `pack.cells.t`: `number[]` - distance field. `1, 2, ...` - land cells, `-1, -2, ...` - water cells, `0` - unmarked cell. `Uint8Array`\n- `pack.cells.s`: `number[]` - cells score. Scoring is used to define best cells to place a burg. `Uint16Array`\n- `pack.cells.biome`: `number[]` - cells biome index. `Uint8Array`\n- `pack.cells.burg`: `number[]` - id of the cell's **primary ground burg** (`0` = none). `Uint32Array` (fork: supports >65535 burgs). A cell may host additional burgs: secondary ground burgs and flying burgs are listed only in `pack.burgs` (each burg's `cell` field is authoritative) and never own this slot. Invariant: a cell has at least one ground burg iff this value is non-zero. Slot transitions go through `groundSlotOnPlacement` / `cellSlotAfterRemoval` in `src/generators/burgs-generator.ts`\n- `pack.cells.culture`: `number[]` - cells culture index. `Uint16Array`\n- `pack.cells.state`: `number[]` - cells state index. `Uint16Array`\n- `pack.cells.province`: `number[]` - cells province index. `Uint16Array`\n- `pack.cells.religion`: `number[]` - cells religion index. `Uint16Array`\n- `pack.cells.good`: `number[]` - cells bonus resource good id (`0` if none). Marks the special good extracted on the cell. `Uint16Array`\n- `pack.cells.market`: `number[]` - cells market index (`0` if unassigned). Filled by the market territory flood-fill. `Uint16Array`\n- `pack.cells.area`: `number[]` - cells area in pixels. `Uint16Array`\n- `pack.cells.pop`: `number[]` - cells population in population points (1 point = 1000 people by default). `Float32Array`, not rounded to not lose population of high population rate\n- `pack.cells.r`: `number[]` - cells river index. `Uint16Array`\n- `pack.cells.fl`: `number[]` - cells flux amount. Defines how much water flow through the cell. Use to get rivers data and score cells. `Uint16Array`\n- `pack.cells.conf`: `number[]` - cells flux amount in confluences. Confluences are cells where rivers meet each other. `Uint16Array`\n- `pack.cells.harbor`: `number[]` - cells harbor score. Shows how many water cells are adjacent to the cell. Used for scoring. `Uint8Array`\n- `pack.cells.haven`: `number[]` - cells haven cells index. Each coastal cell has haven cells defined for correct routes building. `Uint16Array` or `Uint32Array` (depending on cells number)\n- `pack.cells.routes`: `object` - cells connections via routes. E.g. `pack.cells.routes[8] = {9: 306, 10: 306}` shows that cell `8` has two route connections - with cell `9` via route `306` and with cell `10` by route `306`\n\n# Secondary data\n\nSecondary data available as a part of the `pack` object.\n\n## Cultures\n\nCultures (races, language zones) data is stored as an array of objects with strict element order. Element 0 is reserved by the _wildlands_ culture. If culture is removed, the element is not getting removed, but instead a `removed` attribute is added. Object structure:\n\n- `i`: `number` - culture id, always equal to the array index\n- `base`: `number` - _nameBase_ id, name base is used for names generation\n- `name`: `string` - culture name\n- `origins`: `number[]` - ids of origin cultures. Used to render cultures tree to show cultures evolution. The first array member is main link, other - supporting out-of-tree links\n- `shield`: `string` - shield type. Used for emblems rendering\n- `center`: `number` - cell id of culture center (initial cell)\n- `code`: `string` - culture name abbreviation. Used to render cultures tree\n- `color`: `string` - culture color in hex (e.g. `#45ff12`) or link to hatching pattern (e.g. `url(#hatch7)`)\n- `expansionism`: `number` - culture growth multiplier. Used mainly during cultures generation to spread cultures not uniformly\n- `type`: `string` - culture type, see [culture types](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Culture-types)\n- `area`: `number` - culture area in pixels\n- `cells`: `number` - number of cells assigned to culture\n- `rural`: `number` - rural (non-burg) population of cells assigned to culture. In population points\n- `urban`: `number` - urban (burg) population of cells assigned to culture. In population points\n- `lock`: `boolean` - `true` if culture is locked (not affected by regeneration)\n- `removed`: `boolean` - `true` if culture is removed\n\n## Burgs\n\nBurgs (settlements) data is stored as an array of objects with strict element order. Element 0 is an empty object. If burg is removed, the element is not getting removed, but instead a `removed` attribute is added. Object structure:\n\n- `i`: `number` - burg id, always equal to the array index\n- `name`: `string` - burg name\n- `cell`: `number` - burg cell id. A cell can host multiple burgs; `pack.cells.burg` tracks only the primary ground burg (fork extension — upstream allows one burg per cell)\n- `x`: `number` - x axis coordinate, rounded to two decimals\n- `y`: `number` - y axis coordinate, rounded to two decimals\n- `culture`: `number` - burg culture id\n- `state`: `number` - burg state id\n- `feature`: `number` - burg feature id (id of a landmass)\n- `population`: `number` - burg population in population points\n- `type`: `string` - burg type, see [culture types](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Culture_types)\n- `group`: `string` - Burg classification and rendering group. It is also the default Label Group for the Burg label\n- `label`: `Label` - optional Burg-label overrides. Burg labels use the Burg name, coordinates, and `burg.group` by default; `label.group` can override only the label group\n- `coa`: `object` - emblem object, data model is the same as in [Armoria](https://github.com/Azgaar/Armoria) and covered in [API documentation](https://github.com/Azgaar/armoria-api#readme). The only additional fields are optional `size`: `number`, `x`: `number` and `y`: `number` that controls the emblem position on the map (if it's not default). If emblem is loaded by user, then the value is `{ custom: true }` and cannot be displayed in Armoria\n- `MFCG`: `number` - burg seed in [Medieval Fantasy City Generator](https://watabou.github.io/city-generator) (MFCG). If not provided, seed is combined from map seed and burg id\n- `link`: `string` - custom link to burg in MFCG. `MFCG` seed is not used if link is provided\n- `capital`: `number` - `1` if burg is a capital, `0` if not (each state has only 1 capital)\n- `port`: `number` - if burg is not a port, then `0`, otherwise feature id of the water body the burg trades by. For coastal burgs this is the adjacent sea/lake; for burgs on a navigable river it is the water body the river ultimately drains into (the ocean, or a closed lake for endorheic basins), so river burgs join that body's sea-route network\n- `market`: `number` - id of the market this burg belongs to (`0` if none). Derived from `cells.market[burg.cell]` during market territory expansion\n- `production`: `object[]` - per-burg production/trade records from the last production run. Each record is one of: a local-bonus record `{good, units}`, a manufacture record `{good, units, recipe, cultureModifier?}`, or a deal reference `{dealId}` pointing into `pack.deals`. Used by the Production Overview and Production Chains UI\n- `product`: `number` - net product (gross sell revenue minus ingredient costs) from the last production run\n- `treasury`: `number` - accumulated cash balance, updated by ingredient purchases, post-tax sale revenue, and demand-fill purchases. For megalopolises (multiple burgs in one cell) the pool lives on the anchor (the burg in `pack.cells.burg[cell]`); grouped members stay at `0`, and removing the anchor transfers the pool to the promoted successor\n- `citadel`: `number` - `1` if burg has a castle, `0` if not. Used for MFCG\n- `plaza`: `number` - `1` if burg has a marketplace, `0` if not. Used for MFCG\n- `shanty`: `number` - `1` if burg has a shanty town, `0` if not. Used for MFCG\n- `temple`: `number` - `1` if burg has a temple, `0` if not. Used for MFCG\n- `walls`: `number` - `1` if burg has walls, `0` if not. Used for MFCG\n- `lock`: `boolean` - `true` if burg is locked (not affected by regeneration)\n- `removed`: `boolean` - `true` if burg is removed\n\n## States\n\nStates (countries) data is stored as an array of objects with strict element order. Element 0 is reserved for `neutrals`. If state is removed, the element is not getting removed, but instead a `removed` attribute is added. Object structure:\n\n- `i`: `number` - state id, always equal to the array index\n- `name`: `string` - short (proper) form of the state name\n- `form`: `string` - state form type. Available types are `Monarchy`, `Republic`, `Theocracy`, `Union`, and `Anarchy`\n- `formName`: `string` - string form name, used to get state `fullName`\n- `fullName`: `string` - full state name. Combination of the proper name and state `formName`\n- `color`: `string` - state color in hex (e.g. `#45ff12`) or link to hatching pattern (e.g. `url(#hatch7)`)\n- `center`: `number` - cell id of state center (initial cell)\n- `pole`: `number[]` - state pole of inaccessibility (visual center) coordinates, see [the concept description](https://blog.mapbox.com/a-new-algorithm-for-finding-a-visual-center-of-a-polygon-7c77e6492fbc?gi=6bd4fcb9ecc1)\n- `culture`: `number` - state culture id (equals to initial cell culture)\n- `type`: `string` - state type, see [culture types](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Culture types)\n- `expansionism`: `number` - state growth multiplier. Used mainly during state generation to spread states not uniformly\n- `area`: `number` - state area in pixels\n- `burgs`: `number` - number of burgs within the state\n- `cells`: `number` - number of cells within the state\n- `rural`: `number` - rural (non-burg) population of state cells. In population points\n- `urban`: `number` - urban (burg) population of state cells. In population points\n- `neighbors`: `number[]` - ids of neighboring (bordering by land) states\n- `provinces`: `number[]` - ids of state provinces\n- `diplomacy`: `string[]` - diplomatic relations status for all states. 'x' for self and neutrals. Element 0 (neutrals) `diplomacy` is used differently and contains wars story as `string[][]`\n- `campaigns`: `object[]` - wars the state participated in. The was is defined as `start`: `number` (year), `end`: `number` (year), `name`: `string`\n- `alert`: `number` - state war alert, see [military forces page](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Military-Forces)\n- `military`: `Regiment[]` - list of state regiments, see [military forces page](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Military-Forces)\n- `label`: `Label` - optional state-label data. If absent, the renderer derives the text, path, and relative size from the State data and label mode\n- `coa`: `object` - emblem object, data model is the same as in [Armoria](https://github.com/Azgaar/Armoria) and covered in [API documentation](https://github.com/Azgaar/armoria-api#readme). The only additional fields are optional `size`: `number`, `x`: `number` and `y`: `number` that controls the emblem position on the map (if it's not default). If emblem is loaded by user, then the value is `{ custom: true }` and cannot be displayed in Armoria\n- `salesTax`: `number` - sales tax rate `0..1` charged on deals where this state is the seller. Generated from `form` (Monarchy 0.15, Theocracy 0.25, Union 0.07, Republic 0.05, Anarchy 0), jittered per state. Always `0` for neutrals\n- `pollTax`: `number` - flat poll tax per population point (rural + urban), credited to the treasury once per cycle. Generated from `form` (Monarchy 0.20, Theocracy 0.10, Union 0.13, Republic 0.15, Anarchy 0), jittered per state. Always `0` for neutrals\n- `treasury`: `number` - accumulated state currency balance. Reset and refilled by `States.collectTaxes()` from `deal.tax` (sales tax) plus `pollTax × (rural + urban)`. Always `0` for neutrals\n- `lock`: `boolean` - `true` if state is locked (not affected by regeneration)\n- `removed`: `boolean` - `true` if state is removed\n\n### Regiment\n\n- `i`: `number` - regiment id, equals to the array index of regiment in the `state[x].military` array. Not unique, as unique string `regimentStateId-regimentId` is used\n- `x`: `number` - regiment x coordinate\n- `y`: `number` - regiment y coordinate\n- `bx`: `number` - regiment base x coordinate\n- `by`: `number` - regiment base y coordinate\n- `angle`: `number` - regiment rotation angle degree\n- `icon`: `number` - Unicode character to serve as an icon\n- `cell`: `number` - original regiment cell id\n- `state`: `number` - regiment state id\n- `name`: `string` - regiment name\n- `n`: `number` - `1` if regiment is a separate unit (like naval units), `0` is not\n- `u`: `Record<unitName, number>` - regiment content object\n\n## Provinces\n\nProvinces data is stored as an array of objects with strict element order. Element 0 is not used. If religion is removed, the element is not getting removed, but instead a `removed` attribute is added. Object structure:\n\n- `i`: `number` - province id, always equal to the array index\n- `name`: `string` - short (proper) form of the province name\n- `formName`: `string` - string form name, used to get province `fullName`\n- `fullName`: `string` - full state name. Combination of the proper name and province `formName`\n- `color`: `string` - province color in hex (e.g. `#45ff12`) or link to hatching pattern (e.g. `url(#hatch7)`)\n- `center`: `number` - cell id of province center (initial cell)\n- `pole`: `number[]` - province pole of inaccessibility (visual center) coordinates, see [the concept description](https://blog.mapbox.com/a-new-algorithm-for-finding-a-visual-center-of-a-polygon-7c77e6492fbc?gi=6bd4fcb9ecc1)\n- `area`: `number` - province area in pixels\n- `burg`: `number` - id of province capital burg if any\n- `burgs`: `number[]` - id of burgs within the province. Optional (added when Province editor is opened)\n- `cells`: `number` - number of cells within the province\n- `rural`: `number` - rural (non-burg) population of province cells. In population points\n- `urban`: `number` - urban (burg) population of state province. In population points\n- `coa`: `object` - emblem object, data model is the same as in [Armoria](https://github.com/Azgaar/Armoria) and covered in [API documentation](https://github.com/Azgaar/armoria-api#readme). The only additional fields are optional `size`: `number`, `x`: `number` and `y`: `number` that controls the emblem position on the map (if it's not default). If emblem is loaded by user, then the value is `{ custom: true }` and cannot be displayed in Armoria\n- `label`: `Label` - optional Province-label overrides. If absent, the renderer derives the text and path from Province data\n- `lock`: `boolean` - `true` if province is locked (not affected by regeneration)\n- `removed`: `boolean` - `true` if province is removed\n\n## Religions\n\nReligions data is stored as an array of objects with strict element order. Element 0 is reserved for \"No religion\". If province is removed, the element is not getting removed, but instead a `removed` attribute is added. Object structure:\n\n- `i`: `number` - religion id, always equal to the array index\n- `name`: `string` - religion name\n- `type`: `string` - religion type. Available types are `Folk`, `Organized`, `Heresy` and `Cult`\n- `form`: `string` - religion form\n- `deity`: `string` - religion supreme deity if any\n- `color`: `string` - religion color in hex (e.g. `#45ff12`) or link to hatching pattern (e.g. `url(#hatch7)`)\n- `code`: `string` - religion name abbreviation. Used to render religions tree\n- `origins`: `number[]` - ids of ancestor religions. `[0]` if religion doesn't have an ancestor. Used to render religions tree. The first array member is main link, other - supporting out-of-tree links\n- `center`: `number` - cell id of religion center (initial cell)\n- `culture`: `number` - religion original culture\n- `expansionism`: `number` - religion growth multiplier. Used during religion generation to define competitive size\n- `expansion`: `string` - religion expansion type. Can be `culture` so that religion grow only within its culture or `global`\n- `area`: `number` - religion area in pixels\n- `cells`: `number` - number of cells within the religion\n- `rural`: `number` - rural (non-burg) population of religion cells. In population points\n- `urban`: `number` - urban (burg) population of state religion. In population points\n- `lock`: `boolean` - `true` if religion is locked (not affected by regeneration)\n- `removed`: `boolean` - `true` if religion is removed\n\n## Rivers\n\nRivers data is stored as an unordered array of objects (so element id is _not_ the array index). Object structure:\n\n- `i`: `number` - river id\n- `name`: `string` - river name\n- `type`: `string` - river type, used to get river full name only\n- `source`: `number` - id of cell at river source\n- `mouth`: `number` - id of cell at river mouth\n- `parent`: `number` - parent river id. If river doesn't have a parent, the value is self id or `0`\n- `basin`: `number` - river basin id. Basin id is a river system main stem id. If river doesn't have a parent, the value is self id\n- `cells`: `number[]` - if of river points cells. Cells may not be unique. Cell value `-1` means the river flows off-canvas\n- `points`: `number[][]` - river points coordinates. Auto-generated rivers don't have points stored and rely on `cells` for rendering\n- `discharge`: `number` - river flux in m3/s\n- `length`: `number` - river length in km\n- `width`: `number` - river mouth width in km\n- `sourceWidth`: `number` - additional width added to river source on rendering. Used to make lake outlets start with some width depending on flux. Can be also used to manually create channels\n\n## Markers\n\nMarkers data is stored as an unordered array of objects (so element id is _not_ the array index). Object structure:\n\n- `i`: `number` - marker id. `'marker' + i` is used as svg element id and marker reference in `notes` object\n- `icon`: `number` - Unicode character (usually an [emoji](https://emojipedia.org/)) to serve as an icon\n- `x`: `number` - marker x coordinate\n- `y`: `number` - marker y coordinate\n- `cell`: `number` - cell id, used to prevent multiple markers generation in the same cell\n- `type`: `string` - marker type. If set, style changes will be applied to all markers of the same type. Optional\n- `size`: `number` - marker size in pixels. Optional, default value is `30` (30px)\n- `fill`: `string` - marker pin fill color. Optional, default is `#fff` (white)\n- `stroke`: `string` - marker pin stroke color. Optional, default is `#000` (black)\n- `pin`: `string`: pin element type. Optional, default is `bubble`. Pin is not rendered if value is set to `no`\n- `pinned`: `boolean`: if any marker is pinned, then only markers with `pinned = true` will be rendered. Optional\n- `dx`: `number` - icon x shift percent. Optional, default is `50` (50%, center)\n- `dy`: `number` - icon y shift percent. Optional, default s `50` (50%, center)\n- `px`: `number` - icon font-size in pixels. Optional, default is `12` (12px)\n- `lock`: `boolean` - `true` if marker is locked (not affected by regeneration). Optional\n\n## Labels\n\nEvery label of every type is described by the same `Label` record. All fields are optional:\n\n- `text`: `string` - displayed text override. The pipe character (`|`) separates lines\n- `group`: `string` - optional Label Group override\n- `dx`: `number` - horizontal translation in map coordinates\n- `dy`: `number` - vertical translation in map coordinates\n- `pathPoints`: `number[][]` - path control points as `[x, y]` pairs the text is curved along. Three states:\n  `undefined` means the default geometry for the label type is used (an auto-fitted path for States, the\n  river or route line for those, none for Burgs and Provinces), an empty array means the label is explicitly\n  rendered as plain text, and a non-empty array is the label's own path\n- `startOffset`: `number` - text start position as a percentage along the path; defaults to `50`. Ignored without a path\n- `fontSize`: `number` - font size % relative to the label-group size, in percent. Defaults to `100`\n- `letterSpacing`: `number` - per-label letter spacing in pixels. Defaults to `0` (attribute is null)\n\nEvery label belongs to a map entity, which supplies its identity and its position. The label record itself is\nstored on that entity as `pack.states[i].label`, `pack.provinces[i].label`, `pack.burgs[i].label`,\n`pack.rivers[i].label`, and `pack.routes[i].label`.\n\nUser-added labels have no such entity, so they get one of their own, stored in `pack.addedLabels` as an\nunordered `AddedLabel[]`:\n\n- `i`: `number` - stable id\n- `x`, `y`: `number` - label position in map coordinates, before the `dx`/`dy` shift\n- `label`: `Label` - the label record, as on any other entity. Always present, since carrying a label is the\n  entity's only purpose; unlike other entities it has no name to fall back on, so its text lives in `label.text`\n\nAt runtime, Label Group styles are indexed in `style.labels.groups`, keyed by group id. Current `.map` files\nserialize the complete global `style` object at data index 48. Pre-1.140 migration reconstructs it from the\nlegacy SVG group attributes. All label types can share a group without changing their rendering primitive:\na label with `pathPoints` is rendered as a `<textPath>`, and any other label as a positioned `<text>`, which\nthe Label Editor lets the user switch for any label regardless of its type. The fallback groups are `states`,\n`provinces`, the configured default Burg group, and `added` respectively.\n\nOrdered Label Group policy is stored in `options.labels`:\n\n- `resizeOnZoom`: `boolean` - whether the parent `#labels` font size scales with map zoom\n- `showAll`: `boolean` - temporary override for per-group active state, zoom bounds, and layer dependencies\n- `groups`: `LabelGroupOptions[]` - ordered group definitions\n\nEach `LabelGroupOptions` contains:\n\n- `name`: `string` - globally unique logical group id\n- `type`: `states | burgs | provinces | added` - organizational category and default source\n- `active`: `boolean` - manual visibility switch\n- `layerDependency`: `LayerId | null` - optional layer-toggle id; unknown ids fail closed\n- `zoom.min` and `zoom.max`: `number | null` - inclusive map-scale bounds\n- `mode`: `auto | short | full` - generated State and Province name policy\n\nThe canonical protected groups are `states`, `provinces`, `added`, and every active Burg group. SVG group ids\nare implementation-safe `labels-${name}` values; the logical id is always read from `data-group`.\n\nOptional group-level `data-dx` and `data-dy` values are retained in style data. Rendering derives one CSS\ntranslation on the parent SVG group, so the offset applies uniformly to every label in that group.\n\n## Routes\n\nRoutes data is stored as an unordered array of objects (so element id is _not_ the array index). Object structure:\n\n- `i`: `number` - route id. Please note the element with id `0` is a fully valid route, not a placeholder\n- `points`: `number[]` - array of control points in format `[x, y, cellId]`\n- `feature`: `number` - feature id of the route. Auto-generated routes cannot be place on multiple features\n- `group`: `string` - route group. Default groups are: 'roads', 'trails', 'searoutes'\n- `length`: `number` - route length in km. Optional\n- `name`: `string` - route name. Optional\n- `lock`: `boolean` - `true` if route is locked (not affected by regeneration). Optional\n\n## Zones\n\nZones data is stored as an array of objects with `i` not necessary equal to the element index, but order of element defines the rendering order and is important. Object structure:\n\n- `i`: `number` - zone id. Please note the element with id `0` is a fully valid zone, not a placeholder\n- `name`: `string` - zone description\n- `type`: `string` - zone type\n- `color`: `string` - link to hatching pattern (e.g. `url(#hatch7)`) or color in hex (e.g. `#45ff12`)\n- `cells`: `number[]` - array of zone cells\n- `lock`: `boolean` - `true` if zone is locked (not affected by regeneration). Optional\n- `hidden`: `boolean` - `true` if zone is hidden (not displayed). Optional\n\n## Ice\n\nIce data is stored as an array of objects with `i` not necessary equal to the element index, but order of element defines the rendering order and is important. Object structure:\n\n- `i`: `number` - ice element id. Please note the element with id `0` is a fully valid ice element, not a placeholder\n- `type`: `glacier | iceberg` - ice type\n- `offset`: `[number, number]` - ice position offset in px, optional, only added for manually dragged ice elements\n- `points`: `number[][]` - ice element vertices positions\n\n## Relief\n\nRelief (terrain) icons are stored in `pack.relief: ReliefIcon[]`. The array order defines the rendering order: icons are sorted by their bottom edge, so the closer ones are drawn on top. Object structure:\n\n- `icon`: `string` - id of the symbol in `#defs-relief`, without the leading `#`, e.g. `relief-mount-3`\n- `x`: `number` - left edge position\n- `y`: `number` - top edge position\n- `s`: `number` - icon size, used as both width and height\n\nGeneration settings live in the global style object as `style.relief`, serialized with the rest of the style at data index 48. Before v1.142.0 they were `set`, `size` and `density` attributes on the `#terrain` group:\n\n- `set`: `string` - icons set: `simple`, `colored` or `gray`\n- `size`: `number` - base icon size multiplier\n- `density`: `number` - how densely icons are placed\n\n## Measurers\n\nMeasurers (rulers and other measuring tools drawn on top of the map) are stored in `pack.measurers: Measurer[]`. A default ruler across the largest landmass is created on map generation. Stored in .map file. Before v1.138.0 measurers were serialized as a standalone string (deprecated `rulers` data), auto-updated to `pack.measurers` on load. Object structure:\n\n- `type`: `Ruler | Opisometer | RouteOpisometer | Planimeter` - measurer type\n- `points`: `[number, number][]` - array of control points in `[x, y]` format\n\n## Goods\n\nGoods (tradable resources and products) are stored in `pack.goods: Good[]`, where `i` equals the array index. The default catalogue is built from `GOODS_DATA`. Stored in .map file. A good is _raw_ if it has a `distribution`, _manufactured_ if it has `recipes`, or _hybrid_ if it has both. Object structure:\n\n- `i`: `number` - good id, always equal to the array index\n- `name`: `string` - good name\n- `tags`: `string[]` - free-form classification tags (used for filtering in the Goods Editor)\n- `value`: `number` - base price per unit; the anchor for all market pricing\n- `unit`: `string` - unit of measure label (e.g. `kg`, `barrel`)\n- `icon`: `string` - id of the SVG symbol used for the good's map/UI icon\n- `color`: `string` - good color in hex\n- `chance`: `number` - placement chance (0–100) for raw/hybrid goods. Manufactured-only goods are `0`. Optional\n- `distribution`: `string` - JS expression evaluated per cell to decide where the raw good is placed (uses the distribution method table; see [goods_schema.md](../domain/goods_schema.md)). Optional\n- `biomeOutput`: `Record<biomeId, number>` - units produced per rural population point per production cycle, per biome. Optional\n- `recipes`: `Record<goodId, number>[]` - array of alternative recipes; each maps input good id → units consumed per 1 unit of output. Optional\n- `multipliers`: `object` - per-dimension production scalars, each an optional `Record<id, number>`: `cultureType`, `culture`, `state`, `religion`, `biome`, `zone`. Absent or `1` = no effect, `0` = fully suppressed; active factors combine multiplicatively. Only the map-independent `cultureType` is present in `GOODS_DATA`; the rest are set per map via the editor. Optional\n- `demandCoverage`: `Record<category, number>` - how much one unit of the good covers each demand category (`food`, `utilities`, `construction`, `military`, `luxury`). Optional\n\n## Markets\n\nMarkets (regional economic hubs) are stored in `pack.markets: Market[]`. Note the market `i` starts at `1` and is **not** the array index — use `Markets.get(i)` (backed by a sparse `marketById`) for lookups. A `cells.market` value of `0` means the cell is unassigned. Stored in .map file. Object structure:\n\n- `i`: `number` - market id (starts at 1, not the array index)\n- `centerBurgId`: `number` - id of the burg the market is anchored at\n- `color`: `string` - market color in hex, used for territory rendering\n- `goods`: `Record<goodId, {stock: number; price: number}>` - per-good state. A single midpoint `price` is stored; customer-facing `buyPrice` / `sellPrice` are derived on demand via `MARKET_MARGIN`\n- `name`: `string` - optional market name, derived from the center burg's name\n\n## Biomes\n\nBiome definitions are stored in `pack.biomes: Biome[]`, where `i` equals the array index. Cells refer to a biome through `pack.cells.biome`. Object structure:\n\n- `i`: `number` - biome id, always equal to the array index\n- `name`: `string` - biome name\n- `color`: `string` - biome color in hex (e.g. `#45ff12`) or link to a hatching pattern\n- `cost`: `number` - non-negative movement cost used during culture, state and religion growth\n- `habitability`: `number` - non-negative suitability value; `0` means uninhabitable\n- `icons`: `string[]` - non-weighted relief icon pool; repeated values increase an icon's selection weight\n- `iconsDensity`: `number` - defines how packed icons can be for the biome. An integer from `0` to `150`\n- `removed`: `boolean` - optional marker for a removed custom biome\n\nThe temperature and moisture lookup matrix used to assign default biome ids is generator configuration, not map state. Cell count, area and population statistics are calculated on demand and are not stored on biome objects.\n\n## Deals\n\nTrade transaction log stored in `pack.deals: Deal[]`. Append-only within a production cycle, rebuilt on regeneration. Object structure:\n\n- `i`: `number` - deal id, equal to the array index\n- `seller`: `number` - burg id or market id of the seller\n- `sellerType`: `\"burg\" | \"market\"` - what `seller` refers to\n- `buyer`: `number` - burg id or market id of the buyer\n- `buyerType`: `\"burg\" | \"market\"` - what `buyer` refers to\n- `good`: `number` - good id\n- `units`: `number` - traded amount, rounded to 2 decimals\n- `price`: `number` - per-unit price at the time of the deal, rounded to 2 decimals. For inter-market trades this is the importer's landed cost (exporter price + transport + exporter sales tax)\n- `tax`: `number` - optional. Absolute sales-tax amount in currency units, set on burg sells and inter-market trades when the seller's state has a non-zero `salesTax`. `States.collectTaxes()` sums it into the seller state's treasury\n\n## Notes\n\nNotes (legends) data is stored in unordered array of objects: `notes`. Object structure is as simple as:\n\n- `i`: `string` - note id\n- `name`: `string` - note name, visible in Legend box\n- `legend`: `string` - note text in html\n\n## Name bases\n\nName generator consumes training sets of real-world town names (with the exception of fantasy name bases) stored in `nameBases` array, that is available globally. Each array element represent a separate base. Base structure is:\n\n- `i`: `number` - base id, always equal to the array index\n- `name`: `string` - names base proper name\n- `b`: `string` - long string containing comma-separated list of names\n- `min`: `number` - recommended minimal length of generated names. Generator will adding new syllables until min length is reached\n- `max`: `number` - recommended maximal length of generated names. If max length is reached, generator will stop adding new syllables\n- `d`: `string` - letters that are allowed to be duplicated in generated names\n- `m`: `number` - if multi-word name is generated, how many of this cases should be transformed into a single word. `0` means multi-word names are not allowed, `1` - all generated multi-word names will stay as they are"].join(`

`);function Ee(){return[{type:`text`,text:Te,cache_control:{type:`ephemeral`}},{type:`text`,text:De()}]}function De(){if(typeof pack>`u`||!pack.cells)return`# Current map

No map is loaded yet.`;let e=e=>e?e.filter(e=>e.i&&!e.removed).length:0;return`# Current map\n\n${[`name: ${mapName?.value??`unnamed`}`,`seed: ${seed}`,`size: ${graphWidth} × ${graphHeight} map units`,`cells: ${pack.cells.i.length}`,`states: ${e(pack.states)}`,`burgs: ${e(pack.burgs)}`,`provinces: ${e(pack.provinces)}`,`cultures: ${e(pack.cultures)}`,`religions: ${e(pack.religions)}`,`rivers: ${pack.rivers?.length??0}`,`markers: ${pack.markers?.length??0}`,`year: ${options?.year} ${options?.era??``}`.trim()].map(e=>`- ${e}`).join(`
`)}`}var Oe=8e3,x=200,ke=50,Ae=500,je=4,Me=Object.getPrototypeOf(async()=>{}).constructor;async function Ne(e){let t=[],n=Le(t),r=performance.now();try{return{ok:!0,value:w(await new Me(`describe`,e)(Fe)),logs:t,ms:Pe(r)}}catch(e){let n=e instanceof Error?e:Error(String(e)),i=(n.stack??``).split(`
`).slice(0,je).join(`
`);return{ok:!1,value:``,logs:t,error:{message:n.message,stack:i},ms:Pe(r)}}finally{n()}}var Pe=e=>Math.round(performance.now()-e);function Fe(e){if(typeof e==`string`)try{return{path:e,...S(Function(`return (${e})`)())}}catch{}return S(e)}function S(e){if(e===null)return{type:`null`};if(e===void 0)return{type:`undefined`};if(ArrayBuffer.isView(e)){let t=e;return{type:t.constructor.name,length:t.length,sample:Array.from(t.slice(0,5))}}if(Array.isArray(e))return{type:`Array`,length:e.length,sample:e.slice(0,3).map(C)};if(typeof e==`function`)return{type:`function`,name:e.name||`anonymous`,arity:e.length};if(typeof e==`object`){let t=e,n={};for(let e of Object.keys(t))n[e]=C(t[e]);let r={type:t.constructor?.name??`object`,keys:n},i=Ie(t);return i.length&&(r.methods=i),r}return{type:typeof e,value:e}}function Ie(e){let t=Object.getPrototypeOf(e);return!t||t===Object.prototype?[]:Object.getOwnPropertyNames(t).filter(e=>e!==`constructor`)}function C(e){if(e===null)return`null`;if(ArrayBuffer.isView(e)){let t=e;return`${t.constructor.name}(${t.length})`}if(Array.isArray(e))return`Array(${e.length})`;if(typeof e==`string`)return`string(${e.length})`;if(typeof e==`object`){let t=Object.keys(e);return`object{${t.slice(0,5).join(`, `)}${t.length>5?`, …`:``}}`}return typeof e}function w(e,t=Oe){if(e===void 0)return`undefined`;let n=new WeakSet,r=(e,t)=>{if(typeof t==`function`)return`[Function ${t.name||`anonymous`}]`;if(typeof t==`bigint`)return String(t);if(ArrayBuffer.isView(t)){let e=t,n=Array.from(e.slice(0,10)).join(`, `);return`[${e.constructor.name}(${e.length}) ${n}${e.length>10?`, …`:``}]`}if(t instanceof Set)return{Set:[...t].slice(0,x)};if(t instanceof Map)return{Map:[...t.entries()].slice(0,x)};if(t&&typeof t==`object`){if(typeof t.nodeType==`number`)return`[Node ${t.nodeName??`?`}]`;if(n.has(t))return`[Circular]`;if(n.add(t),Array.isArray(t)&&t.length>x)return[...t.slice(0,x),`… ${t.length-x} more items`]}return t},i;try{i=JSON.stringify(e,r,1)??String(e)}catch(e){i=`[unserializable: ${e instanceof Error?e.message:String(e)}]`}return i.length<=t?i:`${i.slice(0,t)}\n… truncated, ${i.length-t} more characters. Return less data.`}function Le(e){let t=[`log`,`info`,`warn`,`error`],n=t.map(e=>console[e]);return t.forEach((t,r)=>{console[t]=(...i)=>{if(e.length<ke){let n=i.map(e=>typeof e==`object`?w(e,Ae):String(e)).join(` `);e.push(t===`log`?n:`[${t}] ${n}`)}n[r].apply(console,i)}}),()=>t.forEach((e,t)=>{console[e]=n[t]})}var T=null;function Re(){try{T={pack:structuredClone(pack),grid:structuredClone(grid),options:structuredClone(options),style:structuredClone(style),notes:structuredClone(notes)}}catch(e){T=null,WARN&&console.warn(`AI Chat: failed to snapshot the map, run is not recoverable`,e)}}function ze(){return T?(globalThis.pack=T.pack,globalThis.grid=T.grid,globalThis.options=T.options,globalThis.style=T.style,globalThis.notes=T.notes,typeof Layers<`u`&&Layers.drawAll(),!0):(console.warn(`AI Chat: no snapshot to restore`),!1)}globalThis.restoreMapSnapshot=ze;var E=30,Be=6,Ve=`[earlier script output trimmed to save tokens]`,He={name:`run`,description:"Execute JavaScript against the currently open map and get its result back.\n\nThe code runs as the body of an async function in the page's global scope, so every FMG global is in\nscope and top-level `await` works. `return` the value you want to see — only the returned value and\nconsole output come back, so aggregate and slice before returning. A `describe(pathOrValue)` helper\nis in scope for inspecting an unfamiliar global at runtime.",input_schema:{type:`object`,properties:{code:{type:`string`,description:"JavaScript to execute. Use `return` to produce the result."}},required:[`code`]}};function Ue(e){let t=null;async function n(n,r,i){let{messages:a}=n;a.push({role:`user`,content:[{type:`text`,text:r}]}),t=new AbortController;try{for(let r=1;r<=E;r++){let{key:o,model:s}=e();i.onStatus(r===1?`Thinking`:`Thinking (step ${r})`),We(a);let c=await fe({key:o,model:s,system:Ee(),messages:a,tools:[He],signal:t.signal});n.usage.input+=c.usage.input,n.usage.output+=c.usage.output,n.usage.cached+=c.usage.cached,i.onUsage(),a.push({role:`assistant`,content:c.content}),Ge(c,i);let l=c.content.filter(e=>e.type===`tool_use`);if(!l.length)return;let u=[];for(let e of l){let t=e.input.code??``;i.onScript(t),i.onStatus(`Running script`),Re();let n=await Ne(t);i.onScriptResult(n),u.push({type:`tool_result`,tool_use_id:e.id,content:Ke(n),is_error:!n.ok})}a.push({role:`user`,content:u})}i.onText(`(stopped after ${E} script steps — ask again to continue)`)}finally{t=null,i.onStatus(``)}}return{ask:n,cancel:()=>t?.abort()}}function We(e){let t=e.flatMap(e=>e.content.filter(e=>e.type===`tool_result`));t.slice(0,Math.max(0,t.length-Be)).forEach(e=>{e.content=Ve})}function Ge(e,t){let n=e.content.filter(e=>e.type===`text`).map(e=>e.text.trim()).filter(Boolean).join(`

`);n&&t.onText(n)}function Ke(e){let t=[];return e.logs.length&&t.push(`console:\n${e.logs.join(`
`)}`),e.ok?t.push(`result (${e.ms} ms):\n${e.value}`):t.push(`threw after ${e.ms} ms:\n${e.error?.message}\n${e.error?.stack}`),t.join(`

`)}var D=/^ {0,3}```(\S*)\s*$/,qe=/^ {0,3}(#{1,6})\s+(.*)$/,Je=/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/,O=/^ {0,3}>\s?(.*)$/,k=/^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/,Ye=/^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/,A=`\0`,Xe=RegExp(`${A}(\\d+)${A}`,`g`);function j(e){let t=e.replace(/\r\n?/g,`
`).split(`
`),n=[],r=0;for(;r<t.length;){let e=t[r];if(!e.trim()){r++;continue}if(D.test(e)){let e=[];for(r++;r<t.length&&!D.test(t[r]);)e.push(t[r++]);r++,n.push(`<pre><code>${F(e.join(`
`))}</code></pre>`);continue}let i=e.match(qe);if(i){let e=Math.min(i[1].length+2,6);n.push(`<h${e}>${P(i[2])}</h${e}>`),r++;continue}if(Je.test(e)){n.push(`<hr />`),r++;continue}if(O.test(e)){let e=[];for(;r<t.length&&O.test(t[r]);)e.push(t[r++].match(O)?.[1]??``);n.push(`<blockquote>${j(e.join(`
`))}</blockquote>`);continue}if(k.test(e)){let e=[];for(;r<t.length;){let n=t[r].match(k);if(!n)break;e.push({indent:n[1].length,ordered:/\d/.test(n[2]),text:n[3]}),r++}n.push(M(e,0).html);continue}if(e.includes(`|`)&&r+1<t.length&&Ye.test(t[r+1])){r=Qe(t,r,n);continue}let a=[];for(;r<t.length&&t[r].trim()&&!Ze(t[r]);)a.push(t[r++]);n.push(`<p>${a.map(P).join(`<br />`)}</p>`)}return n.join(``)}function Ze(e){return D.test(e)||qe.test(e)||Je.test(e)||O.test(e)||k.test(e)}function M(e,t){let{indent:n,ordered:r}=e[t],i=[],a=t;for(;a<e.length&&e[a].indent>=n;){if(e[a].indent>n&&i.length){let t=M(e,a);i[i.length-1]+=t.html,a=t.next;continue}i.push(P(e[a].text)),a++}let o=r?`ol`:`ul`;return{html:`<${o}>${i.map(e=>`<li>${e}</li>`).join(``)}</${o}>`,next:a}}function Qe(e,t,n){let r=N(e[t]),i=N(e[t+1]).map(e=>e.startsWith(`:`)&&e.endsWith(`:`)?` style="text-align: center"`:e.endsWith(`:`)?` style="text-align: right"`:``),a=(e,t,n)=>`<${n}${i[t]??``}>${P(e)}</${n}>`,o=[],s=t+2;for(;s<e.length&&e[s].includes(`|`);){let t=N(e[s]);o.push(`<tr>${t.map((e,t)=>a(e,t,`td`)).join(``)}</tr>`),s++}let c=r.map((e,t)=>a(e,t,`th`)).join(``);return n.push(`<table><thead><tr>${c}</tr></thead><tbody>${o.join(``)}</tbody></table>`),s}var N=e=>e.trim().replace(/^\|/,``).replace(/\|$/,``).split(`|`).map(e=>e.trim());function P(e){let t=[];return F(e.replace(/`([^`]+)`/g,(e,n)=>(t.push(`<code>${F(n)}</code>`),`${A}${t.length-1}${A}`))).replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g,(e,t,n)=>/^https?:\/\//i.test(n)?`<a href="${n}" target="_blank" rel="noopener noreferrer">${t}</a>`:e).replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,`<strong>$2</strong>`).replace(/\*(?=\S)([^*\n]*\S)\*/g,`<em>$1</em>`).replace(/~~(?=\S)([\s\S]*?\S)~~/g,`<del>$1</del>`).replace(Xe,(e,n)=>t[Number(n)])}var F=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),I=`aiChat`,L=`fmg-ai-chat-model`,$e=120,et=[`Which states have no ports?`,`List the five largest burgs and their states`,`How is the land split between biomes?`],R=Ue(()=>({key:t(`aiChatKey`).value,model:t(`aiChatModel`).value})),z,B=null,V=!1;function tt(){if(customization){n(`Please exit the customization mode first`,!1,`error`);return}z=re(),nt(),it(),K(),Y(),q(),$(`#${I}`).dialog({title:`AI Chat`,width:480,height:560,minWidth:320,minHeight:320,position:{my:`right top`,at:`right-10 top+10`,of:`svg`,collision:`fit`},close:gt}),t(`aiChatInput`).focus()}function nt(){a(I),t(`dialogs`).insertAdjacentHTML(`beforeend`,rt()),t(`aiChatConversation`).addEventListener(`change`,e=>{z=te(e.target.value),Y(),q()}),t(`aiChatNew`).addEventListener(`click`,st),t(`aiChatRemove`).addEventListener(`click`,ct),t(`aiChatKeyHelp`).addEventListener(`click`,()=>e(y(t(`aiChatModel`).value).keyLink)),t(`aiChatSend`).addEventListener(`click`,()=>{V?R.cancel():G()}),t(`aiChatLog`).addEventListener(`click`,t=>{let n=t.target?.closest?.(`a[href]`);n&&(t.preventDefault(),e(n.getAttribute(`href`)??``))});let n=t(`aiChatInput`);n.addEventListener(`input`,()=>{n.style.height=`auto`,n.style.height=`${Math.min(n.scrollHeight,$e)}px`,W()}),n.addEventListener(`keydown`,e=>{e instanceof KeyboardEvent&&e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),G())})}function rt(){return`<div id="${I}" class="dialog stable" style="user-select: text">
    <style>
      #aiChat { display: flex; flex-direction: column; gap: 0.3em; height: 100%; }
      /* .dialog > div sizes children to their content; the chat wants the full width */
      #aiChat > div, #aiChat > textarea { width: auto; }
      #aiChatTop { display: flex; align-items: center; gap: 0.3em; }
      #aiChatTop > select { flex: 1; min-width: 0; }
      #aiChatLog { flex: 1 1 auto; overflow-y: auto; display: flex; flex-direction: column; gap: 0.45em; }
      #aiChatEmpty { margin: auto; display: flex; flex-direction: column; align-items: center; gap: 0.5em; text-align: center; }
      #aiChatEmpty > div { opacity: 0.7; max-width: 22em; }
      #aiChatEmpty button { padding: 0.25em 0.7em; border-radius: 1em; cursor: pointer; }
      #aiChatInput { resize: none; overflow-y: auto; }
      #aiChatBottom { display: flex; align-items: center; gap: 0.3em; flex-wrap: wrap; }
      #aiChatLocal { align-items: center; gap: 0.3em; }
      #aiChatLocal > input { flex: 1; min-width: 8em; }
      #aiChatBottom > select { flex: 1; min-width: 6em; }
      #aiChatBottom > input { flex: 1; min-width: 5em; }
      #aiChat .aiChatUser { align-self: flex-end; max-width: 85%; padding: 0.3em 0.6em; border-radius: 0.8em 0.8em 0.2em 0.8em; background: rgba(128, 128, 128, 0.18); }
      #aiChat .aiChatAssistant { align-self: flex-start; max-width: 95%; }
      #aiChat .aiChatSystem { align-self: center; text-align: center; font-style: italic; opacity: 0.65; }
      #aiChat .aiChatError { align-self: center; text-align: center; color: #b03030; }
      #aiChat .aiChatMessage { white-space: pre-wrap; overflow-wrap: anywhere; }
      #aiChat .aiChatStep { align-self: flex-start; max-width: 100%; font-size: 0.9em; opacity: 0.8; }
      #aiChat .aiChatStep summary { cursor: pointer; user-select: none; }
      #aiChat .aiChatStep pre { margin: 0.2em 0; padding: 0.3em 0.4em; max-height: 14em; overflow: auto; border-radius: 0.3em; background: rgba(128, 128, 128, 0.12); }
      #aiChatThinking { align-self: flex-start; display: flex; align-items: center; gap: 0.4em; font-style: italic; opacity: 0.7; }
      #aiChatThinking i { width: 0.35em; height: 0.35em; border-radius: 50%; background: currentColor; animation: aiChatBlink 1.2s infinite ease-in-out; }
      #aiChatThinking i:nth-child(3) { animation-delay: 0.2s; }
      #aiChatThinking i:nth-child(4) { animation-delay: 0.4s; }
      @keyframes aiChatBlink { 0%, 70%, 100% { opacity: 0.25; } 35% { opacity: 1; } }
      #aiChat .aiChatAssistant { white-space: normal; }
      #aiChat .aiChatAssistant > :first-child { margin-top: 0; }
      #aiChat .aiChatAssistant > :last-child { margin-bottom: 0; }
      #aiChat .aiChatAssistant p { margin: 0 0 0.4em; }
      #aiChat .aiChatAssistant h3, #aiChat .aiChatAssistant h4, #aiChat .aiChatAssistant h5, #aiChat .aiChatAssistant h6 { margin: 0.5em 0 0.2em; font-size: 1em; font-weight: bold; }
      #aiChat .aiChatAssistant ul, #aiChat .aiChatAssistant ol { margin: 0.2em 0 0.4em; padding-left: 1.3em; }
      #aiChat .aiChatAssistant li { margin: 0.1em 0; }
      #aiChat .aiChatAssistant code { padding: 0 0.25em; border-radius: 0.25em; background: rgba(128, 128, 128, 0.16); font-family: monospace; }
      #aiChat .aiChatAssistant pre { margin: 0.3em 0; padding: 0.35em 0.45em; overflow-x: auto; border-radius: 0.3em; background: rgba(128, 128, 128, 0.12); }
      #aiChat .aiChatAssistant pre code { padding: 0; background: none; }
      #aiChat .aiChatAssistant table { display: block; width: max-content; max-width: 100%; margin: 0.3em 0; overflow-x: auto; border-collapse: collapse; }
      #aiChat .aiChatAssistant th, #aiChat .aiChatAssistant td { padding: 0.15em 0.45em; border: 1px solid rgba(128, 128, 128, 0.35); }
      #aiChat .aiChatAssistant th { background: rgba(128, 128, 128, 0.12); text-align: left; }
      #aiChat .aiChatAssistant blockquote { margin: 0.3em 0; padding-left: 0.6em; border-left: 2px solid rgba(128, 128, 128, 0.4); opacity: 0.85; }
      #aiChat .aiChatAssistant hr { margin: 0.4em 0; border: none; border-top: 1px solid rgba(128, 128, 128, 0.3); }
      #aiChat .aiChatAssistant a { text-decoration: underline; cursor: pointer; }
    </style>

    <div id="aiChatTop">
      <select id="aiChatConversation" data-tip="Switch between conversations. Each one is sent in full with every question, so a fresh one costs less"></select>
      <button id="aiChatNew" class="icon-plus" data-tip="Start a new conversation"></button>
      <button id="aiChatRemove" class="icon-trash" data-tip="Delete the current conversation"></button>
    </div>

    <div id="aiChatLog"></div>

    <div id="aiChatUsage" class="totalLine"></div>

    <textarea id="aiChatInput" rows="2" placeholder="Ask about the map…" data-tip="Type a question. Enter to send, Shift + Enter for a new line"></textarea>

    <div id="aiChatLocal" style="display: none">
      <input
        id="aiChatLocalUrl"
        type="text"
        placeholder="${le}"
        data-tip="Base URL of an OpenAI-compatible local server (Ollama, llama.cpp, LM Studio). For Ollama outside localhost, allow the app origin via OLLAMA_ORIGINS"
      />
      <input
        id="aiChatLocalModel"
        type="text"
        placeholder="model name, e.g. llama3.2"
        data-tip="Name of the model as your local server knows it (e.g. an installed Ollama model)"
      />
    </div>

    <div id="aiChatBottom">
      <button id="aiChatSend" class="icon-right-open" data-tip="Send the message"></button>
      <select id="aiChatModel" data-tip="Model to ask. Bigger models reason better and cost more"></select>
      <input
        id="aiChatKey"
        type="password"
        placeholder="API key"
        class="icon-key"
        data-tip="Anthropic API key. It's stored on your machine only (browser storage) and sent directly to the provider"
      />
      <button id="aiChatKeyHelp" class="icon-help-circled" data-tip="Click to see where to get the key"></button>
    </div>
  </div>`}function it(){v.forEach(e=>{de(e.id,Ce(e.id))}),U();let e=t(`aiChatModel`),n=localStorage.getItem(L)??``;e.value=H(n)?n:oe,e.addEventListener(`change`,()=>{ot(),at()}),ot(),W(),at()}function H(e){try{return y(e),!0}catch{return!1}}function U(){let e=t(`aiChatModel`),n=e.value;e.replaceChildren(),v.forEach(t=>{let n=document.createElement(`optgroup`);n.label=t.label,we(t.models,Ce(t.id)).forEach(e=>{n.append(new Option(e===`local`?`custom model…`:e,e))}),e.append(n)}),n&&H(n)&&(e.value=n)}async function at(){let e=y(t(`aiChatModel`).value),n=t(`aiChatKey`).value;if(e.id===`local`||n)try{await ve(e.id,n),document.getElementById(I)&&U()}catch{}}function ot(){let e=t(`aiChatModel`).value,n=y(e).id===`local`,r=t(`aiChatKey`);r.value=localStorage.getItem(b(e))??``,r.placeholder=n?`API key (optional)`:`API key`,r.dataset.tip=n?`Optional API key — most local servers need none. Sent as a Bearer token when set`:`${y(e).label} API key. It's stored on your machine only (browser storage) and sent directly to the provider`,t(`aiChatLocal`).style.display=e===`local`?`flex`:`none`,e===`local`&&(t(`aiChatLocalUrl`).value=localStorage.getItem(`fmg-ai-local-url`)??``,t(`aiChatLocalModel`).value=localStorage.getItem(`fmg-ai-local-model`)??``),W()}function W(){let e=document.getElementById(`aiChatSend`);e&&(e.className=V?`icon-cancel`:`icon-right-open`,e.dataset.tip=V?`Stop the current request`:`Send the message`,e.disabled=!V&&!t(`aiChatInput`).value.trim())}async function G(e){if(V)return;let r=t(`aiChatInput`),i=(e??r.value).trim();if(!i)return;let a=t(`aiChatModel`).value,o=y(a).id===`local`,s=t(`aiChatKey`).value;if(!s&&!o){t(`aiChatKey`).focus(),n(`Please enter an API key`,!0,`error`,4e3);return}if(a===`local`){let e=t(`aiChatLocalModel`).value.trim();if(!e){t(`aiChatLocalModel`).focus(),n(`Please enter the local model name`,!0,`error`,4e3);return}localStorage.setItem(se,t(`aiChatLocalUrl`).value.trim()),localStorage.setItem(ce,e)}localStorage.setItem(b(a),s),localStorage.setItem(L,a),r.value=``,r.style.height=`auto`,X({kind:`message`,role:`user`,text:i}),K(),V=!0,W(),mt(`Thinking`);try{await R.ask(z,i,{onText:e=>X({kind:`message`,role:`assistant`,text:e}),onScript:e=>X({kind:`script`,code:e}),onScriptResult:e=>ut(e),onStatus:e=>e?mt(e):ht(),onUsage:q})}catch(e){let t=e instanceof DOMException&&e.name===`AbortError`,n=e instanceof Error&&e.message||String(e);X({kind:`message`,role:t?`system`:`error`,text:t?`Stopped.`:n})}finally{V=!1,B=null,ht(),h(z),document.getElementById(I)&&(W(),t(`aiChatInput`).focus())}}function st(){if(g(z)){n(`This conversation is already empty`,!0,`warn`,3e3);return}z=m(),K(),Y(),q()}function ct(){let e=()=>{ne(z.id),z=re(),K(),Y(),q()};if(g(z)){e();return}i({title:`Delete conversation`,message:`Delete "${z.title}"?<br />The conversation cannot be restored`,confirm:`Delete`,onConfirm:e})}function K(){let e=document.getElementById(`aiChatConversation`);e&&(e.options.length=0,ee().forEach(t=>{let n=t.mapId===mapId?t.title:`${t.title} (other map)`;e.options.add(new Option(n,t.id))}),e.value=z.id)}function q(){let e=document.getElementById(`aiChatUsage`);if(!e)return;let{input:t,output:n,cached:r}=z.usage;if(!t&&!n){e.textContent=``;return}let i=r?`, ${J(r)} cached`:``;e.textContent=`Tokens: ${J(t)} sent${i} · ${J(n)} received`,e.dataset.tip=`Tokens spent in this conversation. Cached tokens cost a tenth of the rest`}var J=e=>e<1e3?String(e):`${(e/1e3).toFixed(1)}k`;function Y(){let e=document.getElementById(`aiChatLog`);e&&(e.innerHTML=``,z.entries.forEach(t=>{e.append(lt(t))}),g(z)&&e.append(pt()),Q())}function X(e){z.entries.push(e),h(z);let t=document.getElementById(`aiChatLog`);if(!t)return;document.getElementById(`aiChatEmpty`)?.remove();let n=lt(e);t.append(n),e.kind===`script`&&(B=n);let r=document.getElementById(`aiChatThinking`);r&&t.append(r),Q()}function lt(e){if(e.kind===`message`){let t={user:`aiChatUser`,assistant:`aiChatAssistant`,system:`aiChatSystem`,error:`aiChatError`},n=document.createElement(`div`);return n.className=`aiChatMessage ${t[e.role]}`,e.role===`assistant`?n.innerHTML=j(e.text):n.textContent=e.text,n}let t=document.createElement(`details`);return t.className=`aiChatStep`,t.append(document.createElement(`summary`),Z(e.code)),dt(t,e.result),e.result&&t.append(Z(ft(e.result))),t}function ut(e){let t=z.entries.at(-1);t?.kind===`script`&&(t.result=e),h(z),B&&(dt(B,e),B.append(Z(ft(e))),B=null,Q())}function dt(e,t){let n=e.querySelector(`summary`);n&&(n.textContent=t?t.ok?`Ran a script · ${t.ms} ms`:`Script failed · ${t.ms} ms`:`Running a script…`)}function ft(e){let t=e.logs.length?`${e.logs.join(`
`)}\n\n`:``;return e.ok?t+e.value:`${t}${e.error?.message}\n${e.error?.stack}`}function Z(e){let t=document.createElement(`pre`);return t.textContent=e,t}function pt(){let e=document.createElement(`div`);e.id=`aiChatEmpty`;let t=document.createElement(`div`);return t.textContent=`I can read the current map and answer questions about it. I cannot change it yet.`,e.append(t),et.forEach(t=>{let n=document.createElement(`button`);n.textContent=t,n.addEventListener(`click`,()=>void G(t)),e.append(n)}),e}function mt(e){let t=document.getElementById(`aiChatLog`);if(!t)return;let n=document.getElementById(`aiChatThinking`);n||(n=document.createElement(`div`),n.id=`aiChatThinking`,n.append(document.createElement(`span`),...[0,1,2].map(()=>document.createElement(`i`))),t.append(n));let r=n.querySelector(`span`);r&&(r.textContent=e),t.append(n),Q()}function ht(){document.getElementById(`aiChatThinking`)?.remove()}function Q(){let e=document.getElementById(`aiChatLog`);e&&e.scrollHeight-e.scrollTop-e.clientHeight<60&&(e.scrollTop=e.scrollHeight)}function gt(){R.cancel(),V=!1,B=null,a(I)}var _t={open:tt};export{_t as AiChat};