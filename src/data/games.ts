import type { Games, GameStation } from "@/types/games";
import MemoryGameIcon from "@/assets/icons/Memory Game Icon.svg";
import FlipCard from "@/assets/icons/FlipCard.svg";
import { cn } from "@/lib/utils";

export const GAMES: Games = [
  {
    id: "memory-game",
    title: "Memory Game",
    description:
      "A fun and challenging memory game built with React and TypeScript, where players flip cards to find matching pairs.",
    icon: MemoryGameIcon,
    backgroundImage: "",
    assets: {
      cardBackIcon: FlipCard,
      // Distinct card set pairs for matching mechanics
      cardPairs: ["🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🌮", "🍦"],
    },
  },
];

export const GAMESSTATION: GameStation = {
  title: "Store",
  description:
    "A collection of fun and engaging games built with React and TypeScript.",
  icon: "🎮",
  backgroundImage: cn(
    "related w-full min-h-[80vh] md:min-h-[60vh] border-x border rounded-sm  border-edge select-none ",
    " text-black dark:text-white",
    "screen-line-before screen-line-after before:-top-px after:-bottom-px",
    "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5",
  ),
  games: GAMES,
};
