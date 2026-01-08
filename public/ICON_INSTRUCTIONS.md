# Creating Icon for Button Clash Game

## Requirements

- Icon file: `icon.ico` (Windows)
- Recommended size: 256x256 pixels
- Format: ICO (for Windows)

## Quick Steps

### Option 1: Use Online Converter

1. Create a 256x256 PNG image with your game logo
2. Go to https://convertio.co/png-ico/
3. Upload your PNG
4. Download as `icon.ico`
5. Place in this `public/` directory

### Option 2: Use GIMP (Free)

1. Create/Open your logo image in GIMP
2. Scale to 256x256: Image → Scale Image
3. Export as ICO: File → Export As
4. Name it `icon.ico`
5. Place in this directory

### Option 3: Use ImageMagick (Command Line)

```bash
convert logo.png -resize 256x256 icon.ico
```

## Design Suggestions

- Use bright colors that stand out
- Include game theme elements (gifts, cars, or water drops)
- Keep it simple and recognizable at small sizes
- Ensure good contrast

## Example Icon Concepts

1. **Two Buttons Clashing** - Stylized Q and P keys colliding
2. **Gift Box** - Colorful present with ribbon
3. **Racing Flag** - Checkered flag with speed lines
4. **Water Drop** - Blue drop with ripple effect
5. **VS Symbol** - Bold VS with game elements

## Current Status

⚠️ **ICON NOT INCLUDED** - You need to create and add `icon.ico` to this directory.

Without an icon, the Electron build will use the default icon.

## Testing Your Icon

After adding `icon.ico`:

```bash
npm run electron:build
```

Check the built application to see your icon!
