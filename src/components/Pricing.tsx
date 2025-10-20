import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Rocket } from "lucide-react";

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Pro",
      subtitle: "For solo reps or small teams",
      monthlyPrice: 49,
      yearlyPrice: 39,
      cta: "Get Started",
      features: [
        "Three hours of live training included for free",
        "Extra usage billed at $12/hour",
        "AI Roleplay",
        "AI Call Scoring & Analysis",
        "Works for any niche & offer",
        "Language support for English, spanish, dutch, french, german & more"
      ]
    },
    {
      name: "Enterprise",
      subtitle: "For teams of 10 or more",
      isEnterprise: true,
      cta: "Book Demo",
      features: [
        "Custom AI sales models",
        "Custom AI scoring & review",
        "Everything from starter plan",
        "Dedicated account manger",
        "VIP support",
        "DFY onboarding & setup"
      ]
    }
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      <div className="container max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in-up">
          <h2 className="text-display">
            Pricing
          </h2>
        </div>

        {/* Monthly/Yearly Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in-up">
          <div className="relative inline-flex items-center gap-3 bg-muted/50 p-1.5 rounded-full backdrop-blur-sm border border-border/50">
            {/* Toggle background slider */}
            <div 
              className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{
                width: isYearly ? 'calc(50% - 6px)' : 'calc(50% - 6px)',
                transform: isYearly ? 'translateX(calc(100% + 12px))' : 'translateX(0)'
              }}
            />
            
            {/* Monthly button */}
            <button
              onClick={() => setIsYearly(false)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly ? 'text-white' : 'text-foreground hover:text-foreground/80'
              }`}
            >
              Monthly
            </button>
            
            {/* Yearly button */}
            <button
              onClick={() => setIsYearly(true)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isYearly ? 'text-white' : 'text-foreground hover:text-foreground/80'
              }`}
            >
              Yearly
            </button>
          </div>
          
          {/* Save 20% badge */}
          <span className="px-3 py-1.5 bg-accent/30 text-foreground text-sm font-medium rounded-full border border-accent/50">
            Save 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="border border-border/50 rounded-2xl shadow-soft hover-lift group bg-background overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 space-y-6">
                {/* Plan Name */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.subtitle && (
                    <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                  )}
                </div>

                {/* Price or Enterprise */}
                <div className="min-h-[80px] flex items-center">
                  {plan.isEnterprise ? (
                    <div className="text-4xl font-bold">Book Demo</div>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold transition-all duration-300">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground text-base">/month per seat</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full h-12 bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] hover:from-[#9268EE] hover:to-[#6C4BEE] text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(163,123,255,0.4)] group-hover:scale-[1.02]"
                >
                  {plan.cta}
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>

                {/* Divider */}
                <div className="border-t border-dashed border-border/50 pt-6" />

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
