import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState, GameMode } from '../../types';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Settings Scene
 * Configure game options
 */
const Settings: React.FC = () => {
  const { settings, updateSettings, setGameState } = useGameStore();
  const audioService = AudioService.getInstance();

  /**
   * Handle game mode change
   */
  const handleModeChange = (mode: GameMode) => {
    updateSettings({ mode });
    audioService.playSound('click');
  };

  /**
   * Handle target score change
   */
  const handleTargetScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ targetScore: parseInt(e.target.value) || 100 });
  };

  /**
   * Handle volume change
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    updateSettings({ volume });
    audioService.setVolume(volume);
  };

  /**
   * Toggle sound
   */
  const toggleSound = () => {
    const enabled = !settings.soundEnabled;
    updateSettings({ soundEnabled: enabled });
    audioService.setSoundEnabled(enabled);
    audioService.playSound('click');
  };

  /**
   * Toggle music
   */
  const toggleMusic = () => {
    const enabled = !settings.musicEnabled;
    updateSettings({ musicEnabled: enabled });
    audioService.setMusicEnabled(enabled);
  };

  /**
   * Back to main menu
   */
  const handleBack = () => {
    audioService.playSound('click');
    setGameState(GameState.MENU);
  };

  return (
    <div className="scene settings">
      <div className="settings-container">
        <h2 className="scene-title">SETTINGS</h2>

        {/* Game Mode Selection */}
        <div className="setting-group">
          <h3>Game Mode</h3>
          <div className="mode-buttons">
            <button
              className={`mode-button ${settings.mode === 'gifts' ? 'active' : ''}`}
              onClick={() => handleModeChange('gifts')}
            >
              🎁 Gift Boxes
            </button>
            <button
              className={`mode-button ${settings.mode === 'racing' ? 'active' : ''}`}
              onClick={() => handleModeChange('racing')}
            >
              🏎️ Racing Cars
            </button>
            <button
              className={`mode-button ${settings.mode === 'wells' ? 'active' : ''}`}
              onClick={() => handleModeChange('wells')}
            >
              💧 Water Wells
            </button>
          </div>
        </div>

        {/* Target Score */}
        <div className="setting-group">
          <h3>Target Score</h3>
          <input
            type="number"
            min="50"
            max="500"
            step="10"
            value={settings.targetScore}
            onChange={handleTargetScoreChange}
            className="number-input"
          />
        </div>

        {/* Audio Settings */}
        <div className="setting-group">
          <h3>Audio</h3>
          <div className="toggle-row">
            <label>Sound Effects</label>
            <button
              className={`toggle-button ${settings.soundEnabled ? 'active' : ''}`}
              onClick={toggleSound}
            >
              {settings.soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="toggle-row">
            <label>Music</label>
            <button
              className={`toggle-button ${settings.musicEnabled ? 'active' : ''}`}
              onClick={toggleMusic}
            >
              {settings.musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="slider-row">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span>{Math.round(settings.volume * 100)}%</span>
          </div>
        </div>

        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
      </div>
    </div>
  );
};

export default Settings;
