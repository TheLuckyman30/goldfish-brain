import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { Loading } from '../../../components/loading/loadingScreen';
import { useEffect, useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import type { FishOut, UpdateAllFish, UpdateFish } from '@repo/api/fish';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import type { DeleteGame, GameOut, GameOutWithFish } from '@repo/api/game';
import pondBackground from '../../../images/pondBackground.png';
import { useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../../../zustand/game-store';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const {
    game,
    completed,
    numCompleted,
    caughtFish,
    setGame,
    setCompleted,
    setNumCompleted,
    setCaughtFish,
  } = useGameStore();
  const queryClient = useQueryClient();

  const { data: fetchedGame, isFetching: gameIsFetching } =
    useApiQuery<GameOutWithFish>(['game'], `/game`);

  const updateFish = useApiMutation<UpdateFish, FishOut>({
    endpoint: () => ({
      path: `/fish/one`,
      method: 'PATCH',
    }),
  });
  const [showForm, setShowForm] = useState<boolean>(!game);
  const updateAllFish = useApiMutation<UpdateAllFish, { count: number }>({
    endpoint: () => ({
      path: '/fish/all',
      method: 'PATCH',
    }),
  });
  const deleteGame = useApiMutation<DeleteGame, GameOut>({
    endpoint: () => ({ path: '/game', method: 'DELETE' }),
    onSuccessFunc: () => {
      queryClient.setQueryData(['game'], null);
      setShowForm(true);
    },
  });

  useEffect(() => {
    setGame(fetchedGame);
  }, [fetchedGame]);

  function catchRandomFish() {
    if (game) {
      const uncompletedFish = game.fish.filter((f) => !f.completed);
      const random = Math.floor(Math.random() * uncompletedFish.length);
      const caught = uncompletedFish[random];
      if (caught) {
        setCaughtFish(caught);
      }
    }
  }

  function markComplete() {
    if (caughtFish && game) {
      caughtFish.completed = true;
      caughtFish.isActive = false;
      const newNumCompleted = numCompleted + 1;
      setCompleted(newNumCompleted === game.fish.length);
      setNumCompleted(newNumCompleted);
      setCaughtFish(null);
    }
  }

  function markAllIncomplete() {
    if (game) {
      game.fish.forEach((f) => {
        f.completed = false;
        f.isActive = false;
      });
      setGame(game);
      setCompleted(false);
      setNumCompleted(0);
      setCaughtFish(null);
    }
  }

  function releaseFish() {
    if (caughtFish) {
      caughtFish.isActive = false;
      setCaughtFish(null);
    }
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
            disabled={caughtFish !== null || completed}
          >
            Reel
          </Button>
          <Button onClick={markComplete} disabled={completed}>
            Send to Cooler
          </Button>
          <Button onClick={releaseFish} disabled={!caughtFish || completed}>
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
