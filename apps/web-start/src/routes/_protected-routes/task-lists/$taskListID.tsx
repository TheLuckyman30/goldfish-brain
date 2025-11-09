import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { CreateTaskForm } from '../../../components/CreateTaskForm';
import { useApiQuery } from '../../../integrations/api';
import type { TaskListTasksOut } from '@repo/api/task-list';

export const Route = createFileRoute(
  '/_protected-routes/task-lists/$taskListID',
)({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const { data, isFetching, refetch, error } = useApiQuery<TaskListTasksOut>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        Loading...
      </div>
    );
  }

  if (data) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        <div className="flex flex-col gap-10">
          <h1 className="text-[20px] text-white text-center">
            Task List: {data.name}
          </h1>
          <div className="flex gap-15">
            <div className="buttonStyling" onClick={() => setCreateForm(true)}>
              Create a Task
            </div>
            <div className="buttonStyling" onClick={() => refetch()}>
              Refresh
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-4xl p-1">
              Tasks:
            </div>
            {data.tasks.map((task) => (
              <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-2xl p-1">
                {task.name}
              </div>
            ))}
          </div>
        </div>
        {createForm && (
          <CreateTaskForm
            taskListId={taskListID}
            setCreateForm={setCreateForm}
          />
        )}
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
