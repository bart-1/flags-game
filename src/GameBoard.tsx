import React, { useEffect } from "react";
import useFetchStore from "./FetchStore";
import Flag from "./Flag";
import useFlagsDeckStore from "./FlagsDeckStore";
import useInterfaceStore from "./InterfaceStore";
import useResultStore from "./ResultStore";

interface GameBoardProps {
  gameDeal: number[];
}

const GameBoard = ({ gameDeal }: GameBoardProps) => {
  const randomInteger = useInterfaceStore((state) => state.randomInteger);
  const setClickedFlag = useFlagsDeckStore((state) => state.setClickedFlag);
  const setClick = useInterfaceStore((state) => state.setClick);
  const win = useResultStore(state => state.isWinFlag)
  const setWin = useResultStore(state => state.setIsWin)
  const winFlagID = useResultStore(state => state.winFlagID)
  const flagsArray = useFetchStore(state => state.flagsArray)
  const lang = useInterfaceStore(state=> state.lang)

  const renderFlags = gameDeal.map((el, index) => (
    <div key={el + randomInteger(1, 9999)} className="flag">
      <Flag
        flag={el}
        showId={() => setClickedFlag(el)}
        click={() => setClick()}
        index={index + 1}
      />
    </div>
  ));

  const handleWinWindow = () => {
    setWin(false)
   
  }

  useEffect(() => {
    if (win === false)
      return
    const intWinFlagContainerShow = setInterval(handleWinWindow, 3000)

    return () => {
      clearInterval(intWinFlagContainerShow);
    }
  },[win])

  return (
    <>
      {win && (
        <div className="win-flag-container">
          <div className="win-flag">
            {lang === "pl" && <span>Zgadza się!</span>}
            {lang === "en" && <span>Correct!</span>}
            <Flag flag={winFlagID} showId={() => ""} click={() => ""} clickable={false} />
            {lang === "pl" && <span>{flagsArray[winFlagID].pl}</span>}
            {lang === "en" && <span>{flagsArray[winFlagID].en}</span>}
          </div>
        </div>
      )}
     { !win && <div className="flag-container">{renderFlags}</div>}
    </>
  );
};
export default GameBoard;
