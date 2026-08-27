"use client"

import { useCallback, useEffect, useState } from "react"
import { Church, Pencil } from "lucide-react"
import {
  RELIGION_TYPES,
  religionTypeLabel,
  useReligionCanon,
  type CanonReligion,
  type ReligionEdit,
  type ReligionType,
} from "@/lib/religion-canon"
import { cn } from "@/lib/utils"

/**
 * ReligionCanonRecord — the single, reusable presentation + editing surface for
 * a Religion Canon record, mirroring LocationCanonRecord. There is exactly one
 * read-only view and one edit form. All data is read from / written to the
 * shared ReligionCanonProvider; this component never owns duplicate state.
 *
 * Religions are not image-forward in this first layer, so the identity is
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

/* ---------------------------------- Draft ---------------------------------- */

type Draft = {
  name: string
  type: ReligionType
  summary: string
  description: string
}

function toDraft(r: CanonReligion): Draft {
  return {
    name: r.name ?? "",
    type: r.type,
    summary: r.summary ?? "",
    description: r.description ?? "",
  }
}

function draftToPatch(d: Draft): ReligionEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }
  return {
    name: d.name.trim() || "Unnamed Religion",
    type: d.type,
    summary: clean(d.summary),
    description: clean(d.description),
  }
}

/* ------------------------------- Canon record ------------------------------ */

export function ReligionCanonRecord({
  religionId,
  onModeChange,
  className,
}: {
  religionId: string | null
  /** Notifies the host chrome (page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  className?: string
}) {
  const { getReligion, updateReligion } = useReligionCanon()
  const religion = getReligion(religionId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)

  // Always return to read-only when the selected religion changes.
  useEffect(() => {
    setMode("view")
  }, [religionId])

  // Keep host chrome in sync with the current mode.
  useEffect(() => {
    onModeChange?.(mode)
  }, [mode, onModeChange])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && religion) setDraft(toDraft(religion))
  }, [mode, religion])

  const save = useCallback(() => {
    if (religion && draft) updateReligion(religion.id, draftToPatch(draft))
    setMode("view")
  }, [religion, draft, updateReligion])

  if (!religion) return null

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Iconographic hero — always shown so the record's identity stays anchored */}
        <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
          <Church className="size-16 text-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
              {religion.name}
            </h2>
            {religion.summary && <p className="mt-0.5 text-sm text-muted-foreground">{religion.summary}</p>}
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
              Edit Religion
            </button>

            {/* Type chip (always populated) */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
                <Church className="size-3" />
                {religionTypeLabel(religion.type)}
              </span>
            </div>

            {religion.description && (
              <Section title="Description">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{religion.description}</p>
              </Section>
            )}
          </div>
        ) : (
          /* ------------------------------ EDIT MODE ------------------------------ */
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                This is the authoritative Canon record for {religion.name}. Changes here update every view that reads
                this religion. More religion fields will be added in a future pass.
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
                  <Field label="Type / Tradition">
                    <select
                      className={inputClass}
                      value={draft.type}
                      onChange={(e) => setDraft({ ...draft, type: e.target.value as ReligionType })}
                    >
                      {RELIGION_TYPES.map((t) => (
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

              <Section title="Description">
                <textarea
                  className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
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
