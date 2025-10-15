import { MessageSquare, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "User sends a support message",
    description: "Customer reaches out with a technical issue or question"
  },
  {
    icon: Sparkles,
    title: "QueryBot AI instantly provides a solution",
    description: "Our AI analyzes the query and generates an accurate response in seconds"
  },
  {
    icon: CheckCircle,
    title: "Agent reviews and finalizes resolution",
    description: "Your team verifies and approves the solution for quality assurance"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 glass">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-h2">How it works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your IT support
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2 opacity-30 blur-sm" />
          
          <div className="grid lg:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="relative text-center space-y-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold shadow-elevated hover:glow-primary transition-all duration-500 mb-4 animate-scale-in">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-3xl glass border-2 border-border flex items-center justify-center shadow-soft hover:shadow-elevated hover:scale-110 transition-all duration-300">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold px-4">{step.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
