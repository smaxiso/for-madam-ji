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
    <div className="text-center max-w-2xl mx-auto">
      {/* Main Thank You Card */}
      <motion.div
        className="glass-strong rounded-3xl p-8 mb-8"
        variants={scaleIn}
      >
        {/* Hearts decoration */}
        <motion.div
          className="text-6xl mb-4"
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

        {/* Thank you message */}
        <motion.h2
          className="text-5xl font-bold text-soft-rose mb-4"
          variants={fadeInUp}
        >
          {slide.content.heading}
        </motion.h2>

        <motion.p
          className="text-2xl text-muted-grey mb-6"
          variants={fadeInUp}
        >
          {slide.content.message}
        </motion.p>

        {/* Author signature */}
        <motion.div
          className="text-lg text-blush font-semibold"
          variants={fadeInUp}
        >
          — {siteConfig.author.name}
        </motion.div>
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
