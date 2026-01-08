# Button Clash Game - Deployment Guide

## 🚀 Quick Start for Development

### First Time Setup

```bash
# 1. Clone repository
git clone https://github.com/sven9073-byte/button-clash-game.git
cd button-clash-game

# 2. Install dependencies
npm install

# 3. Run in development mode
npm run electron:dev
```

## 💻 Development Workflow

### Running the App

#### Browser Mode (for testing UI quickly)
```bash
npm run dev
```
- Opens at http://localhost:5173
- Hot reload enabled
- Good for rapid UI development
- **Note**: Some Electron features won't work

#### Desktop Mode (full features)
```bash
npm run electron:dev
```
- Runs as desktop application
- All features available
- Hot reload enabled
- This is how the final game will run

### Project Commands

```bash
npm run dev              # Start Vite dev server (browser)
npm run build            # Build React app for production
npm run electron:dev     # Run Electron in development
npm run electron:build   # Build desktop executable
npm run preview          # Preview production build
```

## 🏗️ Building for Production

### Windows Executable

```bash
# 1. Build the React app
npm run build

# 2. Create Windows installer
npm run electron:build
```

**Output Location**: `release/Button Clash Setup.exe`

### Build Configuration

The build is configured in `package.json` under the `build` key:

```json
{
  "build": {
    "appId": "com.buttonclash.game",
    "productName": "Button Clash",
    "directories": {
      "output": "release"
    },
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    }
  }
}
```

### Customizing the Build

#### Change App Name
Edit `package.json`:
```json
"build": {
  "productName": "Your Game Name"
}
```

#### Change Icon
1. Create 256x256 ICO file
2. Save as `public/icon.ico`
3. Rebuild with `npm run electron:build`

#### Build for Different Platforms

Edit `package.json`:
```json
"build": {
  "mac": {
    "target": "dmg",
    "icon": "public/icon.icns"
  },
  "linux": {
    "target": "AppImage",
    "icon": "public/icon.png"
  }
}
```

## 📚 Project Structure Deep Dive

### Core Files

```
button-clash-game/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite build config
└── tsconfig.node.json      # TypeScript config for Node
```

### Electron Files

```
electron/
├── main.ts                 # Main process (creates window)
└── preload.ts              # Preload script (security)
```

**main.ts**: Creates the Electron window and manages app lifecycle  
**preload.ts**: Exposes safe APIs to renderer process

### React Application

```
src/
├── main.tsx                # React entry point
├── App.tsx                 # Main App component
├── App.css                 # Global styles
├── components/             # All React components
├── services/               # Business logic
├── store/                  # State management
└── types/                  # TypeScript types
```

### Game Components

```
src/components/
├── games/                  # Game mode implementations
│   ├── GiftsGame.tsx       # Gift boxes mode
│   ├── RacingGame.tsx      # Racing cars mode
│   ├── WellsGame.tsx       # Water wells mode
│   └── GameMode.css        # Shared game styles
└── scenes/                 # Game screens
    ├── MainMenu.tsx        # Main menu
    ├── Game.tsx            # Main game screen
    ├── GameOver.tsx        # Victory screen
    ├── Settings.tsx        # Settings menu
    ├── Customization.tsx   # Texture customization
    ├── Rules.tsx           # How to play
    ├── Countdown.tsx       # Pre-game countdown
    └── Scenes.css          # Scene styles
```

## ⚙️ Configuration Files Explained

### package.json - Key Sections

```json
{
  "name": "button-clash-game",
  "main": "dist-electron/main.js",  // Electron entry
  "scripts": {
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\""
  },
  "dependencies": {
    "react": "^18.2.0",           // UI framework
    "zustand": "^4.4.7"           // State management
  },
  "devDependencies": {
    "electron": "^28.0.0",        // Desktop framework
    "electron-builder": "^24.9.1", // Build tool
    "vite": "^5.0.8"              // Build tool
  }
}
```

### vite.config.ts - Build Configuration

Controls how the React app is built and bundled.

### tsconfig.json - TypeScript Settings

Configures TypeScript compilation for the React app.

## 🐛 Troubleshooting

### Common Issues

#### 1. "Cannot find module" errors

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. Electron won't start

```bash
# Check if port 5173 is already in use
# Kill the process using that port, or
# Change port in vite.config.ts
```

#### 3. Build fails with icon error

```
Error: icon.ico not found
```

**Solution**: 
- Create `public/icon.ico` (see public/ICON_INSTRUCTIONS.md)
- Or remove icon from package.json temporarily

