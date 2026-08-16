"use client"

import { useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  Compass,
  Lightbulb,
  Pencil,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/logo"
import { UserMenu } from "@/components/user-menu"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Direction = { title: string; body: string }

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "partner"; intro: string; directions?: Direction[] }

type IdeaStatus = "Exploring" | "Developing" | "Ready to Promote"

type Idea = {
  id: string
  title: string
  note: string
  status: IdeaStatus
}

const QUICK_STARTS: { label: string; icon: typeof Compass; seed: string }[] = [
  { label: "Explore an idea", icon: Compass, seed: "I want to explore an idea: " },
  { label: "Solve a story problem", icon: Wand2, seed: "I'm stuck on a story problem: " },
  { label: "Develop a character", icon: UserRound, seed: "Help me develop a character: " },
  { label: "Explore a worldbuilding possibility", icon: Sparkles, seed: "A worldbuilding possibility I'm considering: " },
  { label: "What could happen if...?", icon: Lightbulb, seed: "What could happen if " },
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "user",
    text: "I'm trying to figure out why two kingdoms with a strong alliance would suddenly turn against each other.",
  },
  {
    id: "m2",
    role: "partner",
    intro:
      "Let's explore a few possibilities without committing any of them to canon. Here are some directions the fracture could take — pull on whichever one feels alive to you.",
    directions: [
      {
        title: "A broken betrothal",
        body: "The marriage pact meant to seal the alliance collapses — a death, a scandal, or a refusal — and the insult curdles into open hostility.",
      },
      {
        title: "A shared resource runs dry",
        body: "A river, mine, or trade road they both depend on fails. Cooperation was really about scarcity, and now there isn't enough to share.",
      },
      {
        title: "A third hand on the scale",
        body: "A rival power quietly manufactures distrust — forged letters, staged raids — so the two allies destroy each other without ever knowing why.",
      },
      {
        title: "The alliance was never trust",
        body: "It was fear of a common enemy. The moment that threat disappears, there's nothing holding two ambitious crowns together.",
      },
    ],
  },
]

const INITIAL_IDEAS: Idea[] = [
  {
    id: "i1",
    title: "The Ashfall Truce",
    note: "What if the alliance was never trust, only fear of a common enemy that has now vanished?",
    status: "Exploring",
  },
  {
    id: "i2",
    title: "Marisae's hidden lineage",
    note: "A character thread: the envoy may secretly share blood with the rival crown, making her loyalty a fault line.",
    status: "Developing",
  },
  {
    id: "i3",
    title: "The Sunken Road",
    note: "A flooded trade route reshapes the map and the northern economy — a slow disaster that turns friends into rivals.",
    status: "Ready to Promote",
  },
]

const STATUS_STYLES: Record<IdeaStatus, string> = {
  Exploring: "bg-muted text-muted-foreground ring-border",
  Developing: "bg-chart-3/15 text-chart-3 ring-chart-3/30",
  "Ready to Promote": "bg-primary/15 text-primary ring-primary/30",
}

const PROMOTE_TARGETS = ["Canon Lore", "Character", "Map", "Family Tree"]

let idSeq = 100
function nextId() {
  idSeq += 1
  return `x${idSeq}`
}

