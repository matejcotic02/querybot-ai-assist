import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.2),transparent_50%)]" />
      
      <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Start Automating Your IT Support Today
        </h2>
        
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands of IT teams using QueryBot to resolve tickets faster and delight customers
        </p>
        
        <Button 
          size="lg"
          variant="secondary"
          className="text-lg px-10 py-7 rounded-2xl group shadow-elevated hover:scale-105 transition-all"
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
