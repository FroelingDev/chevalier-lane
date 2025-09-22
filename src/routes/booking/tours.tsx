import { TourBookingForm } from '@/components/TourBookingForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TourBookingForm />
}
