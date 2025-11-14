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
- **Vite 7** - Build tool & HMR
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion 12** - Smooth animations
- **Canvas Confetti** - Celebration effects
- **Firebase Hosting** - Production deployment
- **GitHub Actions** - CI/CD automation

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

- ✨ Crisp animations with optimized performance (0.2s transitions)
- 🎮 Interactive Tic-Tac-Toe game with animated winning line
- 🎁 Sequential gift reveals with floating animations
- 🎵 Audio player with controls
- 🎊 Confetti celebrations on special moments
- 💝 Children's Day special modal (Nov 14)
- ⌨️ Keyboard navigation (Arrow keys)
- 📱 Fully responsive & mobile-optimized
- ⚡ Memory-optimized with proper cleanup
- 🎨 Love-themed romantic fonts (Caveat, Pacifico, Dancing Script)
- ♿ Accessibility support

## 🎨 Customization

Edit `src/data/slides.js` to customize content for each slide.

## 📄 License

Made with 💕 for Madam Ji
