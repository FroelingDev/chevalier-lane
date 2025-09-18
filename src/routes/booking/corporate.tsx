import { CorporateBooking } from '@/components/CorporateBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/corporate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CorporateBooking />
}
