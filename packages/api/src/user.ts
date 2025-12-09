import { z } from 'zod';

export const UserOut = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
export type UserOut = z.infer<typeof UserOut>;

export const UpdateUser = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
});
export type UpdateUser = z.infer<typeof UpdateUser>;
