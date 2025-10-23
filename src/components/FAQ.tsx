import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      question: "What is QueryBot?",
      answer: "An AI-powered assistant for IT support teams."
    },
    {
      question: "Can QueryBot handle multiple agents?",
      answer: "Yes, with role-based access for teams."
    },
    {
      question: "How does QueryBot integrate with existing systems?",
      answer: "QueryBot seamlessly integrates with your existing IT infrastructure through our flexible API and pre-built connectors for popular platforms."
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/30 text-foreground rounded-full border border-accent/50 mb-4">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-display">
            Questions? Answers!
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to the most common questions about our platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border/50 rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-medium text-base hover:no-underline hover:bg-accent/5 transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-lg">✉️</span>
            Have an inquiry?{" "}
            <a href="mailto:hello@querybot.ai" className="text-primary hover:underline font-medium">
              hello@querybot.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
