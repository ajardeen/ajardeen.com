"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
}: {
  yOff: number;
  dur: number;
  delay: number;
  targetX: number;
  originY: number;
}) {
  const startX = -30;
  const travel = targetX - startX + 200;
  const y = originY + yOff;

  return (
    <>
      {/* Trail ghost */}
      <motion.div
        className="absolute -skew-x-[20deg] hidden dark:block bg-black/20 border-black/10 dark:bg-emerald-400/20 border dark:border-emerald-400/10"
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
      {/* Main square */}
      <motion.div
        className="absolute -skew-x-[20deg] hidden dark:block bg-black border-black/40 dark:bg-emerald-400 border dark:border-emerald-300 dark:shadow-[0_0_8px_rgba(52,211,153,0.7)]"
        style={{ left: startX, top: y, width: 20, height: 6 }}
        initial={{ x: 0, opacity: 0, scaleX: 1 }}
        animate={{
          x: [0, travel],
          opacity: [0, 1, 1, 0],
          scaleX: [1, 1, 0.2],
        }}
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
    <div
      ref={sceneRef}
      className="w-full bg-background relative overflow-hidden"
      style={{ height: "300px" }}
    >
      {/* Background gradient */}
      <div className="absolute bottom-0 w-full h-full bg-linear-to-tl dark:from-emerald-400/20 from-10% to-55% to-transparent blur-md z-0" />

      {/* Main content */}
      <div className="absolute  overflow-hidden left-0 inset-0 top-0  z-10 pointer-events-none w-[35%]  ">
        {targetX > 0 &&
          SQUARES.map((sq, i) => (
            <SparkleSquare
              key={i}
              yOff={sq.yOff}
              dur={sq.dur}
              delay={sq.delay}
              targetX={targetX}
              originY={originY}
            />
          ))}
      </div>

      <div className="flex h-full flex-col items-center justify-center border-t border-edge relative z-20">
        <div className="relative flex items-center justify-center">
          <motion.h2
            animate={{
              opacity: [1, 1, 0.85, 1, 0.92, 1, 0.78, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="backdrop-blur-3xl relative my-2 ml-1 border border-edge font-bold tracking-tighter text-edge text-6xl md:text-[200px] z-50 px-4
             before:absolute before:-left-[7px] before:-top-[7px] before:h-3 before:w-3 before:border before:border-white/40 before:bg-accent before:content-['']
             after:absolute after:-right-[7px] after:-top-[7px] after:h-3 after:w-3 after:border after:border-emerald-400/40 after:bg-emerald-400 after:content-['']"
          >
            {/* Inner span handles the bottom two corners */}
            <span
              className="relative flex items-center justify-center h-full w-full md:pl-4
                   before:absolute before:-bottom-[6px] before:-left-[22px] before:h-3 before:w-3 before:border before:border-emerald-400/40 before:bg-emerald-400 before:content-['']
                   after:absolute after:-bottom-[6px] after:-right-[22px] after:h-3 after:w-3 after:border after:border-white/40 after:bg-accent after:content-['']"
            >
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

          {/* Sparkle squares layer */}
        </div>
      </div>
    </div>
  );
}
