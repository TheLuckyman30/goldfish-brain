import { Link, createFileRoute } from '@tanstack/react-router'
import './../../components/button.css';
import { Navbar } from '../../components/navbar';
import { Sidebar } from '../../components/sidebar';

export const Route = createFileRoute('/task-lists/$taskListID')({
  component: RouteComponent,
})

function RouteComponent() {
    const { taskListID } = Route.useParams();
    return(
      <body style={{backgroundColor: "#815656"}}>
      
      <Sidebar isOpen={false} setIsOpening={function (isOpen: boolean): void {
          throw new Error('Function not implemented.');
        } }></Sidebar>
      <Navbar></Navbar>
        <div>
          <h1 style={{fontSize:"20px", color:"white", display: "flex",justifyContent: "center",alignItems: "center", marginTop: "20vh"}}
          >Task List ID: {taskListID}</h1>
          <br></br>

          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15vh", // space between buttons
            marginTop: "10vh",
          }}>
            <Link to='/task-lists' className='buttonStyling'>Task Lists</Link>
            <Link to='/create-task' className='buttonStyling'>Create a Task</Link>
          </div>
        </div>
      </body>
    )
}
