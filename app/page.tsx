import { LazyNewsletterPopup } from "@/components/LazyNewsletterPopup";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WorkSection } from "@/components/sections/WorkSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-cream text-ink">
      <SiteHeader />
      <HeroSection />
      <ConceptSection />
      <AboutSection />
      <ImpactSection />
      <PortfolioSection />
      <WorkSection />
      <ProcessSection />
      <TestimonialsCarousel />
      <NewsletterSection />
      <ContactSection />
      <LazyNewsletterPopup />
    </main>
  );
}
