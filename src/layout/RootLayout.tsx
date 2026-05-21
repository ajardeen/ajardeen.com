import React from "react";
import TopNavigation from "./TopNavigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingAiChat } from "@/components/floating-ai-chat";
import FooterOverlay from "@/components/footer-overlay";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top navigation stays full width */}
      <TopNavigation />

      {/* Page container */}
      <main className="relative z-10 bg-background max-w-screen overflow-x-hidden px-2 pointer-events-auto  ">
        {children}
      </main>
      <FloatingAiChat />
      <FooterOverlay />
      <ScrollToTop />
    </>
  );
}

export default RootLayout;
