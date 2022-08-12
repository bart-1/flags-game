import react, { ReactNode, useEffect, useState } from "react";
import useFetchStore from "./FetchStore";
import Flag from "./Flag";
import Quiz from "./Quiz";
import useStore from "./Store";

// interface GameBoardProps {
//   endDeal: (end: boolean) => void;
// }

type NumberArr = number[];

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: Array<number>) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const GameBoard = () => {
  const flags = useFetchStore((state) => state.flagsArray);
  const randomInteger = useStore((state) => state.randomInteger);
  const quizFlagNumber = useStore((state) => state.quizFlag);
  const clickedFlag = useStore((state) => state.setClickedFlag);

  const flagGenerator = (numberOfFlags: number) => {
    let randomFlagsNumbers: NumberArr = [];
    for (let i = 0; i <= numberOfFlags - 1; i++) {
      randomFlagsNumbers = [
        ...randomFlagsNumbers,
        randomInteger(1, flags.length),
      ];
    }
    randomFlagsNumbers = [...randomFlagsNumbers, quizFlagNumber];
  const newArr = shuffle(randomFlagsNumbers);
    if(newArr.length === 4){
    const toRender = newArr.map((number) => (
      <div key={flags[number].id + randomInteger(1, 999999)} className="flag">
        <Flag flag={flags[number]} showId={(id) => clickedFlag(id)} />
      </div>
    ));

    return toRender;
  };
}

  return (
    <>
      <div className="flag-container">{flagGenerator(3)}</div>
    
    </>
  );
};
export default GameBoard;
