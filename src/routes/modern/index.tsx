import { createFileRoute } from '@tanstack/react-router'
import { CarMarketplace } from '../../components/CarMarketplace'

export const Route = createFileRoute('/modern/')({
  component: RouteComponent,
})

function RouteComponent() {
  const modernCars = [
    {
      id: 'mercedes-s500-brabus',
      name: 'MERCEDES S500 BRABUS',
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
    {
      id: 'mercedes-maybach',
      name: 'MERCEDES MAYBACH',
      image: '/maybach.png',
      link: '/modern/mercedes-maybach',
      year: '2024',
      category: 'modern' as const,
      description: 'The pinnacle of luxury and refinement, the Mercedes Maybach delivers unmatched comfort and prestige.',
      features: ['V12 Engine', 'Executive Rear Seating', 'Premium Materials', 'Advanced Technology'],
      prices: [
        { label: 'Base rate (max. 25km)', value: '€280' },
        { label: 'Additional per km', value: '€3,00/km' },
      ],
      availableSoon: true,
    },
  ]

  return (
    <CarMarketplace
      title="Modern Fleet"
      subtitle="Cutting-edge luxury with the latest automotive technology"
      description="Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort."
      heroImage="/modern-header.png"
      cars={modernCars}
    />
  )
}
