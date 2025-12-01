import { createFileRoute } from '@tanstack/react-router';
import { Loading } from '../../../components/loading/loadingScreen';
import { useGameLogic } from '../../../utils/game-logic';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import pondBackground from '../../../images/pondBackground.png';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const {
    allFish,
    uncompletedFish,
    activeFish,
    isFetching,
    catchRandomFish,
    markComplete,
    resetGame,
    releaseFish,
    saveGame,
    endGame,
  } = useGameLogic();

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
      {allFish.length > 0 && (
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
          <Button onClick={resetGame}>Reset Pond</Button>
          <Button onClick={saveGame}>Save Game </Button>
          <Button onClick={endGame}>End Game</Button>
        </div>
      )}
      {allFish.length === 0 && <TaskListForm />}
    </div>
  );
}
