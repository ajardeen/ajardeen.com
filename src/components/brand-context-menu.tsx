import {
  DownloadIcon,
  Share2Icon,
  LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function BrandContextMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const shareText = "Share with friends";
  const currentUrl = window.location.href;

  const encodedText = encodeURIComponent(
    `${shareText}\n${currentUrl}`
  );
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        {/* SHARE HEADER */}
        <div className="px-2 py-1 text-xs text-muted-foreground">
          Share with friends
        </div>

        {/* WhatsApp */}
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

        {/* Facebook */}
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

        {/* Copy Link */}
        <ContextMenuItem onClick={handleCopyLink}>
          <LinkIcon className="mr-2 h-4 w-4" />
          Copy link
        </ContextMenuItem>

        <hr className="my-1" />

        {/* EXISTING ITEMS */}
        {/* <ContextMenuItem
          onClick={() => toast.success("Copied Mark as SVG")}
        >
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => toast.success("Copied Logotype as SVG")}
        >
          <TypeIcon className="mr-2 h-4 w-4" />
          Copy Logotype as SVG
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <Link to="/blog/chanhdai-brand">
            <TriangleDashedIcon className="mr-2 h-4 w-4" />
            Brand Guidelines
          </Link>
        </ContextMenuItem> */}

        <ContextMenuItem asChild>
          <a
            href={"https://drive.usercontent.google.com/u/0/uc?id=129BCxe3WNPqH2f56psCGFgHITHSNvvRy&export=download"}
            download
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Resume
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
