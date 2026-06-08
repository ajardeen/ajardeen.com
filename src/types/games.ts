export type GameItem = {
  id: string; // Added ID to track installations cleanly
  title: string;
  description: string;
  icon: string;
  backgroundImage?: string;
  // Using Record<string, any> handles varying asset payloads across games
  assets?: Record<string, any>;
};

export type Games = GameItem[];

export type GameStation = {
  title: string;
  description: string;
  icon: string;
  backgroundImage?: string;
  games: Games;
};