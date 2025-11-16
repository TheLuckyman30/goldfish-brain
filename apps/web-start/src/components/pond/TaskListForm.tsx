import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import Form from '../shared-ui/Form';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import { Select, SelectOption } from '../shared-ui/Select';
import Button from '../shared-ui/Button';

interface TaskListFormProps {
  lists: Array<TaskListOut>;
  taskList: TaskListTasksOut | undefined;
  taskListIsFetching: boolean;
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
  setSelectedTaskList: (newTaskList: TaskListOut) => void;
}

function TaskListForm({
  lists,
  taskList,
  taskListIsFetching,
  showForm,
  setShowForm,
  setSelectedTaskList,
}: TaskListFormProps) {
  return (
    <Modal show={showForm} setShow={setShowForm} backdrop>
      <ModalHeader>Select a Task List</ModalHeader>
      <Form>
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
          <Button disabled={!taskList || taskListIsFetching}>
            {taskListIsFetching && <span>Loading...</span>}
            {!taskListIsFetching && <span>Play</span>}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TaskListForm;
