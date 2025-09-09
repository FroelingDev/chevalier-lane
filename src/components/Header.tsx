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
    <header className="p-4 bg-white text-black border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold text-xl font-playfair">
          <Link to="/">Chevalier Lane</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/services"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Our Services
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
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
                        <div className="text-sm font-medium leading-none">Airport Transfers</div>
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
                        <div className="text-sm font-medium leading-none">Business Travel</div>
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
                        <div className="text-sm font-medium leading-none">One-Way Services</div>
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
                        <div className="text-sm font-medium leading-none">Special Events</div>
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
                        <div className="text-sm font-medium leading-none">Tours</div>
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
                        <div className="text-sm font-medium leading-none">Weddings</div>
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
              <NavigationMenuTrigger>Classic Fleet</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/classic"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Classic Fleet
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
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
                        <div className="text-sm font-medium leading-none">Mercedes 280SL Pagoda</div>
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
                        <div className="text-sm font-medium leading-none">Oldsmobile Super 88</div>
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
                        <div className="text-sm font-medium leading-none">Rolls-Royce Silver Cloud II</div>
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
                        <div className="text-sm font-medium leading-none">Rolls-Royce Silver Shadow</div>
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
              <NavigationMenuTrigger>Modern Fleet</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[350px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/modern"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Modern Fleet
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
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
                        <div className="text-sm font-medium leading-none">Bentley Mulsanne</div>
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
                        <div className="text-sm font-medium leading-none">Mercedes GLS 300</div>
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
                        <div className="text-sm font-medium leading-none">Mercedes S500 Brabus</div>
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
                        <div className="text-sm font-medium leading-none">Range Rover Vogue</div>
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
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>

            {/* Contact Link */}
            <NavigationMenuItem>
              <Link to="/contact" className={navigationMenuTriggerStyle()}>
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader className="flex-shrink-0">
                <SheetTitle>
                  <Link to="/" className="font-bold text-xl font-playfair" onClick={() => setIsOpen(false)}>
                    Chevalier Lane
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  Luxury transportation services
                </SheetDescription>
              </SheetHeader>

              <nav className="flex-1 overflow-y-auto pr-1 pb-6">
                {/* Services Section */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Services</h3>
                  <div className="pl-4 space-y-2">
                    <Link to="/services" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Our Services
                    </Link>
                    <Link to="/services/airports" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Airport Transfers
                    </Link>
                    <Link to="/services/business" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Business Travel
                    </Link>
                    <Link to="/services/one-way" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      One-Way Services
                    </Link>
                    <Link to="/services/special-events" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Special Events
                    </Link>
                    <Link to="/services/tours" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Tours
                    </Link>
                    <Link to="/services/weddings" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Weddings
                    </Link>
                  </div>
                </div>

                {/* Classic Fleet Section */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Classic Fleet</h3>
                  <div className="pl-4 space-y-2">
                    <Link to="/classic" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Classic Fleet Overview
                    </Link>
                    <Link to="/classic/mercedes-280sl-pagoda" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Mercedes 280SL Pagoda
                    </Link>
                    <Link to="/classic/oldsmobile-super-88" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Oldsmobile Super 88
                    </Link>
                    <Link to="/classic/rolls-royce-silver-cloud-ii" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Rolls-Royce Silver Cloud II
                    </Link>
                    <Link to="/classic/rolls-royce-silver-shadow" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Rolls-Royce Silver Shadow
                    </Link>
                  </div>
                </div>

                {/* Modern Fleet Section */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Modern Fleet</h3>
                  <div className="pl-4 space-y-2">
                    <Link to="/modern" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Modern Fleet Overview
                    </Link>
                    <Link to="/modern/bentley-mulsanne" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Bentley Mulsanne
                    </Link>
                    <Link to="/modern/mercedes-gls-300" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Mercedes GLS 300
                    </Link>
                    <Link to="/modern/mercedes-s500-brabus" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Mercedes S500 Brabus
                    </Link>
                    <Link to="/modern/range-rover-vogue" className="block py-2 text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                      Range Rover Vogue
                    </Link>
                  </div>
                </div>

                {/* Direct Links */}
                <div className="space-y-2 pt-4 border-t">
                  <Link to="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                    About
                  </Link>
                  <Link to="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
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
