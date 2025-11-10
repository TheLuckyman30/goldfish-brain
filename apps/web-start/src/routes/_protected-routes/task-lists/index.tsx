import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';
import { useState } from 'react';
import { useApiQuery } from '../../../integrations/api';
import type { TaskListOut } from '@repo/api/task-list';
import fishAnimate from '../../../images/fishAnimate.gif';
import { CreateListForm } from '../../../components/CreateListForm';
import goldfishBrain from '../../../images/GoldfishBrain.png';


export const Route = createFileRoute('/_protected-routes/task-lists/')({
  component: TaskLists,
});

function TaskLists() {
  const [createForm, setCreateForm] = useState<boolean>(false);
  const { data: taskLists = [], isFetching, refetch } = useApiQuery<Array<TaskListOut>>(
    ['task-lists'],
    '/task-lists',
  );

  if (isFetching) {
    return (
      <div className="bg-[#815656] flex justify-center items-center min-h-lvh w-lvw pt-20">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center pt-20 bg-cover bg-no-repeat bg-top"
      style={{
        backgroundImage: `url(${fishAnimate})`,
      }}
    >
      <div
        style={{
          height: '90vh',
          marginTop: '15vh',
          width: '90%',
          backgroundImage:
            'linear-gradient(to bottom, #fddbcd 16%, #538f97 16%)',
        }}
        className="p-10 rounded-lg text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
      >


        <h1 className="text-5xl mb-5 text-center text-[#794531fb]" >
          Your Task Lists
        </h1>
        

        <div
          className="buttonStyling text-center center shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
          style={{ width: '30vh', padding: '2vh', marginBottom: '2vh', marginTop:"8vh" }}
          onClick={() => setCreateForm(true)}
        >
          {' '}
          Create Task List
        </div>
        <div className="buttonStyling" onClick={() => refetch()}>
          Refresh
        </div>
        <hr
          style={{
            backgroundColor: '#fddbcdeb',
            color: '#fddbcdeb',
            width: '90%',
            border: '2px solid #fddbcdeb',
            margin: '2vh',
          }}
        ></hr>

        <div className="flex flex-wrap gap-5 justify-left">
          {taskLists.map((list) => (
            <div
              key={list.id}
              className="rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0,0.5)]"
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

              
              <Link
                to="/task-lists/$taskListID"
                params={{ taskListID: list.id }}
                style={{
                  backgroundColor: '#f8d8d1',
                  color: '#815656',
                  textDecoration: 'none',
                  fontSize: '24px',
                  textAlign: 'center',
                  paddingTop: '5vh',
                  transition: 'background 0.2s ease',
                  minHeight: '20vh',
                }}
                className="hover:bg-yellow-950/10"
              >
                <div className="text-3xl"> {list.name}</div>
                <br></br>
                <div className= " w-[40vh] h-[10vh] text-2xl bg-white p-2">
                  {'>'} {list.description}
                </div>
                
                
              </Link>
            </div>
          ))}
        </div>
      </div>
      {createForm && (
        <CreateListForm
          setCreateForm={setCreateForm}
        />
      )}
    </div>
  );
}
