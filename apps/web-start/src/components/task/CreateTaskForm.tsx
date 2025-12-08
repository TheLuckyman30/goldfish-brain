import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import type { CreateTask, TaskOut } from '@repo/api/task';
import InputLabel from '../shared-ui/InputLabel';
import Form from '../shared-ui/Form';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Button from '../shared-ui/Button';
import { TextArea } from '../shared-ui/TextArea';

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
  const mutation = useApiMutation<CreateTask, TaskOut>({
    endpoint: () => ({ path: '/tasks', method: 'POST' }),
    invalidateKeys: [['tasks', taskListId]],
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
    <Modal show={true} setShow={setCreateForm} backdrop>
      <ModalHeader>Create a Task</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 ">
          <div>
            <InputLabel htmlFor="taskName">Task Name</InputLabel>
            <TextArea
              id="taskName"
              placeholder="Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div>
            <InputLabel htmlFor="taskDescription">Task Description</InputLabel>
            <TextArea
              id="taskDescription"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task Added</div>}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
