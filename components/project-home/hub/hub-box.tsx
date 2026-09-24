import type { KeyboardEvent, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HubBoxDefinition } from "./hub-types"

const variants = {
  ink: "bg-[#10171d] text-white shadow-[0_24px_70px_rgba(2,8,12,.3)]",
  paper: "bg-[#d7d2c4] text-[#182127] shadow-[0_18px_55px_rgba(2,8,12,.2)]",
  map: "bg-[#10252a] text-white shadow-[0_18px_55px_rgba(2,8,12,.25)]",
  crest: "bg-[#14221f] text-white shadow-[0_18px_55px_rgba(2,8,12,.28)]",
  signal: "bg-[#16202a] text-white shadow-[0_18px_55px_rgba(2,8,12,.25)]",
  type: "bg-[#0d1217] text-white shadow-[0_18px_55px_rgba(2,8,12,.24)]",
} as const

export function HubBox({
  definition,
  onOpen,
  children,
}: {
  definition: HubBoxDefinition
  onOpen?: () => void
  children: ReactNode
}) {
  const interactiveProps = onOpen
    ? {
        onClick: onOpen,
        onKeyDown: (event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onOpen()
          }
        },
        role: "button" as const,
        tabIndex: 0,
      }
    : {}

  return (
    <div
      {...interactiveProps}
      data-hub-box={definition.id}
      data-hub-studio={definition.studio}
      className={cn(
        "project-hub-box group relative overflow-hidden rounded-[1.25rem] border border-white/10 text-left transition-[border-color,box-shadow,opacity] duration-500 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200/70",
        "[&>div[data-hub-content]]:relative [&>div[data-hub-content]]:z-[1]",
        variants[definition.variant],
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute -right-16 -top-20 size-48 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -left-10 size-52 rounded-full border border-white/5" />
      </div>
      <div data-hub-content className="flex h-full min-h-inherit flex-col p-5 sm:p-6">
        {children}
      </div>
      {onOpen && <ArrowUpRight className="absolute bottom-5 right-5 z-[2] size-4 opacity-40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />}
    </div>
  )
}