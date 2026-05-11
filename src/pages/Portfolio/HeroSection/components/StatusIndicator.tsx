"use client";

import { useState, useEffect } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusIndicatorVariants = cva("size-4 sm:size-5 ", {
  variants: {
    variant: {
      default: "bg-primary",
      red: "bg-red-600",
      green: "bg-[#00d492]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Cleaned up the Interface to include your custom props
export interface StatusIndicatorProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof statusIndicatorVariants> {
  isHovered: boolean;
}

function StatusIndicator({
  className,
  isHovered,
  variant: initialVariant,
  ...props
}: StatusIndicatorProps) {
  const [isInitialPhase, setIsInitialPhase] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialPhase(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Define our flicker colors
  const redBright = "#dc2626"; // Tailwind red-600
  const redDark = "#450a0a";    // Tailwind red-950

  // Logic: Animate if we are in the first 5s OR if the parent says we are hovered
  const shouldAnimate = isInitialPhase || isHovered;

  return (
    <motion.div
      animate={
        shouldAnimate
          ? { backgroundColor: [redBright, redDark, redBright] }
          : { backgroundColor: "" } // Hand control back to Tailwind/CVA
      }
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        statusIndicatorVariants({ 
          // Force red variant during animation phases
          variant: shouldAnimate ? "red" : initialVariant 
        }),
        className
      )}
      {...props}
    />
  );
}

export default StatusIndicator;