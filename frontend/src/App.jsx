import React from 'react'
import './App.css';
import Navbar from './components/Navbar'
import MatchCarousel from './components/MatchCarousel';
import Home from './pages/Home';
import Cricket from './pages/Cricket';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import CricketMatch from './pages/CricketMatch';
import CricketMatchContest from './pages/CricketMatchContest';
import DreamAITeam from './pages/DreamAITeam';

export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/cricket-match" element={<CricketMatch />} />
        <Route path="/cricket-match-contest" element={<CricketMatchContest/>} />
        <Route path='/select-dream-team' element={<DreamAITeam/>} />
      </Routes>
    </Router>
  )
}