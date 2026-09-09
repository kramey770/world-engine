"use client"

import { useCallback, useEffect, useState } from "react"
import { Clock3, Pencil } from "lucide-react"
import { CanonRecordHeader } from "@/components/world/canon-record-header"
import {
  CALENDAR_STATUSES,
  CALENDAR_TYPES,
  calendarStatusLabel,
  calendarTypeLabel,
  useCalendarCanon,
  type CalendarEdit,
  type CalendarStatus,
  type CalendarType,
  type CanonCalendar,
} from "@/lib/calendar-canon"
import { cn } from "@/lib/utils"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
const areaClass = cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</section>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return <Section title={label}><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{value}</p></Section>
}

type Draft = {
  name: string
  type: CalendarType
  status: CalendarStatus
  image: string
  summary: string
  description: string
  scope: string
  owningCulture: string
  owningReligion: string
  institution: string
  region: string
  language: string
  script: string
  activePeriod: string
  predecessorId: string
  successorId: string
  purpose: string
  sources: string
  confidence: string
  notes: string
  epochAnchor: string
  yearDirection: string
  yearZero: string
  eras: string
  regnalConvention: string
  yearStart: string
  reformHistory: string
  absoluteAnchor: string
  units: string
  leapRules: string
  boundaryRules: string
  naturalMarkers: string
  observances: string
  variants: string
  conversions: string
}

const EMPTY_DRAFT: Draft = {
  name: "",
  type: "civil",
  status: "active",
  image: "",
  summary: "",
  description: "",
  scope: "",
  owningCulture: "",
  owningReligion: "",
  institution: "",
  region: "",
  language: "",
  script: "",
  activePeriod: "",
  predecessorId: "",
  successorId: "",
  purpose: "",
  sources: "",
  confidence: "",
  notes: "",
  epochAnchor: "",
  yearDirection: "",
  yearZero: "",
  eras: "",
  regnalConvention: "",
  yearStart: "",
  reformHistory: "",
  absoluteAnchor: "",
  units: "",
  leapRules: "",
  boundaryRules: "",
  naturalMarkers: "",
  observances: "",
  variants: "",
  conversions: "",
}

function toDraft(calendar: CanonCalendar): Draft {
  return {
    ...EMPTY_DRAFT,
    name: calendar.name,
    type: calendar.type ?? "civil",
    status: calendar.status ?? "active",
    image: calendar.image ?? "",
    summary: calendar.summary ?? "",
    description: calendar.description ?? "",
    scope: calendar.scope ?? "",
    owningCulture: calendar.owningCulture ?? "",
    owningReligion: calendar.owningReligion ?? "",
    institution: calendar.institution ?? "",
    region: calendar.region ?? "",
    language: calendar.language ?? "",
    script: calendar.script ?? "",
    activePeriod: calendar.activePeriod ?? "",
    predecessorId: calendar.predecessorId ?? "",
    successorId: calendar.successorId ?? "",
    purpose: calendar.purpose ?? "",
    sources: calendar.sources ?? "",
    confidence: calendar.confidence ?? "",
    notes: calendar.notes ?? "",
    epochAnchor: calendar.epochAnchor ?? "",
    yearDirection: calendar.yearDirection ?? "",
    yearZero: calendar.yearZero ?? "",
    eras: calendar.eras ?? "",
    regnalConvention: calendar.regnalConvention ?? "",
    yearStart: calendar.yearStart ?? "",
    reformHistory: calendar.reformHistory ?? "",
    absoluteAnchor: calendar.absoluteAnchor ?? "",
    units: calendar.units ?? "",
    leapRules: calendar.leapRules ?? "",
    boundaryRules: calendar.boundaryRules ?? "",
    naturalMarkers: calendar.naturalMarkers ?? "",
    observances: calendar.observances ?? "",
    variants: calendar.variants ?? "",
    conversions: calendar.conversions ?? "",
  }
}

function clean(value: string) {
  return value.trim() || undefined
}

function draftToPatch(draft: Draft): CalendarEdit {
  return {
    name: draft.name.trim() || "Unnamed Calendar",
    type: draft.type,
    status: draft.status,
    image: draft.image || undefined,
    summary: clean(draft.summary),
    description: clean(draft.description),
    scope: clean(draft.scope),
    owningCulture: clean(draft.owningCulture),
    owningReligion: clean(draft.owningReligion),
    institution: clean(draft.institution),
    region: clean(draft.region),
    language: clean(draft.language),
    script: clean(draft.script),
    activePeriod: clean(draft.activePeriod),
    predecessorId: clean(draft.predecessorId),
    successorId: clean(draft.successorId),
    purpose: clean(draft.purpose),
    sources: clean(draft.sources),
    confidence: clean(draft.confidence),
    notes: clean(draft.notes),
    epochAnchor: clean(draft.epochAnchor),
    yearDirection: clean(draft.yearDirection),
    yearZero: clean(draft.yearZero),
    eras: clean(draft.eras),
    regnalConvention: clean(draft.regnalConvention),
    yearStart: clean(draft.yearStart),
    reformHistory: clean(draft.reformHistory),
    absoluteAnchor: clean(draft.absoluteAnchor),
    units: clean(draft.units),
    leapRules: clean(draft.leapRules),
    boundaryRules: clean(draft.boundaryRules),
    naturalMarkers: clean(draft.naturalMarkers),
    observances: clean(draft.observances),
    variants: clean(draft.variants),
    conversions: clean(draft.conversions),
  }
}

