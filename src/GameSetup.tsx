import react, { useEffect } from "react";
import useFetchStore, { FlagType } from "./FetchStore";
import useFlagsDeckStore from "./FlagsDeckStore";
import Footer from "./Footer";
import GameBoard from "./GameBoard";
import Loading from "./Loading";
import Quiz from "./Quiz";
import useStore from "./Store";
import Winner from "./Winner";

const GameSetup = () => {
  const setQuizFlagNumber = useFlagsDeckStore((state) => state.setQuizFlag);

  const gameDeal = useFlagsDeckStore((state) => state.gameDeal);
  const setGameDeal = useFlagsDeckStore((state) => state.setGameDeal);
  const win = useStore((state) => state.winNumber);
  const winner = useStore((state) => state.winner);
  const setWinner = useStore((state) => state.setWinner);
  const flagsIDArray = useFetchStore((state) => state.flagsIDArray);
  const flagsIDArrayIsReady = useFetchStore(
    (state) => state.flagsIDArrayIsReady
  );
  const quizFlagIsReady = useFlagsDeckStore((state) => state.quizFlagIsReady);

  useEffect(() => {
    if (flagsIDArrayIsReady) {
      setQuizFlagNumber();
      setGameDeal();
    }
  }, []);

  useEffect(() => {
    if (flagsIDArrayIsReady && flagsIDArray.length > 0) {
      setQuizFlagNumber();
      if (flagsIDArray.length > 1) setGameDeal();
      else {
        setWinner(true);
      }
    }
  }, [win]);

  if (!quizFlagIsReady) return <Loading />;
  return (
    <>
      {!winner && (
        <>
          <GameBoard gameDeal={gameDeal} />
          <Quiz />
        </>
      )}
      {winner && <Winner />}
    </>
  );
};
export default GameSetup;
