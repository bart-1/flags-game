import react, { useState } from "react";
import useFetchStore from "./FetchStore";
import Loading from "./Loading";
import useStore from "./Store";

interface FlagProps {
  flag: number;
  showId: (id: number) => void;
  click: () => void;
}

const Flag = ({ flag, showId, click }: FlagProps) => {
  const lang = useStore((state) => state.lang);
  const increaseClicksCounter = useStore((state) => state.increaseClickCounter);
  const flagsArray = useFetchStore((state) => state.flagsArray);
  const flagsLoaded = useFetchStore((state) => state.flagsLoaded);

  const [showDescription, setShowDescription] = useState(false);

  if (!flagsLoaded) return <Loading />;

  const handleClick = () => {
    showId(flagsArray[flag].id);
    click();
    increaseClicksCounter();
    setShowDescription(true);
  };
  return (
    <>
      <div className="single-flag-container">
        <button className="btn-flag" onClick={() => handleClick()}>
          <img src={`flags-svg/${flagsArray[flag].prefix}.svg`} alt="" />
        </button>
        <div className="flag-name">
          <span>
            {showDescription &&
              ((lang === "pl" && flagsArray[flag].pl) ||
                (lang === "en" && flagsArray[flag].en))}
          </span>
        </div>
      </div>
    </>
  );
};
export default Flag;
