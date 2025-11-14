import { motion } from 'framer-motion';
import { slideVariants, fadeInUp } from '../../utils/animations';

/**
 * Generic Slide component that renders different slide types
 */
function Slide({ slide, direction, children }) {
  const renderBackground = () => {
    if (slide.background?.type === 'gradient') {
      return (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, ${slide.background.from} 0%, ${slide.background.to} 100%)`,
          }}
        />
      );
    }

    if (slide.background?.type === 'image') {
      return (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.background.src})`,
            filter: slide.background.blur ? 'blur(10px)' : 'none',
          }}
        />
      );
    }

    return null;
  };

  return (
    <motion.div
      key={slide.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1], // Custom ease-out curve for snappier feel
      }}
      className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Background */}
      {renderBackground()}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className={`w-full max-w-4xl relative z-10 ${
          slide.type === 'welcome' ? 'mt-[-10vh]' : ''
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Slide;
