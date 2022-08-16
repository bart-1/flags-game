import { useEffect, useState } from "react";
import "./App.css";
import useFetchStore from "./FetchStore";
import Footer from "./Footer";
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
  const setFlagsLoading = useFetchStore((state) => state.setFlagsLoading);
  const randomInteger = useStore((state) => state.randomInteger);
  const setQuizFlagNumber = useStore((state) => state.setQuizFlag);
  const quizFlagNumber = useStore((state) => state.quizFlag);

  const win = useStore((state) => state.winNumber);
  const [renderApp, setRenderApp] = useState(false);

  useEffect(() => {
    try {
      fetchData(urlJson);
    } catch {
      setFlagsLoading(true);
    }
  }, []);

  useEffect(() => {
    if (!flagsLoading) setQuizFlagNumber(randomInteger(0, flags.length));
  }, [flagsLoading]);

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
      <Quiz rand={quizFlagNumber} />
      <Footer />
    </div>
  );
}

export default App;
