import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import heroDashboard from "@/assets/hero-dashboard.png";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/logo.png";

export const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16 pt-24 pb-16">
      {/* Logo & Theme Toggle */}
      <div className="absolute top-8 left-8 z-20 flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
        <img src={logo} alt="QueryBot Logo" className="w-10 h-10 rounded-xl transition-all group-hover:scale-110 drop-shadow-lg" />
        <span className="text-xl font-bold hidden sm:block">QueryBot</span>
      </div>
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>
      
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.2),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent)/0.15),transparent_60%)]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-in-left">
            <div className="inline-block animate-scale-in">
              <span className="px-4 py-2 rounded-full glass text-primary text-sm font-medium shadow-glass">
                🤖 AI-Powered Support
              </span>
            </div>
            
            <h1 className="text-display">{/* ... keep existing code */}
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
                className="text-lg px-8 py-6 rounded-3xl group hover-glow transition-all shadow-elevated"
                onClick={() => window.location.href = '/signup'}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-3xl group glass hover:border-primary/50 transition-all"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Right Content - Dashboard Image */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 gradient-hero opacity-30 blur-3xl rounded-3xl animate-pulse" />
            <div className="relative rounded-3xl overflow-hidden shadow-elevated glass border-2 border-border/30 hover-lift">
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
          className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setShowVideo(false)}
        >
          <div className="glass rounded-3xl p-6 max-w-4xl w-full shadow-elevated border-2 border-border/50">
            <div className="aspect-video bg-muted/50 rounded-3xl flex items-center justify-center">
              <p className="text-muted-foreground">Demo video would load here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
