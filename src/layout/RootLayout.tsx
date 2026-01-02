import React from "react";
import TopNavigation from "./TopNavigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation stays full width */}
      <TopNavigation />

      {/* Page container */}
      <main className="mx-auto max-w-3xl px-8 lg:px-12 bg-black">
        {children}
      </main>
    </div>
  );
}

export default RootLayout;

