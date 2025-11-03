import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/pond/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    <h1>Pond Page</h1>
  </div>
}
