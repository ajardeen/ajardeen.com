import { Skeleton } from "@/components/ui/skeleton";
import SeparatorUi from "@/components/SeparatorUi";

export function ProjectDetailsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <SeparatorUi />
      
      {/* Header Panel Skeleton */}
      <div className="mx-auto border-x border-edge md:max-w-4xl flex justify-between p-1.5 py-2 items-center bg-background/50">
        <div className="flex items-center gap-2 px-3">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-1.5 px-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-14 rounded-md" />
        </div>
      </div>

      {/* Page Body Elements Skeleton */}
      <div className="mx-auto md:max-w-4xl px-4 py-6 space-y-6">
        {/* Large Media Box Placeholder */}
        <Skeleton className="w-full aspect-video rounded-xl bg-muted/60" />

        {/* Title Group */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-1/5 rounded-md" />
        </div>

        <div className="border-b border-edge my-4" />

        {/* Content Paragraph Block Placeholders */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full rounded-sm" />
          <Skeleton className="h-4 w-[92%] rounded-sm" />
          <Skeleton className="h-4 w-[85%] rounded-sm" />
          <Skeleton className="h-4 w-[40%] rounded-sm" />
        </div>
      </div>
    </div>
  );
}
