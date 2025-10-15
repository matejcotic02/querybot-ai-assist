import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.3),transparent_50%)]" />
      
      <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-8 animate-fade-in-up">
        <h2 className="text-display text-white drop-shadow-lg">
          Start Automating Your IT Support Today
        </h2>
        
        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          Join thousands of IT teams using QueryBot to resolve tickets faster and delight customers
        </p>
        
        <Button 
          size="lg"
          variant="secondary"
          className="text-lg px-10 py-7 rounded-3xl group hover-glow shadow-elevated bg-white text-primary hover:bg-white/90"
          onClick={() => window.location.href = '/signup'}
        >
          Try QueryBot Free
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-sm text-white/70">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};
