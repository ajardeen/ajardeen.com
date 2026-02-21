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
        "group flex flex-col gap-3   border-edge p-3 transition hover:bg-muted/40",
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
            className="aspect-video! w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 dark:ring-white/10" />
          <p className="absolute bottom-0 right-0 p-1 bg-zinc-100 rounded-tl-md text-xs text-muted-foreground">
            {project.period.start}
            {project.period.end ? ` – ${project.period.end}` : " – Present"}
          </p>
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
          <div className="flex flex-wrap gap-2 pt-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
