import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modern/bentley-mulsanne')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modern/bentley-mulsanne"!</div>
}
