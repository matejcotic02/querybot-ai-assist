import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SuccessSection } from "@/components/SuccessSection";
import { TagScroll } from "@/components/TagScroll";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesThatMatter } from "@/components/FeaturesThatMatter";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Combined Hero + Features with shared background */}
      <div className="relative">
        {/* Modern AI-Inspired Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5F3FF] via-[#ECE8FF] to-[#DCD6FF]">
          {/* Soft Purple Glow Effect */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(163,123,255,0.25),transparent_70%)] pointer-events-none" />
          
          {/* Bottom fade to white */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
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
