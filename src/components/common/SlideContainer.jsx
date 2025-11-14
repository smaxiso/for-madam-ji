import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import { useSlideNavigation } from '../../hooks/useSlideNavigation';
import Slide from './Slide';
import Controls from './Controls';
import DotNav from './DotNav';
import HeartLayer from './HeartLayer';

// Import slide-specific components
import WelcomeSlide from '../slides/WelcomeSlide';
import TicTacToeSlide from '../slides/TicTacToeSlide';
import MessageSlide from '../slides/MessageSlide';
import GiftSequenceSlide from '../slides/GiftSequenceSlide';
import MusicPlayerSlide from '../slides/MusicPlayerSlide';
import ThankYouSlide from '../slides/ThankYouSlide';

/**
 * SlideContainer component - Main orchestrator for all slides
 */
function SlideContainer() {
  const { currentSlide, slideIndex } = useAppContext();
  const { direction, goToNextSlide, goToPrevSlide } = useSlideNavigation();

  // Set up keyboard navigation
  useKeyboardNav({
    onNext: goToNextSlide,
    onPrev: goToPrevSlide,
  });

  // Render appropriate slide component based on type
  const renderSlideContent = () => {
    // Use slideIndex as key to force component remount on slide change
    const slideKey = slideIndex;
    
    switch (currentSlide.type) {
      case 'welcome':
        return <WelcomeSlide key={slideKey} slide={currentSlide} />;
        
      case 'interactive-game':
        return <TicTacToeSlide key={slideKey} slide={currentSlide} />;
        
      case 'text':
        return <MessageSlide key={slideKey} slide={currentSlide} />;
        
      case 'gift-sequence':
        return <GiftSequenceSlide key={slideKey} slide={currentSlide} />;
        
      case 'music-player':
        return <MusicPlayerSlide key={slideKey} slide={currentSlide} />;
        
      case 'thank-you':
        return <ThankYouSlide key={slideKey} slide={currentSlide} />;
        
      default:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-soft-rose">
              Unknown slide type: {currentSlide.type}
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cream to-peach overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <Slide key={slideIndex} slide={currentSlide} direction={direction}>
          {renderSlideContent()}
        </Slide>
      </AnimatePresence>

      {/* Navigation Controls */}
      <Controls />

      {/* Dot Navigation */}
      <DotNav />

      {/* Interactive Hearts - Commented out to prevent interference with interactive elements */}
      {/* <HeartLayer /> */}
    </div>
  );
}

export default SlideContainer;
