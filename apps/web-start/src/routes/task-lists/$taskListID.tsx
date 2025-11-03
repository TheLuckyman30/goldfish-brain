import { Link, createFileRoute } from '@tanstack/react-router'
import "./../../styles.css"

export const Route = createFileRoute('/task-lists/$taskListID')({
  component: RouteComponent,
})

function RouteComponent() {
    const { taskListID } = Route.useParams();
    return <div>
        <h1>Task List ID: {taskListID}</h1>
        <Link to='/task-lists' className='button'>Task Lists</Link>
        <Link to='/create-task' className='button'>Create a Task</Link>
      </div>
}
