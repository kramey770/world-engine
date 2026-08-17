"use client"

import { useState } from "react"
import { ProjectDashboard } from "@/components/project-dashboard"
import { ProjectHome, type ProjectSection } from "@/components/project-home"
import { SectionPlaceholder } from "@/components/section-placeholder"
import { PipelineWorkspace } from "@/components/pipeline/pipeline-workspace"
import { FamilyTrees } from "@/components/family/family-trees"
import { Brainstorming } from "@/components/world/brainstorming"
import { CharacterCanonProvider } from "@/lib/character-canon"
import { projects, type Project } from "@/lib/mock-data"

type Screen = "dashboard" | "project-home" | "pipeline" | "family" | "brainstorming" | "placeholder"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [activeSection, setActiveSection] = useState<ProjectSection>("Map")

  return (
    <CharacterCanonProvider>
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
            } else if (section === "Family Tree") {
              setScreen("family")
            } else if (section === "Brainstorming") {
              setScreen("brainstorming")
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
      </main>
    </CharacterCanonProvider>
  )
}
