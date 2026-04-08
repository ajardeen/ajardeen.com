import { DownloadIcon, Share2Icon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { USER } from "@/data/user";
const user = USER;

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const currentUrl = window.location.href;

  const shareMessage = `Check out ${user.fullName}'s portfolio — ${user.jobTitle} specializing in React, React Native, and MERN stack development.\n\n${currentUrl}`;

  const encodedText = encodeURIComponent(shareMessage);
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);

    toast.success("Portfolio link copied", {
      description: "You can now share the portfolio URL anywhere.",
    });
  };

  const handleCopyShareText = async () => {
    await navigator.clipboard.writeText(shareMessage);

    toast.success("Share message copied", {
      description: "Paste it directly into WhatsApp, LinkedIn, or email.",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-72">
        <div className="px-2 py-1.5 text-xs text-muted-foreground leading-relaxed">
          Share 
        </div>

        <ContextMenuItem onClick={handleCopyShareText}>
          <Share2Icon className="mr-2 h-4 w-4" />
          Copy to clipboard
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <a
            href={`https://wa.me/?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2Icon className="mr-2 h-4 w-4" />
            Share on WhatsApp
          </a>
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2Icon className="mr-2 h-4 w-4" />
            Share on Facebook
          </a>
        </ContextMenuItem>

        <ContextMenuItem onClick={handleCopyLink}>
          <LinkIcon className="mr-2 h-4 w-4" />
          Copy portfolio link
        </ContextMenuItem>

        <hr className="my-1" />

        <ContextMenuItem asChild>
          <a
            href={user.resumeDownloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Resume
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
