import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WritingPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(modes.length, 8000)
  const mode = modes[index % Math.max(modes.length, 1)]
  const visibleItems = mode.items.slice(0, 4)

  return (
    <HubBox definition={definition}>
      <div className="hub-pulse-bar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <span className="hub-pulse-bar__label">Writing</span>
        <div className="hub-pulse-bar__content">
          {visibleItems.map((item) => (
            <div key={item.label} className="hub-pulse-bar__item">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </HubBox>
  )
}