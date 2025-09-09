import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/tours"!</div>
}
