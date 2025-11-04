import { Link, createFileRoute } from '@tanstack/react-router';
import './../../components/button.css';
import { useApiQuery } from '../../integrations/api';
import type { TaskListOut } from '@repo/api/task-list';

export const Route = createFileRoute('/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const { data: taskLists = [], isFetching } = useApiQuery<Array<TaskListOut>>(
    ['task-lists'],
    '/task-lists',
  );

  if (isFetching) {
    return <body style={{ backgroundColor: '#815656' }}>Loading...</body>;
  }

  return (
    <body style={{ backgroundColor: '#815656' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15vh', // space between buttons
          marginTop: '40vh',
        }}
      >
        <div className="flex flex-col gap-5 justify-center align-center">
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
    </body>
  );
}
