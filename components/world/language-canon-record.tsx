"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pencil, ScrollText } from "lucide-react"
import {
  LANGUAGE_STATUSES,
  LANGUAGE_TYPES,
  languageStatusLabel,
  languageTypeLabel,
  useLanguageCanon,
  type CanonLanguage,
  type LanguageEdit,
  type LanguageStatus,
  type LanguageType,
} from "@/lib/language-canon"
import { CanonRecordHeader } from "@/components/world/canon-record-header"
import { cn } from "@/lib/utils"

const inputClass = "h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h3>{children}</div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5"><span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>
}

function TextField({ label, value, placeholder, onChange }: { label: string; value: string; placeholder: string; onChange: (value: string) => void }) {
  return <Field label={label}><textarea className={cn(inputClass, "h-auto min-h-20 resize-y py-2 leading-relaxed")} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></Field>
}

function ReadOnlyField({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return <Section title={label}><p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90 text-pretty">{value}</p></Section>
}

type Draft = Omit<CanonLanguage, "id">

const EMPTY_DRAFT: Draft = {
  name: "", type: "natural", status: "unknown", image: "", summary: "", description: "", endonym: "", alternateNames: "", pronunciation: "",
  family: "", relatedLanguages: "", homeland: "", currentDistribution: "", speakerCommunities: "", speakerScale: "", domainsOfUse: "", socialStatus: "",
  history: "", developmentStages: "", languageChange: "", script: "", writingSystem: "", writingDirection: "", orthography: "", sampleWriting: "",
  phonology: "", pronunciationGuide: "", phonotactics: "", stressToneProsody: "", grammar: "", wordOrder: "", morphology: "", vocabularyWordFormation: "",
  loanwords: "", namingConventions: "", dialectsRegisters: "", cultureAndMeaning: "", politenessTaboo: "", literatureOralTradition: "",
  examplesAndPhrases: "", translationNotes: "", sources: "", openQuestions: "", additionalInfo: "",
}

function toDraft(language: CanonLanguage): Draft {
  return { ...EMPTY_DRAFT, ...language }
}

function draftToPatch(draft: Draft): LanguageEdit {
  const clean = (value: string) => value.trim() || undefined
  return {
    ...Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [key, key === "image" ? value || undefined : clean(value as string)]),
    ),
    name: draft.name.trim() || "Unnamed Language",
    type: draft.type,
    status: draft.status,
  } as LanguageEdit
}

