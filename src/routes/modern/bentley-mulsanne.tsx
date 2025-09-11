import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/bentley-mulsanne')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/bentley-mulsanne.png',
      alt: 'Bentley Mulsanne - Luxury Sedan',
      caption: 'The epitome of British luxury and sophistication'
    },
    {
      src: '/bentley-mulsanne.png',
      alt: 'Bentley Mulsanne - Interior',
      caption: 'Handcrafted interior with premium materials'
    },
    {
      src: '/bentley-mulsanne.png',
      alt: 'Bentley Mulsanne - Dashboard',
      caption: 'State-of-the-art technology meets timeless elegance'
    },
    {
      src: '/bentley-mulsanne.png',
      alt: 'Bentley Mulsanne - Rear View',
      caption: 'Commanding presence with distinctive design'
    }
  ]

  const carFeatures = [
    {
      title: 'Handcrafted Interior',
      description: 'Every detail meticulously crafted by master artisans using the finest materials available.'
    },
    {
      title: 'Twin-Turbo V8 Power',
      description: 'Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.'
    },
    {
      title: 'Air Suspension',
      description: 'Advanced air suspension system provides unparalleled comfort and ride quality.'
    },
    {
      title: 'Executive Seating',
      description: 'Spacious cabin with executive seating perfect for business travel and long journeys.'
    },
    {
      title: 'Advanced Technology',
      description: 'Latest infotainment and connectivity features seamlessly integrated with luxury.'
    },
    {
      title: 'British Heritage',
      description: 'Proud continuation of Bentley\'s legendary heritage and craftsmanship tradition.'
    }
  ]

  const specifications = {
    'Engine': 'V8 Twin-Turbo 6.75L',
    'Power': '537 hp',
    'Transmission': '8-Speed Automatic',
    'Top Speed': '190 mph (305 km/h)',
    'Acceleration': '0-60 mph in 4.1s',
    'Fuel Economy': '15 mpg combined',
    'Seating': '5 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Hourly rate (minimum 2 hours)', value: '€250' },
    { label: 'Full day rate (max. 6 hours)', value: '€1200' },
    { label: 'Cascais Airport to Lisbon Center', value: '€400' }
  ]

  return (
    <CarDetail
      name="Bentley Mulsanne"
      year="2023"
      category="modern"
      images={carImages}
      description="British luxury redefined, the Bentley Mulsanne offers unparalleled comfort and sophistication for the discerning traveler. This masterpiece combines cutting-edge technology with traditional British craftsmanship, creating an experience that transcends ordinary luxury transportation."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/bentley-mulsanne.png"
    />
  )
}
