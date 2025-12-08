import { createFileRoute } from '@tanstack/react-router';
import { Loading } from '../../../components/loading/loadingScreen';
import { useGameLogic } from '../../../utils/game-logic';
import TaskListForm from '../../../components/pond/TaskListForm';
import CaughtFish from '../../../components/pond/CaughtFish';
import pondBackground from '../../../images/pondBackgroundNew.png';
import fisherman from '../../../images/fisherman.png';
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
      className="min-h-screen flex place-items-center justify-left gap-10 pt-10 md:flex-row bg-cover bg-center bg-no-repeat flex-col "
      style={{
        backgroundImage: `url(${pondBackground})`,
      }}
    >
      {allFish.length > 0 && (
        <>
          <div
            className="flex w-[40vw] ml-10 h-[80vh] min-h-[80vh] mt-10 bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] "
            style={{
              backgroundImage: `url(${schoolOfFish})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="flex flex-col h-full items-center">
              <div className="flex flex-row mt-auto mb-5">
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
                  className=" min-w-[5vw] w-[12vw] flex min-h-[5vh] h-[8vh] text-center items-center justify-center bg-[#8ac5cd] rounded-[60px] text-2xl text-white mb-3 ml-3  hover:bg-[#78caa4] hover:text-white"
                  onClick={endGame}
                >
                  End Game
                </button>
              </div>
            </div>
          </div>

          <section className= "items-center justify-center text-center flex flex-col ml-[10vw]">
            <div className=" w-[50%] min-h-full h-full items-center justify-center text-center flex flex-row flex-wrap mt-10">
              <button
                className=" min-w-[15vw] w-[15vw] flex min-h-[10vh] h-[10vh] text-center items-center justify-center bg-[#538f97] rounded-[60px] 
                text-3xl text-white shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] hover:bg-[#8ac5cd] hover:text-white"
                onClick={catchRandomFish}
                disabled={activeFish !== null || !uncompletedFish.length}
              >
                Reel
              </button>
            </div>

            <div className=" bg-[#538f97] flex flex-col text-left items-center text-3xl mt-5 rounded-[10px] text-white p-5 w-[30vw] h-[68vh] min-h-[68vh] justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">
              <div>
                Fish Caught:
                <br></br>
                {activeFish && <CaughtFish caughtFish={activeFish} />}
              </div>

              <div className="flex flex-row  mt-auto">
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
              </div>
            </div>
          </section>
        </>
      )}
      {allFish.length === 0 && <TaskListForm />}
    </div>
  );
}
