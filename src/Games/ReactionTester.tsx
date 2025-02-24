import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReactionTester: React.FC = () => {
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "ended">("waiting");
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const dotSize = 32;
      const maxX = container.width - dotSize;
      const maxY = container.height - dotSize;
      
      setPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY
      });
    }
  };

  const startGame = () => {
    setGameStatus("waiting");
    setReactionTime(0);
    
    const delay = Math.random() * 2000 + 1000;
    timeoutRef.current = setTimeout(() => {
      generateRandomPosition();
      setGameStatus("playing");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameStatus === "playing") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setScores(prev => [...prev, time]);
      setGameStatus("ended");
    } else if (gameStatus === "waiting") {
      setReactionTime(-1);
      setGameStatus("ended");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  };

  const bestScore = scores.length > 0 ? Math.min(...scores) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Reaction Tester</h1>
      
      <div className="flex gap-8 mb-8">
        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-xl">Current</p>
          <p className="text-3xl font-bold">
            {reactionTime > 0 ? `${reactionTime}ms` : "---"}
          </p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl text-center">
          <p className="text-xl">Best</p>
          <p className="text-3xl font-bold">
            {bestScore > 0 ? `${bestScore}ms` : "---"}
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative w-96 h-96 bg-white/10 rounded-xl cursor-pointer"
        onClick={handleClick}
      >
        {gameStatus === "waiting" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <AlertTriangle className="w-16 h-16 text-yellow-400" />
          </motion.div>
        )}

        {gameStatus === "playing" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute w-8 h-8 bg-red-500 rounded-full"
            style={{
              left: position.x,
              top: position.y,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        )}

        {gameStatus === "ended" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {reactionTime > 0 ? (
              <>
                <p className="text-4xl font-bold mb-4">{reactionTime}ms</p>
                <p className="text-xl">Click to try again</p>
              </>
            ) : (
              <>
                <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
                <p className="text-xl">Too early! Click to retry</p>
              </>
            )}
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <motion.button
          onClick={startGame}
          className="px-6 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={24} />
          {scores.length > 0 ? "Play Again" : "Start Game"}
        </motion.button>
        
        <motion.button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 transition-colors duration-150 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={24} />
          Go to Home
        </motion.button>
      </div>

      {scores.length > 0 && (
        <div className="mt-8 bg-white/10 p-4 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Last 5 attempts:</h2>
          <div className="flex gap-4">
            {scores.slice(-5).map((score, index) => (
              <div key={index} className="bg-white/20 px-3 py-2 rounded">
                {score}ms
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionTester;