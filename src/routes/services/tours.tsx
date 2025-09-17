import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetail } from '../../components/ServiceDetail'

export const Route = createFileRoute('/services/tours')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ServiceDetail
      title="Luxury Tours & Private Wine Experiences"
      subtitle="Bacalhôa Buddha Eden (Bombarral) and Palácio da Bacalhôa (Azeitão)"
      description="Exclusive private experiences combining chauffeured comfort, garden visits, and premium wine tastings. Choose from a private Buddha Eden garden visit with optional on‑site tasting at Quinta dos Loridos, or curated private tastings at Palácio da Bacalhôa in Azeitão, Setúbal."
      heroImage="/scenic-routes.png"
      mainImage="/scenic-routes.png"
      mainImageAlt="Luxury Tours"
      imageOnLeft={true}
      features={[
        {
          title: "Buddha Eden Highlights",
          items: [
            "Chauffeured private arrival (Quinta dos Loridos)",
            "Entrance to Buddha Eden Gardens",
            "Asian-inspired sculptures, lakes, pagodas",
            "Terracotta warriors & contemporary art",
            "Optional tourist train inside gardens (€6 pp)",
            "Garden visit ~1.5–2 hours"
          ]
        },
        {
          title: "Palácio da Bacalhôa Highlights",
          items: [
            "Private guided Palace, gardens, vineyards",
            "Art collection and historic tiles",
            "Curated and premium wine tastings",
            "Azeitão cheese and dried fruits pairing",
            "Languages: Portuguese & English",
            "Mon–Sat schedules (10:00 & 15:00)"
          ]
        }
      ]}
      pricing={[
        { name: "Buddha Eden Gardens Visit", price: "€7 per person (+€6 optional train)" },
        { name: "Private Wine Tasting – Quinta dos Loridos", price: "€30–50 per person" },
        { name: "Full Private Experience (Visit + Tasting)", price: "€40–60 per person" },
        { name: "Bacalhôa Wine Tasting (Palácio)", price: "€75 per person" },
        { name: "Catarina de Bragança Tasting (Palácio)", price: "€75 per person" },
        { name: "D. Carlos I Tasting (Palácio)", price: "€250 per person" },
        { name: "Standard Visit & Tasting (Palácio)", price: "From €15 per person" },
        { name: "Wine & Food Experience (Palácio)", price: "€200 per person (min. 6)" }
      ]}
      additionalContent={
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl luxury-heading text-luxury-black mb-2">Private Experience at Bacalhôa Buddha Eden – Bombarral</h3>
            <p className="text-gray-700">Exclusive private visit to Buddha Eden Gardens with optional tailor‑made wine tasting at Quinta dos Loridos.</p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Buddha Eden Gardens Visit</h4>
              <div className="text-luxury-gold font-semibold mb-3">€7 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Location: Quinta dos Loridos, Bombarral</li>
                <li>Private arrival with chauffeur</li>
                <li>Entrance to the gardens, flexible visit</li>
                <li>Highlights: sculptures, lakes, pagodas, terracotta warriors</li>
                <li>Optional tourist train inside the gardens (€6 pp)</li>
              </ul>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-medium">Duration:</span> ~1.5–2 hours</div>
              </div>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Private Wine Tasting (Quinta dos Loridos)</h4>
              <div className="text-luxury-gold font-semibold mb-3">€30–50 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Exclusive setting within the estate after the garden visit</li>
                <li>Guided tasting of 4–6 Bacalhôa wines (white, red, Moscatel)</li>
                <li>Pairing: Azeitão cheese, dried fruits, regional snacks</li>
              </ul>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-medium">Duration:</span> ~60–90 minutes</div>
                <div><span className="font-medium">Price breakdown:</span> Wines €25–40 + Pairing €5–10</div>
              </div>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Full Private Experience</h4>
              <div className="text-luxury-gold font-semibold mb-3">€40–60 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Garden visit + private wine tasting</li>
                <li>Total duration ~2.5–3 hours</li>
                <li>Closed group price option available on request</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xl luxury-heading text-luxury-black mb-4">Buddha Eden – Quick Overview</h4>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 text-sm">
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Gardens Visit</div>
                <div>€7 pp • ~1.5–2h</div>
                <div className="text-gray-600">Entrance • Art & sculptures • Lakes</div>
                <div className="text-gray-600">Optional train €6 pp</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Private Wine Tasting</div>
                <div>€30–50 pp • ~60–90m</div>
                <div className="text-gray-600">4–6 wines • Cheese & snacks</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Full Experience</div>
                <div>€40–60 pp • ~2.5–3h</div>
                <div className="text-gray-600">Garden visit + exclusive tasting</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl luxury-heading text-luxury-black mb-2">Private Tasting Experiences at Palácio da Bacalhôa</h3>
            <p className="text-gray-700">Selection of exclusive wine tasting experiences in Azeitão, Setúbal.</p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Bacalhôa Wine Tasting</h4>
              <div className="text-luxury-gold font-semibold mb-3">€75 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Private guided visit of the Palace, gardens, vineyards</li>
                <li>Art collection and tile museum</li>
                <li>Tasting of 4 Bacalhôa wines</li>
                <li>Azeitão cheese and dried fruits</li>
              </ul>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-medium">Duration:</span> 150 minutes (2.5 hours)</div>
                <div><span className="font-medium">Group:</span> Min 2, max 20</div>
                <div><span className="font-medium">Languages:</span> Portuguese, English</div>
                <div><span className="font-medium">Schedule:</span> Mon–Sat at 10:00 and 15:00 (other times on request)</div>
              </div>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Catarina de Bragança Tasting</h4>
              <div className="text-luxury-gold font-semibold mb-3">€75 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Private guided tour of the Palace</li>
                <li>Curated wine tasting</li>
              </ul>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-medium">Duration:</span> Similar to Bacalhôa Wine Tasting</div>
              </div>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">D. Carlos I Tasting</h4>
              <div className="text-luxury-gold font-semibold mb-3">€250 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Exclusive guided tour of the Palace</li>
                <li>Tasting of 5 premium wines</li>
                <li>Includes sparkling reserve and selected red wines</li>
                <li>20-year-old Moscatel de Setúbal</li>
                <li>Azeitão cheese and dried fruits</li>
              </ul>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Standard Visit & Tasting</h4>
              <div className="text-luxury-gold font-semibold mb-3">From €15 per person</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Guided visit of the Palace, museum, or Quinta</li>
                <li>Standard wine tasting</li>
              </ul>
              <div className="text-xs text-gray-600 space-y-1">
                <div><span className="font-medium">Duration:</span> 1.5–3 hours (program dependent)</div>
              </div>
            </div>

            <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl luxury-heading text-luxury-black">Wine & Food Experience</h4>
              <div className="text-luxury-gold font-semibold mb-3">€200 per person (minimum 6)</div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
                <li>Guided tour of the Palace and Quinta</li>
                <li>Premium wine tasting paired with regional products</li>
                <li>Refined food experience</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xl luxury-heading text-luxury-black mb-4">Quick Comparison</h4>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6 text-sm">
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Bacalhôa Wine Tasting</div>
                <div>€75 • 150 min</div>
                <div className="text-gray-600">Private tour • 4 wines • Cheese & fruits</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Catarina de Bragança</div>
                <div>€75 • ~2h</div>
                <div className="text-gray-600">Guided tour • Curated tasting</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">D. Carlos I</div>
                <div>€250 • ~2h</div>
                <div className="text-gray-600">5 premium wines • incl. 20y Moscatel</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Standard Visit & Tasting</div>
                <div>From €15 • 1.5–3h</div>
                <div className="text-gray-600">Guided visit • Standard tasting</div>
              </div>
              <div className="bg-white/80 border border-luxury-gold/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold mb-1">Wine & Food Experience</div>
                <div>€200 (min. 6) • Varies</div>
                <div className="text-gray-600">Tour • Wines paired with regional food</div>
              </div>
            </div>
          </div>
        </div>
      }
      ctaText="Plan Your Tour"
    />
  )
}
