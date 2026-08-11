"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type Stage = "beats" | "draft1" | "draft2" | "draft3" | "final"

export const STAGES: { id: Stage; label: string; short: string }[] = [
  { id: "beats", label: "Scene Beats", short: "Beats" },
  { id: "draft1", label: "1st Draft", short: "1st" },
  { id: "draft2", label: "2nd Draft", short: "2nd" },
  { id: "draft3", label: "3rd Draft", short: "3rd" },
  { id: "final", label: "Final Draft", short: "Final" },
]

/** AI editorial role attached to each stage. */
export const STAGE_ROLE: Record<Stage, string> = {
  beats: "Scene Writer",
  draft1: "Developmental Editor",
  draft2: "Line Editor",
  draft3: "Copy Editor",
  final: "Proofreader",
}

export type DraftStage = Exclude<Stage, "beats">
const DRAFT_ORDER: DraftStage[] = ["draft1", "draft2", "draft3", "final"]

export function draftIndex(stage: DraftStage) {
  return DRAFT_ORDER.indexOf(stage)
}
export function nextDraftStage(stage: DraftStage): DraftStage | null {
  const i = draftIndex(stage)
  return i >= 0 && i < DRAFT_ORDER.length - 1 ? DRAFT_ORDER[i + 1] : null
}

export type SceneStatus = "draft" | "finalized"

export type SceneBeat = {
  id: string
  title: string
  setting: string
  tone: string
  pov: string
  characters: string[]
  notes: string
  content: string
  status: SceneStatus
}

export type Chapter = {
  id: string
  title: string
  /** Ordered finalized scene-beat ids that make up this chapter. */
  sceneIds: string[]
  /** Furthest stage this chapter has reached. */
  stage: DraftStage
  /** Draft content per stage — this is what flows down the pipeline. */
  content: Record<DraftStage, string>
  finalized: boolean
}

/* ------------------------------------------------------------------ *
 * Preset options (tie into the existing world data where possible)
 * ------------------------------------------------------------------ */

export const POV_OPTIONS = ["First Person", "Third Limited", "Third Omniscient", "Second Person"]
export const TONE_OPTIONS = ["Ominous", "Tense", "Hopeful", "Melancholic", "Wry", "Elegiac"]

/* ------------------------------------------------------------------ *
 * Seed data — a couple of finalized beats + one chapter already at the
 * 1st-draft stage so the full pipeline is populated and navigable.
 * ------------------------------------------------------------------ */

const SEED_SCENES: SceneBeat[] = [
  {
    id: "sb-gates",
    title: "Arrival at the Gates",
    setting: "Emberhold",
    tone: "Ominous",
    pov: "Third Limited",
    characters: ["Sera Vane"],
    notes: "Establish the scale of the city and Sera's dread as she finally reaches it.",
    content:
      "The gates of Emberhold rose out of the grey like the ribs of some long-dead beast. Sera had walked three days through the ash to reach them, and now, standing in their shadow, she felt smaller than she had expected. She pressed a gloved hand to the cold iron and waited for the city to notice her.",
    status: "finalized",
  },
  {
    id: "sb-bell",
    title: "The Bell Tolls",
    setting: "Emberhold",
    tone: "Tense",
    pov: "Third Limited",
    characters: ["Sera Vane", "Corin Ashe"],
    notes: "Corin reveals himself at the gate. Old debts surface between them.",
    content:
      "Somewhere beyond the wall a bell began to toll, slow and uneven, as if the city itself were struggling to breathe. \"You came back,\" said a voice behind her. She did not turn. She already knew who it was, and she already knew what he would ask of her.",
    status: "finalized",
  },
  {
    id: "sb-reach",
    title: "Ash on the Wind",
    setting: "The Grey Reach",
    tone: "Melancholic",
    pov: "Third Limited",
    characters: ["Sera Vane"],
    notes: "Flashback to the crossing of the wastes. Still roughing this one out.",
    content: "",
    status: "draft",
  },
]

function assembleChapterFromScenes(scenes: SceneBeat[], sceneIds: string[]) {
  return sceneIds
    .map((id) => {
      const s = scenes.find((sc) => sc.id === id)
      if (!s) return ""
      const body = s.content.trim() || "(No prose drafted for this beat yet.)"
      return `${s.title}\n\n${body}`
    })
    .filter(Boolean)
    .join("\n\n\u00a0\u00a0\u00a0*\u00a0\u00a0\u00a0*\u00a0\u00a0\u00a0*\n\n")
}

