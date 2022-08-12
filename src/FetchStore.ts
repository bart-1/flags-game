import create from "zustand";

export type FlagType = { id: number; prefix: string; pl: string; en: string };

interface FetchStore {
  flagsArray: FlagType[];
  fetch: (url: string) => void;
  flagsLoading: boolean;
  setFlagsLoading: (bool: boolean) => void;
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

const useFetchStore = create<FetchStore>((set) => ({
  flagsArray: [],
  flagsLoading: true,
  setFlagsLoading: (bool) => set({ flagsLoading: bool }),

  fetch: async (url) => {
    set({ flagsLoading: true });
    const response = await fetch(url)
      .then((response) => response.json())
      .then((response) =>
        set({ flagsArray: prepareFlagsArray(response.pl, response.en) })
      )
      .then((response) => set({ flagsLoading: false }))
      .catch((err) => console.log(err));
  },
}));

export default useFetchStore;
