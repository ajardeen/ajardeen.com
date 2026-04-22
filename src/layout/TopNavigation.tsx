import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { SiteHeaderMark } from "@/components/site-header-mark";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { CircleArrowOutUpRight, X, Menu, ArrowRight, ChevronRight } from "lucide-react";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/use-sounds";
import GlobalMenu from "@/components/global-menu";
import { pagesSearch } from "@/configs/globalSearchConfig";
import { buildProjectSearch } from "@/utils/projectSearchBuilder";
import { useState, useEffect } from "react";

const overlayVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

function FullScreenMenu({
  open,
  onClose,
  scrollToSection,
}: {
  open: boolean;
  onClose: () => void;
  scrollToSection: (id: string) => void;
}) {
  const navigate = useNavigate();

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    {
      label: "About",
      action: () => {
        scrollToSection("profile");
        onClose();
      },
    },
    {
      label: "Skills",
      action: () => {
        scrollToSection("tech-stack");
        onClose();
      },
    },
    {
      label: "Projects",
      action: () => {
        navigate("/project");
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="fullscreen-menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-9999 bg-background/95 backdrop-blur-md flex flex-col"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top bar with close button */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-border/40">
            <Link
              to="/"
              onClick={onClose}
              aria-label="Home"
              className="[&_img]:h-9"
            >
              <SiteHeaderMark />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-1 rounded-sm hover:bg-muted transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col items-start justify-start flex-1 px-8 gap-2">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full flex items-center gap-2 cursor-pointer group"
              >
                <button
                  onClick={item.action}
                  className="w-full text-left text-3xl font-medium py-4 border-b border-border/30 text-foreground hover:text-muted-foreground transition-colors duration-200 tracking-tight"
                >
                  {item.label}
                </button>
                <ChevronRight size={35} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopNavigation() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const playClick = useSound("/audio/ui-sounds/redirectUiSound.wav");
  const [menuOpen, setMenuOpen] = useState(false);

  const getHeaderOffset = () => {
    const header = document.querySelector("[data-header-container]");
    return header ? -header.clientHeight : -88;
  };

  const scrollToSection = (id: string) => {
    const scroll = () =>
      lenis?.scrollTo(`#${id}`, {
        offset: getHeaderOffset(),
        duration: 0.6,
      });

    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => setTimeout(scroll, 100));
    } else {
      scroll();
    }
  };

  const parentVariants: Variants = {
    rest: {},
    hover: {},
  };

  const iconVariants: Variants = {
    rest: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <>
      <FullScreenMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        scrollToSection={scrollToSection}
      />

      <SiteHeaderWrapper
        className={cn(
          "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2 overflow-hidden",
          "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
          "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
          "transition-shadow duration-300",
        )}
      >
        <div
          className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
          data-header-container
        >
          <Link
            className="has-data-[visible=false]:pointer-events-none [&_img]:h-9 overflow-hidden"
            to="/"
            aria-label="Home"
          >
            <SiteHeaderMark />
          </Link>

          <div className="flex gap-2 items-center">
            {/* Desktop nav links */}
            <Button
              variant="link"
              className="hidden md:block decoration-background cursor-pointer px-0"
              onClick={() => scrollToSection("profile")}
            >
              About 
              
            </Button>
            <Button
              variant="link"
              className="hidden md:block decoration-background cursor-pointer px-0"
              onClick={() => scrollToSection("tech-stack")}
            >
              Skills
            </Button>
            <Button
              variant="link"
              className="hidden md:block decoration-background cursor-pointer px-0"
              onClick={() => navigate("/project")}
            >
              Projects
            </Button>

            <GlobalMenu
              pagesSearch={pagesSearch}
              projectSearch={buildProjectSearch()}
            />
            <ThemeSwitcher />
             <Separator
              orientation="vertical"
              className="hidden md:block my-2.5 bg-muted-foreground/60 md:mr-1"
            />
            {/* Mobile hamburger → full-screen menu trigger */}
            <motion.a
              href={USER.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={parentVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              onClick={() => playClick()}
            >
              <Button
                variant="secondary"
                className="bg-blue-700 text-white hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-gray-300 flex items-center gap-2"
              >
                Resume
                <motion.span
                  variants={iconVariants}
                  className="bg-white rounded-full p-1 inline-flex"
                >
                  <CircleArrowOutUpRight className="text-black size-3" />
                </motion.span>
              </Button>
            </motion.a>

            <Separator
              orientation="vertical"
              className="block md:hidden my-2.5 bg-muted-foreground/60 md:mr-1"
            />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="block md:hidden p-1 rounded hover:bg-muted transition-colors"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </SiteHeaderWrapper>
    </>
  );
}

export default TopNavigation;
