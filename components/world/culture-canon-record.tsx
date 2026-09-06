"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Globe2, Pencil } from "lucide-react"
import Image from "next/image"
import {
  CULTURE_TYPES,
  cultureTypeLabel,
  useCultureCanon,
  type CanonCulture,
  type CultureEdit,
  type CultureType,
} from "@/lib/culture-canon"
import { cn } from "@/lib/utils"
import { CanonImageField } from "@/components/world/canon-image-field"

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

function NarrativeField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
}) {
  return (
    <Field label={label}>
      <textarea
        className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  )
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <Section title={label}>
      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{value}</p>
    </Section>
  )
}

type Draft = {
  name: string
  image: string
  type: CultureType
  summary: string
  description: string
  geographicContext: string
  coreValues: string
  beliefsWorldview: string
  socialStructure: string
  primaryLanguage: string
  languagesDialects: string
  namingConventions: string
  communicationCharacteristics: string
  majorCustoms: string
  traditions: string
  ceremoniesRituals: string
  holidaysCelebrations: string
  familyHouseholdStructure: string
  foodCuisine: string
  clothingAppearance: string
  housingSettlementPatterns: string
  workOccupations: string
  education: string
  art: string
  music: string
  dance: string
  literatureStorytelling: string
  culturalSymbols: string
  socialNorms: string
  genderSocialRoles: string
  statusClass: string
  hospitality: string
  taboos: string
  honorShameConcepts: string
  historicalInfluences: string
  internalConflicts: string
  externalInfluences: string
  currentCulturalState: string
  additionalInfo: string
}

const EMPTY_DRAFT: Draft = {
  name: "",
  image: "",
  type: "other",
  summary: "",
  description: "",
  geographicContext: "",
  coreValues: "",
  beliefsWorldview: "",
  socialStructure: "",
  primaryLanguage: "",
  languagesDialects: "",
  namingConventions: "",
  communicationCharacteristics: "",
  majorCustoms: "",
  traditions: "",
  ceremoniesRituals: "",
  holidaysCelebrations: "",
  familyHouseholdStructure: "",
  foodCuisine: "",
  clothingAppearance: "",
  housingSettlementPatterns: "",
  workOccupations: "",
  education: "",
  art: "",
  music: "",
  dance: "",
  literatureStorytelling: "",
  culturalSymbols: "",
  socialNorms: "",
  genderSocialRoles: "",
  statusClass: "",
  hospitality: "",
  taboos: "",
  honorShameConcepts: "",
  historicalInfluences: "",
  internalConflicts: "",
  externalInfluences: "",
  currentCulturalState: "",
  additionalInfo: "",
}

function toDraft(culture: CanonCulture): Draft {
  return {
    name: culture.name,
    image: culture.image ?? "",
    type: culture.type,
    summary: culture.summary ?? "",
    description: culture.description ?? "",
    geographicContext: culture.geographicContext ?? "",
    coreValues: culture.coreValues ?? "",
    beliefsWorldview: culture.beliefsWorldview ?? "",
    socialStructure: culture.socialStructure ?? "",
    primaryLanguage: culture.primaryLanguage ?? "",
    languagesDialects: culture.languagesDialects ?? "",
    namingConventions: culture.namingConventions ?? "",
    communicationCharacteristics: culture.communicationCharacteristics ?? "",
    majorCustoms: culture.majorCustoms ?? "",
    traditions: culture.traditions ?? "",
    ceremoniesRituals: culture.ceremoniesRituals ?? "",
    holidaysCelebrations: culture.holidaysCelebrations ?? "",
    familyHouseholdStructure: culture.familyHouseholdStructure ?? "",
    foodCuisine: culture.foodCuisine ?? "",
    clothingAppearance: culture.clothingAppearance ?? "",
    housingSettlementPatterns: culture.housingSettlementPatterns ?? "",
    workOccupations: culture.workOccupations ?? "",
    education: culture.education ?? "",
    art: culture.art ?? "",
    music: culture.music ?? "",
    dance: culture.dance ?? "",
    literatureStorytelling: culture.literatureStorytelling ?? "",
    culturalSymbols: culture.culturalSymbols ?? "",
    socialNorms: culture.socialNorms ?? "",
    genderSocialRoles: culture.genderSocialRoles ?? "",
    statusClass: culture.statusClass ?? "",
    hospitality: culture.hospitality ?? "",
    taboos: culture.taboos ?? "",
    honorShameConcepts: culture.honorShameConcepts ?? "",
    historicalInfluences: culture.historicalInfluences ?? "",
    internalConflicts: culture.internalConflicts ?? "",
    externalInfluences: culture.externalInfluences ?? "",
    currentCulturalState: culture.currentCulturalState ?? "",
    additionalInfo: culture.additionalInfo ?? "",
  }
}

