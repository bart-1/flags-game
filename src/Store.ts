import create from "zustand";

export type Lang = "pl" | "en";

interface Store {
  winner: boolean;
  start: boolean;
  lang: Lang;
  setLang: (lang: Lang) => void;
  randomInteger: (min: number, max: number) => number;
  winNumber: number;
  lossNumber: number;
  increaseWinNumber: () => void;
  increaseLossNumber: () => void;
  
  setWinner: (bool: boolean) => void;
  setStart: (bool: boolean) => void;
  resetResults: () => void;
  clicksCounter: number;
  increaseClickCounter: () => void;
  objectsArrayToItsPropsArray: (
    arr: object[],
    key: string
  ) => Array<string | number>;
}

const useStore = create<Store>((set) => ({
  winner: false,
  start: false,
  clicksCounter: 0,
  increaseClickCounter: () =>
    set((state) => ({ clicksCounter: state.clicksCounter + 1 })),
  winNumber: 0,
  increaseWinNumber: () => set((state) => ({ winNumber: state.winNumber + 1 })),
  increaseLossNumber: () =>
    set((state) => ({ lossNumber: state.lossNumber + 1 })),
 
  lossNumber: 0,
  lang: "pl",

  setWinner: (bool) => set({winner: true}),
  setStart: (start) => set({start: start}),
  setLang: (newlang) => set({ lang: newlang }),
  randomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  resetResults: () => set({ lossNumber: 0, winNumber: 0 }),
  objectsArrayToItsPropsArray: (arr, objKey):Array<string | number> => {
    let newArr: Array<string | number> = [];
    arr.map((element) => {
      Object.entries(element).map((key, value) => {
        if (String(key[0]) === objKey)
        newArr = [...newArr, key[1]]
    })
    });
    return newArr;
  },
}));

export default useStore;
