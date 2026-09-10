"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowLeft, ImagePlus, Library, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { BUILT_IN_ICON_IMAGES, BUILT_IN_THUMBNAILS, resolveBuiltInAsset, type BuiltInThumbnail } from "@/lib/page-thumbnail"
import { FantasyIcon } from "@/lib/fantasy-icons"

const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function CanonImageField({
  value,
  onChange,
  label = "Import image",
  className,
  onClick,
  onBuiltInChange,
  onCoverApply,
  onCoverRemove,
  coverBranchLabel = "this section",
  placement = "overlay",
  imageType = "icon",
}: {
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onBuiltInChange?: (assetId: string) => void
  onCoverApply?: (assetId: string, scope: "all" | "branch" | "current") => void
  onCoverRemove?: (scope: "all" | "branch" | "current") => void
  coverBranchLabel?: string
  placement?: "overlay" | "corner"
  imageType?: "icon" | "cover"
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [pendingCoverAsset, setPendingCoverAsset] = useState<string | null>(null)
  const library = imageType === "cover" ? BUILT_IN_THUMBNAILS : BUILT_IN_ICON_IMAGES

  useEffect(() => {
    if (!isPickerOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPickerOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPickerOpen])

  function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.")
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Images must be 5 MB or smaller.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setError("")
        onChange(reader.result)
        setIsPickerOpen(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={cn("absolute inset-0", className)} onClick={onClick}>
      <button
        type="button"
        onClick={() => {
          setShowLibrary(false)
          setIsPickerOpen(true)
        }}
        className={cn(placement === "corner" ? "absolute right-2 top-2 z-30 rounded-md bg-background/85 p-2 opacity-0 shadow-sm transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100" : "absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-background/65 text-sm font-medium text-foreground opacity-0 backdrop-blur-[1px] transition-opacity hover:opacity-100 focus-visible:opacity-100")}
        aria-label={label}
      >
        {value ? <Upload className={placement === "corner" ? "size-4" : "size-6"} /> : <ImagePlus className={placement === "corner" ? "size-4" : "size-8"} />}
        {placement === "overlay" && <span>{value ? "Replace image or icon" : "Import image or icon"}</span>}
      </button>
      {value && (onCoverRemove ? (
        <div className="absolute bottom-3 right-3 z-40 flex flex-wrap justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          {(["current", "branch", "all"] as const).map((scope) => <button key={scope} type="button" onClick={() => onCoverRemove(scope)} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-background/85 px-2.5 text-xs font-medium text-foreground shadow-sm hover:bg-background"><X className="size-3.5" />{scope === "current" ? "Remove" : scope === "branch" ? `Remove ${coverBranchLabel}` : "Remove all"}</button>)}
        </div>
      ) : placement === "overlay" ? (
        <button type="button" onClick={() => { onChange(""); setError("") }} className="absolute bottom-3 right-3 z-40 inline-flex h-8 items-center gap-1.5 rounded-md bg-background/85 px-2.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"><X className="size-3.5" />Remove</button>
      ) : null)}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.target.value = ""
        }}
      />
      {error && <p className="absolute bottom-3 left-3 z-40 rounded bg-background/90 px-2 py-1 text-xs text-destructive">{error}</p>}
      {isPickerOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={() => setIsPickerOpen(false)}>
          <div className="max-h-[min(720px,90vh)] w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Choose {imageType === "cover" ? "cover art" : "an image"}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Upload a file or choose from your {imageType === "cover" ? "cover art" : "image"} library.</p>
              </div>
              <button type="button" onClick={() => setIsPickerOpen(false)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close image picker"><X className="size-4" /></button>
            </div>
            {!showLibrary ? (
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-5 text-center hover:border-primary/60 hover:bg-muted/50">
                  <Upload className="size-7 text-primary" />
                  <span className="text-sm font-medium text-foreground">Upload from device</span>
                  <span className="text-xs text-muted-foreground">Choose an image from your personal files</span>
                </button>
                <button type="button" onClick={() => setShowLibrary(true)} className="flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border border-border p-5 text-center hover:border-primary/60 hover:bg-muted/50">
                  <Library className="size-7 text-primary" />
                  <span className="text-sm font-medium text-foreground">Library</span>
                  <span className="text-xs text-muted-foreground">Use a preexisting image from this app</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 border-b border-border px-5 py-3"><button type="button" onClick={() => setShowLibrary(false)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Back to image sources"><ArrowLeft className="size-4" /></button><span className="text-sm font-medium text-foreground">{imageType === "cover" ? "Cover art library" : "Icons and images library"}</span></div>
                <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto p-5 sm:grid-cols-4">
                  {library.map((asset: BuiltInThumbnail) => <button key={asset.id} type="button" aria-label={`Select ${imageType === "cover" ? "cover art" : "character or icon"} ${asset.label}`} onClick={() => { if (imageType === "cover" && onCoverApply) setPendingCoverAsset(asset.id); else { onBuiltInChange ? onBuiltInChange(asset.id) : onChange(resolveBuiltInAsset(asset)); setIsPickerOpen(false) } }} className="group overflow-hidden rounded-lg border border-border text-left hover:border-primary/70"><span className={cn("relative flex items-center justify-center bg-muted", imageType === "cover" ? "aspect-[4/1]" : "aspect-square")}>{asset.iconName ? <FantasyIcon name={asset.iconName} className="size-1/2 text-primary" aria-hidden="true" /> : <img src={asset.src} alt="" className="size-full object-cover" />}</span></button>)}
                </div>
              </div>
            )}
            {pendingCoverAsset && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-card/95 p-5">
                <div className="w-full max-w-md">
                  <h3 className="text-base font-semibold text-foreground">Apply this cover art</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Choose where this cover should appear.</p>
                  <div className="mt-5 grid gap-2">
                    {(["current", "branch", "all"] as const).map((scope) => <button key={scope} type="button" onClick={() => { onCoverApply?.(pendingCoverAsset, scope); setPendingCoverAsset(null); setIsPickerOpen(false) }} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-left hover:border-primary/60 hover:bg-muted/50"><span><span className="block text-sm font-medium text-foreground">{scope === "current" ? `Apply only here` : scope === "branch" ? `Apply to ${coverBranchLabel}` : "Apply to All"}</span><span className="block text-xs text-muted-foreground">{scope === "current" ? "Change only the page or record you opened" : scope === "branch" ? `Change every cover in ${coverBranchLabel}` : "Change every saved cover in the app"}</span></span><ArrowLeft className="size-4 rotate-180 text-muted-foreground" /></button>)}
                  </div>
                  <button type="button" onClick={() => setPendingCoverAsset(null)} className="mt-4 text-xs text-muted-foreground hover:text-foreground">Back to library</button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
