import react, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useFetchStore from "./FetchStore";
import useInterfaceStore from "./InterfaceStore";

interface DifficultyLevelMenuProps {
  readyToStart: () => void;
}

const DifficultyLevelMenu = ({ readyToStart }: DifficultyLevelMenuProps) => {
  const lang = useInterfaceStore((state) => state.lang);
  const setDifficultyLevelMenu = useFetchStore(
    (state) => state.setNumberOfFlags
  );
  const flagsIDArray = useFetchStore((state) => state.flagsIDArray);
  const [checkedInput, setCheckedInput] = useState("24");

  const key = useInterfaceStore((state) => state.key);
  const pressedKey = useInterfaceStore((state) => state.pressedKey);
  const resetPressedKeyConter = useInterfaceStore(
    (state) => state.resetPressedKeyCounter
  );

  useEffect(() => {
    switch (true) {
      case key === "1":
        setCheckedInput("24");
        break;
      case key === "2":
        setCheckedInput("100");
        break;
      case key === "3":
        setCheckedInput("256");
        break;
      case key === " ":
        setDifficultyLevelMenu(Number(checkedInput));
        readyToStart();
        break;
    }
    resetPressedKeyConter();
  }, [pressedKey]);

  const handleRadioButtons = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDifficultyLevelMenu(Number(checkedInput));
    readyToStart();
  };
  return (
    <>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleRadioButtons(e)}>
        <div className="difficulty-menu">
          <fieldset>
            <label htmlFor="24">
              1
              <input
                type="radio"
                name="1"
                value={24}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCheckedInput(e.currentTarget.value)
                }
                checked={checkedInput === "24"}
              />
              {lang === "pl" && `krótka gra, 24 flagi`}
              {lang === "en" && `short game, 24 flags`}
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="100">
              2
              <input
                type="radio"
                name="2"
                value={100}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCheckedInput(e.currentTarget.value)
                }
                checked={checkedInput === "100"}
              />
              {lang === "pl" && `średnia ilość, 100 flag`}
              {lang === "en" && `avarage amount, 100 flags`}
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="all">
              3
              <input
                type="radio"
                name="3"
                value={flagsIDArray.length}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCheckedInput(e.currentTarget.value)
                }
                checked={checkedInput === "256"}
              />
              {lang === "pl" && `wszystkie 256 flag`}
              {lang === "en" && `all 256 flags`}
            </label>
          </fieldset>
        </div>
        <button type="submit">Start</button>
      </form>
    </>
  );
};
export default DifficultyLevelMenu;
