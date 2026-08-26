"use client"

import { useState } from "react"
import { ProjectDashboard } from "@/components/project-dashboard"
import { ProjectHome, type ProjectSection } from "@/components/project-home"
import { SectionPlaceholder } from "@/components/section-placeholder"
import { PipelineWorkspace } from "@/components/pipeline/pipeline-workspace"
import { WritingProfile } from "@/components/writing/writing-profile"
import { FamilyTrees } from "@/components/family/family-trees"
import { Brainstorming } from "@/components/world/brainstorming"
import { CanonLore } from "@/components/world/canon-lore"
import { CharacterCanonProvider } from "@/lib/character-canon"
import { LocationCanonProvider } from "@/lib/location-canon"
import { ReligionCanonProvider } from "@/lib/religion-canon"
import { ConceptCanonProvider } from "@/lib/concept-canon"
import { HistoryCanonProvider } from "@/lib/history-canon"
import { projects, type Project } from "@/lib/mock-data"

type Screen =
  | "dashboard"
  | "project-home"
  | "pipeline"
  | "writing-profile"
  | "family"
  | "brainstorming"
  | "canon"
  | "placeholder"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [activeSection, setActiveSection] = useState<ProjectSection>("Map")

  return (
    <CharacterCanonProvider>
      <LocationCanonProvider>
      <ReligionCanonProvider>
      <ConceptCanonProvider>
      <HistoryCanonProvider>
      <main className="min-h-screen bg-background text-foreground">
      {screen === "dashboard" && (
        <ProjectDashboard
          onOpenProject={(project) => {
            setActiveProject(project)
            setScreen("project-home")
          }}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "project-home" && (
        <ProjectHome
          project={activeProject}
          onOpenSection={(section) => {
            if (section === "Writing Studio") {
              setScreen("pipeline")
            } else if (section === "Writing Profile") {
              setScreen("writing-profile")
            } else if (section === "Family Tree") {
              setScreen("family")
            } else if (section === "Brainstorming") {
              setScreen("brainstorming")
            } else if (section === "Canon Lore") {
              setScreen("canon")
            } else {
              setActiveSection(section)
              setScreen("placeholder")
            }
          }}
          onBack={() => setScreen("dashboard")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "placeholder" && (
        <SectionPlaceholder
          project={activeProject}
          section={activeSection}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "pipeline" && (
        <PipelineWorkspace
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "writing-profile" && (
        <WritingProfile
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "family" && (
        <FamilyTrees
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "brainstorming" && (
        <Brainstorming
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}

      {screen === "canon" && (
        <CanonLore
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("dashboard")}
        />
      )}
      </main>
      </HistoryCanonProvider>
      </ConceptCanonProvider>
      </ReligionCanonProvider>
      </LocationCanonProvider>
    </CharacterCanonProvider>
  )
}
