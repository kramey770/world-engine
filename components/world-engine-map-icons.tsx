import React from "react";

export interface WEIconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const Ico = ({
  size = 24,
  className = "",
  strokeWidth = 1.5,
  children,
}: WEIconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// Small refresh arc overlay for Regenerate icons (upper-right quadrant)
const RegenArc = () => (
  <>
    <path d="M16 3.5A9 9 0 0 1 21.5 11" strokeWidth={1.2} strokeOpacity={0.85} />
    <path d="M21.5 11L22 7.5l-3 1" strokeWidth={1.2} strokeOpacity={0.85} />
  </>
);

// Small plus overlay for Add icons (lower-right corner)
const AddPlus = () => (
  <>
    <path d="M18.5 19v3M17 20.5h3" strokeWidth={1.3} />
  </>
);

// ════════════════════════════════════════════════════
// MAIN CATEGORY ICONS
// ════════════════════════════════════════════════════

/** Edit — Illuminated quill pen with feather vanes */
export const WEEdit = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M18 3c2.5 1 4 4 2 7.5L11.5 18l-6 2 1.5-6.5L15.5 6C16.5 4.5 17.5 3.5 18 3z"
      fill="currentColor"
      fillOpacity={0.12}
      stroke="none"
    />
    <path d="M18 3c2.5 1 4 4 2 7.5L11.5 18l-6 2 1.5-6.5L15.5 6C16.5 4.5 17.5 3.5 18 3z" />
    <path d="M16 5.5L10.5 13.5M18 4L12.5 12" strokeOpacity={0.55} />
    <path d="M5.5 20l-2.5 2.5" />
  </Ico>
);

/** Regenerate — Celestial orbital cycle with inner compass star */
export const WERegenerate = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 4a8 8 0 0 1 7.5 5.5" />
    <path d="M19.5 9.5L21 6.5l-3.5.5" />
    <path d="M12 20A8 8 0 0 1 4.5 14.5" />
    <path d="M4.5 14.5L3 17.5l3.5-.5" />
    <path d="M19.8 12a8 8 0 0 1-1 4" />
    <path d="M4.2 12a8 8 0 0 1 1-4" />
    <circle cx={12} cy={12} r={2.5} />
    <path d="M12 10.5v3M10.5 12h3" strokeOpacity={0.4} />
  </Ico>
);

/** Style — Cartographic illumination wheel, eight-point compass rose */
export const WEStyle = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
    <circle cx={12} cy={12} r={3.5} />
    <circle cx={12} cy={12} r={1.2} fill="currentColor" stroke="none" />
    <path d="M12 2v4.5M22 12h-4.5M12 22v-4.5M2 12h4.5" strokeOpacity={0.35} />
    <circle cx={12} cy={2} r={0.8} fill="currentColor" stroke="none" />
    <circle cx={22} cy={12} r={0.8} fill="currentColor" stroke="none" />
    <circle cx={12} cy={22} r={0.8} fill="currentColor" stroke="none" />
    <circle cx={2} cy={12} r={0.8} fill="currentColor" stroke="none" />
  </Ico>
);

/** Settings — Astrolabe double ring with radial markers */
export const WESettings = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={9} />
    <circle cx={12} cy={12} r={5} />
    <circle cx={12} cy={12} r={1.5} fill="currentColor" stroke="none" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
    <path d="M5.64 5.64l1.77 1.77M16.59 16.59l1.77 1.77M18.36 5.64l-1.77 1.77M7.41 16.59l-1.77 1.77" />
    <path d="M12 7v1.5M12 15.5V17M7 12h1.5M15.5 12H17" strokeOpacity={0.45} />
  </Ico>
);

/** Add — Ornate heraldic cross with flared terminals and gem center */
export const WEAdd = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3.5v17M3.5 12h17" />
    <path d="M12 3.5l-2.5 2.5h5L12 3.5zM12 20.5l-2.5-2.5h5L12 20.5z" />
    <path d="M3.5 12L6 9.5v5L3.5 12zM20.5 12L18 9.5v5L20.5 12z" />
    <circle cx={12} cy={12} r={2.5} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

/** Show — Illuminated eye with decorative iris detail and wing rays */
export const WEShow = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 12c0 0 3.5-7 9-7s9 7 9 7-3.5 7-9 7-9-7-9-7z" />
    <circle cx={12} cy={12} r={3} />
    <circle cx={12} cy={12} r={1.2} fill="currentColor" stroke="none" />
    <path d="M12 5l-1.5-2M12 5l1.5-2" />
    <path d="M4 9.5L2.5 8.5M4 14.5L2.5 15.5" />
    <path d="M20 9.5L21.5 8.5M20 14.5L21.5 15.5" />
  </Ico>
);

/** Create — Genesis wand with starburst creation spark */
export const WECreate = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4.5 20.5L10.5 14.5" />
    <path d="M10.5 14.5L12.5 9.5L16.5 8.5L21 3" />
    <path d="M16 8.5L13 4M16 8.5L21 11.5M16 8.5L12 13" strokeOpacity={0.65} />
    <path d="M11 5.5l2.5 0M11 5.5v-2" strokeOpacity={0.45} />
    <path d="M19.5 12.5l2 0.5M19.5 12.5l0.5-2" strokeOpacity={0.45} />
    <circle cx={15.5} cy={9} r={1.3} fill="currentColor" stroke="none" />
    <path d="M3.5 21.5l1-1" />
  </Ico>
);

/** Heightmap — Nested topographic contour lines, mountain plan-view */
export const WEHeightmap = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 18.5C5.5 16.5 8.5 15 12 15s6.5 1.5 9 3.5" />
    <path d="M5 15.5C7 13 9.5 11.5 12 11.5s5 1.5 7 4" />
    <path d="M7 12.5C8.5 10 10.5 8.5 12 8.5s3.5 1.5 5 4" />
    <path d="M9 9.5c1-2.5 2.5-4 3-4s2 1.5 3 4" />
    <path d="M11.5 5.5l0.5-3 0.5 3" />
  </Ico>
);

// ════════════════════════════════════════════════════
// EDIT SUB-ICONS
// ════════════════════════════════════════════════════

/** Biomes — Organic leaf with branching zone veins */
export const WEEditBiomes = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M12 21C12 21 4 17 4 9.5A8 8 0 0 1 12 2a8 8 0 0 1 8 7.5c0 7.5-8 11.5-8 11.5z"
      fill="currentColor"
      fillOpacity={0.1}
      stroke="none"
    />
    <path d="M12 21C12 21 4 17 4 9.5A8 8 0 0 1 12 2a8 8 0 0 1 8 7.5c0 7.5-8 11.5-8 11.5z" />
    <path d="M12 21V11" />
    <path d="M12 15C10 14 8 14 6.5 14.5" />
    <path d="M12 11C10 10 8 10 6 11" />
    <path d="M12 15C14 14 16 14 17.5 14.5" />
    <path d="M12 11C14 10 16 10 18 11" />
  </Ico>
);

