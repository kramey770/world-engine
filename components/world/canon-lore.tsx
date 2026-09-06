"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Church,
  Globe2,
  Landmark,
  Lightbulb,
  LayoutGrid,
  Lock,
  MapPin,
  Package,
  PawPrint,
  Plus,
  Rows3,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { Wordmark } from "@/components/logo"
import { CharacterCanonRecord, HOUSE_DOT, HOUSE_TEXT } from "@/components/family/character-canon-record"
import { LocationCanonRecord, LocationCreateForm } from "@/components/world/location-canon-record"
import { ReligionCanonRecord } from "@/components/world/religion-canon-record"
import { OrganizationCanonRecord, OrganizationCreateForm } from "@/components/world/organization-canon-record"
import { CultureCanonRecord, CultureCreateForm } from "@/components/world/culture-canon-record"
import { ConceptClassification } from "@/components/world/concept-classification"
import { ConceptCanonRecord } from "@/components/world/concept-canon-record"
import { useCharacterCanon } from "@/lib/character-canon"
import { useLocationCanon, locationTypeLabel } from "@/lib/location-canon"
import { useReligionCanon, religionTypeLabel } from "@/lib/religion-canon"
import { useOrganizationCanon, organizationTypeLabel } from "@/lib/organization-canon"
import { useCultureCanon, cultureTypeLabel } from "@/lib/culture-canon"
import { useConceptCanon } from "@/lib/concept-canon"
import { houses } from "@/lib/family-data"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { CanonImageField } from "@/components/world/canon-image-field"

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
  { id: "history", label: "History", description: "Eras, wars, and the timeline of your world.", icon: Landmark, ready: false },
  { id: "cultures", label: "Cultures", description: "Peoples, customs, languages, and traditions.", icon: Globe2, ready: true },
  { id: "species", label: "Species", description: "Races, creatures, and the living things of your world.", icon: PawPrint, ready: false },
  { id: "organizations", label: "Organizations", description: "Guilds, councils, orders, and factions.", icon: Building2, ready: true },
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

