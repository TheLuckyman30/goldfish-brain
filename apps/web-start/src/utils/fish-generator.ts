import { TaskOut } from '@repo/api/task';
import { CreateFish } from '@repo/api/fish';

export function fishGenerator(tasks: Array<TaskOut>): Array<CreateFish> {
  const fish: Array<CreateFish> = [];
  for (const task of tasks) {
    const size = Math.floor(Math.random() * 5) + 1;
    const rarity = Math.floor(Math.random() * 11);
    const newFish: CreateFish = { taskId: task.id, size: size, rarity: rarity };
    fish.push(newFish);
  }
  return fish;
}
