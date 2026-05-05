import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FlippingAvatarProps {
  primaryImg: string;
  secondaryImg: string;
  handleFlipParent: () => void;
  className?: string;
}

export function FlippingAvatar({
  primaryImg,
  secondaryImg,
  handleFlipParent,
  className,
}: FlippingAvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle Flip Logic
  const handleFlip = () => {
    if (!isLoaded || hasError) return;
    setIsFlipped((prev) => !prev);
    handleFlipParent();
  };

  // 5-Second Reset Logic
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
        handleFlipParent();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <motion.div
     whileTap={{scale:0.9}}
      className={cn("perspective-1000 cursor-pointer relative", className)}
      onClick={handleFlip}
    >
      <motion.div
        className={cn(
          "relative w-full h-full",
          !isLoaded || hasError ? "opacity-0" : "opacity-100",
        )}
        initial={false}
       
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <img
            src={primaryImg}
            alt="profile"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="size-full rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none shadow-xl object-cover"
          />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {secondaryImg === "" ? (
            <Skeleton className="absolute inset-0 z-20 rounded-full w-full h-full" />
          ) : (
            <img
              src={secondaryImg}
              alt="profile-alt"
              className="size-full rounded-full ring-1 ring-brand ring-offset-2 ring-offset-background select-none shadow-xl object-cover"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
