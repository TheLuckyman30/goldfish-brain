import { createFileRoute } from '@tanstack/react-router';
import './../../components/button.css';
import { useState } from 'react';
import { CreateTaskForm } from '../../components/CreateTaskForm';
import { useApiQuery } from '../../integrations/api';
import type { TaskListOut } from '@repo/api/task-list';
import type { TaskOut } from '@repo/api/task';

export const Route = createFileRoute('/task-lists/$taskListID')({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const { data: taskList, isFetching: listIsFetching } =
    useApiQuery<TaskListOut>(
      ['task-list', taskListID],
      `/task-lists/${taskListID}`,
    );
  const {
    data: tasks = [],
    isFetching: tasksIsFetching,
    refetch: tasksRefetch,
  } = useApiQuery<Array<TaskOut>>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );

  if (listIsFetching || tasksIsFetching) {
    return <body style={{ backgroundColor: '#815656' }}>Loading...</body>;
  }

  if (taskList) {
    return (
      <body style={{ backgroundColor: '#815656' }}>
        <div className="flex flex-col gap-20 justify-center items-center">
          <h1
            style={{
              fontSize: '20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20vh',
            }}
          >
            Task List: {taskList.name}
          </h1>
          <br></br>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15vh', // space between buttons
            }}
          >
            <div className="buttonStyling" onClick={() => setCreateForm(true)}>
              Create a Task
            </div>
            <div className="buttonStyling" onClick={() => tasksRefetch()}>
              Refresh
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-4xl p-1">
              Tasks:
            </div>
            {tasks.map((task) => (
              <div className="rounded-md bg-[#fddbcdeb] text-[#6c3b27ee] text-2xl p-1">
                {task.name}
              </div>
            ))}
          </div>
        </div>
        {createForm && (
          <CreateTaskForm
            taskListId={taskListID}
            setCreateForm={setCreateForm}
          />
        )}
      </body>
    );
  }
}
