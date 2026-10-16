"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { HubStudio } from "./hub-types"

const studioDetails: Record<HubStudio, { label: string; stats: { label: string; value: string }[] }> = {
  creation: {
    label: "Creation Studio",
    stats: [
      { label: "Characters created", value: "08" },
      { label: "Portraits rendered", value: "14" },
      { label: "World maps", value: "03" },
      { label: "Heraldic designs", value: "06" },
      { label: "Visual assets", value: "27" },
      { label: "Collections", value: "04" },
    ],
  },
  world: {
    label: "World Building",
    stats: [
      { label: "Canon records", value: "42" },
      { label: "Locations mapped", value: "11" },
      { label: "Factions", value: "05" },
      { label: "Species catalogued", value: "07" },
      { label: "Timeline events", value: "18" },
      { label: "Connections", value: "23" },
    ],
  },
  writing: {
    label: "Writing Studio",
    stats: [
      { label: "Chapters drafted", value: "09" },
      { label: "Scene beats", value: "31" },
      { label: "Draft words", value: "12.4k" },
      { label: "Revision passes", value: "16" },
      { label: "Scenes in progress", value: "06" },
      { label: "Profile elements", value: "07" },
    ],
  },
}

export function ProjectHubStatline({ studio, visible }: { studio: HubStudio; visible: boolean }) {
  const [isMounted, setIsMounted] = useState(false)
  const details = studioDetails[studio]
  const tickerContent = (
    <div className="hub-statline__items">
      {details.stats.map((stat) => (
        <span className="hub-statline__item" key={stat.label}>
          <span className="hub-statline__value">{stat.value}</span>
          <span className="hub-statline__demo">DEMO</span>
          <span className="hub-statline__label">{stat.label}</span>
        </span>
      ))}
    </div>
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return createPortal(
    <div
      className="hub-statline"
      data-studio={studio}
      data-visible={visible}
      role="region"
      aria-label={`${details.label} demo statistics`}
      aria-hidden={!visible}
    >
      <div className="hub-statline__brand">
        <span className="hub-statline__live"><span aria-hidden="true" /> PROJECT STATS</span>
        <span className="hub-statline__studio" key={studio}>{details.label}</span>
      </div>
      <span className="sr-only">
        {details.stats.map((stat) => `${stat.value} demo ${stat.label}`).join(", ")}
      </span>
      <div className="hub-statline__ticker" aria-hidden="true">
        <div className="hub-statline__track">
          {tickerContent}
          <div className="hub-statline__items" aria-hidden="true">
            {details.stats.map((stat) => (
              <span className="hub-statline__item" key={stat.label}>
                <span className="hub-statline__value">{stat.value}</span>
                <span className="hub-statline__demo">DEMO</span>
                <span className="hub-statline__label">{stat.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
