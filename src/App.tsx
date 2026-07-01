// import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ReactLenis } from "lenis/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
import RootLayout from "./layout/RootLayout";
import "lenis/dist/lenis.css";
import "./App.css";

import ProjectDetails from "./pages/Project/ProjectDetails";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import FooterSection from "./pages/Portfolio/FooterSection/FooterSection";
import Project from "./pages/Project/Project";
import { Page_Not_Found } from "./pages/NotFound/Page_Not_Found";
import ScrollToTopAuto from "./utils/ScrollToTopAuto";
// import PageLoader from "./components/page-loader";
import { Toaster } from "./components/ui/sonner";
import AppPromotionPage from "./pages/AppPromotionPage/AppPromotionPage";

export function App() {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      {/* <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence> */}

      <Router>
        <ScrollToTopAuto />
        
        <Routes>
          {/* BRANCH A: The Entire Portfolio Experience (Lenis + Layout + Footer) */}
          <Route
            element={
              <ReactLenis
                root
                options={{
                  duration: 0.3,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  smoothWheel: true,
                  syncTouch: true,
                  lerp: 0.08,
                }}
              >
                <RootLayout>
                  <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
                    <Outlet />
                  </div>
                </RootLayout>
                <FooterSection />
              </ReactLenis>
            }
          >
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Route>

          {/* BRANCH B: The Fresh, Isolated Page */}
          {/* This bypasses Lenis, RootLayout, and FooterSection entirely */}
          <Route path="/shared-living" element={<AppPromotionPage />} />

          {/* BRANCH C: Fallback */}
          <Route path="*" element={<Page_Not_Found />} />
        </Routes>

        <Toaster position="bottom-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
