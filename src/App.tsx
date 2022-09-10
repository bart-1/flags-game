import { useEffect } from "react";
import useFetchStore from "./FetchStore";
import GameSetup from "./GameSetup";
import Loading from "./Loading";
import StartMenu from "./StartMenu";
import useStore from "./Store";
import LangNav from "./LangNav";
import Footer from "./Footer";
import "./App.css";

const URL_JSON = "codesOfFlagsTest.json";

function App() {
  const start = useStore((state) => state.start);
  const setStart = useStore((state) => state.setStart);
  const fetchData = useFetchStore((state) => state.fetch);
  const flagsLoaded = useFetchStore(
    (state) => state.flagsLoaded
  );

  useEffect(() => {
    fetchData(URL_JSON);
  }, []);

  if (!flagsLoaded) return <Loading />;

  return (
    <div className="App">
      <LangNav />

      {!start && <StartMenu start={() => setStart(true)} />}
      {start && <GameSetup />}
      <Footer />
    </div>
  );
}

export default App;
