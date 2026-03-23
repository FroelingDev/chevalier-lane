import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/contact";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      {/* Section 1 — thin white strip with centered logo */}
      <div className="bg-white py-6 flex items-center justify-center border-t border-gray-100">
        <img
          src="/chevalier-lane-512.png"
          alt={t("Chevalier Lane Logo")}
          className="w-28 h-28 object-contain"
        />
      </div>

      {/* Section 2 — black footer */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">
                {t("Services")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Our Services")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/airports"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Airport Transfers")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/business"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Business Travel")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/one-way"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("One-Way Services")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Exclusive Services")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/tours"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Tours")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/weddings"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Weddings")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">
                {t("About")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("About Us")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/complete-fleet"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {t("Our Fleet")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b8860b]">
                {t("Contact Us")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="h-4 w-4 text-[#b8860b] flex-shrink-0 mt-0.5" />
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-[#b8860b] flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Instagram className="h-4 w-4 text-[#b8860b] flex-shrink-0 mt-0.5" />
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <Linkedin className="h-4 w-4 text-[#b8860b] flex-shrink-0 mt-0.5" />
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-10 pt-6 text-center">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Chevalier Lane. {t("All rights reserved.")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
