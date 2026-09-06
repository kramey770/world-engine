"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export type ConceptQuestionId = "kind" | "domain" | "origin" | "operation"

export type ConceptOptionDefinition = {
  id: string
  label: string
  help?: string
  fieldIds: string[]
}

export type ConceptQuestionDefinition = {
  id: ConceptQuestionId
  label: string
  help: string
  options: ConceptOptionDefinition[]
}

export const CONCEPT_FIELD_SECTION_ORDER = [
  "Identity",
  "Nature / Definition",
  "Structure / Components",
  "Operation",
  "Conditions",
  "Effects",
  "Origin",
  "Emergence",
  "Practice / Performance",
  "Transmission",
  "Domain-Specific Information",
  "Limitations",
  "Additional Information",
] as const

export type ConceptFieldSection = (typeof CONCEPT_FIELD_SECTION_ORDER)[number]

export type ConceptFieldDefinition = {
  id: string
  label: string
  section: ConceptFieldSection | string
  control: "text" | "textarea" | "select"
  placeholder?: string
  help?: string
  options?: { value: string; label: string; help?: string }[]
  allowOther?: boolean
  otherLabel?: string
}

export type ConceptClassifications = Partial<Record<ConceptQuestionId, string[]>>

export type CanonConcept = {
  id: string
  name: string
  image?: string
  summary?: string
  definition?: string
  additionalInfo?: string
  classifications: ConceptClassifications
  fieldValues: Record<string, string>
  excludedFieldIds?: string[]
}

export type ConceptEdit = Partial<Pick<CanonConcept, "name" | "image" | "summary" | "definition" | "additionalInfo">> & {
  classifications?: ConceptClassifications
  fieldValues?: Record<string, string>
  excludedFieldIds?: string[]
}

type ConceptSelectOption = { value: string; label: string; help?: string }

const SELECT_OPTIONS = {
  scope: [
    { value: "individual", label: "Individual or single instance" },
    { value: "local", label: "Local or immediate area" },
    { value: "regional", label: "Regional" },
    { value: "global", label: "Global or widespread" },
    { value: "universal", label: "Universal or world-spanning" },
  ],
  effect: [
    { value: "none", label: "No direct effect" },
    { value: "minor", label: "Minor effect" },
    { value: "moderate", label: "Moderate effect" },
    { value: "major", label: "Major effect" },
    { value: "transformative", label: "Transformative effect" },
  ],
  requirement: [
    { value: "none", label: "No special requirement" },
    { value: "knowledge", label: "Knowledge or understanding" },
    { value: "training", label: "Training or practice" },
    { value: "resources", label: "Specific resources" },
    { value: "permission", label: "Permission or authority" },
    { value: "condition", label: "Specific condition or threshold" },
  ],
  limitation: [
    { value: "none", label: "No known limitation" },
    { value: "scope", label: "Limited scope" },
    { value: "resource", label: "Resource-dependent" },
    { value: "time", label: "Time-dependent" },
    { value: "countermeasure", label: "Can be countered or resisted" },
    { value: "risk", label: "Carries inherent risk" },
  ],
  change: [
    { value: "fixed", label: "Fixed or unchanging" },
    { value: "gradual", label: "Gradual change" },
    { value: "sudden", label: "Sudden change" },
    { value: "cyclical", label: "Recurring change" },
    { value: "adaptive", label: "Adapts to circumstances" },
  ],
  trigger: [
    { value: "none", label: "No distinct trigger" },
    { value: "external", label: "External event or signal" },
    { value: "internal", label: "Internal state or threshold" },
    { value: "environmental", label: "Environmental condition" },
    { value: "deliberate", label: "Deliberate activation" },
    { value: "scheduled", label: "Scheduled or cyclical timing" },
  ],
  persistence: [
    { value: "one-time", label: "One-time" },
    { value: "temporary", label: "Temporary" },
    { value: "recurring", label: "Recurring" },
    { value: "continuous", label: "Continuous" },
    { value: "conditional", label: "Persists while conditions hold" },
    { value: "self-sustaining", label: "Self-sustaining" },
  ],
  authority: [
    { value: "none", label: "No formal authority" },
    { value: "individual", label: "Individual authority" },
    { value: "customary", label: "Customary or traditional authority" },
    { value: "institutional", label: "Institutional authority" },
    { value: "legal", label: "Legal or state authority" },
    { value: "coercive", label: "Coercive authority" },
  ],
  transmission: [
    { value: "oral", label: "Oral or interpersonal" },
    { value: "written", label: "Written or recorded" },
    { value: "demonstrated", label: "Demonstrated or taught" },
    { value: "ritual", label: "Ritual or repeated enactment" },
    { value: "institutional", label: "Institutionally maintained" },
    { value: "inherited", label: "Inherited or embedded" },
  ],
  certainty: [
    { value: "observed", label: "Directly observed" },
    { value: "documented", label: "Documented or recorded" },
    { value: "inferred", label: "Inferred from evidence" },
    { value: "contested", label: "Contested or disputed" },
    { value: "unknown", label: "Unknown or unresolved" },
  ],
  complexity: [
    { value: "simple", label: "Simple" },
    { value: "moderate", label: "Moderately complex" },
    { value: "complex", label: "Complex" },
    { value: "highly-complex", label: "Highly complex" },
  ],
  variation: [
    { value: "none", label: "Little or no variation" },
    { value: "individual", label: "Varies by individual" },
    { value: "regional", label: "Varies by region" },
    { value: "cultural", label: "Varies by culture or group" },
    { value: "historical", label: "Varies over time" },
  ],
} satisfies Record<string, ConceptSelectOption[]>

function selectField(
  id: string,
  label: string,
  section: ConceptFieldSection,
  options: ConceptSelectOption[],
  help: string,
  allowOther = true,
): ConceptFieldDefinition {
  return {
    id,
    label,
    section,
    control: "select",
    options: allowOther ? [...options, { value: "other", label: "Other" }] : options,
    allowOther,
    help,
  }
}

