import { Link, createFileRoute } from '@tanstack/react-router';
import './../../components/button.css';
import { useQuery } from '@tanstack/react-query';
import { backendFetcher } from '../../integrations/fetcher';
import type { TaskListOut } from '@repo/api/task-list';
import type { TaskOut } from '@repo/api/task';

export const Route = createFileRoute('/task-lists/$taskListID')({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const { data: taskList, isFetching: listIsFetching } = useQuery<TaskListOut>({
    queryKey: ['task-list', taskListID],
    queryFn: backendFetcher<TaskListOut>(`/task-lists/${taskListID}`),
  });
  const { data: tasks, isFetching: tasksIsFetching } = useQuery<Array<TaskOut>>(
    {
      queryKey: ['tasks', taskListID],
      queryFn: backendFetcher<Array<TaskOut>>(
        `/task-lists/${taskListID}/tasks`,
      ),
      initialData: [],
    },
  );

  if (listIsFetching || tasksIsFetching) {
    return <body style={{ backgroundColor: '#815656' }}>Loading...</body>;
  }

  if (taskList) {
    return (
      <body style={{ backgroundColor: '#815656' }}>
        <div className="flex flex-col gap-20 justify-center items-center">
          <h1
            style={{
              fontSize: '20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20vh',
            }}
          >
            Task List: {taskList.name}
          </h1>
          <br></br>
          <div>
            <Link to="/create-task" className="buttonStyling">
              Create a Task
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-4xl p-1">
              Tasks:
            </div>
            {tasks.map((task) => (
              <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-2xl p-1">
                {task.name}
              </div>
            ))}
          </div>
        </div>
      </body>
    );
  }
}
