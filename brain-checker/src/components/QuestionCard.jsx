import React from "react";

export default function QuestionCard({ question, answers, selectedAnswer, handleAnswer, correctAnswer, showResults }) {
  const getButtonClass = (answer) => {
    let className = "answer-button";
    
    if (selectedAnswer === answer) {
      className += " selected";
    }
    
    if (showResults) {
      if (answer === correctAnswer) {
        className += " correct";
      } else if (selectedAnswer === answer && answer !== correctAnswer) {
        className += " incorrect";
      }
    }
    
    return className;
  };

  return (
    <div className="question-card">
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answer-options">
        {answers.map((ans, i) => (
          <button
            key={i}
            className={getButtonClass(ans)}
            onClick={() => handleAnswer(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
            disabled={!!selectedAnswer}
          />
        ))}
      </div>
    </div>
  );
}
