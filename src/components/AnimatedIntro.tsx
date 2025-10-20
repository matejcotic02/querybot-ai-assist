import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export const AnimatedIntro = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  const lines = [
    "AI-Powered IT Support",
    "Automate Your Workflows",
    "Resolve Tickets 10× Faster",
    "Built for Modern IT Teams",
    "Welcome to QueryBot"
  ];

  useEffect(() => {
    // Stagger the text lines with 0.5s delay between each
    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, index * 500);
    });

    // Show CTA button after final line animation completes
    // Last line starts at 2s, animates for 1s, then 0.8s delay
    setTimeout(() => {
      setShowCTA(true);
    }, 3800);
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background via-purple-50/30 to-background dark:from-background dark:via-purple-950/20 dark:to-background">
      {/* Static Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A37BFF]/5 via-[#7D5CFF]/5 to-transparent pointer-events-none" />
      
      <div className="container max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Animated Text Lines */}
        <div className="space-y-6 md:space-y-8 text-center mb-12">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-in-out ${
                visibleLines.includes(index)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 0.5}s`
              }}
            >
              <h2 
                className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#A37BFF] via-[#9B7CFF] to-white bg-clip-text text-transparent"
                style={{
                  textShadow: `
                    0 0 20px rgba(163, 123, 255, 0.4),
                    0 0 40px rgba(125, 92, 255, 0.3),
                    0 4px 6px rgba(160, 130, 255, 0.3)
                  `,
                  WebkitTextStroke: "0.5px rgba(163, 123, 255, 0.1)"
                }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div 
          className={`flex justify-center transition-all duration-800 ease-in-out ${
            showCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={() => window.location.href = '/login'}
            className="group relative px-8 py-4 text-lg font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #A37BFF 0%, #7D5CFF 100%)",
              boxShadow: "0 4px 20px rgba(163, 123, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(163, 123, 255, 0.5), 0 0 40px rgba(125, 92, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(163, 123, 255, 0.3)";
            }}
          >
            <span className="relative z-10 text-white flex items-center gap-2">
              Try QueryBot Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 to-transparent" />
          </button>
        </div>
      </div>
    </section>
  );
};
