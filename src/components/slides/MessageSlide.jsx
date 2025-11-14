import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn } from '../../utils/animations';

/**
 * MessageSlide component - Scrapbook-style stacked cards that flip on tap
 */
function MessageSlide({ slide }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = slide.content.messages || [];

  // Handle card tap - move to next card (loop infinitely)
  const handleCardTap = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  // Get current message
  const currentMessage = messages[currentIndex];
  const messageText = typeof currentMessage === 'string' ? currentMessage : currentMessage?.text;
  const messageGif = typeof currentMessage === 'object' ? currentMessage?.gif : null;

  return (
    <div className="text-center max-w-4xl mx-auto px-4 pb-12">
      {/* Emoji/Icon - Animated Heart */}
      {slide.content.emoji && (
        <motion.div
          className="text-6xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {slide.content.emoji}
        </motion.div>
      )}

      {/* Heading - Glowing Text */}
      {slide.content.heading && (
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-soft-rose mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            textShadow: '0 0 30px rgba(255, 122, 182, 0.6), 0 0 50px rgba(255, 154, 177, 0.4)',
          }}
        >
          {slide.content.heading}
        </motion.h2>
      )}

      {/* Scrapbook Stack Container */}
      <div className="relative w-full max-w-2xl mx-auto h-[300px] md:h-[350px] mb-16">
        {/* Stack of cards behind (peek effect) */}
        {messages.map((_, index) => {
          // Only show next 2 cards behind current
          const offset = (index - currentIndex + messages.length) % messages.length;
          if (offset === 0 || offset > 2) return null;

          return (
            <div
              key={`peek-${index}`}
              className="absolute inset-0 glass-strong rounded-2xl shadow-xl pointer-events-none"
              style={{
                zIndex: messages.length - offset,
                transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05}) rotate(${offset * 2}deg)`,
                opacity: 1 - offset * 0.3,
              }}
            />
          );
        })}

        {/* Current Active Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 glass-strong rounded-2xl p-6 shadow-2xl cursor-pointer"
            style={{ zIndex: messages.length + 1 }}
            onClick={handleCardTap}
            initial={{ 
              scale: 0.95, 
              opacity: 0,
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            exit={{ 
              x: -400,
              opacity: 0,
              scale: 0.9,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            whileHover={{ 
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col h-full items-center justify-center gap-6">
              {/* GIF */}
              {messageGif && (
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <img
                    src={messageGif}
                    alt={`Message ${currentIndex + 1}`}
                    className="w-32 h-24 md:w-48 md:h-36 object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              )}

              {/* Message Text */}
              <motion.div
                className="flex-1 flex items-center justify-center px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl text-muted-grey leading-relaxed">
                  {messageText}
                </p>
              </motion.div>

              {/* Tap instruction */}
              <motion.div
                className="text-xs md:text-sm text-blush/70 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Tap to see next 💕
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-soft-rose w-6' : 'bg-blush/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Optional quote - Above progress dots to avoid overlap */}
      {slide.content.quote && (
        <motion.div
          className="glass-medium rounded-xl p-4 mt-4 inline-block max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-base md:text-lg italic text-blush">
            &quot;{slide.content.quote}&quot;
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default MessageSlide;
