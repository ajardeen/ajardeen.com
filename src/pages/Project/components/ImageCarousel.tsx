import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

function ImageCarousel({
  mediaList,
  selected,
  setSelected,
}: {
  mediaList: { type: "image" | "video"; src: string }[];
  selected: { type: "image" | "video"; src: string } | null;
  setSelected: (
    selected: { type: "image" | "video"; src: string } | null,
  ) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // clientWidth is the width of the visible 5-item area
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getYouTubeThumbnail = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    // hqdefault.jpg is the standard high-quality thumbnail
    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : url;
  };

  return (
    <div className="group flex items-center gap-2 px-2">
      <Button
        variant="secondary"
        size="icon"
        className="z-30 rounded-full p-5 mr-10"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="size-8" />
      </Button>

      {/* Container: snap-x forces items to align perfectly when scrolling */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full overflow-hidden scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {mediaList.map((item, idx) => {
          if (!item.src) return null;
          const isSelected = selected?.src === item.src;

          // common logic for both buttons
          // basis-1/5 ensures exactly 5 items fill 100% of the container width
          const containerClasses = cn(
            "relative flex-none basis-1/5 snap-start p-1 transition-all cursor-pointer",
            isSelected ? "" : "",
          );

          if (item.type === "image") {
            return (
              <button
                key={`img-${idx}`}
                onClick={() => setSelected(item)}
                className={containerClasses}
              >
                <div
                  className={cn(
                    "aspect-video w-full overflow-hidden rounded-md border border-zinc-800 transition-all",
                    isSelected
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-60 grayscale-25 group-hover:grayscale-0 hover:opacity-100",
                  )}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          }

          // Inside your mediaList.map...
          if (item.type === "video") {
            // If the src is a YouTube link, convert it. If it's already an image, use it as is.
            const thumbnailUrl =
              item.src.includes("youtube.com") || item.src.includes("youtu.be")
                ? getYouTubeThumbnail(item.src)
                : item.src;

            return (
              <button
                key={`vid-${idx}`}
                onClick={() => setSelected(item)}
                className={containerClasses}
              >
                <div
                  className={cn(
                    "relative aspect-video w-full overflow-hidden rounded-md border border-zinc-800 transition-all group/vid",
                    isSelected ? "ring-2 ring-white" : "",
                  )}
                >
                  <div className="flex h-full w-full items-center justify-center bg-zinc-900">
                    <Play
                      className={cn(
                        "absolute size-6 z-20 drop-shadow-md transition-opacity",
                        isSelected
                          ? "fill-gray-400 text-gray-400 opacity-50"
                          : "fill-white text-white opacity-100",
                      )}
                    />
                    <div
                      className={cn(
                        "h-full w-full transition-opacity",
                        isSelected
                          ? "opacity-40"
                          : "opacity-70 group-hover/vid:opacity-100",
                      )}
                    >
                      <img
                        src={thumbnailUrl} // <--- Now uses the YouTube thumbnail
                        alt="video thumbnail"
                        className="h-full w-full object-cover z-10"
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          }
        })}
      </div>

      <Button
        variant="secondary"
        size="icon"
        onClick={() => scroll("right")}
        className="z-30 rounded-full p-5 ml-10"
      >
        <ChevronRight className="size-8" />
      </Button>
    </div>
  );
}

export default ImageCarousel;
