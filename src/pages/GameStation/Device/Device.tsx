import React, { useState, useEffect } from "react";
import { GAMESSTATION, GAMES } from "@/data/games";
import MemoryGame from "../Games/MemoryGame/MemoryGame";
import { MoveLeft, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveAppType = "home" | "gamestation" | "memory-game";

function Device() {
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<ActiveAppType>("home");

  // Load baseline installations on mount
  useEffect(() => {
    const saved = localStorage.getItem("installed_games");
    if (saved) {
      setInstalledApps(JSON.parse(saved));
    }
  }, []);

  const handleInstall = (gameId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (installedApps.includes(gameId)) return;
    const updated = [...installedApps, gameId];
    setInstalledApps(updated);
    localStorage.setItem("installed_games", JSON.stringify(updated));
  };

  const handleUninstall = (gameId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = installedApps.filter((id) => id !== gameId);
    setInstalledApps(updated);
    localStorage.setItem("installed_games", JSON.stringify(updated));
  };

  const handleShare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out ${title} inside Game Station!`,
      });
    } else {
      alert(`Shared link for ${title} copied to clipboard!`);
    }
  };

  return (
    <div className="flex">
      {/* Screen View Area */}
      <div
        className={`overflow-y-hidden overflow-x-hidden ${GAMESSTATION.backgroundImage} `}
      >
        {/* HOME SCREEN VIEW */}
        {activeApp === "home" && (
          <div className="p-6">
            <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-4">
              Home
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {/* Core System Game Station App */}
              <div
                onClick={() => setActiveApp("gamestation")}
                className="flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-active:scale-95 transition-transform">
                  {GAMESSTATION.icon}
                </div>
                <span className="text-xs text-center mt-2 truncate w-full font-medium drop-shadow-md">
                  Store
                </span>
              </div>

              {/* Installed Application Direct Hooks */}
              {GAMES.map((game) => {
                if (!installedApps.includes(game.id)) return null;
                return appIcon(game, handleUninstall, setActiveApp);
              })}
            </div>
          </div>
        )}

        {/* GAME STATION INTERIOR CATALOG VIEW */}
        {activeApp === "gamestation" && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Button
                onClick={() => setActiveApp("home")}
                className="text-slate-400 hover:text-white text-lg"
                variant="ghost"
              >
                <MoveLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold text-white">
                {GAMESSTATION.title}
              </h2>
            </div>

            <div className="space-y-4">
              {GAMES.map((game) => {
                const isInstalled = installedApps.includes(game.id);
                return (
                  <div
                    key={game.id}
                    onClick={() => setActiveApp(game.id as any)}
                    className="relative w-full rounded-3xl overflow-hidden p-6 flex items-center justify-between group cursor-pointer border border-slate-800/40 shadow-xl transition-all duration-300 "
                  >
                    {/* Full Banner Background Layer using the Game Icon */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={game.icon}
                        alt=""
                        className="w-full h-full object-cover scale-110 blur-md opacity-40 brightness-75 select-none pointer-events-none"
                      />
                      {/* Dark, subtle color overlay matching store banners */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 backdrop-blur-[2px]" />
                    </div>

                    {/* Left Section: Icon and Game Info */}
                    <div className="flex items-center gap-5 z-10 relative">
                      {/* Stylized App Icon Shell with Bottom Cyberpunk Branding Strip */}
                      <div className="relative w-24 h-24 bg-[#1a1c1e] rounded-[22px] overflow-hidden shadow-2xl border border-white/10 flex-shrink-0">
                        <img
                          src={game.icon}
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Details Area */}
                      <div className="flex flex-col text-left">
                        <h3 className="text-2xl font-bold text-white tracking-wide leading-tight drop-shadow">
                          {game.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-400 mt-0.5 opacity-95 drop-shadow-sm">
                          {game.description}
                        </p>

                        {/* Control Actions Container */}
                        <div className="flex items-center gap-3 mt-3">
                          <Button
                            onClick={(e) => handleShare(game.title, e)}
                            variant={"outline"}
                            className="flex items-center gap-1 rounded-2xl bg-black/20 text-white border-white/10 hover:bg-black/40 backdrop-blur-sm h-8 py-0 px-3 text-xs"
                          >
                            <Share className="h-3.5 w-3.5" />
                            Share
                          </Button>

                          <Button
                            onClick={(e) => handleInstall(game.id, e)}
                            disabled={isInstalled}
                            className="flex items-center gap-1 rounded-2xl bg-brand hover:bg-brand text-black font-bold h-8 py-0 px-4 text-xs shadow-md transition-transform active:scale-95"
                            variant={"default"}
                          >
                            {isInstalled ? "✓ Open" : "Install"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Subtle right specular highlights */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/[0.04] to-transparent pointer-events-none z-10" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIVE GAME RENDERER LAYER */}
        {activeApp === "memory-game" && (
          <MemoryGame
            onExit={() => setActiveApp("home")}
            assets={GAMES.find((g) => g.id === "memory-game")?.assets}
          />
        )}
      </div>
    </div>
  );
}

export default Device;

// Fixed Syntax Error here
function appIcon(
  game: (typeof GAMES)[number],
  handleUninstall: (gameId: string, e: React.MouseEvent) => void,
  setActiveApp: React.Dispatch<React.SetStateAction<ActiveAppType>>,
) {
  return (
    <div
      key={game.id}
      onClick={() => setActiveApp(game.id as any)}
      className="flex flex-col items-center cursor-pointer group relative"
    >
      {/* Delete App Badge */}
      <Button
        onClick={(e) => handleUninstall(game.id, e)}
        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 opacity-0 group-hover:opacity-100 text-[10px] font-bold rounded-full flex items-center justify-center border border-slate-900 z-10"
      >
        ✕
      </Button>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden group-active:scale-95 transition-transform border ">
        <img
          src={game.icon}
          alt={game.title}
          className="w-14 h-14 object-contain"
        />
      </div>
      <span className="text-xs text-center mt-2 line-clamp-1 w-full font-medium drop-shadow-md">
        {game.title}
      </span>
    </div>
  );
}
