import React, { useState } from 'react';
import './button.css';
import { useApiMutation } from '../integrations/api';
import type { CreateTaskList, TaskListOut } from '@repo/api/task-list';

interface CreateFormProps {
  setCreateForm: (isOpen: boolean) => void;
}

export function CreateListForm({
  setCreateForm,
}: CreateFormProps): React.JSX.Element {
  const [listName, setListName] = useState<string>('');
  const [listDescription, setListDescription] = useState<string>('');
  const mutation = useApiMutation<CreateTaskList, TaskListOut>({
    endpoint: () => ({
      path: '/task-lists',
      method: 'POST',
    }),
    invalidateKeys: [['task-lists']],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    mutation.mutate({
      name: listName,
      description: listDescription,
      folderId: null,
    });
  };

  return (
    <div
      className="fixed flex justify-center items-center inset-0 w-lvw h-lvh bg-white/10 backdrop-blur-sm"
      style={{ zIndex: 20 }}
    >
      <div className="flex flex-col items-center bg-white shadow-md p-5 rounded-lg w-[25%]">
        <span
          className="self-end text-red-500 cursor-pointer text-xl"
          onClick={() => setCreateForm(false)}
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
            {mutation.isSuccess && <div>Task List Added</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
