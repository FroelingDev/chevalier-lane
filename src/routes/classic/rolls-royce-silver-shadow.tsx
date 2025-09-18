import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/rolls-royce-silver-shadow')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/rolls-royce-silver-shadow.png',
      alt: 'Rolls-Royce Silver Shadow - Modern Classic',
      caption: 'A masterpiece of automotive engineering blending tradition with innovation'
    },
    {
      src: '/rolls-royce-silver-shadow.png',
      alt: 'Rolls-Royce Silver Shadow - Interior',
      caption: 'Luxurious cabin with modern amenities in a classic package'
    },
    {
      src: '/rolls-royce-silver-shadow.png',
      alt: 'Rolls-Royce Silver Shadow - Dashboard',
      caption: 'Advanced instrumentation combined with traditional Rolls-Royce elegance'
    },
    {
      src: '/rolls-royce-silver-shadow.png',
      alt: 'Rolls-Royce Silver Shadow - Profile',
      caption: 'Sleek lines that defined modern luxury car design'
    }
  ]

  const carFeatures = [
    {
      title: 'Hydropneumatic Suspension',
      description: 'Revolutionary self-leveling suspension system providing unparalleled ride comfort.'
    },
    {
      title: 'V8 Turbo Engine',
      description: 'Powerful and refined turbocharged V8 delivering modern performance standards.'
    },
    {
      title: 'Modern Classic',
      description: 'Perfect blend of traditional Rolls-Royce values with contemporary engineering.'
    },
    {
      title: 'Executive Comfort',
      description: 'Spacious cabin designed for business travel and long-distance comfort.'
    },
    {
      title: 'Advanced Technology',
      description: 'Incorporated modern automotive technology while maintaining luxury standards.'
    },
    {
      title: 'Timeless Design',
      description: 'Design that influenced modern luxury cars and remains relevant today.'
    }
  ]

  const specifications = {
    'Engine': 'V8 Turbo 6.75L',
    'Power': '200 hp',
    'Transmission': '3-Speed Automatic',
    'Top Speed': '120 mph (193 km/h)',
    'Acceleration': '0-60 mph in 10.8s',
    'Fuel Economy': '16 mpg combined',
    'Seating': '5 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Hourly rate (minimum 2 hours)', value: '€240' },
    { label: 'Special events (up to 6 hours)', value: '€980' },
    { label: 'Chauffeur service', value: 'By request' }
  ]

  return (
    <CarDetail
      name="Rolls-Royce Silver Shadow"
      year="1973"
      category="classic"
      images={carImages}
      description="The Rolls-Royce Silver Shadow represents a masterpiece of automotive engineering that blends traditional Rolls-Royce craftsmanship with cutting-edge technology. This 1973 classic introduced revolutionary features like hydropneumatic suspension while maintaining the unparalleled luxury and refinement that Rolls-Royce is renowned for worldwide."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/rolls-royce-silver-shadow.png"
    />
  )
}
