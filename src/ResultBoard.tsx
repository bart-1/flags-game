import react, { useEffect } from "react";
import useStore from "./Store";

// interface ReasultBoardProps {
// : ;
// }

const ResultBoard = () => {
  const clickedFlag = useStore((state) => state.clickedFlag);
  const quizFlag = useStore((state) => state.quizFlag);
  const increaseWinNumber = useStore((state) => state.increaseWinNumber);
  const increaseLossNumber = useStore((state) => state.increaseLossNumber);
  const win = useStore((state) => state.winNumber);
  const loss = useStore((state) => state.lossNumber);
  const clicksCounter = useStore((state) => state.clicksCounter);
  const reset = useStore((state) => state.resetResults);

  const lang = useStore(state => state.lang);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (clickedFlag === quizFlag && clicksCounter >0) {
      increaseWinNumber();
    } else if (clickedFlag !== quizFlag && clicksCounter>0)increaseLossNumber();
  }, [clickedFlag]);
  return (
    <>
      <div className="results">
        <span className="green">{lang === "pl" && 'Dobrze:' || lang === "en" && 'Good:'} {win} </span>
        <span className="red">{lang === "pl" && 'Źle:' || lang === "en" && 'Wrong:'} {loss} </span>
      </div>
    </>
  );
};
export default ResultBoard;
