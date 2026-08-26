"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Church,
  Globe2,
  Landmark,
  Lightbulb,
  Lock,
  MapPin,
  Package,
  PawPrint,
  Plus,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { Wordmark } from "@/components/logo"
import { CharacterCanonRecord, HOUSE_DOT, HOUSE_TEXT } from "@/components/family/character-canon-record"
import { LocationCanonRecord } from "@/components/world/location-canon-record"
import { ReligionCanonRecord } from "@/components/world/religion-canon-record"
import { ConceptClassification } from "@/components/world/concept-classification"
import { ConceptCanonRecord } from "@/components/world/concept-canon-record"
import { HistoryCanonRecord } from "@/components/world/history-canon-record"
import { useConceptCanon } from "@/lib/concept-canon"
import { useHistoryCanon } from "@/lib/history-canon"
import { useCharacterCanon } from "@/lib/character-canon"
import { useLocationCanon, locationTypeLabel } from "@/lib/location-canon"
import { useReligionCanon, religionTypeLabel } from "@/lib/religion-canon"
import { houses } from "@/lib/family-data"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type CanonCategory = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  ready: boolean
}

// The full set of canon document types this area will eventually hold. Only
// Characters is functional in this pass; the rest are explicit future stubs.
const CATEGORIES: CanonCategory[] = [
  { id: "characters", label: "Characters", description: "People, dynasties, and the figures who shape your world.", icon: Users, ready: true },
  { id: "locations", label: "Locations", description: "Cities, keeps, regions, and points of interest.", icon: MapPin, ready: true },
  { id: "concepts", label: "Concepts", description: "Systems, phenomena, principles, and the rules of reality.", icon: Lightbulb, ready: true },
  { id: "religions", label: "Religions", description: "Faiths, pantheons, and sacred orders.", icon: Church, ready: true },
  { id: "history", label: "History", description: "Eras, wars, and the timeline of your world.", icon: Landmark, ready: true },
  { id: "cultures", label: "Cultures", description: "Peoples, customs, languages, and traditions.", icon: Globe2, ready: false },
  { id: "species", label: "Species", description: "Races, creatures, and the living things of your world.", icon: PawPrint, ready: false },
  { id: "organizations", label: "Organizations", description: "Guilds, councils, orders, and factions.", icon: Building2, ready: false },
  { id: "items", label: "Items", description: "Artifacts, relics, and objects of significance.", icon: Package, ready: false },
]

function Header({ onSignOut }: { onSignOut: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Wordmark />
      <UserMenu onSignOut={onSignOut} />
    </header>
  )
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      {label}
    </button>
  )
}

