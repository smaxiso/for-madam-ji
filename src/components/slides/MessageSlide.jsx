import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '../../utils/animations';

/**
 * MessageSlide component - Simple text message slide
 */
function MessageSlide({ slide }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
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
          className="text-4xl md:text-5xl font-bold text-soft-rose mb-6"
          variants={fadeInUp}
        >
          {slide.content.heading}
        </motion.h2>
      )}

      {/* Message paragraphs */}
      <div className="space-y-4">
        {slide.content.messages.map((message, index) => (
          <motion.p
            key={index}
            className="text-xl md:text-2xl text-muted-grey leading-relaxed"
            variants={fadeInUp}
            custom={index}
          >
            {message}
          </motion.p>
        ))}
      </div>

      {/* Optional quote */}
      {slide.content.quote && (
        <motion.div
          className="glass-medium rounded-xl p-6 mt-8 inline-block"
          variants={fadeInUp}
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
