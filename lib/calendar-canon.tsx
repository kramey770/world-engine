"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type CalendarType = "civil" | "religious" | "regnal" | "agricultural" | "astronomical" | "other"
export type CalendarStatus = "active" | "historical" | "reformed" | "deprecated" | "contested" | "unknown"
export type CalendarPrecision = "exact" | "approximate" | "range" | "unknown" | "disputed" | "relative"

export const CALENDAR_TYPES: { id: CalendarType; label: string }[] = [
  { id: "civil", label: "Civil" },
  { id: "religious", label: "Religious" },
  { id: "regnal", label: "Regnal" },
  { id: "agricultural", label: "Agricultural" },
  { id: "astronomical", label: "Astronomical" },
  { id: "other", label: "Other" },
]

export const CALENDAR_STATUSES: { id: CalendarStatus; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "historical", label: "Historical" },
  { id: "reformed", label: "Reformed" },
  { id: "deprecated", label: "Deprecated" },
  { id: "contested", label: "Contested" },
  { id: "unknown", label: "Unknown" },
]

export const CALENDAR_PRECISIONS: { id: CalendarPrecision; label: string }[] = [
  { id: "exact", label: "Exact" },
  { id: "approximate", label: "Approximate" },
  { id: "range", label: "Range" },
  { id: "unknown", label: "Unknown" },
  { id: "disputed", label: "Disputed" },
  { id: "relative", label: "Relative" },
]

export function calendarTypeLabel(type: CalendarType | string): string {
  return CALENDAR_TYPES.find((option) => option.id === type)?.label ?? type
}

export function calendarStatusLabel(status: CalendarStatus | string): string {
  return CALENDAR_STATUSES.find((option) => option.id === status)?.label ?? status
}

export type CanonCalendar = {
  id: string
  createdAt: number
  name: string
  type: CalendarType
  status: CalendarStatus
  image?: string
  summary?: string
  description?: string
  scope?: string
  owningCulture?: string
  owningReligion?: string
  institution?: string
  region?: string
  language?: string
  script?: string
  activePeriod?: string
  predecessorId?: string
  successorId?: string
  purpose?: string
  sources?: string
  confidence?: string
  notes?: string
  epochAnchor?: string
  yearDirection?: string
  yearZero?: string
  eras?: string
  regnalConvention?: string
  yearStart?: string
  reformHistory?: string
  absoluteAnchor?: string
  units?: string
  leapRules?: string
  boundaryRules?: string
  naturalMarkers?: string
  observances?: string
  variants?: string
  conversions?: string
}

export type CalendarEdit = Partial<Omit<CanonCalendar, "id" | "createdAt">>

type CalendarCanonContextValue = {
  calendars: Record<string, CanonCalendar>
  getCalendar: (id: string | null | undefined) => CanonCalendar | null
  updateCalendar: (id: string, patch: CalendarEdit) => void
  addCalendar: (patch: CalendarEdit) => string
}

const CalendarCanonContext = createContext<CalendarCanonContextValue | null>(null)
const STORAGE_KEY = "world-engine-calendar-canon"

