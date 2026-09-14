"use client"

import Image from "next/image"

export const WORLD_ENGINE_LOGO_URL = "/world-engine-logo.jpeg"

export function LogoLoadingScreen({
  context = "Loading your world",
  compact = false,
}: {
  context?: string
  compact?: boolean
}) {
  return (
    <div className={`logo-loader ${compact ? "logo-loader--compact" : ""}`} role="status" aria-live="polite">
      <div aria-hidden className="logo-loader__grid" />
      <div aria-hidden className="logo-loader__orbit logo-loader__orbit--one" />
      <div aria-hidden className="logo-loader__orbit logo-loader__orbit--two" />
      <div className="logo-loader__content">
        <div className="logo-loader__art">
          <span className="logo-loader__corner logo-loader__corner--tl" />
          <span className="logo-loader__corner logo-loader__corner--tr" />
          <span className="logo-loader__corner logo-loader__corner--bl" />
          <span className="logo-loader__corner logo-loader__corner--br" />
          <Image
            src={WORLD_ENGINE_LOGO_URL}
            alt="World Engine globe and book emblem"
            fill
            priority
            sizes={compact ? "180px" : "min(70vw, 360px)"}
            className="logo-loader__image logo-mark-image"
          />
        </div>
        <p className="logo-loader__eyebrow">WORLD ENGINE // INITIALIZING</p>
        <p className="logo-loader__context">{context}</p>
        <div className="logo-loader__progress" aria-hidden>
          <span />
        </div>
        <p className="logo-loader__signal">ESTABLISHING CARTOGRAPHIC LINK</p>
      </div>
    </div>
  )
}
