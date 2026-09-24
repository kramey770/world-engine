"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { readProjectData, writeProjectData } from "@/lib/project-store"
import {
  ArrowLeft,
  BookImage,
  Check,
  ChevronDown,
  Download,
  Edit3,
  FolderOpen,
  Grid2X2,
  Layers3,
  Plus,
  Save,
  Sparkles,
  WandSparkles,
} from "lucide-react"
import { UserMenu } from "@/components/user-menu"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type CoverDraft = {
  id: string
  title: string
  subtitle: string
  style: string
  image: string
  updatedAt: string
}

const DEFAULT_IMAGE = "/background%20%26%20cover%20assets/BGT_DarkRed.JPG"
const IMAGE_OPTIONS = [
  { label: "Crimson dusk", value: "/background%20%26%20cover%20assets/BGT_DarkRed.JPG" },
  { label: "Cold metal", value: "/background%20%26%20cover%20assets/BGT_MetalGray.JPG" },
  { label: "Emerald stone", value: "/background%20%26%20cover%20assets/BGT_StoneEmerald.JPG" },
  { label: "Ink and rain", value: "/background%20%26%20cover%20assets/BGI_Rain.JPG" },
]

const INITIAL_DRAFTS: CoverDraft[] = [
  {
    id: "cover-default",
    title: "Untitled cover",
    subtitle: "A new story begins here",
    style: "Cinematic realism",
    image: DEFAULT_IMAGE,
    updatedAt: "Ready to shape",
  },
]

function CoverPreview({ draft }: { draft: CoverDraft }) {
  return (
    <div className="relative mx-auto aspect-[2/3] w-full max-w-[330px] overflow-hidden rounded-sm border border-white/20 bg-black shadow-2xl shadow-black/50 ring-1 ring-black/30">
      <Image src={draft.image} alt="" fill sizes="330px" className="object-cover" priority />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,7,.16),rgba(3,5,7,.06)_42%,rgba(3,5,7,.9))]" />
      <div className="absolute inset-x-0 top-0 flex justify-center pt-7 text-[8px] font-semibold uppercase tracking-[0.35em] text-white/70">
        World-Engine Press
      </div>
      <div className="absolute inset-x-7 bottom-8 text-center text-white sm:inset-x-9">
        <p className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-[.86] tracking-[-.04em] text-balance">{draft.title}</p>
        <div className="mx-auto my-5 h-px w-10 bg-white/55" />
        <p className="text-[9px] uppercase tracking-[0.19em] text-white/65 text-balance">{draft.subtitle}</p>
      </div>
    </div>
  )
}