#### 4. TypeScript errors in IDE

```bash
# Restart TypeScript server
# In VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### 5. Electron window is blank

- Check browser console (Ctrl+Shift+I in Electron)
- Check terminal for errors
- Ensure `npm run build` completed successfully

#### 6. "Permission denied" on Linux/Mac

```bash
# Make the built app executable
chmod +x release/Button\ Clash*.AppImage
```

### Debug Mode

To open DevTools in Electron:

Edit `electron/main.ts` and add:
```typescript
win.webContents.openDevTools();
```

## 📦 Distribution

### Sharing Your Build

1. **GitHub Releases**
   - Go to repository releases
   - Create new release
   - Upload `release/Button Clash Setup.exe`
   - Users download and install

2. **Direct Distribution**
   - Share the `.exe` file directly
   - Users run installer
   - No additional requirements

3. **Auto-Update** (Advanced)
   - Use electron-updater
   - Host releases on GitHub
   - App checks for updates automatically

### Installer Options

The NSIS installer includes:
- Custom installation directory
- Desktop shortcut creation
- Start menu entry
- Uninstaller

## 📝 Modifying the Game

### Adding a New Game Mode

1. **Create Component**
   ```tsx
   // src/components/games/MyNewGame.tsx
   export const MyNewGame = ({ 
     player1Score, 
     player2Score, 
     onWin 
   }) => {
     // Your game logic
   };
   ```

2. **Add Type**
   ```typescript
   // src/types/index.ts
   export type GameMode = 'gifts' | 'racing' | 'wells' | 'mynew';
   ```

3. **Update Game.tsx**
   ```tsx
   import { MyNewGame } from './games/MyNewGame';
   // ...
   {gameMode === 'mynew' && <MyNewGame ... />}
   ```

4. **Add to Settings**
   ```tsx
   // src/components/scenes/Settings.tsx
   <option value="mynew">My New Mode</option>
   ```

### Modifying Existing Modes

Each game mode is self-contained in `src/components/games/`:

- **GiftsGame.tsx**: Modify box growth rate, explosion effect
- **RacingGame.tsx**: Change car speed, track length
- **WellsGame.tsx**: Adjust water rise/fall rate

### Changing Win Conditions

Edit the `MAX_SCORE` constant in each game file:
```typescript
const MAX_SCORE = 100; // Change this value
```

## 🔐 Security Notes

- **preload.ts**: Whitelist only necessary APIs
- **contextIsolation**: Enabled by default (secure)
- **nodeIntegration**: Disabled by default (secure)

Never enable `nodeIntegration` unless absolutely necessary!

## 📊 Performance Tips

1. **Reduce Animation Complexity**
   - Lower frame rates in CSS animations
   - Use `transform` instead of `top/left`

2. **Optimize Assets**
   - Compress images before uploading
   - Use appropriate formats (PNG for graphics, JPG for photos)

3. **Limit Video Usage**
   - Videos as backgrounds can be heavy
   - Consider animated GIFs for better performance

## 🔄 Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all to latest
npm update

# Update specific package
npm install react@latest
```

**⚠️ Warning**: Always test after updating dependencies!

## 💰 Building for Multiple Platforms

### macOS (from Mac)
```json
"build": {
  "mac": {
    "target": "dmg",
    "icon": "public/icon.icns"
  }
}
```

### Linux (from Linux/Mac)
```json
"build": {
  "linux": {
    "target": ["AppImage", "deb"],
    "icon": "public/icon.png"
  }
}
```

**Note**: Cross-platform building is limited. Build on target OS for best results.

## 🔗 Useful Resources

- [Electron Documentation](https://www.electronjs.org/docs/latest/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [electron-builder Documentation](https://www.electron.build/)

## 👥 Getting Help

1. Check this DEPLOYMENT.md
2. Read README.md
3. Check GitHub Issues
4. Review code comments
5. Open a new issue if needed

## ✅ Pre-Release Checklist

- [ ] All game modes work correctly
- [ ] Settings save and load properly
- [ ] Customization persists between sessions
- [ ] Audio plays without errors
- [ ] No console errors
- [ ] Icon displays correctly
- [ ] Installer creates desktop shortcut
- [ ] Game can be uninstalled cleanly
- [ ] Tested on clean Windows installation
- [ ] README is up to date

## 🎉 Success!

If you've made it this far, you should have a fully working desktop game!

Enjoy Button Clash! 🎮
