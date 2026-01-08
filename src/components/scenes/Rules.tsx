import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Rules Scene
 * Explains game rules and controls
 */
const Rules: React.FC = () => {
  const { setGameState } = useGameStore();
  const audioService = AudioService.getInstance();

  /**
   * Back to main menu
   */
  const handleBack = () => {
    audioService.playSound('click');
    setGameState(GameState.MENU);
  };

  return (
    <div className="scene rules">
      <div className="rules-container">
        <h2 className="scene-title">HOW TO PLAY</h2>

        <div className="rules-content">
          <div className="rule-section">
            <h3>🎯 Objective</h3>
            <p>
              Two players compete by clicking their buttons as fast as possible.
              The first player to reach the target score wins!
            </p>
          </div>

          <div className="rule-section">
            <h3>🎮 Controls</h3>
            <div className="controls-grid">
              <div className="control-item">
                <strong>Player 1:</strong>
                <p>Press 'A' key or click left button</p>
              </div>
              <div className="control-item">
                <strong>Player 2:</strong>
                <p>Press 'L' key or click right button</p>
              </div>
            </div>
          </div>

          <div className="rule-section">
            <h3>🎨 Game Modes</h3>
            <ul className="modes-list">
              <li>
                <strong>🎁 Gift Boxes:</strong> Watch gift boxes grow with each
                click. When they reach maximum size, they explode!
              </li>
              <li>
                <strong>🏎️ Racing Cars:</strong> Race your car to the finish line.
                Faster clicking = faster driving!
              </li>
              <li>
                <strong>💧 Water Wells:</strong> Fill your well with water. Watch
                out - water slowly drains when you stop clicking!
              </li>
            </ul>
          </div>

          <div className="rule-section">
            <h3>💡 Tips</h3>
            <ul>
              <li>Find a comfortable clicking rhythm</li>
              <li>In Wells mode, consistent clicking is better than burst clicking</li>
              <li>Customize textures to make the game your own!</li>
            </ul>
          </div>
        </div>

        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
      </div>
    </div>
  );
};

export default Rules;
