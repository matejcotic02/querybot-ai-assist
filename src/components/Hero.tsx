import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import heroDashboard from "@/assets/hero-dashboard.png";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-in-left">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                AI-Powered Support
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Instant IT Support.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Powered by AI.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              QueryBot helps IT teams automate responses and resolve tickets in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-2xl group shadow-elevated hover:glow-primary transition-all"
                onClick={() => window.location.href = '/signup'}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-2xl group border-2 hover:border-primary/50"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Right Content - Dashboard Image */}
          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 gradient-hero opacity-20 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border/50">
              <img 
                src={heroDashboard} 
                alt="QueryBot AI Dashboard Interface showing ticket analytics and automated responses"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="bg-card rounded-3xl p-4 max-w-4xl w-full shadow-elevated">
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground">Demo video would load here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
