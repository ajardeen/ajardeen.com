import React, { useState, createContext, useContext, type ReactNode } from "react";

interface GameContextType {
  gameStation: boolean;
  setGameStation: React.Dispatch<React.SetStateAction<boolean>>;
}

// 1. Create the Context
const GameContext = createContext<GameContextType | undefined>(undefined);

// 2. The Provider Component (Only passing the state value)
export function GameProvider({ children }: { children: ReactNode }) {
  const [gameStation, setGameStation] = useState(false);

  return (
    <GameContext.Provider value={{ gameStation, setGameStation }}>
      {children}
    </GameContext.Provider>
  );
}

// 3. Custom Hook to consume the state
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
