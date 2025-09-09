import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/modern/range-rover-vogue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/modern/range-rover-vogue"!</div>
}
