import React, { useState } from 'react';
import { useApiMutation } from '../../integrations/api';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Form from '../shared-ui/Form';
import InputLabel from '../shared-ui/InputLabel';
import Input from '../shared-ui/Input';
import Button from '../shared-ui/Button';

interface EditUsernameFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  setUsername: (newUsername: string) => void;
}

export function EditUsernameForm({
  showForm,
  setShowForm,
  setUsername,
}: EditUsernameFormProps): React.JSX.Element {
  const [newUsername, setNewUsername] = useState<string>("");
  const updateUsernameMutation = useApiMutation({
  endpoint: () => ({
    path: '/users/me/username',
    method: 'PATCH',
  }),
  invalidateKeys: [['users', 'me']],
});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent page reload
    if (newUsername) {
      setUsername(newUsername);
      updateUsernameMutation.mutate({
        username: newUsername,
      });
    }
  };

  return (
    <Modal show={showForm} setShow={setShowForm} backdrop>
      <ModalHeader>Enter a new Username</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <InputLabel htmlFor="New Username">New Username</InputLabel>
            <Input
              id="new-username"
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
            {updateUsernameMutation.isPending && <div>Loading...</div>}
            {updateUsernameMutation.isError && <div>{updateUsernameMutation.error.message}</div>}
            {updateUsernameMutation.isSuccess && <div>Username Updated!</div>}
          </div>
        </div>
      </Form>
    </Modal>
  );
}
