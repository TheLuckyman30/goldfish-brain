import { z } from 'zod';
import { TaskOut } from './task';

export const TaskListOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  folderId: z.uuid(),
  name: z.string(),
  description: z.string()
});
export type TaskListOut = z.infer<typeof TaskListOut>;

export const TaskListTasksOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  folderId: z.uuid(),
  name: z.string(),
  description: z.string(),
  tasks: z.array(TaskOut)
});
export type TaskListTasksOut = z.infer<typeof TaskListTasksOut>

export const CreateTaskList = z.object({
  userId: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  folderId: z.uuid().nullable(),
});
export type CreateTaskList = z.infer<typeof CreateTaskList>