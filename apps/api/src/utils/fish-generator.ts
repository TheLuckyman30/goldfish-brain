import { TaskOut } from '@repo/api/task';
import { CreateFish } from '@repo/api/fish';

export function generateFishAttributes() {
  const size = Math.floor(Math.random() * 9 + 1);
  const rarity = Math.floor(Math.random() * 11);
  const imageIndex = Math.floor(Math.random() * 9);
  return { size, rarity, imageIndex };
}

export function fishGenerator(
  tasks: { id: string; completed: boolean }[],
): Array<CreateFish> {
  const fish: Array<CreateFish> = [];
  for (const task of tasks) {
    const { size, rarity, imageIndex } = generateFishAttributes();
    const newFish: CreateFish = {
      taskId: task.id,
      size,
      rarity,
      imageIndex,
      completed: task.completed,
    };
    fish.push(newFish);
  }
  return fish;
}
