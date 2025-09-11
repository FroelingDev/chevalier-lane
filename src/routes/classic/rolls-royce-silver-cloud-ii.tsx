import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/rolls-royce-silver-cloud-ii')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/rolls-royce-silver-cloud-ii.png',
      alt: 'Rolls-Royce Silver Cloud II - British Luxury',
      caption: 'The epitome of British luxury and prestige from the golden age'
    },
    {
      src: '/rolls-royce-silver-cloud-ii.png',
      alt: 'Rolls-Royce Silver Cloud II - Interior',
      caption: 'Handcrafted interior with the finest materials and attention to detail'
    },
    {
      src: '/rolls-royce-silver-cloud-ii.png',
      alt: 'Rolls-Royce Silver Cloud II - Dashboard',
      caption: 'Elegant instrumentation reflecting the era\'s craftsmanship'
    },
    {
      src: '/rolls-royce-silver-cloud-ii.png',
      alt: 'Rolls-Royce Silver Cloud II - Profile',
      caption: 'Timeless design that continues to inspire modern luxury cars'
    }
  ]

  const carFeatures = [
    {
      title: 'Handcrafted Interior',
      description: 'Every detail meticulously crafted by master artisans in the Rolls-Royce tradition.'
    },
    {
      title: 'Silent Ride',
      description: 'Legendary Rolls-Royce refinement with unmatched noise isolation and smoothness.'
    },
    {
      title: 'Royal Heritage',
      description: 'Proud bearer of the Royal Warrant, serving British royalty for generations.'
    },
    {
      title: 'V8 Power',
      description: 'Smooth and powerful 6.2L V8 engine delivering effortless performance.'
    },
    {
      title: 'Timeless Elegance',
      description: 'Design that transcends decades, still considered the pinnacle of automotive luxury.'
    },
    {
      title: 'British Craftsmanship',
      description: 'The gold standard of automotive excellence and attention to detail.'
    }
  ]

  const specifications = {
    'Engine': 'V8 6.2L',
    'Power': '172 hp',
    'Transmission': '4-Speed Automatic',
    'Top Speed': '110 mph (177 km/h)',
    'Acceleration': '0-60 mph in 12.5s',
    'Fuel Economy': '14 mpg combined',
    'Seating': '5 passengers',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Hourly rate (minimum 2 hours)', value: '€260' },
    { label: 'Special events (up to 6 hours)', value: '€1100' },
    { label: 'Chauffeur service', value: 'By request' }
  ]

  return (
    <CarDetail
      name="Rolls-Royce Silver Cloud II"
      year="1960"
      category="classic"
      images={carImages}
      description="The Rolls-Royce Silver Cloud II represents the epitome of British luxury and prestige from the golden age of motoring. This 1960 masterpiece offers unmatched refinement and craftsmanship, embodying the legendary Rolls-Royce tradition of excellence that has served British royalty and discerning clients for generations."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/rolls-royce-silver-cloud-ii.png"
    />
  )
}