/** Burgs — Fortified castle tower with crenellations */
export const WEEditBurgs = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M8 21V12h8v9" />
    <path d="M8 12V9h2V6.5h1.5V9h1V6.5h1.5V9h2v3" />
    <rect x={10.5} y={14} width={3} height={7} />
    <path d="M6 21h12" />
    <path d="M9 10h1.5M13.5 10h1.5" strokeOpacity={0.45} />
  </Ico>
);

/** Coastlines — Shoreline curve with ocean texture dots */
export const WEEditCoastlines = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3.5 16.5C6 14.5 9 13 12 13s6 1.5 8.5 4" strokeWidth={2} />
    <path d="M4.5 12C6 11 8 11 10 11" strokeOpacity={0.5} />
    <path d="M14 11C16 11 18 11.5 20 11" strokeOpacity={0.5} />
    <path d="M5 8C7 8 8.5 9 10 8.5" strokeOpacity={0.3} />
    <path d="M15 8C17 8 18.5 9 20 8.5" strokeOpacity={0.3} />
    <circle cx={4.5} cy={7} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={8} cy={6} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={16} cy={6.5} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={20} cy={7} r={0.6} fill="currentColor" stroke="none" />
  </Ico>
);

/** Cultures — Three overlapping heritage region circles */
export const WEEditCultures = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={9.5} cy={9.5} r={5.5} />
    <circle cx={14.5} cy={9.5} r={5.5} />
    <circle cx={12} cy={15} r={5.5} />
  </Ico>
);

/** Diplomacy — Two laurel sprigs meeting at center, bound by ribbon */
export const WEEditDiplomacy = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4.5 17V8L7.5 5" />
    <path d="M19.5 17V8L16.5 5" />
    <path d="M4.5 8C6.5 9 7.5 11 6.5 14M4.5 11C6.5 12 7.5 14 6.5 17" />
    <path d="M19.5 8C17.5 9 16.5 11 17.5 14M19.5 11C17.5 12 16.5 14 17.5 17" />
    <path d="M7 17.5l5 2.5 5-2.5" />
    <circle cx={12} cy={18} r={1.5} />
  </Ico>
);

/** Emblems — Pointed heraldic shield with decorative charge */
export const WEEditEmblems = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M12 3l9 4v7.5c0 4.5-4 7.5-9 9-5-1.5-9-4.5-9-9V7l9-4z"
      fill="currentColor"
      fillOpacity={0.1}
      stroke="none"
    />
    <path d="M12 3l9 4v7.5c0 4.5-4 7.5-9 9-5-1.5-9-4.5-9-9V7l9-4z" />
    <path d="M9 10h6M12 8v8" />
    <circle cx={12} cy={14} r={2.5} />
  </Ico>
);

/** Goods — Merchant chest with banded lid */
export const WEEditGoods = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z" />
    <path d="M4 11l2-6h12l2 6" />
    <path d="M3.5 14h17" />
    <path d="M10 11v9M14 11v9" strokeOpacity={0.4} />
    <path d="M12 7.5V5.5M10.5 5.5h3" />
  </Ico>
);

/** Heightmap (Edit) — Mountain silhouette with elevation contour lines */
export const WEEditHeightmap = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M2 19.5l5.5-11L11 14l2-4 5.5 9.5H2z"
      fill="currentColor"
      fillOpacity={0.1}
      stroke="none"
    />
    <path d="M2 19.5l5.5-11L11 14l2-4 5.5 9.5H2z" />
    <path d="M3 17.5h4.5M5 15h3.5M7 12.5h2.5" strokeOpacity={0.55} />
    <path d="M15.5 19.5h5M17 16.5h4" strokeOpacity={0.55} />
  </Ico>
);

/** Markers — Ornate teardrop map pin with inner detail */
export const WEEditMarkers = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M12 2a6.5 6.5 0 0 1 6.5 6.5c0 5.5-6.5 13.5-6.5 13.5S5.5 14 5.5 8.5A6.5 6.5 0 0 1 12 2z"
      fill="currentColor"
      fillOpacity={0.1}
      stroke="none"
    />
    <path d="M12 2a6.5 6.5 0 0 1 6.5 6.5c0 5.5-6.5 13.5-6.5 13.5S5.5 14 5.5 8.5A6.5 6.5 0 0 1 12 2z" />
    <circle cx={12} cy={8.5} r={2.5} />
    <path d="M9.8 6.8l4.4 3.4M14.2 6.8L9.8 10.2" strokeOpacity={0.45} strokeWidth={1} />
  </Ico>
);

/** Markets — Classic two-pan balance scales */
export const WEEditMarkets = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 4v16" />
    <path d="M8.5 20h7" />
    <path d="M6 4h12" />
    <path d="M6 4L3 11M18 4L21 11" />
    <path d="M1.5 11h3M19.5 11h3" />
    <path d="M1.5 11a3 3 0 0 0 6 0" />
    <path d="M16.5 11a3 3 0 0 0 6 0" />
  </Ico>
);

/** Measurers — Drafting compass open with measurement arc */
export const WEEditMeasurers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 5.5L8.5 18.5" />
    <path d="M12 5.5l3.5 13" />
    <path d="M9.5 13h5" />
    <circle cx={12} cy={5.5} r={1.5} />
    <path d="M7.5 20a1.5 1.5 0 0 0 1.5 1.5h6A1.5 1.5 0 0 0 16.5 20L12 18.5z" />
    <path d="M6 13A8.5 8.5 0 0 0 18 13" strokeDasharray="1.5 2" strokeOpacity={0.45} />
  </Ico>
);

/** Labels — Pennant banner with text lines and wax seal */
export const WEEditLabels = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M5 8h15a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5l-3-3.5L5 8z"
      fill="currentColor"
      fillOpacity={0.1}
      stroke="none"
    />
    <path d="M5 8h15a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5l-3-3.5L5 8z" />
    <path d="M8 11h8M8 13h5" />
    <circle cx={18.5} cy={11.5} r={1.2} fill="currentColor" stroke="none" />
  </Ico>
);

/** Military — Two crossing longswords with center guard disc */
export const WEEditMilitary = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
    <path d="M4 4l2.5 1-1-2.5" />
    <path d="M20 4l-2.5 1 1-2.5" />
    <path d="M4 20l2.5-1-1 2.5" />
    <path d="M20 20l-2.5-1 1 2.5" />
    <path d="M9.8 14.2L8 16M14.2 9.8L16 8" strokeOpacity={0.4} />
    <circle cx={12} cy={12} r={2} />
  </Ico>
);

/** Names — Calligraphic swash lettering */
export const WEEditNames = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M5 17C5 11 7 7 12 6c5-1 8 2 7 7s-5 6-7 6-5-1-4-5 2-6 6-6" />
    <path d="M19 6l2.5-3" />
    <path d="M3.5 20l2.5-3" />
  </Ico>
);

/** Notes — Rolled scroll with visible text lines */
export const WEEditNotes = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M8 3H18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M8 3c0 2-2 2-2 4s2 2 2 4-2 2-2 4 2 2 2 4" />
    <path d="M11 8h5M11 12h5M11 16h3" />
  </Ico>
);

