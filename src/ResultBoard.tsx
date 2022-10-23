import react, { useEffect } from "react";
import useFetchStore from "./FetchStore";
import useFlagsDeckStore from "./FlagsDeckStore";
import useInterfaceStore from "./InterfaceStore";
import useResultStore from "./ResultStore";

const ResultBoard = () => {
  const flagsIDArray = useFetchStore((state) => state.flagsIDArray);
  const flagsIDArrayIsReady = useFetchStore(
    (state) => state.setFlagsIDArrayIsReady
  );
  const clickedFlag = useFlagsDeckStore((state) => state.clickedFlag);
  const click = useInterfaceStore((state) => state.click);
  const key = useInterfaceStore((state) => state.key);
  const pressedKey = useInterfaceStore((state) => state.pressedKey);
  const quizFlag = useFlagsDeckStore((state) => state.quizFlag);
  const increaseWinNumber = useResultStore((state) => state.increaseWinNumber);
  const increaseLossNumber = useResultStore(
    (state) => state.increaseLossNumber
  );
  const win = useResultStore((state) => state.winNumber);
  const setIsWin = useResultStore((state) => state.setIsWin);
  const setWinFlagID = useResultStore((state) => state.setWinFlagID);
  const loss = useResultStore((state) => state.lossNumber);
  const clicksCounter = useInterfaceStore((state) => state.clicksCounter);
  const pressedKeyCounter = useInterfaceStore(
    (state) => state.pressedKeyCounter
  );
  const reset = useResultStore((state) => state.resetResults);
  const rebuildDeck = useFetchStore((state) => state.rebuildFlagsIDDeck);
  const gameDeal = useFlagsDeckStore((state) => state.gameDeal);

  const lang = useInterfaceStore((state) => state.lang);

  useEffect(() => {
    reset();
  }, []);

  

  useEffect(() => {
    if (clickedFlag === quizFlag && clicksCounter > 0) {
      increaseWinNumber();
      setWinFlagID(clickedFlag)
      setIsWin(true);
      flagsIDArrayIsReady(false);
      rebuildDeck();
    } else if (clickedFlag !== quizFlag && clicksCounter > 0)
    increaseLossNumber();
  }, [click]);
  
  useEffect(() => {
    if (gameDeal[Number(key) - 1] === quizFlag && pressedKeyCounter > 0) {
      increaseWinNumber();
      setIsWin(true);
      flagsIDArrayIsReady(false);
      rebuildDeck();
    } else if (gameDeal[Number(key) - 1] !== quizFlag && pressedKeyCounter > 0)
      increaseLossNumber();
  }, [pressedKey]);

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
