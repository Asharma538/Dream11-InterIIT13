import React from 'react'
import './App.css';
import Navbar from './components/Navbar'
import MatchCarousel from './components/MatchCarousel';
import Home from './pages/Home';
import Cricket from './pages/Cricket';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import CricketMatch from './pages/CricketMatch';

export default function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/cricket-match" element={<CricketMatch />} />
      </Routes>
    </Router>
  )
}