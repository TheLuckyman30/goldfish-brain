import { z } from 'zod';
import { TaskOut } from './task';

export const TaskListOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  folderId: z.uuid().nullable(),
  name: z.string(),
  description: z.string().nullable(),
});
export type TaskListOut = z.infer<typeof TaskListOut>;

export const TaskListTasksOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  folderId: z.uuid().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  tasks: z.array(TaskOut)
});
export type TaskListTasksOut = z.infer<typeof TaskListTasksOut>

export const CreateTaskList = z.object({
  name: z.string(),
  description: z.string().nullable(),
  folderId: z.uuid().nullable(),
});
export type CreateTaskList = z.infer<typeof CreateTaskList>

export const UpdateTaskList = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  name: z.string().nullable(),
  description: z.string().nullable(),
});
export type UpdateTaskList = z.infer<typeof UpdateTaskList>;

export const DeleteTaskList = z.object({
  id: z.uuid(),
  userId: z.uuid()
});
export type DeleteTaskList = z.infer<typeof DeleteTaskList>;