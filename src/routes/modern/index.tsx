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
        { label: 'Hourly rate (minimum 2 hours)', value: '€180' },
        { label: 'Full day rate (max. 8 hours)', value: '€850' },
        { label: 'Cascais Airport to Lisbon Center', value: '€250' },
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
        { label: 'Hourly rate (minimum 2 hours)', value: '€250' },
        { label: 'Full day rate (max. 6 hours)', value: '€1200' },
        { label: 'Cascais Airport to Lisbon Center', value: '€400' },
      ],
    },
    {
      id: 'mercedes-gls-300',
      name: 'MERCEDES GLS 300',
      image: '/modern-header.png',
      link: '/modern/mercedes-gls-300',
      year: '2024',
      category: 'modern' as const,
      description: 'The perfect blend of luxury SUV comfort and executive transportation, ideal for discerning clients.',
      features: ['V6 Turbo Engine', 'Spacious Interior', 'Advanced Safety', 'All-Terrain Capability'],
      prices: [
        { label: 'Hourly rate (minimum 2 hours)', value: '€100' },
        { label: 'Full day rate (max. 8 hours)', value: '€650' },
        { label: 'Cascais Airport (Extra Car)', value: '€80' },
      ],
    },
    {
      id: 'range-rover-vogue',
      name: 'RANGE ROVER VOGUE',
      image: '/range-rover-vogue.png',
      link: '/modern/range-rover-vogue',
      year: '2024',
      category: 'modern' as const,
      description: 'British luxury meets off-road capability, offering the ultimate in versatile, high-end transportation.',
      features: ['V8 Engine', 'Terrain Response', 'Luxury Interior', 'Advanced 4x4'],
      prices: [
        { label: 'Hourly rate (minimum 2 hours)', value: '€160' },
        { label: 'Full day rate (max. 8 hours)', value: '€780' },
        { label: 'Airport Transfer', value: '€200' },
      ],
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
