import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/range-rover-vogue')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/range-rover-vogue.png',
      alt: 'Range Rover Vogue - Luxury SUV',
      caption: 'British luxury meets off-road capability'
    },
    {
      src: '/range-rover-vogue.png',
      alt: 'Range Rover Vogue - Interior',
      caption: 'Premium cabin with executive seating'
    },
    {
      src: '/range-rover-vogue.png',
      alt: 'Range Rover Vogue - Dashboard',
      caption: 'Advanced touchscreen technology and controls'
    },
    {
      src: '/range-rover-vogue.png',
      alt: 'Range Rover Vogue - Profile',
      caption: 'Iconic design with commanding road presence'
    }
  ]

  const carFeatures = [
    {
      title: 'Terrain Response System',
      description: 'Advanced all-terrain capability with multiple driving modes for any condition.'
    },
    {
      title: 'Luxury Interior',
      description: 'Premium materials and craftsmanship create an oasis of comfort and refinement.'
    },
    {
      title: 'Advanced 4x4',
      description: 'Intelligent all-wheel drive system adapts to road conditions automatically.'
    },
    {
      title: 'Air Suspension',
      description: 'Adaptive air suspension provides exceptional ride comfort and capability.'
    },
    {
      title: 'Executive Seating',
      description: 'Spacious cabin with premium seating for up to 5 passengers in luxury.'
    },
    {
      title: 'British Heritage',
      description: 'Proud Land Rover tradition of capability, luxury, and adventure.'
    }
  ]

  const specifications = {
    'Engine': 'V8 Supercharged 5.0L',
    'Power': '525 hp',
    'Transmission': '8-Speed Automatic',
    'Top Speed': '140 mph (225 km/h)',
    'Acceleration': '0-60 mph in 4.5s',
    'Fuel Economy': '19 mpg combined',
    'Seating': '5 passengers',
    'Drive Type': 'Four-Wheel Drive'
  }

  const pricing = [
    { label: 'Hourly rate (minimum 2 hours)', value: '€160' },
    { label: 'Full day rate (max. 8 hours)', value: '€780' },
    { label: 'Airport Transfer', value: '€200' }
  ]

  return (
    <CarDetail
      name="Range Rover Vogue"
      year="2024"
      category="modern"
      images={carImages}
      description="British luxury meets off-road capability in the Range Rover Vogue. This iconic SUV combines unparalleled versatility with the highest standards of luxury, making it the perfect choice for discerning clients who demand both capability and sophistication."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/range-rover-vogue.png"
    />
  )
}
