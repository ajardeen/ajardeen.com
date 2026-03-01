import { CollapsibleList } from "@/components/collapsible-list";
import { PROJECTS } from "@/data/projects";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/panel";
import { ProjectItem } from "./project-item";
import { ProjectCard } from "./project-card";
import { Link } from "react-router-dom";

function ProjectsSection() {
  const cardProjects = PROJECTS.filter((p) => p.cardUi === true);
  const listProjects = PROJECTS.filter((p) => !p.cardUi);

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          <div className="flex items-center justify-between">
            <span>
              Projects
              <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
            </span>
            <Link
              to="/project"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </Link>
          </div>
        </PanelTitle>
      </PanelHeader>

      {/* Card UI projects */}
      {cardProjects.length > 0 && (
        <div className="relative ">
          <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
            <div className="border-r border-edge" />
            <div className="border-l border-edge" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cardProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Non-card projects → collapsible list */}
      {listProjects.length > 0 && (
        <CollapsibleList
          items={listProjects}
          max={3}
          renderItem={(project) => (
            <ProjectItem key={project.id} project={project} />
          )}
        />
      )}
    </Panel>
  );
}

export default ProjectsSection;
