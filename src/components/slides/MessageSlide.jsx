import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '../../utils/animations';

/**
 * MessageSlide component - Stacked letter cards with GIFs
 */
function MessageSlide({ slide }) {
  // Staggered animation for letter cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      {/* Emoji/Icon */}
      {slide.content.emoji && (
        <motion.div
          className="text-6xl mb-6"
          variants={scaleIn}
        >
          {slide.content.emoji}
        </motion.div>
      )}

      {/* Heading */}
      {slide.content.heading && (
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-soft-rose mb-8"
          variants={fadeInUp}
        >
          {slide.content.heading}
        </motion.h2>
      )}

      {/* Stacked Letter Cards */}
      <motion.div
        className="space-y-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {slide.content.messages.map((message, index) => {
          const messageText = typeof message === 'string' ? message : message.text;
          const messageGif = typeof message === 'object' ? message.gif : null;

          return (
            <motion.div
              key={index}
              className="glass-strong rounded-2xl p-6 shadow-xl"
              variants={letterVariants}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 20px 40px rgba(255, 154, 177, 0.3)',
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* GIF */}
                {messageGif && (
                  <div className="flex-shrink-0">
                    <img
                      src={messageGif}
                      alt={`Message ${index + 1}`}
                      className="w-40 h-32 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Message Text */}
                <div className="flex-1">
                  <p className="text-xl md:text-2xl text-muted-grey leading-relaxed">
                    {messageText}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Optional quote */}
      {slide.content.quote && (
        <motion.div
          className="glass-medium rounded-xl p-6 mt-8 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-lg italic text-blush">
            &quot;{slide.content.quote}&quot;
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default MessageSlide;
