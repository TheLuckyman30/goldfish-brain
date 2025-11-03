import { Link, createFileRoute } from '@tanstack/react-router'
import './../../components/button.css';
import { CreateTaskForm } from '../../components/CreateTaskForm';

export const Route = createFileRoute('/create-task/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Create task page</h1>
    <Link
        to='/task-lists/$taskListID'
        params = {{taskListID: "groceries"/* placeholder*/ }}
        className='button'
    >Back to task list</Link>
    <Link to="/" className="button">Home</Link>
    <CreateTaskForm></CreateTaskForm>
  </div>
}
