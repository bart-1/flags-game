import react from "react";
import useStore from "./Store";

interface StartMenuProps {
  start: () => void;
}

const StartMenu = ({ start }: StartMenuProps) => {
  const lang = useStore((state) => state.lang);
  return (
    <>
      <div className="start-container">
        {lang === "pl" && (
          <div>
            <h1>Quiz znajomości flag</h1>
            <p>
              Zgadnij wszystkie flagi, zrób jak najmniej błędów, ucz się nowych
              flag.
            </p>
            <p>Jeśli jesteś gotów kliknij Start</p>
            <button onClick={() => start()}>Start</button>
          </div>
        )}
        {lang === "en" && (
          <div>
            <h1>Flag knowledge quiz</h1>
            <p>
              Guess all the flags, make as few mistakes as possible, learn new
              flags.
            </p>
            <p>If you ready press Start</p>
            <button onClick={() => start()}>Start</button>
          </div>
        )}
      </div>
    </>
  );
};
export default StartMenu;
