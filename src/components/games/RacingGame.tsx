import React, { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import './GameMode.css';

/**
 * Racing Game Mode
 * Two cars race to the finish line based on button clicking speed
 */
const RacingGame: React.FC = () => {
  const { players } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;

    /**
     * Draw a simple car
     */
    const drawCar = (x: number, y: number, color: string) => {
      // Car body
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 80, 40);

      // Car top
      ctx.fillRect(x + 15, y - 20, 50, 20);

      // Windows
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(x + 20, y - 15, 20, 10);
      ctx.fillRect(x + 45, y - 15, 20, 10);

      // Wheels
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(x + 20, y + 40, 10, 0, Math.PI * 2);
      ctx.arc(x + 60, y + 40, 10, 0, Math.PI * 2);
      ctx.fill();
    };

    /**
     * Draw race track
     */
    const drawTrack = () => {
      // Background
      ctx.fillStyle = '#34495e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Track lanes
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 15]);

      // Lane 1
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.33);
      ctx.lineTo(canvas.width, canvas.height * 0.33);
      ctx.stroke();

      // Lane 2
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.stroke();

      // Lane 3
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.67);
      ctx.lineTo(canvas.width, canvas.height * 0.67);
      ctx.stroke();

      ctx.setLineDash([]);

      // Finish line
      const finishX = canvas.width - 100;
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#fff' : '#000';
        ctx.fillRect(finishX, i * (canvas.height / 10), 20, canvas.height / 10);
      }
    };

    /**
     * Animation loop
     */
    const animate = () => {
      drawTrack();

      const maxX = canvas.width - 180;

      // Player 1 car (top lane)
      const x1 = (players[0].progress / 100) * maxX;
      drawCar(x1, canvas.height * 0.25, '#FF6B6B');

      // Player 2 car (bottom lane)
      const x2 = (players[1].progress / 100) * maxX;
      drawCar(x2, canvas.height * 0.58, '#4ECDC4');

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

export default RacingGame;
