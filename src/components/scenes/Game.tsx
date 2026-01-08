import React, { useEffect, useCallback } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import GiftsGame from '../games/GiftsGame';
import RacingGame from '../games/RacingGame';
import WellsGame from '../games/WellsGame';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Main Game Scene
 * Handles gameplay, controls, and renders selected game mode
 */
const Game: React.FC = () => {
  const { players, settings, incrementScore, setGameState } = useGameStore();
  const audioService = AudioService.getInstance();

  /**
   * Handle player button press
   */
  const handlePlayerClick = useCallback(
    (playerId: 1 | 2) => {
      incrementScore(playerId);
      audioService.playSound('click');
    },
    [incrementScore]
  );

  /**
   * Keyboard controls
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Player 1: 'A' key
      if (e.key === 'a' || e.key === 'A') {
        handlePlayerClick(1);
      }
      // Player 2: 'L' key
      else if (e.key === 'l' || e.key === 'L') {
        handlePlayerClick(2);
      }
      // ESC: Pause/Exit
      else if (e.key === 'Escape') {
        if (confirm('Exit to main menu?')) {
          setGameState(GameState.MENU);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePlayerClick, setGameState]);

  /**
   * Render appropriate game mode
   */
  const renderGameMode = () => {
    switch (settings.mode) {
      case 'gifts':
        return <GiftsGame />;
      case 'racing':
        return <RacingGame />;
      case 'wells':
        return <WellsGame />;
      default:
        return <GiftsGame />;
    }
  };

  return (
    <div className="scene game">
      {/* Game Mode Visualization */}
      {renderGameMode()}

      {/* UI Overlay */}
      <div className="game-ui">
        {/* Player 1 Section */}
        <div className="player-section left">
          <div className="player-info" style={{ borderColor: '#FF6B6B' }}>
            <h3 style={{ color: '#FF6B6B' }}>PLAYER 1</h3>
            <div className="score">{players[0].score}</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${players[0].progress}%`,
                  background: '#FF6B6B',
                }}
              />
            </div>
            <button
              className="click-button"
              style={{ background: '#FF6B6B' }}
              onClick={() => handlePlayerClick(1)}
            >
              CLICK!
              <br />
              <small>(A)</small>
            </button>
          </div>
        </div>

        {/* Center Info */}
        <div className="center-info">
          <div className="target-score">
            Target: {settings.targetScore}
          </div>
        </div>

        {/* Player 2 Section */}
        <div className="player-section right">
          <div className="player-info" style={{ borderColor: '#4ECDC4' }}>
            <h3 style={{ color: '#4ECDC4' }}>PLAYER 2</h3>
            <div className="score">{players[1].score}</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${players[1].progress}%`,
                  background: '#4ECDC4',
                }}
              />
            </div>
            <button
              className="click-button"
              style={{ background: '#4ECDC4' }}
              onClick={() => handlePlayerClick(2)}
            >
              CLICK!
              <br />
              <small>(L)</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
