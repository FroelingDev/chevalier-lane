import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/oldsmobile-super-88')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/oldsmobile-1.png',
      alt: 'Oldsmobile Super 88 exterior - front three-quarter view with top down',
      caption: 'Convertible front three-quarter view showing grille, quad headlamps and chrome details'
    },
    {
      src: '/oldsmobile-2.png',
      alt: 'Oldsmobile Super 88 interior - wide cabin view',
      caption: 'Red and white interior seen from the rear seats with dashboard and front bench'
    },
    {
      src: '/oldsmobile-3.png',
      alt: 'Oldsmobile Super 88 exterior detail - rear wheel and whitewall tire',
      caption: 'Close-up of rear wheel with Oldsmobile hubcap and whitewall tire'
    },
    {
      src: '/oldsmobile-4.png',
      alt: 'Oldsmobile Super 88 exterior - full side profile',
      caption: 'Long, low side profile highlighting sweeping body line and tailfins'
    },
    {
      src: '/oldsmobile-5.png',
      alt: 'Oldsmobile Super 88 interior - dashboard and steering wheel',
      caption: 'Straight-on view of the dashboard with twin gauge pods and classic wheel'
    },
    {
      src: '/oldsmobile-6.png',
      alt: 'Oldsmobile Super 88 interior - rear passenger area and door panel',
      caption: 'Rear seat and door panel details with chrome window winder and trim'
    },
    {
      src: '/oldsmobile-7.png',
      alt: 'Oldsmobile Super 88 exterior - rear view',
      caption: 'Straight-on rear view featuring rocket-inspired tailfins and taillights'
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
      heroImage="/oldsmobile-1.png"
      reservationLink="/booking/oldsmobile-super-88"
    />
  )
}
