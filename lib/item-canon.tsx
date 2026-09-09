"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { redRisingDemo, redRisingImage } from "./red-rising-demo-data"

export type ItemType = string
export type ItemFieldValue = string | string[]
export type ItemFieldControl = "text" | "textarea" | "select" | "multi-select"
export type ItemFieldSection =
  | "Physical Description"
  | "Material & Construction"
  | "Function & Use"
  | "Capabilities"
  | "Origin & Creation"
  | "Ownership & Possession"
  | "Location & Distribution"
  | "History & Significance"
  | "Cultural / Symbolic Meaning"
  | "Value"
  | "Additional Information"

export type ItemFieldOption = { value: string; label: string; help?: string }
export type ItemFieldDefinition = {
  id: string
  label: string
  section: ItemFieldSection
  control: ItemFieldControl
  options?: ItemFieldOption[]
  allowOther?: boolean
  placeholder?: string
}

const withOther = (options: ItemFieldOption[]): ItemFieldOption[] => [...options, { value: "other", label: "Other" }]

const ITEM_TYPE_OPTIONS: ItemFieldOption[] = [
  { value: "weapon", label: "Weapon", help: "Primarily designed to injure, defeat, or threaten a target." },
  { value: "armor", label: "Armor / Protection", help: "Primarily designed to protect its wearer or user." },
  { value: "tool", label: "Tool", help: "Designed to perform a practical task." },
  { value: "equipment", label: "Equipment", help: "Supports an activity without a more specific category." },
  { value: "clothing", label: "Clothing / Garment", help: "Primarily worn as clothing or personal attire." },
  { value: "book", label: "Book / Document", help: "A physical written, printed, illustrated, or recorded object." },
  { value: "artifact", label: "Artifact", help: "Unusual, exceptional, supernatural, historical, or otherwise notable." },
  { value: "relic", label: "Relic", help: "Preserved for historical, cultural, religious, or symbolic significance." },
  { value: "resource", label: "Resource / Material", help: "A physical substance treated as an important Item in its own right." },
  { value: "vehicle", label: "Vehicle", help: "A conveyance used to transport people, creatures, or cargo." },
  { value: "instrument", label: "Instrument", help: "Produces sound, measures something, or performs a specialized operation." },
  { value: "container", label: "Container", help: "Primarily designed to hold, store, or transport something." },
  { value: "decorative", label: "Decorative / Symbolic", help: "Valued for appearance, symbolism, status, or representation." },
]

export const ITEM_TYPES = withOther(ITEM_TYPE_OPTIONS)

export function itemTypeLabel(type: string): string {
  return ITEM_TYPES.find((option) => option.value === type)?.label ?? type
}

const sizes = withOther([
  { value: "tiny", label: "Tiny" }, { value: "small", label: "Small" }, { value: "medium", label: "Medium" },
  { value: "large", label: "Large" }, { value: "very-large", label: "Very Large" }, { value: "variable", label: "Variable" },
])
const conditions = withOther([
  { value: "new", label: "New / Pristine" }, { value: "maintained", label: "Well Maintained" }, { value: "used", label: "Used" },
  { value: "worn", label: "Worn" }, { value: "damaged", label: "Damaged" }, { value: "broken", label: "Broken / Nonfunctional" },
  { value: "repaired", label: "Repaired / Restored" }, { value: "variable", label: "Variable" }, { value: "unknown", label: "Unknown" },
])
const materials = withOther([
  { value: "wood", label: "Wood" }, { value: "stone", label: "Stone" }, { value: "bone", label: "Bone" }, { value: "leather", label: "Leather" },
  { value: "plant", label: "Plant Material" }, { value: "cloth", label: "Cloth / Fiber" }, { value: "glass", label: "Glass" }, { value: "ceramic", label: "Ceramic" },
  { value: "ordinary-metal", label: "Ordinary Metal" }, { value: "precious-metal", label: "Precious Metal" }, { value: "gemstone", label: "Gemstone / Crystal" },
  { value: "composite", label: "Composite / Multiple Materials" }, { value: "unknown", label: "Unknown" },
])
const craftsmanship = withOther([
  { value: "crude", label: "Crude" }, { value: "basic", label: "Basic" }, { value: "skilled", label: "Skilled" }, { value: "fine", label: "Fine" },
  { value: "exceptional", label: "Exceptional" }, { value: "unique", label: "Unique" }, { value: "unknown", label: "Unknown" },
])
const functions = withOther([
  { value: "combat", label: "Combat" }, { value: "protection", label: "Protection" }, { value: "transportation", label: "Transportation" },
  { value: "communication", label: "Communication" }, { value: "measurement", label: "Measurement" }, { value: "work", label: "Work / Labor" },
  { value: "crafting", label: "Crafting / Production" }, { value: "storage", label: "Storage" }, { value: "recording", label: "Recording / Preservation" },
  { value: "ritual", label: "Ritual / Ceremony" }, { value: "identification", label: "Identification / Symbolism" }, { value: "entertainment", label: "Entertainment" },
  { value: "decoration", label: "Decoration" }, { value: "utility", label: "Utility / General Use" },
])

