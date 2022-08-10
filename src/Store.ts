import create from "zustand";

export type FlagType = { id: number; prefix: string; pl: string; en: string };
export type Lang = "pl" | "en";

interface Store {
  flagsArray: FlagType[];
  fetch: (url: string) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  flagsLoaded: boolean;
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
const prepareFlagsArray = (objectOne: object, objectTwo: object) => {
  let newObject: FlagType[] = [];

  Object.entries(objectOne).map((key, index) => {
    newObject = [
      ...newObject,
      {
        id: index,
        prefix: key[0],
        pl: key[1],
        en: Object.entries(objectTwo).filter((k, v) => k[0] === key[0])[0][1],
      },
    ];
  });

  return newObject;
};

const useStore = create<Store>((set) => ({
    clicksCounter: 0,
    increaseClickCounter: () => set(state=> ({clicksCounter: state.clicksCounter+1})),
  flagsArray: [],
  flagsLoaded: false,
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
  fetch: async (url) => {
    const response = await fetch(url)
      .then((response) => response.json())
      .then((response) =>
        set({ flagsArray: prepareFlagsArray(response.pl, response.en) })
      )
      .then((response) => set({ flagsLoaded: true }))
      .catch((err) => console.log(err));
  },
  randomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  resetResults: () => set({ lossNumber: 0, winNumber: 0 }),
}));

export default useStore;
