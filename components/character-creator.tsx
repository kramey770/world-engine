"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, BookOpenText, Plus, Sparkles, UserRound, Wand2 } from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { useCharacterCanon } from "@/lib/character-canon"
import type { Project } from "@/lib/mock-data"

export function CharacterCreator({
  project,
  onBack,
  onOpenCanon,
  onSignOut,
}: {
  project: Project
  onBack?: () => void
  onOpenCanon?: () => void
  onSignOut?: () => void
}) {
  const { characters, addCharacter } = useCharacterCanon()
  const [draft, setDraft] = useState({ name: "", role: "", house: "" })
  const [status, setStatus] = useState<string | null>(null)

  const recentCharacters = useMemo(() => Object.values(characters).slice(0, 4), [characters])

  function handleCreateCharacter() {
    const name = draft.name.trim()
    if (!name) {
      setStatus("Give this character a name before saving.")
      return
    }

    const created = addCharacter({
      name,
      title: draft.role.trim(),
      role: draft.role.trim(),
      house: draft.house.trim(),
      birthHouse: draft.house.trim(),
      bio: "Newly created in the Creation Studio.",
      currentLocation: "Unassigned",
    })

    setDraft({ name: "", role: "", house: "" })
    setStatus(`Created ${created.name}.`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Back to project
          </button>
          <div className="h-5 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-200 ring-1 ring-inset ring-sky-400/25">
              <UserRound className="size-4" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/80">Creation Studio</p>
              <h1 className="text-sm font-semibold tracking-tight">Character Creator</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCanon}
            className="hidden items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground sm:inline-flex hover:bg-accent"
          >
            <BookOpenText className="size-4" />
            Open Canon Lore
          </button>
          <UserMenu onSignOut={onSignOut ?? (() => {})} />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[1.5rem] border border-sky-200/15 bg-[radial-gradient(circle_at_top_left,rgba(122,21,21,0.18),transparent_25%),linear-gradient(140deg,#0b0b0c,#151517_40%,#0b0b0c)] p-6 shadow-2xl shadow-red-950/10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-200/75">{project.name}</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight text-white sm:text-5xl">Shape a new face for the story</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/20 bg-sky-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-100">
              <Sparkles className="size-3.5" />
              Created {Object.keys(characters).length} characters
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-200">
                <Plus className="size-4" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">Create a character</h3>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Name</span>
                <input
                  value={draft.name}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Aster Vale"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition-colors placeholder:text-muted-foreground/70 focus:border-sky-300"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Role</span>
                <input
                  value={draft.role}
                  onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))}
                  placeholder="Captain of the Dawn Guard"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-sky-300"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">House / lineage</span>
                <input
                  value={draft.house}
                  onChange={(event) => setDraft((current) => ({ ...current, house: event.target.value }))}
                  placeholder="House Vale"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-sky-300"
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              {status && <p className="text-sm text-emerald-200">{status}</p>}
              <button
                type="button"
                onClick={handleCreateCharacter}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--button-hover)]"
              >
                <Wand2 className="size-4" />
                Save character
              </button>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent characters</h3>
              <button
                type="button"
                onClick={onOpenCanon}
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                Canon view
              </button>
            </div>

            <div className="space-y-3">
              {recentCharacters.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  No characters yet. Create the first one from the form.
                </div>
              ) : (
                recentCharacters.map((character) => (
                  <div key={character.id} className="rounded-xl border border-border bg-background/80 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">{character.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{character.role || "Untitled role"}</p>
                      </div>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                        {character.house || "House unknown"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}
