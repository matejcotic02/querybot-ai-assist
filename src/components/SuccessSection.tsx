import { LogoCarousel } from "./LogoCarousel";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight } from "lucide-react";
import successHeroImage from "@/assets/success-hero.png";

export const SuccessSection = () => {
  return (
    <section className="relative py-20 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-white to-[#F7F5FF]">
      {/* Soft Glow Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(163,123,255,0.08),transparent_70%)]" />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Logo Carousel */}
        <LogoCarousel />
        
        {/* Separator */}
        <div className="w-full h-px bg-border/30 my-12" />
        
        {/* Centered Content Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-[900px] mx-auto space-y-6 animate-fade-in-up">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm">
            <span className="text-xl">🚀</span>
            <span className="text-sm font-medium text-foreground">Automation Made Simple</span>
          </div>
          
          {/* Heading */}
          <h2 className="text-h2 leading-tight">
            Success Is Earned In Training
          </h2>
          
          {/* Body Text */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            QueryBot focuses on the things that actually matter in your IT support process. 
            Improving agent performance, speeding up response time, and making ticket management 
            more effective. Giving QueryBot to your IT team means giving them the best support 
            partner, coach and automation possible so they can perform at their best.
          </p>
          
          {/* CTA Button */}
          <div className="pt-2">
            <ShimmerButton 
              className="text-base shadow-lg"
              onClick={() => window.location.href = '/login'}
            >
              <span className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
};
