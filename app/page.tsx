"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { ProjectDashboard } from "@/components/project-dashboard"
import { Workspace } from "@/components/workspace/workspace"
import { projects, type Project } from "@/lib/mock-data"

type Screen = "login" | "dashboard" | "workspace"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("login")
  const [activeProject, setActiveProject] = useState<Project>(projects[0])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {screen === "login" && <LoginScreen onAuth={() => setScreen("dashboard")} />}

      {screen === "dashboard" && (
        <ProjectDashboard
          onOpenProject={(project) => {
            setActiveProject(project)
            setScreen("workspace")
          }}
          onSignOut={() => setScreen("login")}
        />
      )}

      {screen === "workspace" && (
        <Workspace project={activeProject} onBack={() => setScreen("dashboard")} />
      )}
    </main>
  )
}
