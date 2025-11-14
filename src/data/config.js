export const siteConfig = {
  // Recipient information
  recipient: {
    name: 'Madam Ji',
    nicknames: ['Sweetu', 'Bacha'],
  },
  
  // Author information
  author: {
    name: 'Sumit',
  },
  
  // Occasion details
  occasion: {
    name: "Children's Day",
    date: '2025-11-14',
    emoji: '🎈',
  },
  
  // Theme configuration
  theme: {
    colors: {
      primary: '#FF9AB1',      // blush
      secondary: '#FFD29E',    // peach
      accent: '#FF7AB6',       // soft-rose
      background: '#FFF6EE',   // cream
      text: '#6B7280',         // muted-grey
    },
    
    animations: {
      defaultDuration: 400,      // ms
      slideDuration: 5000,       // ms
      heartFloatDuration: 1500,  // ms
      confettiDuration: 3000,    // ms
    },
  },
  
  // Audio configuration
  audio: {
    backgroundMusic: '/assets/audio/song.mp3',
    autoPlay: false,
    loop: true,
    defaultVolume: 0.7,
  },
  
  // Feature flags
  features: {
    enableHeartLayer: true,
    enableKeyboardNav: true,
    enableSwipeGestures: true,
  },
};
