import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/profile/')({
  component: Profile,
});

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <Link to="/" className="button">
        Home
      </Link>
    </div>
  );
}
