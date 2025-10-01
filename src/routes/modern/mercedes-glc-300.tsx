import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/mercedes-glc-300')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/glc300-1.png',
      alt: 'Mercedes GLC 300 - Luxury SUV',
      caption: 'The perfect blend of luxury SUV comfort and executive transportation'
    },
  ]

  const carFeatures = [
    {
      title: 'Spacious Interior',
      description: 'Generous cabin space accommodating up to 7 passengers in comfort and luxury.'
    },
    {
      title: 'Advanced Safety',
      description: 'Comprehensive safety systems including active lane keeping and blind spot monitoring.'
    },
    {
      title: 'Turbocharged V6',
      description: 'Powerful yet efficient 3.0L V6 turbocharged engine with smooth performance.'
    },
    {
      title: 'All-Terrain Capability',
      description: '4MATIC all-wheel drive system provides excellent traction and stability.'
    },
    {
      title: 'Premium Comfort',
      description: 'Executive seating with massage functions and climate control for all occupants.'
    },
    {
      title: 'German Engineering',
      description: 'Mercedes-Benz precision engineering and build quality you can trust.'
    }
  ]

  const specifications = {
    'Engine': 'V6 Turbo 3.0L',
    'Power': '362 hp',
    'Transmission': '9-Speed Automatic',
    'Top Speed': '155 mph (250 km/h)',
    'Acceleration': '0-60 mph in 6.2s',
    'Fuel Economy': '23 mpg combined',
    'Passengers': '4-5',
    'Luggage': '4 suitcases + 4 bags',
    'Drive Type': 'Four-Wheel Drive'
  }

  const pricing = [
    { label: 'Base rate (max. 25km)', value: '€230' },
    { label: 'Additional per km', value: '€3/km' }
  ]

  return (
    <CarDetail
      name="Mercedes GLC 300"
      year="2024"
      category="modern"
      images={carImages}
      description="The Mercedes GLC 300 represents the perfect blend of luxury SUV comfort and executive transportation. This sophisticated vehicle offers exceptional space, advanced technology, and uncompromising safety features, making it ideal for discerning clients who need versatility without sacrificing luxury."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/glc300-1.png"
      reservationLink="/contact"
    />
  )
}
