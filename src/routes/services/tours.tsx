import { createFileRoute } from '@tanstack/react-router'
import { TourServicesDisplay } from '../../components/TourServicesDisplay'

export const Route = createFileRoute('/services/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TourServicesDisplay />
}
