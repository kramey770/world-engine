"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronLeft, PanelLeft, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import type { Project } from "@/lib/mock-data"

const timelines = ["Main Timeline", "Draft Branch: The Waking", "What-If: Corin Lives"]

export function TopBar({
  project,
  onBack,
  onToggleSidebar,
}: {
  project: Project
  onBack: () => void
  onToggleSidebar: () => void
}) {
  const [timeline, setTimeline] = useState(timelines[0])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        >
          <PanelLeft className="size-4" />
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Projects</span>
        </button>
        <span className="hidden h-4 w-px bg-border sm:block" />
        <div className="hidden min-w-0 items-center gap-2 sm:flex">
          <Logo className="size-6 rounded-md [&_svg]:size-4" />
          <span className="truncate text-sm font-medium text-foreground">{project.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            <span className="max-w-[9rem] truncate">{timeline}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          {open && (
            <div className="absolute right-0 top-9 z-50 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl shadow-black/30">
              {timelines.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTimeline(t)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-accent ${
                    t === timeline ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t}
                  {t === timeline && <span className="size-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 md:inline-flex">
          <ShieldCheck className="size-3.5" />
          Canon Stable
        </span>

        <UserMenu />
      </div>
    </header>
  )
}
