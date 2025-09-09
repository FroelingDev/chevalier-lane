import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/one-way')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/one-way"!</div>
}
