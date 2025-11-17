import { z } from 'zod';
import { FishOutWithTask } from './fish';

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
export type GameOutWithFish = z.infer<typeof GameOut>;

export const CreateGame = z.object({
  userId: z.uuid(),
});
export type CreateGame = z.infer<typeof CreateGame>;
