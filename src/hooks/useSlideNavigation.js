import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { ACTION_TYPES } from '../context/AppContext';

/**
 * Custom hook for slide navigation
 * Provides convenient methods for navigating between slides
 */
export function useSlideNavigation() {
  const { state, dispatch, isFirstSlide, isLastSlide } = useAppContext();
  
  const goToNextSlide = useCallback(() => {
    if (!isLastSlide) {
      dispatch({ type: ACTION_TYPES.NEXT_SLIDE });
    }
  }, [isLastSlide, dispatch]);
  
  const goToPrevSlide = useCallback(() => {
    if (!isFirstSlide) {
      dispatch({ type: ACTION_TYPES.PREV_SLIDE });
    }
  }, [isFirstSlide, dispatch]);
  
  const goToSlide = useCallback((index) => {
    dispatch({ type: ACTION_TYPES.GO_TO_SLIDE, payload: index });
  }, [dispatch]);
  
  return {
    currentSlide: state.currentSlide,
    totalSlides: state.totalSlides,
    direction: state.direction,
    isFirstSlide,
    isLastSlide,
    goToNextSlide,
    goToPrevSlide,
    goToSlide,
  };
}
