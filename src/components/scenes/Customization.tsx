import React, { useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import AssetService from '../../services/AssetService';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Customization Scene
 * Upload custom textures for game elements
 */
const Customization: React.FC = () => {
  const { settings, updateSettings, setGameState } = useGameStore();
  const assetService = AssetService.getInstance();
  const audioService = AudioService.getInstance();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  /**
   * Handle file upload
   */
  const handleFileUpload = async (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const dataUrl = await assetService.loadCustomTexture(key, file);
      updateSettings({
        customTextures: {
          ...settings.customTextures,
          [key]: dataUrl,
        },
      });
      audioService.playSound('click');
    } catch (error) {
      console.error('Failed to upload texture:', error);
      alert('Failed to upload image');
    }
  };

  /**
   * Remove custom texture
   */
  const handleRemoveTexture = (key: string) => {
    assetService.removeTexture(key);
    const newTextures = { ...settings.customTextures };
    delete newTextures[key as keyof typeof newTextures];
    updateSettings({ customTextures: newTextures });
    audioService.playSound('click');

    // Reset file input
    if (fileInputRefs.current[key]) {
      fileInputRefs.current[key]!.value = '';
    }
  };

  /**
   * Reset all customizations
   */
  const handleResetAll = () => {
    if (confirm('Reset all custom textures?')) {
      assetService.clearAll();
      updateSettings({ customTextures: {} });
      audioService.playSound('click');

      // Reset all file inputs
      Object.values(fileInputRefs.current).forEach((input) => {
        if (input) input.value = '';
      });
    }
  };

  /**
   * Back to main menu
   */
  const handleBack = () => {
    audioService.playSound('click');
    setGameState(GameState.MENU);
  };

  /**
   * Render texture uploader
   */
  const renderUploader = (key: string, label: string) => {
    const hasTexture = settings.customTextures[key as keyof typeof settings.customTextures];

    return (
      <div className="texture-uploader">
        <label>{label}</label>
        <div className="uploader-controls">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(key, e)}
            ref={(el) => (fileInputRefs.current[key] = el)}
            className="file-input"
          />
          {hasTexture && (
            <button
              className="remove-button"
              onClick={() => handleRemoveTexture(key)}
            >
              ✖ Remove
            </button>
          )}
        </div>
        {hasTexture && (
          <div className="texture-preview">
            <img
              src={hasTexture}
              alt={label}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="scene customization">
      <div className="customization-container">
        <h2 className="scene-title">CUSTOMIZATION</h2>

        <div className="customization-content">
          <p className="info-text">
            Upload your own images to customize the game appearance.
            Supported formats: JPG, PNG, GIF (max 5MB)
          </p>

          <div className="texture-grid">
            {renderUploader('background', 'Background')}
            {renderUploader('player1Button', 'Player 1 Button')}
            {renderUploader('player2Button', 'Player 2 Button')}
            {renderUploader('giftBox', 'Gift Box')}
            {renderUploader('car1', 'Car 1')}
            {renderUploader('car2', 'Car 2')}
            {renderUploader('well', 'Well')}
          </div>

          <button className="reset-all-button" onClick={handleResetAll}>
            🗑️ RESET ALL
          </button>
        </div>

        <button className="back-button" onClick={handleBack}>
          ← BACK
        </button>
      </div>
    </div>
  );
};

export default Customization;
