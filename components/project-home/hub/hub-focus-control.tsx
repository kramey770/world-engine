import { Focus, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import type { HubFocusMode } from "./hub-types"
import { cn } from "@/lib/utils"

export function HubFocusControl({
  options,
  onChange,
}: {
  options: { id: string; label: string; mode: HubFocusMode }[]
  onChange?: (id: string) => void
}) {
  const [selected, setSelected] = useState(options[0]?.id ?? "recent")
  const current = options.find((option) => option.id === selected) ?? options[0]

  function select(id: string) {
    setSelected(id)
    onChange?.(id)
  }

  return (
    <div className="relative z-20 flex items-center gap-3 self-start rounded-full border border-white/10 bg-[#111a20]/90 px-3 py-2 text-white shadow-xl shadow-black/20 backdrop-blur-md">
      <Focus className="size-3.5 text-sky-200" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Focus</span>
      <label className="relative flex items-center gap-1.5 text-xs font-medium">
        <span className="sr-only">Hub focus</span>
        <select
          value={current?.id}
          onChange={(event) => select(event.target.value)}
          className="appearance-none bg-transparent pr-5 text-white outline-none"
        >
          {options.map((option) => <option key={option.id} value={option.id} className="bg-[#111a20] text-white">{option.label}</option>)}
        </select>
        <SlidersHorizontal className={cn("pointer-events-none absolute right-0 size-3 text-white/45", current?.mode === "storyline" && "text-amber-200")} />
      </label>
    </div>
  )
}