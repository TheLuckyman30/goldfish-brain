import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import TaskListForm from '../../../components/pond/TaskListForm';
import Button from '../../../components/shared-ui/Button';
import CaughtFish from '../../../components/pond/CaughtFish';
import type { CreateFish, FishOutWithTask } from '@repo/api/fish';
import type { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );
  const [caughtFish, setCaughtFish] = useState<FishOutWithTask | null>(null);

  const { data: taskList, isFetching: taskListIsFetching } =
    useApiQuery<TaskListTasksOut>(
      ['task-list', selectedTaskList?.id],
      `/task-lists/${selectedTaskList?.id}/tasks`,
      {},
      !!selectedTaskList,
    );
  const mutation = useApiMutation<Array<CreateFish>, { count: number }>({
    endpoint: () => ({ path: '/fish', method: 'POST' }),
  });
  const { data: fish = [], isFetching: fishIsFetching } = useApiQuery<
    Array<FishOutWithTask>
  >(
    ['fish', selectedTaskList?.id],
    `/fish?taskIds=${taskList?.tasks.map((task) => task.id).join(',') ?? ''}`,
    {},
    !!taskList && taskList.tasks.length > 0 && !mutation.isPending,
  );
  const completeFish = useApiMutation<{id: string}>({
    endpoint: ({id}) => ({
      path: `/fish/${id}/complete`,
      method: 'PATCH'
    }),
    // refetch
    invalidateKeys: [
      ['fish', selectedTaskList?.id]
    ],
  });
  const resetCompletion = useApiMutation<{taskListId: string}>({
    endpoint: () => ({
      path: '/fish/reset',
      method: 'PATCH',
    }),
    invalidateKeys: [['fish', selectedTaskList?.id]],
  });

  function catchRandomFish() {
    const uncompletedFish = fish.filter((f) => !f.completed)
    const random = Math.floor(Math.random() * uncompletedFish.length);
    const caught = uncompletedFish[random];
    setCaughtFish(caught ?? null);
  }

  function markComplete() {
    if (!caughtFish) return;
    completeFish.mutate({id: caughtFish.id});
    setCaughtFish({...caughtFish, completed: true});
  }

  function markAllIncomplete() {
    if (!selectedTaskList) return;
    resetCompletion.mutate({taskListId: selectedTaskList.id});
    setCaughtFish(null);
  }

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      {!showForm && !fishIsFetching && (
        <div>
          <Button onClick={catchRandomFish} disabled={caughtFish ? !caughtFish.completed : false}>Reel</Button>
          <Button onClick={markComplete}>Send to Cooler</Button>
          {caughtFish && <CaughtFish caughtFish={caughtFish} />}
          <Button onClick={markAllIncomplete}>Reset Pond</Button>
        </div>
      )}
      <TaskListForm
        taskList={taskList}
        taskListIsFetching={taskListIsFetching}
        showForm={showForm}
        setShowForm={setShowForm}
        setSelectedTaskList={setSelectedTaskList}
        mutate={mutation.mutate}
      />
    </div>
  );
}
