import { z } from 'zod';

export const UserOut = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
export type UserOut = z.infer<typeof UserOut>;

export const UpdateUser = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
export type UpdateUser = z.infer<typeof UpdateUser>;

export const UpdateUsername = z.object({
  username: z.string(),
});
export type UpdateUsername = z.infer<typeof UpdateUsername>;
