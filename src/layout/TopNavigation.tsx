import ThemeSwitcher from "@/components/ThemeSwitcher";
import React from "react";

function TopNavigation() {
  return (
    <div className="sticky top-0 h-10 shadow ">
      <div className=" max-w-3xl mx-auto px-8 lg:px-12 border h-full">
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default TopNavigation;
