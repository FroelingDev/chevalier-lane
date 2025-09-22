import { DynamicBooking } from '../../components/DynamicBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <DynamicBooking carId={id} />
}
