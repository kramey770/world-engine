"use client"

import { useMemo, useState } from "react"
import { CanonArtwork } from "@/components/world/canon-artwork"
import { Clock3, GripVertical, ImageOff, Plus } from "lucide-react"
import { CanonImageField } from "@/components/world/canon-image-field"
import { useHistoryCanon, type CanonHistory } from "@/lib/history-canon"
import { cn } from "@/lib/utils"

type HistoryTimelineProps = {
  histories: CanonHistory[]
  compact: boolean
  onCreate: () => void
  onSelect: (id: string) => void
}

function EraLabel({ label, first }: { label: string; first: boolean }) {
  return (
    <div className={cn("relative z-[1] flex items-center gap-3", !first && "mt-8")}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-primary">
        <Clock3 className="size-4" />
      </span>
      <h2 className="font-serif text-xl font-medium tracking-tight text-foreground">{label}</h2>
    </div>
  )
}

function HistoryImage({
  history,
  compact,
  onImageChange,
}: {
  history: CanonHistory
  compact: boolean
  onImageChange: (image: string) => void
}) {
  return (
    <div className={cn("group relative shrink-0 overflow-hidden bg-muted", compact ? "size-16 rounded-md" : "h-36 w-full rounded-lg sm:h-44")}>
      {history.image ? (
        <CanonArtwork
          src={history.image}
          alt={`Artwork for ${history.name}`}
          fill
          sizes={compact ? "64px" : "(max-width: 640px) 100vw, 360px"}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
          <ImageOff className={compact ? "size-4" : "size-7"} />
          {!compact && <span className="text-[11px]">No image</span>}
        </div>
      )}
      <CanonImageField
        value={history.image ?? ""}
        label={`Change ${history.name} image`}
        onChange={onImageChange}
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}

function HistoryCard({
  history,
  compact,
  onDrop,
  onDragStart,
  onImageChange,
  onSelect,
}: {
  history: CanonHistory
  compact: boolean
  onDrop: () => void
  onDragStart: () => void
  onImageChange: (image: string) => void
  onSelect: () => void
}) {
  const [dragging, setDragging] = useState(false)

  return (
    <article
      draggable
      onClick={onSelect}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/history-id", history.id)
        onDragStart()
        setDragging(true)
      }}
      onDragEnd={() => setDragging(false)}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
      }}
      onDrop={(event) => {
        event.preventDefault()
        onDrop()
      }}
      className={cn(
        "relative border border-border bg-card shadow-sm transition-all",
        compact ? "flex items-center gap-3 rounded-lg p-2.5" : "rounded-xl p-3 sm:p-4",
        dragging && "opacity-45 ring-2 ring-primary/50",
        "hover:border-primary/40 hover:shadow-md hover:shadow-black/20",
      )}
    >
      <div className="absolute -left-[2.15rem] top-5 flex size-5 items-center justify-center rounded-full border-2 border-primary bg-background">
        <span className="size-1.5 rounded-full bg-primary" />
      </div>
      <span className="absolute right-2 top-2 cursor-grab text-muted-foreground" aria-label={`Drag ${history.name} to reorder`}>
        <GripVertical className="size-4" />
      </span>
      <HistoryImage history={history} compact={compact} onImageChange={onImageChange} />
      <div className={cn("min-w-0", compact ? "pr-5" : "p-1 sm:p-2")}>
        <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
          {history.occurrence || `Position ${history.chronology + 1}`}{history.end ? ` – ${history.end}` : ""}
        </p>
        <h3 className={cn("font-serif font-medium tracking-tight text-foreground text-balance", compact ? "text-base" : "mt-1 text-xl")}>
          {history.name}
        </h3>
        {history.summary && (
          <p className={cn("text-muted-foreground text-pretty", compact ? "mt-0.5 line-clamp-1 text-xs" : "mt-2 text-sm leading-relaxed")}>
            {history.summary}
          </p>
        )}
      </div>
    </article>
  )
}

export function HistoryTimeline({ histories, compact, onCreate, onSelect }: HistoryTimelineProps) {
  const { updateHistory, reorderHistory } = useHistoryCanon()
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const ordered = useMemo(() => [...histories].sort((left, right) => left.chronology - right.chronology), [histories])
  const eraNames = useMemo(() => Object.fromEntries(histories.map((history) => [history.id, history.name])), [histories])
  const eras = useMemo(() => {
    const groups: { label: string; entries: CanonHistory[] }[] = []
    ordered.forEach((history) => {
      const label = (history.eraId ? eraNames[history.eraId] : history.era)?.trim() || "Unmarked Era"
      const current = groups[groups.length - 1]
      if (!current || current.label !== label) groups.push({ label, entries: [history] })
      else current.entries.push(history)
    })
    return groups
  }, [eraNames, ordered])

  if (ordered.length === 0) {
    return (
      <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
        <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
          <Clock3 className="size-5" />
        </span>
        <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No history yet</h2>
        <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          Create your first historical record to begin arranging the story of this world.
        </p>
        <button onClick={onCreate} className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40">
          <Plus className="size-4" />
          Create History Record
        </button>
      </section>
    )
  }

  return (
    <section className={cn("relative mt-6", compact ? "pl-9" : "pl-10 sm:pl-16")}>
      <div className="absolute bottom-3 left-[0.9rem] top-3 w-px bg-border sm:left-[1.9rem]" />
      {eras.map((era, eraIndex) => (
        <div key={`${era.label}-${eraIndex}`}>
          <EraLabel label={era.label} first={eraIndex === 0} />
          <div className={cn("relative mt-4", compact ? "space-y-2" : "space-y-4")}>
            {era.entries.map((history) => (
              <HistoryCard
                key={history.id}
                history={history}
                compact={compact}
                onDragStart={() => setDraggedId(history.id)}
                onSelect={() => onSelect(history.id)}
                onDrop={() => {
                  if (draggedId) reorderHistory(draggedId, history.id)
                  setDraggedId(null)
                }}
                onImageChange={(image) => updateHistory(history.id, { image: image || undefined })}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="mt-5 flex items-center justify-center">
        <button onClick={onCreate} className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40">
          <Plus className="size-4" />
          Add History Record
        </button>
      </div>
    </section>
  )
}
