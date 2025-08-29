import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import ScoreCard from "./ScoreCard";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import { fetchQuizQuestions } from "../api/quizApi";

const QUESTION_COUNT = 10; // Number of puzzles

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showAnswerResults, setShowAnswerResults] = useState(false);

  // Fetch quiz data initially
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setError("");
    setShowResult(false);
    setScore(0);
    setCurrIdx(0);
    setSelectedAnswer(null);
    setShowAnswerResults(false);

    try {
      const data = await fetchQuizQuestions(QUESTION_COUNT);
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleAnswer = (ans) => {
    setSelectedAnswer(ans);
    setShowAnswerResults(true);
    
    if (questions[currIdx].correct_answer === ans) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currIdx + 1 < questions.length) {
        setCurrIdx(currIdx + 1);
        setSelectedAnswer(null);
        setShowAnswerResults(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    loadQuestions();
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">{error}</div>;

  if (showResult) {
    return <ResultCard score={score} total={questions.length} handleRestart={handleRestart} />;
  }

  return (
    <div className="quiz-box">
      <ScoreCard score={score} total={questions.length} />
      <QuestionCard
        question={questions[currIdx].question}
        answers={questions[currIdx].answers}
        selectedAnswer={selectedAnswer}
        handleAnswer={handleAnswer}
        correctAnswer={questions[currIdx].correct_answer}
        showResults={showAnswerResults}
      />
      <div className="q-count">
        Puzzle {currIdx + 1} of {questions.length}
      </div>
    </div>
  );
}
