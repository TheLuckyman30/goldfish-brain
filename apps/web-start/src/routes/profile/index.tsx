import { Link, createFileRoute } from '@tanstack/react-router'
import './../styles.css'

export const Route = createFileRoute('/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Profile Page</h1>
    <Link to="/" className="button">Back</Link>
    </div>
}