function LanguageFields({ draft, update }: { draft: Draft; update: (patch: Partial<Draft>) => void }) {
  const text = (key: keyof Draft, label: string, placeholder: string) => <TextField label={label} value={draft[key] as string} placeholder={placeholder} onChange={(value) => update({ [key]: value })} />

  return (
    <>
      <Section title="Identity">
        <div className="flex flex-col gap-3">
          <Field label="Name"><input autoFocus={!draft.name} className={inputClass} value={draft.name} placeholder="e.g. Trade Speech" onChange={(event) => update({ name: event.target.value })} /></Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Language Type"><select className={inputClass} value={draft.type} onChange={(event) => update({ type: event.target.value as LanguageType })}>{LANGUAGE_TYPES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>
            <Field label="Current Status"><select className={inputClass} value={draft.status} onChange={(event) => update({ status: event.target.value as LanguageStatus })}>{LANGUAGE_STATUSES.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></Field>
          </div>
          <Field label="Summary"><input className={inputClass} value={draft.summary} placeholder="One-line identity shown beneath the name" onChange={(event) => update({ summary: event.target.value })} /></Field>
          {text("endonym", "Native Name / Endonym", "What speakers call the language")}
          {text("alternateNames", "Alternate Names", "Exonyms, historical names, abbreviations, or aliases")}
          {text("pronunciation", "Name Pronunciation", "A reader-friendly pronunciation guide")}
        </div>
      </Section>

      {text("description", "Canonical Description", "What this language is, where it belongs, and why it matters")}

      <Section title="Family, Place & People">
        <div className="flex flex-col gap-3">
          {text("family", "Language Family", "Family, branch, proto-language, or classification")}
          {text("relatedLanguages", "Related Languages", "Ancestors, descendants, sister languages, or contact languages")}
          {text("homeland", "Homeland / Origin", "Where the language began or is traditionally associated with")}
          {text("currentDistribution", "Current Distribution", "Where the language is spoken, signed, written, or studied now")}
          {text("speakerCommunities", "Speaker Communities", "The people, groups, institutions, or communities who use it")}
          {text("speakerScale", "Speaker Scale", "Known population, range, or a qualitative estimate")}
          {text("domainsOfUse", "Domains of Use", "Home, trade, law, education, ritual, military, art, research, and more")}
          {text("socialStatus", "Social Status & Attitudes", "Prestige, stigma, official status, suppression, or revitalization")}
        </div>
      </Section>

      <Section title="History & Change">
        <div className="flex flex-col gap-3">
          {text("history", "Origin & History", "The events, migrations, contacts, and institutions that shaped the language")}
          {text("developmentStages", "Historical Stages", "Proto-language, older forms, modern form, or planned revisions")}
          {text("languageChange", "Language Change", "Sound, grammar, vocabulary, script, or usage changes over time")}
        </div>
      </Section>

      <Section title="Writing & Script">
        <div className="flex flex-col gap-3">
          {text("script", "Script Name", "The script or scripts used to write the language")}
          {text("writingSystem", "Writing System", "Alphabet, abjad, abugida, syllabary, logographic, mixed, or none")}
          {text("writingDirection", "Writing Direction", "Left-to-right, right-to-left, vertical, boustrophedon, or other")}
          {text("orthography", "Orthography & Conventions", "Spelling, punctuation, word boundaries, numerals, and reforms")}
          {text("sampleWriting", "Written Sample", "A representative inscription, sentence, passage, or visual reference")}
        </div>
      </Section>

      <Section title="Sound & Pronunciation">
        <div className="flex flex-col gap-3">
          {text("phonology", "Phonology", "Consonants, vowels, phonemes, allophones, and notable sound patterns")}
          {text("pronunciationGuide", "Pronunciation Guide", "How a reader or performer should pronounce important words")}
          {text("phonotactics", "Syllables & Phonotactics", "Allowed sounds, syllable shapes, clusters, and forbidden combinations")}
          {text("stressToneProsody", "Stress, Tone & Prosody", "Stress, pitch, tone, rhythm, intonation, and expressive sound")}
        </div>
      </Section>

      <Section title="Grammar & Word Formation">
        <div className="flex flex-col gap-3">
          {text("grammar", "Grammar Overview", "The most important rules and patterns a writer needs to know")}
          {text("wordOrder", "Default Word Order", "Sentence order and the circumstances where it changes")}
          {text("morphology", "Morphology", "Inflection, agreement, case, tense, aspect, mood, evidentiality, and more")}
          {text("vocabularyWordFormation", "Vocabulary & Word Formation", "Roots, compounds, affixes, reduplication, classifiers, and productive patterns")}
          {text("loanwords", "Loanwords & Borrowing", "Borrowed words, calques, substrates, and words that retain foreign prestige")}
        </div>
      </Section>

      <Section title="Culture, Names & Variation">
        <div className="flex flex-col gap-3">
          {text("namingConventions", "Naming Conventions", "Personal names, titles, places, inheritance, and how names are formed")}
          {text("dialectsRegisters", "Dialects & Registers", "Regional, social, historical, formal, intimate, professional, or ritual varieties")}
          {text("cultureAndMeaning", "Culture & Meaning", "Worldview, central concepts, metaphors, humor, poetry, or identity")}
          {text("politenessTaboo", "Politeness, Taboos & Honorifics", "Directness, silence, status language, taboo vocabulary, and social boundaries")}
          {text("literatureOralTradition", "Literature & Oral Tradition", "Songs, stories, prayers, proverbs, performance, and literary forms")}
        </div>
      </Section>

      <Section title="Examples & Canon Notes">
        <div className="flex flex-col gap-3">
          {text("examplesAndPhrases", "Examples & Useful Phrases", "Greetings, names, numbers, dialogue, sentences, or glossed examples")}
          {text("translationNotes", "Translation Notes", "Untranslatable concepts, false friends, tone, and recurring translation choices")}
          {text("sources", "Sources & References", "Research sources, inspirations, documents, interviews, or related canon records")}
          {text("openQuestions", "Open Questions", "Details that are intentionally unresolved and should not be treated as canon yet")}
          {text("additionalInfo", "Additional Information", "Established details that do not fit another section")}
        </div>
      </Section>
    </>
  )
}

export function LanguageCanonRecord({ languageId, className }: { languageId: string | null; className?: string }) {
  const { getLanguage, updateLanguage } = useLanguageCanon()
  const language = getLanguage(languageId)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [draft, setDraft] = useState<Draft | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMode("view"); contentRef.current?.scrollTo({ top: 0 }) }, [languageId])
  useEffect(() => { if (mode === "edit" && language) setDraft(toDraft(language)) }, [mode, language])

  const save = useCallback(() => {
    if (language && draft) updateLanguage(language.id, draftToPatch(draft))
    setMode("view")
  }, [draft, language, updateLanguage])

  if (!language) return null

  const changeImage = (image: string) => {
    if (mode === "edit" && draft) setDraft({ ...draft, image })
    else updateLanguage(language.id, { image: image || undefined })
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
        <CanonRecordHeader recordId={`language:${language.id}`} title={language.name} summary={language.summary} identityImage={draft?.image ?? language.image ?? ""} identityAlt={`Symbol for ${language.name}`} identityFallback={<ScrollText className="size-7 text-primary/50" />} onIdentityChange={changeImage} />
        {mode === "view" ? (
          <div className="flex flex-col gap-6 p-4">
            <button onClick={() => setMode("edit")} className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted active:scale-[0.99]"><Pencil className="size-3.5" />Edit Language</button>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary"><ScrollText className="size-3" />{languageTypeLabel(language.type)}</span>
              <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">{languageStatusLabel(language.status)}</span>
            </div>
            <ReadOnlyField label="Canonical Description" value={language.description} />
            <ReadOnlyField label="Native Name / Endonym" value={language.endonym} />
            <ReadOnlyField label="Alternate Names" value={language.alternateNames} />
            <ReadOnlyField label="Name Pronunciation" value={language.pronunciation} />
            <ReadOnlyField label="Language Family" value={language.family} />
            <ReadOnlyField label="Related Languages" value={language.relatedLanguages} />
            <ReadOnlyField label="Homeland / Origin" value={language.homeland} />
            <ReadOnlyField label="Current Distribution" value={language.currentDistribution} />
            <ReadOnlyField label="Speaker Communities" value={language.speakerCommunities} />
            <ReadOnlyField label="Speaker Scale" value={language.speakerScale} />
            <ReadOnlyField label="Domains of Use" value={language.domainsOfUse} />
            <ReadOnlyField label="Social Status & Attitudes" value={language.socialStatus} />
            <ReadOnlyField label="Origin & History" value={language.history} />
            <ReadOnlyField label="Historical Stages" value={language.developmentStages} />
            <ReadOnlyField label="Language Change" value={language.languageChange} />
            <ReadOnlyField label="Script Name" value={language.script} />
            <ReadOnlyField label="Writing System" value={language.writingSystem} />
            <ReadOnlyField label="Writing Direction" value={language.writingDirection} />
            <ReadOnlyField label="Orthography & Conventions" value={language.orthography} />
            <ReadOnlyField label="Written Sample" value={language.sampleWriting} />
            <ReadOnlyField label="Phonology" value={language.phonology} />
            <ReadOnlyField label="Pronunciation Guide" value={language.pronunciationGuide} />
            <ReadOnlyField label="Syllables & Phonotactics" value={language.phonotactics} />
            <ReadOnlyField label="Stress, Tone & Prosody" value={language.stressToneProsody} />
            <ReadOnlyField label="Grammar Overview" value={language.grammar} />
            <ReadOnlyField label="Default Word Order" value={language.wordOrder} />
            <ReadOnlyField label="Morphology" value={language.morphology} />
            <ReadOnlyField label="Vocabulary & Word Formation" value={language.vocabularyWordFormation} />
            <ReadOnlyField label="Loanwords & Borrowing" value={language.loanwords} />
            <ReadOnlyField label="Naming Conventions" value={language.namingConventions} />
            <ReadOnlyField label="Dialects & Registers" value={language.dialectsRegisters} />
            <ReadOnlyField label="Culture & Meaning" value={language.cultureAndMeaning} />
            <ReadOnlyField label="Politeness, Taboos & Honorifics" value={language.politenessTaboo} />
            <ReadOnlyField label="Literature & Oral Tradition" value={language.literatureOralTradition} />
            <ReadOnlyField label="Examples & Useful Phrases" value={language.examplesAndPhrases} />
            <ReadOnlyField label="Translation Notes" value={language.translationNotes} />
            <ReadOnlyField label="Sources & References" value={language.sources} />
            <ReadOnlyField label="Open Questions" value={language.openQuestions} />
            <ReadOnlyField label="Additional Information" value={language.additionalInfo} />
          </div>
        ) : draft && (
          <div className="flex flex-col gap-6 p-4">
            <p className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-foreground/90">This is the authoritative Canon record for {language.name}. Changes here update every view that reads this language.</p>
            <LanguageFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} />
          </div>
        )}
      </div>
      {mode === "edit" && <div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={() => setMode("view")} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</button><button onClick={save} className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]">Save Changes</button></div>}
    </div>
  )
}

export function LanguageCreateForm({ onCreated, onCancel }: { onCreated: (id: string) => void; onCancel: () => void }) {
  const { addLanguage } = useLanguageCanon()
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const create = useCallback(() => onCreated(addLanguage(draftToPatch(draft))), [addLanguage, draft, onCreated])

  return <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="flex items-center gap-3 border-b border-border bg-sidebar/40 px-4 py-3"><span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-inset ring-primary/20"><ScrollText className="size-4.5" /></span><div><h2 className="font-serif text-lg font-medium tracking-tight text-foreground">New Language</h2><p className="text-xs text-muted-foreground">Establish the canon record. Technical details can be added as the language develops.</p></div></div><div className="flex flex-col gap-6 p-4"><LanguageFields draft={draft} update={(patch) => setDraft({ ...draft, ...patch })} /></div><div className="flex items-center justify-end gap-2 border-t border-border bg-sidebar px-4 py-3"><button onClick={onCancel} className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Cancel</button><button onClick={create} className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.99]">Create Language</button></div></div>
}
