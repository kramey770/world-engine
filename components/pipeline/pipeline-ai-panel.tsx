"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUp, Sparkles } from "lucide-react"
import type { ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

/** Role-specific quick actions + canned replies so the AI panel adapts per stage. */
const ROLE_CONFIG: Record<
  string,
  { intro: string; actions: string[]; replies: string[] }
> = {
  "Scene Writer": {
    intro:
      "I'm your Scene Writer. Give me the beat's intent, setting, and POV and I'll draft prose you can shape.",
    actions: ["Draft this beat", "Describe the setting", "Suggest a hook"],
    replies: [
      "Here's a pass at the beat: lean into the sensory detail of the ash and let Sera's dread build in the silence before the bell.",
      "Consider opening on motion — Sera's hand on the iron — then widen to the scale of the gates. It grounds the reader before the awe.",
      "A hook to try: end the beat on the unseen voice so the reader turns the page needing to know who it is.",
    ],
  },
  "Developmental Editor": {
    intro:
      "I'm your Developmental Editor. I look at structure, pacing, and whether each beat earns its place in the chapter.",
    actions: ["Assess structure", "Check pacing", "Flag plot gaps"],
    replies: [
      "Structurally the chapter is sound: arrival → recognition → obligation. Consider tightening the transition between the two beats so the bell lands harder.",
      "Pacing note: the first beat lingers; the second accelerates. That contrast works, but give the reader one more anchor before Corin speaks.",
      "Plot gap: Sera's reason for returning is implied but never stated. A single line of interiority would pay this off in later drafts.",
    ],
  },
  "Line Editor": {
    intro:
      "I'm your Line Editor. I sharpen sentences, rhythm, and word choice while keeping your voice intact.",
    actions: ["Tighten prose", "Vary sentence rhythm", "Strengthen verbs"],
    replies: [
      "Line pass: \"rose out of the grey like the ribs of some long-dead beast\" is strong — keep it. Trim \"and now, standing in their shadow\" to quicken the beat.",
      "Rhythm: three medium sentences in a row flatten the tension. Break one short — \"She waited.\" — to let the toll of the bell breathe.",
      "Swap \"felt smaller than she had expected\" for something active; let her body register the scale rather than her measuring it.",
    ],
  },
  "Copy Editor": {
    intro:
      "I'm your Copy Editor. I check grammar, consistency, punctuation, and continuity of names and facts.",
    actions: ["Check consistency", "Fix punctuation", "Verify continuity"],
    replies: [
      "Consistency: \"Emberhold\" is capitalized throughout — good. Ensure \"Grey Reach\" uses the British spelling everywhere to match the world bible.",
      "Punctuation: the dialogue dash before \"You came back\" should be an em dash, and close the quote before the attribution.",
      "Continuity: three days of travel is stated here; confirm it matches the timeline entry for Sera's crossing before final.",
    ],
  },
  Proofreader: {
    intro:
      "I'm your Proofreader. Final polish — typos, spacing, and stray marks before this chapter is locked.",
    actions: ["Scan for typos", "Check spacing", "Final read-through"],
    replies: [
      "Clean read. One double space after the scene break — collapse it to a single blank line.",
      "No typos flagged. \"toll\" and \"tolled\" are both correct in context; tense is consistent.",
      "Final read-through complete. This chapter is ready to lock as canon.",
    ],
  },
}

export function PipelineAIPanel({ role }: { role: string }) {
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG["Scene Writer"]
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset the conversation whenever the editorial role changes (i.e. a new stage).
  useEffect(() => {
    setMessages([{ id: "intro", role: "assistant", content: config.intro }])
  }, [config.intro])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, thinking])

  const replies = useMemo(() => config.replies, [config.replies])

  function send(text: string) {
    const content = text.trim()
    if (!content || thinking) return
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content }])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)]
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: reply }])
      setThinking(false)
    }, 800)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="size-3.5" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-foreground">AI Co-Writer</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
          {role}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-3">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {thinking && (
          <div className="flex items-center gap-1.5 pl-1 text-muted-foreground">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {config.actions.map((a) => (
            <button
              key={a}
              onClick={() => send(a)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground active:scale-95"
            >
              {a}
            </button>
          ))}
        </div>

        <div className="relative rounded-xl border border-border bg-background/60 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder={`Ask the ${role} for feedback...`}
            className="max-h-32 w-full resize-none bg-transparent px-3 py-2.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-40"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
