import react, { useEffect, useState } from "react";
import DifficultyLevelMenu from "./DifficultyLevelMenu";
import useFetchStore from "./FetchStore";
import useInterfaceStore from "./InterfaceStore";

interface StartMenuProps {
  start: () => void;
}

const StartMenu = ({ start }: StartMenuProps) => {
  const lang = useInterfaceStore((state) => state.lang);
  const resetFlagsIDArray = useFetchStore(state=> state.resetFlagsIDArray)

  useEffect( () => {
      
     resetFlagsIDArray()
  }, [] );

  return (
    <>
      <div className="start-container">
        {lang === "pl" && (
          <div>
            <h1>Quiz znajomości flag</h1>
            <p>
              Odgadnij wszystkie flagi, zrób jak najmniej błędów, ucz się nowych
              flag. Flagi możesz wskazywać kliknięciem lub wybraniem na
              klawiaturze numeru flagi [1-4].
            </p>
            <p>Jeśli jesteś gotów kliknij Start lub wciśnij SPACJĘ</p>
          </div>
        )}
        {lang === "en" && (
          <div>
            <h1>Flag knowledge quiz</h1>
            <p>
              Guess all the flags, make as few mistakes as possible, learn new
              flags. You can choose flag with mouse click or choose number key
              on keyboard [1-4].
            </p>
            <p>If you ready click Start or press SPACE </p>
          </div>
        )}
        <DifficultyLevelMenu readyToStart={() => start()} />
      </div>
    </>
  );
};
export default StartMenu;
