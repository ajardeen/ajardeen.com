import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Dia Browser-style rising gradient — bars of one shared rainbow gradient,
// heavily blurred so they melt together, arranged in a bell curve (short at
// the edges, tall in the middle).
// ---------------------------------------------------------------------------

type Stop = { offset: number; color: string };

const DIA_STOPS: Stop[] = [
  { offset: 0, color: "#050B1F" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#2E7FE0" },
  { offset: 0.4135, color: "#8FC4FF" },
  { offset: 0.5866, color: "#CFE8FF" },
  { offset: 0.6827, color: "#EAF5FF" },
  { offset: 0.8029, color: "#FFFFFF" },
  { offset: 1, color: "#FFFFFF00" },
];

const VBW = 1271;
const VBH = 599;

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

function DiaGradient({
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
}: {
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
}) {
  const heights = bellHeights(bars, peak, valley);
  const colW = VBW / bars;

  return (
    <svg
      style={{ height: "100%", width: "100%" }}
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dia-grad-footer" x1="0" y1="1" x2="0" y2="0">
          {stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
        <filter
          id="dia-blur-footer"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      {heights.map((h, i) => (
        <g key={i} filter="url(#dia-blur-footer)">
          <rect
            x={i * colW}
            y={VBH - h}
            width={colW * 1.23}
            height={h}
            fill="url(#dia-grad-footer)"
          />
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Footer reveal — grey JARDEEN wordmark sitting BEHIND the rising gradient.
// The gradient's height/scale is driven by scroll progress through the
// sticky parent, so it grows taller the further you scroll into it.
// No hover state, no box background — just the text and the glow.
// ---------------------------------------------------------------------------

export default function FooterRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the sticky parent's scroll range.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Avoid a flash-of-full-height before the scroll listener attaches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-background relative overflow-hidden h-[300px] md:h-[400px]"
    >
      {/* Grey wordmark, sitting behind/under the gradient, no box/hover styling */}
      <div className="absolute   inset-0 translate-y-20 flex items-center justify-center z-20">
        <h2 className="text-[80px] md:text-[200px] font-bold tracking-wider text-white select-none transform md:scale-x-[1.5] md:scale-y-[1.5] origin-center">
          ajardeen
        </h2>
      </div>

      {/* Rising gradient, scroll-driven, anchored to the floor */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-10 opacity-90"
        style={{
          transformOrigin: "bottom",
          scaleY: mounted ? scaleY : 0,
          willChange: "transform",
        }}
      >
        <DiaGradient bars={9} blur={16} peak={0.98} />
      </motion.div>
    </div>
  );
}
