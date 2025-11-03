import { Link, createFileRoute } from '@tanstack/react-router';
import './../styles.css'

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    <h1>Landing Page</h1>
    <Link to='/pond' className="button">pond</Link>
    <Link to='/task-lists' className="button">task lists</Link>
    <Link to='/profile' className="button">profile</Link>
    <Link to='/settings' className="button">settings</Link>
  </div>
}
