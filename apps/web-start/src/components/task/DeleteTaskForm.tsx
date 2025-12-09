import { DeleteTask, TaskOut } from '@repo/api/task';
import { useApiMutation } from '../../integrations/api';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import Form from '../shared-ui/Form';
import Button from '../shared-ui/Button';

interface DeleteTaskFormProps {
  task: TaskOut | null;
  setDeleteForm: (isOpen: boolean) => void;
}

export function DeleteTaskForm({ task, setDeleteForm }: DeleteTaskFormProps) {
  const mutation = useApiMutation<DeleteTask, TaskOut>({
    endpoint: () => ({ path: '/tasks', method: 'DELETE' }),
    invalidateKeys: [['tasks', task?.taskListId]],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (task) {
      mutation.mutate({
        id: task.id,
        taskListId: task.taskListId,
        completed: task.completed,
      });
    }
  }

  return (
    <Modal show={true} setShow={setDeleteForm} backdrop>
      <ModalHeader>Delete Task</ModalHeader>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex w-full justify-center gap-10">
          <Button onClick={() => setDeleteForm(false)}>Cancel</Button>
          <Button type="submit" color="danger">
            Delete
          </Button>
        </div>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.isError && <div>{mutation.error.message}</div>}
        {mutation.isSuccess && <div>Task Deleted</div>}
      </Form>
    </Modal>
  );
}
