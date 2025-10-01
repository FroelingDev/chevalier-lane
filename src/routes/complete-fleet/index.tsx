import { createFileRoute } from '@tanstack/react-router'
import { CarMarketplace } from '../../components/CarMarketplace'

export const Route = createFileRoute('/complete-fleet/')({
  component: RouteComponent,
})

const classicCars = [
  {
    id: 'rolls-royce-silver-cloud-ii',
    name: 'ROLLS-ROYCE SILVER CLOUD II',
    image: '/rolls-royce-silver-cloud-ii.png',
    link: '/classic/rolls-royce-silver-cloud-ii',
    year: '1961',
    category: 'classic' as const,
    description: 'The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.',
    features: ['V8 Engine', 'Handcrafted Interior', 'Silent Ride', 'Royal Heritage'],
    prices: [
      { label: 'Base rate (max. 20km)', value: '€350' },
      { label: 'Additional km', value: 'Subject to request' },
    ],
  },
  {
    id: 'rolls-royce-silver-shadow',
    name: 'ROLLS-ROYCE SILVER SHADOW',
    image: '/rolls-royce-silver-shadow.png',
    link: '/classic/rolls-royce-silver-shadow',
    year: '1973',
    category: 'classic' as const,
    description: 'A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.',
    features: ['V8 Turbo Engine', 'Hydropneumatic Suspension', 'Executive Comfort', 'Modern Classic'],
    prices: [
      { label: 'Base rate (max. 20km)', value: '€300' },
      { label: 'Additional km', value: 'Subject to request' },
    ],
  },
  {
    id: 'oldsmobile-super-88',
    name: 'OLDSMOBILE SUPER 88',
    image: '/oldsmobile-super-88.png',
    link: '/classic/oldsmobile-super-88',
    year: '1961',
    category: 'classic' as const,
    description: 'Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.',
    features: ['V8 Rocket Engine', 'American Classic', 'Powerful Performance', 'Retro Design'],
    prices: [
      { label: 'Base rate (max. 20km)', value: '€320' },
      { label: 'Additional km', value: 'Subject to request' },
    ],
  },
]

const modernCars = [
  {
    id: 'mercedes-s500-brabus',
    name: 'MERCEDES BRABUS',
    image: '/mercedes-s500-brabus.png',
    link: '/modern/mercedes-s500-brabus',
    year: '2024',
    category: 'modern' as const,
    description: 'The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.',
    features: ['V8 Twin-Turbo Engine', 'BRABUS Performance', 'Executive Comfort', 'Advanced Tech'],
    prices: [
      { label: 'Base rate (max. 25km)', value: '€190' },
      { label: 'Additional per km', value: '€1,80/km' },
    ],
  },
  {
    id: 'bentley-mulsanne',
    name: 'BENTLEY MULSANNE',
    image: '/bentley-mulsanne.png',
    link: '/modern/bentley-mulsanne',
    year: '2023',
    category: 'modern' as const,
    description: 'British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.',
    features: ['V8 Twin-Turbo Engine', 'Handcrafted Interior', 'Air Suspension', 'Executive Seating'],
    prices: [
      { label: 'Base rate (max. 25km)', value: '€270' },
      { label: 'Additional per km', value: '€3,50/km' },
    ],
  },
]

const completeFleet = [
  ...classicCars,
  {
    id: 'mercedes-280sl-pagoda',
    name: 'MERCEDES PAGODA',
    image: '/mercedes-pagoda.png',
    link: '/classic/mercedes-280sl-pagoda',
    year: '1969',
    category: 'classic' as const,
    description: 'The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.',
    features: ['V8 Engine', 'Classic Design', 'Timeless Elegance', 'Perfect for Events'],
    prices: [{ label: 'Pricing', value: 'Subject to request' }],
  },
  ...modernCars,
]

function RouteComponent() {
  return (
    <CarMarketplace
      title="Complete Fleet"
      subtitle="Classic heritage and modern innovation in one exclusive collection"
      description="Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey."
      heroImage="/complete-fleet-header.png"
      cars={completeFleet}
    />
  )
}
