"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ProjectDashboard } from "@/components/project-dashboard"
import { ProjectHome, type ProjectSection } from "@/components/project-home"
import { SectionPlaceholder } from "@/components/section-placeholder"
import { Workspace } from "@/components/workspace/workspace"
import { PipelineWorkspace } from "@/components/pipeline/pipeline-workspace"
import { projects, type Project } from "@/lib/mock-data"

type Screen = "login" | "dashboard" | "project-home" | "workspace" | "pipeline" | "placeholder"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("login")
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [activeSection, setActiveSection] = useState<ProjectSection>("Characters")

  return (
    <main className="min-h-screen bg-background text-foreground">
      {screen === "login" && <LoginScreen onAuth={() => setScreen("dashboard")} />}

      {screen === "dashboard" && (
        <ProjectDashboard
          onOpenProject={(project) => {
            setActiveProject(project)
            setScreen("project-home")
          }}
          onSignOut={() => setScreen("login")}
        />
      )}

      {screen === "project-home" && (
        <ProjectHome
          project={activeProject}
          onOpenSection={(section) => {
            if (section === "Writing Pipeline") {
              setScreen("pipeline")
            } else if (section === "Writing Studio") {
              setScreen("workspace")
            } else {
              setActiveSection(section)
              setScreen("placeholder")
            }
          }}
          onBack={() => setScreen("dashboard")}
          onSignOut={() => setScreen("login")}
        />
      )}

      {screen === "placeholder" && (
        <SectionPlaceholder
          project={activeProject}
          section={activeSection}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("login")}
        />
      )}

      {screen === "workspace" && (
        <Workspace project={activeProject} onBack={() => setScreen("project-home")} />
      )}

      {screen === "pipeline" && (
        <PipelineWorkspace
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("login")}
        />
      )}
    </main>
  )
}
