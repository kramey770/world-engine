"use client"

import { useEffect, useMemo, useState } from "react"
import { ImageOff, Pencil, Plus, RotateCcw, Sparkles, Trash2 } from "lucide-react"
import {
  SPECIES_FIELD_DEFINITIONS, SPECIES_SECTIONS, SPECIES_TEMPLATES_WITH_ARCHETYPES, speciesTypeLabel, useSpeciesCanon,
  type CanonSpecies, type SpeciesEdit, type SpeciesFieldDefinition, type SpeciesFieldValue, type SpeciesRelationship, type SpeciesRelationshipEntityType, type SpeciesRelationshipRole,
} from "@/lib/species-canon"
import { cn } from "@/lib/utils"
import { CanonRecordHeader } from "@/components/world/canon-record-header"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
const roleOptions: { value: SpeciesRelationshipRole; label: string }[] = [
  { value: "creator", label: "Creator / Originator" }, { value: "ancestor", label: "Ancestor Species" }, { value: "descendant", label: "Descendant Species" },
  { value: "allied", label: "Allied Species" }, { value: "rival", label: "Rival / Hostile Species" }, { value: "related", label: "Related Species" }, { value: "important-history", label: "Important History" },
]
const entityOptions: { value: SpeciesRelationshipEntityType; label: string }[] = [
  { value: "species", label: "Species" }, { value: "character", label: "Character" }, { value: "organization", label: "Organization" }, { value: "religion", label: "Religion" }, { value: "history", label: "History" },
]

type Draft = { name: string; type: string; image: string; summary: string; fieldValues: Record<string, SpeciesFieldValue>; excludedFieldIds: string[]; relationships: SpeciesRelationship[] }
const emptyDraft = (): Draft => ({ name: "", type: "other", image: "", summary: "", fieldValues: {}, excludedFieldIds: [], relationships: [] })
const toDraft = (record: CanonSpecies): Draft => ({ name: record.name, type: record.type, image: record.image ?? "", summary: record.summary ?? "", fieldValues: { ...record.fieldValues }, excludedFieldIds: [...record.excludedFieldIds], relationships: [...record.relationships] })
const valueText = (value: SpeciesFieldValue | undefined) => Array.isArray(value) ? value.join(", ") : value ?? ""
const populated = (value: SpeciesFieldValue | undefined) => Boolean(value && (!Array.isArray(value) || value.length > 0))

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</section> }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label> }
function displayValue(field: SpeciesFieldDefinition, values: Record<string, SpeciesFieldValue>): string {
  const raw = values[field.id]
  if (!populated(raw)) return ""
  const entries = Array.isArray(raw) ? raw : [raw]
  return entries.map((entry) => {
    if (field.id === "speciesType") return speciesTypeLabel(String(entry))
    if (entry === "other") return String(values[`${field.id}__other`] ?? "Other")
    return field.options?.find((option) => option.value === entry)?.label ?? entry
  }).join(", ")
}

