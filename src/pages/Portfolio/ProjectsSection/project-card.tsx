import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/projects";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({
  project,
}: {
  project: Project;
  shouldPreloadImage?: boolean;
}) {
  const image = project.imageUrls?.[0] || project.logo;

  return (
    <Link
      to={"/project/" + project.id}
      className={cn(
        "group flex flex-col gap-3 border-edge p-3 transition hover:bg-muted/40",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after",
      )}
    >
      {!image && <Skeleton className="aspect-video! w-full" />}
      {image && (
        <div className="relative overflow-hidden rounded-lg border border-border bg-white">
          <img
            src={image}
            alt={project.title}
            className="aspect-video! w-full object-contain transition duration-300 group-hover:blur-sm group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 dark:ring-white/10 " />

          {/* Period Component: hidden by default, shown on group hover */}
          <img
            src={project.logo}
            alt="logo"
            className="w-8 rounded-sm  absolute bottom-1 left-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="bg-zinc-900/80 text-zinc-100 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10">
              {project.period.start}
              {project.period.end ? ` – ${project.period.end}` : " – Present"}
            </p>
          </div>
          {project.recentWork && (
            <div className="absolute top-2 right-2">
              <Badge variant="success" className="text-[10px] p-1! text-green-400">
                Recent Work
              </Badge>
            </div>
          )}
          <span></span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium group-hover:underline underline-offset-4">
          {project.title}
          {project.isUnderDevelopment && (
            <Badge variant="destructive" className="ml-2 text-[8px] p-1!">
              Under Development
            </Badge>
          )}
          <span className="ml-2 mt-auto inline-flex items-center gap-1 text-sm text-primary">
            <ExternalLink className="size-4" />
          </span>
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.shortDescription}
        </p>

        {project.skills?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {project.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-300 border border-zinc-700/20"
              >
                {skill}
              </span>
            ))}

            {project.skills.length > 6 && (
              <span className="text-zinc-500 text-xs font-bold ml-1">
                more ...
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
