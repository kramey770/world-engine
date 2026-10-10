"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"

export type Project = {
  id: string
  name: string
  description: string
  lastEdited: string
  wordCount: number
  accent: string
  createdAt: number
  updatedAt: number
}

export type ProjectInput = Pick<Project, "name" | "description"> & Partial<Pick<Project, "accent">>

export type ProjectDataLoadState =
  | { scope: null; status: "idle" }
  | { scope: string; status: "loading" | "loaded" }
  | { scope: string; status: "error"; error: unknown }

const DATABASE_NAME = "world-engine"
const DATABASE_VERSION = 2
const PROJECT_STORE = "projects"
const DATA_STORE = "project-data"
const ACTIVE_PROJECT_KEY = "world-engine:active-project"
const PROJECT_BACKUP_FORMAT = "world-engine-project-backup"

type ProjectDataRecord = {
  key: string
  projectId: string
  collection: string
  value: unknown
}

type ProjectBackup = {
  format: typeof PROJECT_BACKUP_FORMAT
  version: 1
  exportedAt: string
  projects: Project[]
  projectData: ProjectDataRecord[]
}

export const DEFAULT_PROJECT: ProjectInput = {
  name: "Untitled Project",
  description: "A new space for your world, story, and ideas.",
  accent: "chart-1",
}

type ProjectStoreValue = {
  projects: Project[]
  activeProject: Project | null
  isHydrated: boolean
  error: string | null
  createProject: (input?: Partial<ProjectInput>) => Promise<Project>
  updateProject: (id: string, input: Partial<ProjectInput>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  setActiveProject: (id: string) => void
}

const ProjectStoreContext = createContext<ProjectStoreValue | null>(null)

function formatLastEdited(timestamp: number) {
  const elapsed = Date.now() - timestamp
  if (elapsed < 60_000) return "Just now"
  if (elapsed < 3_600_000) return `${Math.floor(elapsed / 60_000)}m ago`
  if (elapsed < 86_400_000) return `${Math.floor(elapsed / 3_600_000)}h ago`
  return new Date(timestamp).toLocaleDateString()
}

function createProject(input: Partial<ProjectInput> = {}): Project {
  const timestamp = Date.now()
  return {
    id: crypto.randomUUID(),
    name: input.name?.trim() || DEFAULT_PROJECT.name,
    description: input.description?.trim() || DEFAULT_PROJECT.description,
    lastEdited: formatLastEdited(timestamp),
    wordCount: 0,
    accent: input.accent || DEFAULT_PROJECT.accent || "chart-1",
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is unavailable in this browser."))
      return
    }

    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    request.onerror = () => reject(request.error ?? new Error("Could not open local project storage."))
    request.onsuccess = () => resolve(request.result)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(PROJECT_STORE)) {
        database.createObjectStore(PROJECT_STORE, { keyPath: "id" })
      }
      if (!database.objectStoreNames.contains(DATA_STORE)) {
        database.createObjectStore(DATA_STORE, { keyPath: "key" })
      }
    }
  })
}

async function readProjects(): Promise<Project[]> {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const request = database.transaction(PROJECT_STORE, "readonly").objectStore(PROJECT_STORE).getAll()
    request.onerror = () => reject(request.error ?? new Error("Could not read local projects."))
    request.onsuccess = () => resolve((request.result as Project[]).sort((a, b) => b.updatedAt - a.updatedAt))
  })
}

async function writeProject(project: Project) {
  const database = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const request = database.transaction(PROJECT_STORE, "readwrite").objectStore(PROJECT_STORE).put(project)
    request.onerror = () => reject(request.error ?? new Error("Could not save the project."))
    request.onsuccess = () => resolve()
  })
}

async function removeProject(id: string) {
  const database = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction([PROJECT_STORE, DATA_STORE], "readwrite")
    transaction.objectStore(PROJECT_STORE).delete(id)

    const dataRequest = transaction.objectStore(DATA_STORE).openCursor()
    dataRequest.onsuccess = () => {
      const cursor = dataRequest.result
      if (!cursor) return
      const record = cursor.value as { projectId?: unknown }
      if (record.projectId === id) cursor.delete()
      cursor.continue()
    }

    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error("Could not delete the project."))
    transaction.onabort = () => reject(transaction.error ?? new Error("Could not delete the project."))
  })
}

