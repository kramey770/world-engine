"use client"

import { BookOpen, ChevronRight } from "lucide-react"
import type { HubBoxDefinition, HubMockRecord } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function ChapterReader({ definition, chapter, onOpen }: { definition: HubBoxDefinition; chapter: HubMockRecord; onOpen?: () => void }) {
  const passages = (chapter.body ?? chapter.detail ?? chapter.summary).split("\n\n")
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(passages.length, 14000)

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <article className="flex h-full min-h-[270px] flex-col overflow-hidden text-[#1d2930]" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <header className="flex items-start justify-between border-b border-[#1d2930]/15 pb-4">
          <div>
            <p className="hub-kicker text-[#426477]">{definition.eyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl leading-none text-[#172127]">{chapter.title}</h2>
            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#5c6d75]">{chapter.metadata?.join(" · ")}</p>
          </div>
          <BookOpen className="size-5 text-[#426477]" />
        </header>

        <div className="relative mt-4 flex-1 overflow-hidden rounded-[0.9rem] border border-[#1d2930]/10 bg-white/30 px-3 py-3">
          <div className="transition-transform duration-[1800ms] ease-out" style={{ transform: `translateY(-${index * 7}px)` }}>
            <p className="font-serif text-base leading-[1.65] text-[#263940]">{passages[index] ?? "No chapters yet. The reading surface is ready when the project has manuscript content."}</p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#d7d2c4] to-transparent" />
        </div>

        <footer className="flex items-center justify-between border-t border-[#1d2930]/15 pt-3 text-[10px] uppercase tracking-[0.14em] text-[#61747a]">
          <span>Passage {index + 1} / {passages.length}</span>
          <span className="flex items-center gap-1">Reading draft <ChevronRight className="size-3" /></span>
        </footer>
      </article>
    </HubBox>
  )
}