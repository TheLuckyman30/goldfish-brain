import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import type {
  FishOut,
  FishOutWithTask,
  UpdateAllFish,
  UpdateFish,
} from '@repo/api/fish';
import { DeleteGame, GameOut, type GameOutWithFish } from '@repo/api/game';
import { Loading } from '../../../components/loading/loadingScreen';
import pondBackground from '../../../images/pondBackground.png';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [caughtFish, setCaughtFish] = useState<FishOutWithTask | null>(null);

  const { data: game, isFetching: gameIsFetching } =
    useApiQuery<GameOutWithFish>(['game'], `/game`);
  const updateFish = useApiMutation<UpdateFish, FishOut>({
    endpoint: () => ({
      path: `/fish/one`,
      method: 'PATCH',
    }),
    invalidateKeys: [['game']],
  });
  const [showForm, setShowForm] = useState<boolean>(!game);
  const updateAllFish = useApiMutation<UpdateAllFish, { count: number }>({
    endpoint: () => ({
      path: '/fish/all',
      method: 'PATCH',
    }),
    invalidateKeys: [['game']],
  });
  const deleteGame = useApiMutation<DeleteGame, GameOut>({
    endpoint: () => ({ path: '/game', method: 'DELETE' }),
    invalidateKeys: [['game']],
  });

  function catchRandomFish() {
    if (game) {
      const uncompletedFish = game.fish.filter((f) => !f.completed);
      const random = Math.floor(Math.random() * uncompletedFish.length);
      const caught = uncompletedFish[random];
      if (caught) {
        updateFish.mutate({ id: caught.id, isActive: true });
        setCaughtFish(caught);
      }
    }
  }

  function markComplete() {
    if (caughtFish) {
      updateFish.mutate({
        id: caughtFish.id,
        completed: true,
        isActive: false,
      });
      setCaughtFish(null);
    }
  }

  function markAllIncomplete() {
    if (game) {
      updateAllFish.mutate({
        gameId: game.id,
        completed: false,
        isActive: false,
      });
      setCaughtFish(null);
    }
  }

  function releaseFish() {
    if (caughtFish) {
      updateFish.mutate({ id: caughtFish.id, isActive: false });
    }
    setCaughtFish(null);
  }

  function endGame() {
    if (game) {
      deleteGame.mutate({ id: game.id });
    }
  }

  if (gameIsFetching) {
    return <Loading />;
  }

  return (
    <div
      className="flex justify-center min-h-screen w-lvw pt-45 bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: `url(${pondBackground})`,
      }}
    >
      {game && !gameIsFetching && (
        <div className="flex flex-col w-fit h-fit bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] p-10 items-center gap-8">
          <Button
            onClick={catchRandomFish}
            disabled={caughtFish !== null || game.fish.length === 0}
          >
            Reel
          </Button>
          <Button onClick={markComplete} disabled={game.fish.length === 0}>
            Send to Cooler
          </Button>
          <Button
            onClick={releaseFish}
            disabled={!caughtFish || game.fish.length === 0}
          >
            Release
          </Button>
          {caughtFish && <CaughtFish caughtFish={caughtFish} />}
          <Button onClick={markAllIncomplete}>Reset Pond</Button>
          <Button onClick={endGame}>End Game</Button>
        </div>
      )}
      {!gameIsFetching && (
        <TaskListForm showForm={showForm && !game} setShowForm={setShowForm} />
      )}
    </div>
  );
}
