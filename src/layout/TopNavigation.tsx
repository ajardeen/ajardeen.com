import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { SiteHeaderMark } from "@/components/site-header-mark";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function TopNavigation() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

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
        <div className="flex gap-2 items-center">
          <Button variant="link" className="decoration-background cursor-pointer" onClick={() => scrollToSection("tech-stack")}>
            Tech Stack
          </Button>
          <Button variant="link" className="decoration-background cursor-pointer" onClick={() => scrollToSection("projects")}>
            Project
          </Button>
          <Separator orientation="vertical" className="my-2.5 bg-muted-foreground/60"/>
        <ThemeSwitcher />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}

export default TopNavigation;
