import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroTempleBg from "@/assets/hero-temple-bg.jpg";

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Japanese Temple Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroTempleBg} 
          alt="Misty Japanese temple background" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#A37BFF]/10 to-white/60 dark:from-background/40 dark:via-[#A37BFF]/10 dark:to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 dark:from-background/30 dark:via-transparent dark:to-background/30" />
      </div>
      
      <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-8 animate-fade-in-up">
        <h2 className="text-display text-foreground">
          Start Automating Your IT Support Today
        </h2>
        
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          Join thousands of IT teams using QueryBot to resolve tickets faster and delight customers
        </p>
        
        <Button 
          size="lg"
          variant="secondary"
          className="text-lg px-10 py-7 rounded-3xl group hover-glow shadow-elevated bg-white text-white hover:bg-white/90"
          onClick={() => window.location.href = '/login'}
        >
          Try QueryBot Free
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
