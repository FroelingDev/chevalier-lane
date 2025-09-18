import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/mercedes-280sl-pagoda')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/foton-pagoda.png',
      alt: 'Mercedes 280SL Pagoda - Iconic Design',
      caption: 'The legendary Pagoda roof design that defined an era'
    },
    {
      src: '/foton-pagoda.png',
      alt: 'Mercedes 280SL Pagoda - Classic Profile',
      caption: 'Timeless curves and proportions that inspired generations'
    },
    {
      src: '/foton-pagoda.png',
      alt: 'Mercedes 280SL Pagoda - Front View',
      caption: 'Commanding front presence with classic Mercedes styling'
    },
    {
      src: '/foton-pagoda.png',
      alt: 'Mercedes 280SL Pagoda - Side View',
      caption: 'Elegant side profile showcasing the distinctive hardtop roof'
    }
  ]

  const carFeatures = [
    {
      title: 'Iconic Pagoda Design',
      description: 'The distinctive hardtop roof that gives this car its legendary name and status.'
    },
    {
      title: 'Pure Driving Experience',
      description: 'Experience automotive purity with manual transmission and analog instrumentation.'
    },
    {
      title: 'Timeless Elegance',
      description: 'A design that transcends generations, still turning heads after six decades.'
    },
    {
      title: 'Engineering Excellence',
      description: 'Mercedes-Benz build quality and attention to detail that has stood the test of time.'
    },
    {
      title: 'Collectible Status',
      description: 'One of the most sought-after classic cars, appreciating in value and prestige.'
    },
    {
      title: 'Event Perfect',
      description: 'Makes any occasion special with its presence and the stories it tells.'
    }
  ]

  const specifications = {
    'Engine': 'Inline-6 2.8L',
    'Power': '170 hp',
    'Transmission': '4-Speed Manual',
    'Top Speed': '200 km/h',
    'Acceleration': '0-100 km/h in 9.8s',
    'Fuel Economy': '12.5 L/100km',
    'Seating': '2 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Hourly rate (minimum 2 hours)', value: '€220' },
    { label: 'Special events (up to 6 hours)', value: '€900' },
    { label: 'Chauffeur service', value: 'By request' }
  ]

  return (
    <CarDetail
      name="Mercedes 280SL Pagoda"
      year="1969"
      category="classic"
      images={carImages}
      description="The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring. With its distinctive hardtop roof and timeless design, this 1969 masterpiece continues to captivate enthusiasts and represents the pinnacle of 1960s automotive design."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/foton-pagoda.png"
    />
  )
}
