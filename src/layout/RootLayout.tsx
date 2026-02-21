import React from "react";
import TopNavigation from "./TopNavigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { FloatingAiChat } from "@/components/floating-ai-chat";


function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top navigation stays full width */}
      <TopNavigation />

      {/* Page container */}
      <main className="max-w-screen overflow-x-hidden px-2 ">
        {children}
    
      </main>
     <FloatingAiChat/>
      <ScrollToTop />
    </>
  );
}

export default RootLayout;
