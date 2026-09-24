import type { HubBoxDefinition, HubPulseMode } from "../hub-types"
import { HubBox } from "../hub-box"
import { useHubRotation } from "../hub-motion"

export function WorldPulse({ definition, modes }: { definition: HubBoxDefinition; modes: HubPulseMode[] }) {
  const { index, onMouseEnter, onMouseLeave } = useHubRotation(modes.length, 10500)
  const mode = modes[index % Math.max(modes.length, 1)]
  const activeItem = mode.items[0] ?? { label: "Entities", value: "0" }

  return (
    <HubBox definition={definition}>
      <div className="hub-pulse-bar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <span className="hub-pulse-bar__label">World</span>
        <div className="hub-pulse-bar__content">
          <div className="hub-pulse-bar__item">
            <span>{activeItem.label}</span>
            <strong>{activeItem.value}</strong>
          </div>
        </div>
        <span className="hub-pulse-bar__indicator">›</span>
      </div>
    </HubBox>
  )
}