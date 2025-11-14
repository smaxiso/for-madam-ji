import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, buttonHover, modalVariants } from '../../utils/animations';
import { useAudio } from '../../hooks/useAudio';

/**
 * MusicPlayerSlide component - Audio player with controls
 */
function MusicPlayerSlide({ slide }) {
  const { isPlaying, duration, currentTime, play, pause, seek, currentVolume, setVolume } = useAudio(
    slide.content.audioSrc,
    { volume: 0.3 } // Start at 30% volume
  );
  const [showFullSongModal, setShowFullSongModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [dragVolume, setDragVolume] = useState(0);
  
  const progressBarRef = useRef(null);
  const volumeBarRef = useRef(null);

  // Check if song has ended (reached 44 seconds or duration)
  useEffect(() => {
    if (!hasShownModal && currentTime > 0 && duration > 0) {
      // Show modal when song completes (with 0.5s buffer for accuracy)
      if (currentTime >= duration - 0.5) {
        setShowFullSongModal(true);
        setHasShownModal(true);
      }
    }
  }, [currentTime, duration, hasShownModal]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (clientX) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setDragProgress(percentage * 100);
    seek(percentage * duration);
  };

  const handleProgressMouseDown = (e) => {
    setIsDraggingProgress(true);
    handleSeek(e.clientX);
  };

  const handleProgressMouseMove = (e) => {
    if (isDraggingProgress) {
      handleSeek(e.clientX);
    }
  };

  const handleProgressMouseUp = () => {
    setIsDraggingProgress(false);
  };

  const handleProgressTouchStart = (e) => {
    setIsDraggingProgress(true);
    handleSeek(e.touches[0].clientX);
  };

  const handleProgressTouchMove = (e) => {
    if (isDraggingProgress) {
      e.preventDefault();
      handleSeek(e.touches[0].clientX);
    }
  };

  const handleProgressTouchEnd = () => {
    setIsDraggingProgress(false);
  };

  useEffect(() => {
    if (isDraggingProgress) {
      window.addEventListener('mousemove', handleProgressMouseMove);
      window.addEventListener('mouseup', handleProgressMouseUp);
      window.addEventListener('touchmove', handleProgressTouchMove, { passive: false });
      window.addEventListener('touchend', handleProgressTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleProgressMouseMove);
        window.removeEventListener('mouseup', handleProgressMouseUp);
        window.removeEventListener('touchmove', handleProgressTouchMove);
        window.removeEventListener('touchend', handleProgressTouchEnd);
      };
    }
  }, [isDraggingProgress]);

  const handleVolumeChange = (clientX) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setDragVolume(percentage * 100);
    setVolume(percentage);
  };

  const handleVolumeMouseDown = (e) => {
    setIsDraggingVolume(true);
    handleVolumeChange(e.clientX);
  };

  const handleVolumeMouseMove = (e) => {
    if (isDraggingVolume) {
      handleVolumeChange(e.clientX);
    }
  };

  const handleVolumeMouseUp = () => {
    setIsDraggingVolume(false);
  };

  const handleVolumeTouchStart = (e) => {
    setIsDraggingVolume(true);
    handleVolumeChange(e.touches[0].clientX);
  };

  const handleVolumeTouchMove = (e) => {
    if (isDraggingVolume) {
      e.preventDefault();
      handleVolumeChange(e.touches[0].clientX);
    }
  };

  const handleVolumeTouchEnd = () => {
    setIsDraggingVolume(false);
  };

  useEffect(() => {
    if (isDraggingVolume) {
      window.addEventListener('mousemove', handleVolumeMouseMove);
      window.addEventListener('mouseup', handleVolumeMouseUp);
      window.addEventListener('touchmove', handleVolumeTouchMove, { passive: false });
      window.addEventListener('touchend', handleVolumeTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleVolumeMouseMove);
        window.removeEventListener('mouseup', handleVolumeMouseUp);
        window.removeEventListener('touchmove', handleVolumeTouchMove);
        window.removeEventListener('touchend', handleVolumeTouchEnd);
      };
    }
  }, [isDraggingVolume]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = currentVolume * 100;

  return (
    <div className="text-center max-w-2xl mx-auto px-4 pb-24">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-soft-rose mb-4"
        variants={fadeInUp}
      >
        {slide.content.heading}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-xl text-muted-grey mb-8"
        variants={fadeInUp}
      >
        {slide.content.description}
      </motion.p>

      {/* Music Player Card */}
      <motion.div
        className="glass-medium rounded-2xl p-8"
        variants={scaleIn}
      >
        {/* Album Art / Visual */}
        <motion.div
          className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blush to-soft-rose flex items-center justify-center text-8xl"
          animate={isPlaying ? { rotate: [0, 360] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          🎵
        </motion.div>

        {/* Song Title */}
        <h3 className="text-2xl font-bold text-blush mb-2">
          {slide.content.songTitle}
        </h3>
        <p className="text-muted-grey mb-6">{slide.content.artist}</p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressBarRef}
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-visible select-none relative"
            onClick={(e) => handleSeek(e.clientX)}
            onMouseDown={handleProgressMouseDown}
            onTouchStart={handleProgressTouchStart}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blush to-soft-rose pointer-events-none rounded-full relative"
              style={{ width: `${isDraggingProgress ? dragProgress : progress}%` }}
              transition={{ duration: isDraggingProgress ? 0 : 0.1 }}
            >
              {/* Animated white pointer ball */}
              <motion.div
                className="absolute bg-white rounded-full shadow-lg pointer-events-none"
                style={{
                  right: '-8px',
                  top: '50%',
                  marginTop: '-8px', // Half of default height (16px)
                  boxShadow: isDraggingProgress 
                    ? '0 4px 12px rgba(255, 122, 182, 0.6), 0 0 20px rgba(255, 154, 177, 0.4)'
                    : '0 2px 6px rgba(0, 0, 0, 0.2)'
                }}
                animate={{
                  width: isDraggingProgress ? 20 : 16,
                  height: isDraggingProgress ? 20 : 16,
                  marginTop: isDraggingProgress ? '-10px' : '-8px', // Half of height - keeps centered
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 400,
                  damping: 25
                }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-sm text-muted-grey mt-2">
            <span>{formatTime(isDraggingProgress ? (dragProgress / 100) * duration : currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔉</span>
            <div className="flex-1">
              <div
                ref={volumeBarRef}
                className="w-full h-3 bg-white/20 rounded-full cursor-pointer overflow-visible relative group select-none"
                onClick={(e) => handleVolumeChange(e.clientX)}
                onMouseDown={handleVolumeMouseDown}
                onTouchStart={handleVolumeTouchStart}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 relative pointer-events-none rounded-full"
                  style={{ width: `${isDraggingVolume ? dragVolume : volumePercent}%` }}
                  transition={{ duration: isDraggingVolume ? 0 : 0.1 }}
                >
                  {/* Animated white pointer ball */}
                  <motion.div
                    className="absolute bg-white rounded-full shadow-lg pointer-events-none"
                    style={{
                      right: '-9px',
                      top: '50%',
                      marginTop: '-9px', // Half of default height (18px)
                      boxShadow: isDraggingVolume 
                        ? '0 4px 12px rgba(147, 112, 219, 0.6), 0 0 20px rgba(255, 154, 177, 0.4)'
                        : '0 2px 6px rgba(0, 0, 0, 0.2)'
                    }}
                    animate={{
                      width: isDraggingVolume ? 22 : 18,
                      height: isDraggingVolume ? 22 : 18,
                      marginTop: isDraggingVolume ? '-11px' : '-9px', // Half of height - keeps centered
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 400,
                      damping: 25
                    }}
                  />
                </motion.div>
              </div>
            </div>
            <span className="text-sm text-muted-grey min-w-[3ch]">
              {Math.round(isDraggingVolume ? dragVolume : volumePercent)}%
            </span>
            <span className="text-2xl">{currentVolume > 0.5 ? '🔊' : currentVolume > 0 ? '🔉' : '🔇'}</span>
          </div>
        </div>

        {/* Play/Pause Button */}
        <motion.button
          onClick={isPlaying ? pause : play}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blush to-soft-rose text-white flex items-center justify-center text-2xl mx-auto shadow-lg"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>

        {/* Note */}
        {slide.content.note && (
          <motion.p
            className="text-sm text-muted-grey mt-6 italic"
            variants={fadeInUp}
          >
            {slide.content.note}
          </motion.p>
        )}
      </motion.div>

      {/* Full Song Modal */}
      <AnimatePresence>
        {showFullSongModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullSongModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-modal p-4"
              onClick={() => setShowFullSongModal(false)}
            >
              <motion.div
                className="glass-strong rounded-3xl p-8 max-w-lg w-full text-center"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Heart decoration */}
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: 'easeInOut',
                  }}
                >
                  💝
                </motion.div>

                <h3 className="text-3xl font-bold text-soft-rose mb-4">
                  Loved this song?
                </h3>

                <p className="text-lg text-muted-grey mb-6">
                  This song reminded me of you! 🎵
                  <br />
                  <span className="text-blush font-semibold">
                    Want to hear the complete version?
                  </span>
                </p>

                <p className="text-base text-muted-grey mb-8 italic">
                  "Every note reminds me of you... 💕"
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.a
                    href={slide.content.fullSongUrl || 'https://music.youtube.com/watch?v=8UG8hwSq-r8'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blush to-soft-rose text-white font-semibold rounded-full shadow-lg"
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    🎶 Listen to Complete Song
                  </motion.a>

                  <motion.button
                    onClick={() => setShowFullSongModal(false)}
                    className="px-6 py-3 bg-white/20 text-muted-grey font-semibold rounded-full"
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Maybe Later 💕
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MusicPlayerSlide;
