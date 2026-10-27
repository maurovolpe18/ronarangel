import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FocusSection } from "@/components/sections/FocusSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-cream text-ink">
      <SiteHeader />
      <HeroSection />
      <ConceptSection />
      <AboutSection />
      <FocusSection />
      <ImpactSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsCarousel />
      <ContactSection />
    </main>
  );
}
