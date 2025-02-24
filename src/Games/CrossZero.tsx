import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Circle, Home, RefreshCw } from "lucide-react";

type Player = "O" | "X" | "draw" | null;
type BoardState = Player[];
type Score = { O: number; X: number };
type MatchResult = { round: number; winner: Player };

const rewards = [
  "25% off on any course",
  "3 days free trial classes",
  "6 days free classes",
  "SkillUp merchandise"
];

const CrossZero: React.FC = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isStudentTurn, setIsStudentTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player>(null);
  const [score, setScore] = useState<Score>({ O: 0, X: 0 });
  const [rounds, setRounds] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [reward, setReward] = useState<string | null>(null);

  useEffect(() => {
    if (!isStudentTurn && !winner && !finalWinner) {
      setTimeout(computerMove, 500);
    }
  }, [isStudentTurn]);

  const handleClick = (index: number) => {
    if (board[index] || winner || finalWinner) return;
    const newBoard = [...board];
    newBoard[index] = "O";
    setBoard(newBoard);
    setIsStudentTurn(false);
    checkWinner(newBoard);
  };

  const computerMove = () => {
    const availableIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null) as number[];

    let moveIndex = findWinningMove("X", board); // Try to win
    if (moveIndex === -1) {
      moveIndex = findWinningMove("O", board); // Block the student
    }
    if (moveIndex === -1) {
      moveIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]; // Random move
    }

    const newBoard = [...board];
    newBoard[moveIndex] = "X";
    setBoard(newBoard);
    setIsStudentTurn(true);
    checkWinner(newBoard);
  };

  const findWinningMove = (player: Player, board: BoardState): number => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && board[c] === null) return c;
      if (board[a] === player && board[c] === player && board[b] === null) return b;
      if (board[b] === player && board[c] === player && board[a] === null) return a;
    }
    return -1; // No winning move found
  };

  const checkWinner = (currentBoard: BoardState) => {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        const matchWinner = currentBoard[a]; // Correctly set the winner based on the board value
        setWinner(matchWinner);
        updateScore(matchWinner);
        return;
      }
    }
    if (!currentBoard.includes(null)) {
      setWinner("draw");
      setTimeout(resetBoard, 1000);
    }
  };

  const updateScore = (winner: Player) => {
    if (winner && winner !== "draw") {
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
    setRounds((prev) => prev + 1);
    setMatchResults((prev) => [...prev, { round: rounds + 1, winner }]);

    if (score.X + (winner === "X" ? 1 : 0) >= 2) {
      setFinalWinner("SkillUp");
      setGameOver(true);
      setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    } else if (score.O + (winner === "O" ? 1 : 0) >= 2) {
      setFinalWinner("Students");
      setGameOver(true);
      setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    } else {
      setTimeout(resetBoard, 1000);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsStudentTurn(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setScore({ O: 0, X: 0 });
    setRounds(0);
    setGameOver(false);
    setFinalWinner(null);
    setIsStudentTurn(true);
    setMatchResults([]);
    setReward(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white p-6 relative">
      <h1 className="text-4xl font-bold mb-4">CrossZero - Best of 3</h1>
      <p className="text-xl mb-8">Students (O) vs SkillUp (X)</p>

      {/* Main Content: Game Board and Scoreboard Side by Side */}
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl p">
        {/* Game Board */}
        <div className="flex-1 flex flex-col items-center">
          <motion.div
            className="text-xl mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!finalWinner && <p>{isStudentTurn ? "Students' Turn (O)" : "SkillUp's Turn (X)"}</p>}
          </motion.div>
          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                className="w-32 h-32 flex items-center justify-center bg-white/20 rounded-xl text-5xl font-bold hover:bg-white/30 transition-colors duration-150"
                onClick={() => handleClick(index)}
                disabled={!!cell || !!finalWinner}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {cell === "O" ? (
                  <Circle className="text-green-400" size={60} />
                ) : cell === "X" ? (
                  <X className="text-red-400" size={60} />
                ) : (
                  ""
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scoreboard */}
        <div className="flex-1 flex flex-col items-center p-8 m-8">
          <div className="flex flex-col gap-6 py-1">
            <motion.div
              className="flex flex-col items-center p-8 bg-white/10 rounded-xl w-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Circle className="text-green-400" size={48} />
              <p className="text-2xl font-bold mt-2">Students</p>
              <p className="text-4xl font-bold">{score.O}</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center p-6 bg-white/10 rounded-xl w-64"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <X className="text-red-400" size={48} />
              <p className="text-2xl font-bold mt-2">SkillUp</p>
              <p className="text-4xl font-bold">{score.X}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={resetGame}
          className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={24} />
          Restart Game
        </motion.button>
        <motion.button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={24} />
          Go to Home
        </motion.button>
      </div>

      {/* Game Over Modal */}
      {finalWinner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl text-center shadow-2xl max-w-md w-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">{finalWinner} Wins the Series! 🏆</h2>
            <p className="text-2xl mb-6">
              Final Score: {score.O} - {score.X}
            </p>
            {reward && <p className="text-xl mb-6">Reward: {reward}</p>}
            <div className="flex flex-col gap-4">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150"
              >
                Restart Series
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150"
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CrossZero;