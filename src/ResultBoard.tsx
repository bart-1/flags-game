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

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (clickedFlag === quizFlag || clicksCounter > 0) {
      increaseWinNumber();
    } else increaseLossNumber();
  }, [clickedFlag]);
  return (
    <>
      <h1>TAK: {win} </h1>
      <h1>NIE: {loss} </h1>
    </>
  );
};
export default ResultBoard;