/** Provinces — Territory subdivided by dashed lines */
export const WEEditProvinces = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <path d="M3 11h6M13 11h8" strokeDasharray="2.5 2" />
    <path d="M10 3v8M10 13v8" strokeDasharray="2.5 2" />
    <path d="M13 13v8" strokeDasharray="2.5 2" />
  </Ico>
);

/** Religions — Radiant eight-pointed star with inner circle */
export const WEEditReligions = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2l2.5 5 5-2.5-2.5 5 5 2.5-5 2.5 2.5 5-5-2.5L12 22l-2.5-5-5 2.5 2.5-5-5-2.5 5-2.5-2.5-5 5 2.5z" />
    <circle cx={12} cy={12} r={3} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

/** Rivers — Branching waterway delta with tributaries */
export const WEEditRivers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3C12 3 11 8 11 12c0 4 1 6 1 9" />
    <path d="M11 8C9 7 7 8 5.5 12" />
    <path d="M11 7C10 5 8 4 6 5.5" />
    <path d="M11 12.5C9 11.5 7 12.5 5.5 15.5" />
    <path d="M11 9C13 8 15 9 17 12" />
    <path d="M11 13C13 12 15.5 13 17 16" />
  </Ico>
);

/** Routes — Dotted path with circular waypoints */
export const WEEditRoutes = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={5} cy={7} r={2} />
    <circle cx={19} cy={17} r={2} />
    <path
      d="M7 7C10 7 9.5 12 12 12s5.5-5 8-5"
      strokeDasharray="3 2.5"
    />
    <circle cx={12} cy={12} r={1.5} fill="currentColor" fillOpacity={0.35} />
  </Ico>
);

/** States — Crown above territorial band */
export const WEEditStates = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 10l3-5 3 4.5 3-6 3 6 3-4.5 3 5" />
    <path
      d="M3 10h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3z"
      fill="currentColor"
      fillOpacity={0.12}
      stroke="none"
    />
    <path d="M3 10h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3z" />
    <path d="M5 14v6h14v-6" />
    <path d="M8 20h8" strokeOpacity={0.4} />
  </Ico>
);

/** Trade — Bidirectional exchange arrows between city nodes */
export const WEEditTrade = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={5} cy={7} r={2.5} />
    <circle cx={19} cy={17} r={2.5} />
    <path d="M7 6L17.5 4l-1.5 3" />
    <path d="M17 18L6.5 20l1.5-3" />
    <path d="M9 7.5L15.5 5.5M9 17.5L15.5 15.5" strokeOpacity={0.35} />
  </Ico>
);

/** Units — Shield with soldier-token formation */
export const WEEditUnits = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3l8 3.5v7c0 4-3.5 7-8 8.5C7.5 20.5 4 17.5 4 13.5v-7L12 3z" />
    <circle cx={9} cy={12} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <circle cx={12} cy={10} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <circle cx={15} cy={12} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <path
      d="M9 10.5v-2M12 8.5v-2M15 10.5v-2"
      strokeOpacity={0.45}
      strokeWidth={1}
    />
  </Ico>
);

/** Zones — Three concentric territorial rings */
export const WEEditZones = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={9} />
    <circle cx={12} cy={12} r={6} />
    <circle cx={12} cy={12} r={3} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

// ════════════════════════════════════════════════════
// REGENERATE SUB-ICONS
// ════════════════════════════════════════════════════

/** Regen Burgs — Tower with regeneration arc */
export const WERegenBurgs = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M8 21V13h8v8" />
    <path d="M8 13V10h2V8h1.5v2h1V8h1.5v2h2v3" />
    <rect x={10.5} y={15} width={3} height={6} />
    <path d="M6.5 21h11" />
    <RegenArc />
  </Ico>
);

/** Regen Cultures — Three region circles with regeneration arc */
export const WERegenCultures = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={9} cy={10} r={5} />
    <circle cx={15} cy={10} r={5} />
    <circle cx={12} cy={16} r={5} />
    <RegenArc />
  </Ico>
);

/** Regen Economy — Coin with meridian detail and regeneration arc */
export const WERegenEconomy = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={8.5} />
    <circle cx={12} cy={12} r={6} />
    <path d="M12 6v12M8.5 8.5L15.5 15.5M15.5 8.5L8.5 15.5" strokeOpacity={0.4} />
    <path d="M10 11h4M12 9v5" />
    <RegenArc />
  </Ico>
);

/** Regen Emblems — Shield with regeneration arc */
export const WERegenEmblems = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3.5l8 3.5v7c0 4-3.5 7-8 8.5-4.5-1.5-8-4.5-8-8.5V7l8-3.5z" />
    <path d="M9.5 10h5M12 8v8" />
    <RegenArc />
  </Ico>
);

/** Regen Goods — Crate with regeneration arc */
export const WERegenGoods = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9z" />
    <path d="M4 11l2-6h12l2 6" />
    <path d="M4 14h16" />
    <RegenArc />
  </Ico>
);

/** Regen Ice — Snowflake crystal with regeneration arc */
export const WERegenIce = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3v18M3 12h18" />
    <path d="M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
    <path d="M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2" />
    <path d="M6 12l-2-2M6 12l-2 2M18 12l2-2M18 12l2 2" />
    <circle cx={12} cy={12} r={2} />
    <RegenArc />
  </Ico>
);

/** Regen State Labels — Crown-text hybrid with regeneration arc */
export const WERegenStateLabels = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 9l3-4 3 3 3-5 3 5 3-3 3 4" />
    <path d="M3 9h18v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" />
    <path d="M6 13v5h12v-5" />
    <path d="M8 16h8M8 18h5" strokeOpacity={0.5} />
    <RegenArc />
  </Ico>
);

/** Regen Markers — Pin with regeneration arc */
export const WERegenMarkers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2.5a6 6 0 0 1 6 6c0 5-6 13-6 13S6 14 6 8.5a6 6 0 0 1 6-6z" />
    <circle cx={12} cy={8.5} r={2.5} />
    <RegenArc />
  </Ico>
);

/** Regen Markets — Scales with regeneration arc */
export const WERegenMarkets = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 4.5v15" />
    <path d="M9 19.5h6" />
    <path d="M7 4.5h10" />
    <path d="M7 4.5L4 11M17 4.5l3 6.5" />
    <path d="M2.5 11h3" />
    <path d="M18.5 11h3" />
    <path d="M2.5 11a2.5 2.5 0 0 0 5 0" />
    <path d="M18.5 11a2.5 2.5 0 0 0 5 0" />
    <RegenArc />
  </Ico>
);

/** Regen Military — Swords with regeneration arc */
export const WERegenMilitary = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    <path d="M4.5 4.5l2 1-1-2" />
    <path d="M19.5 4.5l-2 1 1-2" />
    <circle cx={12} cy={12} r={2} />
    <RegenArc />
  </Ico>
);

