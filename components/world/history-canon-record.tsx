"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Landmark, Pencil } from "lucide-react"
import { CanonImageField } from "@/components/world/canon-image-field"
import {
  CHRONOLOGICAL_PRECISIONS,
  DISCOVERY_AWARENESS,
  DURATION_TYPES,
  HISTORY_TYPES,
  IMPORTANCE_LEVELS,
  RELEVANCE_LEVELS,
  useHistoryCanon,
  type CanonHistory,
  type ChronologicalPrecision,
  type DiscoveryAwareness,
  type DurationType,
  type HistoryEdit,
  type HistoryEntityReference,
  type HistoryType,
  type Importance,
  type Relevance,
} from "@/lib/history-canon"
import { useCharacterCanon } from "@/lib/character-canon"
import { useConceptCanon } from "@/lib/concept-canon"
import { useCultureCanon } from "@/lib/culture-canon"
import { useLocationCanon } from "@/lib/location-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { useReligionCanon } from "@/lib/religion-canon"
import { cn } from "@/lib/utils"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

type EntityOption = HistoryEntityReference & { label: string; category: string }

type Draft = {
  name: string
  image: string
  summary: string
  type: HistoryType
  typeOther: string
  chronology: string
  occurrence: string
  end: string
  duration: string
  durationType: DurationType | ""
  durationTypeOther: string
  chronologicalPrecision: ChronologicalPrecision | ""
  eraId: string
  era: string
  historicalContext: string
  causes: string
  preconditions: string
  development: string
  turningPoint: string
  participants: HistoryEntityReference[]
  primaryParticipants: HistoryEntityReference[]
  outcome: string
  immediateConsequences: string
  longTermConsequences: string
  importanceLevel: Importance | ""
  relevanceLevel: Relevance | ""
  discoveryAwareness: DiscoveryAwareness | ""
  discoveryAwarenessOther: string
  discoveryTime: string
  historicalEvidence: string
  narrativeOrder: string
  additionalInformation: string
}

const EMPTY_DRAFT: Draft = {
  name: "",
  image: "",
  summary: "",
  type: "event",
  typeOther: "",
  chronology: "0",
  occurrence: "",
  end: "",
  duration: "",
  durationType: "",
  durationTypeOther: "",
  chronologicalPrecision: "",
  eraId: "",
  era: "",
  historicalContext: "",
  causes: "",
  preconditions: "",
  development: "",
  turningPoint: "",
  participants: [],
  primaryParticipants: [],
  outcome: "",
  immediateConsequences: "",
  longTermConsequences: "",
  importanceLevel: "",
  relevanceLevel: "",
  discoveryAwareness: "",
  discoveryAwarenessOther: "",
  discoveryTime: "",
  historicalEvidence: "",
  narrativeOrder: "",
  additionalInformation: "",
}

function toDraft(history: CanonHistory): Draft {
  return {
    ...EMPTY_DRAFT,
    name: history.name,
    image: history.image ?? "",
    summary: history.summary ?? "",
    type: history.type ?? "event",
    typeOther: history.typeOther ?? "",
    chronology: String(history.chronology),
    occurrence: history.occurrence ?? "",
    end: history.end ?? "",
    duration: history.duration ?? "",
    durationType: history.durationType ?? "",
    durationTypeOther: history.durationTypeOther ?? "",
    chronologicalPrecision: history.chronologicalPrecision ?? "",
    eraId: history.eraId ?? "",
    era: history.era ?? "",
    historicalContext: history.historicalContext ?? "",
    causes: history.causes ?? "",
    preconditions: history.preconditions ?? "",
    development: history.development ?? "",
    turningPoint: history.turningPoint ?? "",
    participants: history.participants ?? [],
    primaryParticipants: history.primaryParticipants ?? [],
    outcome: history.outcome ?? "",
    immediateConsequences: history.immediateConsequences ?? "",
    longTermConsequences: history.longTermConsequences ?? "",
    importanceLevel: history.importanceLevel ?? "",
    relevanceLevel: history.relevanceLevel ?? "",
    discoveryAwareness: history.discoveryAwareness ?? "",
    discoveryAwarenessOther: history.discoveryAwarenessOther ?? "",
    discoveryTime: history.discoveryTime ?? "",
    historicalEvidence: history.historicalEvidence ?? "",
    narrativeOrder: history.narrativeOrder === undefined ? "" : String(history.narrativeOrder),
    additionalInformation: history.additionalInformation ?? "",
  }
}

function clean(value: string) {
  return value.trim() || undefined
}

