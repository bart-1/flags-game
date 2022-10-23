import create from "zustand";

interface ResultStore {
  isWinFlag: boolean;
  winFlagID: number;
  winner: boolean;
  winNumber: number;
  lossNumber: number;
  increaseWinNumber: () => void;
  increaseLossNumber: () => void;

  setWinFlagID: (id: number) => void;
  setIsWin: (bool: boolean) => void;

  setWinner: (bool: boolean) => void;
  resetResults: () => void;
  objectsArrayToItsPropsArray: (
    arr: object[],
    key: string
  ) => Array<string | number>;
}

const useResultStore = create<ResultStore>((set) => ({
  isWinFlag: false,
  winFlagID: 0,
  winner: false,
  start: false,
  clicksCounter: 0,
  winNumber: 0,
  increaseWinNumber: () => set((state) => ({ winNumber: state.winNumber + 1 })),
  increaseLossNumber: () =>
    set((state) => ({ lossNumber: state.lossNumber + 1 })),

  lossNumber: 0,
  lang: "pl",

  setWinner: (bool) => set({ winner: bool }),
  setIsWin: (bool) => set({ isWinFlag: bool }),
  setWinFlagID: (id) => set({ winFlagID: id }),
  resetResults: () => set({ lossNumber: 0, winNumber: 0 }),
  objectsArrayToItsPropsArray: (arr, objKey): Array<string | number> => {
    let newArr: Array<string | number> = [];
    arr.map((element) => {
      Object.entries(element).map((key, value) => {
        if (String(key[0]) === objKey) newArr = [...newArr, key[1]];
      });
    });
    return newArr;
  },
}));

export default useResultStore;
