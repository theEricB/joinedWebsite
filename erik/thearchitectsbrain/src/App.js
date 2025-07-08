import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch("/thearchitectsbrain_questions_v1.json")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const current = questions[index];

  function handleAnswer(option) {
    setSelected(option);
    setShowAnswer(true);
  }

  function nextQuestion() {
    setSelected(null);
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % questions.length);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>Q{current.id}: {current.question}</h2>
      <div style={{ marginTop: "1rem" }}>
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            disabled={showAnswer}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              background: showAnswer
                ? option === current.answer
                  ? "#d4ffd4"
                  : option === selected
                  ? "#ffd4d4"
                  : "#f9f9f9"
                : "#fff"
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          <p><strong>Correct Answer:</strong> {current.answer}</p>
          <p><strong>Explanation:</strong> {current.explanation}</p>
          <p><strong>Source:</strong> {current.source}</p>
          <button onClick={nextQuestion} style={{ marginTop: "1rem", padding: "0.5rem" }}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
