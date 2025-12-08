import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import type { CreateTask, TaskOut } from '@repo/api/task';
import Input from '../shared-ui/Input';
import InputLabel from '../shared-ui/InputLabel';
import Form from '../shared-ui/Form';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Button from '../shared-ui/Button';

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
      <Form onSubmit={handleSubmit} >
        <div className="flex flex-col gap-6 ">
          <div>
            <InputLabel htmlFor="taskName" style={{color:"white", fontSize:"18px"}}>Task Name</InputLabel>
            <textarea
              id="taskName"
              className= "bg-gray-100/60 border border-gray-300 min-w-[30vh] w-[30vh] rounded-[10px] pl-3 pt-3"
              placeholder="Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            ></textarea>
          </div>

          <div>
            <InputLabel htmlFor="taskDescription" style={{color:"white", fontSize:"18px"}}>Task Description</InputLabel>
            <textarea
              id="taskDescription"
              className= "bg-gray-100/60 border border-gray-300 min-w-[30vh] w-[30vh] rounded-[10px] pl-3 pt-3"
              placeholder="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
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
