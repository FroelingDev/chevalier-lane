import { createFileRoute } from "@tanstack/react-router";
import { CarMarketplace } from "../../components/CarMarketplace";
import { useLanguage } from "@/components/LanguageProvider";

export const Route = createFileRoute('/classic/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useLanguage();
  const classicCars = [
    {
      id: 'rolls-royce-silver-cloud-ii',
      name: 'ROLLS-ROYCE SILVER CLOUD II',
      image: '/rolls-royce-silver-cloud-ii.png',
      link: '/classic/rolls-royce-silver-cloud-ii',
      year: '1961',
      category: 'classic' as const,
      description: t('The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.'),
      features: [t('V8 Engine'), t('Handcrafted Interior'), t('Silent Ride'), t('Royal Heritage')],
      prices: [
        { label: t('Base rate (max. 20km)'), value: '€350' },
        { label: t('Additional km'), value: t('Subject to request') },
      ],
    },
    {
      id: 'rolls-royce-silver-shadow',
      name: 'ROLLS-ROYCE SILVER SHADOW',
      image: '/rolls-royce-silver-shadow.png',
      link: '/classic/rolls-royce-silver-shadow',
      year: '1973',
      category: 'classic' as const,
      description: t('A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.'),
      features: [
        t('V8 Turbo Engine'),
        t('Hydropneumatic Suspension'),
        t('Executive Comfort'),
        t('Modern Classic'),
      ],
      prices: [
        { label: t('Base rate (max. 20km)'), value: '€300' },
        { label: t('Additional km'), value: t('Subject to request') },
      ],
    },
    {
      id: 'oldsmobile-super-88',
      name: 'OLDSMOBILE SUPER 88',
      image: '/oldsmobile-super-88.png',
      link: '/classic/oldsmobile-super-88',
      year: '1961',
      category: 'classic' as const,
      description: t('Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.'),
      features: [
        t('V8 Rocket Engine'),
        t('American Classic'),
        t('Powerful Performance'),
        t('Retro Design'),
      ],
      prices: [
        { label: t('Base rate (max. 20km)'), value: '€320' },
        { label: t('Additional km'), value: t('Subject to request') },
      ],
    },
    {
      id: 'mercedes-280sl-pagoda',
      name: 'MERCEDES PAGODA',
      image: '/mercedes-pagoda.png',
      link: '/classic/mercedes-280sl-pagoda',
      year: '1969',
      category: 'classic' as const,
      description: t('The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.'),
      features: [t('V8 Engine'), t('Classic Design'), t('Timeless Elegance'), t('Perfect for Events')],
      prices: [{ label: t('Pricing'), value: t('Subject to request') }],
    },
    {
      id: 'jaguar-xj6',
      name: 'JAGUAR XJ6',
      image: '/jaguar-xj6-1968.png',
      link: '/classic/jaguar-xj6',
      year: '1968',
      category: 'classic' as const,
      description: t('British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.'),
      features: [
        t('Straight-6 Engine'),
        t('British Luxury'),
        t('Sporting Heritage'),
        t('Timeless Design'),
      ],
      prices: [
        { label: t('Base rate (max. 20km)'), value: '€250' },
        { label: t('Additional km'), value: t('Subject to request') },
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
      description: t('The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.'),
      features: [t('V12 Engine'), t('Daimler Luxury'), t('Executive Comfort'), t('British Prestige')],
      prices: [
        { label: t('Base rate (max. 25km)'), value: '€200' },
        { label: t('Additional km'), value: t('Subject to request') },
      ],
      availableSoon: true,
    },
  ]

  return (
    <CarMarketplace
      title={t("Classic Collection")}
      subtitle={t("Timeless elegance from the golden age of motoring")}
      description={t("Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.")}
      heroImage="/classic-header.png"
      cars={classicCars}
    />
  )
}
