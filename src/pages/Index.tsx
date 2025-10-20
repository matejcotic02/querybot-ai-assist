import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SuccessSection } from "@/components/SuccessSection";
import { TagScroll } from "@/components/TagScroll";
import { Testimonials } from "@/components/Testimonials";
import { FeaturesThatMatter } from "@/components/FeaturesThatMatter";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <SuccessSection />
      <TagScroll />
      <Testimonials />
      <FeaturesThatMatter />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
