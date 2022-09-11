import { useEffect } from "react";
import useFetchStore from "./FetchStore";
import GameSetup from "./GameSetup";
import Loading from "./Loading";
import StartMenu from "./StartMenu";
import useInterfaceStore from "./InterfaceStore";
import LangNav from "./LangNav";
import Footer from "./Footer";
import "./App.css";

const URL_JSON = "codesOfFlags.json";

function App() {
  const start = useInterfaceStore((state) => state.start);
  const setStart = useInterfaceStore((state) => state.setStart);
  const fetchData = useFetchStore((state) => state.fetch);
  const flagsLoaded = useFetchStore((state) => state.flagsLoaded);

  const setKey = useInterfaceStore((state) => state.setKey);
  const setPressedKey = useInterfaceStore((state) => state.setPressedKey);
  const increasePressedKeyCounter = useInterfaceStore(
    (state) => state.increasePressedKeyCounter
  );

  const handleKeyboard = (e: any) => {
    if (
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === " "
    ) {
      setKey(e.key);
      setPressedKey();
      increasePressedKeyCounter();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard, false);
    fetchData(URL_JSON);

    return () => {
      document.removeEventListener("keydown", handleKeyboard, false);
    };
  }, []);

  if (!flagsLoaded) return <Loading />;

  return (
    <div className="App" tabIndex={0}>
      <LangNav />

      {!start && <StartMenu start={() => setStart(true)} />}
      {start && <GameSetup />}
      <Footer />
    </div>
  );
}

export default App;
