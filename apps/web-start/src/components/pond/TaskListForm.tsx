import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import Form from '../shared-ui/Form';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import { Select, SelectOption } from '../shared-ui/Select';
import Button from '../shared-ui/Button';
import { UseMutateFunction } from '@tanstack/react-query';
import { fishGenerator } from '../../utils/fish-generator';
import { useApiQuery } from '../../integrations/api';

interface TaskListFormProps {
  taskList: TaskListTasksOut | undefined;
  taskListIsFetching: boolean;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  setSelectedTaskList: (newTaskList: TaskListOut) => void;
  mutate: UseMutateFunction<
    {
      count: number;
    },
    Error,
    {
      taskId: string;
      size: number;
      rarity: number;
    }[],
    unknown
  >;
}

function TaskListForm({
  taskList,
  taskListIsFetching,
  showForm,
  setShowForm,
  setSelectedTaskList,
  mutate,
}: TaskListFormProps) {
  const { data: lists = [], isFetching: listsIsFetching } = useApiQuery<
    Array<TaskListOut>
  >(['task-lists'], '/task-lists');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fish = fishGenerator(taskList?.tasks ?? []);
    mutate(fish);
    setShowForm(false);
  }

  if (listsIsFetching) {
    return (
      <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <Modal show={showForm} setShow={setShowForm} backdrop>
      <ModalHeader>Select a Task List</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <Select
            onChange={(e) =>
              setSelectedTaskList(JSON.parse(e.target.value) as TaskListOut)
            }
          >
            <SelectOption selected hidden disabled>
              Choose Task List
            </SelectOption>
            {lists.map((list) => (
              <SelectOption key={list.id} value={JSON.stringify(list)}>
                {list.name}
              </SelectOption>
            ))}
          </Select>
          <Button type="submit" disabled={!taskList || taskListIsFetching}>
            {taskListIsFetching && <span>Loading...</span>}
            {!taskListIsFetching && <span>Play</span>}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TaskListForm;
