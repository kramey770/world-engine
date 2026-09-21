"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react"
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
import { CanonRecordHeader } from "@/components/world/canon-record-header"
import { useRelationshipsCanon, type CanonEntityReference, type CanonEntityType } from "@/lib/relationships-canon"
import { useCharacterCanon } from "@/lib/character-canon"
import { useCultureCanon } from "@/lib/culture-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { useGovernmentCanon } from "@/lib/government-canon"
import { useReligionCanon } from "@/lib/religion-canon"
import { useSpeciesCanon } from "@/lib/species-canon"
import { useItemCanon } from "@/lib/item-canon"
import { useHistoryCanon } from "@/lib/history-canon"

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
  history: string
  currentState: string
  atmosphere: string
  notableFeatures: string
  hazards: string
  population: string
  populationNote: string
  latitude: string
  longitude: string
  elevation: string
  terrain: string
  biome: string
  climate: string
  area: string
}

type ConnectedCanonRecord = { entityType: CanonEntityType; entityId: string; name: string }

const connectedCanonTypes: Array<{ value: CanonEntityType; label: string }> = [
  { value: "character", label: "Character" },
  { value: "culture", label: "Culture" },
  { value: "organization", label: "Organization" },
  { value: "government", label: "Government" },
  { value: "religion", label: "Religion" },
  { value: "species", label: "Species" },
  { value: "item", label: "Item / Resource" },
  { value: "history", label: "Event / History" },
  { value: "location", label: "Location" },
]

