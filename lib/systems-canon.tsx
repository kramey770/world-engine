"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export type SystemDomain = "magic" | "technology" | "economics"
export type SystemStatus = "draft" | "active" | "historical" | "contested"

export type SystemRecord = {
  id: string
  createdAt: number
  domain: SystemDomain
  name: string
  type: string
  status: SystemStatus
  image?: string
  summary?: string
  description?: string
  rules?: string
  inputs?: string
  outputs?: string
  limits?: string
  prerequisites?: string
  relationships?: string
  history?: string
  notes?: string
}

export type SystemRecordEdit = Partial<Omit<SystemRecord, "id" | "createdAt" | "domain">>

export const SYSTEM_TYPES: Record<SystemDomain, { id: string; label: string }[]> = {
  magic: [
    { id: "source", label: "Source or force" },
    { id: "practice", label: "Practice or discipline" },
    { id: "technique", label: "Technique" },
    { id: "artifact", label: "Artifact or interface" },
    { id: "institution", label: "Institution or tradition" },
    { id: "phenomenon", label: "Phenomenon" },
  ],
  technology: [
    { id: "principle", label: "Principle" },
    { id: "process", label: "Process" },
    { id: "tool", label: "Tool or device" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "standard", label: "Institution or standard" },
    { id: "system", label: "Weapon or system" },
    { id: "knowledge", label: "Knowledge artifact" },
  ],
  economics: [
    { id: "resource", label: "Resource or stock" },
    { id: "good", label: "Good or item" },
    { id: "currency", label: "Currency" },
    { id: "labor", label: "Labor or service" },
    { id: "market", label: "Market or institution" },
    { id: "route", label: "Trade route" },
    { id: "event", label: "Economic event" },
  ],
}

export const SYSTEM_LABELS: Record<SystemDomain, { title: string; description: string }> = {
  magic: { title: "Magic", description: "Forces, practices, costs, and boundaries that shape the supernatural." },
  technology: { title: "Technology", description: "Tools, inventions, infrastructure, and technical capabilities." },
  economics: { title: "Economics & Resources", description: "Trade, currencies, materials, labor, and resource systems." },
}

export function systemTypeLabel(domain: SystemDomain, type: string) {
  return SYSTEM_TYPES[domain].find((option) => option.id === type)?.label ?? type
}

const seedRecords: Record<SystemDomain, Record<string, SystemRecord>> = {
  magic: {
    "the-voice": { id: "the-voice", createdAt: 1, domain: "magic", name: "The Voice", type: "practice", status: "active", summary: "A disciplined form of command carried through sound and intention.", description: "The Voice turns trained speech into an instrument of influence. Its effects depend on attention, confidence, and the listener's ability to resist.", rules: "The command must be heard and understood; stronger wills require greater focus.", inputs: "Training, breath, attention, and a clearly formed command.", outputs: "Brief behavioral influence or interruption.", limits: "It cannot create lasting loyalty or replace genuine belief.", prerequisites: "Instruction from an experienced practitioner.", history: "Its techniques are preserved through selective schools and guarded oral traditions." },
  },
  technology: {
    "folded-steel": { id: "folded-steel", createdAt: 2, domain: "technology", name: "Folded Steel", type: "process", status: "active", summary: "A demanding forging process that produces resilient blades and tools.", description: "Folded steel combines repeated heating, folding, and careful tempering to create a reliable edge from inconsistent ore.", rules: "Quality depends on the number of folds, carbon balance, and the smith's control of heat.", inputs: "Iron, carbon, fuel, skilled labor, and time.", outputs: "Durable blades, tools, and prestige goods.", limits: "The process is slow and difficult to scale without trained smiths.", prerequisites: "Specialized furnaces and a master smithing tradition.", history: "Its spread follows trade routes and the movement of smithing families." },
  },
  economics: {
    "river-salt": { id: "river-salt", createdAt: 3, domain: "economics", name: "River Salt", type: "resource", status: "active", summary: "A preserved mineral harvested from the lower river flats.", description: "River salt is collected seasonally, stored in sealed clay, and traded upriver as both food preservative and ritual material.", rules: "Harvest depends on the dry season and access to the river flats.", inputs: "Seasonal labor, drying yards, clay storage, and guarded transport.", outputs: "Salt stores, preservation capacity, and trade revenue.", limits: "Floods contaminate the flats and can interrupt the supply for a full cycle.", prerequisites: "Access rights to the lower river and labor during harvest.", history: "Control of the flats has shifted between river cities and the surrounding clans." },
  },
}

function makeId(domain: SystemDomain) {
  return `${domain}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

type SystemsCanonContextValue = {
  records: Record<SystemDomain, Record<string, SystemRecord>>
  getRecord: (domain: SystemDomain, id: string | null) => SystemRecord | null
  updateRecord: (domain: SystemDomain, id: string, patch: SystemRecordEdit) => void
  addRecord: (domain: SystemDomain, patch: SystemRecordEdit) => string
}

const SystemsCanonContext = createContext<SystemsCanonContextValue | null>(null)

export function SystemsCanonProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState(seedRecords)
  const getRecord = useCallback((domain: SystemDomain, id: string | null) => (id ? records[domain][id] ?? null : null), [records])
  const updateRecord = useCallback((domain: SystemDomain, id: string, patch: SystemRecordEdit) => {
    setRecords((current) => current[domain][id] ? { ...current, [domain]: { ...current[domain], [id]: { ...current[domain][id], ...patch } } } : current)
  }, [])
  const addRecord = useCallback((domain: SystemDomain, patch: SystemRecordEdit) => {
    const id = makeId(domain)
    setRecords((current) => ({ ...current, [domain]: { ...current[domain], [id]: { id, createdAt: Date.now(), domain, name: "Unnamed Record", type: SYSTEM_TYPES[domain][0].id, status: "draft", ...patch } } }))
    return id
  }, [])
  const value = useMemo(() => ({ records, getRecord, updateRecord, addRecord }), [records, getRecord, updateRecord, addRecord])
  return <SystemsCanonContext.Provider value={value}>{children}</SystemsCanonContext.Provider>
}

export function useSystemsCanon() {
  const context = useContext(SystemsCanonContext)
  if (!context) throw new Error("useSystemsCanon must be used inside SystemsCanonProvider")
  return context
}
