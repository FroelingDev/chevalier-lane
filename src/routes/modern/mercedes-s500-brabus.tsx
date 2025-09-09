import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modern/mercedes-s500-brabus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modern/mercedes-s500-brabus"!</div>
}
