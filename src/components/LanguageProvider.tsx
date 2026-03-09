import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type LanguageCode = "en" | "es" | "pt" | "ru" | "de" | "fr" | "ar";

type TranslationDictionary = Record<LanguageCode, Record<string, string>>;

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
  t: (key: string) => string;
};

export const SUPPORTED_LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
];

const translations: TranslationDictionary = {
  en: {},
  fr: {
    "Airport Transfers": "Transferts aéroport",
    "Discreet chauffeur service to and from the airport.": "Transferts aéroport fiables",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "Voyages d'affaires",
    "Classic Collection": "Collection classique",
    "Classic Wedding Fleet": "Flotte classique pour mariages",
    "Corporate Transportation": "Transport d'entreprise",
    "Executive Vehicles": "Véhicules exécutifs",
    "Fixed Price Transfers": "Transferts à prix fixe",
    "Flight Tracking": "Suivi des vols",
    "Chauffeured Transport": "Transport avec chauffeur",
    "Meeting Coordination": "Coordination des rendez-vous",
    "Historic Palaces": "Palais historiques",
    "Luxury Tours & Scenic Routes": "Circuits de luxe et routes panoramiques",
    "Make Your Own Exclusive Experiences by the Hour": "Créez vos expériences exclusives à l'heure",
    "Modern Luxury Fleet": "Flotte de luxe moderne",
    "Modern Transport": "Transport moderne",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "Transport aller simple",
    "Partner Brands": "Marques partenaires",
    "Priority Meet & Greet": "Accueil prioritaire",
    "Private Villa Access": "Accès à des villas privées",
    "Private Wine Tastings": "Dégustations de vin privées",
    "Personal Concierge": "Concierge personnel",
    "Professional Service": "Service professionnel",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "Transport VIP pour événements",
    "Wedding Services": "Services de mariage",
    "Wedding Services Description":
      "Transformez votre journée spéciale en une expérience inoubliable avec notre service de mariage.",
    About: "À propos",
    AboutUs: "À propos de nous",
    "A Legacy of Excellence": "Un héritage d'excellence",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "Un aperçu des voyages que nous créons — des célébrations intimes et arrivées de mariage aux routes panoramiques et événements d'entreprise sur mesure.",
    "Book Your Experience": "Réservez votre expérience",
    "A professional chauffeur service available by the hour.": "Transport professionnel pour affaires",
    Contact: "Contact",
    ContactUs: "Contactez-nous",
    "Contact Us": "Contactez-nous",
    "Ready to experience unparalleled luxury transportation?":
      "Prêt à vivre un transport de luxe sans égal ?",
    "Get in touch with us today.": "Contactez-nous dès aujourd'hui.",
    "Call Us": "Appelez-nous",
    "24/7 Available": "Disponible 24h/24, 7j/7",
    "Email Us": "Écrivez-nous",
    "We respond within 2 hours": "Nous répondons sous 2 heures",
    "Send Us a Message": "Envoyez-nous un message",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "Que vous ayez besoin d'un transport pour une occasion spéciale, une réunion d'affaires ou simplement pour vivre le summum du luxe, nous sommes là pour le rendre possible.",
    "Message Sent Successfully!": "Message envoyé avec succès !",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "Merci de nous avoir contactés. Nous reviendrons vers vous sous 2 heures.",
    "Full Name *": "Nom complet *",
    "Your full name": "Votre nom complet",
    "Email Address *": "Adresse e-mail *",
    "your.email@example.com": "votre.email@exemple.com",
    "Phone Number": "Numéro de téléphone",
    "Subject *": "Objet *",
    "Select a subject": "Sélectionnez un objet",
    "Booking Inquiry": "Demande de réservation",
    "Corporate Services": "Services d'entreprise",
    "Special Event": "Événement spécial",
    "General Information": "Informations générales",
    "Feedback": "Retour",
    "Message *": "Message *",
    "Please describe your requirements and any specific details...":
      "Veuillez décrire vos besoins et tout détail spécifique...",
    "Send Message": "Envoyer le message",
    "Get in Touch": "Nous contacter",
    Phone: "Téléphone",
    "Available 24/7 for urgent requests": "Disponible 24h/24 pour les demandes urgentes",
    Email: "E-mail",
    Location: "Localisation",
    "Miraflores, Lisbon": "Miraflores, Lisbonne",
    "Serving all of Portugal and beyond": "Nous servons tout le Portugal et au-delà",
    "Business Hours": "Horaires d'ouverture",
    "Monday - Sunday": "Lundi - Dimanche",
    "Why Choose Us?": "Pourquoi nous choisir ?",
    "Years Experience": "Années d'expérience",
    "Luxury Vehicles": "Véhicules de luxe",
    Satisfaction: "Satisfaction",
    "Ready to Begin Your Journey?": "Prêt à commencer votre voyage ?",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "Vivez le sommet du transport de luxe. Chaque détail est soigné à la perfection, chaque instant conçu pour",
    "unforgettable elegance": "une élégance inoubliable",
    "Call Now": "Appelez maintenant",
    "Send Email": "Envoyer un e-mail",
    "Direct premium transportation between locations.": "Transport aller simple pratique",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "Profitez d'un transport aller simple sans faille avec notre service de chauffeur premium. Des solutions de transport de luxe point à point, flexibles et adaptées à votre emploi du temps.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "Sublimez vos déplacements professionnels avec des solutions de transport sophistiquées et fiables, conçues pour les dirigeants et les entreprises souhaitant impressionner leurs clients.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "Vivez des transferts aéroport premium avec notre flotte de luxe. Service d'accueil prioritaire, suivi des vols et transferts sans faille depuis Tires (Aéroport de Cascais).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "Transformez votre journée spéciale en une expérience inoubliable grâce à nos services de transport de mariage premium. Véhicules de luxe classiques et modernes pour vos moments les plus précieux.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "Vivez des moments véritablement uniques qui dépassent le transport de luxe ordinaire. Accès VIP, visites de villas privées et expériences sur mesure.",
    "Curated Experiences": "Expériences sélectionnées",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "Chaque voyage avec Chevalier Lane est soigneusement élaboré pour dépasser les attentes, offrant un service inégalé qui transforme les moments ordinaires en souvenirs extraordinaires.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "Vivez le transport de luxe avec notre service de chauffeur premium. Réservez votre véhicule et vos destinations ci-dessous.",
    "Exclusive Services": "Services exclusifs",
    "Explore Our Fleet": "Explorez notre flotte",
    "Private chauffeur-driven tours and experiences.": "Visites guidées et expériences touristiques",
    "Immersive Journey": "Voyage immersif",
    "Learn More": "En savoir plus",
    "Lisbon in Motion": "Lisbonne en mouvement",
    "Your Personal & Boutique Chauffeur Service": "Votre service de chauffeur personnel et boutique",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "De l'élégance Rolls-Royce au confort moderne Bentley à Lisbonne — voyagez avec une distinction incomparable.",
    "Moments in Motion": "Moments en mouvement",
    "Private chauffeur experience in Lisbon": "Expérience de chauffeur privé à Lisbonne",
    "Professional chauffeur services for all your transportation needs":
      "Services de chauffeur professionnels pour tous vos besoins de transport",
    Service: "Service",
    "Signature Services": "Services signature",
    "Timeless elegance with our classic luxury vehicles":
      "Élégance intemporelle avec nos véhicules classiques de luxe",
    Tours: "Circuits",
    "We Tailor Every Experience to You": "Nous personnalisons chaque expérience pour vous",
    Weddings: "Mariages",
    of: "de",
    "Private Chauffeur Service": "Service de chauffeur privé",
    Services: "Services",
    "Our Services": "Nos services",
    "One-Way Services": "Services aller simple",
    "Classic Fleet": "Flotte classique",
    "Modern Fleet": "Flotte moderne",
    Language: "Langue",
    "Luxury transportation services": "Services de transport de luxe",
    "Classic Fleet Overview": "Aperçu de la flotte classique",
    "Modern Fleet Overview": "Aperçu de la flotte moderne",
    "About Us": "À propos de nous",
    "Contemporary luxury with cutting-edge technology":
      "Luxe contemporain avec technologie de pointe",
    "Contact Info": "Informations de contact",
    "Toggle menu": "Ouvrir/fermer le menu",
    "24/7 Service Available": "Service disponible 24h/24, 7j/7",
    "All rights reserved.": "Tous droits réservés.",
    "Exclusive Fleet": "Flotte exclusive",
    Reserve: "Réserver",
    Explore: "Explorer",
    "About This Vehicle": "À propos de ce véhicule",
    Specifications: "Spécifications",
    "Key Features": "Caractéristiques principales",
    "Pricing Options": "Options tarifaires",
    "Reserve This Vehicle": "Réserver ce véhicule",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "Contactez notre équipe de conciergerie pour organiser votre expérience de transport exclusive.",
    "Call Concierge": "Appeler le concierge",
    "Signature Collection": "Collection signature",
    "Book Your Car": "Réservez votre voiture",
    "Explore Fleet": "Explorer la flotte",
    "Our Complete Fleet": "Notre flotte complète",
    "Ready to Experience Luxury?": "Prêt à vivre le luxe ?",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "Choisissez parmi notre collection exquise et laissez nos chauffeurs professionnels vous transporter avec un style et un confort inégalés.",
    "Book Your Vehicle": "Réservez votre véhicule",
    "View Services": "Voir les services",
    "Available Soon": "Disponible bientôt",
    "Currently unavailable": "Actuellement indisponible",
    "Pricing shown at secure checkout": "Tarifs affichés lors du paiement sécurisé",
    "View Details": "Voir les détails",
    "Book Your Service": "Réservez votre service",
    "Find Out Prices": "Découvrir les prix",
    "Explore Services": "Explorer les services",
    "Complete Service Portfolio": "Portefeuille complet de services",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "Notre Bentley Mulsanne emblématique sera bientôt disponible pour certains services.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "Du transport de luxe quotidien aux expériences uniques, notre portefeuille complet garantit que chaque voyage reflète le sommet de la sophistication et de l'excellence.",
    "Cutting-edge luxury with the latest automotive technology":
      "Luxe de pointe avec les dernières technologies automobiles",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "Vivez le sommet de l'excellence automobile moderne avec notre flotte contemporaine, composée des véhicules de luxe les plus avancés, dotés de technologies de pointe et d'un confort intransigeant.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "L'expression ultime de l'excellence de l'ingénierie allemande, alliant puissance, luxe et technologie de pointe.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "Le luxe britannique redéfini, la Mulsanne offre un confort et un raffinement incomparables au voyageur exigeant.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "Le sommet du luxe et du raffinement, la Mercedes-Benz S-Class Maybach offre un confort et un prestige inégalés.",
    "V8 Twin-Turbo Engine": "Moteur V8 biturbo",
    "BRABUS Performance": "Performance BRABUS",
    "Executive Comfort": "Confort exécutif",
    "Advanced Tech": "Technologie avancée",
    "Handcrafted Interior": "Intérieur artisanal",
    "Air Suspension": "Suspension pneumatique",
    "Executive Seating": "Sièges exécutifs",
    "V12 Engine": "Moteur V12",
    "Executive Rear Seating": "Sièges arrière exécutifs",
    "Premium Materials": "Matériaux premium",
    "Advanced Technology": "Technologie avancée",
    "Twin-Turbo V8 Power": "Puissance V8 biturbo",
    "Luxury Interior": "Intérieur de luxe",
    "Safety First": "Sécurité avant tout",
    "Fuel Efficiency": "Efficacité énergétique",
    "Rear Entertainment Suite": "Suite de divertissement arrière",
    "British Heritage": "Héritage britannique",
    "V12 engine": "Moteur V12",
    "Premium sound system": "Système audio premium",
    Engine: "Moteur",
    Power: "Puissance",
    Transmission: "Transmission",
    "Top Speed": "Vitesse maximale",
    Acceleration: "Accélération",
    "Fuel Economy": "Consommation de carburant",
    "Drive Type": "Type de transmission",
    Passengers: "Passagers",
    Luggage: "Bagages",
    "3 suitcases + 2 bags": "3 valises + 2 sacs",
    "2 suitcases + 2 bags": "2 valises + 2 sacs",
    "Base rate (max. 25km)": "Tarif de base (max. 25 km)",
    "Additional per km": "Supplément par km",
    Classic: "Classique",
    Modern: "Moderne",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "L'incarnation du luxe britannique, la Silver Cloud II offre un raffinement et un prestige inégalés.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "Un chef-d'œuvre d'ingénierie automobile, la Silver Shadow allie puissance et luxe en parfaite harmonie.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "Découvrez l'héritage automobile américain avec l'Oldsmobile Super 88, puissante et élégante.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "L'iconique Mercedes 280SL Pagoda incarne l'excellence automobile de l'âge d'or du grand tourisme.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "L'élégance britannique rencontre la performance sportive dans cette Jaguar XJ6 emblématique, un véritable classique du design automobile.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "L'expression ultime du luxe britannique, la Double Six Daimler associe la puissance V12 à un raffinement inégalé.",
    "Timeless elegance from the golden age of motoring":
      "Élégance intemporelle de l'âge d'or de l'automobile",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "Découvrez notre collection soigneusement sélectionnée d'automobiles classiques, chacune représentant le sommet du savoir-faire automobile d'une époque révolue de sophistication et de style.",
    "V8 Engine": "Moteur V8",
    "Silent Ride": "Conduite silencieuse",
    "Royal Heritage": "Héritage royal",
    "V8 Turbo Engine": "Moteur V8 turbo",
    "Hydropneumatic Suspension": "Suspension hydropneumatique",
    "Modern Classic": "Classique moderne",
    "V8 Rocket Engine": "Moteur V8 Rocket",
    "American Classic": "Classique américain",
    "Powerful Performance": "Performance puissante",
    "Retro Design": "Design rétro",
    "Classic Design": "Design classique",
    "Perfect for Events": "Parfait pour les événements",
    "Straight-6 Engine": "Moteur six cylindres en ligne",
    "British Luxury": "Luxe britannique",
    "Sporting Heritage": "Héritage sportif",
    "Timeless Design": "Design intemporel",
    "Daimler Luxury": "Luxe Daimler",
    "British Prestige": "Prestige britannique",
    "Base rate (max. 20km)": "Tarif de base (max. 20 km)",
    "Additional km": "Km supplémentaire",
    "Subject to request": "Sous réserve de demande",
    Pricing: "Tarifs",
    "1 suitcase + 2 bags": "1 valise + 2 sacs",
    "1 suitcase + 1 bag": "1 valise + 1 sac",
    "3 suitcases + 3 bags": "3 valises + 3 sacs",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "Cabine spacieuse avec sièges exécutifs, idéale pour les voyages d'affaires et les longs trajets, avec fonction de massage apaisante.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "Sièges en cuir premium avec fonction massage et climatisation pour un confort optimal.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "Système d'infodivertissement de pointe avec navigation, connectivité et aides à la conduite.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "Amélioré avec les préparations BRABUS offrant des performances et un raffinement exceptionnels.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "Intérieur artisanal avec matériaux premium et attention méticuleuse aux détails.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "Systèmes de sécurité complets, dont régulateur adaptatif et maintien de voie.",
    "Optimized engine management for balanced performance and efficiency.":
      "Gestion moteur optimisée pour un équilibre entre performance et efficacité.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "Chaque détail est soigneusement réalisé par des artisans maîtres avec les meilleurs matériaux disponibles.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "Puissant moteur V8 biturbo de 6,75 L offrant performance et raffinement sans effort.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "La suspension pneumatique avancée offre un confort et une qualité de conduite incomparables.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "Les dernières fonctionnalités d'infodivertissement et de connectivité intégrées avec élégance.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "Grand écran haute résolution permettant aux passagers de profiter de la TV et des médias en tout confort.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "Fière continuité de l'héritage et de la tradition artisanale légendaires de Bentley.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "La Bentley Flying Spur est propulsée par un moteur V12, offrant performances et raffinement exceptionnels.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "La Bentley Flying Spur est équipée d'un système audio premium offrant une qualité sonore exceptionnelle.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "La Bentley Flying Spur est une voiture britannique, fabriquée au Royaume-Uni.",
    "Luxury Lifestyle": "Art de vivre de luxe",
    "Wine Tasting": "Dégustation de vins",
    "View previous experience": "Voir l'expérience précédente",
    "View next experience": "Voir l'expérience suivante",
    "View previous service": "Voir le service précédent",
    "View next service": "Voir le service suivant",
    "Go to service": "Aller au service",
    "Distinguished Partnerships": "Partenariats distingués",
    "Trusted Collaborations": "Collaborations de confiance",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "Nous collaborons étroitement avec des marques d'élite et des prescripteurs pour offrir des voyages fluides et inoubliables à leurs invités les plus exigeants.",
    "Expand your brand presence with Chevalier Lane": "Renforcez la présence de votre marque avec Chevalier Lane",
    "Reserve Your Place": "Réservez votre place",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "Rejoignez un cercle exclusif de personnes exigeantes qui comprennent que le vrai luxe ne réside pas seulement dans la destination, mais dans le voyage lui-même.",
    "Available Service": "Service disponible",
    Premium: "Premium",
    "Fleet Selection": "Sélection de flotte",
    Elite: "Élite",
    "Client Experience": "Expérience client",
    "Elegant chauffeur-driven transportation for weddings.": "Transport élégant pour mariages",
    "Prices are Subject to VAT": "Prix soumis à la TVA",
    "Why Choose Us": "Pourquoi nous choisir",
    "Flexible point-to-point luxury transportation solutions":
      "Solutions de transport de luxe point à point flexibles",
    Features: "Caractéristiques",
    "Vehicle Options": "Options de véhicules",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "Réserver un transfert aller simple",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "Transferts depuis Tires (Aéroport de Cascais) - Prix fixe pour 25 km",
    "Modern Fleet Services": "Services de la flotte moderne",
    "Book Airport Transfer": "Réserver un transfert aéroport",
    "Professional excellence for business travel and client relations":
      "Excellence professionnelle pour les voyages d'affaires et les relations clients",
    "Business Features": "Caractéristiques business",
    "Corporate Packages": "Forfaits corporate",
    "Starting price (min. 2h)": "Prix de départ (min. 2 h)",
    "Monthly Corporate Plan": "Plan corporate mensuel",
    "Corporate Inquiry": "Demande corporate",
    "Main Wedding Fleet": "Flotte principale mariage",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "Transport supplémentaire",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "Réserver le transport de mariage",
    "Exclusive Private Wine Experiences": "Expériences privées de vin exclusives",
    "Tour Experiences": "Expériences de tour",
    "Featured Experiences": "Expériences phares",
    "From €7 pp": "À partir de 7 € par personne",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "À partir de 15 € par personne",
    "Premium Wine Experiences": "Expériences de vin premium",
    "€75-€250 pp": "75 €-250 € par personne",
    "Explore Tours": "Explorer les tours",
    "Exclusive Experiences": "Expériences exclusives",
    "VIP Services": "Services VIP",
    "Exclusive Packages": "Forfaits exclusifs",
    "VIP Cultural Experience": "Expérience culturelle VIP",
    "Private Estate Tour": "Visite privée d'un domaine",
    "Bespoke Experience": "Expérience sur mesure",
    "Create Exclusive Experience": "Créer une expérience exclusive",
    "Why Choose Chevalier Lane": "Pourquoi choisir Chevalier Lane",
    "Contact Concierge": "Contacter le concierge",
    "Always Available": "Toujours disponible",
    Instant: "Instantané",
    "Quote Response": "Réponse au devis",
    Global: "Mondial",
    "Service Coverage": "Couverture du service",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "Contactez notre équipe de conciergerie pour discuter de vos besoins de transport et découvrir comment nous pouvons élever votre prochain voyage.",
    "Bentley Mulsanne city transfer": "Transfert urbain Bentley Mulsanne",
    "ONE-WAY TRANSPORTATION": "TRANSPORT ALLER SIMPLE",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur":
      "Luxe moderne : Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II":
      "Collection classique : Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "Service de chauffeur professionnel",
    "Real-time GPS Tracking": "Suivi GPS en temps réel",
    "Flexible Scheduling": "Planification flexible",
    "Professional Chauffeur": "Chauffeur professionnel",
    "Complimentary Water": "Eau offerte",
    "Premium bottled water included in every journey.": "Eau en bouteille premium incluse dans chaque trajet.",
    "All-Inclusive Pricing": "Tarification tout compris",
    "No hidden extras — congestion charges, tolls, and taxes included.":
      "Aucun supplément caché — péages, taxes et frais de congestion inclus.",
    "Champagne & Drinks on Request": "Champagne et boissons sur demande",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.":
      "Sublimez votre voyage avec du champagne frais, du vin ou d'autres boissons sur demande.",
    "Comfort & Convenience": "Confort et commodité",
    "Beautifully maintained vehicles offering a refined and relaxing environment.":
      "Véhicules parfaitement entretenus offrant un environnement raffiné et relaxant.",
    "From Point A to Point B": "De A à B",
    "Corporate transportation": "Transport corporate",
    "Executive Vehicle Fleet": "Flotte de véhicules exécutifs",
    "Confidentiality Assured": "Confidentialité assurée",
    "Professional Presentation": "Présentation professionnelle",
    "Corporate Account Management": "Gestion de compte corporate",
    "Invoice & Expense Tracking": "Suivi des factures et des dépenses",
    "Book Your Corporate Transfer": "Réserver votre transfert corporate",
    "Flexibility for Business Travel": "Flexibilité pour les voyages d'affaires",
    "Book on demand or in advance for complete control of your schedule.":
      "Réservez à la demande ou à l'avance pour un contrôle total de votre agenda.",
    "Work Comfortably Onboard": "Travaillez confortablement à bord",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.":
      "Profitez de tables rabattables, d'un espace pour ordinateur portable et d'une cabine silencieuse idéale pour la productivité.",
    "Charging & Connectivity": "Recharge et connectivité",
    "Multiple charging ports available for phones, laptops, and devices.":
      "Plusieurs ports de recharge disponibles pour téléphones, ordinateurs et appareils.",
    "In-Car Entertainment": "Divertissement à bord",
    "Screens and multimedia systems available for presentations or relaxation.":
      "Écrans et systèmes multimédias disponibles pour les présentations ou la détente.",
    "Discreet & Reliable Service": "Service discret et fiable",
    "Designed for executives who value privacy, punctuality, and comfort.":
      "Conçu pour les dirigeants qui valorisent la confidentialité, la ponctualité et le confort.",
    "Discreet Business Transfers": "Transferts business discrets",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.":
      "Transferts business professionnels, discrets et fiables pour dirigeants, clients et partenaires.",
    "Luxury airport meet & greet service": "Service d'accueil aéroport de luxe",
    "Seamless airport transportation": "Transport aéroport sans faille",
    "Transfers from Cascais Airport and Lisbon Airport":
      "Transferts depuis l'aéroport de Cascais et l'aéroport de Lisbonne",
    "Modern and Classic Fleet Services": "Services de flotte moderne et classique",
    "Optional extra vehicle for luggage": "Véhicule supplémentaire optionnel pour les bagages",
    "Priority meet & greet service": "Service d'accueil prioritaire",
    "Flight tracking & monitoring": "Suivi et surveillance des vols",
    "Private terminal access": "Accès au terminal privé",
    "Luggage assistance": "Assistance bagages",
    "Real-time arrival updates": "Mises à jour d'arrivée en temps réel",
    "Multi-language support": "Support multilingue",
    "Flight Monitoring": "Suivi des vols",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.":
      "Votre chauffeur suit votre vol en temps réel pour assurer un timing parfait — même en cas d'arrivée en avance ou en retard.",
    "Waiting & Parking Included": "Attente et parking inclus",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.":
      "Profitez de 30 minutes d'attente gratuite pour les arrivées à l'aéroport.",
    "Meet & Greet Service": "Service d'accueil",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.":
      "Votre chauffeur vous accueillera dans le terminal avec un panneau nominatif personnalisé.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.":
      "Des chauffeurs expérimentés, ponctuels et discrets pour un transfert aéroport serein et fluide.",
    "Luggage Assistance": "Assistance bagages",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.":
      "Votre chauffeur vous aide avec tous les bagages pour une transition confortable de l'air au sol.",
    "Premium Airport Transfers": "Transferts aéroport premium",
    "Rolls-Royce Silver Cloud II wedding transport":
      "Transport de mariage Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow wedding ceremony":
      "Cérémonie de mariage Rolls-Royce Silver Shadow",
    "Oldsmobile Super 88 wedding chauffeur": "Chauffeur mariage Oldsmobile Super 88",
    "Wedding transportation": "Transport de mariage",
    "From Ceremony to Reception in Style and Elegance":
      "De la cérémonie à la réception avec style et élégance",
    "Extra Wedding Transport Vehicles": "Véhicules de transport supplémentaires pour mariage",
    "Decorations and designs available as extras":
      "Décorations et designs disponibles en option",
    "Minimum 3 hours booking required": "Réservation minimale de 3 heures requise",
    "Basic Decoration (artificial or simple natural flowers + ribbons)":
      "Décoration basique (fleurs artificielles ou naturelles simples + rubans)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)":
      "Décoration intermédiaire (fleurs naturelles de qualité moyenne, compositions avant et latérales, nœuds)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)":
      "Décoration de luxe (fleurs premium, compositions multiples, design détaillé, fleurs fraîches de saison ou importées, installation professionnelle)",
    "Book Your Wedding Transport": "Réserver votre transport de mariage",
    "Free Ribbons": "Rubans offerts",
    "Complimentary ribbons and colour options available to match your wedding theme.":
      "Rubans offerts et options de couleur disponibles pour assortir votre thème de mariage.",
    "Chauffeur Arrival 20 Minutes Early": "Arrivée du chauffeur 20 minutes en avance",
    "Your driver arrives ahead of time to ensure a calm and seamless start.":
      "Votre chauffeur arrive en avance pour un départ serein et fluide.",
    "Classic Cars for the Ceremony": "Voitures classiques pour la cérémonie",
    "Choose from our iconic vintage collection for the bride or groom's arrival.":
      "Choisissez dans notre collection vintage emblématique pour l'arrivée de la mariée ou du marié.",
    "Modern Luxury Cars for Guests": "Voitures de luxe modernes pour les invités",
    "Elegant modern vehicles available for transporting family and guests.":
      "Des véhicules modernes élégants pour transporter famille et invités.",
    "Flexible Journey Planning": "Planification flexible du trajet",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.":
      "Prise en charge de la mariée, du marié ou du cortège et trajet vers la cérémonie, la séance photo et la réception.",
    "Decor & Personalisation": "Décor et personnalisation",
    "Custom decoration options to make your day truly unique.":
      "Options de décoration personnalisées pour rendre votre journée vraiment unique.",
    "From Ceremony to Reception": "De la cérémonie à la réception",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation":
      "Vivez des moments véritablement uniques qui transcendent le transport de luxe ordinaire",
    "Exclusive experience inside luxury Bentley interior":
      "Expérience exclusive à l'intérieur d'une Bentley de luxe",
    "VIP Event Transportation": "Transport VIP pour événements",
    "Exclusive Cultural Experiences": "Expériences culturelles exclusives",
    "Personal Concierge Service": "Service de concierge personnel",
    "Bespoke Itinerary Creation": "Création d'itinéraires sur mesure",
    "Luxury Accommodation Coordination": "Coordination d'hébergements de luxe",
    "(Full Day Rate)": "(Tarif journée complète)",
    "A confirmation email has been sent to": "Un e-mail de confirmation a été envoyé à",
    "Additional Information": "Informations supplémentaires",
    Airline: "Compagnie aérienne",
    "Airline is required": "La compagnie aérienne est obligatoire",
    Approximately: "Environ",
    "At least 1 trip required for transport bookings":
      "Au moins 1 trajet est requis pour les réservations de transport",
    Book: "Réserver",
    "Book Your Airport Transfer": "Réservez votre transfert aéroport",
    "Book Your Luxury Tour": "Réservez votre tour de luxe",
    "Book Your One-Way Transfer": "Réservez votre transfert aller simple",
    "Book by the Hour": "Réserver à l'heure",
    "By the Hour | Full Day": "À l'heure | Journée complète",
    "Book Full Day": "Réserver la journée complète",
    "Booking Confirmed!": "Réservation confirmée !",
    "Booking Details": "Détails de la réservation",
    "Booking Summary": "Résumé de la réservation",
    "Calculating Price...": "Calcul du prix...",
    "Calculating distance...": "Calcul de la distance...",
    "Calculating price...": "Calcul du prix...",
    "Calculating route...": "Calcul de l'itinéraire...",
    "Calculating...": "Calcul en cours...",
    "Preparing your price request...": "Préparation de votre demande de prix...",
    "Contact us for pricing": "Contactez-nous pour les tarifs",
    "Do you need vehicles for guest transport?":
      "Avez-vous besoin de véhicules pour le transport des invités ?",
    "How many vehicles do you need?": "De combien de véhicules avez-vous besoin ?",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "Pour transporter les invités et le cortège du mariage. Seuls des véhicules modernes sont disponibles.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "Nous confirmerons d'abord la disponibilité, puis vous verrez le montant final sur la page de paiement sécurisée Stripe.",
    "Decoration Options (Optional)": "Options de décoration (optionnel)",
    "Decoration Price (€)": "Prix de la décoration (€)",
    "Distance to Experience": "Distance jusqu'à l'expérience",
    "Distance:": "Distance :",
    "Drop-off Location": "Lieu de destination",
    "Drop-off location is required": "Le lieu de destination est obligatoire",
    Duration: "Durée",
    "Duration (Hours)": "Durée (heures)",
    "Duration is required": "La durée est obligatoire",
    "Duration:": "Durée :",
    "Email is required": "L'e-mail est obligatoire",
    "Enter decoration price": "Saisissez le prix de la décoration",
    "Enter your first name": "Saisissez votre prénom",
    "Enter your last name": "Saisissez votre nom",
    "Event Start Time": "Heure de début de l'événement",
    "Event date is required": "La date de l'événement est obligatoire",
    "Event time is required": "L'heure de l'événement est obligatoire",
    "Extra Vehicle:": "Véhicule supplémentaire :",
    "Extra vehicle for luggage": "Véhicule supplémentaire pour les bagages",
    "Final Destination": "Destination finale",
    "Final Location": "Lieu final",
    "Final destination is required": "La destination finale est obligatoire",
    "Final location is required": "Le lieu final est obligatoire",
    "First Name": "Prénom",
    "First name is required": "Le prénom est obligatoire",
    "Flight Information": "Informations sur le vol",
    "Flight Number": "Numéro de vol",
    "Flight number is required": "Le numéro de vol est obligatoire",
    "For transporting wedding guests and party (6% VAT)":
      "Pour transporter les invités et le cortège (TVA 6 %)",
    "Guest Transport": "Transport des invités",
    "Hand Luggage": "Bagage à main",
    "Hourly rates from €250": "Tarifs horaires à partir de 250 €",
    Includes: "Comprend",
    "Large Luggage": "Bagage volumineux",
    "Last Name": "Nom",
    "Last name is required": "Le nom est obligatoire",
    "Luggage Information": "Informations sur les bagages",
    "Main Fleet": "Flotte principale",
    "Make a Special Request": "Faire une demande spéciale",
    Max: "Max.",
    Maximum: "Maximum",
    "Maximum 6 trips per booking, 2 trips per hour":
      "Maximum 6 trajets par réservation, 2 trajets par heure",
    Min: "Min.",
    Minimum: "Minimum",
    "Minimum 3 hours required": "Minimum 3 heures requises",
    "Minimum 3 hours required for main fleet bookings":
      "Minimum 3 heures requises pour les réservations de la flotte principale",
    "Missing Cal.com configuration. Please try again later.":
      "Configuration Cal.com manquante. Veuillez réessayer plus tard.",
    "Missing Cal.com username. Please configure":
      "Nom d'utilisateur Cal.com manquant. Veuillez configurer",
    "Missing Cal.com username. Please set":
      "Nom d'utilisateur Cal.com manquant. Veuillez définir",
    No: "Non",
    "No decoration": "Pas de décoration",
    "Note:": "Note :",
    "Number of Participants": "Nombre de participants",
    "Number of Passengers": "Nombre de passagers",
    "Number of Trips": "Nombre de trajets",
    "Optional Add-ons": "Options supplémentaires",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Azeitão)",
    "Participants & Options": "Participants et options",
    Passenger: "Passager",
    "Per-trip rates from €100": "Tarifs par trajet à partir de 100 €",
    "Personal Information": "Informations personnelles",
    "Phone number is required": "Le numéro de téléphone est obligatoire",
    "Pickup Location": "Lieu de prise en charge",
    "Pickup location is required": "Le lieu de prise en charge est obligatoire",
    Piece: "Pièce",
    Pieces: "Pièces",
    "Please Complete the Form": "Veuillez compléter le formulaire",
    "Please Enter Locations": "Veuillez saisir les lieux",
    "Please Enter Locations & Flight Details":
      "Veuillez saisir les lieux et les détails du vol",
    "Please Enter Starting Location": "Veuillez saisir le lieu de départ",
    "Please Select a Vehicle": "Veuillez sélectionner un véhicule",
    "Please complete the pricing details before scheduling.":
      "Veuillez compléter les détails tarifaires avant de planifier.",
    "Please enter a starting location": "Veuillez saisir un lieu de départ",
    "Please enter a valid email address":
      "Veuillez saisir une adresse e-mail valide",
    "Please enter both pickup and drop-off locations":
      "Veuillez saisir les lieux de prise en charge et de destination",
    "Please enter both starting location and destination":
      "Veuillez saisir le lieu de départ et la destination",
    "Please enter flight number and airline":
      "Veuillez saisir le numéro de vol et la compagnie",
    "Please fix the following errors:\n":
      "Veuillez corriger les erreurs suivantes :\n",
    "Please select a tour option": "Veuillez sélectionner une option de tour",
    "Please select a tour option to continue.":
      "Veuillez sélectionner une option de tour pour continuer.",
    "Please select a vehicle": "Veuillez sélectionner un véhicule",
    "Please select a vehicle for the tour":
      "Veuillez sélectionner un véhicule pour le tour",
    "Please select a vehicle for the tour.":
      "Veuillez sélectionner un véhicule pour le tour.",
    "Please select a vehicle to continue.":
      "Veuillez sélectionner un véhicule pour continuer.",
    "Please select a vehicle to proceed":
      "Veuillez sélectionner un véhicule pour poursuivre",
    "Please select a vehicle to schedule with Cal.com.":
      "Veuillez sélectionner un véhicule pour planifier avec Cal.com.",
    "Preparing secure payment...": "Préparation du paiement sécurisé...",
    "Price Summary": "Résumé des prix",
    "Price:": "Prix :",
    "Schedule & Pay": "Planifier et payer",
    "Select Your Tour Experience": "Sélectionnez votre expérience de tour",
    "Select Your Vehicle": "Sélectionnez votre véhicule",
    "Selected Vehicle": "Véhicule sélectionné",
    "Service Type": "Type de service",
    "Starting Location": "Lieu de départ",
    "Starting from": "À partir de",
    "Starting location is required": "Le lieu de départ est obligatoire",
    "Stripe checkout session URL missing.":
      "URL de session de paiement Stripe manquante.",
    "Total Price": "Prix total",
    "Total Price:": "Prix total :",
    "Transfer Details": "Détails du transfert",
    "Transfer Summary": "Résumé du transfert",
    Transport: "Transport",
    "Trip Details": "Détails du trajet",
    "Trip Summary": "Résumé du trajet",
    "Unable to create Stripe checkout session.":
      "Impossible de créer la session de paiement Stripe.",
    "Unable to create a Stripe checkout session.":
      "Impossible de créer une session de paiement Stripe.",
    VAT: "TVA",
    "Vehicle:": "Véhicule :",
    "We were unable to calculate a quote for this transfer.":
      "Nous n'avons pas pu calculer un devis pour ce transfert.",
    "Wedding Date": "Date du mariage",
    "Wedding Event Details": "Détails de l'événement de mariage",
    Yes: "Oui",
    "e.g., Ceremony Venue, Reception Hall":
      "ex. : lieu de cérémonie, salle de réception",
    "e.g., Hotel, Church, Home": "ex. : hôtel, église, domicile",
    "e.g., Lisbon Airport, Hotel": "ex. : aéroport de Lisbonne, hôtel",
    "e.g., Lisbon Airport, Hotel Name":
      "ex. : aéroport de Lisbonne, nom de l'hôtel",
    "e.g., Lisbon City Center, Hotel Name":
      "ex. : centre-ville de Lisbonne, nom de l'hôtel",
    "e.g., Porto City Center, Algarve Resort":
      "ex. : centre-ville de Porto, resort en Algarve",
    "e.g., TAP Air Portugal, Iberia": "ex. : TAP Air Portugal, Iberia",
    "e.g., TP 1234, IB 5678": "ex. : TP 1234, IB 5678",
    extra: "supplément",
    "from your pickup location to": "de votre lieu de prise en charge à",
    h: "h",
    hour: "heure",
    hours: "heures",
    km: "km",
    "km included": "km inclus",
    participant: "participant",
    participants: "participants",
    "participants allowed for this tour":
      "participants autorisés pour ce tour",
    "participants required for this tour":
      "participants requis pour ce tour",
    "per km": "par km",
    "per person": "par personne",
    pp: "pp",
    "the experience": "l'expérience",
    trip: "trajet",
    trips: "trajets",
    "your@email.com": "votre@email.com",
    "A Ceremony of Distinction": "Une cérémonie de distinction",
    "A Commitment to Excellence": "Un engagement envers l'excellence",
    "A confirmation has been emailed to you. Our concierge will follow up shortly with final details.":
      "Une confirmation vous a été envoyée par e-mail. Notre concierge reviendra vers vous sous peu avec les détails finaux.",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "Un héritage d’excellence bâti sur la passion, la précision et un engagement indéfectible envers",
    AZEITÃO: "AZEITÃO",
    "About Chevalier Lane": "À propos de Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "Vue avant en trois-quarts agressive avec jantes multibranches et calandre chromée",
    "Amount:": "Montant :",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "Un service à l'heure offrant flexibilité, discrétion et disponibilité ininterrompue.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "Tout régime alimentaire, besoin d'accessibilité, langues préférées ou demandes spéciales...",
    "Any special requirements, accessibility needs, or additional services...":
      "Tout besoin particulier, accessibilité ou services supplémentaires...",
    "Any special requirements, decoration details, or additional services...":
      "Tout besoin particulier, détails de décoration ou services supplémentaires...",
    "Arrive in first class": "Arrivez en première classe",
    "Arrive with Confidence": "Arrivez en toute confiance",
    "Arrive with Elegance": "Arrivez avec élégance",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "En tant que seule entreprise à Lisbonne offrant à la fois des véhicules de luxe classiques et modernes, nous comblons le fossé entre l’héritage automobile et l’excellence contemporaine. Notre collection s’étend des emblématiques Mercedes Pagoda des années 1960 aux Bentley Mulsanne à la pointe de la technologie.",
    "Back to Tours": "Retour aux tours",
    "Back to Wedding Bookings": "Retour aux réservations de mariage",
    "Back to wedding services": "Retour aux services de mariage",
    "Because how you arrive matters as much as where you’re going.":
      "Parce que la façon dont vous arrivez compte autant que votre destination.",
    "Bentley Flying Spur detail - Exterior": "Bentley Flying Spur détail - extérieur",
    "Bentley Flying Spur detail - Front view":
      "Bentley Flying Spur détail - vue avant",
    "Bentley Flying Spur detail - Interior":
      "Bentley Flying Spur détail - intérieur",
    "Bentley Flying Spur detail - Rear view":
      "Bentley Flying Spur détail - vue arrière",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Bentley Mulsanne détail - gros plan sur l'emblème Flying B du capot",
    "Bentley Mulsanne detail - Front view":
      "Bentley Mulsanne détail - vue avant",
    "Bentley Mulsanne detail - Interior":
      "Bentley Mulsanne détail - intérieur",
    "Bentley Mulsanne detail - Rear view":
      "Bentley Mulsanne détail - vue arrière",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne vue avant droite - extérieur",
    "Bentley Mulsanne profile detail": "Bentley Mulsanne détail du profil",
    "Bentley Mulsanne rear quarter detail":
      "Bentley Mulsanne détail arrière en trois-quarts",
    "Bentley Mulsanne side view - Exterior":
      "Bentley Mulsanne vue latérale - extérieur",
    "Book Your Tour": "Réservez votre tour",
    "Book another transfer": "Réserver un autre transfert",
    "Change language": "Changer de langue",
    Chauffeur: "Chauffeur",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "Arrivées avec chauffeur offrant intimité, confort et raffinement. Sur demande, une sélection de vins, champagne et rafraîchissements sur mesure.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "Transferts avec chauffeur entre domicile, cérémonie et réception, réalisés avec précision et soin.",
    "Checking Stripe...": "Vérification de Stripe...",
    "Chevalier Lane Logo": "Logo Chevalier Lane",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "Chevalier Lane a redéfini le transport de luxe, seule entreprise à Lisbonne offrant à la fois le luxe moderne et l'élégance classique.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "Les transferts en voiture classique incluent un véhicule supplémentaire (Range Rover Vogue) pour les bagages à",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "Avant classique avec capot proéminent et pare-chocs chromés",
    "Classic heritage and modern innovation in one exclusive collection":
      "Héritage classique et innovation moderne dans une collection exclusive",
    "Close-up of the Mercedes bonnet star and grille badge":
      "Gros plan de l'étoile Mercedes sur le capot et de l'emblème de calandre",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "Gros plan de l'emblème Spirit of Ecstasy avec reflets sur le capot",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "Gros plan de l'emblème Flying B noir brillant sur le capot",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "Gros plan de la roue avec enjoliveur Rolls-Royce et anneau chromé",
    "Complete Fleet": "Flotte complète",
    "Complete fleet hero": "Bannière de la flotte complète",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "Des solutions de transport de luxe complètes, adaptées à chaque occasion et à chaque besoin.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "Vue avant en trois-quarts du cabriolet montrant la calandre, les quatre phares et les détails chromés",
    Crafting: "Façonner",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "Depuis notre création, nous façonnons des expériences inégalées ; chaque trajet avec Chevalier Lane représente le summum du transport de luxe.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "Banquette avant en cuir crème avec tableau de bord et finitions en placage de noyer",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "Créez des souvenirs inoubliables avec nos services de transport de mariage premium. Choisissez notre flotte principale classique pour le couple ou des véhicules supplémentaires pour vos invités.",
    Curated: "Sélectionné",
    "Details That Matter": "Les détails qui comptent",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "Découvrez toute l’étendue des expériences de transport de luxe, conçues pour les personnes exigeantes qui n’acceptent rien de moins que la perfection.",
    "Discreet coordination from runway to destination.":
      "Coordination discrète de la piste jusqu’à votre destination.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "Arrivées discrètes et élégantes pour rendez-vous, shopping ou itinéraires personnels.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "Trajets aller simple discrets et élégants, pensés pour les couples et les moments intimes.",
    "Driver's seat with classic Mercedes styling":
      "Siège conducteur avec style Mercedes classique",
    "Driver's wheel with classic Mercedes styling":
      "Volant conducteur avec style Mercedes classique",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "Poste de conduite orienté conducteur avec volant multifonction et commandes de console centrale",
    "Elegant front left view showcasing the pagoda's elegant design":
      "Vue avant gauche élégante mettant en valeur le design de la Pagoda",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "Carrosserie vert sarcelle élégante avec lignes fluides et chromes, vue en plongée",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "Trajets aller simple élégants et fluides entre aéroports, hôtels, villas et centres-villes — adaptés à votre emploi du temps.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "Trajets de mariage élégants et fluides, des lieux de cérémonie aux salles de réception, adaptés à votre planning.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "Sublimez vos déplacements professionnels avec des solutions de transport sophistiquées et fiables. Notre service de transport corporate est conçu pour les dirigeants, voyageurs d'affaires et entreprises souhaitant impressionner clients et partenaires. Nous assurons une coordination fluide pour les réunions, conférences et visites VIP avec un professionnalisme et une confidentialité sans compromis.",
    "Enter a starting location to calculate driving distance.":
      "Entrez un lieu de départ pour calculer la distance.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "Chaque détail de votre tour privé est minutieusement planifié pour garantir un voyage inoubliable à travers les expériences viticoles les plus exclusives du Portugal.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "Chaque voyage avec Chevalier Lane est un témoignage de notre exigence de perfection. De la réservation à l’arrivée, chaque détail est orchestré pour une expérience inoubliable.",
    "Exclusive Access": "Accès exclusif",
    "Executive time, reserved": "Temps exécutif, réservé",
    "Experience Excellence": "Vivez l'excellence",
    "Experience Luxury Like Never Before": "Vivez le luxe comme jamais auparavant",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "Découvrez les plus belles régions viticoles du Portugal avec nos tours privés exclusifs. Sélectionnez votre expérience ci-dessous et voyez le prix se mettre à jour en temps réel.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "Profitez de transferts aéroport premium avec notre flotte de luxe depuis Tires (Aéroport de Cascais). Tous les prix sont soumis à 6 % de TVA.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "Découvrez des transferts aéroport premium avec notre flotte de luxe. Nos véhicules modernes offrent confort, fiabilité et services à bord pour une clientèle exigeante, tandis que nos voitures classiques offrent une expérience unique et mémorable. Tous les transferts incluent un accueil prioritaire, le suivi des vols, l'assistance bagages et un support multilingue.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "Profitez d'un transport aller simple fluide avec notre service de chauffeur premium. Qu’il s’agisse d’un transfert aéroport-hôtel, entre villes ou autre trajet point à point, nous offrons des solutions confortables, fiables et sophistiquées adaptées à votre planning et à vos préférences.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "Découvrez la différence que procurent plus de deux décennies d’excellence dans le transport de luxe et un engagement inébranlable envers la perfection de chaque détail.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "Découvrez la grandeur d’un palais du XVIe siècle alliée à une production viticole de renommée mondiale. Nos tours privés exclusifs offrent un accès intimiste au domaine historique, à de vastes collections d’art et à des dégustations premium au cœur de la région viticole du Portugal.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "Vivez des moments uniques qui transcendent le transport de luxe ordinaire. Nos expériences exclusives réunissent les plus beaux véhicules et des destinations extraordinaires, un accès VIP et des services de conciergerie personnalisés. Des visites de villas privées aux événements culturels exclusifs, nous créons des expériences sur mesure reflétant vos passions et vos envies.",
    "Explore Options": "Explorer les options",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "Explorez notre flotte complète de chefs-d’œuvre classiques et de merveilles modernes. Que vous recherchiez l’élégance intemporelle ou le luxe de pointe, chaque véhicule est entretenu avec soin et prêt à sublimer votre prochain trajet.",
    "Exterior of the Bentley Flying Spur": "Extérieur de la Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "Extérieur de la Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "Extérieur de la Mercedes-Benz S-Class Maybach",
    "First class on the road": "Première classe sur la route",
    "Fold-out walnut picnic trays for rear passengers":
      "Tablettes de pique-nique escamotables en noyer pour les passagers arrière",
    "For Romantic Dates": "Pour des rendez-vous romantiques",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "Pour le couple - usage statique, photos, cérémonies (TVA 23 %)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "Fondée à Lisbonne, au Portugal, Chevalier Lane est née d'une vision simple mais profonde : redéfinir le transport de luxe en combinant l'élégance intemporelle et la sophistication moderne. Ce qui a commencé comme un projet passion est devenu le service de chauffeur de luxe de référence au Portugal.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "Du Rolls-Royce Silver Cloud à la présence imposante de la Bentley Mulsanne, chaque véhicule de notre collection raconte une histoire d'excellence d’ingénierie et de luxe sans compromis.",
    "Front grill with classic Mercedes styling":
      "Calandre avant au style Mercedes classique",
    "Front right side view of the Bentley Mulsanne":
      "Vue avant droite de la Bentley Mulsanne",
    "Front view of the Bentley Flying Spur":
      "Vue avant de la Bentley Flying Spur",
    "Front view of the Bentley Mulsanne": "Vue avant de la Bentley Mulsanne",
    "Front view of the Mercedes-Benz S-Class Maybach":
      "Vue avant de la Mercedes-Benz S-Class Maybach",
    "Full view of the pagoda's elegant design":
      "Vue complète du design élégant de la Pagoda",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "Prise en charge gracieuse et discrète garantissant un début calme et élégant de votre journée spéciale.",
    "Group:": "Groupe :",
    "Happy Clients": "Clients satisfaits",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "Vue de face de la calandre Pantheon ornée d'insignes et de pare-chocs chromé",
    Highlights: "Points forts",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "Disponibilité horaire pour réunions d'affaires, itinéraires et agendas exécutifs.",
    "Immersive Chevalier Lane showcase": "Présentation immersive de Chevalier Lane",
    "Includes:": "Comprend :",
    "Interior of the Bentley Flying Spur": "Intérieur de la Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "Intérieur de la Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "Intérieur de la Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "Rejoignez des milliers de clients exigeants qui font confiance à Chevalier Lane pour transformer des trajets ordinaires en",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "Long profil latéral bas mettant en valeur la ligne fluide et les ailerons arrière",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "Vue avant en trois-quarts en contre-plongée montrant les quatre phares et la calandre",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "Vue latérale en contre-plongée mettant en valeur l’aile avant, les chromes et la posture",
    "Luxury Tours": "Tours de luxe",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "Transferts aéroport de luxe avec service prioritaire, suivi des vols et transport fluide depuis l’aéroport de Tires jusqu’à votre destination.",
    "Luxury car interior": "Intérieur de voiture de luxe",
    "Luxury services": "Services de luxe",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "Flotte principale de mariage : usage stationnaire/par les couples - n'inclut pas les décorations et designs demandés par le client",
    "Mercedes 280SL Pagoda - Driver's Seat":
      "Mercedes 280SL Pagoda - siège conducteur",
    "Mercedes 280SL Pagoda - Driver's Wheel":
      "Mercedes 280SL Pagoda - volant conducteur",
    "Mercedes 280SL Pagoda - Front Grill":
      "Mercedes 280SL Pagoda - calandre avant",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda - vue avant gauche",
    "Mercedes 280SL Pagoda - Full View": "Mercedes 280SL Pagoda - vue complète",
    "Mercedes 280SL Pagoda - Rear View": "Mercedes 280SL Pagoda - vue arrière",
    "Mercedes-Benz S-Class Maybach detail - Exterior": "Mercedes-Benz S-Class Maybach détail - extérieur",
    "Mercedes-Benz S-Class Maybach detail - Front view":
      "Mercedes-Benz S-Class Maybach détail - vue avant",
    "Mercedes-Benz S-Class Maybach detail - Interior":
      "Mercedes-Benz S-Class Maybach détail - intérieur",
    "Mercedes-Benz S-Class Maybach detail - Rear view":
      "Mercedes-Benz S-Class Maybach détail - vue arrière",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Mercedes S500 BRABUS détail - gros plan de l'étoile sur le capot",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS extérieur - vue avant de face",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS extérieur - vue avant en trois-quarts en contre-plongée",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS intérieur - vue arrière",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS intérieur - volant et cockpit",
    "Mercedes S500 BRABUS rim": "Jante Mercedes S500 BRABUS",
    "Missing Stripe session reference": "Référence de session Stripe manquante",
    "Next image": "Image suivante",
    "No worries — your Cal.com booking is still reserved. You can restart checkout anytime using the email link we sent or return to the booking page below.":
      "Pas d'inquiétude — votre réservation Cal.com est toujours maintenue. Vous pouvez relancer le paiement à tout moment via le lien e-mail que nous avons envoyé ou revenir à la page de réservation ci-dessous.",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 extérieur - vue avant en trois-quarts avec capote ouverte",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 extérieur - profil latéral complet",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 extérieur - vue arrière",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 intérieur - tableau de bord et volant",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 intérieur - zone arrière des passagers et panneau de porte",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 intérieur - vue large de l'habitacle",
    "Optional Add-ons:": "Options supplémentaires :",
    "Our Expertise": "Notre expertise",
    "Our Story": "Notre histoire",
    "Our Unique Position": "Notre position unique",
    "Our Values": "Nos valeurs",
    "Payment canceled": "Paiement annulé",
    "Personal Experience": "Expérience personnelle",
    "Play Lisbon in Motion video": "Lire la vidéo Lisbon in Motion",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "Veuillez préciser le nombre de bagages à main (cabine) et de bagages volumineux (en soute) avec lesquels vous voyagez.",
    "Premium Transport": "Transport premium",
    "Previous image": "Image précédente",
    Private: "Privé",
    "Private aviation, perfected": "Aviation privée, perfectionnée",
    "Punctual, flexible transportation designed entirely around your pace.":
      "Transport ponctuel et flexible entièrement conçu autour de votre rythme.",
    "Ready to Create Your Perfect Experience?":
      "Prêt à créer votre expérience parfaite ?",
    "Rear seat and door panel details with chrome window winder and trim":
      "Détails du siège arrière et du panneau de porte avec manivelle de vitre et garnitures chromées",
    "Rear view of the Bentley Flying Spur": "Vue arrière de la Bentley Flying Spur",
    "Rear view of the Bentley Mulsanne": "Vue arrière de la Bentley Mulsanne",
    "Rear view of the Mercedes-Benz S-Class Maybach": "Vue arrière de la Mercedes-Benz S-Class Maybach",
    "Rear view of the Mercedes S500 BRABUS":
      "Vue arrière de la Mercedes S500 BRABUS",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "Vue arrière de la Silver Shadow avec feux distinctifs et finitions chromées",
    "Rear view of the pagoda's elegant design":
      "Vue arrière du design élégant de la Pagoda",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "Intérieur rouge et blanc vu depuis l'arrière, avec tableau de bord et banquette avant",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "Touches florales raffinées, rubans et détails personnalisés, disposés pour sublimer votre célébration.",
    "Reserved Availability": "Disponibilité réservée",
    "Return Home": "Retour à l'accueil",
    "Rim of the Mercedes S500 BRABUS": "Jante de la Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II extérieur - vue avant en trois-quarts",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II intérieur - cabine avant et tableau de bord",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II intérieur - vue latérale gauche en plongée",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II intérieur - tables arrière",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II intérieur - siège arrière et ciel de toit",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Rolls-Royce Silver Shadow détail - Spirit of Ecstasy sur le capot",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Rolls-Royce Silver Shadow détail - roue et enjoliveur",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow extérieur - vue avant avec insignes de calandre",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow extérieur - vue avant en trois-quarts en contre-plongée",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow extérieur - profil latéral bas",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow extérieur - vue arrière avec feux",
    "Scenic routes": "Itinéraires panoramiques",
    "Service Available": "Service disponible",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "Compartiment arrière spacieux avec cuir crème et accents en bois",
    "Special Requests": "Demandes spéciales",
    "Start Planning": "Commencer à planifier",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "Vue arrière de face avec ailerons et feux arrière inspirés des fusées",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "Vue de face du tableau de bord avec doubles compteurs et volant classique",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Merci d'avoir choisi Chevalier Lane. Votre demande de transfert aéroport a été reçue et notre équipe de conciergerie vous contactera sous peu pour confirmer les détails et finaliser votre réservation.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Merci d'avoir choisi Chevalier Lane. Votre demande de réservation a été reçue et notre équipe de conciergerie vous contactera sous peu pour confirmer les détails et finaliser votre réservation.",
    "Thank you for your payment": "Merci pour votre paiement",
    "The Beginning": "Le début",
    "The Bride’s Arrival": "L'arrivée de la mariée",
    "The principles that guide every decision and shape every experience we create.":
      "Les principes qui guident chaque décision et façonnent chaque expérience que nous créons.",
    "Timeless Elegance": "Élégance intemporelle",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "Transformez votre journée spéciale en une expérience inoubliable avec nos services de transport de mariage premium. Nos véhicules de luxe classiques et modernes créent le décor parfait pour vos moments les plus précieux. Des arrivées à la cérémonie aux départs de la réception, chaque aspect de votre transport est géré avec élégance et précision.",
    "Unable to confirm payment status": "Impossible de confirmer le statut du paiement",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "Impossible d'estimer la distance. Le coût du véhicule reflète le prix minimum ; le total réel peut varier.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "Confort, intimité et raffinement inégalés — sans compromis.",
    "View other tours": "Voir d'autres tours",
    "We’ll calculate the transfer distance to your selected experience.":
      "Nous calculerons la distance du transfert vers l'expérience sélectionnée.",
    "We’ve received your booking details and the transaction is currently marked as":
      "Nous avons reçu vos détails de réservation et la transaction est actuellement marquée comme",
    "Wide front view highlighting the large grille and swept headlamps":
      "Vue frontale large mettant en valeur la grande calandre et les phares effilés",
    "Your Time, Perfectly Managed": "Votre temps, parfaitement maîtrisé",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "Votre chauffeur personnel offre une expérience fluide, discrète et attentive du début à la fin.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "ex. : aéroport de Tires (Cascais), aéroport de Lisbonne",
    "exceptional service": "service exceptionnel",
    "extraordinary experiences": "expériences extraordinaires",
    hero: "bannière principale",
    "more inclusions": "plus d'inclusions",
    processing: "traitement",
    "profile view": "vue de profil",
    "through the art of luxury transportation since our founding.":
      "à travers l’art du transport de luxe depuis notre fondation.",
    "unparalleled experiences": "expériences inégalées",
    "0-100 km/h in 3.9s": "0-100 km/h en 3,9 s",
    "1 passenger + professional chauffeur":
      "1 passager + chauffeur professionnel",
    "250 km/h (limited)": "250 km/h (limité)",
    "3 passengers + professional chauffeur":
      "3 passagers + chauffeur professionnel",
    "4 + professional chauffeur": "4 + chauffeur professionnel",
    "4 passengers + professional chauffeur":
      "4 passagers + chauffeur professionnel",
    "621 hp": "621 ch",
    "9-Speed Automatic": "Automatique 9 vitesses",
    "9.1 L/100km": "9,1 L/100 km",
    "A design that transcends generations, still turning heads after six decades.":
      "Un design qui traverse les générations et attire toujours les regards après six décennies.",
    "A hand-finished cabin featuring exclusive Maybach details, refined stitching, and a serene atmosphere created for privacy and relaxation.":
      "Un habitacle fini à la main avec des détails exclusifs Maybach, des surpiqûres raffinées et une atmosphère sereine conçue pour l'intimité et la détente.",
    "Authentic representation of mid-20th century American automotive excellence.":
      "Représentation authentique de l'excellence automobile américaine du milieu du XXe siècle.",
    "British Craftsmanship": "Savoir-faire britannique",
    "Collectible Status": "Statut de collection",
    "Cultural Icon": "Icône culturelle",
    "Design that influenced modern luxury cars and remains relevant today.":
      "Un design qui a influencé les voitures de luxe modernes et reste pertinent aujourd'hui.",
    "Design that transcends decades, still considered the pinnacle of automotive luxury.":
      "Un design qui traverse les décennies, toujours considéré comme le sommet du luxe automobile.",
    "Engineering Excellence": "Excellence d'ingénierie",
    "Event Perfect": "Parfait pour les événements",
    "Every detail meticulously crafted by master artisans in the Rolls-Royce tradition.":
      "Chaque détail est minutieusement réalisé par des maîtres artisans dans la tradition Rolls-Royce.",
    "Experience automotive purity with manual transmission and analog instrumentation.":
      "Découvrez la pureté automobile avec une boîte manuelle et une instrumentation analogique.",
    "Iconic Pagoda Design": "Design Pagoda iconique",
    "Impressive power delivery with the unmistakable V8 rumble.":
      "Une puissance impressionnante avec le grondement inimitable du V8.",
    "Incorporated modern automotive technology while maintaining luxury standards.":
      "Intègre la technologie automobile moderne tout en conservant des standards de luxe.",
    "Legendary Rolls-Royce refinement with unmatched noise isolation and smoothness.":
      "Raffinement Rolls-Royce légendaire avec une isolation acoustique et une douceur inégalées.",
    "Makes any occasion special with its presence and the stories it tells.":
      "Rend chaque occasion spéciale par sa présence et les histoires qu'elle raconte.",
    "Maybach Interior & Exterior": "Intérieur et extérieur Maybach",
    "Mercedes-Benz build quality and attention to detail that has stood the test of time.":
      "Qualité de fabrication Mercedes-Benz et souci du détail qui ont traversé le temps.",
    "Meticulously maintained to preserve its original character and charm.":
      "Entretenue avec soin pour préserver son caractère et son charme d'origine.",
    "One of the most sought-after classic cars, appreciating in value and prestige.":
      "L'une des voitures classiques les plus recherchées, dont la valeur et le prestige augmentent.",
    "Perfect blend of traditional Rolls-Royce values with contemporary engineering.":
      "Parfait mélange des valeurs traditionnelles Rolls-Royce et de l'ingénierie contemporaine.",
    "Period Authenticity": "Authenticité d'époque",
    "Powerful 364 cubic inch V8 engine delivering classic American performance.":
      "Puissant V8 de 364 pouces cubes offrant des performances américaines classiques.",
    "Powerful and refined turbocharged V8 delivering modern performance standards.":
      "V8 turbo puissant et raffiné offrant des performances modernes.",
    "Proud bearer of the Royal Warrant, serving British royalty for generations.":
      "Porteur fier du Royal Warrant, au service de la royauté britannique depuis des générations.",
    "Pure Driving Experience": "Expérience de conduite pure",
    "Rear-Wheel Drive": "Propulsion arrière",
    "Represents an important chapter in American automotive history.":
      "Représente un chapitre important de l'histoire automobile américaine.",
    "Revolutionary self-leveling suspension system providing unparalleled ride comfort.":
      "Système de suspension autonivelant révolutionnaire offrant un confort de conduite inégalé.",
    "Smooth and powerful 6.2L V8 engine delivering effortless performance.":
      "V8 6,2 L souple et puissant offrant des performances sans effort.",
    "Spacious cabin designed for business travel and long-distance comfort.":
      "Habitacle spacieux conçu pour les voyages d'affaires et le confort longue distance.",
    "The distinctive soft top roof that gives this car its legendary name and status.":
      "Le toit souple distinctif qui donne à cette voiture son nom et son statut légendaires.",
    "The gold standard of automotive excellence and attention to detail.":
      "La référence absolue en matière d'excellence automobile et de souci du détail.",
    "Timeless styling that captures the essence of 1950s American luxury.":
      "Un style intemporel qui capture l'essence du luxe américain des années 1950.",
    "V8 Power": "Puissance V8",
    "V8 Twin-Turbo 4.0L": "V8 biturbo 4,0 L",
  },
  ar: {
    "Airport Transfers": "تنقلات المطار",
    "Discreet chauffeur service to and from the airport.": "تنقلات مطار موثوقة",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "سفر الأعمال",
    "Classic Collection": "المجموعة الكلاسيكية",
    "Classic Wedding Fleet": "أسطول كلاسيكي لحفلات الزفاف",
    "Corporate Transportation": "نقل الشركات",
    "Executive Vehicles": "سيارات تنفيذية",
    "Fixed Price Transfers": "تنقلات بسعر ثابت",
    "Flight Tracking": "تتبع الرحلات",
    "Chauffeured Transport": "نقل مع سائق خاص",
    "Meeting Coordination": "تنسيق الاجتماعات",
    "Historic Palaces": "قصور تاريخية",
    "Luxury Tours & Scenic Routes": "جولات فاخرة ومسارات بانورامية",
    "Make Your Own Exclusive Experiences by the Hour": "اصنع تجاربك الحصرية بالساعة",
    "Modern Luxury Fleet": "أسطول فخم حديث",
    "Modern Transport": "نقل حديث",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "نقل باتجاه واحد",
    "Partner Brands": "علامات شريكة",
    "Priority Meet & Greet": "استقبال وترحيب أولوية",
    "Private Villa Access": "دخول فيلات خاصة",
    "Private Wine Tastings": "تذوق نبيذ خاص",
    "Personal Concierge": "كونسيرج شخصي",
    "Professional Service": "خدمة احترافية",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "نقل فعاليات VIP",
    "Wedding Services": "خدمات الزفاف",
    "Wedding Services Description":
      "حوّل يومك الخاص إلى تجربة لا تُنسى مع خدمة الزفاف لدينا.",
    About: "من نحن",
    AboutUs: "من نحن",
    "A Legacy of Excellence": "إرث من التميز",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "لمحة عن الرحلات التي نصنعها — من الاحتفالات الحميمة ووصول العرسان إلى المسارات الخلابة والمناسبات المؤسسية المصممة خصيصًا.",
    "Book Your Experience": "احجز تجربتك",
    "A professional chauffeur service available by the hour.": "نقل أعمال احترافي",
    Contact: "تواصل",
    ContactUs: "تواصل معنا",
    "Contact Us": "تواصل معنا",
    "Ready to experience unparalleled luxury transportation?":
      "هل أنت مستعد لتجربة نقل فاخر لا مثيل له؟",
    "Get in touch with us today.": "تواصل معنا اليوم.",
    "Call Us": "اتصل بنا",
    "24/7 Available": "متاح 24/7",
    "Email Us": "راسلنا",
    "We respond within 2 hours": "نرد خلال ساعتين",
    "Send Us a Message": "أرسل لنا رسالة",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "سواء كنت تحتاج إلى نقل لمناسبة خاصة، اجتماع عمل، أو ترغب فقط في تجربة قمة السفر الفاخر، نحن هنا لتحقيق ذلك.",
    "Message Sent Successfully!": "تم إرسال الرسالة بنجاح!",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "شكرًا لتواصلك معنا. سنعود إليك خلال ساعتين.",
    "Full Name *": "الاسم الكامل *",
    "Your full name": "اسمك الكامل",
    "Email Address *": "البريد الإلكتروني *",
    "your.email@example.com": "your.email@example.com",
    "Phone Number": "رقم الهاتف",
    "Subject *": "الموضوع *",
    "Select a subject": "اختر موضوعًا",
    "Booking Inquiry": "استفسار حجز",
    "Corporate Services": "خدمات الشركات",
    "Special Event": "حدث خاص",
    "General Information": "معلومات عامة",
    "Feedback": "ملاحظات",
    "Message *": "الرسالة *",
    "Please describe your requirements and any specific details...":
      "يرجى وصف متطلباتك وأي تفاصيل محددة...",
    "Send Message": "إرسال الرسالة",
    "Get in Touch": "تواصل معنا",
    Phone: "الهاتف",
    "Available 24/7 for urgent requests": "متاح 24/7 للطلبات العاجلة",
    Email: "البريد الإلكتروني",
    Location: "الموقع",
    "Miraflores, Lisbon": "Miraflores، لشبونة",
    "Serving all of Portugal and beyond": "نخدم البرتغال بالكامل وما بعدها",
    "Business Hours": "ساعات العمل",
    "Monday - Sunday": "الاثنين - الأحد",
    "Why Choose Us?": "لماذا تختارنا؟",
    "Years Experience": "سنوات الخبرة",
    "Luxury Vehicles": "مركبات فاخرة",
    Satisfaction: "الرضا",
    "Ready to Begin Your Journey?": "هل أنت مستعد لبدء رحلتك؟",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "اختبر قمة النقل الفاخر. كل تفصيل مصنوع بإتقان، وكل لحظة مصممة من أجل",
    "unforgettable elegance": "أناقة لا تُنسى",
    "Call Now": "اتصل الآن",
    "Send Email": "أرسل بريدًا إلكترونيًا",
    "Direct premium transportation between locations.": "نقل باتجاه واحد مريح",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "استمتع بنقل باتجاه واحد سلس مع خدمة السائق المميزة لدينا. حلول نقل فاخرة مرنة من نقطة إلى نقطة تناسب جدولك.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "ارتقِ بسفر الأعمال مع حلول نقل راقية وموثوقة مصممة للمديرين التنفيذيين والشركات التي تسعى لإبهار العملاء.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "استمتع بتنقلات مطار مميزة مع أسطولنا الفاخر. خدمة استقبال أولوية، تتبع الرحلات، وتنقلات سلسة من Tires (مطار كاشكايش).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "حوّل يومك الخاص إلى تجربة لا تُنسى مع خدمات نقل الزفاف المميزة لدينا. مركبات فاخرة كلاسيكية وحديثة لأغلى لحظاتك.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "عِش لحظات فريدة بحق تتجاوز النقل الفاخر المعتاد. دخول VIP، زيارات لفيلات خاصة، وتجارب مصممة خصيصًا.",
    "Curated Experiences": "تجارب مختارة بعناية",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "كل رحلة مع Chevalier Lane مصممة بعناية لتتجاوز التوقعات، مع خدمة لا مثيل لها تحول اللحظات العادية إلى ذكريات استثنائية.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "اختبر النقل الفاخر مع خدمة السائق المميزة لدينا. احجز مركبتك ووجهاتك أدناه.",
    "Exclusive Services": "خدمات حصرية",
    "Explore Our Fleet": "استكشف أسطولنا",
    "Private chauffeur-driven tours and experiences.": "جولات مُرشدة وتجارب مشاهدة المعالم",
    "Immersive Journey": "رحلة غامرة",
    "Learn More": "اعرف المزيد",
    "Lisbon in Motion": "لشبونة في حركة",
    "Luxury Concierge & Boutique Chauffeur Service": "خدمة كونسيرج فاخرة وسائق بوتيكي",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "من أناقة Rolls-Royce إلى راحة Bentley الحديثة في لشبونة — سافر بتميّز لا يُضاهى.",
    "Moments in Motion": "لحظات في حركة",
    "Private chauffeur experience in Lisbon": "تجربة سائق خاص في لشبونة",
    "Professional chauffeur services for all your transportation needs":
      "خدمات سائق محترف لجميع احتياجات النقل",
    Service: "الخدمة",
    "Signature Services": "خدمات مميزة",
    "Timeless elegance with our classic luxury vehicles":
      "أناقة خالدة مع مركباتنا الكلاسيكية الفاخرة",
    Tours: "جولات",
    "We Tailor Every Experience to You": "نصمم كل تجربة لتناسبك",
    Weddings: "حفلات الزفاف",
    of: "من",
    "Private Chauffeur Service": "خدمة سائق خاص",
    Services: "الخدمات",
    "Our Services": "خدماتنا",
    "One-Way Services": "خدمات باتجاه واحد",
    "Classic Fleet": "الأسطول الكلاسيكي",
    "Modern Fleet": "الأسطول الحديث",
    Language: "اللغة",
    "Luxury transportation services": "خدمات نقل فاخرة",
    "Classic Fleet Overview": "نظرة عامة على الأسطول الكلاسيكي",
    "Modern Fleet Overview": "نظرة عامة على الأسطول الحديث",
    "About Us": "من نحن",
    "Contemporary luxury with cutting-edge technology":
      "فخامة معاصرة بتقنيات متطورة",
    "Contact Info": "معلومات التواصل",
    "Toggle menu": "فتح/إغلاق القائمة",
    "24/7 Service Available": "خدمة متاحة 24/7",
    "All rights reserved.": "جميع الحقوق محفوظة.",
    "Exclusive Fleet": "أسطول حصري",
    Reserve: "احجز",
    Explore: "استكشف",
    "About This Vehicle": "حول هذه المركبة",
    Specifications: "المواصفات",
    "Key Features": "الميزات الرئيسية",
    "Pricing Options": "خيارات التسعير",
    "Reserve This Vehicle": "احجز هذه المركبة",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "تواصل مع فريق الكونسيرج لترتيب تجربة نقل حصرية لك.",
    "Call Concierge": "اتصل بالكونسيرج",
    "Signature Collection": "مجموعة مميزة",
    "Book Your Car": "احجز سيارتك",
    "Explore Fleet": "استكشف الأسطول",
    "Our Complete Fleet": "أسطولنا الكامل",
    "Ready to Experience Luxury?": "مستعد لتجربة الفخامة؟",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "اختر من مجموعتنا الفاخرة ودع سائقينا المحترفين ينقلونك بأناقة وراحة لا تُضاهى.",
    "Book Your Vehicle": "احجز مركبتك",
    "View Services": "عرض الخدمات",
    "Available Soon": "متاح قريبًا",
    "Currently unavailable": "غير متاح حاليًا",
    "Pricing shown at secure checkout": "يتم عرض الأسعار عند صفحة الدفع الآمنة",
    "View Details": "عرض التفاصيل",
    "Book Your Service": "احجز خدمتك",
    "Find Out Prices": "اكتشف الأسعار",
    "Explore Services": "استكشف الخدمات",
    "Complete Service Portfolio": "محفظة الخدمات الكاملة",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "ستكون سيارة Bentley Mulsanne الرائدة لدينا متاحة قريبًا لخدمات مختارة.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "من نقل فاخر يومي إلى تجارب لا تتكرر، تضمن محفظتنا الشاملة أن تعكس كل رحلة ذروة الرقي والتميز.",
    "Cutting-edge luxury with the latest automotive technology":
      "فخامة متطورة بأحدث تقنيات السيارات",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "اختبر قمة التميز في السيارات الحديثة مع أسطولنا المعاصر، الذي يضم أرقى المركبات الفاخرة بتقنيات متقدمة وراحة لا مساومة فيها.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "التجسيد النهائي لتميّز الهندسة الألمانية، يجمع بين القوة والفخامة والتكنولوجيا المتقدمة.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "فخامة بريطانية مُعاد تعريفها، تقدم Mulsanne راحة ورقيًا لا مثيل لهما للمسافر المميز.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "قمة الفخامة والرقي، تقدم Mercedes-Benz S-Class Maybach راحة وهيبة لا مثيل لهما.",
    "V8 Twin-Turbo Engine": "محرك V8 مزدوج التيربو",
    "BRABUS Performance": "أداء BRABUS",
    "Executive Comfort": "راحة تنفيذية",
    "Advanced Tech": "تقنية متقدمة",
    "Handcrafted Interior": "مقصورة مصنوعة يدويًا",
    "Air Suspension": "نظام تعليق هوائي",
    "Executive Seating": "مقاعد تنفيذية",
    "V12 Engine": "محرك V12",
    "Executive Rear Seating": "مقاعد خلفية تنفيذية",
    "Premium Materials": "مواد فاخرة",
    "Advanced Technology": "تقنية متقدمة",
    "Twin-Turbo V8 Power": "قوة V8 مزدوج التيربو",
    "Luxury Interior": "مقصورة فاخرة",
    "Safety First": "السلامة أولًا",
    "Fuel Efficiency": "كفاءة الوقود",
    "Rear Entertainment Suite": "نظام ترفيه خلفي",
    "British Heritage": "إرث بريطاني",
    "V12 engine": "محرك V12",
    "Premium sound system": "نظام صوت فاخر",
    Engine: "المحرك",
    Power: "القوة",
    Transmission: "ناقل الحركة",
    "Top Speed": "السرعة القصوى",
    Acceleration: "التسارع",
    "Fuel Economy": "استهلاك الوقود",
    "Drive Type": "نوع الدفع",
    Passengers: "الركاب",
    Luggage: "الأمتعة",
    "3 suitcases + 2 bags": "3 حقائب سفر + حقيبتان",
    "2 suitcases + 2 bags": "حقيبتا سفر + حقيبتان",
    "Base rate (max. 25km)": "السعر الأساسي (حد أقصى 25 كم)",
    "Additional per km": "إضافي لكل كم",
    Classic: "كلاسيكي",
    Modern: "حديث",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "تجسيد الفخامة البريطانية، تقدم Silver Cloud II رقيًا وهيبة لا مثيل لهما.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "تحفة في هندسة السيارات، تجمع Silver Shadow بين القوة والفخامة بتناغم مثالي.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "اختبر الإرث الأمريكي في عالم السيارات مع Oldsmobile Super 88 القوية والأنيقة.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "تمثل Mercedes 280SL Pagoda الأيقونية التميز في عصر السيارات الذهبي.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "الأناقة البريطانية تلتقي بالأداء الرياضي في Jaguar XJ6 الأيقونية، كلاسيكية حقيقية في تصميم السيارات.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "التعبير الأسمى عن الفخامة البريطانية، تجمع Double Six Daimler بين قوة V12 ورقي لا مثيل له.",
    "Timeless elegance from the golden age of motoring":
      "أناقة خالدة من العصر الذهبي للسيارات",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "اكتشف مجموعتنا المختارة بعناية من السيارات الكلاسيكية، حيث يمثل كل منها ذروة الحِرفية في حقبة من الأناقة والرقي.",
    "V8 Engine": "محرك V8",
    "Silent Ride": "قيادة هادئة",
    "Royal Heritage": "إرث ملكي",
    "V8 Turbo Engine": "محرك V8 توربو",
    "Hydropneumatic Suspension": "تعليق هيدرونيوماتيكي",
    "Modern Classic": "كلاسيكي عصري",
    "V8 Rocket Engine": "محرك V8 Rocket",
    "American Classic": "كلاسيكي أمريكي",
    "Powerful Performance": "أداء قوي",
    "Retro Design": "تصميم ريترو",
    "Classic Design": "تصميم كلاسيكي",
    "Perfect for Events": "مثالي للمناسبات",
    "Straight-6 Engine": "محرك 6 أسطوانات مستقيم",
    "British Luxury": "فخامة بريطانية",
    "Sporting Heritage": "إرث رياضي",
    "Timeless Design": "تصميم خالد",
    "Daimler Luxury": "فخامة Daimler",
    "British Prestige": "هيبة بريطانية",
    "Base rate (max. 20km)": "السعر الأساسي (حد أقصى 20 كم)",
    "Additional km": "كم إضافي",
    "Subject to request": "حسب الطلب",
    Pricing: "التسعير",
    "1 suitcase + 2 bags": "حقيبة سفر واحدة + حقيبتان",
    "1 suitcase + 1 bag": "حقيبة سفر واحدة + حقيبة واحدة",
    "3 suitcases + 3 bags": "3 حقائب سفر + 3 حقائب",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "مقصورة واسعة بمقاعد تنفيذية مثالية لسفر الأعمال والرحلات الطويلة، مع وظيفة تدليك مريحة.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "مقاعد جلد فاخرة مع وظيفة تدليك وتحكم بالمناخ لراحة قصوى.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "نظام معلومات وترفيه متطور مع ملاحة واتصال ومزايا مساعدة السائق.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "مُعزّز بترقيات قوة BRABUS لتقديم أداء ورقي استثنائيين.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "مقصورة مصنوعة يدويًا بمواد فاخرة واهتمام دقيق بالتفاصيل.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "أنظمة أمان شاملة تشمل مثبت سرعة تكيفي ومساعدة الحفاظ على المسار.",
    "Optimized engine management for balanced performance and efficiency.":
      "إدارة محرك محسّنة لتوازن الأداء والكفاءة.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "كل تفصيل مصنوع بعناية على يد حرفيين ماهرين باستخدام أجود المواد.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "محرك V8 مزدوج التيربو سعة 6.75 لتر يقدم أداءً ورقيًا بلا مجهود.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "نظام تعليق هوائي متقدم يوفر راحة وجودة ركوب لا مثيل لهما.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "أحدث مزايا المعلومات والترفيه والاتصال مدمجة بسلاسة مع الفخامة.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "شاشة كبيرة عالية الدقة تتيح للركاب الاستمتاع بالتلفاز والوسائط براحة تامة.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "امتداد فخور لإرث Bentley الأسطوري وتقاليد الحِرفة.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "تعمل Bentley Flying Spur بمحرك V12 يقدم أداءً ورقيًا استثنائيين.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "مزودة بنظام صوت فاخر يقدم جودة صوت استثنائية.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "Bentley Flying Spur سيارة بريطانية صُنعت في المملكة المتحدة.",
    "Luxury Lifestyle": "أسلوب حياة فاخر",
    "Wine Tasting": "تذوق النبيذ",
    "View previous experience": "عرض التجربة السابقة",
    "View next experience": "عرض التجربة التالية",
    "View previous service": "عرض الخدمة السابقة",
    "View next service": "عرض الخدمة التالية",
    "Go to service": "اذهب إلى الخدمة",
    "Distinguished Partnerships": "شراكات مرموقة",
    "Trusted Collaborations": "تعاونات موثوقة",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "نعمل جنبًا إلى جنب مع علامات راقية وروّاد ذوق لتقديم رحلات سلسة لا تُنسى لضيوفهم الأكثر تميّزًا.",
    "Expand your brand presence with Chevalier Lane": "عزّز حضور علامتك مع Chevalier Lane",
    "Reserve Your Place": "احجز مكانك",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "انضم إلى دائرة حصرية من الأفراد المميزين الذين يفهمون أن الفخامة الحقيقية ليست الوجهة فقط، بل الرحلة نفسها.",
    "Available Service": "خدمة متاحة",
    Premium: "Premium",
    "Fleet Selection": "اختيار الأسطول",
    Elite: "Elite",
    "Client Experience": "تجربة العميل",
    "Elegant chauffeur-driven transportation for weddings.": "نقل أنيق لحفلات الزفاف",
    "Prices are Subject to VAT": "الأسعار خاضعة لضريبة القيمة المضافة",
    "Why Choose Us": "لماذا تختارنا",
    "Flexible point-to-point luxury transportation solutions":
      "حلول نقل فاخرة مرنة من نقطة إلى نقطة",
    Features: "الميزات",
    "Vehicle Options": "خيارات المركبات",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "احجز نقلًا باتجاه واحد",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "تنقلات من Tires (مطار كاشكايش) - سعر ثابت لـ 25 كم",
    "Modern Fleet Services": "خدمات الأسطول الحديث",
    "Book Airport Transfer": "احجز نقل المطار",
    "Professional excellence for business travel and client relations":
      "تميز مهني لسفر الأعمال وعلاقات العملاء",
    "Business Features": "ميزات الأعمال",
    "Corporate Packages": "باقات الشركات",
    "Starting price (min. 2h)": "السعر المبدئي (حد أدنى ساعتان)",
    "Monthly Corporate Plan": "خطة شركات شهرية",
    "Corporate Inquiry": "استفسار شركات",
    "Main Wedding Fleet": "أسطول الزفاف الرئيسي",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "نقل إضافي",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "احجز نقل الزفاف",
    "Exclusive Private Wine Experiences": "تجارب نبيذ خاصة وحصرية",
    "Tour Experiences": "تجارب الجولات",
    "Featured Experiences": "تجارب مميزة",
    "From €7 pp": "ابتداءً من 7€ للشخص",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "ابتداءً من 15€ للشخص",
    "Premium Wine Experiences": "تجارب نبيذ فاخرة",
    "€75-€250 pp": "75€-250€ للشخص",
    "Explore Tours": "استكشف الجولات",
    "Exclusive Experiences": "تجارب حصرية",
    "VIP Services": "خدمات VIP",
    "Exclusive Packages": "باقات حصرية",
    "VIP Cultural Experience": "تجربة ثقافية VIP",
    "Private Estate Tour": "جولة خاصة في عقار",
    "Bespoke Experience": "تجربة مصممة خصيصًا",
    "Create Exclusive Experience": "أنشئ تجربة حصرية",
    "Why Choose Chevalier Lane": "لماذا Chevalier Lane",
    "Contact Concierge": "تواصل مع الكونسيرج",
    "Always Available": "متاح دائمًا",
    Instant: "فوري",
    "Quote Response": "رد عرض السعر",
    Global: "عالمي",
    "Service Coverage": "نطاق الخدمة",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "تواصل مع فريق الكونسيرج لمناقشة احتياجات النقل واكتشاف كيف يمكننا رفع رحلتك القادمة إلى مستويات استثنائية.",
    "Bentley Mulsanne city transfer": "تنقل داخل المدينة بسيارة Bentley Mulsanne",
    "ONE-WAY TRANSPORTATION": "نقل باتجاه واحد",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur":
      "فخامة حديثة: Bentley Mulsanne، Mercedes S-Class Brabus، Mercedes-Benz S-Class Maybach، Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II":
      "المجموعة الكلاسيكية: Rolls-Royce Silver Shadow، Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "خدمة سائق محترف",
    "Real-time GPS Tracking": "تتبع GPS في الوقت الحقيقي",
    "Flexible Scheduling": "جدولة مرنة",
    "Professional Chauffeur": "سائق محترف",
    "Complimentary Water": "مياه مجانية",
    "Premium bottled water included in every journey.": "مياه معبأة فاخرة متضمنة في كل رحلة.",
    "All-Inclusive Pricing": "تسعير شامل",
    "No hidden extras — congestion charges, tolls, and taxes included.":
      "لا رسوم مخفية — تشمل رسوم الازدحام والطرق والضرائب.",
    "Champagne & Drinks on Request": "شمبانيا ومشروبات عند الطلب",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.":
      "أضف لمسة فاخرة لرحلتك مع شمبانيا باردة أو نبيذ أو مشروبات أخرى عند الطلب.",
    "Comfort & Convenience": "الراحة والسهولة",
    "Beautifully maintained vehicles offering a refined and relaxing environment.":
      "مركبات مُعتنى بها بعناية توفر بيئة راقية ومريحة.",
    "From Point A to Point B": "من النقطة A إلى النقطة B",
    "Corporate transportation": "نقل الشركات",
    "Executive Vehicle Fleet": "أسطول مركبات تنفيذية",
    "Confidentiality Assured": "سرية مضمونة",
    "Professional Presentation": "مظهر احترافي",
    "Corporate Account Management": "إدارة حسابات الشركات",
    "Invoice & Expense Tracking": "تتبع الفواتير والمصروفات",
    "Book Your Corporate Transfer": "احجز نقل شركتك",
    "Flexibility for Business Travel": "مرونة لسفر الأعمال",
    "Book on demand or in advance for complete control of your schedule.":
      "احجز عند الطلب أو مسبقًا للتحكم الكامل بجدولك.",
    "Work Comfortably Onboard": "اعمل براحة على متن المركبة",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.":
      "استمتع بطاولات قابلة للطي ومساحة للكمبيوتر المحمول ومقصورة هادئة مثالية للإنتاجية.",
    "Charging & Connectivity": "الشحن والاتصال",
    "Multiple charging ports available for phones, laptops, and devices.":
      "منافذ شحن متعددة متاحة للهواتف وأجهزة الكمبيوتر والأجهزة الأخرى.",
    "In-Car Entertainment": "ترفيه داخل السيارة",
    "Screens and multimedia systems available for presentations or relaxation.":
      "شاشات وأنظمة وسائط متعددة متاحة للعروض أو الاسترخاء.",
    "Discreet & Reliable Service": "خدمة سرية وموثوقة",
    "Designed for executives who value privacy, punctuality, and comfort.":
      "مصممة للمديرين التنفيذيين الذين يقدّرون الخصوصية والدقة والراحة.",
    "Discreet Business Transfers": "تنقلات أعمال سرية",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.":
      "تنقلات أعمال احترافية وسرية وموثوقة للمديرين التنفيذيين والعملاء والشركاء.",
    "Luxury airport meet & greet service": "خدمة استقبال مطار فاخرة",
    "Seamless airport transportation": "نقل مطار سلس",
    "Transfers from Cascais Airport and Lisbon Airport":
      "تنقلات من مطار كاشكايش ومطار لشبونة",
    "Modern and Classic Fleet Services": "خدمات الأسطول الحديث والكلاسيكي",
    "Optional extra vehicle for luggage": "مركبة إضافية اختيارية للأمتعة",
    "Priority meet & greet service": "خدمة استقبال أولوية",
    "Flight tracking & monitoring": "تتبع ومراقبة الرحلات",
    "Private terminal access": "دخول إلى محطة خاصة",
    "Luggage assistance": "مساعدة الأمتعة",
    "Real-time arrival updates": "تحديثات الوصول الفورية",
    "Multi-language support": "دعم متعدد اللغات",
    "Flight Monitoring": "مراقبة الرحلات",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.":
      "يتابع سائقك رحلتك في الوقت الحقيقي لضمان توقيت مثالي — حتى لو وصلت مبكرًا أو متأخرًا.",
    "Waiting & Parking Included": "الانتظار والمواقف مشمولة",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.":
      "استمتع بـ 30 دقيقة انتظار مجانية لوصول المطار.",
    "Meet & Greet Service": "خدمة الاستقبال والترحيب",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.":
      "سيستقبلك سائقك داخل صالة الوصول بلافتة اسم مخصصة.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.":
      "سائقون ذوو خبرة ودقة وسرية يوفرون نقلًا هادئًا وسلسًا من المطار.",
    "Luggage Assistance": "مساعدة الأمتعة",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.":
      "سيساعدك سائقك في جميع الحقائب ويضمن انتقالًا مريحًا من الجو إلى البر.",
    "Premium Airport Transfers": "تنقلات مطار مميزة",
    "Rolls-Royce Silver Cloud II wedding transport":
      "نقل زفاف Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow wedding ceremony":
      "مراسم زفاف Rolls-Royce Silver Shadow",
    "Oldsmobile Super 88 wedding chauffeur": "سائق زفاف Oldsmobile Super 88",
    "Wedding transportation": "نقل الزفاف",
    "From Ceremony to Reception in Style and Elegance":
      "من المراسم إلى الاستقبال بأناقة ورقي",
    "Extra Wedding Transport Vehicles": "مركبات نقل إضافية للزفاف",
    "Decorations and designs available as extras": "الزينة والتصاميم متاحة كإضافات",
    "Minimum 3 hours booking required": "الحد الأدنى للحجز 3 ساعات",
    "Basic Decoration (artificial or simple natural flowers + ribbons)":
      "زينة أساسية (زهور صناعية أو طبيعية بسيطة + أشرطة)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)":
      "زينة متوسطة (زهور طبيعية متوسطة الجودة، تنسيقات أمامية وجانبية، أربطة)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)":
      "زينة فاخرة (زهور ممتازة، تنسيقات متعددة، تصميم تفصيلي، زهور موسمية طازجة أو مستوردة، إعداد احترافي)",
    "Book Your Wedding Transport": "احجز نقل الزفاف",
    "Free Ribbons": "أشرطة مجانية",
    "Complimentary ribbons and colour options available to match your wedding theme.":
      "أشرطة مجانية وخيارات ألوان متاحة لتناسب طابع زفافك.",
    "Chauffeur Arrival 20 Minutes Early": "وصول السائق قبل 20 دقيقة",
    "Your driver arrives ahead of time to ensure a calm and seamless start.":
      "يصل سائقك مبكرًا لضمان بداية هادئة وسلسة.",
    "Classic Cars for the Ceremony": "سيارات كلاسيكية للمراسم",
    "Choose from our iconic vintage collection for the bride or groom's arrival.":
      "اختر من مجموعتنا الكلاسيكية الأيقونية لوصول العروس أو العريس.",
    "Modern Luxury Cars for Guests": "سيارات فاخرة حديثة للضيوف",
    "Elegant modern vehicles available for transporting family and guests.":
      "مركبات حديثة أنيقة متاحة لنقل العائلة والضيوف.",
    "Flexible Journey Planning": "تخطيط مرن للرحلة",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.":
      "الالتقاط للعروس أو العريس أو مرافقي الزفاف والتنقل إلى المراسم والتصوير والاستقبال.",
    "Decor & Personalisation": "الزينة والتخصيص",
    "Custom decoration options to make your day truly unique.":
      "خيارات زينة مخصصة لتجعل يومك فريدًا حقًا.",
    "From Ceremony to Reception": "من المراسم إلى الاستقبال",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation":
      "عِش لحظات فريدة بحق تتجاوز النقل الفاخر المعتاد",
    "Exclusive experience inside luxury Bentley interior":
      "تجربة حصرية داخل مقصورة Bentley الفاخرة",
    "VIP Event Transportation": "نقل فعاليات VIP",
    "Exclusive Cultural Experiences": "تجارب ثقافية حصرية",
    "Personal Concierge Service": "خدمة كونسيرج شخصية",
    "Bespoke Itinerary Creation": "إنشاء مسار مخصص",
    "Luxury Accommodation Coordination": "تنسيق إقامة فاخرة",
    "(Full Day Rate)": "(سعر اليوم الكامل)",
    "A confirmation email has been sent to": "تم إرسال بريد تأكيد إلى",
    "Additional Information": "معلومات إضافية",
    Airline: "شركة الطيران",
    "Airline is required": "شركة الطيران مطلوبة",
    Approximately: "تقريبًا",
    "At least 1 trip required for transport bookings":
      "مطلوب رحلة واحدة على الأقل لحجوزات النقل",
    Book: "احجز",
    "Book Your Airport Transfer": "احجز نقل المطار",
    "Book Your Luxury Tour": "احجز جولتك الفاخرة",
    "Book Your One-Way Transfer": "احجز نقلًا باتجاه واحد",
    "Book by the Hour": "احجز بالساعة",
    "By the Hour | Full Day": "بالحجز بالساعة | يوم كامل",
    "Book Full Day": "احجز يومًا كاملًا",
    "Booking Confirmed!": "تم تأكيد الحجز!",
    "Booking Details": "تفاصيل الحجز",
    "Booking Summary": "ملخص الحجز",
    "Calculating Price...": "جارٍ حساب السعر...",
    "Calculating distance...": "جارٍ حساب المسافة...",
    "Calculating price...": "جارٍ حساب السعر...",
    "Calculating route...": "جارٍ حساب المسار...",
    "Calculating...": "جارٍ الحساب...",
    "Preparing your price request...": "جارٍ تجهيز طلب السعر الخاص بك...",
    "Contact us for pricing": "تواصل معنا لمعرفة الأسعار",
    "Do you need vehicles for guest transport?":
      "هل تحتاج إلى مركبات لنقل الضيوف؟",
    "How many vehicles do you need?": "كم عدد المركبات التي تحتاجها؟",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "لنقل ضيوف الزفاف والمرافِقين. تتوفر فقط المركبات الحديثة.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "سنؤكد التوفر أولاً، ثم سترى المبلغ النهائي في صفحة الدفع الآمنة من Stripe.",
    "Decoration Options (Optional)": "خيارات الزينة (اختياري)",
    "Decoration Price (€)": "سعر الزينة (€)",
    "Distance to Experience": "المسافة إلى التجربة",
    "Distance:": "المسافة:",
    "Drop-off Location": "مكان الوصول",
    "Drop-off location is required": "مكان الوصول مطلوب",
    Duration: "المدة",
    "Duration (Hours)": "المدة (بالساعات)",
    "Duration is required": "المدة مطلوبة",
    "Duration:": "المدة:",
    "Email is required": "البريد الإلكتروني مطلوب",
    "Enter decoration price": "أدخل سعر الزينة",
    "Enter your first name": "أدخل اسمك الأول",
    "Enter your last name": "أدخل اسم العائلة",
    "Event Start Time": "وقت بدء الحدث",
    "Event date is required": "تاريخ الحدث مطلوب",
    "Event time is required": "وقت الحدث مطلوب",
    "Extra Vehicle:": "مركبة إضافية:",
    "Extra vehicle for luggage": "مركبة إضافية للأمتعة",
    "Final Destination": "الوجهة النهائية",
    "Final Location": "الموقع النهائي",
    "Final destination is required": "الوجهة النهائية مطلوبة",
    "Final location is required": "الموقع النهائي مطلوب",
    "First Name": "الاسم الأول",
    "First name is required": "الاسم الأول مطلوب",
    "Flight Information": "معلومات الرحلة",
    "Flight Number": "رقم الرحلة",
    "Flight number is required": "رقم الرحلة مطلوب",
    "For transporting wedding guests and party (6% VAT)":
      "لنقل ضيوف الزفاف والمرافقين (ضريبة القيمة المضافة 6%)",
    "Guest Transport": "نقل الضيوف",
    "Hand Luggage": "أمتعة يدوية",
    "Hourly rates from €250": "أسعار بالساعة ابتداءً من 250€",
    Includes: "يشمل",
    "Large Luggage": "أمتعة كبيرة",
    "Last Name": "اسم العائلة",
    "Last name is required": "اسم العائلة مطلوب",
    "Luggage Information": "معلومات الأمتعة",
    "Main Fleet": "الأسطول الرئيسي",
    "Make a Special Request": "تقديم طلب خاص",
    Max: "الحد الأقصى",
    Maximum: "أقصى حد",
    "Maximum 6 trips per booking, 2 trips per hour":
      "بحد أقصى 6 رحلات لكل حجز، 2 رحلة لكل ساعة",
    Min: "الحد الأدنى",
    Minimum: "أدنى حد",
    "Minimum 3 hours required": "الحد الأدنى 3 ساعات",
    "Minimum 3 hours required for main fleet bookings":
      "الحد الأدنى 3 ساعات لحجوزات الأسطول الرئيسي",
    "Missing Cal.com configuration. Please try again later.":
      "إعدادات Cal.com مفقودة. يرجى المحاولة لاحقًا.",
    "Missing Cal.com username. Please configure":
      "اسم مستخدم Cal.com مفقود. يرجى الإعداد",
    "Missing Cal.com username. Please set":
      "اسم مستخدم Cal.com مفقود. يرجى التعيين",
    No: "لا",
    "No decoration": "بدون زينة",
    "Note:": "ملاحظة:",
    "Number of Participants": "عدد المشاركين",
    "Number of Passengers": "عدد الركاب",
    "Number of Trips": "عدد الرحلات",
    "Optional Add-ons": "إضافات اختيارية",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Azeitão)",
    "Participants & Options": "المشاركون والخيارات",
    Passenger: "راكب",
    "Per-trip rates from €100": "أسعار لكل رحلة ابتداءً من 100€",
    "Personal Information": "معلومات شخصية",
    "Phone number is required": "رقم الهاتف مطلوب",
    "Pickup Location": "مكان الانطلاق",
    "Pickup location is required": "مكان الانطلاق مطلوب",
    Piece: "قطعة",
    Pieces: "قطع",
    "Please Complete the Form": "يرجى إكمال النموذج",
    "Please Enter Locations": "يرجى إدخال المواقع",
    "Please Enter Locations & Flight Details":
      "يرجى إدخال المواقع وتفاصيل الرحلة",
    "Please Enter Starting Location": "يرجى إدخال موقع الانطلاق",
    "Please Select a Vehicle": "يرجى اختيار مركبة",
    "Please complete the pricing details before scheduling.":
      "يرجى إكمال تفاصيل التسعير قبل الجدولة.",
    "Please enter a starting location": "يرجى إدخال موقع الانطلاق",
    "Please enter a valid email address":
      "يرجى إدخال بريد إلكتروني صالح",
    "Please enter both pickup and drop-off locations":
      "يرجى إدخال موقعي الانطلاق والوصول",
    "Please enter both starting location and destination":
      "يرجى إدخال موقع الانطلاق والوجهة",
    "Please enter flight number and airline":
      "يرجى إدخال رقم الرحلة وشركة الطيران",
    "Please fix the following errors:\n":
      "يرجى إصلاح الأخطاء التالية:\n",
    "Please select a tour option": "يرجى اختيار خيار الجولة",
    "Please select a tour option to continue.":
      "يرجى اختيار خيار الجولة للمتابعة.",
    "Please select a vehicle": "يرجى اختيار مركبة",
    "Please select a vehicle for the tour":
      "يرجى اختيار مركبة للجولة",
    "Please select a vehicle for the tour.":
      "يرجى اختيار مركبة للجولة.",
    "Please select a vehicle to continue.":
      "يرجى اختيار مركبة للمتابعة.",
    "Please select a vehicle to proceed":
      "يرجى اختيار مركبة للمتابعة",
    "Please select a vehicle to schedule with Cal.com.":
      "يرجى اختيار مركبة للجدولة مع Cal.com.",
    "Preparing secure payment...": "جارٍ تجهيز الدفع الآمن...",
    "Price Summary": "ملخص السعر",
    "Price:": "السعر:",
    "Schedule & Pay": "الجدولة والدفع",
    "Select Your Tour Experience": "اختر تجربة جولتك",
    "Select Your Vehicle": "اختر مركبتك",
    "Selected Vehicle": "المركبة المختارة",
    "Service Type": "نوع الخدمة",
    "Starting Location": "موقع الانطلاق",
    "Starting from": "ابتداءً من",
    "Starting location is required": "موقع الانطلاق مطلوب",
    "Stripe checkout session URL missing.":
      "رابط جلسة الدفع في Stripe مفقود.",
    "Total Price": "السعر الإجمالي",
    "Total Price:": "السعر الإجمالي:",
    "Transfer Details": "تفاصيل النقل",
    "Transfer Summary": "ملخص النقل",
    Transport: "نقل",
    "Trip Details": "تفاصيل الرحلة",
    "Trip Summary": "ملخص الرحلة",
    "Unable to create Stripe checkout session.":
      "تعذر إنشاء جلسة دفع Stripe.",
    "Unable to create a Stripe checkout session.":
      "تعذر إنشاء جلسة دفع Stripe.",
    VAT: "ضريبة القيمة المضافة",
    "Vehicle:": "المركبة:",
    "We were unable to calculate a quote for this transfer.":
      "تعذر علينا حساب عرض سعر لهذا النقل.",
    "Wedding Date": "تاريخ الزفاف",
    "Wedding Event Details": "تفاصيل حدث الزفاف",
    Yes: "نعم",
    "e.g., Ceremony Venue, Reception Hall":
      "مثل: مكان المراسم، قاعة الاستقبال",
    "e.g., Hotel, Church, Home": "مثل: فندق، كنيسة، منزل",
    "e.g., Lisbon Airport, Hotel": "مثل: مطار لشبونة، فندق",
    "e.g., Lisbon Airport, Hotel Name":
      "مثل: مطار لشبونة، اسم الفندق",
    "e.g., Lisbon City Center, Hotel Name":
      "مثل: وسط لشبونة، اسم الفندق",
    "e.g., Porto City Center, Algarve Resort":
      "مثل: وسط بورتو، منتجع في الغارف",
    "e.g., TAP Air Portugal, Iberia":
      "مثل: TAP Air Portugal، Iberia",
    "e.g., TP 1234, IB 5678": "مثل: TP 1234، IB 5678",
    extra: "إضافي",
    "from your pickup location to": "من موقع الانطلاق إلى",
    h: "س",
    hour: "ساعة",
    hours: "ساعات",
    km: "كم",
    "km included": "كم مشمولة",
    participant: "مشارك",
    participants: "مشاركون",
    "participants allowed for this tour": "مشاركون مسموحون لهذه الجولة",
    "participants required for this tour": "مشاركون مطلوبون لهذه الجولة",
    "per km": "لكل كم",
    "per person": "لكل شخص",
    pp: "pp",
    "the experience": "التجربة",
    trip: "رحلة",
    trips: "رحلات",
    "your@email.com": "your@email.com",
    "A Ceremony of Distinction": "مراسم راقية",
    "A Commitment to Excellence": "التزام بالتميّز",
    "A confirmation has been emailed to you. Our concierge will follow up shortly with final details.":
      "تم إرسال تأكيد إلى بريدك الإلكتروني. سيتابع فريق الكونسيرج قريبًا بالتفاصيل النهائية.",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "إرث من التميّز بُني على الشغف والدقة والتزام لا يتزعزع بـ",
    AZEITÃO: "AZEITÃO",
    "About Chevalier Lane": "عن Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "زاوية أمامية ثلاثية جريئة مع عجلات متعددة الأذرع وشبك كروم",
    "Amount:": "المبلغ:",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "خدمة بالساعة توفر مرونة وخصوصية وتوافرًا دون انقطاع.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "أي متطلبات غذائية أو احتياجات وصول أو لغات مفضلة أو طلبات خاصة...",
    "Any special requirements, accessibility needs, or additional services...":
      "أي متطلبات خاصة أو احتياجات وصول أو خدمات إضافية...",
    "Any special requirements, decoration details, or additional services...":
      "أي متطلبات خاصة أو تفاصيل ديكور أو خدمات إضافية...",
    "Arrive in first class": "صل وكأنك في الدرجة الأولى",
    "Arrive with Confidence": "صل بثقة",
    "Arrive with Elegance": "صل بأناقة",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "كوننا الشركة الوحيدة في لشبونة التي تقدم سيارات فاخرة كلاسيكية وحديثة، نجسر الفجوة بين الإرث الفاخر والتميّز المعاصر. تمتد مجموعتنا من مرسيدس باغودا الأيقونية في الستينيات إلى بنتلي مولسان الحديثة المتطورة.",
    "Back to Tours": "العودة إلى الجولات",
    "Back to Wedding Bookings": "العودة إلى حجوزات الزفاف",
    "Back to wedding services": "العودة إلى خدمات الزفاف",
    "Because how you arrive matters as much as where you’re going.":
      "لأن طريقة وصولك مهمة بقدر وجهتك.",
    "Bentley Flying Spur detail - Exterior": "Bentley Flying Spur تفصيل - خارجي",
    "Bentley Flying Spur detail - Front view":
      "Bentley Flying Spur تفصيل - منظر أمامي",
    "Bentley Flying Spur detail - Interior":
      "Bentley Flying Spur تفصيل - داخلي",
    "Bentley Flying Spur detail - Rear view":
      "Bentley Flying Spur تفصيل - منظر خلفي",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Bentley Mulsanne تفصيل - لقطة مقرّبة لشعار Flying B على غطاء المحرك",
    "Bentley Mulsanne detail - Front view":
      "Bentley Mulsanne تفصيل - منظر أمامي",
    "Bentley Mulsanne detail - Interior":
      "Bentley Mulsanne تفصيل - داخلي",
    "Bentley Mulsanne detail - Rear view":
      "Bentley Mulsanne تفصيل - منظر خلفي",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne منظر أمامي أيمن - خارجي",
    "Bentley Mulsanne profile detail": "Bentley Mulsanne تفصيل للملف الجانبي",
    "Bentley Mulsanne rear quarter detail": "Bentley Mulsanne تفصيل للربع الخلفي",
    "Bentley Mulsanne side view - Exterior": "Bentley Mulsanne منظر جانبي - خارجي",
    "Book Your Tour": "احجز جولتك",
    "Book another transfer": "احجز نقلاً آخر",
    "Change language": "تغيير اللغة",
    Chauffeur: "سائق خاص",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "وصول بسائق خاص يوفر الخصوصية والراحة والتفاصيل الراقية. عند الطلب، تشكيلة من النبيذ والشمبانيا والمرطبات المصممة خصيصًا.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "تنقلات بسائق خاص بين المنزل والمراسم والاستقبال، تُدار بدقة وعناية.",
    "Checking Stripe...": "جارٍ التحقق من Stripe...",
    "Chevalier Lane Logo": "شعار Chevalier Lane",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "أعادت Chevalier Lane تعريف النقل الفاخر، فهي الشركة الوحيدة في لشبونة التي تقدم الفخامة الحديثة والأناقة الكلاسيكية معًا.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "تشمل تنقلات السيارات الكلاسيكية مركبة إضافية (Range Rover Vogue) للأمتعة في",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "واجهة أمامية كلاسيكية مع غطاء بارز وحواجز صادمات كروم",
    "Classic heritage and modern innovation in one exclusive collection":
      "إرث كلاسيكي وابتكار حديث في مجموعة حصرية واحدة",
    "Close-up of the Mercedes bonnet star and grille badge":
      "لقطة مقرّبة لنجمة مرسيدس على غطاء المحرك وشارة الشبك",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "لقطة مقرّبة لتمثال Spirit of Ecstasy مع انعكاسات على الغطاء",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "لقطة مقرّبة لشعار Flying B الأسود اللامع على الغطاء",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "لقطة مقرّبة للعجلة مع غطاء رولز‑رويس وحلقة زخرفية",
    "Complete Fleet": "الأسطول الكامل",
    "Complete fleet hero": "واجهة بطل للأسطول الكامل",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "حلول نقل فاخر شاملة مصممة لكل مناسبة وكل متطلب.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "منظر أمامي ثلاثي للسيارة المكشوفة يُظهر الشبك والمصابيح الأربع والتفاصيل الكروم",
    Crafting: "نصوغ",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "نصوغ تجارب لا مثيل لها منذ تأسيسنا، فكل رحلة مع Chevalier Lane تمثل قمة النقل الفاخر.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "مقعد أمامي من الجلد الكريمي مع لوحة عدادات وتطعيمات من قشرة الجوز الغنية",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "اصنع ذكريات لا تُنسى مع خدمات نقل الزفاف المميزة لدينا. اختر أسطولنا الكلاسيكي الرئيسي للزوجين أو مركبات إضافية لضيوفك.",
    Curated: "مختار بعناية",
    "Details That Matter": "التفاصيل التي تهم",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "اكتشف الطيف الكامل لتجارب النقل الفاخر المصممة لأصحاب الذوق الرفيع الذين لا يقبلون بأقل من الكمال.",
    "Discreet coordination from runway to destination.":
      "تنسيق سري من المدرج إلى الوجهة.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "وصولات أنيقة وسرية للاجتماعات أو التسوق أو البرامج الشخصية.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "رحلات باتجاه واحد أنيقة وسرية صُممت للأزواج واللحظات الحميمة.",
    "Driver's seat with classic Mercedes styling":
      "مقعد السائق بتصميم مرسيدس الكلاسيكي",
    "Driver's wheel with classic Mercedes styling":
      "عجلة القيادة بتصميم مرسيدس الكلاسيكي",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "قمرة قيادة موجهة للسائق مع عجلة متعددة الوظائف وتحكم بالكونسول الأوسط",
    "Elegant front left view showcasing the pagoda's elegant design":
      "منظر أمامي أيسر أنيق يبرز تصميم باغودا",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "هيكل بلون أخضر مزرق أنيق مع خطوط انسيابية وكروم من زاوية مرتفعة",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "رحلات باتجاه واحد أنيقة وسلسة بين المطارات والفنادق والفيلات ومراكز المدن — مصممة وفق جدولك.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "رحلات زفاف أنيقة وسلسة من مواقع المراسم إلى قاعات الاستقبال، وفق جدول يومك الخاص.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "ارتقِ بسفر الأعمال مع حلول نقل راقية وموثوقة. صُممت خدمتنا للنقل المؤسسي للمديرين التنفيذيين ومسافري الأعمال والشركات الساعية لإبهار العملاء والشركاء. نوفر تنسيقًا سلسًا للاجتماعات والمؤتمرات وزيارات عملاء VIP باحترافية وسرية دون مساومة.",
    "Enter a starting location to calculate driving distance.":
      "أدخل موقع الانطلاق لحساب مسافة القيادة.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "كل تفصيل في جولتك الخاصة مخطط بعناية لضمان رحلة لا تُنسى عبر أرقى تجارب النبيذ في البرتغال.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "كل رحلة مع Chevalier Lane هي شهادة على التزامنا بالكمال. من لحظة الحجز حتى الوصول، تُدار كل التفاصيل بدقة لضمان تجربة لا تُنسى.",
    "Exclusive Access": "وصول حصري",
    "Executive time, reserved": "وقت التنفيذيين، محجوز",
    "Experience Excellence": "اختبر التميّز",
    "Experience Luxury Like Never Before": "اختبر الفخامة كما لم تفعل من قبل",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "اكتشف أفضل مناطق النبيذ في البرتغال عبر جولاتنا الخاصة الحصرية. اختر تجربتك المفضلة أدناه وشاهد السعر يتحدث فورًا.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "استمتع بتنقلات مطار مميزة بأسطولنا الفاخر من Tires (مطار كاشكايش). جميع الأسعار خاضعة لضريبة القيمة المضافة 6%.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "استمتع بتنقلات مطار مميزة بأسطولنا الفاخر. توفر مركباتنا الحديثة الراحة والموثوقية والخدمات على متنها للعملاء رفيعي المستوى، بينما تقدم سياراتنا الكلاسيكية تجربة فريدة لا تُنسى. تشمل جميع التنقلات خدمة استقبال أولوية، وتتبع الرحلات، ومساعدة الأمتعة، ودعمًا متعدد اللغات.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "استمتع بنقل باتجاه واحد سلس مع خدمة السائق المميزة لدينا. سواء كنت بحاجة إلى نقل من المطار إلى الفندق أو بين المدن أو أي رحلة من نقطة إلى نقطة، نوفر حلولًا مريحة وموثوقة وراقية مصممة وفق جدولك وتفضيلاتك.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "اختبر الفرق الذي يأتي من أكثر من عقدين من التميّز في النقل الفاخر والالتزام الثابت بالكمال في كل تفصيل.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "عِش روعة قصر يعود للقرن السادس عشر مع إنتاج نبيذ عالمي. توفر جولاتنا الخاصة الحصرية وصولًا حميمًا إلى العقار التاريخي ومجموعات فنية واسعة وتذوق نبيذ فاخر في قلب منطقة النبيذ الشهيرة بالبرتغال.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "عِش لحظات فريدة حقًا تتجاوز النقل الفاخر المعتاد. تجمع تجاربنا الحصرية بين أرقى المركبات ووجهات استثنائية ودخول VIP وخدمات كونسيرج مخصصة. من زيارات الفيلات الخاصة إلى الفعاليات الثقافية الحصرية، نصنع تجارب مُفصّلة تعكس شغفك ورغباتك الفردية.",
    "Explore Options": "استكشف الخيارات",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "استكشف أسطولنا الكامل من الروائع الكلاسيكية والعجائب الحديثة. سواء كنت تبحث عن الأناقة الخالدة أو الفخامة المتطورة، فكل مركبة مُعتنى بها بدقة وجاهزة لرفع مستوى رحلتك القادمة.",
    "Exterior of the Bentley Flying Spur": "الخارجية لسيارة Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "الخارجية لسيارة Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "الخارجية لسيارة Mercedes-Benz S-Class Maybach",
    "First class on the road": "درجة أولى على الطريق",
    "Fold-out walnut picnic trays for rear passengers":
      "طاولات نزهة قابلة للطي من خشب الجوز لركاب الخلف",
    "For Romantic Dates": "للمواعيد الرومانسية",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "للزوجين - استخدام ثابت، صور، مراسم (ضريبة قيمة مضافة 23%)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "تأسست Chevalier Lane في لشبونة، البرتغال، من رؤية بسيطة وعميقة: إعادة تعريف النقل الفاخر من خلال الجمع بين الأناقة الخالدة والرقي الحديث. ما بدأ كمشروع شغف تطور ليصبح خدمة السائق الفاخر الرائدة في البرتغال.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "من Rolls-Royce Silver Cloud إلى الحضور المهيب لـ Bentley Mulsanne، تروي كل مركبة في مجموعتنا قصة من التميّز الهندسي والفخامة بلا تنازلات.",
    "Front grill with classic Mercedes styling":
      "شبك أمامي بتصميم مرسيدس الكلاسيكي",
    "Front right side view of the Bentley Mulsanne":
      "منظر أمامي أيمن لسيارة Bentley Mulsanne",
    "Front view of the Bentley Flying Spur":
      "منظر أمامي لسيارة Bentley Flying Spur",
    "Front view of the Bentley Mulsanne": "منظر أمامي لسيارة Bentley Mulsanne",
    "Front view of the Mercedes-Benz S-Class Maybach": "منظر أمامي لسيارة Mercedes-Benz S-Class Maybach",
    "Full view of the pagoda's elegant design":
      "منظر كامل للتصميم الأنيق لسيارة Pagoda",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "استقبال رشيق وسري يضمن بداية هادئة وأنيقة ليومك الخاص.",
    "Group:": "المجموعة:",
    "Happy Clients": "عملاء سعداء",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "منظر أمامي مباشر لشبك Pantheon المزين بشارات النادي وصادم كروم",
    Highlights: "أبرز النقاط",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "توفر بالساعة لاجتماعات الأعمال والمسارات والجداول التنفيذية.",
    "Immersive Chevalier Lane showcase": "عرض Chevalier Lane الغامر",
    "Includes:": "يشمل:",
    "Interior of the Bentley Flying Spur": "الداخلية لسيارة Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "الداخلية لسيارة Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "الداخلية لسيارة Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "انضم إلى آلاف العملاء المميزين الذين يثقون بـ Chevalier Lane لتحويل الرحلات العادية إلى",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "ملف جانبي طويل ومنخفض يبرز خط الهيكل المنساب وزعانف الخلف",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "لقطة أمامية ثلاثية من زاوية منخفضة تُظهر المصابيح الأربع والشبك",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "منظر جانبي من زاوية منخفضة يبرز الجناح الأمامي والكروم والوقفة",
    "Luxury Tours": "جولات فاخرة",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "تنقلات مطار فاخرة مع خدمة أولوية ومراقبة الرحلات ونقل سلس من مطار Tires إلى وجهتك.",
    "Luxury car interior": "داخلية سيارة فاخرة",
    "Luxury services": "خدمات فاخرة",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "أسطول الزفاف الرئيسي: استخدام ثابت/للزوجين - لا يشمل الديكورات والتصاميم حسب طلب العميل",
    "Mercedes 280SL Pagoda - Driver's Seat": "Mercedes 280SL Pagoda - مقعد السائق",
    "Mercedes 280SL Pagoda - Driver's Wheel": "Mercedes 280SL Pagoda - عجلة القيادة",
    "Mercedes 280SL Pagoda - Front Grill": "Mercedes 280SL Pagoda - الشبك الأمامي",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda - منظر أمامي أيسر",
    "Mercedes 280SL Pagoda - Full View": "Mercedes 280SL Pagoda - منظر كامل",
    "Mercedes 280SL Pagoda - Rear View": "Mercedes 280SL Pagoda - منظر خلفي",
    "Mercedes-Benz S-Class Maybach detail - Exterior": "Mercedes-Benz S-Class Maybach تفصيل - خارجي",
    "Mercedes-Benz S-Class Maybach detail - Front view": "Mercedes-Benz S-Class Maybach تفصيل - منظر أمامي",
    "Mercedes-Benz S-Class Maybach detail - Interior": "Mercedes-Benz S-Class Maybach تفصيل - داخلي",
    "Mercedes-Benz S-Class Maybach detail - Rear view": "Mercedes-Benz S-Class Maybach تفصيل - منظر خلفي",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Mercedes S500 BRABUS تفصيل - لقطة مقرّبة لشعار النجمة على الغطاء",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS خارجي - منظر أمامي مباشر",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS خارجي - منظر أمامي ثلاثي من زاوية منخفضة",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS داخلي - منظر خلفي",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS داخلي - عجلة القيادة والقمرة",
    "Mercedes S500 BRABUS rim": "جنط Mercedes S500 BRABUS",
    "Missing Stripe session reference": "مرجع جلسة Stripe مفقود",
    "Next image": "الصورة التالية",
    "No worries — your Cal.com booking is still reserved. You can restart checkout anytime using the email link we sent or return to the booking page below.":
      "لا تقلق — ما زال حجزك في Cal.com محفوظًا. يمكنك إعادة بدء الدفع في أي وقت عبر رابط البريد الذي أرسلناه أو العودة إلى صفحة الحجز أدناه.",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 خارجي - منظر أمامي ثلاثي مع السقف مفتوح",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 خارجي - ملف جانبي كامل",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 خارجي - منظر خلفي",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 داخلي - لوحة العدادات وعجلة القيادة",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 داخلي - منطقة الركاب الخلفية ولوحة الباب",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 داخلي - منظر واسع للمقصورة",
    "Optional Add-ons:": "إضافات اختيارية:",
    "Our Expertise": "خبرتنا",
    "Our Story": "قصتنا",
    "Our Unique Position": "مكانتنا الفريدة",
    "Our Values": "قيمنا",
    "Payment canceled": "تم إلغاء الدفع",
    "Personal Experience": "تجربة شخصية",
    "Play Lisbon in Motion video": "تشغيل فيديو Lisbon in Motion",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "يرجى تحديد عدد حقائب اليد (المقصورة) والحقائب الكبيرة (المسجلة) التي ستسافر بها.",
    "Premium Transport": "نقل مميز",
    "Previous image": "الصورة السابقة",
    Private: "خاص",
    "Private aviation, perfected": "طيران خاص متقن",
    "Punctual, flexible transportation designed entirely around your pace.":
      "نقل دقيق ومرن مصمم بالكامل وفق إيقاعك.",
    "Ready to Create Your Perfect Experience?": "جاهز لخلق تجربتك المثالية؟",
    "Rear seat and door panel details with chrome window winder and trim":
      "تفاصيل المقعد الخلفي ولوحة الباب مع مقبض نافذة كروم وتطعيمات",
    "Rear view of the Bentley Flying Spur":
      "منظر خلفي لسيارة Bentley Flying Spur",
    "Rear view of the Bentley Mulsanne":
      "منظر خلفي لسيارة Bentley Mulsanne",
    "Rear view of the Mercedes-Benz S-Class Maybach":
      "منظر خلفي لسيارة Mercedes-Benz S-Class Maybach",
    "Rear view of the Mercedes S500 BRABUS":
      "منظر خلفي لسيارة Mercedes S500 BRABUS",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "منظر خلفي لسيارة Silver Shadow مع أضواء خلفية مميزة وتطعيمات كروم",
    "Rear view of the pagoda's elegant design":
      "منظر خلفي لتصميم Pagoda الأنيق",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "مقصورة حمراء وبيضاء تُرى من المقاعد الخلفية مع لوحة العدادات والمقعد الأمامي",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "لمسات زهرية راقية وأشرطة وتفاصيل مخصصة، مرتبة لتكمل احتفالك.",
    "Reserved Availability": "توافر محجوز",
    "Return Home": "العودة إلى الرئيسية",
    "Rim of the Mercedes S500 BRABUS": "جنط Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II خارجي - منظر أمامي ثلاثي",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II داخلي - المقصورة الأمامية ولوحة العدادات",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II داخلي - منظر جانبي أيسر بزاوية مرتفعة",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II داخلي - طاولات نزهة خلفية",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II داخلي - المقعد الخلفي وسقف المقصورة",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Rolls-Royce Silver Shadow تفصيل - Spirit of Ecstasy على الغطاء",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Rolls-Royce Silver Shadow تفصيل - العجلة وغطاء المحور",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow خارجي - منظر أمامي مع شعارات الشبك",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow خارجي - منظر أمامي ثلاثي من زاوية منخفضة",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow خارجي - ملف جانبي منخفض",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow خارجي - منظر خلفي مع الأضواء الخلفية",
    "Scenic routes": "مسارات بانورامية",
    "Service Available": "الخدمة متاحة",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "حجرة خلفية واسعة مع تنجيد جلدي كريمي ولمسات خشبية",
    "Special Requests": "طلبات خاصة",
    "Start Planning": "ابدأ التخطيط",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "منظر خلفي مباشر يظهر الزعانف الخلفية المستوحاة من الصواريخ والأضواء الخلفية",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "منظر مباشر للوحة العدادات مع عدادات مزدوجة وعجلة قيادة كلاسيكية",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "شكرًا لاختيارك Chevalier Lane. تم استلام طلب حجز نقل المطار وسيتواصل فريق الكونسيرج قريبًا لتأكيد التفاصيل وإتمام حجزك.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "شكرًا لاختيارك Chevalier Lane. تم استلام طلب الحجز وسيتواصل فريق الكونسيرج قريبًا لتأكيد التفاصيل وإتمام حجزك.",
    "Thank you for your payment": "شكرًا لدفعك",
    "The Beginning": "البداية",
    "The Bride’s Arrival": "وصول العروس",
    "The principles that guide every decision and shape every experience we create.":
      "المبادئ التي توجه كل قرار وتشكل كل تجربة نصنعها.",
    "Timeless Elegance": "أناقة خالدة",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "حوّل يومك الخاص إلى تجربة لا تُنسى مع خدمات نقل الزفاف المميزة لدينا. توفر مركباتنا الفاخرة الكلاسيكية والحديثة الخلفية المثالية لأغلى لحظاتك. من الوصول إلى المراسم حتى المغادرة من الاستقبال، نضمن إدارة كل جانب من نقل يوم زفافك بأناقة ودقة.",
    "Unable to confirm payment status": "تعذر تأكيد حالة الدفع",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "تعذر تقدير المسافة. تكلفة المركبة تعكس الحد الأدنى للسعر؛ قد يختلف الإجمالي الفعلي.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "راحة وخصوصية ورقي لا مثيل لها — دون أي تنازل.",
    "View other tours": "عرض جولات أخرى",
    "We’ll calculate the transfer distance to your selected experience.":
      "سنحسب مسافة النقل إلى التجربة التي اخترتها.",
    "We’ve received your booking details and the transaction is currently marked as":
      "لقد استلمنا تفاصيل حجزك والمعاملة مصنفة حاليًا كـ",
    "Wide front view highlighting the large grille and swept headlamps":
      "منظر أمامي واسع يبرز الشبك الكبير والمصابيح المسحوبة",
    "Your Time, Perfectly Managed": "وقتك، مُدار بإتقان",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "سائقك الشخصي يقدم تجربة سلسة وسرية ومهتمة من البداية للنهاية.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "مثل: مطار Tires (كاشكايش)، مطار لشبونة",
    "exceptional service": "خدمة استثنائية",
    "extraordinary experiences": "تجارب استثنائية",
    hero: "القسم الرئيسي",
    "more inclusions": "مزيد من الشمولات",
    processing: "جارٍ المعالجة",
    "profile view": "منظر جانبي",
    "through the art of luxury transportation since our founding.":
      "من خلال فن النقل الفاخر منذ تأسيسنا.",
    "unparalleled experiences": "تجارب لا مثيل لها",
    "0-100 km/h in 3.9s": "0-100 كم/س خلال 3.9 ث",
    "1 passenger + professional chauffeur": "راكب واحد + سائق محترف",
    "250 km/h (limited)": "250 كم/س (محددة)",
    "3 passengers + professional chauffeur": "3 ركاب + سائق محترف",
    "4 + professional chauffeur": "4 + سائق محترف",
    "4 passengers + professional chauffeur": "4 ركاب + سائق محترف",
    "621 hp": "621 حصان",
    "9-Speed Automatic": "أوتوماتيك 9 سرعات",
    "9.1 L/100km": "9.1 لتر/100 كم",
    "A design that transcends generations, still turning heads after six decades.":
      "تصميم يتجاوز الأجيال وما زال يجذب الأنظار بعد ستة عقود.",
    "A hand-finished cabin featuring exclusive Maybach details, refined stitching, and a serene atmosphere created for privacy and relaxation.":
      "مقصورة مشطّبة يدويًا بتفاصيل Maybach حصرية وخياطة راقية وأجواء هادئة للخصوصية والاسترخاء.",
    "Authentic representation of mid-20th century American automotive excellence.":
      "تمثيل أصيل لتفوّق السيارات الأمريكية في منتصف القرن العشرين.",
    "British Craftsmanship": "حِرفية بريطانية",
    "Collectible Status": "قيمة اقتنائية",
    "Cultural Icon": "أيقونة ثقافية",
    "Design that influenced modern luxury cars and remains relevant today.":
      "تصميم أثّر في سيارات الفخامة الحديثة وما زال ملائمًا اليوم.",
    "Design that transcends decades, still considered the pinnacle of automotive luxury.":
      "تصميم يتجاوز العقود ولا يزال يُعد قمة الفخامة في عالم السيارات.",
    "Engineering Excellence": "تميّز هندسي",
    "Event Perfect": "مثالي للمناسبات",
    "Every detail meticulously crafted by master artisans in the Rolls-Royce tradition.":
      "كل تفصيل مصنوع بعناية على يد حرفيين خبراء ضمن تقاليد رولز‑رويس.",
    "Experience automotive purity with manual transmission and analog instrumentation.":
      "اختبر نقاء القيادة مع ناقل يدوي وأجهزة قياس تناظرية.",
    "Iconic Pagoda Design": "تصميم باغودا الأيقوني",
    "Impressive power delivery with the unmistakable V8 rumble.":
      "قوة لافتة مع هدير V8 المميز.",
    "Incorporated modern automotive technology while maintaining luxury standards.":
      "دمج التكنولوجيا الحديثة مع الحفاظ على معايير الفخامة.",
    "Legendary Rolls-Royce refinement with unmatched noise isolation and smoothness.":
      "رقي رولز‑رويس الأسطوري مع عزل ضوضاء ونعومة لا مثيل لهما.",
    "Makes any occasion special with its presence and the stories it tells.":
      "يجعل أي مناسبة مميزة بحضوره والقصص التي يرويها.",
    "Maybach Interior & Exterior": "داخلية وخارجية Maybach",
    "Mercedes-Benz build quality and attention to detail that has stood the test of time.":
      "جودة تصنيع مرسيدس‑بنز واهتمام بالتفاصيل صمد عبر الزمن.",
    "Meticulously maintained to preserve its original character and charm.":
      "مُعتنى بها بدقة للحفاظ على طابعها وسحرها الأصليين.",
    "One of the most sought-after classic cars, appreciating in value and prestige.":
      "واحدة من أكثر السيارات الكلاسيكية طلبًا وتزداد قيمةً ومكانةً.",
    "Perfect blend of traditional Rolls-Royce values with contemporary engineering.":
      "مزيج مثالي من قيم رولز‑رويس التقليدية والهندسة المعاصرة.",
    "Period Authenticity": "أصالة الحقبة",
    "Powerful 364 cubic inch V8 engine delivering classic American performance.":
      "محرك V8 بقوة 364 بوصة مكعبة يقدّم أداءً أمريكيًا كلاسيكيًا.",
    "Powerful and refined turbocharged V8 delivering modern performance standards.":
      "محرك V8 بشاحن توربيني قوي وراقي يقدّم معايير أداء حديثة.",
    "Proud bearer of the Royal Warrant, serving British royalty for generations.":
      "حامل فخور للتكليف الملكي، يخدم العائلة المالكة البريطانية عبر أجيال.",
    "Pure Driving Experience": "تجربة قيادة خالصة",
    "Rear-Wheel Drive": "دفع خلفي",
    "Represents an important chapter in American automotive history.":
      "يمثل فصلًا مهمًا في تاريخ السيارات الأمريكية.",
    "Revolutionary self-leveling suspension system providing unparalleled ride comfort.":
      "نظام تعليق ذاتي التسوية ثوري يوفر راحة ركوب لا مثيل لها.",
    "Smooth and powerful 6.2L V8 engine delivering effortless performance.":
      "محرك V8 سعة 6.2 لتر ناعم وقوي يقدّم أداءً بلا عناء.",
    "Spacious cabin designed for business travel and long-distance comfort.":
      "مقصورة رحبة مصممة لسفر الأعمال والراحة في المسافات الطويلة.",
    "The distinctive soft top roof that gives this car its legendary name and status.":
      "السقف القماشي المميز الذي يمنح هذه السيارة اسمها ومكانتها الأسطورية.",
    "The gold standard of automotive excellence and attention to detail.":
      "المعيار الذهبي في التميّز بالسيارات والاهتمام بالتفاصيل.",
    "Timeless styling that captures the essence of 1950s American luxury.":
      "تصميم خالد يلتقط جوهر الفخامة الأمريكية في خمسينيات القرن الماضي.",
    "V8 Power": "قوة V8",
    "V8 Twin-Turbo 4.0L": "V8 توين‑تيربو 4.0 لتر",
  },
  es: {
    "Airport Transfers": "Traslados al aeropuerto",
    "Discreet chauffeur service to and from the airport.": "Traslados de aeropuerto fiables",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "Viajes de negocios",
    "Classic Collection": "Colección clásica",
    "Classic Wedding Fleet": "Flota clásica para bodas",
    "Corporate Transportation": "Transporte corporativo",
    "Executive Vehicles": "Vehículos ejecutivos",
    "Fixed Price Transfers": "Traslados con precio fijo",
    "Flight Tracking": "Seguimiento de vuelos",
    "Chauffeured Transport": "Transporte con chófer",
    "Meeting Coordination": "Coordinación de reuniones",
    "Historic Palaces": "Palacios históricos",
    "Luxury Tours & Scenic Routes": "Tours de lujo y rutas panorámicas",
    "Make Your Own Exclusive Experiences by the Hour": "Crea tus experiencias exclusivas por hora",
    "Modern Luxury Fleet": "Flota de lujo moderna",
    "Modern Transport": "Transporte moderno",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "Transporte de trayecto único",
    "Partner Brands": "Marcas asociadas",
    "Priority Meet & Greet": "Recepción prioritaria",
    "Private Villa Access": "Acceso a villas privadas",
    "Private Wine Tastings": "Catas de vino privadas",
    "Personal Concierge": "Conserje personal",
    "Professional Service": "Servicio profesional",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "Transporte VIP para eventos",
    "Wedding Services": "Servicios para bodas",
    "Wedding Services Description": "Convierte tu día especial en una experiencia inolvidable con nuestro servicio de bodas.",
    About: "Sobre nosotros",
    AboutUs: "Sobre nosotros",
    "A Legacy of Excellence": "Un legado de excelencia",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "Una mirada a los viajes que creamos: desde celebraciones íntimas y llegadas de boda hasta rutas escénicas y eventos corporativos a medida.",
    "Book Your Experience": "Reserva tu experiencia",
    "A professional chauffeur service available by the hour.": "Transporte empresarial profesional",
    Contact: "Contacto",
    ContactUs: "Contáctanos",
    "Contact Us": "Contáctanos",
    "Ready to experience unparalleled luxury transportation?":
      "¿Listo para experimentar un transporte de lujo sin igual?",
    "Get in touch with us today.": "Ponte en contacto con nosotros hoy.",
    "Call Us": "Llámanos",
    "24/7 Available": "Disponible 24/7",
    "Email Us": "Envíanos un email",
    "We respond within 2 hours": "Respondemos en un plazo de 2 horas",
    "Send Us a Message": "Envíanos un mensaje",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "Ya sea que necesites transporte para una ocasión especial, una reunión de negocios o simplemente quieras experimentar el máximo lujo en viajes, estamos aquí para hacerlo realidad.",
    "Message Sent Successfully!": "¡Mensaje enviado con éxito!",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "Gracias por contactarnos. Te responderemos en un plazo de 2 horas.",
    "Full Name *": "Nombre completo *",
    "Your full name": "Tu nombre completo",
    "Email Address *": "Correo electrónico *",
    "your.email@example.com": "tu.email@ejemplo.com",
    "Phone Number": "Número de teléfono",
    "Subject *": "Asunto *",
    "Select a subject": "Selecciona un asunto",
    "Booking Inquiry": "Consulta de reserva",
    "Corporate Services": "Servicios corporativos",
    "Special Event": "Evento especial",
    "General Information": "Información general",
    "Feedback": "Comentarios",
    "Message *": "Mensaje *",
    "Please describe your requirements and any specific details...":
      "Describe tus requisitos y cualquier detalle específico...",
    "Send Message": "Enviar mensaje",
    "Get in Touch": "Ponte en contacto",
    Phone: "Teléfono",
    "Available 24/7 for urgent requests": "Disponible 24/7 para solicitudes urgentes",
    Email: "Correo electrónico",
    Location: "Ubicación",
    "Miraflores, Lisbon": "Miraflores, Lisboa",
    "Serving all of Portugal and beyond": "Ofrecemos servicio en todo Portugal y más allá",
    "Business Hours": "Horario de atención",
    "Monday - Sunday": "Lunes - Domingo",
    "Why Choose Us?": "¿Por qué elegirnos?",
    "Years Experience": "Años de experiencia",
    "Luxury Vehicles": "Vehículos de lujo",
    Satisfaction: "Satisfacción",
    "Ready to Begin Your Journey?": "¿Listo para comenzar tu viaje?",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "Vive la cima del transporte de lujo. Cada detalle creado a la perfección, cada momento diseñado para",
    "unforgettable elegance": "una elegancia inolvidable",
    "Call Now": "Llama ahora",
    "Send Email": "Enviar email",
    "Direct premium transportation between locations.": "Transporte de trayecto único conveniente",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "Disfruta de un transporte de trayecto único sin interrupciones con nuestro servicio premium de chófer. Soluciones de transporte de lujo punto a punto adaptadas a tu horario.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "Eleva tus viajes de negocios con soluciones de transporte sofisticadas y fiables, diseñadas para ejecutivos y empresas que buscan impresionar a sus clientes.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "Disfruta de traslados premium al aeropuerto con nuestra flota de lujo. Servicio prioritario de meet & greet, seguimiento de vuelos y traslados sin interrupciones desde Tires (Aeropuerto de Cascais).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "Transforma tu día especial en una experiencia inolvidable con nuestros servicios de transporte para bodas. Vehículos de lujo clásicos y modernos para tus momentos más preciados.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "Vive momentos únicos e irrepetibles que van más allá del transporte de lujo habitual. Acceso VIP, visitas a villas privadas y experiencias a medida.",
    "Curated Experiences": "Experiencias seleccionadas",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "Cada viaje con Chevalier Lane está meticulosamente diseñado para superar expectativas, ofreciendo un servicio inigualable que convierte momentos ordinarios en recuerdos extraordinarios.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "Disfruta de un transporte de lujo con nuestro servicio premium de chófer. Reserva tu vehículo y destinos a continuación.",
    "Exclusive Services": "Servicios exclusivos",
    "Explore Our Fleet": "Explora nuestra flota",
    "Private chauffeur-driven tours and experiences.": "Visitas guiadas y experiencias turísticas",
    "Immersive Journey": "Viaje inmersivo",
    "Learn More": "Saber más",
    "Lisbon in Motion": "Lisboa en movimiento",
    "Luxury Concierge & Boutique Chauffeur Service": "Conserjería de lujo y servicio de chófer boutique",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "Desde la elegancia de Rolls-Royce hasta el confort moderno de Bentley en Lisboa — viaja con distinción inigualable.",
    "Moments in Motion": "Momentos en movimiento",
    "Private chauffeur experience in Lisbon": "Experiencia de chófer privado en Lisboa",
    "Professional chauffeur services for all your transportation needs":
      "Servicios profesionales de chófer para todas tus necesidades de transporte",
    "Service": "Servicio",
    "Signature Services": "Servicios exclusivos",
    "Timeless elegance with our classic luxury vehicles":
      "Elegancia atemporal con nuestros vehículos clásicos de lujo",
    "Tours": "Tours",
    "We Tailor Every Experience to You": "Adaptamos cada experiencia a ti",
    "Weddings": "Bodas",
    "of": "de",
    "Private Chauffeur Service": "Servicio de chófer privado",
    Services: "Servicios",
    "Our Services": "Nuestros servicios",
    "One-Way Services": "Servicios de trayecto único",
    "Classic Fleet": "Flota clásica",
    "Modern Fleet": "Flota moderna",
    Language: "Idioma",
    "Luxury transportation services": "Servicios de transporte de lujo",
    "Classic Fleet Overview": "Resumen de flota clásica",
    "Modern Fleet Overview": "Resumen de flota moderna",
    "About Us": "Sobre nosotros",
    "Contemporary luxury with cutting-edge technology":
      "Lujo contemporáneo con tecnología de vanguardia",
    "Contact Info": "Información de contacto",
    "Toggle menu": "Abrir/cerrar menú",
    "24/7 Service Available": "Servicio disponible 24/7",
    "All rights reserved.": "Todos los derechos reservados.",
    "Exclusive Fleet": "Flota exclusiva",
    "Reserve": "Reservar",
    "Explore": "Explorar",
    "About This Vehicle": "Sobre este vehículo",
    "Specifications": "Especificaciones",
    "Key Features": "Características clave",
    "Pricing Options": "Opciones de precios",
    "Reserve This Vehicle": "Reservar este vehículo",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "Contacta con nuestro equipo de conserjería para organizar tu transporte exclusivo.",
    "Call Concierge": "Llamar al conserje",
    "Signature Collection": "Colección exclusiva",
    "Book Your Car": "Reserva tu coche",
    "Explore Fleet": "Explorar flota",
    "Our Complete Fleet": "Nuestra flota completa",
    "Ready to Experience Luxury?": "¿Listo para vivir el lujo?",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "Elige de nuestra exquisita colección y deja que nuestros chóferes profesionales te transporten con un estilo y confort incomparables.",
    "Book Your Vehicle": "Reserva tu vehículo",
    "View Services": "Ver servicios",
    "Available Soon": "Disponible pronto",
    "Currently unavailable": "Actualmente no disponible",
    "Pricing shown at secure checkout": "Precio mostrado en el pago seguro",
    "View Details": "Ver detalles",
    "Book Your Service": "Reserva tu servicio",
    "Find Out Prices": "Consultar precios",
    "Explore Services": "Explorar servicios",
    "Complete Service Portfolio": "Portafolio completo de servicios",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "Nuestro Bentley Mulsanne insignia estará disponible pronto para servicios seleccionados.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "Desde el transporte de lujo diario hasta experiencias únicas, nuestro portafolio garantiza que cada viaje refleje la máxima sofisticación y excelencia.",
    "Cutting-edge luxury with the latest automotive technology":
      "Lujo de vanguardia con la última tecnología automotriz",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "Experimenta la cima de la excelencia automotriz moderna con nuestra flota contemporánea, que incluye vehículos de lujo con tecnología de última generación y confort sin concesiones.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "La máxima expresión de la ingeniería alemana, que combina potencia, lujo y tecnología de vanguardia.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "El lujo británico redefinido: el Mulsanne ofrece un confort y una sofisticación incomparables para el viajero exigente.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "La cúspide del lujo y la sofisticación, el Mercedes-Benz S-Class Maybach ofrece un confort y un prestigio inigualables.",
    "V8 Twin-Turbo Engine": "Motor V8 biturbo",
    "BRABUS Performance": "Rendimiento BRABUS",
    "Executive Comfort": "Confort ejecutivo",
    "Advanced Tech": "Tecnología avanzada",
    "Handcrafted Interior": "Interior artesanal",
    "Air Suspension": "Suspensión neumática",
    "Executive Seating": "Asientos ejecutivos",
    "V12 Engine": "Motor V12",
    "Executive Rear Seating": "Asientos traseros ejecutivos",
    "Premium Materials": "Materiales premium",
    "Advanced Technology": "Tecnología avanzada",
    "Twin-Turbo V8 Power": "Potencia V8 biturbo",
    "Luxury Interior": "Interior de lujo",
    "Safety First": "Seguridad ante todo",
    "Fuel Efficiency": "Eficiencia de combustible",
    "Rear Entertainment Suite": "Sistema de entretenimiento trasero",
    "British Heritage": "Herencia británica",
    "V12 engine": "Motor V12",
    "Premium sound system": "Sistema de sonido premium",
    "Engine": "Motor",
    "Power": "Potencia",
    "Transmission": "Transmisión",
    "Top Speed": "Velocidad máxima",
    "Acceleration": "Aceleración",
    "Fuel Economy": "Consumo de combustible",
    "Drive Type": "Tipo de tracción",
    "Passengers": "Pasajeros",
    "Luggage": "Equipaje",
    "3 suitcases + 2 bags": "3 maletas + 2 bolsos",
    "2 suitcases + 2 bags": "2 maletas + 2 bolsos",
    "Base rate (max. 25km)": "Tarifa base (máx. 25 km)",
    "Additional per km": "Adicional por km",
    "Classic": "Clásico",
    "Modern": "Moderno",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "La máxima expresión del lujo británico: el Silver Cloud II ofrece un refinamiento y prestigio incomparables.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "Una obra maestra de la ingeniería automotriz: el Silver Shadow entrega potencia y lujo en perfecta armonía.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "Experimenta la herencia automotriz estadounidense con el potente y elegante Oldsmobile Super 88.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "El icónico Mercedes 280SL Pagoda representa la excelencia automotriz de la era dorada del motor.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "La elegancia británica se une al rendimiento deportivo en este icónico Jaguar XJ6, un verdadero clásico del diseño automotriz.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "La máxima expresión del lujo británico: el Double Six Daimler combina la potencia V12 con un refinamiento inigualable.",
    "Timeless elegance from the golden age of motoring":
      "Elegancia atemporal de la época dorada del automovilismo",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "Descubre nuestra colección cuidadosamente seleccionada de automóviles clásicos, cada uno representando la cima de la artesanía automotriz de una era de sofisticación y estilo.",
    "V8 Engine": "Motor V8",
    "Silent Ride": "Conducción silenciosa",
    "Royal Heritage": "Herencia real",
    "V8 Turbo Engine": "Motor V8 turbo",
    "Hydropneumatic Suspension": "Suspensión hidroneumática",
    "Modern Classic": "Clásico moderno",
    "V8 Rocket Engine": "Motor V8 Rocket",
    "American Classic": "Clásico americano",
    "Powerful Performance": "Rendimiento potente",
    "Retro Design": "Diseño retro",
    "Classic Design": "Diseño clásico",
    "Perfect for Events": "Perfecto para eventos",
    "Straight-6 Engine": "Motor de seis cilindros en línea",
    "British Luxury": "Lujo británico",
    "Sporting Heritage": "Herencia deportiva",
    "Timeless Design": "Diseño atemporal",
    "Daimler Luxury": "Lujo Daimler",
    "British Prestige": "Prestigio británico",
    "Base rate (max. 20km)": "Tarifa base (máx. 20 km)",
    "Additional km": "Kilómetro adicional",
    "Subject to request": "Sujeto a solicitud",
    "Pricing": "Precios",
    "1 suitcase + 2 bags": "1 maleta + 2 bolsos",
    "1 suitcase + 1 bag": "1 maleta + 1 bolso",
    "3 suitcases + 3 bags": "3 maletas + 3 bolsos",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "Cabina espaciosa con asientos ejecutivos perfecta para viajes de negocios y trayectos largos, con relajante función de masaje.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "Asientos de cuero premium con función de masaje y climatización para el máximo confort.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "Sistema de infoentretenimiento de última generación con navegación, conectividad y asistencias al conductor.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "Mejorado con potenciación BRABUS que ofrece rendimiento y refinamiento excepcionales.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "Interior artesanal con materiales premium y meticulosa atención al detalle.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "Sistemas de seguridad completos, incluido control de crucero adaptativo y asistente de mantenimiento de carril.",
    "Optimized engine management for balanced performance and efficiency.":
      "Gestión de motor optimizada para equilibrar rendimiento y eficiencia.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "Cada detalle meticulosamente elaborado por maestros artesanos con los mejores materiales.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "Potente motor V8 biturbo de 6,75 L que ofrece rendimiento y refinamiento sin esfuerzo.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "El avanzado sistema de suspensión neumática brinda comodidad y calidad de marcha incomparables.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "Las últimas funciones de infoentretenimiento y conectividad integradas con lujo.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "Gran pantalla de alta resolución para que los pasajeros disfruten de TV y medios con total comodidad.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "Orgullosa continuación de la legendaria herencia y artesanía de Bentley.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "El Bentley Flying Spur cuenta con un motor V12 que ofrece un rendimiento y refinamiento excepcionales.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "El Bentley Flying Spur está equipado con un sistema de sonido premium que ofrece calidad de audio excepcional.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "El Bentley Flying Spur es un coche británico, fabricado en el Reino Unido.",
    "Luxury Lifestyle": "Estilo de vida de lujo",
    "Wine Tasting": "Cata de vinos",
    "View previous experience": "Ver experiencia anterior",
    "View next experience": "Ver siguiente experiencia",
    "View previous service": "Ver servicio anterior",
    "View next service": "Ver siguiente servicio",
    "Go to service": "Ir al servicio",
    "Distinguished Partnerships": "Alianzas distinguidas",
    "Trusted Collaborations": "Colaboraciones de confianza",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "Trabajamos de la mano con marcas y líderes de opinión para ofrecer viajes fluidos e inolvidables a sus huéspedes más exigentes.",
    "Expand your brand presence with Chevalier Lane": "Amplía la presencia de tu marca con Chevalier Lane",
    "Reserve Your Place": "Reserva tu lugar",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "Únete a un círculo exclusivo de personas exigentes que entienden que el verdadero lujo no es solo el destino, sino el propio viaje.",
    "Available Service": "Servicio disponible",
    Premium: "Premium",
    "Fleet Selection": "Selección de flota",
    Elite: "Élite",
    "Client Experience": "Experiencia del cliente",
    "Elegant chauffeur-driven transportation for weddings.": "Transporte elegante para bodas",
    "Prices are Subject to VAT": "Los precios están sujetos a IVA",
    "Why Choose Us": "Por qué elegirnos",
    "Flexible point-to-point luxury transportation solutions":
      "Soluciones de transporte de lujo punto a punto flexibles",
    Features: "Características",
    "Vehicle Options": "Opciones de vehículos",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "Reservar traslado de ida",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "Traslados desde Tires (Aeropuerto de Cascais) - Precio fijo para 25 km",
    "Modern Fleet Services": "Servicios de flota moderna",
    "Book Airport Transfer": "Reservar traslado al aeropuerto",
    "Professional excellence for business travel and client relations":
      "Excelencia profesional para viajes de negocios y relaciones con clientes",
    "Business Features": "Características para negocios",
    "Corporate Packages": "Paquetes corporativos",
    "Starting price (min. 2h)": "Precio inicial (mín. 2h)",
    "Monthly Corporate Plan": "Plan corporativo mensual",
    "Corporate Inquiry": "Consulta corporativa",
    "Main Wedding Fleet": "Flota principal para bodas",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "Transporte adicional",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "Reservar transporte de boda",
    "Exclusive Private Wine Experiences": "Experiencias privadas de vino exclusivas",
    "Tour Experiences": "Experiencias de tour",
    "Featured Experiences": "Experiencias destacadas",
    "From €7 pp": "Desde 7 € por persona",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "Desde 15 € por persona",
    "Premium Wine Experiences": "Experiencias de vino premium",
    "€75-€250 pp": "75€-250€ por persona",
    "Explore Tours": "Explorar tours",
    "Exclusive Experiences": "Experiencias exclusivas",
    "VIP Services": "Servicios VIP",
    "Exclusive Packages": "Paquetes exclusivos",
    "VIP Cultural Experience": "Experiencia cultural VIP",
    "Private Estate Tour": "Visita privada a finca",
    "Bespoke Experience": "Experiencia a medida",
    "Create Exclusive Experience": "Crear experiencia exclusiva",
    "Why Choose Chevalier Lane": "Por qué elegir Chevalier Lane",
    "Contact Concierge": "Contactar con el concierge",
    "Always Available": "Disponible 24/7",
    Instant: "Instantánea",
    "Quote Response": "Respuesta de cotización",
    Global: "Global",
    "Service Coverage": "Cobertura de servicio",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "Contacta con nuestro equipo de conserjería para hablar de tus necesidades de transporte y descubre cómo podemos elevar tu próximo viaje.",
    "Bentley Mulsanne city transfer": "Bentley Mulsanne city transfer",
    "ONE-WAY TRANSPORTATION": "ONE-WAY TRANSPORTATION",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur": "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II": "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "Professional Chauffeur Service",
    "Real-time GPS Tracking": "Real-time GPS Tracking",
    "Flexible Scheduling": "Flexible Scheduling",
    "Professional Chauffeur": "Professional Chauffeur",
    "Complimentary Water": "Complimentary Water",
    "Premium bottled water included in every journey.": "Premium bottled water included in every journey.",
    "All-Inclusive Pricing": "All-Inclusive Pricing",
    "No hidden extras — congestion charges, tolls, and taxes included.": "No hidden extras — congestion charges, tolls, and taxes included.",
    "Champagne & Drinks on Request": "Champagne & Drinks on Request",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.": "Enhance your journey with chilled champagne, wine, or other beverages upon request.",
    "Comfort & Convenience": "Comfort & Convenience",
    "Beautifully maintained vehicles offering a refined and relaxing environment.": "Beautifully maintained vehicles offering a refined and relaxing environment.",
    "From Point A to Point B": "From Point A to Point B",
    "Corporate transportation": "Corporate transportation",
    "Executive Vehicle Fleet": "Executive Vehicle Fleet",
    "Confidentiality Assured": "Confidentiality Assured",
    "Professional Presentation": "Professional Presentation",
    "Corporate Account Management": "Corporate Account Management",
    "Invoice & Expense Tracking": "Invoice & Expense Tracking",
    "Book Your Corporate Transfer": "Book Your Corporate Transfer",
    "Flexibility for Business Travel": "Flexibility for Business Travel",
    "Book on demand or in advance for complete control of your schedule.": "Book on demand or in advance for complete control of your schedule.",
    "Work Comfortably Onboard": "Work Comfortably Onboard",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.": "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.",
    "Charging & Connectivity": "Charging & Connectivity",
    "Multiple charging ports available for phones, laptops, and devices.": "Multiple charging ports available for phones, laptops, and devices.",
    "In-Car Entertainment": "In-Car Entertainment",
    "Screens and multimedia systems available for presentations or relaxation.": "Screens and multimedia systems available for presentations or relaxation.",
    "Discreet & Reliable Service": "Discreet & Reliable Service",
    "Designed for executives who value privacy, punctuality, and comfort.": "Designed for executives who value privacy, punctuality, and comfort.",
    "Discreet Business Transfers": "Discreet Business Transfers",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.": "Professional, discreet, and reliable business transfers for executives, clients, and partners.",
    "Luxury airport meet & greet service": "Luxury airport meet & greet service",
    "Seamless airport transportation": "Seamless airport transportation",
    "Transfers from Cascais Airport and Lisbon Airport": "Transfers from Cascais Airport and Lisbon Airport",
    "Modern and Classic Fleet Services": "Modern and Classic Fleet Services",
    "Optional extra vehicle for luggage": "Optional extra vehicle for luggage",
    "Priority meet & greet service": "Priority meet & greet service",
    "Flight tracking & monitoring": "Flight tracking & monitoring",
    "Private terminal access": "Private terminal access",
    "Luggage assistance": "Luggage assistance",
    "Real-time arrival updates": "Real-time arrival updates",
    "Multi-language support": "Multi-language support",
    "Flight Monitoring": "Flight Monitoring",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.": "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.",
    "Waiting & Parking Included": "Waiting & Parking Included",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.": "Enjoy 30 minutes of complimentary waiting time for airport arrivals.",
    "Meet & Greet Service": "Meet & Greet Service",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.": "Your chauffeur will welcome you inside the terminal with a personalised name sign.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.": "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.",
    "Luggage Assistance": "Luggage Assistance",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.": "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.",
    "Premium Airport Transfers": "Premium Airport Transfers",
    "Rolls-Royce Silver Cloud II wedding transport": "Rolls-Royce Silver Cloud II wedding transport",
    "Rolls-Royce Silver Shadow wedding ceremony": "Rolls-Royce Silver Shadow wedding ceremony",
    "Oldsmobile Super 88 wedding chauffeur": "Oldsmobile Super 88 wedding chauffeur",
    "Wedding transportation": "Wedding transportation",
    "From Ceremony to Reception in Style and Elegance": "From Ceremony to Reception in Style and Elegance",
    "Extra Wedding Transport Vehicles": "Extra Wedding Transport Vehicles",
    "Decorations and designs available as extras": "Decorations and designs available as extras",
    "Minimum 3 hours booking required": "Minimum 3 hours booking required",
    "Basic Decoration (artificial or simple natural flowers + ribbons)": "Basic Decoration (artificial or simple natural flowers + ribbons)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)": "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)": "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
    "Book Your Wedding Transport": "Book Your Wedding Transport",
    "Free Ribbons": "Free Ribbons",
    "Complimentary ribbons and colour options available to match your wedding theme.": "Complimentary ribbons and colour options available to match your wedding theme.",
    "Chauffeur Arrival 20 Minutes Early": "Chauffeur Arrival 20 Minutes Early",
    "Your driver arrives ahead of time to ensure a calm and seamless start.": "Your driver arrives ahead of time to ensure a calm and seamless start.",
    "Classic Cars for the Ceremony": "Classic Cars for the Ceremony",
    "Choose from our iconic vintage collection for the bride or groom's arrival.": "Choose from our iconic vintage collection for the bride or groom's arrival.",
    "Modern Luxury Cars for Guests": "Modern Luxury Cars for Guests",
    "Elegant modern vehicles available for transporting family and guests.": "Elegant modern vehicles available for transporting family and guests.",
    "Flexible Journey Planning": "Flexible Journey Planning",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.": "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.",
    "Decor & Personalisation": "Decor & Personalisation",
    "Custom decoration options to make your day truly unique.": "Custom decoration options to make your day truly unique.",
    "From Ceremony to Reception": "From Ceremony to Reception",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation": "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation",
    "Exclusive experience inside luxury Bentley interior": "Exclusive experience inside luxury Bentley interior",
    "VIP Event Transportation": "VIP Event Transportation",
    "Exclusive Cultural Experiences": "Exclusive Cultural Experiences",
    "Personal Concierge Service": "Personal Concierge Service",
    "Bespoke Itinerary Creation": "Bespoke Itinerary Creation",
    "Luxury Accommodation Coordination": "Luxury Accommodation Coordination",
    "(Full Day Rate)": "(Tarifa de día completo)",
    "A confirmation email has been sent to": "Se ha enviado un correo de confirmación a",
    "Additional Information": "Información adicional",
    Airline: "Aerolínea",
    "Airline is required": "La aerolínea es obligatoria",
    Approximately: "Aproximadamente",
    "At least 1 trip required for transport bookings":
      "Se requiere al menos 1 viaje para reservas de transporte",
    Book: "Reservar",
    "Book Your Airport Transfer": "Reserva tu traslado al aeropuerto",
    "Book Your Luxury Tour": "Reserva tu tour de lujo",
    "Book Your One-Way Transfer": "Reserva tu traslado de ida",
    "Book by the Hour": "Reserva por hora",
    "By the Hour | Full Day": "Por horas | Día completo",
    "Book Full Day": "Reservar día completo",
    "Booking Confirmed!": "¡Reserva confirmada!",
    "Booking Details": "Detalles de la reserva",
    "Booking Summary": "Resumen de la reserva",
    "Calculating Price...": "Calculando precio...",
    "Calculating distance...": "Calculando distancia...",
    "Calculating price...": "Calculando precio...",
    "Calculating route...": "Calculando ruta...",
    "Calculating...": "Calculando...",
    "Preparing your price request...": "Preparando tu solicitud de precio...",
    "Contact us for pricing": "Contáctanos para precios",
    "Do you need vehicles for guest transport?":
      "¿Necesitas vehículos para el transporte de invitados?",
    "How many vehicles do you need?": "¿Cuántos vehículos necesitas?",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "Para transportar a los invitados y al cortejo de boda. Solo hay vehículos modernos disponibles.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "Primero confirmaremos la disponibilidad y luego verás el total final en la página de pago segura de Stripe.",
    "Decoration Options (Optional)": "Opciones de decoración (opcional)",
    "Decoration Price (€)": "Precio de decoración (€)",
    "Distance to Experience": "Distancia a la experiencia",
    "Distance:": "Distancia:",
    "Drop-off Location": "Lugar de destino",
    "Drop-off location is required": "El lugar de destino es obligatorio",
    Duration: "Duración",
    "Duration (Hours)": "Duración (horas)",
    "Duration is required": "La duración es obligatoria",
    "Duration:": "Duración:",
    "Email is required": "El correo electrónico es obligatorio",
    "Enter decoration price": "Introduce el precio de la decoración",
    "Enter your first name": "Introduce tu nombre",
    "Enter your last name": "Introduce tus apellidos",
    "Event Start Time": "Hora de inicio del evento",
    "Event date is required": "La fecha del evento es obligatoria",
    "Event time is required": "La hora del evento es obligatoria",
    "Extra Vehicle:": "Vehículo extra:",
    "Extra vehicle for luggage": "Vehículo extra para equipaje",
    "Final Destination": "Destino final",
    "Final Location": "Ubicación final",
    "Final destination is required": "El destino final es obligatorio",
    "Final location is required": "La ubicación final es obligatoria",
    "First Name": "Nombre",
    "First name is required": "El nombre es obligatorio",
    "Flight Information": "Información del vuelo",
    "Flight Number": "Número de vuelo",
    "Flight number is required": "El número de vuelo es obligatorio",
    "For transporting wedding guests and party (6% VAT)":
      "Para transportar a los invitados de boda y comitiva (6% IVA)",
    "Guest Transport": "Transporte de invitados",
    "Hand Luggage": "Equipaje de mano",
    "Hourly rates from €250": "Tarifas por hora desde 250 €",
    Includes: "Incluye",
    "Large Luggage": "Equipaje grande",
    "Last Name": "Apellidos",
    "Last name is required": "Los apellidos son obligatorios",
    "Luggage Information": "Información de equipaje",
    "Main Fleet": "Flota principal",
    "Make a Special Request": "Hacer una solicitud especial",
    Max: "Máx.",
    Maximum: "Máximo",
    "Maximum 6 trips per booking, 2 trips per hour":
      "Máximo 6 viajes por reserva, 2 viajes por hora",
    Min: "Mín.",
    Minimum: "Mínimo",
    "Minimum 3 hours required": "Se requieren al menos 3 horas",
    "Minimum 3 hours required for main fleet bookings":
      "Se requieren al menos 3 horas para reservas de flota principal",
    "Missing Cal.com configuration. Please try again later.":
      "Falta la configuración de Cal.com. Inténtalo de nuevo más tarde.",
    "Missing Cal.com username. Please configure":
      "Falta el usuario de Cal.com. Configura",
    "Missing Cal.com username. Please set":
      "Falta el usuario de Cal.com. Establece",
    No: "No",
    "No decoration": "Sin decoración",
    "Note:": "Nota:",
    "Number of Participants": "Número de participantes",
    "Number of Passengers": "Número de pasajeros",
    "Number of Trips": "Número de viajes",
    "Optional Add-ons": "Extras opcionales",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Azeitão)",
    "Participants & Options": "Participantes y opciones",
    Passenger: "Pasajero",
    "Per-trip rates from €100": "Tarifas por viaje desde 100 €",
    "Personal Information": "Información personal",
    "Phone number is required": "El número de teléfono es obligatorio",
    "Pickup Location": "Lugar de recogida",
    "Pickup location is required": "El lugar de recogida es obligatorio",
    Piece: "Pieza",
    Pieces: "Piezas",
    "Please Complete the Form": "Completa el formulario",
    "Please Enter Locations": "Introduce las ubicaciones",
    "Please Enter Locations & Flight Details":
      "Introduce ubicaciones y detalles del vuelo",
    "Please Enter Starting Location": "Introduce el lugar de inicio",
    "Please Select a Vehicle": "Selecciona un vehículo",
    "Please complete the pricing details before scheduling.":
      "Completa los detalles de precios antes de programar.",
    "Please enter a starting location": "Introduce un lugar de inicio",
    "Please enter a valid email address":
      "Introduce un correo electrónico válido",
    "Please enter both pickup and drop-off locations":
      "Introduce tanto el lugar de recogida como el de destino",
    "Please enter both starting location and destination":
      "Introduce el lugar de inicio y el destino",
    "Please enter flight number and airline":
      "Introduce el número de vuelo y la aerolínea",
    "Please fix the following errors:\n":
      "Por favor corrige los siguientes errores:\n",
    "Please select a tour option": "Selecciona una opción de tour",
    "Please select a tour option to continue.":
      "Selecciona una opción de tour para continuar.",
    "Please select a vehicle": "Selecciona un vehículo",
    "Please select a vehicle for the tour":
      "Selecciona un vehículo para el tour",
    "Please select a vehicle for the tour.":
      "Selecciona un vehículo para el tour.",
    "Please select a vehicle to continue.":
      "Selecciona un vehículo para continuar.",
    "Please select a vehicle to proceed":
      "Selecciona un vehículo para continuar",
    "Please select a vehicle to schedule with Cal.com.":
      "Selecciona un vehículo para programar con Cal.com.",
    "Preparing secure payment...": "Preparando pago seguro...",
    "Price Summary": "Resumen de precios",
    "Price:": "Precio:",
    "Schedule & Pay": "Programar y pagar",
    "Select Your Tour Experience": "Selecciona tu experiencia de tour",
    "Select Your Vehicle": "Selecciona tu vehículo",
    "Selected Vehicle": "Vehículo seleccionado",
    "Service Type": "Tipo de servicio",
    "Starting Location": "Lugar de inicio",
    "Starting from": "Desde",
    "Starting location is required": "El lugar de inicio es obligatorio",
    "Stripe checkout session URL missing.":
      "Falta la URL de la sesión de pago de Stripe.",
    "Total Price": "Precio total",
    "Total Price:": "Precio total:",
    "Transfer Details": "Detalles del traslado",
    "Transfer Summary": "Resumen del traslado",
    Transport: "Transporte",
    "Trip Details": "Detalles del viaje",
    "Trip Summary": "Resumen del viaje",
    "Unable to create Stripe checkout session.":
      "No se pudo crear la sesión de pago de Stripe.",
    "Unable to create a Stripe checkout session.":
      "No se pudo crear la sesión de pago de Stripe.",
    VAT: "IVA",
    "Vehicle:": "Vehículo:",
    "We were unable to calculate a quote for this transfer.":
      "No pudimos calcular un presupuesto para este traslado.",
    "Wedding Date": "Fecha de la boda",
    "Wedding Event Details": "Detalles del evento de boda",
    Yes: "Sí",
    "e.g., Ceremony Venue, Reception Hall":
      "p. ej., lugar de la ceremonia, salón de recepción",
    "e.g., Hotel, Church, Home": "p. ej., hotel, iglesia, casa",
    "e.g., Lisbon Airport, Hotel": "p. ej., Aeropuerto de Lisboa, hotel",
    "e.g., Lisbon Airport, Hotel Name":
      "p. ej., Aeropuerto de Lisboa, nombre del hotel",
    "e.g., Lisbon City Center, Hotel Name":
      "p. ej., Centro de Lisboa, nombre del hotel",
    "e.g., Porto City Center, Algarve Resort":
      "p. ej., Centro de Oporto, resort en Algarve",
    "e.g., TAP Air Portugal, Iberia":
      "p. ej., TAP Air Portugal, Iberia",
    "e.g., TP 1234, IB 5678": "p. ej., TP 1234, IB 5678",
    extra: "extra",
    "from your pickup location to": "desde tu lugar de recogida hasta",
    h: "h",
    hour: "hora",
    hours: "horas",
    km: "km",
    "km included": "km incluidos",
    participant: "participante",
    participants: "participantes",
    "participants allowed for this tour": "participantes permitidos para este tour",
    "participants required for this tour": "participantes requeridos para este tour",
    "per km": "por km",
    "per person": "por persona",
    pp: "pp",
    "the experience": "la experiencia",
    trip: "viaje",
    trips: "viajes",
    "your@email.com": "tu@email.com",
    "A Ceremony of Distinction": "Una ceremonia de distinción",
    "A Commitment to Excellence": "Un compromiso con la excelencia",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "Un legado de excelencia construido sobre la pasión, la precisión y un compromiso inquebrantable con",
    "AZEITÃO": "AZEITÃO",
    "About Chevalier Lane": "Acerca de Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "Postura agresiva en tres cuartos delanteros con llantas multirradio y parrilla cromada",
    "Amount:": "Importe:",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "Un servicio por horas que ofrece flexibilidad, discreción y disponibilidad ininterrumpida.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "Cualquier requisito dietético, necesidad de accesibilidad, idiomas preferidos o solicitudes especiales...",
    "Any special requirements, accessibility needs, or additional services...":
      "Cualquier requisito especial, necesidad de accesibilidad o servicios adicionales...",
    "Any special requirements, decoration details, or additional services...":
      "Cualquier requisito especial, detalles de decoración o servicios adicionales...",
    "Arrive in first class": "Llegue en primera clase",
    "Arrive with Confidence": "Llegue con confianza",
    "Arrive with Elegance": "Llegue con elegancia",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "Como la única empresa en Lisboa que ofrece vehículos de lujo clásicos y modernos, unimos la herencia automotriz con la excelencia contemporánea. Nuestra colección abarca desde los icónicos Mercedes Pagoda de los años 60 hasta los Bentley Mulsanne de última generación.",
    "Back to Tours": "Volver a Tours",
    "Back to Wedding Bookings": "Volver a reservas de bodas",
    "Back to wedding services": "Volver a servicios de bodas",
    "Because how you arrive matters as much as where you’re going.":
      "Porque cómo llegas importa tanto como a dónde vas.",
    "Bentley Flying Spur detail - Exterior":
      "Detalle del Bentley Flying Spur - Exterior",
    "Bentley Flying Spur detail - Front view":
      "Detalle del Bentley Flying Spur - Vista frontal",
    "Bentley Flying Spur detail - Interior":
      "Detalle del Bentley Flying Spur - Interior",
    "Bentley Flying Spur detail - Rear view":
      "Detalle del Bentley Flying Spur - Vista trasera",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Detalle del Bentley Mulsanne - primer plano del emblema Flying B en el capó",
    "Bentley Mulsanne detail - Front view":
      "Detalle del Bentley Mulsanne - Vista frontal",
    "Bentley Mulsanne detail - Interior":
      "Detalle del Bentley Mulsanne - Interior",
    "Bentley Mulsanne detail - Rear view":
      "Detalle del Bentley Mulsanne - Vista trasera",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne vista frontal derecha - Exterior",
    "Bentley Mulsanne profile detail":
      "Detalle de perfil del Bentley Mulsanne",
    "Bentley Mulsanne rear quarter detail":
      "Detalle del cuarto trasero del Bentley Mulsanne",
    "Bentley Mulsanne side view - Exterior":
      "Bentley Mulsanne vista lateral - Exterior",
    "Book Your Tour": "Reserva tu tour",
    "Book another transfer": "Reservar otro traslado",
    "Change language": "Cambiar idioma",
    Chauffeur: "Chófer",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "Llegadas con chófer con privacidad, comodidad y detalle refinado. A solicitud, una selección de vinos, champán y refrigerios a medida.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "Transiciones con chófer entre el hogar, la ceremonia y la recepción, gestionadas con precisión y cuidado.",
    "Checking Stripe...": "Comprobando Stripe...",
    "Chevalier Lane Logo": "Logo de Chevalier Lane",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "Chevalier Lane ha redefinido el transporte de lujo, siendo la única empresa en Lisboa que ofrece tanto lujo moderno como elegancia clásica.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "Los traslados en coches clásicos incluyen un vehículo adicional (Range Rover Vogue) para equipaje por",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "Frontal clásico con prominente capó y defensas cromadas",
    "Classic heritage and modern innovation in one exclusive collection":
      "Herencia clásica e innovación moderna en una colección exclusiva",
    "Close-up of the Mercedes bonnet star and grille badge":
      "Primer plano de la estrella del capó Mercedes y la insignia de la parrilla",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "Primer plano del Spirit of Ecstasy con reflejos en el capó",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "Primer plano del emblema Flying B negro brillante en el capó",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "Primer plano de la rueda con tapacubo Rolls-Royce y aro embellecedor",
    "Complete Fleet": "Flota completa",
    "Complete fleet hero": "Hero de la flota completa",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "Soluciones integrales de transporte de lujo adaptadas a cada ocasión y necesidad.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "Vista frontal de tres cuartos del convertible que muestra la parrilla, los faros cuádruples y detalles cromados",
    Crafting: "Creando",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "Creando experiencias incomparables desde nuestra fundación, cada viaje con Chevalier Lane representa la cúspide del transporte de lujo.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "Banco delantero de cuero crema con tablero y molduras en chapa de nogal",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "Crea recuerdos inolvidables con nuestros servicios premium de transporte para bodas. Elige nuestra flota clásica principal para la pareja o vehículos adicionales para tus invitados.",
    Curated: "Seleccionado",
    "Details That Matter": "Detalles que importan",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "Descubre el espectro completo de experiencias de transporte de lujo creadas para personas exigentes que no aceptan menos que la perfección.",
    "Discreet coordination from runway to destination.":
      "Coordinación discreta desde la pista hasta el destino.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "Llegadas discretas y elegantes para reuniones, compras o itinerarios personales.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "Viajes de ida discretos y elegantes diseñados para parejas y momentos íntimos.",
    "Driver's seat with classic Mercedes styling":
      "Asiento del conductor con estilo clásico de Mercedes",
    "Driver's wheel with classic Mercedes styling":
      "Volante del conductor con estilo clásico de Mercedes",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "Cabina enfocada al conductor con volante multifunción y controles en la consola central",
    "Elegant front left view showcasing the pagoda's elegant design":
      "Elegante vista frontal izquierda que muestra el diseño de la pagoda",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "Carrocería verde azulado elegante con líneas fluidas y detalles brillantes desde un ángulo elevado",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "Viajes de ida elegantes y sin interrupciones entre aeropuertos, hoteles, villas y centros urbanos, adaptados a tu horario.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "Viajes de boda elegantes y sin interrupciones desde los lugares de la ceremonia hasta los salones de recepción, adaptados a la cronología de tu día especial.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "Eleva tus viajes de negocios con soluciones de transporte sofisticadas y fiables. Nuestro servicio de transporte corporativo está diseñado para ejecutivos, viajeros de negocios y empresas que desean impresionar a clientes y socios. Ofrecemos coordinación impecable para reuniones, conferencias y visitas VIP con profesionalidad y confidencialidad inquebrantables.",
    "Enter a starting location to calculate driving distance.":
      "Introduce un lugar de inicio para calcular la distancia de conducción.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "Cada detalle de tu tour privado se planifica meticulosamente para garantizar un viaje inolvidable por las experiencias vinícolas más exclusivas de Portugal.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "Cada viaje con Chevalier Lane es un testimonio de nuestra dedicación a la perfección. Desde el momento en que haces tu reserva hasta el instante en que llegas a tu destino, cada detalle se orquesta meticulosamente para garantizar una experiencia inolvidable.",
    "Exclusive Access": "Acceso exclusivo",
    "Executive time, reserved": "Tiempo ejecutivo, reservado",
    "Experience Excellence": "Experimente la excelencia",
    "Experience Luxury Like Never Before": "Viva el lujo como nunca antes",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "Descubre las mejores regiones vinícolas de Portugal con nuestros tours privados exclusivos. Selecciona tu experiencia preferida y ve cómo se actualiza el precio en tiempo real.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "Disfruta de traslados premium al aeropuerto con nuestra flota de lujo desde Tires (Aeropuerto de Cascais). Todos los precios están sujetos a un 6% de IVA.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "Disfruta de traslados premium al aeropuerto con nuestra flota de lujo. Nuestros vehículos modernos ofrecen comodidad, fiabilidad y amenidades a bordo para clientes de alto perfil, mientras que nuestros coches clásicos brindan una experiencia única y memorable. Todos los traslados incluyen servicio prioritario de meet & greet, seguimiento de vuelos, asistencia de equipaje y soporte multilingüe.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "Disfruta de un transporte de ida sin interrupciones con nuestro servicio premium de chófer. Ya sea desde el aeropuerto a tu hotel, entre ciudades o cualquier trayecto punto a punto, ofrecemos soluciones cómodas, fiables y sofisticadas adaptadas a tu horario y preferencias.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "Experimenta la diferencia que proviene de más de dos décadas de excelencia en transporte de lujo y un compromiso inquebrantable con la perfección en cada detalle.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "Vive la grandeza de un palacio del siglo XVI combinado con producción vinícola de clase mundial. Nuestros tours privados exclusivos ofrecen acceso íntimo a la finca histórica, extensas colecciones de arte y catas premium en el corazón de la región vinícola más renombrada de Portugal.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "Vive momentos verdaderamente únicos que trascienden el transporte de lujo ordinario. Nuestras experiencias exclusivas combinan los mejores vehículos con destinos extraordinarios, acceso VIP y servicios de conserjería personalizados. Desde visitas a villas privadas hasta eventos culturales exclusivos, creamos experiencias a medida que reflejan tus pasiones y deseos.",
    "Explore Options": "Explorar opciones",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "Explora nuestra flota completa de obras maestras clásicas y maravillas modernas. Ya sea que busques elegancia atemporal o lujo de vanguardia, cada vehículo está meticulosamente mantenido y listo para elevar tu próximo viaje.",
    "Exterior of the Bentley Flying Spur": "Exterior del Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "Exterior del Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "Exterior del Mercedes-Benz S-Class Maybach",
    "First class on the road": "Primera clase en la carretera",
    "Fold-out walnut picnic trays for rear passengers":
      "Bandejas de picnic abatibles de nogal para los pasajeros traseros",
    "For Romantic Dates": "Para citas románticas",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "Para la pareja - uso estacionario, fotos, ceremonias (23% IVA)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "Fundada en Lisboa, Portugal, Chevalier Lane surgió de una visión simple pero profunda: redefinir el transporte de lujo combinando elegancia atemporal con sofisticación moderna. Lo que comenzó como un proyecto de pasión se ha convertido en el principal servicio de chófer de lujo de Portugal.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "Desde un Rolls-Royce Silver Cloud hasta la imponente presencia de un Bentley Mulsanne, cada vehículo de nuestra colección cuenta una historia de excelencia en ingeniería y lujo sin concesiones.",
    "Front grill with classic Mercedes styling":
      "Parrilla frontal con estilo clásico de Mercedes",
    "Front right side view of the Bentley Mulsanne":
      "Vista frontal derecha del Bentley Mulsanne",
    "Front view of the Bentley Flying Spur":
      "Vista frontal del Bentley Flying Spur",
    "Front view of the Bentley Mulsanne": "Vista frontal del Bentley Mulsanne",
    "Front view of the Mercedes-Benz S-Class Maybach":
      "Vista frontal del Mercedes-Benz S-Class Maybach",
    "Full view of the pagoda's elegant design":
      "Vista completa del diseño elegante de la pagoda",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "Recogida elegante y discreta que garantiza un comienzo tranquilo y elegante de tu día especial.",
    "Group:": "Grupo:",
    "Happy Clients": "Clientes satisfechos",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "Vista frontal de la parrilla Pantheon adornada con insignias de clubes y parachoques cromado",
    Highlights: "Destacados",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "Disponibilidad por horas para reuniones de negocios, itinerarios y agendas ejecutivas.",
    "Immersive Chevalier Lane showcase":
      "Presentación inmersiva de Chevalier Lane",
    "Includes:": "Incluye:",
    "Interior of the Bentley Flying Spur": "Interior del Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "Interior del Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "Interior del Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "Únase a miles de clientes exigentes que confían en Chevalier Lane para transformar viajes ordinarios en",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "Perfil lateral largo y bajo que destaca la línea de carrocería y las aletas",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "Toma en tres cuartos frontales a baja altura que muestra los faros cuádruples y la parrilla",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "Vista lateral a baja altura que enfatiza el guardabarros delantero, las molduras cromadas y la postura",
    "Luxury Tours": "Tours de lujo",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "Traslados de lujo al aeropuerto con servicio prioritario, seguimiento de vuelos y transporte sin interrupciones desde el Aeropuerto de Tires hasta tu destino.",
    "Luxury car interior": "Interior de coche de lujo",
    "Luxury services": "Servicios de lujo",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "Flota principal de bodas: estacionaria/uso por la pareja - no incluye decoraciones y diseños solicitados por el cliente",
    "Mercedes 280SL Pagoda - Driver's Seat":
      "Mercedes 280SL Pagoda - Asiento del conductor",
    "Mercedes 280SL Pagoda - Driver's Wheel":
      "Mercedes 280SL Pagoda - Volante del conductor",
    "Mercedes 280SL Pagoda - Front Grill":
      "Mercedes 280SL Pagoda - Parrilla frontal",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda - Vista frontal izquierda",
    "Mercedes 280SL Pagoda - Full View":
      "Mercedes 280SL Pagoda - Vista completa",
    "Mercedes 280SL Pagoda - Rear View":
      "Mercedes 280SL Pagoda - Vista trasera",
    "Mercedes-Benz S-Class Maybach detail - Exterior":
      "Detalle del Mercedes-Benz S-Class Maybach - Exterior",
    "Mercedes-Benz S-Class Maybach detail - Front view":
      "Detalle del Mercedes-Benz S-Class Maybach - Vista frontal",
    "Mercedes-Benz S-Class Maybach detail - Interior":
      "Detalle del Mercedes-Benz S-Class Maybach - Interior",
    "Mercedes-Benz S-Class Maybach detail - Rear view":
      "Detalle del Mercedes-Benz S-Class Maybach - Vista trasera",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Detalle del Mercedes S500 BRABUS - primer plano de la estrella del capó",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS exterior - vista frontal de frente",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS exterior - vista frontal de tres cuartos a baja altura",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS interior - vista trasera",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS interior - volante y cabina",
    "Mercedes S500 BRABUS rim": "Llanta del Mercedes S500 BRABUS",
    "Missing Stripe session reference":
      "Falta la referencia de la sesión de Stripe",
    "Next image": "Imagen siguiente",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 exterior - vista frontal de tres cuartos con capota bajada",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 exterior - perfil lateral completo",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 exterior - vista trasera",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 interior - tablero y volante",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 interior - zona de pasajeros trasera y panel de puerta",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 interior - vista amplia de la cabina",
    "Optional Add-ons:": "Complementos opcionales:",
    "Our Expertise": "Nuestra experiencia",
    "Our Story": "Nuestra historia",
    "Our Unique Position": "Nuestra posición única",
    "Our Values": "Nuestros valores",
    "Payment canceled": "Pago cancelado",
    "Personal Experience": "Experiencia personal",
    "Play Lisbon in Motion video":
      "Reproducir video de Lisboa en movimiento",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "Indica la cantidad de equipaje de mano y equipaje grande (facturado) con el que viajarás.",
    "Premium Transport": "Transporte premium",
    "Previous image": "Imagen anterior",
    Private: "Privado",
    "Private aviation, perfected": "Aviación privada, perfeccionada",
    "Punctual, flexible transportation designed entirely around your pace.":
      "Transporte puntual y flexible diseñado completamente a tu ritmo.",
    "Ready to Create Your Perfect Experience?":
      "¿Listo para crear tu experiencia perfecta?",
    "Rear seat and door panel details with chrome window winder and trim":
      "Detalles del asiento trasero y panel de puerta con manivela de ventana cromada y molduras",
    "Rear view of the Bentley Flying Spur":
      "Vista trasera del Bentley Flying Spur",
    "Rear view of the Bentley Mulsanne":
      "Vista trasera del Bentley Mulsanne",
    "Rear view of the Mercedes-Benz S-Class Maybach":
      "Vista trasera del Mercedes-Benz S-Class Maybach",
    "Rear view of the Mercedes S500 BRABUS":
      "Vista trasera del Mercedes S500 BRABUS",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "Vista trasera del Silver Shadow con luces traseras distintivas y molduras cromadas",
    "Rear view of the pagoda's elegant design":
      "Vista trasera del diseño elegante de la pagoda",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "Interior rojo y blanco visto desde los asientos traseros con tablero y banco delantero",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "Toques florales refinados, lazos y detalles personalizados, dispuestos para complementar tu celebración.",
    "Reserved Availability": "Disponibilidad reservada",
    "Return Home": "Volver al inicio",
    "Rim of the Mercedes S500 BRABUS": "Llanta del Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II exterior - vista frontal de tres cuartos",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II interior - cabina delantera y tablero",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II interior - vista lateral izquierda en ángulo alto",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II interior - mesas de picnic traseras",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II interior - asiento trasero y tapizado del techo",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Detalle del Rolls-Royce Silver Shadow - Spirit of Ecstasy en el capó",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Detalle del Rolls-Royce Silver Shadow - rueda y tapacubo",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow exterior - vista frontal con insignias en la parrilla",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow exterior - vista frontal de tres cuartos a baja altura",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow exterior - perfil lateral bajo",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow exterior - vista trasera con luces traseras",
    "Scenic routes": "Rutas escénicas",
    "Service Available": "Servicio disponible",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "Amplio compartimento trasero con tapicería de cuero crema y detalles en madera",
    "Special Requests": "Solicitudes especiales",
    "Start Planning": "Comenzar a planificar",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "Vista trasera frontal con aletas y luces traseras inspiradas en cohetes",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "Vista frontal del tablero con doble cuadro de instrumentos y volante clásico",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Gracias por elegir Chevalier Lane. Tu solicitud de traslado al aeropuerto ha sido recibida y nuestro equipo de conserjería se pondrá en contacto contigo en breve para confirmar los detalles y finalizar tu reserva.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Gracias por elegir Chevalier Lane. Tu solicitud de reserva ha sido recibida y nuestro equipo de conserjería se pondrá en contacto contigo en breve para confirmar los detalles y finalizar tu reserva.",
    "Thank you for your payment": "Gracias por su pago",
    "The Beginning": "El comienzo",
    "The Bride’s Arrival": "La llegada de la novia",
    "The principles that guide every decision and shape every experience we create.":
      "Los principios que guían cada decisión y dan forma a cada experiencia que creamos.",
    "Timeless Elegance": "Elegancia atemporal",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "Transforma tu día especial en una experiencia inolvidable con nuestros servicios premium de transporte para bodas. Nuestros vehículos clásicos y modernos de lujo brindan el escenario perfecto para tus momentos más preciados. Desde las llegadas a la ceremonia hasta las salidas de la recepción, cuidamos cada aspecto del transporte de tu boda con elegancia y precisión.",
    "Unable to confirm payment status":
      "No se pudo confirmar el estado del pago",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "No se pudo estimar la distancia. El costo del vehículo refleja el precio mínimo; el total real puede variar.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "Comodidad, privacidad y refinamiento sin rival, sin compromisos.",
    "View other tours": "Ver otros tours",
    "We’ll calculate the transfer distance to your selected experience.":
      "Calcularemos la distancia del traslado a tu experiencia seleccionada.",
    "Wide front view highlighting the large grille and swept headlamps":
      "Vista frontal amplia que resalta la gran parrilla y los faros estilizados",
    "Your Time, Perfectly Managed": "Tu tiempo, perfectamente gestionado",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "Tu conductor personal brinda una experiencia fluida, discreta y atenta de principio a fin.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "p. ej., Aeropuerto de Tires (Cascais), Aeropuerto de Lisboa",
    "exceptional service": "servicio excepcional",
    "extraordinary experiences": "experiencias extraordinarias",
    hero: "hero",
    "more inclusions": "más inclusiones",
    processing: "procesando",
    "profile view": "vista de perfil",
    "through the art of luxury transportation since our founding.":
      "a través del arte del transporte de lujo desde nuestra fundación.",
    "unparalleled experiences": "experiencias incomparables",
  },
  pt: {
    "Airport Transfers": "Transfers de aeroporto",
    "Discreet chauffeur service to and from the airport.": "Transfers de aeroporto confiáveis",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "Viagens de negócios",
    "Classic Collection": "Coleção clássica",
    "Classic Wedding Fleet": "Frota clássica para casamentos",
    "Corporate Transportation": "Transporte corporativo",
    "Executive Vehicles": "Veículos executivos",
    "Fixed Price Transfers": "Transfers com preço fixo",
    "Flight Tracking": "Acompanhamento de voos",
    "Chauffeured Transport": "Transporte com motorista",
    "Meeting Coordination": "Coordenação de reuniões",
    "Historic Palaces": "Palácios históricos",
    "Luxury Tours & Scenic Routes": "Tours de luxo e rotas panorâmicas",
    "Make Your Own Exclusive Experiences by the Hour": "Crie experiências exclusivas por hora",
    "Modern Luxury Fleet": "Frota de luxo moderna",
    "Modern Transport": "Transporte moderno",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "Transporte de ida",
    "Partner Brands": "Marcas parceiras",
    "Priority Meet & Greet": "Recepção prioritária",
    "Private Villa Access": "Acesso a villas privadas",
    "Private Wine Tastings": "Degustações de vinho privadas",
    "Personal Concierge": "Concierge pessoal",
    "Professional Service": "Serviço profissional",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "Transporte VIP para eventos",
    "Wedding Services": "Serviços para casamentos",
    "Wedding Services Description": "Transforme seu grande dia em uma experiência inesquecível com nosso serviço de casamentos.",
    About: "Sobre",
    AboutUs: "Sobre nós",
    "A Legacy of Excellence": "Um legado de excelência",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "Um vislumbre das viagens que criamos — de celebrações íntimas e chegadas de casamento a rotas panorâmicas e eventos corporativos sob medida.",
    "Book Your Experience": "Reserve a sua experiência",
    "A professional chauffeur service available by the hour.": "Transporte corporativo profissional",
    Contact: "Contato",
    ContactUs: "Contate-nos",
    "Ready to experience unparalleled luxury transportation?":
      "Pronto para viver um transporte de luxo incomparável?",
    "Get in touch with us today.": "Entre em contato conosco hoje.",
    "Call Us": "Ligue para nós",
    "24/7 Available": "Disponível 24/7",
    "Email Us": "Envie-nos um email",
    "We respond within 2 hours": "Respondemos em até 2 horas",
    "Send Us a Message": "Envie-nos uma mensagem",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "Se você precisa de transporte para uma ocasião especial, reunião de negócios ou simplesmente deseja viver o auge do luxo em viagens, estamos aqui para fazer acontecer.",
    "Message Sent Successfully!": "Mensagem enviada com sucesso!",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "Obrigado por entrar em contato. Retornaremos em até 2 horas.",
    "Full Name *": "Nome completo *",
    "Your full name": "Seu nome completo",
    "Email Address *": "Endereço de email *",
    "your.email@example.com": "seu.email@exemplo.com",
    "Phone Number": "Número de telefone",
    "Subject *": "Assunto *",
    "Select a subject": "Selecione um assunto",
    "Booking Inquiry": "Consulta de reserva",
    "Corporate Services": "Serviços corporativos",
    "Special Event": "Evento especial",
    "General Information": "Informações gerais",
    "Feedback": "Feedback",
    "Message *": "Mensagem *",
    "Please describe your requirements and any specific details...":
      "Descreva seus requisitos e quaisquer detalhes específicos...",
    "Send Message": "Enviar mensagem",
    "Get in Touch": "Entre em contato",
    Phone: "Telefone",
    "Available 24/7 for urgent requests": "Disponível 24/7 para solicitações urgentes",
    Email: "Email",
    Location: "Localização",
    "Miraflores, Lisbon": "Miraflores, Lisboa",
    "Serving all of Portugal and beyond": "Atendemos todo Portugal e além",
    "Business Hours": "Horário de atendimento",
    "Monday - Sunday": "Segunda - Domingo",
    "Why Choose Us?": "Por que escolher-nos?",
    "Years Experience": "Anos de experiência",
    "Luxury Vehicles": "Veículos de luxo",
    Satisfaction: "Satisfação",
    "Ready to Begin Your Journey?": "Pronto para começar sua jornada?",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "Experimente o auge do transporte de luxo. Cada detalhe criado com perfeição, cada momento pensado para",
    "unforgettable elegance": "uma elegância inesquecível",
    "Call Now": "Ligue agora",
    "Send Email": "Enviar email",
    "Direct premium transportation between locations.": "Transporte de ida conveniente",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "Vivencie um transporte de ida sem interrupções com nosso serviço premium de motorista. Soluções de transporte de luxo ponto a ponto adaptadas ao seu horário.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "Eleve suas viagens de negócios com soluções de transporte sofisticadas e confiáveis, projetadas para executivos e empresas que desejam impressionar clientes.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "Experimente transfers premium para o aeroporto com nossa frota de luxo. Serviço prioritário de meet & greet, acompanhamento de voos e transfers sem interrupções a partir de Tires (Aeroporto de Cascais).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "Transforme seu dia especial em uma experiência inesquecível com nossos serviços de transporte para casamentos. Veículos de luxo clássicos e modernos para seus momentos mais queridos.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "Viva momentos realmente únicos que vão além do transporte de luxo comum. Acesso VIP, visitas a villas privadas e experiências sob medida.",
    "Curated Experiences": "Experiências selecionadas",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "Cada viagem com a Chevalier Lane é cuidadosamente elaborada para superar expectativas, oferecendo um serviço incomparável que transforma momentos comuns em memórias extraordinárias.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "Experimente transporte de luxo com nosso serviço premium de motorista. Reserve seu veículo e destinos abaixo.",
    "Exclusive Services": "Serviços exclusivos",
    "Explore Our Fleet": "Explore a nossa frota",
    "Private chauffeur-driven tours and experiences.": "Passeios guiados e experiências turísticas",
    "Immersive Journey": "Jornada imersiva",
    "Learn More": "Saiba mais",
    "Lisbon in Motion": "Lisboa em movimento",
    "Luxury Concierge & Boutique Chauffeur Service": "Concierge de luxo e serviço de motorista boutique",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "Da elegância Rolls-Royce ao conforto moderno da Bentley em Lisboa — viaje com distinção incomparável.",
    "Moments in Motion": "Momentos em movimento",
    "Private chauffeur experience in Lisbon": "Experiência de motorista privado em Lisboa",
    "Professional chauffeur services for all your transportation needs":
      "Serviços profissionais de motorista para todas as suas necessidades de transporte",
    "Service": "Serviço",
    "Signature Services": "Serviços exclusivos",
    "Timeless elegance with our classic luxury vehicles":
      "Elegância atemporal com nossos veículos clássicos de luxo",
    "Tours": "Passeios",
    "We Tailor Every Experience to You": "Personalizamos cada experiência para você",
    "Weddings": "Casamentos",
    "of": "de",
    "Private Chauffeur Service": "Serviço de motorista privado",
    Services: "Serviços",
    "Our Services": "Nossos serviços",
    "One-Way Services": "Serviços de ida",
    "Classic Fleet": "Frota clássica",
    "Modern Fleet": "Frota moderna",
    Language: "Idioma",
    "Luxury transportation services": "Serviços de transporte de luxo",
    "Classic Fleet Overview": "Visão geral da frota clássica",
    "Modern Fleet Overview": "Visão geral da frota moderna",
    "About Us": "Sobre nós",
    "Contact Us": "Contate-nos",
    "Contemporary luxury with cutting-edge technology":
      "Luxo contemporâneo com tecnologia de ponta",
    "Contact Info": "Informações de contato",
    "Toggle menu": "Abrir/fechar menu",
    "24/7 Service Available": "Serviço 24/7 disponível",
    "All rights reserved.": "Todos os direitos reservados.",
    "Exclusive Fleet": "Frota exclusiva",
    "Reserve": "Reservar",
    "Explore": "Explorar",
    "About This Vehicle": "Sobre este veículo",
    "Specifications": "Especificações",
    "Key Features": "Principais características",
    "Pricing Options": "Opções de preço",
    "Reserve This Vehicle": "Reservar este veículo",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "Contacte nossa equipa de concierge para organizar o seu transporte exclusivo.",
    "Call Concierge": "Ligar para o concierge",
    "Signature Collection": "Coleção exclusiva",
    "Book Your Car": "Reserve seu carro",
    "Explore Fleet": "Explorar frota",
    "Our Complete Fleet": "Nossa frota completa",
    "Ready to Experience Luxury?": "Pronto para experimentar luxo?",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "Escolha na nossa coleção e deixe nossos motoristas profissionais transportá-lo com estilo e conforto incomparáveis.",
    "Book Your Vehicle": "Reserve seu veículo",
    "View Services": "Ver serviços",
    "Available Soon": "Disponível em breve",
    "Currently unavailable": "Atualmente indisponível",
    "Pricing shown at secure checkout": "Preço mostrado no checkout seguro",
    "View Details": "Ver detalhes",
    "Book Your Service": "Reserve seu serviço",
    "Find Out Prices": "Descobrir preços",
    "Explore Services": "Explorar serviços",
    "Complete Service Portfolio": "Portfólio completo de serviços",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "O nosso Bentley Mulsanne emblemático estará disponível em breve para serviços selecionados.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "Do transporte de luxo diário às experiências únicas, nosso portfólio garante que cada viagem reflita o auge da sofisticação e excelência.",
    "Cutting-edge luxury with the latest automotive technology":
      "Luxo de ponta com a mais recente tecnologia automotiva",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "Viva o auge da excelência automotiva moderna com nossa frota contemporânea, com veículos de luxo avançados e conforto absoluto.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "A expressão máxima da engenharia alemã, combinando potência, luxo e tecnologia de ponta.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "O luxo britânico redefinido: o Mulsanne oferece conforto e sofisticação incomparáveis para o viajante exigente.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "O ápice do luxo e da sofisticação, o Mercedes-Benz S-Class Maybach oferece conforto e prestígio inigualáveis.",
    "V8 Twin-Turbo Engine": "Motor V8 biturbo",
    "BRABUS Performance": "Performance BRABUS",
    "Executive Comfort": "Conforto executivo",
    "Advanced Tech": "Tecnologia avançada",
    "Handcrafted Interior": "Interior artesanal",
    "Air Suspension": "Suspensão a ar",
    "Executive Seating": "Assentos executivos",
    "V12 Engine": "Motor V12",
    "Executive Rear Seating": "Assentos traseiros executivos",
    "Premium Materials": "Materiais premium",
    "Advanced Technology": "Tecnologia avançada",
    "Twin-Turbo V8 Power": "Potência V8 biturbo",
    "Luxury Interior": "Interior de luxo",
    "Safety First": "Segurança em primeiro lugar",
    "Fuel Efficiency": "Eficiência de combustível",
    "Rear Entertainment Suite": "Sistema de entretenimento traseiro",
    "British Heritage": "Herança britânica",
    "V12 engine": "Motor V12",
    "Premium sound system": "Sistema de som premium",
    "Engine": "Motor",
    "Power": "Potência",
    "Transmission": "Transmissão",
    "Top Speed": "Velocidade máxima",
    "Acceleration": "Aceleração",
    "Fuel Economy": "Consumo de combustível",
    "Drive Type": "Tipo de tração",
    "Passengers": "Passageiros",
    "Luggage": "Bagagem",
    "3 suitcases + 2 bags": "3 malas + 2 bolsas",
    "2 suitcases + 2 bags": "2 malas + 2 bolsas",
    "Base rate (max. 25km)": "Tarifa base (máx. 25 km)",
    "Additional per km": "Adicional por km",
    "Classic": "Clássico",
    "Modern": "Moderno",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "O auge do luxo britânico: o Silver Cloud II oferece refinamento e prestígio incomparáveis.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "Uma obra-prima da engenharia automotiva: o Silver Shadow entrega potência e luxo em perfeita harmonia.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "Experimente a herança automotiva americana com o poderoso e elegante Oldsmobile Super 88.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "O icônico Mercedes 280SL Pagoda representa a excelência automotiva da era dourada do automobilismo.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "Elegância britânica encontra desempenho esportivo neste icônico Jaguar XJ6, um verdadeiro clássico do design automotivo.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "A máxima expressão do luxo britânico, o Double Six Daimler combina potência V12 com refinamento incomparável.",
    "Timeless elegance from the golden age of motoring":
      "Elegância atemporal da era dourada do automobilismo",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "Descubra nossa coleção cuidadosamente selecionada de automóveis clássicos, cada um representando o auge da arte automotiva de uma era de sofisticação e estilo.",
    "V8 Engine": "Motor V8",
    "Silent Ride": "Condução silenciosa",
    "Royal Heritage": "Herança real",
    "V8 Turbo Engine": "Motor V8 turbo",
    "Hydropneumatic Suspension": "Suspensão hidropneumática",
    "Modern Classic": "Clássico moderno",
    "V8 Rocket Engine": "Motor V8 Rocket",
    "American Classic": "Clássico americano",
    "Powerful Performance": "Performance poderosa",
    "Retro Design": "Design retrô",
    "Classic Design": "Design clássico",
    "Perfect for Events": "Perfeito para eventos",
    "Straight-6 Engine": "Motor de seis cilindros em linha",
    "British Luxury": "Luxo britânico",
    "Sporting Heritage": "Herança esportiva",
    "Timeless Design": "Design atemporal",
    "Daimler Luxury": "Luxo Daimler",
    "British Prestige": "Prestígio britânico",
    "Base rate (max. 20km)": "Tarifa base (máx. 20 km)",
    "Additional km": "Km adicional",
    "Subject to request": "Sob consulta",
    "Pricing": "Preços",
    "1 suitcase + 2 bags": "1 mala + 2 bolsas",
    "1 suitcase + 1 bag": "1 mala + 1 bolsa",
    "3 suitcases + 3 bags": "3 malas + 3 bolsas",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "Cabine espaçosa com assentos executivos, ideal para viagens de negócios e longas distâncias, com função de massagem relaxante.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "Bancos de couro premium com função de massagem e climatização para máximo conforto.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "Sistema de infoentretenimento de última geração com navegação, conectividade e assistências ao condutor.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "Potencializado pelas melhorias BRABUS, oferecendo desempenho e refinamento excepcionais.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "Interior artesanal com materiais premium e atenção meticulosa aos detalhes.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "Sistemas de segurança completos, incluindo controle de cruzeiro adaptativo e assistente de faixa.",
    "Optimized engine management for balanced performance and efficiency.":
      "Gestão de motor otimizada para equilibrar desempenho e eficiência.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "Cada detalhe é meticulosamente criado por mestres artesãos com os melhores materiais.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "Potente motor V8 biturbo de 6,75 L que entrega desempenho e refinamento sem esforço.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "Sistema de suspensão a ar avançado que oferece conforto e qualidade de condução incomparáveis.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "Recursos de infoentretenimento e conectividade de última geração integrados ao luxo.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "Tela grande de alta resolução para que os passageiros aproveitem TV e mídia com total conforto.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "Orgulhosa continuação da lendária herança e tradição artesanal da Bentley.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "O Bentley Flying Spur é movido por um motor V12, oferecendo desempenho e refinamento excepcionais.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "O Bentley Flying Spur vem com um sistema de som premium, oferecendo qualidade de áudio excepcional.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "O Bentley Flying Spur é um carro britânico, fabricado no Reino Unido.",
    "Luxury Lifestyle": "Estilo de vida de luxo",
    "Wine Tasting": "Prova de vinhos",
    "View previous experience": "Ver experiência anterior",
    "View next experience": "Ver próxima experiência",
    "View previous service": "Ver serviço anterior",
    "View next service": "Ver próximo serviço",
    "Go to service": "Ir para o serviço",
    "Distinguished Partnerships": "Parcerias distintas",
    "Trusted Collaborations": "Colaborações de confiança",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "Trabalhamos lado a lado com marcas de elite e formadores de opinião para oferecer viagens perfeitas e inesquecíveis aos hóspedes mais exigentes.",
    "Expand your brand presence with Chevalier Lane": "Expanda a presença da sua marca com a Chevalier Lane",
    "Reserve Your Place": "Reserve seu lugar",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "Junte-se a um círculo exclusivo de pessoas exigentes que entendem que o verdadeiro luxo não está apenas no destino, mas na própria jornada.",
    "Available Service": "Serviço disponível",
    Premium: "Premium",
    "Fleet Selection": "Seleção de frota",
    Elite: "Elite",
    "Client Experience": "Experiência do cliente",
    "Elegant chauffeur-driven transportation for weddings.": "Transporte elegante para casamentos",
    "Prices are Subject to VAT": "Preços sujeitos a IVA",
    "Why Choose Us": "Por que nos escolher",
    "Flexible point-to-point luxury transportation solutions":
      "Soluções de transporte de luxo ponto a ponto flexíveis",
    Features: "Recursos",
    "Vehicle Options": "Opções de veículos",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "Reservar transfer de ida",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "Transfers de Tires (Aeroporto de Cascais) - Preço fixo para 25 km",
    "Modern Fleet Services": "Serviços da frota moderna",
    "Book Airport Transfer": "Reservar transfer de aeroporto",
    "Professional excellence for business travel and client relations":
      "Excelência profissional para viagens de negócios e relacionamento com clientes",
    "Business Features": "Recursos corporativos",
    "Corporate Packages": "Pacotes corporativos",
    "Starting price (min. 2h)": "Preço inicial (mín. 2h)",
    "Monthly Corporate Plan": "Plano corporativo mensal",
    "Corporate Inquiry": "Consulta corporativa",
    "Main Wedding Fleet": "Frota principal para casamentos",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "Transporte adicional",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "Reservar transporte de casamento",
    "Exclusive Private Wine Experiences": "Experiências de vinho privadas exclusivas",
    "Tour Experiences": "Experiências de tour",
    "Featured Experiences": "Experiências em destaque",
    "From €7 pp": "Desde €7 por pessoa",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "Desde €15 por pessoa",
    "Premium Wine Experiences": "Experiências de vinho premium",
    "€75-€250 pp": "€75-€250 por pessoa",
    "Explore Tours": "Explorar passeios",
    "Exclusive Experiences": "Experiências exclusivas",
    "VIP Services": "Serviços VIP",
    "Exclusive Packages": "Pacotes exclusivos",
    "VIP Cultural Experience": "Experiência cultural VIP",
    "Private Estate Tour": "Tour em propriedade privada",
    "Bespoke Experience": "Experiência sob medida",
    "Create Exclusive Experience": "Criar experiência exclusiva",
    "Why Choose Chevalier Lane": "Por que escolher a Chevalier Lane",
    "Contact Concierge": "Contactar o concierge",
    "Always Available": "Sempre disponível",
    Instant: "Instantânea",
    "Quote Response": "Resposta de orçamento",
    Global: "Global",
    "Service Coverage": "Cobertura de serviço",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "Contacte nossa equipa de concierge para discutir suas necessidades de transporte e descubra como podemos elevar sua próxima viagem.",
    "Bentley Mulsanne city transfer": "Bentley Mulsanne city transfer",
    "ONE-WAY TRANSPORTATION": "ONE-WAY TRANSPORTATION",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur": "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II": "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "Professional Chauffeur Service",
    "Real-time GPS Tracking": "Real-time GPS Tracking",
    "Flexible Scheduling": "Flexible Scheduling",
    "Professional Chauffeur": "Professional Chauffeur",
    "Complimentary Water": "Complimentary Water",
    "Premium bottled water included in every journey.": "Premium bottled water included in every journey.",
    "All-Inclusive Pricing": "All-Inclusive Pricing",
    "No hidden extras — congestion charges, tolls, and taxes included.": "No hidden extras — congestion charges, tolls, and taxes included.",
    "Champagne & Drinks on Request": "Champagne & Drinks on Request",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.": "Enhance your journey with chilled champagne, wine, or other beverages upon request.",
    "Comfort & Convenience": "Comfort & Convenience",
    "Beautifully maintained vehicles offering a refined and relaxing environment.": "Beautifully maintained vehicles offering a refined and relaxing environment.",
    "From Point A to Point B": "From Point A to Point B",
    "Corporate transportation": "Corporate transportation",
    "Executive Vehicle Fleet": "Executive Vehicle Fleet",
    "Confidentiality Assured": "Confidentiality Assured",
    "Professional Presentation": "Professional Presentation",
    "Corporate Account Management": "Corporate Account Management",
    "Invoice & Expense Tracking": "Invoice & Expense Tracking",
    "Book Your Corporate Transfer": "Book Your Corporate Transfer",
    "Flexibility for Business Travel": "Flexibility for Business Travel",
    "Book on demand or in advance for complete control of your schedule.": "Book on demand or in advance for complete control of your schedule.",
    "Work Comfortably Onboard": "Work Comfortably Onboard",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.": "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.",
    "Charging & Connectivity": "Charging & Connectivity",
    "Multiple charging ports available for phones, laptops, and devices.": "Multiple charging ports available for phones, laptops, and devices.",
    "In-Car Entertainment": "In-Car Entertainment",
    "Screens and multimedia systems available for presentations or relaxation.": "Screens and multimedia systems available for presentations or relaxation.",
    "Discreet & Reliable Service": "Discreet & Reliable Service",
    "Designed for executives who value privacy, punctuality, and comfort.": "Designed for executives who value privacy, punctuality, and comfort.",
    "Discreet Business Transfers": "Discreet Business Transfers",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.": "Professional, discreet, and reliable business transfers for executives, clients, and partners.",
    "Luxury airport meet & greet service": "Luxury airport meet & greet service",
    "Seamless airport transportation": "Seamless airport transportation",
    "Transfers from Cascais Airport and Lisbon Airport": "Transfers from Cascais Airport and Lisbon Airport",
    "Modern and Classic Fleet Services": "Modern and Classic Fleet Services",
    "Optional extra vehicle for luggage": "Optional extra vehicle for luggage",
    "Priority meet & greet service": "Priority meet & greet service",
    "Flight tracking & monitoring": "Flight tracking & monitoring",
    "Private terminal access": "Private terminal access",
    "Luggage assistance": "Luggage assistance",
    "Real-time arrival updates": "Real-time arrival updates",
    "Multi-language support": "Multi-language support",
    "Flight Monitoring": "Flight Monitoring",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.": "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.",
    "Waiting & Parking Included": "Waiting & Parking Included",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.": "Enjoy 30 minutes of complimentary waiting time for airport arrivals.",
    "Meet & Greet Service": "Meet & Greet Service",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.": "Your chauffeur will welcome you inside the terminal with a personalised name sign.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.": "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.",
    "Luggage Assistance": "Luggage Assistance",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.": "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.",
    "Premium Airport Transfers": "Premium Airport Transfers",
    "Rolls-Royce Silver Cloud II wedding transport": "Rolls-Royce Silver Cloud II wedding transport",
    "Rolls-Royce Silver Shadow wedding ceremony": "Rolls-Royce Silver Shadow wedding ceremony",
    "Oldsmobile Super 88 wedding chauffeur": "Oldsmobile Super 88 wedding chauffeur",
    "Wedding transportation": "Wedding transportation",
    "From Ceremony to Reception in Style and Elegance": "From Ceremony to Reception in Style and Elegance",
    "Extra Wedding Transport Vehicles": "Extra Wedding Transport Vehicles",
    "Decorations and designs available as extras": "Decorations and designs available as extras",
    "Minimum 3 hours booking required": "Minimum 3 hours booking required",
    "Basic Decoration (artificial or simple natural flowers + ribbons)": "Basic Decoration (artificial or simple natural flowers + ribbons)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)": "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)": "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
    "Book Your Wedding Transport": "Book Your Wedding Transport",
    "Free Ribbons": "Free Ribbons",
    "Complimentary ribbons and colour options available to match your wedding theme.": "Complimentary ribbons and colour options available to match your wedding theme.",
    "Chauffeur Arrival 20 Minutes Early": "Chauffeur Arrival 20 Minutes Early",
    "Your driver arrives ahead of time to ensure a calm and seamless start.": "Your driver arrives ahead of time to ensure a calm and seamless start.",
    "Classic Cars for the Ceremony": "Classic Cars for the Ceremony",
    "Choose from our iconic vintage collection for the bride or groom's arrival.": "Choose from our iconic vintage collection for the bride or groom's arrival.",
    "Modern Luxury Cars for Guests": "Modern Luxury Cars for Guests",
    "Elegant modern vehicles available for transporting family and guests.": "Elegant modern vehicles available for transporting family and guests.",
    "Flexible Journey Planning": "Flexible Journey Planning",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.": "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.",
    "Decor & Personalisation": "Decor & Personalisation",
    "Custom decoration options to make your day truly unique.": "Custom decoration options to make your day truly unique.",
    "From Ceremony to Reception": "From Ceremony to Reception",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation": "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation",
    "Exclusive experience inside luxury Bentley interior": "Exclusive experience inside luxury Bentley interior",
    "VIP Event Transportation": "VIP Event Transportation",
    "Exclusive Cultural Experiences": "Exclusive Cultural Experiences",
    "Personal Concierge Service": "Personal Concierge Service",
    "Bespoke Itinerary Creation": "Bespoke Itinerary Creation",
    "Luxury Accommodation Coordination": "Luxury Accommodation Coordination",
    "(Full Day Rate)": "(Tarifa de dia completo)",
    "A confirmation email has been sent to": "Um email de confirmação foi enviado para",
    "Additional Information": "Informações adicionais",
    Airline: "Companhia aérea",
    "Airline is required": "A companhia aérea é obrigatória",
    Approximately: "Aproximadamente",
    "At least 1 trip required for transport bookings":
      "Pelo menos 1 viagem é necessária para reservas de transporte",
    Book: "Reservar",
    "Book Your Airport Transfer": "Reserve seu transfer de aeroporto",
    "Book Your Luxury Tour": "Reserve seu tour de luxo",
    "Book Your One-Way Transfer": "Reserve seu transfer de ida",
    "Book by the Hour": "Reserve por hora",
    "By the Hour | Full Day": "À hora | Dia completo",
    "Book Full Day": "Reservar dia completo",
    "Booking Confirmed!": "Reserva confirmada!",
    "Booking Details": "Detalhes da reserva",
    "Booking Summary": "Resumo da reserva",
    "Calculating Price...": "Calculando preço...",
    "Calculating distance...": "Calculando distância...",
    "Calculating price...": "Calculando preço...",
    "Calculating route...": "Calculando rota...",
    "Calculating...": "Calculando...",
    "Preparing your price request...": "A preparar o seu pedido de preço...",
    "Contact us for pricing": "Entre em contato para preços",
    "Do you need vehicles for guest transport?":
      "Precisa de veículos para o transporte dos convidados?",
    "How many vehicles do you need?": "Quantos veículos precisa?",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "Para transportar convidados e comitiva do casamento. Apenas veículos modernos disponíveis.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "Vamos confirmar primeiro a disponibilidade e depois verá o valor final na página segura de checkout da Stripe.",
    "Decoration Options (Optional)": "Opções de decoração (opcional)",
    "Decoration Price (€)": "Preço da decoração (€)",
    "Distance to Experience": "Distância até a experiência",
    "Distance:": "Distância:",
    "Drop-off Location": "Local de destino",
    "Drop-off location is required": "O local de destino é obrigatório",
    Duration: "Duração",
    "Duration (Hours)": "Duração (horas)",
    "Duration is required": "A duração é obrigatória",
    "Duration:": "Duração:",
    "Email is required": "O email é obrigatório",
    "Enter decoration price": "Informe o preço da decoração",
    "Enter your first name": "Informe seu nome",
    "Enter your last name": "Informe seu sobrenome",
    "Event Start Time": "Hora de início do evento",
    "Event date is required": "A data do evento é obrigatória",
    "Event time is required": "A hora do evento é obrigatória",
    "Extra Vehicle:": "Veículo extra:",
    "Extra vehicle for luggage": "Veículo extra para bagagem",
    "Final Destination": "Destino final",
    "Final Location": "Local final",
    "Final destination is required": "O destino final é obrigatório",
    "Final location is required": "O local final é obrigatório",
    "First Name": "Nome",
    "First name is required": "O nome é obrigatório",
    "Flight Information": "Informações do voo",
    "Flight Number": "Número do voo",
    "Flight number is required": "O número do voo é obrigatório",
    "For transporting wedding guests and party (6% VAT)":
      "Para transportar convidados e comitiva (6% IVA)",
    "Guest Transport": "Transporte de convidados",
    "Hand Luggage": "Bagagem de mão",
    "Hourly rates from €250": "Tarifas por hora a partir de €250",
    Includes: "Inclui",
    "Large Luggage": "Bagagem grande",
    "Last Name": "Sobrenome",
    "Last name is required": "O sobrenome é obrigatório",
    "Luggage Information": "Informações de bagagem",
    "Main Fleet": "Frota principal",
    "Make a Special Request": "Fazer uma solicitação especial",
    Max: "Máx.",
    Maximum: "Máximo",
    "Maximum 6 trips per booking, 2 trips per hour":
      "Máximo de 6 viagens por reserva, 2 viagens por hora",
    Min: "Mín.",
    Minimum: "Mínimo",
    "Minimum 3 hours required": "Mínimo de 3 horas",
    "Minimum 3 hours required for main fleet bookings":
      "Mínimo de 3 horas para a frota principal",
    "Missing Cal.com configuration. Please try again later.":
      "Configuração do Cal.com ausente. Tente novamente mais tarde.",
    "Missing Cal.com username. Please configure":
      "Usuário do Cal.com ausente. Configure",
    "Missing Cal.com username. Please set":
      "Usuário do Cal.com ausente. Defina",
    No: "Não",
    "No decoration": "Sem decoração",
    "Note:": "Nota:",
    "Number of Participants": "Número de participantes",
    "Number of Passengers": "Número de passageiros",
    "Number of Trips": "Número de viagens",
    "Optional Add-ons": "Adicionais opcionais",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Azeitão)",
    "Participants & Options": "Participantes e opções",
    Passenger: "Passageiro",
    "Per-trip rates from €100": "Tarifas por viagem a partir de €100",
    "Personal Information": "Informações pessoais",
    "Phone number is required": "O número de telefone é obrigatório",
    "Pickup Location": "Local de recolha",
    "Pickup location is required": "O local de recolha é obrigatório",
    Piece: "Peça",
    Pieces: "Peças",
    "Please Complete the Form": "Complete o formulário",
    "Please Enter Locations": "Informe as localizações",
    "Please Enter Locations & Flight Details":
      "Informe localizações e detalhes do voo",
    "Please Enter Starting Location": "Informe o local de partida",
    "Please Select a Vehicle": "Selecione um veículo",
    "Please complete the pricing details before scheduling.":
      "Complete os detalhes de preço antes de agendar.",
    "Please enter a starting location": "Informe um local de partida",
    "Please enter a valid email address": "Informe um email válido",
    "Please enter both pickup and drop-off locations":
      "Informe os locais de recolha e destino",
    "Please enter both starting location and destination":
      "Informe o local de partida e o destino",
    "Please enter flight number and airline":
      "Informe o número do voo e a companhia",
    "Please fix the following errors:\n":
      "Por favor corrija os seguintes erros:\n",
    "Please select a tour option": "Selecione uma opção de tour",
    "Please select a tour option to continue.":
      "Selecione uma opção de tour para continuar.",
    "Please select a vehicle": "Selecione um veículo",
    "Please select a vehicle for the tour":
      "Selecione um veículo para o tour",
    "Please select a vehicle for the tour.":
      "Selecione um veículo para o tour.",
    "Please select a vehicle to continue.":
      "Selecione um veículo para continuar.",
    "Please select a vehicle to proceed":
      "Selecione um veículo para prosseguir",
    "Please select a vehicle to schedule with Cal.com.":
      "Selecione um veículo para agendar com o Cal.com.",
    "Preparing secure payment...": "Preparando pagamento seguro...",
    "Price Summary": "Resumo de preço",
    "Price:": "Preço:",
    "Schedule & Pay": "Agendar e pagar",
    "Select Your Tour Experience": "Selecione sua experiência de tour",
    "Select Your Vehicle": "Selecione seu veículo",
    "Selected Vehicle": "Veículo selecionado",
    "Service Type": "Tipo de serviço",
    "Starting Location": "Local de partida",
    "Starting from": "A partir de",
    "Starting location is required": "O local de partida é obrigatório",
    "Stripe checkout session URL missing.":
      "URL da sessão de pagamento da Stripe ausente.",
    "Total Price": "Preço total",
    "Total Price:": "Preço total:",
    "Transfer Details": "Detalhes do transfer",
    "Transfer Summary": "Resumo do transfer",
    Transport: "Transporte",
    "Trip Details": "Detalhes da viagem",
    "Trip Summary": "Resumo da viagem",
    "Unable to create Stripe checkout session.":
      "Não foi possível criar a sessão de pagamento da Stripe.",
    "Unable to create a Stripe checkout session.":
      "Não foi possível criar a sessão de pagamento da Stripe.",
    VAT: "IVA",
    "Vehicle:": "Veículo:",
    "We were unable to calculate a quote for this transfer.":
      "Não foi possível calcular um orçamento para este transfer.",
    "Wedding Date": "Data do casamento",
    "Wedding Event Details": "Detalhes do evento de casamento",
    Yes: "Sim",
    "e.g., Ceremony Venue, Reception Hall":
      "ex.: local da cerimônia, salão de recepção",
    "e.g., Hotel, Church, Home": "ex.: hotel, igreja, casa",
    "e.g., Lisbon Airport, Hotel": "ex.: Aeroporto de Lisboa, hotel",
    "e.g., Lisbon Airport, Hotel Name":
      "ex.: Aeroporto de Lisboa, nome do hotel",
    "e.g., Lisbon City Center, Hotel Name":
      "ex.: Centro de Lisboa, nome do hotel",
    "e.g., Porto City Center, Algarve Resort":
      "ex.: Centro do Porto, resort no Algarve",
    "e.g., TAP Air Portugal, Iberia": "ex.: TAP Air Portugal, Iberia",
    "e.g., TP 1234, IB 5678": "ex.: TP 1234, IB 5678",
    extra: "extra",
    "from your pickup location to": "do local de recolha até",
    h: "h",
    hour: "hora",
    hours: "horas",
    km: "km",
    "km included": "km incluídos",
    participant: "participante",
    participants: "participantes",
    "participants allowed for this tour":
      "participantes permitidos para este tour",
    "participants required for this tour":
      "participantes necessários para este tour",
    "per km": "por km",
    "per person": "por pessoa",
    pp: "pp",
    "the experience": "a experiência",
    trip: "viagem",
    trips: "viagens",
    "your@email.com": "seu@email.com",
    "A Ceremony of Distinction": "Uma cerimônia de distinção",
    "A Commitment to Excellence": "Um compromisso com a excelência",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "Um legado de excelência construído sobre paixão, precisão e um compromisso inabalável com",
    "AZEITÃO": "AZEITÃO",
    "About Chevalier Lane": "Sobre a Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "Postura agressiva em três quartos dianteiros com rodas multirraios e grade cromada",
    "Amount:": "Valor:",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "Um serviço por hora que oferece flexibilidade, discrição e disponibilidade ininterrupta.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "Quaisquer requisitos alimentares, necessidades de acessibilidade, idiomas preferidos ou pedidos especiais...",
    "Any special requirements, accessibility needs, or additional services...":
      "Quaisquer requisitos especiais, necessidades de acessibilidade ou serviços adicionais...",
    "Any special requirements, decoration details, or additional services...":
      "Quaisquer requisitos especiais, detalhes de decoração ou serviços adicionais...",
    "Arrive in first class": "Chegue em primeira classe",
    "Arrive with Confidence": "Chegue com confiança",
    "Arrive with Elegance": "Chegue com elegância",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "Como a única empresa em Lisboa que oferece veículos de luxo clássicos e modernos, unimos a herança automotiva à excelência contemporânea. Nossa coleção vai dos icônicos Mercedes Pagoda dos anos 60 aos Bentley Mulsanne de última geração.",
    "Back to Tours": "Voltar para Tours",
    "Back to Wedding Bookings": "Voltar para reservas de casamento",
    "Back to wedding services": "Voltar para serviços de casamento",
    "Because how you arrive matters as much as where you’re going.":
      "Porque como você chega importa tanto quanto para onde está indo.",
    "Bentley Flying Spur detail - Exterior":
      "Detalhe do Bentley Flying Spur - Exterior",
    "Bentley Flying Spur detail - Front view":
      "Detalhe do Bentley Flying Spur - Vista frontal",
    "Bentley Flying Spur detail - Interior":
      "Detalhe do Bentley Flying Spur - Interior",
    "Bentley Flying Spur detail - Rear view":
      "Detalhe do Bentley Flying Spur - Vista traseira",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Detalhe do Bentley Mulsanne - close do emblema Flying B no capô",
    "Bentley Mulsanne detail - Front view":
      "Detalhe do Bentley Mulsanne - Vista frontal",
    "Bentley Mulsanne detail - Interior":
      "Detalhe do Bentley Mulsanne - Interior",
    "Bentley Mulsanne detail - Rear view":
      "Detalhe do Bentley Mulsanne - Vista traseira",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne vista frontal direita - Exterior",
    "Bentley Mulsanne profile detail":
      "Detalhe de perfil do Bentley Mulsanne",
    "Bentley Mulsanne rear quarter detail":
      "Detalhe do quarto traseiro do Bentley Mulsanne",
    "Bentley Mulsanne side view - Exterior":
      "Bentley Mulsanne vista lateral - Exterior",
    "Book Your Tour": "Reserve seu tour",
    "Book another transfer": "Reservar outro transfer",
    "Change language": "Alterar idioma",
    Chauffeur: "Motorista",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "Chegadas com motorista com privacidade, conforto e detalhe refinado. Sob solicitação, uma seleção de vinhos, champanhe e refrescos personalizados.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "Transições com motorista entre casa, cerimônia e recepção, conduzidas com precisão e cuidado.",
    "Checking Stripe...": "Verificando Stripe...",
    "Chevalier Lane Logo": "Logo da Chevalier Lane",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "A Chevalier Lane redefiniu o transporte de luxo, sendo a única empresa em Lisboa que oferece tanto luxo moderno quanto elegância clássica.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "Transfers em carros clássicos incluem um veículo extra (Range Rover Vogue) para bagagem por",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "Frente clássica com capô proeminente e para-choques cromados",
    "Classic heritage and modern innovation in one exclusive collection":
      "Herança clássica e inovação moderna em uma coleção exclusiva",
    "Close-up of the Mercedes bonnet star and grille badge":
      "Close da estrela do capô Mercedes e do emblema da grade",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "Close do Spirit of Ecstasy com reflexos no capô",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "Close do emblema Flying B preto brilhante no capô",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "Close da roda com calota Rolls-Royce e aro de acabamento",
    "Complete Fleet": "Frota completa",
    "Complete fleet hero": "Hero da frota completa",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "Soluções completas de transporte de luxo adaptadas a cada ocasião e necessidade.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "Vista frontal em três quartos do conversível mostrando grade, faróis quádruplos e detalhes cromados",
    Crafting: "Criando",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "Criando experiências incomparáveis desde nossa fundação, cada viagem com a Chevalier Lane representa o ápice do transporte de luxo.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "Banco dianteiro em couro creme com painel e acabamento em nogueira",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "Crie memórias inesquecíveis com nossos serviços premium de transporte para casamentos. Escolha nossa frota clássica principal para o casal ou veículos adicionais para seus convidados.",
    Curated: "Selecionado",
    "Details That Matter": "Detalhes que importam",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "Descubra todo o espectro de experiências de transporte de luxo criadas para pessoas exigentes que não aceitam menos que a perfeição.",
    "Discreet coordination from runway to destination.":
      "Coordenação discreta da pista ao destino.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "Chegadas discretas e elegantes para reuniões, compras ou itinerários pessoais.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "Viagens de ida discretas e elegantes, feitas para casais e momentos íntimos.",
    "Driver's seat with classic Mercedes styling":
      "Assento do motorista com estilo clássico da Mercedes",
    "Driver's wheel with classic Mercedes styling":
      "Volante do motorista com estilo clássico da Mercedes",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "Cockpit focado no motorista com volante multifuncional e controles no console central",
    "Elegant front left view showcasing the pagoda's elegant design":
      "Elegante vista frontal esquerda mostrando o design do Pagoda",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "Carroceria verde-azulada elegante com linhas fluidas e detalhes brilhantes vistos de um ângulo elevado",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "Viagens de ida elegantes e sem interrupções entre aeroportos, hotéis, villas e centros urbanos, adaptadas ao seu horário.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "Viagens de casamento elegantes e sem interrupções de locais de cerimônia até salões de recepção, adaptadas ao cronograma do seu dia especial.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "Eleve suas viagens de negócios com soluções de transporte sofisticadas e confiáveis. Nosso serviço de transporte corporativo é feito para executivos, viajantes de negócios e empresas que desejam impressionar clientes e parceiros. Oferecemos coordenação impecável para reuniões, conferências e visitas VIP com profissionalismo e confidencialidade inabaláveis.",
    "Enter a starting location to calculate driving distance.":
      "Insira um local de partida para calcular a distância.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "Cada detalhe do seu tour privado é meticulosamente planejado para garantir uma jornada inesquecível pelas experiências vinícolas mais exclusivas de Portugal.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "Cada viagem com a Chevalier Lane é um testemunho da nossa dedicação à perfeição. Do momento em que você faz sua reserva até chegar ao destino, cada detalhe é meticulosamente orquestrado para garantir uma experiência inesquecível.",
    "Exclusive Access": "Acesso exclusivo",
    "Executive time, reserved": "Tempo executivo, reservado",
    "Experience Excellence": "Vivencie a excelência",
    "Experience Luxury Like Never Before": "Viva o luxo como nunca antes",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "Explore as melhores regiões vinícolas de Portugal com nossos tours privados exclusivos. Selecione sua experiência preferida e veja o preço atualizar em tempo real.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "Viva transfers premium de aeroporto com nossa frota de luxo a partir de Tires (Aeroporto de Cascais). Todos os preços estão sujeitos a 6% de IVA.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "Viva transfers premium de aeroporto com nossa frota de luxo. Nossos veículos modernos oferecem conforto, confiabilidade e comodidades a bordo para clientes de alto nível, enquanto nossos carros clássicos proporcionam uma experiência única e memorável. Todos os transfers incluem serviço prioritário de meet & greet, monitoramento de voos, assistência de bagagem e suporte multilíngue.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "Viva um transporte de ida sem interrupções com nosso serviço premium de motorista. Seja do aeroporto ao hotel, entre cidades ou qualquer trajeto ponto a ponto, oferecemos soluções confortáveis, confiáveis e sofisticadas, adaptadas ao seu horário e preferências.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "Sinta a diferença de mais de duas décadas de excelência em transporte de luxo e um compromisso inabalável com a perfeição em cada detalhe.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "Viva a grandeza de um palácio do século XVI combinada com produção vinícola de classe mundial. Nossos tours privados exclusivos oferecem acesso íntimo à propriedade histórica, extensas coleções de arte e degustações premium no coração da região vinícola mais renomada de Portugal.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "Viva momentos verdadeiramente únicos que vão além do transporte de luxo comum. Nossas experiências exclusivas combinam os melhores veículos com destinos extraordinários, acesso VIP e serviços de concierge personalizados. De visitas a villas privadas a eventos culturais exclusivos, criamos experiências sob medida que refletem suas paixões e desejos.",
    "Explore Options": "Explorar opções",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "Explore nossa frota completa de obras-primas clássicas e maravilhas modernas. Seja você busca elegância atemporal ou luxo de ponta, cada veículo é meticulosamente mantido e pronto para elevar sua próxima viagem.",
    "Exterior of the Bentley Flying Spur": "Exterior do Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "Exterior do Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "Exterior do Mercedes-Benz S-Class Maybach",
    "First class on the road": "Primeira classe na estrada",
    "Fold-out walnut picnic trays for rear passengers":
      "Bandejas de piquenique dobráveis de nogueira para os passageiros traseiros",
    "For Romantic Dates": "Para encontros românticos",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "Para o casal - uso estacionário, fotos, cerimônias (23% IVA)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "Fundada em Lisboa, Portugal, a Chevalier Lane surgiu de uma visão simples, porém profunda: redefinir o transporte de luxo combinando elegância atemporal com sofisticação moderna. O que começou como um projeto de paixão evoluiu para o principal serviço de motorista de luxo de Portugal.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "De um Rolls-Royce Silver Cloud à presença imponente de um Bentley Mulsanne, cada veículo em nossa coleção conta uma história de excelência em engenharia e luxo sem concessões.",
    "Front grill with classic Mercedes styling":
      "Grade frontal com estilo clássico da Mercedes",
    "Front right side view of the Bentley Mulsanne":
      "Vista frontal direita do Bentley Mulsanne",
    "Front view of the Bentley Flying Spur":
      "Vista frontal do Bentley Flying Spur",
    "Front view of the Bentley Mulsanne":
      "Vista frontal do Bentley Mulsanne",
    "Front view of the Mercedes-Benz S-Class Maybach":
      "Vista frontal do Mercedes-Benz S-Class Maybach",
    "Full view of the pagoda's elegant design":
      "Vista completa do design elegante do Pagoda",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "Uma coleta elegante e discreta garantindo um início calmo e sofisticado para o seu dia especial.",
    "Group:": "Grupo:",
    "Happy Clients": "Clientes satisfeitos",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "Vista frontal da grade Pantheon adornada com emblemas de clubes e para-choque cromado",
    Highlights: "Destaques",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "Disponibilidade por hora para reuniões de negócios, itinerários e agendas executivas.",
    "Immersive Chevalier Lane showcase":
      "Apresentação imersiva da Chevalier Lane",
    "Includes:": "Inclui:",
    "Interior of the Bentley Flying Spur": "Interior do Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "Interior do Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "Interior do Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "Junte-se a milhares de clientes exigentes que confiam na Chevalier Lane para transformar viagens comuns em",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "Perfil lateral longo e baixo destacando a linha da carroceria e as aletas",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "Foto em três quartos frontal em ângulo baixo mostrando faróis quádruplos e grade",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "Vista lateral em ângulo baixo enfatizando o para-lama dianteiro, o friso cromado e a postura",
    "Luxury Tours": "Tours de luxo",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "Transfers de luxo para o aeroporto com serviço prioritário, monitoramento de voos e transporte sem interrupções do Aeroporto de Tires até o seu destino.",
    "Luxury car interior": "Interior de carro de luxo",
    "Luxury services": "Serviços de luxo",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "Frota principal de casamentos: estacionária/uso pelo casal - não inclui decorações e designs solicitados pelo cliente",
    "Mercedes 280SL Pagoda - Driver's Seat":
      "Mercedes 280SL Pagoda - Assento do motorista",
    "Mercedes 280SL Pagoda - Driver's Wheel":
      "Mercedes 280SL Pagoda - Volante do motorista",
    "Mercedes 280SL Pagoda - Front Grill":
      "Mercedes 280SL Pagoda - Grade frontal",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda - Vista frontal esquerda",
    "Mercedes 280SL Pagoda - Full View":
      "Mercedes 280SL Pagoda - Vista completa",
    "Mercedes 280SL Pagoda - Rear View":
      "Mercedes 280SL Pagoda - Vista traseira",
    "Mercedes-Benz S-Class Maybach detail - Exterior":
      "Detalhe do Mercedes-Benz S-Class Maybach - Exterior",
    "Mercedes-Benz S-Class Maybach detail - Front view":
      "Detalhe do Mercedes-Benz S-Class Maybach - Vista frontal",
    "Mercedes-Benz S-Class Maybach detail - Interior":
      "Detalhe do Mercedes-Benz S-Class Maybach - Interior",
    "Mercedes-Benz S-Class Maybach detail - Rear view":
      "Detalhe do Mercedes-Benz S-Class Maybach - Vista traseira",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Detalhe do Mercedes S500 BRABUS - close da estrela do capô",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS exterior - vista frontal de frente",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS exterior - vista frontal em três quartos em ângulo baixo",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS interior - vista traseira",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS interior - volante e cockpit",
    "Mercedes S500 BRABUS rim": "Roda do Mercedes S500 BRABUS",
    "Missing Stripe session reference":
      "Referência da sessão Stripe ausente",
    "Next image": "Próxima imagem",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 exterior - vista frontal em três quartos com capota aberta",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 exterior - perfil lateral completo",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 exterior - vista traseira",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 interior - painel e volante",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 interior - área traseira e painel da porta",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 interior - vista ampla da cabine",
    "Optional Add-ons:": "Extras opcionais:",
    "Our Expertise": "Nossa experiência",
    "Our Story": "Nossa história",
    "Our Unique Position": "Nossa posição única",
    "Our Values": "Nossos valores",
    "Payment canceled": "Pagamento cancelado",
    "Personal Experience": "Experiência pessoal",
    "Play Lisbon in Motion video":
      "Reproduzir vídeo Lisboa em Movimento",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "Informe a quantidade de bagagem de mão e bagagem grande (despachada) com a qual você vai viajar.",
    "Premium Transport": "Transporte premium",
    "Previous image": "Imagem anterior",
    Private: "Privado",
    "Private aviation, perfected": "Aviação privada, aperfeiçoada",
    "Punctual, flexible transportation designed entirely around your pace.":
      "Transporte pontual e flexível projetado totalmente em torno do seu ritmo.",
    "Ready to Create Your Perfect Experience?":
      "Pronto para criar sua experiência perfeita?",
    "Rear seat and door panel details with chrome window winder and trim":
      "Detalhes do assento traseiro e painel da porta com manivela cromada e acabamento",
    "Rear view of the Bentley Flying Spur":
      "Vista traseira do Bentley Flying Spur",
    "Rear view of the Bentley Mulsanne":
      "Vista traseira do Bentley Mulsanne",
    "Rear view of the Mercedes-Benz S-Class Maybach":
      "Vista traseira do Mercedes-Benz S-Class Maybach",
    "Rear view of the Mercedes S500 BRABUS":
      "Vista traseira do Mercedes S500 BRABUS",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "Vista traseira do Silver Shadow com lanternas distintas e acabamento cromado",
    "Rear view of the pagoda's elegant design":
      "Vista traseira do design elegante do Pagoda",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "Interior vermelho e branco visto dos bancos traseiros com painel e banco dianteiro",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "Toques florais refinados, fitas e detalhes personalizados, organizados para complementar sua celebração.",
    "Reserved Availability": "Disponibilidade reservada",
    "Return Home": "Voltar ao início",
    "Rim of the Mercedes S500 BRABUS": "Roda do Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II exterior - vista frontal em três quartos",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II interior - cabine dianteira e painel",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II interior - vista lateral esquerda em ângulo alto",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II interior - mesas de piquenique traseiras",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II interior - banco traseiro e forro do teto",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Detalhe do Rolls-Royce Silver Shadow - Spirit of Ecstasy no capô",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Detalhe do Rolls-Royce Silver Shadow - roda e calota",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow exterior - vista frontal com emblemas na grade",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow exterior - vista frontal em três quartos em ângulo baixo",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow exterior - perfil lateral baixo",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow exterior - vista traseira com lanternas",
    "Scenic routes": "Rotas cênicas",
    "Service Available": "Serviço disponível",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "Amplo compartimento traseiro com estofamento de couro creme e detalhes em madeira",
    "Special Requests": "Solicitações especiais",
    "Start Planning": "Começar a planejar",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "Vista traseira frontal com aletas e lanternas inspiradas em foguetes",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "Vista frontal do painel com instrumentos duplos e volante clássico",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Obrigado por escolher a Chevalier Lane. Sua solicitação de transfer de aeroporto foi recebida e nossa equipe de concierge entrará em contato em breve para confirmar os detalhes e finalizar sua reserva.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Obrigado por escolher a Chevalier Lane. Sua solicitação de reserva foi recebida e nossa equipe de concierge entrará em contato em breve para confirmar os detalhes e finalizar sua reserva.",
    "Thank you for your payment": "Obrigado pelo seu pagamento",
    "The Beginning": "O começo",
    "The Bride’s Arrival": "A chegada da noiva",
    "The principles that guide every decision and shape every experience we create.":
      "Os princípios que orientam cada decisão e moldam cada experiência que criamos.",
    "Timeless Elegance": "Elegância atemporal",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "Transforme seu dia especial em uma experiência inesquecível com nossos serviços premium de transporte para casamentos. Nossos veículos de luxo clássicos e modernos oferecem o cenário perfeito para seus momentos mais preciosos. Das chegadas à cerimônia às saídas da recepção, garantimos que cada aspecto do transporte do seu casamento seja tratado com elegância e precisão.",
    "Unable to confirm payment status":
      "Não foi possível confirmar o status do pagamento",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "Não foi possível estimar a distância. O custo do veículo reflete o preço mínimo; o total real pode variar.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "Conforto, privacidade e refinamento incomparáveis — sem concessões.",
    "View other tours": "Ver outros tours",
    "We’ll calculate the transfer distance to your selected experience.":
      "Calcularemos a distância do transfer até a experiência selecionada.",
    "Wide front view highlighting the large grille and swept headlamps":
      "Vista frontal ampla destacando a grande grade e os faróis alongados",
    "Your Time, Perfectly Managed": "Seu tempo, perfeitamente gerenciado",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "Seu motorista pessoal oferece uma experiência suave, discreta e atenta do início ao fim.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "ex.: Aeroporto de Tires (Cascais), Aeroporto de Lisboa",
    "exceptional service": "serviço excepcional",
    "extraordinary experiences": "experiências extraordinárias",
    hero: "hero",
    "more inclusions": "mais inclusões",
    processing: "processando",
    "profile view": "vista de perfil",
    "through the art of luxury transportation since our founding.":
      "através da arte do transporte de luxo desde nossa fundação.",
    "unparalleled experiences": "experiências incomparáveis",
  },
  de: {
    "Airport Transfers": "Flughafentransfers",
    "Discreet chauffeur service to and from the airport.": "Zuverlässige Flughafentransfers",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "Geschäftsreisen",
    "Classic Collection": "Klassische Kollektion",
    "Classic Wedding Fleet": "Klassische Hochzeitsflotte",
    "Corporate Transportation": "Firmentransport",
    "Executive Vehicles": "Exklusive Fahrzeuge",
    "Fixed Price Transfers": "Transfers zum Festpreis",
    "Flight Tracking": "Flugverfolgung",
    "Chauffeured Transport": "Chauffeur-Service",
    "Meeting Coordination": "Meeting-Koordination",
    "Historic Palaces": "Historische Paläste",
    "Luxury Tours & Scenic Routes": "Luxustouren & Panoramastrecken",
    "Make Your Own Exclusive Experiences by the Hour": "Gestalten Sie exklusive Stunden-Erlebnisse",
    "Modern Luxury Fleet": "Moderne Luxusflotte",
    "Modern Transport": "Moderner Transport",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "Einfache Fahrt",
    "Partner Brands": "Partner-Marken",
    "Priority Meet & Greet": "Priority Meet & Greet",
    "Private Villa Access": "Zugang zu privaten Villen",
    "Private Wine Tastings": "Private Weinverkostungen",
    "Personal Concierge": "Persönlicher Concierge",
    "Professional Service": "Professioneller Service",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "VIP-Event-Transport",
    "Wedding Services": "Hochzeitsservices",
    "Wedding Services Description": "Machen Sie Ihren besonderen Tag unvergesslich mit unserem Hochzeitsservice.",
    About: "Über uns",
    AboutUs: "Über uns",
    "A Legacy of Excellence": "Ein Vermächtnis der Exzellenz",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "Ein Einblick in unsere Reisen – von intimen Feiern und Hochzeitsfahrten bis zu Panoramastrecken und maßgeschneiderten Firmenevents.",
    "Book Your Experience": "Erlebnis buchen",
    "A professional chauffeur service available by the hour.": "Professioneller Geschäftsreise-Transport",
    Contact: "Kontakt",
    ContactUs: "Kontaktieren Sie uns",
    "Ready to experience unparalleled luxury transportation?":
      "Bereit, unvergleichlichen Luxus-Transport zu erleben?",
    "Get in touch with us today.": "Kontaktieren Sie uns noch heute.",
    "Call Us": "Rufen Sie uns an",
    "24/7 Available": "24/7 verfügbar",
    "Email Us": "Schreiben Sie uns eine E-Mail",
    "We respond within 2 hours": "Wir antworten innerhalb von 2 Stunden",
    "Send Us a Message": "Senden Sie uns eine Nachricht",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "Ob Sie Transport für einen besonderen Anlass, ein Geschäftstreffen oder einfach das Maximum an Luxusreisen erleben möchten — wir machen es möglich.",
    "Message Sent Successfully!": "Nachricht erfolgreich gesendet!",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 2 Stunden.",
    "Full Name *": "Vollständiger Name *",
    "Your full name": "Ihr vollständiger Name",
    "Email Address *": "E-Mail-Adresse *",
    "your.email@example.com": "ihre.email@beispiel.com",
    "Phone Number": "Telefonnummer",
    "Subject *": "Betreff *",
    "Select a subject": "Betreff auswählen",
    "Booking Inquiry": "Buchungsanfrage",
    "Corporate Services": "Firmenservices",
    "Special Event": "Spezielle Veranstaltung",
    "General Information": "Allgemeine Informationen",
    "Feedback": "Feedback",
    "Message *": "Nachricht *",
    "Please describe your requirements and any specific details...":
      "Bitte beschreiben Sie Ihre Anforderungen und besondere Details...",
    "Send Message": "Nachricht senden",
    "Get in Touch": "Kontakt aufnehmen",
    Phone: "Telefon",
    "Available 24/7 for urgent requests": "24/7 für dringende Anfragen verfügbar",
    Email: "E-Mail",
    Location: "Standort",
    "Miraflores, Lisbon": "Miraflores, Lissabon",
    "Serving all of Portugal and beyond": "Wir bedienen ganz Portugal und darüber hinaus",
    "Business Hours": "Geschäftszeiten",
    "Monday - Sunday": "Montag - Sonntag",
    "Why Choose Us?": "Warum uns wählen?",
    "Years Experience": "Jahre Erfahrung",
    "Luxury Vehicles": "Luxusfahrzeuge",
    Satisfaction: "Zufriedenheit",
    "Ready to Begin Your Journey?": "Bereit, Ihre Reise zu beginnen?",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "Erleben Sie den Höhepunkt des Luxus-Transports. Jedes Detail perfekt gestaltet, jeder Moment bestimmt für",
    "unforgettable elegance": "unvergessliche Eleganz",
    "Call Now": "Jetzt anrufen",
    "Send Email": "E-Mail senden",
    "Direct premium transportation between locations.": "Bequemer One-Way-Transport",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "Genießen Sie nahtlose One-Way-Fahrten mit unserem Premium-Chauffeurservice. Flexible Punkt-zu-Punkt-Luxustransfers, abgestimmt auf Ihren Zeitplan.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "Heben Sie Geschäftsreisen auf ein neues Niveau mit anspruchsvollen, zuverlässigen Transportlösungen für Führungskräfte und Firmen, die Kunden beeindrucken möchten.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "Erleben Sie Premium-Flughafentransfers mit unserer Luxusflotte. Priority Meet & Greet, Flugverfolgung und nahtlose Transfers ab Tires (Flughafen Cascais).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "Verwandeln Sie Ihren besonderen Tag in ein unvergessliches Erlebnis mit unserem Premium-Hochzeitstransport. Klassische und moderne Luxusfahrzeuge für Ihre wertvollsten Momente.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "Erleben Sie wirklich einzigartige Momente, die über gewöhnlichen Luxustransport hinausgehen. VIP-Zugang, private Villenbesuche und maßgeschneiderte Erlebnisse.",
    "Curated Experiences": "Kuratiertes Erlebnis",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "Jede Fahrt mit Chevalier Lane ist sorgfältig gestaltet, um Erwartungen zu übertreffen, mit unvergleichlichem Service, der alltägliche Momente in außergewöhnliche Erinnerungen verwandelt.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "Erleben Sie Luxus-Transport mit unserem Premium-Chauffeurservice. Reservieren Sie Ihr Fahrzeug und Ihre Ziele unten.",
    "Exclusive Services": "Exklusive Services",
    "Explore Our Fleet": "Unsere Flotte entdecken",
    "Private chauffeur-driven tours and experiences.": "Geführte Touren und Sightseeing-Erlebnisse",
    "Immersive Journey": "Immersive Reise",
    "Learn More": "Mehr erfahren",
    "Lisbon in Motion": "Lissabon in Bewegung",
    "Luxury Concierge & Boutique Chauffeur Service": "Luxus-Concierge und Boutique-Chauffeurservice",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "Von Rolls-Royce-Eleganz bis zu modernem Bentley-Komfort in Lissabon — reisen Sie mit unvergleichlicher Exklusivität.",
    "Moments in Motion": "Momente in Bewegung",
    "Private chauffeur experience in Lisbon": "Chauffeur-Erlebnis in Lissabon",
    "Professional chauffeur services for all your transportation needs":
      "Professionelle Chauffeurdienste für all Ihre Transportbedürfnisse",
    "Service": "Service",
    "Signature Services": "Signature Services",
    "Timeless elegance with our classic luxury vehicles":
      "Zeitlose Eleganz mit unseren klassischen Luxusfahrzeugen",
    "Tours": "Touren",
    "We Tailor Every Experience to You": "Wir gestalten jedes Erlebnis für Sie",
    "Weddings": "Hochzeiten",
    "of": "von",
    "Private Chauffeur Service": "Privater Chauffeurservice",
    Services: "Dienstleistungen",
    "Our Services": "Unsere Leistungen",
    "One-Way Services": "Einfache Fahrten",
    "Classic Fleet": "Klassische Flotte",
    "Modern Fleet": "Moderne Flotte",
    Language: "Sprache",
    "Luxury transportation services": "Luxus-Transportdienste",
    "Classic Fleet Overview": "Überblick klassische Flotte",
    "Modern Fleet Overview": "Überblick moderne Flotte",
    "About Us": "Über uns",
    "Contact Us": "Kontaktieren Sie uns",
    "Contemporary luxury with cutting-edge technology":
      "Zeitgemäßer Luxus mit modernster Technik",
    "Contact Info": "Kontaktinformationen",
    "Toggle menu": "Menü öffnen/schließen",
    "24/7 Service Available": "24/7 verfügbar",
    "All rights reserved.": "Alle Rechte vorbehalten.",
    "Exclusive Fleet": "Exklusive Flotte",
    "Reserve": "Reservieren",
    "Explore": "Entdecken",
    "About This Vehicle": "Über dieses Fahrzeug",
    "Specifications": "Spezifikationen",
    "Key Features": "Wichtigste Merkmale",
    "Pricing Options": "Preisoptionen",
    "Reserve This Vehicle": "Dieses Fahrzeug reservieren",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "Kontaktieren Sie unser Concierge-Team, um Ihr exklusives Transporterlebnis zu arrangieren.",
    "Call Concierge": "Concierge anrufen",
    "Signature Collection": "Signature Collection",
    "Book Your Car": "Ihr Auto buchen",
    "Explore Fleet": "Flotte entdecken",
    "Our Complete Fleet": "Unsere komplette Flotte",
    "Ready to Experience Luxury?": "Bereit für luxuriöse Erlebnisse?",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "Wählen Sie aus unserer exquisiten Kollektion und lassen Sie sich von unseren Chauffeuren mit unvergleichlichem Stil und Komfort fahren.",
    "Book Your Vehicle": "Fahrzeug buchen",
    "View Services": "Dienstleistungen ansehen",
    "Available Soon": "Bald verfügbar",
    "Currently unavailable": "Derzeit nicht verfügbar",
    "Pricing shown at secure checkout": "Preis wird im sicheren Checkout angezeigt",
    "View Details": "Details ansehen",
    "Book Your Service": "Service buchen",
    "Find Out Prices": "Preise erfahren",
    "Explore Services": "Dienstleistungen entdecken",
    "Complete Service Portfolio": "Umfassendes Service-Portfolio",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "Unser Flaggschiff Bentley Mulsanne wird bald für ausgewählte Services verfügbar sein.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "Von täglichem Luxus-Transport bis zu einmaligen Erlebnissen stellt unser Portfolio sicher, dass jede Fahrt den Höhepunkt von Raffinesse und Exzellenz widerspiegelt.",
    "Cutting-edge luxury with the latest automotive technology":
      "Modernster Luxus mit neuester Automobiltechnik",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "Erleben Sie den Gipfel moderner Automobil-Exzellenz mit unserer zeitgenössischen Flotte, die modernste Luxusfahrzeuge mit High-End-Technologie und kompromisslosem Komfort bietet.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "Der ultimative Ausdruck deutscher Ingenieurskunst, der Leistung, Luxus und Spitzentechnologie vereint.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "Britischer Luxus neu definiert: Der Mulsanne bietet unvergleichlichen Komfort und Raffinesse für anspruchsvolle Reisende.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "Der Höhepunkt von Luxus und Eleganz: Der Mercedes-Benz S-Class Maybach bietet unvergleichlichen Komfort und Prestige.",
    "V8 Twin-Turbo Engine": "V8-Biturbo-Motor",
    "BRABUS Performance": "BRABUS Performance",
    "Executive Comfort": "Executive-Komfort",
    "Advanced Tech": "Fortschrittliche Technik",
    "Handcrafted Interior": "Handgefertigtes Interieur",
    "Air Suspension": "Luftfederung",
    "Executive Seating": "Executive-Sitze",
    "V12 Engine": "V12-Motor",
    "Executive Rear Seating": "Executive-Hecksitze",
    "Premium Materials": "Hochwertige Materialien",
    "Advanced Technology": "Fortschrittliche Technologie",
    "Twin-Turbo V8 Power": "Twin-Turbo V8 Leistung",
    "Luxury Interior": "Luxusinterieur",
    "Safety First": "Sicherheit zuerst",
    "Fuel Efficiency": "Kraftstoffeffizienz",
    "Rear Entertainment Suite": "Entertainment im Fond",
    "British Heritage": "Britisches Erbe",
    "V12 engine": "V12-Motor",
    "Premium sound system": "Premium-Soundsystem",
    "Engine": "Motor",
    "Power": "Leistung",
    "Transmission": "Getriebe",
    "Top Speed": "Höchstgeschwindigkeit",
    "Acceleration": "Beschleunigung",
    "Fuel Economy": "Kraftstoffverbrauch",
    "Drive Type": "Antriebsart",
    "Passengers": "Passagiere",
    "Luggage": "Gepäck",
    "3 suitcases + 2 bags": "3 Koffer + 2 Taschen",
    "2 suitcases + 2 bags": "2 Koffer + 2 Taschen",
    "Base rate (max. 25km)": "Grundpreis (max. 25 km)",
    "Additional per km": "Zusätzlich pro km",
    "Classic": "Klassisch",
    "Modern": "Modern",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "Der Inbegriff britischen Luxus: Der Silver Cloud II bietet unvergleichliche Eleganz und Prestige.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "Ein Meisterwerk des Automobilbaus: Der Silver Shadow vereint Kraft und Luxus in perfekter Harmonie.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "Erleben Sie amerikanisches Automobilerbe mit dem kraftvollen und stilvollen Oldsmobile Super 88.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "Der ikonische Mercedes 280SL Pagode steht für automobile Exzellenz der goldenen Ära des Fahrens.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "Britische Eleganz trifft sportliche Leistung im ikonischen Jaguar XJ6, einem wahren Klassiker des Automobildesigns.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "Die höchste Form britischen Luxus: Der Double Six Daimler vereint V12-Power mit unvergleichlicher Raffinesse.",
    "Timeless elegance from the golden age of motoring":
      "Zeitlose Eleganz aus der goldenen Ära des Automobils",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "Entdecken Sie unsere sorgfältig kuratierte Kollektion klassischer Automobile, jedes ein Höhepunkt automobiler Handwerkskunst vergangener Zeiten.",
    "V8 Engine": "V8-Motor",
    "Silent Ride": "Lautlose Fahrt",
    "Royal Heritage": "Königliches Erbe",
    "V8 Turbo Engine": "V8-Turbomotor",
    "Hydropneumatic Suspension": "Hydropneumatische Federung",
    "Modern Classic": "Moderner Klassiker",
    "V8 Rocket Engine": "V8 Rocket-Motor",
    "American Classic": "Amerikanischer Klassiker",
    "Powerful Performance": "Kraftvolle Leistung",
    "Retro Design": "Retro-Design",
    "Classic Design": "Klassisches Design",
    "Perfect for Events": "Perfekt für Events",
    "Straight-6 Engine": "Reihensechszylinder",
    "British Luxury": "Britischer Luxus",
    "Sporting Heritage": "Sportliches Erbe",
    "Timeless Design": "Zeitloses Design",
    "Daimler Luxury": "Daimler-Luxus",
    "British Prestige": "Britisches Prestige",
    "Base rate (max. 20km)": "Grundpreis (max. 20 km)",
    "Additional km": "Zusätzliche km",
    "Subject to request": "Auf Anfrage",
    "Pricing": "Preise",
    "1 suitcase + 2 bags": "1 Koffer + 2 Taschen",
    "1 suitcase + 1 bag": "1 Koffer + 1 Tasche",
    "3 suitcases + 3 bags": "3 Koffer + 3 Taschen",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "Geräumige Kabine mit Executive-Sitzen, ideal für Geschäftsreisen und lange Fahrten, mit entspannender Massagefunktion.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "Premium-Ledersitze mit Massagefunktion und Klimatisierung für höchsten Komfort.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "Modernstes Infotainmentsystem mit Navigation, Konnektivität und Fahrerassistenzfunktionen.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "Mit BRABUS-Leistungssteigerungen für außergewöhnliche Performance und Raffinesse.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "Handgefertigtes Interieur mit Premium-Materialien und größter Liebe zum Detail.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "Umfassende Sicherheitssysteme mit adaptivem Tempomat und Spurhalteassistent.",
    "Optimized engine management for balanced performance and efficiency.":
      "Optimiertes Motormanagement für ausgewogene Leistung und Effizienz.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "Jedes Detail wird von Meisterhand mit den besten Materialien gefertigt.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "Kraftvoller 6,75-Liter-V8-Biturbo mit müheloser Leistung und Raffinesse.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "Modernes Luftfederungssystem bietet unvergleichlichen Komfort und Fahrqualität.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "Neueste Infotainment- und Konnektivitätsfunktionen nahtlos mit Luxus kombiniert.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "Großer hochauflösender Bildschirm für TV und Medien in höchstem Komfort.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "Stolze Fortführung von Bentleys legendärem Erbe und Handwerkstradition.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "Der Bentley Flying Spur wird von einem V12-Motor angetrieben und bietet herausragende Leistung und Raffinesse.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "Der Bentley Flying Spur ist mit einem Premium-Soundsystem ausgestattet, das außergewöhnliche Audioqualität bietet.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "Der Bentley Flying Spur ist ein britisches Fahrzeug, gebaut im Vereinigten Königreich.",
    "Luxury Lifestyle": "Luxus-Lifestyle",
    "Wine Tasting": "Weinverkostung",
    "View previous experience": "Vorheriges Erlebnis ansehen",
    "View next experience": "Nächstes Erlebnis ansehen",
    "View previous service": "Vorherigen Service ansehen",
    "View next service": "Nächsten Service ansehen",
    "Go to service": "Zum Service gehen",
    "Distinguished Partnerships": "Hervorragende Partnerschaften",
    "Trusted Collaborations": "Bewährte Kooperationen",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "Wir arbeiten Hand in Hand mit Elite-Marken und Trendsettern, um nahtlose, unvergessliche Reisen für ihre anspruchsvollsten Gäste zu bieten.",
    "Expand your brand presence with Chevalier Lane": "Erweitern Sie Ihre Markenpräsenz mit Chevalier Lane",
    "Reserve Your Place": "Reservieren Sie Ihren Platz",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "Schließen Sie sich einem exklusiven Kreis von Kennern an, die wissen, dass wahrer Luxus nicht nur das Ziel, sondern der Weg dorthin ist.",
    "Available Service": "Verfügbarer Service",
    Premium: "Premium",
    "Fleet Selection": "Flottenauswahl",
    Elite: "Elite",
    "Client Experience": "Kundenerlebnis",
    "Elegant chauffeur-driven transportation for weddings.": "Eleganter Transport für Hochzeiten",
    "Prices are Subject to VAT": "Preise verstehen sich zuzüglich MwSt.",
    "Why Choose Us": "Warum uns wählen",
    "Flexible point-to-point luxury transportation solutions":
      "Flexible Luxus-Transportlösungen von Punkt zu Punkt",
    Features: "Merkmale",
    "Vehicle Options": "Fahrzeugoptionen",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "One-Way-Transfer buchen",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "Transfers ab Tires (Flughafen Cascais) – Festpreis für 25 km",
    "Modern Fleet Services": "Service der modernen Flotte",
    "Book Airport Transfer": "Flughafentransfer buchen",
    "Professional excellence for business travel and client relations":
      "Professionelle Exzellenz für Geschäftsreisen und Kundenbeziehungen",
    "Business Features": "Business-Features",
    "Corporate Packages": "Firmenpakete",
    "Starting price (min. 2h)": "Startpreis (mind. 2 Std.)",
    "Monthly Corporate Plan": "Monatlicher Firmenplan",
    "Corporate Inquiry": "Firmenanfrage",
    "Main Wedding Fleet": "Hauptflotte für Hochzeiten",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "Zusätzlicher Transport",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "Hochzeitstransport buchen",
    "Exclusive Private Wine Experiences": "Exklusive private Weinerlebnisse",
    "Tour Experiences": "Tour-Erlebnisse",
    "Featured Experiences": "Ausgewählte Erlebnisse",
    "From €7 pp": "Ab 7 € p.P.",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "Ab 15 € p.P.",
    "Premium Wine Experiences": "Premium-Weinerlebnisse",
    "€75-€250 pp": "75 €–250 € p.P.",
    "Explore Tours": "Touren entdecken",
    "Exclusive Experiences": "Exklusive Erlebnisse",
    "VIP Services": "VIP-Services",
    "Exclusive Packages": "Exklusive Pakete",
    "VIP Cultural Experience": "VIP-Kulturerlebnis",
    "Private Estate Tour": "Private Gutstour",
    "Bespoke Experience": "Maßgeschneidertes Erlebnis",
    "Create Exclusive Experience": "Exklusives Erlebnis erstellen",
    "Why Choose Chevalier Lane": "Warum Chevalier Lane wählen",
    "Contact Concierge": "Concierge kontaktieren",
    "Always Available": "Immer verfügbar",
    Instant: "Sofort",
    "Quote Response": "Angebotsantwort",
    Global: "Global",
    "Service Coverage": "Serviceabdeckung",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "Kontaktieren Sie unser Concierge-Team, um Ihre Transportbedürfnisse zu besprechen und zu erfahren, wie wir Ihre nächste Reise auf ein neues Niveau heben können.",
    "Bentley Mulsanne city transfer": "Bentley Mulsanne city transfer",
    "ONE-WAY TRANSPORTATION": "ONE-WAY TRANSPORTATION",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur": "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II": "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "Professional Chauffeur Service",
    "Real-time GPS Tracking": "Real-time GPS Tracking",
    "Flexible Scheduling": "Flexible Scheduling",
    "Professional Chauffeur": "Professional Chauffeur",
    "Complimentary Water": "Complimentary Water",
    "Premium bottled water included in every journey.": "Premium bottled water included in every journey.",
    "All-Inclusive Pricing": "All-Inclusive Pricing",
    "No hidden extras — congestion charges, tolls, and taxes included.": "No hidden extras — congestion charges, tolls, and taxes included.",
    "Champagne & Drinks on Request": "Champagne & Drinks on Request",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.": "Enhance your journey with chilled champagne, wine, or other beverages upon request.",
    "Comfort & Convenience": "Comfort & Convenience",
    "Beautifully maintained vehicles offering a refined and relaxing environment.": "Beautifully maintained vehicles offering a refined and relaxing environment.",
    "From Point A to Point B": "From Point A to Point B",
    "Corporate transportation": "Corporate transportation",
    "Executive Vehicle Fleet": "Executive Vehicle Fleet",
    "Confidentiality Assured": "Confidentiality Assured",
    "Professional Presentation": "Professional Presentation",
    "Corporate Account Management": "Corporate Account Management",
    "Invoice & Expense Tracking": "Invoice & Expense Tracking",
    "Book Your Corporate Transfer": "Book Your Corporate Transfer",
    "Flexibility for Business Travel": "Flexibility for Business Travel",
    "Book on demand or in advance for complete control of your schedule.": "Book on demand or in advance for complete control of your schedule.",
    "Work Comfortably Onboard": "Work Comfortably Onboard",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.": "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.",
    "Charging & Connectivity": "Charging & Connectivity",
    "Multiple charging ports available for phones, laptops, and devices.": "Multiple charging ports available for phones, laptops, and devices.",
    "In-Car Entertainment": "In-Car Entertainment",
    "Screens and multimedia systems available for presentations or relaxation.": "Screens and multimedia systems available for presentations or relaxation.",
    "Discreet & Reliable Service": "Discreet & Reliable Service",
    "Designed for executives who value privacy, punctuality, and comfort.": "Designed for executives who value privacy, punctuality, and comfort.",
    "Discreet Business Transfers": "Discreet Business Transfers",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.": "Professional, discreet, and reliable business transfers for executives, clients, and partners.",
    "Luxury airport meet & greet service": "Luxury airport meet & greet service",
    "Seamless airport transportation": "Seamless airport transportation",
    "Transfers from Cascais Airport and Lisbon Airport": "Transfers from Cascais Airport and Lisbon Airport",
    "Modern and Classic Fleet Services": "Modern and Classic Fleet Services",
    "Optional extra vehicle for luggage": "Optional extra vehicle for luggage",
    "Priority meet & greet service": "Priority meet & greet service",
    "Flight tracking & monitoring": "Flight tracking & monitoring",
    "Private terminal access": "Private terminal access",
    "Luggage assistance": "Luggage assistance",
    "Real-time arrival updates": "Real-time arrival updates",
    "Multi-language support": "Multi-language support",
    "Flight Monitoring": "Flight Monitoring",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.": "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.",
    "Waiting & Parking Included": "Waiting & Parking Included",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.": "Enjoy 30 minutes of complimentary waiting time for airport arrivals.",
    "Meet & Greet Service": "Meet & Greet Service",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.": "Your chauffeur will welcome you inside the terminal with a personalised name sign.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.": "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.",
    "Luggage Assistance": "Luggage Assistance",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.": "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.",
    "Premium Airport Transfers": "Premium Airport Transfers",
    "Rolls-Royce Silver Cloud II wedding transport": "Rolls-Royce Silver Cloud II wedding transport",
    "Rolls-Royce Silver Shadow wedding ceremony": "Rolls-Royce Silver Shadow wedding ceremony",
    "Oldsmobile Super 88 wedding chauffeur": "Oldsmobile Super 88 wedding chauffeur",
    "Wedding transportation": "Wedding transportation",
    "From Ceremony to Reception in Style and Elegance": "From Ceremony to Reception in Style and Elegance",
    "Extra Wedding Transport Vehicles": "Extra Wedding Transport Vehicles",
    "Decorations and designs available as extras": "Decorations and designs available as extras",
    "Minimum 3 hours booking required": "Minimum 3 hours booking required",
    "Basic Decoration (artificial or simple natural flowers + ribbons)": "Basic Decoration (artificial or simple natural flowers + ribbons)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)": "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)": "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
    "Book Your Wedding Transport": "Book Your Wedding Transport",
    "Free Ribbons": "Free Ribbons",
    "Complimentary ribbons and colour options available to match your wedding theme.": "Complimentary ribbons and colour options available to match your wedding theme.",
    "Chauffeur Arrival 20 Minutes Early": "Chauffeur Arrival 20 Minutes Early",
    "Your driver arrives ahead of time to ensure a calm and seamless start.": "Your driver arrives ahead of time to ensure a calm and seamless start.",
    "Classic Cars for the Ceremony": "Classic Cars for the Ceremony",
    "Choose from our iconic vintage collection for the bride or groom's arrival.": "Choose from our iconic vintage collection for the bride or groom's arrival.",
    "Modern Luxury Cars for Guests": "Modern Luxury Cars for Guests",
    "Elegant modern vehicles available for transporting family and guests.": "Elegant modern vehicles available for transporting family and guests.",
    "Flexible Journey Planning": "Flexible Journey Planning",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.": "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.",
    "Decor & Personalisation": "Decor & Personalisation",
    "Custom decoration options to make your day truly unique.": "Custom decoration options to make your day truly unique.",
    "From Ceremony to Reception": "From Ceremony to Reception",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation": "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation",
    "Exclusive experience inside luxury Bentley interior": "Exclusive experience inside luxury Bentley interior",
    "VIP Event Transportation": "VIP Event Transportation",
    "Exclusive Cultural Experiences": "Exclusive Cultural Experiences",
    "Personal Concierge Service": "Personal Concierge Service",
    "Bespoke Itinerary Creation": "Bespoke Itinerary Creation",
    "Luxury Accommodation Coordination": "Luxury Accommodation Coordination",
    "(Full Day Rate)": "(Ganztagestarif)",
    "A confirmation email has been sent to":
      "Eine Bestätigungs-E-Mail wurde gesendet an",
    "Additional Information": "Zusätzliche Informationen",
    Airline: "Fluggesellschaft",
    "Airline is required": "Fluggesellschaft ist erforderlich",
    Approximately: "Ungefähr",
    "At least 1 trip required for transport bookings":
      "Mindestens 1 Fahrt erforderlich für Transportbuchungen",
    Book: "Buchen",
    "Book Your Airport Transfer": "Buchen Sie Ihren Flughafentransfer",
    "Book Your Luxury Tour": "Buchen Sie Ihre Luxustour",
    "Book Your One-Way Transfer": "Buchen Sie Ihren One-Way-Transfer",
    "Book by the Hour": "Stundenweise buchen",
    "By the Hour | Full Day": "Stundenweise | Ganzer Tag",
    "Book Full Day": "Ganztägig buchen",
    "Booking Confirmed!": "Buchung bestätigt!",
    "Booking Details": "Buchungsdetails",
    "Booking Summary": "Buchungsübersicht",
    "Calculating Price...": "Preis wird berechnet...",
    "Calculating distance...": "Entfernung wird berechnet...",
    "Calculating price...": "Preis wird berechnet...",
    "Calculating route...": "Route wird berechnet...",
    "Calculating...": "Berechnung...",
    "Preparing your price request...": "Ihre Preisanfrage wird vorbereitet...",
    "Contact us for pricing": "Kontaktieren Sie uns für Preise",
    "Do you need vehicles for guest transport?":
      "Benötigen Sie Fahrzeuge für den Gästetransport?",
    "How many vehicles do you need?": "Wie viele Fahrzeuge benötigen Sie?",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "Für den Transport von Hochzeitsgästen und Begleitung. Es sind nur moderne Fahrzeuge verfügbar.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "Wir bestätigen zuerst die Verfügbarkeit, danach sehen Sie den endgültigen Gesamtbetrag auf der sicheren Stripe-Checkout-Seite.",
    "Decoration Options (Optional)": "Dekorationsoptionen (optional)",
    "Decoration Price (€)": "Dekorationspreis (€)",
    "Distance to Experience": "Entfernung zum Erlebnis",
    "Distance:": "Entfernung:",
    "Drop-off Location": "Zielort",
    "Drop-off location is required": "Zielort ist erforderlich",
    Duration: "Dauer",
    "Duration (Hours)": "Dauer (Stunden)",
    "Duration is required": "Dauer ist erforderlich",
    "Duration:": "Dauer:",
    "Email is required": "E-Mail ist erforderlich",
    "Enter decoration price": "Dekorationspreis eingeben",
    "Enter your first name": "Vornamen eingeben",
    "Enter your last name": "Nachnamen eingeben",
    "Event Start Time": "Startzeit des Events",
    "Event date is required": "Datum des Events ist erforderlich",
    "Event time is required": "Uhrzeit des Events ist erforderlich",
    "Extra Vehicle:": "Zusatzfahrzeug:",
    "Extra vehicle for luggage": "Zusatzfahrzeug für Gepäck",
    "Final Destination": "Endziel",
    "Final Location": "Endort",
    "Final destination is required": "Endziel ist erforderlich",
    "Final location is required": "Endort ist erforderlich",
    "First Name": "Vorname",
    "First name is required": "Vorname ist erforderlich",
    "Flight Information": "Fluginformationen",
    "Flight Number": "Flugnummer",
    "Flight number is required": "Flugnummer ist erforderlich",
    "For transporting wedding guests and party (6% VAT)":
      "Für den Transport von Hochzeitsgästen und Begleitung (6% MwSt.)",
    "Guest Transport": "Gästetransport",
    "Hand Luggage": "Handgepäck",
    "Hourly rates from €250": "Stundentarife ab 250 €",
    Includes: "Enthält",
    "Large Luggage": "Großes Gepäck",
    "Last Name": "Nachname",
    "Last name is required": "Nachname ist erforderlich",
    "Luggage Information": "Gepäckinformationen",
    "Main Fleet": "Hauptflotte",
    "Make a Special Request": "Sonderanfrage stellen",
    Max: "Max.",
    Maximum: "Maximum",
    "Maximum 6 trips per booking, 2 trips per hour":
      "Maximal 6 Fahrten pro Buchung, 2 Fahrten pro Stunde",
    Min: "Min.",
    Minimum: "Minimum",
    "Minimum 3 hours required": "Mindestens 3 Stunden erforderlich",
    "Minimum 3 hours required for main fleet bookings":
      "Mindestens 3 Stunden für Hauptflotte erforderlich",
    "Missing Cal.com configuration. Please try again later.":
      "Cal.com-Konfiguration fehlt. Bitte später erneut versuchen.",
    "Missing Cal.com username. Please configure":
      "Cal.com-Benutzername fehlt. Bitte konfigurieren",
    "Missing Cal.com username. Please set":
      "Cal.com-Benutzername fehlt. Bitte setzen",
    No: "Nein",
    "No decoration": "Keine Dekoration",
    "Note:": "Hinweis:",
    "Number of Participants": "Anzahl der Teilnehmer",
    "Number of Passengers": "Anzahl der Passagiere",
    "Number of Trips": "Anzahl der Fahrten",
    "Optional Add-ons": "Optionale Add-ons",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Azeitão)",
    "Participants & Options": "Teilnehmer & Optionen",
    Passenger: "Passagier",
    "Per-trip rates from €100": "Pro-Fahrt-Preise ab 100 €",
    "Personal Information": "Persönliche Informationen",
    "Phone number is required": "Telefonnummer ist erforderlich",
    "Pickup Location": "Abholort",
    "Pickup location is required": "Abholort ist erforderlich",
    Piece: "Stück",
    Pieces: "Stücke",
    "Please Complete the Form": "Bitte Formular vervollständigen",
    "Please Enter Locations": "Bitte Orte eingeben",
    "Please Enter Locations & Flight Details":
      "Bitte Orte und Flugdaten eingeben",
    "Please Enter Starting Location": "Bitte Startort eingeben",
    "Please Select a Vehicle": "Bitte Fahrzeug auswählen",
    "Please complete the pricing details before scheduling.":
      "Bitte Preisinformationen vor dem Planen vervollständigen.",
    "Please enter a starting location": "Bitte Startort eingeben",
    "Please enter a valid email address":
      "Bitte eine gültige E-Mail-Adresse eingeben",
    "Please enter both pickup and drop-off locations":
      "Bitte Abhol- und Zielort eingeben",
    "Please enter both starting location and destination":
      "Bitte Startort und Ziel eingeben",
    "Please enter flight number and airline":
      "Bitte Flugnummer und Fluggesellschaft eingeben",
    "Please fix the following errors:\n":
      "Bitte korrigieren Sie die folgenden Fehler:\n",
    "Please select a tour option": "Bitte eine Tour-Option auswählen",
    "Please select a tour option to continue.":
      "Bitte eine Tour-Option wählen, um fortzufahren.",
    "Please select a vehicle": "Bitte ein Fahrzeug auswählen",
    "Please select a vehicle for the tour":
      "Bitte ein Fahrzeug für die Tour auswählen",
    "Please select a vehicle for the tour.":
      "Bitte ein Fahrzeug für die Tour auswählen.",
    "Please select a vehicle to continue.":
      "Bitte ein Fahrzeug auswählen, um fortzufahren.",
    "Please select a vehicle to proceed":
      "Bitte ein Fahrzeug auswählen, um fortzufahren",
    "Please select a vehicle to schedule with Cal.com.":
      "Bitte ein Fahrzeug auswählen, um mit Cal.com zu planen.",
    "Preparing secure payment...": "Sichere Zahlung wird vorbereitet...",
    "Price Summary": "Preisübersicht",
    "Price:": "Preis:",
    "Schedule & Pay": "Planen & bezahlen",
    "Select Your Tour Experience": "Wählen Sie Ihre Tour-Erfahrung",
    "Select Your Vehicle": "Wählen Sie Ihr Fahrzeug",
    "Selected Vehicle": "Ausgewähltes Fahrzeug",
    "Service Type": "Servicetyp",
    "Starting Location": "Startort",
    "Starting from": "Ab",
    "Starting location is required": "Startort ist erforderlich",
    "Stripe checkout session URL missing.": "Stripe-Checkout-URL fehlt.",
    "Total Price": "Gesamtpreis",
    "Total Price:": "Gesamtpreis:",
    "Transfer Details": "Transferdetails",
    "Transfer Summary": "Transferübersicht",
    Transport: "Transport",
    "Trip Details": "Reisedetails",
    "Trip Summary": "Reiseübersicht",
    "Unable to create Stripe checkout session.":
      "Stripe-Checkout-Sitzung konnte nicht erstellt werden.",
    "Unable to create a Stripe checkout session.":
      "Stripe-Checkout-Sitzung konnte nicht erstellt werden.",
    VAT: "MwSt.",
    "Vehicle:": "Fahrzeug:",
    "We were unable to calculate a quote for this transfer.":
      "Wir konnten kein Angebot für diesen Transfer berechnen.",
    "Wedding Date": "Hochzeitsdatum",
    "Wedding Event Details": "Details der Hochzeitsveranstaltung",
    Yes: "Ja",
    "e.g., Ceremony Venue, Reception Hall":
      "z. B. Ort der Zeremonie, Empfangssaal",
    "e.g., Hotel, Church, Home": "z. B. Hotel, Kirche, Zuhause",
    "e.g., Lisbon Airport, Hotel": "z. B. Flughafen Lissabon, Hotel",
    "e.g., Lisbon Airport, Hotel Name":
      "z. B. Flughafen Lissabon, Hotelname",
    "e.g., Lisbon City Center, Hotel Name":
      "z. B. Zentrum Lissabon, Hotelname",
    "e.g., Porto City Center, Algarve Resort":
      "z. B. Zentrum Porto, Algarve-Resort",
    "e.g., TAP Air Portugal, Iberia": "z. B. TAP Air Portugal, Iberia",
    "e.g., TP 1234, IB 5678": "z. B. TP 1234, IB 5678",
    extra: "extra",
    "from your pickup location to": "von Ihrem Abholort bis",
    h: "h",
    hour: "Stunde",
    hours: "Stunden",
    km: "km",
    "km included": "km enthalten",
    participant: "Teilnehmer",
    participants: "Teilnehmer",
    "participants allowed for this tour":
      "Teilnehmer für diese Tour erlaubt",
    "participants required for this tour":
      "Teilnehmer für diese Tour erforderlich",
    "per km": "pro km",
    "per person": "pro Person",
    pp: "p.P.",
    "the experience": "das Erlebnis",
    trip: "Fahrt",
    trips: "Fahrten",
    "your@email.com": "ihre@email.com",
    "A Ceremony of Distinction": "Eine Zeremonie von Rang",
    "A Commitment to Excellence": "Ein Bekenntnis zur Exzellenz",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "Ein Vermächtnis der Exzellenz, aufgebaut auf Leidenschaft, Präzision und einem unerschütterlichen Bekenntnis zu",
    "AZEITÃO": "AZEITÃO",
    "About Chevalier Lane": "Über Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "Aggressive Frontansicht in Dreiviertelperspektive mit Mehrspeichenrädern und Chromgrill",
    "Amount:": "Betrag:",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "Ein stündlicher Service mit Flexibilität, Diskretion und ununterbrochener Verfügbarkeit.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "Etwaige Ernährungsanforderungen, Barrierefreiheitsbedürfnisse, bevorzugte Sprachen oder besondere Wünsche...",
    "Any special requirements, accessibility needs, or additional services...":
      "Etwaige besondere Anforderungen, Barrierefreiheitsbedürfnisse oder zusätzliche Services...",
    "Any special requirements, decoration details, or additional services...":
      "Etwaige besondere Anforderungen, Dekorationsdetails oder zusätzliche Services...",
    "Arrive in first class": "Kommen Sie in der ersten Klasse an",
    "Arrive with Confidence": "Kommen Sie selbstbewusst an",
    "Arrive with Elegance": "Kommen Sie mit Eleganz an",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "Als einziges Unternehmen in Lissabon mit klassischen und modernen Luxusfahrzeugen schlagen wir die Brücke zwischen automobilen Traditionen und zeitgenössischer Exzellenz. Unsere Sammlung reicht von ikonischen Mercedes-Pagodas der 1960er bis zu hochmodernen Bentley Mulsannes.",
    "Back to Tours": "Zurück zu Touren",
    "Back to Wedding Bookings": "Zurück zu Hochzeitsbuchungen",
    "Back to wedding services": "Zurück zu Hochzeitsservices",
    "Because how you arrive matters as much as where you’re going.":
      "Denn wie Sie ankommen, ist genauso wichtig wie wohin Sie fahren.",
    "Bentley Flying Spur detail - Exterior":
      "Bentley Flying Spur Detail – Exterieur",
    "Bentley Flying Spur detail - Front view":
      "Bentley Flying Spur Detail – Frontansicht",
    "Bentley Flying Spur detail - Interior":
      "Bentley Flying Spur Detail – Interieur",
    "Bentley Flying Spur detail - Rear view":
      "Bentley Flying Spur Detail – Heckansicht",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Bentley Mulsanne Detail – Nahaufnahme des Flying-B-Emblems auf der Motorhaube",
    "Bentley Mulsanne detail - Front view":
      "Bentley Mulsanne Detail – Frontansicht",
    "Bentley Mulsanne detail - Interior":
      "Bentley Mulsanne Detail – Interieur",
    "Bentley Mulsanne detail - Rear view":
      "Bentley Mulsanne Detail – Heckansicht",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne vorn rechts – Exterieur",
    "Bentley Mulsanne profile detail": "Bentley Mulsanne Profil-Detail",
    "Bentley Mulsanne rear quarter detail":
      "Bentley Mulsanne Heckviertel-Detail",
    "Bentley Mulsanne side view - Exterior":
      "Bentley Mulsanne Seitenansicht – Exterieur",
    "Book Your Tour": "Buchen Sie Ihre Tour",
    "Book another transfer": "Einen weiteren Transfer buchen",
    "Change language": "Sprache ändern",
    Chauffeur: "Chauffeur",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "Ankünfte mit Chauffeur, Privatsphäre, Komfort und feinen Details. Auf Wunsch eine kuratierte Auswahl an Wein, Champagner und individuellen Erfrischungen.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "Chauffierte Fahrten zwischen Zuhause, Zeremonie und Empfang, präzise und umsichtig durchgeführt.",
    "Checking Stripe...": "Stripe wird geprüft...",
    "Chevalier Lane Logo": "Chevalier-Lane-Logo",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "Chevalier Lane hat den Luxus-Transport neu definiert und ist das einzige Unternehmen in Lissabon, das sowohl modernen Luxus als auch klassische Eleganz bietet.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "Transfers mit klassischen Fahrzeugen beinhalten ein zusätzliches Fahrzeug (Range Rover Vogue) für Gepäck zu",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "Klassische Front mit markanter Motorhaube und Chromstoßstangen",
    "Classic heritage and modern innovation in one exclusive collection":
      "Klassisches Erbe und moderne Innovation in einer exklusiven Kollektion",
    "Close-up of the Mercedes bonnet star and grille badge":
      "Nahaufnahme des Mercedes-Sterns auf der Motorhaube und des Grillabzeichens",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "Nahaufnahme der Spirit of Ecstasy mit Reflexionen auf der Motorhaube",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "Nahaufnahme des glänzend schwarzen Flying-B-Emblems auf der Motorhaube",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "Nahaufnahme des Rads mit Rolls-Royce-Nabenkappe und Zier ring",
    "Complete Fleet": "Gesamtflotte",
    "Complete fleet hero": "Hero der gesamten Flotte",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "Umfassende Luxus-Transportlösungen, abgestimmt auf jeden Anlass und jede Anforderung.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "Frontale Dreiviertelansicht des Cabriolets mit Grill, vierfachen Scheinwerfern und Chromdetails",
    Crafting: "Gestalten",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "Seit unserer Gründung gestalten wir unvergleichliche Erlebnisse – jede Reise mit Chevalier Lane ist der Höhepunkt des Luxus-Transports.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "Vordere Sitzbank aus cremefarbenem Leder mit Armaturenbrett und Zierleisten aus Walnussfurnier",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "Schaffen Sie unvergessliche Erinnerungen mit unseren Premium-Hochzeitstransfers. Wählen Sie unsere klassische Hauptflotte für das Paar oder zusätzliche Fahrzeuge für Ihre Gäste.",
    Curated: "Kuratierte",
    "Details That Matter": "Details, die zählen",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "Entdecken Sie das gesamte Spektrum an Luxus-Transporterlebnissen für anspruchsvolle Personen, die nichts weniger als Perfektion erwarten.",
    "Discreet coordination from runway to destination.":
      "Diskrete Koordination von der Landebahn bis zum Ziel.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "Diskrete, elegante Ankünfte für Meetings, Shopping oder persönliche Routen.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "Diskrete, elegante Einzelfahrten für Paare und intime Momente.",
    "Driver's seat with classic Mercedes styling":
      "Fahrersitz mit klassischem Mercedes-Design",
    "Driver's wheel with classic Mercedes styling":
      "Lenkrad im klassischen Mercedes-Stil",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "Fahrerorientiertes Cockpit mit Multifunktionslenkrad und Mittelkonsole",
    "Elegant front left view showcasing the pagoda's elegant design":
      "Elegante Frontansicht links, die das Pagoda-Design zeigt",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "Elegante türkisfarbene Karosserie mit fließenden Linien und Chromdetails aus erhöhter Perspektive",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "Elegante, nahtlose Einzelfahrten zwischen Flughäfen, Hotels, Villen und Stadtzentren – abgestimmt auf Ihren Zeitplan.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "Elegante, nahtlose Hochzeitsfahrten von der Zeremonie zur Feier, abgestimmt auf den Ablauf Ihres besonderen Tages.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "Heben Sie Ihre Geschäftsreisen mit eleganten, zuverlässigen Transportlösungen auf ein neues Niveau. Unser Corporate-Transportservice ist für Führungskräfte, Geschäftsreisende und Unternehmen konzipiert, die Kunden und Partner beeindrucken wollen. Wir bieten nahtlose Koordination für Meetings, Konferenzen und VIP-Besuche mit kompromissloser Professionalität und Vertraulichkeit.",
    "Enter a starting location to calculate driving distance.":
      "Geben Sie einen Startort ein, um die Fahrdistanz zu berechnen.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "Jedes Detail Ihrer privaten Tour wird sorgfältig geplant, um eine unvergessliche Reise durch Portugals exklusivste Weinerlebnisse zu gewährleisten.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "Jede Reise mit Chevalier Lane ist ein Zeugnis unserer Hingabe an Perfektion. Vom Moment der Reservierung bis zur Ankunft am Ziel wird jedes Detail sorgfältig orchestriert, um ein unvergessliches Erlebnis zu gewährleisten.",
    "Exclusive Access": "Exklusiver Zugang",
    "Executive time, reserved": "Executive-Zeit, reserviert",
    "Experience Excellence": "Erleben Sie Exzellenz",
    "Experience Luxury Like Never Before": "Erleben Sie Luxus wie nie zuvor",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "Erleben Sie Portugals beste Weinregionen mit unseren exklusiven Privattouren. Wählen Sie unten Ihr bevorzugtes Erlebnis und sehen Sie die Preisaktualisierung in Echtzeit.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "Erleben Sie Premium-Flughafentransfers mit unserer Luxusflotte ab Tires (Flughafen Cascais). Alle Preise unterliegen 6% MwSt.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "Erleben Sie Premium-Flughafentransfers mit unserer Luxusflotte. Unsere modernen Fahrzeuge bieten Komfort, Zuverlässigkeit und Annehmlichkeiten an Bord für anspruchsvolle Gäste, während unsere Klassiker ein einzigartiges und unvergessliches Erlebnis bieten. Alle Transfers beinhalten Priority-Meet-&-Greet, Flugverfolgung, Gepäckhilfe und Mehrsprachigkeit.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "Erleben Sie nahtlosen Einzelfahrten-Transport mit unserem Premium-Chauffeurservice. Ob Flughafen–Hotel, zwischen Städten oder jede andere Point-to-Point-Fahrt – wir bieten komfortable, zuverlässige und elegante Lösungen, abgestimmt auf Ihren Zeitplan und Ihre Wünsche.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "Erleben Sie den Unterschied, der aus über zwei Jahrzehnten Exzellenz im Luxus-Transport und einem unerschütterlichen Anspruch an Perfektion in jedem Detail entsteht.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "Erleben Sie die Pracht eines Palastes aus dem 16. Jahrhundert kombiniert mit Weltklasse-Weinproduktion. Unsere exklusiven Privattouren bieten intimen Zugang zum historischen Anwesen, umfangreichen Kunstsammlungen und Premium-Weinproben im Herzen der renommierten Weinregion Portugals.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "Erleben Sie wirklich einzigartige Momente, die gewöhnlichen Luxus-Transport übertreffen. Unsere exklusiven Erlebnisse verbinden feinste Fahrzeuge mit außergewöhnlichen Zielen, VIP-Zugang und persönlichen Concierge-Services. Von privaten Villenbesuchen bis zu exklusiven Kulturveranstaltungen schaffen wir maßgeschneiderte Erlebnisse, die Ihre Leidenschaften widerspiegeln.",
    "Explore Options": "Optionen entdecken",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "Entdecken Sie unsere gesamte Flotte klassischer Meisterwerke und moderner Wunder. Ob zeitlose Eleganz oder modernster Luxus – jedes Fahrzeug ist sorgfältig gepflegt und bereit, Ihre nächste Reise zu veredeln.",
    "Exterior of the Bentley Flying Spur": "Exterieur des Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "Exterieur des Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "Exterieur des Mercedes-Benz S-Class Maybach",
    "First class on the road": "Erste Klasse auf der Straße",
    "Fold-out walnut picnic trays for rear passengers":
      "Ausklappbare Walnuss-Picknicktabletts für die Fondpassagiere",
    "For Romantic Dates": "Für romantische Dates",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "Für das Paar – stationäre Nutzung, Fotos, Zeremonien (23% MwSt.)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "In Lissabon, Portugal, entstand Chevalier Lane aus einer einfachen, aber tiefen Vision: Luxus-Transport neu zu definieren, indem zeitlose Eleganz mit moderner Raffinesse kombiniert wird. Was als Leidenschaftsprojekt begann, entwickelte sich zum führenden Luxus-Chauffeurservice Portugals.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "Vom Rolls-Royce Silver Cloud bis zur imposanten Präsenz des Bentley Mulsanne erzählt jedes Fahrzeug unserer Sammlung eine Geschichte von technischer Exzellenz und kompromisslosem Luxus.",
    "Front grill with classic Mercedes styling":
      "Frontgrill im klassischen Mercedes-Stil",
    "Front right side view of the Bentley Mulsanne":
      "Vorne rechts Ansicht des Bentley Mulsanne",
    "Front view of the Bentley Flying Spur":
      "Frontansicht des Bentley Flying Spur",
    "Front view of the Bentley Mulsanne": "Frontansicht des Bentley Mulsanne",
    "Front view of the Mercedes-Benz S-Class Maybach": "Frontansicht des Mercedes-Benz S-Class Maybach",
    "Full view of the pagoda's elegant design":
      "Gesamtansicht des eleganten Pagoda-Designs",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "Anmutige, diskrete Abholung, die einen ruhigen und eleganten Beginn Ihres besonderen Tages garantiert.",
    "Group:": "Gruppe:",
    "Happy Clients": "Zufriedene Kunden",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "Frontansicht des Pantheon-Grills mit Club-Abzeichen und Chromstoßstange",
    Highlights: "Highlights",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "Stündliche Verfügbarkeit für Business-Meetings, Reiserouten und Executive-Zeitpläne.",
    "Immersive Chevalier Lane showcase":
      "Immersive Chevalier-Lane-Präsentation",
    "Includes:": "Enthält:",
    "Interior of the Bentley Flying Spur": "Interieur des Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "Interieur des Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "Interieur des Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "Schließen Sie sich Tausenden anspruchsvoller Kunden an, die Chevalier Lane vertrauen, gewöhnliche Reisen in",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "Langes, niedriges Seitenprofil, das die geschwungene Karosserielinie und Heckflossen betont",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "Frontale Dreiviertelaufnahme aus niedriger Perspektive mit vierfachen Scheinwerfern und Grill",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "Seitliche Ansicht aus niedriger Perspektive, die den vorderen Kotflügel, Chromleisten und die Haltung betont",
    "Luxury Tours": "Luxus-Touren",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "Luxus-Flughafentransfers mit Priority-Service, Flugüberwachung und nahtlosem Transport vom Flughafen Tires zu Ihrem Ziel.",
    "Luxury car interior": "Innenraum eines Luxuswagens",
    "Luxury services": "Luxusservices",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "Haupt-Hochzeitsflotte: stationär/Nutzung durch das Paar – beinhaltet keine Dekorationen und Designs nach Kundenwunsch",
    "Mercedes 280SL Pagoda - Driver's Seat":
      "Mercedes 280SL Pagoda – Fahrersitz",
    "Mercedes 280SL Pagoda - Driver's Wheel":
      "Mercedes 280SL Pagoda – Lenkrad",
    "Mercedes 280SL Pagoda - Front Grill":
      "Mercedes 280SL Pagoda – Frontgrill",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda – Frontansicht links",
    "Mercedes 280SL Pagoda - Full View":
      "Mercedes 280SL Pagoda – Gesamtansicht",
    "Mercedes 280SL Pagoda - Rear View":
      "Mercedes 280SL Pagoda – Heckansicht",
    "Mercedes-Benz S-Class Maybach detail - Exterior":
      "Mercedes-Benz S-Class Maybach Detail – Exterieur",
    "Mercedes-Benz S-Class Maybach detail - Front view":
      "Mercedes-Benz S-Class Maybach Detail – Frontansicht",
    "Mercedes-Benz S-Class Maybach detail - Interior":
      "Mercedes-Benz S-Class Maybach Detail – Interieur",
    "Mercedes-Benz S-Class Maybach detail - Rear view":
      "Mercedes-Benz S-Class Maybach Detail – Heckansicht",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Mercedes S500 BRABUS Detail – Nahaufnahme des Stern-Emblems auf der Motorhaube",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS Exterieur – Frontansicht gerade",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS Exterieur – Frontansicht in Dreiviertelperspektive aus niedriger Perspektive",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS Interieur – Heckansicht",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS Interieur – Lenkrad und Cockpit",
    "Mercedes S500 BRABUS rim": "Felge des Mercedes S500 BRABUS",
    "Missing Stripe session reference":
      "Fehlende Stripe-Sitzungsreferenz",
    "Next image": "Nächstes Bild",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 Exterieur – Frontansicht in Dreiviertelperspektive mit offenem Verdeck",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 Exterieur – vollständiges Seitenprofil",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 Exterieur – Heckansicht",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 Interieur – Armaturenbrett und Lenkrad",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 Interieur – Fondbereich und Türverkleidung",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 Interieur – weite Kabinenansicht",
    "Optional Add-ons:": "Optionale Zusatzleistungen:",
    "Our Expertise": "Unsere Expertise",
    "Our Story": "Unsere Geschichte",
    "Our Unique Position": "Unsere einzigartige Position",
    "Our Values": "Unsere Werte",
    "Payment canceled": "Zahlung abgebrochen",
    "Personal Experience": "Persönliche Erfahrung",
    "Play Lisbon in Motion video":
      "Lisbon in Motion-Video abspielen",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "Bitte geben Sie die Anzahl an Handgepäck (Carry-on) und großem Gepäck (aufgegeben) an, mit dem Sie reisen.",
    "Premium Transport": "Premium-Transport",
    "Previous image": "Vorheriges Bild",
    Private: "Privat",
    "Private aviation, perfected": "Privatluftfahrt, perfektioniert",
    "Punctual, flexible transportation designed entirely around your pace.":
      "Pünktlicher, flexibler Transport, vollständig auf Ihr Tempo abgestimmt.",
    "Ready to Create Your Perfect Experience?":
      "Bereit, Ihr perfektes Erlebnis zu gestalten?",
    "Rear seat and door panel details with chrome window winder and trim":
      "Details des Rücksitzes und der Türverkleidung mit Chrom-Fensterkurbel und Zierleisten",
    "Rear view of the Bentley Flying Spur":
      "Heckansicht des Bentley Flying Spur",
    "Rear view of the Bentley Mulsanne":
      "Heckansicht des Bentley Mulsanne",
    "Rear view of the Mercedes-Benz S-Class Maybach":
      "Heckansicht des Mercedes-Benz S-Class Maybach",
    "Rear view of the Mercedes S500 BRABUS":
      "Heckansicht des Mercedes S500 BRABUS",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "Heckansicht des Silver Shadow mit markanten Rückleuchten und Chromleisten",
    "Rear view of the pagoda's elegant design":
      "Heckansicht des eleganten Pagoda-Designs",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "Rot-weißes Interieur von den Rücksitzen aus mit Armaturenbrett und vorderer Sitzbank",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "Veredelte florale Akzente, Bänder und personalisierte Details, arrangiert zur Ergänzung Ihrer Feier.",
    "Reserved Availability": "Reservierte Verfügbarkeit",
    "Return Home": "Zur Startseite",
    "Rim of the Mercedes S500 BRABUS": "Felge des Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II Exterieur – Frontansicht in Dreiviertelperspektive",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II Interieur – Frontkabine und Armaturenbrett",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II Interieur – linke Seitenansicht aus erhöhtem Winkel",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II Interieur – hintere Picknicktische",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II Interieur – Rücksitz und Dachhimmel",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Rolls-Royce Silver Shadow Detail – Spirit of Ecstasy auf der Motorhaube",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Rolls-Royce Silver Shadow Detail – Rad und Nabenkappe",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow Exterieur – Frontansicht mit Grillabzeichen",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow Exterieur – Frontansicht in Dreiviertelperspektive aus niedriger Perspektive",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow Exterieur – niedriges Seitenprofil",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow Exterieur – Heckansicht mit Rückleuchten",
    "Scenic routes": "Malerische Routen",
    "Service Available": "Service verfügbar",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "Geräumiger Fond mit cremefarbenem Leder und Holzakzenten",
    "Special Requests": "Sonderwünsche",
    "Start Planning": "Planung starten",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "Heckansicht von hinten mit raketeninspirierten Heckflossen und Rückleuchten",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "Frontansicht des Armaturenbretts mit Doppelinstrumenten und klassischem Lenkrad",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Danke, dass Sie Chevalier Lane gewählt haben. Ihre Anfrage für den Flughafentransfer ist eingegangen und unser Concierge-Team wird sich in Kürze melden, um die Details zu bestätigen und Ihre Reservierung abzuschließen.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Danke, dass Sie Chevalier Lane gewählt haben. Ihre Buchungsanfrage ist eingegangen und unser Concierge-Team wird sich in Kürze melden, um die Details zu bestätigen und Ihre Reservierung abzuschließen.",
    "Thank you for your payment": "Danke für Ihre Zahlung",
    "The Beginning": "Der Anfang",
    "The Bride’s Arrival": "Die Ankunft der Braut",
    "The principles that guide every decision and shape every experience we create.":
      "Die Prinzipien, die jede Entscheidung leiten und jedes Erlebnis formen, das wir schaffen.",
    "Timeless Elegance": "Zeitlose Eleganz",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "Verwandeln Sie Ihren besonderen Tag mit unseren Premium-Hochzeitstransfers in ein unvergessliches Erlebnis. Unsere klassischen und modernen Luxusfahrzeuge bieten die perfekte Kulisse für Ihre schönsten Hochzeitsmomente. Von der Ankunft zur Zeremonie bis zur Abfahrt vom Empfang sorgen wir dafür, dass jeder Aspekt Ihres Hochzeitstransports mit Eleganz und Präzision umgesetzt wird.",
    "Unable to confirm payment status":
      "Zahlungsstatus konnte nicht bestätigt werden",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "Entfernung konnte nicht geschätzt werden. Der Fahrzeugpreis entspricht dem Mindestpreis; der tatsächliche Gesamtpreis kann variieren.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "Unvergleichlicher Komfort, Privatsphäre und Raffinesse – ohne Kompromisse.",
    "View other tours": "Weitere Touren ansehen",
    "We’ll calculate the transfer distance to your selected experience.":
      "Wir berechnen die Transferdistanz zu Ihrem ausgewählten Erlebnis.",
    "Wide front view highlighting the large grille and swept headlamps":
      "Breite Frontansicht, die den großen Grill und die geschwungenen Scheinwerfer betont",
    "Your Time, Perfectly Managed": "Ihre Zeit, perfekt gemanagt",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "Ihr persönlicher Fahrer bietet ein reibungsloses, diskretes und aufmerksames Erlebnis von Anfang bis Ende.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "z. B. Flughafen Tires (Cascais), Flughafen Lissabon",
    "exceptional service": "außergewöhnlicher Service",
    "extraordinary experiences": "außergewöhnliche Erlebnisse",
    hero: "Hero",
    "more inclusions": "weitere Inklusivleistungen",
    processing: "wird verarbeitet",
    "profile view": "Profilansicht",
    "through the art of luxury transportation since our founding.":
      "durch die Kunst des Luxus-Transports seit unserer Gründung.",
    "unparalleled experiences": "unvergleichliche Erlebnisse",
  },
  ru: {
    "Airport Transfers": "Трансферы в аэропорт",
    "Discreet chauffeur service to and from the airport.": "Надежные трансферы в аэропорт",
    "Bentley Flying Spur": "Bentley Flying Spur",
    "Bentley Mulsanne": "Bentley Mulsanne",
    "Business Travel": "Бизнес-поездки",
    "Classic Collection": "Классическая коллекция",
    "Classic Wedding Fleet": "Классический свадебный парк",
    "Corporate Transportation": "Корпоративный транспорт",
    "Executive Vehicles": "Представительские автомобили",
    "Fixed Price Transfers": "Фиксированная стоимость",
    "Flight Tracking": "Отслеживание рейсов",
    "Chauffeured Transport": "Транспорт с водителем",
    "Meeting Coordination": "Координация встреч",
    "Historic Palaces": "Исторические дворцы",
    "Luxury Tours & Scenic Routes": "Роскошные туры и живописные маршруты",
    "Make Your Own Exclusive Experiences by the Hour": "Создайте собственные эксклюзивные впечатления почасово",
    "Modern Luxury Fleet": "Современный автопарк класса люкс",
    "Modern Transport": "Современный транспорт",
    "Oldsmobile Super 88": "Oldsmobile Super 88",
    "One-Way Transportation": "Поездки в одну сторону",
    "Partner Brands": "Партнерские бренды",
    "Priority Meet & Greet": "Приоритетная встреча",
    "Private Villa Access": "Доступ к частным виллам",
    "Private Wine Tastings": "Приватные дегустации вина",
    "Personal Concierge": "Личный консьерж",
    "Professional Service": "Профессиональный сервис",
    "Rolls-Royce Silver Cloud II": "Rolls-Royce Silver Cloud II",
    "Rolls-Royce Silver Shadow": "Rolls-Royce Silver Shadow",
    "Splendour Luxury Group": "Splendour Luxury Group",
    "VIP Event Transport": "VIP-транспорт для мероприятий",
    "Wedding Services": "Свадебные услуги",
    "Wedding Services Description": "Сделайте ваш особенный день незабываемым с нашим свадебным сервисом.",
    About: "О компании",
    AboutUs: "О нас",
    "A Legacy of Excellence": "Наследие совершенства",
    "A glimpse into the journeys we create — from intimate celebrations and wedding arrivals to scenic routes and bespoke corporate occasions.":
      "Взгляд на наши поездки — от камерных торжеств и свадебных заездов до живописных маршрутов и корпоративных мероприятий на заказ.",
    "Book Your Experience": "Забронировать поездку",
    "A professional chauffeur service available by the hour.": "Профессиональный деловой транспорт",
    Contact: "Контакты",
    ContactUs: "Свяжитесь с нами",
    "Ready to experience unparalleled luxury transportation?":
      "Готовы испытать непревзойденный роскошный транспорт?",
    "Get in touch with us today.": "Свяжитесь с нами сегодня.",
    "Call Us": "Позвоните нам",
    "24/7 Available": "Доступно 24/7",
    "Email Us": "Напишите нам",
    "We respond within 2 hours": "Мы отвечаем в течение 2 часов",
    "Send Us a Message": "Отправьте нам сообщение",
    "Whether you need transportation for a special occasion, business meeting, or simply wish to experience the pinnacle of luxury travel, we're here to make it happen.":
      "Нужен транспорт для особого случая, деловой встречи или вы хотите ощутить вершину роскошных поездок — мы готовы помочь.",
    "Message Sent Successfully!": "Сообщение успешно отправлено!",
    "Thank you for contacting us. We'll get back to you within 2 hours.":
      "Спасибо за обращение. Мы свяжемся с вами в течение 2 часов.",
    "Full Name *": "Полное имя *",
    "Your full name": "Ваше полное имя",
    "Email Address *": "Адрес электронной почты *",
    "your.email@example.com": "ваш.email@пример.com",
    "Phone Number": "Номер телефона",
    "Subject *": "Тема *",
    "Select a subject": "Выберите тему",
    "Booking Inquiry": "Запрос на бронирование",
    "Corporate Services": "Корпоративные услуги",
    "Special Event": "Особое мероприятие",
    "General Information": "Общая информация",
    "Feedback": "Отзывы",
    "Message *": "Сообщение *",
    "Please describe your requirements and any specific details...":
      "Опишите ваши требования и любые детали...",
    "Send Message": "Отправить сообщение",
    "Get in Touch": "Связаться",
    Phone: "Телефон",
    "Available 24/7 for urgent requests": "Доступно 24/7 для срочных запросов",
    Email: "Электронная почта",
    Location: "Адрес",
    "Miraflores, Lisbon": "Мирафлореш, Лиссабон",
    "Serving all of Portugal and beyond": "Работаем по всей Португалии и за ее пределами",
    "Business Hours": "Часы работы",
    "Monday - Sunday": "Понедельник - Воскресенье",
    "Why Choose Us?": "Почему выбирают нас?",
    "Years Experience": "Лет опыта",
    "Luxury Vehicles": "Роскошные автомобили",
    Satisfaction: "Удовлетворенность",
    "Ready to Begin Your Journey?": "Готовы начать путешествие?",
    "Experience the pinnacle of luxury transportation. Every detail crafted to perfection, every moment designed for":
      "Ощутите вершину роскошного транспорта. Каждая деталь доведена до совершенства, каждый момент создан для",
    "unforgettable elegance": "незабываемой элегантности",
    "Call Now": "Позвонить сейчас",
    "Send Email": "Отправить письмо",
    "Direct premium transportation between locations.": "Удобные поездки в одну сторону",
    "Experience seamless one-way transportation with our premium chauffeur service. Flexible point-to-point luxury transportation solutions tailored to your schedule.":
      "Плавные поездки в одну сторону с нашим премиальным сервисом водителя. Гибкие маршруты от двери до двери, подстроенные под ваше расписание.",
    "Elevate your business travel with sophisticated, reliable transportation solutions designed for executives and companies seeking to impress clients.":
      "Повышайте уровень деловых поездок с надежными и продуманными решениями для руководителей и компаний, стремящихся впечатлить клиентов.",
    "Experience premium airport transfers with our luxury fleet. Priority meet & greet service, flight tracking, and seamless transfers from Tires (Cascais Airport).":
      "Премиальные трансферы в аэропорт с нашим парком люксовых авто. Приоритетная встреча, отслеживание рейсов и бесшовные поездки из Тереш (аэропорт Кашкайша).",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Classic and modern luxury vehicles for your most cherished moments.":
      "Превратите ваш особенный день в незабываемое впечатление с нашим премиальным свадебным сервисом. Классические и современные роскошные автомобили для самых ценных моментов.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. VIP access, private villa visits, and bespoke experiences.":
      "Переживите по-настоящему уникальные моменты, выходящие за рамки обычного люксового транспорта: VIP-доступ, визиты в частные виллы и персональные впечатления.",
    "Curated Experiences": "Индивидуальные впечатления",
    "Every journey with Chevalier Lane is meticulously crafted to exceed expectations, offering unparalleled service that transforms ordinary moments into extraordinary memories.":
      "Каждая поездка с Chevalier Lane тщательно продумана, чтобы превзойти ожидания, предлагая исключительный сервис, который превращает обычные моменты в незабываемые.",
    "Experience luxury transportation with our premium chauffeur service. Reserve your vehicle and destinations below.":
      "Насладитесь роскошным транспортом с нашим премиальным сервисом водителей. Забронируйте автомобиль и направления ниже.",
    "Exclusive Services": "Эксклюзивные услуги",
    "Explore Our Fleet": "Посмотреть автопарк",
    "Private chauffeur-driven tours and experiences.": "Экскурсии и поездки по достопримечательностям",
    "Immersive Journey": "Погружение в путешествие",
    "Learn More": "Подробнее",
    "Lisbon in Motion": "Лиссабон в движении",
    "Luxury Concierge & Boutique Chauffeur Service": "Премиальный консьерж и бутик‑сервис водителей",
    "Luxury Concierge & Boutique Chauffeur Service description":
      "От элегантности Rolls-Royce до современного комфорта Bentley в Лиссабоне — путешествуйте с непревзойденным шиком.",
    "Moments in Motion": "Мгновения в движении",
    "Private chauffeur experience in Lisbon": "Опыт личного водителя в Лиссабоне",
    "Professional chauffeur services for all your transportation needs":
      "Профессиональные услуги водителя для любых поездок",
    "Service": "Сервис",
    "Signature Services": "Фирменные услуги",
    "Timeless elegance with our classic luxury vehicles":
      "Безупречная элегантность наших классических автомобилей",
    "Tours": "Туры",
    "We Tailor Every Experience to You": "Мы создаем впечатления под вас",
    "Weddings": "Свадьбы",
    "of": "из",
    "Private Chauffeur Service": "Услуги личного водителя",
    Services: "Услуги",
    "Our Services": "Наши услуги",
    "One-Way Services": "Поездки в одну сторону",
    "Classic Fleet": "Классический парк",
    "Modern Fleet": "Современный парк",
    Language: "Язык",
    "Luxury transportation services": "Услуги премиального транспорта",
    "Classic Fleet Overview": "Обзор классического парка",
    "Modern Fleet Overview": "Обзор современного парка",
    "About Us": "О нас",
    "Contact Us": "Свяжитесь с нами",
    "Contemporary luxury with cutting-edge technology":
      "Современная роскошь с передовыми технологиями",
    "Contact Info": "Контакты",
    "Toggle menu": "Открыть/закрыть меню",
    "24/7 Service Available": "Работаем 24/7",
    "All rights reserved.": "Все права защищены.",
    "Exclusive Fleet": "Эксклюзивный парк",
    "Reserve": "Бронировать",
    "Explore": "Исследовать",
    "About This Vehicle": "Об этом автомобиле",
    "Specifications": "Характеристики",
    "Key Features": "Ключевые особенности",
    "Pricing Options": "Варианты стоимости",
    "Reserve This Vehicle": "Забронировать этот автомобиль",
    "Contact our concierge team to arrange your exclusive transportation experience.":
      "Свяжитесь с нашей службой консьержей, чтобы организовать эксклюзивную поездку.",
    "Call Concierge": "Позвонить консьержу",
    "Signature Collection": "Эксклюзивная коллекция",
    "Book Your Car": "Забронировать автомобиль",
    "Explore Fleet": "Посмотреть автопарк",
    "Our Complete Fleet": "Весь наш автопарк",
    "Ready to Experience Luxury?": "Готовы испытать роскошь?",
    "Choose from our exquisite collection and let our professional chauffeurs transport you in unparalleled style and comfort.":
      "Выберите из нашей изысканной коллекции, и наши водители обеспечат непревзойденный стиль и комфорт.",
    "Book Your Vehicle": "Забронировать авто",
    "View Services": "Смотреть услуги",
    "Available Soon": "Скоро доступно",
    "Currently unavailable": "Сейчас недоступно",
    "Pricing shown at secure checkout": "Цена будет показана на защищенной странице оплаты",
    "View Details": "Подробнее",
    "Book Your Service": "Забронировать услугу",
    "Find Out Prices": "Узнать цены",
    "Explore Services": "Изучить услуги",
    "Complete Service Portfolio": "Полный портфель услуг",
    "Our flagship Bentley Mulsanne will soon be available for selected services.":
      "Наш флагманский Bentley Mulsanne скоро будет доступен для отдельных услуг.",
    "From everyday luxury transportation to once-in-a-lifetime experiences, our comprehensive service portfolio ensures every journey reflects the pinnacle of sophistication and excellence.":
      "От ежедневных люксовых поездок до уникальных впечатлений — наш портфель услуг гарантирует высший уровень изысканности и совершенства.",
    "Cutting-edge luxury with the latest automotive technology":
      "Передовой роскошный опыт с новейшими автотехнологиями",
    "Experience the pinnacle of modern automotive excellence with our contemporary fleet, featuring the most advanced luxury vehicles equipped with state-of-the-art technology and uncompromising comfort.":
      "Испытайте вершину современного автопрома с нашей современной флотилией, оснащенной передовыми люксовыми автомобилями и непревзойденным комфортом.",
    "The ultimate expression of German engineering excellence, combining power, luxury, and cutting-edge technology.":
      "Высшее выражение немецкой инженерии, сочетающее мощь, роскошь и передовые технологии.",
    "British luxury redefined, the Mulsanne offers unparalleled comfort and sophistication for the discerning traveler.":
      "Британская роскошь заново: Mulsanne дарит несравненный комфорт и изящество требовательным путешественникам.",
    "The pinnacle of luxury and refinement, the Mercedes-Benz S-Class Maybach delivers unmatched comfort and prestige.":
      "Вершина роскоши и утонченности: Mercedes-Benz S-Class Maybach обеспечивает непревзойденный комфорт и престиж.",
    "V8 Twin-Turbo Engine": "V8 битурбо двигатель",
    "BRABUS Performance": "Производительность BRABUS",
    "Executive Comfort": "Исполнительский комфорт",
    "Advanced Tech": "Передовые технологии",
    "Handcrafted Interior": "Ручной интерьер",
    "Air Suspension": "Пневмоподвеска",
    "Executive Seating": "Исполнительские сиденья",
    "V12 Engine": "Двигатель V12",
    "Executive Rear Seating": "Задние исполнительские сиденья",
    "Premium Materials": "Премиальные материалы",
    "Advanced Technology": "Передовые технологии",
    "Twin-Turbo V8 Power": "Мощность V8 с двумя турбинами",
    "Luxury Interior": "Роскошный интерьер",
    "Safety First": "Безопасность прежде всего",
    "Fuel Efficiency": "Экономия топлива",
    "Rear Entertainment Suite": "Развлекательная система сзади",
    "British Heritage": "Британское наследие",
    "V12 engine": "Двигатель V12",
    "Premium sound system": "Премиальная аудиосистема",
    "Engine": "Двигатель",
    "Power": "Мощность",
    "Transmission": "Трансмиссия",
    "Top Speed": "Максимальная скорость",
    "Acceleration": "Разгон",
    "Fuel Economy": "Расход топлива",
    "Drive Type": "Тип привода",
    "Passengers": "Пассажиры",
    "Luggage": "Багаж",
    "3 suitcases + 2 bags": "3 чемодана + 2 сумки",
    "2 suitcases + 2 bags": "2 чемодана + 2 сумки",
    "Base rate (max. 25km)": "Базовая ставка (макс. 25 км)",
    "Additional per km": "Дополнительно за км",
    "Classic": "Классический",
    "Modern": "Современный",
    "The epitome of British luxury, the Silver Cloud II offers unmatched refinement and prestige.":
      "Воплощение британской роскоши: Silver Cloud II обеспечивает непревзойденную утонченность и престиж.",
    "A masterpiece of automotive engineering, the Silver Shadow delivers power and luxury in perfect harmony.":
      "Шедевр автомобильной инженерии: Silver Shadow сочетает мощность и роскошь в идеальной гармонии.",
    "Experience American automotive heritage with the powerful and stylish Oldsmobile Super 88.":
      "Окунитесь в американское автонаследие с мощным и стильным Oldsmobile Super 88.",
    "The iconic Mercedes 280SL Pagoda represents automotive excellence from the golden age of motoring.":
      "Знаменитый Mercedes 280SL Pagoda воплощает автосовершенство золотой эпохи вождения.",
    "British elegance meets sporting performance in this iconic Jaguar XJ6, a true classic of automotive design.":
      "Британская элегантность встречается с спортивным духом в культовом Jaguar XJ6 — настоящем классике автодизайна.",
    "The ultimate expression of British luxury, the Double Six Daimler combines V12 power with unparalleled refinement.":
      "Высшее выражение британской роскоши: Double Six Daimler сочетает мощь V12 с непревзойденной утонченностью.",
    "Timeless elegance from the golden age of motoring":
      "Непреходящая элегантность золотой эпохи авто",
    "Discover our meticulously curated collection of classic automobiles, each representing the pinnacle of automotive craftsmanship from a bygone era of sophistication and style.":
      "Откройте нашу тщательно подобранную коллекцию классических авто, каждое из которых — вершина мастерства ушедшей эры изысканности и стиля.",
    "V8 Engine": "Двигатель V8",
    "Silent Ride": "Бесшумная поездка",
    "Royal Heritage": "Королевское наследие",
    "V8 Turbo Engine": "Турбированный V8",
    "Hydropneumatic Suspension": "Гидропневматическая подвеска",
    "Modern Classic": "Современная классика",
    "V8 Rocket Engine": "Двигатель V8 Rocket",
    "American Classic": "Американская классика",
    "Powerful Performance": "Мощная динамика",
    "Retro Design": "Ретро-дизайн",
    "Classic Design": "Классический дизайн",
    "Perfect for Events": "Идеально для мероприятий",
    "Straight-6 Engine": "Рядный 6-цилиндровый двигатель",
    "British Luxury": "Британская роскошь",
    "Sporting Heritage": "Спортивное наследие",
    "Timeless Design": "Вневременной дизайн",
    "Daimler Luxury": "Роскошь Daimler",
    "British Prestige": "Британский престиж",
    "Base rate (max. 20km)": "Базовая ставка (макс. 20 км)",
    "Additional km": "Дополнительный км",
    "Subject to request": "По запросу",
    "Pricing": "Стоимость",
    "1 suitcase + 2 bags": "1 чемодан + 2 сумки",
    "1 suitcase + 1 bag": "1 чемодан + 1 сумка",
    "3 suitcases + 3 bags": "3 чемодана + 3 сумки",
    "Spacious cabin with executive seating perfect for business travel and long journeys, complete with soothing massage functionality.":
      "Просторный салон с исполнительскими сиденьями, идеален для деловых поездок и дальних маршрутов, с расслабляющим массажем.",
    "Premium leather seating with massage function and climate control for ultimate comfort.":
      "Премиальные кожаные сиденья с массажем и климат-контролем для максимального комфорта.",
    "State-of-the-art infotainment system with navigation, connectivity, and driver assistance features.":
      "Современная мультимедиа с навигацией, подключением и ассистентами водителя.",
    "Enhanced with BRABUS power upgrades delivering exceptional performance and refinement.":
      "Усилен доработками BRABUS, обеспечивая исключительную мощность и утонченность.",
    "Handcrafted interior with premium materials and meticulous attention to detail.":
      "Ручная отделка салона премиальными материалами с вниманием к деталям.",
    "Comprehensive safety systems including adaptive cruise control and lane keeping assist.":
      "Полный набор систем безопасности, включая адаптивный круиз-контроль и ассистент удержания полосы.",
    "Optimized engine management for balanced performance and efficiency.":
      "Оптимизированное управление двигателем для баланса мощности и эффективности.",
    "Every detail meticulously crafted by master artisans using the finest materials available.":
      "Каждая деталь тщательно создана мастерами из лучших материалов.",
    "Powerful 6.75L twin-turbo V8 engine delivering effortless performance and refinement.":
      "Мощный 6,75-литровый V8 битурбо, обеспечивающий легкую динамику и утонченность.",
    "Advanced air suspension system provides unparalleled comfort and ride quality.":
      "Современная пневмоподвеска обеспечивает непревзойденный комфорт и плавность.",
    "Latest infotainment and connectivity features seamlessly integrated with luxury.":
      "Новейшие функции мультимедиа и связи, гармонично сочетающиеся с роскошью.",
    "Large high-resolution screen lets passengers enjoy TV and media in complete comfort.":
      "Большой экран высокого разрешения позволяет пассажирам наслаждаться ТВ и медиа с комфортом.",
    "Proud continuation of Bentley's legendary heritage and craftsmanship tradition.":
      "Гордая преемственность легендарного наследия и традиций мастерства Bentley.",
    "The Bentley Flying Spur is powered by a V12 engine, delivering exceptional performance and refinement.":
      "Bentley Flying Spur оснащен двигателем V12, обеспечивающим выдающуюся динамику и утонченность.",
    "The Bentley Flying Spur is equipped with a premium sound system, delivering exceptional audio quality.":
      "Bentley Flying Spur оборудован премиальной аудиосистемой с превосходным звучанием.",
    "The Bentley Flying Spur is a British car, built in the United Kingdom.":
      "Bentley Flying Spur — британский автомобиль, созданный в Великобритании.",
    "Luxury Lifestyle": "Роскошный образ жизни",
    "Wine Tasting": "Дегустация вина",
    "View previous experience": "Посмотреть предыдущий опыт",
    "View next experience": "Посмотреть следующий опыт",
    "View previous service": "Посмотреть предыдущую услугу",
    "View next service": "Посмотреть следующую услугу",
    "Go to service": "Перейти к услуге",
    "Distinguished Partnerships": "Выдающиеся партнерства",
    "Trusted Collaborations": "Надежные сотрудничества",
    "We work hand-in-hand with elite brands and tastemakers to deliver seamless, unforgettable journeys for their most discerning guests.":
      "Мы работаем рука об руку с лучшими брендами и лидерами мнений, чтобы обеспечивать безупречные и незабываемые поездки для самых требовательных гостей.",
    "Expand your brand presence with Chevalier Lane": "Расширьте присутствие вашего бренда с Chevalier Lane",
    "Reserve Your Place": "Забронируйте ваше место",
    "Join an exclusive circle of discerning individuals who understand that true luxury is not just about the destination, but the journey itself.":
      "Присоединяйтесь к эксклюзивному кругу ценителей, которые понимают, что истинная роскошь — это не только пункт назначения, но и сам путь.",
    "Available Service": "Доступный сервис",
    Premium: "Премиум",
    "Fleet Selection": "Выбор автопарка",
    Elite: "Элитный",
    "Client Experience": "Опыт клиентов",
    "Elegant chauffeur-driven transportation for weddings.": "Элегантный транспорт для свадеб",
    "Prices are Subject to VAT": "Цены указаны без учета НДС",
    "Why Choose Us": "Почему выбирают нас",
    "Flexible point-to-point luxury transportation solutions":
      "Гибкие люксовые перевозки от двери до двери",
    Features: "Особенности",
    "Vehicle Options": "Варианты автомобилей",
    "Mercedes S500 Brabus": "Mercedes S500 Brabus",
    "Mercedes-Benz S-Class Maybach": "Mercedes-Benz S-Class Maybach",
    "Book One-Way Transfer": "Забронировать поездку в одну сторону",
    "Transfers from Tires (Cascais Airport) - Fixed price for 25 km":
      "Трансферы из Тиреш (аэропорт Кашкайша) — фиксированная цена за 25 км",
    "Modern Fleet Services": "Сервисы современной флотилии",
    "Book Airport Transfer": "Забронировать трансфер в аэропорт",
    "Professional excellence for business travel and client relations":
      "Профессиональное превосходство для деловых поездок и работы с клиентами",
    "Business Features": "Функции для бизнеса",
    "Corporate Packages": "Корпоративные пакеты",
    "Starting price (min. 2h)": "Начальная цена (мин. 2 часа)",
    "Monthly Corporate Plan": "Ежемесячный корпоративный план",
    "Corporate Inquiry": "Корпоративный запрос",
    "Mercedes 280SL Pagoda": "Mercedes 280SL Pagoda",
    "Additional Transport": "Дополнительный транспорт",
    "Mercedes Brabus": "Mercedes Brabus",
    "Mercedes GLC 300": "Mercedes GLC 300",
    "Book Wedding Transport": "Забронировать свадебный транспорт",
    "Exclusive Private Wine Experiences": "Эксклюзивные приватные винные впечатления",
    "Tour Experiences": "Туровые впечатления",
    "Featured Experiences": "Избранные впечатления",
    "From €7 pp": "От 7 € с человека",
    "Palácio da Bacalhôa": "Palácio da Bacalhôa",
    "From €15 pp": "От 15 € с человека",
    "Premium Wine Experiences": "Премиальные винные впечатления",
    "€75-€250 pp": "75–250 € с человека",
    "Explore Tours": "Изучить туры",
    "Exclusive Experiences": "Эксклюзивные впечатления",
    "VIP Services": "VIP-сервисы",
    "Exclusive Packages": "Эксклюзивные пакеты",
    "VIP Cultural Experience": "VIP-культурное впечатление",
    "Private Estate Tour": "Тур по частному поместью",
    "Bespoke Experience": "Индивидуальное впечатление",
    "Create Exclusive Experience": "Создать эксклюзивное впечатление",
    "Why Choose Chevalier Lane": "Почему выбирают Chevalier Lane",
    "Contact Concierge": "Связаться с консьержем",
    "Always Available": "Доступны 24/7",
    Instant: "Мгновенно",
    "Quote Response": "Ответ по запросу цены",
    Global: "Глобально",
    "Service Coverage": "Зона обслуживания",
    "Contact our concierge team to discuss your transportation needs and discover how we can elevate your next journey to extraordinary heights.":
      "Свяжитесь с нашей службой консьержей, чтобы обсудить ваши транспортные потребности и узнать, как мы сделаем ваше следующее путешествие по-настоящему особенным.",
    "Bentley Mulsanne city transfer": "Bentley Mulsanne city transfer",
    "ONE-WAY TRANSPORTATION": "ONE-WAY TRANSPORTATION",
    "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur": "Modern Luxury: Bentley Mulsanne, Mercedes S-Class Brabus, Mercedes-Benz S-Class Maybach, Bentley Flying Spur",
    "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II": "Classic Collection: Rolls-Royce Silver Shadow, Rolls-Royce Silver Cloud II",
    "Professional Chauffeur Service": "Professional Chauffeur Service",
    "Real-time GPS Tracking": "Real-time GPS Tracking",
    "Flexible Scheduling": "Flexible Scheduling",
    "Professional Chauffeur": "Professional Chauffeur",
    "Complimentary Water": "Complimentary Water",
    "Premium bottled water included in every journey.": "Premium bottled water included in every journey.",
    "All-Inclusive Pricing": "All-Inclusive Pricing",
    "No hidden extras — congestion charges, tolls, and taxes included.": "No hidden extras — congestion charges, tolls, and taxes included.",
    "Champagne & Drinks on Request": "Champagne & Drinks on Request",
    "Enhance your journey with chilled champagne, wine, or other beverages upon request.": "Enhance your journey with chilled champagne, wine, or other beverages upon request.",
    "Comfort & Convenience": "Comfort & Convenience",
    "Beautifully maintained vehicles offering a refined and relaxing environment.": "Beautifully maintained vehicles offering a refined and relaxing environment.",
    "From Point A to Point B": "From Point A to Point B",
    "Corporate transportation": "Corporate transportation",
    "Executive Vehicle Fleet": "Executive Vehicle Fleet",
    "Confidentiality Assured": "Confidentiality Assured",
    "Professional Presentation": "Professional Presentation",
    "Corporate Account Management": "Corporate Account Management",
    "Invoice & Expense Tracking": "Invoice & Expense Tracking",
    "Book Your Corporate Transfer": "Book Your Corporate Transfer",
    "Flexibility for Business Travel": "Flexibility for Business Travel",
    "Book on demand or in advance for complete control of your schedule.": "Book on demand or in advance for complete control of your schedule.",
    "Work Comfortably Onboard": "Work Comfortably Onboard",
    "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.": "Enjoy foldable tables, laptop space, and a quiet cabin ideal for productivity.",
    "Charging & Connectivity": "Charging & Connectivity",
    "Multiple charging ports available for phones, laptops, and devices.": "Multiple charging ports available for phones, laptops, and devices.",
    "In-Car Entertainment": "In-Car Entertainment",
    "Screens and multimedia systems available for presentations or relaxation.": "Screens and multimedia systems available for presentations or relaxation.",
    "Discreet & Reliable Service": "Discreet & Reliable Service",
    "Designed for executives who value privacy, punctuality, and comfort.": "Designed for executives who value privacy, punctuality, and comfort.",
    "Discreet Business Transfers": "Discreet Business Transfers",
    "Professional, discreet, and reliable business transfers for executives, clients, and partners.": "Professional, discreet, and reliable business transfers for executives, clients, and partners.",
    "Luxury airport meet & greet service": "Luxury airport meet & greet service",
    "Seamless airport transportation": "Seamless airport transportation",
    "Transfers from Cascais Airport and Lisbon Airport": "Transfers from Cascais Airport and Lisbon Airport",
    "Modern and Classic Fleet Services": "Modern and Classic Fleet Services",
    "Optional extra vehicle for luggage": "Optional extra vehicle for luggage",
    "Priority meet & greet service": "Priority meet & greet service",
    "Flight tracking & monitoring": "Flight tracking & monitoring",
    "Private terminal access": "Private terminal access",
    "Luggage assistance": "Luggage assistance",
    "Real-time arrival updates": "Real-time arrival updates",
    "Multi-language support": "Multi-language support",
    "Flight Monitoring": "Flight Monitoring",
    "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.": "Your chauffeur tracks your flight in real time to ensure perfect timing — even if you arrive early or late.",
    "Waiting & Parking Included": "Waiting & Parking Included",
    "Enjoy 30 minutes of complimentary waiting time for airport arrivals.": "Enjoy 30 minutes of complimentary waiting time for airport arrivals.",
    "Meet & Greet Service": "Meet & Greet Service",
    "Your chauffeur will welcome you inside the terminal with a personalised name sign.": "Your chauffeur will welcome you inside the terminal with a personalised name sign.",
    "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.": "Experienced, punctual and discreet drivers offering a calm, seamless airport transfer.",
    "Luggage Assistance": "Luggage Assistance",
    "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.": "Your chauffeur will assist with all bags and ensure a comfortable transition from air to ground.",
    "Premium Airport Transfers": "Premium Airport Transfers",
    "Rolls-Royce Silver Cloud II wedding transport": "Rolls-Royce Silver Cloud II wedding transport",
    "Rolls-Royce Silver Shadow wedding ceremony": "Rolls-Royce Silver Shadow wedding ceremony",
    "Oldsmobile Super 88 wedding chauffeur": "Oldsmobile Super 88 wedding chauffeur",
    "Wedding transportation": "Wedding transportation",
    "From Ceremony to Reception in Style and Elegance": "From Ceremony to Reception in Style and Elegance",
    "Extra Wedding Transport Vehicles": "Extra Wedding Transport Vehicles",
    "Decorations and designs available as extras": "Decorations and designs available as extras",
    "Minimum 3 hours booking required": "Minimum 3 hours booking required",
    "Basic Decoration (artificial or simple natural flowers + ribbons)": "Basic Decoration (artificial or simple natural flowers + ribbons)",
    "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)": "Intermediate Decoration (medium quality natural flowers, front and side arrangements, bows)",
    "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)": "Luxury Decoration (premium flowers, multiple arrangements, detailed design, seasonal fresh or imported flowers, professional setup)",
    "Book Your Wedding Transport": "Book Your Wedding Transport",
    "Free Ribbons": "Free Ribbons",
    "Complimentary ribbons and colour options available to match your wedding theme.": "Complimentary ribbons and colour options available to match your wedding theme.",
    "Chauffeur Arrival 20 Minutes Early": "Chauffeur Arrival 20 Minutes Early",
    "Your driver arrives ahead of time to ensure a calm and seamless start.": "Your driver arrives ahead of time to ensure a calm and seamless start.",
    "Classic Cars for the Ceremony": "Classic Cars for the Ceremony",
    "Choose from our iconic vintage collection for the bride or groom's arrival.": "Choose from our iconic vintage collection for the bride or groom's arrival.",
    "Modern Luxury Cars for Guests": "Modern Luxury Cars for Guests",
    "Elegant modern vehicles available for transporting family and guests.": "Elegant modern vehicles available for transporting family and guests.",
    "Flexible Journey Planning": "Flexible Journey Planning",
    "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.": "Pick up the bride, groom, or wedding party and travel to the ceremony, photoshoot, and reception.",
    "Decor & Personalisation": "Decor & Personalisation",
    "Custom decoration options to make your day truly unique.": "Custom decoration options to make your day truly unique.",
    "From Ceremony to Reception": "From Ceremony to Reception",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation": "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation",
    "Exclusive experience inside luxury Bentley interior": "Exclusive experience inside luxury Bentley interior",
    "VIP Event Transportation": "VIP Event Transportation",
    "Exclusive Cultural Experiences": "Exclusive Cultural Experiences",
    "Personal Concierge Service": "Personal Concierge Service",
    "Bespoke Itinerary Creation": "Bespoke Itinerary Creation",
    "Luxury Accommodation Coordination": "Luxury Accommodation Coordination",
    "(Full Day Rate)": "(Тариф на полный день)",
    "A confirmation email has been sent to":
      "Письмо с подтверждением отправлено на",
    "Additional Information": "Дополнительная информация",
    Airline: "Авиакомпания",
    "Airline is required": "Авиакомпания обязательна",
    Approximately: "Приблизительно",
    "At least 1 trip required for transport bookings":
      "Необходима минимум 1 поездка для транспортных бронирований",
    Book: "Забронировать",
    "Book Your Airport Transfer": "Забронировать трансфер в аэропорт",
    "Book Your Luxury Tour": "Забронировать люкс-тур",
    "Book Your One-Way Transfer": "Забронировать трансфер в один конец",
    "Book by the Hour": "Бронирование по часам",
    "By the Hour | Full Day": "Почасово | Полный день",
    "Book Full Day": "Забронировать на полный день",
    "Booking Confirmed!": "Бронирование подтверждено!",
    "Booking Details": "Детали бронирования",
    "Booking Summary": "Сводка бронирования",
    "Calculating Price...": "Расчет цены...",
    "Calculating distance...": "Расчет расстояния...",
    "Calculating price...": "Расчет цены...",
    "Calculating route...": "Расчет маршрута...",
    "Calculating...": "Расчет...",
    "Preparing your price request...": "Подготавливаем ваш запрос на цену...",
    "Contact us for pricing": "Свяжитесь с нами для расчета цены",
    "Do you need vehicles for guest transport?":
      "Нужны ли вам автомобили для перевозки гостей?",
    "How many vehicles do you need?": "Сколько автомобилей вам нужно?",
    "For transporting wedding guests and party. Only modern vehicles available.":
      "Для перевозки гостей свадьбы и сопровождающих. Доступны только современные автомобили.",
    "We'll confirm availability first, then you'll see the final total on the secure Stripe checkout page.":
      "Сначала мы подтвердим наличие, а затем вы увидите итоговую сумму на защищенной странице оплаты Stripe.",
    "Decoration Options (Optional)": "Варианты декора (по желанию)",
    "Decoration Price (€)": "Стоимость декора (€)",
    "Distance to Experience": "Расстояние до опыта",
    "Distance:": "Расстояние:",
    "Drop-off Location": "Пункт назначения",
    "Drop-off location is required": "Пункт назначения обязателен",
    Duration: "Длительность",
    "Duration (Hours)": "Длительность (часы)",
    "Duration is required": "Длительность обязательна",
    "Duration:": "Длительность:",
    "Email is required": "Email обязателен",
    "Enter decoration price": "Укажите стоимость декора",
    "Enter your first name": "Введите имя",
    "Enter your last name": "Введите фамилию",
    "Event Start Time": "Время начала события",
    "Event date is required": "Дата события обязательна",
    "Event time is required": "Время события обязательно",
    "Extra Vehicle:": "Дополнительный автомобиль:",
    "Extra vehicle for luggage": "Дополнительный автомобиль для багажа",
    "Final Destination": "Итоговый пункт",
    "Final Location": "Конечный пункт",
    "Final destination is required": "Итоговый пункт обязателен",
    "Final location is required": "Конечный пункт обязателен",
    "First Name": "Имя",
    "First name is required": "Имя обязательно",
    "Flight Information": "Информация о рейсе",
    "Flight Number": "Номер рейса",
    "Flight number is required": "Номер рейса обязателен",
    "For transporting wedding guests and party (6% VAT)":
      "Для перевозки гостей и свадебной команды (6% НДС)",
    "Guest Transport": "Транспорт для гостей",
    "Hand Luggage": "Ручная кладь",
    "Hourly rates from €250": "Почасовые тарифы от €250",
    Includes: "Включает",
    "Large Luggage": "Крупный багаж",
    "Last Name": "Фамилия",
    "Last name is required": "Фамилия обязательна",
    "Luggage Information": "Информация о багаже",
    "Main Fleet": "Основной парк",
    "Main Wedding Fleet": "Основной свадебный парк",
    "Make a Special Request": "Оставить особый запрос",
    Max: "Макс.",
    Maximum: "Максимум",
    "Maximum 6 trips per booking, 2 trips per hour":
      "Максимум 6 поездок на бронирование, 2 поездки в час",
    Min: "Мин.",
    Minimum: "Минимум",
    "Minimum 3 hours required": "Минимум 3 часа",
    "Minimum 3 hours required for main fleet bookings":
      "Минимум 3 часа для основного парка",
    "Missing Cal.com configuration. Please try again later.":
      "Конфигурация Cal.com отсутствует. Попробуйте позже.",
    "Missing Cal.com username. Please configure":
      "Отсутствует имя пользователя Cal.com. Настройте",
    "Missing Cal.com username. Please set":
      "Отсутствует имя пользователя Cal.com. Установите",
    No: "Нет",
    "No decoration": "Без декора",
    "Note:": "Примечание:",
    "Number of Participants": "Количество участников",
    "Number of Passengers": "Количество пассажиров",
    "Number of Trips": "Количество поездок",
    "Optional Add-ons": "Дополнительные опции",
    "Palácio da Bacalhôa (Azeitão)": "Palácio da Bacalhôa (Азейтао)",
    "Participants & Options": "Участники и опции",
    Passenger: "Пассажир",
    "Per-trip rates from €100": "Тарифы за поездку от €100",
    "Personal Information": "Личная информация",
    "Phone number is required": "Номер телефона обязателен",
    "Pickup Location": "Место подачи",
    "Pickup location is required": "Место подачи обязательно",
    Piece: "Ед.",
    Pieces: "Ед.",
    "Please Complete the Form": "Пожалуйста, заполните форму",
    "Please Enter Locations": "Пожалуйста, укажите адреса",
    "Please Enter Locations & Flight Details":
      "Укажите адреса и данные рейса",
    "Please Enter Starting Location": "Укажите место отправления",
    "Please Select a Vehicle": "Пожалуйста, выберите автомобиль",
    "Please complete the pricing details before scheduling.":
      "Заполните данные о цене перед бронированием.",
    "Please enter a starting location": "Укажите место отправления",
    "Please enter a valid email address": "Введите корректный email",
    "Please enter both pickup and drop-off locations":
      "Укажите место подачи и пункт назначения",
    "Please enter both starting location and destination":
      "Укажите место отправления и пункт назначения",
    "Please enter flight number and airline":
      "Укажите номер рейса и авиакомпанию",
    "Please fix the following errors:\n":
      "Пожалуйста, исправьте следующие ошибки:\n",
    "Please select a tour option": "Выберите вариант тура",
    "Please select a tour option to continue.":
      "Выберите вариант тура, чтобы продолжить.",
    "Please select a vehicle": "Выберите автомобиль",
    "Please select a vehicle for the tour":
      "Выберите автомобиль для тура",
    "Please select a vehicle for the tour.":
      "Выберите автомобиль для тура.",
    "Please select a vehicle to continue.":
      "Выберите автомобиль, чтобы продолжить.",
    "Please select a vehicle to proceed":
      "Выберите автомобиль, чтобы продолжить",
    "Please select a vehicle to schedule with Cal.com.":
      "Выберите автомобиль для бронирования в Cal.com.",
    "Preparing secure payment...": "Подготовка безопасного платежа...",
    "Price Summary": "Сводка цены",
    "Price:": "Цена:",
    "Schedule & Pay": "Запланировать и оплатить",
    "Select Your Tour Experience": "Выберите ваш тур",
    "Select Your Vehicle": "Выберите автомобиль",
    "Selected Vehicle": "Выбранный автомобиль",
    "Service Type": "Тип услуги",
    "Starting Location": "Место отправления",
    "Starting from": "От",
    "Starting location is required": "Место отправления обязательно",
    "Stripe checkout session URL missing.":
      "Отсутствует URL сессии оплаты Stripe.",
    "Total Price": "Итоговая цена",
    "Total Price:": "Итоговая цена:",
    "Transfer Details": "Детали трансфера",
    "Transfer Summary": "Сводка трансфера",
    Transport: "Транспорт",
    "Trip Details": "Детали поездки",
    "Trip Summary": "Сводка поездки",
    "Unable to create Stripe checkout session.":
      "Не удалось создать сессию оплаты Stripe.",
    "Unable to create a Stripe checkout session.":
      "Не удалось создать сессию оплаты Stripe.",
    VAT: "НДС",
    "Vehicle:": "Автомобиль:",
    "We were unable to calculate a quote for this transfer.":
      "Мы не смогли рассчитать стоимость этого трансфера.",
    "Wedding Date": "Дата свадьбы",
    "Wedding Event Details": "Детали свадебного мероприятия",
    Yes: "Да",
    "e.g., Ceremony Venue, Reception Hall":
      "например, место церемонии, зал приема",
    "e.g., Hotel, Church, Home": "например, отель, церковь, дом",
    "e.g., Lisbon Airport, Hotel": "например, аэропорт Лиссабона, отель",
    "e.g., Lisbon Airport, Hotel Name":
      "например, аэропорт Лиссабона, название отеля",
    "e.g., Lisbon City Center, Hotel Name":
      "например, центр Лиссабона, название отеля",
    "e.g., Porto City Center, Algarve Resort":
      "например, центр Порту, курорт Алгарве",
    "e.g., TAP Air Portugal, Iberia": "например, TAP Air Portugal, Iberia",
    "e.g., TP 1234, IB 5678": "например, TP 1234, IB 5678",
    extra: "дополнительно",
    "from your pickup location to": "от места подачи до",
    h: "ч",
    hour: "час",
    hours: "часов",
    km: "км",
    "km included": "км включено",
    participant: "участник",
    participants: "участники",
    "participants allowed for this tour":
      "разрешенных участников для этого тура",
    "participants required for this tour":
      "требуемых участников для этого тура",
    "per km": "за км",
    "per person": "за человека",
    pp: "на чел.",
    "the experience": "опыт",
    trip: "поездка",
    trips: "поездки",
    "your@email.com": "ваш@email.com",
    "A Ceremony of Distinction": "Церемония высшего уровня",
    "A Commitment to Excellence": "Стремление к совершенству",
    "A legacy of excellence built on passion, precision, and an unwavering commitment to":
      "Наследие совершенства, основанное на страсти, точности и непоколебимой приверженности",
    "AZEITÃO": "AZEITÃO",
    "About Chevalier Lane": "О Chevalier Lane",
    "Aggressive front three-quarter stance with multi-spoke wheels and chrome grille":
      "Агрессивный передний ракурс в три четверти с многоспицевыми дисками и хромированной решёткой",
    "Amount:": "Сумма:",
    "An hourly service offering flexibility, discretion, and uninterrupted availability.":
      "Почасовой сервис, предлагающий гибкость, конфиденциальность и непрерывную доступность.",
    "Any dietary requirements, accessibility needs, preferred languages, or special requests...":
      "Любые диетические требования, потребности в доступности, предпочитаемые языки или особые запросы...",
    "Any special requirements, accessibility needs, or additional services...":
      "Любые особые требования, потребности в доступности или дополнительные услуги...",
    "Any special requirements, decoration details, or additional services...":
      "Любые особые требования, детали оформления или дополнительные услуги...",
    "Arrive in first class": "Прибывайте в первом классе",
    "Arrive with Confidence": "Прибывайте с уверенностью",
    "Arrive with Elegance": "Прибывайте с элегантностью",
    "As the only company in Lisbon offering both classic and modern luxury vehicles, we bridge the gap between automotive heritage and contemporary excellence. Our collection spans from iconic 1960s Mercedes Pagodas to state-of-the-art Bentley Mulsannes.":
      "Как единственная компания в Лиссабоне, предлагающая классические и современные автомобили класса люкс, мы соединяем автомобильное наследие с современной превосходностью. Наша коллекция — от культовых Mercedes Pagoda 1960-х до современных Bentley Mulsanne.",
    "Back to Tours": "Вернуться к турам",
    "Back to Wedding Bookings": "Вернуться к бронированиям свадьбы",
    "Back to wedding services": "Вернуться к свадебным услугам",
    "Because how you arrive matters as much as where you’re going.":
      "Потому что то, как вы прибываете, так же важно, как и куда вы направляетесь.",
    "Bentley Flying Spur detail - Exterior":
      "Bentley Flying Spur — деталь: экстерьер",
    "Bentley Flying Spur detail - Front view":
      "Bentley Flying Spur — деталь: вид спереди",
    "Bentley Flying Spur detail - Interior":
      "Bentley Flying Spur — деталь: интерьер",
    "Bentley Flying Spur detail - Rear view":
      "Bentley Flying Spur — деталь: вид сзади",
    "Bentley Mulsanne detail - Flying B hood mascot close-up":
      "Bentley Mulsanne — деталь: эмблема Flying B на капоте (крупный план)",
    "Bentley Mulsanne detail - Front view":
      "Bentley Mulsanne — деталь: вид спереди",
    "Bentley Mulsanne detail - Interior":
      "Bentley Mulsanne — деталь: интерьер",
    "Bentley Mulsanne detail - Rear view":
      "Bentley Mulsanne — деталь: вид сзади",
    "Bentley Mulsanne front right side view - Exterior":
      "Bentley Mulsanne вид спереди справа — экстерьер",
    "Bentley Mulsanne profile detail":
      "Bentley Mulsanne — деталь профиля",
    "Bentley Mulsanne rear quarter detail":
      "Bentley Mulsanne — деталь задней четверти",
    "Bentley Mulsanne side view - Exterior":
      "Bentley Mulsanne вид сбоку — экстерьер",
    "Book Your Tour": "Забронировать тур",
    "Book another transfer": "Забронировать другой трансфер",
    "Change language": "Сменить язык",
    Chauffeur: "Шофёр",
    "Chauffeured arrivals with privacy, comfort, and refined detail. Upon request, a curated selection of wine, champagne, and bespoke refreshments.":
      "Прибытия с шофёром, приватностью, комфортом и утончёнными деталями. По запросу — подборка вина, шампанского и персонализированных напитков.",
    "Chauffeured transitions between home, ceremony, and reception, handled with precision and care.":
      "Переезды с шофёром между домом, церемонией и приёмом, организованные с точностью и заботой.",
    "Checking Stripe...": "Проверяем Stripe...",
    "Chevalier Lane Logo": "Логотип Chevalier Lane",
    "Chevalier Lane has redefined luxury transportation, the only company in Lisbon offering both modern luxury and classic elegance.":
      "Chevalier Lane переосмыслил роскошные перевозки, оставаясь единственной компанией в Лиссабоне, предлагающей современную роскошь и классическую элегантность.",
    "Classic car transfers include an extra vehicle (Range Rover Vogue) for luggage at":
      "Трансферы на классических авто включают дополнительный автомобиль (Range Rover Vogue) для багажа за",
    "Classic front end with prominent bonnet and chrome bumper overriders":
      "Классический передок с выразительным капотом и хромированными бамперами",
    "Classic heritage and modern innovation in one exclusive collection":
      "Классическое наследие и современная инновация в одной эксклюзивной коллекции",
    "Close-up of the Mercedes bonnet star and grille badge":
      "Крупный план звезды Mercedes на капоте и эмблемы решётки",
    "Close-up of the Spirit of Ecstasy mascot with reflections on the bonnet":
      "Крупный план статуэтки Spirit of Ecstasy с отражениями на капоте",
    "Close-up of the gloss-black Flying B emblem on the bonnet":
      "Крупный план глянцевой чёрной эмблемы Flying B на капоте",
    "Close-up of wheel with Rolls-Royce hubcap and trim ring":
      "Крупный план колеса с колпаком Rolls-Royce и декоративным кольцом",
    "Complete Fleet": "Полный парк",
    "Complete fleet hero": "Hero полного парка",
    "Comprehensive luxury transportation solutions tailored to every occasion and requirement.":
      "Комплексные решения премиальных перевозок для любого случая и требований.",
    "Convertible front three-quarter view showing grille, quad headlamps and chrome details":
      "Передний ракурс кабриолета в три четверти с решёткой, четырьмя фарами и хромированными деталями",
    Crafting: "Создавая",
    "Crafting unparalleled experiences since our founding, every journey with Chevalier Lane represents the pinnacle of luxury transportation.":
      "Создавая непревзойдённые впечатления с момента основания, каждое путешествие с Chevalier Lane отражает вершину роскошных перевозок.",
    "Cream leather front bench with rich walnut veneer dashboard and trim":
      "Передняя скамья из кремовой кожи с панелью и отделкой из орехового шпона",
    "Create unforgettable memories with our premium wedding transportation services. Choose from our classic main fleet for the couple or additional transport vehicles for your guests.":
      "Создайте незабываемые воспоминания с нашими премиальными свадебными перевозками. Выберите классическую основную флотилию для пары или дополнительные автомобили для гостей.",
    Curated: "Кураторский",
    "Details That Matter": "Важные детали",
    "Discover the full spectrum of luxury transportation experiences crafted for discerning individuals who demand nothing less than perfection.":
      "Откройте полный спектр роскошных перевозок, созданных для людей, требующих совершенства.",
    "Discreet coordination from runway to destination.":
      "Дискретная координация от взлётной полосы до пункта назначения.",
    "Discreet, elegant arrivals for meetings, shopping, or personal itineraries.":
      "Дискретные, элегантные прибытия для встреч, шопинга или личных маршрутов.",
    "Discreet, elegant one-way journeys designed for couples and intimate moments.":
      "Дискретные, элегантные поездки в одну сторону для пар и интимных моментов.",
    "Driver's seat with classic Mercedes styling":
      "Сиденье водителя в классическом стиле Mercedes",
    "Driver's wheel with classic Mercedes styling":
      "Руль в классическом стиле Mercedes",
    "Driver-focused cockpit with multifunction steering wheel and center console controls":
      "Ориентированный на водителя кокпит с многофункциональным рулём и управлением на центральной консоли",
    "Elegant front left view showcasing the pagoda's elegant design":
      "Элегантный вид слева спереди, подчёркивающий дизайн Pagoda",
    "Elegant teal body with flowing lines and brightwork from an elevated angle":
      "Элегантный бирюзовый кузов с плавными линиями и хромом с высокого ракурса",
    "Elegant, seamless one-way journeys between airports, hotels, villas, and city centers — tailored around your schedule.":
      "Элегантные и бесшовные поездки в одну сторону между аэропортами, отелями, виллами и центрами городов, под ваш график.",
    "Elegant, seamless wedding journeys from ceremony venues to reception halls, tailored around your special day timeline.":
      "Элегантные и бесшовные свадебные поездки от места церемонии до зала приёма, под график вашего дня.",
    "Elevate your business travel with sophisticated, reliable transportation solutions. Our corporate transportation service is designed for executives, business travelers, and companies seeking to impress clients and partners. We provide seamless coordination for meetings, conferences, and VIP client visits with uncompromising professionalism and confidentiality.":
      "Поднимите уровень деловых поездок благодаря изысканным и надёжным транспортным решениям. Наш корпоративный сервис создан для руководителей, бизнес-путешественников и компаний, желающих впечатлить клиентов и партнёров. Мы обеспечиваем безупречную координацию встреч, конференций и VIP-визитов с максимальной профессиональностью и конфиденциальностью.",
    "Enter a starting location to calculate driving distance.":
      "Введите место отправления, чтобы рассчитать дистанцию.",
    "Every detail of your private tour is meticulously planned to ensure an unforgettable journey through Portugal's most exclusive wine experiences.":
      "Каждая деталь вашего приватного тура тщательно планируется, чтобы обеспечить незабываемое путешествие по самым эксклюзивным винным местам Португалии.",
    "Every journey with Chevalier Lane is a testament to our dedication to perfection. From the moment you make your reservation to the instant you reach your destination, every detail is meticulously orchestrated to ensure an unforgettable experience.":
      "Каждая поездка с Chevalier Lane — свидетельство нашей приверженности совершенству. С момента бронирования до прибытия каждая деталь тщательно выстроена для незабываемого опыта.",
    "Exclusive Access": "Эксклюзивный доступ",
    "Executive time, reserved": "Время руководителя, зарезервировано",
    "Experience Excellence": "Испытайте превосходство",
    "Experience Luxury Like Never Before": "Ощутите роскошь как никогда раньше",
    "Experience Portugal's finest wine regions with our exclusive private tours. Select your preferred experience below and see pricing update in real-time.":
      "Откройте лучшие винные регионы Португалии с нашими эксклюзивными приватными турами. Выберите предпочтительный вариант ниже и наблюдайте обновление цены в реальном времени.",
    "Experience premium airport transfers with our luxury fleet from Tires (Cascais Airport). All prices are subject to 6% VAT.":
      "Премиальные трансферы из аэропорта на нашей роскошной флоте из Tires (Cascais Airport). Все цены включают 6% НДС.",
    "Experience premium airport transfers with our luxury fleet. Our modern vehicles offer comfort, reliability, and onboard amenities for high-profile clients, while our classic cars provide a unique and memorable experience. All transfers include priority meet & greet service, flight tracking, luggage assistance, and multi-language support.":
      "Премиальные трансферы из аэропорта на нашей роскошной флоте. Современные авто предлагают комфорт, надёжность и удобства для клиентов высокого уровня, а классические машины дарят уникальные впечатления. Все трансферы включают приоритетную встречу, отслеживание рейса, помощь с багажом и поддержку на нескольких языках.",
    "Experience seamless one-way transportation with our premium chauffeur service. Whether you need transportation from the airport to your hotel, between cities, or any other point-to-point journey, we provide comfortable, reliable, and sophisticated transport solutions tailored to your schedule and preferences.":
      "Наслаждайтесь бесшовным транспортом в одну сторону с нашим премиальным сервисом шофёра. От аэропорта до отеля, между городами или любой маршрут point-to-point — мы предложим комфортные, надёжные и изысканные решения под ваш график и предпочтения.",
    "Experience the difference that comes from over two decades of luxury transportation excellence and an unwavering commitment to perfection in every detail.":
      "Почувствуйте разницу, которая рождается из более чем двух десятилетий превосходства в роскошных перевозках и непоколебимой приверженности совершенству в каждой детали.",
    "Experience the grandeur of a 16th-century Palace combined with world-class wine production. Our exclusive private tours offer intimate access to the historic estate, extensive art collections, and premium wine tastings in the heart of Portugal's renowned wine region.":
      "Ощутите величие дворца XVI века в сочетании с виноделием мирового уровня. Наши эксклюзивные приватные туры дают доступ к историческому поместью, богатым коллекциям искусства и премиальным дегустациям в сердце винного региона Португалии.",
    "Experience truly unique, one-of-a-kind moments that transcend ordinary luxury transportation. Our exclusive experiences combine the finest vehicles with extraordinary destinations, VIP access, and personalized concierge services. From private villa visits to exclusive cultural events, we create bespoke experiences that reflect your individual passions and desires.":
      "Испытайте по-настоящему уникальные моменты, выходящие за рамки обычных роскошных перевозок. Наши эксклюзивные впечатления объединяют лучшие автомобили, необычные направления, VIP-доступ и персональный консьерж-сервис. От визитов на частные виллы до эксклюзивных культурных событий — мы создаём впечатления под ваши страсти и желания.",
    "Explore Options": "Посмотреть варианты",
    "Explore our full fleet of classic masterpieces and modern marvels. Whether you seek timeless elegance or cutting-edge luxury, each vehicle is meticulously maintained and ready to elevate your next journey.":
      "Изучите наш полный парк классических шедевров и современных чудес. Ищете ли вы вечную элегантность или ультрасовременную роскошь — каждый автомобиль тщательно обслуживается и готов возвысить вашу следующую поездку.",
    "Exterior of the Bentley Flying Spur": "Экстерьер Bentley Flying Spur",
    "Exterior of the Bentley Mulsanne": "Экстерьер Bentley Mulsanne",
    "Exterior of the Mercedes-Benz S-Class Maybach": "Экстерьер Mercedes-Benz S-Class Maybach",
    "First class on the road": "Первый класс на дороге",
    "Fold-out walnut picnic trays for rear passengers":
      "Откидные ореховые столики для задних пассажиров",
    "For Romantic Dates": "Для романтических свиданий",
    "For the couple - stationary use, photos, ceremonies (23% VAT)":
      "Для пары — стационарное использование, фото, церемонии (23% НДС)",
    "Founded in Lisbon, Portugal, Chevalier Lane emerged from a simple yet profound vision: to redefine luxury transportation by combining timeless elegance with modern sophistication. What started as a passion project has evolved into Portugal's premier luxury chauffeur service.":
      "Основанная в Лиссабоне, Португалия, Chevalier Lane родилась из простой, но глубокой идеи: переосмыслить роскошные перевозки, объединяя вечную элегантность и современную утончённость. То, что начиналось как проект страсти, стало ведущим люксовым сервисом шофёра в Португалии.",
    "From a Rolls-Royce Silver Cloud to the commanding presence of a Bentley Mulsanne, each vehicle in our collection tells a story of engineering excellence and uncompromising luxury.":
      "От Rolls-Royce Silver Cloud до внушительного Bentley Mulsanne — каждый автомобиль нашей коллекции рассказывает историю инженерного мастерства и бескомпромиссной роскоши.",
    "Front grill with classic Mercedes styling":
      "Передняя решётка в классическом стиле Mercedes",
    "Front right side view of the Bentley Mulsanne":
      "Вид Bentley Mulsanne спереди справа",
    "Front view of the Bentley Flying Spur":
      "Вид Bentley Flying Spur спереди",
    "Front view of the Bentley Mulsanne":
      "Вид Bentley Mulsanne спереди",
    "Front view of the Mercedes-Benz S-Class Maybach":
      "Вид Mercedes-Benz S-Class Maybach спереди",
    "Full view of the pagoda's elegant design":
      "Полный вид элегантного дизайна Pagoda",
    "Graceful, discreet pickup ensuring a calm and elegant beginning to your special day.":
      "Изящный и дискретный трансфер, обеспечивающий спокойное и элегантное начало вашего особого дня.",
    "Group:": "Группа:",
    "Happy Clients": "Довольные клиенты",
    "Head-on view of the Pantheon grille adorned with club badges and chrome bumper":
      "Фронтальный вид решётки Pantheon с клубными эмблемами и хромированным бампером",
    Highlights: "Основные моменты",
    "Hourly availability for business meetings, itineraries, and executive schedules.":
      "Почасовая доступность для деловых встреч, маршрутов и расписаний руководителей.",
    "Immersive Chevalier Lane showcase":
      "Иммерсивная презентация Chevalier Lane",
    "Includes:": "Включает:",
    "Interior of the Bentley Flying Spur": "Интерьер Bentley Flying Spur",
    "Interior of the Bentley Mulsanne": "Интерьер Bentley Mulsanne",
    "Interior of the Mercedes-Benz S-Class Maybach": "Интерьер Mercedes-Benz S-Class Maybach",
    "Join thousands of discerning clients who trust Chevalier Lane to transform ordinary journeys into":
      "Присоединяйтесь к тысячам взыскательных клиентов, которые доверяют Chevalier Lane превращать обычные поездки в",
    "Long, low side profile highlighting sweeping body line and tailfins":
      "Длинный низкий профиль, подчёркивающий плавную линию кузова и хвостовые плавники",
    "Low-angle front three-quarter shot showing quad headlamps and grille":
      "Передний ракурс в три четверти с низкой точки, показывающий четыре фары и решётку",
    "Low-angle side view emphasizing the front wing, chrome trim and stance":
      "Боковой ракурс с низкой точки, подчёркивающий переднее крыло, хром и посадку",
    "Luxury Tours": "Роскошные туры",
    "Luxury airport transfers with priority service, flight monitoring, and seamless transportation from Tires Airport to your destination.":
      "Роскошные трансферы из аэропорта с приоритетным сервисом, мониторингом рейсов и бесшовным транспортом от аэропорта Tires до вашего пункта назначения.",
    "Luxury car interior": "Интерьер роскошного автомобиля",
    "Luxury services": "Роскошные услуги",
    "Main Wedding Fleet: Stationary/Use by Couples - does not include decorations and designs as requested by the client":
      "Основной свадебный парк: стационарное использование/для пары — не включает декор и дизайн по запросу клиента",
    "Mercedes 280SL Pagoda - Driver's Seat":
      "Mercedes 280SL Pagoda — сиденье водителя",
    "Mercedes 280SL Pagoda - Driver's Wheel":
      "Mercedes 280SL Pagoda — руль водителя",
    "Mercedes 280SL Pagoda - Front Grill":
      "Mercedes 280SL Pagoda — передняя решётка",
    "Mercedes 280SL Pagoda - Front Left View":
      "Mercedes 280SL Pagoda — вид слева спереди",
    "Mercedes 280SL Pagoda - Full View":
      "Mercedes 280SL Pagoda — полный вид",
    "Mercedes 280SL Pagoda - Rear View":
      "Mercedes 280SL Pagoda — вид сзади",
    "Mercedes-Benz S-Class Maybach detail - Exterior":
      "Mercedes-Benz S-Class Maybach — деталь: экстерьер",
    "Mercedes-Benz S-Class Maybach detail - Front view":
      "Mercedes-Benz S-Class Maybach — деталь: вид спереди",
    "Mercedes-Benz S-Class Maybach detail - Interior":
      "Mercedes-Benz S-Class Maybach — деталь: интерьер",
    "Mercedes-Benz S-Class Maybach detail - Rear view":
      "Mercedes-Benz S-Class Maybach — деталь: вид сзади",
    "Mercedes S500 BRABUS detail - bonnet star emblem close-up":
      "Mercedes S500 BRABUS — деталь: звезда на капоте (крупный план)",
    "Mercedes S500 BRABUS exterior - head-on front view":
      "Mercedes S500 BRABUS — фронтальный вид",
    "Mercedes S500 BRABUS exterior - low front three-quarter view":
      "Mercedes S500 BRABUS — передний ракурс в три четверти с низкой точки",
    "Mercedes S500 BRABUS interior - rear view":
      "Mercedes S500 BRABUS — интерьер, вид сзади",
    "Mercedes S500 BRABUS interior - steering wheel and cockpit":
      "Mercedes S500 BRABUS — интерьер: руль и кокпит",
    "Mercedes S500 BRABUS rim": "Диск Mercedes S500 BRABUS",
    "Missing Stripe session reference":
      "Отсутствует ссылка на сессию Stripe",
    "Next image": "Следующее изображение",
    "Oldsmobile Super 88 exterior - front three-quarter view with top down":
      "Oldsmobile Super 88 — передний ракурс в три четверти с открытым верхом",
    "Oldsmobile Super 88 exterior - full side profile":
      "Oldsmobile Super 88 — полный боковой профиль",
    "Oldsmobile Super 88 exterior - rear view":
      "Oldsmobile Super 88 — вид сзади",
    "Oldsmobile Super 88 interior - dashboard and steering wheel":
      "Oldsmobile Super 88 — интерьер: приборная панель и руль",
    "Oldsmobile Super 88 interior - rear passenger area and door panel":
      "Oldsmobile Super 88 — интерьер: задняя зона и дверная панель",
    "Oldsmobile Super 88 interior - wide cabin view":
      "Oldsmobile Super 88 — интерьер: широкий вид салона",
    "Optional Add-ons:": "Дополнительные опции:",
    "Our Expertise": "Наш опыт",
    "Our Story": "Наша история",
    "Our Unique Position": "Наше уникальное положение",
    "Our Values": "Наши ценности",
    "Payment canceled": "Платёж отменён",
    "Personal Experience": "Личный опыт",
    "Play Lisbon in Motion video": "Воспроизвести видео Lisbon in Motion",
    "Please specify the number of hand luggage (carry-on) and large luggage (checked bags) you'll be traveling with.":
      "Пожалуйста, укажите количество ручной клади и крупного багажа (сдаваемого), с которым вы путешествуете.",
    "Premium Transport": "Премиальный транспорт",
    "Previous image": "Предыдущее изображение",
    Private: "Частный",
    "Private aviation, perfected": "Частная авиация, доведённая до совершенства",
    "Punctual, flexible transportation designed entirely around your pace.":
      "Пунктуальный и гибкий транспорт, полностью подстроенный под ваш ритм.",
    "Ready to Create Your Perfect Experience?":
      "Готовы создать своё идеальное впечатление?",
    "Rear seat and door panel details with chrome window winder and trim":
      "Детали заднего сиденья и дверной панели с хромированной ручкой стеклоподъёмника и отделкой",
    "Rear view of the Bentley Flying Spur": "Вид Bentley Flying Spur сзади",
    "Rear view of the Bentley Mulsanne": "Вид Bentley Mulsanne сзади",
    "Rear view of the Mercedes-Benz S-Class Maybach": "Вид Mercedes-Benz S-Class Maybach сзади",
    "Rear view of the Mercedes S500 BRABUS":
      "Вид Mercedes S500 BRABUS сзади",
    "Rear view of the Silver Shadow with distinctive tail lights and chrome trim":
      "Вид Silver Shadow сзади с характерными фонарями и хромированной отделкой",
    "Rear view of the pagoda's elegant design":
      "Вид элегантного дизайна Pagoda сзади",
    "Red and white interior seen from the rear seats with dashboard and front bench":
      "Красно-белый интерьер, вид с задних сидений с панелью и передней скамьёй",
    "Refined floral touches, ribbons, and personalised details, arranged to complement your celebration.":
      "Изысканные цветочные акценты, ленты и персонализированные детали, подобранные для вашей церемонии.",
    "Reserved Availability": "Зарезервированная доступность",
    "Return Home": "На главную",
    "Rim of the Mercedes S500 BRABUS": "Диск Mercedes S500 BRABUS",
    "Rolls-Royce Silver Cloud II exterior - front three-quarter view":
      "Rolls-Royce Silver Cloud II — передний ракурс в три четверти",
    "Rolls-Royce Silver Cloud II interior - front cabin and dashboard":
      "Rolls-Royce Silver Cloud II — интерьер: передняя кабина и панель",
    "Rolls-Royce Silver Cloud II interior - high-angle left side view":
      "Rolls-Royce Silver Cloud II — интерьер: левый боковой вид с высокого ракурса",
    "Rolls-Royce Silver Cloud II interior - rear picnic tables":
      "Rolls-Royce Silver Cloud II — интерьер: задние столики",
    "Rolls-Royce Silver Cloud II interior - rear seat and headliner":
      "Rolls-Royce Silver Cloud II — интерьер: заднее сиденье и потолок",
    "Rolls-Royce Silver Shadow detail - Spirit of Ecstasy on bonnet":
      "Rolls-Royce Silver Shadow — деталь: Spirit of Ecstasy на капоте",
    "Rolls-Royce Silver Shadow detail - wheel and hubcap":
      "Rolls-Royce Silver Shadow — деталь: колесо и колпак",
    "Rolls-Royce Silver Shadow exterior - front view with grille badges":
      "Rolls-Royce Silver Shadow — вид спереди с эмблемами на решётке",
    "Rolls-Royce Silver Shadow exterior - low front three-quarter view":
      "Rolls-Royce Silver Shadow — передний ракурс в три четверти с низкой точки",
    "Rolls-Royce Silver Shadow exterior - low side profile":
      "Rolls-Royce Silver Shadow — низкий боковой профиль",
    "Rolls-Royce Silver Shadow exterior - rear view with tail lights":
      "Rolls-Royce Silver Shadow — вид сзади с фонарями",
    "Scenic routes": "Живописные маршруты",
    "Service Available": "Сервис доступен",
    "Spacious rear compartment with cream leather upholstery and wood accents":
      "Просторный задний отсек с кремовой кожей и деревянными акцентами",
    "Special Requests": "Особые запросы",
    "Start Planning": "Начать планирование",
    "Straight-on rear view featuring rocket-inspired tailfins and taillights":
      "Прямой задний вид с ракетоподобными плавниками и фонарями",
    "Straight-on view of the dashboard with twin gauge pods and classic wheel":
      "Прямой вид панели приборов с двойными шкалами и классическим рулём",
    "Thank you for choosing Chevalier Lane. Your airport transfer booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Спасибо, что выбрали Chevalier Lane. Ваша заявка на трансфер в аэропорт получена, и наша команда консьержей скоро свяжется с вами для подтверждения деталей и завершения бронирования.",
    "Thank you for choosing Chevalier Lane. Your booking request has been received and our concierge team will contact you shortly to confirm the details and finalize your reservation.":
      "Спасибо, что выбрали Chevalier Lane. Ваша заявка на бронирование получена, и наша команда консьержей скоро свяжется с вами для подтверждения деталей и завершения бронирования.",
    "Thank you for your payment": "Спасибо за оплату",
    "The Beginning": "Начало",
    "The Bride’s Arrival": "Прибытие невесты",
    "The principles that guide every decision and shape every experience we create.":
      "Принципы, которые направляют каждое решение и формируют каждый созданный нами опыт.",
    "Timeless Elegance": "Вечная элегантность",
    "Transform your special day into an unforgettable experience with our premium wedding transportation services. Our classic and modern luxury vehicles provide the perfect backdrop for your most cherished wedding moments. From ceremony arrivals to reception departures, we ensure every aspect of your wedding day transportation is handled with elegance and precision.":
      "Преобразите ваш особенный день в незабываемое впечатление с нашими премиальными свадебными перевозками. Наши классические и современные люксовые автомобили создают идеальный фон для самых дорогих моментов. От прибытия на церемонию до отъезда с приёма — всё организовано с элегантностью и точностью.",
    "Unable to confirm payment status":
      "Не удалось подтвердить статус платежа",
    "Unable to estimate distance. Vehicle cost reflects minimum price; actual total may vary.":
      "Не удалось оценить расстояние. Стоимость автомобиля отражает минимальную цену; итоговая сумма может отличаться.",
    "Unrivalled comfort, privacy, and refinement — without compromise.":
      "Несравненный комфорт, приватность и изысканность — без компромиссов.",
    "View other tours": "Посмотреть другие туры",
    "We’ll calculate the transfer distance to your selected experience.":
      "Мы рассчитаем расстояние трансфера до выбранного опыта.",
    "Wide front view highlighting the large grille and swept headlamps":
      "Широкий фронтальный вид, подчёркивающий крупную решётку и вытянутые фары",
    "Your Time, Perfectly Managed": "Ваше время — идеально организовано",
    "Your personal driver delivers a smooth, discreet and attentive experience from start to finish.":
      "Ваш персональный водитель обеспечивает плавный, дискретный и внимательный сервис от начала до конца.",
    "e.g., Tires Airport (Cascais), Lisbon Airport":
      "например, аэропорт Tires (Кашкайш), аэропорт Лиссабона",
    "exceptional service": "исключительный сервис",
    "extraordinary experiences": "необыкновенные впечатления",
    hero: "hero",
    "more inclusions": "ещё включений",
    processing: "обработка",
    "profile view": "вид в профиль",
    "through the art of luxury transportation since our founding.":
      "через искусство роскошных перевозок с момента основания.",
    "unparalleled experiences": "непревзойдённые впечатления",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("preferredLanguage") : null;
    if (stored && SUPPORTED_LANGUAGES.some((lang) => lang.code === stored)) {
      setLanguageState(stored as LanguageCode);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    if (typeof document !== "undefined") {
      document.documentElement.lang = nextLanguage;
      document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
    }
    localStorage.setItem("preferredLanguage", nextLanguage);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const t = useCallback(
    (key: string) => {
      const translated = translations[language]?.[key];
      return translated ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages: SUPPORTED_LANGUAGES,
      t,
    }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
