"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useCharacterCanon } from "@/lib/character-canon"
import { CharacterCanonRecord } from "@/components/family/character-canon-record"
import { cn } from "@/lib/utils"

/**
 * CharacterDrawer — the Family Tree's quick-look for a Character Canon record.
 * It is only chrome (scrim + sliding panel + header); the record body, edit
 * form, and save logic all live in the shared CharacterCanonRecord, so the
 * drawer and the standalone Character Canon Page stay perfectly in sync.
 */
export function CharacterDrawer({
  memberId,
  onClose,
  onSelect,
}: {
  memberId: string | null
  onClose: () => void
  onSelect: (id: string) => void
}) {
  const { getCharacter } = useCharacterCanon()
  const member = getCharacter(memberId)
  const open = Boolean(memberId)

  const [mode, setMode] = useState<"view" | "edit">("view")

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
        aria-label={member ? `Canon record for ${member.name}` : "Character record"}
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-sidebar shadow-2xl shadow-black/50 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {member && (
          <>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-medium text-muted-foreground">
                {mode === "edit" ? "Editing Canon Record" : "Character Canon"}
              </p>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close panel"
              >
                <X className="size-4" />
              </button>
            </div>

            <CharacterCanonRecord
              memberId={memberId}
              onSelect={onSelect}
              onModeChange={setMode}
              className="min-h-0 flex-1"
            />
          </>
        )}
      </aside>
    </>
  )
}
