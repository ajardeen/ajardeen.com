import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BotMessageSquareIcon } from "./ui/bot-message-square";
import { useSound } from "@/hooks/use-sounds";
import { AiChat } from "./ui/ai-chat";
import { Badge } from "./ui/badge";
import type { AiStatus } from "@/types/ai-status";
import videobg from "@/assets/videos/ai-bg.webm";

const INITIAL_STATUS: AiStatus = {
  state: "loading",
  text: "checking",
  variant: "secondary",
};

export function FloatingAiChat({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const playChatOpen = useSound("/audio/ui-sounds/chatuiopen.wav");
  const playChatClose = useSound("/audio/ui-sounds/chatuiclose.wav");
  const [open, setOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<AiStatus>(INITIAL_STATUS);

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
    <>
      {/* ✅ AiChat always mounted — state survives open/close */}
      <div
        className={cn(
          "fixed right-0 top-[2%] m-2 bottom-20 z-60 lg:right-8 lg:bottom-24 ",
          "w-[95vw] h-[85vh] sm:w-[480px] sm:h-[620px]",
          "rounded-xl border shadow-xl bg-popover overflow-hidden",
          "transition-all duration-200 ease-out origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none", // hidden but mounted
        )}
      >
       

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <BotMessageSquareIcon />
            <span className="text-sm font-medium">Dexes AI</span>
            <Badge className="uppercase text-[10px]" variant={aiStatus.variant}>
              {aiStatus.text}
            </Badge>
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

        {/* Chat body — never unmounts */}
        <div className="h-[calc(100%-3.25rem)] overflow-y-auto">
          <AiChat onStatusChange={setAiStatus} />
        </div>
      </div>

      {/* Trigger button */}
      <Button
        className={cn(
          "fixed right-4 bottom-4 z-50 lg:right-8 lg:bottom-8 cursor-pointer border border-transparent",
          "pointer-events-auto p-0!",
          "transition-all duration-500 ease-out shadow-lg overflow-hidden ",
          open
            ? [
                
                "border-white",
                "shadow-[0_0_30px_#91bce6]",
                "scale-105",
              ]
            : ["bg-secondary", "hover:scale-105"],
          className,
        )}
        variant="secondary"
        size="icon-lg"
        onClick={() => setOpen((prev) => !prev)}
        {...props}
      >
        <div className="bg-secondary m-1 rounded-[inherit] rounded-full ">

        <BotMessageSquareIcon
          className={cn(
            "p-2 transition-transform duration-300 ",
            open && "rotate-12 ",
          )}
          />
          </div>
         {/* Video Background */}
       
          <video
            autoPlay
            muted

            loop
            className={cn(
              "absolute inset-0 w-full h-full object-cover scale-300 -z-10   ",
              "pointer-events-none transition-opacity duration-1000",
              open ? ("opacity-100" ) : ("opacity-0"),
            )}
          >
            <source src={videobg} type="video/webm" />
          </video>
      
        <span className="sr-only">Open AI Chat</span>
      </Button>
    </>
  );
}
