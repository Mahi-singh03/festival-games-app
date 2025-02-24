import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCw } from "lucide-react";

import ballon from "../../public/ballon-removebg-preview.png"

type Balloon = {
  id: number;
  x: number;
  y: number;
  popped: boolean;
  speed: number;
};

const BalloonPop: React.FC = () => {
  const navigate = useNavigate();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds game duration
  const [topScore, setTopScore] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  useEffect(() => {
    const balloonInterval = setInterval(() => {
      if (timeLeft > 0 && !gameOver) {
        const newBalloon: Balloon = {
          id: Date.now(),
          x: Math.random() * window.innerWidth * 0.8, // Random x position
          y: 0, // Start from the top
          popped: false,
          speed: 1 + Math.random() * speedMultiplier, // Adjust speed
        };
        setBalloons((prev) => [...prev, newBalloon]);
      }
    }, 1000); // Add a new balloon every second

    const timer = setInterval(() => {
      if (timeLeft > 0 && !gameOver) {
        setTimeLeft((prev) => prev - 1);
        setSpeedMultiplier((prev) => prev + 0.04); // Gradually increase speed
      } else {
        setGameOver(true);
        clearInterval(balloonInterval);
        clearInterval(timer);
      }
    }, 1000); // Update timer every second

    return () => {
      clearInterval(balloonInterval);
      clearInterval(timer);
    };
  }, [timeLeft, gameOver, speedMultiplier]);

  useEffect(() => {
    const moveBalloons = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((balloon) => ({
            ...balloon,
            y: balloon.y + balloon.speed, // Move balloons downwards
          }))
          .filter((balloon) => balloon.y < window.innerHeight) // Remove balloons that go off screen
      );
    }, 16); // Update balloon positions every 16ms (~60fps)

    return () => clearInterval(moveBalloons);
  }, []);

  useEffect(() => {
    const checkGameOver = balloons.some(
      (balloon) => balloon.y >= window.innerHeight - 100 && !balloon.popped
    );
    if (checkGameOver) {
      setGameOver(true);
      if (score > topScore) {
        setTopScore(score); // Update top score if current score is higher
      }
    }
  }, [balloons, score, topScore]);

  const handlePop = (id: number) => {
    setBalloons((prev) =>
      prev.map((balloon) =>
        balloon.id === id ? { ...balloon, popped: true } : balloon
      )
    );
    setScore((prev) => prev + 1);
  };

  const resetGame = () => {
    setBalloons([]);
    setScore(0);
    setGameOver(false);
    setTimeLeft(60);
    setSpeedMultiplier(1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white p-6 relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-4">Balloon Pop Game</h1>
      <p className="text-xl mb-8">Pop as many balloons as you can in 60 seconds!</p>

      {/* Score and Timer */}
      <div className="flex gap-8 mb-8">
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl">
          <p className="text-2xl font-bold">Score</p>
          <p className="text-4xl font-bold">{score}</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl">
          <p className="text-2xl font-bold">Time Left</p>
          <p className="text-4xl font-bold">{timeLeft}</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl">
          <p className="text-2xl font-bold">Top Score</p>
          <p className="text-4xl font-bold">{topScore}</p>
        </div>
      </div>

      {/* Balloons */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute w-19 h-24 cursor-pointer"
            style={{
              left: balloon.x,
              top: balloon.y,
              opacity: balloon.popped ? 0 : 1,
              transition: "opacity 0.2s",
            }}
            onClick={() => handlePop(balloon.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={ballon} // Ensure the image is in the public folder
              alt="balloon"
              className="w-full h-full"
            />
          </motion.div>
        ))}
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
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl text-center shadow-2xl max-w-md w-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-6">Your final score is {score}</p>
            {score > topScore && (
              <p className="text-2xl mb-6">New Top Score! 🎉</p>
            )}
            <div className="flex flex-col gap-4">
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150"
              >
                Restart Game
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

export default BalloonPop;