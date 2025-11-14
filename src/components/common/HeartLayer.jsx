import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HeartLayer component for interactive floating hearts on tap/click
 */
function HeartLayer() {
  const [hearts, setHearts] = useState([]);

  const handleInteraction = useCallback((e) => {
    // Don't create hearts if clicking on buttons or interactive elements
    const target = e.target;
    if (target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-element')) {
      return;
    }

    const id = Date.now() + Math.random();
    const x = e.clientX || e.touches?.[0]?.clientX || window.innerWidth / 2;
    const y = e.clientY || e.touches?.[0]?.clientY || window.innerHeight / 2;

    const newHeart = {
      id,
      x,
      y,
      rotation: Math.random() * 40 - 20, // Random rotation between -20 and 20 degrees
      scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2
    };

    setHearts((prev) => [...prev, newHeart]);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== id));
    }, 1500);
  }, []);

  return (
    <div
      className="fixed inset-0 z-fixed"
      style={{ pointerEvents: 'none' }}
      onPointerDown={(e) => {
        e.currentTarget.style.pointerEvents = 'auto';
        handleInteraction(e);
        e.currentTarget.style.pointerEvents = 'none';
      }}
    >
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-4xl pointer-events-none"
            style={{
              left: heart.x,
              top: heart.y,
              x: '-50%',
              y: '-50%',
            }}
            initial={{
              opacity: 1,
              scale: heart.scale,
              rotate: heart.rotation,
            }}
            animate={{
              opacity: 0,
              y: -100,
              scale: heart.scale * 1.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default HeartLayer;
