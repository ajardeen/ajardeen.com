import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";
import lightIcon from "@/assets/icons/maicon.png";
import darkIcon from "@/assets/icons/maicondark.png";

function ProfileCover() {
  const { theme } = useTheme();
  return (
    <div
      data-header-container
      id="profile"
      className={cn(
        "related aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
        "flex items-center justify-center text-black dark:text-white",
        "screen-line-before screen-line-after before:-top-px after:-bottom-px",
        "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
      )}
    >
      <div className="w-35 h-35 rounded-full border-14 border-muted" />

      <img
        src={theme === "light" ? darkIcon : lightIcon}
        alt="icon"
        className={cn("absolute w-39 -translate-y-0.5 transition-colors ")}
      />
    </div>
  );
}

export default ProfileCover;
