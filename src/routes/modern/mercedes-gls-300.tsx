import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/mercedes-gls-300')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/modern-header.png',
      alt: 'Mercedes GLS 300 - Luxury SUV',
      caption: 'The perfect blend of luxury SUV comfort and executive transportation'
    },
    {
      src: '/modern-header.png',
      alt: 'Mercedes GLS 300 - Interior',
      caption: 'Spacious cabin with premium materials and advanced technology'
    },
    {
      src: '/modern-header.png',
      alt: 'Mercedes GLS 300 - Dashboard',
      caption: 'State-of-the-art MBUX infotainment system'
    },
    {
      src: '/modern-header.png',
      alt: 'Mercedes GLS 300 - Exterior',
      caption: 'Commanding presence with distinctive Mercedes design'
    }
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
    'Seating': '5-7 passengers',
    'Drive Type': 'Four-Wheel Drive'
  }

  const pricing = [
    { label: 'Base rate (max. 25km)', value: '€230' },
    { label: 'Additional per km', value: '€3/km' }
  ]

  return (
    <CarDetail
      name="Mercedes GLS 300"
      year="2024"
      category="modern"
      images={carImages}
      description="The Mercedes GLS 300 represents the perfect blend of luxury SUV comfort and executive transportation. This sophisticated vehicle offers exceptional space, advanced technology, and uncompromising safety features, making it ideal for discerning clients who need versatility without sacrificing luxury."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/modern-header.png"
      reservationLink="/booking/mercedes-maybach"
    />
  )
}
