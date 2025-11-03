import React, { useState } from 'react';
import './CreateTaskForm.css';
import './button.css';
import { useMutation } from '@tanstack/react-query';
import { mutateBackend } from '../integrations/fetcher';
import type { CreateTask, TaskOut } from '@repo/api/task';

interface CreateFormProps {
  taskListId: string;
  setCreateForm: (isOpen: boolean) => void;
}

export function CreateTaskForm({
  taskListId,
  setCreateForm,
}: CreateFormProps): React.JSX.Element {
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const mutation = useMutation({
    mutationFn: (newTask: CreateTask) => {
      return mutateBackend<CreateTask, TaskOut>('/tasks', 'POST', newTask);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    mutation.mutate({
      taskListId: taskListId,
      name: taskName,
      description: taskDescription,
      dueBy: null,
    });
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 w-lvw h-lvh bg-white/10 backdrop-blur-sm">
      <div className="flex flex-col items-center bg-white shadow-md p-5 rounded-lg w-[25%]">
        <span
          className="self-end text-red-500 cursor-pointer text-xl"
          onClick={() => setCreateForm(false)}
        >
          X
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            id="taskName"
          ></input>
          <label htmlFor="taskDescription">Task Description</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="taskDescription"
          ></input>
          <div>
            <button type="submit" className="button">
              Submit
            </button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task Added</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
