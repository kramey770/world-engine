import { useState } from "react";

export type FantasyIconDefinition = {
  id: string;
  label: string;
  category: string;
  svg: React.ReactNode;
};

// All icons drawn at 32×32 viewBox, stroke-based, using currentColor
export const icons: FantasyIconDefinition[] = [
  // ── WRITING ──────────────────────────────────────────────────
  {
    id: "quill",
    label: "Quill",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M26 3C20 3 12 9 9 17L7 25l8-2c8-3 14-11 14-17 0-1.5-1.5-3-3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 3C22 7 18 12 14 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M9 17l-2 8 3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "tome",
    label: "Ancient Tome",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="6" y="4" width="18" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="4" x2="10" y2="28" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="13" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="13" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="13" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M15 22l1.5-3 1.5 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14.5" y1="21" x2="18.5" y2="21" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "scroll",
    label: "Scroll",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M9 6c0-1.7 1.3-3 3-3h14v20H12c-1.7 0-3 1.3-3 3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 23c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3h18c1.7 0 3-1.3 3-3H9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="13" y1="9" x2="22" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="13" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="13" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "inkwell",
    label: "Inkwell",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M10 14c0-3.3 2.7-6 6-6s6 2.7 6 6v8c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4v-8z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8V6M18 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="16" cy="19" rx="3" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M14 17c0-1.1.9-2 2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "manuscript",
    label: "Manuscript",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 4h14l5 5v19H7V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M21 4v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="11" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="11" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="11" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="11" y1="22" x2="18" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "feather",
    label: "Feather",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 28c4-4 8-8 8-16 0 0 8-4 12-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M28 4C22 6 16 10 14 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M20 8l-3 5M23 11l-4 4M25 15l-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M16 12c-2 4-5 8-8 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "edit",
    label: "Edit Draft",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M20 5l7 7L11 28H4v-7L20 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="17" y1="8" x2="24" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "typewriter",
    label: "Typewriter",
    category: "Writing",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="13" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 13V9a2 2 0 012-2h8a2 2 0 012 2v4" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="7" y="17" width="3" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="12" y="17" width="3" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="17" y="17" width="3" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="22" y="17" width="3" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="9" y="22" width="14" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="14" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },

  // ── WORLD BUILDING ───────────────────────────────────────────
  {
    id: "map",
    label: "World Map",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 6l8 3 8-3 8 3v17l-8-3-8 3-8-3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
        <line x1="20" y1="6" x2="20" y2="23" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
        <path d="M8 13c1.5 1 2.5 0 4 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <path d="M15 17c1 1.5 2 .5 3 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <circle cx="9" cy="18" r="1" fill="currentColor" opacity="0.5"/>
        <circle cx="22" cy="13" r="1" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "castle",
    label: "Castle",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="11" y="14" width="10" height="14" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="4" y="17" width="7" height="11" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="21" y="17" width="7" height="11" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 17V12h2v-3h1v3h2v-3h1v3h1v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M21 17V12h2v-3h1v3h2v-3h1v3h1v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 14V9h2V6h1v3h2V6h1v3h2v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 20a3 3 0 016 0" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "compass",
    label: "Compass",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
        <path d="M16 8l2.5 7.5L16 17.5l-2.5-2L16 8z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fillOpacity="0.15" fill="currentColor"/>
        <path d="M16 24l-2.5-7.5L16 14.5l2.5 2L16 24z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.35"/>
        <line x1="16" y1="4" x2="16" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="16" y1="26" x2="16" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="4" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="26" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "mountain",
    label: "Mountains",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M3 26L11 10l5 8 3-4 10 12H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 15l2 3M19 17l2 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M10 10l1 1.5M12 10l-1 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "dungeon",
    label: "Dungeon",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 28V12l12-8 12 8v16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 28h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 28v-8h6v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="7" y="16" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="20" y="16" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <line x1="16" y1="4" x2="16" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "tavern",
    label: "Tavern",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 16l12-12 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="5" y="16" width="22" height="12" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="13" y="20" width="6" height="8" stroke="currentColor" strokeWidth="1"/>
        <rect x="7" y="19" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <rect x="21" y="19" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M10 10l1.5 1.5M22 10l-1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "forest",
    label: "Forest",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4l5 8h-3l4 7h-4l4 7H10l4-7H10l4-7h-3l5-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="26" x2="16" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 18l3 8H6l4-8zM25 18l-3 8h4l-4-8z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "ruins",
    label: "Ancient Ruins",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="4" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="18" width="4" height="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 18V10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="14" width="4" height="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 14V7h4v7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M22 26V16h4v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="22" y1="13" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="7" x2="10" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "lighthouse",
    label: "Lighthouse",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M13 28V10l-2-3h10l-2 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="11" y1="28" x2="21" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="12" y="7" width="8" height="3" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="11" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="11" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <path d="M20 8l4-3M12 8l-4-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M22 10l3 2M10 10l-3 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "bridge",
    label: "Bridge",
    category: "World",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 20c3-6 7-8 12-8s9 2 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="20" x2="4" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="28" y1="20" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="14" x2="10" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
        <line x1="16" y1="12" x2="16" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
        <line x1="22" y1="14" x2="22" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
      </svg>
    ),
  },

  // ── CHARACTERS ───────────────────────────────────────────────
  {
    id: "character",
    label: "Character",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="9" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 28v-4c0-4.4 3.6-8 8-8s8 3.6 8 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "crown",
    label: "Crown",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 22h24V26H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 22L7 10l7 7 2-8 2 8 7-7 3 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
        <circle cx="7" cy="10" r="1.5" fill="currentColor"/>
        <circle cx="25" cy="10" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "mask",
    label: "Villain Mask",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 12c0-5.5 4.5-9 10-9s10 3.5 10 9c0 4-1.5 8-4 10l-6 3-6-3c-2.5-2-4-6-4-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 15c0 2 .9 3 2 3M22 15c0 2-.9 3-2 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <path d="M13 20c.5.7 1.5 1 3 1s2.5-.3 3-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <path d="M6 15H4M26 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "knight",
    label: "Knight Helm",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 16h20v4c0 4.4-3.6 8-8 8h-4c-4.4 0-8-3.6-8-8v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="6" y1="20" x2="26" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <line x1="6" y1="23" x2="26" y2="23" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <path d="M12 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="4" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "mage",
    label: "Mage Hat",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4L9 22h14L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M6 22h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="16" cy="23" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 10l1 1.5M22 13l1.5.5M19 8l.5-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "bard",
    label: "Bard / Lute",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M18 6l8 8-7 7c-3 3-7 3-9 1-2-2-2-6 1-9 2-2 5-3 7-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 20l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="6" x2="26" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="8" x2="28" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "rogue",
    label: "Rogue",
    category: "Characters",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 8c3-4 9-5 12-2l8 8-4 4L14 10c-1-1-3-1-4 1-2 2-1 5 1 6l4 4-4 4-8-8c-3-3-1-9 3-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="22" y1="18" x2="28" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="22" x2="20" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },

  // ── MAGIC ────────────────────────────────────────────────────
  {
    id: "wand",
    label: "Magic Wand",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="6" y1="26" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 5l.7 2.3L25 8l-2.3.7L22 11l-.7-2.3L19 8l2.3-.7L22 5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
        <path d="M27 14l.4 1.3 1.3.4-1.3.4-.4 1.3-.4-1.3-1.3-.4 1.3-.4L27 14z" fill="currentColor" opacity="0.55"/>
        <path d="M9 8l.35 1.1 1.1.35-1.1.35L9 11l-.35-1.1-1.1-.35 1.1-.35L9 8z" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "crystal-ball",
    label: "Crystal Ball",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 22h8l1 5H11l1-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 11c1-3 4-4 5-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <ellipse cx="13" cy="12" rx="2" ry="3" stroke="currentColor" strokeWidth="1" opacity="0.2" transform="rotate(-20 13 12)"/>
      </svg>
    ),
  },
  {
    id: "rune",
    label: "Rune Stone",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 3L29 10v12L16 29 3 22V10L16 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="9" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="9" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="9" x2="21" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="16" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "potion",
    label: "Potion",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M13 5h6v5l5 8c1.5 2.5 1 5-1 7-1 1-2.5 2-5 2h-4c-2.5 0-4-1-5-2-2-2-2.5-4.5-1-7l5-8V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="12" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 20c1 3 5 5 9 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <circle cx="13" cy="20" r="1" fill="currentColor" opacity="0.35"/>
        <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.25"/>
      </svg>
    ),
  },
  {
    id: "cauldron",
    label: "Cauldron",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 14h18c0 8-4 12-9 12S7 22 7 14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M5 14h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 14V11M22 14V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 11a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M13 10c0-2 1.5-4 3-4s3 2 3 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M14 19c1 2 4 2 4 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "amulet",
    label: "Amulet",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8c-3 1-6 5-6 9 0 6 4.5 10 10 10s10-4 10-10c0-4-3-8-6-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 19l3-5 3 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <line x1="13" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "spellbook",
    label: "Spell Book",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="5" y="4" width="18" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="9" y1="4" x2="9" y2="28" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 12l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7L16 12z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
        <line x1="13" y1="21" x2="20" y2="21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <line x1="13" y1="23" x2="18" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M23 6h4v20h-4" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: "hourglass",
    label: "Hourglass",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 4h16M8 28h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 4l7 10 7-10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 28l7-10 7 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="14" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <line x1="13" y1="23" x2="19" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: "crystal",
    label: "Crystal",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4l6 6-6 18-6-18 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 10h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <path d="M13 14l3 8 3-8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "eye",
    label: "All-Seeing Eye",
    category: "Magic",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 16c3-6 7-9 12-9s9 3 12 9c-3 6-7 9-12 9S7 22 4 16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
        <path d="M4 16l4-4M28 16l-4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
  },

  // ── GENRE & ATMOSPHERE ───────────────────────────────────────
  {
    id: "sword",
    label: "Sword",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="3" x2="16" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 19l6 5 6-5" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.35"/>
        <line x1="16" y1="24" x2="16" y2="29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M14 3l2 4 2-4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    id: "shield",
    label: "Shield",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 3L5 7v9c0 7 5 11 11 13 6-2 11-6 11-13V7L16 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 8l2.5 5h-5L16 8z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.55"/>
        <line x1="16" y1="13" x2="16" y2="21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <line x1="11" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "lantern",
    label: "Lantern",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 6h8l2 4v10l-2 4H12l-2-4V10l2-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <ellipse cx="16" cy="15" rx="3" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M10 6h12M10 24h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "moon-stars",
    label: "Moon & Stars",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M20 6a10 10 0 01-10 18A10 10 0 0020 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M24 4l.4 1.2 1.2.4-1.2.4-.4 1.2-.4-1.2-1.2-.4 1.2-.4L24 4z" fill="currentColor"/>
        <path d="M27 11l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3L27 11z" fill="currentColor" opacity="0.65"/>
        <path d="M22 18l.3.9.9.3-.9.3-.3.9-.3-.9-.9-.3.9-.3L22 18z" fill="currentColor" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "portal",
    label: "Portal",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="7" ry="11" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="16" cy="16" rx="7" ry="11" stroke="currentColor" strokeWidth="4" strokeOpacity="0.1"/>
        <ellipse cx="16" cy="16" rx="4" ry="7" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <path d="M9 10c-2-1-3-3-2-5M23 10c2-1 3-3 2-5M9 22c-2 1-3 3-2 5M23 22c2 1 3 3 2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "dragon",
    label: "Dragon",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 20c2-6 6-8 9-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 13c3-2 7-1 9 3 1 2 1 5-1 7-1 1-3 1-4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 23l-4 5M13 23l-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 16c2-1 4-3 4-5 0 0-2 1-3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 10c1-2 3-5 5-5 0 0-1 2-1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="21" cy="13" r="1" fill="currentColor"/>
        <path d="M4 20l-1 4 3-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "dagger",
    label: "Dagger",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 14-3 3-3-3L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="10" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 18v4h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "arrow",
    label: "Arrow",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="6" y1="26" x2="26" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 6h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 11l-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <path d="M6 26l3-1 1-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "skull",
    label: "Skull",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 18V14a8 8 0 0116 0v4c0 1-1 2-2 2H10c-1 0-2-1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 20v4h8v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="20" x2="16" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <circle cx="12" cy="15" r="2.5" stroke="currentColor" strokeWidth="1"/>
        <circle cx="20" cy="15" r="2.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    id: "key",
    label: "Skeleton Key",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="15.2" y1="15.2" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="21" y1="22" x2="24" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="25" x2="27" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "torch",
    label: "Torch",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="16" y1="14" x2="16" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="13" y="11" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4c-2 2-3 5-1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 4c2 2 3 5 1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 20l-2 2M20 20l2 2M12 24l-2 1M20 24l2 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: "ship",
    label: "Sailing Ship",
    category: "Genre",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 22H26l-3 5H9l-3-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="5" x2="16" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 5l8 9H16V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 10l-6 6h6" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.45"/>
        <path d="M4 25c3 1 5 1 8 0M20 25c3 1 5 1 8 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },

  // ── STORY / LORE ─────────────────────────────────────────────
  {
    id: "chapter",
    label: "Chapter",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="8" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 20l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "timeline",
    label: "Timeline",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="8" y1="13.5" x2="8" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
        <line x1="16" y1="18.5" x2="16" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
        <line x1="24" y1="13.5" x2="24" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "prophecy",
    label: "Prophecy",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4l2 5h5l-4 3 1.5 5L16 14l-4.5 3 1.5-5-4-3h5L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="17" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="22" x2="21" y2="22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "artifact",
    label: "Artifact",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4c6.6 0 12 5.4 12 12S22.6 28 16 28 4 22.6 4 16 9.4 4 16 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4v6M16 22v6M4 16h6M22 16h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <path d="M10 10l4.2 4.2M17.8 17.8L22 22M10 22l4.2-4.2M17.8 14.2L22 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "plotthread",
    label: "Plot Thread",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 8c4 0 8 8 10 8s6-8 10-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 16c4 0 8 8 10 8s6-8 10-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="6" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="26" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="6" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
        <circle cx="26" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "conflict",
    label: "Conflict",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "bookmark",
    label: "Bookmark",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M8 4h16v24l-8-5-8 5V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="12" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
        <line x1="12" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "lore-tag",
    label: "Lore Tag",
    category: "Story",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 4h12l12 12-12 12L4 16V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },

  // ── APP UI ───────────────────────────────────────────────────
  {
    id: "notes",
    label: "Lore Notes",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M7 5h18v22H7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 5V3M16 5V3M21 5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="11" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <line x1="11" y1="18" x2="17" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search Lore",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="20" y1="20" x2="27" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 11c1-2 3-3 5-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.8 7.8l2.1 2.1M22.1 22.1l2.1 2.1M7.8 24.2l2.1-2.1M22.1 9.9l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2.5" opacity="0.25"/>
      </svg>
    ),
  },
  {
    id: "export",
    label: "Export",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M20 4l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27 11H12c-3.3 0-6 2.7-6 6v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "home",
    label: "Home",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 16L16 4l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 13v15h6v-8h6v8h6V13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "lock",
    label: "Lock / Private",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="7" y="15" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 15v-4a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="21" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="16" y1="23" x2="16" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "star",
    label: "Favourite",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 8h8l-6.5 5 2.5 8L16 20l-7 5 2.5-8L5 12h8l3-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "folder",
    label: "Lore Folder",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M4 8h11l3 3h10v17H4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="4" y1="15" x2="28" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      </svg>
    ),
  },
  {
    id: "notification",
    label: "Alert",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 4a8 8 0 018 8v6l3 4H5l3-4v-6a8 8 0 018-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 22a3 3 0 006 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="23" cy="8" r="3" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "share",
    label: "Share",
    category: "App UI",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="24" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="26" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="11" y1="14.5" x2="21" y2="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="11" y1="17.5" x2="21" y2="24.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
];

