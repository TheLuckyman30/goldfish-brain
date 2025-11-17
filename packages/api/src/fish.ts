import { z } from 'zod';
import { TaskOut } from './task';

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

export const CompletedFishOut = z.object({
  id: z.uuid(),
  completed: z.boolean(),
});
export type CompletedFishOut = z.infer<typeof CompletedFishOut>;

export const MarkAllIncompleteDto = z.object({
  taskListId: z.uuid(),
});
export type MarkAllIncompleteDto = z.infer<typeof MarkAllIncompleteDto>;
