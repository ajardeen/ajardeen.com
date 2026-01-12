import { useMotionValueEvent, useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import lightIcon from "@/assets/icons/maicon.png";
import darkIcon from "@/assets/icons/maicondark.png";
import { useTheme } from "@/components/theme-provider";
import { useLenis } from "lenis/react";

const calcDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const headerHeight = 56;
  return rect.bottom + window.scrollY - headerHeight;
};

function ChanhDaiMarkMotion() {
  const { theme } = useTheme();
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(false);
  const distanceRef = useRef(160);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextVisible = latest >= distanceRef.current;
    setVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
  });

  useEffect(() => {
    const coverMark = document.getElementById("js-cover-mark");
    if (!coverMark) return;

    const updateDistance = () => {
      distanceRef.current = calcDistance(coverMark);
    };

    updateDistance();

    const resizeObserver = new ResizeObserver(updateDistance);
    resizeObserver.observe(coverMark);

    window.addEventListener("resize", updateDistance);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDistance);
    };
  }, []);
  const lenis = useLenis();
  const handleScrollTop = () => {
    
      lenis?.scrollTo(`#profile`, {
        // offset: getHeaderOffset(),
        duration: 0.6,
      });
  };

  return (
    <img
      src={theme === "light" ? darkIcon : lightIcon}
      onClick={handleScrollTop}
      alt="icon"
      data-visible={visible}
      className="translate-y-5 opacity-0 transition-all duration-350
                 data-[visible=true]:translate-y-0
                 data-[visible=true]:opacity-100"
    />
  );
}

export function SiteHeaderMark() {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/index";
  return isHome ? <ChanhDaiMarkMotion /> : null;
}
