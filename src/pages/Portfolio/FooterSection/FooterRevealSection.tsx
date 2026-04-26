import { motion } from "framer-motion";

export default function FooterRevealSection() {
  return (
    <div
      className=" w-full bg-background relative"
      style={{ height: "300px" }} // Adjust this height to fit your content
    >
      <div className="flex h-full flex-col items-center justify-center border-t border-edge">
        <div className="flex items-center justify-center">
          {/* glow /  */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 1, 0.4, 0.9, 0.3, 1, 1, 0.4, 0.9, 0.3, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
              duration: 5, // Total loop time
                repeat: Infinity, // Keep flickering after it arrives
                ease: "linear",
                // Mapping the 0 to 1 scale:
                // 0.0 - 0.4: 2 sec Pause (40% of 5s)
                // 0.4 - 0.7: Fast Flicker
                // 0.7 - 0.9: 1 sec Pause (20% of 5s)
                // 0.9 - 1.0: Final Fast Flicker
                times: [0, 0.4, 0.45, 0.5, 0.6, 0.7, 0.9, 0.92, 0.95, 0.98, 1],
              },
            }}
            className="h-12 mr-3 w-3 md:mr-5 md:h-22 md:w-4 
          bg-emerald-400 
          border-2 border-emerald-400 
          -skew-x-[20deg] 
          shadow-[0_0_15px_rgba(52,211,153,0.6)] "
          />
          {/* Your Big Branding or "Reveal" content goes here */}
          <h2 className="text-6xl font-bold tracking-tighter text-edge md:text-9xl">
            JARDEEN
          </h2>
        </div>
        <p className="mt-4 text-muted-foreground text-sm">
          © {new Date().getFullYear()} — Crafted with passion.
        </p>
      </div>
      {/* footer blur */}
      <div className="absolute bottom-0 w-full h-full bg-linear-to-t from-emerald-400/20 from-10% to-55% to-transparent blur-md z-1" />
    </div>
  );
}
