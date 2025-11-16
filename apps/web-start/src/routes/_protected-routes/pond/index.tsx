import { createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { Modal, ModalHeader } from '../../../components/shared-ui/Modal';
import { useState } from 'react';
import Form from '../../../components/shared-ui/Form';
import { Select, SelectOption } from '../../../components/shared-ui/Select';
import { useApiQuery } from '../../../integrations/api';
import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: Pond,
});

function Pond() {
  const [show, setShow] = useState<boolean>(true);
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );

  const { data: lists = [], isFetching: listsIsFetching } = useApiQuery<
    Array<TaskListOut>
  >(['task-lists'], './task-lists');
  const { data: taskList, isFetching: taskListIsFetching } =
    useApiQuery<TaskListTasksOut>(
      ['task-list', selectedTaskList?.id],
      `/task-lists/${selectedTaskList?.id}/tasks`,
      {},
      !!selectedTaskList,
    );

  if (listsIsFetching || taskListIsFetching) {
    <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
      Loading...
    </div>;
  }

  if (lists) {
    return (
      <div className="flex justify-center min-h-screen w-lvw pt-45 bg-gray-50">
        <Modal show={show} setShow={setShow} backdrop>
          <ModalHeader>Select a Task List</ModalHeader>
          <Form>
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
            {taskList && <div>{JSON.stringify(taskList)}</div>}
          </Form>
        </Modal>
      </div>
    );
  }
}
