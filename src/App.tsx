import { ThemeProvider } from "./components/theme-provider";
import { ReactLenis } from "lenis/react";
// Add Outlet to your imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import "lenis/dist/lenis.css";
import "./App.css";

import ProjectDetails from "./pages/Project/ProjectDetails";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import FooterSection from "./pages/Portfolio/FooterSection/FooterSection";
import Project from "./pages/Project/Project";
import { Page_Not_Found } from "./pages/NotFound/Page_Not_Found";
import ScrollToTopAuto from "./utils/ScrollToTopAuto";

export function App() {
  
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTopAuto />
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
          <Routes>
            {/* --- Wrapper Route for Pages WITH Footer --- */}
            <Route
              element={
                <>
                <RootLayout>
                    <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
                    <Outlet /> {/* This renders the Portfolio, Project, etc. */}
                </div>
                  </RootLayout>
                  <FooterSection />
                </>
              }
            >
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
            </Route>

            {/* --- Route WITHOUT Footer --- */}
            <Route path="*" element={<Page_Not_Found />} />
          </Routes>
        </ReactLenis>
      </Router>
    </ThemeProvider>
  );
}

export default App;

