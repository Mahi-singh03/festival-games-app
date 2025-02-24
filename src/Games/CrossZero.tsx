import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Add this import

type Player = "O" | "X" | null;
type BoardState = Player[];
type Score = { O: number; X: number };

const CrossZero: React.FC = () => {
  const navigate = useNavigate(); // Add this hook
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isStudentTurn, setIsStudentTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [score, setScore] = useState<Score>({ O: 0, X: 0 });
  const [rounds, setRounds] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // ... (keep previous code the same until the return statement)

  const goToHome = () => {
    navigate("/"); // Update this path to match your home route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white p-6 relative">
      {/* ... (keep previous JSX the same until gameOver section) */}

      {gameOver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl text-center 
                       shadow-2xl max-w-md w-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {score.O > score.X ? "🏆 Students Win the Series!" : "💻 SkillUp Wins the Series!"}
            </h2>
            <p className="text-2xl mb-6">
              Final Score: {score.O} - {score.X}
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold
                           hover:bg-white/30 transition-colors duration-150"
              >
                Try Again
              </button>
              <button
                onClick={goToHome}
                className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold
                           hover:bg-white/30 transition-colors duration-150"
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ... (rest of the JSX remains the same) */}
    </div>
  );
};

export default CrossZero;