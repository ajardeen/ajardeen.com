import {
  Home,
  FileText,
  Settings,
  BarChart,
  HelpCircle,
  LayoutDashboard,
  FolderOpen,
  HomeIcon,
  LucideProjector,
  FolderGit2,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface SearchItem {
  searchName: string;
  link: string;
  icon?: LucideIcon;
}

export const suggestedSearch: SearchItem[] = [
  {
    searchName: "Home",
    link: "/",
    icon: Home,
  },
  {
    searchName: "Report",
    link: "/reports",
    icon: FileText,
  },
  //   {
  //     searchName: "Settings",
  //     link: "/settings",
  //     icon: Settings,
  //   },
];

export const pagesSearch: SearchItem[] = [
  {
    searchName: "Home",
    link: "/",
    icon: HomeIcon,
  },
  {
    searchName: "Projects",
    link: "/project",
    icon: FolderGit2,
  },
 
];
