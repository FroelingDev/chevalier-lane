import { createFileRoute } from '@tanstack/react-router'
import { CarMarketplace } from '../../components/CarMarketplace'

export const Route = createFileRoute('/classic/')({
  component: RouteComponent,
})

function RouteComponent() {
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
    {
      id: 'jaguar-xj6',
      name: 'JAGUAR XJ6',
      image: '/jaguar-xj6-1968.png',
      link: '/classic/jaguar-xj6',
      year: '1968',
      category: 'classic' as const,
      description: 'British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.',
      features: ['Straight-6 Engine', 'British Luxury', 'Sporting Heritage', 'Timeless Design'],
      prices: [
        { label: 'Base rate (max. 20km)', value: '€250' },
        { label: 'Additional km', value: 'Subject to request' },
      ],
      availableSoon: true,
    },
    {
      id: 'jaguar-double-six-daimler',
      name: 'JAGUAR DOUBLE SIX DAIMLER',
      image: '/jaguar-double-six-daimler-1991.png',
      link: '/classic/jaguar-double-six-daimler',
      year: '1991',
      category: 'classic' as const,
      description: 'The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.',
      features: ['V12 Engine', 'Daimler Luxury', 'Executive Comfort', 'British Prestige'],
      prices: [
        { label: 'Base rate (max. 25km)', value: '€200' },
        { label: 'Additional km', value: 'Subject to request' },
      ],
      availableSoon: true,
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
