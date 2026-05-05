import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sounds";
import { cn } from "@/lib/utils";
import { Volume2Icon } from "lucide-react";
import { USER } from "@/data/user";
import SeparatorUi from "@/components/SeparatorUi";
import ProfileData from "./components/ProfileData";
import ProfileCover from "./components/ProfileCover";
import verified from "@/assets/icons/verified.svg";
import OpenToWorkUI from "./components/OpenToWorkUI";
import { TextFlip } from "@/components/text-flip";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSound as useSoundCN } from "@/hooks/use-sound";
import { switch003Sound } from "@/lib/switch-003";
import { FlippingAvatar } from "./components/FlippingAvatar";

import { click003Sound } from "@/lib/click-003";

function HeroSection() {
  const [playClick3] = useSoundCN(click003Sound);
  const playClick = useSound("/audio/mohamedajardeen.mp3");
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("Open to Work");
  const handleFlipParent = () => {
    if (bubbleMessage === "Open to Work") {
      setBubbleMessage("Hi👋");
    } else {
      setBubbleMessage("Open to Work");
    }
    playClick3();
  };
  return (
    <>
      {/* logo container  */}
      <ProfileCover />
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="screen-line-after flex border-x border-edge "
      >
        <div className="relative shrink-0 border-r border-edge group">
          {USER.openToWork && (
            <OpenToWorkUI isHovered={isHovered} setIsHovered={setIsHovered} />
          )}
          <div className="mx-0.5 my-0.75">
            <FlippingAvatar
              primaryImg={USER.avatar}
              handleFlipParent={() => handleFlipParent()}
              secondaryImg={USER.secondaryAvatar}
              className="size-32 sm:size-40"
            />
          </div>
          {USER.openToWork && (
            <div className="absolute -top-10 right-0">
              <TalkBubble show={true} bubbleMessage={bubbleMessage} />
            </div>
          )}
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
          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9 text-sm text-muted-foreground flex items-start">
            <p className="text-brand font-bold mr-1">/</p>
            <TextFlip>
              {USER.flipSentences.map((sentence, index) => (
                <span key={index}>{sentence}</span>
              ))}
            </TextFlip>
          </div>
        </div>
      </motion.div>
      <SeparatorUi />
      <ProfileData />
    </>
  );
}

export default HeroSection;

function TalkBubble({
  show = true,
  bubbleMessage,
}: {
  show: boolean;
  bubbleMessage: string;
}) {
  const [play] = useSoundCN(switch003Sound);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (isPlaying) return; // Prevent playing if already in the 10s window

    // 1. Start the sound
    play();

    // 2. Set state to true to start the "delay" period
    setIsPlaying(true);

    // 3. Wait 10 seconds before resetting
    setTimeout(() => {
      setIsPlaying(false);
    }, 10000); // 10,000 milliseconds = 10 seconds
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          onViewportEnter={() => {
            if (!isPlaying) {
              handlePlay();
            }
          }}
          viewport={{ once: false, amount: 0.5 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          {/* Main Bubble */}
          <div className="relative z-10 bg-accent text-accent-foreground px-4 py-2 rounded-2xl shadow-lg border dark:border-white/10 text-sm font-medium">
            {bubbleMessage}
          </div>

          {/* Medium Bubble */}
          <div className="absolute -bottom-2 right-8 size-5 bg-accent rounded-full shadow-md border dark:border-white/10" />

          {/* Small Bubble */}
          <div className="absolute -bottom-5 right-10 size-3 bg-accent rounded-full shadow-sm border dark:border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
