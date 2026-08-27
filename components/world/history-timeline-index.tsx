"use client"

/**
 * History index, organized around TIME rather than as a generic card grid.
 *
 * Records are grouped under their Era/Period and laid out along a vertical
 * spine so the page reads as a lightweight historical workspace. Within an era
 * the author controls a deliberate sequence, which is the hook a future
 * Timeline system can build on.
 *
 * Scope: organization and presentation only. No chronology engine, no date
 * math, no arcs or relationships — those belong to the Timeline pass.
 */

import { useMemo } from "react"
import { ChevronDown, ChevronUp, Landmark, Plus } from "lucide-react"
import { groupHistoriesByEra, useHistoryCanon } from "@/lib/history-canon"

export function HistoryTimelineIndex({
  onCreate,
  onOpen,
}: {
  onCreate: () => void
  onOpen: (id: string) => void
}) {
  const { histories, moveHistory } = useHistoryCanon()

  const records = useMemo(() => Object.values(histories), [histories])
  const groups = useMemo(() => groupHistoriesByEra(records), [records])
  const eraCount = groups.filter((g) => !g.unplaced).length

  return (
    <>
      <section className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Canon Lore</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance">History</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {records.length} {records.length === 1 ? "record" : "records"}
            {eraCount > 0 && ` across ${eraCount} ${eraCount === 1 ? "era" : "eras"}`}. Records are grouped by their
            Era/Period and ordered within it. Select any record to open its History View.
          </p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.99]"
        >
          <Plus className="size-4" />
          Create History Record
        </button>
      </section>

      {records.length === 0 ? (
        <section className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
          <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
            <Landmark className="size-5" />
          </span>
          <h2 className="mt-4 font-serif text-lg font-medium tracking-tight text-foreground">No history records yet</h2>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
            History records will appear here, grouped under their era. Start with a single era, war, or turning point.
          </p>
          <button
            onClick={onCreate}
            className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card/60 hover:text-foreground active:scale-[0.99]"
          >
            <Plus className="size-4" />
            Create History Record
          </button>
        </section>
      ) : (
        <div className="mt-8 flex flex-col gap-10">
          {groups.map((group) => (
            <section key={group.era}>
              {/* ------------------------------ Era header ------------------------------ */}
              <div className="flex items-center gap-3">
                <span
                  className={
                    group.unplaced
                      ? "flex size-7 shrink-0 items-center justify-center rounded-md border border-dashed border-border bg-card text-muted-foreground"
                      : "flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"
                  }
                >
                  <Landmark className="size-3.5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    className={
                      group.unplaced
                        ? "font-serif text-lg font-medium tracking-tight text-muted-foreground text-balance"
                        : "font-serif text-xl font-medium tracking-tight text-foreground text-balance"
                    }
                  >
                    {group.era}
                  </h2>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {group.records.length} {group.records.length === 1 ? "record" : "records"}
                  </span>
                </div>
              </div>

              {group.unplaced && (
                <p className="ml-10 mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                  Add an Era/Period to these records to place them in time.
                </p>
              )}

              {/* --------------------- Records along the era's spine --------------------- */}
              <ol className="ml-3.5 mt-3 flex flex-col gap-3 border-l border-border pl-6">
                {group.records.map((record, i) => (
                  <li key={record.id} className="relative">
                    {/* Sequence node sitting on the spine. */}
                    <span className="absolute -left-9 top-4 flex size-6 items-center justify-center rounded-full border border-border bg-background text-[11px] font-medium tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>

                    <div className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                      <button
                        onClick={() => onOpen(record.id)}
                        className="min-w-0 flex-1 text-left active:scale-[0.99]"
                      >
                        <h3 className="font-serif text-lg font-medium tracking-tight text-foreground text-balance">
                          {record.name}
                        </h3>
                        {record.summary && (
                          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                            {record.summary}
                          </p>
                        )}
                        {record.description && (
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80 text-pretty">
                            {record.description}
                          </p>
                        )}
                      </button>

                      {/* Deliberate ordering within the era. */}
                      {group.records.length > 1 && (
                        <div className="flex shrink-0 flex-col">
                          <button
                            onClick={() => moveHistory(record.id, "up")}
                            disabled={i === 0}
                            aria-label={`Move ${record.name} earlier in ${group.era}`}
                            className="flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                          >
                            <ChevronUp className="size-4" />
                          </button>
                          <button
                            onClick={() => moveHistory(record.id, "down")}
                            disabled={i === group.records.length - 1}
                            aria-label={`Move ${record.name} later in ${group.era}`}
                            className="flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                          >
                            <ChevronDown className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </>
  )
}
