import { SunIcon } from "./ui/sun";
import { MoonIcon } from "./ui/moon";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/use-sounds";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Kbd } from "./ui/kbd";
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";
  const Icon = isLight ? MoonIcon : SunIcon;

  const toggleTheme = () => {
    playClick();

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => setTheme(nextTheme));
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
        <TooltipTrigger>
          <Button variant="outline" onClick={toggleTheme} className="p-0 h-fit">
            <Icon className="p-[9px]" />
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
