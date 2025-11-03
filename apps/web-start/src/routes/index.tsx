import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    <h1>Landing Page</h1>
    <Link to='/pond' className="button">pond</Link>
  </div>
}