function draftToPatch(draft: Draft): CultureEdit {
  const clean = (value: string) => value.trim() || undefined
  return {
    name: draft.name.trim() || "Unnamed Culture",
    type: draft.type,
    image: draft.image || undefined,
    summary: clean(draft.summary),
    description: clean(draft.description),
    geographicContext: clean(draft.geographicContext),
    coreValues: clean(draft.coreValues),
    beliefsWorldview: clean(draft.beliefsWorldview),
    socialStructure: clean(draft.socialStructure),
    primaryLanguage: clean(draft.primaryLanguage),
    languagesDialects: clean(draft.languagesDialects),
    namingConventions: clean(draft.namingConventions),
    communicationCharacteristics: clean(draft.communicationCharacteristics),
    majorCustoms: clean(draft.majorCustoms),
    traditions: clean(draft.traditions),
    ceremoniesRituals: clean(draft.ceremoniesRituals),
    holidaysCelebrations: clean(draft.holidaysCelebrations),
    familyHouseholdStructure: clean(draft.familyHouseholdStructure),
    foodCuisine: clean(draft.foodCuisine),
    clothingAppearance: clean(draft.clothingAppearance),
    housingSettlementPatterns: clean(draft.housingSettlementPatterns),
    workOccupations: clean(draft.workOccupations),
    education: clean(draft.education),
    art: clean(draft.art),
    music: clean(draft.music),
    dance: clean(draft.dance),
    literatureStorytelling: clean(draft.literatureStorytelling),
    culturalSymbols: clean(draft.culturalSymbols),
    socialNorms: clean(draft.socialNorms),
    genderSocialRoles: clean(draft.genderSocialRoles),
    statusClass: clean(draft.statusClass),
    hospitality: clean(draft.hospitality),
    taboos: clean(draft.taboos),
    honorShameConcepts: clean(draft.honorShameConcepts),
    historicalInfluences: clean(draft.historicalInfluences),
    internalConflicts: clean(draft.internalConflicts),
    externalInfluences: clean(draft.externalInfluences),
    currentCulturalState: clean(draft.currentCulturalState),
    additionalInfo: clean(draft.additionalInfo),
  }
}

