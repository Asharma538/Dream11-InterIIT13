import React, { useEffect } from 'react'
import "../App.css";
import { useState } from 'react';


export default function PlayQuiz() {
  const questions = [
    {
        "question": "What is the capital of India?",
        "options": ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        "correct-option": "Delhi"
    },
    {
        "question": "What is the capital of USA?",
        "options": ["New York", "Washington DC", "Los Angeles", "Chicago"],
        "correct-option": "Washington DC"
    },
    {
        "question": "What is the capital of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        "correct-option": "Canberra"
    }
  ]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0){
        setSecondsLeft(10);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        return;
    };

    const timerId = setInterval(() => {
      setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option == questions[currentQuestionIndex]["correct-option"]){
        setScore(score+1);
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setSecondsLeft(10);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); 
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex < questions.length) {
    return (
        <div id='start-quiz-background'>
            <div id='quiz-timer'>
                Time Left
                <span>{secondsLeft}</span>
            </div>
            <h2>Q{currentQuestionIndex+1}. {currentQuestion.question}</h2>
            <ul id='start-quiz-options'>
                {currentQuestion.options.map((option, index) => (
                    <div className='start-quiz-option' key={index} onClick={() => handleOptionClick(option)} style={{ backgroundColor:selectedOption==option?"yellow":"white"}}>
                        {index+1}. {option}
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
    )
  } else {
    return (
        <div>
            You Won {score} points
        </div>
    )
  }
}
