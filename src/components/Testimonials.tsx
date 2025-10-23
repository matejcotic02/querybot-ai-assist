import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import heroTempleBg from "@/assets/hero-temple-bg.jpg";

const testimonials = [
  {
    quote: "Not only has my team's production started to increase but they are becoming more confident on the phones and getting quicker at overcoming the objections",
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechCorp",
    initials: "SJ",
    avatar: ""
  },
  {
    quote: "QueryBot reduced our average ticket resolution time from 2 hours to just 15 minutes. Our team can finally focus on complex issues that matter.",
    name: "Michael Chen",
    role: "Support Lead",
    company: "CloudScale",
    initials: "MC",
    avatar: ""
  },
  {
    quote: "Implementation was seamless and our customer satisfaction scores increased by 35% in the first month. Game changer for our entire organization!",
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "DataFlow",
    initials: "ER",
    avatar: ""
  }
];

const stats = [
  { value: 45, label: "More resolved tickets, faster support", suffix: "%" },
  { value: 70, label: "Automated onboarding + workflows", suffix: "%" },
  { value: 80, label: "Less training, quicker productivity", suffix: "%" }
];

const AnimatedStat = ({ value, label, suffix }: { value: number; label: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        } else if (!entry.isIntersecting && hasAnimated) {
          // Reset when leaving viewport
          setHasAnimated(false);
          setCount(0);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center space-y-4">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
        {count}{suffix}
      </div>
      <p className="text-base md:text-lg text-foreground/80 max-w-xs mx-auto">
        {label}
      </p>
    </div>
  );
};

export const Testimonials = () => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section 
      id="testimonials"
      className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroTempleBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Purple Mist Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-300/60 via-purple-200/50 to-purple-300/60 z-0" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm mb-4">
            <span className="text-xl">💬</span>
            <span className="text-sm font-medium text-foreground dark:text-gray-900">QueryBot Users</span>
          </div>
          
          <h2 className="text-h2 text-foreground">
            What Our Customers Are Saying
          </h2>
        </div>
        
        {/* Carousel */}
        <div className="max-w-4xl mx-auto mb-20">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm border-0 dark:border dark:border-slate-700/50 rounded-3xl shadow-2xl mx-4 md:mx-8">
                    <CardContent className="p-8 md:p-12 space-y-8">
                      {/* Quote */}
                      <p className="text-lg md:text-xl text-gray-800 dark:text-slate-200 leading-relaxed text-center">
                        "{testimonial.quote}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center gap-4 pt-6">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          {testimonial.avatar ? (
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          ) : null}
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-semibold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 dark:text-white/90 text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-600 dark:text-slate-300">{testimonial.role}</p>
                          <p className="text-sm text-primary dark:text-primary/90 font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Arrows */}
            <CarouselPrevious className="left-0 -translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-purple-200 shadow-lg">
              <ChevronLeft className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="right-0 translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-purple-200 shadow-lg">
              <ChevronRight className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {stats.map((stat, index) => (
            <AnimatedStat 
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
