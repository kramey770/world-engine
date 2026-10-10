import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-inset ring-primary/25",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" strokeLinejoin="round" />
        <path d="M3 12h18" strokeLinecap="round" />
        <path d="M12 3c2.8 2.4 4.2 5.6 4.2 9s-1.4 6.6-4.2 9c-2.8-2.4-4.2-5.6-4.2-9S9.2 5.4 12 3Z" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function Wordmark({ subtitle = false }: { subtitle?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo />
      <div className="leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">World-Engine</span>
        {subtitle && (
          <span className="mt-0.5 block text-xs text-muted-foreground">Novel Assistant</span>
        )}
      </div>
    </div>
  )
}
