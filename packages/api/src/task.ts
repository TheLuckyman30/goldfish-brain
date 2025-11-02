import {z} from "zod";

export const TaskOut = z.object({
    id: z.uuid(),
    taskListId: z.uuid(),
    name: z.string(),
    description: z.string(),
    dueBy: z.date()
});
export type TaskOut = z.infer<typeof TaskOut>;