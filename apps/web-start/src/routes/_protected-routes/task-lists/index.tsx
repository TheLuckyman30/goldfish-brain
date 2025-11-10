import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { useApiQuery } from '../../../integrations/api';
import { CreateListForm } from '../../../components/CreateListForm';
import type { TaskListOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const [createForm, setCreateForm] = useState<boolean>(false);
  const { data: taskLists = [], isFetching, refetch } = useApiQuery<Array<TaskListOut>>(
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
        <br></br>
        <br></br>
        <div className="buttonStyling" onClick={() => setCreateForm(true)}>Create New Task List</div>
        <div className="buttonStyling" onClick={() => refetch()}>
              Refresh
            </div>
      </div>
      {createForm && (
        <CreateListForm
          setCreateForm={setCreateForm}
        />
      )}
    </div>
  );
}
