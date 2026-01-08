import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import './GameMode.css';

/**
 * Wells Game Mode
 * Two wells with water level rising/falling based on button clicks
 */
const WellsGame: React.FC = () => {
  const { players, incrementScore } = useGameStore();
  const [waterLevels, setWaterLevels] = useState([0, 0]);
  const decayIntervalRef = useRef<number>();

  useEffect(() => {
    // Update water levels based on progress
    setWaterLevels([players[0].progress, players[1].progress]);
  }, [players]);

  useEffect(() => {
    // Water decay effect - water slowly drops when not clicking
    decayIntervalRef.current = window.setInterval(() => {
      setWaterLevels((prev) => [
        Math.max(0, prev[0] - 0.5),
        Math.max(0, prev[1] - 0.5),
      ]);
    }, 100);

    return () => {
      if (decayIntervalRef.current) {
        clearInterval(decayIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="game-mode">
      <div className="well-container">
        {/* Player 1 Well */}
        <div className="well-wrapper">
          <h3 style={{ color: '#FF6B6B', marginBottom: '10px' }}>Player 1</h3>
          <div className="well">
            <div
              className="water"
              style={{
                height: `${waterLevels[0]}%`,
                background: 'linear-gradient(to top, #FF6B6B 0%, #FF8E8E 100%)',
              }}
            >
              <div className="water-surface" />
            </div>
          </div>
          <div className="progress-text" style={{ color: '#FF6B6B' }}>
            {Math.round(waterLevels[0])}%
          </div>
        </div>

        {/* Player 2 Well */}
        <div className="well-wrapper">
          <h3 style={{ color: '#4ECDC4', marginBottom: '10px' }}>Player 2</h3>
          <div className="well">
            <div
              className="water"
              style={{
                height: `${waterLevels[1]}%`,
                background: 'linear-gradient(to top, #4ECDC4 0%, #6FE4DC 100%)',
              }}
            >
              <div className="water-surface" />
            </div>
          </div>
          <div className="progress-text" style={{ color: '#4ECDC4' }}>
            {Math.round(waterLevels[1])}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellsGame;