/** Regen Population — Density dots cluster with regeneration arc */
export const WERegenPopulation = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={8} cy={10} r={2.5} />
    <circle cx={14} cy={8} r={2} />
    <circle cx={7} cy={16} r={1.5} />
    <circle cx={13} cy={15} r={2.5} />
    <circle cx={18} cy={13} r={1.5} />
    <circle cx={10} cy={19} r={1} fill="currentColor" fillOpacity={0.4} stroke="none" />
    <circle cx={16} cy={18} r={1} fill="currentColor" fillOpacity={0.4} stroke="none" />
    <RegenArc />
  </Ico>
);

/** Regen Production — Hammer and anvil with regeneration arc */
export const WERegenProduction = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M5 20h14" />
    <path d="M9 20V13" />
    <path d="M15 20V13" />
    <path d="M7 13h10" />
    <path d="M12 5l-3 5h6l-3-5z" />
    <path d="M12 5V3" />
    <path d="M9 3h6" />
    <RegenArc />
  </Ico>
);

/** Regen Provinces — Subdivisions with regeneration arc */
export const WERegenProvinces = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={4} width={15} height={15} rx={1.5} />
    <path d="M3 10h7M12 10h6" strokeDasharray="2 1.5" />
    <path d="M10 4v6M10 12v7" strokeDasharray="2 1.5" />
    <RegenArc />
  </Ico>
);

/** Regen Relief — Terrain hachure lines with regeneration arc */
export const WERegenRelief = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M2 19l5-10 3.5 5.5 2-4 5.5 8.5H2z" />
    <path d="M3.5 17h3.5M5 15h2.5M6.5 13h1.5" strokeOpacity={0.55} />
    <RegenArc />
  </Ico>
);

/** Regen Religions — Eight-pointed star with regeneration arc */
export const WERegenReligions = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3l2 4.5 4.5-2-2 4.5L21 12l-4.5 2 2 4.5-4.5-2L12 21l-2-4.5-4.5 2 2-4.5L3 12l4.5-2-2-4.5 4.5 2z" />
    <circle cx={12} cy={12} r={2.5} />
    <RegenArc />
  </Ico>
);

/** Regen Rivers — Branching delta with regeneration arc */
export const WERegenRivers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 4C12 4 11 8 11 12c0 4 1 6 1 8" />
    <path d="M11 8.5C9 7.5 7.5 8.5 6 12" />
    <path d="M11 13C9 12 7 13 6 16" />
    <path d="M11 9.5C13 8.5 15 9.5 17 13" />
    <RegenArc />
  </Ico>
);

/** Regen Routes — Dotted path with regeneration arc */
export const WERegenRoutes = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={5} cy={7.5} r={2} />
    <circle cx={17} cy={17} r={2} />
    <path d="M7 7.5C10 7.5 9.5 12 12 12s5-4.5 7-4.5" strokeDasharray="3 2" />
    <RegenArc />
  </Ico>
);

/** Regen States — Crown with regeneration arc */
export const WERegenStates = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 10.5l3-4.5 3 4 3-5.5 3 5.5 3-4 3 4.5" />
    <path d="M3 10.5h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3z" />
    <path d="M5.5 14.5v5h13v-5" />
    <RegenArc />
  </Ico>
);

/** Regen Zones — Concentric rings with regeneration arc */
export const WERegenZones = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={8.5} />
    <circle cx={12} cy={12} r={5.5} />
    <circle cx={12} cy={12} r={2.5} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
    <RegenArc />
  </Ico>
);

// ════════════════════════════════════════════════════
// ADD SUB-ICONS
// ════════════════════════════════════════════════════

/** Add Burg — Tower with plus indicator */
export const WEAddBurg = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M6.5 20V12h9v8" />
    <path d="M6.5 12V9h2V7h1.5v2h1V7H12v2h1.5V9h2v3" />
    <rect x={9} y={13.5} width={3} height={6.5} />
    <path d="M5 20h11" />
    <AddPlus />
  </Ico>
);

/** Add Label — Banner with plus indicator */
export const WEAddLabel = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4.5 8h13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4.5l-2.5-3.5 2.5-3.5z" />
    <path d="M7 11h7M7 13h4" />
    <AddPlus />
  </Ico>
);

/** Add Point of Interest — Diamond star marker with plus indicator */
export const WEAddPOI = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
    <circle cx={12} cy={12} r={2} />
    <AddPlus />
  </Ico>
);

/** Add River — Water branch with plus indicator */
export const WEAddRiver = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M11 3.5C11 3.5 10 8 10 11s1 5 1 8.5" />
    <path d="M10 8C8.5 7 7 8 5.5 11" />
    <path d="M10 12C8.5 11 7 12 5.5 15" />
    <path d="M10 9C12 8 14 9 16 12" />
    <AddPlus />
  </Ico>
);

/** Add Route — Dotted path with plus indicator */
export const WEAddRoute = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={5} cy={7} r={2} />
    <circle cx={16} cy={16} r={2} />
    <path d="M7 7C10 7 9.5 11.5 12 11.5s5-4.5 7.5-4.5" strokeDasharray="3 2" />
    <AddPlus />
  </Ico>
);

// ════════════════════════════════════════════════════
// SHOW SUB-ICONS
// ════════════════════════════════════════════════════

/** Show Cells — Voronoi irregular cell structure */
export const WEShowCells = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3L5 7v6l4 5h6l4-5V7z" />
    <path d="M12 3L8 9l4 3 4-3z" />
    <path d="M5 13l7-1 7 1" />
    <path d="M9 18l3-2 3 2" />
    <path d="M8 9l-3 4M16 9l3 4" strokeOpacity={0.4} />
  </Ico>
);

/** Show Charts — Radial statistics diagram */
export const WEShowCharts = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={9} />
    <path d="M12 12L12 3" />
    <path d="M12 12L21 12" />
    <path d="M12 12L5.64 5.64" />
    <path d="M12 12L18.36 18.36" />
    <path d="M12 12L5.64 18.36" />
    <path
      d="M12 5L18.5 9l-1 7-5.5 3.5L8 16 7 9z"
      fill="currentColor"
      fillOpacity={0.18}
      stroke="currentColor"
    />
  </Ico>
);

/** Show Minimap — Small framed map view with terrain */
export const WEShowMinimap = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={3} width={18} height={18} rx={2} />
    <path d="M3 7l4 2 3-3 4 4 4-2v3l-4 2-4-3-3 3-4-2z" fill="currentColor" fillOpacity={0.2} stroke="currentColor" />
    <circle cx={17} cy={16} r={2} />
    <path d="M12 16h3M12 18h2" strokeOpacity={0.4} />
  </Ico>
);

// ════════════════════════════════════════════════════
// CREATE SUB-ICONS
// ════════════════════════════════════════════════════

/** Create Submap — Nested map frames, map within a map */
export const WECreateSubmap = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={2} y={2} width={20} height={20} rx={2} />
    <rect x={7} y={7} width={10} height={10} rx={1} />
    <path d="M7 11h10M11 7v10" strokeOpacity={0.4} />
    <path d="M2 7h5M17 7h5M2 17h5M17 17h5" strokeOpacity={0.3} />
  </Ico>
);

