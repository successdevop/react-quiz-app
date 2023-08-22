import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestionButton from "./components/NextQuestionButton";
import ProgressBar from "./components/ProgressBar";
import { FinishScreen } from "./components/FinishScreen";
import RestartButton from "./components/RestartButton";
import { Footer } from "./components/Footer";
import Timer from "./components/Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // "loading","error","ready","active","finished"
  status: "loading",
  questionIndex: 0,
  questionAnswer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "startGame":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case "correctAnswer":
      const question = state.questions.at(state.questionIndex);

      return {
        ...state,
        questionAnswer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      if (state.questionIndex >= state.questions.length - 1) {
        return {
          ...state,
          questionAnswer: null,
          highScore:
            state.highScore > state.points ? state.highScore : state.points,
          status: "finish",
        };
      }

      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        questionAnswer: null,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };

    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error(
        `This action ${action.type.toUpperCase()} is unknown, please check it out`
      );
  }
}

function App() {
  const [
    {
      questions,
      status,
      questionIndex,
      questionAnswer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalPoints = questions.reduce((acc, curr) => (acc += curr.points), 0);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              answer={questionAnswer}
              points={points}
              question={questions}
              index={questionIndex}
              totalPoints={totalPoints}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              answer={questionAnswer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextQuestionButton
                dispatch={dispatch}
                answer={questionAnswer}
                index={questionIndex}
                question={questions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              highScore={highScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
