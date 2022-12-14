import create from "zustand";
import useFlagsDeckStore, {
  selectRandElementsFromArray,
} from "./FlagsDeckStore";

export type FlagType = { id: number; prefix: string; pl: string; en: string };

export const prepareFlagsArray = (objectOne: object, objectTwo: object) => {
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

export const objectArrayToNumbersArray = <T>(objectsArray: T[]): number[] => {
  let newArr: number[] = [];
  for (let i = 0; i < objectsArray.length; i++) {
    newArr = [...newArr, i];
  }

  return newArr;
};

interface FetchStore {
  flagsArray: FlagType[];
  flagsIDArray: number[];
  flagsIDProtoArray: number[];
  flagsIDArrayIsReady: boolean;
  numberOfFlags: number;
  setNumberOfFlags: (number: number) => void;
  setFlagsIDArrayIsReady: (bool: boolean) => void;
  fetch: (url: string) => void;
  flagsLoaded: boolean;
  setFlagsLoading: (bool: boolean) => void;
  rebuildFlagsIDDeck: () => void;
  resetFlagsIDArray: () => void;
}

const useFetchStore = create<FetchStore>((set) => ({
  flagsArray: [],
  flagsIDArray: [],
  flagsIDProtoArray: [],
  numberOfFlags: 24,
  flagsIDArrayIsReady: false,
  flagsLoaded: false,

  setNumberOfFlags: (number) => {
    const newArr = selectRandElementsFromArray(
      number,
      useFetchStore.getState().flagsIDArray
    );
    set({ flagsIDArray: newArr });
  },
  setFlagsIDArrayIsReady: (bool) => set({ flagsIDArrayIsReady: bool }),
  setFlagsLoading: (bool) => set({ flagsLoaded: bool }),
  rebuildFlagsIDDeck: () => {
    const newArr = useFetchStore
      .getState()
      .flagsIDArray.filter(
        (el) => el !== useFlagsDeckStore.getState().quizFlag
      );
    set({ flagsIDArray: newArr, flagsIDArrayIsReady: true });
  },

  fetch: async (url) => {
    set({ flagsLoaded: false });

    fetch(url)
      .then((response) => response.json())
      .then((data) => prepareFlagsArray(data.pl, data.en))
      .then((data) => {
        set({
          flagsArray: data,
        });
        return objectArrayToNumbersArray(data);
      })
      .then((data) =>
        set({
          flagsIDArray: data,
          flagsIDProtoArray: data,
          flagsIDArrayIsReady: true,
        })
      )
      .then(() => set({ flagsLoaded: true }));
  },
  resetFlagsIDArray: () =>
    set((state) => ({
      flagsIDArray: state.flagsIDProtoArray,
      flagsIDArrayIsReady: true,
    })),
}));

export default useFetchStore;
