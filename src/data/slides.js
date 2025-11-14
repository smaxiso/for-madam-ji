export const slidesData = [
  // Slide 1: Welcome Screen
  {
    id: 'welcome',
    type: 'welcome',
    order: 1,
    content: {
      heading: 'For My Sweetu',
      subheading: 'Made with love just for you 💕',
    },
    background: {
      type: 'gradient',
      from: '#FFF6EE',
      to: '#FFD29E',
    },
  },
  
  // Slide 2: Tic-Tac-Toe Game
  {
    id: 'tictactoe',
    type: 'interactive-game',
    order: 2,
    content: {
      heading: 'Complete the Pattern!',
      instructions: 'Tap the empty center box to win! 💗',
      winMessage: 'You won my heart! 🎉',
    },
    background: {
      type: 'gradient',
      from: '#FFD29E',
      to: '#FF9AB1',
    },
  },
  
  // Slide 3: Sweet Message
  {
    id: 'sweet-message',
    type: 'text',
    order: 3,
    content: {
      emoji: '💖',
      heading: 'My Dearest',
      messages: [
        {
          text: 'I am so thankful to have you in my life.',
          gif: '/assets/gifs/thankful.gif', // Replace .svg with .gif when you add real GIF
        },
        {
          text: 'You are the best and perfect.',
          gif: '/assets/gifs/perfect.gif', // Replace .svg with .gif when you add real GIF
        },
        {
          text: 'Keep smiling madam ☺️',
          gif: '/assets/gifs/smile.gif', // Replace .svg with .gif when you add real GIF
        },
      ],
      quote: 'You make every day brighter!',
    },
    background: {
      type: 'gradient',
      from: '#FF9AB1',
      to: '#FF7AB6',
    },
  },
  
  // Slide 4: Gift Sequence
  {
    id: 'gift-sequence',
    type: 'gift-sequence',
    order: 4,
    content: {
      heading: 'Special Gifts for You',
      instructions: 'Tap to open each gift box! 🎁',
      gifts: [
        {
          icon: '🌹',
          title: 'Love',
          description: 'My endless love for you',
          gif: '/assets/gifs/love.gif', // Add love-themed GIF
        },
        {
          icon: '🎵',
          title: 'Joy',
          description: 'The happiness you bring to my life',
          gif: '/assets/gifs/joy.gif', // Add joy/happiness-themed GIF
        },
        {
          icon: '✨',
          title: 'Magic',
          description: 'The magic of being with you',
          gif: '/assets/gifs/magic.gif', // Add magic/sparkle-themed GIF
        },
      ],
      completeMessage: 'All gifts revealed! You deserve them all! 💕',
    },
    background: {
      type: 'gradient',
      from: '#FF7AB6',
      to: '#FFD29E',
    },
  },
  
  // Slide 5: Music Player
  {
    id: 'music-player',
    type: 'music-player',
    order: 5,
    content: {
      heading: 'A Song for You',
      description: 'This reminds me of you 🎵',
      audioSrc: '/assets/audio/song.mp3',
      songTitle: 'Our Song',
      artist: 'For My Sweetu',
      fullSongUrl: 'https://music.youtube.com/watch?v=8UG8hwSq-r8&si=_c0ZyFXh5cC2Mlea',
      note: '',
    },
    background: {
      type: 'gradient',
      from: '#FFD29E',
      to: '#FFF6EE',
    },
  },
  
  // Slide 6: Thank You Card + Final Wish
  {
    id: 'thank-you',
    type: 'thank-you',
    order: 6,
    content: {
      heading: 'Thank You! 💕',
      message: 'You make my world brighter every single day.',
      gif: '/assets/gifs/thankyou.gif', // Add cute thank you GIF
      showChildrensDayButton: true,
      finalWish: 'Happy Children\'s Day, Bacha! 🎈 May your day be filled with joy, laughter, and endless happiness. You deserve all the love in the world! 💖',
    },
    background: {
      type: 'gradient',
      from: '#FF9AB1',
      to: '#FFF6EE',
    },
  }
];

export const getTotalSlides = () => slidesData.length;

export const getSlideById = (id) => slidesData.find(slide => slide.id === id);
