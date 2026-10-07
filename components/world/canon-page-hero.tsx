"use client"

import type { LucideIcon } from "lucide-react"
import { CanonArtwork } from "@/components/world/canon-artwork"
import { CanonImageField } from "@/components/world/canon-image-field"
import { resolvePageThumbnail, usePageThumbnail } from "@/lib/page-thumbnail"

export function CanonPageHero({ title, pageId, icon: Icon }: { title: string; pageId: string; icon: LucideIcon }) {
  const { getPageThumbnail, setPageThumbnail, applyCover, removeCover } = usePageThumbnail()
  const image = resolvePageThumbnail(getPageThumbnail(pageId))
  const titleScale = Math.min(14, 140 / Math.max(1, Array.from(title).length))

  return (
    <>
      <div className="relative mt-5 flex aspect-[4/1] min-h-32 [container-type:inline-size] items-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-card">
        {image ? (
          <CanonArtwork src={image} alt={`${title} artwork`} fill sizes="1024px" className="object-cover" />
        ) : (
          <Icon className="ml-6 size-12 text-primary/40" />
        )}
        <span className="absolute left-4 top-4 z-[2] rounded-md border border-sky-300/40 bg-sky-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md sm:left-6 sm:top-5">
          Canon Lore
        </span>
        <div className="absolute inset-0 z-[1] grid place-items-center bg-black/15 px-3 pt-8 text-center sm:px-5">
          <h1
            className="canon-page-banner-title max-w-full font-normal leading-none tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            style={{ fontSize: `clamp(0.8rem, ${titleScale.toFixed(2)}cqw, min(8rem, 10vw))` }}
          >
            {title}
          </h1>
        </div>
        <CanonImageField
          value={image}
          label={`Import ${title.toLowerCase()} artwork`}
          imageType="cover"
          compactCoverControls
          onChange={(nextImage) =>
            setPageThumbnail(pageId, { source: nextImage ? "uploaded" : "none", value: nextImage || undefined })
          }
          onBuiltInChange={(assetId) => setPageThumbnail(pageId, { source: "builtin", value: assetId })}
          onCoverApply={(assetId, scope) => applyCover(`page:${pageId}`, resolvePageThumbnail({ source: "builtin", value: assetId }), scope)}
          onCoverRemove={(scope) => removeCover(`page:${pageId}`, scope)}
          coverBranchLabel={title}
        />
      </div>
      <div className="mx-auto mt-4 flex max-w-4xl flex-col items-center text-center">
        <span aria-hidden="true" className="h-px w-16 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
        <h2 className="mt-3 font-serif text-2xl font-medium tracking-wide text-foreground text-balance sm:text-3xl">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-2 flex items-center gap-2">
          <span className="h-px w-8 bg-border" />
          <span className="size-1 rotate-45 bg-primary/70" />
          <span className="h-px w-8 bg-border" />
        </span>
      </div>
    </>
  )
}
