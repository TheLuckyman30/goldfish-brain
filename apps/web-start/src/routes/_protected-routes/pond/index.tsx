import { createFileRoute } from '@tanstack/react-router';

import { Loading } from '../../../components/loading/loadingScreen';
import { useEffect, useRef } from 'react';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import pondBackground from '../../../images/pondBackground.png';
import { useGameLogic } from '../../../utils/game-logic';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const {
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
  } = useGameLogic();
  const saveRef = useRef(saveGame);

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
    const handle = () => {
      saveRef.current();
    };
    window.addEventListener('beforeunload', handle);
    return () => {
      saveRef.current();
      window.removeEventListener('beforeunload', handle);
    };
  }, []);

  useEffect(() => {
    saveRef.current = saveGame;
  });

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div
      className="flex justify-center min-h-screen w-lvw pt-45 bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: `url(${pondBackground})`,
      }}
    >
      {allFish.length && !isFetching && (
        <div className="flex flex-col w-fit h-fit bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] p-10 items-center gap-8">
          <Button
            onClick={catchRandomFish}
            disabled={activeFish !== null || !uncompletedFish.length}
          >
            Reel
          </Button>
          <Button onClick={markComplete} disabled={!uncompletedFish.length}>
            Send to Cooler
          </Button>
          <Button
            onClick={releaseFish}
            disabled={!activeFish || !uncompletedFish.length}
          >
            Release
          </Button>
          {activeFish && <CaughtFish caughtFish={activeFish} />}
          <Button onClick={markAllIncomplete}>Reset Pond</Button>
          <Button onClick={saveGame}>Save Game </Button>
          <Button onClick={endGame}>End Game</Button>
        </div>
      )}
      {!isFetching && (
        <TaskListForm
          showForm={showForm && !allFish.length}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}
