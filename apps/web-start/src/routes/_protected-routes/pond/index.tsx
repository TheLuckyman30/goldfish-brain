import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import TaskListForm from '../../../components/pond/TaskListForm';
import { CreateFish } from '@repo/api/fish';
import { useState } from 'react';
import { useApiMutation } from '../../../integrations/api';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const mutation = useApiMutation<Array<CreateFish>, { count: number }>({
    endpoint: () => ({ path: '/fish', method: 'POST' }),
  });

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      {!showForm && (
        <div>{mutation.isSuccess && <div>{mutation.data.count}</div>}</div>
      )}
      <TaskListForm
        showForm={showForm}
        setShowForm={setShowForm}
        mutate={mutation.mutate}
      />
    </div>
  );
}
