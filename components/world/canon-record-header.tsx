"use client"

import Image from "next/image"
import { ImageOff } from "lucide-react"
import { CanonImageField } from "@/components/world/canon-image-field"
import { resolvePageThumbnail, usePageThumbnail } from "@/lib/page-thumbnail"
import { cn } from "@/lib/utils"

export function CanonRecordHeader({
  recordId,
  title,
  summary,
  identityImage,
  identityAlt,
  identityFallback,
  onIdentityChange,
  editable = true,
  className,
}: {
  recordId: string
  title: string
  summary?: string
  identityImage: string
  identityAlt: string
  identityFallback: React.ReactNode
  onIdentityChange: (value: string) => void
  editable?: boolean
  className?: string
}) {
  const { getRecordCover, setRecordCover } = usePageThumbnail()
  const cover = getRecordCover(recordId)

  return (
    <div className={cn("relative", className)}>
      <div className="group relative aspect-[4/1] min-h-32 w-full overflow-hidden bg-gradient-to-br from-muted to-card">
        {cover ? <Image src={cover} alt={`${title} cover art`} fill sizes="672px" className="object-cover" /> : <div className="size-full bg-gradient-to-br from-muted to-card" />}
        {editable && <CanonImageField value={cover} label={`Change ${title} cover art`} placement="corner" onChange={(value) => setRecordCover(recordId, value)} onBuiltInChange={(assetId) => setRecordCover(recordId, resolvePageThumbnail({ source: "builtin", value: assetId }))} />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>
      <div className="relative flex items-end gap-4 px-4 pb-4">
        <div className="group relative -mt-10 size-24 shrink-0 overflow-hidden rounded-xl border-4 border-sidebar bg-muted shadow-md sm:size-28">
          {identityImage ? <Image src={identityImage} alt={identityAlt} fill sizes="112px" className="object-cover object-top" /> : <div className="flex size-full items-center justify-center text-muted-foreground">{identityFallback ?? <ImageOff className="size-7" />}</div>}
          {editable && <CanonImageField value={identityImage} label={`Change ${title} identity image`} placement="corner" onChange={onIdentityChange} onBuiltInChange={(assetId) => onIdentityChange(resolvePageThumbnail({ source: "builtin", value: assetId }))} />}
        </div>
        <div className="min-w-0 pb-1">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground text-balance">{title}</h2>
          {summary && <p className="mt-0.5 text-sm text-muted-foreground">{summary}</p>}
        </div>
      </div>
    </div>
  )
}