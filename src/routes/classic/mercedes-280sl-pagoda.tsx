import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classic/mercedes-280sl-pagoda')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/classic/mercedes-280sl-pagoda"!</div>
}