export const ITEM_FIELD_SECTION_ORDER: ItemFieldSection[] = [
  "Physical Description", "Material & Construction", "Function & Use", "Capabilities", "Origin & Creation",
  "Ownership & Possession", "Location & Distribution", "History & Significance", "Cultural / Symbolic Meaning", "Value", "Additional Information",
]

export const ITEM_FIELD_DEFINITIONS: ItemFieldDefinition[] = [
  { id: "appearance", label: "Appearance", section: "Physical Description", control: "textarea", placeholder: "Describe the item's shape, size, color, markings, and construction details." },
  { id: "size", label: "Size", section: "Physical Description", control: "select", options: sizes, allowOther: true },
  { id: "physicalCondition", label: "Physical Condition", section: "Physical Description", control: "select", options: conditions, allowOther: true },
  { id: "distinctiveFeatures", label: "Distinctive Features", section: "Physical Description", control: "textarea" },
  { id: "primaryMaterial", label: "Primary Material", section: "Material & Construction", control: "multi-select", options: materials, allowOther: true },
  { id: "construction", label: "Construction", section: "Material & Construction", control: "textarea" },
  { id: "craftsmanship", label: "Craftsmanship", section: "Material & Construction", control: "select", options: craftsmanship, allowOther: true },
  { id: "primaryFunction", label: "Primary Function", section: "Function & Use", control: "select", options: functions, allowOther: true },
  { id: "secondaryFunctions", label: "Secondary Functions", section: "Function & Use", control: "multi-select", options: functions, allowOther: true },
  { id: "howUsed", label: "How It Is Used", section: "Function & Use", control: "textarea" },
  { id: "useRequirements", label: "Requirements for Use", section: "Function & Use", control: "textarea" },
  { id: "capabilities", label: "Capabilities", section: "Capabilities", control: "textarea" },
  { id: "capabilityType", label: "Capability Type", section: "Capabilities", control: "select", options: withOther([
    { value: "ordinary", label: "Ordinary" }, { value: "enhanced", label: "Enhanced" }, { value: "supernatural", label: "Supernatural / Metaphysical" },
    { value: "technological", label: "Technological" }, { value: "conditional", label: "Conditional" }, { value: "variable", label: "Variable" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "limitations", label: "Limitations", section: "Capabilities", control: "textarea" },
  { id: "originType", label: "Origin Type", section: "Origin & Creation", control: "select", options: withOther([
    { value: "natural", label: "Naturally Occurring" }, { value: "crafted", label: "Crafted / Manufactured" }, { value: "engineered", label: "Constructed / Engineered" },
    { value: "transformed", label: "Transformed" }, { value: "grown", label: "Grown / Cultivated" }, { value: "supernatural", label: "Supernaturally Created" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "creationMethod", label: "Creation Method", section: "Origin & Creation", control: "textarea" },
  { id: "creationPurpose", label: "Creation Purpose", section: "Origin & Creation", control: "textarea" },
  { id: "dateCreated", label: "Date / Period Created", section: "Origin & Creation", control: "text" },
  { id: "ownershipStatus", label: "Ownership Status", section: "Ownership & Possession", control: "select", options: withOther([
    { value: "private", label: "Privately Owned" }, { value: "institutional", label: "Institutionally Owned" }, { value: "collective", label: "Collectively Owned" },
    { value: "unowned", label: "Unowned" }, { value: "lost", label: "Lost" }, { value: "destroyed", label: "Destroyed" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "ownershipHistory", label: "Ownership History", section: "Ownership & Possession", control: "textarea" },
  { id: "availability", label: "Availability", section: "Location & Distribution", control: "select", options: withOther([
    { value: "common", label: "Common" }, { value: "uncommon", label: "Uncommon" }, { value: "rare", label: "Rare" }, { value: "unique", label: "Unique" },
    { value: "limited", label: "Limited" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "distribution", label: "Distribution", section: "Location & Distribution", control: "textarea" },
  { id: "historicalSignificance", label: "Historical Significance", section: "History & Significance", control: "select", options: withOther([
    { value: "none", label: "None / Minimal" }, { value: "local", label: "Local" }, { value: "regional", label: "Regional" }, { value: "major", label: "Major" },
    { value: "world", label: "World-Historical" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "historicalBackground", label: "Historical Background", section: "History & Significance", control: "textarea" },
  { id: "culturalSignificance", label: "Cultural Significance", section: "Cultural / Symbolic Meaning", control: "select", options: withOther([
    { value: "none", label: "None / Minimal" }, { value: "personal", label: "Personal" }, { value: "family", label: "Family / Lineage" }, { value: "community", label: "Community" },
    { value: "cultural", label: "Cultural" }, { value: "religious", label: "Religious / Spiritual" }, { value: "political", label: "Political" }, { value: "symbolic", label: "Symbolic / Ceremonial" },
    { value: "multiple", label: "Multiple" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "meaningSignificance", label: "Meaning / Significance", section: "Cultural / Symbolic Meaning", control: "textarea" },
  { id: "valueType", label: "Value Type", section: "Value", control: "select", options: withOther([
    { value: "practical", label: "Practical" }, { value: "material", label: "Material" }, { value: "economic", label: "Economic" }, { value: "historical", label: "Historical" },
    { value: "cultural", label: "Cultural" }, { value: "symbolic", label: "Symbolic" }, { value: "supernatural", label: "Supernatural" }, { value: "multiple", label: "Multiple" }, { value: "unknown", label: "Unknown" },
  ]), allowOther: true },
  { id: "valueWorth", label: "Value / Worth", section: "Value", control: "text" },
  { id: "additionalInformation", label: "Additional Information", section: "Additional Information", control: "textarea" },
]

export type ItemRelationshipEntityType = "character" | "organization" | "location" | "history" | "item"
export type ItemRelationshipRole = "creator" | "current-holder" | "current-location" | "associated-history" | "related-item"
export type ItemRelationship = { role: ItemRelationshipRole; entityType: ItemRelationshipEntityType; entityId: string }

export type CanonItem = {
  id: string
  name: string
  type: ItemType
  image?: string
  summary?: string
  fieldValues: Record<string, ItemFieldValue>
  excludedFieldIds: string[]
  relationships: ItemRelationship[]
  createdAt: number
}

export type ItemEdit = Partial<Pick<CanonItem, "name" | "type" | "image" | "summary" | "fieldValues" | "excludedFieldIds" | "relationships">>

type ItemCanonContextValue = {
  items: Record<string, CanonItem>
  getItem: (id: string | null | undefined) => CanonItem | null
  updateItem: (id: string, patch: ItemEdit) => void
  addItem: (patch: ItemEdit) => string
}

const ItemCanonContext = createContext<ItemCanonContextValue | null>(null)

function makeId(name: string, existing: Record<string, CanonItem>): string {
  const base = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "item"
  let id = base
  let suffix = 2
  while (existing[id]) id = `${base}-${suffix++}`
  return id
}

export function ItemCanonProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, CanonItem>>(() =>
    Object.fromEntries(
      Object.entries(redRisingDemo.items as unknown as Record<string, CanonItem>).map(([id, record]) => [id, { ...record, image: redRisingImage("item", id) }]),
    ),
  )
  const getItem = useCallback((id: string | null | undefined) => (id ? items[id] ?? null : null), [items])
  const updateItem = useCallback((id: string, patch: ItemEdit) => {
    setItems((previous) => {
      const existing = previous[id]
      if (!existing) return previous
      return {
        ...previous,
        [id]: {
          ...existing,
          ...patch,
          name: patch.name?.trim() || existing.name,
          fieldValues: patch.fieldValues ? { ...existing.fieldValues, ...patch.fieldValues } : existing.fieldValues,
          excludedFieldIds: patch.excludedFieldIds ? [...new Set(patch.excludedFieldIds)] : existing.excludedFieldIds,
          relationships: patch.relationships ?? existing.relationships,
        },
      }
    })
  }, [])
  const addItem = useCallback((patch: ItemEdit) => {
    let newId = ""
    setItems((previous) => {
      newId = makeId(patch.name?.trim() || "Unnamed Item", previous)
      return {
        ...previous,
        [newId]: {
          id: newId,
          name: patch.name?.trim() || "Unnamed Item",
          type: patch.type ?? "other",
          image: patch.image,
          summary: patch.summary,
          fieldValues: patch.fieldValues ?? {},
          excludedFieldIds: patch.excludedFieldIds ?? [],
          relationships: patch.relationships ?? [],
          createdAt: Date.now(),
        },
      }
    })
    return newId
  }, [])
  const value = useMemo(() => ({ items, getItem, updateItem, addItem }), [items, getItem, updateItem, addItem])
  return <ItemCanonContext.Provider value={value}>{children}</ItemCanonContext.Provider>
}

export function useItemCanon(): ItemCanonContextValue {
  const context = useContext(ItemCanonContext)
  if (!context) throw new Error("useItemCanon must be used within an ItemCanonProvider")
  return context
}
