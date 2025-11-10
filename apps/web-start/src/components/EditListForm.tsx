import React, { useState } from 'react';
import './button.css';
import { useApiMutation } from '../integrations/api';
import type { TaskListOut, UpdateTaskList } from '@repo/api/task-list';

interface CreateFormProps {
  selectedTaskList: TaskListOut | null;
  setEditForm: (isOpen: boolean) => void;
}

export function EditListForm({
  selectedTaskList,
  setEditForm,
}: CreateFormProps): React.JSX.Element {
  const [listName, setListName] = useState<string>(
    selectedTaskList?.name ?? '',
  );
  const [listDescription, setListDescription] = useState<string>(
    selectedTaskList?.description ?? '',
  );
  const mutation = useApiMutation<UpdateTaskList, TaskListOut>({
    endpoint: () => ({ path: '/task-lists', method: 'PATCH' }),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    if (selectedTaskList) {
      mutation.mutate({
        id: selectedTaskList.id,
        userId: selectedTaskList.userId,
        name: listName,
        description: listDescription,
      });
    }
  };

  return (
    <div
      className="fixed flex justify-center items-center inset-0 w-lvw h-lvh bg-white/10 backdrop-blur-sm"
      style={{ zIndex: 20 }}
    >
      <div className="flex flex-col items-center bg-white shadow-md p-5 rounded-lg w-[25%]">
        <span
          className="self-end text-red-500 cursor-pointer text-xl"
          onClick={() => setEditForm(false)}
        >
          X
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="listName">Task List Name</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            id="listName"
          ></input>
          <br></br>
          <label htmlFor="taskDescription">Task List Description</label>
          <input
            type="text"
            value={listDescription}
            onChange={(e) => setListDescription(e.target.value)}
            id="listDescription"
          ></input>
          <div>
            <button type="submit" className="button">
              Submit
            </button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task List Edited!</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
