import type { TaskOut } from '@repo/api/task';

interface TaskCardProps {
  task: TaskOut;
}

const MUTATE_BUTTONS = ['Edit', 'Delete'];

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col flex-wrap rounded-md shadow-lg shadow-black/20 w-[40vh] bg-[#815656]">
      <header className="flex items-center justify-end relative p-[1vh] h-[6vh]">
        <details className="absolute top-2 right-2 z-10">
          <summary className="bg-transparent hover:bg-yellow-950/30 rounded-md list-none m-0 p-2 cursor-pointer text-[#f8d8d1] text-[30px]">
            ⋮
          </summary>
          <div className="flex flex-col gap-2 absolute bg-[#f8d8d1] text-[#815656] border-[#815656] border rounded-md p-2 min-w-[20vh] right-0 shadow-md">
            {MUTATE_BUTTONS.map((button) => (
              <button className="bg-transparent border-2 rounded-sm p-1.5 text-[#815656] cursor-pointer hover:bg-yellow-950/20">
                {button}
              </button>
            ))}
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
