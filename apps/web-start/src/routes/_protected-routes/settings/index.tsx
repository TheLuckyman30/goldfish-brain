import { Link, createFileRoute } from '@tanstack/react-router';
import '../../../components/button.css';

export const Route = createFileRoute('/_protected-routes/settings/')({
  component: Settings,
});

function Settings() {
  return (
    <div>
      <h1>Settings Page</h1>
      <Link to="/" className="button">
        Home
      </Link>
    </div>
  );
}