/** Create Transform — Shape with transformation handles and arrows */
export const WECreateTransform = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={6} y={6} width={12} height={12} rx={1} />
    <path d="M6 6L3 3M18 6l3-3M6 18l-3 3M18 18l3 3" strokeOpacity={0.6} />
    <circle cx={3} cy={3} r={1.5} fill="currentColor" fillOpacity={0.4} />
    <circle cx={21} cy={3} r={1.5} fill="currentColor" fillOpacity={0.4} />
    <circle cx={3} cy={21} r={1.5} fill="currentColor" fillOpacity={0.4} />
    <circle cx={21} cy={21} r={1.5} fill="currentColor" fillOpacity={0.4} />
    <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
  </Ico>
);

// ════════════════════════════════════════════════════
// HEIGHTMAP SUB-ICONS
// ════════════════════════════════════════════════════

/** Heightmap Preview — Eye above topographic contour lines */
export const WEHeightmapPreview = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 9c0 0 3-6 9-6s9 6 9 6-3 4-9 4-9-4-9-4z" />
    <circle cx={12} cy={9} r={2.5} />
    <circle cx={12} cy={9} r={1} fill="currentColor" stroke="none" />
    <path d="M4 16C6 14.5 9 13.5 12 13.5s6 1 8 2.5" />
    <path d="M6 19C8 18 10 17.5 12 17.5s4 .5 6 1.5" />
    <path d="M9 22c1-.5 2-.8 3-.8s2 .3 3 .8" strokeOpacity={0.5} />
  </Ico>
);

/** Heightmap 3D — Three-dimensional terrain perspective grid */
export const WEHeightmap3D = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 16L12 5l9 11" />
    <path d="M3 16h18" />
    <path d="M3 16l9 6 9-6" />
    <path d="M7 12l5-7 5 7" strokeOpacity={0.45} />
    <path d="M5 14l7-5 7 5" strokeOpacity={0.3} />
    <path d="M7 16l5 3 5-3" strokeOpacity={0.45} />
    <path d="M5 16l7 4 7-4" strokeOpacity={0.3} />
  </Ico>
);

/** Heightmap Finish — Mountain contours with completion checkmark */
export const WEHeightmapFinish = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M2 19l5.5-11L11 14l2-4 5.5 9H2z" />
    <path d="M3 17h3M5 14.5h2.5" strokeOpacity={0.5} />
    <path d="M15 5l3 3 4-5" />
  </Ico>
);

// ════════════════════════════════════════════════════
// SETTINGS SUB-ICONS
// ════════════════════════════════════════════════════

/** Configure World — Globe sphere with meridian lines and gear teeth */
export const WEConfigureWorld = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={7} />
    <path d="M12 5c-2 2-3.5 4.5-3.5 7s1.5 5 3.5 7" />
    <path d="M12 5c2 2 3.5 4.5 3.5 7S14 17 12 19" />
    <path d="M5 12h14" />
    <path d="M5.5 8h13M5.5 16h13" strokeOpacity={0.5} />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeOpacity={0.4} />
    <circle cx={19} cy={5} r={2.5} />
    <path d="M19 3.5V2M19 8v-1.5M17.5 5H16M22 5h-1.5" strokeWidth={1.2} />
  </Ico>
);

/** Default Canvas — Rectangular frame with corner registration marks */
export const WEDefaultCanvas = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={4} y={4} width={16} height={16} rx={1} />
    <path d="M4 4L2 2M20 4l2-2M4 20l-2 2M20 20l2 2" strokeOpacity={0.6} />
    <path d="M2 2h3M2 2v3M22 2h-3M22 2v3M2 22h3M2 22v-3M22 22h-3M22 22v-3" strokeOpacity={0.6} />
    <path d="M8 12h8M12 8v8" strokeOpacity={0.4} strokeDasharray="2 2" />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

/** Reset Options — Circular reset arrows with center settings dot */
export const WEResetOptions = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 5a7 7 0 0 1 6.5 4.5" />
    <path d="M18.5 9.5L20.5 7l-3-.5" />
    <path d="M12 19a7 7 0 0 1-6.5-4.5" />
    <path d="M5.5 14.5L3.5 17l3 .5" />
    <path d="M19.5 12a7 7 0 0 1-.8 3.5" />
    <path d="M4.5 12a7 7 0 0 1 .8-3.5" />
    <circle cx={12} cy={12} r={2.5} />
    <path d="M12 10v2.5M10 12h2.5" />
  </Ico>
);

// ════════════════════════════════════════════════════
// FILE / MAP MANAGEMENT
// ════════════════════════════════════════════════════

/** New Map — Blank map frame with creation spark */
export const WENewMap = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4 6l5-2 6 3 6-3v14l-6 3-6-3-5 2V6z" />
    <path d="M9 4v14M15 7v14" strokeOpacity={0.4} />
    <path d="M17 3l1.5 2.5 2.5-1.5-1.5 2.5 2.5 1.5-2.5.5-.5 2.5-1.5-2.5-2.5 1.5 1.5-2.5-2.5-1.5 2.5-.5z" strokeWidth={1.1} />
  </Ico>
);

/** Export — Folded map with outward arrow */
export const WEExport = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5z" />
    <path d="M14 3v5h5" />
    <path d="M12 11v6M9 14l3 3 3-3" />
  </Ico>
);

/** Save — Sealed scroll with binding ribbon */
export const WESave = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M6 3h10l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    <path d="M16 3v5H8V3" />
    <rect x={7} y={13} width={10} height={7} rx={1} />
    <path d="M10 16.5h4" />
    <circle cx={13} cy={5} r={0.8} fill="currentColor" stroke="none" />
  </Ico>
);

/** Load — Open scroll unrolling, map emerging */
export const WELoad = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M8 3H18a1 1 0 0 1 1 1v4" />
    <path d="M5 8h14v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8z" />
    <path d="M8 3c0 1.5-2 1.5-2 3s2 1.5 2 3" strokeOpacity={0.6} />
    <path d="M9 11h6M9 14h4" />
    <path d="M15 17l2 2 3-4" strokeOpacity={0.7} />
  </Ico>
);

/** Reset Zoom — Magnifier lens with reset arrows inside */
export const WEResetZoom = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={10.5} cy={10.5} r={7.5} />
    <path d="M16.5 16.5L21 21" />
    <path d="M10.5 7.5a3 3 0 0 1 3 3" />
    <path d="M13.5 10.5L15 8.5l-2.5.5" />
    <path d="M10.5 13.5a3 3 0 0 1-3-3" />
    <path d="M7.5 10.5L6 12.5l2.5-.5" />
  </Ico>
);

// ════════════════════════════════════════════════════
// LAYER QUICK-RAIL ICONS
// ════════════════════════════════════════════════════

