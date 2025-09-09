import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modern/mercedes-gls-300')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modern/mercedes-gls-300"!</div>
}
