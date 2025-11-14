import { useEffect } from 'react';

export const useKeyboardNav = (onNext, onPrev, onEscape) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNext?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'Escape') onEscape?.();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onEscape]);
};
