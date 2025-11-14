import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

/**
 * GiftSequenceSlide component - Stacked gift boxes that open on tap
 */
function GiftSequenceSlide({ slide }) {
  const [currentGiftIndex, setCurrentGiftIndex] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const gifts = slide.content.gifts || [];

  // Handle opening the current gift box
  const handleOpenGift = () => {
    if (isOpening) return;
    
    setIsOpening(true);
    setTimeout(() => {
      setCurrentGiftIndex((prev) => (prev + 1) % gifts.length);
      setIsOpening(false);
    }, 800);
  };

  const currentGift = gifts[currentGiftIndex];
  const allRevealed = false; // Always cycle through

  return (
    <div className="text-center max-w-4xl mx-auto px-4 pb-20">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-soft-rose mb-4"
        variants={fadeInUp}
      >
        {slide.content.heading}
      </motion.h2>

      {/* Instructions */}
      <motion.p
        className="text-base md:text-lg text-muted-grey mb-8"
        variants={fadeInUp}
      >
        {slide.content.instructions}
      </motion.p>

      {/* Stacked Gift Boxes Container */}
      <div className="relative w-full max-w-lg mx-auto h-[400px] md:h-[450px] mb-12">
        {/* Stack of gift boxes behind (3D stack effect) */}
        {gifts.map((_, index) => {
          const offset = (index - currentGiftIndex + gifts.length) % gifts.length;
          if (offset === 0 || offset > 2) return null;

          return (
            <motion.div
              key={`stack-${index}`}
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                zIndex: gifts.length - offset,
                background: `linear-gradient(135deg, rgba(255, 154, 177, ${0.4 - offset * 0.1}), rgba(255, 210, 158, ${0.4 - offset * 0.1}))`,
                transform: `translateY(${offset * 20}px) scale(${1 - offset * 0.08}) rotateX(${offset * 5}deg)`,
                boxShadow: `0 ${offset * 10}px ${offset * 30}px rgba(255, 122, 182, ${0.3 - offset * 0.1})`,
              }}
            >
              {/* Gift box ribbon decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-8 bg-white/20" style={{ transform: 'translateY(-50%)' }} />
                <div className="absolute w-8 h-full bg-white/20" />
              </div>
            </motion.div>
          );
        })}

        {/* Current Gift Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGiftIndex}
            className="absolute inset-0 cursor-pointer"
            style={{ zIndex: gifts.length + 1 }}
            onClick={handleOpenGift}
            initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
            animate={{ 
              scale: isOpening ? 1.1 : 1, 
              opacity: 1,
              rotateY: 0,
              rotateX: isOpening ? -15 : 0,
            }}
            exit={{ 
              y: -800,
              opacity: 0,
              rotateZ: 45,
              scale: 0.5,
              transition: { duration: 0.8, ease: 'easeIn' },
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            {/* Gift Box Lid (opens up) */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 154, 177, 0.9), rgba(255, 210, 158, 0.9))',
                boxShadow: '0 20px 60px rgba(255, 122, 182, 0.4)',
                transformOrigin: 'bottom',
              }}
              animate={{
                rotateX: isOpening ? -100 : 0,
                y: isOpening ? -50 : 0,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Ribbon on lid */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-12 bg-gradient-to-r from-soft-rose to-blush opacity-60" />
                <div className="absolute w-12 h-full bg-gradient-to-b from-soft-rose to-blush opacity-60" />
                <motion.div 
                  className="absolute text-6xl"
                  animate={{ rotate: isOpening ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  🎀
                </motion.div>
              </div>
            </motion.div>

            {/* Gift Box Content (revealed) */}
            <motion.div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 glass-strong"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpening ? 1 : 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* GIF */}
              {currentGift?.gif && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                >
                  <img
                    src={currentGift.gif}
                    alt={currentGift.title}
                    className="w-40 h-32 md:w-52 md:h-40 object-cover rounded-2xl shadow-2xl mb-6"
                  />
                </motion.div>
              )}

              {/* Gift Icon */}
              <motion.div
                className="text-6xl md:text-7xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                {currentGift?.icon}
              </motion.div>

              {/* Gift Title */}
              <motion.h3
                className="text-2xl md:text-3xl font-bold text-soft-rose mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {currentGift?.title}
              </motion.h3>

              {/* Gift Description */}
              <motion.p
                className="text-base md:text-lg text-muted-grey text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {currentGift?.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
          {gifts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentGiftIndex ? 'bg-soft-rose w-6' : 'bg-blush/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tap instruction */}
      <motion.p
        className="text-sm md:text-base text-blush/70 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tap to open next gift 🎁
      </motion.p>
    </div>
  );
}

export default GiftSequenceSlide;
