import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import './App.css';

import CrossZero from "./Games/CrossZero.tsx"
import BalloonPop from "./Games/BalloonPop.tsx"
import FlappyBird from "./Games/flopyBird.tsx"
import ReactionTester from "./Games/ReactionTester.tsx"
import MemoryGame from "./Games/MemoryMatch.tsx"
import QuizGame from "./Games/QuizGames.tsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games/CrossZero" element={<CrossZero/>} />
        <Route path="/Games/FlopyBird" element={< FlappyBird/>} />
        <Route path="/Games/QuizzGame" element={<QuizGame/>} />
        <Route path="/Games/MemoryMatch" element={<MemoryGame/>} />
        <Route path="/Games/BalloonPop" element={< BalloonPop/>} />
        <Route path="/Games/ReactionTester" element={<ReactionTester/>} />
      </Routes>
    </Router>
  );
}

export default App;