/** Layer: States — Colored territorial regions with crown */
export const WELayerStates = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 3h8v8H3z" fill="currentColor" fillOpacity={0.15} />
    <path d="M13 3h8v8h-8z" fill="currentColor" fillOpacity={0.08} />
    <path d="M3 13h8v8H3z" fill="currentColor" fillOpacity={0.08} />
    <path d="M13 13h8v8h-8z" fill="currentColor" fillOpacity={0.15} />
    <path d="M3 3h18v18H3z" rx={0} />
    <path d="M11 3v18M3 11h18" />
    <path d="M14.5 15l1.5-2.5 1.5 2 1.5-3 1.5 2.5" strokeWidth={1.2} />
    <path d="M13.5 15h7" strokeWidth={1.2} />
  </Ico>
);

/** Layer: Provinces — Subdivided territory with dashed lines */
export const WELayerProvinces = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={2.5} y={2.5} width={19} height={19} rx={1.5} />
    <path d="M2.5 10h7M12 10h9.5" strokeDasharray="2.5 2" />
    <path d="M9.5 2.5v7.5M9.5 12v9" strokeDasharray="2.5 2" />
    <path d="M12 12v9" strokeDasharray="2.5 2" />
  </Ico>
);

/** Layer: Cultures — Three overlapping culture zones */
export const WELayerCultures = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={9} cy={9.5} r={5.5} />
    <circle cx={15} cy={9.5} r={5.5} />
    <circle cx={12} cy={15} r={5.5} />
  </Ico>
);

/** Layer: Religions — Radiant star over region dots */
export const WELayerReligions = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2l2 4.5 4.5-2-2 4.5L21 12l-4.5 2 2 4.5-4.5-2L12 21l-2-4.5-4.5 2 2-4.5L3 12l4.5-2-2-4.5 4.5 2z" />
    <circle cx={12} cy={12} r={2.5} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

/** Layer: Biomes — Organic zone patches with vegetation marks */
export const WELayerBiomes = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 17C4 14 7 12 10 12s5.5 2 7 5" fill="currentColor" fillOpacity={0.1} stroke="none" />
    <path d="M3 17C4 14 7 12 10 12s5.5 2 7 5" />
    <path d="M8 12V7C8 7 10 5 12 7s4 1 4-2" strokeOpacity={0.6} />
    <path d="M5 10C5 10 6 8 8 9M14 8C15 6 17 7 17 9" strokeOpacity={0.4} />
    <path d="M3 20h18" strokeOpacity={0.3} />
    <path d="M6 14v3M10 13v4M14 14v3M18 16v2" strokeOpacity={0.4} strokeWidth={1} />
  </Ico>
);

/** Layer: Heightmap — Elevation gradient strips */
export const WELayerHeightmap = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={3} width={18} height={18} rx={1.5} />
    <path d="M3 7.5h18" fill="none" />
    <path d="M3 12h18" fill="none" />
    <path d="M3 16.5h18" fill="none" />
    <path d="M3 3h18v4.5H3z" fill="currentColor" fillOpacity={0.05} stroke="none" />
    <path d="M3 7.5h18V12H3z" fill="currentColor" fillOpacity={0.12} stroke="none" />
    <path d="M3 12h18v4.5H3z" fill="currentColor" fillOpacity={0.22} stroke="none" />
    <path d="M3 16.5h18V21H3z" fill="currentColor" fillOpacity={0.35} stroke="none" />
  </Ico>
);

/** Layer: Rivers — River network with tributaries */
export const WELayerRivers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2C12 2 11 7 11 11c0 5 2 7 2 11" strokeWidth={2} />
    <path d="M11 7C9 6 7 7 5.5 11" />
    <path d="M11 7C10 5 8.5 4 6.5 5" strokeOpacity={0.5} />
    <path d="M11 12C9 11 7.5 12 6 15" />
    <path d="M11 9C13 8 15 9 17 12" />
    <path d="M11 13C13 12 15.5 13 17 17" />
  </Ico>
);

/** Layer: Lakes — Oval water body with ripple lines */
export const WELayerLakes = (p: WEIconProps) => (
  <Ico {...p}>
    <ellipse cx={12} cy={12} rx={8.5} ry={6} fill="currentColor" fillOpacity={0.12} />
    <ellipse cx={12} cy={12} rx={8.5} ry={6} />
    <path d="M7 12C8 11 10 11 12 12s4 1 5 0" strokeOpacity={0.5} />
    <path d="M8 14C9 13 10.5 13 12 14s3 1 4 0" strokeOpacity={0.35} />
  </Ico>
);

/** Layer: Routes — Road network connecting nodes */
export const WELayerRoutes = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={1.5} fill="currentColor" fillOpacity={0.3} />
    <circle cx={4} cy={6} r={1.5} />
    <circle cx={20} cy={6} r={1.5} />
    <circle cx={4} cy={18} r={1.5} />
    <circle cx={20} cy={18} r={1.5} />
    <path d="M5.5 6.5L10.5 10.5M18.5 6.5L13.5 10.5M5.5 17.5L10.5 13.5M18.5 17.5L13.5 13.5" strokeDasharray="3 2" />
  </Ico>
);

/** Layer: Goods — Resource distribution with bundle marks */
export const WELayerGoods = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={7} cy={8} r={2.5} />
    <circle cx={16} cy={6} r={2} />
    <circle cx={6} cy={16} r={2} />
    <circle cx={15} cy={15} r={2.5} />
    <circle cx={20} cy={11} r={1.5} />
    <path d="M6 8h2M7 7v2M15 6h2M16 5v2M14 15h2M15 14v2" strokeOpacity={0.5} strokeWidth={1} />
  </Ico>
);

/** Layer: Trade — Trade flow arrows between nodes */
export const WELayerTrade = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={5} cy={7} r={2.5} />
    <circle cx={19} cy={7} r={2.5} />
    <circle cx={5} cy={17} r={2.5} />
    <circle cx={19} cy={17} r={2.5} />
    <path d="M7.5 7h9M7.5 17h9" />
    <path d="M5 9.5v5M19 9.5v5" />
    <path d="M14.5 6l2 1-2 1M9.5 16l-2 1 2 1" strokeWidth={1} />
    <path d="M4 12.5l-1 1 1 1M20 12.5l1 1-1 1" strokeWidth={1} />
  </Ico>
);

/** Layer: Military — Force tokens on territory */
export const WELayerMilitary = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
    <path d="M4.5 4.5l2.5 1-1-2.5M19.5 4.5l-2.5 1 1-2.5M4.5 19.5l2.5-1-1 2.5M19.5 19.5l-2.5-1 1 2.5" />
    <circle cx={12} cy={12} r={2} />
  </Ico>
);

/** Layer: Emblems — Heraldic shields scattered */
export const WELayerEmblems = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2l7 3v6c0 3.5-3 6-7 7-4-1-7-3.5-7-7V5l7-3z" />
    <path d="M9.5 8h5M12 7v7" />
    <circle cx={12} cy={12} r={2} />
  </Ico>
);

/** Layer: Labels — Text placement indicators */
export const WELayerLabels = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 7h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3L1 10l2-3z" />
    <path d="M6 10h8M6 12h5" />
    <path d="M4 15l6 0" strokeOpacity={0.4} />
    <path d="M6 18l10 0" strokeOpacity={0.3} />
    <circle cx={20} cy={17} r={2} strokeOpacity={0.6} />
  </Ico>
);

