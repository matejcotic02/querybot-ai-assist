import { Bot, BarChart3, Settings, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroTempleBg from "@/assets/hero-temple-bg.jpg";

const features = [
  {
    icon: Bot,
    title: "AI Support",
    description: "GPT-powered automated replies that understand context and provide accurate solutions instantly."
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Real-time metrics and satisfaction tracking to optimize your support performance."
  },
  {
    icon: Settings,
    title: "Ticket Automation",
    description: "Auto-classify and resolve technical issues before they reach your team."
  }
];

export const Features = () => {
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
      
      <div className="relative z-10 w-full px-4 md:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up max-w-4xl mx-auto">
          <h2 className="text-h2">
            Everything you need to{" "}
            <span className="text-purple-400 font-semibold">
              automate support
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features that help your team resolve tickets faster and smarter
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
            <Card 
                key={index}
                className="border-2 rounded-3xl shadow-soft hover-lift group animate-fade-in-up overflow-hidden glass"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:glow-primary transition-all duration-500 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] hover:opacity-90 text-white text-base px-8 py-6 rounded-lg shadow-lg group"
            onClick={() => window.location.href = '/login'}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
