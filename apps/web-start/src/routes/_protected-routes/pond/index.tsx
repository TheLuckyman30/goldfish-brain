import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useApiQuery } from '../../../integrations/api';
import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import '../../../components/button.css';
import TaskListForm from '../../../components/pond/TaskListForm';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [showForm, setShowForm] = useState<boolean>(true);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );

  const { data: lists = [], isFetching: listsIsFetching } = useApiQuery<
    Array<TaskListOut>
  >(['task-lists'], '/task-lists');
  const { data: taskList, isFetching: taskListIsFetching } =
    useApiQuery<TaskListTasksOut>(
      ['task-list', selectedTaskList?.id],
      `/task-lists/${selectedTaskList?.id}/tasks`,
      {},
      !!selectedTaskList,
    );

  if (listsIsFetching || taskListIsFetching) {
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      Loading...
    </div>;
  }

  return (
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      <TaskListForm
        lists={lists}
        taskList={taskList}
        taskListIsFetching={taskListIsFetching}
        showForm={showForm}
        setShowForm={setShowForm}
        setSelectedTaskList={setSelectedTaskList}
      />
    </div>
  );
}