export function Brainstorming({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS)
  const [input, setInput] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [promotingId, setPromotingId] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function send() {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { id: nextId(), role: "user", text }
    const partnerMsg: Message = {
      id: nextId(),
      role: "partner",
      intro:
        "Good — let's keep this in the sandbox and open it up. Nothing here touches your canon yet. A few angles worth turning over:",
      directions: [
        {
          title: "Follow the consequence",
          body: "If this were true, what would have to change three steps later? Chase the ripple, not just the event.",
        },
        {
          title: "Invert the assumption",
          body: "Flip the most obvious premise. The version you resist is often the one with the most story in it.",
        },
        {
          title: "Give it a face",
          body: "Tie the idea to a single character who wants something because of it — abstraction becomes drama.",
        },
      ],
    }
    setMessages((prev) => [...prev, userMsg, partnerMsg])
    setInput("")
  }

  function saveDirection(dir: Direction) {
    setIdeas((prev) => [{ id: nextId(), title: dir.title, note: dir.body, status: "Exploring" }, ...prev])
  }

  function continueExploring(idea: Idea) {
    setInput(`Let's keep developing "${idea.title}" — ${idea.note}`)
    inputRef.current?.focus()
  }

  function deleteIdea(id: string) {
    setIdeas((prev) => prev.filter((i) => i.id !== id))
    if (editingId === id) setEditingId(null)
    if (promotingId === id) setPromotingId(null)
  }

  function updateIdea(id: string, patch: Partial<Idea>) {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        <Wordmark />
        <UserMenu onSignOut={onSignOut} />
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Project Home
        </button>

        {/* Title */}
        <section className="mt-5">
          <p className="text-xs text-muted-foreground">{project.name} &middot; World Building Studio</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Brainstorming
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            A space to explore ideas, questions, possibilities, and problems without changing your canon.
          </p>

          {/* Sandbox safety label */}
          <div className="mt-4 inline-flex items-start gap-2 rounded-lg border border-border bg-card/60 px-3 py-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Brainstorming is a sandbox. Nothing here changes your canon unless you choose to promote it.
            </p>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Conversation workspace */}
          <section className="flex min-h-[60vh] flex-col overflow-hidden rounded-2xl border border-border bg-card/40">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium tracking-tight text-foreground">Thinking partner</p>
                <p className="text-[11px] text-muted-foreground">Exploratory &middot; not canon</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 sm:px-6">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md border border-border bg-secondary px-4 py-2.5">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">You</p>
                      <p className="mt-1 text-sm leading-relaxed text-secondary-foreground text-pretty">{m.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex flex-col gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/12 text-primary ring-1 ring-inset ring-primary/20">
                        <Sparkles className="size-3.5" />
                      </span>
                      <p className="text-sm leading-relaxed text-foreground text-pretty">{m.intro}</p>
                    </div>
                    {m.directions && (
                      <div className="ml-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {m.directions.map((dir) => (
                          <div
                            key={dir.title}
                            className="group flex flex-col rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/40"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-sm font-medium tracking-tight text-foreground text-pretty">
                                {dir.title}
                              </h4>
                              <Compass className="size-3.5 shrink-0 text-muted-foreground/60" />
                            </div>
                            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                              {dir.body}
                            </p>
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={() => saveDirection(dir)}
                              className="mt-3 self-start text-primary hover:bg-primary/10 hover:text-primary"
                            >
                              <Lightbulb className="size-3" />
                              Save idea
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card/60 px-3 py-3 sm:px-4">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK_STARTS.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => {
                      setInput(q.seed)
                      inputRef.current?.focus()
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <q.icon className="size-3" />
                    {q.label}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-2 rounded-xl border border-border bg-background p-2 focus-within:border-primary/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      !e.nativeEvent.isComposing &&
                      e.keyCode !== 229
                    ) {
                      e.preventDefault()
                      send()
                    }
                  }}
                  rows={2}
                  placeholder="What are you thinking about?"
                  className="max-h-40 min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70"
                />
                <Button size="icon-lg" onClick={send} disabled={!input.trim()} aria-label="Send">
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="mt-1.5 px-1 text-[11px] text-muted-foreground/70">
                Anything you write stays exploratory until you promote it.
              </p>
            </div>
          </section>

          {/* Saved ideas */}
          <aside className="flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium tracking-tight text-foreground">Brainstorm Ideas</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {ideas.length}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Saved thoughts, not canon entries.
            </p>

            <div className="mt-3 space-y-3">
              {ideas.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-card/30 px-4 py-8 text-center">
                  <Lightbulb className="mx-auto size-5 text-muted-foreground/60" />
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Ideas you save while brainstorming will collect here.
                  </p>
                </div>
              )}

              {ideas.map((idea) => (
                <div key={idea.id} className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-sm font-medium tracking-tight text-foreground text-pretty">
                      {idea.title}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset",
                        STATUS_STYLES[idea.status],
                      )}
                    >
                      {idea.status}
                    </span>
                  </div>

                  {editingId === idea.id ? (
                    <textarea
                      value={idea.note}
                      onChange={(e) => updateIdea(idea.id, { note: e.target.value })}
                      rows={3}
                      className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-2.5 py-2 text-xs leading-relaxed text-foreground outline-none focus:border-primary/50"
                    />
                  ) : (
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground text-pretty">{idea.note}</p>
                  )}

                  {/* Status selector */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {(["Exploring", "Developing", "Ready to Promote"] as IdeaStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateIdea(idea.id, { status: s })}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
                          idea.status === s
                            ? "bg-foreground/10 text-foreground"
                            : "text-muted-foreground/70 hover:text-foreground",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border pt-2.5">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => continueExploring(idea)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Compass className="size-3" />
                      Continue
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setEditingId(editingId === idea.id ? null : idea.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="size-3" />
                      {editingId === idea.id ? "Done" : "Edit"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => deleteIdea(idea.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setPromotingId(promotingId === idea.id ? null : idea.id)}
                      className="ml-auto text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <ArrowUpRight className="size-3" />
                      Promote
                    </Button>
                  </div>

                  {/* Promote affordance (placeholder) */}
                  {promotingId === idea.id && (
                    <div className="mt-2.5 rounded-lg border border-primary/30 bg-primary/5 p-3">
                      <p className="text-xs leading-relaxed text-foreground">
                        Move this idea out of the sandbox and into a permanent part of your world:
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {PROMOTE_TARGETS.map((t) => (
                          <button
                            key={t}
                            onClick={() => setPromotingId(null)}
                            className="rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground/70">
                        Promotion will be connected to the content builder soon.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
