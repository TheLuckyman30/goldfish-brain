import { z } from 'zod';

export const FolderOut = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  name: z.string(),
  description: z.string(),
});
export type FolderOut = z.infer<typeof FolderOut>;
