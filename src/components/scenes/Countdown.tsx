import React, { useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { GameState } from '../../types';
import AudioService from '../../services/AudioService';
import './Scenes.css';

/**
 * Countdown Scene
 * Shows 3-2-1-GO before game starts
 */
const Countdown: React.FC = () => {
  const { setGameState, resetPlayers } = useGameStore();
  const [count, setCount] = useState(3);
  const audioService = AudioService.getInstance();

  useEffect(() => {
    // Reset players before starting
    resetPlayers();

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          // Start game after "GO!"
          setTimeout(() => {
            setGameState(GameState.PLAYING);
          }, 1000);
          return 0;
        }
        audioService.playSound('countdown');
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scene countdown">
      <div className="countdown-container">
        {count > 0 ? (
          <h1 className="countdown-number">{count}</h1>
        ) : (
          <h1 className="countdown-go">GO!</h1>
        )}
      </div>
    </div>
  );
};

export default Countdown;
