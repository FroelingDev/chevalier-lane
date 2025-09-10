import { Link } from '@tanstack/react-router'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/chevalier-lane-512.png"
                alt="Chevalier Lane Logo"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/services/airports" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link to="/services/business" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Business Travel
                </Link>
              </li>
              <li>
                <Link to="/services/one-way" className="text-sm text-gray-600 hover:text-black transition-colors">
                  One-Way Services
                </Link>
              </li>
              <li>
                <Link to="/services/special-events" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Special Events
                </Link>
              </li>
              <li>
                <Link to="/services/tours" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/services/weddings" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Weddings
                </Link>
              </li>
            </ul>
          </div>

          {/* Classic Fleet */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Classic Fleet
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/classic" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Classic Collection
                </Link>
              </li>
              <li>
                <Link to="/classic/mercedes-280sl-pagoda" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Mercedes 280SL Pagoda
                </Link>
              </li>
              <li>
                <Link to="/classic/oldsmobile-super-88" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Oldsmobile Super 88
                </Link>
              </li>
              <li>
                <Link to="/classic/rolls-royce-silver-cloud-ii" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Rolls-Royce Silver Cloud II
                </Link>
              </li>
              <li>
                <Link to="/classic/rolls-royce-silver-shadow" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Rolls-Royce Silver Shadow
                </Link>
              </li>
            </ul>
          </div>

          {/* Modern Fleet */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Modern Fleet
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/modern" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Modern Luxury
                </Link>
              </li>
              <li>
                <Link to="/modern/bentley-mulsanne" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Bentley Mulsanne
                </Link>
              </li>
              <li>
                <Link to="/modern/mercedes-gls-300" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Mercedes GLS 300
                </Link>
              </li>
              <li>
                <Link to="/modern/mercedes-s500-brabus" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Mercedes S500 Brabus
                </Link>
              </li>
              <li>
                <Link to="/modern/range-rover-vogue" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Range Rover Vogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600">info@chevalierlane.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Luxury Avenue<br />
                  Beverly Hills, CA 90210
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600">24/7 Service Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Chevalier Lane. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-sm text-gray-500 hover:text-black transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">
                Contact
              </Link>
              <Link to="/services" className="text-sm text-gray-500 hover:text-black transition-colors">
                Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
