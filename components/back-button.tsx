import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

export function BackButton({
  children = "Back",
  onClick,
  ariaLabel,
}: {
  children?: ReactNode
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={!onClick}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-600 bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-red-500 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ArrowLeft className="size-4" />
      {children}
    </button>
  )
}
