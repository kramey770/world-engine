"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowUpDown,
  Building2,
  ChevronRight,
  Church,
  Globe2,
  ImageOff,
  Landmark,
  Lightbulb,
  LayoutGrid,
  Lock,
  MapPin,
  Package,
  PawPrint,
  Plus,
  Search,
  Rows3,
  ScrollText,
  Settings,
  Shield,
  Clock3,
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
import { resolvePageThumbnail, usePageThumbnail } from "@/lib/page-thumbnail"
import { HistoryCanonRecord } from "@/components/world/history-canon-record"
import { HistoryTimeline } from "@/components/world/history-timeline"
import { useHistoryCanon } from "@/lib/history-canon"
import { ITEM_TYPES, itemTypeLabel, useItemCanon } from "@/lib/item-canon"
import { ItemCanonRecord } from "@/components/world/item-canon-record"
import { SpeciesCanonRecord, SpeciesCreateFlow } from "@/components/world/species-canon-record"
import { SPECIES_TYPES, speciesTypeLabel, useSpeciesCanon } from "@/lib/species-canon"

type CanonCategory = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  ready: boolean
}

type CanonGroup = { label: string; entries: CanonCategory[] }

const CANON_GROUPS: CanonGroup[] = [
  {
    label: "People",
    entries: [
      { id: "characters", label: "Characters", description: "People, dynasties, and the figures who shape your world.", icon: Users, ready: true },
      { id: "relationships", label: "Relationships & Connections", description: "Family, lineage, alliances, rivalries, and other connections.", icon: Users, ready: false },
      { id: "knowledge", label: "Character Knowledge & Awareness", description: "What each character knows, believes, suspects, or misunderstands.", icon: Lock, ready: false },
    ],
  },
  {
    label: "World",
    entries: [
      { id: "locations", label: "Locations", description: "Cities, keeps, regions, and points of interest.", icon: MapPin, ready: true },
      { id: "species", label: "Species", description: "Intelligent, animal, monstrous, and supernatural peoples of your world.", icon: PawPrint, ready: true },
      { id: "cultures", label: "Cultures", description: "Peoples, customs, languages, and traditions.", icon: Globe2, ready: true },
      { id: "organizations", label: "Organizations", description: "Guilds, councils, orders, and factions.", icon: Building2, ready: true },
      { id: "religions", label: "Religions", description: "Faiths, pantheons, and sacred orders.", icon: Church, ready: true },
      { id: "languages", label: "Languages", description: "The languages, scripts, dialects, and naming systems of your world.", icon: ScrollText, ready: false },
      { id: "items", label: "Items", description: "Artifacts, relics, and objects of significance.", icon: Package, ready: true },
      { id: "concepts", label: "Concepts", description: "Systems, phenomena, principles, and the rules of reality.", icon: Lightbulb, ready: true },
      { id: "history", label: "History", description: "Eras, wars, and the timeline of your world.", icon: Landmark, ready: true },
    ],
  },
  {
    label: "Systems",
    entries: [
      { id: "magic", label: "Magic", description: "The forces, practices, costs, and boundaries of magic.", icon: Lightbulb, ready: false },
      { id: "government", label: "Government & Politics", description: "Institutions, power structures, laws, and political systems.", icon: Landmark, ready: false },
      { id: "combat", label: "Combat Doctrine", description: "The principles, tactics, and practices that shape conflict.", icon: Rows3, ready: false },
      { id: "military", label: "Military Forces", description: "Armies, units, command structures, and military capabilities.", icon: Shield, ready: false },
      { id: "technology", label: "Technology", description: "Tools, inventions, infrastructure, and technical capabilities.", icon: Settings, ready: false },
      { id: "calendars", label: "Calendars & Time", description: "Calendars, eras, cycles, and the ways time is measured.", icon: Clock3, ready: false },
    ],
  },
  {
    label: "Information & Resources",
    entries: [
      { id: "economics", label: "Economics & Resources", description: "Trade, currencies, materials, labor, and resource systems.", icon: Package, ready: false },
      { id: "research", label: "Research & Sources", description: "Reference material, sources, notes, and research provenance.", icon: Search, ready: false },
    ],
  },
]

