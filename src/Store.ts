import create from "zustand";

export type Lang = "pl" | "en";

interface Store {
  lang: Lang;
  setLang: (lang: Lang) => void;
  randomInteger: (min: number, max: number) => number;
  winNumber: number;
  lossNumber: number;
  increaseWinNumber: () => void;
  increaseLossNumber: () => void;
  clickedFlag: number;
  setClickedFlag: (id: number) => void;
  quizFlag: number;
  setQuizFlag: (id: number) => void;
  resetResults: () => void;
  clicksCounter: number;
  increaseClickCounter: () => void;
}

const useStore = create<Store>((set) => ({
  clicksCounter: 0,
  increaseClickCounter: () =>
    set((state) => ({ clicksCounter: state.clicksCounter + 1 })),
  winNumber: 0,
  increaseWinNumber: () => set((state) => ({ winNumber: state.winNumber + 1 })),
  increaseLossNumber: () =>
    set((state) => ({ lossNumber: state.lossNumber + 1 })),
  clickedFlag: 0,
  setClickedFlag: (id) => set({ clickedFlag: id }),
  setQuizFlag: (id) => set({ quizFlag: id }),
  quizFlag: 0,
  lossNumber: 0,
  lang: "pl",
  setLang: (newlang) => set({ lang: newlang }),
  randomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  resetResults: () => set({ lossNumber: 0, winNumber: 0 }),
}));

export default useStore;
