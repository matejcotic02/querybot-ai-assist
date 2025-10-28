import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-b from-[#F6F3FF] via-[#EDE6FF] to-[#D8C8FF]">
      {/* Soft Glow Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_60%,rgba(163,123,255,0.15),transparent_70%)]" />
      </div>
      
      <div className="container max-w-4xl mx-auto text-center relative z-10 space-y-8 animate-fade-in-up">
        <h2 className="text-display text-[#2D215C]">
          Start Automating Your IT Support Today
        </h2>
        
        <p className="text-xl text-[#2D215C]/80 max-w-2xl mx-auto">
          Join thousands of IT teams using QueryBot to resolve tickets faster and delight customers
        </p>
        
        <Button 
          size="lg"
          className="text-lg px-10 py-7 rounded-3xl group hover-glow shadow-elevated bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] text-white hover:opacity-90 font-semibold"
          onClick={() => window.location.href = '/login'}
        >
          Try QueryBot Free
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
