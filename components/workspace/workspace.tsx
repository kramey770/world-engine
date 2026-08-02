"use client"

import { useState } from "react"
import { TopBar } from "@/components/workspace/top-bar"
import { WorldExplorer } from "@/components/workspace/world-explorer"
import { ContextPanel } from "@/components/workspace/context-panel"
import { Editor } from "@/components/workspace/editor"
import { AICoWriter } from "@/components/workspace/ai-cowriter"
import { WorldDetail } from "@/components/workspace/world-detail"
import { cn } from "@/lib/utils"
import type { Entity, Project } from "@/lib/mock-data"

export function Workspace({ project, onBack }: { project: Project; onBack: () => void }) {
  const [selected, setSelected] = useState<Entity | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(true)

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar project={project} onBack={onBack} onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1">
        {/* Left: World Explorer + Active Context */}
        <aside
          className={cn(
            "z-40 flex w-72 shrink-0 flex-col border-r border-border bg-sidebar",
            "max-lg:absolute max-lg:inset-y-0 max-lg:top-14 max-lg:shadow-2xl max-lg:transition-transform",
            sidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          )}
        >
          <div className="min-h-0 flex-1 overflow-hidden">
            <WorldExplorer
              selectedId={selected?.id ?? null}
              onSelect={(e) => {
                setSelected(e)
                setSidebarOpen(false)
              }}
            />
          </div>
          <ContextPanel selected={selected} />
        </aside>

        {sidebarOpen && (
          <div
            className="absolute inset-0 top-14 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Center: Editor + World Detail */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-hidden">
            <Editor />
          </div>
          <WorldDetail selected={selected} open={detailOpen} onToggle={() => setDetailOpen((v) => !v)} />
        </div>

        {/* Right: AI Co-Writer */}
        <aside className="hidden w-[320px] shrink-0 border-l border-border bg-sidebar lg:flex lg:flex-col xl:w-[360px]">
          <AICoWriter />
        </aside>
      </div>
    </div>
  )
}
