import { useEffect, useState } from "react";
import "./App.css";
import useFetchStore from "./FetchStore";
import GameBoard from "./GameBoard";
import LangNav from "./LangNav";
import Quiz from "./Quiz";
import ResultBoard from "./ResultBoard";
import useStore from "./Store";

const urlJson = "codesOfFlags.json";

function App() {
  const fetchData = useFetchStore((state) => state.fetch);
  const flags = useFetchStore((state) => state.flagsArray);

  const flagsLoading = useFetchStore((state) => state.flagsLoading);
  const setFlagsLoading = useFetchStore(state => state.setFlagsLoading)
  const randomInteger = useStore((state) => state.randomInteger);
  const setQuizFlagNumber = useStore((state) => state.setQuizFlag);
  const quizFlagNumber = useStore(state => state.quizFlag)

  const setClickedFlag = useStore((state) => state.setClickedFlag);
  const win = useStore((state) => state.winNumber);
  const [renderApp, setRenderApp] = useState(false);

  useEffect(() => {
    try {
      fetchData(urlJson);
      setQuizFlagNumber(randomInteger(0, flags.length));
    } catch {
      setFlagsLoading(true);
    }
  }, []);

  useEffect(() => {
    setRenderApp((prevState) => !prevState);
    setQuizFlagNumber(randomInteger(0, flags.length));
  }, [win]);

  if (flagsLoading) return <span>Loading data...</span>;

  if (!flags) return <span>No data... sorry</span>;

  return (
    <div className="App">
      <LangNav />
      <GameBoard />
      <div className="quiz">
        <Quiz rand={quizFlagNumber} />
      </div>
     
    </div>
  );
}

export default App;
