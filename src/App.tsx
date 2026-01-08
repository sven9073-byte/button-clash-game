import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import MainMenu from './components/scenes/MainMenu';
import Settings from './components/scenes/Settings';
import Rules from './components/scenes/Rules';
import Customization from './components/scenes/Customization';
import Countdown from './components/scenes/Countdown';
import Game from './components/scenes/Game';
import GameOver from './components/scenes/GameOver';
import './App.css';

/**
 * Главный компонент приложения
 * Управляет рендерингом сцен в зависимости от текущего состояния
 */
function App() {
  const { currentScene, settings } = useGameStore();

  // Применение настроек разрешения при монтировании
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--app-width', `${settings.resolution.width}px`);
    root.style.setProperty('--app-height', `${settings.resolution.height}px`);
  }, [settings.resolution]);

  // Рендеринг сцены в зависимости от текущего состояния
  const renderScene = () => {
    switch (currentScene) {
      case 'menu':
        return <MainMenu />;
      case 'settings':
        return <Settings />;
      case 'rules':
        return <Rules />;
      case 'customization':
        return <Customization />;
      case 'countdown':
        return <Countdown />;
      case 'game':
        return <Game />;
      case 'gameOver':
        return <GameOver />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <div className="app-container">
      {renderScene()}
    </div>
  );
}

export default App;
