# 💕 For Madam Ji

An interactive mini-site created with love for Children's Day 2025.

## 🎯 Features

- **Welcome Slide** - Personalized greeting
- **Tic-Tac-Toe Game** - Interactive game with winning message
- **Sweet Message** - Heartfelt words
- **Gift Sequence** - Sequential gift reveals
- **Music Player** - Play your favorite song
- **Thank You Card** - Special Children's Day celebration with confetti

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
npm run deploy
```

## 🔧 Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations
- **Canvas Confetti** - Celebration effects
- **Firebase Hosting** - Deployment

## 🌐 Deployment

This project is configured for automatic deployment via GitHub Actions.

**Every push to `main` branch automatically deploys to Firebase Hosting!**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Quick Setup:

1. **Firebase Console**
   - Create project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firebase Hosting

2. **GitHub Secrets**
   - Add `FIREBASE_SERVICE_ACCOUNT` (JSON key)
   - Add `FIREBASE_PROJECT_ID` (your project ID)

3. **Push to GitHub**
   ```bash
   git push origin main
   ```

4. **Done!** Your site is live at `https://YOUR-PROJECT-ID.web.app`

## 📱 Features

- ✨ Smooth animations with Framer Motion
- 🎮 Interactive Tic-Tac-Toe game
- 🎁 Sequential gift reveals
- 🎵 Audio player support
- 🎊 Confetti celebrations
- ⌨️ Keyboard navigation (Arrow keys)
- 📱 Mobile-friendly design
- ♿ Accessibility support

## 🎨 Customization

Edit `src/data/slides.js` to customize content for each slide.

## 📄 License

Made with 💕 for Madam Ji
