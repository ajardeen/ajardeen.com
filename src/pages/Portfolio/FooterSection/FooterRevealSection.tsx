import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { forceField004Sound } from "@/lib/force-field-004";

const SQUARES = [
  { size: "w-2.5 h-2", yOff: -38, dur: 2.1, delay: 0 },
  { size: "w-2 h-1.5", yOff: -20, dur: 1.8, delay: 0.35 },
  { size: "w-3 h-2.5", yOff: 5, dur: 2.4, delay: 0.7 },
  { size: "w-2 h-2", yOff: 28, dur: 1.9, delay: 1.1 },
  { size: "w-1.5 h-1", yOff: 40, dur: 2.2, delay: 1.5 },
  { size: "w-2.5 h-2", yOff: -8, dur: 2.0, delay: 1.85 },
  { size: "w-2 h-1", yOff: 14, dur: 1.7, delay: 0.55 },
  { size: "w-3 h-2", yOff: -50, dur: 2.3, delay: 0.9 },
];

function SparkleSquare({
  yOff,
  dur,
  delay,
  targetX,
  originY,
  // active,
}: {
  yOff: number;
  dur: number;
  delay: number;
  targetX: number;
  originY: number;
  active?: boolean;
}) {
  const startX = -30;
  const travel = targetX - startX + 200;
  const y = originY + yOff;

  // Only render or animate if active is true
  // if (!active) return null;

  return (
    <>
      <motion.div
        className="absolute -skew-x-[20deg] bg-emerald-400/20 border border-emerald-400/10"
        style={{ left: startX, top: y, width: 100, height: 6 }}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: [0, travel], opacity: [0, 0.3, 0.1, 0] }}
        transition={{
          duration: dur * 1.05,
          delay,
          repeat: Infinity,
          ease: "easeIn",
        }}
      />
      <motion.div
        className="absolute -skew-x-[20deg] bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
        style={{ left: startX, top: y, width: 20, height: 6 }}
        initial={{ x: 0, opacity: 0, scaleX: 1 }}
        animate={{ x: [0, travel], opacity: [0, 1, 1, 0], scaleX: [1, 1, 0.2] }}
        transition={{
          duration: dur,
          delay,
          repeat: Infinity,
          ease: "easeIn",
          times: [0, 0.08, 0.7, 1],
        }}
      />
    </>
  );
}

export default function FooterRevealSection() {
  const barRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [targetX, setTargetX] = useState(0);
  const [originY, setOriginY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [play] = useSound(forceField004Sound);

  useEffect(() => {
    function measure() {
      if (!barRef.current || !sceneRef.current) return;
      const sr = sceneRef.current.getBoundingClientRect();
      const br = barRef.current.getBoundingClientRect();
      setTargetX(br.left - sr.left + br.width / 1);
      setOriginY(br.top - sr.top + br.height / 2);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        play();
      }}
      onMouseLeave={() => setIsHovered(false)}
      ref={sceneRef}
      className={`w-full bg-background relative overflow-hidden h-[200px] md:h-[300px] transition-all duration-400 ${
        isHovered ? "shadow-[inset_0_0_50px_rgba(52,211,153,0.1)]" : ""
      }`}
    >
      {/* Sparkle squares layer - now active on hover */}
      <div className="absolute hidden dark:block overflow-hidden left-0 inset-0 top-0 z-10 pointer-events-none w-full">
        {targetX > 0 &&
          SQUARES.map((sq, i) => (
            <SparkleSquare
              key={i}
              yOff={sq.yOff}
              dur={sq.dur}
              delay={sq.delay}
              targetX={targetX}
              originY={originY}
              active={isHovered}
            />
          ))}
      </div>

      <div className="flex h-full flex-col items-center justify-center border-t border-edge relative z-20">
        <div className="relative flex items-center justify-center">
          <motion.h2
            className={`backdrop-blur-3xl relative my-2 ml-1 border font-bold tracking-tighter text-6xl md:text-[200px] z-50 px-4 transition-all duration-300
              ${isHovered ? "dark:text-white  border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)]" : "text-transparent text-shadow-2xs text-shadow-edge/50  border-edge"}
              before:absolute before:-left-[7px] before:-top-[7px] before:h-3 before:w-3 before:border before:border-emerald-400 before:bg-accent dark:before:bg-emerald-400 before:content-['']
              after:absolute after:-right-[7px] after:-top-[7px] after:h-3 after:w-3 after:border after:border-emerald-400/40 after:bg-accent dark:after:bg-emerald-400 after:content-['']`}
          >
            <span
              className="relative flex items-center justify-center h-full w-full md:pl-4
                  before:absolute before:-bottom-[6px] before:-left-[22px] before:h-3 before:w-3 before:border before:border-emerald-400/40 before:bg-accent dark:before:bg-emerald-400 before:content-['']
                  after:absolute after:-bottom-[6px] after:-right-[22px] after:h-3 after:w-3 after:border after:border-emerald-400 after:bg-accent after:content-['']"
            >
              {/* Background gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [1, 1, 0.4, 0.9, 0.3, 1, 1, 0.4, 0.9, 0.3, 1],
                }}
                transition={{
                  opacity: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    times: [
                      0, 0.4, 0.45, 0.5, 0.6, 0.7, 0.9, 0.92, 0.95, 0.98, 1,
                    ],
                  },
                }}
                className="absolute -left-1 bottom-0 w-full h-full bg-linear-to-r dark:from-emerald-400/20 from-10% to-15% to-transparent blur-3xl z-0"
              />
              {/* Glow bar */}
              <motion.div
                ref={barRef}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [1, 1, 0.4, 0.9, 0.3, 1, 1, 0.4, 0.9, 0.3, 1],
                }}
                transition={{
                  opacity: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                    times: [
                      0, 0.4, 0.45, 0.5, 0.6, 0.7, 0.9, 0.92, 0.95, 0.98, 1,
                    ],
                  },
                }}
                className="h-12 mr-3 w-3 md:mr-8  md:h-35 md:w-8
              bg-emerald-400
              border-2 border-emerald-400
              -skew-x-[20deg]
              shadow-[0_0_15px_rgba(52,211,153,0.6)]"
              />
              JARDEEN
            </span>
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}
