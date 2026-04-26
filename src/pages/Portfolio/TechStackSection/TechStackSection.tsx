import { useState, useMemo } from "react";
import { TECH_STACK } from "@/data/tech-stack";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import { Button } from "@/components/ui/button";
import { Layers2, LayoutGrid } from "lucide-react";

function TechStackSection() {
  const [isGrouped, setIsGrouped] = useState(false);

  // 1. Group the data by category
  const groupedStack = useMemo(() => {
    const groups: Record<string, typeof TECH_STACK> = {};
    
    TECH_STACK.forEach((tech) => {
      tech.categories.forEach((cat) => {
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(tech);
      });
    });
    
    return groups;
  }, []);

  // Reusable Tech Badge component to keep code clean
  const TechBadge = ({ tech }: { tech: typeof TECH_STACK[0] }) => (
    <li key={tech.key} className="flex">
      <a
        href={tech.href}
        target="_blank"
        rel="noopener"
        aria-label={tech.title}
        className="flex items-center gap-1.5 rounded-full border bg-zinc-50 px-1.5 py-0.5 text-xs tracking-wide text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        {tech.theme ? (
          <>
            <img
              className="hidden [html.light_&]:block size-3.5"
              src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`}
              alt={tech.title}
            />
            <img
              className="hidden [html.dark_&]:block size-3.5"
              src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`}
              alt={tech.title}
            />
          </>
        ) : (
          <img
            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
            className="size-3.5"
            alt={tech.title}
          />
        )}
        {tech.title}
      </a>
    </li>
  );

  return (
    <Panel id="tech-stack">
      <PanelHeader>
        <PanelTitle>
          <div className="flex items-center justify-between">
            <span>Tech Stack</span>
            <Button 
              variant={isGrouped ? "secondary" : "ghost"} 
              size="sm"
              className="cursor-pointer h-8 w-8 p-0" 
              onClick={() => setIsGrouped(!isGrouped)}
              title={isGrouped ? "Show All" : "Show Categories"}
            >
              {isGrouped ? <LayoutGrid size={18} /> : <Layers2 size={18} />}
            </Button>
          </div>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        {isGrouped ? (
          <div className="space-y-5">
            {Object.entries(groupedStack).map(([category, items]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold ml-1">
                  {category}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <TechBadge key={`${category}-${tech.key}`} tech={tech} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <TechBadge key={tech.key} tech={tech} />
            ))}
          </ul>
        )}
      </PanelContent>
    </Panel>
  );
}

export default TechStackSection;