"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Heart, Pencil, Users } from "lucide-react"
import { houses, type FamilyMember, type HouseId } from "@/lib/family-data"
import { useCharacterCanon, type CharacterEdit } from "@/lib/character-canon"
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
  ravenshollow: "text-primary",
  vale: "text-chart-2",
  duskwater: "text-chart-3",
}
export const HOUSE_DOT: Record<string, string> = {
  ravenshollow: "bg-primary",
  vale: "bg-chart-2",
  duskwater: "bg-chart-3",
}

const HOUSE_OPTIONS = Object.values(houses).map((h) => ({ id: h.id as HouseId, name: h.name }))

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

function toDraft(m: FamilyMember): Draft {
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

/* ------------------------------- Canon record ------------------------------ */

export function CharacterCanonRecord({
  memberId,
  onSelect,
  onModeChange,
  className,
}: {
  memberId: string | null
  onSelect: (id: string) => void
  /** Notifies the host chrome (drawer header / page subtitle) of view vs edit. */
  onModeChange?: (mode: "view" | "edit") => void
  className?: string
}) {
  const { getCharacter, updateCharacter, characters } = useCharacterCanon()
  const member = getCharacter(memberId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Always return to read-only when the selected character changes.
  useEffect(() => {
    setMode("view")
    contentRef.current?.scrollTo({ top: 0 })
  }, [memberId])

  // Keep host chrome in sync with the current mode.
  useEffect(() => {
    onModeChange?.(mode)
  }, [mode, onModeChange])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && member) setDraft(toDraft(member))
  }, [mode, member])

  const relationOptions = useMemo(
    () => (member ? Object.values(characters).filter((c) => c.id !== member.id) : []),
    [characters, member],
  )

  const save = useCallback(() => {
    if (member && draft) updateCharacter(member.id, draftToPatch(draft))
    setMode("view")
  }, [member, draft, updateCharacter])

  if (!member) return null

  const changeImage = (portrait: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, portrait })
    else updateCharacter(member.id, { portrait })
  }

  const lifespan = [member.born, member.died].filter(Boolean).join(" – ")

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        <CanonRecordHeader
          recordId={`character:${member.id}`}
          title={member.name}
          summary={member.title}
          identityImage={draft?.portrait ?? member.portrait}
          identityAlt={`Portrait of ${member.name}`}
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

            {/* House + role + life (each chip shown only when populated) */}
            <div className="flex flex-wrap gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium",
                  HOUSE_TEXT[member.house],
                )}
              >
                <span className={cn("size-1.5 rounded-full", HOUSE_DOT[member.house])} />
                {houses[member.house].name}
              </span>
              {member.role && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  {member.role}
                </span>
              )}
              {(member.born || member.died) && (
                <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs tabular-nums text-muted-foreground">
                  {lifespan}
                </span>
              )}
            </div>

            {member.bio && (
              <Section title="Biography">
                <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{member.bio}</p>
              </Section>
            )}

            <Section title="Canon Snapshot">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {member.canonSummary ?? "Add a concise statement of who this character is and why they matter."}
                </p>
                {(member.desire || member.fear || member.narrativeFunction) && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {member.desire && <SnapshotItem label="Wants" value={member.desire} />}
                    {member.fear && <SnapshotItem label="Fears" value={member.fear} />}
                    {member.narrativeFunction && <SnapshotItem label="Function" value={member.narrativeFunction} />}
                  </div>
                )}
              </div>
            </Section>

            {(member.pronouns || member.classification || member.culture || member.origin || member.currentLocation ||
              member.affiliations?.length || member.languages?.length || member.physicalDescription ||
              member.voiceAndMannerisms || member.distinguishingTraits?.length) && (
              <Section title="Core Facts">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FactItem label="Pronouns" value={member.pronouns} />
                  <FactItem label="Classification" value={member.classification} />
                  <FactItem label="Culture" value={member.culture} />
                  <FactItem label="Origin" value={member.origin} />
                  <FactItem label="Current location" value={member.currentLocation} />
                  <FactItem label="Affiliations" value={member.affiliations?.join(", ")} />
                  <FactItem label="Languages" value={member.languages?.join(", ")} />
                  <FactItem label="Distinguishing traits" value={member.distinguishingTraits?.join(", ")} />
                  <FactItem label="Physical description" value={member.physicalDescription} wide />
                  <FactItem label="Voice and mannerisms" value={member.voiceAndMannerisms} wide />
                </div>
              </Section>
            )}

            {(member.need || member.falseBelief || member.contradiction || member.moralBoundary ||
              member.formativePressure || member.misunderstanding || member.changeTrigger || member.refusal) && (
              <Section title="Inner Model">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FactItem label="Needs" value={member.need} />
                  <FactItem label="False belief" value={member.falseBelief} />
                  <FactItem label="Contradiction" value={member.contradiction} />
                  <FactItem label="Moral boundary" value={member.moralBoundary} />
                  <FactItem label="Formative pressure" value={member.formativePressure} />
                  <FactItem label="Misunderstands" value={member.misunderstanding} />
                  <FactItem label="What changes their mind" value={member.changeTrigger} />
                  <FactItem label="Refuses to become" value={member.refusal} />
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
                            <p className={cn("truncate text-xs font-medium", HOUSE_TEXT[c.houseId])}>
                              {houses[c.houseId].name}
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
                This is {member.name.split(" ")[0]}&apos;s authoritative Canon record. Changes here update every view
                that reads this character.
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
                  <Field label="Title">
                    <input
                      className={inputClass}
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      className={inputClass}
                      value={draft.role}
                      onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="House">
                      <select
                        className={inputClass}
                        value={draft.house}
                        onChange={(e) => setDraft({ ...draft, house: e.target.value as HouseId })}
                      >
                        {HOUSE_OPTIONS.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Birth House">
                      <select
                        className={inputClass}
                        value={draft.birthHouse}
                        onChange={(e) => setDraft({ ...draft, birthHouse: e.target.value as HouseId })}
                      >
                        {HOUSE_OPTIONS.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Birth Date">
                      <input
                        className={inputClass}
                        value={draft.born}
                        placeholder="e.g. 270 AR"
                        onChange={(e) => setDraft({ ...draft, born: e.target.value })}
                      />
                    </Field>
                    <Field label="Death Date">
                      <input
                        className={inputClass}
                        value={draft.died}
                        placeholder="—"
                        onChange={(e) => setDraft({ ...draft, died: e.target.value })}
                      />
                    </Field>
                  </div>
                  <Field label="Aliases (comma separated)">
                    <input
                      className={inputClass}
                      value={draft.aliases}
                      placeholder="A name they use, a former name, a public epithet"
                      onChange={(e) => setDraft({ ...draft, aliases: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Pronouns">
                      <input
                        className={inputClass}
                        value={draft.pronouns}
                        onChange={(e) => setDraft({ ...draft, pronouns: e.target.value })}
                      />
                    </Field>
                    <Field label="Classification">
                      <input
                        className={inputClass}
                        value={draft.classification}
                        placeholder="Species, type, or role"
                        onChange={(e) => setDraft({ ...draft, classification: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>
              </Section>

              <Section title="Canon Snapshot">
                <div className="flex flex-col gap-3">
                  <Field label="Who they are and why they matter">
                    <textarea
                      className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")}
                      value={draft.canonSummary}
                      placeholder="A concise statement you can trust at a glance"
                      onChange={(e) => setDraft({ ...draft, canonSummary: e.target.value })}
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Narrative function">
                      <input
                        className={inputClass}
                        value={draft.narrativeFunction}
                        placeholder="What pressure do they bring to the story?"
                        onChange={(e) => setDraft({ ...draft, narrativeFunction: e.target.value })}
                      />
                    </Field>
                    <Field label="Canon confidence">
                      <select
                        className={inputClass}
                        value={draft.canonConfidence}
                        onChange={(e) => setDraft({ ...draft, canonConfidence: e.target.value as Draft["canonConfidence"] })}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="provisional">Provisional</option>
                        <option value="disputed">Disputed</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </Section>

              <Section title="Core Facts">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Culture">
                      <input className={inputClass} value={draft.culture} onChange={(e) => setDraft({ ...draft, culture: e.target.value })} />
                    </Field>
                    <Field label="Origin">
                      <input className={inputClass} value={draft.origin} onChange={(e) => setDraft({ ...draft, origin: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Current location">
                    <input className={inputClass} value={draft.currentLocation} onChange={(e) => setDraft({ ...draft, currentLocation: e.target.value })} />
                  </Field>
                  <Field label="Affiliations (comma separated)">
                    <input className={inputClass} value={draft.affiliations} placeholder="Groups, institutions, factions" onChange={(e) => setDraft({ ...draft, affiliations: e.target.value })} />
                  </Field>
                  <Field label="Languages (comma separated)">
                    <input className={inputClass} value={draft.languages} onChange={(e) => setDraft({ ...draft, languages: e.target.value })} />
                  </Field>
                  <Field label="Possessions (comma separated)">
                    <input className={inputClass} value={draft.possessions} placeholder="Objects that carry meaning or consequence" onChange={(e) => setDraft({ ...draft, possessions: e.target.value })} />
                  </Field>
                  <Field label="Physical description">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.physicalDescription} onChange={(e) => setDraft({ ...draft, physicalDescription: e.target.value })} />
                  </Field>
                  <Field label="Voice and mannerisms">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.voiceAndMannerisms} onChange={(e) => setDraft({ ...draft, voiceAndMannerisms: e.target.value })} />
                  </Field>
                  <Field label="Distinguishing traits (comma separated)">
                    <input className={inputClass} value={draft.distinguishingTraits} onChange={(e) => setDraft({ ...draft, distinguishingTraits: e.target.value })} />
                  </Field>
                </div>
              </Section>

              <Section title="Inner Model">
                <div className="flex flex-col gap-3">
                  <Field label="What they want">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.desire} placeholder="The goal they would name aloud" onChange={(e) => setDraft({ ...draft, desire: e.target.value })} />
                  </Field>
                  <Field label="What they need">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.need} placeholder="The deeper change or truth they resist" onChange={(e) => setDraft({ ...draft, need: e.target.value })} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Fear">
                      <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.fear} onChange={(e) => setDraft({ ...draft, fear: e.target.value })} />
                    </Field>
                    <Field label="Core values (comma separated)">
                      <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.coreValues} onChange={(e) => setDraft({ ...draft, coreValues: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="False belief">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.falseBelief} onChange={(e) => setDraft({ ...draft, falseBelief: e.target.value })} />
                  </Field>
                  <Field label="Contradiction">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.contradiction} placeholder="The tension that makes them more than a label" onChange={(e) => setDraft({ ...draft, contradiction: e.target.value })} />
                  </Field>
                  <Field label="Moral boundary">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.moralBoundary} onChange={(e) => setDraft({ ...draft, moralBoundary: e.target.value })} />
                  </Field>
                  <Field label="Formative pressure">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.formativePressure} onChange={(e) => setDraft({ ...draft, formativePressure: e.target.value })} />
                  </Field>
                  <Field label="What they misunderstand">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.misunderstanding} onChange={(e) => setDraft({ ...draft, misunderstanding: e.target.value })} />
                  </Field>
                  <Field label="What changes their mind">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.changeTrigger} onChange={(e) => setDraft({ ...draft, changeTrigger: e.target.value })} />
                  </Field>
                  <Field label="What they refuse to become">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.refusal} onChange={(e) => setDraft({ ...draft, refusal: e.target.value })} />
                  </Field>
                </div>
              </Section>

              <Section title="Description">
                <textarea
                  className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                />
              </Section>

              <Section title="Canon Desk">
                <div className="flex flex-col gap-3">
                  <Field label="Open questions (comma separated)">
                    <input className={inputClass} value={draft.openQuestions} placeholder="What still needs an answer?" onChange={(e) => setDraft({ ...draft, openQuestions: e.target.value })} />
                  </Field>
                  <Field label="Research notes">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.researchNotes} onChange={(e) => setDraft({ ...draft, researchNotes: e.target.value })} />
                  </Field>
                  <Field label="Author notes">
                    <textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={draft.authorNotes} onChange={(e) => setDraft({ ...draft, authorNotes: e.target.value })} />
                  </Field>
                </div>
              </Section>

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
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}
