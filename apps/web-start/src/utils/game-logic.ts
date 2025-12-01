import { DeleteGame, GameOut, GameOutWithFish } from '@repo/api/game';
import { useApiMutation, useApiQuery } from '../integrations/api';
import { FishOut, UpdateAllFish } from '@repo/api/fish';
import { useQueryClient } from '@tanstack/react-query';
import { useGameStore } from '../zustand/game-store';
import { useEffect, useRef } from 'react';

export function useGameLogic() {
  /////////////////////////////////////////////////////////////////////////////////////////////
  // React state

  const {
    allFish,
    uncompletedFish,
    activeFish,
    setFish,
    setUncompletedFish,
    setActiveFish,
  } = useGameStore();
  const queryClient = useQueryClient();
  const saveRef = useRef(saveGame);

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
    },
  });

  /////////////////////////////////////////////////////////////////////////////////////////////
  // useEffects to handle fetching and saving

  useEffect(() => {
    if (data) {
      const newFish = data.fish;
      const newActive = newFish.find((fish) => fish.isActive === true);
      const newUncompleted = newFish.filter((fish) => !fish.completed);
      setFish(newFish);
      setUncompletedFish(newUncompleted);
      if (newActive) {
        setActiveFish(newActive);
      } else {
        setActiveFish(null);
      }
    }
  }, [data]);

  useEffect(() => {
    const autoSave = () => {
      saveRef.current();
    };

    window.addEventListener('beforeunload', autoSave);
    return () => {
      saveRef.current();
      window.removeEventListener('beforeunload', autoSave);
    };
  }, []);

  useEffect(() => {
    saveRef.current = saveGame;
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

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Helper Functions

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

  function resetGame() {
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

  function saveGame() {
    if (data) {
      updateAllFish.mutate({
        gameId: data.id,
        fish: allFish,
      });
    }
  }

  function endGame() {
    if (data) {
      deleteGame.mutate({ id: data.id });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  return {
    data,
    allFish,
    uncompletedFish,
    activeFish,
    isFetching,
    setFish,
    setUncompletedFish,
    setActiveFish,
    catchRandomFish,
    markComplete,
    resetGame,
    releaseFish,
    saveGame,
    endGame,
  };
}
