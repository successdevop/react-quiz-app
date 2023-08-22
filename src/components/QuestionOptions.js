export default function QuestionOptions({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;

  return (
    <div className={`options`}>
      {question?.options.map((option, index) => (
        <button
          type="button"
          key={option}
          disabled={hasAnswer}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "correctAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
