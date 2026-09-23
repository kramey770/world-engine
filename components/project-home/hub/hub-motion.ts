"use client"

import { useEffect, useState } from "react"

type HubRotationOptions = {
  initialIndex?: number
  pauseOnHover?: boolean
}

export function useHubRotation(length: number, interval: number, options: HubRotationOptions = {}) {
  const [index, setIndex] = useState(options.initialIndex ?? 0)
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (length < 2 || reducedMotion || (options.pauseOnHover !== false && isHovered)) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % length), interval)
    return () => window.clearInterval(timer)
  }, [interval, isHovered, length, options.pauseOnHover, reducedMotion])

  useEffect(() => {
    setIndex((current) => (length > 0 ? current % length : 0))
  }, [length])

  return {
    index,
    isPaused: reducedMotion || isHovered,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }
}