function makeId(name: string, existing: Record<string, CanonCalendar>): string {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "calendar"
  let id = base
  let suffix = 2
  while (existing[id]) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

const seedCalendars: Record<string, CanonCalendar> = {
  "the-solar-calendar": {
    id: "the-solar-calendar",
    createdAt: 1,
    name: "The Solar Calendar",
    type: "civil",
    status: "active",
    summary: "A dependable civil reckoning of years, seasons, and civic rites used across the wider realm.",
    description: "The Solar Calendar organizes daily life into a balanced year with a recognized new year and a recurring seasonal structure. It is intended to be legible to administrators, merchants, and common households alike.",
    scope: "Pan-regional civil and administrative use",
    owningCulture: "The Concord of River Cities",
    region: "Lower basin and trade routes",
    language: "Common speech",
    script: "Civic script",
    purpose: "Civil administration and public ordering",
    activePeriod: "Established in the early years of the river confederacies and still in use",
    yearDirection: "increasing",
    yearZero: "No year zero; the year count begins at 1",
    eras: "The calendar uses the Age of the Concord as its principal civil era. Other named periods include the Age of the River Houses and the Age of the Founders.",
    yearStart: "The first day of the first month after the river thaw",
    reformHistory: "The current form was standardized after a 40-year series of local reforms.",
    absoluteAnchor: "The year count is anchored to the founding of the river confederacies and is not tied to a planetary ephemeris.",
    units: "12 months, 7-day weeks, 365 days with a leap-day correction every four years",
    leapRules: "One intercalary day is inserted after the final month in years divisible by four, with exceptions for century years not divisible by 400.",
    boundaryRules: "The new year begins at dawn after the thaw, with local communities still observing older local starts in ritual practice.",
    naturalMarkers: "The spring thaw, harvest moon, and the solstice are observed as civic markers, but the calendar is not dependent on precise astronomical prediction.",
    observances: "The First Bell, the River Blessing, and the Lantern Day are observed by civic communities.",
    variants: "Coastal guilds and mountain markets use local adjustments for festival timing and market weeks.",
    conversions: "The Solar Calendar is often converted to older lunar reckoning by local scribes using a negotiated table of corresponding months.",
    sources: "Civic ledgers, temple calendars, and the Concord Records",
    confidence: "High",
    notes: "This is a practical civil system rather than a mathematically exact astronomical one.",
  },
}

export function CalendarCanonProvider({ children }: { children: ReactNode }) {
  const [calendars, setCalendars] = useState<Record<string, CanonCalendar>>(() => {
    const demoCalendars = { ...seedCalendars, ...(redRisingDemo.calendars as unknown as Record<string, CanonCalendar>) }
    if (typeof window === "undefined") return Object.fromEntries(Object.entries(demoCalendars).map(([id, record]) => [id, { ...record, image: record.image ?? redRisingImage("calendar", id) }]))
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) return Object.fromEntries(Object.entries(demoCalendars).map(([id, record]) => [id, { ...record, image: record.image ?? redRisingImage("calendar", id) }]))
      const parsed = JSON.parse(saved) as Record<string, CanonCalendar>
      return parsed && Object.keys(parsed).length > 0 ? parsed : Object.fromEntries(Object.entries(demoCalendars).map(([id, record]) => [id, { ...record, image: record.image ?? redRisingImage("calendar", id) }]))
    } catch {
      return Object.fromEntries(Object.entries(demoCalendars).map(([id, record]) => [id, { ...record, image: record.image ?? redRisingImage("calendar", id) }]))
    }
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(calendars))
    }
  }, [calendars])

  const getCalendar = useCallback(
    (id: string | null | undefined): CanonCalendar | null => (id ? calendars[id] ?? null : null),
    [calendars],
  )

  const updateCalendar = useCallback((id: string, patch: CalendarEdit) => {
    setCalendars((previous) => {
      const existing = previous[id]
      if (!existing) return previous
      return { ...previous, [id]: { ...existing, ...patch } }
    })
  }, [])

  const addCalendar = useCallback((patch: CalendarEdit): string => {
    const name = patch.name?.trim() || "Unnamed Calendar"
    let newId = ""
    setCalendars((previous) => {
      newId = makeId(name, previous)
      return {
        ...previous,
        [newId]: {
          id: newId,
          createdAt: Date.now(),
          name,
          type: patch.type ?? "civil",
          status: patch.status ?? "unknown",
          ...patch,
        },
      }
    })
    return newId
  }, [])

  const value = useMemo(() => ({ calendars, getCalendar, updateCalendar, addCalendar }), [calendars, getCalendar, updateCalendar, addCalendar])

  return <CalendarCanonContext.Provider value={value}>{children}</CalendarCanonContext.Provider>
}

export function useCalendarCanon() {
  const context = useContext(CalendarCanonContext)
  if (!context) throw new Error("useCalendarCanon must be used within a CalendarCanonProvider")
  return context
}
