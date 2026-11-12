import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sounds";
import { Volume2Icon } from "lucide-react";
import { USER } from "@/data/user";
import SeparatorUi from "@/components/SeparatorUi";
import ProfileData from "./components/ProfileData";
import ProfileCover from "./components/ProfileCover";
import verified from "@/assets/icons/verified.svg";
import { TextFlip } from "@/components/text-flip";
import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSound as useSoundCN } from "@/hooks/use-sound";
import { switch003Sound } from "@/lib/switch-003";
import { FlippingAvatar } from "./components/FlippingAvatar";
import { click003Sound } from "@/lib/click-003";
import StatusIndicator from "./components/StatusIndicator";
import PromotionSection from "../PromotionBanner/PromotionSection";

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
    <ProfileCover>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative shrink-0"
      >
        <WobblyMask>
          <FlippingAvatar
            primaryImg={USER.avatar}
            handleFlipParent={() => handleFlipParent()}
            secondaryImg={USER.secondaryAvatar}
            className="size-full rounded-none"
          />
        </WobblyMask>

        {USER.openToWork && (
          <div className="absolute bottom-0 right-0 -translate-y-0.5 cursor-pointer z-20 w-fit">
            <StatusIndicator variant={"red"} isHovered={isHovered} />
          </div>
        )}

        {USER.openToWork && (
          <div className="absolute -top-10 right-0">
            <TalkBubble show={true} bubbleMessage={bubbleMessage} />
          </div>
        )}
      </motion.div>
    </ProfileCover>

    {/* name + text below the cover */}
    <div className="px-4 pt-24 pb-4 text-center sm:min-h-20 sm:px-6 sm:pt-3 sm:pb-6 sm:pl-48 sm:text-left">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          {USER.displayName}
        </h1>
        <img src={verified} alt="icon" className="size-5" />
        <Button
          variant={"link"}
          className="p-0 relative text-muted-foreground hover:text-foreground transition-[color,scale] select-none active:scale-[0.9] after:absolute after:-inset-1"
          onClick={() => playClick()}
        >
          <Volume2Icon size={24} className="size-5" />
        </Button>
      </div>
      <div className="mt-1 flex items-start justify-center text-sm text-muted-foreground sm:justify-start">
        <p className="text-brand font-bold mr-1">/</p>
        <TextFlip>
          {USER.flipSentences.map((sentence, index) => (
            <span key={index}>{sentence}</span>
          ))}
        </TextFlip>
      </div>
    </div>

    <SeparatorUi />
    <PromotionSection />
    <SeparatorUi />
    <ProfileData />
  </>
);
}

export default HeroSection;

/* ---------------------------- Wobbly avatar mask ---------------------------- */

const LOBES = 10; // number of bumps around the edge
const DEPTH = 0.12; // how deep the scallops cut in (0.08 subtle, 0.18 strong)
const POINTS = 180; // smoothness of the outline
const TURNS = 3; // how many times the lobes travel around during one run

function scallopPath(progress: number) {
  // amplitude is 0 at start and end (perfect circle), peaks in the middle
  const amp = DEPTH * Math.sin(Math.PI * progress);
  // phase moves the lobes around the shape
  const phase = progress * Math.PI * 2 * TURNS;

  const pts: string[] = [];
  for (let i = 0; i < POINTS; i++) {
    const a = (i / POINTS) * Math.PI * 2;
    const r = 1 - amp * (0.5 + 0.5 * Math.cos(LOBES * a - phase));
    const x = 50 + 50 * r * Math.cos(a);
    const y = 50 + 50 * r * Math.sin(a);
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
}

function WobblyMask({ children }: { children: ReactNode }) {
  const progress = useMotionValue(0);
  const clipPath = useTransform(progress, scallopPath);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 8, // start -> finish
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 5, // wait 5s as a circle, then loop
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <motion.div
      className="size-40 sm:size-36"
      style={{ clipPath, WebkitClipPath: clipPath }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------- Talk bubble ------------------------------- */

function TalkBubble({
  show = true,
  bubbleMessage,
}: {
  show: boolean;
  bubbleMessage: string;
}) {
  const [initialRender, setInitialRender] = useState(true);
  const [play] = useSoundCN(switch003Sound);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setInitialRender(false);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const handlePlay = () => {
    if (isPlaying) return; // Prevent playing if already in the 15s window

    play();
    setIsPlaying(true);

    setTimeout(() => {
      setIsPlaying(false);
    }, 15000); // 15 seconds
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          onViewportEnter={() => {
            if (!isPlaying && !initialRender) {
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