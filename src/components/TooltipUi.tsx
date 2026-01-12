import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipUiProps = {
  /** Element that triggers the tooltip */
  trigger: React.ReactNode
  /** Tooltip content */
  content: React.ReactNode
  /** Tooltip side (top, right, bottom, left) */
  side?: "top" | "right" | "bottom" | "left"
  /** Alignment relative to trigger */
  align?: "start" | "center" | "end"
  /** Optional delay in ms */
  delayDuration?: number
  /** Optional class for content */
  contentClassName?: string
  /** Disable tooltip */
  disabled?: boolean
}

export function TooltipUi({
  trigger,
  content,
  side = "top",
  align = "center",
  delayDuration = 0,
  contentClassName,
  disabled = false,
}: TooltipUiProps) {
  if (disabled) {
    return <>{trigger}</>
  }

  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>
        {trigger}
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
