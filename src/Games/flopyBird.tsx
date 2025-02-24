import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Pipe = {
  id: number;
  x: number;
  height: number;
  passed: boolean; // Track if the pipe has been passed
};

const FlappyBird: React.FC = () => {
  const navigate = useNavigate();
  const [birdY, setBirdY] = useState<number>(window.innerHeight / 2);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(0); // Track best score
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const gravity = useRef<number>(0.8); // Increased gravity for harder gameplay
  const velocity = useRef<number>(0); // Bird's vertical velocity
  const pipeInterval = useRef<number>(1500); // Reduced time between pipes
  const gameLoopRef = useRef<number | null>(null);

  useEffect(() => {
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem("bestScore");
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && gameStarted && !gameOver) {
        velocity.current = -7; // Flap upwards
      } else if (event.code === "Enter" && !gameStarted) {
        setGameStarted(true); // Start the game on Enter
      }
    };

    const handleClick = () => {
      if (gameStarted && !gameOver) {
        velocity.current = -7; // Flap upwards
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const generatePipes = setInterval(() => {
      if (gameStarted && !gameOver) {
        const newPipe: Pipe = {
          id: Date.now(),
          x: window.innerWidth,
          height: Math.random() * (window.innerHeight / 2) + 100, // Random pipe height
          passed: false, // Initially not passed
        };
        setPipes((prev) => [...prev, newPipe]);
      }
    }, pipeInterval.current);

    return () => clearInterval(generatePipes);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const movePipes = setInterval(() => {
      if (gameStarted && !gameOver) {
        setPipes((prev) =>
          prev
            .map((pipe) => ({ ...pipe, x: pipe.x - 5 })) // Increased pipe speed
            .filter((pipe) => pipe.x > -100) // Remove off-screen pipes
        );
      }
    }, 16); // Update pipe positions every 16ms (~60fps)

    return () => clearInterval(movePipes);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const checkCollisions = () => {
      const birdRect = {
        x: 50,
        y: birdY,
        width: 40,
        height: 40,
      };

      for (const pipe of pipes) {
        const pipeRectTop = {
          x: pipe.x,
          y: 0,
          width: 60,
          height: pipe.height,
        };
        const pipeRectBottom = {
          x: pipe.x,
          y: pipe.height + 120, // Reduced gap between pipes for harder gameplay
          width: 60,
          height: window.innerHeight - pipe.height - 120,
        };

        if (
          birdRect.x < pipeRectTop.x + pipeRectTop.width &&
          birdRect.x + birdRect.width > pipeRectTop.x &&
          birdRect.y < pipeRectTop.y + pipeRectTop.height &&
          birdRect.y + birdRect.height > pipeRectTop.y
        ) {
          setGameOver(true);
        }

        if (
          birdRect.x < pipeRectBottom.x + pipeRectBottom.width &&
          birdRect.x + birdRect.width > pipeRectBottom.x &&
          birdRect.y < pipeRectBottom.y + pipeRectBottom.height &&
          birdRect.y + birdRect.height > pipeRectBottom.y
        ) {
          setGameOver(true);
        }

        // Update score if the bird passes a pipe
        if (!pipe.passed && birdRect.x > pipe.x + 60) {
          setScore((prev) => prev + 1);
          pipe.passed = true; // Mark the pipe as passed
        }
      }

      // Check if bird hits the ground
      if (birdY + 40 > window.innerHeight) {
        setGameOver(true);
      }
    };

    gameLoopRef.current = requestAnimationFrame(() => {
      if (gameStarted && !gameOver) {
        velocity.current += gravity.current; // Apply gravity
        setBirdY((prev) => Math.max(0, prev + velocity.current)); // Update bird position
        checkCollisions();
      }
    });

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [birdY, gameStarted, gameOver, pipes]);

  useEffect(() => {
    if (gameOver) {
      if (score > bestScore) {
        setBestScore(score); // Update best score
        localStorage.setItem("bestScore", score.toString()); // Save to localStorage
      }
    }
  }, [gameOver, score, bestScore]);

  const resetGame = () => {
    setBirdY(window.innerHeight / 2);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    velocity.current = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white p-6 relative overflow-hidden">
      {/* Hide everything except the game when it starts */}
      {!gameStarted && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Flappy Bird</h1>
          <p className="text-xl mb-8">Press Enter to Start</p>
        </div>
      )}

      {/* Game Elements */}
      {gameStarted && (
        <>
          {/* Bird */}
          <motion.div
            className="absolute w-10 h-10 bg-yellow-400 rounded-full"
            style={{
              left: 50,
              top: birdY,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />

          {/* Pipes */}
          {pipes.map((pipe) => (
            <React.Fragment key={pipe.id}>
              <div
                className="absolute bg-green-500"
                style={{
                  left: pipe.x,
                  top: 0,
                  width: 60,
                  height: pipe.height,
                }}
              />
              <div
                className="absolute bg-green-500"
                style={{
                  left: pipe.x,
                  top: pipe.height + 120, // Reduced gap between pipes
                  width: 60,
                  height: window.innerHeight - pipe.height - 120,
                }}
              />
            </React.Fragment>
          ))}
        </>
      )}

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
            <p className="text-2xl mb-6">Best Score: {bestScore}</p>
            {score > bestScore && (
              <p className="text-2xl mb-6">New Best Score! 🎉</p>
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

export default FlappyBird;