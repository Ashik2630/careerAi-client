import HeroSection from "@/components/HeroSection";
import IntelligentToolsSection from "@/components/IntelligentToolsSection";
import CareerEngineSection from "@/components/CareerEngineSection";
import CtaSection from "@/components/CtaSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <IntelligentToolsSection />
      <CareerEngineSection />
      <CtaSection />
    </div>
  );
}
