import create from "zustand";
import useFetchStore from "./FetchStore";
import useResultStore from "./ResultStore";

export type Lang = "pl" | "en";

interface InterfaceStore {
  click: boolean;
  pressedKey: boolean;
  clicksCounter: number;
  pressedKeyCounter: number;
  key: string;
  lang: Lang;
  start: boolean;
  winNumber: number;

  setPressedKey: () => void;
  setClick: () => void;
  setKey: (key: string) => void;
  setLang: (lang: Lang) => void;
  randomInteger: (min: number, max: number) => number;
  setStart: (bool: boolean) => void;
  increaseClickCounter: () => void;
  increasePressedKeyCounter: () => void;
  resetPressedKeyCounter: () => void;
  resetGame: () => void;
}

const useInterfaceStore = create<InterfaceStore>((set) => ({
  click: true,
  clicksCounter: 0,
  pressedKeyCounter: 0,
  key: "",
  lang: "pl",
  start: false,
  winNumber: 0,
  pressedKey: false,

  setPressedKey: () => set((state) => ({ pressedKey: !state.pressedKey })),
  setClick: () => set((state) => ({ click: !state.click })),
  increaseClickCounter: () =>
    set((state) => ({ clicksCounter: state.clicksCounter + 1 })),
  increasePressedKeyCounter: () =>
    set((state) => ({ pressedKeyCounter: state.pressedKeyCounter + 1 })),
  resetPressedKeyCounter: () => set({ pressedKeyCounter: 0 }),
  setKey: (key) => set({ key: key }),
  setLang: (newlang) => set({ lang: newlang }),
  setStart: (start) => set({ start: start }),
  randomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  resetGame: () => {
    set({ start: false, key: "" });
    useResultStore.setState({ winner: false });
    useFetchStore.setState({ flagsIDArrayIsReady: false });
  },
}));

export default useInterfaceStore;