/** Layer: Burg Icons — Settlement dot pattern */
export const WELayerBurgIcons = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={3} />
    <circle cx={5} cy={7} r={2} />
    <circle cx={19} cy={7} r={2} />
    <circle cx={5} cy={17} r={2} />
    <circle cx={19} cy={17} r={2} />
    <circle cx={12} cy={4} r={1.5} />
    <circle cx={12} cy={20} r={1.5} />
    <path d="M12 9v6M9 12h6" strokeOpacity={0.3} />
  </Ico>
);

/** Layer: Markers — Clustered pin group */
export const WELayerMarkers = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2a5 5 0 0 1 5 5c0 4.5-5 11-5 11S7 11.5 7 7a5 5 0 0 1 5-5z" />
    <circle cx={12} cy={7} r={2} />
    <path d="M5 10a3.5 3.5 0 0 1 3.5 3.5c0 3-3.5 7.5-3.5 7.5S5 17 5 14.5A3.5 3.5 0 0 1 8.5 11" strokeOpacity={0.45} />
    <path d="M19 10a3.5 3.5 0 0 0-3.5 3.5c0 3 3.5 7.5 3.5 7.5s3.5-4.5 3.5-7.5A3.5 3.5 0 0 0 15.5 11" strokeOpacity={0.45} />
  </Ico>
);

/** Layer: Ocean — Wave pattern across surface */
export const WELayerOcean = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M2 8C4 8 5 10 7 10s3-2 5-2 3 2 5 2 3-2 5-2" />
    <path d="M2 13C4 13 5 15 7 15s3-2 5-2 3 2 5 2 3-2 5-2" />
    <path d="M2 18C4 18 5 20 7 20s3-2 5-2 3 2 5 2 3-2 5-2" />
    <path d="M2 3C4 3 5 5 7 5s3-2 5-2 3 2 5 2 3-2 5-2" strokeOpacity={0.35} />
  </Ico>
);

/** Layer: Compass — Full decorative compass rose */
export const WELayerCompass = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5z" />
    <path d="M12 5L12.8 10.8L18 12L12.8 13.2L12 19L11.2 13.2L6 12L11.2 10.8z" fill="currentColor" fillOpacity={0.15} stroke="none" />
    <circle cx={12} cy={12} r={2} />
    <circle cx={12} cy={12} r={0.8} fill="currentColor" stroke="none" />
    <path d="M12 2v2.5M22 12h-2.5M12 22v-2.5M2 12h2.5" strokeOpacity={0.4} />
  </Ico>
);

/** Layer: Landmass — Irregular land silhouette */
export const WELayerLandmass = (p: WEIconProps) => (
  <Ico {...p}>
    <path
      d="M5 4C5 4 3 8 3 12s2 9 9 9 9-5 9-9S18 3 14 3C10 3 7 5 5 4z"
      fill="currentColor"
      fillOpacity={0.15}
    />
    <path d="M5 4C5 4 3 8 3 12s2 9 9 9 9-5 9-9S18 3 14 3C10 3 7 5 5 4z" />
    <path d="M8 8C9 7 11 7 12 9M13 14C14 13 16 13 17 15" strokeOpacity={0.4} />
  </Ico>
);

/** Layer: Texture — Crosshatch pattern overlay */
export const WELayerTexture = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 3l18 18M3 8l13 13M8 3l13 13" strokeOpacity={0.6} />
    <path d="M21 3L3 21M16 3L3 16M21 8L8 21" strokeOpacity={0.3} />
    <rect x={3} y={3} width={18} height={18} rx={1.5} strokeOpacity={0.5} />
  </Ico>
);

/** Layer: Cells — Voronoi irregular polygon grid */
export const WELayerCells = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3L5 8v5l4 5h6l4-5V8z" />
    <path d="M12 3L8.5 8.5l3.5 3 3.5-3z" />
    <path d="M5 13l7-1.5 7 1.5" />
    <path d="M9 18l3-2 3 2" />
    <path d="M8.5 8.5l-3.5 4.5M15.5 8.5l3.5 4.5" strokeOpacity={0.4} />
  </Ico>
);

/** Layer: Grid — Regular rectangular measurement grid */
export const WELayerGrid = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={3} width={18} height={18} rx={1} />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </Ico>
);

/** Layer: Coordinates — Crosshair with degree notation marks */
export const WELayerCoordinates = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={9} />
    <path d="M12 3v18M3 12h18" />
    <path d="M12 3l-1 2h2l-1-2zM12 21l-1-2h2l-1 2z" fill="currentColor" stroke="none" />
    <path d="M3 12l2-1v2l-2-1zM21 12l-2-1v2l2-1z" fill="currentColor" stroke="none" />
    <circle cx={12} cy={12} r={2} />
    <path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2-2" strokeOpacity={0.4} />
  </Ico>
);

/** Layer: Relief — Terrain hachure shading lines */
export const WELayerRelief = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M2 20l5.5-12 3.5 5.5 2-4 6 10.5H2z" fill="currentColor" fillOpacity={0.1} stroke="none" />
    <path d="M2 20l5.5-12 3.5 5.5 2-4 6 10.5H2z" />
    <path d="M3 18h3.5M5 15.5h2.5M6.5 13h1.5" strokeOpacity={0.55} />
    <path d="M14.5 18h5M16.5 15h4" strokeOpacity={0.55} />
    <path d="M4.5 18l1-4M6 18l1-4.5M7.5 18l.5-3.5" strokeOpacity={0.3} strokeWidth={0.8} />
  </Ico>
);

/** Layer: Zones — Concentric influence rings */
export const WELayerZones = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={9} />
    <circle cx={12} cy={12} r={6} />
    <circle cx={12} cy={12} r={3} />
    <circle cx={12} cy={12} r={1} fill="currentColor" stroke="none" />
  </Ico>
);

/** Layer: Borders — Political border line with dash pattern */
export const WELayerBorders = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 12C5 10 7 11 9 9s2-4 5-4 4 3 5 5 2 5 5 5" />
    <path d="M3 12C5 10 7 11 9 9s2-4 5-4 4 3 5 5 2 5 5 5" strokeDasharray="5 3" strokeOpacity={0.5} stroke="currentColor" strokeWidth={2} />
    <path d="M3 18h18M3 6h18" strokeOpacity={0.2} />
  </Ico>
);

/** Layer: Temperature — Thermometer with heat gradient marks */
export const WELayerTemperature = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3v12" />
    <circle cx={12} cy={17} r={4} fill="currentColor" fillOpacity={0.2} />
    <circle cx={12} cy={17} r={4} />
    <path d="M12 5H9M12 8H9M12 11H9" strokeOpacity={0.6} />
    <path d="M16 5h3M17 8h2M17.5 11h1.5" strokeOpacity={0.4} />
    <path d="M14 6h1M14.5 9h.5M14.5 12h.5" strokeOpacity={0.3} />
  </Ico>
);

