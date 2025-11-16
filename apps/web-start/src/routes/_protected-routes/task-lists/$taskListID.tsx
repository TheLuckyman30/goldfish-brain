import { Link, createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { CreateTaskForm } from '../../../components/task/CreateTaskForm';
import { useApiQuery } from '../../../integrations/api';
import goldfishBrain from '../../../images/GoldfishBrain.png';
import TaskCard from '../../../components/task/TaskCard';
import { EditTaskForm } from '../../../components/task/EditTaskForm';
import type { TaskListTasksOut } from '@repo/api/task-list';
import type { TaskOut } from '@repo/api/task';

export const Route = createFileRoute(
  '/_protected-routes/task-lists/$taskListID',
)({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskOut | null>(null);
  const { data, isFetching, refetch, error } = useApiQuery<TaskListTasksOut>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );

  useEffect(() => {
    setEditForm(false);
    setCreateForm(false);
    setSelectedTask(null);
  }, [data]);

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        Loading...
      </div>
    );
  }

  if (data) {
    return (
      <div
        className="flex justify-center items-center min-h-lvh w-lvw pt-20 bg-no-repeat bg-cover bg-top"
        style={{
          backgroundImage: `url(${goldfishBrain})`,
        }}
      >
        <div
          className="p-10 rounded-lg text-white shadow-lg shadow-black w-[90%] mt-[15vh] h-[90vh]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #fddbcd 16%, #794531fb 16%)',
          }}
        >
          <div className="flex flex-col gap-10 ">
            <h1 className="text-5xl text-[#6c3b27ee] text-center">
              Task List: {data.name}
            </h1>
            <div className="flex gap-15 mt-15">
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
              {data.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setSelectedTask={setSelectedTask}
                  setEditForm={setEditForm}
                />
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
  } else {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        {error?.message}
      </div>
    );
  }
}
