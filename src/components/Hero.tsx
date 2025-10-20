import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroTempleBg from "@/assets/hero-temple-bg.jpg";
import logo from "@/assets/logo-purple.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 lg:px-16 py-4">
        <div className="container max-w-7xl mx-auto px-6 py-4 bg-white/80 dark:bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img src={logo} alt="QueryBot Logo" className="w-9 h-9 rounded-lg" />
              <span className="text-xl font-bold">QueryBot</span>
            </div>
            
            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <a href="#product" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Product</a>
              <a href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
              <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Contact</a>
            </div>
            
            {/* Auth Buttons - Right */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                className="hidden sm:inline-flex"
                onClick={() => window.location.href = '/login'}
              >
                Log in
              </Button>
              <ThemeToggle />
              <Button 
                className="bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] hover:opacity-90 text-white"
                onClick={() => window.location.href = '/login'}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Background */}
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

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-32 md:pt-40 pb-20">
        <div className="container max-w-5xl mx-auto text-center space-y-8">
          {/* NEW Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#A37BFF] animate-pulse" />
            <span className="text-sm font-medium">NEW! QueryBot v4 released</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Automate Your <AnimatedHeadline /> Today
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            AI powered IT support, ticket automation, and help desk tools built for modern IT teams
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] hover:opacity-90 text-white text-base px-8 py-6 rounded-lg shadow-lg group"
              onClick={() => window.location.href = '/login'}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="secondary"
              className="bg-[#1e293b] hover:bg-[#0f172a] text-white text-base px-8 py-6 rounded-lg shadow-lg group"
            >
              How QueryBot Works
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
