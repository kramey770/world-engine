import Image from "next/image"
import { cn } from "@/lib/utils"
import { WORLD_ENGINE_LOGO_URL } from "@/components/logo-loading-screen"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-8 overflow-hidden rounded-lg bg-slate-950 ring-1 ring-inset ring-primary/30", className)} aria-hidden="true">
      <Image src={WORLD_ENGINE_LOGO_URL} alt="" fill sizes="40px" className="object-cover object-[50%_38%]" />
      <span className="neon-dot absolute -right-0.5 -top-0.5 size-2 rounded-full ring-2 ring-background" />
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
