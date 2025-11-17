import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import type { FishOutWithTask } from '@repo/api/fish';
import type { GameOutWithFish } from '@repo/api/game';
import { Loading } from '../../../components/loading/loadingScreen';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [caughtFish, setCaughtFish] = useState<FishOutWithTask | null>(null);

  const { data: game, isFetching: gameIsFetching } =
    useApiQuery<GameOutWithFish>(['game'], `/game`);
  const completeFish = useApiMutation<{ id: string }>({
    endpoint: ({ id }) => ({
      path: `/fish/${id}/complete`,
      method: 'PATCH',
    }),
    // refetch
    invalidateKeys: [['game']],
  });
  const resetCompletion = useApiMutation<{ taskListId: string }>({
    endpoint: () => ({
      path: '/fish/reset',
      method: 'PATCH',
    }),
    invalidateKeys: [['game']],
  });

  function catchRandomFish() {
    if (game) {
      const uncompletedFish = game.fish.filter((f) => !f.completed);
      const random = Math.floor(Math.random() * uncompletedFish.length);
      const caught = uncompletedFish[random];
      setCaughtFish(caught ?? null);
    }
  }

  function markComplete() {
    if (caughtFish) {
      completeFish.mutate({ id: caughtFish.id });
      setCaughtFish(null);
    }
  }

  function markAllIncomplete() {
    if (game) {
      resetCompletion.mutate({ taskListId: game.id });
      setCaughtFish(null);
    }
  }

  function releaseFish() {
    setCaughtFish(null);
  }

  if (gameIsFetching && !game) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      {game && (
        <div>
          <Button
            onClick={catchRandomFish}
            disabled={caughtFish?.completed ?? false}
          >
            Reel
          </Button>
          <Button onClick={markComplete}>Send to Cooler</Button>
          <Button onClick={releaseFish} disabled={!caughtFish}>
            Release
          </Button>
          {caughtFish && <CaughtFish caughtFish={caughtFish} />}
          <Button onClick={markAllIncomplete}>Reset Pond</Button>
        </div>
      )}
      <TaskListForm showForm={showForm && !game} setShowForm={setShowForm} />
    </div>
  );
}
