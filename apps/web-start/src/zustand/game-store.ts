import { FishOutWithTask } from '@repo/api/fish';
import { create } from 'zustand';

type GameStore = {
  allFish: FishOutWithTask[];
  uncompletedFish: FishOutWithTask[];
  activeFish: FishOutWithTask | null;
  setFish: (newFish: FishOutWithTask[]) => void;
  setUncompletedFish: (newUncompleted: FishOutWithTask[]) => void;
  setActiveFish: (newActive: FishOutWithTask | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  allFish: [],
  uncompletedFish: [],
  activeFish: null,
  setFish: (newFish: FishOutWithTask[]) => {
    set({ allFish: newFish });
  },
  setUncompletedFish: (newUncompleted: FishOutWithTask[]) => {
    set({ uncompletedFish: newUncompleted });
  },
  setActiveFish: (newActive: FishOutWithTask | null) => {
    set({ activeFish: newActive });
  },
}));
