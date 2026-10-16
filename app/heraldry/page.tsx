"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { BookmarkPlus, Crown, LoaderCircle, Pencil, Plus, Shield, Trash2 } from "lucide-react"
import { BackButton } from "@/components/back-button"
import { UserMenu } from "@/components/user-menu"
import { DEFAULT_PROJECT, readProjectData, type Project, writeProjectData } from "@/lib/project-store"

type HeraldicDesign = Record<string, unknown> & { t1: string; name?: string }

type HeraldryCreation = {
  id: string
  name: string
  design: HeraldicDesign
  createdAt: number
  updatedAt: number
}

type ArmoriaStateMessage = {
  source: "armoria"
  type: "heraldry-state"
  mode: "gallery" | "edit"
  current: HeraldicDesign | null
}

const HERALDRY_COLLECTION = "heraldry"

function isDesign(value: unknown): value is HeraldicDesign {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) && typeof (value as Record<string, unknown>).t1 === "string"
}

function isCreation(value: unknown): value is HeraldryCreation {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  const creation = value as Record<string, unknown>
  return (
    typeof creation.id === "string" &&
    typeof creation.name === "string" &&
    isDesign(creation.design) &&
    typeof creation.createdAt === "number" &&
    typeof creation.updatedAt === "number"
  )
}

function isArmoriaStateMessage(value: unknown): value is ArmoriaStateMessage {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  const message = value as Record<string, unknown>
  return (
    message.source === "armoria" &&
    message.type === "heraldry-state" &&
    (message.mode === "gallery" || message.mode === "edit") &&
    (message.current === null || isDesign(message.current))
  )
}

function readCreations(value: unknown): HeraldryCreation[] {
  if (value === null) return []
  if (!Array.isArray(value)) {
    if (value && typeof value === "object" && "status" in value) return []
    throw new Error("Saved heraldry data has an unsupported format.")
  }
  if (!value.every(isCreation)) throw new Error("One or more saved heraldry creations are invalid.")
  return [...value].sort((a, b) => b.updatedAt - a.updatedAt)
}

function getCreationName(design: HeraldicDesign, count: number) {
  return design.name?.trim() || `Crest ${count}`
}

