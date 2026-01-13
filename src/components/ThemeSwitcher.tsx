import { SunIcon } from "./ui/sun";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";
import { MoonIcon } from "./ui/moon";
import { Button } from "./ui/button";
import { useSound } from "@/hooks/use-sounds";

function ThemeSwitcher() {
  const playClick = useSound("/audio/ui-sounds/click.wav");
  const { theme, setTheme } = useTheme();
  return (
    <motion.div className="max-h-9 my-2" initial={{ opacity: 50 }} animate={{ opacity: 100 }}>
      {theme === "light" ? (
        <Button
          variant={"outline"}
          onClick={() => {
            playClick();
            setTheme("dark");
          }}
             className="p-0 h-fit"
        >
          <MoonIcon className="p-[9px]"/>
        </Button>
      ) : (
        <Button
          variant={"outline"}
          onClick={() => {
              playClick();
            setTheme("light");
          }}
          className="p-0 h-fit"
        >
          <SunIcon className="p-[9px]" />
        </Button>
      )}
    </motion.div>
  );
}

export default ThemeSwitcher;
