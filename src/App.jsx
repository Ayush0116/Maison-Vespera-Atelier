import React, { useMemo } from 'react';
import { siteConfig } from './data/siteConfig.js';
import { ToastProvider } from './context/ToastContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import { useActiveSection } from './hooks/useActiveSection.js';

// Global Layout Components
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { MobileActionBar } from './components/MobileActionBar.jsx';
import { FloatingContact } from './components/FloatingContact.jsx';
import { ToastRegion } from './components/ToastRegion.jsx';
import { DemoMarker } from './components/DemoMarker.jsx';
import { IntroOverlay } from './components/IntroOverlay.jsx';

// Section Components
import { HeroSection } from './sections/HeroSection.jsx';
import { AboutSection } from './sections/AboutSection.jsx';
import { ServicesSection } from './sections/ServicesSection.jsx';
import { ExperienceSection } from './sections/ExperienceSection.jsx';
import { TeamSection } from './sections/TeamSection.jsx';
import { GallerySection } from './sections/GallerySection.jsx';
import { OffersSection } from './sections/OffersSection.jsx';
import { TestimonialsSection } from './sections/TestimonialsSection.jsx';
import { BookingSection } from './sections/BookingSection.jsx';
import { FaqSection } from './sections/FaqSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { ClosingCtaBand } from './sections/ClosingCtaBand.jsx';

// Component registry mapping section ids to React components
const SECTION_COMPONENT_MAP = {
  about: AboutSection,
  services: ServicesSection,
  experience: ExperienceSection,
  team: TeamSection,
  gallery: GallerySection,
  offers: OffersSection,
  testimonials: TestimonialsSection,
  booking: BookingSection,
  faq: FaqSection,
  contact: ContactSection
};

export function AppContent() {
  // Compute visible sections based on siteConfig.sections.enabled & siteConfig.sections.order
  const visibleSectionIds = useMemo(() => {
    const list = ['top'];
    const { enabled = {}, order = [] } = siteConfig.sections;
    order.forEach(id => {
      if (enabled[id] && SECTION_COMPONENT_MAP[id]) {
        list.push(id);
      }
    });
    return list;
  }, []);

  const activeSection = useActiveSection(visibleSectionIds);

  return (
    <>
      {/* Skip to Main Content Link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Branded First-Visit Intro Overlay */}
      <IntroOverlay />

      {/* Sticky Header with active section tracking */}
      <Header visibleSections={visibleSectionIds} activeSection={activeSection} />

      {/* Single Continuous Main Content Stream */}
      <main id="main">
        {/* Hero Section (#top) is always rendered first */}
        <HeroSection />

        {/* Dynamically configured vertical section stream */}
        {siteConfig.sections.order.map((sectionId) => {
          if (!siteConfig.sections.enabled[sectionId]) return null;
          const Component = SECTION_COMPONENT_MAP[sectionId];
          if (!Component) return null;
          return <Component key={sectionId} />;
        })}

        {/* Closing Photographic CTA Band */}
        <ClosingCtaBand />
      </main>

      {/* Universal Footer */}
      <Footer visibleSections={visibleSectionIds} />

      {/* Mobile Sticky Action Bar */}
      <MobileActionBar visibleSections={visibleSectionIds} />

      {/* Desktop Floating WhatsApp/Call Concierge */}
      <FloatingContact />

      {/* Toast Alert Region */}
      <ToastRegion />

      {/* Template Demo Preview Marker */}
      <DemoMarker />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </ToastProvider>
  );
}
