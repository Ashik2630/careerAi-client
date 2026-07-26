import HeroSection from "@/components/HeroSection";
import IntelligentToolsSection from "@/components/IntelligentToolsSection";
import CareerEngineSection from "@/components/CareerEngineSection";
import FooterNewsletter from "@/components/FooterNewsletter";
import CtaSection from "@/components/CtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <HeroSection />
      <IntelligentToolsSection />
      <CareerEngineSection />
      <FooterNewsletter />
      <CtaSection />
    </div>
  );
}
