import { LogoCarousel } from "./LogoCarousel";
import successHeroImage from "@/assets/success-hero.png";

export const SuccessSection = () => {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo Carousel */}
        <LogoCarousel />
        
        {/* Separator */}
        <div className="w-full h-px bg-border/30 my-12" />
        
        {/* Success Content Section */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content (3/5 width) */}
          <div className="lg:col-span-3 space-y-6 animate-fade-in-up">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-medium text-primary">Automation Made Simple</span>
            </div>
            
            {/* Heading */}
            <h2 className="text-h2 leading-tight">
              Success Is Earned In Training
            </h2>
            
            {/* Body Text */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              QueryBot focuses on the things that actually matter in your IT support process. 
              Improving agent performance, speeding up response time, and making ticket management 
              more effective. Giving QueryBot to your IT team means giving them the best support 
              partner, coach and automation possible so they can perform at their best.
            </p>
          </div>
          
          {/* Right Column - Image (2/5 width) */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated hover:shadow-glow transition-all duration-500 group">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-200/40 via-purple-200/30 to-pink-100/40 z-10 opacity-50 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Image */}
              <img
                src={successHeroImage}
                alt="Japanese temple and samurai meditation garden representing discipline and success"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
