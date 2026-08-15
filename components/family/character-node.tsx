"use client"

import Image from "next/image"
import { Crown } from "lucide-react"
import { houses, type FamilyMember } from "@/lib/family-data"
import { cn } from "@/lib/utils"

const HOUSE_ACCENT: Record<string, { bar: string; ring: string; text: string }> = {
  ravenshollow: { bar: "bg-primary", ring: "ring-primary/50", text: "text-primary" },
  vale: { bar: "bg-chart-2", ring: "ring-chart-2/50", text: "text-chart-2" },
  duskwater: { bar: "bg-chart-3", ring: "ring-chart-3/50", text: "text-chart-3" },
}

export function CharacterNode({
  member,
  selected,
  showDates,
  onSelect,
}: {
  member: FamilyMember
  selected: boolean
  showDates: boolean
  onSelect: (id: string) => void
}) {
  const accent = HOUSE_ACCENT[member.birthHouse]
  const marriedIn = member.birthHouse !== member.house
  const birthHouse = houses[member.birthHouse]
  const isHead = member.role === "Current Head"

  const lifespan = [member.born, member.died].filter(Boolean).join(" – ")

  return (
    <button
      id={`node-${member.id}`}
      onClick={() => onSelect(member.id)}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-[168px] flex-col overflow-hidden rounded-xl border bg-card text-left shadow-md shadow-black/30 transition-all duration-200 sm:w-[188px]",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 active:scale-[0.99]",
        selected
          ? cn("border-transparent ring-2", accent.ring)
          : "border-border hover:border-muted-foreground/30",
      )}
    >
      {/* House accent bar */}
      <span className={cn("h-1 w-full", accent.bar)} aria-hidden="true" />

      {/* Portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={member.portrait || "/placeholder.svg"}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="188px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" aria-hidden="true" />

        {isHead && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-primary ring-1 ring-inset ring-primary/30 backdrop-blur-sm">
            <Crown className="size-3" />
            Head
          </span>
        )}
      </div>

      {/* Identity */}
      <div className="flex flex-col gap-1 px-3 pb-3 pt-2">
        <p className="truncate font-serif text-[15px] font-medium leading-tight tracking-tight text-foreground">
          {member.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{member.title}</p>

        <div className="mt-1 flex items-center gap-1.5">
          <span className={cn("size-1.5 shrink-0 rounded-full", accent.bar)} aria-hidden="true" />
          <span className={cn("truncate text-[11px] font-medium", accent.text)}>{birthHouse.name}</span>
        </div>

        {marriedIn && (
          <span className="mt-0.5 w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
            Married into house
          </span>
        )}

        {showDates && lifespan && (
          <p className="mt-1 text-[11px] tabular-nums text-muted-foreground/80">{lifespan}</p>
        )}
      </div>
    </button>
  )
}
