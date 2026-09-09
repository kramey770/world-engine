"use client"

import { useEffect, useState } from "react"
import { Lightbulb, Pencil, Package, Settings } from "lucide-react"
import { CanonRecordHeader } from "@/components/world/canon-record-header"
import { SYSTEM_LABELS, SYSTEM_TYPES, systemTypeLabel, useSystemsCanon, type SystemDomain, type SystemRecord, type SystemRecordEdit, type SystemStatus } from "@/lib/systems-canon"
import { cn } from "@/lib/utils"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
const areaClass = cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")

const ICONS = { magic: Lightbulb, technology: Settings, economics: Package } as const
const TEXT_FIELDS: { key: keyof SystemRecordEdit; label: string }[] = [
  { key: "summary", label: "Summary" },
  { key: "description", label: "Canonical description" },
  { key: "rules", label: "Rules or operating model" },
  { key: "inputs", label: "Inputs, costs, or requirements" },
  { key: "outputs", label: "Effects, outputs, or value" },
  { key: "limits", label: "Limits, risks, or failure modes" },
  { key: "prerequisites", label: "Prerequisites and access" },
  { key: "relationships", label: "Related systems and entities" },
  { key: "history", label: "History and adoption" },
  { key: "notes", label: "Notes and sources" },
]

type Draft = Omit<SystemRecord, "id" | "createdAt" | "domain">

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</section>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>
}

function toDraft(record: SystemRecord): Draft {
  return { name: record.name, type: record.type, status: record.status, image: record.image ?? "", summary: record.summary ?? "", description: record.description ?? "", rules: record.rules ?? "", inputs: record.inputs ?? "", outputs: record.outputs ?? "", limits: record.limits ?? "", prerequisites: record.prerequisites ?? "", relationships: record.relationships ?? "", history: record.history ?? "", notes: record.notes ?? "" }
}

function cleanPatch(draft: Draft): SystemRecordEdit {
  const patch: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(draft)) patch[key] = typeof value === "string" ? value.trim() || undefined : value
  patch.name = draft.name.trim() || "Unnamed Record"
  return patch as SystemRecordEdit
}

export function SystemCanonRecord({ domain, recordId, onCancel, onCreated, className }: { domain: SystemDomain; recordId: string | null; onCancel?: () => void; onCreated?: (id: string) => void; className?: string }) {
  const { getRecord, updateRecord, addRecord } = useSystemsCanon()
  const record = getRecord(domain, recordId)
  const [mode, setMode] = useState<"view" | "edit">(recordId ? "view" : "edit")
  const [draft, setDraft] = useState<Draft | null>(record ? toDraft(record) : null)
  const Icon = ICONS[domain]
  const title = SYSTEM_LABELS[domain].title

  useEffect(() => { setMode(recordId ? "view" : "edit"); setDraft(record ? toDraft(record) : null) }, [recordId, record])

  if (!recordId) return <SystemForm domain={domain} initial={{ name: "", type: SYSTEM_TYPES[domain][0].id, status: "draft", image: "", summary: "", description: "", rules: "", inputs: "", outputs: "", limits: "", prerequisites: "", relationships: "", history: "", notes: "" }} onCancel={onCancel} onSaved={(next) => onCreated?.(addRecord(domain, cleanPatch(next)))} />
  if (!record) return null

  const save = (nextDraft = draft) => { if (nextDraft) updateRecord(domain, record.id, cleanPatch(nextDraft)); setMode("view") }
  const change = (image: string) => { if (mode === "edit" && draft) setDraft({ ...draft, image }); else updateRecord(domain, record.id, { image: image || undefined }) }

  return <div className={cn("flex min-h-0 flex-col", className)}><div className="min-h-0 flex-1 overflow-y-auto"><CanonRecordHeader recordId={`${domain}:${record.id}`} title={record.name} summary={record.summary} identityImage={draft?.image ?? record.image ?? ""} identityAlt={`${title} artwork for ${record.name}`} identityFallback={<Icon className="size-7 text-primary/50" />} onIdentityChange={change} />{mode === "edit" && draft ? <SystemForm domain={domain} initial={draft} showActions={false} onCancel={() => setMode("view")} onSaved={(next) => { setDraft(next); save(next) }} /> : <div className="flex flex-col gap-6 p-4"><button onClick={() => setMode("edit")} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-primary/40 hover:bg-muted"><Pencil className="size-3.5" />Edit {title}</button><div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary"><Icon className="size-3" />{systemTypeLabel(domain, record.type)}</span><span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{record.status}</span></div>{record.description && <Section title="Description"><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{record.description}</p></Section>}<ReadFields record={record} /></div>}</div>{mode === "edit" && <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={() => { setMode("view"); setDraft(toDraft(record)) }} className="h-9 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button><button onClick={() => save()} className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save Changes</button></div>}</div>
}

function ReadFields({ record }: { record: SystemRecord }) {
  return <>{TEXT_FIELDS.slice(2).map(({ key, label }) => { const value = record[key]; return value ? <Section key={key} title={label}><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{String(value)}</p></Section> : null })}</>
}

function SystemForm({ domain, initial, showActions = true, onCancel, onSaved }: { domain: SystemDomain; initial: Draft; showActions?: boolean; onCancel?: () => void; onSaved: (draft: Draft) => void }) {
  const [draft, setDraft] = useState(initial)
  const update = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }))
  return <div className="space-y-7 rounded-xl border border-border bg-card/40 p-4 sm:p-6"><Section title="Identity"><div className="grid gap-4 sm:grid-cols-2"><Field label="Name"><input className={inputClass} value={draft.name} onChange={(event) => update({ name: event.target.value })} /></Field><Field label="Type"><select className={inputClass} value={draft.type} onChange={(event) => update({ type: event.target.value })}>{SYSTEM_TYPES[domain].map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field><Field label="Status"><select className={inputClass} value={draft.status} onChange={(event) => update({ status: event.target.value as SystemStatus })}><option value="draft">Draft</option><option value="active">Active</option><option value="historical">Historical</option><option value="contested">Contested</option></select></Field></div></Section><Section title="Canonical information"><div className="grid gap-4">{TEXT_FIELDS.map((field) => <Field key={field.key} label={field.label}><textarea className={areaClass} value={String(draft[field.key] ?? "")} onChange={(event) => update({ [field.key]: event.target.value } as Partial<Draft>)} /></Field>)}</div></Section>{showActions && <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:border-primary/40">Cancel</button><button type="button" onClick={() => onSaved(draft)} className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save {SYSTEM_LABELS[domain].title}</button></div>}</div>
}
