import { useState } from "react";
import { motion } from "framer-motion";
import coin from "@/assets/icons/aj-coin.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function GameCoin() {
  // We use a count/key state to force the animation to re-trigger on every click
  const [animateCount, setAnimateCount] = useState(0);
  const navigate = useNavigate();
  const triggerAnimation = () => {
    setAnimateCount((prev) => prev + 1);
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/game-station");
          triggerAnimation();
        }}
      >
        <span className="inline-flex items-center justify-center">
          <motion.img
            key={animateCount} // Forcing remount/reset of animation sequence
            src={coin}
            alt="coin"
            className="w-5 h-5 rounded-full border-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] object-cover"
            animate={{
              // 720 degrees = 2 full flips.
              // Scale up halfway through, then scale back down to 1.
              rotateY: [0, 360, 720],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </span>
      </Button>
    </div>
  );
}

export default GameCoin;
