import { create } from 'zustand';
import { GameState, GameSettings, GameStats, Player } from '../types';

interface GameStore {
  // Current game state
  gameState: GameState;
  setGameState: (state: GameState) => void;

  // Players
  players: [Player, Player];
  incrementScore: (playerId: 1 | 2, amount?: number) => void;
  resetPlayers: () => void;

  // Settings
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
  loadSettings: () => void;
  saveSettings: () => void;

  // Statistics
  stats: GameStats;
  updateStats: (winner: 1 | 2) => void;
  loadStats: () => void;

  // Winner
  winner: 1 | 2 | null;
  setWinner: (playerId: 1 | 2 | null) => void;
}

/**
 * Default game settings
 */
const defaultSettings: GameSettings = {
  mode: 'gifts',
  targetScore: 100,
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  customTextures: {},
};

/**
 * Default game statistics
 */
const defaultStats: GameStats = {
  totalGames: 0,
  player1Wins: 0,
  player2Wins: 0,
  highestScore: 0,
};

/**
 * Create initial players
 */
const createPlayers = (): [Player, Player] => [
  { id: 1, name: 'Player 1', score: 0, progress: 0 },
  { id: 2, name: 'Player 2', score: 0, progress: 0 },
];

/**
 * Main game store using Zustand
 */
export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: GameState.MENU,
  players: createPlayers(),
  settings: defaultSettings,
  stats: defaultStats,
  winner: null,

  /**
   * Set current game state
   */
  setGameState: (state: GameState) => set({ gameState: state }),

  /**
   * Increment player score
   */
  incrementScore: (playerId: 1 | 2, amount: number = 1) => {
    const { players, settings } = get();
    const playerIndex = playerId - 1;
    const newPlayers = [...players] as [Player, Player];
    
    newPlayers[playerIndex] = {
      ...newPlayers[playerIndex],
      score: newPlayers[playerIndex].score + amount,
      progress: Math.min(
        ((newPlayers[playerIndex].score + amount) / settings.targetScore) * 100,
        100
      ),
    };

    set({ players: newPlayers });

    // Check for winner
    if (newPlayers[playerIndex].score >= settings.targetScore) {
      get().setWinner(playerId);
      get().setGameState(GameState.GAME_OVER);
    }
  },

  /**
   * Reset players to initial state
   */
  resetPlayers: () => set({ players: createPlayers(), winner: null }),

  /**
   * Update game settings
   */
  updateSettings: (newSettings: Partial<GameSettings>) => {
    const settings = { ...get().settings, ...newSettings };
    set({ settings });
    get().saveSettings();
  },

  /**
   * Load settings from localStorage
   */
  loadSettings: () => {
    try {
      const saved = localStorage.getItem('gameSettings');
      if (saved) {
        set({ settings: { ...defaultSettings, ...JSON.parse(saved) } });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  },

  /**
   * Save settings to localStorage
   */
  saveSettings: () => {
    try {
      localStorage.setItem('gameSettings', JSON.stringify(get().settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },

  /**
   * Update game statistics
   */
  updateStats: (winner: 1 | 2) => {
    const { stats, players } = get();
    const newStats: GameStats = {
      totalGames: stats.totalGames + 1,
      player1Wins: stats.player1Wins + (winner === 1 ? 1 : 0),
      player2Wins: stats.player2Wins + (winner === 2 ? 1 : 0),
      highestScore: Math.max(
        stats.highestScore,
        players[0].score,
        players[1].score
      ),
      lastPlayed: new Date().toISOString(),
    };

    set({ stats: newStats });
    localStorage.setItem('gameStats', JSON.stringify(newStats));
  },

  /**
   * Load statistics from localStorage
   */
  loadStats: () => {
    try {
      const saved = localStorage.getItem('gameStats');
      if (saved) {
        set({ stats: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  },

  /**
   * Set winner
   */
  setWinner: (playerId: 1 | 2 | null) => set({ winner: playerId }),
}));
