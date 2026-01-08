/**
 * Game mode types
 */
export type GameMode = 'gifts' | 'racing' | 'wells';

/**
 * Game state enum
 */
export enum GameState {
  MENU = 'MENU',
  SETTINGS = 'SETTINGS',
  CUSTOMIZATION = 'CUSTOMIZATION',
  RULES = 'RULES',
  COUNTDOWN = 'COUNTDOWN',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}

/**
 * Player data interface
 */
export interface Player {
  id: 1 | 2;
  name: string;
  score: number;
  progress: number; // 0-100%
}

/**
 * Game settings interface
 */
export interface GameSettings {
  mode: GameMode;
  targetScore: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
  customTextures: {
    player1Button?: string;
    player2Button?: string;
    background?: string;
    giftBox?: string;
    car1?: string;
    car2?: string;
    well?: string;
  };
}

/**
 * Game statistics interface
 */
export interface GameStats {
  totalGames: number;
  player1Wins: number;
  player2Wins: number;
  highestScore: number;
  lastPlayed?: string;
}

/**
 * Resolution option
 */
export interface Resolution {
  width: number;
  height: number;
  label: string;
}
