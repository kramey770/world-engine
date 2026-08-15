"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ProjectDashboard } from "@/components/project-dashboard"
import { ProjectHome, type ProjectSection } from "@/components/project-home"
import { SectionPlaceholder } from "@/components/section-placeholder"
import { PipelineWorkspace } from "@/components/pipeline/pipeline-workspace"
import { FamilyTrees } from "@/components/family/family-trees"
import { projects, type Project } from "@/lib/mock-data"

type Screen = "login" | "dashboard" | "project-home" | "pipeline" | "family" | "placeholder"

// TEMP (dev): auth gate disabled so the app loads straight into the dashboard.
// To re-enable login, change the initial screen back to "login".
const AUTH_DISABLED = true

export default function Page() {
  const [screen, setScreen] = useState<Screen>(AUTH_DISABLED ? "dashboard" : "login")
  const [activeProject, setActiveProject] = useState<Project>(projects[0])
  const [activeSection, setActiveSection] = useState<ProjectSection>("Map")

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
            if (section === "Writing Studio") {
              setScreen("pipeline")
            } else if (section === "Family Tree") {
              setScreen("family")
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

      {screen === "pipeline" && (
        <PipelineWorkspace
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("login")}
        />
      )}

      {screen === "family" && (
        <FamilyTrees
          project={activeProject}
          onBack={() => setScreen("project-home")}
          onSignOut={() => setScreen("login")}
        />
      )}
    </main>
  )
}
