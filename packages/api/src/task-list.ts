import { z } from 'zod';

export const TaskListOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  folderId: z.uuid(),
  name: z.string(),
  description: z.string(),
});
export type TaskListOut = z.infer<typeof TaskListOut>;
