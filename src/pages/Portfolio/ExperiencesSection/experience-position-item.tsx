import {

  ChevronsDownUp,
  ChevronsUpDown,
  InfinityIcon,
} from "lucide-react";
import  { useState } from "react";
import { differenceInMonths, parse } from "date-fns"
import { Markdown } from "@/components/markdown";
// Updated to standard shadcn/ui collapsible exports
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// Kept if it's a custom icon component
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/components/ui/tag";
import { Prose} from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { ExperiencePosition } from "@/types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const [openState, setOpenState] = useState(false);
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;
   const duration = formatDuration(start, end)

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      asChild
      onOpenChange={setOpenState}
    >
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
        <CollapsibleTrigger
          className={cn(
            "flex gap-3 w-full text-left ",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent2"
          )}
        >
          <div
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-lg ",
              "bg-muted text-muted-foreground",
              "border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background"
            )}
            aria-hidden
          >
            <ExperienceIcon className="size-4" icon={position.icon} />
          </div>
          <div className="group hover:bg-muted/50 w-full p-1 rounded-sm ">
            <div className="relative z-1 mb-1 flex items-center gap-3  ">
              <h4 className="flex-1 font-medium text-balance">
                {position.title}
              </h4>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4 "
                aria-hidden
              >
                {openState ? (
                  <ChevronsDownUp
                    className={`transition-opacity duration-300 `}
                  />
                ) : (
                  <ChevronsUpDown className="transition-opacity duration-300" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2  text-sm text-muted-foreground">
              {position.employmentType && (
                <>
                  <dl>
                    <dt className="sr-only">Employment Type</dt>
                    <dd>{position.employmentType}</dd>
                  </dl>

                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
                </>
              )}

              <dl>
                <dt className="sr-only">Employment Period</dt>
                <dd className="flex items-center gap-0.5">
                  <span>{start}</span>
                  <span className="font-mono">—</span>
                  {isOngoing ? (
                    <>
                      <InfinityIcon
                        className="size-4.5 translate-y-[0.5px]"
                        aria-hidden
                      />
                      <span className="sr-only">Present</span>
                    </>
                  ) : (
                    <span>{end}</span>
                  )}
                </dd>
              </dl>
              {duration && (
            <>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
              />
              <dl>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </dl>
            </>
          )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down ">
          {position.description && (
            <Prose className="pt-2 pl-9 ">
              <Markdown>{position.description}</Markdown>
            </Prose>
          )}
        </CollapsibleContent>

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
            {position.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Collapsible>
  );
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  // +1 to count both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}