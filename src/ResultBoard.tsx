import react, { useEffect } from "react";
import useFetchStore from "./FetchStore";
import useFlagsDeckStore from "./FlagsDeckStore";
import useStore from "./Store";

const ResultBoard = () => {
  const flagsIDArray = useFetchStore((state) => state.flagsIDArray);
  const flagsIDArrayIsReady = useFetchStore((state) => state.setFlagsIDArrayIsReady);
  const clickedFlag = useFlagsDeckStore((state) => state.clickedFlag);
  const click = useFlagsDeckStore(state=> state.click)
  const quizFlag = useFlagsDeckStore((state) => state.quizFlag);
  const increaseWinNumber = useStore((state) => state.increaseWinNumber);
  const increaseLossNumber = useStore((state) => state.increaseLossNumber);
  const win = useStore((state) => state.winNumber);
  const loss = useStore((state) => state.lossNumber);
  const clicksCounter = useStore((state) => state.clicksCounter);
  const reset = useStore((state) => state.resetResults);
  const rebuildDeck = useFetchStore(state=> state.rebuildFlagsIDDeck)

  const lang = useStore((state) => state.lang);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (clickedFlag === quizFlag && clicksCounter > 0) {
      increaseWinNumber();
      flagsIDArrayIsReady(false);
      rebuildDeck();
    } else if (clickedFlag !== quizFlag && clicksCounter > 0)
      increaseLossNumber();
  }, [click]);

  return (
    <>
      <div className="results">
        <span className="green">
          {(lang === "pl" && "Dobrze:") || (lang === "en" && "Good:")} {win}{" "}
        </span>
        <span className="red">
          {(lang === "pl" && "Źle:") || (lang === "en" && "Wrong:")} {loss}{" "}
        </span>
        <span className="blue">
          {(lang === "pl" && "Zostało:") || (lang === "en" && "Left:")}{" "}
          {flagsIDArray.length}{" "}
        </span>
      </div>
    </>
  );
};
export default ResultBoard;
