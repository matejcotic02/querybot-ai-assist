import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "QueryBot reduced our average ticket resolution time from 2 hours to just 15 minutes. Our team can finally focus on complex issues.",
    name: "Sarah Johnson",
    role: "IT Director",
    company: "TechCorp",
    rating: 5
  },
  {
    quote: "The AI accuracy is incredible. It handles 80% of our routine tickets without any human intervention. Game changer for our support team.",
    name: "Michael Chen",
    role: "Support Lead",
    company: "CloudScale",
    rating: 5
  },
  {
    quote: "Implementation was seamless and our customer satisfaction scores increased by 35% in the first month. Highly recommended!",
    name: "Emily Rodriguez",
    role: "Operations Manager",
    company: "DataFlow",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h2 className="text-h2">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              IT teams worldwide
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about QueryBot
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-2 rounded-3xl shadow-soft hover-lift animate-fade-in-up glass group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary font-medium mt-1">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
