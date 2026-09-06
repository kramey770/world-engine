"use client"

import { useRef, useState } from "react"
import { ImagePlus, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { BUILT_IN_THUMBNAILS } from "@/lib/page-thumbnail"

const MAX_IMAGE_BYTES = 5 * 1024 * 1024

export function CanonImageField({
  value,
  onChange,
  label = "Import image",
  className,
  onClick,
  onBuiltInChange,
  placement = "overlay",
}: {
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
  onClick?: (event: React.MouseEvent) => void
  onBuiltInChange?: (assetId: string) => void
  placement?: "overlay" | "corner"
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

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
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className={cn("absolute inset-0", className)} onClick={onClick}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(placement === "corner" ? "absolute right-2 top-2 z-30 rounded-md bg-background/85 p-2 opacity-0 shadow-sm transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100" : "absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-background/65 text-sm font-medium text-foreground opacity-0 backdrop-blur-[1px] transition-opacity hover:opacity-100 focus-visible:opacity-100")}
        aria-label={label}
      >
        {value ? <Upload className={placement === "corner" ? "size-4" : "size-6"} /> : <ImagePlus className={placement === "corner" ? "size-4" : "size-8"} />}
        {placement === "overlay" && <span>{value ? "Replace image or icon" : "Import image or icon"}</span>}
      </button>
      {BUILT_IN_THUMBNAILS.length === 0 ? (
        <button
          type="button"
          disabled
          title="Built-in artwork is not available yet"
          className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-md bg-background/85 px-2.5 py-1.5 text-xs font-medium text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 disabled:cursor-not-allowed"
        >
          Choose built-in
        </button>
      ) : (
        <select
          aria-label="Choose built-in artwork"
          defaultValue=""
          onChange={(event) => onBuiltInChange?.(event.target.value)}
          className="absolute bottom-3 left-1/2 z-40 -translate-x-1/2 rounded-md bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <option value="" disabled>Choose built-in</option>
          {BUILT_IN_THUMBNAILS.map((asset) => <option key={asset.id} value={asset.id}>{asset.label}</option>)}
        </select>
      )}
      {value && placement === "overlay" && (
        <button
          type="button"
          onClick={() => {
            onChange("")
            setError("")
          }}
          className="absolute bottom-3 right-3 z-40 inline-flex h-8 items-center gap-1.5 rounded-md bg-background/85 px-2.5 text-xs font-medium text-foreground opacity-0 shadow-sm transition-opacity hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"
        >
          <X className="size-3.5" />
          Remove
        </button>
      )}
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
    </div>
  )
}
