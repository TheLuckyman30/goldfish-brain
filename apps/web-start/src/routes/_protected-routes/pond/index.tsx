import { createFileRoute } from '@tanstack/react-router';
import { Loading } from '../../../components/loading/loadingScreen';
import { useGameLogic } from '../../../utils/game-logic';
import TaskListForm from '../../../components/pond/TaskListForm';
import CaughtFish from '../../../components/pond/CaughtFish';
import pondBackground from '../../../images/pondBackground.png';
import schoolOfFish from '../../../images/1112Fish.gif';
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
      className="min-h-screen flex items-center justify-center gap-10 pt-10 md:flex-row bg-cover bg-center bg-no-repeat flex-col "
      style={{
        backgroundImage: `url(${pondBackground})`,
      }}
    >
      {allFish.length > 0 && (
        <><div
          className="flex ml-5 w-[40vw] h-[70vh] min-h-[70vh] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] "
          style={{
            backgroundImage: `url(${schoolOfFish})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex flex-row h-full items-center">
            <div className=" w-[50%] min-h-full h-full items-center justify-center text-center flex flex-row flex-wrap p-10 pr-10">
              <button
                className=" min-w-[12vw] w-[12vw] flex min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                onClick={catchRandomFish}
                disabled={activeFish !== null || !uncompletedFish.length}
              >
                Reel
              </button>
              <button
                className=" min-w-[12vw] flex w-[12vw] min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white hover:bg-[#8ac5cd] hover:text-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3"
                onClick={markComplete}
                disabled={!uncompletedFish.length}
              >
                Send to Cooler
              </button>
              <button
                className=" min-w-[12vw] w-[12vw] flex min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                onClick={releaseFish}
                disabled={!activeFish || !uncompletedFish.length}
              >
                Release
              </button>
              <button
                className=" min-w-[12vw] w-[12vw] flex min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                onClick={resetGame}
              >
                Reset Pond
              </button>
              <button
                className=" min-w-[12vw] w-[12vw] flex text-center items-center justify-center min-h-[8vh] h-[8vh] bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                onClick={saveGame}
              >
                Save Game{' '}
              </button>
              <button
                className=" min-w-[5vw] w-[12vw] flex min-h-[5vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                onClick={endGame}
              >
                End Game
              </button>
            </div>

          </div>

        </div>
        
        <div className=" bg-[#538f97] flex text-left items-center text-3xl rounded-[10px] text-white p-5 w-[40vw] h-[70vh] min-h-[70vh] justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">

            Fish Caught:
            <br></br>
            {activeFish && <CaughtFish caughtFish={activeFish} />}
          </div>
          
         
          </>
      )}
      {allFish.length === 0 && <TaskListForm />}
    </div>
  );
}
