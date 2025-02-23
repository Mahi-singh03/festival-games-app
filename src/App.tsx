import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Games/CrossZero" element={<h1>Cross Zero</h1>} />
        <Route path="/Games/FlopyBird" element={<h1>Flopy Bird</h1>} />
        <Route path="/Games/QuizzGame" element={<h1>Quizz Game</h1>} />
        <Route path="/Games/MemoryMatch" element={<h1>Memory Game</h1>} />
        <Route path="/Games/BalloonPop" element={<h1>Balloon Pop</h1>} />
        <Route path="/Games/ReactionTester" element={<h1>Reaction Tester</h1>} />
      </Routes>
    </Router>
  );
}

export default App;