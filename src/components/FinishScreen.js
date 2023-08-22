export const FinishScreen = ({ points, totalPoints, highScore }) => {
  const percent = (points / totalPoints) * 100;
  return (
    <>
      <div className="result">
        <p>
          You scored {points} out of {totalPoints} points ({Math.ceil(percent)}
          %)
        </p>
      </div>
      <p className="highscore">Your HighScore is: {highScore}</p>
    </>
  );
};
