import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Example from "@/components/demo-chatgpt";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BotMessageSquareIcon } from "./ui/bot-message-square";
import { useSound } from "@/hooks/use-sounds";
import { AiChat } from "./ui/ai-chat";

export function FloatingAiChat({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const playChatOpen = useSound("/audio/ui-sounds/chatuiopen.wav");
  const playChatClose = useSound("/audio/ui-sounds/chatuiclose.wav");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      playChatOpen();
    } else {
      document.body.style.overflow = "";
      playChatClose();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "fixed right-4 bottom-4 z-50 lg:right-8 lg:bottom-8",
            "pointer-events-auto p-0!",
            "transition-all duration-500 ease-out",
            "shadow-lg",
            open
              ? [
                  // 🔥 fancy open state
                  "animate-gradient",
                  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                  "text-white",
                  "shadow-[0_0_30px_rgba(168,85,247,0.7)]",
                  "scale-105",
                ]
              : [
                  // 😌 normal state
                  "bg-secondary",
                  "hover:scale-105",
                ],
            className
          )}
          variant="secondary"
          size="icon-lg"
          {...props}
        >
          <BotMessageSquareIcon
            className={cn(
              "p-4 transition-transform duration-300",
              open && "rotate-12"
            )}
          />
          <span className="sr-only">Open AI Chat</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="top"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className={cn(
          "p-0 overflow-hidden",
          "w-[95vw] h-[85vh]",
          "sm:w-[480px] sm:h-[620px]",
          "rounded-xl border shadow-xl",
          "touch-pan-y" // mobile
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <BotMessageSquareIcon />
            <span className="text-sm font-medium">Dexes AI</span>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Chat body */}
        <div className="h-[calc(100%-3.25rem)] overflow-y-auto">
          {/* <Example /> */}
          <AiChat/>
        </div>
      </PopoverContent>
    </Popover>
  );
}
