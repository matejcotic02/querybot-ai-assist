import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SuccessSection } from "@/components/SuccessSection";
import { TagScroll } from "@/components/TagScroll";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesThatMatter } from "@/components/FeaturesThatMatter";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import heroExtendedBg from "@/assets/hero-extended-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Combined Hero + Features with shared background */}
      <div className="relative">
        {/* Single Japanese Temple Background for both sections */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroExtendedBg} 
            alt="Misty Japanese temple background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#A37BFF]/10 to-white/60 dark:from-background/40 dark:via-[#A37BFF]/10 dark:to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 dark:from-background/30 dark:via-transparent dark:to-background/30" />
          {/* Bottom fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-background dark:via-background/80 dark:to-transparent" />
        </div>
        <Hero />
        <Features />
      </div>
      <SuccessSection />
      <TagScroll />
      <Testimonials />
      <FeaturesThatMatter />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
