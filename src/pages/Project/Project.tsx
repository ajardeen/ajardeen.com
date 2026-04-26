import { useState, useMemo } from "react";
import { PROJECTS } from "@/data/projects";
import { TECH_STACK } from "@/data/tech-stack";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/panel";
import { ProjectCard } from "../Portfolio/ProjectsSection/project-card";
import SeparatorUi from "@/components/SeparatorUi";
import { Input } from "@/components/ui/input";
import { ListFilterPlus, SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

function ProjectsSection() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // 1. Filter Logic: Matches search text and checks if project skills contain ALL selected tech
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesTech =
        selectedTech.length === 0 ||
        selectedTech.every((tech) =>
          project.skills.some((skill) =>
            skill.toLowerCase().includes(tech.toLowerCase()),
          ),
        );

      return matchesSearch && matchesTech;
    });
  }, [searchValue, selectedTech]);

  const toggleTech = (techTitle: string) => {
    setTempSelected((prev) =>
      prev.includes(techTitle)
        ? prev.filter((t) => t !== techTitle)
        : [...prev, techTitle],
    );
  };

  const applyFilters = () => {
    setSelectedTech(tempSelected);
    setIsOpen(false); // Closes the popover
  };

  const clearAllFilters = () => {
    setSearchValue("");
    setSelectedTech([]);
    setTempSelected([]);
    setIsOpen(false);
  };

  const removeSingleTech = (tech: string) => {
    const updated = selectedTech.filter((t) => t !== tech);
    setSelectedTech(updated);
    setTempSelected(updated);
  };

  return (
    <>
      <SeparatorUi />

      <Panel id="projects">
        <PanelHeader>
          <PanelTitle>
            Projects
            <PanelTitleSup>({filteredProjects.length})</PanelTitleSup>
          </PanelTitle>
        </PanelHeader>

        <div className="screen-line-after screen-line-before p-4 tracking-wider text-muted-foreground font-serif flex items-center">
          A collection of projects on development, design, and ideas which I
          have done.
        </div>

        {/* Filter Controls */}
        <div className="min-w-full screen-line-after screen-line-before p-4 flex flex-col gap-3">
          <div className="flex w-full gap-2">
            <div className="relative w-full">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                <SearchIcon className="size-4" />
              </div>
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-border px-9"
              />
            </div>

            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative shrink-0">
                  <ListFilterPlus className="size-4 mr-2" />
                  Filter
                  {selectedTech.length > 0 && (
                    <span className="ml-2 bg-foreground text-background size-5 rounded-full text-[10px] flex items-center justify-center font-bold">
                      {selectedTech.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-64 p-0 shadow-xl"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-3 border-b font-medium text-sm">
                  Select Technologies
                </div>
                <ScrollArea className="max-h-64 overflow-y-auto px-2">
                  {TECH_STACK.map((tech) => (
                    <div
                      key={tech.key}
                      className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
                      onClick={() => toggleTech(tech.title)}
                    >
                      <Checkbox
                        checked={tempSelected.includes(tech.title)}
                        onCheckedChange={() => toggleTech(tech.title)}
                      />
                      <label className="text-sm cursor-pointer select-none grow">
                        {tech.title}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
                {/* Fixed Scrollable Area */}

                <div className="p-2 border-t flex items-center justify-between bg-muted/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTempSelected([]);
                      setSelectedTech([]);
                      setIsOpen(false);
                    }}
                  >
                    Reset
                  </Button>
                  <Button size="sm" onClick={applyFilters} className="px-6">
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Active Filter Badges */}
          {(selectedTech.length > 0 || searchValue) && (
            <div className="flex flex-wrap gap-2 items-center min-h-8">
              {selectedTech.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 gap-1"
                >
                  {tech}
                  <button
                    onClick={() => removeSingleTech(tech)}
                    className="hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              {(selectedTech.length > 0 || searchValue) && (
                <Button
                  variant="link"
                  onClick={clearAllFilters}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="relative p-4">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <p>No projects found matching your filters.</p>
            </div>
          )}
        </div>
      </Panel>
    </>
  );
}

export default ProjectsSection;
