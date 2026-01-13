import { ThemeProvider } from "./components/theme-provider";
import { ReactLenis } from "lenis/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootLayout from "./layout/RootLayout";

import "lenis/dist/lenis.css";
import "./App.css";

import ProjectDetails from "./pages/Project/ProjectDetails";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import FooterSection from "./pages/Portfolio/FooterSection/FooterSection";
import Project from "./pages/Project/Project";

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <ReactLenis
          root
          options={{
            duration: 0.3, // scroll speed
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
            smoothWheel: true,
            syncTouch: true, // keep touch native
            lerp: 0.08, // lower = smoother
          }}
        >
          <RootLayout>
            <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22 ">
              <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
              </Routes>
               <FooterSection />
            </div>
          </RootLayout>
        </ReactLenis>
      </Router>
    </ThemeProvider>
  );
}

export default App;
