import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/pond/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Pond Page</h1>
      <Link to="/" className="button">
        Home
      </Link>
      <Link
        to="/task-lists/$taskListID"
        params={{ taskListID: 'groceries' /* placeholder*/ }}
        className="button"
      >
        View a task List
      </Link>
    </div>
  );
}