function ConnectedCanonSection({ location, onOpenRecord }: { location: CanonLocation; onOpenRecord?: (reference: CanonEntityReference) => void }) {
  const { forEntity, addRelationship, deleteRelationship } = useRelationshipsCanon()
  const { characters } = useCharacterCanon()
  const { cultures } = useCultureCanon()
  const { organizations } = useOrganizationCanon()
  const { governments } = useGovernmentCanon()
  const { religions } = useReligionCanon()
  const { species } = useSpeciesCanon()
  const { items } = useItemCanon()
  const { histories } = useHistoryCanon()
  const { locations } = useLocationCanon()
  const [entityType, setEntityType] = useState<CanonEntityType>("character")
  const [entityId, setEntityId] = useState("")
  const [label, setLabel] = useState("")
  const locationReference: CanonEntityReference = { entityType: "location", entityId: location.id }
  const relationships = forEntity(locationReference)
  const records: ConnectedCanonRecord[] = entityType === "character"
    ? Object.values(characters).map((record) => ({ entityType, entityId: record.id, name: record.name }))
    : entityType === "culture"
      ? Object.values(cultures).map((record) => ({ entityType, entityId: record.id, name: record.name }))
      : entityType === "organization"
        ? Object.values(organizations).map((record) => ({ entityType, entityId: record.id, name: record.name }))
        : entityType === "government"
          ? Object.values(governments).map((record) => ({ entityType, entityId: record.id, name: record.name }))
          : entityType === "religion"
            ? Object.values(religions).map((record) => ({ entityType, entityId: record.id, name: record.name }))
            : entityType === "species"
              ? Object.values(species).map((record) => ({ entityType, entityId: record.id, name: record.name }))
              : entityType === "item"
                ? Object.values(items).map((record) => ({ entityType, entityId: record.id, name: record.name }))
                : entityType === "history"
                  ? Object.values(histories).map((record) => ({ entityType, entityId: record.id, name: record.name }))
                  : Object.values(locations).map((record) => ({ entityType, entityId: record.id, name: record.name }))
  const nameFor = (reference: CanonEntityReference) => {
    if (reference.entityType === "location") return reference.entityId === location.id ? location.name : reference.entityId
    return [...Object.values(characters), ...Object.values(cultures), ...Object.values(organizations), ...Object.values(governments), ...Object.values(religions), ...Object.values(species), ...Object.values(items), ...Object.values(histories), ...Object.values(locations)].find((record) => record.id === reference.entityId)?.name ?? reference.entityId
  }
  const addConnection = () => {
    if (!entityId || !label.trim()) return
    addRelationship({ subject: locationReference, object: { entityType, entityId }, label: label.trim(), direction: "mutual", status: "active" })
    setEntityId("")
    setLabel("")
  }

  return (
    <Section title="Connected Canon">
      <div className="flex flex-col gap-3">
        {relationships.length ? relationships.map((relationship) => {
          const connected = relationship.subject.entityType === "location" && relationship.subject.entityId === location.id ? relationship.object : relationship.subject
          return (
            <div key={relationship.id} className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-2">
              <button type="button" onClick={() => onOpenRecord?.(connected)} className="min-w-0 flex-1 text-left hover:text-primary">
                <span className="block truncate text-sm font-medium">{nameFor(connected)}</span>
                <span className="block truncate text-xs text-muted-foreground">{relationship.label} · {relationship.status}</span>
              </button>
              <button type="button" title="Remove connection" onClick={() => deleteRelationship(relationship.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"><Trash2 className="size-3.5" /></button>
            </div>
          )
        }) : <p className="rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">No connected Canon records yet.</p>}
        <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)]">
          <select className={inputClass} value={entityType} onChange={(event) => { setEntityType(event.target.value as CanonEntityType); setEntityId("") }}>
            {connectedCanonTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
          <select className={inputClass} value={entityId} onChange={(event) => setEntityId(event.target.value)}>
            <option value="">Choose a Canon record</option>
            {records.filter((record) => !(record.entityType === "location" && record.entityId === location.id)).map((record) => <option key={record.entityId} value={record.entityId}>{record.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <input className={inputClass} value={label} placeholder="Relationship or context" onChange={(event) => setLabel(event.target.value)} />
          <button type="button" onClick={addConnection} disabled={!entityId || !label.trim()} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"><Plus className="size-3.5" />Add</button>
        </div>
      </div>
    </Section>
  )
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
    history: l.history ?? "",
    currentState: l.currentState ?? "",
    atmosphere: l.atmosphere ?? "",
    notableFeatures: l.notableFeatures ?? "",
    hazards: l.hazards ?? "",
    population: l.population == null ? "" : String(l.population),
    populationNote: l.populationNote ?? "",
    latitude: l.coordinates?.latitude == null ? "" : String(l.coordinates.latitude),
    longitude: l.coordinates?.longitude == null ? "" : String(l.coordinates.longitude),
    elevation: l.elevation == null ? "" : String(l.elevation),
    terrain: l.terrain ?? "",
    biome: l.biome ?? "",
    climate: l.climate ?? "",
    area: l.area ?? "",
  }
}

function draftToPatch(d: Draft): LocationEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }

  const lat = d.latitude.trim()
  const lon = d.longitude.trim()
  const coordinates = lat || lon
    ? {
        latitude: lat ? Number(lat) : undefined,
        longitude: lon ? Number(lon) : undefined,
      }
    : undefined

  return {
    name: d.name.trim() || "Unnamed Location",
    type: d.type,
    region: clean(d.region),
    image: d.image || undefined,
    summary: clean(d.summary),
    description: clean(d.description),
    founded: clean(d.founded),
    history: clean(d.history),
    currentState: clean(d.currentState),
    atmosphere: clean(d.atmosphere),
    notableFeatures: clean(d.notableFeatures),
    hazards: clean(d.hazards),
    population: d.population.trim() ? Number(d.population) : undefined,
    populationNote: clean(d.populationNote),
    coordinates,
    elevation: d.elevation.trim() ? Number(d.elevation) : undefined,
    terrain: clean(d.terrain),
    biome: clean(d.biome),
    climate: clean(d.climate),
    area: clean(d.area),
  }
}

/* ------------------------------- Canon record ------------------------------ */

export function LocationCanonRecord({
  locationId,
  onModeChange,
  onOpenRecord,
  className,
}: {
  locationId: string | null
  /** Notifies the host chrome (page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  onOpenRecord?: (reference: CanonEntityReference) => void
  className?: string
}) {
  const { getLocation, updateLocation } = useLocationCanon()
  const location = getLocation(locationId)

  const openOnMap = useCallback(() => {
    if (!location?.mapEntityId) return
    window.dispatchEvent(
      new CustomEvent("world-engine:locate-location", {
        detail: { mapEntityId: location.mapEntityId, mapEntityType: location.mapEntityType ?? "settlement" },
      }),
    )
  }, [location?.mapEntityId, location?.mapEntityType])

  const openMapEditor = useCallback(() => {
    if (!location?.mapEntityId) return
    window.dispatchEvent(
      new CustomEvent("world-engine:open-location-editor", {
        detail: { mapEntityId: location.mapEntityId, mapEntityType: location.mapEntityType ?? "settlement" },
      }),
    )
  }, [location?.mapEntityId, location?.mapEntityType])

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
    if (location && draft) {
      const patch = draftToPatch(draft)
      updateLocation(location.id, patch)
      if (location.mapEntityId) {
        window.dispatchEvent(
          new CustomEvent("world-engine:sync-location-to-map", {
            detail: {
              mapEntityId: location.mapEntityId,
              mapEntityType: location.mapEntityType ?? "settlement",
              location: { ...location, ...patch },
            },
          }),
        )
      }
    }
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
        <CanonRecordHeader recordId={`location:${location.id}`} title={location.name} summary={location.summary} identityImage={draft?.image ?? location.image ?? ""} identityAlt={`View of ${location.name}`} identityFallback={<MapPin className="size-7" />} onIdentityChange={changeImage} />

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

            {location.mapEntityId && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openOnMap}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
                >
                  <MapPin className="size-3.5" />
                  Locate on Map
                </button>
                <button
                  type="button"
                  onClick={openMapEditor}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
                >
                  <Pencil className="size-3.5" />
                  Open Map Editor
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {location.population != null && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  Population: {location.population.toLocaleString()}
                </span>
              )}
              {location.elevation != null && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  Elevation: {location.elevation}m
                </span>
              )}
              {location.terrain && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  {location.terrain}
                </span>
              )}
              {location.biome && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  {location.biome}
                </span>
              )}
            </div>

            {location.description && (
              <Section title="Description">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{location.description}</p>
              </Section>
            )}

            {(location.history || location.currentState || location.atmosphere || location.notableFeatures || location.hazards || location.populationNote || location.climate || location.area || location.coordinates) && (
              <Section title="Location Details">
                <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                  {location.history && <div><span className="font-medium text-foreground">History:</span> {location.history}</div>}
                  {location.currentState && <div><span className="font-medium text-foreground">Current state:</span> {location.currentState}</div>}
                  {location.atmosphere && <div><span className="font-medium text-foreground">Atmosphere:</span> {location.atmosphere}</div>}
                  {location.notableFeatures && <div><span className="font-medium text-foreground">Notable features:</span> {location.notableFeatures}</div>}
                  {location.hazards && <div><span className="font-medium text-foreground">Hazards:</span> {location.hazards}</div>}
                  {location.populationNote && <div><span className="font-medium text-foreground">Population note:</span> {location.populationNote}</div>}
                  {location.climate && <div><span className="font-medium text-foreground">Climate:</span> {location.climate}</div>}
                  {location.area && <div><span className="font-medium text-foreground">Area:</span> {location.area}</div>}
                  {(location.coordinates?.latitude != null || location.coordinates?.longitude != null) && (
                    <div>
                      <span className="font-medium text-foreground">Coordinates:</span>{" "}
                      {location.coordinates?.latitude != null ? `${location.coordinates.latitude}°` : "?"}
                      {location.coordinates?.longitude != null ? `, ${location.coordinates.longitude}°` : ""}
                    </div>
                  )}
                </div>
              </Section>
            )}

            <ConnectedCanonSection location={location} onOpenRecord={onOpenRecord} />
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

              <Section title="Location Data">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Population"><input className={inputClass} value={draft.population} placeholder="e.g. 120000" onChange={(e) => setDraft({ ...draft, population: e.target.value })} /></Field>
                  <Field label="Population Note"><input className={inputClass} value={draft.populationNote} placeholder="Who lives here?" onChange={(e) => setDraft({ ...draft, populationNote: e.target.value })} /></Field>
                  <Field label="Terrain"><input className={inputClass} value={draft.terrain} placeholder="e.g. Rocky uplands" onChange={(e) => setDraft({ ...draft, terrain: e.target.value })} /></Field>
                  <Field label="Biome"><input className={inputClass} value={draft.biome} placeholder="e.g. Temperate forest" onChange={(e) => setDraft({ ...draft, biome: e.target.value })} /></Field>
                  <Field label="Climate"><input className={inputClass} value={draft.climate} placeholder="e.g. Mediterranean" onChange={(e) => setDraft({ ...draft, climate: e.target.value })} /></Field>
                  <Field label="Area"><input className={inputClass} value={draft.area} placeholder="e.g. 325 km²" onChange={(e) => setDraft({ ...draft, area: e.target.value })} /></Field>
                  <Field label="Elevation"><input className={inputClass} value={draft.elevation} placeholder="m" onChange={(e) => setDraft({ ...draft, elevation: e.target.value })} /></Field>
                  <Field label="Latitude"><input className={inputClass} value={draft.latitude} placeholder="e.g. 18.4" onChange={(e) => setDraft({ ...draft, latitude: e.target.value })} /></Field>
                  <Field label="Longitude"><input className={inputClass} value={draft.longitude} placeholder="e.g. 64.2" onChange={(e) => setDraft({ ...draft, longitude: e.target.value })} /></Field>
                </div>
              </Section>

              <Section title="Environment & Context">
                <div className="space-y-3">
                  <Field label="Current State"><input className={inputClass} value={draft.currentState} placeholder="Current condition or status" onChange={(e) => setDraft({ ...draft, currentState: e.target.value })} /></Field>
                  <Field label="Atmosphere"><input className={inputClass} value={draft.atmosphere} placeholder="Tone and feeling" onChange={(e) => setDraft({ ...draft, atmosphere: e.target.value })} /></Field>
                  <Field label="Notable Features"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.notableFeatures} onChange={(e) => setDraft({ ...draft, notableFeatures: e.target.value })} /></Field>
                  <Field label="Hazards / Dangers"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.hazards} onChange={(e) => setDraft({ ...draft, hazards: e.target.value })} /></Field>
                  <Field label="History"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.history} onChange={(e) => setDraft({ ...draft, history: e.target.value })} /></Field>
                </div>
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
    history: "",
    currentState: "",
    atmosphere: "",
    notableFeatures: "",
    hazards: "",
    population: "",
    populationNote: "",
    latitude: "",
    longitude: "",
    elevation: "",
    terrain: "",
    biome: "",
    climate: "",
    area: "",
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