function renderEditor(field: SpeciesFieldDefinition, draft: Draft, setDraft: (value: Draft) => void, toggleHidden: (id: string) => void) {
  const current = draft.fieldValues[field.id]
  const selected = Array.isArray(current) ? current : current ? [current] : []
  const setField = (value: SpeciesFieldValue) => setDraft({ ...draft, fieldValues: { ...draft.fieldValues, [field.id]: value } })
  const setOther = (value: string) => setDraft({ ...draft, fieldValues: { ...draft.fieldValues, [field.id]: "other", [`${field.id}__other`]: value } })
  return <div key={field.id} className="rounded-lg border border-border bg-card p-3"><div className="flex items-start gap-2"><div className="min-w-0 flex-1">
    {field.control === "textarea" && <Field label={field.label}><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={valueText(current)} onChange={(event) => setField(event.target.value)} /></Field>}
    {field.control === "text" && <Field label={field.label}><input className={inputClass} value={valueText(current)} onChange={(event) => setField(event.target.value)} /></Field>}
    {field.control === "select" && <Field label={field.label}><select className={inputClass} value={field.id === "speciesType" ? draft.type : typeof current === "string" ? current : ""} onChange={(event) => field.id === "speciesType" ? setDraft({ ...draft, type: event.target.value, fieldValues: { ...draft.fieldValues, speciesType: event.target.value } }) : setField(event.target.value)}><option value="">Select an option</option>{field.options?.map((option) => <option key={option.value} value={field.id === "speciesType" ? option.value : option.value}>{option.label}</option>)}</select></Field>}
    {field.control === "multi-select" && <Field label={field.label}><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{field.options?.map((option) => <label key={option.value} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-2 text-xs text-foreground"><input type="checkbox" checked={selected.includes(option.value)} onChange={() => setField(selected.includes(option.value) ? selected.filter((entry) => entry !== option.value) : [...selected, option.value])} />{option.label}</label>)}</div></Field>}
    {field.allowOther && selected.includes("other") && <div className="mt-2"><Field label="Other - specify"><input className={inputClass} value={valueText(draft.fieldValues[`${field.id}__other`])} onChange={(event) => setOther(event.target.value)} /></Field></div>}
  </div><button type="button" onClick={() => toggleHidden(field.id)} className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-border bg-background px-2 text-[10px] font-medium text-muted-foreground hover:text-foreground"><Trash2 className="size-3" />Remove</button></div></div>
}

export function SpeciesCanonRecord({ speciesId, onCancel, onCreated, className }: { speciesId: string | null; onCancel?: () => void; onCreated?: (id: string) => void; className?: string }) {
  const { getSpecies, updateSpecies, addSpecies } = useSpeciesCanon()
  const record = getSpecies(speciesId)
  const creating = speciesId === null
  const [mode, setMode] = useState<"view" | "edit">(creating ? "edit" : "view")
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [relationshipRole, setRelationshipRole] = useState<SpeciesRelationshipRole>("related")
  const [relationshipType, setRelationshipType] = useState<SpeciesRelationshipEntityType>("species")
  const [relationshipId, setRelationshipId] = useState("")
  useEffect(() => { setMode(creating ? "edit" : "view"); setDraft(record ? toDraft(record) : emptyDraft()) }, [creating, record])
  const groups = useMemo(() => SPECIES_SECTIONS.map((name) => ({ name, fields: SPECIES_FIELD_DEFINITIONS.filter((field) => field.section === name) })), [])
  if (!creating && !record) return null
  const image = record?.image ?? draft.image
  const title = record?.name ?? "Create Species"
  const toggleHidden = (id: string) => setDraft({ ...draft, excludedFieldIds: draft.excludedFieldIds.includes(id) ? draft.excludedFieldIds.filter((entry) => entry !== id) : [...draft.excludedFieldIds, id] })
  const addRelationship = () => { if (!relationshipId.trim()) return; setDraft({ ...draft, relationships: [...draft.relationships, { role: relationshipRole, entityType: relationshipType, entityId: relationshipId.trim() }] }); setRelationshipId("") }
  const removeRelationship = (entry: SpeciesRelationship) => setDraft({ ...draft, relationships: draft.relationships.filter((value) => value !== entry) })
  const save = () => { if (!draft.name.trim()) return; const patch: SpeciesEdit = { name: draft.name.trim(), type: draft.type, image: draft.image || undefined, summary: draft.summary.trim() || undefined, fieldValues: draft.fieldValues, excludedFieldIds: draft.excludedFieldIds, relationships: draft.relationships }; if (record) { updateSpecies(record.id, patch); setMode("view") } else onCreated?.(addSpecies(patch)) }
  const renderValues = (field: SpeciesFieldDefinition) => { const value = displayValue(field, record?.fieldValues ?? {}); return value && !record?.excludedFieldIds.includes(field.id) ? <div key={field.id} className="rounded-lg border border-border bg-card p-3"><p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{field.label}</p><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{value}</p></div> : null }

  return <div className={cn("flex min-h-0 flex-col", className)}><div className="min-h-0 flex-1 overflow-y-auto">
    <CanonRecordHeader recordId={`species:${record?.id ?? "new"}`} title={title} summary={record?.summary ?? draft.summary} identityImage={image} identityAlt={`Image of ${title}`} identityFallback={<ImageOff className="size-7" />} onIdentityChange={(next) => setDraft({ ...draft, image: next })} editable={mode === "edit" || creating} />
    {mode === "view" && record ? <div className="flex flex-col gap-6 p-4"><button onClick={() => { setDraft(toDraft(record)); setMode("edit") }} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted"><Pencil className="size-3.5" />Edit Species</button>
      <Section title="Identity"><div className="space-y-3">{record.summary && <div className="whitespace-pre-line rounded-lg border border-border bg-card p-3 text-sm leading-relaxed text-foreground">{record.summary}</div>}{groups.find((group) => group.name === "Identity")?.fields.map(renderValues)}</div></Section>
      {groups.filter((group) => group.name !== "Identity").map((group) => { const values = group.fields.map(renderValues).filter(Boolean); return values.length ? <Section key={group.name} title={group.name}><div className="space-y-3">{values}</div></Section> : null })}
      {record.relationships.length > 0 && <Section title="Relationships"><div className="space-y-2">{record.relationships.map((entry) => <div key={`${entry.role}-${entry.entityType}-${entry.entityId}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"><span className="text-muted-foreground">{roleOptions.find((option) => option.value === entry.role)?.label ?? entry.role}</span><span className="font-medium text-foreground">{entry.entityId}</span></div>)}</div></Section>}
    </div> : <div className="flex flex-col gap-6 p-4"><Section title="Identity"><div className="space-y-3"><Field label="Name"><input required className={inputClass} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field><Field label="Summary"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} /></Field><Field label="Image URL"><input className={inputClass} placeholder="Paste an image URL" value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} /></Field></div></Section>
      {groups.map((group) => <Section key={group.name} title={group.name}><div className="space-y-3">{group.fields.filter((field) => !draft.excludedFieldIds.includes(field.id)).map((field) => renderEditor(field, draft, setDraft, toggleHidden))}</div></Section>)}
      {draft.excludedFieldIds.length > 0 && <Section title="Removed fields"><div className="flex flex-wrap gap-2">{draft.excludedFieldIds.map((id) => { const field = SPECIES_FIELD_DEFINITIONS.find((entry) => entry.id === id); return field ? <button key={id} type="button" onClick={() => toggleHidden(id)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"><RotateCcw className="size-3.5" />Restore {field.label}</button> : null })}</div></Section>}
      <Section title="Relationships"><div className="space-y-3"><div className="grid gap-2 sm:grid-cols-3"><select aria-label="Relationship role" className={inputClass} value={relationshipRole} onChange={(event) => setRelationshipRole(event.target.value as SpeciesRelationshipRole)}>{roleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><select aria-label="Relationship type" className={inputClass} value={relationshipType} onChange={(event) => setRelationshipType(event.target.value as SpeciesRelationshipEntityType)}>{entityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><input aria-label="Relationship record id" className={inputClass} placeholder="Record ID or name" value={relationshipId} onChange={(event) => setRelationshipId(event.target.value)} /></div><button type="button" onClick={addRelationship} className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:border-primary/40"><Plus className="size-3.5" />Add relationship</button>{draft.relationships.map((entry) => <div key={`${entry.role}-${entry.entityType}-${entry.entityId}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"><span>{roleOptions.find((option) => option.value === entry.role)?.label}: {entry.entityId}</span><button type="button" onClick={() => removeRelationship(entry)} aria-label={`Remove ${entry.entityId} relationship`} className="text-muted-foreground hover:text-foreground"><Trash2 className="size-3.5" /></button></div>)}</div></Section>
      <div className="flex gap-2"><button type="button" onClick={onCancel ?? (() => setMode("view"))} className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:border-primary/40">Cancel</button><button type="button" onClick={save} className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">{record ? "Save Changes" : "Create Species"}</button></div>
    </div>}
  </div></div>
}

export function SpeciesCreateFlow({ onCancel, onCreated }: { onCancel: () => void; onCreated: (id: string) => void }) {
  const { addSpecies } = useSpeciesCanon()
  const [choice, setChoice] = useState<"choice" | "template">("choice")
  const categories = [...new Set(SPECIES_TEMPLATES_WITH_ARCHETYPES.map((template) => template.category))]
  if (choice === "template") return <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between gap-3"><div><h2 className="font-serif text-xl font-medium tracking-tight text-foreground">Choose a Species template</h2><p className="text-sm text-muted-foreground">Templates are starting points, not stocked Canon records.</p></div><button type="button" onClick={() => setChoice("choice")} className="text-sm text-muted-foreground hover:text-foreground">Back</button></div><div className="mt-6 space-y-6">{categories.map((category) => <section key={category}><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{category}</h3><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{SPECIES_TEMPLATES_WITH_ARCHETYPES.filter((template) => template.category === category).map((template) => <button key={template.id} type="button" onClick={() => onCreated(addSpecies({ ...template.values, fieldValues: { ...(template.values.fieldValues ?? {}) }, excludedFieldIds: [], relationships: [] }))} className="rounded-lg border border-border bg-background p-4 text-left hover:border-primary/40"><span className="font-medium text-foreground">{template.name}</span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{template.description}</span></button>)}</div></section>)}</div></div>
  return <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Sparkles className="size-5" /></span><div><h2 className="font-serif text-xl font-medium tracking-tight text-foreground">Create Species</h2><p className="text-sm text-muted-foreground">Choose how to begin the Canon record.</p></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => onCreated(addSpecies({ type: "other", fieldValues: {}, excludedFieldIds: [], relationships: [] }))} className="rounded-lg border border-border bg-background p-4 text-left hover:border-primary/40"><span className="font-medium text-foreground">Create Blank Species</span><span className="mt-1 block text-sm text-muted-foreground">Start a new editable record with the full Species schema.</span></button><button type="button" onClick={() => setChoice("template")} className="rounded-lg border border-border bg-background p-4 text-left hover:border-primary/40"><span className="font-medium text-foreground">Start From Template</span><span className="mt-1 block text-sm text-muted-foreground">Choose a fantasy starting point, then edit every populated field.</span></button></div><button type="button" onClick={onCancel} className="mt-5 text-sm text-muted-foreground hover:text-foreground">Cancel</button></div>
}