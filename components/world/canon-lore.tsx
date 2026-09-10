"use client"

import { useEffect, useMemo, useState, type ComponentType } from "react"
import { CanonArtwork } from "@/components/world/canon-artwork"
import {
  ArrowLeft,
  ArrowUpDown,
  BookOpen,
  Building2,
  ChevronRight,
  Church,
  Globe2,
  ImageOff,
  Landmark,
  Lightbulb,
  Link2,
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
import { CalendarCanonRecord, CalendarCreateForm } from "@/components/world/calendar-canon-record"
import { useHistoryCanon } from "@/lib/history-canon"
import { useCalendarCanon } from "@/lib/calendar-canon"
import { ITEM_TYPES, itemTypeLabel, useItemCanon } from "@/lib/item-canon"
import { ItemCanonRecord } from "@/components/world/item-canon-record"
import { SpeciesCanonRecord, SpeciesCreateFlow } from "@/components/world/species-canon-record"
import { SPECIES_TYPES, speciesTypeLabel, useSpeciesCanon } from "@/lib/species-canon"
import { LanguageCanonRecord, LanguageCreateForm } from "@/components/world/language-canon-record"
import { languageStatusLabel, languageTypeLabel, useLanguageCanon } from "@/lib/language-canon"
import { CombatDoctrineCanonRecord, CombatDoctrineCreateForm } from "@/components/world/combat-doctrine-canon-record"
import { combatDoctrineTypeLabel, useCombatDoctrine } from "@/lib/combat-doctrine-canon"
import { GovernmentCanonRecord, GovernmentCreateForm } from "@/components/world/government-canon-record"
import { governmentFormLabel, governmentStatusLabel, useGovernmentCanon } from "@/lib/government-canon"
import { SYSTEM_LABELS, systemTypeLabel, useSystemsCanon, type SystemDomain, type SystemRecord } from "@/lib/systems-canon"
import { SystemCanonRecord } from "@/components/world/system-canon-record"
import { RelationshipsCanonRecord } from "@/components/world/relationships-canon-record"
import { useRelationshipsCanon } from "@/lib/relationships-canon"
import { ResearchCanonRecord } from "@/components/world/research-canon-record"
import { KnowledgeCanonRecord } from "@/components/world/knowledge-canon-record"
import { useResearchCanon } from "@/lib/research-canon"
import { useKnowledgeCanon } from "@/lib/knowledge-canon"
import {
  Artifact,
  Castle,
  Character,
  Crown,
  Crystal,
  Dragon,
  Eye,
  Forest,
  Hourglass,
  Key,
  Map,
  Rune,
  Scroll,
  Search as FantasySearch,
  Settings as FantasySettings,
  Shield as FantasyShield,
  Share,
  Sword,
  Timeline,
  Wand,
} from "@/lib/fantasy-icons"

type CanonCategory = {
  id: string
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
  ready: boolean
}

type CanonGroup = { label: string; entries: CanonCategory[] }

const CANON_GROUPS: CanonGroup[] = [
  {
    label: "People",
    entries: [
      { id: "characters", label: "Characters", description: "People, dynasties, and the figures who shape your world.", icon: Character, ready: true },
      { id: "relationships", label: "Relationships & Connections", description: "Family, lineage, alliances, rivalries, and other connections.", icon: Share, ready: true },
      { id: "knowledge", label: "Character Knowledge & Awareness", description: "What each character knows, believes, suspects, or misunderstands.", icon: Eye, ready: true },
    ],
  },
  {
    label: "World",
    entries: [
      { id: "locations", label: "Locations", description: "Cities, keeps, regions, and points of interest.", icon: Map, ready: true },
      { id: "species", label: "Species", description: "Intelligent, animal, monstrous, and supernatural peoples of your world.", icon: Dragon, ready: true },
      { id: "cultures", label: "Cultures", description: "Peoples, customs, languages, and traditions.", icon: Forest, ready: true },
      { id: "organizations", label: "Organizations", description: "Guilds, councils, orders, and factions.", icon: Castle, ready: true },
      { id: "religions", label: "Religions", description: "Faiths, pantheons, and sacred orders.", icon: Rune, ready: true },
      { id: "languages", label: "Languages", description: "The languages, scripts, dialects, and naming systems of your world.", icon: Scroll, ready: true },
      { id: "items", label: "Items", description: "Artifacts, relics, and objects of significance.", icon: Artifact, ready: true },
      { id: "concepts", label: "Concepts", description: "Systems, phenomena, principles, and the rules of reality.", icon: Crystal, ready: true },
      { id: "history", label: "History", description: "Eras, wars, and the timeline of your world.", icon: Timeline, ready: true },
    ],
  },
  {
    label: "Systems",
    entries: [
      { id: "magic", label: "Magic", description: "The forces, practices, costs, and boundaries of magic.", icon: Wand, ready: true },
      { id: "government", label: "Government & Politics", description: "Institutions, power structures, laws, and political systems.", icon: Crown, ready: true },
      { id: "combat", label: "Combat Doctrine", description: "The principles, tactics, and practices that shape conflict.", icon: Sword, ready: true },
      { id: "military", label: "Military Forces", description: "Armies, units, command structures, and military capabilities.", icon: FantasyShield, ready: true },
      { id: "technology", label: "Technology", description: "Tools, inventions, infrastructure, and technical capabilities.", icon: FantasySettings, ready: true },
      { id: "calendars", label: "Calendars & Time", description: "Calendars, eras, cycles, and the ways time is measured.", icon: Hourglass, ready: true },
    ],
  },
  {
    label: "Information & Resources",
    entries: [
      { id: "economics", label: "Economics & Resources", description: "Trade, currencies, materials, labor, and resource systems.", icon: Key, ready: true },
      { id: "research", label: "Research & Sources", description: "Reference material, sources, notes, and research provenance.", icon: FantasySearch, ready: true },
    ],
  },
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
  pageId,
  icon: Icon,
}: {
  title: string
  pageId: string
  icon: LucideIcon
}) {
  const { getPageThumbnail, setPageThumbnail, applyCover, removeCover } = usePageThumbnail()
  const thumbnail = getPageThumbnail(pageId)
  const image = resolvePageThumbnail(thumbnail)

  return (
    <div className="group relative mt-5 flex aspect-[4/1] min-h-32 items-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-card">
      {image ? (
        <CanonArtwork src={image} alt={`${title} artwork`} fill sizes="1024px" className="object-cover" />
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
        imageType="cover"
        onChange={(nextImage) =>
          setPageThumbnail(pageId, { source: nextImage ? "uploaded" : "none", value: nextImage || undefined })
        }
        onBuiltInChange={(assetId) => setPageThumbnail(pageId, { source: "builtin", value: assetId })}
        onCoverApply={(assetId, scope) => applyCover(`page:${pageId}`, resolvePageThumbnail({ source: "builtin", value: assetId }), scope)}
        onCoverRemove={(scope) => removeCover(`page:${pageId}`, scope)}
        coverBranchLabel={title}
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

function SystemIndex({ domain, records, compact, onCompactChange, onSelect, onCreate, onBack, onImageChange }: { domain: SystemDomain; records: Record<string, SystemRecord>; compact: boolean; onCompactChange: (value: boolean) => void; onSelect: (id: string) => void; onCreate: () => void; onBack: () => void; onImageChange: (id: string, image: string) => void }) {
  const list = Object.values(records)
  const Icon = domain === "magic" ? Lightbulb : domain === "technology" ? Settings : domain === "military" ? Shield : Package
  const title = SYSTEM_LABELS[domain].title
  return <>
    <BackLink label="Canon Lore" onClick={onBack} />
    <LorePageHero title={title} pageId={domain} icon={Icon} />
    <section className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p><h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">{title}</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">{list.length} canon {list.length === 1 ? "record" : "records"}. {SYSTEM_LABELS[domain].description}</p></div><div className="flex flex-wrap items-center gap-2"><button onClick={onCreate} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create {title}</button><ViewToggle compact={compact} onChange={onCompactChange} /></div></section>
    {list.length === 0 ? <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Icon className="size-5" /></span><h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No {title.toLowerCase()} records yet</h2><p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create a record to establish the authoritative source for this system.</p><button onClick={onCreate} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create {title}</button></section> : <section className={cn("mt-6 grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>{list.map((record) => <article key={record.id} onClick={() => onSelect(record.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", compact ? "flex flex-row" : "flex flex-col")}><div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", compact ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>{record.image ? <CanonArtwork src={record.image} alt={`Artwork for ${record.name}`} fill sizes="320px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <Icon className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />}<CanonImageField value={record.image ?? ""} label={`Change ${record.name} image`} onChange={(image) => onImageChange(record.id, image || "")} onClick={(event) => event.stopPropagation()} /><div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" /></div><div className="flex min-w-0 flex-1 flex-col p-4"><h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{record.name}</h3>{record.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{record.summary}</p>}<div className="mt-3 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"><Icon className="size-3" />{systemTypeLabel(domain, record.type)}</span><span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{record.status}</span></div></div></article>)}</section>}
  </>
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
  const { calendars, updateCalendar } = useCalendarCanon()
  const { items, updateItem } = useItemCanon()
  const { species, updateSpecies } = useSpeciesCanon()
  const { languages, updateLanguage } = useLanguageCanon()
  const { doctrines, updateCombatDoctrine } = useCombatDoctrine()
  const { governments, updateGovernment } = useGovernmentCanon()
  const { records: systemRecords, updateRecord: updateSystemRecord } = useSystemsCanon()
  const { relationships } = useRelationshipsCanon()
  const { sources } = useResearchCanon()
  const { records: knowledgeRecords } = useKnowledgeCanon()
  const [view, setView] = useState<
    | "landing" | "characters" | "relationships" | "relationship-create" | "knowledge" | "knowledge-create" | "research" | "research-create" | "locations" | "location-create" | "religions" | "concepts" | "concept-create"
    | "organizations" | "organization-create" | "cultures" | "culture-create" | "languages" | "language-create" | "history" | "history-create"
    | "items" | "item-create" | "species" | "species-create" | "combat" | "combat-create" | "government" | "government-create" | "magic" | "magic-create" | "technology" | "technology-create" | "economics" | "economics-create" | "military" | "military-create" | "calendars" | "calendar-create"
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
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(null)
  const [selectedCombatDoctrineId, setSelectedCombatDoctrineId] = useState<string | null>(null)
  const [selectedGovernmentId, setSelectedGovernmentId] = useState<string | null>(null)
  const [selectedCalendarId, setSelectedCalendarId] = useState<string | null>(null)
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null)
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string | null>(null)
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null)
  const [selectedSystemId, setSelectedSystemId] = useState<{ domain: SystemDomain; id: string } | null>(null)
  const [compactLists, setCompactLists] = useState<Record<string, boolean>>({})
  const [locationView, setLocationView] = useState<CollectionView>("large")
  const [itemSearch, setItemSearch] = useState("")
  const [itemTypeFilter, setItemTypeFilter] = useState("all")
  const [itemSort, setItemSort] = useState<"name" | "created">("created")
  const [speciesSearch, setSpeciesSearch] = useState("")
  const [speciesTypeFilter, setSpeciesTypeFilter] = useState("all")
  const [speciesSort, setSpeciesSort] = useState<"name" | "created">("created")
  const [languageSearch, setLanguageSearch] = useState("")
  const [languageTypeFilter, setLanguageTypeFilter] = useState("all")
  const [relationshipSearch, setRelationshipSearch] = useState("")
  const [researchSearch, setResearchSearch] = useState("")

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [view, selectedId, selectedLocationId, selectedReligionId, selectedOrganizationId, selectedCultureId, selectedConceptId, selectedHistoryId, selectedItemId, selectedSpeciesId, selectedLanguageId, selectedCombatDoctrineId, selectedGovernmentId, selectedCalendarId, selectedRelationshipId, selectedKnowledgeId, selectedSourceId, selectedSystemId])

  const openCategory = (category: CanonCategory) => {
    setView(category.id as typeof view)
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
  const calendarList = useMemo(() => Object.values(calendars), [calendars])
  const itemList = useMemo(() => Object.values(items), [items])
  const speciesList = useMemo(() => Object.values(species), [species])
  const languageList = useMemo(() => Object.values(languages), [languages])
  const combatDoctrineList = useMemo(() => Object.values(doctrines), [doctrines])
  const governmentList = useMemo(() => Object.values(governments), [governments])
  const relationshipList = useMemo(() => {
    const query = relationshipSearch.trim().toLowerCase()
    return Object.values(relationships).filter((record) => !query || `${record.label} ${record.summary ?? ""} ${record.subject.entityId} ${record.object.entityId}`.toLowerCase().includes(query))
  }, [relationshipSearch, relationships])
  const sourceList = useMemo(() => { const query = researchSearch.trim().toLowerCase(); return Object.values(sources).filter((source) => !query || `${source.title} ${source.creator ?? ""} ${source.tags.join(" ")}`.toLowerCase().includes(query)) }, [researchSearch, sources])
  const knowledgeList = useMemo(() => Object.values(knowledgeRecords), [knowledgeRecords])
  const filteredLanguages = useMemo(() => {
    const query = languageSearch.trim().toLowerCase()
    return languageList
      .filter((language) => languageTypeFilter === "all" || language.type === languageTypeFilter)
      .filter((language) => !query || `${language.name} ${language.summary ?? ""} ${language.endonym ?? ""} ${language.alternateNames ?? ""}`.toLowerCase().includes(query))
  }, [languageList, languageSearch, languageTypeFilter])
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

  if (selectedLanguageId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All languages" onClick={() => setSelectedLanguageId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><LanguageCanonRecord languageId={selectedLanguageId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedCombatDoctrineId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All combat doctrines" onClick={() => setSelectedCombatDoctrineId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><CombatDoctrineCanonRecord doctrineId={selectedCombatDoctrineId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedGovernmentId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All governments" onClick={() => setSelectedGovernmentId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><GovernmentCanonRecord governmentId={selectedGovernmentId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedSystemId) {
    const systemTitle = SYSTEM_LABELS[selectedSystemId.domain].title
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label={`All ${systemTitle.toLowerCase()}`} onClick={() => setSelectedSystemId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><SystemCanonRecord domain={selectedSystemId.domain} recordId={selectedSystemId.id} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedCalendarId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6">
            <BackLink label="All calendars" onClick={() => setSelectedCalendarId(null)} />
          </div>
        </div>
        <main className="flex min-h-0 flex-1 justify-center">
          <CalendarCanonRecord
            calendarId={selectedCalendarId}
            className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30"
          />
        </main>
      </div>
    )
  }

  if (selectedRelationshipId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onSignOut={onSignOut} />
        <div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All relationships" onClick={() => setSelectedRelationshipId(null)} /></div></div>
        <main className="flex min-h-0 flex-1 justify-center"><RelationshipsCanonRecord relationshipId={selectedRelationshipId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main>
      </div>
    )
  }

  if (selectedKnowledgeId) {
    return <div className="flex min-h-screen flex-col"><Header onSignOut={onSignOut} /><div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All character knowledge" onClick={() => setSelectedKnowledgeId(null)} /></div></div><main className="flex min-h-0 flex-1 justify-center"><KnowledgeCanonRecord recordId={selectedKnowledgeId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main></div>
  }

  if (selectedSourceId) {
    return <div className="flex min-h-screen flex-col"><Header onSignOut={onSignOut} /><div className="border-b border-border bg-background/60"><div className="mx-auto w-full max-w-2xl px-4 py-3 sm:px-6"><BackLink label="All research sources" onClick={() => setSelectedSourceId(null)} /></div></div><main className="flex min-h-0 flex-1 justify-center"><ResearchCanonRecord sourceId={selectedSourceId} className="min-h-0 w-full max-w-2xl flex-1 border-x border-border bg-sidebar/30" /></main></div>
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
                      const count = cat.id === "characters" ? characterList.length : cat.id === "relationships" ? relationshipList.length : cat.id === "knowledge" ? knowledgeList.length : cat.id === "research" ? sourceList.length : cat.id === "locations" ? locationList.length : cat.id === "religions" ? religionList.length : cat.id === "concepts" ? conceptList.length : cat.id === "organizations" ? organizationList.length : cat.id === "cultures" ? cultureList.length : cat.id === "languages" ? languageList.length : cat.id === "history" ? historyList.length : cat.id === "calendars" ? calendarList.length : cat.id === "species" ? speciesList.length : cat.id === "items" ? itemList.length : cat.id === "combat" ? combatDoctrineList.length : cat.id === "government" ? governmentList.length : cat.id === "magic" ? Object.keys(systemRecords.magic).length : cat.id === "technology" ? Object.keys(systemRecords.technology).length : cat.id === "economics" ? Object.keys(systemRecords.economics).length : cat.id === "military" ? Object.keys(systemRecords.military).length : 0
                      const thumbnail = resolvePageThumbnail(pageThumbnailStore.getPageThumbnail(cat.id))
                      const iconThumbnail = resolvePageThumbnail(pageThumbnailStore.getPageIcon(cat.id))
                      return (
                        <div key={cat.id} role="button" tabIndex={0} onClick={() => openCategory(cat)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openCategory(cat) } }} className="group relative flex min-h-[150px] flex-col items-start overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]">
                          {thumbnail && <CanonArtwork src={thumbnail} alt="" fill sizes="320px" className="object-cover opacity-20 transition-opacity group-hover:opacity-30" />}
                          <div className="relative z-[1] flex w-full items-center justify-between">
                            <span className="group/icon relative flex size-14 items-center justify-center overflow-hidden rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                              {iconThumbnail ? <CanonArtwork src={iconThumbnail} alt="" width={56} height={56} className="size-full object-cover" /> : <cat.icon className="size-8" />}
                              <CanonImageField
                                value={iconThumbnail}
                                label={`Change ${cat.label} icon`}
                                imageType="icon"
                                placement="corner"
                                coverBranchLabel={cat.label}
                                onChange={(value) => pageThumbnailStore.setPageIcon(cat.id, { source: value ? "uploaded" : "none", value: value || undefined })}
                                onBuiltInChange={(assetId) => pageThumbnailStore.setPageIcon(cat.id, { source: "builtin", value: assetId })}
                                onScopedChange={(value, scope) => pageThumbnailStore.applyIcon(`page:${cat.id}`, value, scope)}
                                onClick={(event) => event.stopPropagation()}
                              />
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary">
                              {`${count} ${count === 1 ? "record" : "records"}`}
                            </span>
                          </div>
                          <h3 className="relative z-[1] mt-3 font-medium tracking-tight text-foreground">{cat.label}</h3>
                          <p className="relative z-[1] mt-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                          <span className="relative z-[1] mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary">Open<ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </>
        ) : view === "research" ? (
          <><BackLink label="Canon Lore" onClick={() => setView("landing")} /><LorePageHero title="Research & Sources" pageId="research" icon={BookOpen} /><section className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p><h1 className="mt-1 font-serif text-3xl font-medium tracking-tight">Research & Sources</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{sourceList.length} reusable {sourceList.length === 1 ? "source" : "sources"} for your canon.</p></div><button onClick={() => setView("research-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"><Plus className="size-4" />Create Source</button></section><div className="mt-5 flex items-center gap-2"><Search className="size-4 text-muted-foreground" /><input className="h-9 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none" placeholder="Search sources, creators, or tags" value={researchSearch} onChange={(event) => setResearchSearch(event.target.value)} /></div><section className="mt-4 space-y-2">{sourceList.map((source) => <button key={source.id} onClick={() => setSelectedSourceId(source.id)} className="flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left hover:border-primary/40"><span><span className="block font-medium">{source.title}</span><span className="mt-1 block text-sm text-muted-foreground">{source.creator ?? source.type} {source.tags.length ? `· ${source.tags.join(", ")}` : ""}</span></span><span className="text-xs text-muted-foreground">{source.status}</span></button>)}{sourceList.length === 0 && <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center"><BookOpen className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm text-muted-foreground">No research sources yet.</p></div>}</section></>
        ) : view === "research-create" ? (
          <><BackLink label="Research & Sources" onClick={() => setView("research")} /><div className="mt-4 rounded-xl border border-border bg-sidebar/30"><ResearchCanonRecord sourceId={null} onCreated={(id) => { setSelectedSourceId(id); setView("research") }} onCancel={() => setView("research")} /></div></>
        ) : view === "knowledge" ? (
          <><BackLink label="Canon Lore" onClick={() => setView("landing")} /><LorePageHero title="Character Knowledge & Awareness" pageId="knowledge" icon={Lock} /><section className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p><h1 className="mt-1 font-serif text-3xl font-medium tracking-tight">Character Knowledge & Awareness</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{knowledgeList.length} character {knowledgeList.length === 1 ? "claim" : "claims"} about the world.</p></div><button onClick={() => setView("knowledge-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"><Plus className="size-4" />Create Awareness</button></section><section className="mt-5 space-y-2">{knowledgeList.map((record) => <button key={record.id} onClick={() => setSelectedKnowledgeId(record.id)} className="flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left hover:border-primary/40"><span><span className="block font-medium">{record.observerId} · {record.subject.entityId}</span><span className="mt-1 block truncate text-sm text-muted-foreground">{record.belief}</span></span><span className="text-xs text-muted-foreground">{record.state}</span></button>)}{knowledgeList.length === 0 && <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center"><Lock className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm text-muted-foreground">No character knowledge records yet.</p></div>}</section></>
        ) : view === "knowledge-create" ? (
          <><BackLink label="Character Knowledge & Awareness" onClick={() => setView("knowledge")} /><div className="mt-4 rounded-xl border border-border bg-sidebar/30"><KnowledgeCanonRecord recordId={null} onCreated={(id) => { setSelectedKnowledgeId(id); setView("knowledge") }} onCancel={() => setView("knowledge")} /></div></>
        ) : view === "relationships" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Relationships & Connections" pageId="relationships" icon={Users} />
            <section className="mt-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p><h1 className="mt-1 font-serif text-3xl font-medium tracking-tight">Relationships & Connections</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{relationshipList.length} visible {relationshipList.length === 1 ? "connection" : "connections"} across your canon.</p></div><button onClick={() => setView("relationship-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="size-4" />Create Relationship</button></section>
            <div className="mt-5 flex items-center gap-2"><Search className="size-4 text-muted-foreground" /><input className="h-9 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary/50" placeholder="Search labels, notes, or entity IDs" value={relationshipSearch} onChange={(event) => setRelationshipSearch(event.target.value)} /></div>
            <section className="mt-4 space-y-2">{relationshipList.map((record) => <button key={record.id} onClick={() => setSelectedRelationshipId(record.id)} className="flex w-full items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40"><span className="min-w-0"><span className="block truncate font-medium">{record.label}</span><span className="mt-1 block truncate text-sm text-muted-foreground">{record.subject.entityId} {record.direction === "directed" ? "→" : "↔"} {record.object.entityId}</span></span><span className="shrink-0 text-xs text-muted-foreground">{record.status}</span></button>)}{relationshipList.length === 0 && <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center"><Link2 className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm text-muted-foreground">No relationships yet. Create the first connection in your canon.</p></div>}</section>
          </>
        ) : view === "relationship-create" ? (
          <><BackLink label="Relationships & Connections" onClick={() => setView("relationships")} /><div className="mt-4 rounded-xl border border-border bg-sidebar/30"><RelationshipsCanonRecord relationshipId={null} onCreated={(id) => { setSelectedRelationshipId(id); setView("relationships") }} onCancel={() => setView("relationships")} /></div></>
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
                    <CanonArtwork
                      src={c.portrait || "/default-canon-image.svg"}
                      alt={`Portrait of ${c.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      onError={(event) => {
                        event.currentTarget.src = "/default-canon-image.svg"
                      }}
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
                      <CanonArtwork
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
                  <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-muted", isCompact("species") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>{record.image ? <CanonArtwork src={record.image} alt={`Image of ${record.name}`} fill sizes={isCompact("species") ? "128px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <ImageOff className={isCompact("species") ? "size-5 text-muted-foreground" : "size-8 text-muted-foreground"} />}<CanonImageField value={record.image ?? ""} label={`Change ${record.name} image`} onChange={(image) => updateSpecies(record.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} /><div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" /></div>
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
                      {item.image ? <CanonArtwork src={item.image} alt={`Image of ${item.name}`} fill sizes={isCompact("items") ? "128px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <ImageOff className={isCompact("items") ? "size-5 text-muted-foreground" : "size-8 text-muted-foreground"} />}
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
                      <CanonArtwork src={r.image} alt={`Symbol for ${r.name}`} fill sizes="320px" className="object-cover" />
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
        ) : view === "calendars" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Calendars & Time" pageId="calendars" icon={Clock3} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Calendars & Time</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {calendarList.length} calendar {calendarList.length === 1 ? "record" : "records"}. Define the authoritative date systems, reforms, and temporal conventions in your world.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView("calendar-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Calendar</button>
                <ViewToggle compact={isCompact("calendars")} onChange={(compact) => setCompact("calendars", compact)} />
              </div>
            </section>

            {calendarList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Clock3 className="size-5" /></span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No calendars yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create the first authoritative calendar to establish the temporal logic of your world.</p>
                <button onClick={() => setView("calendar-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Calendar</button>
              </section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("calendars") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {calendarList.map((calendar) => (
                  <article key={calendar.id} onClick={() => setSelectedCalendarId(calendar.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("calendars") ? "flex flex-row" : "flex flex-col")}>
                    <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("calendars") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>
                      {calendar.image ? <CanonArtwork src={calendar.image} alt={`Artwork for ${calendar.name}`} fill sizes="320px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <Clock3 className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />}
                      <CanonImageField value={calendar.image ?? ""} label={`Change ${calendar.name} image`} onChange={(image) => updateCalendar(calendar.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{calendar.name}</h3>
                      {calendar.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{calendar.summary}</p>}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"><Clock3 className="size-3" />{calendar.type}</span>
                        <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{calendar.status}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        ) : view === "calendar-create" ? (
          <>
            <BackLink label="Calendars & Time" onClick={() => setView("calendars")} />
            <CalendarCreateForm onCancel={() => setView("calendars")} onCreated={(id) => { setView("calendars"); setSelectedCalendarId(id) }} />
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
                        <CanonArtwork src={culture.image} alt={`Symbol for ${culture.name}`} fill sizes="320px" className="object-cover" />
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
        ) : view === "languages" ? (
          /* ---------------------------- LANGUAGES INDEX ---------------------------- */
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Languages" pageId="languages" icon={ScrollText} />

            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Languages</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {languageList.length} canon {languageList.length === 1 ? "record" : "records"}. Each language record is the authoritative source for its history, structure, usage, and examples.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView("language-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Language</button>
                <ViewToggle compact={isCompact("languages")} onChange={(compact) => setCompact("languages", compact)} />
              </div>
            </section>

            <section className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
              <label className="relative min-w-52 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">Search languages</span><input id="language-search" value={languageSearch} onChange={(event) => setLanguageSearch(event.target.value)} placeholder="Search languages" className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20" /></label>
              <select aria-label="Filter languages by type" value={languageTypeFilter} onChange={(event) => setLanguageTypeFilter(event.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/50"><option value="all">All types</option><option value="natural">Natural Language</option><option value="constructed">Constructed Language</option><option value="sign">Sign Language</option><option value="historical">Historical or Reconstructed</option></select>
            </section>

            {languageList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><ScrollText className="size-5" /></span><h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No languages yet</h2><p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create a language record to establish the authoritative source for its identity, structure, history, and use.</p><button onClick={() => setView("language-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Language</button></section>
            ) : filteredLanguages.length === 0 ? (
              <section className="mt-6 rounded-xl border border-dashed border-border bg-card/50 px-6 py-10 text-center"><p className="text-sm text-muted-foreground">No languages match the current search or type filter.</p></section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("languages") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {filteredLanguages.map((language) => (
                  <article key={language.id} onClick={() => setSelectedLanguageId(language.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("languages") ? "flex flex-row" : "flex flex-col")}>
                    <div className={cn("relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("languages") ? "aspect-[4/3] w-32 shrink-0" : "aspect-[4/3] w-full")}>
                      {language.image ? <CanonArtwork src={language.image} alt={`Symbol for ${language.name}`} fill sizes="320px" className="object-cover" /> : <ScrollText className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />}
                      <CanonImageField value={language.image ?? ""} label={`Change ${language.name} image`} onChange={(image) => updateLanguage(language.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-4"><h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{language.name}</h3>{language.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{language.summary}</p>}<div className="mt-3 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"><ScrollText className="size-3" />{languageTypeLabel(language.type)}</span><span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{languageStatusLabel(language.status)}</span></div></div>
                  </article>
                ))}
              </section>
            )}
          </>
        ) : view === "language-create" ? (
          <>
            <BackLink label="Languages" onClick={() => setView("languages")} />
            <LanguageCreateForm onCancel={() => setView("languages")} onCreated={(id) => { setView("languages"); setSelectedLanguageId(id) }} />
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
                        <CanonArtwork src={o.image} alt={`Symbol for ${o.name}`} fill sizes="320px" className="object-cover" />
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
        ) : view === "government" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Government & Politics" pageId="government" icon={Landmark} />
            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Government & Politics</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">{governmentList.length} canon {governmentList.length === 1 ? "record" : "records"}. Each record is the authoritative source for a political system's institutions, laws, and distribution of power.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2"><button onClick={() => setView("government-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Government</button><ViewToggle compact={isCompact("government")} onChange={(compact) => setCompact("government", compact)} /></div>
            </section>
            {governmentList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"><span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Landmark className="size-5" /></span><h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No governments yet</h2><p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create a government record to establish the authoritative source for a political system.</p><button onClick={() => setView("government-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Government</button></section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("government") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {governmentList.map((government) => <article key={government.id} onClick={() => setSelectedGovernmentId(government.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("government") ? "flex flex-row" : "flex flex-col")}><div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("government") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>{government.image ? <CanonArtwork src={government.image} alt={`Artwork for ${government.name}`} fill sizes="320px" className="object-cover" /> : <Landmark className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />}<CanonImageField value={government.image ?? ""} label={`Change ${government.name} image`} onChange={(image) => updateGovernment(government.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} /><div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" /></div><div className="flex min-w-0 flex-1 flex-col p-4"><h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{government.name}</h3>{government.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{government.summary}</p>}<div className="mt-3 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"><Landmark className="size-3" />{governmentFormLabel(government.form)}</span><span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{governmentStatusLabel(government.status)}</span></div></div></article>)}
              </section>
            )}
          </>
        ) : view === "government-create" ? (
          <>
            <BackLink label="Government & Politics" onClick={() => setView("government")} />
            <GovernmentCreateForm onCancel={() => setView("government")} onCreated={(id) => { setView("government"); setSelectedGovernmentId(id) }} />
          </>
        ) : view === "combat" ? (
          <>
            <BackLink label="Canon Lore" onClick={() => setView("landing")} />
            <LorePageHero title="Combat Doctrine" pageId="combat" icon={Rows3} />
            <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
                <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">Combat Doctrine</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">{combatDoctrineList.length} combat {combatDoctrineList.length === 1 ? "doctrine" : "doctrines"}. Store the principles, practices, training, and cultural expression that shape conflict.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setView("combat-create")} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"><Plus className="size-4" />Create Doctrine</button>
                <ViewToggle compact={isCompact("combat")} onChange={(compact) => setCompact("combat", compact)} />
              </div>
            </section>
            {combatDoctrineList.length === 0 ? (
              <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><Rows3 className="size-5" /></span>
                <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No combat doctrines yet</h2>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">Create a doctrine to document how a fighting style or combat system works in your world.</p>
                <button onClick={() => setView("combat-create")} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"><Plus className="size-4" />Create Doctrine</button>
              </section>
            ) : (
              <section className={cn("mt-6 grid gap-4", isCompact("combat") ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
                {combatDoctrineList.map((doctrine) => (
                  <article key={doctrine.id} onClick={() => setSelectedCombatDoctrineId(doctrine.id)} className={cn("group overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all hover:border-primary/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99]", isCompact("combat") ? "flex flex-row" : "flex flex-col")}>
                    <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-muted to-card", isCompact("combat") ? "aspect-[4/3] w-32" : "aspect-[4/3] w-full")}>
                      {doctrine.image ? <CanonArtwork src={doctrine.image} alt={`Artwork for ${doctrine.name}`} fill sizes="320px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /> : <Rows3 className="size-10 text-primary/50 transition-transform duration-300 group-hover:scale-[1.06]" />}
                      <CanonImageField value={doctrine.image ?? ""} label={`Change ${doctrine.name} image`} onChange={(image) => updateCombatDoctrine(doctrine.id, { image: image || undefined })} onClick={(event) => event.stopPropagation()} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col p-4"><h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">{doctrine.name}</h3>{doctrine.summary && <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{doctrine.summary}</p>}<div className="mt-3 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-primary"><Rows3 className="size-3" />{combatDoctrineTypeLabel(doctrine.type)}</span>{doctrine.status && <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">{doctrine.status}</span>}</div></div>
                  </article>
                ))}
              </section>
            )}
          </>
        ) : view === "combat-create" ? (
          <>
            <BackLink label="Combat Doctrine" onClick={() => setView("combat")} />
            <CombatDoctrineCreateForm onCancel={() => setView("combat")} onCreated={(id) => { setView("combat"); setSelectedCombatDoctrineId(id) }} />
          </>
        ) : view === "magic" ? (
          <SystemIndex domain="magic" records={systemRecords.magic} compact={isCompact("magic")} onCompactChange={(compact) => setCompact("magic", compact)} onSelect={(id) => setSelectedSystemId({ domain: "magic", id })} onCreate={() => setView("magic-create")} onBack={() => setView("landing")} onImageChange={(id, image) => updateSystemRecord("magic", id, { image: image || undefined })} />
        ) : view === "magic-create" ? (
          <><BackLink label="Magic" onClick={() => setView("magic")} /><SystemCanonRecord domain="magic" recordId={null} onCancel={() => setView("magic")} onCreated={(id) => { setView("magic"); setSelectedSystemId({ domain: "magic", id }) }} /></>
        ) : view === "technology" ? (
          <SystemIndex domain="technology" records={systemRecords.technology} compact={isCompact("technology")} onCompactChange={(compact) => setCompact("technology", compact)} onSelect={(id) => setSelectedSystemId({ domain: "technology", id })} onCreate={() => setView("technology-create")} onBack={() => setView("landing")} onImageChange={(id, image) => updateSystemRecord("technology", id, { image: image || undefined })} />
        ) : view === "technology-create" ? (
          <><BackLink label="Technology" onClick={() => setView("technology")} /><SystemCanonRecord domain="technology" recordId={null} onCancel={() => setView("technology")} onCreated={(id) => { setView("technology"); setSelectedSystemId({ domain: "technology", id }) }} /></>
        ) : view === "economics" ? (
          <SystemIndex domain="economics" records={systemRecords.economics} compact={isCompact("economics")} onCompactChange={(compact) => setCompact("economics", compact)} onSelect={(id) => setSelectedSystemId({ domain: "economics", id })} onCreate={() => setView("economics-create")} onBack={() => setView("landing")} onImageChange={(id, image) => updateSystemRecord("economics", id, { image: image || undefined })} />
        ) : view === "economics-create" ? (
          <><BackLink label="Economics & Resources" onClick={() => setView("economics")} /><SystemCanonRecord domain="economics" recordId={null} onCancel={() => setView("economics")} onCreated={(id) => { setView("economics"); setSelectedSystemId({ domain: "economics", id }) }} /></>
        ) : view === "military" ? (
          <SystemIndex domain="military" records={systemRecords.military} compact={isCompact("military")} onCompactChange={(compact) => setCompact("military", compact)} onSelect={(id) => setSelectedSystemId({ domain: "military", id })} onCreate={() => setView("military-create")} onBack={() => setView("landing")} onImageChange={(id, image) => updateSystemRecord("military", id, { image: image || undefined })} />
        ) : view === "military-create" ? (
          <><BackLink label="Military Forces" onClick={() => setView("military")} /><SystemCanonRecord domain="military" recordId={null} onCancel={() => setView("military")} onCreated={(id) => { setView("military"); setSelectedSystemId({ domain: "military", id }) }} /></>
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
                        <CanonArtwork
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
