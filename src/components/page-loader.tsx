import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/use-sounds";

interface PageLoaderProps {
  onComplete: () => void;
}

// Ensure strict absolute path referencing from the public folder root
const AUDIO_PATHS = {
  movement: "/audio/ui-sounds/loadermovement.wav",
  blink: "/audio/ui-sounds/loaderblink.wav",
};

function PageLoader({ onComplete }: PageLoaderProps) {
  const play = useSound(AUDIO_PATHS.movement);
  const playBlink = useSound(AUDIO_PATHS.blink);

  const [percent, setPercent] = useState(0);
  const [flash, setFlash] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  // States to handle the bar-only double-blink sequence
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinksDone, setBlinksDone] = useState(false);

  // 1. Prefetch Audio Assets Explictly
  useEffect(() => {
    let loadedCount = 0;
    const targets = Object.values(AUDIO_PATHS);

    const checkReady = () => {
      loadedCount++;
      if (loadedCount === targets.length) {
        setAudioReady(true);
      }
    };

    targets.forEach((path) => {
      const audio = new Audio();
      // 'auto' forces the browser to buffer the complete binary file stream
      audio.preload = "auto"; 
      
      audio.addEventListener("canplaythrough", checkReady, { once: true });
      audio.addEventListener("error", checkReady, { once: true }); // Prevent locking loader if path breaks entirely
      audio.src = path;
      audio.load();
    });
  }, []);

  // 2. Check when DOM/Window assets finish loading
  useEffect(() => {
    if (document.readyState === "complete") {
      setContentLoaded(true);
    } else {
      const handleLoad = () => setContentLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // 3. Run the progress bar smoothly bounded by real network constraints
  useEffect(() => {
    const isFullyReady = contentLoaded && audioReady;

    const interval = setInterval(() => {
      setPercent((prev) => {
        // Hold the visual bar back at 90% if network/audio assets are trailing behind
        if (prev >= 90 && !isFullyReady) {
          return 90;
        }
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 12); // Slightly optimized rhythm speed 

    return () => clearInterval(interval);
  }, [contentLoaded, audioReady]);

  // 4. Trigger double blink sequence on the loader bar when progress hits 100%
  useEffect(() => {
    if (percent === 100 && !blinksDone) {
      let currentBlink = 0;

      const startTimeout = setTimeout(() => {
        const blinkInterval = setInterval(() => {
          setIsBlinking((prev) => {
            const nextState = !prev;
            if (nextState) {
              playBlink(0.4); 
            }
            return nextState;
          });

          currentBlink += 1;

          if (currentBlink >= 4) {
            clearInterval(blinkInterval);
            setTimeout(() => {
              setIsBlinking(false);
              setBlinksDone(true);
              setFlash(true); 
            }, 100);
          }
        }, 120); 

        return () => clearInterval(blinkInterval);
      }, 50);

      return () => clearTimeout(startTimeout);
    }
  }, [percent, blinksDone, playBlink]);

  // 5. Trigger unmount sequence after flash
  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => {
        onComplete();
        play(0.5);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [flash, onComplete, play]);

  return (
    <motion.div
      key="page-loader"
      exit={{ opacity: 0, backdropFilter: "blur(30px)" }}
      transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex justify-center items-center bg-background overflow-hidden z-[9999]"
    >
      <div className="relative h-30 w-10 rotate-30 sm:rotate-45 z-10 transition-opacity duration-150">
        <motion.div
          animate={{ translateY: flash ? "-550%" : "0%" }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 border-2 z-10 border-brand overflow-hidden"
        >
          <div
            className={`absolute bottom-0 left-0 w-full shadow-lg shadow-brand transition-colors duration-75 ${
              isBlinking ? "bg-brand brightness-120" : "bg-brand/10"
            }`}
            style={{
              height: `${percent}%`,
              transition: "height 30ms linear, background-color 75ms ease",
            }}
          />
        </motion.div>

        {flash && (
          <motion.div
            animate={{ opacity: 1, translateY: flash ? "-550%" : "0%" }}
            transition={{ duration: 0.2 }}
            className="absolute top-30 left-0 w-full bg-linear-160 from-20% brightness-110 blur-sm from-brand to-transparent to-60% h-10 z-0 shadow-brand/50"
            style={{
              height: `350%`,
              transition: "height 30ms linear",
            }}
          />
        )}

        <div className="-rotate-45 absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span
            className={`text-xs font-mono font-medium transition-colors duration-75 ${
              isBlinking ? "text-brand-foreground" : "text-accent-foreground"
            }`}
          >
            {percent}%
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: flash ? 1 : 0 }}
          className="absolute left-0 bottom-[121px] w-full border border-accent-foreground border-dotted border-b-transparent min-h-[600px] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_20px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: flash ? 1 : 0 }}
          className="border border-accent-foreground border-dotted min-h-[600px] border-t-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:10px_20px]"
        />
      </div>
    </motion.div>
  );
}

export default PageLoader;