import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative z-30 p-6 bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white text-luxury-black border-b border-luxury-gold/20 shadow-luxury-soft overflow-visible">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-4 bg-[linear-gradient(45deg,transparent_25%,rgba(184,134,11,0.05)_25%,rgba(184,134,11,0.05)_50%,transparent_50%,transparent_75%,rgba(184,134,11,0.05)_75%)] bg-[length:32px_32px]"></div>
      <div className="absolute inset-0 opacity-6 bg-[radial-gradient(circle_at_2px_2px,rgba(184,134,11,0.06)_1px,transparent_0)] bg-[length:28px_28px]"></div>

      {/* Subtle Gold Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>

      <div className="flex justify-between items-center max-w-7xl mx-auto relative z-10">
        <div className="luxury-heading text-2xl md:text-3xl tracking-wider">
          <Link to="/" className="text-luxury-black font-medium hover:text-luxury-gold transition-all duration-500 relative group">
            Chevalier Lane
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-champagne group-hover:w-full transition-all duration-500"></div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
          <NavigationMenuList className="flex gap-2 relative z-[60]">
            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gradient-to-r from-luxury-ivory to-luxury-pearl font-playfair text-luxury-black border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/services-header.png')`
                        }}
                        to="/services"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium font-playfair text-white drop-shadow-lg">
                          Our Services
                        </div>
                        <p className="text-sm leading-tight text-white/90 drop-shadow-md">
                          Professional chauffeur services for all your transportation needs
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/airports"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Airport Transfers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Reliable airport transportation services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/business"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Business Travel</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Professional business transportation
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/one-way"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">One-Way Services</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Convenient one-way transportation
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/special-events"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Special Events</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Elegant transportation for special occasions
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/tours"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Tours</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Guided tours and sightseeing experiences
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/services/weddings"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Weddings</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Elegant wedding transportation services
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Classic Fleet Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gradient-to-r from-luxury-ivory to-luxury-pearl font-playfair text-luxury-black border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury">Classic Fleet</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/classic-header.png')`
                        }}
                        to="/classic"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium font-playfair text-white drop-shadow-lg">
                          Classic Fleet
                        </div>
                        <p className="text-sm leading-tight text-white/90 drop-shadow-md">
                          Timeless elegance with our classic luxury vehicles
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/classic/mercedes-280sl-pagoda"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Mercedes 280SL Pagoda</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Iconic 1960s sports car
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/classic/oldsmobile-super-88"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Oldsmobile Super 88</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Classic American luxury sedan
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/classic/rolls-royce-silver-cloud-ii"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Rolls-Royce Silver Cloud II</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Legendary British luxury
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/classic/rolls-royce-silver-shadow"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Rolls-Royce Silver Shadow</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Timeless Rolls-Royce elegance
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Modern Fleet Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gradient-to-r from-luxury-ivory to-luxury-pearl font-playfair text-luxury-black border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury">Modern Fleet</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-cover bg-center p-6 no-underline outline-none focus:shadow-md relative"
                        style={{
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/modern-header.png')`
                        }}
                        to="/modern"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium font-playfair text-white drop-shadow-lg">
                          Modern Fleet
                        </div>
                        <p className="text-sm leading-tight text-white/90 drop-shadow-md">
                          Contemporary luxury with cutting-edge technology
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/modern/bentley-mulsanne"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Bentley Mulsanne</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Ultimate in modern luxury
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/modern/mercedes-gls-300"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Mercedes GLS 300</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Spacious luxury SUV
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/modern/mercedes-s500-brabus"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Mercedes S500 Brabus</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          High-performance luxury sedan
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to="/modern/range-rover-vogue"
                      >
                        <div className="text-sm font-medium leading-none font-playfair">Range Rover Vogue</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Iconic British luxury SUV
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Link */}

            <NavigationMenuItem>
              <Link to="/about" className={`${navigationMenuTriggerStyle()} bg-gradient-to-r from-luxury-ivory to-luxury-pearl font-playfair text-luxury-black border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury`}>
                About
              </Link>
            </NavigationMenuItem>

            {/* Contact Link */}
            <NavigationMenuItem>
              <Link to="/contact" className={`${navigationMenuTriggerStyle()} bg-gradient-to-r from-luxury-ivory to-luxury-pearl font-playfair text-luxury-black border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury`}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport className="bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white border border-luxury-gold/20 shadow-luxury rounded-md relative z-[70]" />
        </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 bg-gradient-to-r from-luxury-ivory to-luxury-pearl border border-luxury-gold/20 hover:border-luxury-gold/40 hover:bg-gradient-to-r hover:from-luxury-gold/5 hover:to-luxury-champagne/5 transition-all duration-500 shadow-luxury-soft hover:shadow-luxury">
                <Menu className="h-5 w-5 text-luxury-black" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col bg-gradient-to-br from-luxury-ivory via-luxury-pearl to-luxury-white border-l border-luxury-gold/20">
              <SheetHeader className="flex-shrink-0 pb-6 border-b border-luxury-gold/10">
                <SheetTitle>
                  <Link to="/" className="luxury-heading text-2xl tracking-wider text-luxury-black hover:text-luxury-gold transition-colors duration-300" onClick={() => setIsOpen(false)}>
                    Chevalier Lane
                  </Link>
                </SheetTitle>
                <SheetDescription className="text-luxury-black/80 font-playfair">
                  Luxury transportation services
                </SheetDescription>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto pr-1 pb-6 pl-4">
                {/* Services Section */}
                <div className="space-y-3 mt-4">
                  <h3 className="luxury-sans-medium text-sm uppercase tracking-wider text-luxury-black/70 mb-3 border-b border-luxury-gold/20 pb-2">Services</h3>
                  <div className="pl-2 space-y-1">
                    <Link to="/services" className="block py-2.5 text-sm text-luxury-black hover:text-luxury-gold transition-all duration-300 hover:translate-x-1 font-playfair" onClick={() => setIsOpen(false)}>
                      Our Services
                    </Link>
                    <Link to="/services/airports" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Airport Transfers
                    </Link>
                    <Link to="/services/business" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Business Travel
                    </Link>
                    <Link to="/services/one-way" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      One-Way Services
                    </Link>
                    <Link to="/services/special-events" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Special Events
                    </Link>
                    <Link to="/services/tours" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Tours
                    </Link>
                    <Link to="/services/weddings" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Weddings
                    </Link>
                  </div>
                </div>

                {/* Classic Fleet Section */}
                <div className="space-y-3 mt-6">
                  <h3 className="luxury-sans-medium text-sm uppercase tracking-wider text-luxury-black/70 mb-3 border-b border-luxury-gold/20 pb-2">Classic Fleet</h3>
                  <div className="pl-2 space-y-1">
                    <Link to="/classic" className="block py-2.5 text-sm text-luxury-black hover:text-luxury-gold transition-all duration-300 hover:translate-x-1 font-playfair" onClick={() => setIsOpen(false)}>
                      Classic Fleet Overview
                    </Link>
                    <Link to="/classic/mercedes-280sl-pagoda" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Mercedes 280SL Pagoda
                    </Link>
                    <Link to="/classic/oldsmobile-super-88" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Oldsmobile Super 88
                    </Link>
                    <Link to="/classic/rolls-royce-silver-cloud-ii" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Rolls-Royce Silver Cloud II
                    </Link>
                    <Link to="/classic/rolls-royce-silver-shadow" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Rolls-Royce Silver Shadow
                    </Link>
                  </div>
                </div>

                {/* Modern Fleet Section */}
                <div className="space-y-3 mt-6">
                  <h3 className="luxury-sans-medium text-sm uppercase tracking-wider text-luxury-black/70 mb-3 border-b border-luxury-gold/20 pb-2">Modern Fleet</h3>
                  <div className="pl-2 space-y-1">
                    <Link to="/modern" className="block py-2.5 text-sm text-luxury-black hover:text-luxury-gold transition-all duration-300 hover:translate-x-1 font-playfair" onClick={() => setIsOpen(false)}>
                      Modern Fleet Overview
                    </Link>
                    <Link to="/modern/bentley-mulsanne" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Bentley Mulsanne
                    </Link>
                    <Link to="/modern/mercedes-gls-300" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Mercedes GLS 300
                    </Link>
                    <Link to="/modern/mercedes-s500-brabus" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Mercedes S500 Brabus
                    </Link>
                    <Link to="/modern/range-rover-vogue" className="block py-2.5 text-sm text-luxury-black/80 hover:text-luxury-gold transition-all duration-300 hover:translate-x-1" onClick={() => setIsOpen(false)}>
                      Range Rover Vogue
                    </Link>
                  </div>
                </div>

                {/* Direct Links */}
                <div className="space-y-2 pt-6 mt-8 border-t border-luxury-gold/20">
                  <Link to="/about" className="block py-3 text-sm luxury-sans-medium text-luxury-black hover:text-luxury-gold transition-all duration-300 hover:translate-x-1 font-playfair" onClick={() => setIsOpen(false)}>
                    About
                  </Link>
                  <Link to="/contact" className="block py-3 text-sm luxury-sans-medium text-luxury-black hover:text-luxury-gold transition-all duration-300 hover:translate-x-1 font-playfair" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
