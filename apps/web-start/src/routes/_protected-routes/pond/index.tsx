import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import TaskListForm from '../../../components/pond/TaskListForm';
import { FishOutWithTask } from '@repo/api/fish';
import { useState } from 'react';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [fish, setFish] = useState<Array<FishOutWithTask>>([]);

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      {!showForm && (
        <div>
          {fish.map((fish) => (
            <div>{JSON.stringify(fish)}</div>
          ))}
        </div>
      )}
      <TaskListForm
        showForm={showForm}
        setShowForm={setShowForm}
        setFish={setFish}
      />
    </div>
  );
}
