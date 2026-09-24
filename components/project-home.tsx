"use client"

import { useEffect, useRef, useState } from "react"
import { readProjectData, useProjectStore, writeProjectData } from "@/lib/project-store"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Activity,
  Brain,
  Crown,
  Landmark,
  MapPinned,
  PenLine,
  Sparkles,
  Timer,
  Upload,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import { Wordmark } from "@/components/logo"
import { type Project } from "@/lib/mock-data"
import { ProjectHomeHub } from "@/components/project-home/project-home-hub"
import { useCharacterCanon } from "@/lib/character-canon"
import { useLocationCanon } from "@/lib/location-canon"
import { useOrganizationCanon } from "@/lib/organization-canon"
import { useSpeciesCanon } from "@/lib/species-canon"
import { useReligionCanon } from "@/lib/religion-canon"
import { useConceptCanon } from "@/lib/concept-canon"
import { useCultureCanon } from "@/lib/culture-canon"
import { useHistoryCanon } from "@/lib/history-canon"
import { CanonArtwork } from "@/components/world/canon-artwork"
import { cn } from "@/lib/utils"

export type ProjectSection =
  | "Writing Studio"
  | "Writing Profile"
  | "Map"
  | "Heraldry"
  | "Character"
  | "Family Tree"
  | "Book Cover"
  | "Brainstorming"
  | "Canon Lore"

type StudioTab = "writing" | "creation" | "world"

type StudioItem = {
  section: ProjectSection
  title: string
  description: string
  icon: LucideIcon
  badge?: string
}

const tabs: { id: StudioTab; label: string; icon: LucideIcon; items: StudioItem[] }[] = []

const DEFAULT_COVER_IMAGE = "/icon.svg"
const DEFAULT_BACKGROUND_IMAGE = "/background%20%26%20cover%20assets/BGT_Blue.JPG"
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

type HubItem = {
  id: string
  name: string
  type: string
  summary?: string
  image?: string
  target: ProjectSection
  timestamp?: number
}

function recordItems(records: Record<string, { id: string; name: string; summary?: string; image?: string; createdAt?: number; updatedAt?: number }>, type: string, target: ProjectSection): HubItem[] {
  return Object.values(records).map((record) => ({ id: record.id, name: record.name, type, summary: record.summary, image: record.image, target, timestamp: record.updatedAt ?? record.createdAt }))
}

