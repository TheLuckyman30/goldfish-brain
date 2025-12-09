import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import Button from '../shared-ui/Button';
import { useApiMutation, useApiQuery } from '../../integrations/api';
import { useState } from 'react';
import { CreateGame, GameOut } from '@repo/api/game';
import Backdrop from '../shared-ui/Backdrop';
import { Link } from '@tanstack/react-router';

function TaskListForm() {
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );
  const { data: lists = [], isFetching: listsIsFetching } = useApiQuery<
    Array<TaskListOut>
  >(['task-lists'], '/task-lists');
  const { data: taskList, isFetching: taskListIsFetching } =
    useApiQuery<TaskListTasksOut>(
      ['task-list', selectedTaskList?.id],
      `/task-lists/${selectedTaskList?.id}/tasks`,
      {},
      !!selectedTaskList,
    );
  const mutation = useApiMutation<CreateGame, GameOut>({
    endpoint: () => ({ path: '/game', method: 'POST' }),
    invalidateKeys: [['game']],
  });

  function handleSubmit() {
    if (selectedTaskList) {
      mutation.mutate({ taskListId: selectedTaskList.id });
    }
  }

  if (listsIsFetching) {
    return <div></div>;
  }

  return (
    <Backdrop>
      <div className="bg-[#538f97] min-w-[70%] min-h-[75%] w-[70%] h-[75%] rounded-[60px] flex items-center flex-col mt-5 ">
        <div className="text-4xl text-center rounded-md p-10 text-white">
          Select A Task List to Play
        </div>
        <section className="flex-row flex gap-2">
          <div className="bg-white min-w-[20vw] min-h-[50vh] w-[25vw] h-[56vh] rounded-[60px] mr-5 m-2 p-3 flex items-center flex-col text-blue-600">
            <div className=" flex text-3xl text-center justify-center rounded-md p-5 text-[#794531fb]">
              Lists:
            </div>
            <section className="flex flex-col overflow-y-auto">
              <Link
                to="/task-lists"
                className=" justify-center text-center flex min-w-[15vw] w-[18vw] min-h-[6vh] p-2 mb-3 bg-[#83c0c8] hover:bg-[#538f97] duration-100 rounded-[60px] text-2xl text-white "
              >
                Create Task List
              </Link>

              <hr className="border  text-[#8d4f36ef] flex mb-5"></hr>
              {lists.map((list) => (
                <button
                  className="min-w-[12vw] w-[18vw] min-h-[6vh] p-1 mb-3 bg-[#794531fb] hover:bg-[#8d4f36ef] duration-100 rounded-[60px] text-[20px] text-white cursor-pointer"
                  key={list.id}
                  value={JSON.stringify(list)}
                  onClick={(e) =>
                    setSelectedTaskList(JSON.parse(e.currentTarget.value))
                  }
                >
                  {list.name}
                </button>
              ))}
            </section>
          </div>
          <div className=" border-l-[3px]  text-white h-[50vh] flex"></div>
          <section className="flex-col flex items-center">
            <div className="bg-white min-w-[30vw] min-h-[35vh] w-[35vw] h-[45vh] rounded-[60px] ml-5 m-2 p-3 flex flex-col text-center ">
              <div className=" flex text-3xl text-center items-center justify-center rounded-md p-5 text-[#794531fb]">
                Preview Tasks:{' '}
              </div>
              <section className="flex flex-col  w-full overflow-y-auto mb-3">
                {taskList && (
                  <div className="w-full p-5">
                    {taskList.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-stretch justify-between min-w-[16vw] w-[30vw] min-h-[10vh] mb-3 rounded-[60px] overflow-hidden shadow-sm"
                      >
                        <div className=" bg-[#794531fb] min-w-[12vw] w-[12vw] text-white flex text-center items-center justify-center px-6 text-[20px]">
                          {task.name}
                        </div>

                        <div className=" bg-[#c98c74fb] text-[#f9efea] min-w-[18vw] w-[18vw] flex items-center justify-left px-4 text-[18px] text-left">
                          {task.description !== ''
                            ? task.description
                            : 'No Description'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
            <Button
              className="bg-white hover:bg-[#794531fb] min-w-[30vw] min-h-[10vh] h-[10vh] rounded-[60px] ml-5 m-2 p-3 flex items-center text-center justify-center text-[#794531fb] hover:text-white duration-200 text-3xl cursor-pointer"
              type="submit"
              disabled={!taskList || taskListIsFetching}
              onClick={handleSubmit}
            >
              {taskListIsFetching && <span>Loading...</span>}
              {!taskListIsFetching && <span>Play</span>}
            </Button>
          </section>
        </section>
      </div>
    </Backdrop>
  );
}

export default TaskListForm;
