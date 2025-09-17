import { OneWayBooking } from '@/components/OneWayBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/one-way')({
  component: RouteComponent,
})

function RouteComponent() {
  return <OneWayBooking />
}
