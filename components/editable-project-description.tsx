"use client"

import { useEffect, useState, type KeyboardEvent } from "react"
import { Pencil } from "lucide-react"
import { readProjectData, useProjectStore, writeProjectData } from "@/lib/project-store"
import { cn } from "@/lib/utils"

export function EditableProjectDescription({
  collection,
  defaultValue,
  className,
  editorClassName,
}: {
  collection: string
  defaultValue: string
  className?: string
  editorClassName?: string
}) {
  const { activeProject } = useProjectStore()
  const projectId = activeProject?.id ?? null
  const [description, setDescription] = useState(defaultValue)
  const [savedDescription, setSavedDescription] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(Boolean(projectId))
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    setIsEditing(false)
    setIsLoading(Boolean(projectId))
    setLoadError(null)
    setSaveError(null)
    setDescription(defaultValue)
    setSavedDescription(defaultValue)

    if (!projectId) return () => { cancelled = true }

    readProjectData<string>(projectId, collection).then((storedDescription) => {
      if (cancelled) return
      const value = storedDescription ?? defaultValue
      setDescription(value)
      setSavedDescription(value)
      setIsLoading(false)
    }).catch((error: unknown) => {
      if (cancelled) return
      setLoadError(error instanceof Error ? error.message : "Could not load this description.")
      setIsLoading(false)
    })

    return () => { cancelled = true }
  }, [collection, defaultValue, projectId])

  async function saveDescription() {
    setIsEditing(false)
    if (!projectId || description === savedDescription) return

    setSaveError(null)
    try {
      await writeProjectData(projectId, collection, description)
      if (activeProject?.id === projectId) setSavedDescription(description)
    } catch (error: unknown) {
      setSaveError(error instanceof Error ? error.message : "Could not save this description.")
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement | HTMLButtonElement>) {
    event.stopPropagation()
    if (event.key === "Escape" && event.currentTarget instanceof HTMLTextAreaElement) {
      setDescription(savedDescription)
      setIsEditing(false)
    }
  }

  return (
    <div className="group/project-description relative" onClick={(event) => event.stopPropagation()}>
      {isEditing ? (
        <textarea
          aria-label="Edit description"
          autoFocus
          className={cn(
            "w-full resize-none rounded-md border border-border bg-background/80 p-2 text-sm leading-relaxed text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
            editorClassName,
          )}
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onBlur={() => { void saveDescription() }}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <p className={cn("whitespace-pre-wrap pr-7", className)}>{description}</p>
          {projectId && !isLoading && !loadError && (
            <button
              type="button"
              aria-label="Edit description"
              title="Edit description"
              className="absolute right-0 top-0 z-[2] inline-flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground opacity-0 shadow-sm transition-opacity hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group-hover/project-description:opacity-100"
              onClick={() => setIsEditing(true)}
              onKeyDown={handleKeyDown}
            >
              <Pencil className="size-3.5" />
            </button>
          )}
        </>
      )}
      {(loadError || saveError) && <p role="alert" className="mt-1 text-left text-xs text-destructive">{loadError ?? saveError}</p>}
    </div>
  )
}
