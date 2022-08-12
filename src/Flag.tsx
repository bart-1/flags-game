import react, { useState } from "react";
import { FlagType } from "./FetchStore";
import useStore from "./Store";

interface FlagProps {
  flag: FlagType;
  showId: (id: number) => void;
}

const Flag = ({ flag, showId }: FlagProps) => {
  const lang = useStore((state) => state.lang);

  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    showId(flag.id);
    setShowDescription(true);
  };
  return (
    <>
      <button className="btn-flag" onClick={() => handleClick()}>
        <img src={`flags-svg/${flag.prefix}.svg`} alt="" />
      </button>
      <div className="flag-name">
        <p>
            {showDescription &&
              ((lang === "pl" && flag.pl) ||
                (lang === "en" && flag.en))}
        </p>
      </div>
    </>
  );
};
export default Flag;
