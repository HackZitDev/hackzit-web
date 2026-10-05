"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLanguage } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

// Translations for footer
const translations = {
  en: {
    aboutUs: "About Us",
    aboutText:
      "Innovative software solutions crafted for businesses and organizations looking to transform their ideas into reality.",
    quickLinks: "Quick Links",
    services: "Services",
    webDevelopment: "Web Development",
    mobileApps: "Mobile Apps",
    desktopSoftware: "Desktop Software",
    aiSolutions: "AI & ML Solutions",
    cloudServices: "Cloud Services",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved.",
    home: "Home",
    projects: "Projects",
    team: "Team",
    contact: "Contact",
  },
  es: {
    aboutUs: "Sobre Nosotros",
    aboutText:
      "Soluciones de software innovadoras diseñadas para empresas y organizaciones que buscan transformar sus ideas en realidad.",
    quickLinks: "Enlaces Rápidos",
    services: "Servicios",
    webDevelopment: "Desarrollo Web",
    mobileApps: "Aplicaciones Móviles",
    desktopSoftware: "Software de Escritorio",
    aiSolutions: "Soluciones de IA y ML",
    cloudServices: "Servicios en la Nube",
    contactUs: "Contáctanos",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    allRightsReserved: "Todos los derechos reservados.",
    home: "Inicio",
    projects: "Proyectos",
    team: "Equipo",
    contact: "Contacto",
  },
};

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background/70 backdrop-blur-lg border-t border-primary/10 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/HACKZIT_LOGO/SVG/Logo&NameTop.svg"
                alt="HackZit"
                width={150}
                height={60}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-4 text-text">{t.aboutUs}</h3>
            <p className="text-text/70 mb-4">{t.aboutText}</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-text">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.services}
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.team}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-text">{t.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.webDevelopment}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.mobileApps}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.desktopSoftware}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.aiSolutions}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  {t.cloudServices}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-text">{t.contactUs}</h3>
            <address className="not-italic">
              <p className="text-text/70 mb-2">
                <a
                  href="mailto:hackzit.dev@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  hackzit.dev@gmail.com
                </a>
                <br />
                <a
                  href="mailto:sebaxe09@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  sebaxe09@gmail.com
                </a>
              </p>
              <p className="text-text/70">
                <a
                  href="tel:+573217551344"
                  className="text-text/70 hover:text-accent transition-colors"
                >
                  +57 (321) 755 1344
                </a>
              </p>

              {/* Language Toggle for Footer */}
              <div className="mt-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 py-2 px-3 bg-primary/10 hover:bg-primary/20 rounded-md text-primary transition-colors"
                >
                  <FaLanguage size={18} />
                  <span className="text-sm">
                    {language === "en" ? "EN" : "ES"}
                  </span>
                </button>
              </div>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-text/10 my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-text/60 text-sm mb-4 md:mb-0">
            © {currentYear} HackZit. {t.allRightsReserved}
          </p>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-text/60 hover:text-accent transition-colors"
            >
              {t.privacyPolicy}
            </a>
            <a
              href="#"
              className="text-text/60 hover:text-accent transition-colors"
            >
              {t.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
