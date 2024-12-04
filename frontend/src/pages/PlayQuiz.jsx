import React, { useEffect } from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

var answered = false;
var start = false;

export default function PlayQuiz() {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    await fetch("http://10.36.16.97:11434/api/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "phi3:14b",
        prompt: "Generate a quiz about Cricket focusing on player facts as questions. Provide 10 questions in the following format. Don't give any starter text. Give the json list in the format: { 'question':'question text goes here','options':['A. Option Text','B. Option Text','C. Text','D. Option Text'],'correct-option':'Correct Option Text'}",
        stream: false,
      }),
      headers: {
        "Content-type": "text/plain",
      },
    })
    .then((res) => res.json())
    .then(res=>{
      const qns = JSON.parse(res.response);
      console.log(qns);
      setQuestions(qns);
      start = true;
    })
    .catch(err=>console.log(err));
  }

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
      if (start) setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
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
  if (questions.length == 0) {
    return (
      <div id="start-quiz-background">
        <h2>
          Loading....
        </h2>
      </div>
    )
  }
  else if (currentQuestionIndex < questions.length) {
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
          {
            score>=8?
              <div>
                Congratulations!! <br />
                You've got {score}/10 Questions correct!
                <br />
                You are eligible for ₹{score} discount on entry fees  
              </div>:
              <div>
              <br /> <br />
                Sorry, you're not eligible for the discount
              </div>
          }
          <br /> <br />
        </div>
        <img id='quiz-img-1' src="src/assets/fantasy_quiz-4.png" alt="" />
        <img id='quiz-img-2' src="src/assets/fantasy_quiz.png" alt="" />
      </div>
    )
  }
}
