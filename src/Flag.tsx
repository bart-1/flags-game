import react, { useState } from "react";
import { FlagType } from "./FetchStore";
import useStore from "./Store";

interface FlagProps {
  flag: FlagType;
  showId: (id: number) => void;
}

const Flag = ({ flag, showId }: FlagProps) => {
  const lang = useStore((state) => state.lang);
  const increaseClicksCounter = useStore((state) => state.increaseClickCounter);

  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    showId(flag.id);
    increaseClicksCounter();
    setShowDescription(true);
  };
  return (
    <>
      <div className="single-flag-container">
        <button className="btn-flag" onClick={() => handleClick()}>
          <img src={`flags-svg/${flag.prefix}.svg`} alt="" />
        </button>
        <div className="flag-name">
          <span>
            {showDescription &&
              ((lang === "pl" && flag.pl) || (lang === "en" && flag.en))}
          </span>
        </div>
      </div>
    </>
  );
};
export default Flag;
