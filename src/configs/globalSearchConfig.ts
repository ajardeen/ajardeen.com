import {
  HomeIcon,
  FolderGit2,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface SearchItem {
  searchName: string;
  link: string;
  icon?: LucideIcon;
}

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