function CultureFields({ draft, update }: { draft: Draft; update: (patch: Partial<Draft>) => void }) {
  return (
    <>
      <Section title="Identity">
        <div className="flex flex-col gap-3">
          <Field label="Name">
            <input
              autoFocus={!draft.name}
              className={inputClass}
              value={draft.name}
              placeholder="e.g. The River-Born"
              onChange={(event) => update({ name: event.target.value })}
            />
          </Field>
          <Field label="Culture Type">
            <select
              className={inputClass}
              value={draft.type}
              onChange={(event) => update({ type: event.target.value as CultureType })}
            >
              {CULTURE_TYPES.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Summary">
            <input
              className={inputClass}
              value={draft.summary}
              placeholder="One-line identity shown beneath the name"
              onChange={(event) => update({ summary: event.target.value })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Description">
        <textarea
          className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
          value={draft.description}
          placeholder="The canonical description of this culture"
          onChange={(event) => update({ description: event.target.value })}
        />
      </Section>

      <Section title="Geographic / Environmental Context">
        <textarea
          className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
          value={draft.geographicContext}
          placeholder="Where the culture lives and how its environment shapes it"
          onChange={(event) => update({ geographicContext: event.target.value })}
        />
      </Section>

      <Section title="Core Values">
        <textarea
          className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
          value={draft.coreValues}
          placeholder="The principles and priorities that guide the culture"
          onChange={(event) => update({ coreValues: event.target.value })}
        />
      </Section>

      <Section title="Beliefs / Worldview">
        <textarea
          className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
          value={draft.beliefsWorldview}
          placeholder="How this culture understands the world and its place in it"
          onChange={(event) => update({ beliefsWorldview: event.target.value })}
        />
      </Section>

      <Section title="Social Structure">
        <textarea
          className={cn(inputClass, "h-auto min-h-24 resize-y py-2 leading-relaxed")}
          value={draft.socialStructure}
          placeholder="Roles, kinship, leadership, and relationships within the culture"
          onChange={(event) => update({ socialStructure: event.target.value })}
        />
      </Section>

      <Section title="Language & Communication">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Primary Language" value={draft.primaryLanguage} placeholder="The language most associated with the culture" onChange={(value) => update({ primaryLanguage: value })} />
          <NarrativeField label="Languages / Dialects" value={draft.languagesDialects} placeholder="Languages, dialects, registers, and language variation" onChange={(value) => update({ languagesDialects: value })} />
          <NarrativeField label="Naming Conventions" value={draft.namingConventions} placeholder="Names, titles, naming patterns, and inheritance" onChange={(value) => update({ namingConventions: value })} />
          <NarrativeField label="Communication Characteristics" value={draft.communicationCharacteristics} placeholder="Conversation styles, gestures, signs, and other communication traits" onChange={(value) => update({ communicationCharacteristics: value })} />
        </div>
      </Section>

      <Section title="Customs & Traditions">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Major Customs" value={draft.majorCustoms} placeholder="Practices that shape ordinary and communal life" onChange={(value) => update({ majorCustoms: value })} />
          <NarrativeField label="Traditions" value={draft.traditions} placeholder="Inherited practices and cultural traditions" onChange={(value) => update({ traditions: value })} />
          <NarrativeField label="Ceremonies / Rituals" value={draft.ceremoniesRituals} placeholder="Ceremonies, rites, and ritual practices" onChange={(value) => update({ ceremoniesRituals: value })} />
          <NarrativeField label="Holidays / Celebrations" value={draft.holidaysCelebrations} placeholder="Holidays, festivals, and celebrations" onChange={(value) => update({ holidaysCelebrations: value })} />
        </div>
      </Section>

      <Section title="Daily Life">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Family / Household Structure" value={draft.familyHouseholdStructure} placeholder="Family patterns, households, and caregiving" onChange={(value) => update({ familyHouseholdStructure: value })} />
          <NarrativeField label="Food & Cuisine" value={draft.foodCuisine} placeholder="Foodways, meals, ingredients, and cuisine" onChange={(value) => update({ foodCuisine: value })} />
          <NarrativeField label="Clothing / Appearance" value={draft.clothingAppearance} placeholder="Dress, adornment, and appearance" onChange={(value) => update({ clothingAppearance: value })} />
          <NarrativeField label="Work / Occupations" value={draft.workOccupations} placeholder="Common work, trades, and occupations" onChange={(value) => update({ workOccupations: value })} />
          <NarrativeField label="Education" value={draft.education} placeholder="How knowledge and skills are taught" onChange={(value) => update({ education: value })} />
        </div>
      </Section>

      <Section title="Arts & Expression">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Art" value={draft.art} placeholder="Visual arts, crafts, and artistic practices" onChange={(value) => update({ art: value })} />
          <NarrativeField label="Music" value={draft.music} placeholder="Musical traditions, instruments, and performance" onChange={(value) => update({ music: value })} />
          <NarrativeField label="Dance" value={draft.dance} placeholder="Dance forms and their cultural roles" onChange={(value) => update({ dance: value })} />
          <NarrativeField label="Literature / Storytelling" value={draft.literatureStorytelling} placeholder="Literature, oral traditions, and storytelling" onChange={(value) => update({ literatureStorytelling: value })} />
          <NarrativeField label="Cultural Symbols" value={draft.culturalSymbols} placeholder="Symbols, motifs, and objects with shared meaning" onChange={(value) => update({ culturalSymbols: value })} />
        </div>
      </Section>

      <Section title="Social Expectations">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Social Norms" value={draft.socialNorms} placeholder="Expected conduct and everyday etiquette" onChange={(value) => update({ socialNorms: value })} />
          <NarrativeField label="Gender / Social Roles" value={draft.genderSocialRoles} placeholder="Gender roles and other socially recognized roles" onChange={(value) => update({ genderSocialRoles: value })} />
          <NarrativeField label="Status / Class" value={draft.statusClass} placeholder="Status, class, rank, and social mobility" onChange={(value) => update({ statusClass: value })} />
          <NarrativeField label="Hospitality" value={draft.hospitality} placeholder="Expectations around welcoming guests and strangers" onChange={(value) => update({ hospitality: value })} />
          <NarrativeField label="Taboos" value={draft.taboos} placeholder="Forbidden acts, subjects, and violations" onChange={(value) => update({ taboos: value })} />
          <NarrativeField label="Honor / Shame Concepts" value={draft.honorShameConcepts} placeholder="How honor, shame, reputation, and repair work" onChange={(value) => update({ honorShameConcepts: value })} />
        </div>
      </Section>

      <Section title="Cultural Change">
        <div className="flex flex-col gap-3">
          <NarrativeField label="Historical Influences" value={draft.historicalInfluences} placeholder="Past events and legacies that shaped the culture" onChange={(value) => update({ historicalInfluences: value })} />
          <NarrativeField label="Internal Conflicts" value={draft.internalConflicts} placeholder="Tensions, debates, and divisions within the culture" onChange={(value) => update({ internalConflicts: value })} />
          <NarrativeField label="External Influences" value={draft.externalInfluences} placeholder="Influences from neighboring or outside cultures" onChange={(value) => update({ externalInfluences: value })} />
          <NarrativeField label="Current Cultural State" value={draft.currentCulturalState} placeholder="The culture's present condition and direction" onChange={(value) => update({ currentCulturalState: value })} />
        </div>
      </Section>

      <Section title="Additional Information">
        <NarrativeField label="Additional Information" value={draft.additionalInfo} placeholder="Other established details that do not fit elsewhere" onChange={(value) => update({ additionalInfo: value })} />
      </Section>
    </>
  )
}

export function CultureCanonRecord({ cultureId, className }: { cultureId: string | null; className?: string }) {
  const { getCulture, updateCulture } = useCultureCanon()
  const culture = getCulture(cultureId)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMode("view")
    contentRef.current?.scrollTo({ top: 0 })
  }, [cultureId])
  useEffect(() => {
    if (mode === "edit" && culture) setDraft(toDraft(culture))
  }, [mode, culture])

  const save = useCallback(() => {
    if (culture && draft) updateCulture(culture.id, draftToPatch(draft))
    setMode("view")
  }, [culture, draft, updateCulture])

  if (!culture) return null

  const changeImage = (image: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, image })
    else updateCulture(culture.id, { image: image || undefined })
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
          {culture.image ? (
            <Image src={culture.image} alt={`Symbol for ${culture.name}`} fill sizes="672px" className="object-cover" />
          ) : (
            <Globe2 className="size-16 text-primary/50" />
          )}
          <CanonImageField value={draft?.image ?? culture.image ?? ""} onChange={changeImage} />
          <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">{culture.name}</h2>
            {culture.summary && <p className="mt-0.5 text-sm text-muted-foreground">{culture.summary}</p>}
          </div>
        </div>

        {mode === "view" ? (
          <div className="flex flex-col gap-6 p-4">
            <button
              onClick={() => setMode("edit")}
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"
            >
              <Pencil className="size-3.5" />
              Edit Culture
            </button>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary">
              <Globe2 className="size-3" />
              {cultureTypeLabel(culture.type)}
            </span>
            <ReadOnlyField label="Description" value={culture.description} />
            <ReadOnlyField label="Geographic / Environmental Context" value={culture.geographicContext} />
            <ReadOnlyField label="Core Values" value={culture.coreValues} />
            <ReadOnlyField label="Beliefs / Worldview" value={culture.beliefsWorldview} />
            <ReadOnlyField label="Social Structure" value={culture.socialStructure} />
            <ReadOnlyField label="Primary Language" value={culture.primaryLanguage} />
            <ReadOnlyField label="Languages / Dialects" value={culture.languagesDialects} />
            <ReadOnlyField label="Naming Conventions" value={culture.namingConventions} />
            <ReadOnlyField label="Communication Characteristics" value={culture.communicationCharacteristics} />
            <ReadOnlyField label="Major Customs" value={culture.majorCustoms} />
            <ReadOnlyField label="Traditions" value={culture.traditions} />
            <ReadOnlyField label="Ceremonies / Rituals" value={culture.ceremoniesRituals} />
            <ReadOnlyField label="Holidays / Celebrations" value={culture.holidaysCelebrations} />
            <ReadOnlyField label="Family / Household Structure" value={culture.familyHouseholdStructure} />
            <ReadOnlyField label="Food & Cuisine" value={culture.foodCuisine} />
            <ReadOnlyField label="Clothing / Appearance" value={culture.clothingAppearance} />
            <ReadOnlyField label="Housing / Settlement Patterns" value={culture.housingSettlementPatterns} />
            <ReadOnlyField label="Work / Occupations" value={culture.workOccupations} />
            <ReadOnlyField label="Education" value={culture.education} />
            <ReadOnlyField label="Art" value={culture.art} />
            <ReadOnlyField label="Music" value={culture.music} />
            <ReadOnlyField label="Dance" value={culture.dance} />
            <ReadOnlyField label="Literature / Storytelling" value={culture.literatureStorytelling} />
            <ReadOnlyField label="Cultural Symbols" value={culture.culturalSymbols} />
            <ReadOnlyField label="Social Norms" value={culture.socialNorms} />
            <ReadOnlyField label="Gender / Social Roles" value={culture.genderSocialRoles} />
            <ReadOnlyField label="Status / Class" value={culture.statusClass} />
            <ReadOnlyField label="Hospitality" value={culture.hospitality} />
            <ReadOnlyField label="Taboos" value={culture.taboos} />
            <ReadOnlyField label="Honor / Shame Concepts" value={culture.honorShameConcepts} />
            <ReadOnlyField label="Historical Influences" value={culture.historicalInfluences} />
            <ReadOnlyField label="Internal Conflicts" value={culture.internalConflicts} />
            <ReadOnlyField label="External Influences" value={culture.externalInfluences} />
            <ReadOnlyField label="Current Cultural State" value={culture.currentCulturalState} />
            <ReadOnlyField label="Additional Information" value={culture.additionalInfo} />
          </div>
        ) : (
          draft && (
            <div className="flex flex-col gap-6 p-4">
              <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">
                This is the authoritative Canon record for {culture.name}. Changes here update every view that reads this culture.
              </p>
              <CultureFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} />
            </div>
          )
        )}
      </div>

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

export function CultureCreateForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const { addCulture } = useCultureCanon()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const create = useCallback(() => onCreated(addCulture(draftToPatch(draft))), [addCulture, draft, onCreated])

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border bg-sidebar/40 px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Globe2 className="size-4.5" /></span>
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-foreground">New Culture</h2>
          <p className="text-xs text-muted-foreground">Establish the canon record. You can refine every field afterward.</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4"><CultureFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} /></div>
      <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3">
        <button onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</button>
        <button onClick={create} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]">Create Culture</button>
      </div>
    </div>
  )
}
