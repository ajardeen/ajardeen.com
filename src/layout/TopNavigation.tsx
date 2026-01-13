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
import { CircleArrowOutUpRight, Menu } from "lucide-react";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/use-sounds";
import GlobalMenu from "@/components/global-menu";
import { pagesSearch } from "@/configs/globalSearchConfig";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TopNavigation() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();
  const playClick = useSound("/audio/ui-sounds/click.wav");

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
  const parentVariants = {
    rest: {},
    hover: {},
  };

  const iconVariants: Variants = {
    rest: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    // We remove the standard 'shadow' and 'border' and use your custom utilities
    <SiteHeaderWrapper
      className={cn(
        "sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2",
        "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]",
        "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
        "transition-shadow duration-300"
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
        <div className=" flex gap-3 items-center">
          <Button
            variant="link"
            className="hidden md:block decoration-background cursor-pointer px-0"
            onClick={() => scrollToSection("profile")}
          >
            Portfolio
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
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </Button>
         
          <GlobalMenu pagesSearch={pagesSearch} />
          <ThemeSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="block md:hidden " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 h-30 py-3 mt-2">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => scrollToSection("profile")}>
                  Portfolio
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("tech-stack")}>
                  Skills
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("projects")}>
                  Projects
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
           <Separator
            orientation="vertical"
            className="my-2.5 bg-muted-foreground/60"
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
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}

export default TopNavigation;
