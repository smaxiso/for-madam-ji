import { motion } from 'framer-motion';
import { useSlideNavigation } from '../../hooks/useSlideNavigation';
import { buttonHover } from '../../utils/animations';

/**
 * Controls component for previous/next navigation buttons
 */
function Controls() {
  const { isFirstSlide, isLastSlide, goToNextSlide, goToPrevSlide } = useSlideNavigation();

  return (
    <>
      {/* Previous button */}
      {!isFirstSlide && (
        <motion.button
          onClick={goToPrevSlide}
          className="fixed left-4 bottom-8 z-dropdown glass-medium rounded-full p-3 text-soft-rose"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {/* Next button */}
      {!isLastSlide && (
        <motion.button
          onClick={goToNextSlide}
          className="fixed right-4 bottom-8 z-dropdown glass-medium rounded-full p-3 text-soft-rose"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
    </>
  );
}

export default Controls;