/** Layer: Coastline — Single bold shoreline curve */
export const WELayerCoastline = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 16C5 13 8 11 12 11s7 2 9 6" strokeWidth={2.2} />
    <path d="M5.5 13C7 12 9 11.5 11 11.5" strokeOpacity={0.4} />
    <path d="M7 10C8.5 9 10 9 12 9" strokeOpacity={0.25} />
    <path d="M14.5 11.5C16.5 12 18 13 19.5 15" strokeOpacity={0.4} />
    <circle cx={5} cy={7} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={9} cy={6} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={15} cy={6.5} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={19} cy={7.5} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={3} cy={8} r={0.6} fill="currentColor" stroke="none" />
  </Ico>
);

/** Layer: Ice — Crystalline snowflake with six arms */
export const WELayerIce = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M12 3v18M3 12h18" />
    <path d="M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36" />
    <path d="M12 5.5l-2-2M12 5.5l2-2" />
    <path d="M12 18.5l-2 2M12 18.5l2 2" />
    <path d="M5.5 12l-2-2M5.5 12l-2 2" />
    <path d="M18.5 12l2-2M18.5 12l2 2" />
    <circle cx={12} cy={12} r={2} />
  </Ico>
);

/** Layer: Markets — Coin and scale balance indicator */
export const WELayerMarkets = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={9} r={6} />
    <path d="M10 9h4M12 7v4" />
    <path d="M8 15l-3 5M16 15l3 5" />
    <path d="M5 20h14" />
    <path d="M7 19h1.5M15.5 19H17" strokeOpacity={0.4} />
  </Ico>
);

/** Layer: Precipitation — Falling rain with cloud base */
export const WELayerPrecipitation = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M6 12a4 4 0 0 1 4-4 6 6 0 0 1 11.5 2A4 4 0 0 1 18 17H7a5 5 0 0 1-1-5z" />
    <path d="M8 20l-1 2M12 19l-1 2M16 20l-1 2" />
  </Ico>
);

/** Layer: Population — Density dots varying in size */
export const WELayerPopulation = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={8} cy={10} r={2.5} />
    <circle cx={14} cy={8} r={2} />
    <circle cx={7} cy={16} r={1.5} />
    <circle cx={14} cy={15} r={2.5} />
    <circle cx={19} cy={12} r={1.5} />
    <circle cx={10} cy={19} r={1} fill="currentColor" fillOpacity={0.5} stroke="none" />
    <circle cx={17} cy={18} r={1} fill="currentColor" fillOpacity={0.5} stroke="none" />
    <circle cx={4} cy={7} r={1} fill="currentColor" fillOpacity={0.5} stroke="none" />
  </Ico>
);

/** Layer: Fogging — Fog of war cloud shrouding corner */
export const WELayerFogging = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 3h18v18H3z" strokeOpacity={0.3} />
    <path
      d="M3 3C3 3 8 5 8 9a5 5 0 0 1-5 5V3z"
      fill="currentColor"
      fillOpacity={0.25}
      stroke="none"
    />
    <path d="M3 3C5 4 7 6 7 9c0 2.5-1.5 4.5-4 5" />
    <path d="M3 8C4.5 9 5.5 10.5 5.5 12" strokeOpacity={0.5} />
    <path d="M3 13C4 13.5 5 14.5 5 16" strokeOpacity={0.3} />
    <path d="M8 3C9 4.5 9.5 6 9.5 8" strokeOpacity={0.5} />
    <path d="M13 3C13.5 4 14 5.5 14 7" strokeOpacity={0.3} />
    <path d="M12 14l9 7M17 12l4 6" strokeOpacity={0.6} />
  </Ico>
);

/** Layer: Rulers — Measurement ruler with tick divisions */
export const WELayerRulers = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={2} y={8} width={20} height={8} rx={1} />
    <path d="M5 8v8M8 8v5M11 8v8M14 8v5M17 8v8M20 8v4" />
    <path d="M5 8l0-2M11 8l0-2M17 8l0-2" strokeOpacity={0.5} />
  </Ico>
);

/** Layer: Debug — Diagnostics crosshair with code brackets */
export const WELayerDebug = (p: WEIconProps) => (
  <Ico {...p}>
    <circle cx={12} cy={12} r={4} />
    <path d="M12 8V5M12 19v-3M8 12H5M19 12h-3" />
    <path d="M9.2 9.2L7 7M14.8 14.8L17 17M9.2 14.8L7 17M14.8 9.2L17 7" strokeOpacity={0.6} />
    <path d="M5 8L3 6M5 16L3 18M19 8l2-2M19 16l2 2" strokeOpacity={0.35} />
  </Ico>
);

/** Layer: Scale Bar — Horizontal measurement bar with distance divisions */
export const WELayerScaleBar = (p: WEIconProps) => (
  <Ico {...p}>
    <path d="M3 12h18" strokeWidth={2} />
    <path d="M3 9v6M8 10v4M13 9v6M18 10v4M21 9v6" />
    <path d="M3 18h5l5-0h5" fill="currentColor" fillOpacity={0.2} stroke="none" />
    <path d="M5.5 15h5" strokeOpacity={0.3} />
    <path d="M3 7l3-2M10 6h3M18 7l3-2" strokeOpacity={0.3} />
  </Ico>
);

/** Layer: Vignette — Oval fade frame with darkened edges */
export const WELayerVignette = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={2} y={2} width={20} height={20} rx={2} />
    <ellipse cx={12} cy={12} rx={7} ry={7} fill="currentColor" fillOpacity={0.0} stroke="currentColor" strokeOpacity={0.3} />
    <ellipse cx={12} cy={12} rx={4.5} ry={4.5} fill="currentColor" fillOpacity={0.0} stroke="currentColor" strokeOpacity={0.15} />
    <path
      d="M2 2C2 2 6 4 6 12S2 22 2 22"
      fill="currentColor"
      fillOpacity={0.15}
      stroke="none"
    />
    <path
      d="M22 2C22 2 18 4 18 12s4 10 4 10"
      fill="currentColor"
      fillOpacity={0.15}
      stroke="none"
    />
    <path d="M2 2C2 2 6 4 6 12S2 22 2 22" strokeOpacity={0.4} />
    <path d="M22 2C22 2 18 4 18 12s4 10 4 10" strokeOpacity={0.4} />
    <path d="M2 4C5 5 7 8 7 12M22 4C19 5 17 8 17 12" strokeOpacity={0.25} />
  </Ico>
);

/** Layer: Legend — Map legend key box with color swatches */
export const WELayerLegend = (p: WEIconProps) => (
  <Ico {...p}>
    <rect x={3} y={3} width={18} height={18} rx={1.5} />
    <path d="M3 8h18" />
    <path d="M8 6h8" strokeOpacity={0.4} />
    <path d="M5.5 13h2v2h-2zM5.5 17h2v2h-2z" fill="currentColor" fillOpacity={0.3} />
    <path d="M5.5 13h2v2h-2zM5.5 17h2v2h-2z" />
    <path d="M10 14h8M10 18h5" />
  </Ico>
);
