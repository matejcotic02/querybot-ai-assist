import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SuccessSection } from "@/components/SuccessSection";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesThatMatter } from "@/components/FeaturesThatMatter";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <SuccessSection />
      <Testimonials />
      <FeaturesThatMatter />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
