import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Brain, Bird, HelpCircle, PartyPopper, Timer } from "lucide-react";
import logo from "../../public/Skill up (2).png"

// Define TypeScript interface for games
interface Game {
  name: string;
  path: string;
  icon: JSX.Element;
}

// Define colorful game icons
const games: Game[] = [
  { name: "Cross Zero", path: "/Games/CrossZero", icon: <Gamepad2 className="w-7 h-7 text-blue-400 drop-shadow-lg" /> },
  { name: "Memory Match", path: "/Games/MemoryMatch", icon: <Brain className="w-7 h-7 text-green-400 drop-shadow-lg" /> },
  { name: "Flopy Bird", path: "/Games/FlopyBird", icon: <Bird className="w-7 h-7 text-red-400 drop-shadow-lg" /> },
  { name: "Quiz Game", path: "/Games/QuizzGame", icon: <HelpCircle className="w-7 h-7 text-yellow-400 drop-shadow-lg" /> },
  { name: "Balloon Pop", path: "/Games/BalloonPop", icon: <PartyPopper className="w-7 h-7 text-pink-400 drop-shadow-lg" /> },
  { name: "Reaction Tester", path: "/Games/ReactionTester", icon: <Timer className="w-7 h-7 text-purple-400 drop-shadow-lg" /> },
];

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 text-white overflow-hidden p-6">
      {/* Floating Elements for Dynamic Effect */}
      <motion.div
        className="absolute top-16 left-10 w-16 h-16 bg-pink-500 rounded-full opacity-50 blur-xl"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-40 blur-xl"
        animate={{ x: [0, -20, 20, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Logo Section */}
      <motion.div
        className="mb-6 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-76 h-76 bg-white rounded-full flex items-center justify-center shadow-2xl p-2 border-4 border-indigo-400"
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img
            src={logo}
            alt="SkillUp Games Logo"
            className="w-full h-full object-contain rounded-full"
            loading="lazy"
          />
        </motion.div>
        <h1 className="text-5xl font-extrabold mt-4 animate-pulse drop-shadow-lg tracking-wide">
          SkillUp Games Hub 🎮
        </h1>
      </motion.div>

      {/* Game List */}
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-md border border-white/20"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ul className="space-y-4">
          {games.map((game, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                className="flex items-center space-x-3 text-lg text-black font-semibold hover:text-blue-300 transition duration-300"
                to={game.path}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  {game.icon}
                </motion.div>
                <span>{game.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default React.memo(Home);
