// import { cn } from "@/lib/utils";
// import { useTheme } from "@/components/theme-provider";
// import lightIcon from "@/assets/icons/ajlight.svg";
// import darkIcon from "@/assets/icons/aj.svg";
// import { BrandContextMenu } from "@/components/brand-context-menu";

// function ProfileCover() {
//   const { theme } = useTheme();
//   return (
//     <BrandContextMenu>
//       <div
//         data-header-container
//         id="profile"
//         className={cn(
//           "related aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
//           "flex items-center justify-center text-black dark:text-white",
//           "screen-line-before screen-line-after before:-top-px after:-bottom-px",
//           "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5",
//         )}
//       >
//         {/* <div className="w-35 h-35 rounded-full border-14 border-muted" /> */}

//         <img
//           src={theme === "light" ? darkIcon : lightIcon}
//           alt="icon"
//           className={cn("absolute w-25 -translate-y-0.5 transition-colors ")}
//         />
//       </div>
//     </BrandContextMenu>
//   );
// }

// export default ProfileCover;
import { cn } from "@/lib/utils";
import { BrandContextMenu } from "@/components/brand-context-menu";
import { LEDMatrix } from "./LEDMatrix";
import { useEffect, useState } from "react";
// import { useTheme } from "@/components/theme-provider";
import lightIcon from "@/assets/icons/ajlight.svg";
import darkIcon from "@/assets/icons/aj.svg";
import {  motion } from "framer-motion";

function ProfileCover() {
  // const { theme } = useTheme();
  const ledShapes = [
    "hello",
    "default",
    "heart",
    "clock",
    "shine",
    "indiaGate",
  ];
  const [randomShape, setRandomShape] = useState("hello");
  const changeLedShape = () => {
    setRandomShape((currentShape) => {
      const currentIndex = ledShapes.indexOf(currentShape);
      const nextIndex = (currentIndex + 1) % ledShapes.length;
      return ledShapes[nextIndex];
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeLedShape();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrandContextMenu>
      <div
        data-header-container
        id="profile"
        className={cn(
          "relative aspect-2/1 border-x border-edge screen-line-after select-none sm:aspect-3/1",
          "flex items-center justify-center overflow-hidden",
          "dark:bg-black", // Deep zinc-950 for a clean hardware look
        )}
        onClick={() => {
          changeLedShape();
        }}
      >
        {/* Full Grid Background / Foreground LED Unit */}
        <div className="absolute inset-0 flex items-center justify-center ">
         
            {randomShape === "shine" && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
               
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1,
                }}
                src={lightIcon || darkIcon}
                alt="icon"
                className={cn(
                  "absolute w-20 sm:w-25 -translate-y-0.5 z-10 transition-colors ",
                )}
              />
            )}
       

          <LEDMatrix shape={randomShape} />
        </div>

        {/* Glass Screen Effects */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
        <div className="before:-top-px after:-bottom-px" />
      </div>
    </BrandContextMenu>
  );
}

export default ProfileCover;
