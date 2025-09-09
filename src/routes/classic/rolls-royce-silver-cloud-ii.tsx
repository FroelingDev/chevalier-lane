import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classic/rolls-royce-silver-cloud-ii')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/classic/rolls-royce-silver-cloud-ii"!</div>
}
