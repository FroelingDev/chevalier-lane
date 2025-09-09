import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modern/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modern/"!</div>
}
