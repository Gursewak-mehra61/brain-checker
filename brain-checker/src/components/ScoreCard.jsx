import React from "react";

export default function ScoreCard({ score, total }) {
  return (
    <div className="score-card">
      <span className="score-text">Score:</span>
      <span className="score-value">{score} / {total}</span>
    </div>
  );
}