function draftToPatch(draft: Draft): HistoryEdit {
  const chronology = Number(draft.chronology)
  const narrativeOrder = draft.narrativeOrder.trim() ? Number(draft.narrativeOrder) : undefined
  return {
    name: draft.name.trim() || "Unnamed History",
    image: draft.image || undefined,
    summary: clean(draft.summary),
    type: draft.type,
    typeOther: draft.type === "other" ? clean(draft.typeOther) : undefined,
    chronology: Number.isFinite(chronology) ? chronology : 0,
    occurrence: clean(draft.occurrence),
    end: clean(draft.end),
    duration: clean(draft.duration),
    durationType: draft.durationType || undefined,
    durationTypeOther: draft.durationType === "other" ? clean(draft.durationTypeOther) : undefined,
    chronologicalPrecision: draft.chronologicalPrecision || undefined,
    eraId: draft.eraId || undefined,
    era: clean(draft.era),
    historicalContext: clean(draft.historicalContext),
    causes: clean(draft.causes),
    preconditions: clean(draft.preconditions),
    development: clean(draft.development),
    turningPoint: clean(draft.turningPoint),
    participants: draft.participants.length ? draft.participants : undefined,
    primaryParticipants: draft.primaryParticipants.length ? draft.primaryParticipants : undefined,
    outcome: clean(draft.outcome),
    immediateConsequences: clean(draft.immediateConsequences),
    longTermConsequences: clean(draft.longTermConsequences),
    importanceLevel: draft.importanceLevel || undefined,
    relevanceLevel: draft.relevanceLevel || undefined,
    discoveryAwareness: draft.discoveryAwareness || undefined,
    discoveryAwarenessOther: draft.discoveryAwareness === "other" ? clean(draft.discoveryAwarenessOther) : undefined,
    discoveryTime: clean(draft.discoveryTime),
    historicalEvidence: clean(draft.historicalEvidence),
    narrativeOrder: Number.isFinite(narrativeOrder) ? narrativeOrder : undefined,
    additionalInformation: clean(draft.additionalInformation),
  }
}

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

function displayLabel(options: readonly { id: string; label: string }[], value?: string, custom?: string) {
  if (!value) return undefined
  if (value === "other" && custom) return custom
  return options.find((option) => option.id === value)?.label ?? value
}

function entityKey(entity: HistoryEntityReference) {
  return `${entity.entityType}:${entity.entityId}`
}

