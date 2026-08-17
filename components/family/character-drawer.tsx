"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Heart, Pencil, Users, X } from "lucide-react"
import { houses, type FamilyMember, type HouseId } from "@/lib/family-data"
import { useCharacterCanon, type CharacterEdit } from "@/lib/character-canon"
import { cn } from "@/lib/utils"

const HOUSE_TEXT: Record<string, string> = {
  ravenshollow: "text-primary",
  vale: "text-chart-2",
  duskwater: "text-chart-3",
}
const HOUSE_DOT: Record<string, string> = {
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

/* ---------------------------------- Draft ---------------------------------- */

type Draft = {
  name: string
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
}

function toDraft(m: FamilyMember): Draft {
  return {
    name: m.name ?? "",
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
  }
}

function draftToPatch(d: Draft): CharacterEdit {
  const clean = (s: string) => {
    const t = s.trim()
    return t.length ? t : undefined
  }
  const arr = (a: string[]) => (a.length ? a : undefined)
  return {
    name: d.name.trim() || "Unnamed",
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

/* --------------------------------- Drawer ---------------------------------- */

export function CharacterDrawer({
  memberId,
  onClose,
  onSelect,
}: {
  memberId: string | null
  onClose: () => void
  onSelect: (id: string) => void
}) {
  const { getCharacter, updateCharacter, characters } = useCharacterCanon()
  const member = getCharacter(memberId)
  const open = Boolean(memberId)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)

  // Always return to read-only when the selected character changes or closes.
  useEffect(() => {
    setMode("view")
  }, [memberId])

  // Seed the edit draft from the live canon record whenever edit mode opens.
  useEffect(() => {
    if (mode === "edit" && member) setDraft(toDraft(member))
  }, [mode, member])

  const relationOptions = useMemo(
    () => (member ? Object.values(characters).filter((c) => c.id !== member.id) : []),
    [characters, member],
  )

  function save() {
    if (member && draft) updateCharacter(member.id, draftToPatch(draft))
    setMode("view")
  }

  const lifespan = member ? [member.born, member.died].filter(Boolean).join(" – ") : ""

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={member ? `Canon record for ${member.name}` : "Character record"}
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-sidebar shadow-2xl shadow-black/50 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {member && (
          <>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-medium text-muted-foreground">
                {mode === "edit" ? "Editing Canon Record" : "Character Canon"}
              </p>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close panel"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {/* Portrait hero — always shown so the record's identity stays anchored */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                <Image
                  src={member.portrait || "/placeholder.svg"}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="448px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
                    {member.name}
                  </h2>
                  {member.title && <p className="mt-0.5 text-sm text-muted-foreground">{member.title}</p>}
                </div>
              </div>

              {mode === "view" ? (
                /* ------------------------------ VIEW MODE ------------------------------ */
                <div className="flex flex-col gap-6 p-4">
                  {/* Edit pathway */}
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
                      This is {member.name.split(" ")[0]}&apos;s authoritative Canon record. Changes here update every
                      view that reads this character.
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
                      </div>
                    </Section>

                    <Section title="Description">
                      <textarea
                        className={cn(inputClass, "h-auto min-h-28 resize-y py-2 leading-relaxed")}
                        value={draft.bio}
                        onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                      />
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
          </>
        )}
      </aside>
    </>
  )
}
