"use client"

import { useEffect, useMemo, useState } from "react"
import { MapPin } from "lucide-react"
import { CanonArtwork } from "@/components/world/canon-artwork"
import { locationTypeLabel, type CanonLocation } from "@/lib/location-canon"
import type { HubBoxDefinition } from "../hub-types"
import { HubBox } from "../hub-box"

type LocationPhase = "image" | "title" | "profile"
type LocationFact = { label: string; value: string; expanded?: boolean }
type FactTransition = { fact: LocationFact; id: number }

const phaseDurations: Record<LocationPhase, number> = {
  image: 4500,
  title: 5200,
  profile: 7000,
}

function crawlDurationSeconds(text: string): number {
  const estimatedLines = Math.max(1, Math.ceil(text.length / 22))
  return Math.max(9, 4 + estimatedLines * 1.3)
}

export function LocationWindow({
  definition,
  locations,
  eyebrow = definition.eyebrow,
  onOpen,
}: {
  definition: HubBoxDefinition
  locations: CanonLocation[]
  eyebrow?: string
  onOpen?: () => void
}) {
  const [phase, setPhase] = useState<LocationPhase>("image")
  const [locationIndex, setLocationIndex] = useState(0)
  const [topFactIndex, setTopFactIndex] = useState(0)
  const [bottomFactIndex, setBottomFactIndex] = useState<number | null>(null)
  const [outgoingFact, setOutgoingFact] = useState<FactTransition | null>(null)
  const [factMotionId, setFactMotionId] = useState(0)
  const activeLocation = locations[locationIndex] ?? locations[0]
  const facts = useMemo(() => activeLocation ? factsForLocation(activeLocation) : [], [activeLocation])
  const topFact = facts[topFactIndex]
  const bottomFact = bottomFactIndex === null ? undefined : facts[bottomFactIndex]
  const expandedFact = topFact?.expanded ? topFact : bottomFact?.expanded ? bottomFact : undefined
  const profileDuration = expandedFact
    ? (crawlDurationSeconds(expandedFact.value) + 1) * 1000
    : phaseDurations.profile

  useEffect(() => {
    if (locations.length === 0) return
    if (locationIndex >= locations.length) {
      setLocationIndex(0)
      setTopFactIndex(0)
      setBottomFactIndex(null)
      setPhase("image")
      setOutgoingFact(null)
      return
    }

    const timeout = window.setTimeout(() => {
      if (phase === "image") {
        setPhase("title")
      } else if (phase === "title") {
        setPhase("profile")
      } else if (topFactIndex < 0 && bottomFactIndex === null) {
        setLocationIndex((current) => (current + 1) % locations.length)
        setTopFactIndex(0)
        setPhase("image")
      } else if (expandedFact) {
        if (topFact?.expanded) {
          if (bottomFactIndex !== null) {
            setTopFactIndex(bottomFactIndex)
            setBottomFactIndex(null)
          } else if (topFactIndex + 1 < facts.length) {
            setTopFactIndex(topFactIndex + 1)
          } else {
            setTopFactIndex(-1)
          }
        } else {
          setBottomFactIndex(null)
        }
      } else if (facts.length > 0) {
        const factToRemove = bottomFactIndex === null ? undefined : facts[bottomFactIndex]
        if (factToRemove) setOutgoingFact({ fact: factToRemove, id: factMotionId + 1 })
        else advanceFacts()
      } else {
        setLocationIndex((current) => (current + 1) % locations.length)
        setTopFactIndex(0)
        setBottomFactIndex(null)
        setPhase("image")
      }
    }, phase === "profile" ? profileDuration : phaseDurations[phase])

    return () => window.clearTimeout(timeout)
  }, [bottomFactIndex, expandedFact, factMotionId, facts, locationIndex, locations.length, phase, profileDuration, topFact, topFactIndex])

  useEffect(() => {
    if (!outgoingFact) return
    const timeout = window.setTimeout(() => {
      if (topFactIndex < 0) {
        setLocationIndex((current) => (current + 1) % locations.length)
        setTopFactIndex(0)
        setBottomFactIndex(null)
        setPhase("image")
      } else {
        setBottomFactIndex(topFactIndex)
        setTopFactIndex(topFactIndex + 1 < facts.length ? topFactIndex + 1 : -1)
      }
      setOutgoingFact(null)
      setFactMotionId(outgoingFact.id)
    }, 850)
    return () => window.clearTimeout(timeout)
  }, [facts.length, locations.length, outgoingFact, topFactIndex])

  function advanceFacts() {
    setBottomFactIndex(topFactIndex)
    setTopFactIndex(topFactIndex + 1 < facts.length ? topFactIndex + 1 : -1)
  }

  return (
    <HubBox definition={definition} onOpen={onOpen}>
      <div className="location-window flex h-full min-h-0 flex-col" data-phase={phase}>
        {activeLocation ? (
          <>
            <div className="location-window__scene" key={activeLocation.id}>
              {activeLocation.image ? (
                <CanonArtwork
                  src={activeLocation.image}
                  alt={`Artwork for ${activeLocation.name}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="location-window__art object-cover"
                />
              ) : (
                <div className="location-window__art-fallback" aria-label={`No artwork uploaded for ${activeLocation.name}`} role="img">
                  <MapPin className="size-12 text-emerald-200/70" aria-hidden="true" />
                </div>
              )}
            </div>
            <h2
              className="location-window__name text-white"
              style={{
                fontSize: `clamp(1.75rem, ${Math.min(125 / Math.max(activeLocation.name.length, 1), 12.5)}cqi, 4.25rem)`,
                whiteSpace: activeLocation.name.length <= 14 ? "nowrap" : "normal",
              }}
            >
              {activeLocation.name}
            </h2>
            {phase === "profile" && (
              <div className="location-window__fact-stage" aria-live="off">
                {expandedFact ? (
                  <FactText
                    key={`feature-${locationIndex}-${topFactIndex}-${bottomFactIndex}-${factMotionId}`}
                    fact={expandedFact}
                    motion="feature"
                  />
                ) : (
                  <>
                    <div className="location-window__fact-slot location-window__fact-slot--top">
                      {topFact && <FactText key={`top-${locationIndex}-${topFactIndex}-${factMotionId}`} fact={topFact} motion="top" />}
                    </div>
                    <div className="location-window__fact-slot location-window__fact-slot--bottom">
                      {bottomFact && !outgoingFact && <FactText key={`bottom-${locationIndex}-${bottomFactIndex}-${factMotionId}`} fact={bottomFact} motion="bottom" />}
                      {outgoingFact && <FactText key={`out-${outgoingFact.id}`} fact={outgoingFact.fact} motion="outgoing" />}
                    </div>
                  </>
                )}
                {facts.length === 0 && <p className="location-window__fact-value location-window__fact-empty">No additional details yet.</p>}
              </div>
            )}
          </>
        ) : (
          <div className="location-window__empty flex min-h-0 flex-1 flex-col items-center justify-center text-center">
            <MapPin className="mb-2 size-5 text-emerald-200/80" aria-hidden="true" />
            <p className="hub-kicker text-emerald-200/75">{eyebrow}</p>
            <h2 className="mt-1 break-words font-serif text-[clamp(1.65rem,3.2vw,2.5rem)] leading-tight text-white">Locations</h2>
            <p className="mt-1 max-w-full break-words text-xs text-white/55">Location canon records will appear here</p>
          </div>
        )}
      </div>
    </HubBox>
  )
}

function FactText({ fact, motion }: { fact: LocationFact; motion: "top" | "bottom" | "outgoing" | "feature" }) {
  const isCrawl = motion === "feature" && fact.expanded
  return (
    <div className={`location-window__fact-panel location-window__fact-panel--${motion}`}>
      <p className="location-window__fact-label">{fact.label}</p>
      {isCrawl ? (
        <div className="location-window__fact-crawl">
          <p
            className="location-window__fact-value location-window__fact-value--crawl"
            style={{ animationDuration: `${crawlDurationSeconds(fact.value)}s` }}
          >
            {fact.value}
          </p>
        </div>
      ) : (
        <p className="location-window__fact-value">{fact.value}</p>
      )}
    </div>
  )
}

function factsForLocation(location: CanonLocation): LocationFact[] {
  const facts: LocationFact[] = []
  const add = (label: string, value: string | number | undefined) => {
    if (value === undefined || value === "") return
    const text = String(value).trim()
    if (!text) return

    facts.push({ label, value: text, expanded: text.length > 46 })
  }

  add("Type", locationTypeLabel(location.type))
  add("Region", location.region)
  add("Summary", location.summary)
  add("Current state", location.currentState)
  add("Terrain", location.terrain)
  add("Biome", location.biome)
  add("Climate", location.climate)
  add("Founded", location.founded)
  add("History", location.history)
  if (location.population !== undefined) add("Population", new Intl.NumberFormat().format(location.population))
  add("Population note", location.populationNote)
  add("Elevation", location.elevation === undefined ? undefined : `${new Intl.NumberFormat().format(location.elevation)} m`)
  add("Area", location.area)
  add("Atmosphere", location.atmosphere)
  add("Notable features", location.notableFeatures)
  add("Hazards", location.hazards)
  if (location.coordinates) {
    const { latitude, longitude, x, y } = location.coordinates
    if (latitude !== undefined || longitude !== undefined) {
      add("Coordinates", [latitude, longitude].filter((value) => value !== undefined).join(", "))
    } else if (x !== undefined || y !== undefined) {
      add("Map position", [x, y].filter((value) => value !== undefined).join(", "))
    }
  }
  add("Description", location.description)

  return facts
}
