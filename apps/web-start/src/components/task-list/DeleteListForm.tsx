import { useApiMutation } from '../../integrations/api';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Form from '../shared-ui/Form';
import Button from '../shared-ui/Button';
import { DeleteTaskList, TaskListOut } from '@repo/api/task-list';

interface DeleteListFormProps {
  selectedTaskList: TaskListOut | null;
  showDeleteForm: boolean;
  setDeleteForm: (isOpen: boolean) => void;
}

export function DeleteListForm({
  selectedTaskList,
  showDeleteForm,
  setDeleteForm,
}: DeleteListFormProps) {
  const mutation = useApiMutation<DeleteTaskList, TaskListOut>({
    endpoint: () => ({ path: '/task-lists', method: 'DELETE' }),
    invalidateKeys: [['task-lists']],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedTaskList) {
      mutation.mutate({ id: selectedTaskList.id });
    }
  }

  return (
    <Modal show={showDeleteForm} setShow={setDeleteForm} backdrop>
      <ModalHeader>Delete Task List</ModalHeader>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex w-full justify-center gap-10">
          <Button onClick={() => setDeleteForm(false)}>Cancel</Button>
          <Button type="submit" color="danger">
            Delete
          </Button>
        </div>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.isError && <div>{mutation.error.message}</div>}
        {mutation.isSuccess && <div>Task List Deleted</div>}
      </Form>
    </Modal>
  );
}