const IMPLEMENTED_CANON_IDS = new Set(["characters", "locations", "religions", "concepts", "organizations", "cultures", "history", "items", "species"])

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
  pageId,
  icon: Icon,
}: {
  title: string
  pageId: string
  icon: LucideIcon
}) {
  const { getPageThumbnail, setPageThumbnail } = usePageThumbnail()
  const thumbnail = getPageThumbnail(pageId)
  const image = resolvePageThumbnail(thumbnail)

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
      <CanonImageField
        value={image}
        label={`Import ${title.toLowerCase()} artwork`}
        onChange={(nextImage) =>
          setPageThumbnail(pageId, { source: nextImage ? "uploaded" : "none", value: nextImage || undefined })
        }
        onBuiltInChange={(assetId) => setPageThumbnail(pageId, { source: "builtin", value: assetId })}
      />
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

type CollectionView = "large" | "compact" | "list"

function CollectionViewToggle({ view, onChange }: { view: CollectionView; onChange: (view: CollectionView) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1" aria-label="Entry view">
      {([
        ["large", LayoutGrid, "Large thumbnail view"],
        ["compact", Rows3, "Compact thumbnail view"],
        ["list", ScrollText, "List view"],
      ] as const).map(([value, Icon, label]) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={view === value}
          onClick={() => onChange(value)}
          className={cn("rounded-md p-1.5 transition-colors", view === value ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted")}
        >
          <Icon className="size-4" />
        </button>
      ))}
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
  const pageThumbnailStore = usePageThumbnail()
  const { characters, updateCharacter } = useCharacterCanon()
  const { locations, updateLocation } = useLocationCanon()
  const { religions, updateReligion } = useReligionCanon()
  const { organizations, updateOrganization } = useOrganizationCanon()
  const { cultures, updateCulture } = useCultureCanon()
  const { concepts, updateConcept } = useConceptCanon()
  const { histories } = useHistoryCanon()
  const { items, updateItem } = useItemCanon()
  const { species, updateSpecies } = useSpeciesCanon()
  const [view, setView] = useState<
    | "landing" | "characters" | "locations" | "location-create" | "religions" | "concepts" | "concept-create"
    | "organizations" | "organization-create" | "cultures" | "culture-create" | "history" | "history-create"
    | "items" | "item-create" | "species" | "species-create" | "coming-soon"
  >("landing")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [selectedReligionId, setSelectedReligionId] = useState<string | null>(null)
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null)
  const [selectedCultureId, setSelectedCultureId] = useState<string | null>(null)
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null)
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null)
  const [compactLists, setCompactLists] = useState<Record<string, boolean>>({})
  const [locationView, setLocationView] = useState<CollectionView>("large")
  const [placeholderId, setPlaceholderId] = useState("")
  const [itemSearch, setItemSearch] = useState("")
  const [itemTypeFilter, setItemTypeFilter] = useState("all")
  const [itemSort, setItemSort] = useState<"name" | "created">("created")
  const [speciesSearch, setSpeciesSearch] = useState("")
  const [speciesTypeFilter, setSpeciesTypeFilter] = useState("all")
  const [speciesSort, setSpeciesSort] = useState<"name" | "created">("created")

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [view, selectedId, selectedLocationId, selectedReligionId, selectedOrganizationId, selectedCultureId, selectedConceptId, selectedHistoryId, selectedItemId, selectedSpeciesId])

  const openCategory = (category: CanonCategory) => {
    if (IMPLEMENTED_CANON_IDS.has(category.id)) setView(category.id as typeof view)
    else {
      setPlaceholderId(category.id)
      setView("coming-soon")
    }
  }

  const isCompact = (category: string) => compactLists[category] ?? false
  const setCompact = (category: string, compact: boolean) =>
    setCompactLists((previous) => ({ ...previous, [category]: compact }))

  const characterList = useMemo(() => Object.values(characters), [characters])
  const locationList = useMemo(() => Object.values(locations), [locations])
  const religionList = useMemo(() => Object.values(religions), [religions])
  const organizationList = useMemo(() => Object.values(organizations), [organizations])
  const cultureList = useMemo(() => Object.values(cultures), [cultures])
  const conceptList = useMemo(() => Object.values(concepts), [concepts])
  const historyList = useMemo(() => Object.values(histories), [histories])
  const itemList = useMemo(() => Object.values(items), [items])
  const speciesList = useMemo(() => Object.values(species), [species])
  const filteredSpecies = useMemo(() => {
    const query = speciesSearch.trim().toLowerCase()
    return speciesList
      .filter((record) => speciesTypeFilter === "all" || record.type === speciesTypeFilter)
      .filter((record) => !query || `${record.name} ${record.summary ?? ""}`.toLowerCase().includes(query))
      .sort((left, right) => speciesSort === "name" ? left.name.localeCompare(right.name) : right.createdAt - left.createdAt)
  }, [speciesList, speciesSearch, speciesSort, speciesTypeFilter])
  const filteredItems = useMemo(() => {
    const query = itemSearch.trim().toLowerCase()
    return itemList
      .filter((item) => itemTypeFilter === "all" || item.type === itemTypeFilter)
      .filter((item) => !query || `${item.name} ${item.summary ?? ""} ${Object.values(item.fieldValues).flat().join(" ")}`.toLowerCase().includes(query))
      .sort((left, right) => itemSort === "name" ? left.name.localeCompare(right.name) : right.createdAt - left.createdAt)
  }, [itemList, itemSearch, itemSort, itemTypeFilter])

  useEffect(() => {
    const saved = window.localStorage.getItem("world-engine:canon-items-view")
    if (saved === "compact") setCompact("items", true)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("world-engine:canon-items-view", isCompact("items") ? "compact" : "expanded")
  }, [compactLists])

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

  if (selectedItemId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All items" onClick={() => setSelectedItemId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><ItemCanonRecord itemId={selectedItemId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedSpeciesId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All species" onClick={() => setSelectedSpeciesId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><SpeciesCanonRecord speciesId={selectedSpeciesId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
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

  if (selectedHistoryId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All history" onClick={() => setSelectedHistoryId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <HistoryCanonRecord
            historyId={selectedHistoryId}
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

            <div className="mt-8 space-y-8">
              {CANON_GROUPS.map((group) => (
                <section key={group.label}>
                  <div className="mb-3 flex items-center gap-3">
                    <h2 className="font-serif text-xl font-medium tracking-tight">{group.label}</h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.entries.map((cat) => {
                      const count = cat.id === "characters" ? characterList.length : cat.id === "locations" ? locationList.length : cat.id === "religions" ? religionList.length : cat.id === "concepts" ? conceptList.length : cat.id === "organizations" ? organizationList.length : cat.id === "cultures" ? cultureList.length : cat.id === "history" ? historyList.length : cat.id === "species" ? speciesList.length : cat.id === "items" ? itemList.length : 0
                      const thumbnail = resolvePageThumbnail(pageThumbnailStore.getPageThumbnail(cat.id))
                      return (
                        <button key={cat.id} onClick={() => openCategory(cat)} className="group relative flex min-h-[150px] flex-col items-start overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]">
                          {thumbnail && <Image src={thumbnail} alt="" fill sizes="320px" className="object-cover opacity-20 transition-opacity group-hover:opacity-30" />}
                          <div className="relative z-[1] flex w-full items-center justify-between">
                            <span className={cn("flex size-10 items-center justify-center overflow-hidden rounded-lg ring-1 ring-inset", cat.ready ? "bg-primary/12 text-primary ring-primary/20" : "bg-muted text-muted-foreground ring-border")}>
                              {thumbnail ? <Image src={thumbnail} alt="" width={40} height={40} className="size-full object-cover" /> : <cat.icon className="size-5" />}
                            </span>
                            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", cat.ready ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground")}>
                              {cat.ready ? `${count} ${count === 1 ? "record" : "records"}` : <><Lock className="size-3" />Coming soon</>}
                            </span>
                          </div>
                          <h3 className="relative z-[1] mt-3 font-medium tracking-tight text-foreground">{cat.label}</h3>
                          <p className="relative z-[1] mt-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                          <span className="relative z-[1] mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary">{cat.ready ? "Open" : "View placeholder"}<ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : view === "characters" ? (
          /* --------------------------- CHARACTERS INDEX --------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Characters" pageId="characters" icon={Users} />

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
                onClick={() => setView("characters")}
                title="Open the Characters Canon source"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
              >
                <Plus className="size-4" />
                Open Character Canon
              </button>
              <ViewToggle compact={isCompact("characters")} onChange={(compact) => setCompact("characters", compact)} />
            </section>

            <section className={cn("mt-6 grid gap-4", isCompact("characters") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {characterList.map((c) => (
                <article
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
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium", HOUSE_TEXT[c.house])}>
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
                </article>
              ))}
            </section>
          </>
        ) : view === "locations" ? (
          /* --------------------------- LOCATIONS INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Locations" pageId="locations" icon={MapPin} />

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
              <CollectionViewToggle view={locationView} onChange={setLocationView} />
            </section>

            <section className={cn("mt-6 grid gap-4", locationView === "large" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
              {locationList.map((l) => (
                <article
                  key={l.id}
                  onClick={() => setSelectedLocationId(l.id)}
                  className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", locationView === "large" ? "flex flex-col" : "flex flex-row")}
                >
                  <div className={cn("relative overflow-hidden bg-muted", locationView === "large" ? "aspect-[4/3] w-full" : locationView === "compact" ? "aspect-[4/3] w-32 shrink-0" : "aspect-[16/9] w-32 shrink-0 sm:w-48")}>
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
                  <div className={cn("flex min-w-0 flex-1 flex-col", locationView === "large" ? "p-4" : "justify-center p-3")}>
                    <h3 className={cn("font-serif font-medium tracking-tight text-foreground text-balance", locationView === "large" ? "text-lg" : "text-base")}>
                      {l.name}
                    </h3>
                    {l.summary && <p className={cn("mt-0.5 text-sm text-muted-foreground text-pretty", locationView === "compact" && "line-clamp-1")}>{l.summary}</p>}
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
                </article>
              ))}
            </section>
          </>
        ) : view === "species" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Species Database" pageId="species" icon={PawPrint} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Species Database</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">{filteredSpecies.length} of {speciesList.length} canon {speciesList.length === 1 ? "species record" : "species records"}. Select a species to open its Canon Record.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView("species-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Species</button>
                <ViewToggle compact={isCompact("species")} onChange={(compact) => setCompact("species", compact)} />
              </div>
            </section>

            <section className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
              <label className="relative min-w-52 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Search species</span><input value={speciesSearch} onChange={(event) => setSpeciesSearch(event.target.value)} placeholder="Search species" className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20" /></label>
              <select aria-label="Filter species by type" value={speciesTypeFilter} onChange={(event) => setSpeciesTypeFilter(event.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/50"><option value="all">All types</option>{SPECIES_TYPES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
              <label className="relative"><ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Sort species</span><select value={speciesSort} onChange={(event) => setSpeciesSort(event.target.value as "name" | "created")} className="h-9 rounded-lg border border-border bg-background py-0 pl-8 pr-3 text-sm text-foreground outline-none focus:border-primary/50"><option value="created">Recently added</option><option value="name">Name</option></select></label>
            </section>

            {speciesList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><PawPrint className="size-5" /></span><h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No species yet</h2><p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create a Species Canon record to begin building the authoritative Species Database.</p><button onClick={() => setView("species-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Species</button></section>
            ) : filteredSpecies.length === 0 ? (
              <section className="mt-6 rounded-xl border border-dashed border-border bg-card/50 px-6 py-10 text-center"><p className="text-sm text-muted-foreground">No species match the current search or type filter.</p></section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("species") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {filteredSpecies.map((record) => <article key={record.id} onClick={() => setSelectedSpeciesId(record.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("species") ? "flex flex-row" : "flex flex-col")}>
                  <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-muted", isCompact("species") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>{record.image ? <Image src={record.image} alt={`Image of ${record.name}`} fill sizes={isCompact("species") ? "128px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <ImageOff className={isCompact("species") ? "size-5 text-muted-foreground" : "size-8 text-muted-foreground"} />}<CanonImageField value={record.image ?? ""} label={`Change ${record.name} image`} onChange={(image) => updateSpecies(record.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} /><div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" /></div>
                  <div className={cn("flex min-w-0 flex-1 flex-col", isCompact("species") ? "justify-center p-3" : "p-4")}><h3 className={cn("font-serif font-medium tracking-tight text-foreground text-balance", isCompact("species") ? "text-base" : "text-lg")}>{record.name}</h3>{!isCompact("species") && record.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{record.summary}</p>}<span className="mt-3 inline-flex w-fit items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">{speciesTypeLabel(record.type)}</span></div>
                </article>)}
              </section>
            )}
          </>
        ) : view === "species-create" ? (
          <>
            <BackLink label="Species Database" onClick={() => setView("species")} />
            <SpeciesCreateFlow onCancel={() => setView("species")} onCreated={(id) => { setView("species"); setSelectedSpeciesId(id) }} />
          </>
        ) : view === "items" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Items" pageId="items" icon={Package} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Items</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {filteredItems.length} of {itemList.length} canon {itemList.length === 1 ? "item" : "items"}. Select an item to open its Canon Record.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView("item-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Item</button>
                <ViewToggle compact={isCompact("items")} onChange={(compact) => setCompact("items", compact)} />
              </div>
            </section>

            <section className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
              <label className="relative min-w-52 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Search items</span><input value={itemSearch} onChange={(event) => setItemSearch(event.target.value)} placeholder="Search items" className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20" /></label>
              <select aria-label="Filter items by type" value={itemTypeFilter} onChange={(event) => setItemTypeFilter(event.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/50"><option value="all">All types</option>{ITEM_TYPES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
              <label className="relative"><ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Sort items</span><select value={itemSort} onChange={(event) => setItemSort(event.target.value as "name" | "created")} className="h-9 rounded-lg border border-border bg-background py-0 pl-8 pr-3 text-sm text-foreground outline-none focus:border-primary/50"><option value="created">Recently added</option><option value="name">Name</option></select></label>
            </section>

            {itemList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Package className="size-5" /></span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No items yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create your first important object to begin building the Items canon.</p>
                <button onClick={() => setView("item-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Item</button>
              </section>
            ) : filteredItems.length === 0 ? (
              <section className="mt-6 rounded-xl border border-dashed border-border bg-card/50 px-6 py-10 text-center"><p className="text-sm text-muted-foreground">No items match the current search or type filter.</p></section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("items") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {filteredItems.map((item) => (
                  <article key={item.id} onClick={() => setSelectedItemId(item.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("items") ? "flex flex-row" : "flex flex-col")}>
                    <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-muted", isCompact("items") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>
                      {item.image ? <Image src={item.image} alt={`Image of ${item.name}`} fill sizes={isCompact("items") ? "128px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <ImageOff className={isCompact("items") ? "size-5 text-muted-foreground" : "size-8 text-muted-foreground"} />}
                      <CanonImageField value={item.image ?? ""} label={`Change ${item.name} image`} onChange={(image) => updateItem(item.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className={cn("flex min-w-0 flex-1 flex-col", isCompact("items") ? "justify-center p-3" : "p-4")}>
                      <h3 className={cn("font-serif font-medium tracking-tight text-foreground text-balance", isCompact("items") ? "text-base" : "text-lg")}>{item.name}</h3>
                      {!isCompact("items") && item.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{item.summary}</p>}
                      <span className="mt-3 inline-flex w-fit items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary">{itemTypeLabel(item.type)}</span>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        ) : view === "item-create" ? (
          <>
            <BackLink label="Items" onClick={() => setView("items")} />
            <div className="mt-6"><ItemCanonRecord itemId={null} onCancel={() => setView("items")} onCreated={(id) => { setView("items"); setSelectedItemId(id) }} /></div>
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
            <LorePageHero title="Religions" pageId="religions" icon={Church} />

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
                onClick={() => setView("religions")}
                title="Open the Religions Canon source"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted"
              >
                <Plus className="size-4" />
                Open Religion Canon
              </button>
              <ViewToggle compact={isCompact("religions")} onChange={(compact) => setCompact("religions", compact)} />
            </section>

            <section className={cn("mt-6 grid gap-4", isCompact("religions") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
              {religionList.map((r) => (
                <article
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
                </article>
              ))}
            </section>
          </>
        ) : view === "history" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="History" pageId="history" icon={Landmark} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">History</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {historyList.length} historical {historyList.length === 1 ? "record" : "records"}. Arrange the
                  chronology of your world by era.
                </p>
              </div>
              <button
                onClick={() => setView("history-create")}
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
              >
                <Plus className="size-4" />
                Create History Record
              </button>
              <ViewToggle compact={isCompact("history")} onChange={(compact) => setCompact("history", compact)} />
            </section>

            <HistoryTimeline histories={historyList} compact={isCompact("history")} onCreate={() => setView("history-create")} onSelect={setSelectedHistoryId} />
          </>
        ) : view === "history-create" ? (
          <>
            <BackLink label="History" onClick={() => setView("history")} />
            <HistoryCanonRecord
              historyId={null}
              onCancel={() => setView("history")}
              onCreated={(id) => {
                setView("history")
                setSelectedHistoryId(id)
              }}
            />
          </>
        ) : view === "cultures" ? (
          /* ---------------------------- CULTURES INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Cultures" pageId="cultures" icon={Globe2} />

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
                  <article
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
                  </article>
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
            <LorePageHero title="Organizations" pageId="organizations" icon={Building2} />

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
                  <article
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
                  </article>
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
        ) : view === "coming-soon" ? (
          (() => {
            const category = CANON_GROUPS.flatMap((group) => group.entries).find((entry) => entry.id === placeholderId)
            if (!category) return null
            const Icon = category.icon
            return (
              <>
                <BackLink label="Canon Lore" onClick={() => setView("landing")} />
                <LorePageHero title={category.label} pageId={category.id} icon={Icon} />
                <section className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-inset ring-border"><Icon className="size-6" /></span>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"><Lock className="size-3.5" />Coming Soon</span>
                  <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight">{category.label}</h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{category.description} This Canon source will have a dedicated database and editor in a future pass.</p>
                </section>
              </>
            )
          })()
        ) : view === "concepts" ? (
          /* ---------------------------- CONCEPTS INDEX ----------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Concepts" pageId="concepts" icon={Lightbulb} />

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
                  <article
                    key={concept.id}
                    className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("concepts") ? "flex flex-row" : "flex flex-col")}
                  >
                    <div
                      className={cn("relative overflow-hidden bg-muted", isCompact("concepts") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}
                      onClick={() => setSelectedConceptId(concept.id)}
                    >
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
                    <button
                      type="button"
                      onClick={() => setSelectedConceptId(concept.id)}
                      className="flex flex-1 flex-col p-4 text-left"
                    >
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{concept.name}</h3>
                      {concept.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{concept.summary}</p>}
                    </button>
                  </article>
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
