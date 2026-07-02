import { Panel, PanelContent } from "@/components/panel";
import slLogo from "@/assets/apps/icons/SharedLivingLogo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PromotionSection() {
  const navigate = useNavigate();

  const particles = [
    { top: "8%", delay: 0.0, duration: 1.8 },
    { top: "16%", delay: 0.9, duration: 3.2 },
    { top: "24%", delay: 1.6, duration: 2.1 },
    { top: "32%", delay: 0.3, duration: 2.7 },
    { top: "40%", delay: 2.1, duration: 1.6 },
    { top: "48%", delay: 0.6, duration: 3.5 },
    { top: "56%", delay: 1.9, duration: 2.4 },
    { top: "64%", delay: 0.2, duration: 2.9 },
    { top: "72%", delay: 1.3, duration: 1.9 },
    { top: "80%", delay: 2.4, duration: 3.0 },
    { top: "88%", delay: 0.7, duration: 2.3 },
    { top: "12%", delay: 1.1, duration: 2.6 },
    { top: "28%", delay: 2.6, duration: 1.7 },
    { top: "52%", delay: 1.4, duration: 3.3 },
    { top: "76%", delay: 0.4, duration: 2.0 },
  ];

  return (
    <Panel id="promotion">
      <PanelContent className="relative flex items-center justify-start gap-2 py-1 overflow-hidden bg-linear-to-l from-blue-600 from-50% via-slate-50 via-70% to-transparent border-border">
        
  

        {/* Tiny white spark particles traveling full width, right -> left, each at its own speed */}
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              top: p.top,
              right: 0,
              width: 2,
              height: 2,
              background: "white",
              boxShadow: "0 0 4px 1px rgba(255,255,255,0.7)",
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: "-100vw", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.7, 1],
            }}
          />
        ))}

        {/* Content (kept above the background layers) */}
        <span className="relative z-10 text-lg font-medium">
          Cooking New Product
        </span>
        <motion.span
          className="relative z-10 inline-flex items-center justify-center cursor-pointer select-none mx-1"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/shared-living")}
        >
          <img
            src={slLogo}
            alt="Shared Living Logo"
            className="h-10 sm:h-12 w-auto object-contain align-middle"
          />
        </motion.span>
        <span className="relative z-10 text-lg font-medium">
          Coming Soon...
        </span>
      </PanelContent>
    </Panel>
  );
}

export default PromotionSection;