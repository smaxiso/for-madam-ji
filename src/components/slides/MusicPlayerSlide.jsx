import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, buttonHover } from '../../utils/animations';
import { useAudio } from '../../hooks/useAudio';

/**
 * MusicPlayerSlide component - Audio player with controls
 */
function MusicPlayerSlide({ slide }) {
  const { isPlaying, duration, currentTime, play, pause, seek } = useAudio(
    slide.content.audioSrc
  );

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
    </div>
  );
}

export default MusicPlayerSlide;
