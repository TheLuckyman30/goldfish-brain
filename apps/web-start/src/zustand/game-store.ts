import { FishOutWithTask } from '@repo/api/fish';
import { GameOutWithFish } from '@repo/api/game';
import { create } from 'zustand';

type GameStore = {
  game: GameOutWithFish | null | undefined;
  allFish: FishOutWithTask[];
  selectedFish: FishOutWithTask | null;
  setGame: (newGame: GameOutWithFish | null) => void;
  setAllFish: (newFish: FishOutWithTask[]) => void;
  setSelectedFish: (newSelectedFish: FishOutWithTask | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  allFish: [],
  selectedFish: null,
  setGame: (newGame: GameOutWithFish | null | undefined) => {
    set({ game: newGame });
  },
  setAllFish: (newFish: FishOutWithTask[]) => {
    set({ allFish: newFish });
  },
  setSelectedFish: (newSelectedFish: FishOutWithTask | null) => {
    set({ selectedFish: newSelectedFish });
  },
}));