function CalendarFields({ draft, update }: { draft: Draft; update: (patch: Partial<Draft>) => void }) {
  const field = (key: keyof Draft, label: string, placeholder: string) => (
    <Field label={label}>
      <textarea
        className={cn(areaClass, "min-h-20")}
        value={String(draft[key] ?? "")}
        placeholder={placeholder}
        onChange={(event) => update({ [key]: event.target.value })}
      />
    </Field>
  )

  return (
    <>
      <Section title="Identity">
        <div className="flex flex-col gap-3">
          <Field label="Name"><input autoFocus className={inputClass} value={draft.name} placeholder="e.g. The Solar Calendar" onChange={(event) => update({ name: event.target.value })} /></Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Calendar Type"><select className={inputClass} value={draft.type} onChange={(event) => update({ type: event.target.value as CalendarType })}>{CALENDAR_TYPES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>
            <Field label="Status"><select className={inputClass} value={draft.status} onChange={(event) => update({ status: event.target.value as CalendarStatus })}>{CALENDAR_STATUSES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>
          </div>
          <Field label="Summary"><input className={inputClass} value={draft.summary} placeholder="One-line definition of this calendar" onChange={(event) => update({ summary: event.target.value })} /></Field>
          <Field label="Scope and Users"><input className={inputClass} value={draft.scope} placeholder="Region, culture, or institution using this calendar" onChange={(event) => update({ scope: event.target.value })} /></Field>
        </div>
      </Section>

      <Section title="Scope & Identity">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Owning Culture"><input className={inputClass} value={draft.owningCulture} onChange={(event) => update({ owningCulture: event.target.value })} /></Field>
          <Field label="Owning Religion"><input className={inputClass} value={draft.owningReligion} onChange={(event) => update({ owningReligion: event.target.value })} /></Field>
          <Field label="Institution"><input className={inputClass} value={draft.institution} onChange={(event) => update({ institution: event.target.value })} /></Field>
          <Field label="Region"><input className={inputClass} value={draft.region} onChange={(event) => update({ region: event.target.value })} /></Field>
          <Field label="Language"><input className={inputClass} value={draft.language} onChange={(event) => update({ language: event.target.value })} /></Field>
          <Field label="Script"><input className={inputClass} value={draft.script} onChange={(event) => update({ script: event.target.value })} /></Field>
        </div>
      </Section>

      {field("description", "Canonical Description", "What this calendar is, how it is used, and why it matters")}
      {field("purpose", "Purpose", "Civil, religious, economic, agricultural, regnal, or other intent")}
      {field("activePeriod", "Active Period", "When it is or was used and any notable range")}
      {field("predecessorId", "Predecessor Calendar", "Record ID or prior calendar name if relevant")}
      {field("successorId", "Successor Calendar", "Record ID or later calendar name if relevant")}
      {field("confidence", "Confidence", "How strongly this is established or documented")}
      {field("sources", "Sources & References", "Source notes, archives, sacred texts, and related records")}

      <Section title="Epoch & Year Rules">
        <div className="flex flex-col gap-3">
          {field("epochAnchor", "Epoch Anchor", "The event or moment the calendar begins from")}
          {field("yearDirection", "Year Direction", "Increasing, decreasing, regnal, or era-based notation")}
          {field("yearZero", "Year Zero Behavior", "Whether the system counts from 1, 0, or uses a special convention")}
          {field("eras", "Eras & Ages", "Named eras, dynasties, or historical divisions")}
          {field("regnalConvention", "Regnal or Dynastic Numbering", "How rulers, dynasties, reigns, and numbered years are tracked")}
          {field("yearStart", "Year Start", "Where a year begins in the seasonal or civic cycle")}
          {field("reformHistory", "Reforms & Historical Changes", "Changes, resets, and transitions between versions")}
          {field("absoluteAnchor", "Absolute Anchor or Computable Basis", "Whether the calendar can be anchored to a known historical point")}
        </div>
      </Section>

      <Section title="Units & Cycles">
        <div className="flex flex-col gap-3">
          {field("units", "Unit Structure", "Years, months, weeks, days, seasons, cycles, and intercalary units")}
          {field("leapRules", "Leap & Intercalary Rules", "How extra days or months are inserted or skipped")}
          {field("boundaryRules", "Boundary & Local Rules", "Day starts, month boundaries, local variants, and administrative timing")}
          {field("naturalMarkers", "Natural & Astronomical Markers", "Seasons, solstices, harvests, lunar cycles, tides, or other relevant markers")}
        </div>
      </Section>

      <Section title="Observances & Variants">
        <div className="flex flex-col gap-3">
          {field("observances", "Observances & Ritual Dates", "Religious, civic, or seasonal observances and their place in the calendar")}
          {field("variants", "Regional Variants", "Cultural, local, disputed, or alternative interpretations")}
          {field("conversions", "Conversion Notes", "How this calendar relates to others and what conversions are approximate or unresolved")}
          {field("notes", "Additional Notes", "Uncertainty, disputed conventions, or canon details that do not fit elsewhere")}
        </div>
      </Section>
    </>
  )
}

export function CalendarCanonRecord({ calendarId, className }: { calendarId: string | null; className?: string }) {
  const { getCalendar, updateCalendar } = useCalendarCanon()
  const calendar = getCalendar(calendarId)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)

  useEffect(() => { setMode("view") }, [calendarId])
  useEffect(() => { if (mode === "edit" && calendar) setDraft(toDraft(calendar)) }, [calendar, mode])

  const save = useCallback(() => {
    if (calendar && draft) updateCalendar(calendar.id, draftToPatch(draft))
    setMode("view")
  }, [calendar, draft, updateCalendar])

  if (!calendar) return null

  const changeImage = (image: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, image })
    else updateCalendar(calendar.id, { image: image || undefined })
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <CanonRecordHeader
          recordId={`calendar:${calendar.id}`}
          title={calendar.name}
          summary={calendar.summary}
          identityImage={draft?.image ?? calendar.image ?? ""}
          identityAlt={`${calendar.name} symbol`}
          identityFallback={<Clock3 className="size-7 text-primary/50" />}
          onIdentityChange={changeImage}
        />
        {mode === "view" ? (
          <div className="flex flex-col gap-6 p-4">
            <button onClick={() => setMode("edit")} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"><Pencil className="size-3.5" />Edit Calendar</button>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary"><Clock3 className="size-3" />{calendarTypeLabel(calendar.type)}</span>
              <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">{calendarStatusLabel(calendar.status)}</span>
            </div>
            <ReadOnlyField label="Canonical Description" value={calendar.description} />
            <ReadOnlyField label="Scope and Users" value={calendar.scope} />
            <ReadOnlyField label="Owning Culture" value={calendar.owningCulture} />
            <ReadOnlyField label="Owning Religion" value={calendar.owningReligion} />
            <ReadOnlyField label="Institution" value={calendar.institution} />
            <ReadOnlyField label="Region" value={calendar.region} />
            <ReadOnlyField label="Language" value={calendar.language} />
            <ReadOnlyField label="Script" value={calendar.script} />
            <ReadOnlyField label="Purpose" value={calendar.purpose} />
            <ReadOnlyField label="Active Period" value={calendar.activePeriod} />
            <ReadOnlyField label="Epoch Anchor" value={calendar.epochAnchor} />
            <ReadOnlyField label="Year Direction" value={calendar.yearDirection} />
            <ReadOnlyField label="Year Zero Behavior" value={calendar.yearZero} />
            <ReadOnlyField label="Eras & Ages" value={calendar.eras} />
            <ReadOnlyField label="Regnal or Dynastic Numbering" value={calendar.regnalConvention} />
            <ReadOnlyField label="Year Start" value={calendar.yearStart} />
            <ReadOnlyField label="Reforms & Historical Changes" value={calendar.reformHistory} />
            <ReadOnlyField label="Absolute Anchor or Computable Basis" value={calendar.absoluteAnchor} />
            <ReadOnlyField label="Unit Structure" value={calendar.units} />
            <ReadOnlyField label="Leap & Intercalary Rules" value={calendar.leapRules} />
            <ReadOnlyField label="Boundary & Local Rules" value={calendar.boundaryRules} />
            <ReadOnlyField label="Natural & Astronomical Markers" value={calendar.naturalMarkers} />
            <ReadOnlyField label="Observances & Ritual Dates" value={calendar.observances} />
            <ReadOnlyField label="Regional Variants" value={calendar.variants} />
            <ReadOnlyField label="Conversion Notes" value={calendar.conversions} />
            <ReadOnlyField label="Sources & References" value={calendar.sources} />
            <ReadOnlyField label="Confidence" value={calendar.confidence} />
            <ReadOnlyField label="Additional Notes" value={calendar.notes} />
          </div>
        ) : draft && (
          <div className="flex flex-col gap-6 p-4">
            <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">This is the authoritative calendar record for {calendar.name}. Changes here update every view that reads it.</p>
            <CalendarFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} />
          </div>
        )}
      </div>
      {mode === "edit" && <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={() => setMode("view")} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</button><button onClick={save} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]">Save Changes</button></div>}
    </div>
  )
}

export function CalendarCreateForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const { addCalendar } = useCalendarCanon()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const create = useCallback(() => onCreated(addCalendar(draftToPatch(draft))), [addCalendar, draft, onCreated])

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border bg-sidebar/40 px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Clock3 className="size-4.5" /></span>
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">New Calendar</h2>
          <p className="text-xs text-muted-foreground">Establish the canon record. Deeper rules and variants can be added as the calendar matures.</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4"><CalendarFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} /></div>
      <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</button><button onClick={create} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]">Create Calendar</button></div>
    </div>
  )
}
