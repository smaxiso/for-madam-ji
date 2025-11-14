import { useState, useEffect } from 'react';
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
  const { burst } = useConfetti();

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
    if (board[index] || winner || index !== 4) return;

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
      burst();
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setWinningLine(null);
    setGameMessage(slide.content.instructions);
  };

  return (
    <div className="text-center max-w-md mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-bold text-soft-rose mb-4"
        variants={fadeInUp}
      >
        {slide.content.heading}
      </motion.h2>

      {/* Message */}
      <motion.p
        className="text-lg text-muted-grey mb-6"
        variants={fadeInUp}
      >
        {gameMessage}
      </motion.p>

      {/* Game Board */}
      <motion.div
        className="glass-medium rounded-2xl p-6 mb-6 relative z-10"
        variants={scaleIn}
      >
        <div className="grid grid-cols-3 gap-3">
          {board.map((cell, index) => (
            <motion.button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`aspect-square rounded-xl text-4xl font-bold flex items-center justify-center transition-all relative z-20 ${
                cell
                  ? 'bg-white/30 cursor-default'
                  : index === 4
                  ? 'bg-white/10 hover:bg-white/20 cursor-pointer ring-2 ring-soft-rose ring-opacity-50'
                  : 'bg-white/30 cursor-not-allowed opacity-50'
              } ${
                winningLine?.includes(index) ? 'bg-blush/30 scale-110' : ''
              }`}
              variants={buttonHover}
              whileHover={!cell && index === 4 && !winner ? 'hover' : ''}
              whileTap={!cell && index === 4 && !winner ? 'tap' : ''}
              disabled={winner || cell || index !== 4}
              style={{ pointerEvents: 'auto' }}
            >
              {cell || (index === 4 && !winner ? '?' : '')}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Reset Button */}
      {winner && (
        <motion.button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-blush to-soft-rose text-white font-semibold rounded-full shadow-lg"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Play Again! 🎮
        </motion.button>
      )}
    </div>
  );
}

export default TicTacToeSlide;
