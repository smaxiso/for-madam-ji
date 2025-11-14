import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, buttonHover } from '../../utils/animations';

/**
 * GiftSequenceSlide component - Sequential gift reveals
 */
function GiftSequenceSlide({ slide }) {
  const [revealedGifts, setRevealedGifts] = useState([]);
  const [currentGift, setCurrentGift] = useState(0);

  const handleRevealGift = () => {
    if (currentGift < slide.content.gifts.length) {
      setRevealedGifts([...revealedGifts, currentGift]);
      setCurrentGift(currentGift + 1);
    }
  };

  const resetGifts = () => {
    setRevealedGifts([]);
    setCurrentGift(0);
  };

  const allRevealed = currentGift >= slide.content.gifts.length;

  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-soft-rose mb-6"
        variants={fadeInUp}
      >
        {slide.content.heading}
      </motion.h2>

      {/* Instructions */}
      {!allRevealed && (
        <motion.p
          className="text-xl text-muted-grey mb-8"
          variants={fadeInUp}
        >
          {slide.content.instructions}
        </motion.p>
      )}

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnimatePresence>
          {slide.content.gifts.map((gift, index) => (
            <motion.div
              key={index}
              className={`glass-medium rounded-2xl p-6 ${
                revealedGifts.includes(index) ? 'opacity-100' : 'opacity-30'
              }`}
              variants={scaleIn}
              initial="initial"
              animate={revealedGifts.includes(index) ? 'animate' : 'initial'}
              layout
            >
              {/* Gift Icon/Emoji */}
              <div className="text-6xl mb-4">{gift.icon}</div>

              {/* Gift Title */}
              <h3 className="text-2xl font-bold text-blush mb-2">
                {gift.title}
              </h3>

              {/* Gift Description */}
              {revealedGifts.includes(index) && (
                <motion.p
                  className="text-muted-grey"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.3 }}
                >
                  {gift.description}
                </motion.p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Reveal/Reset Button */}
      <motion.div variants={fadeInUp}>
        {!allRevealed ? (
          <motion.button
            onClick={handleRevealGift}
            className="px-8 py-4 bg-gradient-to-r from-blush to-soft-rose text-white font-semibold rounded-full shadow-lg text-lg"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            Reveal Gift {currentGift + 1} 🎁
          </motion.button>
        ) : (
          <div>
            <motion.p
              className="text-2xl text-soft-rose font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {slide.content.completeMessage}
            </motion.p>
            <motion.button
              onClick={resetGifts}
              className="px-6 py-3 bg-white/20 text-muted-grey font-semibold rounded-full"
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              Reset 🔄
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default GiftSequenceSlide;
