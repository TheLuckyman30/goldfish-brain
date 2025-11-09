import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useApiQuery } from '../../../integrations/api';
import type { TaskListOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const { data: taskLists = [], isFetching } = useApiQuery<Array<TaskListOut>>(
    ['task-lists'],
    '/task-lists',
  );

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
      <div className="flex flex-col gap-5">
        {taskLists.map((list) => (
          <Link
            to="/task-lists/$taskListID"
            params={{ taskListID: list.id }}
            className="buttonStyling"
            key={list.id}
          >
            {list.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