export async function readProjectData<T>(projectId: string, collection: string): Promise<T | null> {
  const database = await openDatabase()
  return new Promise((resolve, reject) => {
    const key = projectDataScope(projectId, collection)
    const request = database.transaction(DATA_STORE, "readonly").objectStore(DATA_STORE).get(key)
    request.onerror = () => reject(request.error ?? new Error("Could not read project data."))
    request.onsuccess = () => {
      const record: unknown = request.result
      if (record === undefined) {
        resolve(null)
        return
      }

      if (!record || typeof record !== "object" || Array.isArray(record)) {
        reject(new Error(`Stored project data has an invalid record for ${key}.`))
        return
      }

      const stored = record as Record<string, unknown>
      if (
        stored.key !== key ||
        stored.projectId !== projectId ||
        stored.collection !== collection ||
        !Object.hasOwn(stored, "value") ||
        stored.value === undefined ||
        stored.value === null
      ) {
        reject(new Error(`Stored project data has an invalid record for ${key}.`))
        return
      }

      resolve(stored.value as T)
    }
  })
}

export function projectDataScope(projectId: string, collection: string) {
  return `${projectId}:${collection}`
}

export async function writeProjectData<T>(projectId: string, collection: string, value: T) {
  const database = await openDatabase()
  return new Promise<void>((resolve, reject) => {
    const key = projectDataScope(projectId, collection)
    const request = database
      .transaction(DATA_STORE, "readwrite")
      .objectStore(DATA_STORE)
      .put({ key, projectId, collection, value })
    request.onerror = () => reject(request.error ?? new Error("Could not save project data."))
    request.onsuccess = () => resolve()
  })
}

export async function exportProjectBackup(): Promise<ProjectBackup> {
  const database = await openDatabase()
  try {
    const transaction = database.transaction([PROJECT_STORE, DATA_STORE], "readonly")
    const projectsRequest = transaction.objectStore(PROJECT_STORE).getAll()
    const dataRequest = transaction.objectStore(DATA_STORE).getAll()

    return await new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve({
        format: PROJECT_BACKUP_FORMAT,
        version: 1,
        exportedAt: new Date().toISOString(),
        projects: (projectsRequest.result as Project[]).sort((a, b) => b.updatedAt - a.updatedAt),
        projectData: dataRequest.result as ProjectDataRecord[],
      })
      transaction.onerror = () => reject(transaction.error ?? new Error("Could not export project data."))
      transaction.onabort = () => reject(transaction.error ?? new Error("Could not export project data."))
    })
  } finally {
    database.close()
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function isProjectBackup(value: unknown): value is ProjectBackup {
  if (!isRecord(value) || value.format !== PROJECT_BACKUP_FORMAT || value.version !== 1) return false
  if (typeof value.exportedAt !== "string" || !Array.isArray(value.projects) || !Array.isArray(value.projectData)) return false
  if (value.projects.length === 0 || !value.projects.every((project) => (
    isRecord(project) &&
    typeof project.id === "string" &&
    typeof project.name === "string" &&
    typeof project.description === "string" &&
    typeof project.lastEdited === "string" &&
    typeof project.wordCount === "number" &&
    typeof project.accent === "string" &&
    typeof project.createdAt === "number" &&
    typeof project.updatedAt === "number"
  ))) return false

  const projectIds = new Set((value.projects as Project[]).map((project) => project.id))
  if (projectIds.size !== value.projects.length) return false
  const dataKeys = new Set<string>()
  return value.projectData.every((record) => {
    if (
      !isRecord(record) ||
      typeof record.projectId !== "string" ||
      typeof record.collection !== "string" ||
      typeof record.key !== "string" ||
      !projectIds.has(record.projectId) ||
      record.key !== projectDataScope(record.projectId, record.collection) ||
      !Object.hasOwn(record, "value") ||
      record.value === null ||
      record.value === undefined ||
      dataKeys.has(record.key)
    ) return false
    dataKeys.add(record.key)
    return true
  })
}

export function parseProjectBackup(contents: string): ProjectBackup {
  let parsed: unknown
  try {
    parsed = JSON.parse(contents)
  } catch {
    throw new Error("This file is not valid JSON.")
  }
  if (!isProjectBackup(parsed)) {
    throw new Error("This is not a valid World Engine project backup.")
  }
  return parsed
}

export async function importProjectBackup(value: unknown): Promise<number> {
  if (!isProjectBackup(value)) throw new Error("This is not a valid World Engine project backup.")

  const database = await openDatabase()
  const importedIds = new Set(value.projects.map((project) => project.id))
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction([PROJECT_STORE, DATA_STORE], "readwrite")
      const projectStore = transaction.objectStore(PROJECT_STORE)
      const dataStore = transaction.objectStore(DATA_STORE)
      const existingDataRequest = dataStore.getAll()

      for (const project of value.projects) projectStore.put(project)
      existingDataRequest.onsuccess = () => {
        for (const record of existingDataRequest.result as ProjectDataRecord[]) {
          if (importedIds.has(record.projectId)) dataStore.delete(record.key)
        }
        for (const record of value.projectData) dataStore.put(record)
      }

      transaction.oncomplete = () => resolve(value.projects.length)
      transaction.onerror = () => reject(transaction.error ?? new Error("Could not import project data."))
      transaction.onabort = () => reject(transaction.error ?? new Error("Could not import project data."))
    })
  } finally {
    database.close()
  }
}

