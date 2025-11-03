import { Link, createFileRoute } from '@tanstack/react-router'
import './../../components/button.css';
import { Navbar } from '../../components/navbar';
import { Sidebar } from '../../components/sidebar';

export const Route = createFileRoute('/task-lists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    
     <body style={{backgroundColor: "#815656"}}>
      
      <Sidebar isOpen={false} setIsOpening={function (isOpen: boolean): void {
          throw new Error('Function not implemented.');
        } }></Sidebar>
      <Navbar></Navbar>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15vh", // space between buttons
          marginTop: "40vh",
        }}>
        <Link
            to='/task-lists/$taskListID'
            params = {{taskListID: "groceries"/* placeholder*/ }}
            className='buttonStyling'
            
        >View a task List</Link>
        <Link to="/" className="buttonStyling">Home</Link>
      </div>
  </body>
  );
}