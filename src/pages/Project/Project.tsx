import { PROJECTS } from "@/data/projects";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/panel";

import { ProjectCard } from "../Portfolio/ProjectsSection/project-card";
import SeparatorUi from "@/components/SeparatorUi";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

function ProjectsSection() {
  const [value, setValue] = useState("");

  const filteredProjects = PROJECTS.filter((project) =>
    project.title.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <>
      <SeparatorUi />

      <Panel id="projects">
        <PanelHeader>
          <PanelTitle>
            Projects
            <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          </PanelTitle>
        </PanelHeader>
        <div className="screen-line-after screen-line-before p-4 tracking-wider text-muted-foreground font-serif flex items-center">
          A collection of Project on development, design, and ideas which i have
          done.
        </div>
        <div className="min-w-full screen-line-after screen-line-before p-4 tracking-wider text-muted-foreground font-serif flex items-center">
          <div className="relative w-full">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
              <SearchIcon className="size-4" />
              <span className="sr-only">Search</span>
            </div>
            <Input
              type="search"
              placeholder="Search..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border-border   px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
            />
          </div>
        </div>
        {/* Card UI projects */}
        {PROJECTS.length > 0 && (
          <div className="relative ">
            <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
              <div className="border-r border-edge" />
              <div className="border-l border-edge" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </Panel>
    </>
  );
}

export default ProjectsSection;
