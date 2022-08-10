import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import LangNav from "./LangNav";
import Quiz from "./Quiz";
import ReasultBoard from "./ResultBoard";
import useStore from "./Store";

const urlJson = "codesOfFlags.json";

function App() {
  const fetchData = useStore((state) => state.fetch);
  const flags = useStore((state) => state.flagsArray);

  const flagsLoaded = useStore((state) => state.flagsLoaded);
  const randomInteger = useStore((state) => state.randomInteger);
  const setQuizFlagNumber = useStore((state) => state.setQuizFlag);

  const setClickedFlag = useStore((state) => state.setClickedFlag);
  const win = useStore((state) => state.winNumber);
  const [renderApp, setRenderApp] = useState(false);

  useEffect(() => {
    fetchData(urlJson);
    setQuizFlagNumber(randomInteger(0, flags.length));
  }, []);
  
  
  
  useEffect(() => {
    setRenderApp((prevState) => !prevState);
    setQuizFlagNumber(randomInteger(0, flags.length));
    // setClickedFlag(500);
  }, [win]);


  return (
    <div className="App">
      <LangNav />
      {flagsLoaded && <GameBoard />}
      <ReasultBoard />
    </div>
  );
}

export default App;
