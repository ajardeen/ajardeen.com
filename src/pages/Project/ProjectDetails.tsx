import { useEffect, useMemo, useState, startTransition, lazy, Suspense, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/panel";
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
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { useSound } from "@/hooks/use-sounds";
import { useGlimm } from "glimm/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Prose } from "@/components/ui/typography";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// Lazy load intensive inner text/markdown/carousel renderers to prevent parsing lags
const Markdown = lazy(() => import("@/components/markdown").then(m => ({ default: m.Markdown })));
const ImageCarousel = lazy(() => import("./components/ImageCarousel"));

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

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sweep } = useGlimm();
  const playNotification = useSound("/audio/ui-sounds/notification.mp3");

  const [direction, setDirection] = useState(0);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const isInitialMount = useRef(true);

  const project = useMemo(() => PROJECTS.find((p) => p.id === id), [id]);

  const mediaList: MediaItem[] = useMemo(() => {
    if (!project) return [];

    const items: MediaItem[] =
      project.imageUrls?.map((img) => ({ type: "image", src: img })) ?? [];

    const videosArray = Array.isArray(project.videoUrl)
      ? project.videoUrl
      : project.videoUrl
        ? [{ url: project.videoUrl }]
        : [];

    const unpositionedVideos: MediaItem[] = [];
    const positionedVideos: { url: string; position: number }[] = [];

    videosArray.forEach((vid) => {
      if (vid && typeof vid === "object" && typeof vid.position === "number") {
        positionedVideos.push({
          url: vid.url,
          position: vid.position,
        });
      } else {
        const urlStr = typeof vid === "string" ? vid : vid?.url;
        if (urlStr) {
          unpositionedVideos.push({ type: "video", src: urlStr });
        }
      }
    });

    items.unshift(...unpositionedVideos);
    positionedVideos.sort((a, b) => a.position - b.position);

    positionedVideos.forEach((vid) => {
      const targetIndex = Math.max(0, vid.position - 1);
      items.splice(targetIndex, 0, { type: "video", src: vid.url });
    });

    return items;
  }, [project]);

  const [selected, setSelected] = useState<MediaItem | null>(null);

  const projectIds = useMemo(() => PROJECTS.map((p) => p.id), []);
  const currentIndex = useMemo(() => projectIds.indexOf(id ?? ""), [projectIds, id]);

  const prevProjectId = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
  const nextProjectId = currentIndex < projectIds.length - 1 ? projectIds[currentIndex + 1] : null;

  // Track active media index seamlessly without lag on project swap
  useEffect(() => {
    setMediaLoaded(false);
    isInitialMount.current = true;
    if (mediaList.length > 0) {
      setSelected(mediaList[0]);
    } else {
      setSelected(null);
    }
  }, [id, mediaList]);

  // Keyboard navigation optimization using non-blocking transitions
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selected) return;

      const currentMediaIndex = mediaList.findIndex((m) => m.src === selected.src);

      if (e.shiftKey) {
        if (e.key === "ArrowLeft" && currentMediaIndex > 0) {
          e.preventDefault();
          isInitialMount.current = false;
          setSelected(mediaList[currentMediaIndex - 1]);
        }
        if (e.key === "ArrowRight" && currentMediaIndex < mediaList.length - 1) {
          e.preventDefault();
          isInitialMount.current = false;
          setSelected(mediaList[currentMediaIndex + 1]);
        }
        return;
      }

      if (e.key === "ArrowLeft" && prevProjectId) {
        startTransition(() => {
          navigate(`/project/${prevProjectId}`);
        });
      }
      if (e.key === "ArrowRight" && nextProjectId) {
        startTransition(() => {
          navigate(`/project/${nextProjectId}`);
        });
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, mediaList, prevProjectId, nextProjectId, navigate]);

  // Smooth back button navigation via Glimm overlay
  const handleGoBack = () => {
    sweep(() => {
      navigate("/project");
    }, {
      palette: "azure",
      sweepMs: 500,
    });
  };

  const handleShareProject = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      playNotification();
      toast.success("Copied Link");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const currentMediaIndex = mediaList.findIndex((m) => m.src === selected?.src);

  const handleSelectMedia = (newIndex: number) => {
    if (newIndex === currentMediaIndex) return;
    isInitialMount.current = false;
    const newDirection = newIndex > currentMediaIndex ? 1 : -1;
    setDirection(newDirection);
    setMediaLoaded(false);
    setSelected(mediaList[newIndex]);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: isInitialMount.current ? 0 : direction > 0 ? "100%" : "-100%",
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

  if (!project) {
    return (
      <Panel>
        <PanelContent>
          <p className="text-muted-foreground">Project not found.</p>
        </PanelContent>
      </Panel>
    );
  }

  return (
    <div className="w-full will-change-transform">
      <SeparatorUi />

      {/* Action Header Panel */}
      <div className="screen-line-before screen-line-after mx-auto border-x border-edge md:max-w-4xl flex justify-between p-1.5 py-1 bg-background/50 backdrop-blur-md sticky top-0 z-10">
        <Button
          onClick={handleGoBack}
          variant="link"
          className="gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Button>
        <div className="flex gap-1.5">
          <Button
            onClick={handleShareProject}
            variant="secondary"
            className="py-2 h-fit cursor-pointer"
          >
            <Share className="size-4" />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              {prevProjectId && (
                <Button
                  onClick={() => startTransition(() => navigate(`/project/${prevProjectId}`))}
                  variant="secondary"
                  className="p-0 flex h-fit"
                >
                  <motion.span whileTap={{ x: -2 }} className="p-2 cursor-pointer">
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
                  onClick={() => startTransition(() => navigate(`/project/${nextProjectId}`))}
                  variant="secondary"
                  className="p-0 flex h-fit"
                >
                  <motion.span whileTap={{ x: 2 }} className="p-2 cursor-pointer">
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
          {/* Status Indicators */}
          {project.isProjectStatus === "IN_PROGRESS" && (
            <div className="border-l-destructive border-4 bg-red-500/10 px-2 py-1 flex gap-2">
              <TriangleAlert className="" />
              {project.projectStatusMsg || "Project Under Development Stage!"}
            </div>
          )}
          {project.isProjectStatus === "HOLD" && (
            <div className="border-l-secondary border-4 bg-gray-500/10 px-2 py-1 flex gap-2">
              <Pause className="" />
              Development Paused!
            </div>
          )}
          {project.projectStatusMsg && project.isProjectStatus !== "IN_PROGRESS" && (
            <div className="border-4 border-blue-500/20 border-l-blue-500 bg-blue-500/10 px-2 py-1 flex gap-2">
              <Info className="" />
              {project.projectStatusMsg}
            </div>
          )}

          {/* Interactive Media Stage */}
          <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-edge bg-muted">
            {/* Inline Asynchronous Skeleton Loader Layout */}
            {!mediaLoaded && (
              <Skeleton className="absolute inset-0 h-full w-full z-0 animate-pulse bg-muted-foreground/10" />
            )}

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

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
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
                className="absolute inset-0 h-full w-full z-10"
              >
                {selected?.type === "video" ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selected.src)}
                    className="h-full w-full bg-transparent"
                    allowFullScreen
                    onLoad={() => setMediaLoaded(true)}
                  />
                ) : (
                  <Zoom>
                    <img
                      src={selected?.src}
                      className="aspect-video w-full object-contain"
                      alt=""
                      onLoad={() => setMediaLoaded(true)}
                    />
                  </Zoom>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Asynchronous Image Carousel */}
          <Suspense fallback={<Skeleton className="w-full h-20 rounded-lg" />}>
            <ImageCarousel
              mediaList={mediaList}
              selected={selected}
              setSelected={(item) => {
                if (!item) return;
                const index = mediaList.findIndex((m) => m.src === item.src);
                handleSelectMedia(index);
              }}
            />
          </Suspense>

          {/* Core Technical Stack Grid */}
          <div className="flex flex-wrap gap-2">
            {project.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Rich Content Renderers */}
          {project.description && (
            <Prose>
              <Suspense
                fallback={
                  <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                }
              >
                <Markdown>{project.description}</Markdown>
              </Suspense>
            </Prose>
          )}
        </PanelContent>
      </Panel>
    </div>
  );
}