import { Bot, BarChart3, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.05),transparent_70%)]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              automate support
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that help your team resolve tickets faster and smarter
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-2 rounded-3xl shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:glow-primary transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