export function BookCoverStudio({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const [drafts, setDrafts] = useState<CoverDraft[]>(INITIAL_DRAFTS)
  const [activeId, setActiveId] = useState(INITIAL_DRAFTS[0].id)
  const [title, setTitle] = useState(INITIAL_DRAFTS[0].title)
  const [subtitle, setSubtitle] = useState(INITIAL_DRAFTS[0].subtitle)
  const [style, setStyle] = useState(INITIAL_DRAFTS[0].style)
  const [image, setImage] = useState(INITIAL_DRAFTS[0].image)
  const [prompt, setPrompt] = useState("A lone figure standing beneath a red eclipse, monumental and quiet")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cancelled = false
    readProjectData<CoverDraft[]>(project.id, "cover-drafts")
      .then((stored) => {
        if (cancelled) return
        if (stored && stored.length > 0) {
          setDrafts(stored)
          setActiveId(stored[0].id)
          setTitle(stored[0].title)
          setSubtitle(stored[0].subtitle)
          setStyle(stored[0].style)
          setImage(stored[0].image)
        }
      })
      .catch(() => {
        if (!cancelled) setDrafts(INITIAL_DRAFTS)
      })

    return () => {
      cancelled = true
    }
  }, [project.id])

  const activeDraft = { id: activeId, title, subtitle, style, image, updatedAt: "Unsaved changes" }

  function openDraft(draft: CoverDraft) {
    setActiveId(draft.id)
    setTitle(draft.title)
    setSubtitle(draft.subtitle)
    setStyle(draft.style)
    setImage(draft.image)
    setSaved(false)
  }

  function startNew() {
    const id = `cover-${Date.now()}`
    setActiveId(id)
    setTitle("Untitled cover")
    setSubtitle("A new story begins here")
    setStyle("Cinematic realism")
    setImage(DEFAULT_IMAGE)
    setPrompt("")
    setSaved(false)
  }

  function saveDraft() {
    const nextDraft: CoverDraft = { ...activeDraft, updatedAt: "Edited just now" }
    const nextDrafts = [nextDraft, ...drafts.filter((draft) => draft.id !== activeId)]
    setDrafts(nextDrafts)
    void writeProjectData(project.id, "cover-drafts", nextDrafts)
    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-[#101214] text-[#f5f3ee]">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-[#101214]/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" onClick={onBack} className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[.04] px-2.5 py-1.5 text-xs font-medium text-white/75 transition-colors hover:bg-white/[.09] hover:text-white">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to {project.name}</span>
            <span className="sm:hidden">Back</span>
          </button>
          <span className="hidden h-6 w-px bg-white/10 sm:block" />
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="hidden size-8 items-center justify-center rounded-lg bg-amber-200/10 text-amber-100 sm:flex"><BookImage className="size-4" /></span>
            <div className="min-w-0"><h1 className="truncate text-sm font-semibold tracking-tight">Cover Workshop</h1><p className="hidden truncate text-xs text-white/45 sm:block">The visual identity of {project.name}</p></div>
          </div>
        </div>
        <div className="flex items-center gap-2"><button type="button" onClick={saveDraft} className="hidden items-center gap-1.5 rounded-lg bg-amber-200 px-3 py-1.5 text-xs font-semibold text-[#221c13] transition-colors hover:bg-amber-100 sm:flex"><Save className="size-3.5" />{saved ? "Saved" : "Save draft"}</button><UserMenu onSignOut={onSignOut} /></div>
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 px-4 py-5 sm:px-5 lg:min-h-[calc(100vh-3.5rem)] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-200/70">Your library</p><h2 className="mt-1 font-serif text-2xl tracking-tight">Cover drafts</h2></div><button type="button" onClick={startNew} className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:bg-white/[.08] hover:text-white" aria-label="Create new cover"><Plus className="size-4" /></button></div>
          <button type="button" onClick={startNew} className="mt-6 flex w-full items-center gap-3 rounded-xl border border-dashed border-amber-100/30 bg-amber-100/[.04] px-3 py-3 text-left transition-colors hover:bg-amber-100/[.08]"><span className="flex size-8 items-center justify-center rounded-lg bg-amber-200 text-[#261e12]"><Sparkles className="size-4" /></span><span><span className="block text-sm font-medium">Start a new cover</span><span className="mt-0.5 block text-xs text-white/45">Open a fresh workshop</span></span></button>
          <div className="mt-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35"><FolderOpen className="size-3.5" /> Saved designs <span className="ml-auto">{drafts.length}</span></div>
          <div className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-1">
            {drafts.map((draft) => <button key={draft.id} type="button" onClick={() => openDraft(draft)} className={cn("group flex gap-3 rounded-lg p-2 text-left transition-colors", activeId === draft.id ? "bg-white/[.09] ring-1 ring-inset ring-amber-100/25" : "hover:bg-white/[.05]")}><span className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-sm bg-black"><Image src={draft.image} alt="" fill sizes="48px" className="object-cover" /><span className="absolute inset-0 bg-black/20" /></span><span className="min-w-0 self-center"><span className="block truncate text-xs font-medium text-white/85">{draft.title}</span><span className="mt-1 block truncate text-[10px] text-white/40">{draft.updatedAt}</span></span></button>)}
          </div>
          <p className="mt-8 hidden text-xs leading-relaxed text-white/30 lg:block">Your workshop keeps every direction close. Return to an earlier version whenever the story changes shape.</p>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-5xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-amber-200/70">Creation studio / book cover</p><h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Shape the first impression.</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">Build a visual direction for your story now. The generative canvas will plug into this workshop when it is ready.</p></div><div className="flex items-center gap-2 text-xs text-white/40"><Grid2X2 className="size-3.5" /> Workshop view</div></div>
            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(300px,.78fr)_minmax(360px,1.22fr)]">
              <section className="rounded-2xl border border-white/10 bg-[#17191c] p-5 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-white/40">Live preview</p><p className="mt-1 text-xs text-white/35">{saved ? "Saved to your library" : "Unsaved direction"}</p></div><button type="button" className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/45 hover:bg-white/[.07] hover:text-white" aria-label="Download cover preview" title="Download preview"><Download className="size-3.5" /></button></div><div className="mt-6"><CoverPreview draft={activeDraft} /></div><div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[.18em] text-white/30"><Layers3 className="size-3.5" /> Front cover / portrait</div></section>
              <section className="rounded-2xl border border-white/10 bg-[#17191c] p-5 sm:p-7"><div className="flex items-start gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-amber-200/10 text-amber-100"><Edit3 className="size-4" /></span><div><h3 className="font-medium">Cover direction</h3><p className="mt-1 text-xs leading-relaxed text-white/45">Set the ingredients that will guide future image generation.</p></div></div>
                <div className="mt-7 space-y-5"><label className="block"><span className="mb-2 block text-xs font-medium text-white/65">Title</span><input value={title} onChange={(event) => { setTitle(event.target.value); setSaved(false) }} className="h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-amber-100/50" /></label><label className="block"><span className="mb-2 block text-xs font-medium text-white/65">Subtitle or series line</span><input value={subtitle} onChange={(event) => { setSubtitle(event.target.value); setSaved(false) }} className="h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-amber-100/50" /></label><label className="block"><span className="mb-2 block text-xs font-medium text-white/65">Visual style</span><span className="relative block"><select value={style} onChange={(event) => { setStyle(event.target.value); setSaved(false) }} className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-amber-100/50"><option>Cinematic realism</option><option>Dark romanticism</option><option>Mythic minimalism</option><option>Painterly epic</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-white/45" /></span></label><label className="block"><span className="mb-2 flex items-center gap-2 text-xs font-medium text-white/65">Image direction <span className="rounded bg-white/[.07] px-1.5 py-0.5 text-[9px] font-normal uppercase tracking-wider text-white/35">Prototype</span></span><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe the image you want to explore..." className="min-h-24 w-full resize-y rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-white/25 focus:border-amber-100/50" /></label><div><span className="mb-2 block text-xs font-medium text-white/65">Working palette</span><div className="grid grid-cols-4 gap-2">{IMAGE_OPTIONS.map((option) => <button key={option.value} type="button" onClick={() => { setImage(option.value); setSaved(false) }} className={cn("group relative aspect-[1.6/1] overflow-hidden rounded-md border transition-colors", image === option.value ? "border-amber-100 ring-1 ring-amber-100/50" : "border-white/10 hover:border-white/40")}><Image src={option.value} alt={option.label} fill sizes="100px" className="object-cover" /><span className="absolute inset-0 bg-black/25" />{image === option.value && <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-amber-100 text-[#271f13]"><Check className="size-2.5" /></span>}</button>)}</div></div></div>
                <div className="mt-7 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row"><button type="button" onClick={saveDraft} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-200 px-4 text-sm font-semibold text-[#261e12] transition-colors hover:bg-amber-100"><Save className="size-4" /> {saved ? "Draft saved" : "Save to library"}</button><button type="button" disabled className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-white/30" title="AI generation will be connected here"><WandSparkles className="size-4" /> Generate <span className="text-[10px] uppercase tracking-wider">Soon</span></button></div>
              </section>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.025] px-4 py-3 text-xs text-white/40"><Sparkles className="size-4 shrink-0 text-amber-200/70" /><span>AI generation is intentionally parked here. Your project context, cover directions, and saved explorations already have a home.</span></div>
          </div>
        </main>
      </div>
    </div>
  )
}
