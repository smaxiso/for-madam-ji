import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, heartFloat } from '../../utils/animations';
import { siteConfig } from '../../data/config';

/**
 * WelcomeSlide component - First slide with greeting
 */
function WelcomeSlide({ slide }) {
  return (
    <div className="text-center mt-8 md:mt-0">
      {/* Animated hearts decoration */}
      <motion.div
        className="text-5xl md:text-6xl mb-4 md:mb-6"
        variants={heartFloat}
        animate="animate"
      >
        💕
      </motion.div>

      {/* Main heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-soft-rose mb-4 md:mb-6"
        variants={scaleIn}
      >
        {slide.content.heading}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-xl md:text-3xl text-muted-grey mb-6 md:mb-8"
        variants={fadeInUp}
      >
        {slide.content.subheading}
      </motion.p>

      {/* Recipient name */}
      <motion.div
        className="glass-medium rounded-2xl p-4 md:p-6 inline-block"
        variants={fadeInUp}
      >
        <p className="text-lg md:text-xl text-muted-grey mb-2">For my dearest</p>
        <p className="text-3xl md:text-4xl font-bold text-blush">
          {siteConfig.recipient.name}
        </p>
        <p className="text-base md:text-lg text-muted-grey mt-2">
          aka {siteConfig.recipient.nicknames.join(', ')}
        </p>
      </motion.div>

      {/* Hint */}
      <motion.p
        className="text-sm text-muted-grey mt-6 md:mt-8 opacity-70"
        variants={fadeInUp}
      >
        Tap on-screen arrows or slide dots to navigate →
      </motion.p>
    </div>
  );
}

export default WelcomeSlide;
