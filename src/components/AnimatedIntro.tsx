import { useEffect, useState } from "react";

export const AnimatedIntro = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  
  const lines = [
    "AI-Powered IT Support",
    "Automate Your Workflows",
    "Resolve Tickets 10× Faster",
    "Built for Modern IT Teams",
    "Welcome to QueryBot"
  ];

  useEffect(() => {
    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, index * 500);
    });
  }, []);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A37BFF] to-[#7D5CFF] opacity-5" />
      
      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="space-y-6 text-center">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-in-out ${
                visibleLines.includes(index)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#A37BFF] to-white bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(163, 123, 255, 0.85))',
                  textShadow: '0 4px 6px rgba(160, 130, 255, 0.3)',
                  opacity: 0.9,
                  letterSpacing: '-0.02em'
                }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
