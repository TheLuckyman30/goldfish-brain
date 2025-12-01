import { DeleteGame, GameOut, GameOutWithFish } from '@repo/api/game';
import { useApiMutation, useApiQuery } from '../integrations/api';
import { FishOut, UpdateAllFish } from '@repo/api/fish';
import { useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../zustand/game-store';
import { useState } from 'react';

export function useGameLogic() {
  const {
    allFish,
    uncompletedFish,
    activeFish,
    setFish,
    setUncompletedFish,
    setActiveFish,
  } = useGameStore();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState<boolean>(!allFish.length);

  const { data, isFetching } = useApiQuery<GameOutWithFish>(['game'], `/game`);
  const updateAllFish = useApiMutation<UpdateAllFish, FishOut>({
    endpoint: () => ({
      path: '/fish/all',
      method: 'PATCH',
    }),
  });
  const deleteGame = useApiMutation<DeleteGame, GameOut>({
    endpoint: () => ({ path: '/game', method: 'DELETE' }),
    onSuccessFunc: () => {
      queryClient.setQueryData(['game'], null);
      setFish([]);
      setShowForm(true);
    },
  });

  function catchRandomFish() {
    const random = Math.floor(Math.random() * uncompletedFish.length);
    const caught = uncompletedFish[random];
    if (caught) {
      const updatedFish = allFish.map((fish) => {
        if (fish.id === caught.id) {
          return { ...fish, isActive: true };
        }
        return fish;
      });
      setFish(updatedFish);
      setActiveFish(caught);
    }
  }

  function markComplete() {
    if (activeFish) {
      const updatedFish = allFish.map((fish) => {
        if (fish.id === activeFish.id) {
          return { ...fish, completed: true, isActive: false };
        }
        return fish;
      });
      setFish(updatedFish);
      setUncompletedFish(updatedFish.filter((fish) => !fish.completed));
      setActiveFish(null);
    }
  }

  function markAllIncomplete() {
    const updatedFish = allFish.map((fish) => ({
      ...fish,
      completed: false,
      isActive: false,
    }));
    setFish(updatedFish);
    setUncompletedFish(updatedFish);
    setActiveFish(null);
  }

  function releaseFish() {
    if (activeFish) {
      const updatedFish = allFish.map((fish) => {
        if (fish.id === activeFish.id) {
          return { ...fish, isActive: false };
        }
        return fish;
      });
      setFish(updatedFish);
      setActiveFish(null);
    }
  }

  function endGame() {
    if (data) {
      deleteGame.mutate({ id: data.id });
    }
  }

  function saveGame() {
    if (data) {
      updateAllFish.mutate({
        gameId: data.id,
        fish: allFish,
      });
    }
  }

  return {
    data,
    allFish,
    uncompletedFish,
    activeFish,
    isFetching,
    showForm,
    setFish,
    setUncompletedFish,
    setActiveFish,
    setShowForm,
    catchRandomFish,
    markComplete,
    markAllIncomplete,
    releaseFish,
    endGame,
    saveGame,
  };
}
