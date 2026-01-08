# Button Clash Game 🎮

2-player competitive button clicking game with 3 visual modes: Gift Boxes, Racing Cars, and Water Wells. Built with Electron + React + TypeScript.

## 🎯 Game Features

### Three Exciting Game Modes

1. **Gift Boxes Mode** 🎁
   - Two gift boxes that grow with each button click
   - Boxes explode with confetti when reaching maximum size
   - First to explode wins!

2. **Racing Cars Mode** 🏎️
   - Two cars racing on a track
   - Click speed determines car velocity
   - First to cross the finish line wins!

3. **Water Wells Mode** 💧
   - Two wells filling with water
   - Water level rises with clicks
   - Water slowly drops when not clicking
   - First to fill the well to the top wins!

### Features from Original Game

- **Main Menu** - Navigate between game, settings, rules, and customization
- **Settings** - Configure resolution, audio, difficulty, and game mode
- **Customization** - Change textures for game elements (backgrounds, objects, etc.)
- **Rules Screen** - Learn how to play before starting
- **Countdown** - 3-2-1 countdown before game starts
- **Game Over Screen** - Shows winner and allows replay/menu return
- **Statistics** - Track wins and game history
- **Audio System** - Background music and sound effects
- **Asset Management** - Support for images, GIFs, and videos as textures

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/sven9073-byte/button-clash-game.git
cd button-clash-game

# Install dependencies
npm install
```

## 🎮 Running the Game

### Development Mode (Browser)

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Electron Development Mode (Desktop)

```bash
npm run electron:dev
```

Runs as a desktop application with hot reload.

### Build for Production

```bash
# Build the app
npm run build

# Create desktop executable
npm run electron:build
```

The executable will be in the `release` directory:
- Windows: `release/Button Clash Setup.exe`
- The installer allows custom installation directory

## 🎯 How to Play

1. **Start Game** - Click "Play" from the main menu
2. **Choose Mode** - Select your preferred visualization in Settings
3. **Ready** - Both players position hands over their buttons (Q for Player 1, P for Player 2)
4. **Click!** - When countdown ends, click as fast as possible
5. **Win** - First to complete the objective wins!

### Controls

- **Player 1**: Press `Q` key repeatedly
- **Player 2**: Press `P` key repeatedly
- **ESC**: Return to menu (during game)

## 📁 Project Structure

```
button-clash-game/
├── electron/               # Electron main process
│   ├── main.ts            # Electron entry point
│   └── preload.ts         # Preload script
├── src/
│   ├── components/
│   │   ├── games/         # Game mode implementations
│   │   │   ├── GiftsGame.tsx
│   │   │   ├── RacingGame.tsx
│   │   │   └── WellsGame.tsx
│   │   └── scenes/        # Game scenes
│   │       ├── MainMenu.tsx
│   │       ├── Game.tsx
│   │       ├── GameOver.tsx
│   │       ├── Settings.tsx
│   │       ├── Customization.tsx
│   │       ├── Rules.tsx
│   │       └── Countdown.tsx
│   ├── services/          # Service layer
│   │   ├── AudioService.ts
│   │   ├── AssetService.ts
│   │   └── StorageService.ts
│   ├── store/             # State management (Zustand)
│   │   └── gameStore.ts
│   ├── types/             # TypeScript definitions
│   ├── App.tsx            # Main React component
│   └── main.tsx           # React entry point
├── public/                # Static assets
├── package.json
└── README.md
```

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Desktop**: Electron 28
- **State Management**: Zustand
- **Build Tool**: Vite
- **Styling**: CSS3 with animations

## 🎨 Customization

The game supports custom textures for all visual elements:

1. Go to **Customization** from main menu
2. Click on any element (background, objects, etc.)
3. Upload your image/GIF/video
4. Changes save automatically

Supported formats:
- Images: JPG, PNG, GIF
- Videos: MP4, WEBM

## ⚙️ Settings

- **Resolution**: 800x600, 1024x768, 1280x720, 1920x1080
- **Audio**: Master volume, music, sound effects
- **Difficulty**: Affects win condition thresholds
- **Game Mode**: Choose between Gifts, Racing, or Wells

## 🏗️ Building Executable

The game uses electron-builder to create standalone executables:

```bash
npm run electron:build
```

### Build Configuration

- **Windows**: Creates NSIS installer
- **Customizable**: User can choose install location
- **Icon**: Custom app icon (public/icon.ico)
- **Name**: "Button Clash"

## 📝 Development Notes

### Code Structure

- Each file is kept under 300 lines
- Modular architecture for easy maintenance
- Comments explain major functions
- Clean separation of concerns

### Adding New Game Modes

1. Create new component in `src/components/games/`
2. Implement game logic with score updates
3. Add mode to `GameMode` type in `src/types/index.ts`
4. Update Settings scene to include new mode
5. Import and use in `Game.tsx`

## 🐛 Troubleshooting

### App won't start

- Ensure Node.js v18+ is installed
- Delete `node_modules` and run `npm install` again
- Check console for error messages

### Electron build fails

- Ensure all dependencies are installed
- Check `public/icon.ico` exists
- Try clearing cache: `npm run clean` (if script exists)

### Performance issues

- Close other heavy applications
- Lower resolution in Settings
- Disable video backgrounds in Customization

## 📜 License

This project is available for personal and educational use.

## 🤝 Contributing

This is a personal project, but suggestions and bug reports are welcome!

## 👨‍💻 Author

Created by sven9073-byte

## 🎉 Acknowledgments

- Inspired by classic competitive button-mashing games
- Built as a desktop alternative to web-based gaming
- Special thanks to the Electron and React communities
