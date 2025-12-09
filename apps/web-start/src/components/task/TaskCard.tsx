import type { TaskOut } from '@repo/api/task';

interface TaskCardProps {
  task: TaskOut;
  setSelectedTask: (newTask: TaskOut) => void;
  setEditForm: (show: boolean) => void;
  setDeleteForm: (show: boolean) => void;
}

function TaskCard({
  task,
  setSelectedTask,
  setEditForm,
  setDeleteForm,
}: TaskCardProps) {
  return (
    <div className="flex flex-col flex-wrap shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)] w-full buttonJump">
      <div className="flex text-[24px] h-[20vh]">
        <div className="relative flex justify-center items-center h-full w-[20%] p-5 text-[#f8d8d1] bg-[#815656]">
          <span className="font-bold">{task.name}</span>
        </div>
        <div className="p-5 pl-2 bg-[#f8d8d1] text-[#815656] w-full">
          <div className="flex flex-wrap font-bold relative justify-between">
            <span>Description</span>
            <details className="z-10">
              <summary className="bg-transparent hover:bg-yellow-950/30 rounded-md list-none cursor-pointer text-[#815656] text-[30px]">
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
                  onClick={() => {
                    setSelectedTask(task);
                    setDeleteForm(true);
                  }}
                  className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20"
                >
                  Delete
                </button>
              </div>
            </details>
          </div>
          <hr className="mt-2 mb-2"></hr>
          <div className="block">
            {task.description !== '' ? task.description : 'No Description'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
