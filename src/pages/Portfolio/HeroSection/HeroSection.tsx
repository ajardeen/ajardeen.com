import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";
import { Volume2Icon } from "lucide-react";
import { USER } from "@/data/user";
import SeparatorUi from "@/components/SeparatorUi";
import ProfileData from "./components/ProfileData";
import ProfileCover from "./components/ProfileCover";
import verified from "@/assets/icons/verified.svg";

function HeroSection() {
  const playClick = useSound("/audio/mohamedajardeen.mp3");
  return (
    <>
      {/* logo container  */}
      <ProfileCover />
      <div className="screen-line-after flex border-x border-edge ">
        <div className="shrink-0 border-r border-edge">
          <div className="mx-0.5 my-0.75">
            <img
              src={USER.avatar}
              alt="profile"
              className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            />
          </div>
        </div>
        <div className="flex flex-col border-x border-edge w-full border-l-0">
          <div className="flex grow items-end pb-1 pl-4">
            <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
              text-zinc-300 font-mono text-xs
            </div>
          </div>
          <div className="border-t border-edge">
            <div className="flex items-center gap-2 pl-4">
              <h1 className="-translate-y-px text-3xl font-semibold">
                {USER.displayName}
              </h1>
              <img src={verified} alt="icon" className={cn("size-5 ")} />
              <Button
                variant={"link"}
                className=" p-0 relative text-muted-foreground transition-[color,scale] select-none hover:text-foreground scale-1.8 active:scale-[0.9] after:absolute after:-inset-1"
                onClick={() => playClick()}
              >
                <Volume2Icon size={24} className="size-5" />
              </Button>
            </div>
          </div>
          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9 text-sm text-muted-foreground flex items-center">
            Making ui which engage others
          </div>
        </div>
      </div>
      <SeparatorUi />
      <ProfileData />
    </>
  );
}

export default HeroSection;
