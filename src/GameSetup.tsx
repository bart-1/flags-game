import react, { useEffect } from "react";
import useFetchStore from "./FetchStore";
import useFlagsDeckStore from "./FlagsDeckStore";
import GameBoard from "./GameBoard";
import Loading from "./Loading";
import Quiz from "./Quiz";
import useResultStore from "./ResultStore";
import Winner from "./Winner";

const GameSetup = () => {
  const setQuizFlagNumber = useFlagsDeckStore((state) => state.setQuizFlag);

  const gameDeal = useFlagsDeckStore((state) => state.gameDeal);
  const setGameDeal = useFlagsDeckStore((state) => state.setGameDeal);
  const win = useResultStore((state) => state.winNumber);
  const winner = useResultStore((state) => state.winner);
  const setWinner = useResultStore((state) => state.setWinner);
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
      if (flagsIDArray.length > 1) {
        setGameDeal();
      } else {
        setWinner(true);
      }
    }
  }, [win]);

  if (!quizFlagIsReady) return <Loading />;
  if (winner) return <Winner />;
  return (
    <>
      <GameBoard gameDeal={gameDeal} />
      <Quiz />
    </>
  );
};
export default GameSetup;
