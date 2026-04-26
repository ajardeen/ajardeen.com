import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

const ScrollToTopAuto = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // 1. Reset standard window scroll
    window.scrollTo(0, 0);
    
    // 2. Tell Lenis to jump to the top immediately (no animation)
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTopAuto;