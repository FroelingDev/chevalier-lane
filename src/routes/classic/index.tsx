import { createFileRoute } from '@tanstack/react-router'
import { CarMarketplace } from '../../components/CarMarketplace'

export const Route = createFileRoute('/classic/')({
  component: RouteComponent,
})

function RouteComponent() {
  const classicCars = [
    {
      id: 'mercedes-280sl-pagoda',
      name: 'MERCEDES 280SL PAGODA',
      image: '/foton-pagoda.png',
      link: '/classic/mercedes-280sl-pagoda',
      year: '1969',
      category: 'classic' as const,
      description: 'The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.',
      features: ['V8 Engine', 'Classic Design', 'Timeless Elegance', 'Perfect for Events'],
      prices: [
        { label: 'Hourly rate (minimum 2 hours)', value: '€220' },
        { label: 'Special events (up to 6 hours)', value: '€900' },
        { label: 'Chauffeur service', value: 'By request' },
      ],
    },
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
        { label: 'Hourly rate (minimum 2 hours)', value: '€260' },
        { label: 'Special events (up to 6 hours)', value: '€1100' },
        { label: 'Chauffeur service', value: 'By request' },
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
        { label: 'Hourly rate (minimum 2 hours)', value: '€240' },
        { label: 'Special events (up to 6 hours)', value: '€980' },
        { label: 'Chauffeur service', value: 'By request' },
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
        { label: 'Hourly rate (minimum 2 hours)', value: '€200' },
        { label: 'Special events (up to 6 hours)', value: '€850' },
        { label: 'Chauffeur service', value: 'By request' },
      ],
    },
  ]

  return (
    <CarMarketplace
      title="Classic Collection"
      subtitle="Timeless elegance from the golden age of motoring"
      description="Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style."
      heroImage="/classic-header.png"
      cars={classicCars}
    />
  )
}
