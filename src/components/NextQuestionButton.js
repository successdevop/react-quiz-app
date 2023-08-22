export default function NextQuestionButton({
  dispatch,
  answer,
  index,
  question,
}) {
  if (answer === null) return null;

  return (
    <button
      type="button"
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      {index === question.length - 1 ? "Finish" : "Next"}
    </button>
  );
}
