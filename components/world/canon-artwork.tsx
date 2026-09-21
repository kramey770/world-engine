"use client"

import { useEffect, useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageOff } from "lucide-react"
import { FantasyIcon } from "@/lib/fantasy-icons"
import { cn } from "@/lib/utils"
import { getFantasyIconName } from "@/lib/page-thumbnail"

export function CanonArtwork({ src, alt, className, ...props }: ImageProps) {
  const [hasError, setHasError] = useState(false)
  const iconName = getFantasyIconName(typeof src === "string" ? src : "")

  useEffect(() => {
    setHasError(false)
  }, [src])

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

  if (hasError) {
    return (
      <span
        role="img"
        aria-label={alt || "Image unavailable"}
        className={cn("flex items-center justify-center text-muted-foreground", props.fill && "absolute inset-0", className)}
      >
        <ImageOff className="size-8" aria-hidden="true" />
      </span>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      {...props}
      onError={(event) => {
        props.onError?.(event)
        setHasError(true)
      }}
    />
  )
}
