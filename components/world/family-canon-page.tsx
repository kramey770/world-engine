"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Plus, Trash2 } from "lucide-react"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import { CanonImageField } from "@/components/world/canon-image-field"
import { useFamilyCanon, type FamilyEdit, type FamilyKind, type FamilyStatus } from "@/lib/family-canon"
import { useCharacterCanon } from "@/lib/character-canon"
import type { Project } from "@/lib/mock-data"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

export function FamilyCanonPage({ project, onBack, onSignOut }: { project: Project; onBack: () => void; onSignOut: () => void }) {
  const { families, addFamily, updateFamily, deleteFamily } = useFamilyCanon()
  const { characters } = useCharacterCanon()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<FamilyEdit | null>(null)
  const list = Object.values(families).sort((a, b) => a.name.localeCompare(b.name))

  function beginCreate() {
    setSelectedId(null)
    setDraft({ name: "", kind: "family", status: "draft", motto: "", description: "", seat: "", founded: "", notes: "" })
  }

  function beginEdit(id: string) {
    const family = families[id]
    setSelectedId(id)
    setDraft(family ? { ...family } : null)
  }

  function save() {
    if (!draft?.name?.trim()) return
    if (selectedId) updateFamily(selectedId, draft)
    else setSelectedId(addFamily(draft).id)
    setDraft(null)
  }

  function membersFor(id: string) {
    return Object.values(characters).filter((character) => character.house === id || character.birthHouse === id)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Canon Lore</button>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-medium uppercase tracking-wider text-primary">{project.name} · Canon Lore</p><h1 className="mt-1 font-serif text-3xl font-medium tracking-tight">Families & Houses</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Define the houses, families, clans, and bloodlines that characters belong to. These records power House and Birth House selections and the family tree.</p></div>
          <button onClick={beginCreate} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="size-4" />Create Family</button>
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <section className="space-y-2">
            {list.length === 0 ? <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center"><Building2 className="mx-auto size-8 text-muted-foreground" /><h2 className="mt-3 font-serif text-lg">No families yet</h2><p className="mt-1 text-sm text-muted-foreground">Create a family or house before assigning characters to it.</p></div> : list.map((family) => <button key={family.id} onClick={() => beginEdit(family.id)} className="flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left hover:border-primary/40"><span className="flex min-w-0 items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary">{family.image ? <img src={family.image} alt="" className="size-full object-cover" /> : <Building2 className="size-5" />}</span><span className="min-w-0"><span className="block truncate font-medium">{family.name}</span><span className="block text-xs text-muted-foreground">{family.kind} · {membersFor(family.id).length} {membersFor(family.id).length === 1 ? "member" : "members"}</span></span></span><span className="text-xs text-muted-foreground">{family.status}</span></button>)}
          </section>
          {draft ? <section className="rounded-xl border border-border bg-card p-5"><h2 className="font-serif text-xl">{selectedId ? "Edit Family" : "Create Family"}</h2><div className="mt-4 space-y-3"><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Name<input className={inputClass + " mt-1.5"} value={draft.name ?? ""} onChange={(event) => setDraft({ ...draft, name: event.target.value })} autoFocus /></label><div className="grid gap-3 sm:grid-cols-2"><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Type<select className={inputClass + " mt-1.5"} value={draft.kind ?? "family"} onChange={(event) => setDraft({ ...draft, kind: event.target.value as FamilyKind })}>{["family", "house", "clan", "lineage", "dynasty"].map((kind) => <option key={kind} value={kind}>{kind}</option>)}</select></label><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Status<select className={inputClass + " mt-1.5"} value={draft.status ?? "draft"} onChange={(event) => setDraft({ ...draft, status: event.target.value as FamilyStatus })}>{["draft", "active", "historical", "contested"].map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Motto<input className={inputClass + " mt-1.5"} value={draft.motto ?? ""} onChange={(event) => setDraft({ ...draft, motto: event.target.value })} /></label><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Seat / Home<input className={inputClass + " mt-1.5"} value={draft.seat ?? ""} onChange={(event) => setDraft({ ...draft, seat: event.target.value })} /></label><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Founded<input className={inputClass + " mt-1.5"} value={draft.founded ?? ""} onChange={(event) => setDraft({ ...draft, founded: event.target.value })} /></label><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Description<textarea className="mt-1.5 min-h-24 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50" value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label><label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">Notes<textarea className="mt-1.5 min-h-20 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary/50" value={draft.notes ?? ""} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} /></label>{selectedId && <div className="relative aspect-[3/1] overflow-hidden rounded-lg border border-border bg-muted"><CanonImageField value={draft.image ?? ""} imageType="cover" placement="overlay" onChange={(image) => setDraft({ ...draft, image })} /></div>}</div><div className="mt-5 flex items-center justify-between gap-2"><div>{selectedId && <button onClick={() => { deleteFamily(selectedId); setSelectedId(null); setDraft(null) }} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm text-destructive hover:bg-destructive/10"><Trash2 className="size-4" />Delete</button>}</div><div className="flex gap-2"><button onClick={() => setDraft(null)} className="h-9 rounded-lg border border-border px-3 text-sm">Cancel</button><button onClick={save} className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">Save Family</button></div></div></section> : <section className="rounded-xl border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">Select a family to edit it, or create a new one.</section>}
        </div>
      </main>
    </div>
  )
}
