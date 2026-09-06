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
  control: "text" | "textarea"
  placeholder?: string
  help?: string
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
}

export type ConceptEdit = Partial<Pick<CanonConcept, "name" | "image" | "summary" | "definition" | "additionalInfo">> & {
  classifications?: ConceptClassifications
  fieldValues?: Record<string, string>
}

export const CONCEPT_FIELD_DEFINITIONS: Record<string, ConceptFieldDefinition> = {
  manifestation: { id: "manifestation", label: "Manifestation", section: "Nature / Definition", control: "textarea", placeholder: "How the concept appears or manifests itself." },
  behavior: { id: "behavior", label: "Behavior", section: "Operation", control: "textarea", placeholder: "How the concept behaves in practice." },
  effects: { id: "effects", label: "Effects", section: "Effects", control: "textarea", placeholder: "What the concept produces or changes." },
  triggersConditions: { id: "triggersConditions", label: "Triggers / Conditions", section: "Conditions", control: "textarea", placeholder: "What causes it to activate or manifest." },
  components: { id: "components", label: "Components", section: "Structure / Components", control: "textarea", placeholder: "What parts make it up." },
  structure: { id: "structure", label: "Structure", section: "Structure / Components", control: "textarea", placeholder: "How the concept is organized." },
  function: { id: "function", label: "Function", section: "Operation", control: "textarea", placeholder: "What it does and how it works." },
  interactions: { id: "interactions", label: "Interactions", section: "Operation", control: "textarea", placeholder: "How it interacts with other elements." },
  mechanism: { id: "mechanism", label: "Mechanism", section: "Structure / Components", control: "textarea", placeholder: "What drives the process." },
  inputs: { id: "inputs", label: "Inputs", section: "Operation", control: "textarea", placeholder: "What is required for it to act." },
  process: { id: "process", label: "Process", section: "Operation", control: "textarea", placeholder: "What sequence or progression it follows." },
  result: { id: "result", label: "Result", section: "Effects", control: "textarea", placeholder: "What it produces or concludes." },
  principle: { id: "principle", label: "Principle", section: "Nature / Definition", control: "textarea", placeholder: "The governing principle behind it." },
  scope: { id: "scope", label: "Scope", section: "Nature / Definition", control: "textarea", placeholder: "Where or under what circumstances it applies." },
  implications: { id: "implications", label: "Implications", section: "Effects", control: "textarea", placeholder: "Consequences or knock-on effects." },
  exceptions: { id: "exceptions", label: "Exceptions", section: "Limitations", control: "textarea", placeholder: "When it does not apply or breaks down." },
  rule: { id: "rule", label: "Rule", section: "Nature / Definition", control: "textarea", placeholder: "The rule itself." },
  application: { id: "application", label: "Application", section: "Practice / Performance", control: "textarea", placeholder: "How it is applied." },
  consequences: { id: "consequences", label: "Consequences", section: "Effects", control: "textarea", placeholder: "What follows from applying it." },
  procedure: { id: "procedure", label: "Procedure", section: "Practice / Performance", control: "textarea", placeholder: "The method or procedure used." },
  purpose: { id: "purpose", label: "Purpose", section: "Nature / Definition", control: "textarea", placeholder: "Why the practice exists." },
  requirements: { id: "requirements", label: "Requirements", section: "Conditions", control: "textarea", placeholder: "What is needed before it can operate." },
  outcomes: { id: "outcomes", label: "Outcomes", section: "Effects", control: "textarea", placeholder: "What practice produces." },
  stages: { id: "stages", label: "Stages", section: "Operation", control: "textarea", placeholder: "The stages or phases in sequence." },
  progression: { id: "progression", label: "Progression", section: "Operation", control: "textarea", placeholder: "How it advances or moves forward." },
  outcome: { id: "outcome", label: "Outcome", section: "Effects", control: "textarea", placeholder: "The final result of the process." },
  definitionCriteria: { id: "definitionCriteria", label: "Definition / Criteria", section: "Nature / Definition", control: "textarea", placeholder: "What defines the state or condition." },
  entryConditions: { id: "entryConditions", label: "Entry Conditions", section: "Conditions", control: "textarea", placeholder: "What must exist before the state is entered." },
  characteristics: { id: "characteristics", label: "Characteristics", section: "Nature / Definition", control: "textarea", placeholder: "What distinguishes the condition or state." },
  exitConditions: { id: "exitConditions", label: "Exit Conditions", section: "Conditions", control: "textarea", placeholder: "What causes the state to end." },
  coreIdea: { id: "coreIdea", label: "Core Idea", section: "Nature / Definition", control: "textarea", placeholder: "The central idea or belief." },
  basis: { id: "basis", label: "Basis", section: "Nature / Definition", control: "textarea", placeholder: "What it rests on or is based upon." },
  interpretations: { id: "interpretations", label: "Interpretations", section: "Nature / Definition", control: "textarea", placeholder: "How different parties understand or read it." },
  method: { id: "method", label: "Method", section: "Practice / Performance", control: "textarea", placeholder: "The method or technique used." },
  categoriesComponents: { id: "categoriesComponents", label: "Categories / Components", section: "Structure / Components", control: "textarea", placeholder: "Major categories, elements, or parts." },
  limitations: { id: "limitations", label: "Limitations", section: "Limitations", control: "textarea", placeholder: "What restricts or confines it." },
  conceptDefinition: { id: "conceptDefinition", label: "Concept Definition", section: "Nature / Definition", control: "textarea", placeholder: "A precise definition of the concept." },
  functionSignificance: { id: "functionSignificance", label: "Function / Significance", section: "Operation", control: "textarea", placeholder: "Why it matters or what role it plays." },
  additionalContext: { id: "additionalContext", label: "Additional Context", section: "Additional Information", control: "textarea", placeholder: "Other important context." },
  physicalProperties: { id: "physicalProperties", label: "Physical Properties", section: "Domain-Specific Information", control: "textarea", placeholder: "Observable or material properties." },
  physicalBehavior: { id: "physicalBehavior", label: "Physical Behavior", section: "Domain-Specific Information", control: "textarea", placeholder: "How it behaves physically." },
  physicalEffects: { id: "physicalEffects", label: "Physical Effects", section: "Effects", control: "textarea", placeholder: "Its physical consequences." },
  physicalLimitations: { id: "physicalLimitations", label: "Physical Limitations", section: "Limitations", control: "textarea", placeholder: "What physical constraints it has." },
  biologicalBasis: { id: "biologicalBasis", label: "Biological Basis", section: "Domain-Specific Information", control: "textarea", placeholder: "The biological basis or mechanism." },
  biologicalProcess: { id: "biologicalProcess", label: "Biological Process", section: "Domain-Specific Information", control: "textarea", placeholder: "The relevant biological process." },
  biologicalEffects: { id: "biologicalEffects", label: "Biological Effects", section: "Effects", control: "textarea", placeholder: "Its biological effects." },
  biologicalLimitations: { id: "biologicalLimitations", label: "Biological Limitations", section: "Limitations", control: "textarea", placeholder: "Its biological limits." },
  individualExperience: { id: "individualExperience", label: "Individual Experience", section: "Domain-Specific Information", control: "textarea", placeholder: "How it feels or is experienced by an individual." },
  mentalCognitiveEffects: { id: "mentalCognitiveEffects", label: "Mental / Cognitive Effects", section: "Effects", control: "textarea", placeholder: "Its mental or cognitive effects." },
  perception: { id: "perception", label: "Perception", section: "Domain-Specific Information", control: "textarea", placeholder: "How it is perceived or interpreted." },
  individualLimitations: { id: "individualLimitations", label: "Individual Limitations", section: "Limitations", control: "textarea", placeholder: "What limits it for individuals." },
  socialFunction: { id: "socialFunction", label: "Social Function", section: "Domain-Specific Information", control: "textarea", placeholder: "What role it plays in society." },
  socialEffects: { id: "socialEffects", label: "Social Effects", section: "Effects", control: "textarea", placeholder: "Its social consequences." },
  socialConditions: { id: "socialConditions", label: "Social Conditions", section: "Conditions", control: "textarea", placeholder: "What social conditions sustain or shape it." },
  socialConsequences: { id: "socialConsequences", label: "Social Consequences", section: "Effects", control: "textarea", placeholder: "Its broader social consequences." },
  culturalMeaning: { id: "culturalMeaning", label: "Cultural Meaning", section: "Domain-Specific Information", control: "textarea", placeholder: "The culture-specific meaning of the concept." },
  culturalExpression: { id: "culturalExpression", label: "Cultural Expression", section: "Domain-Specific Information", control: "textarea", placeholder: "How it is expressed in culture." },
  culturalEffects: { id: "culturalEffects", label: "Cultural Effects", section: "Effects", control: "textarea", placeholder: "Its cultural effects." },
  culturalVariation: { id: "culturalVariation", label: "Cultural Variation", section: "Domain-Specific Information", control: "textarea", placeholder: "How it varies across cultures." },
  supernaturalNature: { id: "supernaturalNature", label: "Supernatural / Metaphysical Nature", section: "Domain-Specific Information", control: "textarea", placeholder: "Its supernatural or metaphysical character." },
  manifestationDomain: { id: "manifestationDomain", label: "Manifestation", section: "Domain-Specific Information", control: "textarea", placeholder: "How it manifests in supernatural or metaphysical terms." },
  capabilitiesEffects: { id: "capabilitiesEffects", label: "Capabilities / Effects", section: "Effects", control: "textarea", placeholder: "What it can do or alter." },
  supernaturalLimitations: { id: "supernaturalLimitations", label: "Limitations", section: "Limitations", control: "textarea", placeholder: "What constrains it." },
  technologicalBasis: { id: "technologicalBasis", label: "Technological Basis", section: "Domain-Specific Information", control: "textarea", placeholder: "The technology or mechanism on which it depends." },
  technicalOperation: { id: "technicalOperation", label: "Technical Operation", section: "Domain-Specific Information", control: "textarea", placeholder: "How it functions technically." },
  technicalRequirements: { id: "technicalRequirements", label: "Technical Requirements", section: "Conditions", control: "textarea", placeholder: "What technical requirements are necessary." },
  technicalLimitations: { id: "technicalLimitations", label: "Technical Limitations", section: "Limitations", control: "textarea", placeholder: "Technical constraints or failures." },
  environmentalRelationship: { id: "environmentalRelationship", label: "Environmental Relationship", section: "Domain-Specific Information", control: "textarea", placeholder: "How it relates to environment or setting." },
  environmentalConditions: { id: "environmentalConditions", label: "Environmental Conditions", section: "Conditions", control: "textarea", placeholder: "What environmental conditions matter." },
  environmentalEffects: { id: "environmentalEffects", label: "Environmental Effects", section: "Effects", control: "textarea", placeholder: "How it changes or is changed by the environment." },
  environmentalLimitations: { id: "environmentalLimitations", label: "Environmental Limitations", section: "Limitations", control: "textarea", placeholder: "Environmental constraints or boundaries." },
  combatApplication: { id: "combatApplication", label: "Combat Application", section: "Domain-Specific Information", control: "textarea", placeholder: "How it functions in combat or conflict." },
  tacticalEffects: { id: "tacticalEffects", label: "Tactical Effects", section: "Effects", control: "textarea", placeholder: "Its tactical impact or advantage." },
  combatRequirements: { id: "combatRequirements", label: "Combat Requirements", section: "Conditions", control: "textarea", placeholder: "What is needed for it to work in combat." },
  combatLimitations: { id: "combatLimitations", label: "Limitations / Countermeasures", section: "Limitations", control: "textarea", placeholder: "Counters, protections, or boundaries." },
  economicFunction: { id: "economicFunction", label: "Economic Function", section: "Domain-Specific Information", control: "textarea", placeholder: "Its role in economic systems." },
  valueUtility: { id: "valueUtility", label: "Value / Utility", section: "Domain-Specific Information", control: "textarea", placeholder: "Its value, usefulness, or cost." },
  resourceRequirements: { id: "resourceRequirements", label: "Resource Requirements", section: "Conditions", control: "textarea", placeholder: "Resources required to sustain or employ it." },
  economicEffects: { id: "economicEffects", label: "Economic Effects", section: "Effects", control: "textarea", placeholder: "Its economic consequences." },
  governanceFunction: { id: "governanceFunction", label: "Governance Function", section: "Domain-Specific Information", control: "textarea", placeholder: "How it functions politically or administratively." },
  authority: { id: "authority", label: "Authority", section: "Domain-Specific Information", control: "textarea", placeholder: "What authority it carries or invokes." },
  applicationPolitical: { id: "applicationPolitical", label: "Application", section: "Practice / Performance", control: "textarea", placeholder: "Where or how it is applied politically." },
  politicalConsequences: { id: "politicalConsequences", label: "Political Consequences", section: "Effects", control: "textarea", placeholder: "Its political consequences." },
  temporalCausalPrinciple: { id: "temporalCausalPrinciple", label: "Temporal / Causal Principle", section: "Nature / Definition", control: "textarea", placeholder: "The temporal or causal idea behind it." },
  relevantConditions: { id: "relevantConditions", label: "Relevant Conditions", section: "Conditions", control: "textarea", placeholder: "What conditions matter to it." },
  causalTemporalEffects: { id: "causalTemporalEffects", label: "Causal / Temporal Effects", section: "Effects", control: "textarea", placeholder: "How it affects causality or timing." },
  temporalLimitations: { id: "temporalLimitations", label: "Limitations", section: "Limitations", control: "textarea", placeholder: "Its constraints or temporal boundaries." },
  domainDefinition: { id: "domainDefinition", label: "Domain Definition", section: "Domain-Specific Information", control: "textarea", placeholder: "How the domain is defined." },
  domainEffects: { id: "domainEffects", label: "Domain Effects", section: "Effects", control: "textarea", placeholder: "Its effects within that domain." },
  domainConditions: { id: "domainConditions", label: "Domain Conditions", section: "Conditions", control: "textarea", placeholder: "What domain-specific conditions are required." },
  domainLimitations: { id: "domainLimitations", label: "Domain Limitations", section: "Limitations", control: "textarea", placeholder: "Domain-specific constraints or boundaries." },
  naturalOrigin: { id: "naturalOrigin", label: "Natural Origin", section: "Origin", control: "textarea", placeholder: "How it arises naturally." },
  occurrence: { id: "occurrence", label: "Occurrence", section: "Origin", control: "textarea", placeholder: "Where or when it naturally arises." },
  naturalConditions: { id: "naturalConditions", label: "Natural Conditions", section: "Conditions", control: "textarea", placeholder: "What conditions allow it to originate or exist naturally." },
  naturalVariability: { id: "naturalVariability", label: "Natural Variability", section: "Origin", control: "textarea", placeholder: "How its natural occurrence can vary." },
  creationOrigin: { id: "creationOrigin", label: "Creation Origin", section: "Origin", control: "textarea", placeholder: "How the concept originated." },
  creationPurpose: { id: "creationPurpose", label: "Creation Purpose", section: "Origin", control: "textarea", placeholder: "Why it was created." },
  creationRequirements: { id: "creationRequirements", label: "Creation Requirements", section: "Conditions", control: "textarea", placeholder: "What was necessary to create it." },
  modificationDevelopment: { id: "modificationDevelopment", label: "Modification / Development", section: "Operation", control: "textarea", placeholder: "Whether and how its design can be changed." },
  discovery: { id: "discovery", label: "Discovery", section: "Origin", control: "textarea", placeholder: "How it was discovered or recognized." },
  evidenceOfExistence: { id: "evidenceOfExistence", label: "Evidence of Existence", section: "Origin", control: "textarea", placeholder: "What establishes that it exists." },
  discoverability: { id: "discoverability", label: "Discoverability", section: "Origin", control: "textarea", placeholder: "How it can be detected or recognized." },
  unknownUnresolved: { id: "unknownUnresolved", label: "Unknown / Unresolved Aspects", section: "Origin", control: "textarea", placeholder: "What remains unknown or unresolved." },
  underlyingElements: { id: "underlyingElements", label: "Underlying Elements", section: "Emergence", control: "textarea", placeholder: "What produces the emergence." },
  emergenceProcess: { id: "emergenceProcess", label: "Emergence Process", section: "Emergence", control: "textarea", placeholder: "How the concept emerges." },
  emergenceConditionsThreshold: { id: "emergenceConditionsThreshold", label: "Emergence Conditions / Threshold", section: "Conditions", control: "textarea", placeholder: "What must happen before it emerges." },
  emergentCharacteristics: { id: "emergentCharacteristics", label: "Emergent Characteristics", section: "Emergence", control: "textarea", placeholder: "What properties result from its emergence." },
  basisOfInherence: { id: "basisOfInherence", label: "Basis of Inherence", section: "Origin", control: "textarea", placeholder: "Why it is inherent." },
  manifestationInherent: { id: "manifestationInherent", label: "Manifestation", section: "Emergence", control: "textarea", placeholder: "How the inherent property appears." },
  scopeOfInherence: { id: "scopeOfInherence", label: "Scope of Inherence", section: "Origin", control: "textarea", placeholder: "What possesses or exhibits it." },
  origin: { id: "origin", label: "Origin", section: "Origin", control: "textarea", placeholder: "How the concept came into existence." },
  originConditions: { id: "originConditions", label: "Origin Conditions", section: "Conditions", control: "textarea", placeholder: "What circumstances produced it." },
  originCharacteristics: { id: "originCharacteristics", label: "Origin Characteristics", section: "Origin", control: "textarea", placeholder: "What is unusual about its origin." },
  additionalOriginContext: { id: "additionalOriginContext", label: "Additional Origin Context", section: "Additional Information", control: "textarea", placeholder: "Other origin-specific information." },
  learningMethod: { id: "learningMethod", label: "Learning Method", section: "Practice / Performance", control: "textarea", placeholder: "How it is learned or understood." },
  knowledgeRequirements: { id: "knowledgeRequirements", label: "Knowledge Requirements", section: "Conditions", control: "textarea", placeholder: "What must be understood first." },
  learningDifficulty: { id: "learningDifficulty", label: "Learning Difficulty", section: "Conditions", control: "textarea", placeholder: "What makes it easier or harder to learn." },
  failureMisunderstanding: { id: "failureMisunderstanding", label: "Failure / Misunderstanding", section: "Limitations", control: "textarea", placeholder: "What happens when it is misunderstood." },
  performance: { id: "performance", label: "Performance", section: "Practice / Performance", control: "textarea", placeholder: "How it is performed or enacted." },
  practiceRequirements: { id: "practiceRequirements", label: "Practice Requirements", section: "Conditions", control: "textarea", placeholder: "What is required to practice it." },
  frequencyContinuity: { id: "frequencyContinuity", label: "Frequency / Continuity", section: "Conditions", control: "textarea", placeholder: "Does it require repetition or sustained practice?" },
  resultsOfPractice: { id: "resultsOfPractice", label: "Results of Practice", section: "Effects", control: "textarea", placeholder: "What practice produces." },
  basisOfBelief: { id: "basisOfBelief", label: "Basis of Belief", section: "Nature / Definition", control: "textarea", placeholder: "Why it is believed or accepted." },
  beliefConditions: { id: "beliefConditions", label: "Belief Conditions", section: "Conditions", control: "textarea", placeholder: "What causes or sustains belief." },
  effectsOfBelief: { id: "effectsOfBelief", label: "Effects of Belief", section: "Effects", control: "textarea", placeholder: "What changes because it is believed." },
  disbeliefRejection: { id: "disbeliefRejection", label: "Disbelief / Rejection", section: "Limitations", control: "textarea", placeholder: "What happens when it is rejected or undermined." },
  sourceOfImposition: { id: "sourceOfImposition", label: "Source of Imposition", section: "Origin", control: "textarea", placeholder: "What establishes or imposes it." },
  meansOfEnforcement: { id: "meansOfEnforcement", label: "Means of Enforcement", section: "Operation", control: "textarea", placeholder: "How it is maintained or enforced." },
  compliance: { id: "compliance", label: "Compliance", section: "Conditions", control: "textarea", placeholder: "What counts as compliance." },
  violationResistance: { id: "violationResistance", label: "Violation / Resistance", section: "Limitations", control: "textarea", placeholder: "What happens when it is resisted or violated." },
  transmissionMethod: { id: "transmissionMethod", label: "Transmission Method", section: "Transmission", control: "textarea", placeholder: "How it is transmitted." },
  transmissionRequirements: { id: "transmissionRequirements", label: "Transmission Requirements", section: "Conditions", control: "textarea", placeholder: "What must exist for transmission." },
  preservation: { id: "preservation", label: "Preservation", section: "Transmission", control: "textarea", placeholder: "How it is retained accurately." },
  distortionChange: { id: "distortionChange", label: "Distortion / Change", section: "Transmission", control: "textarea", placeholder: "How transmission can alter it." },
  requiredConditions: { id: "requiredConditions", label: "Required Conditions", section: "Conditions", control: "textarea", placeholder: "What must be true for it to operate." },
  activation: { id: "activation", label: "Activation", section: "Operation", control: "textarea", placeholder: "What causes it to become active or applicable." },
  failureConditions: { id: "failureConditions", label: "Failure Conditions", section: "Limitations", control: "textarea", placeholder: "What prevents or stops it from operating." },
  termination: { id: "termination", label: "Termination", section: "Conditions", control: "textarea", placeholder: "What causes it to stop." },
  persistence: { id: "persistence", label: "Persistence", section: "Operation", control: "textarea", placeholder: "How it remains active or present." },
  continuityConditions: { id: "continuityConditions", label: "Continuity Conditions", section: "Conditions", control: "textarea", placeholder: "What allows it to continue." },
  persistenceLimits: { id: "persistenceLimits", label: "Persistence Limits", section: "Limitations", control: "textarea", placeholder: "What interrupts or ends it." },
  durationContinuity: { id: "durationContinuity", label: "Duration / Continuity", section: "Operation", control: "textarea", placeholder: "How long or under what conditions it persists." },
  triggers: { id: "triggers", label: "Triggers", section: "Conditions", control: "textarea", placeholder: "What causes a response." },
  response: { id: "response", label: "Response", section: "Operation", control: "textarea", placeholder: "How it responds." },
  responseConditions: { id: "responseConditions", label: "Response Conditions", section: "Conditions", control: "textarea", placeholder: "What determines how it responds." },
  responseLimits: { id: "responseLimits", label: "Response Limits", section: "Limitations", control: "textarea", placeholder: "What limits the response." },
  selfSustainingMechanism: { id: "selfSustainingMechanism", label: "Self-Sustaining Mechanism", section: "Operation", control: "textarea", placeholder: "How it maintains itself." },
  sustainingRequirements: { id: "sustainingRequirements", label: "Sustaining Requirements", section: "Conditions", control: "textarea", placeholder: "What it needs to continue." },
  internalFeedback: { id: "internalFeedback", label: "Internal Feedback", section: "Operation", control: "textarea", placeholder: "Whether it reinforces or regulates itself." },
  selfSustainingFailure: { id: "selfSustainingFailure", label: "Failure Conditions", section: "Limitations", control: "textarea", placeholder: "What can cause self-sustaining behavior to fail." },
  cycleStructure: { id: "cycleStructure", label: "Cycle Structure", section: "Operation", control: "textarea", placeholder: "The stages or phases of the cycle." },
  cycleTrigger: { id: "cycleTrigger", label: "Cycle Trigger", section: "Conditions", control: "textarea", placeholder: "What begins the cycle." },
  cycleProgression: { id: "cycleProgression", label: "Cycle Progression", section: "Operation", control: "textarea", placeholder: "How it moves through the cycle." },
  cycleCompletionReset: { id: "cycleCompletionReset", label: "Cycle Completion / Reset", section: "Conditions", control: "textarea", placeholder: "What happens when the cycle completes." },
  adaptationMechanism: { id: "adaptationMechanism", label: "Adaptation Mechanism", section: "Operation", control: "textarea", placeholder: "How it changes." },
  adaptationTriggers: { id: "adaptationTriggers", label: "Adaptation Triggers", section: "Conditions", control: "textarea", placeholder: "What causes change." },
  rangeOfVariation: { id: "rangeOfVariation", label: "Range of Variation", section: "Domain-Specific Information", control: "textarea", placeholder: "What can change." },
  adaptationLimits: { id: "adaptationLimits", label: "Adaptation Limits", section: "Limitations", control: "textarea", placeholder: "What prevents or restricts change." },
  operatingMode: { id: "operatingMode", label: "Operating Mode", section: "Operation", control: "textarea", placeholder: "How the concept operates or persists." },
  operatingRequirements: { id: "operatingRequirements", label: "Operating Requirements", section: "Conditions", control: "textarea", placeholder: "What it depends upon." },
  operatingCharacteristics: { id: "operatingCharacteristics", label: "Operating Characteristics", section: "Nature / Definition", control: "textarea", placeholder: "What distinguishes its behavior." },
  specialOperatingConditions: { id: "specialOperatingConditions", label: "Special Operating Conditions", section: "Conditions", control: "textarea", placeholder: "Unusual conditions affecting it." },
  otherDomainDefinition: { id: "otherDomainDefinition", label: "Domain Definition", section: "Domain-Specific Information", control: "textarea", placeholder: "How the domain is defined." },
  otherDomainEffects: { id: "otherDomainEffects", label: "Domain Effects", section: "Effects", control: "textarea", placeholder: "Its effects within the domain." },
  otherDomainConditions: { id: "otherDomainConditions", label: "Domain Conditions", section: "Conditions", control: "textarea", placeholder: "What domain-specific conditions matter." },
  otherDomainLimitations: { id: "otherDomainLimitations", label: "Domain Limitations", section: "Limitations", control: "textarea", placeholder: "Domain-specific boundaries or limits." },
}

