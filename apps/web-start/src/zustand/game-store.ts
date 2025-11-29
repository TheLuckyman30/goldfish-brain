import { FishOutWithTask } from '@repo/api/fish';
import { create } from 'zustand';

type GameStore = {
  allFish: FishOutWithTask[];
  completed: boolean;
  numCompleted: number;
  activeFish: FishOutWithTask | null;
  setFish: (newFish: FishOutWithTask[]) => void;
  setCompleted: (isCompleted: boolean) => void;
  setNumCompleted: (newNumCompleted: number) => void;
  setActiveFish: (newActive: FishOutWithTask | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  allFish: [],
  completed: false,
  numCompleted: 0,
  activeFish: null,
  setFish: (newFish: FishOutWithTask[]) => {
    set({ allFish: newFish });
  },
  setCompleted: (isCompleted: boolean) => {
    set({ completed: isCompleted });
  },
  setNumCompleted: (newNumCompleted: number) => {
    set({ numCompleted: newNumCompleted });
  },
  setActiveFish: (newActive: FishOutWithTask | null) => {
    set({ activeFish: newActive });
  },
}));
