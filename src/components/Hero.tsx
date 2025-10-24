import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo-purple.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedHeadline } from "@/components/AnimatedHeadline";
import { useState, useEffect } from "react";
export const Hero = () => {
  const [activeNav, setActiveNav] = useState<string>("none");
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -75% 0px",
      threshold: 0.25
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "testimonials") setActiveNav("Testimonials");else if (id === "pricing") setActiveNav("Questions");else if (id === "about") setActiveNav("About");else if (id === "contact") setActiveNav("Contact");
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const testimonialsSection = document.getElementById("testimonials");
    const questionsSection = document.getElementById("pricing");
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    if (testimonialsSection) observer.observe(testimonialsSection);
    if (questionsSection) observer.observe(questionsSection);
    if (aboutSection) observer.observe(aboutSection);
    if (contactSection) observer.observe(contactSection);
    return () => {
      if (testimonialsSection) observer.unobserve(testimonialsSection);
      if (questionsSection) observer.unobserve(questionsSection);
      if (aboutSection) observer.unobserve(aboutSection);
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offset = -80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY + offset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 850; // 800-900ms
      let startTime: number | null = null;
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      requestAnimationFrame(animation);
    }
  };
  return <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 py-4">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-4 bg-white/80 dark:bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img src={logo} alt="QueryBot Logo" className="w-9 h-9 rounded-lg" />
              <span className="text-xl font-bold">QueryBot</span>
            </div>
            
            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-12 flex-1 justify-center">
              <a href="#testimonials" onClick={e => handleSmoothScroll(e, "testimonials")} className={`text-sm font-medium transition-all duration-300 ${activeNav === "Testimonials" ? "text-[#A37BFF] border-b-2 border-[#A37BFF]" : "text-foreground/80 hover:text-[#A37BFF]"}`}>
                Testimonials
              </a>
              <a href="#pricing" onClick={e => handleSmoothScroll(e, "pricing")} className={`text-sm font-medium transition-all duration-300 ${activeNav === "Questions" ? "text-[#A37BFF] border-b-2 border-[#A37BFF]" : "text-foreground/80 hover:text-[#A37BFF]"}`}>
                Questions
              </a>
              <a href="#about" onClick={e => handleSmoothScroll(e, "about")} className={`text-sm font-medium transition-all duration-300 ${activeNav === "About" ? "text-[#A37BFF] border-b-2 border-[#A37BFF]" : "text-foreground/80 hover:text-[#A37BFF]"}`}>
                About
              </a>
              <a href="#contact" onClick={e => handleSmoothScroll(e, "contact")} className={`text-sm font-medium transition-all duration-300 ${activeNav === "Contact" ? "text-[#A37BFF] border-b-2 border-[#A37BFF]" : "text-foreground/80 hover:text-[#A37BFF]"}`}>
                Contact
              </a>
            </div>
            
            {/* Auth Buttons - Right */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => window.location.href = '/login'}>
                Log in
              </Button>
              <ThemeToggle />
              <Button className="bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] hover:opacity-90 text-white" onClick={() => window.location.href = '/login'}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-32 md:pt-40 pb-12">
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
            <Button size="lg" className="bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] hover:opacity-90 text-white text-base px-8 py-6 rounded-lg shadow-lg group" onClick={() => window.location.href = '/login'}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            
          </div>
        </div>
      </div>
    </section>;
};