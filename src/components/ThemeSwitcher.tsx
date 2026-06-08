import { useState, useRef } from "react"; // Added missing imports
import { SunIcon } from "./ui/sun";
import { MoonIcon } from "./ui/moon";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Kbd } from "./ui/kbd";
import { useSound } from "@/hooks/use-sound";
import { click003Sound } from "@/lib/click-003";

function ThemeSwitcher({ setGameStation }: { setGameStation: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { theme, setTheme } = useTheme();
  const [count, setCount] = useState(0);
  const timeoutRef = useRef<number | null>(null); // Keeps track of the running timer
  const [play] = useSound(click003Sound);

  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";
  const Icon = isLight ? MoonIcon : SunIcon;

  const toggleTheme = () => {
    // 1. Clear any existing timeout so clicks within 1s keep building the count
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2. Use functional update to get the immediate, precise next count
    setCount((prevCount) => {
      const nextCount = prevCount + 1;

      if (nextCount >= 5) {
        console.log("count",count)
        setGameStation(true);
        return 0; // Reset count immediately once threshold is reached
      }

      // 3. Reset count to 0 if the user stops clicking for more than 1 second
      timeoutRef.current = setTimeout(() => {
        setCount(0);
      }, 1000);
      return nextCount;
    });

    play();
    setTheme(nextTheme);
  };

  // 🔑 Press "D" to toggle theme
  useHotkey("D", () => {
    toggleTheme();
  });

  return (
    <motion.div
      className="max-h-9 my-2"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" onClick={toggleTheme} className="p-0 h-fit">
            <Icon className="p-2.25" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-base flex gap-2 p-2 justify-between items-center">
          Toggle {isLight ? "Dark" : "Light"} Mode
          <Kbd className="size-6">D</Kbd>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}

export default ThemeSwitcher;