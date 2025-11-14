import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, modalVariants, buttonHover } from '../../utils/animations';
import { useConfetti } from '../../hooks/useConfetti';
import { siteConfig } from '../../data/config';

/**
 * ThankYouSlide component - Final slide with Children's Day celebration
 */
function ThankYouSlide({ slide }) {
  const [showModal, setShowModal] = useState(false);
  const { burst } = useConfetti();

  // Check if today is November 14th (Children's Day)
  const isChildrensDay = () => {
    const today = new Date();
    return today.getMonth() === 10 && today.getDate() === 14; // Month is 0-indexed (10 = November)
  };

  const handleCelebrate = () => {
    setShowModal(true);
    burst();
  };

  return (
    <div className="text-center max-w-3xl mx-auto px-4 pb-20">
      {/* Cute GIF at the top */}
      {slide.content.gif && (
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <img
            src={slide.content.gif}
            alt="Thank you"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto shadow-2xl border-4 border-blush/30"
          />
        </motion.div>
      )}

      {/* Main Thank You Card - Old Journal Paper Style */}
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
            0 10px 40px rgba(101, 67, 33, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1)
          `,
        }}
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

        {/* Burnt edges effect */}
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-radial from-amber-900/40 to-transparent rounded-full blur-xl" />
        <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-radial from-amber-900/30 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-2 -left-3 w-16 h-16 bg-gradient-radial from-amber-900/35 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-3 -right-2 w-20 h-20 bg-gradient-radial from-amber-900/40 to-transparent rounded-full blur-xl" />

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

      {/* Children's Day Celebration Button - Only show on November 14th */}
      {slide.content.showChildrensDayButton && isChildrensDay() && (
        <motion.button
          onClick={handleCelebrate}
          className="px-8 py-4 bg-gradient-to-r from-blush to-soft-rose text-white font-bold rounded-full shadow-xl text-xl"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          🎉 Celebrate Children&apos;s Day! 🎉
        </motion.button>
      )}

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

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-modal p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                className="glass-strong rounded-3xl p-8 max-w-lg w-full text-center"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal content */}
                <div className="text-7xl mb-4">🎈🎊🎁</div>

                <h3 className="text-4xl font-bold text-soft-rose mb-4">
                  Happy Children&apos;s Day!
                </h3>

                <p className="text-xl text-muted-grey mb-4">
                  {siteConfig.occasion.date}
                </p>

                <p className="text-lg text-muted-grey mb-6">
                  {slide.content.finalWish}
                </p>

                <div className="text-6xl mb-6 animate-bounce">
                  {siteConfig.recipient.nicknames[0]} 💕
                </div>

                <motion.button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blush to-soft-rose text-white font-semibold rounded-full"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Close ✨
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ThankYouSlide;
