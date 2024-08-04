import React, { useMemo } from "react";

// Helper function to shuffle array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Options = ({ question, dispatch, answer }) => {
  // Only shuffle options once when the question changes
  const options = useMemo(() => {
    if (!question) return [];
    const allOptions = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray(allOptions);
  }, [question]);

  const hasAnswered = answer !== null;

  return (
    <div>
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answer === option ? "answer" : "" 
          } ${
            hasAnswered
              ? option === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={index}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: option })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
