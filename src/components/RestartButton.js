export default function RestartButton({ dispatch }) {
  return (
    <button
      type="button"
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart Quiz
    </button>
  );
}
