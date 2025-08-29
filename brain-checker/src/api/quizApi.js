/**
 * Fetches questions from The Trivia API.
 * @param {number} amount
 * @returns {Promise<Array>}
 */
export const fetchQuizQuestions = async (amount = 10) => {
  const fetchAmount = Math.max(1, Math.min(amount, 50));
  const endpoint = `https://the-trivia-api.com/v2/questions?limit=${fetchAmount}`;
  try {
    const response = await fetch(endpoint);
    const results = await response.json();

    if (!results || results.length === 0) throw new Error("No questions found");

    return results.map(q => ({
      question: q.question.text,
      correct_answer: q.correctAnswer,
      answers: shuffle([q.correctAnswer, ...q.incorrectAnswers])
    }));
  } catch (err) {
    throw new Error("API error: " + err.message);
  }
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
