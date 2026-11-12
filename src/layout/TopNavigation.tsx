import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { SiteHeaderMark } from "@/components/site-header-mark";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CircleArrowOutUpRight, Menu, Search } from "lucide-react";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/use-sounds";
import { useState } from "react";
import { FullScreenMenu } from "./components/MobileScreenMenu";
import DesktopNavMenu from "./components/DesktopNavMenu";

function TopNavigation() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const playClick = useSound("/audio/ui-sounds/redirectUiSound.wav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuContent, setMenuContent] = useState("");
  
  const [panelStayOpen, setPanelStayOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"about" | "projects" | "search" | null>(null);

  const getHeaderOffset = () => {
    const header = document.querySelector("[data-header-container]");
    return header ? -header.clientHeight - 50 : -88;
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

  const handleMenu = (content: "search" | "links") => {
    if (content === "links") {
      setMenuContent("links");
    } else if (content === "search") {
      setMenuContent("search");
    }
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setMenuContent("");
  };

  const handleSearchMouseEnter = () => {
    setActiveMenu("search");
    setOpen(true);
    setPanelStayOpen(true);
  };

  return (
    <>
      <FullScreenMenu
        open={menuOpen}
        onClose={() => handleMenuClose()}
        scrollToSection={scrollToSection}
        menuContent={menuContent}
      />
      <SiteHeaderWrapper
        className={cn(
          "sticky top-0 z-50 max-w-screen  px-2 pt-2",
          "transition-shadow duration-300",
        )}
      >
        <div
          className={cn(
            "mx-auto bg-background  hover:bg-background  flex h-12 items-center justify-between gap-2 px-4 md:max-w-3xl rounded-lg transition-all duration-200",
            panelStayOpen ? "border-transparent! shadow-none! bg-background/90" : "",
          )}
          onMouseLeave={() => setPanelStayOpen(false)}
        >
          <DesktopNavMenu
            scrollToSection={scrollToSection}
            panelStayOpen={panelStayOpen}
            setPanelStayOpen={setPanelStayOpen}
            open={open}
            setOpen={setOpen}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

          <span
            className="has-data-[visible=false]:pointer-events-none [&_img]:h-9 overflow-hidden cursor-pointer"
            onClick={() => scrollToSection("profile")}
            aria-label="Home"
          >
            <SiteHeaderMark />
          </span>

          <div className="flex gap-1 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="flex h-9 w-9 items-center justify-center rounded-full text-accent-foreground"
              onMouseEnter={handleSearchMouseEnter}
              onClick={() => {
                if (window.innerWidth < 768) {
                  handleMenu("search");
                } else {
                  handleSearchMouseEnter();
                }
              }}
            >
              <Search className="size-4" />
            </Button>

            <ThemeSwitcher />
            
            <Separator
              orientation="vertical"
              className="hidden md:block h-5 my-auto bg-muted-foreground/30 mx-1"
            />

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
                className="bg-blue-700 text-white hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-gray-300 flex items-center gap-2 h-8 px-3 rounded-full text-xs font-medium"
              >
                Resume
                <motion.span
                  variants={iconVariants}
                  className="bg-white rounded-full p-0.5 inline-flex"
                >
                  <CircleArrowOutUpRight className="text-black size-2.5" />
                </motion.span>
              </Button>
            </motion.a>

            <Separator
              orientation="vertical"
              className="block md:hidden h-5 my-auto bg-muted-foreground/30 mx-1"
            />
            
            <button
              onClick={() => handleMenu("links")}
              aria-label="Open menu"
              className="block md:hidden p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </SiteHeaderWrapper>
    </>
  );
}

export default TopNavigation;
