import { createFileRoute, Link } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { CreateTaskForm } from '../../../components/CreateTaskForm';
import { useApiQuery } from '../../../integrations/api';
import type { TaskListTasksOut } from '@repo/api/task-list';
import goldfishBrain from '../../../images/GoldfishBrain.png';

export const Route = createFileRoute(
  '/_protected-routes/task-lists/$taskListID',
)({
  component: TaskList,
});

function TaskList() {
  const { taskListID } = Route.useParams();
  const [createForm, setCreateForm] = useState<boolean>(false);
  const { data, isFetching, refetch, error } = useApiQuery<TaskListTasksOut>(
    ['tasks', taskListID],
    `/task-lists/${taskListID}/tasks`,
  );

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20" >
        Loading...
      </div>
    );
  }

  if (data) {
    return (
      <div
        className="flex justify-center items-center min-h-lvh w-lvw pt-20"
        style={{
          backgroundImage: `url(${goldfishBrain})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div
          style={{
            height: '90vh',
            marginTop: '15vh',
            width: '90%',
            backgroundImage:
              'linear-gradient(to bottom, #fddbcd 16%, #794531fb 16%)',
          }}
          className="p-10 rounded-lg text-white shadow-lg shadow-black"
        >
          <div className="flex flex-col gap-10 ">
            <h1 className="text-5xl text-[#6c3b27ee] text-center">
              Task List: {data.name}
            </h1>
            <div className="flex gap-15 mt-15">

              <Link to="/task-lists" className="buttonStyling shadow-lg shadow-black/20">
                Back
              </Link>

              <div
                className="buttonStyling shadow-lg shadow-black/20"
                onClick={() => setCreateForm(true)}
              >
                Create a Task
              </div>
              <div className="buttonStyling shadow-lg shadow-black/20" onClick={() => refetch()}>
                Refresh
              </div>
              
            </div>
            <hr
          style={{
            backgroundColor: '#fddbcdeb',
            color: '#fddbcdeb',
            width: '90%',
            border: '2px solid #fddbcdeb',
            
          }}
        ></hr>
        <div className="text-3xl text-[#f8d8d1]">Tasks</div>
            
            <div className="flex flex-wrap gap-5 justify-left">

              
                      {data.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="rounded-md shadow-lg shadow-black/20"
                          style={{
                            width: '40vh',
                            backgroundColor: '#815656',
                            color: '#f8d8d1',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            flexWrap:"wrap"
                          }}
                        >
                          {/* Header Section */}
                          <div
                            style={{
                              position: 'relative',
                              padding: '1vh 2vh',
                              height: '6vh',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <details
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                zIndex: 10,
                              }}
                            >
                              <summary
                                className="bg-transparent hover:bg-yellow-950/30 rounded-md"
                                style={{
                                  listStyle: 'none',
                                  margin: 0,
                                  padding: '6px 8px',
                                  borderRadius: 6,
                                  cursor: 'pointer',
                                  color: '#f8d8d1',
                                  border: 'none',
                                  fontSize: 30,
                                  lineHeight: 1,
                                }}
                              >
                                ⋮
                              </summary>
            
                              <div
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  
                                  backgroundColor: '#f8d8d1',
                                  color: '#815656',
                                  border: '1px solid #815656',
                                  borderRadius: 6,
                                  padding: 8,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 8,
                                  minWidth: "20vh",
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                }}
                              >
                                <button
                                  className="bg-transparent hover:bg-yellow-950/20"
                                  style={{
                                    border: '2px solid #815656',
                                    borderRadius: '4px',
                                    padding: '6px 8px',
                                    color: '#815656',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Edit
                                </button>
            
                                <button
                                  className="bg-transparent hover:bg-yellow-950/20"
                                  style={{
                                    border: '2px solid #815656',
                                    borderRadius: '4px',
                                    padding: '6px 8px',
                                    color: '#815656',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </details>
                          </div>
            
                          
                          <div
                            
                            style={{
                              backgroundColor: '#f8d8d1',
                              color: '#815656',
                              textDecoration: 'none',
                              fontSize: '24px',
                              textAlign: 'center',
                              paddingTop: '5vh',
                              transition: 'background 0.2s ease',
                              height: '20vh',
                            }}
                            className="hover:bg-yellow-950/10"
                          >
                            {task.name}
                          </div>
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
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        {error?.message}
      </div>

      
    );
  }
}
