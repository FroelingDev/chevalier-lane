import { AirportBooking } from '@/components/AirportBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/airport')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AirportBooking />
}
