export default function ProgressBar({
  answer,
  index,
  points,
  totalPoints,
  question,
}) {
  return (
    <header className="progress">
      <progress
        max={question.length}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {question.length}
      </p>
      <p>
        Points <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}
