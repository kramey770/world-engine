"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowUp, Maximize2, PenLine, Sparkles, Wand2 } from "lucide-react"
import { initialChat, type ChatMessage } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const quickActions = [
  { icon: PenLine, label: "Continue Scene" },
  { icon: Wand2, label: "Rewrite Selection" },
  { icon: Maximize2, label: "Expand Description" },
]

const cannedReplies = [
  "Sera hesitated at the threshold. The bell's toll seemed to pull the ash from the air, drawing it toward the gate in slow spirals. She thought of Corin's warning and, for the first time since the Long Winter, felt the weight of the oath she had not yet sworn.",
  "Here's a tighter version: The gates loomed — iron ribs of a dead god. Three days of ash had brought her here, and still she felt too small to pass through.",
  "The wall stretched higher than any Sera had seen, its stone veined with old fire-glass that caught what little light bled through the ashen sky. Banners, long bleached to grey, hung limp along the ramparts.",
]

export function AICoWriter() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, thinking])

  function send(text: string) {
    const content = text.trim()
    if (!content || thinking) return
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content }])
    setInput("")
    setThinking(true)
    setTimeout(() => {
      const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)]
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: reply }])
      setThinking(false)
    }, 900)
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
        <span className="text-sm font-semibold text-foreground">AI Co-Writer</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Context-aware
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
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => send(a.label)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-foreground active:scale-95"
            >
              <a.icon className="size-3.5" />
              {a.label}
            </button>
          ))}
        </div>

        <div className="relative rounded-xl border border-border bg-background/60 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder="Ask the AI to continue, rewrite, or describe your scene..."
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
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}
