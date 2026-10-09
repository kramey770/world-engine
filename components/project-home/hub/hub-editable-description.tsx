"use client"

import { EditableProjectDescription } from "@/components/editable-project-description"
import { cn } from "@/lib/utils"

export function HubEditableDescription({
  boxId,
  defaultValue,
  className,
}: {
  boxId: string
  defaultValue: string
  className?: string
}) {
  return (
    <EditableProjectDescription
      collection={`project-hub-description:${boxId}`}
      defaultValue={defaultValue}
      className={cn("mt-2 text-xs leading-relaxed text-white/55", className)}
      editorClassName="border-white/20 bg-black/30 p-1 text-xs text-white/80 focus:border-white/50 focus:ring-white/30"
    />
  )
}
