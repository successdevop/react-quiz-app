import { useEffect } from "react";

const Timer = ({ secondsRemaining, dispatch }) => {
  const min = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      const intId = setInterval(() => {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(intId);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{secs < 10 && "0"}
      {secs}
    </div>
  );
};

export default Timer;
