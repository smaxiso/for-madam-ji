import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, buttonHover, modalVariants } from '../../utils/animations';
import { useAudio } from '../../hooks/useAudio';

/**
 * MusicPlayerSlide component - Audio player with controls
 */
function MusicPlayerSlide({ slide }) {
  const { isPlaying, duration, currentTime, play, pause, seek } = useAudio(
    slide.content.audioSrc
  );
  const [showFullSongModal, setShowFullSongModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

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

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="text-center max-w-2xl mx-auto">
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
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
            onClick={handleSeek}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blush to-soft-rose"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-grey mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
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
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  💝
                </motion.div>

                <h3 className="text-3xl font-bold text-soft-rose mb-4">
                  Loved this snippet?
                </h3>

                <p className="text-lg text-muted-grey mb-6">
                  This is just a small piece of the magic! 🎵
                  <br />
                  <span className="text-blush font-semibold">
                    Want to hear the complete song?
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
                    🎶 Listen to Full Song
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
