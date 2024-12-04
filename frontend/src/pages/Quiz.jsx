import React from 'react'
import "../App.css";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const navigate = useNavigate();
  return (
    <div id='quiz-background'>
      <Navbar/>
      <div id="quiz-title-text">
        <span>Fantasy Quiz</span> <p>By</p> <img src="src/assets/dream_11.png" alt="" width="160px" height="40px" />
      </div>
      <div id="quiz-desc">
        <div>
          <u><center>Quiz Rules:</center></u>
          1. You will get 10 MCQ Questions
          <br />
          2. You will get 10 MCQ Questions
          <br />
          3. Answer the questions in the given time frame
        </div>
        <div>
            <u><center>Condition For Discount:</center></u>
            1. 10 correct &rarr; ₹10 discount on entry fees <br />
            2. 9 correct &rarr; ₹9 discount on entry fees  <br />
            3. 8 correct &rarr; ₹8 discount on entry fees <br />
        </div>
      </div>
      <img id='quiz-img-1' src="src/assets/fantasy_quiz-4.png" alt="" />
      <img id='quiz-img-2' src="src/assets/fantasy_quiz.png" alt="" />
        {
          sessionStorage.getItem("quiz-taken")?
          <button id='quiz-play-button' onClick={()=>{navigate("/start-quiz")}} disabled> Played </button>
          :
          <button id='quiz-play-button' onClick={()=>{navigate("/start-quiz")}} > PLAY </button>
        }
    </div>
  )
}
