"use client"

import { useRef, useState } from "react"
import { Bold, Heading1, Heading2, Italic, List, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const starter = `The gates of Emberhold rose out of the grey like the ribs of some long-dead beast. Sera had walked three days through the ash to reach them, and now, standing in their shadow, she felt smaller than she had expected.

She pressed a gloved hand to the cold iron. Somewhere beyond the wall, a bell began to toll — slow, uneven, as if the city itself were struggling to breathe.

"You came back," said a voice behind her. She did not turn. She already knew who it was.`

function tool(cmd: string, value?: string) {
  if (typeof document !== "undefined") {
    // Lightweight rich-text editing for the mock editor.
    document.execCommand(cmd, false, value)
  }
}

const tools = [
  { icon: Bold, label: "Bold", action: () => tool("bold") },
  { icon: Italic, label: "Italic", action: () => tool("italic") },
  { divider: true as const },
  { icon: Heading1, label: "Heading 1", action: () => tool("formatBlock", "H2") },
  { icon: Heading2, label: "Heading 2", action: () => tool("formatBlock", "H3") },
  { divider: true as const },
  { icon: Quote, label: "Quote", action: () => tool("formatBlock", "BLOCKQUOTE") },
  { icon: List, label: "Bullet list", action: () => tool("insertUnorderedList") },
]

export function Editor() {
  const [title, setTitle] = useState("Chapter One — The Gates of Emberhold")
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex h-full min-w-0 flex-col bg-background">
      {/* toolbar */}
      <div className="flex h-11 shrink-0 items-center gap-0.5 border-b border-border px-3">
        {tools.map((t, i) =>
          "divider" in t ? (
            <span key={i} className="mx-1 h-5 w-px bg-border" />
          ) : (
            <button
              key={t.label}
              type="button"
              title={t.label}
              aria-label={t.label}
              onMouseDown={(e) => {
                e.preventDefault()
                t.action()
              }}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-95"
            >
              <t.icon className="size-4" />
            </button>
          ),
        )}
        <span className="ml-auto text-xs text-muted-foreground">Saved · 1,204 words</span>
      </div>

      {/* document */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chapter Title"
            className="w-full bg-transparent font-serif text-3xl font-medium tracking-tight text-foreground placeholder:text-muted-foreground/50 outline-none sm:text-4xl"
          />
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>The Ashfall Chronicles</span>
            <span className="size-1 rounded-full bg-border" />
            <span>Draft</span>
          </div>

          <div
            ref={bodyRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck
            className={cn(
              "mt-8 min-h-[50vh] font-serif text-[1.05rem] leading-8 text-foreground/90 outline-none",
              "[&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground",
              "[&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
              "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
              "[&_ul]:list-disc [&_ul]:pl-6 [&_p]:mt-4",
            )}
          >
            {starter.split("\n\n").map((p, i) => (
              <p key={i} className={i === 0 ? "" : "mt-4"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
