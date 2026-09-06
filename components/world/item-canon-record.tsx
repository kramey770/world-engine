"use client"

import { useEffect, useMemo, useState } from "react"
import { ImageOff, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react"
import {
  ITEM_FIELD_DEFINITIONS,
  ITEM_FIELD_SECTION_ORDER,
  ITEM_TYPES,
  itemTypeLabel,
  useItemCanon,
  type CanonItem,
  type ItemEdit,
  type ItemFieldDefinition,
  type ItemFieldValue,
  type ItemRelationship,
  type ItemRelationshipEntityType,
  type ItemRelationshipRole,
} from "@/lib/item-canon"
import { useCharacterCanon } from "@/lib/character-canon"
import { useHistoryCanon } from "@/lib/history-canon"
import { useLocationCanon } from "@/lib/location-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { cn } from "@/lib/utils"
import { CanonRecordHeader } from "@/components/world/canon-record-header"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
const roleOptions: { value: ItemRelationshipRole; label: string }[] = [
  { value: "creator", label: "Creator / Maker" }, { value: "current-holder", label: "Current Holder" },
  { value: "current-location", label: "Current Location" }, { value: "associated-history", label: "Associated History" }, { value: "related-item", label: "Related Item" },
]
const entityOptions: { value: ItemRelationshipEntityType; label: string }[] = [
  { value: "character", label: "Character" }, { value: "organization", label: "Organization" }, { value: "location", label: "Location" },
  { value: "history", label: "History" }, { value: "item", label: "Item" },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</section>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>
}

function valueText(value: ItemFieldValue | undefined): string {
  return Array.isArray(value) ? value.join(", ") : value ?? ""
}

type Draft = {
  name: string
  type: string
  image: string
  summary: string
  fieldValues: Record<string, ItemFieldValue>
  excludedFieldIds: string[]
  relationships: ItemRelationship[]
}

function toDraft(item: CanonItem): Draft {
  return { name: item.name, type: item.type, image: item.image ?? "", summary: item.summary ?? "", fieldValues: { ...item.fieldValues }, excludedFieldIds: [...item.excludedFieldIds], relationships: [...item.relationships] }
}

function emptyDraft(): Draft {
  return { name: "", type: "other", image: "", summary: "", fieldValues: {}, excludedFieldIds: [], relationships: [] }
}

function fieldDisplay(field: ItemFieldDefinition, values: Record<string, ItemFieldValue>): string {
  const value = values[field.id]
  if (!value || (Array.isArray(value) && value.length === 0)) return ""
  const selected = Array.isArray(value) ? value : [value]
  return selected.map((entry) => {
    if (entry === "other" && field.allowOther) return String(values[`${field.id}__other`] ?? "Other")
    return field.options?.find((option) => option.value === entry)?.label ?? entry
  }).join(", ")
}

export function ItemCanonRecord({ itemId, onCancel, onCreated, className }: { itemId: string | null; onCancel?: () => void; onCreated?: (id: string) => void; className?: string }) {
  const { getItem, updateItem, addItem } = useItemCanon()
  const { characters } = useCharacterCanon()
  const { organizations } = useOrganizationCanon()
  const { locations } = useLocationCanon()
  const { histories } = useHistoryCanon()
  const itemRecords = useItemCanon().items
  const item = getItem(itemId)
  const creating = itemId === null
  const [mode, setMode] = useState<"view" | "edit">(creating ? "edit" : "view")
  const [draft, setDraft] = useState<Draft>(emptyDraft)
  const [relationshipRole, setRelationshipRole] = useState<ItemRelationshipRole>("creator")
  const [relationshipType, setRelationshipType] = useState<ItemRelationshipEntityType>("character")
  const [relationshipId, setRelationshipId] = useState("")

  useEffect(() => {
    setMode(creating ? "edit" : "view")
    setDraft(item ? toDraft(item) : emptyDraft())
  }, [creating, item])

  const groupedFields = useMemo(() => ITEM_FIELD_SECTION_ORDER.map((section) => ({ section, fields: ITEM_FIELD_DEFINITIONS.filter((field) => field.section === section) })), [])
  const relationshipOptions = useMemo(() => {
    if (relationshipType === "character") return Object.values(characters).map((record) => ({ id: record.id, name: record.name }))
    if (relationshipType === "organization") return Object.values(organizations).map((record) => ({ id: record.id, name: record.name }))
    if (relationshipType === "location") return Object.values(locations).map((record) => ({ id: record.id, name: record.name }))
    if (relationshipType === "history") return Object.values(histories).map((record) => ({ id: record.id, name: record.name }))
    return Object.values(itemRecords).filter((record) => record.id !== item?.id).map((record) => ({ id: record.id, name: record.name }))
  }, [characters, histories, item?.id, itemRecords, locations, organizations, relationshipType])

  if (!creating && !item) return null

  const setField = (fieldId: string, value: ItemFieldValue) => setDraft((current) => ({ ...current, fieldValues: { ...current.fieldValues, [fieldId]: value } }))
  const setOther = (fieldId: string, value: string) => setField(`${fieldId}__other`, value)
  const toggleHidden = (fieldId: string) => setDraft((current) => ({ ...current, excludedFieldIds: current.excludedFieldIds.includes(fieldId) ? current.excludedFieldIds.filter((id) => id !== fieldId) : [...current.excludedFieldIds, fieldId] }))
  const addRelationship = () => {
    if (!relationshipId) return
    setDraft((current) => ({ ...current, relationships: [...current.relationships.filter((entry) => !(entry.role === relationshipRole && entry.entityType === relationshipType)), { role: relationshipRole, entityType: relationshipType, entityId: relationshipId }] }))
    setRelationshipId("")
  }
  const removeRelationship = (relationship: ItemRelationship) => setDraft((current) => ({ ...current, relationships: current.relationships.filter((entry) => entry !== relationship) }))
  const save = () => {
    if (!draft.name.trim()) return
    const patch: ItemEdit = { name: draft.name.trim() || "Unnamed Item", type: draft.type, image: draft.image || undefined, summary: draft.summary.trim() || undefined, fieldValues: draft.fieldValues, excludedFieldIds: draft.excludedFieldIds, relationships: draft.relationships }
    if (item) { updateItem(item.id, patch); setMode("view") } else onCreated?.(addItem(patch))
  }
  const image = item?.image ?? draft.image
  const title = item?.name ?? "Create Item"

  const entityName = (relationship: ItemRelationship) => {
    if (relationship.entityType === "character") return characters[relationship.entityId]?.name ?? relationship.entityId
    if (relationship.entityType === "organization") return organizations[relationship.entityId]?.name ?? relationship.entityId
    if (relationship.entityType === "location") return locations[relationship.entityId]?.name ?? relationship.entityId
    if (relationship.entityType === "history") return histories[relationship.entityId]?.name ?? relationship.entityId
    return itemRecords[relationship.entityId]?.name ?? relationship.entityId
  }
  const roleLabel = (role: ItemRelationshipRole) => roleOptions.find((option) => option.value === role)?.label ?? role
  const renderFieldEditor = (field: ItemFieldDefinition) => {
    const current = draft.fieldValues[field.id]
    const selected = Array.isArray(current) ? current : current ? [current] : []
    return <div key={field.id} className="rounded-lg border border-border bg-card p-3"><div className="flex items-start gap-2"><div className="min-w-0 flex-1">
      {field.control === "textarea" && <Field label={field.label}><textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")} placeholder={field.placeholder} value={valueText(current)} onChange={(event) => setField(field.id, event.target.value)} /></Field>}
      {field.control === "text" && <Field label={field.label}><input className={inputClass} placeholder={field.placeholder} value={valueText(current)} onChange={(event) => setField(field.id, event.target.value)} /></Field>}
      {field.control === "select" && <Field label={field.label}><select className={inputClass} value={typeof current === "string" ? current : ""} onChange={(event) => setField(field.id, event.target.value)}><option value="">Select an option</option>{current && !field.options?.some((option) => option.value === current) && <option value={String(current)}>Stored value: {String(current)}</option>}{field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>}
      {field.control === "multi-select" && <Field label={field.label}><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{field.options?.map((option) => <label key={option.value} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-2 text-xs text-foreground"><input type="checkbox" checked={selected.includes(option.value)} onChange={() => setField(field.id, selected.includes(option.value) ? selected.filter((entry) => entry !== option.value) : [...selected, option.value])} />{option.label}</label>)}</div></Field>}
      {field.allowOther && selected.includes("other") && <div className="mt-2"><Field label="Other — specify"><input className={inputClass} value={valueText(draft.fieldValues[`${field.id}__other`])} onChange={(event) => setOther(field.id, event.target.value)} /></Field></div>}
    </div><button type="button" onClick={() => toggleHidden(field.id)} className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-border bg-background px-2 text-[10px] font-medium text-muted-foreground hover:text-foreground"><Trash2 className="size-3" />Remove</button></div></div>
  }

  return <div className={cn("flex min-h-0 flex-col", className)}>
    <div className="min-h-0 flex-1 overflow-y-auto">
      <CanonRecordHeader recordId={`item:${item?.id ?? "new"}`} title={title} summary={item?.summary ?? draft.summary} identityImage={image} identityAlt={`Image of ${title}`} identityFallback={<ImageOff className="size-7" />} onIdentityChange={(next) => setDraft((current) => ({ ...current, image: next }))} editable={mode === "edit" || creating} />
      {mode === "view" && item ? <div className="flex flex-col gap-6 p-4">
        <button onClick={() => { setDraft(toDraft(item)); setMode("edit") }} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted"><Pencil className="size-3.5" />Edit Item</button>
        <Section title="Identity"><div className="space-y-3">{item.name && <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">{item.name}</div>}{item.summary && <div className="whitespace-pre-line rounded-lg border border-border bg-card px-3 py-2 text-sm leading-relaxed text-foreground">{item.summary}</div>}<div className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary">{item.type === "other" ? String(item.fieldValues.type__other ?? "Other") : itemTypeLabel(item.type)}</div></div></Section>
        {groupedFields.map(({ section, fields }) => { const populated = fields.filter((field) => !item.excludedFieldIds.includes(field.id) && fieldDisplay(field, item.fieldValues)); return populated.length ? <Section key={section} title={section}><div className="space-y-3">{populated.map((field) => <div key={field.id} className="rounded-lg border border-border bg-card p-3"><p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{field.label}</p><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{fieldDisplay(field, item.fieldValues)}</p></div>)}</div></Section> : null })}
        {item.relationships.length > 0 && <Section title="Relationships"><div className="space-y-2">{item.relationships.map((relationship) => <div key={`${relationship.role}-${relationship.entityType}-${relationship.entityId}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"><span className="text-muted-foreground">{roleLabel(relationship.role)}</span><span className="font-medium text-foreground">{entityName(relationship)}</span></div>)}</div></Section>}
      </div> : <div className="flex flex-col gap-6 p-4">
        <Section title="Identity"><div className="space-y-3"><Field label="Name"><input required className={inputClass} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field><Field label="Summary"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} /></Field><Field label="Image URL"><input className={inputClass} placeholder="Paste an image URL" value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} /></Field></div></Section>
        <Section title="Classification"><div className="space-y-3"><Field label="Item Type"><select className={inputClass} value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })}>{ITEM_TYPES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>{draft.type === "other" && <Field label="Other — specify"><input className={inputClass} value={valueText(draft.fieldValues.type__other)} onChange={(event) => setOther("type", event.target.value)} /></Field>}</div></Section>
        {groupedFields.map(({ section, fields }) => <Section key={section} title={section}><div className="space-y-3">{fields.filter((field) => !draft.excludedFieldIds.includes(field.id)).map(renderFieldEditor)}</div></Section>)}
        {draft.excludedFieldIds.length > 0 && <Section title="Removed fields"><div className="flex flex-wrap gap-2">{draft.excludedFieldIds.map((fieldId) => { const field = ITEM_FIELD_DEFINITIONS.find((entry) => entry.id === fieldId); return field ? <button key={field.id} type="button" onClick={() => toggleHidden(field.id)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-foreground"><RotateCcw className="size-3.5" />Restore {field.label}</button> : null })}</div></Section>}
        <Section title="Relationships"><div className="space-y-3"><div className="grid gap-2 sm:grid-cols-3"><select aria-label="Relationship role" className={inputClass} value={relationshipRole} onChange={(event) => setRelationshipRole(event.target.value as ItemRelationshipRole)}>{roleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><select aria-label="Relationship type" className={inputClass} value={relationshipType} onChange={(event) => { setRelationshipType(event.target.value as ItemRelationshipEntityType); setRelationshipId("") }}>{entityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><select aria-label="Relationship entity" className={inputClass} value={relationshipId} onChange={(event) => setRelationshipId(event.target.value)}><option value="">Select entity</option>{relationshipOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></div><button type="button" onClick={addRelationship} className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:border-primary/40"><Plus className="size-3.5" />Add relationship</button>{draft.relationships.length > 0 && <div className="space-y-2">{draft.relationships.map((relationship) => <div key={`${relationship.role}-${relationship.entityType}-${relationship.entityId}`} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"><span>{roleLabel(relationship.role)}: {entityName(relationship)}</span><button type="button" onClick={() => removeRelationship(relationship)} className="text-muted-foreground hover:text-foreground" aria-label={`Remove ${entityName(relationship)} relationship`}><Trash2 className="size-3.5" /></button></div>)}</div>}</div></Section>
        <div className="flex gap-2"><button type="button" onClick={onCancel ?? (() => setMode("view"))} className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground hover:border-primary/40">Cancel</button><button type="button" onClick={save} className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">{creating ? "Create Item" : "Save Changes"}</button></div>
      </div>}
    </div>
  </div>
}
