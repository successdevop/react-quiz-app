export default function StartScreen({ dispatch, numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>

      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Let's start
      </button>
    </div>
  );
}
