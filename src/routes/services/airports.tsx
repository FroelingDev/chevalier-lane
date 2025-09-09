import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/airports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/airports"!</div>
}
