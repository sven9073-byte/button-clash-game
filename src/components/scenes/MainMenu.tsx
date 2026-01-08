import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Main Menu Scene
 * Entry point with navigation to other scenes
 */
const MainMenu: React.FC = () => {
  const { setGameState, loadSettings, loadStats } = useGameStore();
  const audioService = AudioService.getInstance();

  useEffect(() => {
    // Load saved data on mount
    loadSettings();
    loadStats();
    audioService.preloadDefaultSounds();
  }, []);

  /**
   * Start new game
   */
  const handleStartGame = () => {
    audioService.playSound('click');
    setGameState(GameState.COUNTDOWN);
  };

  /**
   * Navigate to settings
   */
  const handleSettings = () => {
    audioService.playSound('click');
    setGameState(GameState.SETTINGS);
  };

  /**
   * Navigate to customization
   */
  const handleCustomization = () => {
    audioService.playSound('click');
    setGameState(GameState.CUSTOMIZATION);
  };

  /**
   * Navigate to rules
   */
  const handleRules = () => {
    audioService.playSound('click');
    setGameState(GameState.RULES);
  };

  return (
    <div className="scene main-menu">
      <div className="menu-container">
        <h1 className="game-title">BUTTON CLASH</h1>
        <p className="game-subtitle">The Ultimate 2-Player Clicking Battle</p>

        <div className="menu-buttons">
          <button className="menu-button primary" onClick={handleStartGame}>
            ▶ START GAME
          </button>
          <button className="menu-button" onClick={handleSettings}>
            ⚙ SETTINGS
          </button>
          <button className="menu-button" onClick={handleCustomization}>
            🎨 CUSTOMIZATION
          </button>
          <button className="menu-button" onClick={handleRules}>
            📋 RULES
          </button>
        </div>

        <div className="version-info">v1.0.0</div>
      </div>
    </div>
  );
};

export default MainMenu;
