import { z } from 'zod';

export const FishOut = z.object({
  id: z.uuid(),
  taskId: z.uuid(),
  size: z.int(),
  rarity: z.int(),
});
export type FishOut = z.infer<typeof FishOut>;

export const CreateFish = z.object({
  taskId: z.uuid(),
  size: z.int(),
  rarity: z.int(),
});
export type CreateFish = z.infer<typeof CreateFish>;
