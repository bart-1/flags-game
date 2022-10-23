import react, { useEffect, useState } from "react";
import useFetchStore from "./FetchStore";
import Loading from "./Loading";
import useInterfaceStore from "./InterfaceStore";

interface FlagProps {
  flag: number;
  showId: (id: number) => void;
  click: () => void;
  index?: number;
  clickable?:boolean
}

const Flag = ({ flag, showId, click, index, clickable = true }: FlagProps) => {
  const lang = useInterfaceStore((state) => state.lang);
  const increaseClicksCounter = useInterfaceStore(
    (state) => state.increaseClickCounter
  );
  const flagsArray = useFetchStore((state) => state.flagsArray);
  const flagsLoaded = useFetchStore((state) => state.flagsLoaded);
  const key = useInterfaceStore((state) => state.key);
  const pressedKey = useInterfaceStore((state) => state.pressedKey);
  const setKey = useInterfaceStore((state) => state.setKey);

  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (key === String(index)) setShowDescription(true);
    setKey('');
  }, [pressedKey]);

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
        <div className="flag-index">
          <span>{index}</span>
        </div>
        {clickable ? (
          <button className="btn-flag" onClick={() => handleClick()}>
            <img src={`flags-svg/${flagsArray[flag].prefix}.svg`} alt="" />
          </button>
        ) : (
          <div className="btn-flag"><img src={`flags-svg/${flagsArray[flag].prefix}.svg`} alt="" /></div>
        )}
       
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
