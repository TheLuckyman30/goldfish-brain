import { z } from 'zod';
import { TaskOut } from './task';

export const FishOut = z.object({
  id: z.uuid(),
  taskId: z.uuid(),
  size: z.int(),
  rarity: z.int(),
  isActive: z.boolean(),
  completed: z.boolean(),
});
export type FishOut = z.infer<typeof FishOut>;

export const FishOutWithTask = z.object({
  id: z.uuid(),
  taskId: z.uuid(),
  size: z.int(),
  rarity: z.int(),
  isActive: z.boolean(),
  completed: z.boolean(),
  task: TaskOut,
});
export type FishOutWithTask = z.infer<typeof FishOutWithTask>;

export const CreateFish = z.object({
  taskId: z.uuid(),
  size: z.int(),
  rarity: z.int(),
});
export type CreateFish = z.infer<typeof CreateFish>;

export const UpdateFish = z.object({
  id: z.uuid(),
  isActive: z.boolean().optional(),
  completed: z.boolean().optional(),
});
export type UpdateFish = z.infer<typeof UpdateFish>;

export const UpdateAllFish = z.object({
  gameId: z.uuid(),
  isActive: z.boolean().optional(),
  completed: z.boolean().optional(),
});
export type UpdateAllFish = z.infer<typeof UpdateAllFish>;
