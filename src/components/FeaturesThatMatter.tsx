import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    emoji: "🎯",
    title: "Smart Ticket Routing",
    description: "AI automatically categorizes and assigns tickets to the right team members based on expertise and workload."
  },
  {
    emoji: "⚡",
    title: "Auto-Resolution",
    description: "Resolve common issues instantly with AI-powered responses trained on your knowledge base."
  },
  {
    emoji: "📚",
    title: "Knowledge Base Integration",
    description: "Seamlessly connect your existing documentation for context-aware AI responses."
  },
  {
    emoji: "📊",
    title: "Real-time Analytics",
    description: "Track ticket volume, resolution times, and team performance with comprehensive dashboards."
  },
  {
    emoji: "💬",
    title: "Multi-Channel Support",
    description: "Manage tickets from email, chat, and web forms in one unified interface."
  },
  {
    emoji: "🔧",
    title: "Custom Workflows",
    description: "Build automated workflows that match your team's processes and escalation rules."
  }
];

const badges = [
  { emoji: "🧠", text: "AI-Driven Support" },
  { emoji: "⚡", text: "Fast Integration" },
  { emoji: "🔍", text: "Complete Transparency" }
];

export const FeaturesThatMatter = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Soft white-purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in-up">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30">
            <span className="text-lg">⚙️</span>
            <span className="text-sm font-medium text-foreground">Smart Automation</span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-display">
            Features That Matter
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for IT teams, by IT experts
          </p>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {badges.map((badge, index) => (
            <Badge 
              key={index}
              variant="outline"
              className="px-3 py-1.5 text-sm font-medium bg-background/50 backdrop-blur-sm hover:bg-accent/10 transition-colors"
            >
              <span className="mr-1.5">{badge.emoji}</span>
              {badge.text}
            </Badge>
            ))}
          </div>
        </div>
        
        {/* Feature Cards - Two rows with 3 cards each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border border-border/50 rounded-2xl shadow-soft hover-lift group animate-fade-in-up bg-background overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                {/* Gradient Icon Background */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl opacity-90 bg-gradient-to-br from-[#A37BFF] to-[#7D5CFF] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(163,123,255,0.3)]">{feature.emoji}</span>
                </div>
                
                {/* Bold Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                {/* Short Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
