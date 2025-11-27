import { FishOutWithTask } from '@repo/api/fish';
import { GameOutWithFish } from '@repo/api/game';
import { create } from 'zustand';

type GameStore = {
  game: GameOutWithFish | null | undefined;
  allFish: FishOutWithTask[];
  caughtFish: FishOutWithTask | null;
  setGame: (newGame: GameOutWithFish | null) => void;
  setAllFish: (newFish: FishOutWithTask[]) => void;
  setCaughtFish: (newCaughtFish: FishOutWithTask | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  allFish: [],
  caughtFish: null,
  setGame: (newGame: GameOutWithFish | null | undefined) => {
    set({ game: newGame });
  },
  setAllFish: (newFish: FishOutWithTask[]) => {
    set({ allFish: newFish });
  },
  setCaughtFish: (newCaughtFish: FishOutWithTask | null) => {
    set({ caughtFish: newCaughtFish });
  },
}));