function EntityPicker({ label, selected, options, onChange }: { label: string; selected: HistoryEntityReference[]; options: EntityOption[]; onChange: (value: HistoryEntityReference[]) => void }) {
  const selectedKeys = new Set(selected.map(entityKey))
  const toggle = (option: EntityOption) => {
    const key = entityKey(option)
    onChange(selectedKeys.has(key) ? selected.filter((entity) => entityKey(entity) !== key) : [...selected, option])
  }
  return <div><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span><div className="mt-1 max-h-44 overflow-y-auto rounded-lg border border-border bg-background p-2">{options.length ? options.map((option) => <label key={entityKey(option)} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"><input type="checkbox" checked={selectedKeys.has(entityKey(option))} onChange={() => toggle(option)} className="accent-primary" />{option.label}<span className="ml-auto text-[10px] text-muted-foreground">{option.category}</span></label>) : <p className="px-2 py-2 text-xs text-muted-foreground">No existing Canon entities available.</p>}</div></div>
}

export function HistoryCanonRecord({ historyId, onCreated, onCancel, className }: { historyId: string | null; onCreated?: (id: string) => void; onCancel?: () => void; className?: string }) {
  const { histories, getHistory, updateHistory, addHistory } = useHistoryCanon()
  const { characters } = useCharacterCanon()
  const { locations } = useLocationCanon()
  const { religions } = useReligionCanon()
  const { organizations } = useOrganizationCanon()
  const { cultures } = useCultureCanon()
  const { concepts } = useConceptCanon()
  const history = historyId ? getHistory(historyId) : null
  const isCreate = historyId === null
  const [mode, setMode] = useState<"view" | "edit">(isCreate ? "edit" : "view")
  const [draft, setDraft] = useState<Draft | null>(isCreate ? { ...EMPTY_DRAFT } : null)
  const contentRef = useRef<HTMLDivElement>(null)
  const entityOptions = useMemo<EntityOption[]>(() => [
    ...Object.values(characters).map((record) => ({ entityType: "character" as const, entityId: record.id, label: record.name, category: "Character" })),
    ...Object.values(locations).map((record) => ({ entityType: "location" as const, entityId: record.id, label: record.name, category: "Location" })),
    ...Object.values(religions).map((record) => ({ entityType: "religion" as const, entityId: record.id, label: record.name, category: "Religion" })),
    ...Object.values(organizations).map((record) => ({ entityType: "organization" as const, entityId: record.id, label: record.name, category: "Organization" })),
    ...Object.values(cultures).map((record) => ({ entityType: "culture" as const, entityId: record.id, label: record.name, category: "Culture" })),
    ...Object.values(concepts).map((record) => ({ entityType: "concept" as const, entityId: record.id, label: record.name, category: "Concept" })),
  ], [characters, concepts, cultures, locations, organizations, religions])
  const eras = useMemo(() => Object.values(histories).filter((record) => record.type === "era" && record.id !== historyId), [histories, historyId])

  useEffect(() => {
    setMode(isCreate ? "edit" : "view")
    setDraft(isCreate ? { ...EMPTY_DRAFT } : null)
    contentRef.current?.scrollTo({ top: 0 })
  }, [historyId, isCreate])

  useEffect(() => {
    if (mode === "edit" && history && !isCreate) setDraft(toDraft(history))
  }, [history, isCreate, mode])

  const update = (patch: Partial<Draft>) => setDraft((previous) => (previous ? { ...previous, ...patch } : previous))
  const save = useCallback(() => {
    if (!draft) return
    const patch = draftToPatch(draft)
    if (isCreate) {
      const id = addHistory(patch)
      onCreated?.(id)
    } else if (history) {
      updateHistory(history.id, patch)
      setMode("view")
    }
  }, [addHistory, draft, history, isCreate, onCreated, updateHistory])

  if (!isCreate && !history) return null
  const current = history ?? ({ ...EMPTY_DRAFT, id: "draft", name: draft?.name || "New History" } as unknown as CanonHistory)
  const resolvedEntities = (references?: HistoryEntityReference[]) => references?.map((reference) => entityOptions.find((option) => entityKey(option) === entityKey(reference))?.label ?? reference.entityId).join(", ")
  const selectedEra = draft?.eraId ? eras.find((era) => era.id === draft.eraId) : undefined

  return <div className={cn("flex min-h-0 flex-col", className)}><div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
    <div className="group relative aspect-[3/2] w-full overflow-hidden bg-muted">{current.image ? <Image src={current.image} alt={`Artwork for ${current.name}`} fill sizes="672px" className="object-cover" /> : <div className="flex size-full items-center justify-center text-muted-foreground"><Landmark className="size-10" /></div>}<CanonImageField value={draft?.image ?? current.image ?? ""} onChange={(image) => update({ image })} /><div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-4"><h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">{current.name}</h2>{current.summary && <p className="mt-0.5 text-sm text-muted-foreground">{current.summary}</p>}</div></div>
    {mode === "view" ? <div className="flex flex-col gap-6 p-4"><button onClick={() => setMode("edit")} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"><Pencil className="size-3.5" />Edit History</button>
      <div className="flex flex-wrap gap-2">{displayLabel(HISTORY_TYPES, current.type, current.typeOther) && <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">{displayLabel(HISTORY_TYPES, current.type, current.typeOther)}</span>}{displayLabel(DURATION_TYPES, current.durationType, current.durationTypeOther) && <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{displayLabel(DURATION_TYPES, current.durationType, current.durationTypeOther)}</span>}</div>
      <Section title="Chronology"><div className="grid gap-4 sm:grid-cols-2"><ReadOnlyField label="Start / Occurrence" value={current.occurrence} /><ReadOnlyField label="End" value={current.end} /><ReadOnlyField label="Chronological Precision" value={displayLabel(CHRONOLOGICAL_PRECISIONS, current.chronologicalPrecision)} /><ReadOnlyField label="Era" value={current.era || (current.eraId ? histories[current.eraId]?.name : undefined)} /></div></Section>
      <ReadOnlyField label="Historical Context" value={current.historicalContext} /><Section title="Cause and Development"><div className="flex flex-col gap-6"><ReadOnlyField label="Causes" value={current.causes} /><ReadOnlyField label="Preconditions" value={current.preconditions} /><ReadOnlyField label="Development" value={current.development} /><ReadOnlyField label="Turning Point" value={current.turningPoint} /></div></Section>
      <Section title="Participants"><div className="flex flex-col gap-6"><ReadOnlyField label="Participants / Entities Involved" value={resolvedEntities(current.participants)} /><ReadOnlyField label="Primary Participants" value={resolvedEntities(current.primaryParticipants)} /></div></Section>
      <Section title="Outcome and Consequences"><div className="flex flex-col gap-6"><ReadOnlyField label="Outcome" value={current.outcome} /><ReadOnlyField label="Immediate Consequences" value={current.immediateConsequences} /><ReadOnlyField label="Long-Term Consequences" value={current.longTermConsequences} /></div></Section>
      <Section title="Historical Significance"><div className="flex flex-col gap-6"><ReadOnlyField label="Importance" value={displayLabel(IMPORTANCE_LEVELS, current.importanceLevel)} /><ReadOnlyField label="Relevance" value={displayLabel(RELEVANCE_LEVELS, current.relevanceLevel)} /></div></Section>
      <Section title="Knowledge / Discovery"><div className="flex flex-col gap-6"><ReadOnlyField label="Discovery / Awareness" value={displayLabel(DISCOVERY_AWARENESS, current.discoveryAwareness, current.discoveryAwarenessOther)} /><ReadOnlyField label="Discovery / Awareness Time" value={current.discoveryTime} /><ReadOnlyField label="Historical Evidence" value={current.historicalEvidence} /></div></Section>
      <Section title="Narrative / Story Order"><ReadOnlyField label="Narrative Order" value={current.narrativeOrder === undefined ? undefined : String(current.narrativeOrder)} /></Section>
      <ReadOnlyField label="Additional Information" value={current.additionalInformation} />
    </div> : draft && <HistoryEditForm draft={draft} update={update} entityOptions={entityOptions} eras={eras} selectedEra={selectedEra} onSave={save} onCancel={isCreate ? onCancel : () => setMode("view")} />}
  </div>{mode === "edit" && !isCreate && <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={() => setMode("view")} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Cancel</button><button onClick={save} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save Changes</button></div>}</div>
}

function HistoryEditForm({ draft, update, entityOptions, eras, selectedEra, onSave, onCancel }: { draft: Draft; update: (patch: Partial<Draft>) => void; entityOptions: EntityOption[]; eras: CanonHistory[]; selectedEra?: CanonHistory; onSave: () => void; onCancel?: () => void }) {
  const selectClass = inputClass
  return <div className="flex flex-col gap-6 p-4"><Section title="Basic Identity"><div className="flex flex-col gap-3"><Field label="Name"><input autoFocus className={inputClass} value={draft.name} onChange={(event) => update({ name: event.target.value })} /></Field><Field label="Summary"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")} value={draft.summary} onChange={(event) => update({ summary: event.target.value })} /></Field><CanonImageField value={draft.image} onChange={(image) => update({ image })} /></div></Section>
    <Section title="Historical Type"><div className="grid gap-3 sm:grid-cols-2"><Field label="History Type"><select className={selectClass} value={draft.type} onChange={(event) => update({ type: event.target.value as HistoryType })}>{HISTORY_TYPES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>{draft.type === "other" && <Field label="Other Type"><input className={inputClass} value={draft.typeOther} onChange={(event) => update({ typeOther: event.target.value })} /></Field>}</div></Section>
    <Section title="Chronology"><div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs leading-relaxed text-foreground/80">Chronology controls the timeline position. Use a numeric position for consistent ordering and keep the world-facing date or wording in Start / Occurrence.</div><div className="mt-3 grid gap-3 sm:grid-cols-2"><Field label="Timeline Position"><input type="number" step="any" className={inputClass} value={draft.chronology} onChange={(event) => update({ chronology: event.target.value })} /></Field><Field label="Start / Occurrence"><input className={inputClass} value={draft.occurrence} onChange={(event) => update({ occurrence: event.target.value })} placeholder="e.g. 118 AR" /></Field><Field label="End / Duration"><input className={inputClass} value={draft.end} onChange={(event) => update({ end: event.target.value })} placeholder="Optional" /></Field><Field label="Duration Type"><select className={selectClass} value={draft.durationType} onChange={(event) => update({ durationType: event.target.value as DurationType })}>{DURATION_TYPES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>{draft.durationType === "other" && <Field label="Other Duration"><input className={inputClass} value={draft.durationTypeOther} onChange={(event) => update({ durationTypeOther: event.target.value })} /></Field>}<Field label="Duration Notes"><input className={inputClass} value={draft.duration} onChange={(event) => update({ duration: event.target.value })} /></Field><Field label="Chronological Precision"><select className={selectClass} value={draft.chronologicalPrecision} onChange={(event) => update({ chronologicalPrecision: event.target.value as ChronologicalPrecision })}>{CHRONOLOGICAL_PRECISIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field><Field label="Era"><select className={selectClass} value={draft.eraId} onChange={(event) => { const era = eras.find((record) => record.id === event.target.value); update({ eraId: event.target.value, era: era?.name ?? "" }) }}><option value="">No era association</option>{eras.map((era) => <option key={era.id} value={era.id}>{era.name}</option>)}</select></Field>{selectedEra && <p className="text-xs text-muted-foreground sm:col-span-2">Grouped under {selectedEra.name}.</p>}</div></Section>
    <Section title="Era / Historical Context"><Field label="Historical Context"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.historicalContext} onChange={(event) => update({ historicalContext: event.target.value })} /></Field></Section>
    <Section title="Cause and Development"><div className="flex flex-col gap-3"><Field label="Causes"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.causes} onChange={(event) => update({ causes: event.target.value })} /></Field><Field label="Preconditions"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.preconditions} onChange={(event) => update({ preconditions: event.target.value })} /></Field><Field label="Development"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.development} onChange={(event) => update({ development: event.target.value })} /></Field><Field label="Turning Point"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.turningPoint} onChange={(event) => update({ turningPoint: event.target.value })} /></Field></div></Section>
    <Section title="Participants / Subjects"><div className="flex flex-col gap-4"><EntityPicker label="Participants / Entities Involved" selected={draft.participants} options={entityOptions} onChange={(participants) => update({ participants })} /><EntityPicker label="Primary Participants" selected={draft.primaryParticipants} options={entityOptions} onChange={(primaryParticipants) => update({ primaryParticipants })} /></div></Section>
    <Section title="Outcome and Consequences"><div className="flex flex-col gap-3"><Field label="Outcome"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.outcome} onChange={(event) => update({ outcome: event.target.value })} /></Field><Field label="Immediate Consequences"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.immediateConsequences} onChange={(event) => update({ immediateConsequences: event.target.value })} /></Field><Field label="Long-Term Consequences"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.longTermConsequences} onChange={(event) => update({ longTermConsequences: event.target.value })} /></Field></div></Section>
    <Section title="Historical Significance"><div className="grid gap-3 sm:grid-cols-2"><Field label="Importance"><select className={selectClass} value={draft.importanceLevel} onChange={(event) => update({ importanceLevel: event.target.value as Importance })}>{IMPORTANCE_LEVELS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field><Field label="Relevance"><select className={selectClass} value={draft.relevanceLevel} onChange={(event) => update({ relevanceLevel: event.target.value as Relevance })}>{RELEVANCE_LEVELS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field></div></Section>
    <Section title="Knowledge / Discovery"><div className="grid gap-3 sm:grid-cols-2"><Field label="Discovery / Awareness"><select className={selectClass} value={draft.discoveryAwareness} onChange={(event) => update({ discoveryAwareness: event.target.value as DiscoveryAwareness })}>{DISCOVERY_AWARENESS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>{draft.discoveryAwareness === "other" && <Field label="Other Awareness"><input className={inputClass} value={draft.discoveryAwarenessOther} onChange={(event) => update({ discoveryAwarenessOther: event.target.value })} /></Field>}<Field label="Discovery / Awareness Time"><input className={inputClass} value={draft.discoveryTime} onChange={(event) => update({ discoveryTime: event.target.value })} /></Field><Field label="Historical Evidence"><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2")} value={draft.historicalEvidence} onChange={(event) => update({ historicalEvidence: event.target.value })} /></Field></div></Section>
    <Section title="Narrative / Story Order"><Field label="Narrative Order"><input type="number" step="any" className={inputClass} value={draft.narrativeOrder} onChange={(event) => update({ narrativeOrder: event.target.value })} placeholder="Optional" /></Field></Section>
    <Section title="Additional Information"><Field label="Additional Information"><textarea className={cn(inputClass, "h-auto min-h-28 resize-y py-2")} value={draft.additionalInformation} onChange={(event) => update({ additionalInformation: event.target.value })} /></Field></Section>
    <div className="flex justify-end gap-2 border-t border-border pt-4"><button onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button><button disabled={!draft.name.trim()} onClick={onSave} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50">Save History</button></div>
  </div>
}

export function HistoryCreateForm({ onCancel, onCreated }: { onCancel: () => void; onCreated: (id: string) => void }) {
  return <HistoryCanonRecord historyId={null} onCancel={onCancel} onCreated={onCreated} />
}