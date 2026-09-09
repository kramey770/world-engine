"use client"

import { useCallback, useEffect, useState } from "react"
import { Landmark, Pencil } from "lucide-react"
import { CanonRecordHeader } from "@/components/world/canon-record-header"
import { cn } from "@/lib/utils"
import {
  GOVERNMENT_FORMS,
  GOVERNMENT_STATUSES,
  governmentFormLabel,
  governmentStatusLabel,
  useGovernmentCanon,
  type CanonGovernment,
  type GovernmentEdit,
  type GovernmentForm,
  type GovernmentStatus,
} from "@/lib/government-canon"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
const areaClass = cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")

type Draft = Omit<CanonGovernment, "id" | "createdAt">

const EMPTY_DRAFT: Draft = {
  name: "", image: "", form: "other", status: "draft", summary: "", description: "", scope: "", founding: "", headOfState: "", executiveStructure: "", legislativeStructure: "", judicialStructure: "", administrativeDivisions: "", succession: "", legitimacy: "", representation: "", laws: "", rightsAndDuties: "", enforcement: "", citizenship: "", factions: "", dissent: "", revenue: "", militaryRelationship: "", resources: "", currentConflicts: "", history: "", strengths: "", weaknesses: "", symbols: "", additionalInfo: "", notes: "", references: [],
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</section>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>
}

function ReadText({ title, value }: { title: string; value?: string }) {
  if (!value) return null
  return <Section title={title}><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{value}</p></Section>
}

function FactCell({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return <div className="bg-sidebar/40 px-3 py-2.5"><dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-0.5 text-sm text-foreground/90 text-pretty">{value}</dd></div>
}

function toDraft(record: CanonGovernment): Draft {
  return { ...EMPTY_DRAFT, ...record, references: record.references ?? [] }
}

function draftToPatch(draft: Draft): GovernmentEdit {
  const patch: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(draft)) {
    if (key === "name" && typeof value === "string") patch[key] = value.trim() || "Unnamed Government"
    else if (key === "form" || key === "status") patch[key] = value
    else if (key === "references") patch[key] = value.length ? value : undefined
    else patch[key] = typeof value === "string" ? value.trim() || undefined : value
  }
  return patch as GovernmentEdit
}

const TEXT_FIELDS: { key: keyof Draft; label: string }[] = [
  { key: "summary", label: "Summary" }, { key: "description", label: "Canonical description" }, { key: "scope", label: "Geographic scope" }, { key: "founding", label: "Founding or constitutional origin" },
  { key: "headOfState", label: "Head of state or ruling office" }, { key: "executiveStructure", label: "Executive structure" }, { key: "legislativeStructure", label: "Legislative structure" }, { key: "judicialStructure", label: "Judicial structure" }, { key: "administrativeDivisions", label: "Administrative divisions" }, { key: "succession", label: "Succession or transfer of power" },
  { key: "legitimacy", label: "Source of legitimacy" }, { key: "representation", label: "Representation and participation" }, { key: "laws", label: "Sources of law" }, { key: "rightsAndDuties", label: "Rights and duties" }, { key: "enforcement", label: "Enforcement and dispute resolution" }, { key: "citizenship", label: "Citizenship and social status" },
  { key: "factions", label: "Factions and political interests" }, { key: "dissent", label: "Dissent and opposition" }, { key: "revenue", label: "Revenue and taxation" }, { key: "militaryRelationship", label: "Military and security relationship" }, { key: "resources", label: "Resources and dependencies" }, { key: "currentConflicts", label: "Current conflicts and pressure points" },
  { key: "history", label: "Historical development" }, { key: "strengths", label: "Strengths" }, { key: "weaknesses", label: "Weaknesses and vulnerabilities" }, { key: "symbols", label: "Symbols and public rituals" }, { key: "additionalInfo", label: "Additional information" }, { key: "notes", label: "Notes" },
]

