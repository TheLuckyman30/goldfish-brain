import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import type { TaskOut, UpdateTask } from '@repo/api/task';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Form from '../shared-ui/Form';
import InputLabel from '../shared-ui/InputLabel';
import { TextArea } from '../shared-ui/TextArea';
import Button from '../shared-ui/Button';

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
        dueBy: null,
      });
    }
  };

  return (
    <Modal show={true} setShow={setEditForm} backdrop>
      <ModalHeader>Edit Task</ModalHeader>
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
