"use client"

import { useCallback, useEffect, useState } from "react"
import { Building2, Pencil } from "lucide-react"
import {
  ORGANIZATION_TYPES,
  ORGANIZATION_STRUCTURES,
  ORGANIZATION_SIZES,
  ORGANIZATION_REACHES,
  organizationTypeLabel,
  organizationStructureLabel,
  organizationSizeLabel,
  organizationReachLabel,
  useOrganizationCanon,
  type CanonOrganization,
  type OrganizationEdit,
  type OrganizationType,
  type OrganizationStructure,
  type OrganizationSize,
  type OrganizationReach,
} from "@/lib/organization-canon"
import { cn } from "@/lib/utils"

/**
 * OrganizationCanonRecord — the single, reusable presentation + editing surface
 * for an Organization Canon record, mirroring ReligionCanonRecord. There is
 * exactly one read-only view and one edit form. All data is read from / written
 * to the shared OrganizationCanonProvider; this component never owns duplicate
 * state.
 *
 * Organizations are not image-forward in this first layer, so the identity is
 * anchored by an iconographic hero rather than a photo, keeping the pass lean.
 */

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

/** A single read-only fact in the "At a Glance" grid. */
function FactCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sidebar/40 px-3 py-2.5">
      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground/90 text-pretty">{value}</dd>
    </div>
  )
}

/* ---------------------------------- Draft ---------------------------------- */

type Draft = {
  name: string
  type: OrganizationType
  summary: string
  description: string
  purpose: string
  founding: string
  leadership: string
  structure: OrganizationStructure
  size: OrganizationSize
  reach: OrganizationReach
  notes: string
}

const EMPTY_DRAFT: Draft = {
  name: "",
  type: "other",
  summary: "",
  description: "",
  purpose: "",
  founding: "",
  leadership: "",
  structure: "unspecified",
  size: "unspecified",
  reach: "unspecified",
  notes: "",
}

function toDraft(o: CanonOrganization): Draft {
  return {
    name: o.name ?? "",
    type: o.type,
    summary: o.summary ?? "",
    description: o.description ?? "",
    purpose: o.purpose ?? "",
    founding: o.founding ?? "",
    leadership: o.leadership ?? "",
    structure: o.structure ?? "unspecified",
    size: o.size ?? "unspecified",
    reach: o.reach ?? "unspecified",
    notes: o.notes ?? "",
  }
}

function draftToPatch(d: Draft): OrganizationEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }
  const enumOrUndefined = <T extends string>(v: T) => (v === "unspecified" ? undefined : v)
  return {
    name: d.name.trim() || "Unnamed Organization",
    type: d.type,
    summary: clean(d.summary),
    description: clean(d.description),
    purpose: clean(d.purpose),
    founding: clean(d.founding),
    leadership: clean(d.leadership),
    structure: enumOrUndefined(d.structure),
    size: enumOrUndefined(d.size),
    reach: enumOrUndefined(d.reach),
    notes: clean(d.notes),
  }
}

/* ------------------------------- Canon record ------------------------------ */

