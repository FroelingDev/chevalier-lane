import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/special-events')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/special-events"!</div>
}
