import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Loading } from '../../../components/loading/loadingScreen';
import { useGameLogic } from '../../../utils/game-logic';
import TaskListForm from '../../../components/pond/TaskListForm';
import CaughtFish from '../../../components/pond/CaughtFish';
import pondBackground from '../../../images/pondBackgroundNew.png';
import fisherman from '../../../images/fisherman.gif';
import schoolOfFish from '../../../images/1112Fish.gif';
import '../../../components/button.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {

  const [showComplete, setShowComplete] = useState<boolean>(true);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  

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
              <section className="flex-col flex items-center">
                <div className=" bg-white min-w-[30vw] min-h-[60vh] h-[60vh] w-[35vw] rounded-[60px] ml-5 m-2 mt-10 p-3 flex flex-col text-center ">
                  <div className="flex flex-row ">
                    

                    <div className=" flex text-3xl text-center items-center justify-center rounded-md p-5 text-[#794531fb]">
                      <div
                      className="ml-auto mr-5 cursor-pointer text-white text-3xl bg-[#794531fb] rounded-[60px] w-[5vw] h-[5vh] flex items-center justify-center"
                      onClick={() => setShowComplete(!showComplete)}
                    >
                        <span>{showComplete ? <ChevronDown/> : <ChevronUp/>}</span>
                      
                    </div>
                      Uncompleted Tasks:{' '}
                    </div>
                  </div>
                  {showComplete && ( uncompletedFish.length > 0 ? (
                  <section className=" flex flex-col w-full overflow-y-auto mb-3">
                    {uncompletedFish && (
                      <div className="w-full p-5">
                        {uncompletedFish.map((fish) => (
                          <div
                            key={fish.id}
                            className="flex items-stretch justify-between min-w-[16vw] w-[30vw] min-h-[10vh] mb-3 rounded-[60px] overflow-hidden shadow-sm"
                          >
                            <div className=" bg-[#794531fb] min-w-[12vw] w-[12vw] text-white flex text-center items-center justify-center px-6 text-[20px]">
                              {fish.task.name}
                            </div>

                            <div className=" bg-[#c98c74fb] text-[#f9efea] min-w-[18vw] w-[18vw] flex items-center justify-left px-4 text-[18px] text-left">
                              {fish.task.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                  ): <p className="p-2 rounded-[60px] ml-5 shadow-md text-[#794531fb] bg-[#fddbcd] text-2xl w-[80%]"> All tasks completed !!</p>)}

                  <div className="flex flex-row ">
                  <div className=" flex text-3xl text-center items-center justify-center rounded-md p-5 text-[#794531fb]">
                  <div
                      className="ml-auto mr-5 cursor-pointer text-white text-3xl bg-[#794531fb] rounded-[60px] w-[5vw] h-[5vh] flex items-center justify-center"
                      onClick={() => setShowCompleted(!showCompleted)}
                    >
                        <span>{showCompleted ? <ChevronDown/> : <ChevronUp/>}</span>
                      
                    </div>
                    Completed Tasks:{' '}
                  </div>
                  </div>
                  {showCompleted && ( allFish.length !== uncompletedFish.length ? (
                  <section className="flex flex-col  w-full overflow-y-auto mb-3">
                    {allFish && (
                      <div className="w-full p-5">
                        {allFish.map((fish) => (
                          <>
                            {fish.completed && (
                              <div
                                key={fish.id}
                                className="flex items-stretch justify-between min-w-[16vw] w-[30vw] min-h-[10vh] mb-3 rounded-[60px] overflow-hidden shadow-sm"
                              >
                                <div className=" bg-[#794531fb] min-w-[12vw] w-[12vw] text-white flex text-center items-center justify-center px-6 text-[20px]">
                                  {fish.task.name}
                                </div>

                                <div className=" bg-[#c98c74fb] text-[#f9efea] min-w-[18vw] w-[18vw] flex items-center justify-left px-4 text-[18px] text-left">
                                  {fish.task.description}
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    )}
                  </section>
                  ): <p className="p-2 rounded-[60px] ml-5 shadow-md text-[#794531fb] bg-[#fddbcd] text-2xl w-[80%]"> No completed tasks yet. </p>)}
                </div>
              </section>

              <div className="flex flex-row mt-auto mb-5">
                <button
                  className=" shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] min-w-[12vw] w-[12vw] flex min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                  onClick={resetGame}
                >
                  Reset Pond
                </button>
                <button
                  className=" shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] min-w-[12vw] w-[12vw] flex text-center items-center justify-center min-h-[8vh] h-[8vh] bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                  onClick={saveGame}
                >
                  Save Game{' '}
                </button>
                <button
                  className=" shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] min-w-[5vw] w-[12vw] flex min-h-[5vh] h-[8vh] text-center items-center justify-center bg-[#8ac5cd] rounded-[60px] text-2xl text-white mb-3 ml-3  hover:bg-[#78caa4] hover:text-white"
                  onClick={endGame}
                >
                  End Game
                </button>
              </div>
            </div>
          </div>

          <section className="relative flex flex-col items-center text-center ml-[10vw] h-[80vh] w-[30vw]">
            <div className="absolute top-5 left-1/2 -translate-x-1/2">
              <button
                id="showButton"
                className=" min-w-[15vw] w-[15vw] flex min-h-[10vh] h-[10vh] text-center items-center justify-center bg-[#538f97] rounded-[60px] 
                text-3xl text-white shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] hover:bg-[#8ac5cd] hover:text-white"
                onClick={catchRandomFish}
                disabled={activeFish !== null || !uncompletedFish.length}
              >
                Reel
              </button>
            </div>

            <div className="flex flex-row mt-5">
              <img
                src={fisherman}
                alt="Fisherman"
                className=" h-[70vh] min-h[70vh] w-[45vw] min-w-[45vw] mt-10 mr-3"
              />
            </div>

            {activeFish && (
              <div className=" bg-[#538f97] absolute flex-col z-20 text-left items-center text-3xl mt-[14vh] rounded-[10px] text-white p-5 w-[30vw] h-[70vh] min-h-[70vh] justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">
                <div className="mb-5 mt-3 ml-5 text-4xl ">
                  Fish Caught:
                  
                </div>
                
                <div>{activeFish && <CaughtFish caughtFish={activeFish} />}</div>

                <div className="flex flex-row mt-auto bottom-0 absolute mb-3">
                  <button
                    className=" shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] min-w-[12vw] flex w-[12vw] min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white hover:bg-[#8ac5cd] hover:text-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3"
                    onClick={markComplete}
                    disabled={!uncompletedFish.length}
                  >
                    Send to Cooler
                  </button>
                  <button
                    className=" shadow-[3px_5px_0px_0px_rgba(0,0,0,0.5)] min-w-[12vw] w-[12vw] flex min-h-[8vh] h-[8vh] text-center items-center justify-center bg-white rounded-[60px] text-2xl text-[#538f97] mb-3 ml-3  hover:bg-[#8ac5cd] hover:text-white"
                    onClick={releaseFish}
                    disabled={!activeFish || !uncompletedFish.length}
                  >
                    Release
                  </button>
                </div>
              </div>
            )}
          </section>
        </>
      )}
      {allFish.length === 0 && <TaskListForm />}
    </div>
  );
}
