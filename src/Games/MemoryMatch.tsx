import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const computerEmojis = [
  "💻", "🖥️", "⌨️", "🖱️",
  "🖨️", "📱", "🕹️", "📀"
];

const MemoryGame: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !gameOver) {
        setTimeLeft((prev) => prev - 1);
      } else {
        clearInterval(timer);
        if (timeLeft === 0) setGameOver(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const initializeGame = () => {
    const duplicatedEmojis = [...computerEmojis, ...computerEmojis];
    const shuffledEmojis = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledEmojis.slice(0, 16));
    setFlippedCards([]);
    setTimeLeft(30);
    setGameOver(false);
  };

  const handleCardClick = (id: number) => {
    if (gameOver || flippedCards.includes(id) || cards[id].isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setCards(prev => prev.map(card => 
          card.id === firstId || card.id === secondId 
            ? { ...card, isMatched: true } 
            : card
        ));
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setGameOver(true);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-shadow-lg">Tech Memory Match</h1>

      <div className="mb-8 w-full max-w-2xl px-4">
        <div className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-sm border-2 border-white/20">
          <p className="text-2xl mb-2 text-blue-200">Time Remaining</p>
          <p className="text-5xl font-bold text-green-400 drop-shadow-lg">
            {timeLeft}s
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8 w-full max-w-2xl px-4">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`relative w-24 h-24 flex items-center justify-center cursor-pointer mx-auto
                ${card.isMatched ? 'opacity-0 pointer-events-none' : ''}`}
              onClick={() => handleCardClick(card.id)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`absolute w-full h-full flex items-center justify-center text-5xl
                  rounded-lg border-2 ${
                    flippedCards.includes(card.id) || card.isMatched
                      ? 'bg-white/20 border-blue-400'
                      : 'bg-white/5 border-white/20'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {flippedCards.includes(card.id) || card.isMatched ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="block"
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <span className="text-white/30 text-3xl">?</span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-8 w-full max-w-2xl px-4 justify-center">
        <motion.button
          onClick={initializeGame}
          className="px-10 py-5 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 
            transition-all duration-150 flex items-center gap-2 backdrop-blur-sm border-2 border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw size={32} />
          New Game
        </motion.button>
        
        <motion.button
          onClick={() => navigate("/")}
          className="px-10 py-5 bg-white/20 rounded-xl text-xl font-semibold hover:bg-white/30 
            transition-all duration-150 flex items-center gap-2 backdrop-blur-sm border-2 border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={32} />
          Home
        </motion.button>
      </div>

      <AnimatePresence>
        {(gameOver || cards.every(card => card.isMatched)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-2xl font-bold text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border-2 border-white/20 w-full max-w-2xl"
          >
            <p className={cards.every(card => card.isMatched) ? "text-green-400" : "text-red-400"}>
              {cards.every(card => card.isMatched) 
                ? `🎉 Completed in ${60 - timeLeft}s!` 
                : "⏰ Time's Up!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;