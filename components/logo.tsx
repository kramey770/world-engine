import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("flex size-8 items-center justify-center", className)}
      aria-hidden="true"
    >
      <picture className="size-full">
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet="/world-engine-logo-static.png"
        />
        <Image
          src="/world-engine-logo-animated.gif"
          alt=""
          width={320}
          height={240}
          unoptimized
          draggable={false}
          className="size-full object-contain mix-blend-screen"
        />
      </picture>
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
