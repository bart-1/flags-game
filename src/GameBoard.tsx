import react from "react";
import Flag from "./Flag";
import useFlagsDeckStore from "./FlagsDeckStore";
import useInterfaceStore from "./InterfaceStore";

interface GameBoardProps {
  gameDeal: number[];
}

const GameBoard = ({ gameDeal }: GameBoardProps) => {
  const randomInteger = useInterfaceStore((state) => state.randomInteger);
  const setClickedFlag = useFlagsDeckStore((state) => state.setClickedFlag);
  const setClick = useInterfaceStore((state) => state.setClick);

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

  return (
    <>
      <div className="flag-container">{renderFlags}</div>
    </>
  );
};
export default GameBoard;
