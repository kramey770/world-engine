"use client"

import { useState } from "react"
import { ProjectDashboard } from "@/components/project-dashboard"
import { ProjectHome, type ProjectSection } from "@/components/project-home"
import { SectionPlaceholder } from "@/components/section-placeholder"
import { PipelineWorkspace } from "@/components/pipeline/pipeline-workspace"
import { WritingProfile } from "@/components/writing/writing-profile"
import { FamilyTrees } from "@/components/family/family-trees"
import HeraldryPage from "@/app/heraldry/page"
import { MapGenerator } from "@/components/map-generator"
import { Brainstorming } from "@/components/world/brainstorming"
import { CanonLore } from "@/components/world/canon-lore"
import { CharacterCanonProvider } from "@/lib/character-canon"
import { LocationCanonProvider } from "@/lib/location-canon"
import { ReligionCanonProvider } from "@/lib/religion-canon"
import { OrganizationCanonProvider } from "@/lib/organization-canon"
import { CultureCanonProvider } from "@/lib/culture-canon"
import { ConceptCanonProvider } from "@/lib/concept-canon"
import { HistoryCanonProvider } from "@/lib/history-canon"
import { CalendarCanonProvider } from "@/lib/calendar-canon"
import { ItemCanonProvider } from "@/lib/item-canon"
import { SpeciesCanonProvider } from "@/lib/species-canon"
import { LanguageCanonProvider } from "@/lib/language-canon"
import { CombatDoctrineProvider } from "@/lib/combat-doctrine-canon"
import { GovernmentCanonProvider } from "@/lib/government-canon"
import { SystemsCanonProvider } from "@/lib/systems-canon"
import { RelationshipsCanonProvider } from "@/lib/relationships-canon"
import { ResearchCanonProvider } from "@/lib/research-canon"
import { KnowledgeCanonProvider } from "@/lib/knowledge-canon"
import { FamilyCanonProvider } from "@/lib/family-canon"
import { PageThumbnailProvider } from "@/lib/page-thumbnail"
import { ProjectStoreProvider, useProjectStore, type Project } from "@/lib/project-store"
import { BookCoverStudio } from "@/components/book-cover-studio"

type Screen =
  | "dashboard"
  | "project-home"
  | "pipeline"
  | "writing-profile"
  | "family"
  | "heraldry"
  | "map"
  | "brainstorming"
  | "canon"
  | "book-cover"
  | "placeholder"

export default function Page() {
  return (
    <ProjectStoreProvider>
      <ProjectWorkspace />
    </ProjectStoreProvider>
  )
}

function ProjectWorkspace() {
  const [screen, setScreen] = useState<Screen>("dashboard")
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeSection, setActiveSection] = useState<ProjectSection>("Map")
  const [canonInitialView, setCanonInitialView] = useState<"landing" | "characters" | "families">("landing")

  const { isHydrated, setActiveProject: persistActiveProject } = useProjectStore()

  if (!isHydrated) return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading workspace...</div>

  return (
    <PageThumbnailProvider>
      <CharacterCanonProvider>
      <RelationshipsCanonProvider>
      <ResearchCanonProvider>
      <KnowledgeCanonProvider>
      <FamilyCanonProvider>
      <LocationCanonProvider>
        <ReligionCanonProvider>
          <OrganizationCanonProvider>
            <CultureCanonProvider>
              <ConceptCanonProvider>
                <HistoryCanonProvider>
                  <CalendarCanonProvider>
                    <ItemCanonProvider>
                    <SpeciesCanonProvider>
                  <LanguageCanonProvider>
                  <CombatDoctrineProvider>
                  <GovernmentCanonProvider>
                  <SystemsCanonProvider>
                  <main className="min-h-screen bg-background text-foreground">
                  {screen === "dashboard" && (
                    <ProjectDashboard
                      onOpenProject={(project) => {
                        setActiveProject(project)
                        persistActiveProject(project.id)
                        setScreen("project-home")
                      }}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "project-home" && activeProject && (
                    <ProjectHome
                      project={activeProject}
                      onOpenSection={(section) => {
                        if (section === "Writing Studio") {
                          setScreen("pipeline")
                        } else if (section === "Writing Profile") {
                          setScreen("writing-profile")
                        } else if (section === "Family Tree") {
                          setScreen("family")
                        } else if (section === "Heraldry") {
                          setScreen("heraldry")
                        } else if (section === "Map") {
                          setScreen("map")
                        } else if (section === "Brainstorming") {
                          setScreen("brainstorming")
                        } else if (section === "Canon Lore") {
                          setCanonInitialView("landing")
                          setScreen("canon")
                        } else if (section === "Character") {
                          setCanonInitialView("characters")
                          setScreen("canon")
                        } else if (section === "Book Cover") {
                          setScreen("book-cover")
                        } else {
                          setActiveSection(section)
                          setScreen("placeholder")
                        }
                      }}
                      onBack={() => setScreen("dashboard")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "placeholder" && activeProject && (
                    <SectionPlaceholder
                      project={activeProject}
                      section={activeSection}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "pipeline" && activeProject && (
                    <PipelineWorkspace
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "writing-profile" && activeProject && (
                    <WritingProfile
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "family" && activeProject && (
                    <FamilyTrees
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                      onOpenFamilies={() => {
                        setCanonInitialView("families")
                        setScreen("canon")
                      }}
                    />
                  )}

                  {screen === "heraldry" && activeProject && (
                    <HeraldryPage
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "map" && activeProject && (
                    <MapGenerator
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "brainstorming" && activeProject && (
                    <Brainstorming
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "canon" && activeProject && (
                    <CanonLore
                      project={activeProject}
                      initialView={canonInitialView}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}

                  {screen === "book-cover" && activeProject && (
                    <BookCoverStudio
                      project={activeProject}
                      onBack={() => setScreen("project-home")}
                      onSignOut={() => setScreen("dashboard")}
                    />
                  )}
                  </main>
                  </SystemsCanonProvider>
                  </GovernmentCanonProvider>
                  </CombatDoctrineProvider>
                  </LanguageCanonProvider>
                  </SpeciesCanonProvider>
                    </ItemCanonProvider>
                  </CalendarCanonProvider>
                </HistoryCanonProvider>
              </ConceptCanonProvider>
            </CultureCanonProvider>
          </OrganizationCanonProvider>
        </ReligionCanonProvider>
      </LocationCanonProvider>
      </FamilyCanonProvider>
      </KnowledgeCanonProvider>
      </ResearchCanonProvider>
      </RelationshipsCanonProvider>
      </CharacterCanonProvider>
    </PageThumbnailProvider>
  )
}
