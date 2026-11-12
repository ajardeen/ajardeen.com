import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MacHeader, MacLinkList } from "./Navigators";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useHotkey } from "@tanstack/react-hotkeys";
import { USER } from "@/data/user";
import { PROJECTS } from "@/data/projects";
import SearchPanel from "./SearchPanel";
import { Slash } from "@/components/brand-slash";

const MIN_NAVBAR_HEIGHT = 200;
const TOP_POSITION = 53;

interface DesktopNavMenuProps {
  scrollToSection: (id: string) => void;
  panelStayOpen: boolean;
  setPanelStayOpen: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  activeMenu: "about" | "projects" | "search" | null;
  setActiveMenu: (value: "about" | "projects" | "search" | null) => void;
}

function DesktopNavMenu({
  scrollToSection,
  panelStayOpen,
  setPanelStayOpen,
  open,
  setOpen,
  activeMenu,
  setActiveMenu,
}: DesktopNavMenuProps) {
  
  const handleReset = () => {
    cancelClose();
    setOpen(false);
    setActiveMenu(null);
    setPanelStayOpen(false);
  };

  useHotkey("Escape", () => {
    handleReset();
  });

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const menuData = useMemo(() => {
    return {
      about: {
        header: {
          label: USER.jobTitle,
          title: `Hi I'm ${USER.username}, a Full Stack Developer.`,
        },
        category: "Navigate to",
        links: [
          { label: "Profile", href: "#profile", isScroll: true },
          { label: "Tech Stack", href: "#tech-stack", isScroll: true },
          { label: "Experience", href: "#experience", isScroll: true },
          { label: "Certifications", href: "#certifications", isScroll: true },
          { label: "Socials", href: "#social-links", isScroll: true },
        ],
      },
      projects: {
        header: {
          label: "Portfolio",
          title: "Building digital products with impact.",
        },
        category: "Recent Projects",
        links: [
          ...PROJECTS.slice(0, 5).map((proj) => ({
            label: proj.title,
            href: `/project/${proj.id}`,
            isScroll: false,
          })),
          { label: "View All Projects →", href: "/project", isScroll: false },
        ],
      },
    };
  }, []);

  const handleItemClick = (link: { label: string; href: string; isScroll?: boolean }) => {
    if (link.isScroll) {
      scrollToSection(link.href.replace("#", ""));
    } else {
      navigate(link.href);
    }
    handleReset();
  };

  useMotionValueEvent(scrollY, "change", () => {
    if (open) handleReset();
  });

  const handleMouseEnter = (menu: "about" | "projects" | "search") => {
    cancelClose();
    setActiveMenu(menu);
    setOpen(true);
    setPanelStayOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      if (!panelStayOpen) {
        setOpen(false);
        setActiveMenu(null);
      }
    }, 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    if (!panelStayOpen && open) {
      scheduleClose();
    }
  }, [panelStayOpen, open]);

  return (
    <>
      <div className="flex items-center">
        <Button
          variant="link"
          className="hidden md:flex decoration-background px-2.5 text-muted-foreground hover:text-accent-foreground group"
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={scheduleClose}
        >
          <span className="flex gap-1 items-center">
            <Slash className="translate-x-0 group-hover:translate-x-2 transition-all delay-100" />
            <span className="translate-x-0 group-hover:translate-x-2 transition-all">About</span>
          </span>
        </Button>
        <Button
          variant="link"
          className="hidden md:flex decoration-background px-2.5 text-muted-foreground hover:text-accent-foreground group"
          onMouseEnter={() => handleMouseEnter("projects")}
          onMouseLeave={scheduleClose}
        >
          <span className="flex gap-1 items-center">
            <Slash className="translate-x-0 group-hover:translate-x-2 transition-all delay-100" />
            <span className="translate-x-0 group-hover:translate-x-2 transition-all">Projects</span>
          </span>
        </Button>
      </div>

      <AnimatePresence>
        {open && activeMenu && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40"
              style={{ top: TOP_POSITION }}
              onMouseEnter={handleReset}
              onClick={handleReset}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, scaleY: 0, height: 0 }}
              animate={{ opacity: 1, scaleY: 1, height: 400 }}
              exit={{ opacity: 0, scaleY: 0, height: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1],
                delay: 0.1,
              }}
              style={{
                position: "fixed",
                top: TOP_POSITION,
                left: 0,
                right: 0,
                transformOrigin: "top center",
                minHeight: MIN_NAVBAR_HEIGHT,
              }}
              className="z-50 bg-background/80 backdrop-blur-xl h-screen! md:max-w-3xl mx-auto border-x border-b border-border/40 rounded-b-3xl shadow-xl"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="container h-full flex justify-center px-12">
                {activeMenu === "search" ? (
                  <SearchPanel onClose={handleReset} onItemClick={handleItemClick} />
                ) : (
                  <motion.div
                    exit="exit"
                    key={activeMenu}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-30 items-start w-full px-5 max-w-3xl mx-auto py-20"
                  >
                    <MacHeader
                      label={menuData[activeMenu].header.label}
                      title={menuData[activeMenu].header.title}
                    />
                    <MacLinkList
                      category={menuData[activeMenu].category}
                      links={menuData[activeMenu].links}
                      onItemClick={handleItemClick}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default DesktopNavMenu;
