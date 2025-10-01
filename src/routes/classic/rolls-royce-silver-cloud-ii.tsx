import { createFileRoute } from '@tanstack/react-router'
import { CarDetail } from '../../components/CarDetail'

export const Route = createFileRoute('/classic/rolls-royce-silver-cloud-ii')({
  component: RouteComponent,
})

function RouteComponent() {
  const carImages = [
    {
      src: '/cloud-1.png',
      alt: 'Rolls-Royce Silver Cloud II exterior - high-angle left side view',
      caption: 'Elegant teal body with flowing lines and brightwork from an elevated angle'
    },
    {
      src: '/cloud-2.png',
      alt: 'Rolls-Royce Silver Cloud II detail - Spirit of Ecstasy and Pantheon grille',
      caption: 'Close-up of the iconic grille, mascot and quad headlamps'
    },
    {
      src: '/cloud-3.png',
      alt: 'Rolls-Royce Silver Cloud II exterior - front three-quarter view',
      caption: 'Classic front end with prominent bonnet and chrome bumper overriders'
    },
    {
      src: '/cloud-4.png',
      alt: 'Rolls-Royce Silver Cloud II interior - front cabin and dashboard',
      caption: 'Cream leather front bench with rich walnut veneer dashboard and trim'
    },
    {
      src: '/cloud-5.png',
      alt: 'Rolls-Royce Silver Cloud II exterior - passenger-side three-quarter view',
      caption: 'Sculpted front wings and timeless proportions in natural light'
    },
    {
      src: '/cloud-6.png',
      alt: 'Rolls-Royce Silver Cloud II interior - rear picnic tables',
      caption: 'Fold-out walnut picnic trays for rear passengers'
    },
    {
      src: '/cloud-7.png',
      alt: 'Rolls-Royce Silver Cloud II interior - rear seat and headliner',
      caption: 'Spacious rear compartment with cream leather upholstery and wood accents'
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
    'Passengers': '4',
    'Luggage': '1 suitcase + 2 bags',
    'Drive Type': 'Rear-Wheel Drive'
  }

  const pricing = [
    { label: 'Base rate (max. 20km)', value: '€350' },
    { label: 'Additional km', value: 'Subject to request' }
  ]

  return (
    <CarDetail
      name="Rolls-Royce Silver Cloud II"
      year="1961"
      category="classic"
      images={carImages}
      description="The Rolls-Royce Silver Cloud II represents the epitome of British luxury and prestige from the golden age of motoring. This 1961 masterpiece offers unmatched refinement and craftsmanship, embodying the legendary Rolls-Royce tradition of excellence that has served British royalty and discerning clients for generations."
      features={carFeatures}
      specifications={specifications}
      prices={pricing}
      heroImage="/cloud-5.png"
      reservationLink="/booking/rolls-royce-silver-cloud-ii"
    />
  )
}
