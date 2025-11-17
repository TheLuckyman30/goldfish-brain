import { z } from 'zod';
import { CreateFish, FishOutWithTask } from './fish';

export const GameOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
});
export type GameOut = z.infer<typeof GameOut>;

export const GameOutWithFish = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  fish: z.array(FishOutWithTask),
});
export type GameOutWithFish = z.infer<typeof GameOutWithFish>;

export const CreateGame = z.object({
  fish: z.array(CreateFish),
});
export type CreateGame = z.infer<typeof CreateGame>;
