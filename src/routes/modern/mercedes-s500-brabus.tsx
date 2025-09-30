import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/mercedes-s500-brabus')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/brabus-1.png',
      alt: 'Mercedes S500 BRABUS exterior - low front three-quarter view',
      caption: 'Aggressive front three-quarter stance with multi-spoke wheels and chrome grille'
    },
    {
      src: '/brabus-2.png',
      alt: 'Mercedes S500 BRABUS exterior - head-on front view',
      caption: 'Wide front view highlighting the large grille and swept headlamps'
    },
    {
      src: '/brabus-3.png',
      alt: 'Mercedes S500 BRABUS detail - bonnet star emblem close-up',
      caption: 'Close-up of the Mercedes bonnet star and grille badge'
    },
    {
      src: '/brabus-4.png',
      alt: 'Mercedes S500 BRABUS interior - steering wheel and cockpit',
      caption: 'Driver-focused cockpit with multifunction steering wheel and center console controls'
    },
    {
      src: '/brabus-5.png',
      alt: 'Mercedes S500 BRABUS rim',
      caption: 'Rim of the Mercedes S500 BRABUS'
    }
  ]

  const carFeatures = [
    {
      title: 'BRABUS Performance',
      description: 'Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.'
    },
    {
      title: 'Executive Comfort',
      description: 'Premium leather seating with massage function and climate control for ultimate comfort.'
    },
    {
      title: 'Advanced Technology',
      description: 'State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.'
    },
    {
      title: 'Luxury Interior',
      description: 'Handcrafted interior with premium materials and meticulous attention to detail.'
    },
    {
      title: 'Safety First',
      description: 'Comprehensive safety systems including adaptive cruise control and lane keeping assist.'
    },
    {
      title: 'Fuel Efficiency',
      description: 'Optimized engine management for balanced performance and efficiency.'
    }
  ]

  const specifications = {
    'Engine': 'V8 Twin-Turbo 4.0L',
    'Power': '621 hp',
    'Transmission': '9-Speed Automatic',
    'Top Speed': '250 km/h (limited)',
    'Acceleration': '0-100 km/h in 3.9s',
    'Fuel Economy': '9.1 L/100km',
    'Seating': '5 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Base rate (max. 25km)', value: '€190' },
    { label: 'Additional per km', value: '€1,80/km' }
  ]

  return (
    <CarDetail
      name="Mercedes S500 BRABUS"
      year="2024"
      category="modern"
      images={carImages}
      description="Experience the ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology. The Mercedes S500 BRABUS represents the pinnacle of automotive performance with BRABUS enhancements that elevate every aspect of this magnificent vehicle."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/brabus-1.png"
      reservationLink="/booking/mercedes-s500-brabus"
    />
  )
}