const categories = ["All", ...Array.from(new Set(icons.map((i) => i.category)))];

// OKLCH values converted to CSS for use in React inline styles
// Foreground: oklch(0.145 0 0) ≈ #1a1a1a  Border: oklch(0.922 0 0) ≈ #e8e8e8
// Background: oklch(1 0 0) = white        Muted-fg: oklch(0.556 0 0) ≈ #787878
const C = {
  bg: "oklch(1 0 0)",
  fg: "oklch(0.145 0 0)",
  border: "oklch(0.922 0 0)",
  muted: "oklch(0.97 0 0)",
  mutedFg: "oklch(0.556 0 0)",
  primary: "oklch(0.205 0 0)",
  ring: "oklch(0.708 0 0)",
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [size, setSize] = useState(40);
  const [showDark, setShowDark] = useState(false);

  const filtered =
    activeCategory === "All"
      ? icons
      : icons.filter((i) => i.category === activeCategory);

  const bg = showDark ? C.primary : C.bg;
  const fg = showDark ? C.bg : C.fg;
  const border = showDark ? "oklch(0.3 0 0)" : C.border;
  const cardHover = showDark ? "oklch(0.28 0 0)" : C.muted;
  const pillActive = showDark ? C.bg : C.primary;
  const pillActiveFg = showDark ? C.primary : C.bg;

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{
        background: bg,
        color: fg,
        fontFamily: "'Cinzel', serif",
      }}
    >
      {/* Header */}
      <header
        className="border-b px-8 py-5 sticky top-0 z-10 backdrop-blur-sm"
        style={{ borderColor: border, background: bg + "e8" }}
      >
        <div className="max-w-6xl mx-auto flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs tracking-[0.28em] uppercase mb-1" style={{ color: showDark ? C.ring : C.mutedFg }}>
              Fantasy Fiction · World Building
            </p>
            <h1 className="text-2xl font-semibold leading-tight tracking-wide">
              Chronicles Icon Pack
            </h1>
            <p className="text-sm mt-0.5" style={{ color: showDark ? C.ring : C.mutedFg, fontFamily: "'Crimson Text', serif" }}>
              {icons.length} icons &mdash; 32&times;32 viewBox &mdash; stroke-based SVG
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark toggle */}
            <button
              onClick={() => setShowDark(!showDark)}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs tracking-widest border transition-all"
              style={{
                borderColor: border,
                background: showDark ? C.bg : "transparent",
                color: showDark ? C.primary : fg,
              }}
            >
              {showDark ? "Light" : "Dark"} Preview
            </button>
            {/* Size */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: showDark ? C.ring : C.mutedFg }}>Size</span>
              <input
                type="range"
                min={24}
                max={72}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-20"
                style={{ accentColor: fg }}
              />
              <span className="text-xs w-7" style={{ color: showDark ? C.ring : C.mutedFg }}>{size}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Category filter bar */}
      <div
        className="border-b px-8 py-3"
        style={{ borderColor: border }}
      >
        <div className="max-w-6xl mx-auto flex gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded text-xs tracking-widest border transition-all"
              style={{
                background: activeCategory === cat ? pillActive : "transparent",
                color: activeCategory === cat ? pillActiveFg : (showDark ? C.ring : C.mutedFg),
                borderColor: activeCategory === cat ? pillActive : border,
              }}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs self-center" style={{ color: showDark ? C.ring : C.mutedFg, fontFamily: "'Crimson Text', serif" }}>
            {filtered.length} shown
          </span>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-8 py-8">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}
        >
          {filtered.map((icon) => {
            const isCopied = copied === icon.id;
            return (
              <button
                key={icon.id}
                onClick={() => {
                  setCopied(icon.id);
                  setTimeout(() => setCopied(null), 1400);
                }}
                className="group flex flex-col items-center gap-2.5 p-4 rounded-md border transition-all duration-150 relative"
                style={{
                  background: isCopied ? cardHover : "transparent",
                  borderColor: isCopied ? (showDark ? C.ring : C.primary) : border,
                  color: fg,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = cardHover;
                  el.style.borderColor = showDark ? C.ring : C.primary + "55";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = isCopied ? cardHover : "transparent";
                  el.style.borderColor = isCopied ? (showDark ? C.ring : C.primary) : border;
                }}
              >
                {isCopied && (
                  <span
                    className="absolute top-1.5 right-1.5 text-xs px-1 py-px rounded tracking-widest"
                    style={{ background: fg, color: bg, fontSize: "0.55rem" }}
                  >
                    SVG
                  </span>
                )}

                <div style={{ width: size, height: size, color: fg, flexShrink: 0 }}>
                  {icon.svg}
                </div>

                <span
                  className="text-center leading-tight transition-opacity"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.07em",
                    color: showDark ? C.ring : C.mutedFg,
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  {icon.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