function HubArtwork({ item, className }: { item: HubItem; className?: string }) {
  return item.image ? <CanonArtwork src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 420px" className={cn("object-cover", className)} /> : <div className={cn("absolute inset-0 bg-[#18242d]", className)} />
}

function CompactImageUpload({ label, onUpload }: { label: string; onUpload: (value: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  function handleUpload(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.")
      return
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Images must be 5 MB or smaller.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setError("")
        onUpload(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <span className="group absolute right-3 top-3 z-20">
      <button
        type="button"
        aria-label={label}
        title={label}
        onClick={() => inputRef.current?.click()}
        className="flex size-8 items-center justify-center rounded-md border border-white/20 bg-black/45 text-white/75 opacity-0 shadow-sm backdrop-blur-md transition-opacity hover:bg-black/70 hover:text-white group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Upload className="size-3.5" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          handleUpload(event.target.files?.[0])
          event.target.value = ""
        }}
      />
      {error && <span className="absolute right-0 top-10 w-44 rounded-md bg-background/95 px-2 py-1.5 text-right text-[11px] text-destructive shadow-lg">{error}</span>}
    </span>
  )
}

export function ProjectHome({
  project,
  onOpenSection,
  onBack,
  onSignOut,
}: {
  project: Project
  onOpenSection: (section: ProjectSection) => void
  onBack: () => void
  onSignOut: () => void
}) {
  const [activeTab, setActiveTab] = useState<StudioTab>("writing")
  const [coverImage, setCoverImage] = useState(DEFAULT_COVER_IMAGE)
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BACKGROUND_IMAGE)
  const [imagesHydrated, setImagesHydrated] = useState(false)
  const { characters } = useCharacterCanon()
  const { locations } = useLocationCanon()
  const { organizations } = useOrganizationCanon()
  const { species } = useSpeciesCanon()
  const { religions } = useReligionCanon()
  const { concepts } = useConceptCanon()
  const { cultures } = useCultureCanon()
  const { histories } = useHistoryCanon()

  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? project.id

  useEffect(() => {
    let cancelled = false
    readProjectData<{ cover?: string; background?: string }>(projectId, "project-home-images")
      .then((saved) => {
        if (cancelled) return
        if (saved?.cover) setCoverImage(saved.cover)
        if (saved?.background) setBackgroundImage(saved.background)
        setImagesHydrated(true)
      })
      .catch(() => {
        if (!cancelled) setImagesHydrated(true)
      })

    return () => {
      cancelled = true
    }
  }, [projectId])

  useEffect(() => {
    if (!imagesHydrated) return
    void writeProjectData(projectId, "project-home-images", { cover: coverImage, background: backgroundImage })
  }, [backgroundImage, coverImage, imagesHydrated, projectId])

  const activeItems = tabs.find((t) => t.id === "writing")?.items ?? []
  const characterItems: HubItem[] = Object.values(characters).map((character) => ({ id: character.id, name: character.name, type: "Character", summary: character.role || character.title || character.bio, image: character.portrait, target: "Character" }))
  const locationItems = recordItems(locations, "Location", "Map")
  const organizationItems = recordItems(organizations, "Faction", "Canon Lore")
  const speciesItems = recordItems(species, "Species", "Canon Lore")
  const religionItems = recordItems(religions, "Religion", "Canon Lore")
  const conceptItems = recordItems(concepts, "Concept", "Canon Lore")
  const cultureItems = recordItems(cultures, "Culture", "Canon Lore")
  const historyItems = Object.values(histories).map((record) => ({ id: record.id, name: record.name, type: record.type === "era" ? "Era" : "History", summary: record.summary, image: record.image, target: "Canon Lore" as ProjectSection }))
  const worldItems = [...characterItems, ...locationItems, ...organizationItems, ...speciesItems, ...religionItems, ...conceptItems, ...cultureItems, ...historyItems]
  const featureItems = worldItems
  const [featureIndex] = useState(0)
  const featureItem = featureItems[featureIndex % Math.max(1, featureItems.length)]
  const featureLabel = "Archive highlight"
  const snapshot = [
    { label: "Characters", value: characterItems.length, icon: UsersRound, target: "Character" as ProjectSection },
    { label: "Locations", value: locationItems.length, icon: MapPinned, target: "Map" as ProjectSection },
    { label: "Factions", value: organizationItems.length, icon: Landmark, target: "Canon Lore" as ProjectSection },
    { label: "Species", value: speciesItems.length, icon: Sparkles, target: "Canon Lore" as ProjectSection },
    { label: "Beliefs", value: religionItems.length, icon: Crown, target: "Canon Lore" as ProjectSection },
    { label: "Concepts", value: conceptItems.length, icon: Brain, target: "Canon Lore" as ProjectSection },
  ]
  const activityValues = snapshot.map((item) => item.value)
  const activityMax = Math.max(...activityValues, 1)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </button>

        {/* Book cover + title */}
        <section className="relative isolate mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111315] shadow-2xl shadow-black/40">
          <Image
            src={backgroundImage}
            alt="Rain falling over a dark landscape"
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover object-center opacity-70"
            priority
          />
          <CompactImageUpload label="Upload background image" onUpload={setBackgroundImage} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,12,.98)_0%,rgba(8,10,12,.82)_38%,rgba(8,10,12,.32)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(124,196,215,.18),transparent_32%),linear-gradient(180deg,transparent_55%,rgba(8,10,12,.78))]" />

          <div className="relative grid min-h-[620px] items-center gap-10 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[minmax(280px,390px)_1fr] lg:gap-16 lg:px-20">
            <div className="relative mx-auto w-full max-w-[340px] rotate-[-2deg] transition-transform duration-500 hover:rotate-0 sm:max-w-[390px]">
              <div className="absolute -inset-5 rounded-[1.75rem] bg-sky-200/10 blur-2xl" />
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/20 bg-black shadow-2xl shadow-black/70 ring-1 ring-black/30">
                <Image
                  src={coverImage}
                  alt={`Cover art for ${project.name}`}
                  fill
                  sizes="(max-width: 640px) 80vw, 390px"
                  className="object-cover"
                  priority
                />
                <CompactImageUpload label="Upload book cover image" onUpload={setCoverImage} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">World-Engine study</p>
                  <p className="mt-2 font-serif text-3xl leading-none tracking-tight sm:text-4xl">Untitled project</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/60">world &middot; story &middot; possibility</p>
                </div>
              </div>
            </div>

            <div className="max-w-xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-200/80">Project Home</p>
              <h1 className="mt-4 max-w-2xl font-serif text-5xl font-medium leading-[.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {project.name}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 text-pretty sm:text-lg">
                {project.description}
              </p>

              <button
                onClick={() => onOpenSection("Writing Studio")}
                className="group mt-8 flex w-full max-w-md items-center gap-4 rounded-xl border border-white/15 bg-black/30 p-4 text-left backdrop-blur-md transition-all hover:border-sky-200/50 hover:bg-black/45 sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky-200/15 text-sky-100 ring-1 ring-inset ring-sky-100/20">
                  <PenLine className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-white/55">Pick up where you left off</span>
                  <span className="mt-0.5 block truncate font-medium tracking-tight text-white">Chapter One &middot; 2nd Draft</span>
                  <span className="mt-0.5 block truncate text-xs text-white/50">Line Editor &middot; edited {project.lastEdited}</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-sky-100">
                  <span className="hidden sm:inline">Resume</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </div>
        </section>

        <ProjectHomeHub onOpenSection={onOpenSection} />

        <div className="hidden">
        {/* Legacy lower surface retained temporarily as a non-rendering migration reference. */}
        {/* Living visual wall */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">World engine / archive wall</p><h2 className="mt-1 font-serif text-4xl font-medium tracking-tight text-foreground">Everything taking shape</h2></div>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:block">{worldItems.length} fragments</span>
          </div>
          <div className="grid auto-rows-[118px] grid-cols-2 gap-3 sm:grid-cols-4 lg:auto-rows-[132px]">
            <button onClick={() => onOpenSection(featureItem?.target ?? "Canon Lore")} className="group relative col-span-2 row-span-3 overflow-hidden rounded-[1.5rem] border border-border bg-card text-left sm:col-span-2">
              {featureItem ? <HubArtwork item={featureItem} className="opacity-85 transition-transform duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 bg-[#101b22]" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061016] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6"><p className="text-[10px] uppercase tracking-[0.24em] text-sky-200">{featureLabel}</p><p className="mt-2 font-serif text-3xl text-white">{featureItem?.name ?? "The first fragment"}</p><p className="mt-1 text-sm text-white/55">{featureItem?.type ?? "Canon"} / open record <ArrowUpRight className="ml-1 inline size-3.5" /></p></div>
            </button>
            {characterItems.slice(0, 2).map((item, index) => <button key={item.id} onClick={() => onOpenSection(item.target)} className="group relative col-span-1 row-span-2 overflow-hidden rounded-[1.5rem] border border-border bg-card text-left"><HubArtwork item={item} className="object-top opacity-85 transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#071016] via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-4"><p className="text-[9px] uppercase tracking-[0.22em] text-primary">Character {String(index + 1).padStart(2, "0")}</p><p className="mt-1 truncate font-serif text-xl text-white">{item.name}</p></div></button>)}
            <button onClick={() => onOpenSection("Heraldry")} className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-emerald-200/15 bg-[#0c1919] text-left transition-colors hover:border-emerald-200/40">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 50% 42%, rgba(110,231,183,.28), transparent 13%), linear-gradient(135deg, transparent 49%, rgba(110,231,183,.08) 50%, transparent 51%), linear-gradient(45deg, transparent 49%, rgba(125,211,252,.08) 50%, transparent 51%)", backgroundSize: "100% 100%, 54px 54px, 54px 54px" }} />
              <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border border-emerald-200/50 bg-[#102523]/80 shadow-[0_0_50px_rgba(110,231,183,.18)]"><Crown className="size-10 -rotate-45 text-emerald-200/80" /></div>
              <div className="absolute inset-x-0 bottom-0 p-5"><p className="text-[9px] uppercase tracking-[0.22em] text-emerald-200">Visual language</p><p className="mt-1 font-serif text-2xl text-white">Heraldry & symbols</p></div>
            </button>
            <button onClick={() => onOpenSection("Map")} className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-sky-200/15 bg-[#0a1720] text-left">
              <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(125,211,252,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,rgba(125,211,252,.28),transparent_18%),radial-gradient(ellipse_at_22%_70%,rgba(52,211,153,.24),transparent_14%)]" /><div className="absolute left-[57%] top-[38%] size-3 rounded-full bg-white shadow-[0_0_22px_8px_rgba(125,211,252,.35)]" /><div className="absolute left-[22%] top-[66%] size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_5px_rgba(110,231,183,.3)]" />
              <div className="absolute inset-x-0 bottom-0 p-5"><p className="text-[9px] uppercase tracking-[0.22em] text-sky-200">World space</p><p className="mt-1 font-serif text-2xl text-white">Atlas / territories / routes</p></div>
            </button>
            {locationItems.slice(0, 2).map((item) => <button key={item.id} onClick={() => onOpenSection(item.target)} className="group relative col-span-1 row-span-2 overflow-hidden rounded-[1.5rem] border border-border bg-card text-left"><HubArtwork item={item} className="opacity-75 transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#071016] to-transparent" /><div className="absolute inset-x-0 bottom-0 p-4"><p className="text-[9px] uppercase tracking-[0.22em] text-primary">Location</p><p className="mt-1 truncate font-serif text-xl text-white">{item.name}</p></div></button>)}
            <button onClick={() => onOpenSection("Canon Lore")} className="group relative col-span-2 row-span-1 flex items-center gap-4 overflow-hidden rounded-[1.5rem] border border-border bg-card px-5 text-left"><div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary"><Brain className="size-5" /></div><span className="min-w-0"><span className="block text-[9px] uppercase tracking-[0.22em] text-primary">Canon constellation</span><span className="mt-1 block truncate font-serif text-xl text-foreground">{conceptItems.length + religionItems.length} ideas with a home</span></span><ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
          </div>
        </section>

        {/* Project overview */}
        <section className="mt-12 hidden">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Project overview</p>
              <h2 className="mt-1 font-serif text-3xl font-medium tracking-tight text-foreground">The world so far</h2>
            </div>
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"><Timer className="size-3.5" /> Updated {project.lastEdited}</span>
          </div>

          {featureItem ? (
            <div className="grid gap-3 lg:grid-cols-[1.15fr_.85fr] lg:grid-rows-[260px_220px]">
              <button onClick={() => onOpenSection(featureItem.target)} className="group relative min-h-[380px] overflow-hidden rounded-[1.35rem] border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 lg:row-span-2">
                <HubArtwork item={featureItem} className="opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071016] via-[#071016]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200"><Activity className="size-3.5" /> {featureLabel}</div>
                  <h3 className="mt-2 max-w-xl font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">{featureItem.name}</h3>
                  <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/65">{featureItem.summary || `A ${featureItem.type.toLowerCase()} in the ${project.name} canon.`}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-sky-200">Open {featureItem.type} <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </div>
                {featureItems.length > 1 && <div className="absolute right-5 top-5 flex gap-1.5">{featureItems.slice(0, Math.min(featureItems.length, 5)).map((item, index) => <span key={`${item.id}-${index}`} className={cn("size-1.5 rounded-full", index === featureIndex % featureItems.length ? "bg-sky-200" : "bg-white/35")} />)}</div>}
              </button>

              <div className="grid grid-cols-2 gap-3">
                {[...locationItems.slice(0, 1), ...characterItems.slice(0, 1)].map((item) => (
                  <button key={item.id} onClick={() => onOpenSection(item.target)} className="group relative min-h-[210px] overflow-hidden rounded-[1.35rem] border border-border bg-card text-left transition-all hover:border-primary/50">
                    <HubArtwork item={item} className="opacity-65 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071016] via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-primary">{item.type}</p><p className="mt-1 truncate font-serif text-xl text-white">{item.name}</p></div>
                  </button>
                ))}
              </div>
              <button onClick={() => onOpenSection("Map")} className="group relative min-h-[210px] overflow-hidden rounded-[1.35rem] border border-sky-200/15 bg-[#0b1720] text-left transition-all hover:border-sky-200/45">
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(rgba(125,211,252,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.09) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(52,211,153,.36),transparent_7%),radial-gradient(circle_at_72%_62%,rgba(125,211,252,.34),transparent_9%),radial-gradient(circle_at_48%_45%,rgba(125,211,252,.16),transparent_30%)]" />
                <div className="absolute left-[24%] top-[28%] size-2 rounded-full bg-emerald-300 shadow-[0_0_18px_6px_rgba(110,231,183,.35)]" />
                <div className="absolute left-[70%] top-[60%] size-2 rounded-full bg-sky-200 shadow-[0_0_18px_6px_rgba(125,211,252,.35)]" />
                <div className="absolute left-[45%] top-[48%] size-1.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,.35)]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071016] to-transparent p-5"><p className="text-[10px] uppercase tracking-[0.22em] text-sky-200">Atlas view</p><p className="mt-1 font-serif text-2xl text-white">The known world</p><span className="mt-2 inline-flex items-center gap-1 text-xs text-white/55">Open map <ArrowUpRight className="size-3" /></span></div>
              </button>
            </div>
          ) : <div className="border-b border-dashed border-border py-10 text-sm text-muted-foreground">Your world is ready for its first canon record.</div>}

          <div className="mt-3 grid gap-3 lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-border bg-card px-5 py-6">
              <div className="absolute -right-12 -top-12 size-36 rounded-full border border-primary/20" /><div className="absolute -right-7 -top-7 size-26 rounded-full border border-primary/10" />
              <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">World snapshot</p><Landmark className="size-4 text-muted-foreground" /></div>
              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                {snapshot.map((item) => <button key={item.label} onClick={() => onOpenSection(item.target)} className="group flex items-center justify-between border-b border-border/60 pb-2 text-left"><span className="flex items-center gap-2 text-xs text-muted-foreground"><item.icon className="size-3.5 text-primary/70" />{item.label}</span><span className="font-serif text-xl text-foreground transition-colors group-hover:text-primary">{item.value}</span></button>)}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.35rem] border border-border bg-card px-5 py-6 lg:pl-7">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Project pulse</p><p className="mt-1 text-sm text-muted-foreground">Where the world is most developed.</p></div><Activity className="size-4 text-primary" /></div>
              <div className="relative mt-5 flex h-20 items-end gap-2 border-b border-border pb-4">{snapshot.map((item) => <span key={item.label} title={`${item.label}: ${item.value}`} className="min-w-0 flex-1 rounded-t-sm bg-gradient-to-t from-primary/25 to-sky-200/60 transition-colors hover:from-primary hover:to-white" style={{ height: `${Math.max(8, (item.value / activityMax) * 100)}%` }} />)}</div>
              <div className="mt-3 flex justify-between text-[11px] text-muted-foreground"><span>{worldItems.length} canon records across {snapshot.filter((item) => item.value > 0).length} domains</span><span>Writing: {project.wordCount.toLocaleString()} words</span></div>
            </div>
          </div>

          {historyItems.length > 0 && <button onClick={() => onOpenSection("Canon Lore")} className="group relative mt-3 flex min-h-[116px] w-full items-center gap-5 overflow-hidden rounded-[1.35rem] border border-border bg-[#0c151b] px-5 py-5 text-left transition-colors hover:border-primary/50"><div className="absolute inset-y-0 left-0 w-1/2 opacity-35" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 48px, rgba(125,211,252,.18) 49px), linear-gradient(180deg, transparent, rgba(52,211,153,.22))" }} /><span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/30 text-primary"><Timer className="size-4" /></span><span className="relative min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Timeline preview</span><span className="mt-1 block truncate font-serif text-xl text-white">{historyItems[0].name}</span><span className="mt-1 block truncate text-xs text-white/50">{historyItems.length} recorded eras and events in your history canon</span></span><ArrowUpRight className="relative size-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" /></button>}
        </section>

        {/* Continue building */}
        <section className="mt-12">
          <div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Continue building</p><h2 className="mt-1 font-serif text-3xl font-medium tracking-tight text-foreground">Choose a thread to pull</h2></div>
          <div
            role="tablist"
            aria-label="Studios"
            className="grid gap-2 sm:grid-cols-3"
          >
            {tabs.map((tab) => {
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group relative flex min-h-20 flex-1 shrink-0 items-end justify-between overflow-hidden rounded-[1.25rem] border px-4 py-4 text-left text-sm font-medium transition-all",
                    selected
                      ? "border-primary/50 bg-gradient-to-br from-primary/25 via-card to-card text-foreground shadow-lg shadow-primary/5"
                      : "border-border bg-card/45 text-muted-foreground hover:border-primary/35 hover:bg-card hover:text-foreground",
                  )}
                >
                  <span className="relative z-[1] flex items-center gap-2"><tab.icon className="size-4" /><span>{tab.label}</span></span>
                  <span className="absolute -bottom-5 -right-2 font-serif text-7xl leading-none text-primary/10 transition-transform group-hover:scale-110">{tab.id === "writing" ? "W" : tab.id === "creation" ? "C" : "Ø"}</span>
                  {selected && <span className="absolute inset-x-4 bottom-0 h-0.5 bg-primary" />}
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {activeItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => onOpenSection(item.section)}
                className="group relative flex min-h-[190px] flex-col items-start overflow-hidden rounded-[1.25rem] border border-border bg-card/40 p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/45 hover:bg-card hover:shadow-xl hover:shadow-black/20 active:scale-[0.99]"
              >
                <span className="absolute -right-8 -top-10 size-32 rounded-full border border-primary/10 bg-primary/5 transition-transform duration-500 group-hover:scale-125" />
                <div className="flex w-full items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <item.icon className="size-5" />
                  </span>
                  <span className="font-serif text-2xl text-muted-foreground/30">0{index + 1}</span>
                </div>
                <div className="mt-5 flex w-full items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{item.badge ?? "Module"}</p>
                    <h3 className="mt-1 font-medium tracking-tight text-foreground">{item.title}</h3>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  )
}
