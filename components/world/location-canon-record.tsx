"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Pencil } from "lucide-react"
import {
  LOCATION_TYPES,
  locationTypeLabel,
  useLocationCanon,
  type CanonLocation,
  type LocationEdit,
  type LocationType,
} from "@/lib/location-canon"
import { cn } from "@/lib/utils"
import { CanonImageField } from "@/components/world/canon-image-field"

/**
 * LocationCanonRecord — the single, reusable presentation + editing surface for
 * a Location Canon record, mirroring CharacterCanonRecord. There is exactly one
 * read-only view and one edit form. All data is read from / written to the
 * shared LocationCanonProvider; this component never owns duplicate state.
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
  type: LocationType
  region: string
  image: string
  summary: string
  description: string
  founded: string
}

function toDraft(l: CanonLocation): Draft {
  return {
    name: l.name ?? "",
    type: l.type,
    region: l.region ?? "",
    image: l.image ?? "",
    summary: l.summary ?? "",
    description: l.description ?? "",
    founded: l.founded ?? "",
  }
}

function draftToPatch(d: Draft): LocationEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }
  return {
    name: d.name.trim() || "Unnamed Location",
    type: d.type,
    region: clean(d.region),
    image: d.image || undefined,
    summary: clean(d.summary),
    description: clean(d.description),
    founded: clean(d.founded),
  }
}

/* ------------------------------- Canon record ------------------------------ */

export function LocationCanonRecord({
  locationId,
  onModeChange,
  className,
}: {
  locationId: string | null
  /** Notifies the host chrome (page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  className?: string
}) {
  const { getLocation, updateLocation } = useLocationCanon()
  const location = getLocation(locationId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Always return to read-only when the selected location changes.
  useEffect(() => {
    setMode("view")
    contentRef.current?.scrollTo({ top: 0 })
  }, [locationId])

  // Keep host chrome in sync with the current mode.
  useEffect(() => {
    onModeChange?.(mode)
  }, [mode, onModeChange])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && location) setDraft(toDraft(location))
  }, [mode, location])

  const save = useCallback(() => {
    if (location && draft) updateLocation(location.id, draftToPatch(draft))
    setMode("view")
  }, [location, draft, updateLocation])

  if (!location) return null

  const changeImage = (image: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, image })
    else updateLocation(location.id, { image: image || undefined })
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        {/* Image hero — always shown so the record's identity stays anchored */}
        <div className="group relative aspect-[3/2] w-full overflow-hidden bg-muted">
          {location.image ? (
            <Image
              src={location.image || "/placeholder.svg"}
              alt={`View of ${location.name}`}
              fill
              sizes="672px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
              <MapPin className="size-10" />
            </div>
          )}
          <CanonImageField value={draft?.image ?? location.image ?? ""} onChange={changeImage} />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
              {location.name}
            </h2>
            {location.summary && <p className="mt-0.5 text-sm text-muted-foreground">{location.summary}</p>}
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
              Edit Location
            </button>

            {/* Type + region + founded (each chip shown only when populated) */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
                <MapPin className="size-3" />
                {locationTypeLabel(location.type)}
              </span>
              {location.region && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  {location.region}
                </span>
              )}
              {location.founded && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs tabular-nums text-muted-foreground">
                  {location.founded}
                </span>
              )}
            </div>

            {location.description && (
              <Section title="Description">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{location.description}</p>
              </Section>
            )}
          </div>
        ) : (
          /* ------------------------------ EDIT MODE ------------------------------ */
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                This is the authoritative Canon record for {location.name}. Changes here update every view that reads
                this location. More location fields will be added in a future pass.
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
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Type">
                      <select
                        className={inputClass}
                        value={draft.type}
                        onChange={(e) => setDraft({ ...draft, type: e.target.value as LocationType })}
                      >
                        {LOCATION_TYPES.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Founded">
                      <input
                        className={inputClass}
                        value={draft.founded}
                        placeholder="e.g. 118 AR"
                        onChange={(e) => setDraft({ ...draft, founded: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field label="Region / Location">
                    <input
                      className={inputClass}
                      value={draft.region}
                      placeholder="Where this place sits"
                      onChange={(e) => setDraft({ ...draft, region: e.target.value })}
                    />
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

export function LocationCreateForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const { addLocation } = useLocationCanon()
  const [draft, setDraft] = useState<Draft>({
    name: "",
    type: "landmark",
    region: "",
    image: "",
    summary: "",
    description: "",
    founded: "",
  })
  const update = (patch: Partial<Draft>) => setDraft((previous) => ({ ...previous, ...patch }))

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-sidebar/40 px-4 py-3">
        <h2 className="font-serif text-lg font-medium tracking-tight">New Location</h2>
        <p className="text-xs text-muted-foreground">Establish a location canon record.</p>
      </div>
      <div className="flex flex-col gap-5 p-4">
        <Section title="Identity">
          <div className="flex flex-col gap-3">
            <Field label="Name"><input autoFocus className={inputClass} value={draft.name} onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Corvath Keep" /></Field>
            <Field label="Type"><select className={inputClass} value={draft.type} onChange={(e) => update({ type: e.target.value as LocationType })}>{LOCATION_TYPES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>
            <Field label="Region / Location"><input className={inputClass} value={draft.region} onChange={(e) => update({ region: e.target.value })} /></Field>
            <Field label="Founded"><input className={inputClass} value={draft.founded} onChange={(e) => update({ founded: e.target.value })} placeholder="e.g. 118 AR" /></Field>
            <Field label="Summary"><input className={inputClass} value={draft.summary} onChange={(e) => update({ summary: e.target.value })} /></Field>
            <CanonImageField value={draft.image} onChange={(image) => update({ image })} />
          </div>
        </Section>
        <Section title="Description"><textarea className={cn(inputClass, "h-auto min-h-28 resize-y py-2")} value={draft.description} onChange={(e) => update({ description: e.target.value })} /></Section>
      </div>
      <div className="flex justify-end gap-2 border-t border-border bg-sidebar px-4 py-3">
        <button type="button" onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm text-muted-foreground hover:bg-muted">Cancel</button>
        <button type="button" onClick={() => onCreated(addLocation(draftToPatch(draft)))} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create Location</button>
      </div>
    </div>
  )
}