export default function HeraldryPage({
  project = {
    id: "local-preview",
    name: DEFAULT_PROJECT.name,
    description: DEFAULT_PROJECT.description,
    accent: DEFAULT_PROJECT.accent || "chart-1",
    lastEdited: "Just now",
    wordCount: 0,
    createdAt: 0,
    updatedAt: 0,
  },
  onBack,
  onSignOut,
}: {
  project?: Project
  onBack?: () => void
  onSignOut?: () => void
}) {
  const [screen, setScreen] = useState<"hub" | "studio">("hub")
  const [creations, setCreations] = useState<HeraldryCreation[]>([])
  const [currentDesign, setCurrentDesign] = useState<HeraldicDesign | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [creationName, setCreationName] = useState("")
  const [framePath, setFramePath] = useState("/armoria/index.html")
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle")
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    let cancelled = false
    setLoadState("loading")
    readProjectData<unknown>(project.id, HERALDRY_COLLECTION)
      .then((saved) => {
        if (cancelled) return
        setCreations(readCreations(saved))
        setLoadState("ready")
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setErrorMessage(error instanceof Error ? error.message : "Could not load this project's heraldry.")
        setLoadState("error")
      })
    return () => {
      cancelled = true
    }
  }, [project.id])

  useEffect(() => {
    if (screen !== "studio") return

    function handleMessage(event: MessageEvent<unknown>) {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        !isArmoriaStateMessage(event.data)
      ) return

      setCurrentDesign(event.data.mode === "edit" ? event.data.current : null)
      setSaveState("idle")
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [screen])

  const requestStudioState = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { source: "world-engine", type: "request-heraldry-state" },
      window.location.origin,
    )
  }, [])

  function openStudio(creation?: HeraldryCreation) {
    setEditingId(creation?.id ?? null)
    setCreationName(creation?.name ?? "")
    setCurrentDesign(null)
    setSaveState("idle")
    setErrorMessage("")
    setFramePath(
      creation
        ? `/armoria/index.html?coa=${encodeURIComponent(JSON.stringify(creation.design))}`
        : "/armoria/index.html",
    )
    setScreen("studio")
  }

  async function saveCreation() {
    if (!currentDesign) return

    const now = Date.now()
    const existing = editingId ? creations.find((item) => item.id === editingId) : undefined
    const creation: HeraldryCreation = {
      id: existing?.id ?? crypto.randomUUID(),
      name: creationName.trim() || getCreationName(currentDesign, creations.length + 1),
      design: currentDesign,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
    const updated = [creation, ...creations.filter((item) => item.id !== creation.id)]

    try {
      await writeProjectData(project.id, HERALDRY_COLLECTION, updated)
      setCreations(updated)
      setEditingId(creation.id)
      setCreationName(creation.name)
      setSaveState("saved")
      setErrorMessage("")
    } catch (error) {
      setSaveState("error")
      setErrorMessage(error instanceof Error ? error.message : "Could not save this heraldry.")
    }
  }

  async function deleteCreation(creationId: string) {
    const updated = creations.filter((creation) => creation.id !== creationId)
    try {
      await writeProjectData(project.id, HERALDRY_COLLECTION, updated)
      setCreations(updated)
      setErrorMessage("")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not delete this heraldry.")
    }
  }

  const pageTitle = screen === "studio" ? "Heraldry Studio" : "Heraldry"

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <BackButton onClick={screen === "studio" ? () => setScreen("hub") : onBack}>
            <span className="hidden sm:inline">{screen === "studio" ? "Heraldry hub" : `Back to ${project.name}`}</span>
            <span className="sm:hidden">Back</span>
          </BackButton>

          <span className="hidden h-6 w-px shrink-0 bg-border sm:block" aria-hidden="true" />

          <div className="flex min-w-0 items-center gap-2.5">
            <span className="hidden size-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-inset ring-primary/25 sm:flex">
              <Crown className="size-4" />
            </span>
            <div className="min-w-0 leading-none">
              <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">{pageTitle}</h1>
              <p className="mt-0.5 hidden truncate text-xs text-muted-foreground sm:block">
                {screen === "studio" ? `Creating for ${project.name}` : `Heraldry for ${project.name}`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {screen === "studio" && (
            <button
              type="button"
              onClick={saveCreation}
              disabled={!currentDesign || loadState !== "ready"}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              title={currentDesign ? "Save this design to the project" : "Open a coat in the editor before saving"}
            >
              <BookmarkPlus className="size-4" />
              {saveState === "saved" ? "Saved to Project" : saveState === "error" ? "Save failed" : "Save to Project"}
            </button>
          )}
          <UserMenu onSignOut={onSignOut ?? (() => {})} />
        </div>
      </header>

      {screen === "studio" ? (
        <div className="flex min-h-0 flex-1 flex-col">
          {currentDesign && (
            <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-border bg-card/50 px-4 py-2.5">
              <label htmlFor="heraldry-creation-name" className="text-xs text-muted-foreground">Name this creation</label>
              <input
                id="heraldry-creation-name"
                value={creationName}
                onChange={(event) => {
                  setCreationName(event.target.value)
                  setSaveState("idle")
                }}
                placeholder={getCreationName(currentDesign, creations.length + 1)}
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-primary sm:max-w-sm"
              />
              <span className="text-xs text-muted-foreground">Edit a coat below, then save it to this project.</span>
            </div>
          )}
          <iframe
            key={framePath}
            ref={iframeRef}
            src={framePath}
            onLoad={requestStudioState}
            className="min-h-0 w-full flex-1 border-0"
            title="Armoria Heraldry Generator"
          />
        </div>
      ) : (
        <main className="min-h-0 flex-1 overflow-y-auto">
          <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Creation Studio</p>
                <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  Your world&apos;s heraldry
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Create and collect the crests, seals, and banners that define {project.name}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openStudio()}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="size-4" />
                Create new heraldry
              </button>
            </div>

            {errorMessage && (
              <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            {loadState === "loading" ? (
              <div className="flex min-h-56 items-center justify-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Loading your creations...
              </div>
            ) : loadState === "error" ? null : creations.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {creations.map((creation) => (
                  <article key={creation.id} className="group overflow-hidden rounded-xl border border-border bg-card/70 transition-colors hover:border-primary/40">
                    <div className="relative h-48 overflow-hidden bg-[#0b0b0c]">
                      <iframe
                        title={`${creation.name} preview`}
                        src={`/armoria/index.html?coa=${encodeURIComponent(JSON.stringify(creation.design))}&view=1&size=180`}
                        className="pointer-events-none h-full w-full border-0"
                        loading="lazy"
                        tabIndex={-1}
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10">
                        <h3 className="truncate text-sm font-semibold text-white">{creation.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 p-3">
                      <span className="truncate text-xs text-muted-foreground">
                        Updated {new Date(creation.updatedAt).toLocaleDateString()}
                      </span>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openStudio(creation)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                        >
                          <Pencil className="size-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => void deleteCreation(creation.id)}
                          aria-label={`Delete ${creation.name}`}
                          className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 px-6 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Shield className="size-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">No heraldry yet</h3>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Start with a generated coat of arms, then save it here to revisit and edit later.
                </p>
                <button
                  type="button"
                  onClick={() => openStudio()}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Plus className="size-4" />
                  Create your first piece
                </button>
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  )
}
