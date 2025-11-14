import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn, buttonHover } from '../../utils/animations';
import { useConfetti } from '../../hooks/useConfetti';

// Winning combinations
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6], // Diagonals
];

/**
 * TicTacToeSlide component - Interactive Tic-Tac-Toe game
 */
function TicTacToeSlide({ slide }) {
  // Pre-filled board: Player needs to click center (index 4) to win
  // Layout:
  // 💕 | ❌ | 💕
  // ❌ | __ | ❌
  // ❌ | 💕 | 💕
  const initialBoard = ['💕', '❌', '💕', '❌', null, '❌', '❌', '💕', '💕'];
  
  const [board, setBoard] = useState(initialBoard);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [gameMessage, setGameMessage] = useState(slide.content.instructions);
  const [shakeCell, setShakeCell] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const { burst } = useConfetti();
  const timeoutsRef = useRef([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  // Floating hearts animation data
  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 3 + Math.random() * 2,
    x: Math.random() * 100,
  }));

  // Check for winner
  const checkWinner = (currentBoard) => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line };
      }
    }
    
    return null;
  };

  // Handle cell click
  const handleCellClick = (index) => {
    // Only allow clicking the center cell (index 4) if game not won
    if (board[index] || winner) return;
    
    // If wrong cell clicked, shake it
    if (index !== 4) {
      setShakeCell(index);
      const shakeTimeout = setTimeout(() => setShakeCell(null), 500);
      timeoutsRef.current.push(shakeTimeout);
      return;
    }

    const newBoard = [...board];
    newBoard[index] = '💕';
    setBoard(newBoard);

    // Check if player won
    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    }
  };

  // Handle game end
  const handleGameEnd = (result) => {
    setWinner(result.winner);
    setWinningLine(result.line);

    if (result.winner === '💕') {
      setGameMessage(slide.content.winMessage);
      setShowVictory(true);
      const burstTimeout = setTimeout(() => burst(), 300);
      timeoutsRef.current.push(burstTimeout);
    }
  };

  // Reset game
  const resetGame = () => {
    // Clear all pending timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
    
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine(null);
    setGameMessage(slide.content.instructions);
    setShowVictory(false);
  };

  return (
    <div className="text-center max-w-md mx-auto px-4 pb-12 relative">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl opacity-20"
            initial={{ y: '100vh', x: `${heart.x}%` }}
            animate={{ 
              y: '-100px',
              x: `${heart.x + Math.sin(heart.id) * 20}%`,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Heading with gradient - Hide after winning */}
      {!winner && (
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blush via-soft-rose to-blush bg-clip-text text-transparent relative z-10"
          variants={fadeInUp}
          style={{
            backgroundSize: '200% auto',
          }}
          animate={{
            backgroundPosition: ['0%', '100%', '0%'],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }
          }}
        >
          {slide.content.heading}
        </motion.h2>
      )}

      {/* Message - Only show instructions when not won */}
      {!winner && (
        <motion.p
          className="text-base md:text-lg text-muted-grey mb-6 relative z-10"
          variants={fadeInUp}
        >
          {slide.content.instructions}
        </motion.p>
      )}

      {/* Win message - Animated on victory */}
      {winner && (
        <motion.p
          className="text-xl md:text-2xl font-bold mb-6 relative z-10 bg-gradient-to-r from-blush via-soft-rose to-peach bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          transition={{ 
            type: 'spring',
            damping: 10,
            delay: 0.3,
          }}
          style={{
            backgroundSize: '200% auto',
            textShadow: '0 2px 20px rgba(255, 154, 177, 0.3)',
          }}
        >
          <motion.span
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ display: 'inline-block' }}
          >
            {slide.content.winMessage}
          </motion.span>
        </motion.p>
      )}

      {/* Game Board */}
      <motion.div
        className="glass-medium rounded-2xl p-4 md:p-6 mb-8 relative z-10"
        variants={scaleIn}
        style={{
          boxShadow: `
            0 10px 40px rgba(255, 154, 177, 0.2),
            0 5px 20px rgba(192, 108, 132, 0.15)
          `,
        }}
      >
        <div className="grid grid-cols-3 gap-3 relative">
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index);
            const isPlayableCell = index === 4 && !cell && !winner;
            const isShaking = shakeCell === index;
            
            return (
              <motion.button
                key={index}
                onClick={() => handleCellClick(index)}
                className={`aspect-square rounded-xl text-3xl md:text-4xl font-bold flex items-center justify-center transition-all relative overflow-hidden ${
                  cell
                    ? 'cursor-default'
                    : isPlayableCell
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-50'
                }`}
                style={{
                  background: isWinningCell
                    ? 'linear-gradient(135deg, rgba(255, 154, 177, 0.4), rgba(192, 108, 132, 0.4))'
                    : cell
                    ? 'rgba(255, 255, 255, 0.3)'
                    : isPlayableCell
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 154, 177, 0.1))'
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: isPlayableCell
                    ? '0 0 20px rgba(255, 154, 177, 0.3), inset 0 0 10px rgba(255, 154, 177, 0.2)'
                    : isWinningCell
                    ? '0 0 30px rgba(255, 154, 177, 0.6)'
                    : 'none',
                }}
                variants={buttonHover}
                whileHover={isPlayableCell ? 'hover' : ''}
                whileTap={isPlayableCell ? 'tap' : ''}
                animate={{
                  scale: isWinningCell ? 1.1 : isPlayableCell && !winner ? 1.05 : 1,
                  x: isShaking ? [-5, 5, -5, 5, 0] : 0,
                  rotate: isWinningCell ? [0, 5, -5, 0] : 0,
                }}
                transition={{
                  scale: {
                    duration: isPlayableCell ? 1.5 : 0.5,
                    repeat: isPlayableCell && !winner ? Infinity : isWinningCell ? Infinity : 0,
                    repeatType: 'reverse',
                  },
                  x: { duration: 0.4 },
                  rotate: { 
                    duration: 0.5, 
                    repeat: isWinningCell ? Infinity : 0,
                    repeatType: 'reverse',
                  },
                }}
                disabled={winner || cell || index !== 4}
              >
                {/* Sparkle effect for playable cell */}
                {isPlayableCell && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blush/20 to-soft-rose/20 rounded-xl"
                      animate={{
                        opacity: 0.6,
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute top-1 right-1 text-xs"
                      animate={{
                        scale: 1.3,
                        rotate: 180,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    >
                      ✨
                    </motion.div>
                  </>
                )}
                
                {/* Glow effect for winning cells */}
                {isWinningCell && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-blush/40 to-transparent rounded-xl"
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                )}

                {/* Cell content with entrance animation */}
                <motion.span
                  className="relative z-10"
                  initial={false}
                  animate={cell ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: 'spring', damping: 10 }}
                  key={cell} // Re-trigger animation when cell changes
                >
                  {cell || (isPlayableCell ? '?' : '')}
                </motion.span>
              </motion.button>
            );
          })}

          {/* Winning line overlay - Animated and eye-catching */}
          {winningLine && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                {/* Main animated line */}
                <motion.line
                  x1={`${(winningLine[0] % 3) * 33.33 + 16.66}%`}
                  y1={`${Math.floor(winningLine[0] / 3) * 33.33 + 16.66}%`}
                  x2={`${(winningLine[2] % 3) * 33.33 + 16.66}%`}
                  y2={`${Math.floor(winningLine[2] / 3) * 33.33 + 16.66}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, strokeWidth: 8 }}
                  animate={{ 
                    pathLength: 1,
                    strokeWidth: [8, 10, 8],
                  }}
                  transition={{ 
                    pathLength: { duration: 0.5, ease: 'easeInOut' },
                    strokeWidth: { duration: 1, repeat: Infinity, repeatType: 'reverse' },
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(255, 154, 177, 1)) drop-shadow(0 0 20px rgba(255, 122, 182, 0.6))',
                  }}
                />
                
                {/* Glowing background line */}
                <motion.line
                  x1={`${(winningLine[0] % 3) * 33.33 + 16.66}%`}
                  y1={`${Math.floor(winningLine[0] / 3) * 33.33 + 16.66}%`}
                  x2={`${(winningLine[2] % 3) * 33.33 + 16.66}%`}
                  y2={`${Math.floor(winningLine[2] / 3) * 33.33 + 16.66}%`}
                  stroke="url(#lineGlowGradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    pathLength: { duration: 0.5, ease: 'easeInOut', delay: 0.1 },
                    opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
                  }}
                />
                
                {/* Sparkles along the line */}
                {[0, 1, 2].map((idx) => (
                  <motion.circle
                    key={idx}
                    cx={`${(winningLine[idx] % 3) * 33.33 + 16.66}%`}
                    cy={`${Math.floor(winningLine[idx] / 3) * 33.33 + 16.66}%`}
                    r="4"
                    fill="#FFD29E"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ 
                      delay: 0.5 + idx * 0.1,
                      duration: 0.4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      repeatDelay: 2,
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(255, 210, 158, 0.8))',
                    }}
                  />
                ))}
                
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9AB1">
                      <animate attributeName="stop-color" values="#FF9AB1;#FF7AB6;#FF9AB1" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="50%" stopColor="#FF7AB6">
                      <animate attributeName="stop-color" values="#FF7AB6;#FFD29E;#FF7AB6" dur="2s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#FFD29E">
                      <animate attributeName="stop-color" values="#FFD29E;#FF9AB1;#FFD29E" dur="2s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                  
                  <linearGradient id="lineGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9AB1" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FF7AB6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFD29E" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Victory emoji reaction */}
      {showVictory && (
        <motion.div
          className="text-6xl mb-4 relative z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1,
            rotate: 0,
          }}
          transition={{ 
            type: 'spring',
            damping: 8,
          }}
        >
          🎉💕✨
        </motion.div>
      )}

      {/* Reset Button */}
      {winner && (
        <motion.button
          onClick={resetGame}
          className="px-8 py-4 bg-gradient-to-r from-blush via-soft-rose to-peach text-white font-bold rounded-full shadow-lg relative overflow-hidden"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            boxShadow: '0 10px 30px rgba(255, 154, 177, 0.4)',
          }}
        >
          <motion.span
            className="relative z-10"
            animate={{ scale: 1.05 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            Play Again! 🎮
          </motion.span>
          
          {/* Button shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.button>
      )}
    </div>
  );
}

export default TicTacToeSlide;
