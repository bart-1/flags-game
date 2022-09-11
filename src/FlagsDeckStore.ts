import create from "zustand";
import useFetchStore from "./FetchStore";

export const randomIntegerFromScope = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const selectRandElementsFromArray = <T>(
  numberOfElements: number,
  array: T[]
): T[] => {
  let filteredArray = array;
  let newArray: T[] = [];

  for (let i = 1; i <= numberOfElements; i++) {
    const rand = randomIntegerFromScope(0, filteredArray.length - 1);

    newArray = [...newArray, filteredArray[rand]];
    filteredArray = filteredArray.filter((el) => el !== filteredArray[rand]);
  }
  return newArray;
};

const handleSingleGameFlagsDeck = (
  flagsIDDeck: number[],
  quizFlag: number,
  flagsAmount: number
): number[] => {
  const filteredFlagsDeck = flagsIDDeck.filter((el) => el !== quizFlag);
  if (filteredFlagsDeck.length >= 3) {
    const singleGameFlagsDeck = selectRandElementsFromArray<number>(
      flagsAmount,
      filteredFlagsDeck
    ).concat(quizFlag);
    return shuffle(singleGameFlagsDeck);
  } else {
    const singleGameFlagsDeck = selectRandElementsFromArray<number>(
      filteredFlagsDeck.length,
      filteredFlagsDeck
    ).concat(quizFlag);
    return shuffle(singleGameFlagsDeck);
  }
};

interface FlagsDeckStore {
  gameDeal: number[];
  clickedFlag: number;
  quizFlag: number;
  quizFlagIsReady: boolean;

  setClickedFlag: (id: number) => void;
  setQuizFlag: () => void;
  setGameDeal: () => void;
}

const useFlagsDeckStore = create<FlagsDeckStore>((set) => ({
  clickedFlag: 0,
  quizFlag: 0,
  gameDeal: [],
  quizFlagIsReady: false,

  setClickedFlag: (id) => set({ clickedFlag: id }),
  setQuizFlag: () => {
    const quizNumber = selectRandElementsFromArray(
      1,
      useFetchStore.getState().flagsIDArray
    );
    set((state) => ({
      quizFlag: quizNumber[0],
      quizFlagIsReady: true,
    }));
  },
  setGameDeal: () => {
    const quizFlag = useFlagsDeckStore.getState().quizFlag;
    const flagsIDArray = useFetchStore.getState().flagsIDArray;
    const gameDeal: number[] = handleSingleGameFlagsDeck(
      flagsIDArray,
      quizFlag,
      3
    );
    set({
      gameDeal: gameDeal,
    });
  },
}));

export default useFlagsDeckStore;
