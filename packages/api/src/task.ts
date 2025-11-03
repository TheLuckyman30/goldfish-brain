import { z } from 'zod';

export const TaskOut = z.object({
  id: z.uuid(),
  taskListId: z.uuid(),
  name: z.string(),
  description: z.string(),
  dueBy: z.date(),
});
export type TaskOut = z.infer<typeof TaskOut>;

export const CreateTask = z.object({
  taskListId: z.uuid().nullable(),
  name: z.uuid(),
  description: z.string().nullable(),
  dueBy: z.iso.datetime().nullable(),
});
export type CreateTask = z.infer<typeof CreateTask>
