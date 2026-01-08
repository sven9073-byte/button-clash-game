import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import AudioService from '../../services/AudioService';
import './GameMode.css';

/**
 * Gifts Game Mode
 * Two gift boxes grow with score and explode when reaching target
 */
const GiftsGame: React.FC = () => {
  const { players, settings } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioService = AudioService.getInstance();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200; // Space for UI

    /**
     * Draw gift box
     */
    const drawGift = (
      x: number,
      y: number,
      size: number,
      color: string,
      progress: number
    ) => {
      // Box body
      ctx.fillStyle = color;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);

      // Ribbon vertical
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x - size / 10, y - size / 2, size / 5, size);

      // Ribbon horizontal
      ctx.fillRect(x - size / 2, y - size / 10, size, size / 5);

      // Bow
      ctx.beginPath();
      ctx.arc(x - size / 4, y - size / 2, size / 8, 0, Math.PI * 2);
      ctx.arc(x + size / 4, y - size / 2, size / 8, 0, Math.PI * 2);
      ctx.fill();

      // Progress indicator (glow effect)
      if (progress > 50) {
        ctx.shadowBlur = (progress - 50) / 2;
        ctx.shadowColor = color;
      }

      // Explosion effect when at 100%
      if (progress >= 100) {
        const particles = 20;
        for (let i = 0; i < particles; i++) {
          const angle = (Math.PI * 2 * i) / particles;
          const dist = size * 0.8;
          const px = x + Math.cos(angle) * dist;
          const py = y + Math.sin(angle) * dist;

          ctx.beginPath();
          ctx.arc(px, py, size / 20, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
    };

    /**
     * Animation loop
     */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseSize = 80;
      const maxSize = 250;

      // Player 1 gift (left side)
      const size1 = baseSize + (players[0].progress / 100) * (maxSize - baseSize);
      drawGift(
        canvas.width * 0.25,
        canvas.height / 2,
        size1,
        '#FF6B6B',
        players[0].progress
      );

      // Player 2 gift (right side)
      const size2 = baseSize + (players[1].progress / 100) * (maxSize - baseSize);
      drawGift(
        canvas.width * 0.75,
        canvas.height / 2,
        size2,
        '#4ECDC4',
        players[1].progress
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [players]);

  return (
    <div className="game-mode">
      <canvas ref={canvasRef} className="game-canvas" />
    </div>
  );
};

export default GiftsGame;
