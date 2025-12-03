import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import type { TaskOut, UpdateTask } from '@repo/api/task';

interface EditFormProps {
  task: TaskOut | null;
  setEditForm: (isOpen: boolean) => void;
}

export function EditTaskForm({
  task,
  setEditForm,
}: EditFormProps): React.JSX.Element {
  const [taskName, setTaskName] = useState<string>(task?.name ?? '');
  const [taskDescription, setTaskDescription] = useState<string>(
    task?.description ?? '',
  );
  const mutation = useApiMutation<UpdateTask, TaskOut>({
    endpoint: () => ({ path: '/tasks', method: 'PATCH' }),
    invalidateKeys: [['tasks', task?.taskListId]],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    if (task) {
      mutation.mutate({
        id: task.id,
        taskListId: task.taskListId,
        name: taskName,
        description: taskDescription,
        completed: null,
        dueBy: null,
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
          className="self-end text-orange-900 cursor-pointer text-2xl"
          onClick={() => setEditForm(false)}
        >
          x
        </span>
        <form onSubmit={handleSubmit} className="text-orange-950">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            id="taskName"
          ></input>
          <br></br>
          <label htmlFor="taskDescription">Task Description</label>
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="taskDescription"
          ></input>
          <div style={{ margin: '5vh' }}></div>
          <div>
            <button type="submit" className="button">
              Submit
            </button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task Edited</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
