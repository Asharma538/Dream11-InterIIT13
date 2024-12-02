import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

var answered = false;
export default function PlayQuiz() {
  const questions = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      "correct-option": "Delhi",
    },
    {
      question: "What is the capital of USA?",
      options: ["New York", "Washington DC", "Los Angeles", "Chicago"],
      "correct-option": "Washington DC",
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      "correct-option": "Canberra",
    },
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft <= 0) {
      answered = false;
      setSecondsLeft(10);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(answered,option,score);
    if (option == questions[currentQuestionIndex]["correct-option"]) {
      answered = true;
      setScore(score + 1);
    }
    else if (answered && option != questions[currentQuestionIndex]["correct-option"]) {
      setScore(score - 1);
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setSecondsLeft(10);
    answered = false;
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const complete_quiz = () => {
    sessionStorage.setItem("quiz-taken",true)
    // setTimeout(()=>{
    //   navigate('/cricket-match-contest');
    // },5000)
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex < questions.length) {
    return (
      <div id="start-quiz-background">
        <div id="quiz-timer">
          Time Left
          <span>{secondsLeft}</span>
        </div>
        <h2>
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>
        <ul id="start-quiz-options">
          {currentQuestion.options.map((option, index) => (
            <div
              className="start-quiz-option"
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                backgroundColor: selectedOption == option ? "yellow" : "white",
              }}
            >
              {index + 1}. {option}
            </div>
          ))}
        </ul>
        {currentQuestionIndex < questions.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {currentQuestionIndex == questions.length - 1 && (
          <button onClick={handleNextClick}>Complete</button>
        )}
      </div>
    );
  } else {
    return (
      <div id='quiz-background'>
        <Navbar/>
        <div id="quiz-title-text">
          <span>Fantasy Quiz</span> <p>By</p> <img src="src/assets/dream_11.png" alt="" width="160px" height="40px" />
        </div>
        <div id="quiz-result-desc">
          <u><span>Quiz Results:</span></u>
          <br /> <br />
          Congratulations!! <br />
          You've got {score}/10 Questions correct!
          <br /> <br />
          The Joining Price will be reduced by Rs. 10
        </div>
        <img id='quiz-img-1' src="src/assets/fantasy_quiz-3.png" alt="" />
        <img id='quiz-img-2' src="src/assets/fantasy_quiz.png" alt="" />
      </div>
    )
  }
}
