import SocialSection from "@/pages/Portfolio/SocialSection/SocialSection";
import AboutSection from "@/pages/Portfolio/AboutSection/AboutSection";
import TechStackSection from "@/pages/Portfolio/TechStackSection/TechStackSection";
import ExperiencesSection from "@/pages/Portfolio/ExperiencesSection/ExperiencesSection";
import ProjectsSection from "@/pages/Portfolio/ProjectsSection/ProjectsSection";
import CertificationsSection from "@/pages/Portfolio/CertificationsSection/CertificationsSection";
// import BrandSection from "@/pages/Portfolio/BrandSection/BrandSection";
import HeroSection from "@/pages/Portfolio/HeroSection/HeroSection";
import SeparatorUi from "@/components/SeparatorUi";
// import SecurityBanner from "./SecuritySection/SecurityBanner";

function PortfolioPage() {
  return (
    <>
      <HeroSection />
      <SeparatorUi />
      <SocialSection />
      <SeparatorUi />
      <AboutSection />
      <SeparatorUi />
      <TechStackSection />
      <SeparatorUi />
      <ExperiencesSection />
      <SeparatorUi />
      <ProjectsSection />
      <SeparatorUi />
      {/* <SecurityBanner/>
      <SeparatorUi /> */}
      <CertificationsSection />
      <SeparatorUi />

      {/* <BrandSection /> */}
      {/* <SeparatorUi />  */}
    </>
  );
}

export default PortfolioPage;
