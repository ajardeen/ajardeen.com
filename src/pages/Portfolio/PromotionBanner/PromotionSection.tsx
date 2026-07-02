import { Panel, PanelContent } from "@/components/panel";
import slLogo from "@/assets/apps/icons/SharedLivingLogo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import campaign_icon from "@/assets/apps/icons/campaign-icon-original.svg";

function PromotionSection() {
  const navigate = useNavigate();

  return (
    <Panel id="promotion">
      <PanelContent className="relative flex items-center justify-center gap-1.5 py-1 text-sm font-medium text-white bg-blue-500 overflow-hidden sm:text-lg sm:gap-2">
        {/* Sweeping Shine Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 w-3/5"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 70%, transparent 100%)",
          }}
          initial={{ left: "-50%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
        />

        <img src={campaign_icon} alt="Campaign" className="h-5 w-auto object-contain brightness-0 invert sm:h-8" />

        {/* Unified single-line text for mobile compatibility */}
        <span className="relative z-10">
          New Product <span className="hidden xs:inline">-</span> Coming Soon
        </span>

        <motion.span
          className="relative z-10 inline-flex items-center cursor-pointer select-none"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/shared-living")}
        >
          <img src={slLogo} alt="Logo" className="h-6 w-auto object-contain sm:h-8" />
        </motion.span>

        <a className="relative z-10 underline cursor-pointer" onClick={() => navigate("/shared-living")}>
          Wishlist Now
        </a>
      </PanelContent>
    </Panel>
  );
}

export default PromotionSection;
