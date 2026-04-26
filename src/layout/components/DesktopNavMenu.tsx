import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MacHeader, MacLinkList } from "./Navigators";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useHotkey } from "@tanstack/react-hotkeys";

// Import your data
import { USER } from "@/data/user";
import { PROJECTS } from "@/data/projects";
import { Search } from "lucide-react";
import SearchPanel from "./SearchPanel";
import { Slash } from "@/components/brand-slash";

const MIN_NAVBAR_HEIGHT = 200; // Increased slightly for more links
const TOP_POSITION = 53;

function DesktopNavMenu({
  scrollToSection,
  panelStayOpen,
  setPanelStayOpen,
}: {
  scrollToSection: (id: string) => void;
  panelStayOpen: boolean;
  setPanelStayOpen: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    "about" | "projects" | "search" | null
  >(null);

  const handleReset = () => {
    cancelClose();
    setOpen(false);
    setActiveMenu(null);
    setPanelStayOpen(false);
  };
  // 1. Memoize the toggle/open logic
  // Inside DesktopNavMenu
  // const toggleMenu = useCallback(
  //   (menu: "about" | "projects" | "search") => {
  //     setOpen((prevOpen) => {
  //       const isClosing = prevOpen && activeMenu === menu;

  //       if (isClosing) {
  //         handleReset();
  //         return false;
  //       }

  //       // FIX: Move parent state update out of the render phase
  //       setTimeout(() => {
  //         setPanelStayOpen(true);
  //       }, 0);

  //       setActiveMenu(menu);
  //       return true;
  //     });
  //   },
  //   [activeMenu, setPanelStayOpen],
  // );
  // Keyboard shortcut support

  // useHotkey("Mod+K", () => {
  //   toggleMenu("search");
  // });
  // useHotkey("Mod+A", () => {
  //   console.log("called");

  //   toggleMenu("about");
  // });
  // useHotkey("Mod+P", () => {
  //   toggleMenu("projects");
  // });
  useHotkey("Escape", () => {
    handleReset();
  });

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Dynamic Menu Data Generation
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
          // Map first 5 projects
          ...PROJECTS.slice(0, 5).map((proj) => ({
            label: proj.title,
            href: `/project/${proj.id}`,
            isScroll: false,
          })),
          // Footer link
          { label: "View All Projects →", href: "/project", isScroll: false },
        ],
      },
    };
  }, []);
  const handleItemClick = (link: {
    label: string;
    href: string;
    isScroll?: boolean;
  }) => {
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

  // Logic to handle "search" alongside about/projects
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
    // Only schedule a close if the panel isn't supposed to stay open
    // and we are currently in an 'open' state.
    if (!panelStayOpen && open) {
      scheduleClose();
    }
  }, [panelStayOpen, open]);

  return (
    <>
      <div className="flex">
        <Button
          variant="link"
          className="hidden md:flex decoration-background cursor-pointer px-2.5 text-muted-foreground hover:text-accent-foreground group "
          onMouseEnter={() => handleMouseEnter("about")}
          onMouseLeave={scheduleClose}
          onClick={() => {
            scrollToSection("profile");
            handleReset();
          }}
        >
          <Slash />
          About
        </Button>

        <Button
          variant="link"
          className="hidden md:flex decoration-background cursor-pointer px-2.5 text-muted-foreground hover:text-accent-foreground group"
          onMouseEnter={() => handleMouseEnter("projects")}
          onMouseLeave={scheduleClose}
          onClick={() => {
            navigate("/project");
            handleReset();
          }}
        >
          <Slash />
          Projects
        </Button>
        <Button
          variant="ghost"
          className="hidden md:block"
          onMouseEnter={() => handleMouseEnter("search")}
          onMouseLeave={scheduleClose}
          onClick={() => handleMouseEnter("search")}
        >
          <Search className=" text-accent-foreground" />
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
              className="z-50 bg-background/95 backdrop-blur-2xl "
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="container mx-auto h-full flex justify-center items-center px-12">
                {activeMenu === "search" ? (
                  <SearchPanel
                    onClose={handleReset}
                    // results={searchResults} // Pass results here
                    onItemClick={handleItemClick}
                  />
                ) : (
                  <motion.div
                    exit="exit"
                    key={activeMenu}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-30 items-start w-full px-5 max-w-3xl mx-auto  py-20"
                  >
                    <MacHeader
                      label={menuData[activeMenu].header.label}
                      title={menuData[activeMenu].header.title}
                    />

                    {/* Custom MacLinkList usage to handle internal clicks */}
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
