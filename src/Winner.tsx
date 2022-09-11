import react, { useEffect } from "react";
import useInterfaceStore from "./InterfaceStore";

const Winner = () => {
  const lang = useInterfaceStore((state) => state.lang);
  const reset = useInterfaceStore((state) => state.resetGame);
  const pressedKey = useInterfaceStore((state) => state.key);

  const pressedKeyCounter = useInterfaceStore(
    (state) => state.pressedKeyCounter
  );

  useEffect(() => {
    if (pressedKey === " ") {
      reset();
    }
  }, [pressedKeyCounter]);

  const handleButtonClick = () => {
    reset()
  };

  return (
    <>
      <div className="winner">
        {lang === "pl" && (
          <div>
            <h1>Wygrana!</h1>
          </div>
        )}
        {lang === "en" && (
          <div>
            <h1>You win!</h1>
          </div>
        )}
        <div>
          <span>
            {lang === "pl" && `Kliknij `}
            {lang === "en" && `Click`}
          </span>
          <button onClick={handleButtonClick}> Restart</button>
        </div>
        <div>
          <span>
            {lang === "pl" && `lub wciśnij przycisk SPACJA`}
            {lang === "en" && `or press SPACE button`}
          </span>
        </div>
      </div>
    </>
  );
};
export default Winner;
