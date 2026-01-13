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
import { ArrowLeft, ArrowRight, Play, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import Zoom from "react-medium-image-zoom";
import { useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

import "react-medium-image-zoom/dist/styles.css";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/ui/kbd";
import { useTheme } from "@/components/theme-provider";

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
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = PROJECTS.find((p) => p.id === id);

  const mediaList: MediaItem[] = useMemo(() => {
    if (!project) return [];

    const images =
      project.imageUrls?.map(
        (img) => ({ type: "image", src: img } as MediaItem)
      ) ?? [];

    const video = project.videoUrl
      ? ([{ type: "video", src: project.videoUrl }] as MediaItem[])
      : [];

    return [...video, ...images]; // 👈 video first
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

  const handleProjectNavigaion = (direction: "prev" | "next") => {
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
      if (e.key === "ArrowLeft" && prevProjectId) {
        navigate(`/project/${prevProjectId}`);
      }
      if (e.key === "ArrowRight" && nextProjectId) {
        navigate(`/project/${nextProjectId}`);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevProjectId, nextProjectId, navigate]);

  const handleShareProject = async () => {
    const fullUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Copied Link");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error(err);
    }
  };

  return (
    <div className="">
      <Toaster position="top-center" theme={theme} />
      <SeparatorUi />

      {/* Back */}
      <div className="screen-line-before screen-line-after mx-auto border-x border-edge md:max-w-4xl flex justify-between p-1.5 py-1">
        <Button
          onClick={() => navigate("/project")}
          variant="link"
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Button>
        <div className="flex gap-1.5">
          <Button
            onClick={() => handleShareProject()}
            variant="secondary"
            className="py-2 h-fit"
          >
            <Share className="size-4" />
          </Button>

          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => handleProjectNavigaion("prev")}
                variant="secondary"
                className="p-0 flex h-fit"
                disabled={!prevProjectId}
              >
                <motion.span whileTap={{ x: -2 }} className="p-2">
                  <ArrowLeft className="size-4" />
                </motion.span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-base flex gap-2 p-2 justify-between items-center">
              Previous Project
              <Kbd className="size-6">
                <ArrowLeft size={25} />
              </Kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => handleProjectNavigaion("next")}
                variant="secondary"
                className="p-0 flex h-fit"
                disabled={!nextProjectId}
              >
                <motion.span whileTap={{ x: 2 }} className="p-2">
                  <ArrowRight className="size-4" />
                </motion.span>
              </Button>
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
          <PanelTitle>{project.title}</PanelTitle>
        </PanelHeader>

        <PanelContent className="space-y-5">
          {/* MAIN PREVIEW */}

          <div
            key={id}
            className={cn(
              "relative w-full overflow-hidden rounded-xl border border-edge bg-white",
              !selected ? "hidden" : "block"
            )}
          >
            {selected?.type === "video" && (
              <iframe
                src={getYouTubeEmbedUrl(selected.src)}
                title="Project video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full"
                // onLoad={() => setLoading(false)}
              />
            )}

            {selected?.type === "image" && (
              <Zoom>
                <img
                  src={selected.src}
                  alt={project.title}
                  className="aspect-video w-full object-contain"
                  // onLoad={() => setLoading(false)}
                />
              </Zoom>
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {mediaList.map((item, idx) => (
              <>
                {item.src == "" ? null : (
                  <button
                    key={idx}
                    onClick={() => {
                      // setLoading(true);
                      setSelected(item);
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-md border border-edge",
                      selected?.src === item.src && "ring-2 ring-primary"
                    )}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-[#FF0033]">
                        <Play className="size-6 text-white fill-white" />
                      </div>
                    )}
                  </button>
                )}
              </>
            ))}
          </div>

          {/* META */}
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* DESCRIPTION */}
          {project.description && <Markdown>{project.description}</Markdown>}
        </PanelContent>
      </Panel>
    </div>
  );
}

export default ProjectDetails;
