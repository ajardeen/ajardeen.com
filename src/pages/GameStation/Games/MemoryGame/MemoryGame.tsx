import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useSound as useSoundCN } from "@/hooks/use-sound";

import { click8bitSound } from "@/lib/click-8bit";
import { confirmation001Sound } from "@/lib/confirmation-001";

type CardItem = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isWrong?: boolean;
};

type MemoryGameProps = {
  onExit: () => void;
  assets?: Record<string, any>;
};

function MemoryGame({ onExit, assets }: MemoryGameProps) {
  
 const [playClick8bit] = useSoundCN(click8bitSound);
 const [playConfirmSound] = useSoundCN(confirmation001Sound);
  const cardBack = assets?.cardBackIcon || "❓";
  const originalPairs = assets?.cardPairs || [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍉",
    "🍒",
  ];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  // Timer States
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Best Records States
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  // Load best scores from localStorage on mount
  useEffect(() => {
    const storedTime = localStorage.getItem("memory_game_best_time");
    const storedMoves = localStorage.getItem("memory_game_best_moves");
    if (storedTime) setBestTime(parseInt(storedTime, 10));
    if (storedMoves) setBestMoves(parseInt(storedMoves, 10));
  }, []);

  // Timer Effect Handler
  useEffect(() => {
    if (timerStarted && !won) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerStarted, won]);

  // Format seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Initialize Game Logic Loop
  const initGame = () => {
    const shuffled: CardItem[] = [...originalPairs, ...originalPairs]
      .sort(() => Math.random() - 0.5)
      .map((value, idx) => ({
        id: idx,
        value,
        isFlipped: false,
        isMatched: false,
        isWrong: false,
      }));

    // Reset core states
    setCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
    setWon(false);

    // Reset timer states
    setTime(0);
    setTimerStarted(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    initGame();
  }, [assets]);

  // Card Touch Selection Execution
  const handleCardClick = (id: number) => {
  
    if (selectedCards.length >= 2 || cards[id].isFlipped || cards[id].isMatched)
      return;
  playClick8bit();
    // Start timer on the absolute first card flip action
    if (!timerStarted) {
      setTimerStarted(true);
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newSelected;

      if (cards[firstId].value === cards[secondId].value) {
        // Core Match Found Sequence
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setSelectedCards([]);
            playConfirmSound();
        if (newCards.every((card) => card.isMatched)) {
          setWon(true);
          handleGameOver(moves + 1, time);
        }
      } else {
        // Flag visual wrong state immediately
        newCards[firstId].isWrong = true;
        newCards[secondId].isWrong = true;
        setCards(newCards);

        // Reset Unmatched Cards Flip State on Mis-match delay
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          resetCards[firstId].isWrong = false;
          resetCards[secondId].isWrong = false;
          setCards(resetCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  // Evaluate and save historical record metrics
  const handleGameOver = (finalMoves: number, finalTime: number) => {
    // Check Best Time (lower is better)
    if (bestTime === null || finalTime < bestTime) {
      localStorage.setItem("memory_game_best_time", finalTime.toString());
      setBestTime(finalTime);
    }
    // Check Best Moves (lower is better)
    if (bestMoves === null || finalMoves < bestMoves) {
      localStorage.setItem("memory_game_best_moves", finalMoves.toString());
      setBestMoves(finalMoves);
    }
  };

  return (
    <div className="h-full flex flex-col  md:flex-row p-4 z-40 animate-fade-in gap-4 overflow-hidden">
      {/* Dynamic Scoreboard Panel: Top on Mobile, Right Side on desktop views */}
      <div className=" md:w-56 md:flex md:flex-col  md:justify-start  md:items-stretch order-1 md:order-2 bg-muted border border-slate-700/50 p-3 rounded-2xl shrink-0">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] text-primary/50 font-bold uppercase tracking-wider block min-w-full">
            Status Dashboard
          </div>
          <div>
            <div className="flex flex-row md:flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="text-sm font-mono text-accent font-bold bg-primary px-3 py-1.5 rounded-lg flex justify-between items-center gap-4">
                  <span>Timer:</span>
                  <span>{formatTime(time)}</span>
                </div>

                <div className="text-sm font-mono text-accent font-bold bg-primary px-3 py-1.5 rounded-lg flex justify-between items-center gap-4">
                  <span>Moves:</span>
                  <span>{moves}</span>
                </div>

                <hr className="border-slate-700/50 my-1 hidden md:block" />

                {/* Record High-Scores */}
                <div className="hidden md:flex flex-col gap-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Best Time:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {bestTime !== null ? formatTime(bestTime) : "--:--"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Moves:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {bestMoves !== null ? bestMoves : "-"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-col md:mt-auto w-full justify-end md:justify-start">
                <Button
                  onClick={initGame}
                  className="transition active:scale-95 "
                >
                  Reset
                </Button>
                <Button
                  onClick={onExit}
                  variant={"destructive"}
                  className="w-full"
                >
                  ✕ Exit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Frame Workspace Layout */}
      <div className="flex-1  flex items-center justify-center order-2 md:order-1">
        {won ? (
          <div className="w-full max-w-sm flex flex-col items-center justify-center text-center p-6 bg-slate-800/50 border border-slate-700/40 rounded-3xl backdrop-blur-sm">
            <div className="text-5xl mb-2 animate-bounce">🏆</div>
            <h2 className="text-xl font-bold text-emerald-400">
              You Cleared It!
            </h2>
            <div className="text-xs text-slate-400 mt-2 mb-6 space-y-1">
              <p>Completed in {moves} matching moves.</p>
              <p>Total Time taken: {formatTime(time)}</p>
            </div>
            <Button variant="outline" onClick={initGame}>
              Play Another Round
            </Button>
          </div>
        ) : (
          /* Locked Card Grid Configuration containing Zero Image Padding bounds */
          <div className="grid grid-cols-4 gap-3 justify-center p-0 ">
            {cards.map((card) => {
              // Establish dynamic conditional highlighting borders
              let glowStyle = "";
              if (card.isWrong)
                glowStyle =
                  "border-red-500 ring-2 ring-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.7)] z-10";
              else if (card.isMatched)
                glowStyle =
                  "border-white ring-2 ring-white shadow-[0_0_12px_rgba(16,185,129,0.6)] opacity-20";
              else if (card.isFlipped) glowStyle = "border-muted-foreground";

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="w-16 h-18 [perspective:1000px] cursor-pointer select-none"
                >
                  {/* Inner 3D Rotator Box */}
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] rounded-sm border ${glowStyle} ${
                      card.isFlipped || card.isMatched
                        ? "[transform:rotateY(180deg)]"
                        : ""
                    }`}
                  >
                    {/* FRONT FACE PANEL (Icon/Image side - displayed when card.isFlipped is true) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-black rounded-sm flex items-center justify-center text-2xl [transform:rotateY(180deg)] overflow-hidden p-0">
                      {card.value.startsWith("data:") ||
                      card.value.startsWith("http") ||
                      card.value.endsWith(".svg") ? (
                        <img
                          src={card.value}
                          alt="icon"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{card.value}</span>
                      )}
                    </div>

                    {/* BACK FACE PANEL (Default masked question mark state) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-sm flex items-center justify-center overflow-hidden p-0">
                      {cardBack.startsWith("data:") ||
                      cardBack.startsWith("http") ||
                      cardBack.endsWith(".svg") ? (
                        <img
                          src={cardBack}
                          alt="cardback"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl text-white/90 drop-shadow">
                          {cardBack}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MemoryGame;
