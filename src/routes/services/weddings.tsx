import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/weddings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/weddings"!</div>
}
