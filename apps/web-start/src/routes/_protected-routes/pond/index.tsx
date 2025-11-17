import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import TaskListForm from '../../../components/pond/TaskListForm';
import { CreateFish, FishOutWithTask } from '@repo/api/fish';
import { useState } from 'react';
import { useApiMutation, useApiQuery } from '../../../integrations/api';
import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );

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

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      {!showForm && !fishIsFetching && <div>{JSON.stringify(fish)}</div>}
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
