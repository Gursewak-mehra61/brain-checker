import React from "react";
import Quiz from "./components/Quiz";

export default function App() {
  return (
    <div className="app-container">
      <h1>Brain Checker - Puzzle Quiz</h1>
      <Quiz />
      <footer>
        <small>
          &copy; {new Date().getFullYear()} Brain Checker Assignment · Created for Anslation Internship
        </small>
      </footer>
    </div>
  );
}
