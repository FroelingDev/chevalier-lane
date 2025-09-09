import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classic/oldsmobile-super-88')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/classic/oldsmobile-super-88"!</div>
}
