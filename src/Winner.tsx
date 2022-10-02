import react, { useEffect } from "react";
import useInterfaceStore from "./InterfaceStore";
import useResultStore from "./ResultStore";

const Winner = () => {
  const lang = useInterfaceStore((state) => state.lang);
  const reset = useInterfaceStore((state) => state.resetGame);
  const pressedKey = useInterfaceStore((state) => state.key);
  const win = useResultStore((state) => state.winNumber);
  const loss = useResultStore((state) => state.lossNumber);

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
        <span>
          {(lang === "pl" && "Twój wynik:") || (lang === "en" && "Your result:")}
        </span>
        <span className="green">
          {(lang === "pl" && "Dobrze:") || (lang === "en" && "Good:")} {win}{" "}
        </span>
        <span className="red">
          {(lang === "pl" && "Źle:") || (lang === "en" && "Wrong:")} {loss}{" "}
        </span>
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