function GovernmentFormFields({ initial, onCancel, onSaved }: { initial: Draft; onCancel?: () => void; onSaved: (draft: Draft) => void }) {
  const [draft, setDraft] = useState(initial)
  const update = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }))
  return <div className="space-y-7 rounded-xl border border-border bg-card/40 p-4 sm:p-6">
    <Section title="Identity"><div className="grid gap-4 sm:grid-cols-2"><Field label="Name"><input className={inputClass} value={draft.name} onChange={(event) => update({ name: event.target.value })} /></Field><Field label="Government form"><select className={inputClass} value={draft.form} onChange={(event) => update({ form: event.target.value as GovernmentForm })}>{GOVERNMENT_FORMS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field><Field label="Status"><select className={inputClass} value={draft.status} onChange={(event) => update({ status: event.target.value as GovernmentStatus })}>{GOVERNMENT_STATUSES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field></div></Section>
    <Section title="Canonical information"><div className="grid gap-4">{TEXT_FIELDS.map((field) => <Field key={field.key} label={field.label}><textarea className={areaClass} value={String(draft[field.key] ?? "")} onChange={(event) => update({ [field.key]: event.target.value } as Partial<Draft>)} /></Field>)}</div></Section>
    <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:border-primary/40">Cancel</button><button type="button" onClick={() => onSaved(draft)} className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save Government</button></div>
  </div>
}

export function GovernmentCanonRecord({ governmentId, onCancel, onCreated, className }: { governmentId: string | null; onCancel?: () => void; onCreated?: (id: string) => void; className?: string }) {
  const { getGovernment, updateGovernment, addGovernment } = useGovernmentCanon()
  const government = getGovernment(governmentId)
  const [mode, setMode] = useState<"view" | "edit">(governmentId ? "view" : "edit")
  useEffect(() => setMode(governmentId ? "view" : "edit"), [governmentId])
  const save = useCallback((draft: Draft) => {
    const patch = draftToPatch(draft)
    if (government) { updateGovernment(government.id, patch); setMode("view") }
    else onCreated?.(addGovernment(patch))
  }, [addGovernment, government, onCreated, updateGovernment])
  if (!governmentId) return <GovernmentFormFields initial={EMPTY_DRAFT} onCancel={onCancel} onSaved={save} />
  if (!government) return null
  return <div className={cn("flex min-h-0 flex-col", className)}><div className="min-h-0 flex-1 overflow-y-auto"><CanonRecordHeader recordId={`government:${government.id}`} title={government.name} summary={government.summary} identityImage={government.image ?? ""} identityAlt={`Government artwork for ${government.name}`} identityFallback={<Landmark className="size-7 text-primary/50" />} onIdentityChange={(image) => updateGovernment(government.id, { image: image || undefined })} />{mode === "edit" ? <GovernmentFormFields initial={toDraft(government)} onCancel={() => setMode("view")} onSaved={save} /> : <div className="flex flex-col gap-6 p-4"><button onClick={() => setMode("edit")} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-primary/40 hover:bg-muted"><Pencil className="size-3.5" />Edit Government</button><div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary"><Landmark className="size-3" />{governmentFormLabel(government.form)}</span><span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{governmentStatusLabel(government.status)}</span></div><ReadText title="Description" value={government.description} /><ReadText title="Purpose and legitimacy" value={government.legitimacy} />{(government.scope || government.headOfState || government.succession || government.representation) && <Section title="At a Glance"><dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"><FactCell label="Scope" value={government.scope} /><FactCell label="Head of state" value={government.headOfState} /><FactCell label="Succession" value={government.succession} /><FactCell label="Representation" value={government.representation} /></dl></Section>}<ReadText title="Power structure" value={[government.executiveStructure, government.legislativeStructure, government.judicialStructure, government.administrativeDivisions].filter(Boolean).join("\n\n")} /><ReadText title="Law and civic order" value={[government.laws, government.rightsAndDuties, government.enforcement, government.citizenship].filter(Boolean).join("\n\n")} /><ReadText title="Political life" value={[government.factions, government.dissent, government.currentConflicts].filter(Boolean).join("\n\n")} /><ReadText title="Material power" value={[government.revenue, government.militaryRelationship, government.resources].filter(Boolean).join("\n\n")} /><ReadText title="History and condition" value={[government.founding, government.history, government.strengths, government.weaknesses].filter(Boolean).join("\n\n")} /><ReadText title="Symbols and additional information" value={[government.symbols, government.additionalInfo, government.notes].filter(Boolean).join("\n\n")} /></div>}</div></div>
}

export function GovernmentCreateForm({ onCancel, onCreated }: { onCancel: () => void; onCreated: (id: string) => void }) {
  return <GovernmentCanonRecord governmentId={null} onCancel={onCancel} onCreated={onCreated} />
}
