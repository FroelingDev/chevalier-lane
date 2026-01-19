import { Link } from "@tanstack/react-router";
import { Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/chevalier-lane-512.png"
                alt={t("Chevalier Lane Logo")}
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("Services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Our Services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/airports"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Airport Transfers")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/business"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Business Travel")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/one-way"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("One-Way Services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/exclusive"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Exclusive Services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/tours"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Tours")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/weddings"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Weddings")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Classic Fleet */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("Classic Fleet")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/classic"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Classic Fleet Overview")}
                </Link>
              </li>
              <li>
                <Link
                  to="/classic/mercedes-280sl-pagoda"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Mercedes 280SL Pagoda")}
                </Link>
              </li>
              <li>
                <Link
                  to="/classic/oldsmobile-super-88"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Oldsmobile Super 88")}
                </Link>
              </li>
              <li>
                <Link
                  to="/classic/rolls-royce-silver-cloud-ii"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Rolls-Royce Silver Cloud II")}
                </Link>
              </li>
              <li>
                <Link
                  to="/classic/rolls-royce-silver-shadow"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Rolls-Royce Silver Shadow")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Modern Fleet */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("Modern Fleet")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/modern"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Modern Fleet Overview")}
                </Link>
              </li>
              <li>
                <Link
                  to="/modern/bentley-mulsanne"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Bentley Mulsanne")}
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/modern/mercedes-s500-brabus"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Mercedes S500 Brabus")}
                </Link>
              </li> */}
              <li>
                <Link
                  to="/modern/bentley-flying-spur"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Bentley Flying Spur")}
                </Link>
              </li>
              <li>
                <Link
                  to="/modern/mercedes-maybach"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {t("Mercedes Maybach")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              {t("Contact Us")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">+34 649 64 29 98</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  info@chevalierlane.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  {t("24/7 Service Available")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Chevalier Lane.{" "}
              {t("All rights reserved.")}
            </div>
            <div className="flex space-x-6">
              <Link
                to="/about"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                {t("About")}
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                {t("Contact")}
              </Link>
              <Link
                to="/services"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                {t("Services")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
