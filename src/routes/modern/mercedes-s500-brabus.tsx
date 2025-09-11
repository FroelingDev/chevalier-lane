import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/modern/mercedes-s500-brabus')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/mercedes-s500-brabus.png',
      alt: 'Mercedes S500 BRABUS - Exterior View',
      caption: 'Striking exterior design with BRABUS enhancements'
    },
    {
      src: '/mercedes-s500-brabus.png',
      alt: 'Mercedes S500 BRABUS - Front View',
      caption: 'Commanding front presence with premium styling'
    },
    {
      src: '/mercedes-s500-brabus.png',
      alt: 'Mercedes S500 BRABUS - Side Profile',
      caption: 'Elegant side profile showcasing aerodynamic design'
    },
    {
      src: '/mercedes-s500-brabus.png',
      alt: 'Mercedes S500 BRABUS - Rear View',
      caption: 'Sophisticated rear design with modern LED lighting'
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
    { label: 'Hourly rate (minimum 2 hours)', value: '€180' },
    { label: 'Full day rate (max. 8 hours)', value: '€850' },
    { label: 'Cascais Airport to Lisbon Center', value: '€250' }
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
      heroImage="/mercedes-s500-brabus.png"
    />
  )
}
