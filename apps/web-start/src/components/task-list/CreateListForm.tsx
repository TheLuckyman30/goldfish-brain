import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import Form from '../shared-ui/Form';
import InputLabel from '../shared-ui/InputLabel';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Button from '../shared-ui/Button';
import type { CreateTaskList, TaskListOut } from '@repo/api/task-list';
import { TextArea } from '../shared-ui/TextArea';

interface CreateFormProps {
  showCreateForm: boolean;
  setShowCreateForm: (isOpen: boolean) => void;
}

export function CreateListForm({
  showCreateForm,
  setShowCreateForm,
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent page reload
    mutation.mutate({
      name: listName,
      description: listDescription,
      folderId: null,
    });
  }

  return (
    <Modal show={showCreateForm} setShow={setShowCreateForm} backdrop>
      <ModalHeader>Create a Task</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6  ">
          <div>
            <InputLabel htmlFor="list-name">List Name</InputLabel>
            <TextArea
              id="list-name"
              placeholder="List Name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </div>
          <div>
            <InputLabel
              htmlFor="list-description"
              style={{ color: 'white', fontSize: '18px' }}
            >
              List Description
            </InputLabel>
            <TextArea
              id="list-description"
              placeholder="List Description"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.isError && <div>{mutation.error.message}</div>}
            {mutation.isSuccess && <div>Task List Added</div>}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
