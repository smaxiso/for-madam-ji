import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, modalVariants, buttonHover } from '../../utils/animations';
import { useConfetti } from '../../hooks/useConfetti';
import { siteConfig } from '../../data/config';

/**
 * ThankYouSlide component - Final slide with Children's Day celebration
 */
function ThankYouSlide({ slide }) {
  const [showModal, setShowModal] = useState(false);
  const [showButtonPrompt, setShowButtonPrompt] = useState(false);
  const { burst } = useConfetti();

  // Check if today is November 14th (Children's Day)
  const isChildrensDay = () => {
    const today = new Date();
    return today.getMonth() === 10 && today.getDate() === 14; // Month is 0-indexed (10 = November)
  };

  // Show button prompt after 3 seconds
  useEffect(() => {
    if (isChildrensDay()) {
      const timer = setTimeout(() => {
        setShowButtonPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCelebrate = () => {
    setShowButtonPrompt(false);
    setShowModal(true);
    burst();
  };

  const handleClosePrompt = () => {
    setShowButtonPrompt(false);
  };

  return (
    <div className="text-center max-w-3xl mx-auto px-4 pb-12 relative">
      {/* Small persistent Children's Day button in top-right */}
      {slide.content.showChildrensDayButton && isChildrensDay() && !showButtonPrompt && (
        <motion.button
          onClick={() => setShowButtonPrompt(true)}
          className="fixed top-20 right-4 md:top-24 md:right-8 z-50 w-14 h-14 rounded-full text-2xl shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #ffa5c5 100%)',
            boxShadow: '0 8px 25px rgba(255, 107, 157, 0.6)',
          }}
        >
          🎉
        </motion.button>
      )}

      {/* Cute GIF at the top */}
      {slide.content.gif && (
        <motion.div
          className="mb-8 w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full shadow-2xl border-4 border-blush/30 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blush/10 to-soft-rose/10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <img
            src={slide.content.gif}
            alt="Thank you"
            className="w-32 h-32 md:w-40 md:h-40 object-cover"
          />
        </motion.div>
      )}

      {/* Main Thank You Card - Old Journal Paper Style with Enhanced 3D */}
      <motion.div
        className="relative rounded-3xl p-10 mb-8 overflow-hidden"
        variants={scaleIn}
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(245, 235, 220, 0.95), 
              rgba(255, 248, 230, 0.9),
              rgba(245, 222, 179, 0.95)
            )
          `,
          boxShadow: `
            0 20px 60px rgba(101, 67, 33, 0.4),
            0 10px 30px rgba(101, 67, 33, 0.3),
            0 5px 15px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.6),
            inset 0 -2px 4px rgba(0, 0, 0, 0.15),
            inset -2px 0 4px rgba(0, 0, 0, 0.1),
            inset 2px 0 4px rgba(255, 255, 255, 0.4)
          `,
          transform: 'perspective(1000px) rotateX(2deg)',
        }}
        whileHover={{
          transform: 'perspective(1000px) rotateX(0deg) translateY(-5px)',
          boxShadow: `
            0 30px 80px rgba(101, 67, 33, 0.5),
            0 15px 40px rgba(101, 67, 33, 0.4),
            0 8px 20px rgba(0, 0, 0, 0.3)
          `,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Burnt/aged paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(101, 67, 33, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(101, 67, 33, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(139, 90, 43, 0.1) 0%, transparent 70%)
            `,
          }}
        />

        {/* Burnt edges effect - Enhanced with larger blur areas */}
        <div className="absolute -top-2 -left-2 w-28 h-28 bg-gradient-radial from-amber-900/50 to-transparent rounded-full blur-2xl" />
        <div className="absolute -top-3 -right-3 w-32 h-32 bg-gradient-radial from-amber-900/40 to-transparent rounded-full blur-2xl" />
        <div className="absolute -bottom-2 -left-3 w-24 h-24 bg-gradient-radial from-amber-900/45 to-transparent rounded-full blur-2xl" />
        <div className="absolute -bottom-3 -right-2 w-28 h-28 bg-gradient-radial from-amber-900/50 to-transparent rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Hearts decoration */}
          <motion.div
            className="text-6xl mb-6 drop-shadow-md"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            💕
          </motion.div>

          {/* Thank you message - Stylish handwritten font style */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: "'Brush Script MT', cursive, serif",
              color: '#8B4513',
              textShadow: '2px 2px 4px rgba(139, 69, 19, 0.2)',
              letterSpacing: '0.02em',
            }}
            variants={fadeInUp}
          >
            {slide.content.heading}
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{
              fontFamily: "'Georgia', serif",
              color: '#654321',
              fontStyle: 'italic',
            }}
            variants={fadeInUp}
          >
            {slide.content.message}
          </motion.p>

          {/* Author signature - Elegant script */}
          <motion.div
            className="text-xl md:text-2xl font-bold"
            style={{
              fontFamily: "'Brush Script MT', cursive, serif",
              color: '#8B4513',
              textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)',
            }}
            variants={fadeInUp}
          >
            — {siteConfig.author.name}
          </motion.div>
        </div>
      </motion.div>

      {/* Children's Day Button Prompt - Centered Modal */}
      <AnimatePresence>
        {slide.content.showChildrensDayButton && isChildrensDay() && showButtonPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Centered Button Prompt */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-modal p-4"
            >
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {/* Close button */}
                <motion.button
                  onClick={handleClosePrompt}
                  className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-lg text-muted-grey hover:text-soft-rose transition-colors shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                {/* Main Button */}
                <motion.button
                  onClick={handleCelebrate}
                  className="relative px-12 py-6 text-white font-bold rounded-full text-2xl overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    scale: {
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #ffa5c5 100%)',
                    boxShadow: `
                      0 10px 40px rgba(255, 107, 157, 0.5),
                      0 5px 20px rgba(192, 108, 132, 0.4)
                    `,
                  }}
                >
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🎉
                    </motion.span>
                    Celebrate Children&apos;s Day!
                    <motion.span
                      animate={{ rotate: [0, -15, 15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🎉
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Children's Day Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Modal - Square, centered, with max height */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-modal p-4 pointer-events-none"
            >
              <motion.div
                className="glass-strong rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col relative pointer-events-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button - X icon in top-right */}
                <motion.button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-2xl text-muted-grey hover:text-soft-rose transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>

                {/* Scrollable content area - Hide scrollbar */}
                <div className="overflow-y-auto p-8 text-center scrollbar-hide">
                  {/* Modi ji saluting GIF - Animated entrance */}
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: 'spring', 
                      damping: 10,
                      delay: 0.3 
                    }}
                  >
                    <img
                      src="/assets/gifs/salute_modi.gif"
                      alt="Salute"
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mx-auto shadow-xl border-4 border-soft-rose/30"
                    />
                  </motion.div>

                {/* Animated emoji decorations */}
                <motion.div 
                  className="text-6xl mb-4 flex justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.span
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      y: [0, -5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1 
                    }}
                  >
                    🎈
                  </motion.span>
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5 
                    }}
                  >
                    🎊
                  </motion.span>
                  <motion.span
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      y: [0, -5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1.2 
                    }}
                  >
                    🎁
                  </motion.span>
                </motion.div>

                {/* Stylized animated title */}
                <motion.h3
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-blush via-soft-rose to-blush bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{
                    opacity: { delay: 0.6 },
                    y: { delay: 0.6 },
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                  style={{
                    backgroundSize: '200% auto',
                    textShadow: '0 2px 10px rgba(255, 154, 177, 0.3)',
                  }}
                >
                  Happy Children&apos;s Day!
                </motion.h3>

                {/* Date with shimmer effect */}
                <motion.p
                  className="text-xl font-semibold mb-4 relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  style={{
                    background: 'linear-gradient(90deg, #ff9ab1 0%, #ffd29e 50%, #ff9ab1 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <motion.span
                    animate={{ backgroundPosition: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block' }}
                  >
                    {siteConfig.occasion.date}
                  </motion.span>
                </motion.p>

                {/* Message with fade-in */}
                <motion.p
                  className="text-lg text-muted-grey mb-6 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  {slide.content.finalWish}
                </motion.p>

                {/* Nickname with bounce */}
                <motion.div
                  className="text-6xl mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: 'spring',
                    damping: 8,
                    delay: 1.2 
                  }}
                >
                  <motion.span
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  >
                    {siteConfig.recipient.nicknames[0]} 💕
                  </motion.span>
                </motion.div>
              </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThankYouSlide;
