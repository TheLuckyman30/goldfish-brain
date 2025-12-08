import React, { useEffect, useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Form from '../shared-ui/Form';
import InputLabel from '../shared-ui/InputLabel';
import Button from '../shared-ui/Button';
import type { TaskListOut, UpdateTaskList } from '@repo/api/task-list';
import { TextArea } from '../shared-ui/TextArea';

interface CreateFormProps {
  selectedTaskList: TaskListOut | null;
  showEditForm: boolean;
  setShowEditForm: (show: boolean) => void;
}

export function EditListForm({
  selectedTaskList,
  showEditForm,
  setShowEditForm,
}: CreateFormProps): React.JSX.Element {
  const [newListName, setNewListName] = useState<string>('');
  const [newlistDescription, setNewListDescription] = useState<string>('');
  const mutation = useApiMutation<UpdateTaskList, TaskListOut>({
    endpoint: () => ({
      path: '/task-lists',
      method: 'PATCH',
    }),
    invalidateKeys: [['task-lists']],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    if (selectedTaskList) {
      mutation.mutate({
        id: selectedTaskList.id,
        userId: selectedTaskList.userId,
        name: newListName,
        description: newlistDescription,
      });
    }
  };

  useEffect(() => {
    if (selectedTaskList) {
      setNewListName(selectedTaskList.name);
      setNewListDescription(selectedTaskList.description ?? '');
    }
  }, [selectedTaskList]);

  return (
    <Modal show={showEditForm} setShow={setShowEditForm} backdrop>
      <ModalHeader>Edit a Task List</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <InputLabel htmlFor="list-name">List Name</InputLabel>
            <TextArea
              id="list-name"
              placeholder="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
          <div>
            <InputLabel htmlFor="list-description">List Description</InputLabel>
            <TextArea
              id="list-description"
              placeholder="List Description"
              value={newlistDescription}
              onChange={(e) => setNewListDescription(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task List Edited!</div>}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
