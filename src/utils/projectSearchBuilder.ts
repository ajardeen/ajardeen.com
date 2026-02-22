// utils/projectSearchBuilder.ts
import { PROJECTS } from "@/data/projects";
import { Box } from "lucide-react";
import type { SearchItem } from "@/components/global-menu";

export interface SearchGroup {
  group: string;
  items: SearchItem[];
}

export const buildProjectSearch = (): SearchGroup[] => {
  // PROJECT NAME SEARCH
  const projectNames = PROJECTS.map((p) => ({
    searchName: p.title,
    link: `/project/${p.id}`,
    image: p.logo || undefined, // ✅ use logo
    icon: !p.logo ? Box : undefined, // ✅ fallback icon
  }));


  // SKILLS SEARCH
  const skillItems: SearchItem[] = PROJECTS.flatMap((p) =>
    p.skills.map((skill) => ({
      searchName: `${skill} — ${p.title}`,
      link: `/project/${p.id}`,
      icon: Box,
    }))
  );

  return [
    {
      group: "Projects",
      items: projectNames,
    },
    {
      group: "Skills",
      items: skillItems,
    },
  ];
};