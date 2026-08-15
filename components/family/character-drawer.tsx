"use client"

import Image from "next/image"
import { ArrowUpRight, Heart, Users, X } from "lucide-react"
import { houses, members, type FamilyMember } from "@/lib/family-data"
import { cn } from "@/lib/utils"

const HOUSE_TEXT: Record<string, string> = {
  ravenshollow: "text-primary",
  vale: "text-chart-2",
  duskwater: "text-chart-3",
}
const HOUSE_DOT: Record<string, string> = {
  ravenshollow: "bg-primary",
  vale: "bg-chart-2",
  duskwater: "bg-chart-3",
}

function RelationChip({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const m = members[id]
  if (!m) return null
  return (
    <button
      onClick={() => onSelect(id)}
      className="flex items-center gap-2 rounded-lg border border-border bg-card/60 p-1.5 pr-3 text-left transition-colors hover:border-primary/40 hover:bg-card"
    >
      <span className="relative size-8 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={m.portrait || "/placeholder.svg"} alt="" fill sizes="32px" className="object-cover" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-medium text-foreground">{m.name}</span>
        <span className="block truncate text-[11px] text-muted-foreground">{m.title}</span>
      </span>
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

export function CharacterDrawer({
  member,
  onClose,
  onSelect,
}: {
  member: FamilyMember | null
  onClose: () => void
  onSelect: (id: string) => void
}) {
  const open = Boolean(member)

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={member ? `Details for ${member.name}` : "Character details"}
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-sidebar shadow-2xl shadow-black/50 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {member && (
          <>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-medium text-muted-foreground">Character Profile</p>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close panel"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {/* Portrait hero */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
                <Image
                  src={member.portrait || "/placeholder.svg"}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="448px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">
                    {member.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{member.title}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 p-4">
                {/* House + life */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium",
                      HOUSE_TEXT[member.house],
                    )}
                  >
                    <span className={cn("size-1.5 rounded-full", HOUSE_DOT[member.house])} />
                    {houses[member.house].name}
                  </span>
                  {member.role && (
                    <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                      {member.role}
                    </span>
                  )}
                  {(member.born || member.died) && (
                    <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs tabular-nums text-muted-foreground">
                      {[member.born, member.died].filter(Boolean).join(" – ")}
                    </span>
                  )}
                </div>

                <Section title="Biography">
                  <p className="text-sm leading-relaxed text-foreground/90 text-pretty">{member.bio}</p>
                </Section>

                {member.parents && member.parents.length > 0 && (
                  <Section title="Parents">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {member.parents.map((id) => (
                        <RelationChip key={id} id={id} onSelect={onSelect} />
                      ))}
                    </div>
                  </Section>
                )}

                {member.spouseId && (
                  <Section title="Spouse">
                    <RelationChip id={member.spouseId} onSelect={onSelect} />
                  </Section>
                )}

                {member.childrenIds && member.childrenIds.length > 0 && (
                  <Section title="Children">
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {member.childrenIds.map((id) => (
                        <RelationChip key={id} id={id} onSelect={onSelect} />
                      ))}
                    </div>
                  </Section>
                )}

                {/* Connected Houses — future-facing placeholder */}
                <Section title="Connected Houses">
                  <div className="rounded-xl border border-dashed border-border bg-card/40 p-3">
                    <div className="flex flex-col gap-2">
                      {(member.connectedHouses ?? []).map((c) => (
                        <div
                          key={c.houseId}
                          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "flex size-8 items-center justify-center rounded-md bg-muted",
                                HOUSE_TEXT[c.houseId],
                              )}
                            >
                              <Users className="size-4" />
                            </span>
                            <div className="min-w-0">
                              <p className={cn("truncate text-xs font-medium", HOUSE_TEXT[c.houseId])}>
                                {houses[c.houseId].name}
                              </p>
                              <p className="truncate text-[11px] text-muted-foreground">{c.relation}</p>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <ArrowUpRight className="size-3.5" />
                            <span className="hidden sm:inline">Explore</span>
                          </span>
                        </div>
                      ))}
                      {(!member.connectedHouses || member.connectedHouses.length === 0) && (
                        <p className="px-1 py-2 text-xs text-muted-foreground">
                          No connected houses recorded yet.
                        </p>
                      )}
                      <p className="mt-1 flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground/80">
                        <Heart className="size-3" />
                        Navigating between linked houses is coming soon.
                      </p>
                    </div>
                  </div>
                </Section>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
