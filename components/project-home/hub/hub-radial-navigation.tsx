import type { HubDestination } from "./hub-types"

export type HubAnchorDestination = HubDestination & { available?: boolean }

export function HubRadialNavigation({ destinations, onSelect }: { destinations: HubAnchorDestination[]; onSelect?: (destination: HubAnchorDestination) => void }) {
  return (
    <div className="hub-radial-navigation pointer-events-none absolute right-2 top-2 z-10 h-24 w-32 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100" aria-label="Studio destinations">
      <div className="absolute right-[-2.5rem] top-[-1.75rem] size-28 rounded-full border border-white/15 border-l-transparent border-b-transparent rotate-[-25deg]" />
      {destinations.map((destination, index) => {
        const angle = -62 + index * (124 / Math.max(destinations.length - 1, 1))
        return (
          <button
            key={destination.label}
            type="button"
            disabled={destination.available === false}
            onClick={(event) => {
              event.stopPropagation()
              onSelect?.(destination)
            }}
            className="absolute right-1 top-1/2 origin-[0.25rem_50%] -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#0d171d]/95 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-white/65 shadow-lg backdrop-blur-sm transition-all hover:border-sky-200/60 hover:text-white disabled:cursor-default disabled:opacity-45"
            style={{ transform: `rotate(${angle}deg) translateX(2.2rem) rotate(${-angle}deg)` }}
          >
            {destination.label}
          </button>
        )
      })}
    </div>
  )
}