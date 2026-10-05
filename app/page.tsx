import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import TechnologiesSection from "./components/TechnologiesSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";
import Script from "next/script";
import SEO from "./components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Script
        id="company-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HackZit",
            url: "https://hackzit.com",
            logo: "https://hackzit.com/HACKZIT_LOGO/SVG/Logo&NameTop.svg",
            description:
              "Full-stack software development company specializing in custom applications, mobile solutions, enterprise software, and cutting-edge technologies.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Your City",
              addressRegion: "Your Region",
              addressCountry: "Your Country",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+57-321-755-1344",
              contactType: "customer service",
              email: "contact@hackzit.com",
            },
            sameAs: [
              "https://facebook.com/hackzit",
              "https://twitter.com/hackzit",
              "https://linkedin.com/company/hackzit",
              "https://instagram.com/hackzit",
            ],
          }),
        }}
      />
      <Script
        id="services-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Software Development",
            provider: {
              "@type": "Organization",
              name: "HackZit",
            },
            areaServed: {
              "@type": "Country",
              name: "Global",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Software Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Web Development",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Mobile App Development",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Enterprise Solutions",
                  },
                },
              ],
            },
          }),
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechnologiesSection />
        <ProjectsSection />
        <TeamSection />
        <ContactSection />
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
}
