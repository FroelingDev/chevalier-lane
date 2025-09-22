import { WeddingBooking } from '@/components/WeddingBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/booking/wedding')({
  component: RouteComponent,
})

function RouteComponent() {
  return <WeddingBooking />
}