export function CanonLore({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const { characters } = useCharacterCanon()
  const { locations } = useLocationCanon()
  const { religions } = useReligionCanon()
  const { concepts, createConcept } = useConceptCanon()
  const { histories, createHistory } = useHistoryCanon()
  const [view, setView] = useState<
    "landing" | "characters" | "locations" | "religions" | "concepts" | "concept-create" | "history"
  >("landing")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [selectedReligionId, setSelectedReligionId] = useState<string | null>(null)
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null)
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
  // A freshly created record opens straight into edit mode so it can be filled in.
  const [historyMode, setHistoryMode] = useState<"view" | "edit">("view")

  const characterList = useMemo(() => Object.values(characters), [characters])
  const locationList = useMemo(() => Object.values(locations), [locations])
  const religionList = useMemo(() => Object.values(religions), [religions])
  const conceptList = useMemo(() => Object.values(concepts), [concepts])
  const historyList = useMemo(() => Object.values(histories), [histories])

  /** Creates a blank History record and opens it directly in edit mode. */
  function openNewHistory() {
    const id = createHistory()
    setHistoryMode("edit")
    setSelectedHistoryId(id)
  }

  /* ----------------------- Character Canon Page (standalone) ---------------------- */
  if (selectedId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All characters" onClick={() => setSelectedId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <CharacterCanonRecord
            memberId={selectedId}
            onSelect={setSelectedId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  /* ------------------------ Location Canon Page (standalone) ----------------------- */
  if (selectedLocationId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All locations" onClick={() => setSelectedLocationId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <LocationCanonRecord
            locationId={selectedLocationId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  /* ------------------------ Religion Canon Page (standalone) ----------------------- */
  if (selectedReligionId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All religions" onClick={() => setSelectedReligionId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <ReligionCanonRecord
            religionId={selectedReligionId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  /* ------------------------ Concept Canon Page (standalone) ------------------------ */
  if (selectedConceptId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink
              label="All concepts"
              onClick={() => {
                setSelectedConceptId(null)
                setView("concepts")
              }}
            />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <ConceptCanonRecord
            conceptId={selectedConceptId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  /* ------------------------ History Canon Page (standalone) ----------------------- */
  if (selectedHistoryId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink
              label="All history records"
              onClick={() => {
                setSelectedHistoryId(null)
                setHistoryMode("view")
                setView("history")
              }}
            />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <HistoryCanonRecord
            historyId={selectedHistoryId}
            initialMode={historyMode}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSignOut={onSignOut} />

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {view === "landing" ? (
          /* ------------------------------- LANDING ------------------------------- */
          <>
            <BackLink label="Project Home" onClick={onBack} />

            <section className="mt-6">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <ScrollText className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">World Building Studio</p>
                  <h1 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                    Canon Lore
                  </h1>
                </div>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
                The single source of truth for everything established in{" "}
                <span className="text-foreground">{project.name}</span>. Every canon record lives here and stays in
                sync across the Family Tree, relationships, and your manuscript.
              </p>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.id === "characters"
                    ? characterList.length
                    : cat.id === "locations"
                      ? locationList.length
                      : cat.id === "religions"
                        ? religionList.length
                        : cat.id === "concepts"
                          ? conceptList.length
                          : cat.id === "history"
                            ? historyList.length
                            : 0
                const disabled = !cat.ready
                return (
                  <button
                    key={cat.id}
                    disabled={disabled}
                    onClick={() => {
                      if (cat.id === "characters") setView("characters")
                      else if (cat.id === "locations") setView("locations")
                      else if (cat.id === "religions") setView("religions")
                      else if (cat.id === "concepts") setView("concepts")
                      else if (cat.id === "history") setView("history")
                    }}
                    className={cn(
                      "group relative flex min-h-[140px] flex-col items-start rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all",
                      disabled
                        ? "cursor-not-allowed opacity-60"
                        : "hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg ring-1 ring-inset transition-colors",
                          cat.ready
                            ? "bg-primary/12 text-primary ring-primary/20 group-hover:bg-primary/20"
                            : "bg-muted text-muted-foreground ring-border",
                        )}
                      >
                        <cat.icon className="size-5" />
                      </span>
                      {cat.ready ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {count} {count === 1 ? "record" : "records"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          <Lock className="size-3" />
                          Coming soon
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-medium tracking-tight text-foreground">{cat.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                    {cat.ready && (
                      <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary">
                        Open
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </button>
                )
              })}
            </section>
          </>
        ) : view === "characters" ? (
          /* --------------------------- CHARACTERS INDEX --------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Characters</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {characterList.length} canon {characterList.length === 1 ? "record" : "records"}. Select anyone to
                  open their Canon Page.
                </p>
              </div>
              <button
                disabled
                title="The Character Creator is coming soon"
                className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground opacity-70"
              >
                <Plus className="size-4" />
                Create Character
                <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">Soon</span>
              </button>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {characterList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src={c.portrait || "/placeholder.svg"}
                      alt={`Portrait of ${c.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                      {c.name}
                    </h3>
                    {c.title && <p className="mt-0.5 text-sm text-muted-foreground">{c.title}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium",
                          HOUSE_TEXT[c.house],
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", HOUSE_DOT[c.house])} />
                        {houses[c.house].name}
                      </span>
                      {c.role && (
                        <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {c.role}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </section>
          </>
        ) : view === "locations" ? (
          /* --------------------------- LOCATIONS INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Locations</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {locationList.length} canon {locationList.length === 1 ? "record" : "records"}. Select any place to
                  open its Location View.
                </p>
              </div>
              <button
                disabled
                title="The Location Creator is coming soon"
                className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground opacity-70"
              >
                <Plus className="size-4" />
                Create Location
                <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">Soon</span>
              </button>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locationList.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLocationId(l.id)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    {l.image ? (
                      <Image
                        src={l.image || "/placeholder.svg"}
                        alt={`View of ${l.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted-foreground">
                        <MapPin className="size-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                      {l.name}
                    </h3>
                    {l.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{l.summary}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        <MapPin className="size-3" />
                        {locationTypeLabel(l.type)}
                      </span>
                      {l.region && (
                        <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {l.region}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </section>
          </>
        ) : view === "religions" ? (
          /* --------------------------- RELIGIONS INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Religions</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {religionList.length} canon {religionList.length === 1 ? "record" : "records"}. Select any faith to
                  open its Religion View.
                </p>
              </div>
              <button
                disabled
                title="The Religion Creator is coming soon"
                className="inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground opacity-70"
              >
                <Plus className="size-4" />
                Create Religion
                <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium">Soon</span>
              </button>
            </section>

            <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {religionList.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReligionId(r.id)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
                >
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
                    <Church className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                      {r.name}
                    </h3>
                    {r.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{r.summary}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        <Church className="size-3" />
                        {religionTypeLabel(r.type)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </section>
          </>
        ) : view === "concepts" ? (
          /* ---------------------------- CONCEPTS INDEX ----------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Concepts</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {conceptList.length} canon {conceptList.length === 1 ? "record" : "records"}. Broad worldbuilding
                  elements &mdash; systems, principles, phenomena, practices, and ideas that don&apos;t belong to
                  another specific Lore category.
                </p>
              </div>
              <button
                onClick={() => setView("concept-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create Concept
              </button>
            </section>

            {conceptList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <Lightbulb className="size-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No concepts yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
                  Concept records will appear here once you create them. Start by classifying what your first Concept
                  actually is.
                </p>
                <button
                  onClick={() => setView("concept-create")}
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card/60 hover:text-foreground active:scale-[0.99]"
                >
                  <Plus className="size-4" />
                  Create Concept
                </button>
              </section>
            ) : (
              <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conceptList.map((c) => {
                  const chips = [...c.selections.nature, ...c.selections.affects, ...c.selections.function]
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConceptId(c.id)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
                    >
                      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
                        <Lightbulb className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                          {c.name}
                        </h3>
                        {c.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{c.summary}</p>}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {chips.slice(0, 3).map((chip, i) =>
                            i === 0 ? (
                              <span
                                key={chip}
                                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"
                              >
                                <Lightbulb className="size-3" />
                                {chip}
                              </span>
                            ) : (
                              <span
                                key={chip}
                                className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground"
                              >
                                {chip}
                              </span>
                            ),
                          )}
                          {chips.length > 3 && (
                            <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
                              +{chips.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </section>
            )}
          </>
        ) : view === "concept-create" ? (
          /* -------------------- CONCEPT CREATE (classification) -------------------- */
          <>
            <BackLink label="Concepts" onClick={() => setView("concepts")} />
            <ConceptClassification
              onContinue={(selections) => {
                // Create the canon record from the classification answers, then
                // open it so the selections carry straight through.
                const id = createConcept(selections)
                setView("concepts")
                setSelectedConceptId(id)
              }}
            />
          </>
        ) : (
          /* ----------------------------- HISTORY INDEX ----------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">History</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {historyList.length} canon {historyList.length === 1 ? "record" : "records"}. Eras, wars, and the
                  established events of your world. Select any record to open its History View.
                </p>
              </div>
              <button
                onClick={openNewHistory}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create History Record
              </button>
            </section>

            {historyList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <Landmark className="size-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">
                  No history records yet
                </h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
                  History records will appear here once you create them. Start with a single era, war, or turning point.
                </p>
                <button
                  onClick={openNewHistory}
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card/60 hover:text-foreground active:scale-[0.99]"
                >
                  <Plus className="size-4" />
                  Create History Record
                </button>
              </section>
            ) : (
              <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {historyList.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setHistoryMode("view")
                      setSelectedHistoryId(h.id)
                    }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]"
                  >
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card">
                      <Landmark className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                        {h.name}
                      </h3>
                      {h.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{h.summary}</p>}
                      {h.era && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">
                            <Landmark className="size-3" />
                            {h.era}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
