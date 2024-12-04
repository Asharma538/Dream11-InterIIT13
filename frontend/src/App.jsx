import React from 'react'
import './App.css';
import Home from './pages/Home';
import Cricket from './pages/Cricket';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import CricketMatch from './pages/CricketMatch';
import CricketMatchContest from './pages/CricketMatchContest';
import TeamPreview from './pages/TeamPreview';
import DreamAITeam from './pages/DreamAITeam';
import ConfirmYourTeam from './pages/ConfirmYourTeam';
import Quiz from './pages/Quiz';
import PlayQuiz from './pages/PlayQuiz';
import DreamAI from "./pages/DreamAI";
import TeamPredictor from './pages/TeamPredictor';

export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/cricket-match" element={<CricketMatch />} />
        <Route path="/cricket-match-contest" element={<CricketMatchContest/>} />
        <Route path="/team-preview" element={<TeamPreview/>} />
        <Route path='/select-dream-team' element={<DreamAITeam/>} />
        <Route path='/confirm-your-team' element={<ConfirmYourTeam/>} />
        <Route path='/quiz' element={<Quiz/>} />
        <Route path='/start-quiz' element={<PlayQuiz/>} />
        <Route path='/dream-ai' element={<DreamAI/>} />
        <Route path='/predict-team' element={<TeamPredictor/>} />
      </Routes>
    </Router>
  )
}