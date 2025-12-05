import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetail } from "../../components/ServiceDetail";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/services/weddings")({
  component: RouteComponent,
});

function RouteComponent() {
  const pointImages = [
    {
      src: "/rolls-royce-silver-cloud-ii.png",
      alt: "Rolls-Royce Silver Cloud II wedding transport",
    },
    {
      src: "/rolls-royce-silver-shadow.png",
      alt: "Rolls-Royce Silver Shadow wedding ceremony",
    },
    {
      src: "/oldsmobile-person.png",
      alt: "Oldsmobile Super 88 wedding chauffeur",
    },
    {
      src: "/mercedes-pagoda.png",
      alt: "Mercedes 280SL Pagoda wedding arrival",
    },
    {
      src: "/bentley-mulsanne.png",
      alt: "Bentley Mulsanne wedding reception",
    },
  ];

  const [currentPointImageIndex, setCurrentPointImageIndex] = useState(0);

  const goToPreviousPointImage = () => {
    setCurrentPointImageIndex((prev) =>
      prev === 0 ? pointImages.length - 1 : prev - 1
    );
  };

  const goToNextPointImage = () => {
    setCurrentPointImageIndex((prev) =>
      prev === pointImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <ServiceDetail
      title="Wedding Services"
      subtitle="Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client"
      description="Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision."
      heroImage="/special-events.png"
      mainImage="/oldsmobile-person.png"
      mainImageAlt="Rolls-Royce wedding chauffeur service"
      imageOnLeft={false}
      features={[
        {
          title: "Main Wedding Fleet (Stationary/Couples)",
          items: [
            "Rolls-Royce Silver Cloud II 1961",
            "Rolls-Royce Silver Shadow 1973",
            "Oldsmobile Super 88 1961",
            "Mercedes 280SL Pagoda 1969",
            "Decorations and designs available as extras",
            "Perfect for photos, ceremonies, and special moments",
            "Professional chauffeur service included",
          ],
        },
        {
          title: "Additional Wedding Transport Vehicles",
          items: [
            "Bentley Mulsanne (4 seats)",
            "Mercedes Maybach (3 seats)",
            "6% VAT included - For guest transportation",
            "Minimum 3 hours booking required",
            "1 trip = 1 pickup + 1 drop-off",
          ],
        },
        {
          title: "Decoration Options (Extra)",
          items: [
            "Basic Decoration (artificial or simple natural flowers + ribbons)",
            "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
            "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
          ],
        },
        {
          title: "Service Features",
          items: [
            "Maximum 2 trips per hour depending on traffic and distance in Lisbon",
            "Maximum 6 trips per reservation for flexibility",
            "Minimum 3-hour booking to cover driver, preparation, and fuel",
            "12-hour maximum daily rate for full wedding day coverage",
            "Flexible scheduling for guests arriving/leaving at different times",
            "Professional coordination for multiple vehicle operations",
          ],
        },
      ]}
      // pricing={[
      //   {
      //     name: "Rolls-Royce Silver Cloud II (3h min)",
      //     price: "€900",
      //   },
      //   {
      //     name: "Rolls-Royce Silver Shadow (3h min)",
      //     price: "€810",
      //   },
      //   {
      //     name: "Oldsmobile Super 88 (3h min)",
      //     price: "€1,050",
      //   },
      //   {
      //     name: "Mercedes 280SL Pagoda (3h min)",
      //     price: "€750",
      //   },
      //   {
      //     name: "Bentley Mulsanne (per trip)",
      //     price: "€150",
      //   },
      //   {
      //     name: "Mercedes Maybach (per trip)",
      //     price: "€140",
      //   },
       // ]}
       ctaText="Book Your Wedding Transport"
       bookingLink="/booking/wedding"
       preDetailsSection={
         <>
           {/* Section separator between hero title and From Ceremony to Reception section */}
           <div className="bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black">
             <div className="relative max-w-5xl mx-auto pt-8 pb-4 px-4">
               <div className="h-px w-full bg-gradient-to-r from-transparent via-luxury-gold/70 to-transparent" />
             </div>
           </div>

           <section className="py-24 px-4 bg-gradient-to-br from-luxury-black via-[#0b0b0b] to-luxury-black relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(184,134,11,0.25),transparent_55%)]"></div>
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_40%,rgba(255,255,255,0.05)_80%)]"></div>

             <div className="max-w-7xl mx-auto relative z-10">
               <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl lg:text-6xl luxury-display text-white mb-6 tracking-[0.2em] uppercase">
                   From Ceremony to Reception
                 </h2>
                 <div className="gold-separator mx-auto mb-8 w-48"></div>
                 <p className="text-lg md:text-xl font-playfair text-white/80 max-w-3xl mx-auto leading-relaxed">
                   Elegant, seamless wedding journeys from ceremony venues to reception halls,
                   tailored around your special day timeline.
                 </p>
               </div>

               <div className="relative max-w-4xl mx-auto">
                 <button
                   type="button"
                   onClick={goToPreviousPointImage}
                   className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full backdrop-blur transition-colors duration-300"
                   aria-label="View previous wedding image"
                 >
                   <ArrowLeft className="h-5 w-5" />
                 </button>
                 <button
                   type="button"
                   onClick={goToNextPointImage}
                   className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-full backdrop-blur transition-colors duration-300"
                   aria-label="View next wedding image"
                 >
                   <ArrowRight className="h-5 w-5" />
                 </button>

                 <div className="overflow-hidden rounded-3xl border border-luxury-gold/30 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.75)]">
                   <div
                     className="flex transition-transform duration-700 ease-in-out"
                     style={{
                       transform: `translateX(-${currentPointImageIndex * 100}%)`,
                     }}
                   >
                     {pointImages.map((image) => (
                       <div
                         key={image.src}
                         className="min-w-full h-64 md:h-80 group relative overflow-hidden"
                       >
                         <img
                           src={image.src}
                           alt={image.alt}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           onError={(e) => {
                             e.currentTarget.src = "legacy.png";
                           }}
                         />
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="flex items-center justify-center gap-3 mt-6">
                   {pointImages.map((image, index) => (
                     <button
                       key={image.src}
                       type="button"
                       onClick={() => setCurrentPointImageIndex(index)}
                       className={`h-1.5 rounded-full transition-all duration-300 ${
                         currentPointImageIndex === index
                           ? "w-10 bg-luxury-gold"
                           : "w-5 bg-white/40"
                       }`}
                       aria-label={`Go to image ${index + 1}`}
                     />
                   ))}
                 </div>
               </div>
             </div>
           </section>
         </>
       }
     />
   );
 }
