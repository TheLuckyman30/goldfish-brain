import { Link, createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CreateTaskForm } from '../../../components/task/CreateTaskForm';
import { useApiQuery } from '../../../integrations/api';
import fishAnimate from '../../../images/fishAnimate.gif';
import TaskCard from '../../../components/task/TaskCard';
import { EditTaskForm } from '../../../components/task/EditTaskForm';
import type { TaskListTasksOut } from '@repo/api/task-list';
import type { TaskOut } from '@repo/api/task';
import { Loading } from '../../../components/loading/loadingScreen';
import Button from '../../../components/shared-ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Route = createFileRoute(
  '/_protected-routes/task-lists/$taskListID',
)({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskOut | null>(null);
  const { data, isFetching, refetch } = useApiQuery<TaskListTasksOut>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );
  const tasks = data?.tasks ?? [];
  const completeTasks = tasks.filter((t) => t.completed);

  useEffect(() => {
    setEditForm(false);
    setCreateForm(false);
    setSelectedTask(null);
  }, [data]);

  if (isFetching) {
    return <Loading />;
  }

  if (data) {
    return (
      <div
        className="flex justify-center min-h-screen  w-lvw pt-45 bg-no-repeat bg-cover bg-top pb-5"
        style={{
          backgroundImage: `url(${fishAnimate})`,
        }}
      >
        <div className="flex flex-col w-[75%] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] pb-5">
          <h1 className="text-5xl text-center rounded-md bg-[#fddbcd] p-10 text-[#794531fb] font-bold">
            {data.name} Tasks
          </h1>
          <div className="flex flex-col gap-8 ">
            <div className="flex gap-5 mt-5 ml-5">
              <Link to="/task-lists">
                <Button>Back</Button>
              </Link>
              <Button onClick={() => setCreateForm(true)}>Create a Task</Button>
              <Button onClick={() => refetch()}>Refresh</Button>
            </div>
            <hr className="bg-[#fddbcdeb] text-[#fddbcdeb] w-[90%] border-2 border-[#fddbcdeb]"></hr>
            <div className="flex flex-col w-full min-w-full items-center justify-center">
              <div className="flex flex-col gap-5 justify-center items-center ">
                <div className="flex flex-wrap gap-5 w-[50vw] min-w-[50vw]">
                  {tasks.map((task) => (
                    <>
                      {!task.completed && (
                        <TaskCard
                          key={task.id}
                          task={task}
                          setSelectedTask={setSelectedTask}
                          setEditForm={setEditForm}
                        />
                      )}
                    </>
                  ))}
                </div>
                
              </div>
              
            </div>
            <div className="items-center justify-center w-full flex flex-col mb-5">
            {tasks.length > 0 && (
                  <div
                    className="buttonStyling shadow-lg shadow-black/20 min-w-[50vw] w-[50vw] p-2 mb-5"
                    onClick={() => setShowComplete(!showComplete)}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <span>Completed Tasks ({completeTasks.length})</span>
                      <span>
                        {showComplete ? <ChevronDown /> : <ChevronUp />}
                      </span>
                    </div>
                  </div>
                )}
                {showComplete &&
                  (completeTasks.length > 0 ? (
                    <div className="flex flex-wrap gap-5 justify-center w-[50vw] min-w-[50vw]">
                      {completeTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          setSelectedTask={setSelectedTask}
                          setEditForm={setEditForm}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="p-2 rounded-md shadow-md text-[#794531fb] bg-[#fddbcd] text-2xl mt-5 w-[80%]">
                      No completed tasks in this list!
                    </p>
                  ))}
                  </div>
          </div>
          {createForm && (
            <CreateTaskForm
              taskListId={taskListID}
              setCreateForm={setCreateForm}
            />
          )}
          {editForm && (
            <EditTaskForm task={selectedTask} setEditForm={setEditForm} />
          )}
        </div>
      </div>
    );
  }
}
