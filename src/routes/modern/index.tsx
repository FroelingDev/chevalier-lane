import { createFileRoute } from "@tanstack/react-router";
import { CarMarketplace } from "../../components/CarMarketplace";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute('/modern/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useLanguage();
  const modernCars = [
    {
      id: 'mercedes-s500-brabus',
      name: 'MERCEDES S500 BRABUS',
      image: '/mercedes-s500-brabus.png',
      link: '/modern/mercedes-s500-brabus',
      year: '2024',
      category: 'modern' as const,
      description: t('The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.'),
      features: [t('V8 Twin-Turbo Engine'), t('BRABUS Performance'), t('Executive Comfort'), t('Advanced Tech')],
      prices: [
        { label: t('Base rate (max. 25km)'), value: '€190' },
        { label: t('Additional per km'), value: '€1,80/km' },
      ],
    },
    {
      id: 'bentley-mulsanne',
      name: 'BENTLEY MULSANNE',
      image: '/bentley-mulsanne.png',
      link: '/modern/bentley-mulsanne',
      year: '2023',
      category: 'modern' as const,
      description: t('British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.'),
      features: [t('V8 Twin-Turbo Engine'), t('Handcrafted Interior'), t('Air Suspension'), t('Executive Seating')],
      prices: [
        { label: t('Base rate (max. 25km)'), value: '€270' },
        { label: t('Additional per km'), value: '€3,50/km' },
      ],
    },
    {
      id: 'mercedes-maybach',
      name: 'MERCEDES-BENZ S-CLASS MAYBACH',
      image: '/maybach.png',
      link: '/modern/mercedes-maybach',
      year: '2024',
      category: 'modern' as const,
      description: t('The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.'),
      features: [t('V12 Engine'), t('Executive Rear Seating'), t('Premium Materials'), t('Advanced Technology')],
      prices: [
        { label: t('Base rate (max. 25km)'), value: '€280' },
        { label: t('Additional per km'), value: '€3,00/km' },
      ],
      availableSoon: true,
    },
  ]

  return (
    <CarMarketplace
      title={t("Modern Fleet")}
      subtitle={t("Cutting-edge luxury with the latest automotive technology")}
      description={t("Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.")}
      heroImage="/modern-header.png"
      cars={modernCars}
    />
  )
}