export function useProjectCollection<T>(
  collection: string,
  emptyValue: T,
): [T, Dispatch<SetStateAction<T>>, ProjectDataLoadState] {
  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? null
  const scope = projectId ? projectDataScope(projectId, collection) : null
  const emptyValueRef = useRef(emptyValue)
  const [value, setValue] = useState<T>(emptyValue)
  const [loadState, setLoadState] = useState<ProjectDataLoadState>({ scope: null, status: "idle" })

  useEffect(() => {
    let cancelled = false
    setValue(emptyValueRef.current)
    if (!projectId || !scope) {
      setLoadState({ scope: null, status: "idle" })
      return () => { cancelled = true }
    }

    setLoadState({ scope, status: "loading" })
    readProjectData<T>(projectId, collection).then((saved) => {
      if (cancelled) return
      setValue(saved ?? emptyValueRef.current)
      setLoadState({ scope, status: "loaded" })
    }).catch((error: unknown) => {
      if (!cancelled) setLoadState({ scope, status: "error", error })
    })
    return () => { cancelled = true }
  }, [collection, projectId, scope])

  useEffect(() => {
    if (projectId && scope && loadState.scope === scope && loadState.status === "loaded") {
      void writeProjectData(projectId, collection, value)
    }
  }, [collection, loadState, projectId, scope, value])

  const currentValue = loadState.scope === scope && loadState.status === "loaded" ? value : emptyValueRef.current
  return [currentValue, setValue, loadState]
}

export function ProjectStoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    readProjects()
      .then((storedProjects) => {
        if (cancelled) return
        setProjects(storedProjects)
        const storedActiveId = window.localStorage.getItem(ACTIVE_PROJECT_KEY)
        setActiveProjectId(storedProjects.some((project) => project.id === storedActiveId) ? storedActiveId : null)
        setIsHydrated(true)
      })
      .catch((storageError: unknown) => {
        if (cancelled) return
        setError(storageError instanceof Error ? storageError.message : "Could not load local projects.")
        setIsHydrated(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<ProjectStoreValue>(
    () => ({
      projects,
      activeProject: projects.find((project) => project.id === activeProjectId) ?? null,
      isHydrated,
      error,
      createProject: async (input = {}) => {
        const project = createProject(input)
        await writeProject(project)
        setProjects((current) => [project, ...current])
        setActiveProjectId(project.id)
        window.localStorage.setItem(ACTIVE_PROJECT_KEY, project.id)
        return project
      },
      updateProject: async (id, input) => {
        const existing = projects.find((project) => project.id === id)
        if (!existing) return
        const updatedProject = {
          ...existing,
          ...input,
          name: input.name?.trim() || existing.name,
          description: input.description !== undefined ? input.description.trim() : existing.description,
          updatedAt: Date.now(),
          lastEdited: formatLastEdited(Date.now()),
        }
        await writeProject(updatedProject)
        setProjects((current) => current.map((project) => (project.id === id ? updatedProject : project)))
      },
      deleteProject: async (id) => {
        await removeProject(id)
        setProjects((current) => current.filter((project) => project.id !== id))
        if (activeProjectId === id) {
          setActiveProjectId(null)
          window.localStorage.removeItem(ACTIVE_PROJECT_KEY)
        }
      },
      setActiveProject: (id) => {
        setActiveProjectId(id)
        window.localStorage.setItem(ACTIVE_PROJECT_KEY, id)
      },
    }),
    [activeProjectId, error, isHydrated, projects],
  )

  return <ProjectStoreContext.Provider value={value}>{children}</ProjectStoreContext.Provider>
}

export function useProjectStore() {
  const context = useContext(ProjectStoreContext)
  if (!context) throw new Error("useProjectStore must be used inside ProjectStoreProvider")
  return context
}