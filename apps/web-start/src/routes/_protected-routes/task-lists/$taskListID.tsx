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
  const { data, isFetching, refetch, error } = useApiQuery<TaskListTasksOut>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );
  const tasks = data?.tasks ?? [];
  const incompleteTasks = tasks.filter((t) => !t.completed);
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
        className="flex justify-center min-h-screen  w-lvw pt-45 bg-no-repeat bg-cover bg-top pb-[20px]"
        style={{
          backgroundImage: `url(${fishAnimate})`,
        }}
      >
        <div className="flex flex-col w-[75%] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] pb-[20px]">
          <h1 className="text-5xl text-center rounded-md bg-[#fddbcd] p-10 text-[#794531fb]">
            Task List: {data.name}
          </h1>
          <div className="flex flex-col gap-8 ml-5">
            <div className="flex gap-15 mt-15 ">
              <Link
                to="/task-lists"
                className="buttonStyling shadow-lg shadow-black/20"
              >
                Back
              </Link>

              <div
                className="buttonStyling shadow-lg shadow-black/20"
                onClick={() => setCreateForm(true)}
              >
                Create a Task
              </div>
              <div
                className="buttonStyling shadow-lg shadow-black/20"
                onClick={() => refetch()}
              >
                Refresh
              </div>
            </div>
            <hr className="bg-[#fddbcdeb] text-[#fddbcdeb] w-[90%] border-2 border-[#fddbcdeb]"></hr>
            <div className="text-3xl text-[#f8d8d1]">Tasks</div>
            <div className="flex flex-wrap gap-5 justify-left">
              {incompleteTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setSelectedTask={setSelectedTask}
                  setEditForm={setEditForm}
                />
              ))}
            </div>
            <div
              className="buttonStyling shadow-lg shadow-black/20 max-w-[30%]"
              onClick={() => setShowComplete(!showComplete)}
            >
              <div className="flex justify-between items-center w-full">
                <span>Completed Tasks</span><span>{showComplete ? "^" : "v"}</span>
              </div>
            </div>
            {showComplete && ( completeTasks.length > 0 ? (
            <div className="flex flex-wrap gap-5 justify-left">
              {completeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setSelectedTask={setSelectedTask}
                  setEditForm={setEditForm}
                />
              ))}
            </div>
            ) : <p className="p-2 rounded-md shadow-md text-[#794531fb] bg-[#fddbcd] text-2xl w-[80%]">No completed tasks in this list!</p>)}
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
  } else {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        {error?.message}
      </div>
    );
  }
}