const SEED_CHAPTER_CONTENT = assembleChapterFromScenes(SEED_SCENES, ["sb-gates", "sb-bell"])

const SEED_CHAPTERS: Chapter[] = [
  {
    id: "ch-one",
    title: "Chapter One — The Gates of Emberhold",
    sceneIds: ["sb-gates", "sb-bell"],
    stage: "draft1",
    content: {
      draft1: SEED_CHAPTER_CONTENT,
      draft2: "",
      draft3: "",
      final: "",
    },
    finalized: false,
  },
]

/* ------------------------------------------------------------------ *
 * Store
 * ------------------------------------------------------------------ */

type PipelineState = {
  scenes: SceneBeat[]
  chapters: Chapter[]
  activeStage: Stage
  activeSceneId: string | null
  activeChapterId: string | null
}

type PipelineActions = {
  setActiveStage: (stage: Stage) => void
  setActiveScene: (id: string | null) => void
  setActiveChapter: (id: string | null) => void

  createScene: () => string
  updateScene: (id: string, patch: Partial<Omit<SceneBeat, "id">>) => void
  toggleSceneCharacter: (id: string, character: string) => void
  finalizeScene: (id: string) => void
  reopenScene: (id: string) => void
  deleteScene: (id: string) => void

  createChapter: (title?: string) => string
  updateChapter: (id: string, patch: Partial<Pick<Chapter, "title">>) => void
  toggleChapterScene: (id: string, sceneId: string) => void
  moveChapterScene: (id: string, sceneId: string, dir: -1 | 1) => void
  regenerateChapter: (id: string) => void
  setDraftContent: (id: string, stage: DraftStage, content: string) => void
  advanceChapter: (id: string) => void
  finalizeChapter: (id: string) => void
}

type PipelineContextValue = PipelineState &
  PipelineActions & {
    finalizedScenes: SceneBeat[]
    getChapter: (id: string | null) => Chapter | undefined
    getScene: (id: string) => SceneBeat | undefined
    chaptersAtStage: (stage: DraftStage) => Chapter[]
  }

const PipelineContext = createContext<PipelineContextValue | null>(null)

