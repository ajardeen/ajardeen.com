import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/panel";
import SeparatorUi from "@/components/SeparatorUi";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  Pause,
  Share,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import Zoom from "react-medium-image-zoom";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "react-medium-image-zoom/dist/styles.css";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { useSound } from "@/hooks/use-sounds";
import { Prose } from "@/components/ui/typography";
import ImageCarousel from "./components/ImageCarousel";

/* ---------- helpers ---------- */
function getYouTubeEmbedUrl(url: string) {
  const id = url.includes("youtu.be/")
    ? url.split("youtu.be/")[1]
    : url.split("v=")[1]?.split("&")[0];

  return id ? `https://www.youtube.com/embed/${id}` : "";
}

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

function ProjectDetails() {
  const [direction, setDirection] = useState(0);
  // const [[page, direction], setPage] = useState([0, 0]);
  const playNotification = useSound("/audio/ui-sounds/notification.mp3");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = PROJECTS.find((p) => p.id === id);

  const mediaList: MediaItem[] = useMemo(() => {
    if (!project) return [];

    // 1. Format your images cleanly
    const items: MediaItem[] =
      project.imageUrls?.map((img) => ({ type: "image", src: img })) ?? [];

    // 2. Safely ensure videoUrl is treated as an array
    const videosArray = Array.isArray(project.videoUrl)
      ? project.videoUrl
      : project.videoUrl
        ? [{ url: project.videoUrl }]
        : [];

    // Define a strict type for items that definitely have a position
    const unpositionedVideos: MediaItem[] = [];
    const positionedVideos: { url: string; position: number }[] = [];

    videosArray.forEach((vid) => {
      // Explicit type-guard check to satisfy TypeScript's strict null checking
      if (vid && typeof vid === "object" && typeof vid.position === "number") {
        positionedVideos.push({
          url: vid.url,
          position: vid.position, // TypeScript now knows this is definitively a number
        });
      } else {
        const urlStr = typeof vid === "string" ? vid : vid?.url;
        if (urlStr) {
          unpositionedVideos.push({ type: "video", src: urlStr });
        }
      }
    });

    // 3. Unpositioned videos line up directly at the front
    items.unshift(...unpositionedVideos);

    // 4. Sort positioned videos ascending so earlier placements don't shift later ones awkwardly
    positionedVideos.sort((a, b) => a.position - b.position);

    // 5. Splice the positioned elements into place (convert 1-indexed position to 0-indexed index)
    positionedVideos.forEach((vid) => {
      const targetIndex = Math.max(0, vid.position - 1);
      items.splice(targetIndex, 0, { type: "video", src: vid.url });
    });

    return items;
  }, [project]);

  const [selected, setSelected] = useState<MediaItem | null>(null);
  // const [loading, setLoading] = useState(false);

  if (!project) {
    return (
      <Panel>
        <PanelContent>
          <p className="text-muted-foreground">Project not found.</p>
        </PanelContent>
      </Panel>
    );
  }
  const projectIds = useMemo(() => PROJECTS.map((p) => p.id), []);

  const currentIndex = projectIds.indexOf(id ?? "");

  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;

  const nextProjectId =
    currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  const handleProjectNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && prevProjectId) {
      navigate(`/project/${prevProjectId}`);
    }

    if (direction === "next" && nextProjectId) {
      navigate(`/project/${nextProjectId}`);
    }
  };

  useEffect(() => {
    if (mediaList.length > 0) {
      setSelected(mediaList[0]); // first media of NEW project
      // setLoading(true);
    } else {
      // IMPORTANT: clear stale media
      setSelected(null);
      // setLoading(false);
    }
  }, [id]); // 👈 depend ONLY on id

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;

      const currentMediaIndex = mediaList.findIndex(
        (m) => m.src === selected.src,
      );

      // 🔥 SHIFT + ARROWS → MEDIA NAVIGATION
      if (e.shiftKey) {
        if (e.key === "ArrowLeft" && currentMediaIndex > 0) {
          e.preventDefault();
          setSelected(mediaList[currentMediaIndex - 1]);
        }

        if (
          e.key === "ArrowRight" &&
          currentMediaIndex < mediaList.length - 1
        ) {
          e.preventDefault();
          setSelected(mediaList[currentMediaIndex + 1]);
        }

        return; // stop here — don't trigger project navigation
      }

      // 🔹 NORMAL ARROWS → PROJECT NAVIGATION (unchanged behavior)
      if (e.key === "ArrowLeft" && prevProjectId) {
        navigate(`/project/${prevProjectId}`);
      }

      if (e.key === "ArrowRight" && nextProjectId) {
        navigate(`/project/${nextProjectId}`);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, mediaList, prevProjectId, nextProjectId, navigate]);

  const handleShareProject = async () => {
    const fullUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(fullUrl);
      playNotification();
      toast.success("Copied Link");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error(err);
    }
  };

  const currentMediaIndex = mediaList.findIndex((m) => m.src === selected?.src);

  // 2. Unified selection handler
  const handleSelectMedia = (newIndex: number) => {
    if (newIndex === currentMediaIndex) return;

    // If new index is greater, we are moving "forward" (slide from right)
    // If new index is smaller, we are moving "backward" (slide from left)
    const newDirection = newIndex > currentMediaIndex ? 1 : -1;

    setDirection(newDirection);
    setSelected(mediaList[newIndex]);
  };

  // 3. Simple variants (pure slide, no opacity)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      zIndex: 0,
    }),
  };
  return (
    <div className="">

      <SeparatorUi />

      {/* Back */}
      <div className="screen-line-before screen-line-after mx-auto border-x border-edge md:max-w-4xl flex justify-between p-1.5 py-1">
        <Button
          onClick={() => navigate("/project")}
          variant="link"
          className="gap-2 text-muted-foreground cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Button>
        <div className="flex gap-1.5">
          <Button
            onClick={() => handleShareProject()}
            variant="secondary"
            className="py-2 h-fit cursor-pointer"
          >
            <Share className="size-4" />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              {prevProjectId && (
                <Button
                  onClick={() => handleProjectNavigation("prev")}
                  variant="secondary"
                  className="p-0 flex h-fit"
                  disabled={!prevProjectId}
                >
                  <motion.span
                    whileTap={{ x: -2 }}
                    className="p-2 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                  </motion.span>
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent className="text-base flex gap-2 p-2 justify-between items-center">
              Previous Project
              <Kbd className="size-6">
                <ArrowLeft size={25} />
              </Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              {nextProjectId && (
                <Button
                  onClick={() => handleProjectNavigation("next")}
                  variant="secondary"
                  className="p-0 flex h-fit"
                  disabled={!nextProjectId}
                >
                  <motion.span
                    whileTap={{ x: 2 }}
                    className="p-2 cursor-pointer"
                  >
                    <ArrowRight className="size-4" />
                  </motion.span>
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent className="text-base flex gap-2 p-2 justify-between items-center">
              Next Project
              <Kbd className="size-6">
                <ArrowRight size={25} />
              </Kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <SeparatorUi />

      <Panel>
        <PanelHeader>
          <PanelTitle className="flex items-center text-2xl md:text-3xl">
            <span className="flex items-center">
              {project.logo && (
                <img
                  src={project.logo}
                  alt={project.title}
                  width={32}
                  height={32}
                  className="mr-2 flex size-6 shrink-0 select-none"
                  aria-hidden
                />
              )}
              {project.title}
            </span>
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="space-y-5">
          {project.isProjectStatus === "IN_PROGRESS" && (
            <div className=" border-l-destructive border-4 bg-red-500/10 px-2 py-1 flex gap-2">
              <TriangleAlert className="" />
              {project.projectStatusMsg
                ? project.projectStatusMsg
                : "Project Under Development Stage!"}
            </div>
          )}
          {project.isProjectStatus === "HOLD" && (
            <div className=" border-l-secondary border-4 bg-gray-500/10 px-2 py-1 flex gap-2">
              <Pause className="" />
              Development Paused!
            </div>
          )}
          {project.projectStatusMsg && (
            <div className=" border-4 border-blue-500/20 border-l-blue-500 bg-blue-500/10 px-2 py-1 flex gap-2">
              <Info className="" />
              {project.projectStatusMsg ? project.projectStatusMsg : ""}
            </div>
          )}
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-edge bg-white">
            {/* Overlay Buttons */}
            {currentMediaIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectMedia(currentMediaIndex - 1);
                }}
                className="absolute left-0 top-0 z-20 flex h-full w-20 items-center cursor-pointer bg-gradient-to-r from-black/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <div className="p-1 text-black">
                  <ChevronLeft size={30} />
                </div>
              </button>
            )}

            {currentMediaIndex < mediaList.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectMedia(currentMediaIndex + 1);
                }}
                className="absolute right-0 top-0 z-20 flex h-full w-20 items-center justify-end cursor-pointer bg-gradient-to-l from-black/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <div className="p-1 text-black">
                  <ChevronRight size={30} />
                </div>
              </button>
            )}

            {/* Animated Image/Video */}
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={selected?.src}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 32 },
                }}
                className="absolute inset-0 h-full w-full"
              >
                {selected?.type === "video" ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selected.src)}
                    className="h-full w-full"
                  />
                ) : (
                  <Zoom>
                    <img
                      src={selected?.src}
                      className="aspect-video w-full object-contain"
                      alt=""
                    />
                  </Zoom>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Update your Carousel to use the same logic if needed */}
          <ImageCarousel
            mediaList={mediaList}
            selected={selected}
            setSelected={(item) => {
              // Check if item exists before processing
              if (!item) return;

              const index = mediaList.findIndex((m) => m.src === item.src);
              handleSelectMedia(index);
            }}
          />

          {/* META */}
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* DESCRIPTION */}
          {project.description && (
            <Prose>
              <Markdown>{project.description}</Markdown>
            </Prose>
          )}
        </PanelContent>
      </Panel>
    </div>
  );
}

export default ProjectDetails;
