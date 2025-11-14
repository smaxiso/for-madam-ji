// Framer Motion animation variants library

// Detect if mobile device
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  })
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2, 
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.2, 
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const heartFloat = {
  initial: { y: 0, opacity: 1, scale: 1 },
  animate: {
    y: -100,
    opacity: 0,
    scale: 1.5,
    transition: { 
      duration: 1.5, 
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 2,
    }
  }
};

export const buttonHover = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};
