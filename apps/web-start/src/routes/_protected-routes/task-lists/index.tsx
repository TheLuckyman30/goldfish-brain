import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useApiQuery } from '../../../integrations/api';
import fishAnimate from '../../../images/fishAnimate.gif';
import { CreateListForm } from '../../../components/task-list/CreateListForm';
import TaskListCard from '../../../components/task-list/TaskListCard';
import { EditListForm } from '../../../components/task-list/EditListForm';
import Button from '../../../components/shared-ui/Button';
import type { TaskListOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );
  const {
    data: taskLists = [],
    isFetching,
    refetch,
  } = useApiQuery<Array<TaskListOut>>(['task-lists'], '/task-lists');

  useEffect(() => {
    setShowCreateForm(false);
    setEditForm(false);
    setSelectedTaskList(null);
  }, [taskLists]);

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="flex justify-center min-h-screen w-lvw pt-45 bg-no-repeat bg-cover bg-top"
      style={{
        backgroundImage: `url(${fishAnimate})`,
      }}
    >
      <div className="flex flex-col w-[75%] bg-[#538f97] rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]">
        <h1 className="text-5xl text-center rounded-md bg-[#fddbcd] p-10 text-[#794531fb]">
          Your Task Lists
        </h1>
        <div className="p-5">
          <div className="flex gap-5">
            <Button onClick={() => setShowCreateForm(true)}>
              Create Task List
            </Button>
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
          <hr className="text-[#fddbcdeb] border-2 mt-5 mb-5"></hr>
          <div className="flex flex-wrap gap-5 justify-left">
            {taskLists.map((list) => (
              <TaskListCard
                taskList={list}
                setSelectedTaskList={setSelectedTaskList}
                setEditForm={setEditForm}
              />
            ))}
          </div>
        </div>
      </div>
      <CreateListForm
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
      />
      {editForm && (
        <EditListForm
          selectedTaskList={selectedTaskList}
          setEditForm={setEditForm}
        />
      )}
    </div>
  );
}
