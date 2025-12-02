import { z } from 'zod';

export const TaskOut = z.object({
  id: z.uuid(),
  taskListId: z.uuid(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  dueBy: z.date(),
});
export type TaskOut = z.infer<typeof TaskOut>;

export const CreateTask = z.object({
  taskListId: z.uuid(),
  name: z.uuid(),
  description: z.string().nullable(),
  dueBy: z.iso.datetime().nullable(),
});
export type CreateTask = z.infer<typeof CreateTask>;

export const UpdateTask = z.object({
  id: z.uuid(),
  taskListId: z.uuid(),
  name: z.uuid().nullable(),
  description: z.string().nullable(),
  completed: z.boolean().nullable(),
  dueBy: z.iso.datetime().nullable(),
});
export type UpdateTask = z.infer<typeof UpdateTask>;

export const DeleteTask = z.object({
  id: z.uuid(),
  taskListId: z.uuid(),
});
export type DeleteTask = z.infer<typeof DeleteTask>;
