"use client"

import { PipelineProvider, STAGE_ROLE, usePipeline } from "@/lib/pipeline-store"
import { PipelineTopBar } from "@/components/pipeline/pipeline-topbar"
import { PipelineAIPanel } from "@/components/pipeline/pipeline-ai-panel"
import { StageSceneBeats } from "@/components/pipeline/stage-scene-beats"
import { StageFirstDraft } from "@/components/pipeline/stage-first-draft"
import { StageDraft } from "@/components/pipeline/stage-draft"
import type { Project } from "@/lib/mock-data"

export function PipelineWorkspace({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  return (
    <PipelineProvider>
      <PipelineInner project={project} onBack={onBack} onSignOut={onSignOut} />
    </PipelineProvider>
  )
}

function PipelineInner({
  project,
  onBack,
  onSignOut,
}: {
  project: Project
  onBack: () => void
  onSignOut: () => void
}) {
  const { activeStage } = usePipeline()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <PipelineTopBar project={project} onBack={onBack} onSignOut={onSignOut} />

      <div className="flex min-h-0 flex-1">
        {/* Active stage occupies the center + its own left rail */}
        {activeStage === "beats" && <StageSceneBeats />}
        {activeStage === "draft1" && <StageFirstDraft />}
        {activeStage === "draft2" && <StageDraft stage="draft2" />}
        {activeStage === "draft3" && <StageDraft stage="draft3" />}
        {activeStage === "final" && <StageDraft stage="final" />}

        {/* AI Co-Writer — always visible, role adapts to the stage */}
        <aside className="hidden w-[320px] shrink-0 border-l border-border bg-sidebar lg:flex lg:flex-col xl:w-[360px]">
          <PipelineAIPanel role={STAGE_ROLE[activeStage]} />
        </aside>
      </div>
    </div>
  )
}
