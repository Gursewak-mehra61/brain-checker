import React from "react";

export default function ResultCard({ score, total, handleRestart }) {
  return (
    <div className="result-card">
      <h2>Quiz Complete!</h2>
      <div className="final-score">Final Score: <b>{score}</b> / {total}</div>
      <button className="restart-btn" onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
}
