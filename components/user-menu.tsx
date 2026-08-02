"use client"

import { useEffect, useRef, useState } from "react"
import { LogOut, Settings, User } from "lucide-react"

export function UserMenu({ onSignOut }: { onSignOut?: () => void }) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground ring-1 ring-inset ring-border transition-colors hover:bg-accent"
      >
        EA
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-52 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-xl shadow-black/30">
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium ring-1 ring-inset ring-border">
              EA
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Elena Ashe</p>
              <p className="text-xs text-muted-foreground">elena@worldengine.app</p>
            </div>
          </div>
          <div className="my-1 h-px bg-border" />
          <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent">
            <User className="size-4 text-muted-foreground" />
            Profile
          </button>
          <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent">
            <Settings className="size-4 text-muted-foreground" />
            Settings
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="size-4 text-muted-foreground" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
