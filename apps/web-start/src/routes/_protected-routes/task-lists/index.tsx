import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useEffect, useState } from 'react';
import { useApiQuery } from '../../../integrations/api';
import fishAnimate from '../../../images/fishAnimate.gif';
import { CreateListForm } from '../../../components/CreateListForm';
import TaskListCard from '../../../components/TaskListCard';
import { EditListForm } from '../../../components/EditListForm';
import type { TaskListOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const [createForm, setCreateForm] = useState<boolean>(false);
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
    setCreateForm(false);
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
      className="flex justify-center items-center pt-20 bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `url(${fishAnimate})`,
      }}
    >
      <div
        style={{
          height: '90vh',
          marginTop: '15vh',
          width: '90%',
          backgroundImage:
            'linear-gradient(to bottom, #fddbcd 16%, #538f97 16%)',
        }}
        className="p-10 rounded-lg text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
      >
        <h1 className="text-5xl mb-5 text-center text-[#794531fb]">
          Your Task Lists
        </h1>
        <div
          className="buttonStyling text-center center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
          style={{
            width: '30vh',
            padding: '2vh',
            marginBottom: '2vh',
            marginTop: '8vh',
          }}
          onClick={() => setCreateForm(true)}
        >
          Create Task List
        </div>
        <div className="buttonStyling" onClick={() => refetch()}>
          Refresh
        </div>
        <hr
          style={{
            backgroundColor: '#fddbcdeb',
            color: '#fddbcdeb',
            width: '90%',
            border: '2px solid #fddbcdeb',
            margin: '2vh',
          }}
        ></hr>
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
      {createForm && <CreateListForm setCreateForm={setCreateForm} />}
      {editForm && (
        <EditListForm
          selectedTaskList={selectedTaskList}
          setEditForm={setEditForm}
        />
      )}
    </div>
  );
}
