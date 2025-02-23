import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 text-white">
      <div className="logo-placeholder mb-8">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img 
            src="logo-placeholder.png" 
            alt="Logo Placeholder" 
            className="w-full h-full object-contain" 
            loading="lazy" // Lazy load the image
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-6 animate-pulse">Welcome to SkillUp Games!</h1>
      <ul className="space-y-4">
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/CrossZero">Game 1: Cross Zero</Link></li>
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/MemoryMatch">Game 2: Memory Match</Link></li>
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/FlopyBird">Game 3: Flopy Bird</Link></li>
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/QuizzGame">Game 4: Quizz Game</Link></li>
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/BalloonPop">Game 4: Balloon Pop</Link></li>
        <li><Link className="text-xl hover:underline hover:text-yellow-300 transition duration-300" to="/Games/ReactionTester">Game 5: Reaction tester</Link></li>
      </ul>
    </div>
  );
};

export default React.memo(Home); // Memoize the Home component
