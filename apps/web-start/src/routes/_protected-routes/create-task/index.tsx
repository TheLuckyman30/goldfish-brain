import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/create-task/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Create task page</h1>
      <Link
        to="/task-lists/$taskListID"
        params={{ taskListID: 'groceries' /* placeholder*/ }}
        className="button"
      >
        Back to task list
      </Link>
      <Link to="/" className="button">
        Home
      </Link>
      <br></br>
    </div>
  );
}
