import { FishOutWithTask } from '@repo/api/fish';

interface CaughtFishProps {
  caughtFish: FishOutWithTask;
}

function CaughtFish({ caughtFish }: CaughtFishProps) {
  return (
    <div>
      <div>Rarity: {caughtFish.rarity}</div>
      <div>Size: {caughtFish.size}</div>
      <div>Task Name: {caughtFish.task.name}</div>
      <div>Task Description: {caughtFish.task.description}</div>
    </div>
  );
}

export default CaughtFish;
