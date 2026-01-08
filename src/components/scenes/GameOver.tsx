import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Game Over Scene
 * Shows winner and statistics
 */
const GameOver: React.FC = () => {
  const { winner, players, stats, updateStats, setGameState, resetPlayers } =
    useGameStore();
  const audioService = AudioService.getInstance();

  useEffect(() => {
    // Update statistics when game ends
    if (winner) {
      updateStats(winner);
      audioService.playSound('win');
    }
  }, [winner]);

  /**
   * Play again
   */
  const handlePlayAgain = () => {
    audioService.playSound('click');
    resetPlayers();
    setGameState(GameState.COUNTDOWN);
  };

  /**
   * Back to main menu
   */
  const handleMainMenu = () => {
    audioService.playSound('click');
    resetPlayers();
    setGameState(GameState.MENU);
  };

  const winnerPlayer = winner ? players[winner - 1] : null;
  const loserPlayer = winner ? players[winner === 1 ? 1 : 0] : null;

  return (
    <div className="scene game-over">
      <div className="game-over-container">
        {/* Winner Announcement */}
        <div className="winner-section">
          <h1 className="winner-title">
            {winnerPlayer?.name} WINS!
          </h1>
          <div
            className="winner-trophy"
            style={{
              color: winner === 1 ? '#FF6B6B' : '#4ECDC4',
            }}
          >
            🏆
          </div>
        </div>

        {/* Game Stats */}
        <div className="game-stats">
          <div className="stat-row">
            <div className="stat-item" style={{ borderColor: '#FF6B6B' }}>
              <div className="stat-label">Player 1</div>
              <div className="stat-value">{players[0].score}</div>
            </div>
            <div className="stat-divider">VS</div>
            <div className="stat-item" style={{ borderColor: '#4ECDC4' }}>
              <div className="stat-label">Player 2</div>
              <div className="stat-value">{players[1].score}</div>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="overall-stats">
          <h3>Overall Statistics</h3>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">{stats.totalGames}</div>
              <div className="stat-name">Total Games</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.player1Wins}</div>
              <div className="stat-name">P1 Wins</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.player2Wins}</div>
              <div className="stat-name">P2 Wins</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">{stats.highestScore}</div>
              <div className="stat-name">High Score</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="game-over-buttons">
          <button className="menu-button primary" onClick={handlePlayAgain}>
            🔁 PLAY AGAIN
          </button>
          <button className="menu-button" onClick={handleMainMenu}>
            🏠 MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