export function OrganizationCanonRecord({
  organizationId,
  onModeChange,
  className,
}: {
  organizationId: string | null
  /** Notifies the host chrome (page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  className?: string
}) {
  const { getOrganization, updateOrganization } = useOrganizationCanon()
  const organization = getOrganization(organizationId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)

  // Always return to read-only when the selected organization changes.
  useEffect(() => {
    setMode("view")
  }, [organizationId])

  // Keep host chrome in sync with the current mode.
  useEffect(() => {
    onModeChange?.(mode)
  }, [mode, onModeChange])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && organization) setDraft(toDraft(organization))
  }, [mode, organization])

  const save = useCallback(() => {
    if (organization && draft) updateOrganization(organization.id, draftToPatch(draft))
    setMode("view")
  }, [organization, draft, updateOrganization])

  if (!organization) return null

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Iconographic hero — always shown so the record's identity stays anchored */}
        <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
          <Building2 className="size-16 text-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
              {organization.name}
            </h2>
            {organization.summary && (
              <p className="mt-0.5 text-sm text-muted-foreground">{organization.summary}</p>
            )}
          </div>
        </div>

        {mode === "view" ? (
          /* ------------------------------ VIEW MODE ------------------------------ */
          <div className="flex flex-col gap-6 p-4">
            <button
              onClick={() => setMode("edit")}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <Pencil className="size-3.5" />
              Edit Organization
            </button>

            {/* Type chip (always populated) */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
                <Building2 className="size-3" />
                {organizationTypeLabel(organization.type)}
              </span>
            </div>

            {organization.purpose && (
              <Section title="Purpose / Mission">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">
                  {organization.purpose}
                </p>
              </Section>
            )}

            {organization.description && (
              <Section title="Description">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{organization.description}</p>
              </Section>
            )}

            {/* Structured facts — only render rows that are populated. */}
            {(organization.leadership ||
              organization.structure ||
              organization.size ||
              organization.reach) && (
              <Section title="At a Glance">
                <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                  {organization.leadership && (
                    <FactCell label="Leadership" value={organization.leadership} />
                  )}
                  {organization.structure && (
                    <FactCell label="Internal Structure" value={organizationStructureLabel(organization.structure)} />
                  )}
                  {organization.size && (
                    <FactCell label="Size / Scale" value={organizationSizeLabel(organization.size)} />
                  )}
                  {organization.reach && (
                    <FactCell label="Area of Influence" value={organizationReachLabel(organization.reach)} />
                  )}
                </dl>
              </Section>
            )}

            {organization.founding && (
              <Section title="Founding / Origin">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">
                  {organization.founding}
                </p>
              </Section>
            )}

            {organization.notes && (
              <Section title="Further Notes">
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">
                  {organization.notes}
                </p>
              </Section>
            )}
          </div>
        ) : (
          /* ------------------------------ EDIT MODE ------------------------------ */
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                This is the authoritative Canon record for {organization.name}. Changes here update every view that
                reads this organization. More organization fields will be added in a future pass.
              </p>

              <Section title="Identity">
                <div className="flex flex-col gap-3">
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={draft.name}
                      onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    />
                  </Field>
                  <Field label="Organization Type">
                    <select
                      className={inputClass}
                      value={draft.type}
                      onChange={(e) => setDraft({ ...draft, type: e.target.value as OrganizationType })}
                    >
                      {ORGANIZATION_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Summary">
                    <input
                      className={inputClass}
                      value={draft.summary}
                      placeholder="One-line identity shown beneath the name"
                      onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    />
                  </Field>
                </div>
              </Section>

              <Section title="Purpose / Mission">
                <textarea
                  className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
                  value={draft.purpose}
                  placeholder="Why this organization exists — its stated purpose or driving mission"
                  onChange={(e) => setDraft({ ...draft, purpose: e.target.value })}
                />
              </Section>

              <Section title="Description">
                <textarea
                  className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
              </Section>

              <Section title="Structure & Scale">
                <div className="flex flex-col gap-3">
                  <Field label="Leadership">
                    <input
                      className={inputClass}
                      value={draft.leadership}
                      placeholder="e.g. Lord Aldric Ravenshollow, or a council of five"
                      onChange={(e) => setDraft({ ...draft, leadership: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Field label="Internal Structure">
                      <select
                        className={inputClass}
                        value={draft.structure}
                        onChange={(e) => setDraft({ ...draft, structure: e.target.value as OrganizationStructure })}
                      >
                        {ORGANIZATION_STRUCTURES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Size / Scale">
                      <select
                        className={inputClass}
                        value={draft.size}
                        onChange={(e) => setDraft({ ...draft, size: e.target.value as OrganizationSize })}
                      >
                        {ORGANIZATION_SIZES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Area of Influence">
                      <select
                        className={inputClass}
                        value={draft.reach}
                        onChange={(e) => setDraft({ ...draft, reach: e.target.value as OrganizationReach })}
                      >
                        {ORGANIZATION_REACHES.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
              </Section>

              <Section title="Founding / Origin">
                <textarea
                  className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
                  value={draft.founding}
                  placeholder="How and when it came to be — founding, origin story, founders"
                  onChange={(e) => setDraft({ ...draft, founding: e.target.value })}
                />
              </Section>

              <Section title="Further Notes">
                <textarea
                  className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
                  value={draft.notes}
                  placeholder="Loose canon details that don't fit elsewhere yet"
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                />
              </Section>
            </div>
          )
        )}
      </div>

      {/* Edit-mode action bar */}
      {mode === "edit" && (
        <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3">
          <button
            onClick={() => setMode("view")}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------- Create form ------------------------------- */

/**
 * OrganizationCreateForm — the "Create Organization" surface. Collects the
 * first-layer fields and, on save, creates the canon record and hands its new
 * id back so the host can open the Canon Organization Record (View / Edit).
 */
export function OrganizationCreateForm({
  onCreated,
  onCancel,
}: {
  onCreated: (id: string) => void
  onCancel: () => void
}) {
  const { addOrganization } = useOrganizationCanon()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)

  const create = useCallback(() => {
    const id = addOrganization(draftToPatch(draft))
    onCreated(id)
  }, [addOrganization, draft, onCreated])

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border bg-sidebar/40 px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
          <Building2 className="size-4.5" />
        </span>
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">New Organization</h2>
          <p className="text-xs text-muted-foreground">
            Establish the canon record. You can refine every field afterward.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        <Section title="Identity">
          <div className="flex flex-col gap-3">
            <Field label="Name">
              <input
                autoFocus
                className={inputClass}
                value={draft.name}
                placeholder="e.g. The Ravenshollow Court"
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </Field>
            <Field label="Organization Type">
              <select
                className={inputClass}
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value as OrganizationType })}
              >
                {ORGANIZATION_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Summary">
              <input
                className={inputClass}
                value={draft.summary}
                placeholder="One-line identity shown beneath the name"
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
              />
            </Field>
          </div>
        </Section>

        <Section title="Purpose / Mission">
          <textarea
            className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
            value={draft.purpose}
            placeholder="Why this organization exists — its stated purpose or driving mission"
            onChange={(e) => setDraft({ ...draft, purpose: e.target.value })}
          />
        </Section>

        <Section title="Description">
          <textarea
            className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
            value={draft.description}
            placeholder="The canonical description of this organization"
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
        </Section>

        <Section title="Structure & Scale">
          <div className="flex flex-col gap-3">
            <Field label="Leadership">
              <input
                className={inputClass}
                value={draft.leadership}
                placeholder="e.g. Lord Aldric Ravenshollow, or a council of five"
                onChange={(e) => setDraft({ ...draft, leadership: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="Internal Structure">
                <select
                  className={inputClass}
                  value={draft.structure}
                  onChange={(e) => setDraft({ ...draft, structure: e.target.value as OrganizationStructure })}
                >
                  {ORGANIZATION_STRUCTURES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Size / Scale">
                <select
                  className={inputClass}
                  value={draft.size}
                  onChange={(e) => setDraft({ ...draft, size: e.target.value as OrganizationSize })}
                >
                  {ORGANIZATION_SIZES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Area of Influence">
                <select
                  className={inputClass}
                  value={draft.reach}
                  onChange={(e) => setDraft({ ...draft, reach: e.target.value as OrganizationReach })}
                >
                  {ORGANIZATION_REACHES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </Section>

        <Section title="Founding / Origin">
          <textarea
            className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
            value={draft.founding}
            placeholder="How and when it came to be — founding, origin story, founders"
            onChange={(e) => setDraft({ ...draft, founding: e.target.value })}
          />
        </Section>

        <Section title="Further Notes">
          <textarea
            className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
            value={draft.notes}
            placeholder="Loose canon details that don't fit elsewhere yet"
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          />
        </Section>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3">
        <button
          onClick={onCancel}
          className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={create}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]"
        >
          Create Organization
        </button>
      </div>
    </div>
  )
}
