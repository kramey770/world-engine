"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Heart, Pencil, Trash2, Users } from "lucide-react"
import type { FamilyMember, HouseId } from "@/lib/family-data"
import { useFamilyCanon } from "@/lib/family-canon"
import {
  useCharacterCanon,
  type Character,
  type CharacterCanonReference,
  type CharacterCanonReferenceFields,
  type CharacterEdit,
  type CharacterPersonalityProfile,
  type CharacterPhysicalProfile,
} from "@/lib/character-canon"
import { useRelationshipsCanon, type CanonEntityReference, type CanonEntityType } from "@/lib/relationships-canon"
import { useLocationCanon } from "@/lib/location-canon"
import { useCultureCanon } from "@/lib/culture-canon"
import { useReligionCanon } from "@/lib/religion-canon"
import { useConceptCanon } from "@/lib/concept-canon"
import { useHistoryCanon } from "@/lib/history-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { useItemCanon } from "@/lib/item-canon"
import { useSpeciesCanon } from "@/lib/species-canon"
import { useLanguageCanon } from "@/lib/language-canon"
import { useGovernmentCanon } from "@/lib/government-canon"
import { useSystemsCanon } from "@/lib/systems-canon"
import { cn } from "@/lib/utils"
import { CanonRecordHeader } from "@/components/world/canon-record-header"

/**
 * CharacterCanonRecord — the single, reusable presentation + editing surface for
 * a Character Canon record. Both the Family Tree drawer and the standalone
 * Character Canon Page render this, so there is exactly one read-only view and
 * one edit form in the codebase. All data is read from / written to the shared
 * CharacterCanonProvider; this component never owns duplicate character state.
 */

export const HOUSE_TEXT: Record<string, string> = {
}
export const HOUSE_DOT: Record<string, string> = {
}

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

