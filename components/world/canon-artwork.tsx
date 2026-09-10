"use client"

import Image, { type ImageProps } from "next/image"
import { FantasyIcon } from "@/lib/fantasy-icons"
import { cn } from "@/lib/utils"
import { getFantasyIconName } from "@/lib/page-thumbnail"

export function CanonArtwork({ src, alt, className, ...props }: ImageProps) {
  const iconName = getFantasyIconName(typeof src === "string" ? src : "")

  if (iconName) {
    return (
      <span
        role="img"
        aria-label={alt || undefined}
        className={cn("flex items-center justify-center", props.fill && "absolute inset-0", className)}
      >
        <FantasyIcon name={iconName} className="size-1/2 text-primary" aria-hidden="true" />
      </span>
    )
  }

  return <Image src={src} alt={alt} className={className} {...props} />
}
