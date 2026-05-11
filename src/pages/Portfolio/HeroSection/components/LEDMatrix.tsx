
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// 3x5 Pixel Font for Numbers and Colon
const DIGITS: Record<string, number[][]> = {
  "0": [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  "1": [[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0]],
  "2": [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  "3": [[1,1,1],[0,0,1],[1,1,1],[0,0,1],[1,1,1]],
  "4": [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  "5": [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  "6": [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  "7": [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
  "8": [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  "9": [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]],
  ":": [[0,0,0],[0,1,0],[0,0,0],[0,1,0],[0,0,0]],
};

const SHAPE_MAP: Record<string, number[][]> = {
  default: [ // Smile
    [0, 0, 1, 1,  1, 1, 1, 0,0, 0],
    [0, 1, 1, 1,  1, 1, 1, 1,0, 0],
    [1, 1, 0, 1,  1, 1, 1, 1,1, 0],
    [1, 1, 0, 1,  1, 0, 0, 1,1, 0],
    [1, 1, 1, 1,  1, 1, 1, 1,1, 0],
    [1, 1, 1, 1,  1, 1, 0, 1,1, 0],
    [1, 1, 0, 0,  0, 0, 1, 1,1, 0],
    [0, 1, 1, 1,  1, 1, 1, 1,0, 0],
    [0, 0, 1, 1,  1, 1, 1, 0,0, 0],
  ],
  cry: [
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  aj: [ // "AJ" Initials
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  ],
  shooting: [ // A techy charging/shooting bar
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  heart: [
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
  battery: [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
};


export function LEDMatrix({ shape = "default" }: { shape?: string }) {
  const isMobile = window.innerWidth <= 768;
  const [time, setTime] = useState("");
  const rows = isMobile ? 14:15;
  const cols = isMobile ? 40: 50; // Increased cols to accommodate HH:mm:ss comfortably

  useEffect(() => {
    if (shape !== "watchtime") return;
    
    const update = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [shape]);

  // Generate Matrix for Clock (HH:mm:ss)
  const getClockMatrix = () => {
    const matrix = Array(5).fill(0).map(() => [] as number[]);
    time.split("").forEach((char) => {
      const digit = DIGITS[char] || DIGITS[":"];
      for (let r = 0; r < 5; r++) {
        // Add digit plus a small 1px gap between characters
        matrix[r].push(...digit[r], 0);
      }
    });
    return matrix;
  };

  const activeMatrix = shape === "watchtime" ? getClockMatrix() : (SHAPE_MAP[shape] || SHAPE_MAP.default);
  const mRows = activeMatrix.length;
  const mCols = activeMatrix[0] ? activeMatrix[0].length : 0;

  return (
    <div className="w-full flex justify-center items-center overflow-hidden p-2">
      <div
        className="grid gap-1 sm:gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: "max-content" 
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;

          const sRow = r - Math.floor((rows - mRows) / 2);
          const sCol = c - Math.floor((cols - mCols) / 2);

          const isOn = activeMatrix[sRow] && activeMatrix[sRow][sCol] === 1;

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor: isOn ? "var(--primary)" : "var(--secondary)",
                opacity: isOn ? 1 : 0.3,
                boxShadow: isOn 
                  ? "0px 0px 8px 2px rgba(255, 255, 255, 0.3)" 
                  : "none",
                scale: isOn ? 1.05 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut",delay: 0.1}}
              className="size-1.5 sm:size-2 rounded-[0.5px] shrink-0"
            />
          );
        })}
      </div>
    </div>
  );
}