import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { SiteHeaderMark } from "@/components/site-header-mark";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CircleArrowOutUpRight, Menu, Search } from "lucide-react";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/use-sounds";
// import GlobalMenu from "@/components/global-menu";
// import { pagesSearch } from "@/configs/globalSearchConfig";
// import { buildProjectSearch } from "@/utils/projectSearchBuilder";
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
          "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2 overflow-hidden",
          "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
          "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
          "transition-shadow duration-300",
        )}
      >
        <div
          className={cn(
            " mx-auto screen-line-after screen-line-before  border-edge flex h-12 items-center justify-between gap-2 border-x  px-2 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl",
            panelStayOpen ? "border-transparent! shadow-none!" : "",
          )}
          data-header-container
          onMouseLeave={() => setPanelStayOpen(false)}
        >
          <Link
            className="has-data-[visible=false]:pointer-events-none [&_img]:h-9 overflow-hidden"
            to="/"
            aria-label="Home"
          >
            <SiteHeaderMark />
          </Link>

          <div className="flex gap-1 items-center">
            {/* Desktop nav links */}

            <DesktopNavMenu
              scrollToSection={scrollToSection}
              panelStayOpen={panelStayOpen}
              setPanelStayOpen={setPanelStayOpen}
            />
            <Button
              variant="ghost"
           
              className="block md:hidden "
              onClick={() => handleMenu("search")}
            >
              <Search className="text-accent-foreground" />
            </Button>
            
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
              onClick={() => handleMenu("links")}
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