function RelationChip({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const { getCharacter } = useCharacterCanon()
  const m = getCharacter(id)
  if (!m) return null
  return (
    <button
      onClick={() => onSelect(id)}
      className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-1.5 pr-3 text-left transition-colors hover:border-primary/40 hover:bg-card"
    >
      <span className="relative size-8 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={m.portrait || "/placeholder.svg"} alt="" fill sizes="32px" className="object-cover" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-medium text-foreground">{m.name}</span>
        <span className="block truncate text-[11px] text-muted-foreground">{m.title}</span>
      </span>
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

function FactItem({ label, value, wide = false }: { label: string; value?: string; wide?: boolean }) {
  if (!value) return null
  return (
    <div className={cn("rounded-lg border border-border bg-card/50 p-3", wide && "sm:col-span-2")}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  )
}

function SnapshotItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/90">{value}</p>
    </div>
  )
}

function ConnectedCanonSection({ memberId, onOpenRecord }: { memberId: string; onOpenRecord?: (reference: CanonEntityReference) => void }) {
  const { forEntity } = useRelationshipsCanon()
  const { getLocation } = useLocationCanon()
  const relationships = forEntity({ entityType: "character", entityId: memberId })
  if (!relationships.length) return null

  return (
    <Section title="Connected Canon">
      <div className="flex flex-col gap-2">
        {relationships.map((relationship) => {
          const connected = relationship.subject.entityType === "character" && relationship.subject.entityId === memberId ? relationship.object : relationship.subject
          const name = connected.entityType === "location" ? getLocation(connected.entityId)?.name ?? connected.entityId : connected.entityId
          return (
            <button key={relationship.id} type="button" onClick={() => onOpenRecord?.(connected)} className="rounded-lg border border-border bg-card/60 px-3 py-2 text-left hover:border-primary/40 hover:bg-card">
              <span className="block truncate text-sm font-medium">{name}</span>
              <span className="block truncate text-xs text-muted-foreground">{relationship.label} · {relationship.status}</span>
            </button>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------------------------- Draft ---------------------------------- */

type Draft = {
  name: string
  portrait: string
  title: string
  role: string
  house: HouseId
  birthHouse: HouseId
  born: string
  died: string
  bio: string
  parents: string[]
  spouseId: string
  childrenIds: string[]
  aliases: string
  pronouns: string
  classification: string
  culture: string
  origin: string
  currentLocation: string
  affiliations: string
  languages: string
  possessions: string
  physicalDescription: string
  voiceAndMannerisms: string
  distinguishingTraits: string
  physicalProfile: CharacterPhysicalProfile
  personalityProfile: CharacterPersonalityProfile
  canonReferences: CharacterCanonReferenceFields
  canonSummary: string
  desire: string
  need: string
  fear: string
  coreValues: string
  falseBelief: string
  contradiction: string
  moralBoundary: string
  formativePressure: string
  misunderstanding: string
  changeTrigger: string
  refusal: string
  narrativeFunction: string
  canonConfidence: "confirmed" | "provisional" | "disputed" | "unknown"
  openQuestions: string
  researchNotes: string
  authorNotes: string
}

function toDraft(m: Character): Draft {
  return {
    name: m.name ?? "",
    portrait: m.portrait ?? "",
    title: m.title ?? "",
    role: m.role ?? "",
    house: m.house,
    birthHouse: m.birthHouse,
    born: m.born ?? "",
    died: m.died ?? "",
    bio: m.bio ?? "",
    parents: m.parents ?? [],
    spouseId: m.spouseId ?? "",
    childrenIds: m.childrenIds ?? [],
    aliases: m.aliases?.join(", ") ?? "",
    pronouns: m.pronouns ?? "",
    classification: m.classification ?? "",
    culture: m.culture ?? "",
    origin: m.origin ?? "",
    currentLocation: m.currentLocation ?? "",
    affiliations: m.affiliations?.join(", ") ?? "",
    languages: m.languages?.join(", ") ?? "",
    possessions: m.possessions?.join(", ") ?? "",
    physicalDescription: m.physicalDescription ?? "",
    voiceAndMannerisms: m.voiceAndMannerisms ?? "",
    distinguishingTraits: m.distinguishingTraits?.join(", ") ?? "",
    physicalProfile: m.physicalProfile ?? {},
    personalityProfile: m.personalityProfile ?? {},
    canonReferences: {
      speciesRef: m.speciesRef,
      cultureRef: m.cultureRef,
      religionRef: m.religionRef,
      originLocationRef: m.originLocationRef,
      currentLocationRef: m.currentLocationRef,
      affiliationRefs: m.affiliationRefs,
      languageRefs: m.languageRefs,
      possessionRefs: m.possessionRefs,
      organizationRefs: m.organizationRefs,
      conceptRefs: m.conceptRefs,
      historyRefs: m.historyRefs,
      locationRefs: m.locationRefs,
      itemRefs: m.itemRefs,
      otherCanonRefs: m.otherCanonRefs,
    },
    canonSummary: m.canonSummary ?? "",
    desire: m.desire ?? "",
    need: m.need ?? "",
    fear: m.fear ?? "",
    coreValues: m.coreValues?.join(", ") ?? "",
    falseBelief: m.falseBelief ?? "",
    contradiction: m.contradiction ?? "",
    moralBoundary: m.moralBoundary ?? "",
    formativePressure: m.formativePressure ?? "",
    misunderstanding: m.misunderstanding ?? "",
    changeTrigger: m.changeTrigger ?? "",
    refusal: m.refusal ?? "",
    narrativeFunction: m.narrativeFunction ?? "",
    canonConfidence: m.canonConfidence ?? "unknown",
    openQuestions: m.openQuestions?.join(", ") ?? "",
    researchNotes: m.researchNotes ?? "",
    authorNotes: m.authorNotes ?? "",
  }
}

function emptyDraft(): Draft {
  return toDraft({
    id: "new-character",
    name: "",
    portrait: "",
    title: "",
    bio: "",
    house: "",
    birthHouse: "",
  } as Character)
}

function cleanPhysicalProfile(profile: CharacterPhysicalProfile): CharacterPhysicalProfile | undefined {
  const clean = (value?: string) => value?.trim() || undefined
  const cleanList = (value?: string[]) => {
    const entries = value?.map((item) => item.trim()).filter(Boolean)
    return entries?.length ? entries : undefined
  }
  const cleaned: CharacterPhysicalProfile = {
    sexOrGenderPresentation: clean(profile.sexOrGenderPresentation),
    age: clean(profile.age),
    lifeStage: clean(profile.lifeStage),
    height: clean(profile.height),
    weight: clean(profile.weight),
    build: clean(profile.build),
    skin: clean(profile.skin),
    hair: clean(profile.hair),
    eyes: clean(profile.eyes),
    face: clean(profile.face),
    body: clean(profile.body),
    scars: cleanList(profile.scars),
    tattoos: cleanList(profile.tattoos),
    birthmarks: cleanList(profile.birthmarks),
    injuries: cleanList(profile.injuries),
    abnormalities: cleanList(profile.abnormalities),
    posture: clean(profile.posture),
  }
  return Object.values(cleaned).some((value) => value !== undefined) ? cleaned : undefined
}

function cleanPersonalityProfile(profile: CharacterPersonalityProfile): CharacterPersonalityProfile | undefined {
  const clean = (value?: string) => value?.trim() || undefined
  const cleanList = (value?: string[]) => {
    const entries = value?.map((item) => item.trim()).filter(Boolean)
    return entries?.length ? entries : undefined
  }
  const cleaned: CharacterPersonalityProfile = {
    temperament: clean(profile.temperament),
    traits: cleanList(profile.traits),
    strengths: cleanList(profile.strengths),
    flaws: cleanList(profile.flaws),
    socialDisposition: clean(profile.socialDisposition),
    emotionalDisposition: clean(profile.emotionalDisposition),
    communicationStyle: clean(profile.communicationStyle),
    beliefs: cleanList(profile.beliefs),
    motivations: cleanList(profile.motivations),
    ambitions: cleanList(profile.ambitions),
    insecurities: cleanList(profile.insecurities),
    vulnerabilities: cleanList(profile.vulnerabilities),
    worldview: clean(profile.worldview),
    internalConflicts: cleanList(profile.internalConflicts),
  }
  return Object.values(cleaned).some((value) => value !== undefined) ? cleaned : undefined
}

function draftToPatch(d: Draft): CharacterEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }
  const arr = (a: string[]) => (a.length ? a : undefined)
  const list = (s: string) => {
    const values = s.split(",").map((value) => value.trim()).filter(Boolean)
    return values.length ? values : undefined
  }
  return {
    name: d.name.trim() || "Unnamed",
    portrait: d.portrait || undefined,
    title: clean(d.title),
    role: clean(d.role),
    house: d.house,
    birthHouse: d.birthHouse,
    born: clean(d.born),
    died: clean(d.died),
    bio: clean(d.bio),
    parents: arr(d.parents),
    spouseId: d.spouseId || undefined,
    childrenIds: arr(d.childrenIds),
    aliases: list(d.aliases),
    pronouns: clean(d.pronouns),
    classification: clean(d.classification),
    culture: clean(d.culture),
    origin: clean(d.origin),
    currentLocation: clean(d.currentLocation),
    affiliations: list(d.affiliations),
    languages: list(d.languages),
    possessions: list(d.possessions),
    physicalDescription: clean(d.physicalDescription),
    voiceAndMannerisms: clean(d.voiceAndMannerisms),
    distinguishingTraits: list(d.distinguishingTraits),
    physicalProfile: cleanPhysicalProfile(d.physicalProfile),
    personalityProfile: cleanPersonalityProfile(d.personalityProfile),
    ...d.canonReferences,
    canonSummary: clean(d.canonSummary),
    desire: clean(d.desire),
    need: clean(d.need),
    fear: clean(d.fear),
    coreValues: list(d.coreValues),
    falseBelief: clean(d.falseBelief),
    contradiction: clean(d.contradiction),
    moralBoundary: clean(d.moralBoundary),
    formativePressure: clean(d.formativePressure),
    misunderstanding: clean(d.misunderstanding),
    changeTrigger: clean(d.changeTrigger),
    refusal: clean(d.refusal),
    narrativeFunction: clean(d.narrativeFunction),
    canonConfidence: d.canonConfidence,
    openQuestions: list(d.openQuestions),
    researchNotes: clean(d.researchNotes),
    authorNotes: clean(d.authorNotes),
  }
}

/* ------------------------------- Edit fields ------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

function StringListEditor({ label, value, onChange }: { label: string; value?: string[]; onChange: (value: string[] | undefined) => void }) {
  const items = value ?? []
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {items.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <input className={inputClass} value={item} onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? event.target.value : current))} />
          <button type="button" className="px-2 text-xs text-muted-foreground hover:text-destructive" aria-label={`Remove ${label} entry`} onClick={() => {
            const next = items.filter((_, itemIndex) => itemIndex !== index)
            onChange(next.length ? next : undefined)
          }}>Remove</button>
        </div>
      ))}
      <button type="button" className="self-start text-xs font-medium text-primary hover:underline" onClick={() => onChange([...items, ""])}>+ Add {label.toLowerCase()}</button>
    </div>
  )
}

type CanonOption = CanonEntityReference & { name: string }

function referenceFor<T extends CanonEntityType>(entityType: T, reference?: CanonEntityReference): CharacterCanonReference<T> | undefined {
  return reference ? { entityType, entityId: reference.entityId } : undefined
}

function referencesFor<T extends CanonEntityType>(entityType: T, references?: CanonEntityReference[]): CharacterCanonReference<T>[] | undefined {
  const matching = references?.filter((reference) => reference.entityType === entityType).map((reference) => ({ entityType, entityId: reference.entityId }))
  return matching?.length ? matching : undefined
}

function hasProfileContent<T extends object>(profile?: T) {
  return Object.values(profile ?? {}).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value))
}

function referenceKey(reference: CanonEntityReference) {
  return `${reference.entityType}:${reference.entityId}`
}

function useCanonOptions() {
  const { characters } = useCharacterCanon()
  const { locations } = useLocationCanon()
  const { cultures } = useCultureCanon()
  const { religions } = useReligionCanon()
  const { concepts } = useConceptCanon()
  const { histories } = useHistoryCanon()
  const { organizations } = useOrganizationCanon()
  const { items } = useItemCanon()
  const { species } = useSpeciesCanon()
  const { languages } = useLanguageCanon()
  const { governments } = useGovernmentCanon()
  const { records: systems } = useSystemsCanon()

  return useMemo<CanonOption[]>(() => {
    const optionsFor = (entityType: CanonEntityType, records: Record<string, { id: string; name: string }>): CanonOption[] =>
      Object.values(records).map(({ id, name }) => ({ entityType, entityId: id, name }))

    return [
      ...optionsFor("character", characters),
      ...optionsFor("location", locations),
      ...optionsFor("culture", cultures),
      ...optionsFor("religion", religions),
      ...optionsFor("concept", concepts),
      ...optionsFor("history", histories),
      ...optionsFor("organization", organizations),
      ...optionsFor("item", items),
      ...optionsFor("species", species),
      ...optionsFor("language", languages),
      ...optionsFor("government", governments),
      ...Object.values(systems).flatMap((domainRecords) => optionsFor("system", domainRecords)),
    ].sort((left, right) => left.name.localeCompare(right.name))
  }, [characters, concepts, cultures, governments, histories, items, languages, locations, organizations, religions, species, systems])
}

function CanonReferencePicker({
  label,
  entityType,
  value,
  options,
  onChange,
}: {
  label: string
  entityType: CanonEntityType
  value?: CanonEntityReference
  options: CanonOption[]
  onChange: (value?: CanonEntityReference) => void
}) {
  const matching = options.filter((option) => option.entityType === entityType)
  const selected = value?.entityType === entityType ? value.entityId : ""
  const selectedExists = matching.some((option) => option.entityId === selected)

  return (
    <Field label={label}>
      <select
        className={inputClass}
        value={selected}
        onChange={(event) => onChange(event.target.value ? { entityType, entityId: event.target.value } : undefined)}
      >
        <option value="">No linked record</option>
        {!selectedExists && selected && <option value={selected}>Unresolved record · {selected}</option>}
        {matching.map((option) => <option key={option.entityId} value={option.entityId}>{option.name}</option>)}
      </select>
      {!matching.length && <span className="text-[11px] text-muted-foreground">No existing {label.toLowerCase()} records are available to select.</span>}
    </Field>
  )
}

function CanonReferenceListPicker({
  label,
  value,
  options,
  onChange,
  entityType,
}: {
  label: string
  value?: CanonEntityReference[]
  options: CanonOption[]
  onChange: (value: CanonEntityReference[] | undefined) => void
  entityType?: CanonEntityType
}) {
  const selected = value ?? []
  const available = options.filter((option) =>
    (!entityType || option.entityType === entityType) &&
    !selected.some((reference) => referenceKey(reference) === referenceKey(option)),
  )

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {selected.map((reference) => {
          const option = options.find((candidate) => referenceKey(candidate) === referenceKey(reference))
          return (
            <span key={referenceKey(reference)} className="inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs">
              <span className="max-w-56 truncate">{option?.name ?? `${reference.entityType} · ${reference.entityId}`}</span>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Remove ${option?.name ?? reference.entityId}`}
                onClick={() => {
                  const next = selected.filter((current) => referenceKey(current) !== referenceKey(reference))
                  onChange(next.length ? next : undefined)
                }}
              >×</button>
            </span>
          )
        })}
      </div>
      <select
        className={inputClass}
        value=""
        aria-label={`Add ${label}`}
        onChange={(event) => {
          const option = available.find((candidate) => referenceKey(candidate) === event.target.value)
          if (option) onChange([...selected, { entityType: option.entityType, entityId: option.entityId }])
        }}
      >
        <option value="">Add existing Canon record…</option>
        {available.map((option) => (
          <option key={referenceKey(option)} value={referenceKey(option)}>
            {option.name} · {option.entityType}
          </option>
        ))}
      </select>
      {!available.length && !selected.length && <span className="text-[11px] text-muted-foreground">No matching existing Canon records.</span>}
    </div>
  )
}

function CanonReferenceDisplay({
  references,
  options,
  onOpenRecord,
}: {
  references?: CanonEntityReference[]
  options: CanonOption[]
  onOpenRecord?: (reference: CanonEntityReference) => void
}) {
  if (!references?.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {references.map((reference) => {
        const name = options.find((option) => referenceKey(option) === referenceKey(reference))?.name ?? reference.entityId
        const content = <><span className="block truncate text-sm font-medium">{name}</span><span className="block text-[11px] capitalize text-muted-foreground">{reference.entityType}</span></>
        return onOpenRecord ? (
          <button key={referenceKey(reference)} type="button" onClick={() => onOpenRecord(reference)} className="max-w-full rounded-lg border border-border bg-card/50 px-3 py-2 text-left hover:border-primary/40">
            {content}
          </button>
        ) : (
          <div key={referenceKey(reference)} className="max-w-full rounded-lg border border-border bg-card/50 px-3 py-2">{content}</div>
        )
      })}
    </div>
  )
}

function PeoplePicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: FamilyMember[]
  value: string[]
  onChange: (ids: string[]) => void
}) {
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  }
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = value.includes(o.id)
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => toggle(o.id)}
              aria-pressed={on}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition-colors",
                on
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
              )}
            >
              {o.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CanonEntitySelect({
  value,
  options,
  onChange,
  label,
}: {
  value?: CanonEntityReference
  options: CanonOption[]
  onChange: (value?: CanonEntityReference) => void
  label: string
}) {
  const groups = options.reduce<Record<string, CanonOption[]>>((result, option) => {
    const group = result[option.entityType] ?? []
    group.push(option)
    result[option.entityType] = group
    return result
  }, {})
  const currentKey = value ? referenceKey(value) : ""
  const currentExists = options.some((option) => referenceKey(option) === currentKey)

  return (
    <select
      className={inputClass}
      value={currentKey}
      aria-label={label}
      onChange={(event) => {
        const option = options.find((candidate) => referenceKey(candidate) === event.target.value)
        onChange(option ? { entityType: option.entityType, entityId: option.entityId } : undefined)
      }}
    >
      <option value="">Select an existing Canon record</option>
      {!currentExists && value && <option value={currentKey}>Unresolved · {value.entityType} · {value.entityId}</option>}
      {Object.entries(groups).map(([entityType, records]) => (
        <optgroup key={entityType} label={entityType[0].toUpperCase() + entityType.slice(1)}>
          {records?.map((option) => <option key={referenceKey(option)} value={referenceKey(option)}>{option.name}</option>)}
        </optgroup>
      ))}
    </select>
  )
}

function CharacterInfluencesSection({
  characterId,
  editing,
  options,
}: {
  characterId: string
  editing: boolean
  options: CanonOption[]
}) {
  const { influences, addInfluence, updateInfluence, deleteInfluence } = useCharacterCanon()
  const [newEntity, setNewEntity] = useState<CanonEntityReference>()
  const characterInfluences = Object.values(influences).filter((influence) => influence.characterId === characterId)

  const displayName = (reference: CanonEntityReference) =>
    options.find((option) => referenceKey(option) === referenceKey(reference))?.name ?? `${reference.entityType} · ${reference.entityId}`
  if (!editing && !characterInfluences.length) return null

  return (
    <div className="flex flex-col gap-3">
        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Character Influences</h4>
        {characterInfluences.map((influence) => (
          <article key={influence.id} className="border-l-2 border-primary/30 pl-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {editing ? (
                  <Field label="Influencing Canon record">
                    <CanonEntitySelect
                      label={`Influence from ${displayName(influence.entity)}`}
                      value={influence.entity}
                      options={options}
                      onChange={(entity) => entity && updateInfluence(influence.id, { entity })}
                    />
                  </Field>
                ) : (
                  <p className="truncate text-sm font-medium">{displayName(influence.entity)}</p>
                )}
              </div>
              {editing && (
                <button type="button" onClick={() => deleteInfluence(influence.id)} className="text-xs text-muted-foreground hover:text-destructive">
                  Remove
                </button>
              )}
            </div>
            {editing ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field label="Influence type">
                  <input className={inputClass} value={influence.influenceType ?? ""} onChange={(event) => updateInfluence(influence.id, { influenceType: event.target.value || undefined })} />
                </Field>
                <Field label="Direction">
                  <select className={inputClass} value={influence.direction ?? "formative"} onChange={(event) => updateInfluence(influence.id, { direction: event.target.value as typeof influence.direction })}>
                    <option value="positive">Positive</option><option value="negative">Negative</option><option value="mixed">Mixed</option><option value="formative">Formative</option>
                  </select>
                </Field>
                <Field label="Importance">
                  <select className={inputClass} value={influence.importance ?? "unknown"} onChange={(event) => updateInfluence(influence.id, { importance: event.target.value as typeof influence.importance })}>
                    <option value="minor">Minor</option><option value="moderate">Moderate</option><option value="major">Major</option><option value="foundational">Foundational</option><option value="unknown">Unknown</option>
                  </select>
                </Field>
                <Field label="Time expression">
                  <input className={inputClass} value={influence.timeExpression ?? ""} onChange={(event) => updateInfluence(influence.id, { timeExpression: event.target.value || undefined })} />
                </Field>
                <Field label="Source IDs">
                  <input className={inputClass} value={influence.sourceIds?.join(", ") ?? ""} onChange={(event) => updateInfluence(influence.id, { sourceIds: event.target.value.split(",").map((id) => id.trim()).filter(Boolean) })} />
                </Field>
                <Field label="Character-specific explanation">
                  <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={influence.explanation ?? ""} onChange={(event) => updateInfluence(influence.id, { explanation: event.target.value || undefined })} />
                </Field>
              </div>
            ) : (
              <div className="mt-1">
                <p className="text-xs capitalize text-muted-foreground">
                  {[influence.influenceType, influence.direction, influence.importance, influence.timeExpression].filter(Boolean).join(" · ")}
                </p>
                {influence.explanation && <p className="mt-1 text-sm leading-relaxed text-foreground/85">{influence.explanation}</p>}
              </div>
            )}
          </article>
        ))}
        {editing && (
          <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row">
            <CanonEntitySelect label="Choose an existing record to add as an influence" value={newEntity} options={options} onChange={setNewEntity} />
            <button
              type="button"
              disabled={!newEntity}
              className="h-9 shrink-0 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
              onClick={() => {
                if (!newEntity) return
                addInfluence({ characterId, entity: newEntity })
                setNewEntity(undefined)
              }}
            >Add influence</button>
          </div>
        )}
        {editing && !options.length && <p className="text-xs text-muted-foreground">Create a record in its Canon system before linking it as an influence.</p>}
        {!characterInfluences.length && !editing && <p className="text-sm text-muted-foreground">No Canon influences have been recorded.</p>}
        {editing && <p className="text-xs text-muted-foreground">Influences link to existing Canon records and save to the project-scoped Character Influences collection.</p>}
    </div>
  )
}

/* ------------------------------- Canon record ------------------------------ */

export function CharacterCanonRecord({
  memberId,
  createMode = false,
  onSelect,
  onCreated,
  onModeChange,
  onOpenRecord,
  onAddHouse,
  className,
}: {
  memberId: string | null
  createMode?: boolean
  onSelect: (id: string) => void
  onCreated?: (id: string) => void
  /** Notifies the host chrome (drawer header / page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  onOpenRecord?: (reference: CanonEntityReference) => void
  onAddHouse?: () => void
  className?: string
}) {
  const { getCharacter, updateCharacter, addCharacter, deleteCharacter, characters, influences } = useCharacterCanon()
  const canonOptions = useCanonOptions()
  const { families, addFamily } = useFamilyCanon()
  const existingMember = getCharacter(memberId)
  const member = existingMember ?? {
    id: "new-character",
    name: "",
    portrait: "",
    title: "",
    bio: "",
    house: "",
    birthHouse: "",
  } as Character

  const [mode, setMode] = useState<"view" | "edit">(createMode ? "edit" : "view")
  const [draft, setDraft] = useState<Draft | null>(createMode ? emptyDraft() : null)
  const [addingFamilyFor, setAddingFamilyFor] = useState<"house" | "birthHouse" | null>(null)
  const [newFamilyName, setNewFamilyName] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)
  const familyOptions = useMemo(() => Object.values(families).sort((a, b) => a.name.localeCompare(b.name)), [families])
  const familyName = (id?: string) => id ? families[id]?.name ?? id : "No family assigned"
  const beginAddFamily = (field: "house" | "birthHouse") => {
    if (onAddHouse) onAddHouse()
    else {
      setAddingFamilyFor(field)
      setNewFamilyName("")
    }
  }
  const saveNewFamily = () => {
    if (!addingFamilyFor || !newFamilyName.trim() || !draft) return
    const family = addFamily({ name: newFamilyName.trim(), kind: "family", status: "draft" })
    setDraft({ ...draft, [addingFamilyFor]: family.id })
    setAddingFamilyFor(null)
    setNewFamilyName("")
  }

  // Always return to read-only when the selected character changes.
  useEffect(() => {
    setMode(createMode ? "edit" : "view")
    setDraft(createMode ? emptyDraft() : null)
    contentRef.current?.scrollTo({ top: 0 })
  }, [createMode, memberId])

  // Keep host chrome in sync with the current mode.
  useEffect(() => {
    onModeChange?.(mode)
  }, [mode, onModeChange])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && existingMember) setDraft(toDraft(existingMember))
  }, [existingMember, mode])

  const relationOptions = useMemo(
    () => (member ? Object.values(characters).filter((c) => c.id !== member.id) : []),
    [characters, member],
  )

  const save = useCallback(() => {
    if (existingMember && draft) updateCharacter(existingMember.id, draftToPatch(draft))
    if (!existingMember && createMode && draft) {
      const created = addCharacter({
        ...draftToPatch(draft),
        name: draft.name.trim() || "Unnamed",
        house: draft.house,
        birthHouse: draft.birthHouse,
      })
      onCreated?.(created.id)
      return
    }
    setMode("view")
  }, [addCharacter, createMode, draft, existingMember, onCreated, updateCharacter])

  const changeImage = (portrait: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, portrait })
    else if (existingMember) updateCharacter(existingMember.id, { portrait })
  }

  const lifespan = member ? [member.born, member.died].filter(Boolean).join(" – ") : ""
  const characterInfluences = Object.values(influences).some((influence) => influence.characterId === member.id)
  const referenceList = Array.from(new Map<string, CanonEntityReference>([
    ...(member.speciesRef ? [member.speciesRef] : []),
    ...(member.cultureRef ? [member.cultureRef] : []),
    ...(member.religionRef ? [member.religionRef] : []),
    ...(member.originLocationRef ? [member.originLocationRef] : []),
    ...(member.currentLocationRef ? [member.currentLocationRef] : []),
    ...(member.affiliationRefs ?? []),
    ...(member.languageRefs ?? []),
    ...(member.possessionRefs ?? []),
    ...(member.organizationRefs ?? []),
    ...(member.conceptRefs ?? []),
    ...(member.locationRefs ?? []),
    ...(member.itemRefs ?? []),
    ...(member.otherCanonRefs ?? []),
  ].map((reference) => [referenceKey(reference), reference] as const)).values())

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        <CanonRecordHeader
          recordId={`character:${member?.id ?? "new"}`}
          title={member?.name || draft?.name || "Create Character"}
          summary={member?.title}
          identityImage={draft?.portrait ?? member?.portrait}
          identityAlt={`Portrait of ${member?.name ?? "new character"}`}
          identityFallback={<Users className="size-7" />}
          onIdentityChange={changeImage}
        />

        {mode === "view" ? (
          /* ------------------------------ VIEW MODE ------------------------------ */
          <div className="flex flex-col gap-6 p-4">
            <button
              onClick={() => setMode("edit")}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <Pencil className="size-3.5" />
              Edit Character
            </button>
            {existingMember && <button type="button" onClick={() => { deleteCharacter(existingMember.id); setMode("view") }} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 text-sm text-destructive hover:bg-destructive/10"><Trash2 className="size-3.5" />Delete Character</button>}

            <Section title="Character Overview">
              <div className="flex flex-wrap gap-2">
                <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium", HOUSE_TEXT[member.house] ?? "text-primary")}>
                  <span className={cn("size-1.5 rounded-full", HOUSE_DOT[member.house] ?? "bg-primary")} />
                  {familyName(member.house)}
                </span>
                {member.role && <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">{member.role}</span>}
                {(member.born || member.died) && <span className="rounded-full border border-border bg-card px-3 py-1 text-xs tabular-nums text-muted-foreground">{lifespan}</span>}
              </div>
              <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                {member.canonSummary
                  ? <p className="text-sm leading-relaxed text-foreground/90">{member.canonSummary}</p>
                  : <p className="text-sm text-muted-foreground">No overview written yet.</p>}
                {(member.desire || member.fear || member.narrativeFunction) && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {member.desire && <SnapshotItem label="Wants" value={member.desire} />}
                    {member.fear && <SnapshotItem label="Fears" value={member.fear} />}
                    {member.narrativeFunction && <SnapshotItem label="Story role" value={member.narrativeFunction} />}
                  </div>
                )}
              </div>
            </Section>

            {(hasProfileContent(member.physicalProfile) || member.speciesRef || member.physicalDescription || member.voiceAndMannerisms || member.distinguishingTraits?.length) && (
              <Section title="Physical Appearance">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FactItem label="Sex / gender presentation" value={member.physicalProfile?.sexOrGenderPresentation} />
                  <FactItem label="Age" value={member.physicalProfile?.age} />
                  <FactItem label="Life stage" value={member.physicalProfile?.lifeStage} />
                  <FactItem label="Height" value={member.physicalProfile?.height} />
                  <FactItem label="Weight" value={member.physicalProfile?.weight} />
                  <FactItem label="Build" value={member.physicalProfile?.build} />
                  <FactItem label="Skin, hide, or scales" value={member.physicalProfile?.skin} />
                  <FactItem label="Hair or fur" value={member.physicalProfile?.hair} />
                  <FactItem label="Eyes" value={member.physicalProfile?.eyes} />
                  <FactItem label="Face" value={member.physicalProfile?.face} />
                  <FactItem label="Body" value={member.physicalProfile?.body} />
                  <FactItem label="Posture and bearing" value={member.physicalProfile?.posture} />
                  <FactItem label="Distinguishing features" value={member.distinguishingTraits?.join(", ")} wide />
                  <FactItem label="Scars" value={member.physicalProfile?.scars?.join(", ")} />
                  <FactItem label="Tattoos" value={member.physicalProfile?.tattoos?.join(", ")} />
                  <FactItem label="Birthmarks" value={member.physicalProfile?.birthmarks?.join(", ")} />
                  <FactItem label="Injuries" value={member.physicalProfile?.injuries?.join(", ")} />
                  <FactItem label="Abnormalities" value={member.physicalProfile?.abnormalities?.join(", ")} />
                  <FactItem label="Physical description" value={member.physicalDescription} wide />
                  <FactItem label="Voice and mannerisms" value={member.voiceAndMannerisms} wide />
                </div>
              </Section>
            )}

            {(hasProfileContent(member.personalityProfile) || member.desire || member.need || member.fear || member.coreValues?.length ||
              member.falseBelief || member.contradiction || member.moralBoundary || member.formativePressure ||
              member.misunderstanding || member.changeTrigger || member.refusal) && (
              <Section title="Personality">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FactItem label="Temperament" value={member.personalityProfile?.temperament} />
                  <FactItem label="Observable traits" value={member.personalityProfile?.traits?.join(", ")} />
                  <FactItem label="Strengths" value={member.personalityProfile?.strengths?.join(", ")} />
                  <FactItem label="Flaws" value={member.personalityProfile?.flaws?.join(", ")} />
                  <FactItem label="Social disposition" value={member.personalityProfile?.socialDisposition} />
                  <FactItem label="Emotional disposition" value={member.personalityProfile?.emotionalDisposition} />
                  <FactItem label="Communication style" value={member.personalityProfile?.communicationStyle} />
                  <FactItem label="Beliefs" value={member.personalityProfile?.beliefs?.join(", ")} />
                  <FactItem label="Core values" value={member.coreValues?.join(", ")} />
                  <FactItem label="Motivations" value={member.personalityProfile?.motivations?.join(", ")} />
                  <FactItem label="Ambitions" value={member.personalityProfile?.ambitions?.join(", ")} />
                  <FactItem label="Insecurities" value={member.personalityProfile?.insecurities?.join(", ")} />
                  <FactItem label="Vulnerabilities" value={member.personalityProfile?.vulnerabilities?.join(", ")} />
                  <FactItem label="Worldview" value={member.personalityProfile?.worldview} />
                  <FactItem label="What they want" value={member.desire} />
                  <FactItem label="What they need" value={member.need} />
                  <FactItem label="Fear" value={member.fear} />
                  <FactItem label="False belief" value={member.falseBelief} />
                  <FactItem label="Contradiction" value={member.contradiction} />
                  <FactItem label="Internal conflicts" value={member.personalityProfile?.internalConflicts?.join(", ")} />
                  <FactItem label="Moral boundary" value={member.moralBoundary} />
                  <FactItem label="Formative pressure" value={member.formativePressure} />
                  <FactItem label="Misunderstands" value={member.misunderstanding} />
                  <FactItem label="What changes their mind" value={member.changeTrigger} />
                  <FactItem label="Refuses to become" value={member.refusal} />
                </div>
              </Section>
            )}

            {(member.bio || member.historyRefs?.length || characterInfluences) && (
              <Section title="History & Influences">
                {member.bio && <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{member.bio}</p>}
                <CanonReferenceDisplay references={member.historyRefs} options={canonOptions} onOpenRecord={onOpenRecord} />
                <CharacterInfluencesSection characterId={member.id} editing={false} options={canonOptions} />
              </Section>
            )}

            <Section title="Identity & Canon Facts">
              <div className="grid gap-3 sm:grid-cols-2">
                <FactItem label="Aliases" value={member.aliases?.join(", ")} />
                <FactItem label="Pronouns" value={member.pronouns} />
                <FactItem label="Classification" value={member.classification} />
                <FactItem label="Culture" value={member.culture} />
                <FactItem label="Origin" value={member.origin} />
                <FactItem label="Current location" value={member.currentLocation} />
                <FactItem label="Affiliations" value={member.affiliations?.join(", ")} />
                <FactItem label="Languages" value={member.languages?.join(", ")} />
                <FactItem label="Possessions" value={member.possessions?.join(", ")} />
                <FactItem label="Titles" value={member.title} />
                <FactItem label="Role / occupation" value={member.role} />
                <FactItem label="Birth House" value={familyName(member.birthHouse)} />
                <FactItem label="Current House" value={familyName(member.house)} />
                <FactItem label="Canon confidence" value={member.canonConfidence} />
              </div>
              <div className="mt-4 flex flex-col gap-3">
                <CanonReferenceDisplay references={referenceList} options={canonOptions} onOpenRecord={onOpenRecord} />
              </div>
            </Section>

            <ConnectedCanonSection memberId={member.id} onOpenRecord={onOpenRecord} />

            {(member.canonConfidence || member.openQuestions?.length || member.researchNotes || member.authorNotes) && (
              <Section title="Canon Desk">
                <div className="rounded-xl border border-border bg-card/40 p-3">
                  {member.canonConfidence && <p className="text-xs font-medium capitalize text-muted-foreground">Canon status: <span className="text-foreground">{member.canonConfidence}</span></p>}
                  {member.openQuestions?.length ? <p className="mt-2 text-sm text-foreground/90">Open questions: {member.openQuestions.join(", ")}</p> : null}
                  {member.researchNotes && <p className="mt-2 text-sm leading-relaxed text-foreground/90">{member.researchNotes}</p>}
                  {member.authorNotes && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.authorNotes}</p>}
                </div>
              </Section>
            )}

            {(member.canonConfidence || member.openQuestions?.length || member.researchNotes || member.authorNotes) && (
              <Section title="Canon Desk">
                <div className="rounded-xl border border-border bg-card/40 p-3">
                  {member.canonConfidence && (
                    <p className="text-xs font-medium capitalize text-muted-foreground">
                      Canon status: <span className="text-foreground">{member.canonConfidence}</span>
                    </p>
                  )}
                  {member.openQuestions?.length ? (
                    <p className="mt-2 text-sm text-foreground/90">Open questions: {member.openQuestions.join(", ")}</p>
                  ) : null}
                  {member.researchNotes && <p className="mt-2 text-sm leading-relaxed text-foreground/90">{member.researchNotes}</p>}
                  {member.authorNotes && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.authorNotes}</p>}
                </div>
              </Section>
            )}

            {member.parents && member.parents.length > 0 && (
              <Section title="Parents">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {member.parents.map((id) => (
                    <RelationChip key={id} id={id} onSelect={onSelect} />
                  ))}
                </div>
              </Section>
            )}

            {member.spouseId && (
              <Section title="Spouse">
                <RelationChip id={member.spouseId} onSelect={onSelect} />
              </Section>
            )}

            {member.childrenIds && member.childrenIds.length > 0 && (
              <Section title="Children">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {member.childrenIds.map((id) => (
                    <RelationChip key={id} id={id} onSelect={onSelect} />
                  ))}
                </div>
              </Section>
            )}

            {/* Connected Houses — future-facing, shown only when populated */}
            {member.connectedHouses && member.connectedHouses.length > 0 && (
              <Section title="Connected Houses">
                <div className="rounded-xl border border-dashed border-border bg-card/40 p-3">
                  <div className="flex flex-col gap-2">
                    {member.connectedHouses.map((c) => (
                      <div
                        key={c.houseId}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex size-8 items-center justify-center rounded-md bg-muted",
                              HOUSE_TEXT[c.houseId],
                            )}
                          >
                            <Users className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <p className={cn("truncate text-xs font-medium", HOUSE_TEXT[c.houseId] ?? "text-primary")}>
                              {familyName(c.houseId)}
                            </p>
                            <p className="truncate text-[11px] text-muted-foreground">{c.relation}</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <ArrowUpRight className="size-3.5" />
                          <span className="hidden sm:inline">Explore</span>
                        </span>
                      </div>
                    ))}
                    <p className="mt-1 flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground/80">
                      <Heart className="size-3" />
                      Navigating between linked houses is coming soon.
                    </p>
                  </div>
                </div>
              </Section>
            )}
          </div>
        ) : (
          /* ------------------------------ EDIT MODE ------------------------------ */
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                {createMode ? "Create the authoritative Canon record for this character." : `This is ${member?.name.split(" ")[0]}&apos;s authoritative Canon record. Changes here update every view that reads this character.`}
              </p>

              {addingFamilyFor && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <p className="text-sm font-medium text-foreground">Create a family or house</p>
                  <p className="mt-1 text-xs text-muted-foreground">This new record will be selected as the character&apos;s {addingFamilyFor === "birthHouse" ? "Birth House" : "House"}.</p>
                  <div className="mt-3 flex gap-2">
                    <input className={inputClass} value={newFamilyName} autoFocus placeholder="Family or house name" onChange={(event) => setNewFamilyName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") saveNewFamily() }} />
                    <button type="button" onClick={saveNewFamily} className="h-9 shrink-0 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">Create</button>
                    <button type="button" onClick={() => setAddingFamilyFor(null)} className="h-9 shrink-0 rounded-lg border border-border px-3 text-sm">Cancel</button>
                  </div>
                </div>
              )}

              <Section title="Character Overview">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Name">
                    <input className={inputClass} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
                  </Field>
                  <Field label="Title">
                    <input className={inputClass} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
                  </Field>
                  <Field label="Role / occupation">
                    <input className={inputClass} value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} />
                  </Field>
                  <Field label="Narrative function">
                    <input className={inputClass} value={draft.narrativeFunction} onChange={(event) => setDraft({ ...draft, narrativeFunction: event.target.value })} />
                  </Field>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <Field label="Character overview">
                    <textarea className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")} value={draft.canonSummary} onChange={(event) => setDraft({ ...draft, canonSummary: event.target.value })} />
                  </Field>
                  <Field label="Canon confidence">
                    <select className={inputClass} value={draft.canonConfidence} onChange={(event) => setDraft({ ...draft, canonConfidence: event.target.value as Draft["canonConfidence"] })}>
                      <option value="confirmed">Confirmed</option><option value="provisional">Provisional</option><option value="disputed">Disputed</option><option value="unknown">Unknown</option>
                    </select>
                  </Field>
                </div>
              </Section>

              <Section title="Physical Appearance">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Sex / gender presentation"><input className={inputClass} value={draft.physicalProfile.sexOrGenderPresentation ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, sexOrGenderPresentation: event.target.value } })} /></Field>
                  <Field label="Age or age range"><input className={inputClass} value={draft.physicalProfile.age ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, age: event.target.value } })} /></Field>
                  <Field label="Life stage"><input className={inputClass} value={draft.physicalProfile.lifeStage ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, lifeStage: event.target.value } })} /></Field>
                  <CanonReferencePicker label="Species Canon record" entityType="species" value={draft.canonReferences.speciesRef} options={canonOptions} onChange={(reference) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, speciesRef: referenceFor("species", reference) } })} />
                  <Field label="Height"><input className={inputClass} value={draft.physicalProfile.height ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, height: event.target.value } })} /></Field>
                  <Field label="Weight"><input className={inputClass} value={draft.physicalProfile.weight ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, weight: event.target.value } })} /></Field>
                  <Field label="Build / body type"><input className={inputClass} value={draft.physicalProfile.build ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, build: event.target.value } })} /></Field>
                  <Field label="Skin, hide, or scales"><input className={inputClass} value={draft.physicalProfile.skin ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, skin: event.target.value } })} /></Field>
                  <Field label="Hair or fur"><input className={inputClass} value={draft.physicalProfile.hair ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, hair: event.target.value } })} /></Field>
                  <Field label="Eyes"><input className={inputClass} value={draft.physicalProfile.eyes ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, eyes: event.target.value } })} /></Field>
                  <Field label="Face"><input className={inputClass} value={draft.physicalProfile.face ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, face: event.target.value } })} /></Field>
                  <Field label="Body"><input className={inputClass} value={draft.physicalProfile.body ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, body: event.target.value } })} /></Field>
                  <Field label="Posture and bearing"><input className={inputClass} value={draft.physicalProfile.posture ?? ""} onChange={(event) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, posture: event.target.value } })} /></Field>
                  <Field label="Physical description">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.physicalDescription} onChange={(event) => setDraft({ ...draft, physicalDescription: event.target.value })} />
                  </Field>
                  <Field label="Voice characteristics">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.voiceAndMannerisms} onChange={(event) => setDraft({ ...draft, voiceAndMannerisms: event.target.value })} />
                  </Field>
                </div>
                <details className="mt-4 border-t border-border pt-3">
                  <summary className="cursor-pointer text-sm font-medium text-foreground">Distinctive physical markers</summary>
                  <div className="mt-3 flex flex-col gap-4">
                    <StringListEditor label="Distinguishing features" value={draft.distinguishingTraits.split(",").map((item) => item.trim()).filter(Boolean)} onChange={(value) => setDraft({ ...draft, distinguishingTraits: value?.join(", ") ?? "" })} />
                    {(["scars", "tattoos", "birthmarks", "injuries", "abnormalities"] as const).map((key) => (
                      <StringListEditor key={key} label={key} value={draft.physicalProfile[key]} onChange={(value) => setDraft({ ...draft, physicalProfile: { ...draft.physicalProfile, [key]: value } })} />
                    ))}
                  </div>
                </details>
              </Section>

              <Section title="Personality">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Temperament"><input className={inputClass} value={draft.personalityProfile.temperament ?? ""} onChange={(event) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, temperament: event.target.value } })} /></Field>
                  <Field label="Social disposition"><input className={inputClass} value={draft.personalityProfile.socialDisposition ?? ""} onChange={(event) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, socialDisposition: event.target.value } })} /></Field>
                  <Field label="Emotional disposition"><input className={inputClass} value={draft.personalityProfile.emotionalDisposition ?? ""} onChange={(event) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, emotionalDisposition: event.target.value } })} /></Field>
                  <Field label="Communication style"><input className={inputClass} value={draft.personalityProfile.communicationStyle ?? ""} onChange={(event) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, communicationStyle: event.target.value } })} /></Field>
                  <Field label="What they want">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.desire} onChange={(event) => setDraft({ ...draft, desire: event.target.value })} />
                  </Field>
                  <Field label="What they need">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.need} onChange={(event) => setDraft({ ...draft, need: event.target.value })} />
                  </Field>
                  <Field label="Central fear">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.fear} onChange={(event) => setDraft({ ...draft, fear: event.target.value })} />
                  </Field>
                  <StringListEditor label="Core values" value={draft.coreValues.split(",").map((item) => item.trim()).filter(Boolean)} onChange={(value) => setDraft({ ...draft, coreValues: value?.join(", ") ?? "" })} />
                </div>
                <details className="mt-4 border-t border-border pt-3">
                  <summary className="cursor-pointer text-sm font-medium text-foreground">Traits, beliefs, and inner conflicts</summary>
                  <div className="mt-3 flex flex-col gap-4">
                    {(["traits", "strengths", "flaws", "beliefs", "motivations", "ambitions", "insecurities", "vulnerabilities", "internalConflicts"] as const).map((key) => (
                      <StringListEditor key={key} label={key === "internalConflicts" ? "Internal conflicts" : key} value={draft.personalityProfile[key]} onChange={(value) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, [key]: value } })} />
                    ))}
                    <Field label="Worldview"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.personalityProfile.worldview ?? ""} onChange={(event) => setDraft({ ...draft, personalityProfile: { ...draft.personalityProfile, worldview: event.target.value } })} /></Field>
                    <Field label="False belief"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.falseBelief} onChange={(event) => setDraft({ ...draft, falseBelief: event.target.value })} /></Field>
                    <Field label="Contradiction"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.contradiction} onChange={(event) => setDraft({ ...draft, contradiction: event.target.value })} /></Field>
                    <Field label="Moral boundary"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.moralBoundary} onChange={(event) => setDraft({ ...draft, moralBoundary: event.target.value })} /></Field>
                    <Field label="Formative pressure"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.formativePressure} onChange={(event) => setDraft({ ...draft, formativePressure: event.target.value })} /></Field>
                    <Field label="Misunderstanding"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.misunderstanding} onChange={(event) => setDraft({ ...draft, misunderstanding: event.target.value })} /></Field>
                    <Field label="Change trigger"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.changeTrigger} onChange={(event) => setDraft({ ...draft, changeTrigger: event.target.value })} /></Field>
                    <Field label="What they refuse to become"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.refusal} onChange={(event) => setDraft({ ...draft, refusal: event.target.value })} /></Field>
                  </div>
                </details>
              </Section>

              <Section title="History & Influences">
                <Field label="Biography and authored life experiences">
                  <textarea className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")} value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} />
                </Field>
                <div className="mt-4 flex flex-col gap-4">
                  <CanonReferenceListPicker label="History Canon records" entityType="history" value={draft.canonReferences.historyRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, historyRefs: referencesFor("history", references) } })} />
                  {existingMember
                    ? <CharacterInfluencesSection characterId={existingMember.id} editing options={canonOptions} />
                    : <p className="text-xs text-muted-foreground">Save the Character before adding Character Influences.</p>}
                </div>
              </Section>

              <Section title="Identity & Canon Facts">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Aliases (comma separated)"><input className={inputClass} value={draft.aliases} onChange={(event) => setDraft({ ...draft, aliases: event.target.value })} /></Field>
                  <Field label="Pronouns"><input className={inputClass} value={draft.pronouns} onChange={(event) => setDraft({ ...draft, pronouns: event.target.value })} /></Field>
                  <Field label="Classification"><input className={inputClass} value={draft.classification} onChange={(event) => setDraft({ ...draft, classification: event.target.value })} /></Field>
                  <Field label="Culture"><input className={inputClass} value={draft.culture} onChange={(event) => setDraft({ ...draft, culture: event.target.value })} /></Field>
                  <Field label="Origin"><input className={inputClass} value={draft.origin} onChange={(event) => setDraft({ ...draft, origin: event.target.value })} /></Field>
                  <Field label="Current location"><input className={inputClass} value={draft.currentLocation} onChange={(event) => setDraft({ ...draft, currentLocation: event.target.value })} /></Field>
                  <Field label="Birth date"><input className={inputClass} value={draft.born} onChange={(event) => setDraft({ ...draft, born: event.target.value })} /></Field>
                  <Field label="Death date"><input className={inputClass} value={draft.died} onChange={(event) => setDraft({ ...draft, died: event.target.value })} /></Field>
                  <Field label="Affiliations (comma separated)"><input className={inputClass} value={draft.affiliations} onChange={(event) => setDraft({ ...draft, affiliations: event.target.value })} /></Field>
                  <Field label="Languages (comma separated)"><input className={inputClass} value={draft.languages} onChange={(event) => setDraft({ ...draft, languages: event.target.value })} /></Field>
                  <Field label="Possessions (comma separated)"><input className={inputClass} value={draft.possessions} onChange={(event) => setDraft({ ...draft, possessions: event.target.value })} /></Field>
                  <Field label="Open questions (comma separated)"><input className={inputClass} value={draft.openQuestions} onChange={(event) => setDraft({ ...draft, openQuestions: event.target.value })} /></Field>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Current House (House ID)">
                    <select className={inputClass} value={draft.house} onChange={(event) => event.target.value === "__add__" ? beginAddFamily("house") : setDraft({ ...draft, house: event.target.value as HouseId })}>
                      <option value="">No family assigned</option>{familyOptions.map((family) => <option key={family.id} value={family.id}>{family.name}</option>)}<option value="__add__">+ Add House</option>
                    </select>
                  </Field>
                  <Field label="Birth House (House ID)">
                    <select className={inputClass} value={draft.birthHouse} onChange={(event) => event.target.value === "__add__" ? beginAddFamily("birthHouse") : setDraft({ ...draft, birthHouse: event.target.value as HouseId })}>
                      <option value="">No family assigned</option>{familyOptions.map((family) => <option key={family.id} value={family.id}>{family.name}</option>)}<option value="__add__">+ Add House</option>
                    </select>
                  </Field>
                </div>
                <details className="mt-4 border-t border-border pt-3">
                  <summary className="cursor-pointer text-sm font-medium text-foreground">Connect existing Canon records</summary>
                  <div className="mt-3 flex flex-col gap-4">
                    <CanonReferencePicker label="Culture Canon record" entityType="culture" value={draft.canonReferences.cultureRef} options={canonOptions} onChange={(reference) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, cultureRef: referenceFor("culture", reference) } })} />
                    <CanonReferencePicker label="Religion Canon record" entityType="religion" value={draft.canonReferences.religionRef} options={canonOptions} onChange={(reference) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, religionRef: referenceFor("religion", reference) } })} />
                    <CanonReferencePicker label="Origin Location Canon record" entityType="location" value={draft.canonReferences.originLocationRef} options={canonOptions} onChange={(reference) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, originLocationRef: referenceFor("location", reference) } })} />
                    <CanonReferencePicker label="Current Location Canon record" entityType="location" value={draft.canonReferences.currentLocationRef} options={canonOptions} onChange={(reference) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, currentLocationRef: referenceFor("location", reference) } })} />
                    <CanonReferenceListPicker label="Additional locations" entityType="location" value={draft.canonReferences.locationRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, locationRefs: referencesFor("location", references) } })} />
                    <CanonReferenceListPicker label="Organizations and factions" entityType="organization" value={draft.canonReferences.organizationRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, organizationRefs: referencesFor("organization", references) } })} />
                    <CanonReferenceListPicker label="Languages" entityType="language" value={draft.canonReferences.languageRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, languageRefs: referencesFor("language", references) } })} />
                    <CanonReferenceListPicker label="Concepts" entityType="concept" value={draft.canonReferences.conceptRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, conceptRefs: referencesFor("concept", references) } })} />
                    <CanonReferenceListPicker label="Items and possessions" entityType="item" value={draft.canonReferences.itemRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, itemRefs: referencesFor("item", references) } })} />
                    <CanonReferenceListPicker label="Other Canon connections" value={draft.canonReferences.otherCanonRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, otherCanonRefs: references } })} />
                    <CanonReferenceListPicker label="Additional affiliations" value={draft.canonReferences.affiliationRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, affiliationRefs: references } })} />
                    <CanonReferenceListPicker label="Additional possessions" value={draft.canonReferences.possessionRefs} options={canonOptions} onChange={(references) => setDraft({ ...draft, canonReferences: { ...draft.canonReferences, possessionRefs: references } })} />
                  </div>
                </details>
              </Section>

              <details className="rounded-lg border border-border px-3 py-2">
                <summary className="cursor-pointer text-sm font-medium">Canon Desk notes</summary>
                <div className="mt-3 flex flex-col gap-3">
                  <Field label="Research notes"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.researchNotes} onChange={(event) => setDraft({ ...draft, researchNotes: event.target.value })} /></Field>
                  <Field label="Author notes"><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2")} value={draft.authorNotes} onChange={(event) => setDraft({ ...draft, authorNotes: event.target.value })} /></Field>
                </div>
              </details>

              <Section title="Relationships">
                <div className="flex flex-col gap-4">
                  <PeoplePicker
                    label="Parents"
                    options={relationOptions}
                    value={draft.parents}
                    onChange={(parents) => setDraft({ ...draft, parents })}
                  />
                  <Field label="Spouse">
                    <select
                      className={inputClass}
                      value={draft.spouseId}
                      onChange={(e) => setDraft({ ...draft, spouseId: e.target.value })}
                    >
                      <option value="">None</option>
                      {relationOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <PeoplePicker
                    label="Children"
                    options={relationOptions}
                    value={draft.childrenIds}
                    onChange={(childrenIds) => setDraft({ ...draft, childrenIds })}
                  />
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
            {createMode ? "Create Character" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  )
}
