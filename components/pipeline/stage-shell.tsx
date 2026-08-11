"use client"

import { useState } from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Shared layout for a pipeline stage: a fixed left rail beside a scrollable
 * editor on desktop, and a collapsible drawer + toggle on mobile.
 *
 * Pass the rail's inner content (header + list) as `rail`; the shell provides
 * the <aside> wrapper. The editor content goes in `children`.
 */
export function StageShell({
  rail,
  railLabel = "Browse",
  children,
}: {
  rail: React.ReactNode
  railLabel?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  // On mobile, collapse the drawer after the user picks (or creates) an item.
  function handleRailClick(e: React.MouseEvent) {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return
    if ((e.target as HTMLElement).closest("button")) setOpen(false)
  }

  return (
    <div className="relative flex min-h-0 flex-1">
      {/* Left rail — fixed on desktop, drawer on mobile */}
      <aside
        onClick={handleRailClick}
        className={cn(
          "z-40 flex w-64 shrink-0 flex-col border-r border-border bg-sidebar",
          "max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:w-72 max-lg:shadow-2xl max-lg:transition-transform",
          open ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        {rail}
      </aside>

      {/* Scrim behind the mobile drawer */}
      {open && (
        <div
          className="absolute inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Editor column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground active:scale-95"
          >
            <PanelLeft className="size-4" />
            {railLabel}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
