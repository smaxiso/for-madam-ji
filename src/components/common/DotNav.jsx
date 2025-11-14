import { motion } from 'framer-motion';
import { useSlideNavigation } from '../../hooks/useSlideNavigation';
import { buttonHover } from '../../utils/animations';

/**
 * DotNav component for slide indicators
 */
function DotNav() {
  const { currentSlide, totalSlides, goToSlide } = useSlideNavigation();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-dropdown">
      <div className="flex gap-3 glass-subtle rounded-full px-4 py-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-soft-rose scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default DotNav;
