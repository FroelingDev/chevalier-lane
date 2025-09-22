import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/oldsmobile-super-88')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/oldsmobile-super-88.png',
      alt: 'Oldsmobile Super 88 - Classic American',
      caption: 'Experience American automotive heritage from the golden age'
    },
    {
      src: '/oldsmobile-super-88.png',
      alt: 'Oldsmobile Super 88 - Interior',
      caption: 'Authentic period interior with classic design elements'
    },
    {
      src: '/oldsmobile-super-88.png',
      alt: 'Oldsmobile Super 88 - Dashboard',
      caption: 'Vintage instrumentation and controls'
    },
    {
      src: '/oldsmobile-super-88.png',
      alt: 'Oldsmobile Super 88 - Front View',
      caption: 'Commanding front presence with distinctive American styling'
    }
  ]

  const carFeatures = [
    {
      title: 'V8 Rocket Engine',
      description: 'Powerful 364 cubic inch V8 engine delivering classic American performance.'
    },
    {
      title: 'American Classic',
      description: 'Authentic representation of mid-20th century American automotive excellence.'
    },
    {
      title: 'Powerful Performance',
      description: 'Impressive power delivery with the unmistakable V8 rumble.'
    },
    {
      title: 'Retro Design',
      description: 'Timeless styling that captures the essence of 1950s American luxury.'
    },
    {
      title: 'Period Authenticity',
      description: 'Meticulously maintained to preserve its original character and charm.'
    },
    {
      title: 'Cultural Icon',
      description: 'Represents an important chapter in American automotive history.'
    }
  ]

  const specifications = {
    'Engine': 'V8 Rocket 364 cu in',
    'Power': '240 hp',
    'Transmission': '4-Speed Automatic',
    'Top Speed': '110 mph (177 km/h)',
    'Acceleration': '0-60 mph in 10.5s',
    'Fuel Economy': '12 mpg combined',
    'Seating': '6 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Base rate (max. 20km)', value: '€320' },
    { label: 'Additional km', value: 'Subject to request' },
  ]

  return (
    <CarDetail
      name="Oldsmobile Super 88"
      year="1961"
      category="classic"
      images={carImages}
      description="Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88. This 1961 classic represents the pinnacle of American luxury from the post-war era, featuring the legendary Rocket V8 engine and distinctive styling that defined an era of automotive excellence."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/oldsmobile-super-88.png"
      reservationLink="/booking/oldsmobile-super-88"
    />
  )
}
