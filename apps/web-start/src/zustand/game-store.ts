import { FishOutWithTask } from '@repo/api/fish';
import { GameOutWithFish } from '@repo/api/game';
import { create } from 'zustand';

type GameStore = {
  game: GameOutWithFish | null | undefined;
  completed: boolean;
  numCompleted: number;
  caughtFish: FishOutWithTask | null;
  setGame: (newGame: GameOutWithFish | null | undefined) => void;
  setCompleted: (isCompleted: boolean) => void;
  setNumCompleted: (newNumCompleted: number) => void;
  setCaughtFish: (newCaughtFish: FishOutWithTask | null) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  game: null,
  completed: false,
  numCompleted: 0,
  caughtFish: null,
  setGame: (newGame: GameOutWithFish | null | undefined) => {
    set({ game: newGame });
  },
  setCompleted: (isCompleted: boolean) => {
    set({ completed: isCompleted });
  },
  setNumCompleted: (newNumCompleted: number) => {
    set({ numCompleted: newNumCompleted });
  },
  setCaughtFish: (newCaughtFish: FishOutWithTask | null) => {
    set({ caughtFish: newCaughtFish });
  },
}));
