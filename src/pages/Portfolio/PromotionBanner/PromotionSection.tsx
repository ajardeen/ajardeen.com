import { Panel, PanelContent } from "@/components/panel";
import slLogo from "@/assets/apps/icons/SharedLivingLogo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function PromotionSection() {
  const navigate = useNavigate();
  return (
    <Panel id="promotion">
      <PanelContent className="flex  items-center justify-start gap-2 py-4">
        <span className="text-lg  font-medium">
         Building New Project
        </span>
        <motion.span
          className="inline-flex items-center justify-center cursor-pointer select-none mx-1"
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
      </PanelContent>
    </Panel>
  );
}

export default PromotionSection;
