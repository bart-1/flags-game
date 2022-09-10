import { useEffect, useState } from "react";
import { FlagType } from "./FetchStore";
import Flag from "./Flag";
import useFlagsDeckStore from "./FlagsDeckStore";
import Loading from "./Loading";
import useStore from "./Store";

interface GameBoardProps {
  gameDeal: number[];
}

const GameBoard = ({ gameDeal }: GameBoardProps) => {
  const randomInteger = useStore((state) => state.randomInteger);
  const setClickedFlag = useFlagsDeckStore((state) => state.setClickedFlag);
  const setClick = useFlagsDeckStore((state) => state.setClick);

  const renderFlags = gameDeal.map((el) => (
    <div key={el + randomInteger(1, 999999)} className="flag">
      <Flag
        flag={el}
        showId={() => setClickedFlag(el)}
        click={() => setClick()}
      />
    </div>
  ));

  return (
    <>
      <div className="flag-container">{renderFlags}</div>
    </>
  );
};
export default GameBoard;
