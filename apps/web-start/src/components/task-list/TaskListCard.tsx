import { Link } from '@tanstack/react-router';
import { useApiMutation } from '../../integrations/api';
import type { DeleteTaskList, TaskListOut } from '@repo/api/task-list';
import { Loading } from '../loading/loadingScreen';

interface TaskListCardProps {
  taskList: TaskListOut;
  setSelectedTaskList: (newList: TaskListOut) => void;
  setShowEditForm: (show: boolean) => void;
}

function TaskListCard({
  taskList,
  setSelectedTaskList,
  setShowEditForm,
}: TaskListCardProps) {
  // This is temporary
  const mutation = useApiMutation<DeleteTaskList, TaskListOut>({
    endpoint: () => ({ path: '/task-lists', method: 'DELETE' }),
    invalidateKeys: [['task-lists']],
  });

  return (
    <div className="flex flex-col flex-wrap rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] w-[40vh] bg-[#815656] text-[#f8d8d1]">
      <header className="flex items-center relative p-[1vh] h-[6vh]">
        <details className="absolute top-2 right-2 z-10 list-none">
          <summary className="list-none bg-transparent hover:bg-yellow-950/30 rounded-md pl-5 pr-5 pt-1 pb-2 m-0 cursor-pointer text-[#f8d8d1] text-[30px]">
            ⋮
          </summary>
          <div className="flex flex-col gap-2 absolute bg-[#f8d8d1] text-[#815656] border-[#815656] border rounded-md p-2 min-w-[20vh] right-0 shadow-md">
            <button
              onClick={() => {
                setSelectedTaskList(taskList);
                setShowEditForm(true);
              }}
              className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate({
                  id: taskList.id,
                  userId: taskList.userId,
                });
              }}
              className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20"
            >
              Delete
            </button>
            {mutation.isPending && <Loading></Loading>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task List Deleted</div>}
          </div>
        </details>
      </header>
      <Link
        to="/task-lists/$taskListID"
        params={{ taskListID: taskList.id }}
        className="bg-[#f8d8d1] text-[#815656] text-center min-h-[20vh] pt-[5vh] text-[24px]"
      >
        <div className="text-3xl"> {taskList.name}</div>
        <br></br>
        <div className=" w-[40vh] h-[10vh] text-2xl bg-white p-2">
          {'>'} {taskList.description}
        </div>
      </Link>
    </div>
  );
}

export default TaskListCard;
