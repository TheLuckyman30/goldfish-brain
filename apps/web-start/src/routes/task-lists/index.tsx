import { Link, createFileRoute } from '@tanstack/react-router'
import "./../../styles.css"

export const Route = createFileRoute('/task-lists/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Task Lists Page</h1>
    <Link
        to='/task-lists/$taskListID'
        params = {{taskListID: "groceries"/* placeholder*/ }}
        className='button'
    >View a task List</Link>
    <Link to="/" className="button">Home</Link>
  </div>
}
