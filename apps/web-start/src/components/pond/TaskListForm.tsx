import { TaskListOut, TaskListTasksOut } from '@repo/api/task-list';
import Form from '../shared-ui/Form';
import { Modal, ModalHeader } from '../shared-ui/Modal';
import { Select, SelectOption } from '../shared-ui/Select';
import Button from '../shared-ui/Button';
import { fishGenerator } from '../../utils/fish-generator';
import { useApiMutation, useApiQuery } from '../../integrations/api';
import { useState } from 'react';
import { CreateGame, GameOut } from '@repo/api/game';

function TaskListForm() {
  const [selectedTaskList, setSelectedTaskList] = useState<TaskListOut | null>(
    null,
  );
  const { data: lists = [], isFetching: listsIsFetching } = useApiQuery<
    Array<TaskListOut>
  >(['task-lists'], '/task-lists');
  const { data: taskList, isFetching: taskListIsFetching } =
    useApiQuery<TaskListTasksOut>(
      ['task-list', selectedTaskList?.id],
      `/task-lists/${selectedTaskList?.id}/tasks`,
      {},
      !!selectedTaskList,
    );
  const mutation = useApiMutation<CreateGame, GameOut>({
    endpoint: () => ({ path: '/game', method: 'POST' }),
    invalidateKeys: [['game']],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fish = fishGenerator(taskList?.tasks ?? []);
    mutation.mutate({ fish });
  }

  if (listsIsFetching) {
    return <div></div>;
  }

  return (
    <Modal backdrop>
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