export const CONCEPT_FIELD_DEFINITIONS: Record<string, ConceptFieldDefinition> = {
  conceptEssence: { id: "conceptEssence", label: "What is it?", section: "Nature / Definition", control: "textarea", placeholder: "Describe the thing, event, or idea in your own words." },
  conceptExpression: { id: "conceptExpression", label: "How does it show up?", section: "Nature / Definition", control: "textarea", placeholder: "Describe how someone would recognize or encounter it." },
  conceptParts: { id: "conceptParts", label: "What is it made of?", section: "Structure / Components", control: "textarea", placeholder: "Name the important parts, layers, or relationships." },
  conceptRole: { id: "conceptRole", label: "What role does it play?", section: "Operation", control: "textarea", placeholder: "Explain what it does or why it matters." },
  conceptOriginStory: { id: "conceptOriginStory", label: "Where did it come from?", section: "Origin", control: "textarea", placeholder: "Tell the origin story in the way that best fits this concept." },
  conceptConditions: { id: "conceptConditions", label: "When does it matter?", section: "Conditions", control: "textarea", placeholder: "Describe the circumstances that bring it into focus or make it relevant." },
  conceptContinuation: { id: "conceptContinuation", label: "What keeps it going?", section: "Operation", control: "textarea", placeholder: "Describe how it continues, spreads, or remains meaningful." },
  conceptConsequences: { id: "conceptConsequences", label: "What does it change?", section: "Effects", control: "textarea", placeholder: "Describe its effects, consequences, or possibilities." },
  manifestation: { id: "manifestation", label: "Manifestation", section: "Nature / Definition", control: "select", options: [{ value: "visible", label: "Visible" }, { value: "hidden", label: "Hidden" }, { value: "intermittent", label: "Intermittent" }, { value: "constant", label: "Constant" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other manifestation", placeholder: "How the concept appears or manifests itself." },
  behavior: { id: "behavior", label: "Behavior", section: "Operation", control: "select", options: [{ value: "passive", label: "Passive" }, { value: "active", label: "Active" }, { value: "reactive", label: "Reactive" }, { value: "adaptive", label: "Adaptive" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other behavior", placeholder: "How the concept behaves in practice." },
  effects: { id: "effects", label: "Effects", section: "Effects", control: "select", options: [{ value: "minor", label: "Minor" }, { value: "moderate", label: "Moderate" }, { value: "major", label: "Major" }, { value: "transformative", label: "Transformative" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other effect type", placeholder: "What the concept produces or changes." },
  triggersConditions: { id: "triggersConditions", label: "Triggers / Conditions", section: "Conditions", control: "select", options: [{ value: "external", label: "External trigger" }, { value: "internal", label: "Internal trigger" }, { value: "environmental", label: "Environmental condition" }, { value: "deliberate", label: "Deliberate activation" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other trigger condition", placeholder: "What causes it to activate or manifest." },
  components: { id: "components", label: "Components", section: "Structure / Components", control: "select", options: [{ value: "core", label: "Core components" }, { value: "supporting", label: "Supporting components" }, { value: "nested", label: "Nested system" }, { value: "distributed", label: "Distributed network" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other components", placeholder: "What parts make it up." },
  structure: { id: "structure", label: "Structure", section: "Structure / Components", control: "select", options: [{ value: "linear", label: "Linear" }, { value: "networked", label: "Networked" }, { value: "hierarchical", label: "Hierarchical" }, { value: "modular", label: "Modular" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other structure", placeholder: "How the concept is organized." },
  function: { id: "function", label: "Function", section: "Operation", control: "select", options: [{ value: "regulatory", label: "Regulatory" }, { value: "productive", label: "Productive" }, { value: "protective", label: "Protective" }, { value: "interpretive", label: "Interpretive" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other function", placeholder: "What it does and how it works." },
  interactions: { id: "interactions", label: "Interactions", section: "Operation", control: "select", options: [{ value: "limited", label: "Limited" }, { value: "reciprocal", label: "Reciprocal" }, { value: "competitive", label: "Competitive" }, { value: "cooperative", label: "Cooperative" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other interaction pattern", placeholder: "How it interacts with other elements." },
  mechanism: { id: "mechanism", label: "Mechanism", section: "Structure / Components", control: "select", options: [{ value: "causal", label: "Causal" }, { value: "feedback", label: "Feedback-based" }, { value: "symbolic", label: "Symbolic" }, { value: "material", label: "Material" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other mechanism", placeholder: "What drives the process." },
  inputs: { id: "inputs", label: "Inputs", section: "Operation", control: "select", options: [{ value: "energy", label: "Energy" }, { value: "materials", label: "Materials" }, { value: "knowledge", label: "Knowledge" }, { value: "authority", label: "Authority" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other input type", placeholder: "What is required for it to act." },
  process: { id: "process", label: "Process", section: "Operation", control: "select", options: [{ value: "incremental", label: "Incremental" }, { value: "rapid", label: "Rapid" }, { value: "gradual", label: "Gradual" }, { value: "instant", label: "Instant" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other process type", placeholder: "What sequence or progression it follows." },
  result: { id: "result", label: "Result", section: "Effects", control: "select", options: [{ value: "change", label: "Change" }, { value: "stability", label: "Stability" }, { value: "creation", label: "Creation" }, { value: "destruction", label: "Destruction" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other result", placeholder: "What it produces or concludes." },
  principle: { id: "principle", label: "Principle", section: "Nature / Definition", control: "select", options: [{ value: "balance", label: "Balance" }, { value: "equilibrium", label: "Equilibrium" }, { value: "reciprocity", label: "Reciprocity" }, { value: "dominance", label: "Dominance" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other principle", placeholder: "The governing principle behind it." },
  scope: { id: "scope", label: "Scope", section: "Nature / Definition", control: "select", options: [{ value: "local", label: "Local" }, { value: "regional", label: "Regional" }, { value: "global", label: "Global" }, { value: "universal", label: "Universal" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other scope", placeholder: "Where or under what circumstances it applies." },
  implications: { id: "implications", label: "Implications", section: "Effects", control: "select", options: [{ value: "benefit", label: "Benefit" }, { value: "cost", label: "Cost" }, { value: "risk", label: "Risk" }, { value: "repercussion", label: "Repercussion" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other implication", placeholder: "Consequences or knock-on effects." },
  exceptions: { id: "exceptions", label: "Exceptions", section: "Limitations", control: "select", options: [{ value: "rare", label: "Rare" }, { value: "specific", label: "Specific" }, { value: "conditional", label: "Conditional" }, { value: "none", label: "None" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other exception", placeholder: "When it does not apply or breaks down." },
  rule: { id: "rule", label: "Rule", section: "Nature / Definition", control: "select", options: [{ value: "binding", label: "Binding" }, { value: "advisory", label: "Advisory" }, { value: "customary", label: "Customary" }, { value: "ritual", label: "Ritual" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other rule type", placeholder: "The rule itself." },
  application: { id: "application", label: "Application", section: "Practice / Performance", control: "select", options: [{ value: "formal", label: "Formal" }, { value: "informal", label: "Informal" }, { value: "ritualized", label: "Ritualized" }, { value: "everyday", label: "Everyday" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other application", placeholder: "How it is applied." },
  consequences: { id: "consequences", label: "Consequences", section: "Effects", control: "select", options: [{ value: "beneficial", label: "Beneficial" }, { value: "harmful", label: "Harmful" }, { value: "neutral", label: "Neutral" }, { value: "ambiguous", label: "Ambiguous" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other consequence", placeholder: "What follows from applying it." },
  procedure: { id: "procedure", label: "Procedure", section: "Practice / Performance", control: "select", options: [{ value: "simple", label: "Simple" }, { value: "complex", label: "Complex" }, { value: "ritual", label: "Ritual" }, { value: "repeated", label: "Repeated" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other procedure", placeholder: "The method or procedure used." },
  purpose: { id: "purpose", label: "Purpose", section: "Nature / Definition", control: "select", options: [{ value: "survival", label: "Survival" }, { value: "order", label: "Order" }, { value: "knowledge", label: "Knowledge" }, { value: "control", label: "Control" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other purpose", placeholder: "Why the practice exists." },
  requirements: { id: "requirements", label: "Requirements", section: "Conditions", control: "select", options: [{ value: "training", label: "Training" }, { value: "resources", label: "Resources" }, { value: "permission", label: "Permission" }, { value: "condition", label: "Specific condition" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other requirement", placeholder: "What is needed before it can operate." },
  outcomes: { id: "outcomes", label: "Outcomes", section: "Effects", control: "select", options: [{ value: "success", label: "Success" }, { value: "partial", label: "Partial success" }, { value: "failure", label: "Failure" }, { value: "transformation", label: "Transformation" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other outcome", placeholder: "What practice produces." },
  stages: { id: "stages", label: "Stages", section: "Operation", control: "select", options: [{ value: "beginning", label: "Beginning" }, { value: "middle", label: "Middle" }, { value: "end", label: "End" }, { value: "repeating", label: "Repeating" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other stage pattern", placeholder: "The stages or phases in sequence." },
  progression: { id: "progression", label: "Progression", section: "Operation", control: "select", options: [{ value: "linear", label: "Linear" }, { value: "cyclic", label: "Cyclic" }, { value: "spiraling", label: "Spiraling" }, { value: "erratic", label: "Erratic" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other progression", placeholder: "How it advances or moves forward." },
  outcome: { id: "outcome", label: "Outcome", section: "Effects", control: "select", options: [{ value: "victory", label: "Victory" }, { value: "resolution", label: "Resolution" }, { value: "failure", label: "Failure" }, { value: "change", label: "Change" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other outcome", placeholder: "The final result of the process." },
  definitionCriteria: { id: "definitionCriteria", label: "Definition / Criteria", section: "Nature / Definition", control: "select", options: [{ value: "observable", label: "Observable" }, { value: "inherent", label: "Inherent" }, { value: "social", label: "Social" }, { value: "legal", label: "Legal" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other criterion", placeholder: "What defines the state or condition." },
  entryConditions: { id: "entryConditions", label: "Entry Conditions", section: "Conditions", control: "select", options: [{ value: "trigger", label: "Trigger" }, { value: "permission", label: "Permission" }, { value: "threshold", label: "Threshold" }, { value: "prerequisite", label: "Prerequisite" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other entry condition", placeholder: "What must exist before the state is entered." },
  characteristics: { id: "characteristics", label: "Characteristics", section: "Nature / Definition", control: "select", options: [{ value: "stable", label: "Stable" }, { value: "volatile", label: "Volatile" }, { value: "visible", label: "Visible" }, { value: "hidden", label: "Hidden" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other characteristic", placeholder: "What distinguishes the condition or state." },
  exitConditions: { id: "exitConditions", label: "Exit Conditions", section: "Conditions", control: "select", options: [{ value: "completion", label: "Completion" }, { value: "failure", label: "Failure" }, { value: "reset", label: "Reset" }, { value: "discovery", label: "Discovery" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other exit condition", placeholder: "What causes the state to end." },
  coreIdea: { id: "coreIdea", label: "Core Idea", section: "Nature / Definition", control: "select", options: [{ value: "truth", label: "Truth" }, { value: "order", label: "Order" }, { value: "balance", label: "Balance" }, { value: "identity", label: "Identity" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other core idea", placeholder: "The central idea or belief." },
  basis: { id: "basis", label: "Basis", section: "Nature / Definition", control: "select", options: [{ value: "evidence", label: "Evidence" }, { value: "tradition", label: "Tradition" }, { value: "authority", label: "Authority" }, { value: "experience", label: "Experience" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other basis", placeholder: "What it rests on or is based upon." },
  interpretations: { id: "interpretations", label: "Interpretations", section: "Nature / Definition", control: "select", options: [{ value: "literal", label: "Literal" }, { value: "symbolic", label: "Symbolic" }, { value: "political", label: "Political" }, { value: "cultural", label: "Cultural" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other interpretation", placeholder: "How different parties understand or read it." },
  method: { id: "method", label: "Method", section: "Practice / Performance", control: "select", options: [{ value: "trial", label: "Trial and error" }, { value: "study", label: "Study" }, { value: "ritual", label: "Ritual" }, { value: "manual", label: "Manual" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other method", placeholder: "The method or technique used." },
  categoriesComponents: { id: "categoriesComponents", label: "Categories / Components", section: "Structure / Components", control: "select", options: [{ value: "classes", label: "Classes" }, { value: "tiers", label: "Tiers" }, { value: "systems", label: "Systems" }, { value: "ranks", label: "Ranks" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other category", placeholder: "Major categories, elements, or parts." },
  limitations: { id: "limitations", label: "Limitations", section: "Limitations", control: "select", options: [{ value: "scope", label: "Scope" }, { value: "resource", label: "Resource" }, { value: "time", label: "Time" }, { value: "risk", label: "Risk" }, { value: "other", label: "Other" }], allowOther: true, otherLabel: "Other limitation", placeholder: "What restricts or confines it." },
  conceptDefinition: { id: "conceptDefinition", label: "Concept Definition", section: "Nature / Definition", control: "textarea", placeholder: "A precise definition of the concept." },
  functionSignificance: { id: "functionSignificance", label: "Function / Significance", section: "Operation", control: "textarea", placeholder: "Why it matters or what role it plays." },
  additionalContext: { id: "additionalContext", label: "Additional Context", section: "Additional Information", control: "textarea", placeholder: "Other important context." },
  physicalProperties: { id: "physicalProperties", label: "Physical Properties", section: "Domain-Specific Information", control: "textarea", placeholder: "Observable or material properties." },
  physicalBehavior: selectField("physicalBehavior", "Physical Behavior", "Domain-Specific Information", SELECT_OPTIONS.change, "Choose the broad physical behavior pattern; describe the exact behavior in the definition or additional information."),
  physicalEffects: selectField("physicalEffects", "Physical Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the physical effect."),
  physicalLimitations: selectField("physicalLimitations", "Physical Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main type of physical constraint."),
  biologicalBasis: selectField("biologicalBasis", "Biological Basis", "Domain-Specific Information", SELECT_OPTIONS.complexity, "Choose how complex the biological basis is; describe the mechanism in prose if needed."),
  biologicalProcess: selectField("biologicalProcess", "Biological Process", "Domain-Specific Information", SELECT_OPTIONS.change, "Choose the broad pattern of the biological process."),
  biologicalEffects: selectField("biologicalEffects", "Biological Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the biological effect."),
  biologicalLimitations: selectField("biologicalLimitations", "Biological Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main type of biological constraint."),
  individualExperience: { id: "individualExperience", label: "Individual Experience", section: "Domain-Specific Information", control: "textarea", placeholder: "How it feels or is experienced by an individual." },
  mentalCognitiveEffects: selectField("mentalCognitiveEffects", "Mental / Cognitive Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the mental or cognitive effect."),
  perception: selectField("perception", "Perception", "Domain-Specific Information", SELECT_OPTIONS.certainty, "Choose how reliably the concept is perceived or recognized."),
  individualLimitations: selectField("individualLimitations", "Individual Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main type of limitation for an individual."),
  socialFunction: selectField("socialFunction", "Social Function", "Domain-Specific Information", SELECT_OPTIONS.authority, "Choose the social role or authority pattern that best fits."),
  socialEffects: selectField("socialEffects", "Social Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the social effect."),
  socialConditions: selectField("socialConditions", "Social Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the type of social condition that sustains or shapes it."),
  socialConsequences: selectField("socialConsequences", "Social Consequences", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the broader social consequence."),
  culturalMeaning: { id: "culturalMeaning", label: "Cultural Meaning", section: "Domain-Specific Information", control: "textarea", placeholder: "The culture-specific meaning of the concept." },
  culturalExpression: { id: "culturalExpression", label: "Cultural Expression", section: "Domain-Specific Information", control: "textarea", placeholder: "How it is expressed in culture." },
  culturalEffects: selectField("culturalEffects", "Cultural Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the cultural effect."),
  culturalVariation: selectField("culturalVariation", "Cultural Variation", "Domain-Specific Information", SELECT_OPTIONS.variation, "Choose how the concept varies across cultures or groups."),
  supernaturalNature: selectField("supernaturalNature", "Supernatural / Metaphysical Nature", "Domain-Specific Information", SELECT_OPTIONS.certainty, "Choose how the supernatural or metaphysical nature is established."),
  manifestationDomain: selectField("manifestationDomain", "Manifestation", "Domain-Specific Information", SELECT_OPTIONS.effect, "Choose the broad strength of its supernatural or metaphysical manifestation."),
  capabilitiesEffects: selectField("capabilitiesEffects", "Capabilities / Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of what it can do or alter."),
  supernaturalLimitations: selectField("supernaturalLimitations", "Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main supernatural or metaphysical constraint."),
  technologicalBasis: selectField("technologicalBasis", "Technological Basis", "Domain-Specific Information", SELECT_OPTIONS.complexity, "Choose the complexity of the technology or mechanism it depends on."),
  technicalOperation: selectField("technicalOperation", "Technical Operation", "Domain-Specific Information", SELECT_OPTIONS.change, "Choose the broad technical operation pattern."),
  technicalRequirements: selectField("technicalRequirements", "Technical Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main type of technical requirement."),
  technicalLimitations: selectField("technicalLimitations", "Technical Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main technical constraint or failure mode."),
  environmentalRelationship: { id: "environmentalRelationship", label: "Environmental Relationship", section: "Domain-Specific Information", control: "textarea", placeholder: "How it relates to environment or setting." },
  environmentalConditions: selectField("environmentalConditions", "Environmental Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the type of environmental condition that matters."),
  environmentalEffects: selectField("environmentalEffects", "Environmental Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the environmental effect."),
  environmentalLimitations: selectField("environmentalLimitations", "Environmental Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main environmental constraint or boundary."),
  combatApplication: selectField("combatApplication", "Combat Application", "Domain-Specific Information", SELECT_OPTIONS.scope, "Choose the scale at which it is applied in combat or conflict."),
  tacticalEffects: selectField("tacticalEffects", "Tactical Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the tactical effect."),
  combatRequirements: selectField("combatRequirements", "Combat Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main requirement for combat use."),
  combatLimitations: selectField("combatLimitations", "Limitations / Countermeasures", "Limitations", SELECT_OPTIONS.limitation, "Choose the main countermeasure or combat boundary."),
  economicFunction: selectField("economicFunction", "Economic Function", "Domain-Specific Information", SELECT_OPTIONS.authority, "Choose the economic role or relationship it represents."),
  valueUtility: selectField("valueUtility", "Value / Utility", "Domain-Specific Information", SELECT_OPTIONS.effect, "Choose the broad value or utility pattern."),
  resourceRequirements: selectField("resourceRequirements", "Resource Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main type of resource requirement."),
  economicEffects: selectField("economicEffects", "Economic Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the economic effect."),
  governanceFunction: selectField("governanceFunction", "Governance Function", "Domain-Specific Information", SELECT_OPTIONS.authority, "Choose the authority or governance role it represents."),
  authority: selectField("authority", "Authority", "Domain-Specific Information", SELECT_OPTIONS.authority, "Choose the kind of authority the concept carries or invokes."),
  applicationPolitical: selectField("applicationPolitical", "Application", "Practice / Performance", SELECT_OPTIONS.authority, "Choose the authority context in which it is applied politically."),
  politicalConsequences: selectField("politicalConsequences", "Political Consequences", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the political consequence."),
  temporalCausalPrinciple: { id: "temporalCausalPrinciple", label: "Temporal / Causal Principle", section: "Nature / Definition", control: "textarea", placeholder: "The temporal or causal idea behind it." },
  relevantConditions: selectField("relevantConditions", "Relevant Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the type of condition that matters to the temporal or causal concept."),
  causalTemporalEffects: selectField("causalTemporalEffects", "Causal / Temporal Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the causal or temporal effect."),
  temporalLimitations: selectField("temporalLimitations", "Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main temporal or causal boundary."),
  domainDefinition: selectField("domainDefinition", "Domain Definition", "Domain-Specific Information", SELECT_OPTIONS.certainty, "Choose how clearly the domain is established."),
  domainEffects: selectField("domainEffects", "Domain Effects", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the domain effect."),
  domainConditions: selectField("domainConditions", "Domain Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the main domain-specific requirement."),
  domainLimitations: selectField("domainLimitations", "Domain Limitations", "Limitations", SELECT_OPTIONS.limitation, "Choose the main domain-specific constraint."),
  naturalOrigin: { id: "naturalOrigin", label: "Natural Origin", section: "Origin", control: "textarea", placeholder: "How it arises naturally." },
  occurrence: selectField("occurrence", "Occurrence", "Origin", SELECT_OPTIONS.scope, "Choose the broad scale at which it naturally occurs."),
  naturalConditions: selectField("naturalConditions", "Natural Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the main condition that allows it to originate or exist naturally."),
  naturalVariability: selectField("naturalVariability", "Natural Variability", "Origin", SELECT_OPTIONS.variation, "Choose how its natural occurrence varies."),
  creationOrigin: selectField("creationOrigin", "Creation Origin", "Origin", SELECT_OPTIONS.authority, "Choose the type of agent or authority responsible for its creation."),
  creationPurpose: selectField("creationPurpose", "Creation Purpose", "Origin", SELECT_OPTIONS.effect, "Choose the broad intended result of its creation."),
  creationRequirements: selectField("creationRequirements", "Creation Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main requirement for creating it."),
  modificationDevelopment: selectField("modificationDevelopment", "Modification / Development", "Operation", SELECT_OPTIONS.change, "Choose how its design or form can change."),
  discovery: selectField("discovery", "Discovery", "Origin", SELECT_OPTIONS.certainty, "Choose how confidently its discovery or recognition is established."),
  evidenceOfExistence: selectField("evidenceOfExistence", "Evidence of Existence", "Origin", SELECT_OPTIONS.certainty, "Choose the strongest available evidence for its existence."),
  discoverability: selectField("discoverability", "Discoverability", "Origin", SELECT_OPTIONS.certainty, "Choose how readily it can be detected or recognized."),
  unknownUnresolved: selectField("unknownUnresolved", "Unknown / Unresolved Aspects", "Origin", SELECT_OPTIONS.certainty, "Choose whether important origin questions remain unresolved.", false),
  underlyingElements: selectField("underlyingElements", "Underlying Elements", "Emergence", SELECT_OPTIONS.complexity, "Choose the complexity of the elements whose interaction produces the emergence."),
  emergenceProcess: selectField("emergenceProcess", "Emergence Process", "Emergence", SELECT_OPTIONS.change, "Choose the broad pattern by which the concept emerges."),
  emergenceConditionsThreshold: selectField("emergenceConditionsThreshold", "Emergence Conditions / Threshold", "Conditions", SELECT_OPTIONS.trigger, "Choose what kind of threshold or condition precedes emergence."),
  emergentCharacteristics: selectField("emergentCharacteristics", "Emergent Characteristics", "Emergence", SELECT_OPTIONS.variation, "Choose how the resulting properties vary."),
  basisOfInherence: selectField("basisOfInherence", "Basis of Inherence", "Origin", SELECT_OPTIONS.certainty, "Choose how the inherent quality is established."),
  manifestationInherent: selectField("manifestationInherent", "Manifestation", "Emergence", SELECT_OPTIONS.scope, "Choose the scale at which the inherent property appears."),
  scopeOfInherence: selectField("scopeOfInherence", "Scope of Inherence", "Origin", SELECT_OPTIONS.scope, "Choose what scale or range possesses the inherent quality."),
  origin: { id: "origin", label: "Origin", section: "Origin", control: "textarea", placeholder: "How the concept came into existence." },
  originConditions: selectField("originConditions", "Origin Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the main circumstances that produced it."),
  originCharacteristics: selectField("originCharacteristics", "Origin Characteristics", "Origin", SELECT_OPTIONS.variation, "Choose how unusual or variable its origin is."),
  additionalOriginContext: { id: "additionalOriginContext", label: "Additional Origin Context", section: "Additional Information", control: "textarea", placeholder: "Other origin-specific information." },
  learningMethod: selectField("learningMethod", "Learning Method", "Practice / Performance", SELECT_OPTIONS.transmission, "Choose how knowledge of the concept is acquired."),
  knowledgeRequirements: selectField("knowledgeRequirements", "Knowledge Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main kind of prior knowledge required."),
  learningDifficulty: {
    id: "learningDifficulty",
    label: "Learning Difficulty",
    section: "Conditions",
    control: "select",
    help: "Use the closest overall difficulty; explain unusual factors in Additional Information.",
    options: [
      { value: "trivial", label: "Trivial" },
      { value: "accessible", label: "Accessible" },
      { value: "moderate", label: "Moderate" },
      { value: "difficult", label: "Difficult" },
      { value: "exceptional", label: "Exceptional" },
      { value: "unknown", label: "Unknown" },
    ],
  },
  failureMisunderstanding: selectField("failureMisunderstanding", "Failure / Misunderstanding", "Limitations", SELECT_OPTIONS.effect, "Choose the overall consequence of misunderstanding it."),
  performance: selectField("performance", "Performance", "Practice / Performance", SELECT_OPTIONS.transmission, "Choose the broad way it is performed or enacted."),
  practiceRequirements: selectField("practiceRequirements", "Practice Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main requirement for practicing it."),
  frequencyContinuity: {
    id: "frequencyContinuity",
    label: "Frequency / Continuity",
    section: "Conditions",
    control: "select",
    help: "Choose the practice pattern, then describe the exact cadence in Additional Information if needed.",
    options: [
      { value: "one-time", label: "One-time" },
      { value: "occasional", label: "Occasional" },
      { value: "regular", label: "Regular" },
      { value: "continuous", label: "Continuous" },
      { value: "cyclical", label: "Cyclical" },
      { value: "variable", label: "Variable" },
    ],
  },
  resultsOfPractice: { id: "resultsOfPractice", label: "Results of Practice", section: "Effects", control: "textarea", placeholder: "What practice produces." },
  basisOfBelief: selectField("basisOfBelief", "Basis of Belief", "Nature / Definition", SELECT_OPTIONS.certainty, "Choose what kind of basis supports belief or acceptance."),
  beliefConditions: selectField("beliefConditions", "Belief Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose what sustains or enables belief."),
  effectsOfBelief: selectField("effectsOfBelief", "Effects of Belief", "Effects", SELECT_OPTIONS.effect, "Choose the overall magnitude of the effect of belief."),
  disbeliefRejection: selectField("disbeliefRejection", "Disbelief / Rejection", "Limitations", SELECT_OPTIONS.effect, "Choose the overall consequence when the concept is rejected."),
  sourceOfImposition: selectField("sourceOfImposition", "Source of Imposition", "Origin", SELECT_OPTIONS.authority, "Choose what kind of authority establishes or imposes it."),
  meansOfEnforcement: selectField("meansOfEnforcement", "Means of Enforcement", "Operation", SELECT_OPTIONS.authority, "Choose the kind of authority or force that maintains compliance."),
  compliance: selectField("compliance", "Compliance", "Conditions", SELECT_OPTIONS.authority, "Choose what kind of authority defines compliance."),
  violationResistance: selectField("violationResistance", "Violation / Resistance", "Limitations", SELECT_OPTIONS.effect, "Choose the overall consequence of resistance or violation."),
  transmissionMethod: selectField("transmissionMethod", "Transmission Method", "Transmission", SELECT_OPTIONS.transmission, "Choose how the concept is passed between people, groups, or records."),
  transmissionRequirements: selectField("transmissionRequirements", "Transmission Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose the main requirement for transmission."),
  preservation: selectField("preservation", "Preservation", "Transmission", SELECT_OPTIONS.transmission, "Choose how the concept is kept accurate over time."),
  distortionChange: selectField("distortionChange", "Distortion / Change", "Transmission", SELECT_OPTIONS.change, "Choose how transmission changes the concept."),
  requiredConditions: selectField("requiredConditions", "Required Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the main condition required for operation."),
  activation: selectField("activation", "Activation", "Operation", SELECT_OPTIONS.trigger, "Choose what kind of event or condition activates it."),
  failureConditions: selectField("failureConditions", "Failure Conditions", "Limitations", SELECT_OPTIONS.limitation, "Choose the main reason operation can fail."),
  termination: selectField("termination", "Termination", "Conditions", SELECT_OPTIONS.trigger, "Choose what kind of event ends operation."),
  persistence: selectField("persistence", "Persistence", "Operation", SELECT_OPTIONS.persistence, "Choose how the concept remains active or present."),
  continuityConditions: selectField("continuityConditions", "Continuity Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose what allows the concept to continue."),
  persistenceLimits: selectField("persistenceLimits", "Persistence Limits", "Limitations", SELECT_OPTIONS.limitation, "Choose what interrupts or ends persistence."),
  durationContinuity: selectField("durationContinuity", "Duration / Continuity", "Operation", SELECT_OPTIONS.persistence, "Choose how long or under what pattern it persists."),
  triggers: selectField("triggers", "Triggers", "Conditions", SELECT_OPTIONS.trigger, "Choose what kind of event causes a response."),
  response: selectField("response", "Response", "Operation", SELECT_OPTIONS.effect, "Choose the overall strength of the response."),
  responseConditions: selectField("responseConditions", "Response Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose what determines the response."),
  responseLimits: selectField("responseLimits", "Response Limits", "Limitations", SELECT_OPTIONS.limitation, "Choose the main limit on the response."),
  selfSustainingMechanism: selectField("selfSustainingMechanism", "Self-Sustaining Mechanism", "Operation", SELECT_OPTIONS.persistence, "Choose how it maintains itself."),
  sustainingRequirements: selectField("sustainingRequirements", "Sustaining Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose what it needs to continue."),
  internalFeedback: selectField("internalFeedback", "Internal Feedback", "Operation", SELECT_OPTIONS.change, "Choose how internal feedback changes or stabilizes it."),
  selfSustainingFailure: selectField("selfSustainingFailure", "Failure Conditions", "Limitations", SELECT_OPTIONS.limitation, "Choose what can cause self-sustaining behavior to fail."),
  cycleStructure: selectField("cycleStructure", "Cycle Structure", "Operation", SELECT_OPTIONS.complexity, "Choose the complexity of the recurring cycle."),
  cycleTrigger: selectField("cycleTrigger", "Cycle Trigger", "Conditions", SELECT_OPTIONS.trigger, "Choose what begins the cycle."),
  cycleProgression: selectField("cycleProgression", "Cycle Progression", "Operation", SELECT_OPTIONS.change, "Choose how the cycle moves between phases."),
  cycleCompletionReset: selectField("cycleCompletionReset", "Cycle Completion / Reset", "Conditions", SELECT_OPTIONS.trigger, "Choose what kind of event completes or resets the cycle."),
  adaptationMechanism: selectField("adaptationMechanism", "Adaptation Mechanism", "Operation", SELECT_OPTIONS.change, "Choose how the concept changes in response to circumstances."),
  adaptationTriggers: selectField("adaptationTriggers", "Adaptation Triggers", "Conditions", SELECT_OPTIONS.trigger, "Choose what causes adaptation."),
  rangeOfVariation: selectField("rangeOfVariation", "Range of Variation", "Domain-Specific Information", SELECT_OPTIONS.variation, "Choose what kind of variation is possible."),
  adaptationLimits: selectField("adaptationLimits", "Adaptation Limits", "Limitations", SELECT_OPTIONS.limitation, "Choose what restricts adaptation."),
  operatingMode: selectField("operatingMode", "Operating Mode", "Operation", SELECT_OPTIONS.persistence, "Choose how the concept operates or persists."),
  operatingRequirements: selectField("operatingRequirements", "Operating Requirements", "Conditions", SELECT_OPTIONS.requirement, "Choose what the concept depends upon."),
  operatingCharacteristics: selectField("operatingCharacteristics", "Operating Characteristics", "Nature / Definition", SELECT_OPTIONS.change, "Choose the broad behavior pattern that distinguishes it."),
  specialOperatingConditions: selectField("specialOperatingConditions", "Special Operating Conditions", "Conditions", SELECT_OPTIONS.requirement, "Choose the kind of unusual condition affecting operation."),
  otherDomainDefinition: { id: "otherDomainDefinition", label: "Domain Definition", section: "Domain-Specific Information", control: "textarea", placeholder: "How the domain is defined." },
  otherDomainEffects: { id: "otherDomainEffects", label: "Domain Effects", section: "Effects", control: "textarea", placeholder: "Its effects within the domain." },
  otherDomainConditions: { id: "otherDomainConditions", label: "Domain Conditions", section: "Conditions", control: "textarea", placeholder: "What domain-specific conditions matter." },
  otherDomainLimitations: { id: "otherDomainLimitations", label: "Domain Limitations", section: "Limitations", control: "textarea", placeholder: "Domain-specific boundaries or limits." },
}

export const CONCEPT_QUESTIONS: ConceptQuestionDefinition[] = [
  {
    id: "kind",
    label: "What kind of concept is this?",
    help: "Choose every fit that genuinely belongs. This is a light guide, not a complete taxonomy.",
    options: [
      { id: "thing-event", label: "Something that happens", help: "A happening, condition, or reality someone can encounter.", fieldIds: ["conceptEssence", "conceptExpression", "effects"] },
      { id: "system", label: "A living arrangement", help: "A connected set of parts that shape one another.", fieldIds: ["conceptParts", "conceptRole", "structure"] },
      { id: "principle-rule", label: "A rule of the world", help: "A governing idea, constraint, or expectation.", fieldIds: ["conceptEssence", "conceptConditions", "conceptConsequences"] },
      { id: "practice-method", label: "A way of doing", help: "A repeated action, discipline, or technique used on purpose.", fieldIds: ["conceptEssence", "conceptConditions", "conceptConsequences"] },
      { id: "state-condition", label: "A state someone can enter", help: "A status or circumstance with a recognizable boundary.", fieldIds: ["conceptEssence", "conceptConditions", "conceptExpression"] },
      { id: "idea-belief", label: "An idea people carry", help: "A value, interpretation, or understanding held by someone.", fieldIds: ["conceptEssence", "conceptRole", "conceptConsequences"] },
    ],
  },
  {
    id: "domain",
    label: "What area does it mainly concern?",
    help: "Choose every area that genuinely belongs. Add nuance in the writing fields rather than forcing a perfect label.",
    options: [
      { id: "physical", label: "Matter and force", help: "Objects, materials, motion, energy, or observable reality.", fieldIds: ["conceptEssence", "physicalProperties", "conceptConsequences"] },
      { id: "living", label: "Life and the body", help: "Bodies, growth, illness, instincts, or natural biology.", fieldIds: ["conceptEssence", "biologicalBasis", "conceptConsequences"] },
      { id: "mind", label: "Thought and perception", help: "Memory, feeling, attention, belief, or learning.", fieldIds: ["individualExperience", "conceptRole", "conceptConsequences"] },
      { id: "society", label: "People and culture", help: "Relationships, customs, shared meaning, or community life.", fieldIds: ["culturalMeaning", "conceptRole", "conceptConsequences"] },
      { id: "power", label: "Authority and power", help: "Law, institutions, leadership, control, or political structure.", fieldIds: ["conceptRole", "authority", "conceptConsequences"] },
      { id: "mystic", label: "The unseen", help: "Magic, spirit, divine force, or metaphysical reality.", fieldIds: ["conceptEssence", "supernaturalNature", "conceptConsequences"] },
      { id: "technology", label: "Tools and craft", help: "Machines, engineered systems, materials, or technical methods.", fieldIds: ["conceptParts", "technologicalBasis", "conceptRole"] },
      { id: "environment", label: "Place and ecology", help: "Climate, landscapes, ecosystems, or natural conditions.", fieldIds: ["environmentalRelationship", "conceptConditions", "conceptConsequences"] },
    ],
  },
  {
    id: "origin",
    label: "How did it come to exist?",
    help: "Choose every origin thread that genuinely applies. The prose field is where the real story belongs.",
    options: [
      { id: "natural", label: "It grew there", help: "It arises without deliberate design.", fieldIds: ["conceptOriginStory", "naturalOrigin", "conceptConditions"] },
      { id: "created", label: "Someone made it", help: "It was made, designed, or intentionally altered.", fieldIds: ["conceptOriginStory", "creationOrigin", "creationPurpose"] },
      { id: "discovered", label: "Someone found it", help: "It already existed and was later noticed or understood.", fieldIds: ["conceptOriginStory", "discovery", "evidenceOfExistence"] },
      { id: "emergent", label: "It arose between things", help: "It appears from interaction, pattern, or accumulation.", fieldIds: ["conceptOriginStory", "underlyingElements", "emergenceProcess"] },
      { id: "inherent", label: "It was there all along", help: "It is part of the nature of something else.", fieldIds: ["conceptOriginStory", "basisOfInherence", "scopeOfInherence"] },
    ],
  },
  {
    id: "operation",
    label: "How does it keep working or matter?",
    help: "Choose every operating pattern that genuinely applies. Leave the details in your own words.",
    options: [
      { id: "learned", label: "It must be learned", help: "It depends on study, teaching, or instruction.", fieldIds: ["conceptContinuation", "learningMethod", "knowledgeRequirements"] },
      { id: "practiced", label: "It must be practiced", help: "It remains active through use or repetition.", fieldIds: ["conceptContinuation", "performance", "practiceRequirements"] },
      { id: "believed", label: "People have to believe it", help: "It works through recognition, trust, or shared belief.", fieldIds: ["conceptContinuation", "basisOfBelief", "effectsOfBelief"] },
      { id: "imposed", label: "Someone keeps it in force", help: "It persists through authority, force, or compliance.", fieldIds: ["conceptContinuation", "sourceOfImposition", "meansOfEnforcement"] },
      { id: "transmitted", label: "It travels between people", help: "It spreads by teaching, copying, or carrying forward.", fieldIds: ["conceptContinuation", "transmissionMethod", "preservation"] },
      { id: "triggered", label: "Something sets it off", help: "It responds when a condition or event occurs.", fieldIds: ["conceptConditions", "triggers", "response"] },
      { id: "ongoing", label: "It keeps going", help: "It continues without constant reactivation.", fieldIds: ["conceptContinuation", "persistence", "continuityConditions"] },
    ],
  },
]

export function getConceptFieldDefinitionsForSelections(
  selections: ConceptClassifications,
  hiddenFieldIds: string[] = [],
): ConceptFieldDefinition[] {
  const ids = new Set<string>()

  for (const question of CONCEPT_QUESTIONS) {
    const selected = selections[question.id] ?? []
    for (const optionId of selected) {
      const option = question.options.find((candidate) => candidate.id === optionId)
      if (!option) continue
      for (const fieldId of option.fieldIds) {
        ids.add(fieldId)
      }
    }
  }

  const hidden = new Set(hiddenFieldIds)

  const fieldDefinitions = Array.from(ids)
    .map((id) => CONCEPT_FIELD_DEFINITIONS[id])
    .filter((field): field is ConceptFieldDefinition => Boolean(field))
    .filter((field) => !hidden.has(field.id))

  const sectionOrder = new Map<string, number>(CONCEPT_FIELD_SECTION_ORDER.map((label, index) => [label, index]))

  return fieldDefinitions.sort((a, b) => {
    const sectionA = sectionOrder.get(String(a.section)) ?? Number.MAX_SAFE_INTEGER
    const sectionB = sectionOrder.get(String(b.section)) ?? Number.MAX_SAFE_INTEGER
    if (sectionA !== sectionB) return sectionA - sectionB
    return a.label.localeCompare(b.label)
  })
}

export function getConceptOptionLabel(questionId: ConceptQuestionId, optionId: string): string {
  const question = CONCEPT_QUESTIONS.find((candidate) => candidate.id === questionId)
  return question?.options.find((option) => option.id === optionId)?.label ?? optionId
}

const ALL_CONCEPT_CLASSIFICATIONS: ConceptClassifications = Object.fromEntries(
  CONCEPT_QUESTIONS.map((question) => [question.id, question.options.map((option) => option.id)]),
)

const CONCEPT_STRESS_FIELDS: Record<string, string> = Object.fromEntries(
  Object.values(CONCEPT_FIELD_DEFINITIONS).map((field) => [
    field.id,
    field.control === "select" ? field.options?.[0]?.value ?? "documented" : `Stress-test value for ${field.label.toLowerCase()}.`,
  ]),
)

const ConceptCanonContext = createContext<{
  concepts: Record<string, CanonConcept>
  getConcept: (id: string | null | undefined) => CanonConcept | null
  updateConcept: (id: string, patch: ConceptEdit) => void
  addConcept: (patch: ConceptEdit) => string
} | null>(null)

function makeId(name: string, existing: Record<string, CanonConcept>): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "concept"

  let id = base
  let suffix = 2
  while (existing[id]) {
    id = `${base}-${suffix}`
    suffix += 1
  }
  return id
}

const seedConcepts: Record<string, CanonConcept> = {
  "the-color-hierarchy": {
    id: "the-color-hierarchy",
    name: "The Color Hierarchy",
    summary: "A caste system that assigns biology, labor, and political power by color.",
    definition: "The Society's central organizing concept: humanity is divided into engineered Colors, each expected to perform a designated function beneath Gold rule.",
    additionalInfo: "Use this record to connect social structure, character motivation, institutional violence, and the trilogy's central political question.",
    classifications: {
      ...ALL_CONCEPT_CLASSIFICATIONS,
    },
    fieldValues: {
      ...CONCEPT_STRESS_FIELDS,
      conceptEssence: "A designed social order presented as natural biology.",
      conceptParts: "Colors, genetic engineering, labor assignments, education, military power, and inherited status.",
      conceptRole: "It converts inequality into a complete worldview and makes resistance appear impossible.",
      conceptOriginStory: "Created through generations of conquest and social engineering, then maintained through institutions.",
      creationPurpose: "To make a vast interplanetary civilization legible and controllable to its ruling class.",
      sourceOfImposition: "Institutional authority backed by military and economic force.",
      meansOfEnforcement: "Education, surveillance, punishment, restricted mobility, and control of resources.",
      transmissionMethod: "Inherited status, public rituals, family training, and state institutions.",
      preservation: "Each Color is taught its place from childhood and shown the hierarchy as permanent.",
      violationResistance: "Major effect",
      persistence: "continuous",
      continuityConditions: "Continued control of labor, information, and organized violence.",
      conceptExpression: "The hierarchy appears in names, uniforms, education, architecture, law, and the work expected from each Color.",
      conceptConsequences: "It creates material inequality, psychological conditioning, and a political system that must constantly defend its own fiction of natural superiority.",
      physicalProperties: "The system is embodied through genetic modification, controlled environments, weapons, infrastructure, and visible markers of status.",
      culturalMeaning: "Color becomes a total identity: occupation, class, body, future, and presumed moral worth.",
      governanceFunction: "It distributes authority before any individual is born, making political exclusion appear administrative rather than violent.",
      politicalConsequences: "Resistance requires people to build trust across categories designed to prevent shared identity.",
      origin: "The hierarchy was deliberately built through conquest, biological design, labor allocation, and generations of mythmaking.",
      additionalOriginContext: "The important stress-test question is not only who created it, but which ordinary institutions keep recreating it.",
      distortionChange: "The system changes when its symbols are reclaimed and its categories begin to carry revolutionary meanings.",
      otherDomainDefinition: "Every domain of life is made to reinforce the same political arrangement.",
      otherDomainEffects: "The hierarchy shapes bodies, landscapes, economies, relationships, and expectations of the future.",
      otherDomainConditions: "It needs separation, scarcity, surveillance, and a credible threat of punishment.",
      otherDomainLimitations: "It cannot fully control memory, loyalty, improvisation, or the experience of shared suffering.",
    },
  },
  "the-rising": {
    id: "the-rising",
    name: "The Rising",
    summary: "The transformation of isolated suffering into a coalition capable of challenging the Society.",
    definition: "A revolutionary process rather than a single event: people across Colors learn to coordinate, imagine a shared future, and contest who has the right to rule.",
    additionalInfo: "Track the tension between liberation, revenge, and the practical demands of governing after a successful revolt.",
    classifications: {
      ...ALL_CONCEPT_CLASSIFICATIONS,
    },
    fieldValues: {
      ...CONCEPT_STRESS_FIELDS,
      conceptEssence: "A coalition forming across boundaries that were designed to prevent solidarity.",
      conceptParts: "Cells, symbols, shared sacrifices, military victories, political arguments, and new institutions.",
      conceptRole: "It turns the Society's greatest weakness, its internal divisions, into an opening for change.",
      conceptOriginStory: "Emerges from accumulated exploitation, organized by networks such as the Sons of Ares.",
      emergenceProcess: "Gradual growth punctuated by sudden victories and moments of public revelation.",
      transmissionMethod: "Stories, coded messages, personal loyalty, visible acts of defiance, and shared symbols.",
      performance: "Demonstrated through mutual aid, coordinated resistance, and willingness to risk status for others.",
      practiceRequirements: "Trust, communication, sacrifice, and a plan for what follows victory.",
      resultsOfPractice: "The old hierarchy loses its claim to inevitability, but power vacuums and factional conflict emerge.",
      persistence: "recurring",
      continuityConditions: "The coalition must preserve solidarity while building institutions that do not reproduce the old order.",
      conceptExpression: "The Rising appears in private acts of aid, public defections, military coordination, and new language for shared citizenship.",
      conceptConsequences: "It creates liberation and possibility, but also grief, retaliation, factionalism, and the burden of governing after victory.",
      culturalMeaning: "The movement teaches people to see identity as chosen and relational rather than assigned by an empire.",
      governanceFunction: "Its long-term test is whether rebellion can become legitimate government without becoming another hierarchy.",
      politicalConsequences: "Every victory forces the coalition to decide who speaks, who is protected, and what justice means after oppression.",
      origin: "The Rising emerges from accumulated exploitation and the discovery that isolated groups can coordinate.",
      additionalOriginContext: "The movement is strongest when its symbols remain connected to ordinary people rather than only to heroic leaders.",
      distortionChange: "As the rebellion grows, its original ideals are tested by military necessity and competing visions of the future.",
      otherDomainDefinition: "It is simultaneously a social movement, military campaign, moral argument, and succession crisis.",
      otherDomainEffects: "It changes what people believe is possible, not just who controls territory.",
      otherDomainConditions: "It requires trust across differences, communication under surveillance, and a credible promise beyond revenge.",
      otherDomainLimitations: "A coalition can win a war and still fail to create a just peace.",
    },
  },
}

export function ConceptCanonProvider({ children }: { children: ReactNode }) {
  const [concepts, setConcepts] = useState<Record<string, CanonConcept>>(() => ({ ...seedConcepts }))

  const getConcept = useCallback(
    (id: string | null | undefined): CanonConcept | null => (id ? concepts[id] ?? null : null),
    [concepts],
  )

  const updateConcept = useCallback((id: string, patch: ConceptEdit) => {
    setConcepts((previous) => {
      const existing = previous[id]
      if (!existing) return previous

      const nextExcluded = patch.excludedFieldIds
        ? [...new Set(patch.excludedFieldIds)]
        : existing.excludedFieldIds ?? []

      return {
        ...previous,
        [id]: {
          ...existing,
          name: patch.name?.trim() || existing.name,
          image: patch.image ?? existing.image,
          summary: patch.summary ?? existing.summary,
          definition: patch.definition ?? existing.definition,
          additionalInfo: patch.additionalInfo ?? existing.additionalInfo,
          classifications: patch.classifications ?? existing.classifications,
          fieldValues: patch.fieldValues ? { ...existing.fieldValues, ...patch.fieldValues } : existing.fieldValues,
          excludedFieldIds: nextExcluded,
        },
      }
    })
  }, [])

  const addConcept = useCallback((patch: ConceptEdit): string => {
    const baseName = patch.name?.trim() || "Unnamed Concept"
    let newId = ""

    setConcepts((previous) => {
      newId = makeId(baseName, previous)
      return {
        ...previous,
        [newId]: {
          id: newId,
          name: baseName,
          image: patch.image,
          summary: patch.summary,
          definition: patch.definition,
          additionalInfo: patch.additionalInfo,
          classifications: patch.classifications ?? {},
          fieldValues: patch.fieldValues ?? {},
          excludedFieldIds: patch.excludedFieldIds ?? [],
        },
      }
    })

    return newId
  }, [])

  const value = useMemo(
    () => ({ concepts, getConcept, updateConcept, addConcept }),
    [concepts, getConcept, updateConcept, addConcept],
  )

  return <ConceptCanonContext.Provider value={value}>{children}</ConceptCanonContext.Provider>
}

export function useConceptCanon() {
  const context = useContext(ConceptCanonContext)
  if (!context) throw new Error("useConceptCanon must be used within a ConceptCanonProvider")
  return context
}
