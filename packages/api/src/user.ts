import { z } from 'zod';

export const UserOut = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
export type UserOut = z.infer<typeof UserOut>;
