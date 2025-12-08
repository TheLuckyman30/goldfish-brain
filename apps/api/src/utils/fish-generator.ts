import { TaskOut } from '@repo/api/task';
import { CreateFish } from '@repo/api/fish';

export function generateFishAttributes() {
  const size = Math.floor(Math.random() * 9 + 1);
  const rarity = Math.floor(Math.random() * 11);
  return { size, rarity };
}

export function fishGenerator(
  tasks: { id: string; completed: boolean }[],
): Array<CreateFish> {
  const fish: Array<CreateFish> = [];
  for (const task of tasks) {
    const { size, rarity } = generateFishAttributes();
    const newFish: CreateFish = {
      taskId: task.id,
      size,
      rarity,
      completed: task.completed,
    };
    fish.push(newFish);
  }
  return fish;
}