let idCounter = 0
function uid(prefix: string) {
  idCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`
}

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [scenes, setScenes] = useState<SceneBeat[]>(SEED_SCENES)
  const [chapters, setChapters] = useState<Chapter[]>(SEED_CHAPTERS)
  const [activeStage, setActiveStage] = useState<Stage>("beats")
  const [activeSceneId, setActiveSceneId] = useState<string | null>(SEED_SCENES[0]?.id ?? null)
  const [activeChapterId, setActiveChapterId] = useState<string | null>(SEED_CHAPTERS[0]?.id ?? null)

  /* ----- scenes ----- */
  const createScene = useCallback(() => {
    const id = uid("sb")
    const scene: SceneBeat = {
      id,
      title: "Untitled Scene",
      setting: "",
      tone: "",
      pov: "",
      characters: [],
      notes: "",
      content: "",
      status: "draft",
    }
    setScenes((prev) => [...prev, scene])
    setActiveSceneId(id)
    return id
  }, [])

  const updateScene = useCallback((id: string, patch: Partial<Omit<SceneBeat, "id">>) => {
    setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }, [])

  const toggleSceneCharacter = useCallback((id: string, character: string) => {
    setScenes((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              characters: s.characters.includes(character)
                ? s.characters.filter((c) => c !== character)
                : [...s.characters, character],
            }
          : s,
      ),
    )
  }, [])

  const finalizeScene = useCallback((id: string) => {
    setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, status: "finalized" } : s)))
  }, [])

  const reopenScene = useCallback((id: string) => {
    setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, status: "draft" } : s)))
  }, [])

  const deleteScene = useCallback((id: string) => {
    setScenes((prev) => prev.filter((s) => s.id !== id))
    // also detach from any chapters that referenced it
    setChapters((prev) => prev.map((c) => ({ ...c, sceneIds: c.sceneIds.filter((sid) => sid !== id) })))
    setActiveSceneId((cur) => (cur === id ? null : cur))
  }, [])

  /* ----- chapters ----- */
  const createChapter = useCallback((title?: string) => {
    const id = uid("ch")
    const chapter: Chapter = {
      id,
      title: title?.trim() || "Untitled Chapter",
      sceneIds: [],
      stage: "draft1",
      content: { draft1: "", draft2: "", draft3: "", final: "" },
      finalized: false,
    }
    setChapters((prev) => [...prev, chapter])
    setActiveChapterId(id)
    return id
  }, [])

  const updateChapter = useCallback((id: string, patch: Partial<Pick<Chapter, "title">>) => {
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }, [])

  const toggleChapterScene = useCallback((id: string, sceneId: string) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              sceneIds: c.sceneIds.includes(sceneId)
                ? c.sceneIds.filter((sid) => sid !== sceneId)
                : [...c.sceneIds, sceneId],
            }
          : c,
      ),
    )
  }, [])

  const moveChapterScene = useCallback((id: string, sceneId: string, dir: -1 | 1) => {
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const idx = c.sceneIds.indexOf(sceneId)
        const target = idx + dir
        if (idx < 0 || target < 0 || target >= c.sceneIds.length) return c
        const next = [...c.sceneIds]
        ;[next[idx], next[target]] = [next[target], next[idx]]
        return { ...c, sceneIds: next }
      }),
    )
  }, [])

  const regenerateChapter = useCallback((id: string) => {
    setChapters((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, content: { ...c.content, draft1: assembleChapterFromScenes(scenes, c.sceneIds) } }
          : c,
      ),
    )
  }, [scenes])

  const setDraftContent = useCallback((id: string, stage: DraftStage, content: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content: { ...c.content, [stage]: content } } : c)),
    )
  }, [])

  const advanceChapter = useCallback((id: string) => {
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const next = nextDraftStage(c.stage)
        if (!next) return c
        // carry the current content forward into the next stage
        const carried = c.content[c.stage]
        return { ...c, stage: next, content: { ...c.content, [next]: carried } }
      }),
    )
    // follow the chapter into its new stage
    setChapters((prev) => {
      const c = prev.find((x) => x.id === id)
      if (c) {
        setActiveStage(c.stage)
        setActiveChapterId(id)
      }
      return prev
    })
  }, [])

  const finalizeChapter = useCallback((id: string) => {
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, finalized: true } : c)))
  }, [])

  /* ----- selectors ----- */
  const finalizedScenes = useMemo(() => scenes.filter((s) => s.status === "finalized"), [scenes])
  const getChapter = useCallback((id: string | null) => chapters.find((c) => c.id === id), [chapters])
  const getScene = useCallback((id: string) => scenes.find((s) => s.id === id), [scenes])
  const chaptersAtStage = useCallback(
    (stage: DraftStage) => chapters.filter((c) => draftIndex(c.stage) >= draftIndex(stage)),
    [chapters],
  )

  const value = useMemo<PipelineContextValue>(
    () => ({
      scenes,
      chapters,
      activeStage,
      activeSceneId,
      activeChapterId,
      setActiveStage,
      setActiveScene: setActiveSceneId,
      setActiveChapter: setActiveChapterId,
      createScene,
      updateScene,
      toggleSceneCharacter,
      finalizeScene,
      reopenScene,
      deleteScene,
      createChapter,
      updateChapter,
      toggleChapterScene,
      moveChapterScene,
      regenerateChapter,
      setDraftContent,
      advanceChapter,
      finalizeChapter,
      finalizedScenes,
      getChapter,
      getScene,
      chaptersAtStage,
    }),
    [
      scenes,
      chapters,
      activeStage,
      activeSceneId,
      activeChapterId,
      createScene,
      updateScene,
      toggleSceneCharacter,
      finalizeScene,
      reopenScene,
      deleteScene,
      createChapter,
      updateChapter,
      toggleChapterScene,
      moveChapterScene,
      regenerateChapter,
      setDraftContent,
      advanceChapter,
      finalizeChapter,
      finalizedScenes,
      getChapter,
      getScene,
      chaptersAtStage,
    ],
  )

  return <PipelineContext.Provider value={value}>{children}</PipelineContext.Provider>
}

export function usePipeline() {
  const ctx = useContext(PipelineContext)
  if (!ctx) throw new Error("usePipeline must be used within a PipelineProvider")
  return ctx
}

/** Aggregate world metadata across a set of scene beats (used by chapters). */
export function aggregateWorldDetails(scenesList: SceneBeat[]) {
  const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)))
  return {
    settings: uniq(scenesList.map((s) => s.setting)),
    tones: uniq(scenesList.map((s) => s.tone)),
    povs: uniq(scenesList.map((s) => s.pov)),
    characters: uniq(scenesList.flatMap((s) => s.characters)),
  }
}
