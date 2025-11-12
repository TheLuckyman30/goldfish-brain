import { useApiMutation } from '../../integrations/api';
import type { DeleteTask, TaskOut } from '@repo/api/task';

interface TaskCardProps {
  task: TaskOut;
  setSelectedTask: (newTask: TaskOut) => void;
  setEditForm: (show: boolean) => void;
}

function TaskCard({ task, setSelectedTask, setEditForm }: TaskCardProps) {
  // This is temporary
  const mutation = useApiMutation<DeleteTask, TaskOut>({
    endpoint: () => ({ path: '/tasks', method: 'DELETE' }),
    invalidateKeys: [['tasks', task.taskListId]],
  });

  return (
    <div className="flex flex-col flex-wrap rounded-md shadow-lg shadow-black/20 w-[40vh] bg-[#815656]">
      <header className="flex items-center justify-end relative p-[1vh] h-[6vh]">
        <details className="absolute top-2 right-2 z-10">
          <summary className="bg-transparent hover:bg-yellow-950/30 rounded-md list-none m-0 p-2 cursor-pointer text-[#f8d8d1] text-[30px]">
            ⋮
          </summary>
          <div className="flex flex-col gap-2 absolute bg-[#f8d8d1] text-[#815656] border-[#815656] border rounded-md p-2 min-w-[20vh] right-0 shadow-md">
            <button
              onClick={() => {
                setSelectedTask(task);
                setEditForm(true);
              }}
              className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate({ id: task.id, taskListId: task.taskListId });
              }}
              className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20"
            >
              Delete
            </button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task Deleted</div>}
          </div>
        </details>
      </header>
      <div className="bg-[#f8d8d1] text-[#815656] text-[24px] text-center pt-[5vh] h-[20vh]">
        {task.name}
      </div>
    </div>
  );
}

export default TaskCard;