function LorePageHero({
  title,
  image,
  icon: Icon,
  onImageChange,
}: {
  title: string
  image: string
  icon: LucideIcon
  onImageChange: (image: string) => void
}) {
  return (
    <div className="group relative mt-5 flex aspect-[4/1] min-h-32 items-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-card">
      {image ? (
        <Image src={image} alt={`${title} artwork`} fill sizes="1024px" className="object-cover" />
      ) : (
        <Icon className="ml-6 size-12 text-primary/40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/60 to-transparent" />
      <div className="relative z-[1] p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">{title}</h1>
      </div>
      <CanonImageField value={image} label={`Import ${title.toLowerCase()} artwork`} onChange={onImageChange} />
    </div>
  )
}

function ViewToggle({ compact, onChange }: { compact: boolean; onChange: (compact: boolean) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1" aria-label="Entry view">
      <button
        type="button"
        aria-label="Large thumbnail view"
        aria-pressed={!compact}
        onClick={() => onChange(false)}
        className={cn("rounded-md p-1.5 transition-colors", !compact ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted")}
      >
        <LayoutGrid className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Compact column view"
        aria-pressed={compact}
        onClick={() => onChange(true)}
        className={cn("rounded-md p-1.5 transition-colors", compact ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted")}
      >
        <Rows3 className="size-4" />
      </button>
    </div>
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
  const { characters, updateCharacter } = useCharacterCanon()
  const { locations, updateLocation } = useLocationCanon()
  const { religions, updateReligion } = useReligionCanon()
  const { organizations, updateOrganization } = useOrganizationCanon()
  const { cultures, updateCulture } = useCultureCanon()
  const { concepts, updateConcept } = useConceptCanon()
  const [view, setView] = useState<
    | "landing"
    | "characters"
    | "locations"
    | "location-create"
    | "religions"
    | "concepts"
    | "concept-create"
    | "organizations"
    | "organization-create"
    | "cultures"
    | "culture-create"
  >("landing")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [selectedReligionId, setSelectedReligionId] = useState<string | null>(null)
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null)
  const [selectedCultureId, setSelectedCultureId] = useState<string | null>(null)
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null)
  const [pageImages, setPageImages] = useState<Record<string, string>>({})
  const [compactLists, setCompactLists] = useState<Record<string, boolean>>({})

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [view, selectedId, selectedLocationId, selectedReligionId, selectedOrganizationId, selectedCultureId, selectedConceptId])

  const isCompact = (category: string) => compactLists[category] ?? false
  const setCompact = (category: string, compact: boolean) =>
    setCompactLists((previous) => ({ ...previous, [category]: compact }))

  const characterList = useMemo(() => Object.values(characters), [characters])
  const locationList = useMemo(() => Object.values(locations), [locations])
  const religionList = useMemo(() => Object.values(religions), [religions])
  const organizationList = useMemo(() => Object.values(organizations), [organizations])
  const cultureList = useMemo(() => Object.values(cultures), [cultures])
  const conceptList = useMemo(() => Object.values(concepts), [concepts])

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

  /* ---------------------- Organization Canon Page (standalone) --------------------- */
  if (selectedOrganizationId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All organizations" onClick={() => setSelectedOrganizationId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <OrganizationCanonRecord
            organizationId={selectedOrganizationId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  /* ------------------------- Culture Canon Page (standalone) ------------------------ */
  if (selectedCultureId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All cultures" onClick={() => setSelectedCultureId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <CultureCanonRecord
            cultureId={selectedCultureId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  if (selectedConceptId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All concepts" onClick={() => setSelectedConceptId(null)} />
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
                          : cat.id === "organizations"
                            ? organizationList.length
                            : cat.id === "cultures"
                              ? cultureList.length
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
                      else if (cat.id === "organizations") setView("organizations")
                      else if (cat.id === "cultures") setView("cultures")
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
            <LorePageHero title="Characters" image={pageImages.characters ?? ""} icon={Users} onImageChange={(image) => setPageImages({ ...pageImages, characters: image })} />

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
              <ViewToggle compact={isCompact("characters")} onChange={(compact) => setCompact("characters", compact)} />
            </section>

            <section className={cn("mt-6 grid gap-4", isCompact("characters") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {characterList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("characters") ? "flex flex-row" : "flex flex-col")}
                >
                  <div className={cn("relative overflow-hidden bg-muted", isCompact("characters") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                    <Image
                      src={c.portrait || "/placeholder.svg"}
                      alt={`Portrait of ${c.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <CanonImageField
                      value={c.portrait}
                      label={`Change ${c.name} image`}
                      onChange={(portrait) => updateCharacter(c.id, { portrait })}
                      onClick={(event) => event.stopPropagation()}
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
            <LorePageHero title="Locations" image={pageImages.locations ?? ""} icon={MapPin} onImageChange={(image) => setPageImages({ ...pageImages, locations: image })} />

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
                onClick={() => setView("location-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="size-4" />
                Create Location
              </button>
              <ViewToggle compact={isCompact("locations")} onChange={(compact) => setCompact("locations", compact)} />
            </section>

            <section className={cn("mt-6 grid gap-4", isCompact("locations") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {locationList.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLocationId(l.id)}
                  className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("locations") ? "flex flex-row" : "flex flex-col")}
                >
                  <div className={cn("relative overflow-hidden bg-muted", isCompact("locations") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
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
                    <CanonImageField
                      value={l.image ?? ""}
                      label={`Change ${l.name} image`}
                      onChange={(image) => updateLocation(l.id, { image: image || undefined })}
                      onClick={(event) => event.stopPropagation()}
                    />
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
        ) : view === "location-create" ? (
          <>
            <BackLink label="Locations" onClick={() => setView("locations")} />
            <LocationCreateForm
              onCancel={() => setView("locations")}
              onCreated={(id) => {
                setView("locations")
                setSelectedLocationId(id)
              }}
            />
          </>
        ) : view === "religions" ? (
          /* --------------------------- RELIGIONS INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Religions" image={pageImages.religions ?? ""} icon={Church} onImageChange={(image) => setPageImages({ ...pageImages, religions: image })} />

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
              <ViewToggle compact={isCompact("religions")} onChange={(compact) => setCompact("religions", compact)} />
            </section>

            <section className={cn("mt-6 grid gap-4", isCompact("religions") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {religionList.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReligionId(r.id)}
                  className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("religions") ? "flex flex-row" : "flex flex-col")}
                >
                  <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("religions") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                    {r.image ? (
                      <Image src={r.image} alt={`Symbol for ${r.name}`} fill sizes="320px" className="object-cover" />
                    ) : (
                      <Church className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                    )}
                    <CanonImageField
                      value={r.image ?? ""}
                      label={`Change ${r.name} image`}
                      onChange={(image) => updateReligion(r.id, { image: image || undefined })}
                      onClick={(event) => event.stopPropagation()}
                    />
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
        ) : view === "cultures" ? (
          /* ---------------------------- CULTURES INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Cultures" image={pageImages.cultures ?? ""} icon={Globe2} onImageChange={(image) => setPageImages({ ...pageImages, cultures: image })} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Cultures</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {cultureList.length} canon {cultureList.length === 1 ? "record" : "records"}. Select any culture to
                  open its Canon Record.
                </p>
              </div>
              <button
                onClick={() => setView("culture-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create Culture
              </button>
              <ViewToggle compact={isCompact("cultures")} onChange={(compact) => setCompact("cultures", compact)} />
            </section>

            {cultureList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <Globe2 className="size-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No cultures yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
                  Culture records will appear here once you create them. Start with a name and a type.
                </p>
                <button
                  onClick={() => setView("culture-create")}
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  <Plus className="size-4" />
                  Create Culture
                </button>
              </section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("cultures") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {cultureList.map((culture) => (
                  <button
                    key={culture.id}
                    onClick={() => setSelectedCultureId(culture.id)}
                    className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("cultures") ? "flex flex-row" : "flex flex-col")}
                  >
                    <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("cultures") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                      {culture.image ? (
                        <Image src={culture.image} alt={`Symbol for ${culture.name}`} fill sizes="320px" className="object-cover" />
                      ) : (
                        <Globe2 className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                      )}
                      <CanonImageField
                        value={culture.image ?? ""}
                        label={`Change ${culture.name} image`}
                        onChange={(image) => updateCulture(culture.id, { image: image || undefined })}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                        {culture.name}
                      </h3>
                      {culture.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{culture.summary}</p>}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          <Globe2 className="size-3" />
                          {cultureTypeLabel(culture.type)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </section>
            )}
          </>
        ) : view === "culture-create" ? (
          /* --------------------------- CULTURE CREATE ---------------------------- */
          <>
            <BackLink label="Cultures" onClick={() => setView("cultures")} />
            <CultureCreateForm
              onCancel={() => setView("cultures")}
              onCreated={(id) => {
                setView("cultures")
                setSelectedCultureId(id)
              }}
            />
          </>
        ) : view === "organizations" ? (
          /* -------------------------- ORGANIZATIONS INDEX -------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Organizations" image={pageImages.organizations ?? ""} icon={Building2} onImageChange={(image) => setPageImages({ ...pageImages, organizations: image })} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Organizations</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {organizationList.length} canon {organizationList.length === 1 ? "record" : "records"}. Select any
                  organization to open its Canon Record.
                </p>
              </div>
              <button
                onClick={() => setView("organization-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create Organization
              </button>
              <ViewToggle compact={isCompact("organizations")} onChange={(compact) => setCompact("organizations", compact)} />
            </section>

            {organizationList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <Building2 className="size-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">
                  No organizations yet
                </h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
                  Organization records will appear here once you create them. Start with a name and a type.
                </p>
                <button
                  onClick={() => setView("organization-create")}
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  <Plus className="size-4" />
                  Create Organization
                </button>
              </section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("organizations") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {organizationList.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedOrganizationId(o.id)}
                    className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("organizations") ? "flex flex-row" : "flex flex-col")}
                  >
                    <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("organizations") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                      {o.image ? (
                        <Image src={o.image} alt={`Symbol for ${o.name}`} fill sizes="320px" className="object-cover" />
                      ) : (
                        <Building2 className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />
                      )}
                      <CanonImageField
                        value={o.image ?? ""}
                        label={`Change ${o.name} image`}
                        onChange={(image) => updateOrganization(o.id, { image: image || undefined })}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                        {o.name}
                      </h3>
                      {o.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{o.summary}</p>}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          <Building2 className="size-3" />
                          {organizationTypeLabel(o.type)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </section>
            )}
          </>
        ) : view === "organization-create" ? (
          /* -------------------------- ORGANIZATION CREATE -------------------------- */
          <>
            <BackLink label="Organizations" onClick={() => setView("organizations")} />
            <OrganizationCreateForm
              onCancel={() => setView("organizations")}
              onCreated={(id) => {
                setView("organizations")
                setSelectedOrganizationId(id)
              }}
            />
          </>
        ) : view === "concepts" ? (
          /* ---------------------------- CONCEPTS INDEX ----------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Concepts" image={pageImages.concepts ?? ""} icon={Lightbulb} onImageChange={(image) => setPageImages({ ...pageImages, concepts: image })} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Concepts</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {conceptList.length} canon {conceptList.length === 1 ? "record" : "records"}. Broad worldbuilding elements
                  that do not sit inside a single, more specific canon category.
                </p>
              </div>
              <button
                onClick={() => setView("concept-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create Concept
              </button>
              <ViewToggle compact={isCompact("concepts")} onChange={(compact) => setCompact("concepts", compact)} />
            </section>

            {conceptList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                  <ScrollText className="size-5" />
                </span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No concepts yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
                  Concept records will appear here once you create them. Start by classifying what your first Concept
                  actually is.
                </p>
                <button
                  onClick={() => setView("concept-create")}
                  className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  <Plus className="size-4" />
                  Create Concept
                </button>
              </section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("concepts") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {conceptList.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConceptId(concept.id)}
                    className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("concepts") ? "flex flex-row" : "flex flex-col")}
                  >
                    <div className={cn("relative overflow-hidden bg-muted", isCompact("concepts") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                      {concept.image ? (
                        <Image
                          src={concept.image}
                          alt={`View of ${concept.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <ScrollText className="size-8" />
                        </div>
                      )}
                      <CanonImageField
                        value={concept.image ?? ""}
                        label={`Change ${concept.name} image`}
                        onChange={(image) => updateConcept(concept.id, { image: image || undefined })}
                        onClick={(event) => event.stopPropagation()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{concept.name}</h3>
                      {concept.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{concept.summary}</p>}
                    </div>
                  </button>
                ))}
              </section>
            )}
          </>
        ) : (
          /* -------------------- CONCEPT CREATE (classification) -------------------- */
          <>
            <BackLink label="Concepts" onClick={() => setView("concepts")} />
            <ConceptClassification
              onCancel={() => setView("concepts")}
              onCreated={(id) => {
                setView("concepts")
                setSelectedConceptId(id)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