export const CONCEPT_QUESTIONS: ConceptQuestionDefinition[] = [
  {
    id: "kind",
    label: "What kind of concept is this?",
    help: "This describes what the concept fundamentally is.",
    options: [
      { id: "phenomenon", label: "Phenomenon", fieldIds: ["manifestation", "behavior", "effects", "triggersConditions"] },
      { id: "system", label: "System", fieldIds: ["components", "structure", "function", "interactions"] },
      { id: "mechanism", label: "Mechanism", fieldIds: ["mechanism", "inputs", "process", "result"] },
      { id: "principle", label: "Principle", fieldIds: ["principle", "scope", "implications", "exceptions"] },
      { id: "rule", label: "Rule", fieldIds: ["rule", "application", "consequences", "exceptions"] },
      { id: "practice", label: "Practice", fieldIds: ["procedure", "purpose", "requirements", "outcomes"] },
      { id: "process", label: "Process", fieldIds: ["stages", "inputs", "progression", "outcome"] },
      { id: "condition-state", label: "Condition / State", fieldIds: ["definitionCriteria", "entryConditions", "characteristics", "exitConditions"] },
      { id: "belief-idea", label: "Belief / Idea", fieldIds: ["coreIdea", "basis", "implications", "interpretations"] },
      { id: "method-technique", label: "Method / Technique", fieldIds: ["method", "procedure", "requirements", "result"] },
      { id: "framework", label: "Framework", fieldIds: ["structure", "categoriesComponents", "application", "limitations"] },
      { id: "other-kind", label: "Other", fieldIds: ["conceptDefinition", "functionSignificance", "characteristics", "additionalContext"] },
    ],
  },
  {
    id: "domain",
    label: "What domain or aspect does this concept concern?",
    help: "This describes what area of reality, experience, or activity the concept concerns.",
    options: [
      { id: "physical-world", label: "Physical World", fieldIds: ["physicalProperties", "physicalBehavior", "physicalEffects", "physicalLimitations"] },
      { id: "biological-living", label: "Biological / Living", fieldIds: ["biologicalBasis", "biologicalProcess", "biologicalEffects", "biologicalLimitations"] },
      { id: "individual-mental", label: "Individual / Mental", fieldIds: ["individualExperience", "mentalCognitiveEffects", "perception", "individualLimitations"] },
      { id: "social", label: "Social", fieldIds: ["socialFunction", "socialEffects", "socialConditions", "socialConsequences"] },
      { id: "cultural", label: "Cultural", fieldIds: ["culturalMeaning", "culturalExpression", "culturalEffects", "culturalVariation"] },
      { id: "supernatural-metaphysical", label: "Supernatural / Metaphysical", fieldIds: ["supernaturalNature", "manifestationDomain", "capabilitiesEffects", "supernaturalLimitations"] },
      { id: "technological", label: "Technological", fieldIds: ["technologicalBasis", "technicalOperation", "technicalRequirements", "technicalLimitations"] },
      { id: "environmental", label: "Environmental", fieldIds: ["environmentalRelationship", "environmentalConditions", "environmentalEffects", "environmentalLimitations"] },
      { id: "combat-conflict", label: "Combat / Conflict", fieldIds: ["combatApplication", "tacticalEffects", "combatRequirements", "combatLimitations"] },
      { id: "economic-resource", label: "Economic / Resource", fieldIds: ["economicFunction", "valueUtility", "resourceRequirements", "economicEffects"] },
      { id: "political-governance", label: "Political / Governance", fieldIds: ["governanceFunction", "authority", "applicationPolitical", "politicalConsequences"] },
      { id: "temporal-causal", label: "Temporal / Causal", fieldIds: ["temporalCausalPrinciple", "relevantConditions", "causalTemporalEffects", "temporalLimitations"] },
      { id: "other-domain", label: "Other Domain", fieldIds: ["otherDomainDefinition", "otherDomainEffects", "otherDomainConditions", "otherDomainLimitations"] },
    ],
  },
  {
    id: "origin",
    label: "What is the concept's origin?",
    help: "This question is specifically about where or how the concept came into existence.",
    options: [
      { id: "naturally-occurring", label: "Naturally Occurring", fieldIds: ["naturalOrigin", "occurrence", "naturalConditions", "naturalVariability"] },
      { id: "created-engineered", label: "Created / Engineered", fieldIds: ["creationOrigin", "creationPurpose", "creationRequirements", "modificationDevelopment"] },
      { id: "discovered", label: "Discovered", fieldIds: ["discovery", "evidenceOfExistence", "discoverability", "unknownUnresolved"] },
      { id: "emergent", label: "Emergent", fieldIds: ["underlyingElements", "emergenceProcess", "emergenceConditionsThreshold", "emergentCharacteristics"] },
      { id: "inherent", label: "Inherent", fieldIds: ["basisOfInherence", "manifestationInherent", "scopeOfInherence", "exceptions"] },
      { id: "other-origin", label: "Other", fieldIds: ["origin", "originConditions", "originCharacteristics", "additionalOriginContext"] },
    ],
  },
  {
    id: "operation",
    label: "How does the concept operate or persist?",
    help: "This question is intentionally separate from origin and describes what keeps it active or makes it function.",
    options: [
      { id: "learned", label: "Learned", fieldIds: ["learningMethod", "knowledgeRequirements", "learningDifficulty", "failureMisunderstanding"] },
      { id: "practiced-performed", label: "Practiced / Performed", fieldIds: ["performance", "practiceRequirements", "frequencyContinuity", "resultsOfPractice"] },
      { id: "believed-accepted", label: "Believed / Accepted", fieldIds: ["basisOfBelief", "beliefConditions", "effectsOfBelief", "disbeliefRejection"] },
      { id: "imposed-enforced", label: "Imposed / Enforced", fieldIds: ["sourceOfImposition", "meansOfEnforcement", "compliance", "violationResistance"] },
      { id: "transmitted", label: "Transmitted", fieldIds: ["transmissionMethod", "transmissionRequirements", "preservation", "distortionChange"] },
      { id: "conditional", label: "Conditional", fieldIds: ["requiredConditions", "activation", "failureConditions", "termination"] },
      { id: "persistent-continuous", label: "Persistent / Continuous", fieldIds: ["persistence", "continuityConditions", "persistenceLimits", "durationContinuity"] },
      { id: "reactive-triggered", label: "Reactive / Triggered", fieldIds: ["triggers", "response", "responseConditions", "responseLimits"] },
      { id: "self-sustaining", label: "Self-Sustaining", fieldIds: ["selfSustainingMechanism", "sustainingRequirements", "internalFeedback", "selfSustainingFailure"] },
      { id: "cyclical", label: "Cyclical", fieldIds: ["cycleStructure", "cycleTrigger", "cycleProgression", "cycleCompletionReset"] },
      { id: "adaptive-changing", label: "Adaptive / Changing", fieldIds: ["adaptationMechanism", "adaptationTriggers", "rangeOfVariation", "adaptationLimits"] },
      { id: "other-operation", label: "Other", fieldIds: ["operatingMode", "operatingRequirements", "operatingCharacteristics", "specialOperatingConditions"] },
    ],
  },
]

export function getConceptFieldDefinitionsForSelections(selections: ConceptClassifications): ConceptFieldDefinition[] {
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

  const fieldDefinitions = Array.from(ids)
    .map((id) => CONCEPT_FIELD_DEFINITIONS[id])
    .filter((field): field is ConceptFieldDefinition => Boolean(field))

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

export function ConceptCanonProvider({ children }: { children: ReactNode }) {
  const [concepts, setConcepts] = useState<Record<string, CanonConcept>>({})

  const getConcept = useCallback(
    (id: string | null | undefined): CanonConcept | null => (id ? concepts[id] ?? null : null),
    [concepts],
  )

  const updateConcept = useCallback((id: string, patch: ConceptEdit) => {
    setConcepts((previous) => {
      const existing = previous[id]
      if (!existing) return previous
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
